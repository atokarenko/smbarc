"use client";

import { useState, useCallback, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ASSESSMENT_SECTIONS,
  getTotalQuestionCount,
} from "@/lib/assessment/questions";
import { calculateProgress } from "@/lib/assessment/scoring";
import { SectionStepper } from "./components/section-stepper";
import { QuestionGroup } from "./components/question-group";
import { AssessmentConfig } from "./components/assessment-config";
import { AiFollowup } from "./components/ai-followup";
import { ProcessingScreen } from "./components/processing-screen";
import {
  createAssessment,
  saveAnswer,
  generateFollowUpQuestions,
  completeAssessment,
  transitionState,
} from "./actions";
import type { FollowUpQuestion } from "@/lib/assessment/types";

export interface AssessmentData {
  id: string;
  status: string;
  currentSection: number;
  aiDecideMode: boolean;
  answers: Record<string, string>;
  followUpAnswers: Record<string, string>;
  locale: string;
}

interface AssessmentFlowProps {
  assessment: AssessmentData | null;
  locale: string;
  userRole: string;
}

const completionTexts = {
  en: {
    title: "Assessment Complete",
    message:
      "Your business health assessment is complete! Results have been generated and saved.",
    backToDashboard: "View Dashboard",
    nextSection: "Next Section",
    previousSection: "Previous Section",
    completeAssessment: "Complete Assessment",
    generating: "Generating follow-up questions...",
    error: "Something went wrong. Please try again.",
  },
  ru: {
    title: "Оценка завершена",
    message:
      "Оценка здоровья вашего бизнеса завершена! Результаты сгенерированы и сохранены.",
    backToDashboard: "Перейти к панели",
    nextSection: "Следующий раздел",
    previousSection: "Предыдущий раздел",
    completeAssessment: "Завершить оценку",
    generating: "Генерируем уточняющие вопросы...",
    error: "Что-то пошло не так. Попробуйте ещё раз.",
  },
} as const;

// Max follow-ups in default mode (5-8 total across all sections)
const MAX_DEFAULT_FOLLOWUPS = 8;

