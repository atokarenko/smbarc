// Types for assessment results
export interface MaturityScore {
  overall: number;
  dimensions: {
    operations: number;
    sales: number;
    finance: number;
    team: number;
    risks: number;
  };
}

export interface RoadmapItem {
  name: string;
  description: string;
  priority: "high" | "medium" | "low";
  expectedImpact: string;
  timeline: string;
}

export interface RiskItem {
  category: string;
  level: "high" | "medium" | "low";
  description: string;
  mitigation: string;
}

export interface ROIItem {
  area: string;
  currentCost: number;
  projectedSaving: number;
  confidence: "high" | "medium" | "low";
}

export interface ROIForecast {
  totalSavings: number;
  timeframe: string;
  items: ROIItem[];
}

export interface AssessmentResults {
  maturityScore: MaturityScore;
  automationRoadmap: RoadmapItem[];
  riskMap: RiskItem[];
  roiForecast: ROIForecast;
}

export interface DemoCompany {
  name: string;
  industry: string;
  size: string;
  description: string;
  assessmentResults: AssessmentResults;
}

// ---- RetailFlow Inc. (Retail, beginner maturity ~25/100) ----

const retailFlowResults: AssessmentResults = {
  maturityScore: {
    overall: 25,
    dimensions: {
      operations: 20,
      sales: 15,
      finance: 30,
      team: 25,
      risks: 35,
    },
  },
  automationRoadmap: [
    {
      name: "Customer Service Chatbot",
      description:
        "Deploy an AI-powered chatbot to handle common customer inquiries, returns, and order tracking",
      priority: "high",
      expectedImpact: "Reduce support ticket volume by 40%, improve response time from hours to seconds",
      timeline: "2-3 months",
    },
    {
      name: "Inventory Demand Prediction",
      description:
        "Use ML models to forecast demand patterns and optimize stock levels across warehouses",
      priority: "high",
      expectedImpact: "Reduce overstock by 25%, decrease stockouts by 30%",
      timeline: "4-6 months",
    },
    {
      name: "Personalized Product Recommendations",
      description:
        "Implement collaborative filtering and content-based recommendation engine for e-commerce platform",
      priority: "medium",
      expectedImpact: "Increase average order value by 15%, improve conversion rate by 8%",
      timeline: "6-9 months",
    },
    {
      name: "Dynamic Pricing Engine",
      description:
        "AI-driven pricing optimization based on competitor analysis, demand signals, and inventory levels",
      priority: "low",
      expectedImpact: "Improve gross margins by 3-5%",
      timeline: "9-12 months",
    },
  ],
  riskMap: [
    {
      category: "Data Privacy",
      level: "high",
      description:
        "Customer purchase history and browsing data requires GDPR/CCPA compliance. Current data governance is minimal.",
      mitigation:
        "Implement data classification framework, appoint DPO, conduct privacy impact assessments before any AI deployment",
    },
    {
      category: "Operational Disruption",
      level: "medium",
      description:
        "Staff unfamiliar with AI tools. Risk of resistance and workflow disruption during chatbot rollout.",
      mitigation:
        "Phased rollout with human-in-the-loop. Training program for support staff. Gradual automation increase.",
    },
    {
      category: "Model Accuracy",
      level: "medium",
      description:
        "Limited historical data quality. Inventory predictions may be inaccurate initially.",
      mitigation:
        "Start with rule-based baseline, layer ML on top. A/B test predictions against manual forecasts for 3 months.",
    },
    {
      category: "Vendor Lock-in",
      level: "low",
      description:
        "Choosing a single AI platform may limit future flexibility.",
      mitigation:
        "Use open standards (ONNX, standard APIs). Maintain abstraction layer between AI services and business logic.",
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
        confidence: "high",
      },
      {
        area: "Inventory Management",
        currentCost: 800000,
        projectedSaving: 200000,
        confidence: "medium",
      },
      {
        area: "Marketing & Personalization",
        currentCost: 250000,
        projectedSaving: 50000,
        confidence: "low",
      },
      {
        area: "Pricing Optimization",
        currentCost: 0,
        projectedSaving: 26000,
        confidence: "low",
      },
    ],
  },
};

