import { describe, it, expect } from "vitest";
import {
  calculateDimensionScores,
  calculateOverallScore,
  getMaturityLevel,
  calculateProgress,
} from "./scoring";
import { ASSESSMENT_SECTIONS } from "./questions";

describe("calculateDimensionScores", () => {
  it("returns all 5 dimension keys", () => {
    const scores = calculateDimensionScores({}, ASSESSMENT_SECTIONS);
    const keys = Object.keys(scores);
    expect(keys).toContain("strategy");
    expect(keys).toContain("adoption");
    expect(keys).toContain("riskManagement");
    expect(keys).toContain("roiTracking");
    expect(keys).toContain("governance");
  });

  it("returns scores in 0-100 range", () => {
    const scores = calculateDimensionScores({}, ASSESSMENT_SECTIONS);
    for (const score of Object.values(scores)) {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  });

  it("with all empty answers returns scores near 0", () => {
    const scores = calculateDimensionScores({}, ASSESSMENT_SECTIONS);
    for (const score of Object.values(scores)) {
      expect(score).toBeLessThanOrEqual(10);
    }
  });

  it("with detailed answers returns higher scores", () => {
    // Create answers with substantial text for all questions
    const answers: Record<string, string> = {};
    for (let s = 0; s < ASSESSMENT_SECTIONS.length; s++) {
      for (let q = 0; q < ASSESSMENT_SECTIONS[s].questions.length; q++) {
        const question = ASSESSMENT_SECTIONS[s].questions[q];
        if (question.type === "single-choice" && question.options) {
          // Pick the last (highest-maturity) option
          answers[question.id] = String(question.options.length - 1);
        } else {
          answers[question.id] =
            "We have a comprehensive and well-documented AI strategy that is deeply integrated with our business objectives. Our leadership team has invested significantly in AI initiatives across multiple departments, with dedicated teams managing implementation, monitoring, and continuous improvement of our AI systems. We regularly benchmark against industry leaders and have established clear KPIs for measuring AI impact.";
        }
      }
    }
    const scores = calculateDimensionScores(answers, ASSESSMENT_SECTIONS);
    for (const score of Object.values(scores)) {
      expect(score).toBeGreaterThan(50);
    }
  });

  it("single-choice answers apply weights correctly", () => {
    // Answer only strategy section with highest choice
    const answers: Record<string, string> = {};
    const strategySection = ASSESSMENT_SECTIONS[0];
    for (const q of strategySection.questions) {
      if (q.type === "single-choice" && q.options) {
        answers[q.id] = String(q.options.length - 1); // highest option
      }
    }
    const scores = calculateDimensionScores(answers, ASSESSMENT_SECTIONS);
    // Strategy should have some score (not zero) because we answered choice questions
    expect(scores.strategy).toBeGreaterThan(0);
  });
});

describe("calculateOverallScore", () => {
  it("averages dimension scores correctly", () => {
    const dimensions = {
      strategy: 60,
      adoption: 40,
      riskManagement: 80,
      roiTracking: 50,
      governance: 70,
    };
    const overall = calculateOverallScore(dimensions);
    expect(overall).toBe(60); // (60+40+80+50+70)/5
  });

  it("returns 0 for all-zero dimensions", () => {
    const dimensions = {
      strategy: 0,
      adoption: 0,
      riskManagement: 0,
      roiTracking: 0,
      governance: 0,
    };
    expect(calculateOverallScore(dimensions)).toBe(0);
  });

  it("returns 100 for all-100 dimensions", () => {
    const dimensions = {
      strategy: 100,
      adoption: 100,
      riskManagement: 100,
      roiTracking: 100,
      governance: 100,
    };
    expect(calculateOverallScore(dimensions)).toBe(100);
  });
});

describe("getMaturityLevel", () => {
  const testCases = [
    { score: 0, level: "Beginner" },
    { score: 10, level: "Beginner" },
    { score: 20, level: "Beginner" },
    { score: 21, level: "Developing" },
    { score: 30, level: "Developing" },
    { score: 40, level: "Developing" },
    { score: 41, level: "Intermediate" },
    { score: 50, level: "Intermediate" },
    { score: 60, level: "Intermediate" },
    { score: 61, level: "Advanced" },
    { score: 70, level: "Advanced" },
    { score: 80, level: "Advanced" },
    { score: 81, level: "Leader" },
    { score: 90, level: "Leader" },
    { score: 100, level: "Leader" },
  ];

  for (const { score, level } of testCases) {
    it(`returns ${level} for score ${score}`, () => {
      const result = getMaturityLevel(score);
      expect(result.level).toBe(level);
    });
  }

  it("includes range string in result", () => {
    const result = getMaturityLevel(50);
    expect(result.range).toBeDefined();
    expect(typeof result.range).toBe("string");
    expect(result.range.length).toBeGreaterThan(0);
  });
});

describe("calculateProgress", () => {
  it("returns 0 when no answers given", () => {
    const progress = calculateProgress({}, {}, 19, 0);
    expect(progress).toBe(0);
  });

  it("returns 100 when all questions answered and no follow-ups", () => {
    const answers: Record<string, string> = {};
    for (let i = 0; i < 19; i++) {
      answers[`q${i}`] = "some answer";
    }
    const progress = calculateProgress(answers, {}, 19, 0);
    expect(progress).toBe(100);
  });

  it("returns percentage based on answered vs total", () => {
    const answers: Record<string, string> = {
      q1: "answer1",
      q2: "answer2",
    };
    // 2 out of 10 answered, no follow-ups
    const progress = calculateProgress(answers, {}, 10, 0);
    expect(progress).toBe(20);
  });

  it("accounts for follow-up questions answered", () => {
    const answers: Record<string, string> = {
      q1: "answer1",
      q2: "answer2",
    };
    const followUpAnswers: Record<string, string> = {
      f1: "follow-up answer",
    };
    // 2 regular + 1 follow-up out of (10 + 5) = 15 total
    const progress = calculateProgress(answers, followUpAnswers, 10, 5);
    expect(progress).toBe(20); // 3/15 = 20%
  });

  it("clamps at 100", () => {
    const answers: Record<string, string> = {};
    for (let i = 0; i < 25; i++) {
      answers[`q${i}`] = "answer";
    }
    const progress = calculateProgress(answers, {}, 10, 0);
    expect(progress).toBeLessThanOrEqual(100);
  });
});