export function AssessmentFlow({
  assessment,
  locale,
  userRole,
}: AssessmentFlowProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = locale === "ru" ? completionTexts.ru : completionTexts.en;

  // Assessment state
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    assessment
  );
  const [currentSection, setCurrentSection] = useState(
    assessment?.currentSection ?? 0
  );
  const [answers, setAnswers] = useState<Record<string, string>>(
    assessment?.answers ?? {}
  );
  const [followUpAnswers, setFollowUpAnswers] = useState<
    Record<string, string>
  >(assessment?.followUpAnswers ?? {});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // AI follow-up state
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [currentFollowUpQuestions, setCurrentFollowUpQuestions] = useState<
    FollowUpQuestion[]
  >([]);
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const [totalFollowUpCount, setTotalFollowUpCount] = useState(0);

  // Debounce timer ref for auto-save
  const debounceTimers = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  // Calculate which sections are complete (all questions answered)
  const completedSections = new Set<number>();
  ASSESSMENT_SECTIONS.forEach((section, index) => {
    const allAnswered = section.questions.every((q) => {
      const answer = answers[q.id];
      return answer !== undefined && answer.trim() !== "";
    });
    if (allAnswered) {
      completedSections.add(index);
    }
  });

  // Calculate progress
  const totalQuestions = getTotalQuestionCount();
  const progress = calculateProgress(
    answers,
    followUpAnswers,
    totalQuestions,
    totalFollowUpCount
  );

  // Check if current section is complete
  const currentSectionData = ASSESSMENT_SECTIONS[currentSection];
  const isCurrentSectionComplete = currentSectionData
    ? currentSectionData.questions.every((q) => {
        const answer = answers[q.id];
        return answer !== undefined && answer.trim() !== "";
      })
    : false;

  const isLastSection = currentSection === ASSESSMENT_SECTIONS.length - 1;

  // Determine if we should generate follow-ups for this section
  const shouldGenerateFollowUp = useCallback(
    (aiDecideMode: boolean) => {
      if (aiDecideMode) return true; // AI Decides mode: always generate
      return totalFollowUpCount < MAX_DEFAULT_FOLLOWUPS;
    },
    [totalFollowUpCount]
  );

  // Handle starting a new assessment
  const handleStart = useCallback(
    async (aiDecideMode: boolean) => {
      startTransition(async () => {
        const newAssessment = await createAssessment(locale, aiDecideMode);
        setAssessmentData({
          id: newAssessment.id,
          status: newAssessment.status,
          currentSection: 0,
          aiDecideMode: newAssessment.aiDecideMode,
          answers: {},
          followUpAnswers: {},
          locale: newAssessment.locale,
        });
        setCurrentSection(0);
        setAnswers({});
        setFollowUpAnswers({});
        setTotalFollowUpCount(0);
      });
    },
    [locale, startTransition]
  );

  // Handle answer changes with debounced auto-save
  const handleAnswerChange = useCallback(
    (questionKey: string, answer: string) => {
      setAnswers((prev) => ({
        ...prev,
        [questionKey]: answer,
      }));

      if (debounceTimers.current[questionKey]) {
        clearTimeout(debounceTimers.current[questionKey]);
      }

      debounceTimers.current[questionKey] = setTimeout(() => {
        if (assessmentData) {
          startTransition(async () => {
            await saveAnswer(
              assessmentData.id,
              currentSection,
              questionKey,
              answer
            );
          });
        }
      }, 300);
    },
    [assessmentData, currentSection, startTransition]
  );

  // Handle section navigation
  const handleSectionClick = useCallback((index: number) => {
    setShowFollowUp(false);
    setCurrentFollowUpQuestions([]);
    setCurrentSection(index);
  }, []);

  // Handle moving to next section (with AI follow-up generation)
  const handleNextSection = useCallback(async () => {
    if (!assessmentData) return;
    setErrorMessage(null);

    // Check if we should generate follow-ups
    if (
      !showFollowUp &&
      shouldGenerateFollowUp(assessmentData.aiDecideMode)
    ) {
      setIsGeneratingFollowUp(true);
      try {
        const questions = await generateFollowUpQuestions(
          assessmentData.id,
          currentSection
        );
        if (questions.length > 0) {
          setCurrentFollowUpQuestions(questions);
          setTotalFollowUpCount((prev) => prev + questions.length);
          setShowFollowUp(true);
          setIsGeneratingFollowUp(false);
          return; // Show follow-ups before proceeding
        }
      } catch (error) {
        console.error("Follow-up generation error:", error);
        // Continue to next section even if follow-up generation fails
      }
      setIsGeneratingFollowUp(false);
    }

    // Move to next section
    if (currentSection < ASSESSMENT_SECTIONS.length - 1) {
      setShowFollowUp(false);
      setCurrentFollowUpQuestions([]);
      setCurrentSection((prev) => prev + 1);

      // Transition back to IN_PROGRESS for next section
      if (assessmentData.status === "AI_FOLLOWUP") {
        try {
          await transitionState(assessmentData.id, "IN_PROGRESS");
        } catch {
          // Non-critical: state tracking only
        }
      }
    }
  }, [
    assessmentData,
    currentSection,
    showFollowUp,
    shouldGenerateFollowUp,
  ]);

  // Handle follow-up completion (move to next section)
  const handleFollowUpComplete = useCallback(async () => {
    if (!assessmentData) return;

    setShowFollowUp(false);
    setCurrentFollowUpQuestions([]);

    if (currentSection < ASSESSMENT_SECTIONS.length - 1) {
      setCurrentSection((prev) => prev + 1);
      // Transition back to IN_PROGRESS
      try {
        await transitionState(assessmentData.id, "IN_PROGRESS");
      } catch {
        // Non-critical
      }
    }
  }, [assessmentData, currentSection]);

  const handlePreviousSection = useCallback(() => {
    if (currentSection > 0) {
      setShowFollowUp(false);
      setCurrentFollowUpQuestions([]);
      setCurrentSection((prev) => prev - 1);
    }
  }, [currentSection]);

  // Handle assessment completion
  const handleComplete = useCallback(async () => {
    if (!assessmentData) return;
    setErrorMessage(null);

    // If there are follow-ups to show first for the last section
    if (
      !showFollowUp &&
      isLastSection &&
      shouldGenerateFollowUp(assessmentData.aiDecideMode)
    ) {
      setIsGeneratingFollowUp(true);
      try {
        const questions = await generateFollowUpQuestions(
          assessmentData.id,
          currentSection
        );
        if (questions.length > 0) {
          setCurrentFollowUpQuestions(questions);
          setTotalFollowUpCount((prev) => prev + questions.length);
          setShowFollowUp(true);
          setIsGeneratingFollowUp(false);
          return;
        }
      } catch {
        // Continue to completion even if follow-ups fail
      }
      setIsGeneratingFollowUp(false);
    }

    // Show processing screen and run AI scoring
    setShowFollowUp(false);
    setIsProcessing(true);

    try {
      await completeAssessment(assessmentData.id);
      setIsCompleted(true);
    } catch (error) {
      console.error("Assessment completion error:", error);
      setErrorMessage(t.error);
      setIsProcessing(false);
    }
  }, [
    assessmentData,
    currentSection,
    isLastSection,
    showFollowUp,
    shouldGenerateFollowUp,
    t.error,
  ]);

  // Handle final follow-up complete (for last section)
  const handleFinalFollowUpComplete = useCallback(async () => {
    if (!assessmentData) return;
    setShowFollowUp(false);
    setCurrentFollowUpQuestions([]);
    setErrorMessage(null);

    // Now run the actual completion
    setIsProcessing(true);
    try {
      // Transition to IN_PROGRESS first (from AI_FOLLOWUP) so completeAssessment can transition to CALCULATING
      try {
        await transitionState(assessmentData.id, "IN_PROGRESS");
      } catch {
        // May already be in correct state
      }
      await completeAssessment(assessmentData.id);
      setIsCompleted(true);
    } catch (error) {
      console.error("Assessment completion error:", error);
      setErrorMessage(t.error);
      setIsProcessing(false);
    }
  }, [assessmentData, t.error]);

  // --- Render states ---

  // No assessment yet: show start screen
  if (!assessmentData) {
    return <AssessmentConfig onStart={handleStart} locale={locale} />;
  }

  // Processing screen while AI generates results
  if (isProcessing && !isCompleted) {
    const totalAnswered =
      Object.keys(answers).filter((k) => answers[k]?.trim()).length +
      Object.keys(followUpAnswers).filter((k) => followUpAnswers[k]?.trim())
        .length;
    return <ProcessingScreen totalAnswers={totalAnswered} locale={locale} />;
  }

  // Assessment completed
  if (isCompleted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-2xl">{t.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t.message}</p>
            <Button
              onClick={() => router.push(`/${locale}/dashboard`)}
              variant="outline"
            >
              {t.backToDashboard}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active assessment: show stepper + questions (or follow-ups)
  const sectionQuestions = currentSectionData?.questions ?? [];

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Section stepper with progress */}
      <SectionStepper
        sections={ASSESSMENT_SECTIONS}
        currentSection={currentSection}
        completedSections={completedSections}
        progress={progress}
        locale={locale}
        onSectionClick={handleSectionClick}
      />

      {/* Section title */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">
          {currentSectionData?.name[locale === "ru" ? "ru" : "en"]}
        </h2>
        <p className="text-sm text-muted-foreground">
          {locale === "ru"
            ? `Раздел ${currentSection + 1} из ${ASSESSMENT_SECTIONS.length}`
            : `Section ${currentSection + 1} of ${ASSESSMENT_SECTIONS.length}`}
        </p>
      </div>

      {/* Generating follow-up loading state */}
      {isGeneratingFollowUp && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-sm">{t.generating}</span>
          </div>
        </div>
      )}

      {/* AI Follow-up questions */}
      {showFollowUp && !isGeneratingFollowUp && (
        <AiFollowup
          questions={currentFollowUpQuestions}
          sectionIndex={currentSection}
          assessmentId={assessmentData.id}
          answers={followUpAnswers}
          onComplete={
            isLastSection ? handleFinalFollowUpComplete : handleFollowUpComplete
          }
          locale={locale}
        />
      )}

      {/* Regular questions (hidden when showing follow-ups) */}
      {!showFollowUp && !isGeneratingFollowUp && (
        <>
          <QuestionGroup
            questions={sectionQuestions}
            answers={answers}
            sectionIndex={currentSection}
            locale={locale}
            onAnswerChange={handleAnswerChange}
          />

          {/* Error message */}
          {errorMessage && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePreviousSection}
              disabled={currentSection === 0}
            >
              {t.previousSection}
            </Button>

            {isLastSection ? (
              <Button
                onClick={handleComplete}
                disabled={!isCurrentSectionComplete || isPending}
              >
                {t.completeAssessment}
              </Button>
            ) : (
              <Button
                onClick={handleNextSection}
                disabled={!isCurrentSectionComplete || isPending}
              >
                {t.nextSection}
              </Button>
            )}
          </div>
        </>
      )}

      {/* Saving indicator */}
      {isPending && !isGeneratingFollowUp && !showFollowUp && (
        <p className="text-xs text-muted-foreground text-center">
          {locale === "ru" ? "Сохраняем..." : "Saving..."}
        </p>
      )}
    </div>
  );
}
