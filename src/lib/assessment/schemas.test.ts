import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  followUpSchema,
  scoreAndRoadmapSchema,
  riskAndRoiSchema,
} from "./schemas";
import type {
  AssessmentResults,
  MaturityScore,
  RoadmapItem,
  RiskItem,
  ROIForecast,
} from "./types";

describe("followUpSchema", () => {
  it("validates correct follow-up structure", () => {
    const valid = {
      questions: [
        {
          question: "Can you elaborate on your AI strategy?",
          context: "Your answer suggested early-stage planning",
          suggestedAnswers: [
            "We have a roadmap",
            "We are exploring options",
            "We need help defining one",
          ],
        },
      ],
      comprehensionLevel: "intermediate" as const,
    };
    const result = z.safeParse(followUpSchema, valid);
    expect(result.success).toBe(true);
  });

  it("validates comprehensionLevel enum values", () => {
    for (const level of ["beginner", "intermediate", "advanced"]) {
      const data = {
        questions: [],
        comprehensionLevel: level,
      };
      const result = z.safeParse(followUpSchema, data);
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid comprehensionLevel", () => {
    const invalid = {
      questions: [],
      comprehensionLevel: "expert",
    };
    const result = z.safeParse(followUpSchema, invalid);
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = z.safeParse(followUpSchema, { questions: [] });
    expect(result.success).toBe(false);
  });
});

describe("scoreAndRoadmapSchema", () => {
  const validData = {
    maturityScore: {
      overall: 55,
      dimensions: {
        operations: 60,
        sales: 50,
        finance: 65,
        team: 45,
        risks: 55,
      },
    },
    automationRoadmap: [
      {
        name: "Customer Service Chatbot",
        description: "Deploy AI-powered chatbot",
        priority: "high" as const,
        expectedImpact: "Reduce support volume by 40%",
        timeline: "2-3 months",
      },
    ],
  };

  it("validates correct score and roadmap data", () => {
    const result = z.safeParse(scoreAndRoadmapSchema, validData);
    expect(result.success).toBe(true);
  });

  it("output matches MaturityScore interface shape", () => {
    const result = z.safeParse(scoreAndRoadmapSchema, validData);
    expect(result.success).toBe(true);
    if (result.success) {
      // Structural compatibility: check all dimension keys exist
      const dims = result.data.maturityScore.dimensions;
      expect(dims).toHaveProperty("operations");
      expect(dims).toHaveProperty("sales");
      expect(dims).toHaveProperty("finance");
      expect(dims).toHaveProperty("team");
      expect(dims).toHaveProperty("risks");
      expect(typeof result.data.maturityScore.overall).toBe("number");
    }
  });

  it("output matches RoadmapItem interface shape", () => {
    const result = z.safeParse(scoreAndRoadmapSchema, validData);
    expect(result.success).toBe(true);
    if (result.success) {
      const item = result.data.automationRoadmap[0];
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("priority");
      expect(item).toHaveProperty("expectedImpact");
      expect(item).toHaveProperty("timeline");
    }
  });

  it("rejects missing dimensions", () => {
    const invalid = {
      maturityScore: {
        overall: 50,
        dimensions: { operations: 60 }, // missing others
      },
      automationRoadmap: [],
    };
    const result = z.safeParse(scoreAndRoadmapSchema, invalid);
    expect(result.success).toBe(false);
  });

  it("rejects invalid priority value", () => {
    const invalid = {
      ...validData,
      automationRoadmap: [
        { ...validData.automationRoadmap[0], priority: "urgent" },
      ],
    };
    const result = z.safeParse(scoreAndRoadmapSchema, invalid);
    expect(result.success).toBe(false);
  });
});

describe("riskAndRoiSchema", () => {
  const validData = {
    riskMap: [
      {
        category: "Data Privacy",
        level: "high" as const,
        description: "Customer data requires GDPR compliance",
        mitigation: "Implement data classification framework",
      },
    ],
    roiForecast: {
      totalSavings: 420000,
      timeframe: "12 months",
      items: [
        {
          area: "Customer Support",
          currentCost: 360000,
          projectedSaving: 144000,
          confidence: "high" as const,
        },
      ],
    },
  };

  it("validates correct risk and ROI data", () => {
    const result = z.safeParse(riskAndRoiSchema, validData);
    expect(result.success).toBe(true);
  });

  it("output matches RiskItem interface shape", () => {
    const result = z.safeParse(riskAndRoiSchema, validData);
    expect(result.success).toBe(true);
    if (result.success) {
      const risk = result.data.riskMap[0];
      expect(risk).toHaveProperty("category");
      expect(risk).toHaveProperty("level");
      expect(risk).toHaveProperty("description");
      expect(risk).toHaveProperty("mitigation");
    }
  });

  it("output matches ROIForecast interface shape", () => {
    const result = z.safeParse(riskAndRoiSchema, validData);
    expect(result.success).toBe(true);
    if (result.success) {
      const forecast = result.data.roiForecast;
      expect(forecast).toHaveProperty("totalSavings");
      expect(forecast).toHaveProperty("timeframe");
      expect(forecast).toHaveProperty("items");
      const item = forecast.items[0];
      expect(item).toHaveProperty("area");
      expect(item).toHaveProperty("currentCost");
      expect(item).toHaveProperty("projectedSaving");
      expect(item).toHaveProperty("confidence");
    }
  });

  it("rejects invalid risk level", () => {
    const invalid = {
      ...validData,
      riskMap: [{ ...validData.riskMap[0], level: "critical" }],
    };
    const result = z.safeParse(riskAndRoiSchema, invalid);
    expect(result.success).toBe(false);
  });

  it("rejects missing roiForecast fields", () => {
    const invalid = {
      riskMap: validData.riskMap,
      roiForecast: { totalSavings: 100 }, // missing timeframe and items
    };
    const result = z.safeParse(riskAndRoiSchema, invalid);
    expect(result.success).toBe(false);
  });
});

describe("type compatibility", () => {
  it("scoreAndRoadmap inferred type is assignable to partial AssessmentResults", () => {
    // Compile-time check: if this compiles, types are compatible
    const parsed = z.safeParse(scoreAndRoadmapSchema, {
      maturityScore: {
        overall: 50,
        dimensions: {
          operations: 50,
          sales: 50,
          finance: 50,
          team: 50,
          risks: 50,
        },
      },
      automationRoadmap: [],
    });

    if (parsed.success) {
      const maturity: MaturityScore = parsed.data.maturityScore;
      const roadmap: RoadmapItem[] = parsed.data.automationRoadmap;
      expect(maturity.overall).toBe(50);
      expect(roadmap).toEqual([]);
    }
  });

  it("riskAndRoi inferred type is assignable to partial AssessmentResults", () => {
    const parsed = z.safeParse(riskAndRoiSchema, {
      riskMap: [
        {
          category: "Test",
          level: "low",
          description: "Test risk",
          mitigation: "Test mitigation",
        },
      ],
      roiForecast: {
        totalSavings: 1000,
        timeframe: "12 months",
        items: [],
      },
    });

    if (parsed.success) {
      const risks: RiskItem[] = parsed.data.riskMap;
      const forecast: ROIForecast = parsed.data.roiForecast;
      expect(risks).toHaveLength(1);
      expect(forecast.totalSavings).toBe(1000);
    }
  });
});
