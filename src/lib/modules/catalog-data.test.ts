import { describe, expect, it } from "vitest";
import { CATALOG_MODULES, MODULE_CATEGORIES, type CatalogModule } from "./catalog-data";

const VALID_DIMENSIONS = ["operations", "sales", "finance", "team", "risks"];
const REQUIRED_CATEGORIES = ["hr", "finance", "legal", "decision-making"];

describe("CATALOG_MODULES", () => {
  it("contains modules in all 4 categories", () => {
    const categories = [...new Set(CATALOG_MODULES.map((m) => m.category))];
    for (const cat of REQUIRED_CATEGORIES) {
      expect(categories).toContain(cat);
    }
  });

  it("every module has required fields", () => {
    for (const mod of CATALOG_MODULES) {
      expect(mod.id).toBeTruthy();
      expect(REQUIRED_CATEGORIES).toContain(mod.category);
      expect(mod.icon).toBeTruthy();
      expect(mod.relevantDimensions.length).toBeGreaterThan(0);
      expect(["high", "medium", "low"]).toContain(mod.impactLevel);
    }
  });

  it("all module IDs are unique", () => {
    const ids = CATALOG_MODULES.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("relevantDimensions only reference valid dimension keys", () => {
    for (const mod of CATALOG_MODULES) {
      for (const dim of mod.relevantDimensions) {
        expect(VALID_DIMENSIONS).toContain(dim);
      }
    }
  });
});

describe("MODULE_CATEGORIES", () => {
  it("contains all 4 category IDs", () => {
    for (const cat of REQUIRED_CATEGORIES) {
      expect(MODULE_CATEGORIES).toContain(cat);
    }
  });
});
