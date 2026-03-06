"use server";

import { headers } from "next/headers";
import { generateText, Output } from "ai";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getAIProvider } from "@/lib/ai/provider";
import { VALID_TRANSITIONS } from "@/lib/assessment/types";
import type { AssessmentStatus, AssessmentResults, FollowUpQuestion } from "@/lib/assessment/types";
import { followUpSchema, scoreAndRoadmapSchema, riskAndRoiSchema } from "@/lib/assessment/schemas";
import { ASSESSMENT_SECTIONS } from "@/lib/assessment/questions";
import { calculateDimensionScores, calculateOverallScore } from "@/lib/assessment/scoring";
import {
  buildFollowUpPrompt,
  buildScoreAndRoadmapPrompt,
  buildRiskAndRoiPrompt,
} from "@/lib/assessment/prompts";

/**
 * Ensure the current user is authenticated. Returns the user ID.
 */
async function requireAuth(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  return session.user.id;
}

/**
 * Create a new assessment for the authenticated user.
 */
export async function createAssessment(
  locale: string,
  aiDecideMode: boolean
) {
  const userId = await requireAuth();

  const assessment = await prisma.assessment.create({
    data: {
      userId,
      locale,
      aiDecideMode,
      status: "IN_PROGRESS",
      currentSection: 0,
      answers: JSON.stringify({}),
      followUpAnswers: JSON.stringify({}),
      followUpQuestions: JSON.stringify({}),
    },
  });

  return assessment;
}

/**
 * Save an answer for a regular question. Auto-saves on each keystroke (debounced on client).
 * Updates currentSection to track position for resume.
 */
export async function saveAnswer(
  assessmentId: string,
  sectionIndex: number,
  questionKey: string,
  answer: string
) {
  await requireAuth();

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
  });

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  // Parse existing answers
  const answers: Record<string, string> = assessment.answers
    ? JSON.parse(assessment.answers)
    : {};

  // Update the specific answer
  answers[questionKey] = answer;

  // Update assessment with new answers and current section position
  await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      answers: JSON.stringify(answers),
      currentSection: sectionIndex,
      // Transition from CREATED to IN_PROGRESS if needed
      ...(assessment.status === "CREATED" ? { status: "IN_PROGRESS" } : {}),
    },
  });
}

/**
 * Save an answer for an AI follow-up question.
 */
export async function saveFollowUpAnswer(
  assessmentId: string,
  _sectionIndex: number,
  questionKey: string,
  answer: string
) {
  await requireAuth();

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
  });

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  const followUpAnswers: Record<string, string> = assessment.followUpAnswers
    ? JSON.parse(assessment.followUpAnswers)
    : {};

  followUpAnswers[questionKey] = answer;

  await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      followUpAnswers: JSON.stringify(followUpAnswers),
    },
  });
}

/**
 * Transition assessment to a new state. Validates the transition is allowed.
 */
export async function transitionState(
  assessmentId: string,
  newStatus: AssessmentStatus
) {
  await requireAuth();

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
  });

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  const currentStatus = assessment.status as AssessmentStatus;
  const validNextStates = VALID_TRANSITIONS[currentStatus];

  if (!validNextStates || !validNextStates.includes(newStatus)) {
    throw new Error(
      `Invalid transition from ${currentStatus} to ${newStatus}`
    );
  }

  await prisma.assessment.update({
    where: { id: assessmentId },
    data: { status: newStatus },
  });
}

/**
 * Get the latest incomplete assessment for the current user, or null.
 * Used by page.tsx to determine whether to show start screen or resume.
 */
export async function getOrCreateAssessment(locale: string) {
  const userId = await requireAuth();

  // Find latest incomplete assessment
  const existing = await prisma.assessment.findFirst({
    where: {
      userId,
      status: { not: "COMPLETE" },
    },
    orderBy: { createdAt: "desc" },
  });

  if (existing) {
    return existing;
  }

  return null;
}

/**
 * Generate AI follow-up questions after a user completes a section.
 * Transitions state to AI_FOLLOWUP and stores generated questions.
 */
