export type Role = "ceo" | "coo" | "cto";

export interface RoleConfig {
  dashboardSections: string[];
  roadmapSort: "impact" | "timeline" | "technical";
  riskFocus: string[];
  roiView: "summary" | "detailed" | "technical";
}

export const ROLE_CONFIGS: Record<Role, RoleConfig> = {
  ceo: {
    dashboardSections: [
      "healthScore",
      "roiSummary",
      "topRisks",
      "roadmapHighlights",
    ],
    roadmapSort: "impact",
    riskFocus: ["financial", "reputational"],
    roiView: "summary",
  },
  coo: {
    dashboardSections: [
      "healthScore",
      "roadmapHighlights",
      "operationalRisks",
      "roiDetailed",
    ],
    roadmapSort: "timeline",
    riskFocus: ["operational", "process"],
    roiView: "detailed",
  },
  cto: {
    dashboardSections: [
      "healthScore",
      "technicalRoadmap",
      "dataRisks",
      "roiTechnical",
    ],
    roadmapSort: "technical",
    riskFocus: ["data", "security", "integration"],
    roiView: "technical",
  },
};

export function getRoleConfig(role: string): RoleConfig {
  if (role in ROLE_CONFIGS) {
    return ROLE_CONFIGS[role as Role];
  }
  return ROLE_CONFIGS.ceo;
}
