export interface AutomationCase {
  id: string;
  processName: string;
  category: "operations" | "sales" | "finance" | "hr" | "customer-service" | "compliance";
  applicableIndustries: string[];
  toolsCommonlyUsed: string[];
  implementationCost: {
    min: number;
    max: number;
    currency: string;
  };
  implementationWeeks: number;
  expectedSavings: {
    hoursPerWeek: number;
    dollarsPerMonth: number;
    errorReductionPercent: number;
  };
  paybackPeriodMonths: number;
  complexity: "low" | "medium" | "high";
  prerequisites: string[];
  successRate: string;
  description: string;
}
