export interface MaturityLevel {
  level: number;
  name: string;
  scoreRange: string;
  summary: string;
  characteristics: string[];
  exampleQuote: string;
  signalKeywords: string[];
  nextSteps: string[];
}

export interface MaturityRubric {
  dimension: string;
  dimensionName: string;
  levels: MaturityLevel[];
}
