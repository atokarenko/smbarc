export interface IndustryBenchmarks {
  operational: {
    avgOrderProcessingTime?: string;
    errorRate?: string;
    employeeProductivity?: string;
    inventoryTurnover?: string;
  };
  sales: {
    customerAcquisitionCost: string;
    customerLifetimeValue: string;
    conversionRate: string;
    churnRate: string;
    avgSalesCycleDays: number;
  };
  financial: {
    profitMargin: string;
    revenuePerEmployee: string;
    operatingCostRatio: string;
    daysSalesOutstanding: number;
  };
  hr: {
    employeeTurnoverRate: string;
    timeToHireDays: number;
    trainingCostPerEmployee: string;
    avgTenureYears: number;
  };
  technology: {
    crmAdoption: string;
    erpAdoption: string;
    aiAdoption: string;
    itSpendPercent: string;
  };
}

export interface IndustryProfile {
  id: string;
  name: string;
  description: string;
  benchmarks: IndustryBenchmarks;
  commonPainPoints: string[];
  topAutomationOpportunities: string[];
  typicalCompanySize: string;
  avgRevenueRange: string;
}
