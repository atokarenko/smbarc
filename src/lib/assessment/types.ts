// Assessment state machine and core types

// Re-export types from demo-data so consumers import from one place
export type {
  AssessmentResults,
  MaturityScore,
  RoadmapItem,
  RiskItem,
  ROIItem,
  ROIForecast,
} from "@/lib/demo-data";

// Assessment lifecycle states
export type AssessmentStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "AI_FOLLOWUP"
  | "CALCULATING"
  | "COMPLETE";

// Valid state transitions
export const VALID_TRANSITIONS: Record<AssessmentStatus, AssessmentStatus[]> = {
  CREATED: ["IN_PROGRESS"],
  IN_PROGRESS: ["AI_FOLLOWUP", "CALCULATING"],
  AI_FOLLOWUP: ["IN_PROGRESS"],
  CALCULATING: ["COMPLETE"],
  COMPLETE: [],
};

// Question definition
export interface Question {
  id: string;
  text: { en: string; ru: string };
  type: "open-text" | "single-choice";
  options?: { en: string; ru: string }[];
  weight: number;
}

// Section grouping questions by dimension
export interface AssessmentSection {
  id: string;
  name: { en: string; ru: string };
  dimension: "strategy" | "adoption" | "riskManagement" | "roiTracking" | "governance";
  questions: Question[];
}

// AI-generated follow-up question
export interface FollowUpQuestion {
  question: string;
  context: string;
  suggestedAnswers: string[];
}
