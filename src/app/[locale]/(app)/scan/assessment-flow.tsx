"use client";

import { useState, useCallback, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ASSESSMENT_SECTIONS, getTotalQuestionCount } from "@/lib/assessment/questions";
import { calculateProgress } from "@/lib/assessment/scoring";
import { SectionStepper } from "./components/section-stepper";
import { QuestionGroup } from "./components/question-group";
import { AssessmentConfig } from "./components/assessment-config";
import { createAssessment, saveAnswer } from "./actions";

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
      "Thank you for completing the assessment! AI analysis will be available in a future update.",
    backToDashboard: "Back to Dashboard",
    nextSection: "Next Section",
    previousSection: "Previous Section",
    completeAssessment: "Complete Assessment",
  },
  ru: {
    title: "Оценка завершена",
    message:
      "Спасибо за прохождение оценки! AI-анализ будет доступен в будущем обновлении.",
    backToDashboard: "На панель управления",
    nextSection: "Следующий раздел",
    previousSection: "Предыдущий раздел",
    completeAssessment: "Завершить оценку",
  },
} as const;

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
  const [isCompleted, setIsCompleted] = useState(false);

  // Debounce timer ref for auto-save
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );

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
  const progress = calculateProgress(answers, {}, totalQuestions, 0);

  // Check if current section is complete
  const currentSectionData = ASSESSMENT_SECTIONS[currentSection];
  const isCurrentSectionComplete = currentSectionData
    ? currentSectionData.questions.every((q) => {
        const answer = answers[q.id];
        return answer !== undefined && answer.trim() !== "";
      })
    : false;

  const isLastSection = currentSection === ASSESSMENT_SECTIONS.length - 1;

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
      });
    },
    [locale, startTransition]
  );

  // Handle answer changes with debounced auto-save
  const handleAnswerChange = useCallback(
    (questionKey: string, answer: string) => {
      // Update local state immediately
      setAnswers((prev) => ({
        ...prev,
        [questionKey]: answer,
      }));

      // Debounce the server save
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
    setCurrentSection(index);
  }, []);

  const handleNextSection = useCallback(() => {
    if (currentSection < ASSESSMENT_SECTIONS.length - 1) {
      setCurrentSection((prev) => prev + 1);
    }
  }, [currentSection]);

  const handlePreviousSection = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  }, [currentSection]);

  const handleComplete = useCallback(() => {
    // Placeholder: Plan 03 will wire AI processing here
    setIsCompleted(true);
  }, []);

  // --- Render states ---

  // No assessment yet: show start screen
  if (!assessmentData) {
    return <AssessmentConfig onStart={handleStart} locale={locale} />;
  }

  // Assessment completed (placeholder)
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

  // Active assessment: show stepper + questions
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

      {/* Questions */}
      <QuestionGroup
        questions={sectionQuestions}
        answers={answers}
        sectionIndex={currentSection}
        locale={locale}
        onAnswerChange={handleAnswerChange}
      />

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
            disabled={!isCurrentSectionComplete}
          >
            {t.completeAssessment}
          </Button>
        ) : (
          <Button
            onClick={handleNextSection}
            disabled={!isCurrentSectionComplete}
          >
            {t.nextSection}
          </Button>
        )}
      </div>

      {/* Saving indicator */}
      {isPending && (
        <p className="text-xs text-muted-foreground text-center">
          {locale === "ru" ? "Сохраняем..." : "Saving..."}
        </p>
      )}
    </div>
  );
}