// ---- FinCore Solutions (Finance, intermediate maturity ~55/100) ----

const finCoreResults: AssessmentResults = {
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
      name: "Expand Fraud Detection ML",
      description:
        "Scale existing fraud detection model from credit cards to cover wire transfers, ACH, and crypto transactions",
      priority: "high",
      expectedImpact: "Reduce fraud losses by additional 20%, cover 3x more transaction types",
      timeline: "2-4 months",
    },
    {
      name: "Compliance Automation (KYC/AML)",
      description:
        "Automate Know Your Customer and Anti-Money Laundering checks using NLP document analysis and pattern detection",
      priority: "high",
      expectedImpact: "Reduce compliance review time by 60%, improve accuracy of flagging",
      timeline: "4-7 months",
    },
    {
      name: "AI Advisory Assistant",
      description:
        "Build an AI-powered assistant for financial advisors providing client portfolio insights and market analysis",
      priority: "medium",
      expectedImpact: "Increase advisor productivity by 30%, improve client satisfaction scores",
      timeline: "6-10 months",
    },
    {
      name: "Predictive Credit Scoring",
      description:
        "Replace legacy credit scoring with ML model using alternative data sources for more accurate risk assessment",
      priority: "medium",
      expectedImpact: "Improve default prediction accuracy by 15%, expand addressable market by 10%",
      timeline: "8-12 months",
    },
  ],
  riskMap: [
    {
      category: "Regulatory Compliance",
      level: "high",
      description:
        "Financial services AI must comply with SOX, PCI-DSS, and emerging AI regulations. Model explainability required by regulators.",
      mitigation:
        "Use interpretable models where possible. Maintain audit trails for all AI decisions. Engage regulatory counsel before deployment.",
    },
    {
      category: "Model Risk",
      level: "high",
      description:
        "Fraud detection model trained on historical data may have biases. Concept drift as fraud patterns evolve.",
      mitigation:
        "Implement model monitoring dashboard. Retrain quarterly. Maintain champion-challenger framework. Regular fairness audits.",
    },
    {
      category: "Data Silos",
      level: "medium",
      description:
        "ML models are siloed across departments. No unified feature store or data platform.",
      mitigation:
        "Invest in centralized data platform. Create shared feature store. Establish data governance committee.",
    },
    {
      category: "Talent Retention",
      level: "medium",
      description:
        "Small ML team (3 engineers). Key person risk for fraud detection model maintenance.",
      mitigation:
        "Document all models and pipelines. Cross-train team members. Consider MLOps platform to reduce manual work.",
    },
  ],
  roiForecast: {
    totalSavings: 890000,
    timeframe: "12 months",
    items: [
      {
        area: "Fraud Prevention",
        currentCost: 2000000,
        projectedSaving: 400000,
        confidence: "high",
      },
      {
        area: "Compliance Operations",
        currentCost: 1200000,
        projectedSaving: 300000,
        confidence: "medium",
      },
      {
        area: "Advisory Productivity",
        currentCost: 500000,
        projectedSaving: 150000,
        confidence: "medium",
      },
      {
        area: "Credit Assessment",
        currentCost: 300000,
        projectedSaving: 40000,
        confidence: "low",
      },
    ],
  },
};

// ---- TechManufact Ltd. (Manufacturing, advanced maturity ~78/100) ----

