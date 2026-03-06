"use client";

import { useState, useCallback, useRef, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SuggestionChips } from "./suggestion-chips";
import { saveFollowUpAnswer } from "../actions";
import type { FollowUpQuestion } from "@/lib/assessment/types";

interface AiFollowupProps {
  questions: FollowUpQuestion[];
  sectionIndex: number;
  assessmentId: string;
  answers: Record<string, string>;
  onComplete: () => void;
  locale: string;
}

const texts = {
  en: {
    aiIndicator: "AI is asking based on your answers",
    placeholder: "Share your thoughts...",
    continueBtn: "Continue to Next Section",
    skipBtn: "Skip Follow-ups",
    context: "Why we're asking:",
  },
  ru: {
    aiIndicator: "ИИ задаёт вопросы на основе ваших ответов",
    placeholder: "Поделитесь своими мыслями...",
    continueBtn: "Перейти к следующему разделу",
    skipBtn: "Пропустить",
    context: "Почему мы спрашиваем:",
  },
} as const;

export function AiFollowup({
  questions,
  sectionIndex,
  assessmentId,
  answers: initialAnswers,
  onComplete,
  locale,
}: AiFollowupProps) {
  const t = locale === "ru" ? texts.ru : texts.en;
  const [followUpAnswers, setFollowUpAnswers] = useState<
    Record<string, string>
  >(initialAnswers);
  const [isPending, startTransition] = useTransition();
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );

  const handleAnswerChange = useCallback(
    (questionIndex: number, value: string) => {
      const key = `s${sectionIndex}_f${questionIndex}`;
      setFollowUpAnswers((prev) => ({ ...prev, [key]: value }));

      // Debounced auto-save
      if (debounceTimers.current[key]) {
        clearTimeout(debounceTimers.current[key]);
      }
      debounceTimers.current[key] = setTimeout(() => {
        startTransition(async () => {
          await saveFollowUpAnswer(assessmentId, sectionIndex, key, value);
        });
      }, 300);
    },
    [assessmentId, sectionIndex, startTransition]
  );

  const handleSuggestionSelect = useCallback(
    (questionIndex: number, suggestion: string) => {
      handleAnswerChange(questionIndex, suggestion);
    },
    [handleAnswerChange]
  );

  // Check if at least one follow-up has been answered
  const hasAnyAnswer = questions.some((_, idx) => {
    const key = `s${sectionIndex}_f${idx}`;
    return followUpAnswers[key] && followUpAnswers[key].trim() !== "";
  });

  return (
    <div className="space-y-6">
      {/* AI indicator header */}
      <div className="flex items-center gap-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>
        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
          {t.aiIndicator}
        </span>
      </div>

      {/* Follow-up questions */}
      {questions.map((q, idx) => {
        const key = `s${sectionIndex}_f${idx}`;
        const currentAnswer = followUpAnswers[key] || "";

        return (
          <div
            key={idx}
            className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-5 space-y-3"
          >
            {/* Question text */}
            <p className="text-base font-medium leading-relaxed">
              {q.question}
            </p>

            {/* Context (why AI is asking) */}
            {q.context && (
              <p className="text-xs text-muted-foreground italic">
                {t.context} {q.context}
              </p>
            )}

            {/* Answer textarea */}
            <Textarea
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
              placeholder={t.placeholder}
              className="min-h-[80px] resize-y bg-white dark:bg-background"
              rows={2}
            />

            {/* Suggestion chips */}
            {q.suggestedAnswers && q.suggestedAnswers.length > 0 && (
              <SuggestionChips
                suggestions={q.suggestedAnswers}
                onSelect={(s) => handleSuggestionSelect(idx, s)}
                loading={false}
              />
            )}
          </div>
        );
      })}

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={onComplete}>
          {t.skipBtn}
        </Button>
        <Button onClick={onComplete} disabled={isPending}>
          {t.continueBtn}
        </Button>
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
