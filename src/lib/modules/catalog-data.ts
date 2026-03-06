export interface CatalogModule {
  id: string;
  category: "hr" | "finance" | "legal" | "decision-making";
  icon: string;
  relevantDimensions: string[];
  impactLevel: "high" | "medium" | "low";
}

export const MODULE_CATEGORIES = [
  "hr",
  "finance",
  "legal",
  "decision-making",
] as const;

export const CATALOG_MODULES: CatalogModule[] = [
  // HR (3)
  {
    id: "hiring-pipeline",
    category: "hr",
    icon: "UserSearch",
    relevantDimensions: ["team", "operations"],
    impactLevel: "high",
  },
  {
    id: "employee-onboarding",
    category: "hr",
    icon: "UserPlus",
    relevantDimensions: ["team", "operations"],
    impactLevel: "medium",
  },
  {
    id: "team-performance",
    category: "hr",
    icon: "BarChart3",
    relevantDimensions: ["team", "operations"],
    impactLevel: "medium",
  },

  // Finance (3)
  {
    id: "invoice-processing",
    category: "finance",
    icon: "Receipt",
    relevantDimensions: ["finance", "operations"],
    impactLevel: "high",
  },
  {
    id: "cash-flow-forecasting",
    category: "finance",
    icon: "TrendingUp",
    relevantDimensions: ["finance", "operations"],
    impactLevel: "high",
  },
  {
    id: "expense-automation",
    category: "finance",
    icon: "CreditCard",
    relevantDimensions: ["finance", "operations"],
    impactLevel: "medium",
  },

  // Legal (2)
  {
    id: "contract-review",
    category: "legal",
    icon: "FileSearch",
    relevantDimensions: ["risks", "finance"],
    impactLevel: "high",
  },
  {
    id: "compliance-monitoring",
    category: "legal",
    icon: "Shield",
    relevantDimensions: ["risks", "finance"],
    impactLevel: "medium",
  },

  // Decision Making (3)
  {
    id: "business-intelligence",
    category: "decision-making",
    icon: "LayoutDashboard",
    relevantDimensions: ["operations", "sales"],
    impactLevel: "high",
  },
  {
    id: "risk-assessment",
    category: "decision-making",
    icon: "AlertTriangle",
    relevantDimensions: ["operations", "sales"],
    impactLevel: "medium",
  },
  {
    id: "churn-prediction",
    category: "decision-making",
    icon: "UserMinus",
    relevantDimensions: ["operations", "sales"],
    impactLevel: "medium",
  },
];