const techManufactResults: AssessmentResults = {
  maturityScore: {
    overall: 78,
    dimensions: {
      operations: 85,
      sales: 75,
      finance: 80,
      team: 70,
      risks: 80,
    },
  },
  automationRoadmap: [
    {
      name: "Enhanced Predictive Quality Control",
      description:
        "Upgrade computer vision defect detection with transformer-based models for sub-millimeter accuracy",
      priority: "high",
      expectedImpact: "Reduce defect escape rate by 50%, decrease quality inspection time by 35%",
      timeline: "2-4 months",
    },
    {
      name: "Demand Forecasting & Production Planning",
      description:
        "Integrate external market signals and supply chain data into production planning AI for dynamic scheduling",
      priority: "high",
      expectedImpact: "Improve forecast accuracy to 95%, reduce production waste by 20%",
      timeline: "3-6 months",
    },
    {
      name: "Autonomous Logistics Optimization",
      description:
        "AI-driven warehouse routing, load optimization, and delivery scheduling across distribution network",
      priority: "medium",
      expectedImpact: "Reduce logistics costs by 15%, improve on-time delivery to 99%",
      timeline: "6-9 months",
    },
    {
      name: "Digital Twin Simulation",
      description:
        "Build AI-powered digital twin of manufacturing floor for scenario planning and optimization",
      priority: "low",
      expectedImpact: "Enable 3x faster process optimization cycles, reduce downtime by 10%",
      timeline: "9-14 months",
    },
  ],
  riskMap: [
    {
      category: "Supply Chain Disruption",
      level: "medium",
      description:
        "AI models trained on stable supply chain data. Geopolitical disruptions can invalidate demand forecasts.",
      mitigation:
        "Build scenario-based models with disruption parameters. Maintain manual override capabilities. Diversify supplier data sources.",
    },
    {
      category: "Cybersecurity (OT/IT)",
      level: "medium",
      description:
        "IoT sensors and predictive maintenance systems expand attack surface. OT/IT convergence creates new vectors.",
      mitigation:
        "Implement zero-trust architecture for IoT. Air-gap critical control systems. Regular penetration testing of AI endpoints.",
    },
    {
      category: "Data Quality",
      level: "low",
      description:
        "Strong data infrastructure but sensor calibration drift can degrade model accuracy over time.",
      mitigation:
        "Automated data quality monitoring. Sensor health dashboard. Quarterly calibration schedule.",
    },
    {
      category: "Integration Complexity",
      level: "low",
      description:
        "Multiple AI systems need orchestration. Risk of conflicting optimization targets between quality and throughput.",
      mitigation:
        "Establish AI orchestration layer with priority rules. Define KPI hierarchy. Regular cross-system impact analysis.",
    },
  ],
  roiForecast: {
    totalSavings: 1350000,
    timeframe: "12 months",
    items: [
      {
        area: "Quality Control",
        currentCost: 1500000,
        projectedSaving: 525000,
        confidence: "high",
      },
      {
        area: "Production Planning",
        currentCost: 2000000,
        projectedSaving: 400000,
        confidence: "high",
      },
      {
        area: "Logistics",
        currentCost: 3000000,
        projectedSaving: 300000,
        confidence: "medium",
      },
      {
        area: "Maintenance & Downtime",
        currentCost: 1000000,
        projectedSaving: 125000,
        confidence: "medium",
      },
    ],
  },
};

// ---- Exported demo companies ----

export const DEMO_COMPANIES: DemoCompany[] = [
  {
    name: "RetailFlow Inc.",
    industry: "retail",
    size: "200 employees",
    description: "Mid-size e-commerce retailer exploring AI for customer experience and inventory optimization",
    assessmentResults: retailFlowResults,
  },
  {
    name: "FinCore Solutions",
    industry: "finance",
    size: "500 employees",
    description: "Fintech company with fraud detection ML in production, looking to expand AI across operations",
    assessmentResults: finCoreResults,
  },
  {
    name: "TechManufact Ltd.",
    industry: "manufacturing",
    size: "1000 employees",
    description: "Smart manufacturing leader with IoT and predictive maintenance, optimizing AI across the value chain",
    assessmentResults: techManufactResults,
  },
];
