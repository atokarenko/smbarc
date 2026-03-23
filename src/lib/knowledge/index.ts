/**
 * Knowledge Base loader.
 * Loads curated industry benchmarks, automation cases, maturity rubrics,
 * and compliance data to enrich AI prompts with real-world context.
 */

import type { IndustryProfile } from "./industries/types";
import type { AutomationCase } from "./automation-cases/types";
import type { MaturityRubric } from "./benchmarks/types";
import type { ComplianceProfile } from "./compliance/types";

// Lazy-loaded knowledge modules
let _industries: Record<string, IndustryProfile> | null = null;
let _automationCases: AutomationCase[] | null = null;
let _maturityRubrics: Record<string, MaturityRubric> | null = null;
let _compliance: ComplianceProfile | null = null;

export async function getIndustryProfile(
  industry: string
): Promise<IndustryProfile | null> {
  if (!_industries) {
    _industries = (await import("./industries/data")).default;
  }
  // Try exact match, then fuzzy
  const key = industry.toLowerCase().replace(/[^a-z]/g, "");
  for (const [k, v] of Object.entries(_industries)) {
    if (k === key || k.includes(key) || key.includes(k)) return v;
  }
  return null;
}

export async function getAutomationCases(
  industry?: string,
  category?: string
): Promise<AutomationCase[]> {
  if (!_automationCases) {
    _automationCases = (await import("./automation-cases/data")).default;
  }
  let cases = _automationCases;
  if (industry) {
    cases = cases.filter((c) =>
      c.applicableIndustries.some(
        (i) => i.toLowerCase() === industry.toLowerCase()
      )
    );
  }
  if (category) {
    cases = cases.filter(
      (c) => c.category.toLowerCase() === category.toLowerCase()
    );
  }
  return cases;
}

export async function getMaturityRubric(
  dimension: string
): Promise<MaturityRubric | null> {
  if (!_maturityRubrics) {
    _maturityRubrics = (await import("./benchmarks/data")).default;
  }
  return _maturityRubrics[dimension] ?? null;
}

export async function getAllMaturityRubrics(): Promise<
  Record<string, MaturityRubric>
> {
  if (!_maturityRubrics) {
    _maturityRubrics = (await import("./benchmarks/data")).default;
  }
  return _maturityRubrics;
}

export async function getComplianceProfile(): Promise<ComplianceProfile> {
  if (!_compliance) {
    _compliance = (await import("./compliance/data")).default;
  }
  return _compliance;
}

/**
 * Build a knowledge context string for AI prompts based on company profile.
 * This is the main entry point — call it before constructing any AI prompt.
 */
export async function buildKnowledgeContext(params: {
  industry?: string;
  companySize?: string;
  dimensions?: string[];
}): Promise<string> {
  const parts: string[] = [];

  // Industry benchmarks
  if (params.industry) {
    const profile = await getIndustryProfile(params.industry);
    if (profile) {
      parts.push(`## Industry Benchmarks: ${profile.name}`);
      parts.push(`Industry: ${profile.name}`);
      parts.push(`Typical SMB characteristics: ${profile.description}`);
      parts.push("");
      parts.push("### Key Performance Indicators (industry norms for SMB):");
      parts.push(JSON.stringify(profile.benchmarks, null, 2));
      parts.push("");
      parts.push("### Common Pain Points in this industry:");
      for (const pain of profile.commonPainPoints) {
        parts.push(`- ${pain}`);
      }
      parts.push("");
      parts.push("### Top Automation Opportunities:");
      for (const opp of profile.topAutomationOpportunities) {
        parts.push(`- ${opp}`);
      }
    }
  }

  // Relevant automation cases
  if (params.industry) {
    const cases = await getAutomationCases(params.industry);
    if (cases.length > 0) {
      parts.push("");
      parts.push("## Automation Reference Data (real-world SMB cases):");
      for (const c of cases.slice(0, 8)) {
        parts.push(
          `- **${c.processName}**: Implementation $${c.implementationCost.min}-$${c.implementationCost.max}, ` +
            `saves ${c.expectedSavings.hoursPerWeek}h/week (~$${c.expectedSavings.dollarsPerMonth}/mo), ` +
            `payback ${c.paybackPeriodMonths}mo, complexity: ${c.complexity}`
        );
      }
    }
  }

  // Maturity rubrics for requested dimensions
  if (params.dimensions && params.dimensions.length > 0) {
    parts.push("");
    parts.push("## Maturity Scoring Rubrics:");
    parts.push(
      "Use these rubrics to calibrate your scoring. Each level has specific characteristics:"
    );
    for (const dim of params.dimensions) {
      const rubric = await getMaturityRubric(dim);
      if (rubric) {
        parts.push(`\n### ${rubric.dimensionName}:`);
        for (const level of rubric.levels) {
          parts.push(
            `- **${level.name} (${level.scoreRange})**: ${level.summary}`
          );
        }
      }
    }
  }

  // Compliance context
  if (params.industry) {
    const compliance = await getComplianceProfile();
    const industryCompliance =
      compliance.byIndustry[params.industry.toLowerCase()];
    if (industryCompliance) {
      parts.push("");
      parts.push("## Compliance Context:");
      parts.push(
        `Key regulations for ${params.industry}: ${industryCompliance.keyRegulations.join(", ")}`
      );
      parts.push(
        `Common compliance gaps: ${industryCompliance.commonGaps.join("; ")}`
      );
    }
  }

  return parts.join("\n");
}
