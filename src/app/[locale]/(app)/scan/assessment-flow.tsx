"use client";

// Stub -- full implementation in Task 2
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

export function AssessmentFlow({ assessment, locale, userRole }: AssessmentFlowProps) {
  return (
    <div className="p-6">
      <p>Assessment flow loading... (Task 2 implements this)</p>
    </div>
  );
}
