"use client";

import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { AssessmentSection } from "@/lib/assessment/types";

interface SectionStepperProps {
  sections: AssessmentSection[];
  currentSection: number;
  completedSections: Set<number>;
  progress: number;
  locale: string;
  onSectionClick: (index: number) => void;
}

export function SectionStepper({
  sections,
  currentSection,
  completedSections,
  progress,
  locale,
  onSectionClick,
}: SectionStepperProps) {
  const lang = locale === "ru" ? "ru" : "en";

  return (
    <div className="w-full space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <Progress value={progress} className="flex-1 h-2" />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {progress}%
        </span>
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between gap-1">
        {sections.map((section, index) => {
          const isCompleted = completedSections.has(index);
          const isCurrent = index === currentSection;
          const isClickable = isCompleted || index <= currentSection;

          return (
            <button
              key={section.id}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onSectionClick(index)}
              className={`
                flex flex-col items-center gap-1.5 flex-1 min-w-0 py-2 px-1 rounded-lg transition-colors
                ${isCurrent ? "bg-primary/10" : ""}
                ${isClickable ? "cursor-pointer hover:bg-muted" : "cursor-default opacity-50"}
              `}
            >
              {/* Circle indicator */}
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0
                  ${isCompleted ? "bg-primary text-primary-foreground" : ""}
                  ${isCurrent && !isCompleted ? "border-2 border-primary text-primary" : ""}
                  ${!isCurrent && !isCompleted ? "border-2 border-muted-foreground/30 text-muted-foreground" : ""}
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Section name */}
              <span
                className={`
                  text-xs text-center truncate w-full
                  ${isCurrent ? "font-medium text-foreground" : "text-muted-foreground"}
                `}
              >
                {section.name[lang]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
