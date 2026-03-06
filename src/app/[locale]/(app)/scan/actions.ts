"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { VALID_TRANSITIONS } from "@/lib/assessment/types";
import type { AssessmentStatus } from "@/lib/assessment/types";

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
