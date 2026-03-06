"use client";

import { useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SuggestionChips } from "./suggestion-chips";
import type { Question } from "@/lib/assessment/types";

/**
 * Static placeholder suggestions per question type.
 * Plan 03 will replace these with AI-generated suggestions.
 */
function getPlaceholderSuggestions(question: Question, locale: string): string[] {
  const lang = locale === "ru" ? "ru" : "en";

  // Only open-text questions get suggestions
  if (question.type !== "open-text") return [];

  // Return placeholder suggestions based on question dimension context
  if (lang === "ru") {
    return [
      "Мы только начинаем изучать этот вопрос",
      "У нас есть базовый подход",
      "Мы активно работаем в этом направлении",
    ];
  }

  return [
    "We're just starting to explore this",
    "We have a basic approach in place",
    "We're actively working on this area",
  ];
}

interface QuestionGroupProps {
  questions: Question[];
  answers: Record<string, string>;
  sectionIndex: number;
  locale: string;
  onAnswerChange: (questionKey: string, answer: string) => void;
}

export function QuestionGroup({
  questions,
  answers,
  sectionIndex,
  locale,
  onAnswerChange,
}: QuestionGroupProps) {
  const lang = locale === "ru" ? "ru" : "en";

  const handleTextChange = useCallback(
    (questionId: string, value: string) => {
      onAnswerChange(questionId, value);
    },
    [onAnswerChange]
  );

  const handleSuggestionSelect = useCallback(
    (questionId: string, suggestion: string) => {
      onAnswerChange(questionId, suggestion);
    },
    [onAnswerChange]
  );

  return (
    <div className="space-y-8">
      {questions.map((question, qIndex) => {
        const currentAnswer = answers[question.id] || "";
        const suggestions = getPlaceholderSuggestions(question, locale);

        return (
          <div key={question.id} className="space-y-3">
            {/* Question number + text */}
            <label className="block text-base font-medium leading-relaxed">
              <span className="text-muted-foreground mr-2">
                {sectionIndex * 4 + qIndex + 1}.
              </span>
              {question.text[lang]}
            </label>

            {/* Input based on question type */}
            {question.type === "open-text" ? (
              <div>
                <Textarea
                  value={currentAnswer}
                  onChange={(e) =>
                    handleTextChange(question.id, e.target.value)
                  }
                  placeholder={
                    locale === "ru"
                      ? "Расскажите подробнее..."
                      : "Tell us more..."
                  }
                  className="min-h-[100px] resize-y"
                  rows={3}
                />
                <SuggestionChips
                  suggestions={suggestions}
                  onSelect={(s) => handleSuggestionSelect(question.id, s)}
                />
              </div>
            ) : question.type === "single-choice" && question.options ? (
              <RadioGroup
                value={currentAnswer}
                onValueChange={(value) =>
                  onAnswerChange(question.id, value)
                }
                className="space-y-2"
              >
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem
                      value={String(optIndex)}
                      id={`${question.id}-${optIndex}`}
                    />
                    <Label
                      htmlFor={`${question.id}-${optIndex}`}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {option[lang]}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
