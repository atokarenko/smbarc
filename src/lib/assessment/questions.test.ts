import { describe, it, expect } from "vitest";
import {
  ASSESSMENT_SECTIONS,
  getQuestionsForSection,
  getTotalQuestionCount,
} from "./questions";
import type { AssessmentSection } from "./types";
import { VALID_TRANSITIONS, type AssessmentStatus } from "./types";

describe("ASSESSMENT_SECTIONS", () => {
  it("has exactly 5 sections", () => {
    expect(ASSESSMENT_SECTIONS).toHaveLength(5);
  });

  it("covers all 5 dimensions", () => {
    const dimensions = ASSESSMENT_SECTIONS.map((s) => s.dimension);
    expect(dimensions).toContain("strategy");
    expect(dimensions).toContain("adoption");
    expect(dimensions).toContain("riskManagement");
    expect(dimensions).toContain("roiTracking");
    expect(dimensions).toContain("governance");
  });

  it("each section has 3-4 questions", () => {
    for (const section of ASSESSMENT_SECTIONS) {
      expect(section.questions.length).toBeGreaterThanOrEqual(3);
      expect(section.questions.length).toBeLessThanOrEqual(4);
    }
  });

  it("total question count is 15-20", () => {
    const total = getTotalQuestionCount();
    expect(total).toBeGreaterThanOrEqual(15);
    expect(total).toBeLessThanOrEqual(20);
  });

  it("every question has both en and ru text", () => {
    for (const section of ASSESSMENT_SECTIONS) {
      for (const q of section.questions) {
        expect(q.text.en).toBeTruthy();
        expect(q.text.ru).toBeTruthy();
        expect(typeof q.text.en).toBe("string");
        expect(typeof q.text.ru).toBe("string");
      }
    }
  });

  it("every question has a weight > 0", () => {
    for (const section of ASSESSMENT_SECTIONS) {
      for (const q of section.questions) {
        expect(q.weight).toBeGreaterThan(0);
        expect(typeof q.weight).toBe("number");
      }
    }
  });

  it("question ids are unique across all sections", () => {
    const allIds = ASSESSMENT_SECTIONS.flatMap((s) =>
      s.questions.map((q) => q.id)
    );
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });

  it("every section has bilingual name", () => {
    for (const section of ASSESSMENT_SECTIONS) {
      expect(section.name.en).toBeTruthy();
      expect(section.name.ru).toBeTruthy();
    }
  });

  it("every section has a unique id", () => {
    const ids = ASSESSMENT_SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("single-choice questions have options with en and ru", () => {
    for (const section of ASSESSMENT_SECTIONS) {
      for (const q of section.questions) {
        if (q.type === "single-choice") {
          expect(q.options).toBeDefined();
          expect(q.options!.length).toBeGreaterThan(0);
          for (const opt of q.options!) {
            expect(opt.en).toBeTruthy();
            expect(opt.ru).toBeTruthy();
          }
        }
      }
    }
  });
});

describe("getQuestionsForSection", () => {
  it("returns questions for valid section index", () => {
    const questions = getQuestionsForSection(0);
    expect(questions).toBeDefined();
    expect(questions.length).toBeGreaterThanOrEqual(3);
  });

  it("returns empty array for out-of-bounds index", () => {
    const questions = getQuestionsForSection(99);
    expect(questions).toEqual([]);
  });
});

describe("VALID_TRANSITIONS", () => {
  it("allows CREATED -> IN_PROGRESS", () => {
    expect(VALID_TRANSITIONS.CREATED).toContain("IN_PROGRESS");
  });

  it("allows IN_PROGRESS -> AI_FOLLOWUP", () => {
    expect(VALID_TRANSITIONS.IN_PROGRESS).toContain("AI_FOLLOWUP");
  });

  it("allows IN_PROGRESS -> CALCULATING", () => {
    expect(VALID_TRANSITIONS.IN_PROGRESS).toContain("CALCULATING");
  });

  it("allows AI_FOLLOWUP -> IN_PROGRESS", () => {
    expect(VALID_TRANSITIONS.AI_FOLLOWUP).toContain("IN_PROGRESS");
  });

  it("allows CALCULATING -> COMPLETE", () => {
    expect(VALID_TRANSITIONS.CALCULATING).toContain("COMPLETE");
  });

  it("blocks COMPLETE -> anything", () => {
    expect(VALID_TRANSITIONS.COMPLETE).toHaveLength(0);
  });

  it("blocks CREATED -> COMPLETE", () => {
    expect(VALID_TRANSITIONS.CREATED).not.toContain("COMPLETE");
  });

  it("blocks CREATED -> CALCULATING", () => {
    expect(VALID_TRANSITIONS.CREATED).not.toContain("CALCULATING");
  });
});
