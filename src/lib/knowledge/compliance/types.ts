export interface ComplianceRequirement {
  name: string;
  description: string;
  severity: "critical" | "important" | "recommended";
  typicalCostToComply: string;
  commonMistakes: string[];
  actionableSteps: string[];
}

export interface IndustryCompliance {
  industry: string;
  keyRegulations: string[];
  dataHandlingRequirements: string[];
  aiRestrictions: string[];
  commonGaps: string[];
  certifications: string[];
}

export interface ComplianceProfile {
  general: {
    gdpr: ComplianceRequirement[];
    aiAct: ComplianceRequirement[];
    dataProtection: ComplianceRequirement[];
  };
  byIndustry: Record<string, IndustryCompliance>;
  aiImplementationChecklist: {
    preImplementation: string[];
    duringImplementation: string[];
    ongoingMonitoring: string[];
  };
}