export async function generateFollowUpQuestions(
  assessmentId: string,
  sectionIndex: number
): Promise<FollowUpQuestion[]> {
  await requireAuth();

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: { user: { select: { role: true } } },
  });

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  const section = ASSESSMENT_SECTIONS[sectionIndex];
  if (!section) {
    throw new Error(`Invalid section index: ${sectionIndex}`);
  }

  // Parse answers and extract those for the current section
  const allAnswers: Record<string, string> = assessment.answers
    ? JSON.parse(assessment.answers)
    : {};

  const sectionAnswers: Record<string, string> = {};
  for (const q of section.questions) {
    if (allAnswers[q.id]) {
      sectionAnswers[q.id] = allAnswers[q.id];
    }
  }

  const sectionName =
    section.name[assessment.locale === "ru" ? "ru" : "en"];
  const role = assessment.user?.role || "ceo";

  try {
    const { system, prompt } = buildFollowUpPrompt(
      sectionName,
      sectionAnswers,
      assessment.comprehensionLevel,
      role,
      assessment.locale
    );

    const { output } = await generateText({
      model: getAIProvider(),
      output: Output.object({ schema: followUpSchema }),
      system,
      prompt,
    });

    if (!output) {
      throw new Error("AI returned no output for follow-up generation");
    }

    const questions = output.questions;
    const comprehensionLevel = output.comprehensionLevel;

    // Store follow-up questions keyed by section index
    const storedFollowUps: Record<string, FollowUpQuestion[]> =
      assessment.followUpQuestions
        ? JSON.parse(assessment.followUpQuestions)
        : {};
    storedFollowUps[String(sectionIndex)] = questions;

    // Update assessment with follow-up questions and comprehension level
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        followUpQuestions: JSON.stringify(storedFollowUps),
        comprehensionLevel,
        status: "AI_FOLLOWUP",
      },
    });

    return questions;
  } catch (error) {
    console.error("Follow-up generation failed:", error);
    throw new Error(
      assessment.locale === "ru"
        ? "Не удалось сгенерировать уточняющие вопросы. Попробуйте ещё раз."
        : "Failed to generate follow-up questions. Please try again."
    );
  }
}

/**
 * Complete the assessment: run scoring AI calls in parallel and store results.
 */
export async function completeAssessment(
  assessmentId: string
): Promise<AssessmentResults> {
  await requireAuth();

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: { user: { select: { role: true } } },
  });

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  // Transition to CALCULATING
  const currentStatus = assessment.status as AssessmentStatus;
  const validNext = VALID_TRANSITIONS[currentStatus];
  if (!validNext?.includes("CALCULATING")) {
    // If already in progress, allow transition for retry
    if (currentStatus !== "CALCULATING") {
      throw new Error(`Cannot start scoring from status: ${currentStatus}`);
    }
  }

  await prisma.assessment.update({
    where: { id: assessmentId },
    data: { status: "CALCULATING" },
  });

  const allAnswers: Record<string, string> = assessment.answers
    ? JSON.parse(assessment.answers)
    : {};
  const followUpAnswers: Record<string, string> = assessment.followUpAnswers
    ? JSON.parse(assessment.followUpAnswers)
    : {};

  // Merge regular answers + follow-up answers for complete picture
  const mergedAnswers = { ...allAnswers, ...followUpAnswers };

  // Calculate formula scores
  const formulaScores = calculateDimensionScores(allAnswers, ASSESSMENT_SECTIONS);
  const role = assessment.user?.role || "ceo";
  const locale = assessment.locale;

  try {
    // Build prompts for both AI calls
    const scorePrompt = buildScoreAndRoadmapPrompt(mergedAnswers, formulaScores, role, locale);
    const riskPrompt = buildRiskAndRoiPrompt(mergedAnswers, formulaScores, role, locale);

    // Run BOTH AI calls in parallel
    const [scoreResult, riskResult] = await Promise.all([
      generateText({
        model: getAIProvider(),
        output: Output.object({ schema: scoreAndRoadmapSchema }),
        system: scorePrompt.system,
        prompt: scorePrompt.prompt,
      }),
      generateText({
        model: getAIProvider(),
        output: Output.object({ schema: riskAndRoiSchema }),
        system: riskPrompt.system,
        prompt: riskPrompt.prompt,
      }),
    ]);

    if (!scoreResult.output || !riskResult.output) {
      throw new Error("AI returned incomplete scoring results");
    }

    // Merge results into AssessmentResults shape
    const results: AssessmentResults = {
      maturityScore: scoreResult.output.maturityScore,
      automationRoadmap: scoreResult.output.automationRoadmap,
      riskMap: riskResult.output.riskMap,
      roiForecast: riskResult.output.roiForecast,
    };

    // Store results and formula scores, transition to COMPLETE
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        results: JSON.stringify(results),
        formulaScores: JSON.stringify(formulaScores),
        status: "COMPLETE",
      },
    });

    return results;
  } catch (error) {
    console.error("Assessment scoring failed:", error);

    // Recover: transition back to IN_PROGRESS so user is not stuck
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { status: "IN_PROGRESS" },
    });

    throw new Error(
      locale === "ru"
        ? "Не удалось выполнить AI-анализ. Пожалуйста, попробуйте ещё раз."
        : "AI analysis failed. Please try again."
    );
  }
}
