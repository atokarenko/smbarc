import { describe, expect, it } from "vitest";
import { computeRelevance, getRecommendedModules } from "./recommendation";
import { CATALOG_MODULES, type CatalogModule } from "./catalog-data";
import type { MaturityScore } from "@/lib/demo-data";

const lowDimensions: MaturityScore["dimensions"] = {
  operations: 10,
  sales: 15,
  finance: 20,
  team: 10,
  risks: 25,
};

const highDimensions: MaturityScore["dimensions"] = {
  operations: 90,
  sales: 85,
  finance: 95,
  team: 80,
  risks: 90,
};

const testModule: CatalogModule = {
  id: "test-module",
  category: "hr",
  icon: "UserSearch",
  relevantDimensions: ["team", "operations"],
  impactLevel: "high",
};

describe("computeRelevance", () => {
  it("returns higher score for lower dimension values (struggling areas)", () => {
    const lowScore = computeRelevance(testModule, lowDimensions);
    const highScore = computeRelevance(testModule, highDimensions);
    expect(lowScore).toBeGreaterThan(highScore);
  });

  it("returns value in 0-100 range", () => {
    const score1 = computeRelevance(testModule, lowDimensions);
    const score2 = computeRelevance(testModule, highDimensions);
    expect(score1).toBeGreaterThanOrEqual(0);
    expect(score1).toBeLessThanOrEqual(100);
    expect(score2).toBeGreaterThanOrEqual(0);
    expect(score2).toBeLessThanOrEqual(100);
  });
});

describe("getRecommendedModules", () => {
  it("returns all modules sorted by relevance (highest first)", () => {
    const result = getRecommendedModules(CATALOG_MODULES, lowDimensions);
    expect(result.length).toBe(CATALOG_MODULES.length);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].relevance).toBeGreaterThanOrEqual(result[i].relevance);
    }
  });

  it("with null dimensions returns modules unsorted (no crash)", () => {
    const result = getRecommendedModules(CATALOG_MODULES, null);
    expect(result.length).toBe(CATALOG_MODULES.length);
    for (const mod of result) {
      expect(mod.relevance).toBe(0);
    }
  });
});
