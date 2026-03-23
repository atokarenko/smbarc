import type { AutomationCase } from "./types";

/**
 * 20 real-world automation use cases for SMB businesses.
 * Each entry is backed by published benchmarks, vendor case studies,
 * or industry surveys (2024-2026 data).
 *
 * Sources referenced during compilation:
 * - CoreIntegrator AP case study; Thryv invoice automation ROI
 * - NetSuite AP automation business case 2025
 * - Parseur AI invoice processing benchmarks 2026
 * - Freshworks AI customer service ROI 2025; ebi.ai chatbot statistics
 * - EmailMonday / DemandSage email marketing ROI 2026
 * - Landbase lead scoring statistics 2025; Thunderbit marketing automation stats
 * - SmartDev AI inventory management; SupplyChainBrain warehouse automation ROI
 * - HR Cloud onboarding ROI; Newployee onboarding statistics 2025
 * - Braincuber AI document processing case study; Parseur AI automation use cases
 * - Nutshell CRM statistics 2025; Utmost Agency sales automation statistics 2026
 * - getlate.dev social media scheduling ROI 2025; templated.io social media automation
 * - Patriot Software payroll trends 2025; LiftHCM payroll software ROI
 * - SpotDraft ROI of AI in legal tech; Loio contract management statistics 2025
 * - Eightgen AI demand forecasting case study; SR Analytics retail forecasting
 * - Jidoka AI visual inspection case studies; UnitX Labs automated inspection ROI 2025
 * - P0STMAN AI appointment scheduling guide 2025; Qued ROI calculator
 * - Emburse expense management automation; FyleHQ expense management software ROI
 * - HerohuntAI recruiting 2025 year in review; Second Talent AI recruitment statistics
 * - ExpressAnalytics customer churn prediction; Intuz AI/ML churn prediction
 * - Master of Code AI dynamic pricing; Entefy dynamic pricing
 * - Secureframe compliance statistics 2026; InfluenceFlow compliance monitoring 2025
 * - Functionize automated report generation; BlazeSQL automated BI 2026
 */

const automationCases: AutomationCase[] = [
  // ──────────────────────────────────────────────────────────────────
  // 1. Invoice / AP Automation
  // ──────────────────────────────────────────────────────────────────
  {
    id: "invoice-ap-automation",
    processName: "Invoice / Accounts Payable Automation",
    category: "finance",
    applicableIndustries: [
      "Retail",
      "Manufacturing",
      "Professional Services",
      "Healthcare",
      "Construction",
      "Logistics",
    ],
    toolsCommonlyUsed: [
      "Bill.com",
      "QuickBooks AP Automation",
      "SAP Concur",
      "Tipalti",
      "AvidXchange",
      "Melio",
    ],
    implementationCost: { min: 2000, max: 15000, currency: "USD" },
    implementationWeeks: 4,
    expectedSavings: {
      hoursPerWeek: 12,
      dollarsPerMonth: 3200,
      errorReductionPercent: 80,
    },
    paybackPeriodMonths: 5,
    complexity: "low",
    prerequisites: [
      "Existing accounting software (QuickBooks, Xero, etc.)",
      "Digital invoice receipt workflow",
      "Chart of accounts defined",
    ],
    successRate: "85% of SMBs see positive ROI within 12 months",
    description:
      "Automates the capture, coding, approval routing, and payment of vendor invoices. " +
      "Per-invoice processing cost drops from ~$20 (manual) to under $5 (automated), " +
      "an 80% reduction. NovaPay Technologies case study: reduced team from 12 to 3, " +
      "processing 4,000 invoices/month at $3.80 each, saving $870K in year one. " +
      "Best-in-class AP benchmark is $2.78/invoice vs $12.88 industry average (2025). " +
      "Source: CoreIntegrator AP case study; NetSuite 2025 AP business case.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 2. Customer Support Chatbot
  // ──────────────────────────────────────────────────────────────────
  {
    id: "customer-support-chatbot",
    processName: "Customer Support Chatbot",
    category: "customer-service",
    applicableIndustries: [
      "Retail",
      "E-commerce",
      "SaaS",
      "Financial Services",
      "Healthcare",
      "Hospitality",
    ],
    toolsCommonlyUsed: [
      "Intercom",
      "Zendesk AI",
      "Freshdesk Freddy AI",
      "Tidio",
      "Drift",
      "ChatGPT API (custom)",
    ],
    implementationCost: { min: 3000, max: 25000, currency: "USD" },
    implementationWeeks: 6,
    expectedSavings: {
      hoursPerWeek: 20,
      dollarsPerMonth: 4800,
      errorReductionPercent: 35,
    },
    paybackPeriodMonths: 4,
    complexity: "medium",
    prerequisites: [
      "Documented FAQ / knowledge base",
      "Defined escalation paths for complex issues",
      "Customer interaction data (chat logs, tickets)",
      "CRM or helpdesk system in place",
    ],
    successRate: "90% of CX leaders report positive ROI from AI tools (Freshworks 2025)",
    description:
      "AI chatbot handles up to 70% of common customer inquiries 24/7, reducing ticket " +
      "volume by 35% and cutting first-response times by up to 90%. SMBs save ~$24,000/year " +
      "in support costs with 8+ hours of agent time freed daily. Average return is $8 for " +
      "every $1 invested. 57% of companies report significant ROI within the first year. " +
      "Source: Freshworks 2025 AI in CX report; ebi.ai 2025 chatbot statistics.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 3. Email Marketing Automation
  // ──────────────────────────────────────────────────────────────────
  {
    id: "email-marketing-automation",
    processName: "Email Marketing Automation",
    category: "sales",
    applicableIndustries: [
      "Retail",
      "E-commerce",
      "SaaS",
      "Professional Services",
      "Real Estate",
      "Education",
    ],
    toolsCommonlyUsed: [
      "Mailchimp",
      "HubSpot Email",
      "ActiveCampaign",
      "Klaviyo",
      "ConvertKit",
      "Brevo (Sendinblue)",
    ],
    implementationCost: { min: 500, max: 5000, currency: "USD" },
    implementationWeeks: 2,
    expectedSavings: {
      hoursPerWeek: 8,
      dollarsPerMonth: 2500,
      errorReductionPercent: 60,
    },
    paybackPeriodMonths: 2,
    complexity: "low",
    prerequisites: [
      "Email list with opt-in subscribers (500+)",
      "Content strategy or campaign plan",
      "Website or landing pages for conversion tracking",
    ],
    successRate: "81% of SMBs actively use email marketing for customer acquisition",
    description:
      "Automated drip campaigns, welcome sequences, abandoned cart flows, and re-engagement " +
      "campaigns. Average ROI is $36-$40 per $1 spent (3,600% ROI). Automated emails drive " +
      "320% more revenue than non-automated emails. AI-enhanced campaigns show 25-122% higher " +
      "open rates and 50-211% increases in click-through rates. Lead nurturing automation " +
      "produces 451% more qualified prospects. " +
      "Source: EmailMonday ROI statistics 2026; DemandSage email marketing statistics.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 4. Lead Scoring / Qualification
  // ──────────────────────────────────────────────────────────────────
  {
    id: "lead-scoring-qualification",
    processName: "Lead Scoring & Qualification",
    category: "sales",
    applicableIndustries: [
      "SaaS",
      "Professional Services",
      "Financial Services",
      "Real Estate",
      "Manufacturing (B2B)",
      "Insurance",
    ],
    toolsCommonlyUsed: [
      "HubSpot Lead Scoring",
      "Salesforce Einstein",
      "Marketo",
      "ActiveCampaign",
      "Zoho CRM",
      "Pardot",
    ],
    implementationCost: { min: 3000, max: 20000, currency: "USD" },
    implementationWeeks: 6,
    expectedSavings: {
      hoursPerWeek: 10,
      dollarsPerMonth: 3500,
      errorReductionPercent: 50,
    },
    paybackPeriodMonths: 6,
    complexity: "medium",
    prerequisites: [
      "CRM with historical deal data (6+ months)",
      "Defined ideal customer profile (ICP)",
      "Marketing + sales alignment on lead handoff criteria",
      "Minimum 200-500 leads per month for effective scoring",
    ],
    successRate: "76% of companies see positive ROI within the first year (marketing automation)",
    description:
      "ML-based lead scoring delivers ~75% higher conversion rates and 20% increase in " +
      "sales productivity. Reps contacting leads within 5 minutes see 900% more conversions " +
      "than 10-minute wait. Average $5.44 ROI per $1 spent over 3 years. Only 44% of " +
      "organizations currently use lead scoring, leaving major competitive advantage on " +
      "the table. Automating CRM data entry saves 17% of admin time. " +
      "Source: Landbase lead scoring statistics 2025; Thunderbit marketing automation stats 2026.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 5. Inventory Management Automation
  // ──────────────────────────────────────────────────────────────────
  {
    id: "inventory-management",
    processName: "Inventory Management Automation",
    category: "operations",
    applicableIndustries: [
      "Retail",
      "E-commerce",
      "Manufacturing",
      "Food & Beverage",
      "Wholesale Distribution",
      "Hospitality",
    ],
    toolsCommonlyUsed: [
      "TradeGecko / QuickBooks Commerce",
      "Cin7",
      "Fishbowl",
      "inFlow",
      "Shopify Inventory",
      "NetSuite",
    ],
    implementationCost: { min: 5000, max: 30000, currency: "USD" },
    implementationWeeks: 8,
    expectedSavings: {
      hoursPerWeek: 15,
      dollarsPerMonth: 4500,
      errorReductionPercent: 45,
    },
    paybackPeriodMonths: 8,
    complexity: "medium",
    prerequisites: [
      "SKU-level product catalog",
      "POS or e-commerce platform integration",
      "Historical sales data (12+ months for forecasting)",
      "Barcode/scanning infrastructure (recommended)",
    ],
    successRate: "25% of adopting businesses save over $20,000 annually",
    description:
      "Automated reorder points, real-time stock tracking, and demand-based replenishment. " +
      "Studies show 25-35% improvement in inventory accuracy, 20-30% reduction in carrying " +
      "costs, and 35-45% fewer stockouts. Manual processing time reduced by 60%. A UK cafe " +
      "cut waste by 12% saving thousands annually. Demand forecasting accuracy improves 40%. " +
      "Source: ResearchGate IoT inventory SME study; SmartDev AI inventory management 2025.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 6. Employee Onboarding Automation
  // ──────────────────────────────────────────────────────────────────
  {
    id: "employee-onboarding",
    processName: "Employee Onboarding Automation",
    category: "hr",
    applicableIndustries: [
      "All Industries",
      "Retail",
      "Healthcare",
      "Technology",
      "Professional Services",
      "Hospitality",
    ],
    toolsCommonlyUsed: [
      "BambooHR",
      "Rippling",
      "Gusto",
      "Workday",
      "Monday.com",
      "n8n / Zapier",
    ],
    implementationCost: { min: 2000, max: 12000, currency: "USD" },
    implementationWeeks: 4,
    expectedSavings: {
      hoursPerWeek: 6,
      dollarsPerMonth: 1500,
      errorReductionPercent: 55,
    },
    paybackPeriodMonths: 6,
    complexity: "low",
    prerequisites: [
      "Documented onboarding checklist / procedures",
      "HR information system (HRIS)",
      "IT provisioning process defined",
      "Employee handbook / policy documents",
    ],
    successRate: "67% of organizations have adopted digital onboarding (2025)",
    description:
      "Automates paperwork, IT provisioning, training scheduling, and compliance forms. " +
      "Reduces onboarding time from ~3 hours to under 30 minutes per hire. Companies see " +
      "16% better retention rates and 40% ROI increase within the first year. AI onboarding " +
      "saves $18,000+ annually on average, with 60% revenue increase per FTE at mature " +
      "implementations. 51% of companies with 50-99 employees already use AI in onboarding. " +
      "Source: HR Cloud onboarding ROI; Newployee onboarding statistics 2025.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 7. Document Processing (OCR / AI)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "document-processing-ocr",
    processName: "Document Processing (OCR / AI)",
    category: "operations",
    applicableIndustries: [
      "Financial Services",
      "Insurance",
      "Healthcare",
      "Legal",
      "Logistics",
      "Government",
    ],
    toolsCommonlyUsed: [
      "ABBYY FlexiCapture",
      "Docsumo",
      "Rossum",
      "Google Document AI",
      "AWS Textract",
      "Parseur",
    ],
    implementationCost: { min: 5000, max: 25000, currency: "USD" },
    implementationWeeks: 6,
    expectedSavings: {
      hoursPerWeek: 18,
      dollarsPerMonth: 4400,
      errorReductionPercent: 90,
    },
    paybackPeriodMonths: 4,
    complexity: "medium",
    prerequisites: [
      "Volume of documents to process (100+/month for ROI)",
      "Defined document types and extraction fields",
      "Downstream system for extracted data (ERP, CRM, database)",
      "Sample documents for model training/tuning",
    ],
    successRate: "85%+ of mid-market companies see 20-40% processing time reduction in pilot phase",
    description:
      "AI-powered extraction from invoices, receipts, contracts, and forms with 99% accuracy. " +
      "Processing time drops 87-98%: e.g., from 4.8 hours to 3.2 minutes per batch. One case " +
      "showed $24,300 implementation cost vs $52,645 direct labor savings = 217% first-year ROI. " +
      "Logistics company reduced per-file processing from 7 min to 30 sec (>90% reduction). " +
      "Manual data entry costs $28,500/employee/year on average. " +
      "Source: Braincuber AI document case study; Parseur AI automation use cases 2025.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 8. Sales CRM Automation
  // ──────────────────────────────────────────────────────────────────
  {
    id: "sales-crm-automation",
    processName: "Sales CRM Automation",
    category: "sales",
    applicableIndustries: [
      "SaaS",
      "Professional Services",
      "Real Estate",
      "Insurance",
      "Manufacturing (B2B)",
      "Wholesale",
    ],
    toolsCommonlyUsed: [
      "HubSpot CRM",
      "Salesforce",
      "Pipedrive",
      "Zoho CRM",
      "Freshsales",
      "Close",
    ],
    implementationCost: { min: 1500, max: 15000, currency: "USD" },
    implementationWeeks: 4,
    expectedSavings: {
      hoursPerWeek: 10,
      dollarsPerMonth: 2800,
      errorReductionPercent: 40,
    },
    paybackPeriodMonths: 4,
    complexity: "low",
    prerequisites: [
      "Defined sales process / pipeline stages",
      "Contact and lead data digitized",
      "Sales team buy-in and training plan",
      "Email integration capability",
    ],
    successRate: "CRM returns $8.71 for every dollar spent on average",
    description:
      "Automates data entry, follow-up sequences, deal progression, and reporting. Sales " +
      "teams save 4-5 hours/week on admin tasks and see 34% productivity boost. CRM " +
      "automation reduces administrative tasks by up to 80%, shortens sales cycles by " +
      "8-14%, and when properly implemented ROI can increase by 245%. " +
      "75% of small businesses have invested in AI CRM tools. " +
      "Source: Nutshell CRM statistics 2025; Utmost Agency sales automation statistics 2026.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 9. Social Media Management Automation
  // ──────────────────────────────────────────────────────────────────
  {
    id: "social-media-management",
    processName: "Social Media Management Automation",
    category: "sales",
    applicableIndustries: [
      "Retail",
      "E-commerce",
      "Hospitality",
      "Professional Services",
      "Food & Beverage",
      "Real Estate",
    ],
    toolsCommonlyUsed: [
      "Hootsuite",
      "Buffer",
      "Sprout Social",
      "Later",
      "SocialBee",
      "Canva + scheduling tools",
    ],
    implementationCost: { min: 500, max: 5000, currency: "USD" },
    implementationWeeks: 2,
    expectedSavings: {
      hoursPerWeek: 8,
      dollarsPerMonth: 1300,
      errorReductionPercent: 25,
    },
    paybackPeriodMonths: 2,
    complexity: "low",
    prerequisites: [
      "Active social media accounts (2+ platforms)",
      "Content calendar or brand guidelines",
      "Visual assets (photos, brand templates)",
    ],
    successRate: "78% of marketers use social media management platforms (HubSpot 2025)",
    description:
      "Scheduling, cross-posting, analytics, and AI-assisted content creation across platforms. " +
      "Teams save 12 hours/week on average; posting across 5 platforms manually takes 8-10 " +
      "hours/week vs 1-2 hours with automation (70% workload reduction). Saving 6 hours/week " +
      "at $50/hr reclaims $1,300/month. Marketing automation tools return $5.44 per $1 invested. " +
      "One brand documented saving 52 hours per month through automation workflows. " +
      "Source: getlate.dev social media scheduling ROI 2025; Content Marketing Institute 2025.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 10. Payroll Automation
  // ──────────────────────────────────────────────────────────────────
  {
    id: "payroll-automation",
    processName: "Payroll Automation",
    category: "finance",
    applicableIndustries: [
      "All Industries",
      "Retail",
      "Hospitality",
      "Healthcare",
      "Construction",
      "Professional Services",
    ],
    toolsCommonlyUsed: [
      "Gusto",
      "ADP Run",
      "Paychex Flex",
      "Rippling",
      "OnPay",
      "QuickBooks Payroll",
    ],
    implementationCost: { min: 1000, max: 8000, currency: "USD" },
    implementationWeeks: 3,
    expectedSavings: {
      hoursPerWeek: 5,
      dollarsPerMonth: 1200,
      errorReductionPercent: 70,
    },
    paybackPeriodMonths: 3,
    complexity: "low",
    prerequisites: [
      "Employee data (W-4s, direct deposit info)",
      "Time tracking system in place",
      "State/federal tax ID numbers",
      "Chart of accounts for payroll GL coding",
    ],
    successRate: "131% total ROI reported by companies switching to integrated payroll systems",
    description:
      "Automates pay calculations, tax withholdings, filings, direct deposits, and compliance. " +
      "Small businesses save 8+ hours per pay period (90% time reduction). 75% of ADP customers " +
      "spend 15 minutes or less running payroll. 31% fewer errors and 70% fewer compliance " +
      "issues. 40% of small businesses incur ~$845/year in IRS penalties from manual errors " +
      "that automation eliminates. Payback within 3-4 months. " +
      "Source: Patriot Software payroll trends 2025; LiftHCM payroll software ROI.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 11. Contract Review (AI)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "ai-contract-review",
    processName: "AI Contract Review",
    category: "compliance",
    applicableIndustries: [
      "SaaS",
      "Professional Services",
      "Real Estate",
      "Financial Services",
      "Healthcare",
      "Manufacturing",
    ],
    toolsCommonlyUsed: [
      "Ironclad",
      "SpotDraft",
      "ContractPodAi",
      "Juro",
      "LinkSquares",
      "Lexion",
    ],
    implementationCost: { min: 3000, max: 15000, currency: "USD" },
    implementationWeeks: 6,
    expectedSavings: {
      hoursPerWeek: 10,
      dollarsPerMonth: 3000,
      errorReductionPercent: 65,
    },
    paybackPeriodMonths: 5,
    complexity: "medium",
    prerequisites: [
      "Library of existing contracts / templates",
      "Defined acceptable clause language and risk thresholds",
      "Legal review workflow documented",
      "Contract volume of 10+ per month",
    ],
    successRate: "449% ROI reported for CLM platforms (Forrester TEI study)",
    description:
      "AI reviews NDAs in ~26 seconds vs 92 minutes for humans at 94% accuracy. Redlining " +
      "cycles cut by 45-90% and costs reduced by one-third. If AI saves 20 hours/week for " +
      "a team valued at $150/hr, that is $156,000 saved annually. Corporate legal AI adoption " +
      "doubled from 23% (2024) to 52% (2025). Review time reduced 75-85% overall. " +
      "SMB tools start at $3,000-$8,000/year for small teams. " +
      "Source: SpotDraft ROI of AI in legal tech; Loio contract management statistics 2025.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 12. Demand Forecasting
  // ──────────────────────────────────────────────────────────────────
  {
    id: "demand-forecasting",
    processName: "AI Demand Forecasting",
    category: "operations",
    applicableIndustries: [
      "Retail",
      "E-commerce",
      "Manufacturing",
      "Food & Beverage",
      "Wholesale Distribution",
      "Hospitality",
    ],
    toolsCommonlyUsed: [
      "RELEX Solutions",
      "Blue Yonder",
      "Forecast Pro",
      "Amazon Forecast",
      "Lokad",
      "NetSuite Demand Planning",
    ],
    implementationCost: { min: 10000, max: 50000, currency: "USD" },
    implementationWeeks: 12,
    expectedSavings: {
      hoursPerWeek: 10,
      dollarsPerMonth: 8000,
      errorReductionPercent: 50,
    },
    paybackPeriodMonths: 8,
    complexity: "high",
    prerequisites: [
      "24+ months of historical sales data",
      "Clean product hierarchy / SKU data",
      "ERP or inventory system integration",
      "Defined demand planning process and KPIs",
    ],
    successRate: "Phased implementations see 83% project success rate and 142% initial ROI",
    description:
      "AI models improve forecast accuracy from ~67% to 91%, reduce stockouts by 72%, and " +
      "cut excess inventory by 31%. One retailer achieved 342% ROI in year one with $2.3M " +
      "less in markdown losses. Industry-wide: 20-50% better forecast accuracy within months. " +
      "Inventory reductions of 20-30% (up to 50% for specific categories) = working capital " +
      "improvement of $15-20M per billion in revenue. Phased rollout recommended. " +
      "Source: Eightgen AI retail case study; SR Analytics retail demand forecasting guide.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 13. Quality Control (Visual AI)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "visual-ai-quality-control",
    processName: "Quality Control (Visual AI Inspection)",
    category: "operations",
    applicableIndustries: [
      "Manufacturing",
      "Food & Beverage",
      "Electronics",
      "Automotive",
      "Pharmaceuticals",
      "Textiles",
    ],
    toolsCommonlyUsed: [
      "Landing AI",
      "Cognex ViDi",
      "Neurala",
      "Instrumental",
      "UnitX",
      "Custom computer vision (TensorFlow / PyTorch)",
    ],
    implementationCost: { min: 15000, max: 75000, currency: "USD" },
    implementationWeeks: 12,
    expectedSavings: {
      hoursPerWeek: 20,
      dollarsPerMonth: 10000,
      errorReductionPercent: 85,
    },
    paybackPeriodMonths: 10,
    complexity: "high",
    prerequisites: [
      "Camera / sensor hardware on production line",
      "Labeled defect image dataset (minimum 50-100 samples)",
      "Defined quality standards and defect categories",
      "Network infrastructure at inspection points",
    ],
    successRate: "374% average three-year ROI with 6-12 month payback",
    description:
      "AI visual inspection pushes accuracy past 99% vs 85% for manual inspection. " +
      "Manufacturers report 40% less waste and 25% faster inspection cycles. Annual labor " +
      "savings of $100K-$300K (up to $691K per production line in electronics). Scrap " +
      "reduction of 15-20%. Modern platforms can be fine-tuned in hours with as few as " +
      "5 images. Pilot deployment in 10-16 weeks. " +
      "Source: Jidoka AI visual inspection case studies; UnitX Labs ROI of automated inspection 2025.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 14. Appointment Scheduling
  // ──────────────────────────────────────────────────────────────────
  {
    id: "appointment-scheduling",
    processName: "Appointment Scheduling Automation",
    category: "operations",
    applicableIndustries: [
      "Healthcare",
      "Professional Services",
      "Beauty & Wellness",
      "Legal",
      "Financial Services",
      "Education",
    ],
    toolsCommonlyUsed: [
      "Calendly",
      "Acuity Scheduling",
      "Square Appointments",
      "Setmore",
      "SimplyBook.me",
      "AI phone agents (e.g., Bland.ai)",
    ],
    implementationCost: { min: 500, max: 10000, currency: "USD" },
    implementationWeeks: 2,
    expectedSavings: {
      hoursPerWeek: 10,
      dollarsPerMonth: 2000,
      errorReductionPercent: 70,
    },
    paybackPeriodMonths: 2,
    complexity: "low",
    prerequisites: [
      "Staff calendars accessible digitally",
      "Defined service types and durations",
      "Customer contact information",
      "Website or landing page for booking widget",
    ],
    successRate: "67% of consumers prefer online booking; 30-45% revenue increase with scheduling software",
    description:
      "AI scheduling automates 95% of booking calls and requests: calendar checks, " +
      "confirmations, reschedules, and reminders. Saves 20-40 hours/week for businesses " +
      "handling 20+ daily appointment requests. Typical ROI: $48,000/year with 3.2-month " +
      "payback. No-show rates drop significantly with automated reminders. " +
      "Businesses see 24% increase in call volume and 30-45% revenue increase. " +
      "Source: P0STMAN AI scheduling guide 2025; Qued ROI calculator.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 15. Expense Management
  // ──────────────────────────────────────────────────────────────────
  {
    id: "expense-management",
    processName: "Expense Management Automation",
    category: "finance",
    applicableIndustries: [
      "All Industries",
      "Professional Services",
      "Technology",
      "Construction",
      "Sales Organizations",
      "Consulting",
    ],
    toolsCommonlyUsed: [
      "Expensify",
      "Brex",
      "Ramp",
      "SAP Concur",
      "Emburse",
      "Fyle",
    ],
    implementationCost: { min: 500, max: 5000, currency: "USD" },
    implementationWeeks: 2,
    expectedSavings: {
      hoursPerWeek: 5,
      dollarsPerMonth: 1200,
      errorReductionPercent: 58,
    },
    paybackPeriodMonths: 3,
    complexity: "low",
    prerequisites: [
      "Corporate credit cards or reimbursement process",
      "Expense policy documented",
      "Accounting software for GL integration",
    ],
    successRate: "240% average ROI with payback in 6-9 months",
    description:
      "Automates receipt capture, categorization, policy compliance checks, and reimbursement. " +
      "Average expense report drops from $58 to process to ~$24 (58% cost reduction). " +
      "19% of reports contain errors ($52 + 18 min rework each); automation cuts errors by " +
      "32%. Smart booking tools reduce trip booking from 45 min to 5 min. 70% of companies " +
      "with automated AP report significant cost savings. " +
      "Source: Emburse expense management automation; FyleHQ expense management software ROI.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 16. HR Recruiting / Screening
  // ──────────────────────────────────────────────────────────────────
  {
    id: "hr-recruiting-screening",
    processName: "HR Recruiting & Resume Screening Automation",
    category: "hr",
    applicableIndustries: [
      "Technology",
      "Healthcare",
      "Retail",
      "Professional Services",
      "Financial Services",
      "Manufacturing",
    ],
    toolsCommonlyUsed: [
      "Greenhouse",
      "Lever",
      "BambooHR ATS",
      "Workable",
      "HireVue",
      "Manatal",
    ],
    implementationCost: { min: 3000, max: 20000, currency: "USD" },
    implementationWeeks: 6,
    expectedSavings: {
      hoursPerWeek: 15,
      dollarsPerMonth: 3500,
      errorReductionPercent: 56,
    },
    paybackPeriodMonths: 5,
    complexity: "medium",
    prerequisites: [
      "Job descriptions and competency frameworks",
      "Applicant tracking system (ATS) or willingness to adopt one",
      "Hiring volume of 5+ positions per month",
      "Historical hiring data for model calibration",
    ],
    successRate: "93% of companies using AI in HR report cost savings; 340% ROI within 18 months",
    description:
      "AI screening tools reduce resume review time by 75% with 89-94% accuracy. " +
      "Overall hiring costs drop 30% per hire and time-to-hire decreases 33%. " +
      "Predictive models reduce bad hires by 75% and improve retention by 34%. " +
      "AI-selected candidates are 14% more likely to pass interviews. Properly " +
      "implemented AI reduces hiring bias by 56-61%. 67% of organizations now use " +
      "AI in recruitment (189% growth since 2022). " +
      "Source: HerohuntAI recruiting 2025 review; Second Talent AI recruitment statistics 2026.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 17. Customer Churn Prediction
  // ──────────────────────────────────────────────────────────────────
  {
    id: "customer-churn-prediction",
    processName: "Customer Churn Prediction",
    category: "sales",
    applicableIndustries: [
      "SaaS",
      "Telecommunications",
      "Financial Services",
      "Insurance",
      "E-commerce (subscription)",
      "Media & Entertainment",
    ],
    toolsCommonlyUsed: [
      "Gainsight",
      "ChurnZero",
      "Amplitude",
      "Mixpanel",
      "Zendesk (predictive)",
      "Custom ML models (Python / BigQuery ML)",
    ],
    implementationCost: { min: 10000, max: 50000, currency: "USD" },
    implementationWeeks: 12,
    expectedSavings: {
      hoursPerWeek: 8,
      dollarsPerMonth: 5000,
      errorReductionPercent: 40,
    },
    paybackPeriodMonths: 10,
    complexity: "high",
    prerequisites: [
      "Customer usage / engagement data (12+ months)",
      "Defined churn events and tracking",
      "Customer success or retention team",
      "CRM with customer health metrics",
    ],
    successRate: "46% of SaaS companies now use churn prediction models; 5:1 to 15:1 ROI within 2 years",
    description:
      "AI identifies at-risk customers with 85-90% accuracy (88.6% reported benchmark). " +
      "Reducing churn by just 5% increases profits 25-95%. Acquiring new customers costs " +
      "5-7x more than retaining existing ones. Effective churn management delivers 16x ROI. " +
      "AI reduces churn by 10-15% over 18 months. Full deployment takes 6-12 months with " +
      "ROI realization in 3-6 months post-deployment. " +
      "Source: ExpressAnalytics churn prediction guide; Intuz AI/ML churn prediction.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 18. Dynamic Pricing
  // ──────────────────────────────────────────────────────────────────
  {
    id: "dynamic-pricing",
    processName: "Dynamic Pricing Automation",
    category: "sales",
    applicableIndustries: [
      "E-commerce",
      "Retail",
      "Hospitality",
      "Travel & Transportation",
      "SaaS",
      "Wholesale Distribution",
    ],
    toolsCommonlyUsed: [
      "Prisync",
      "Intelligence Node",
      "Competera",
      "Dynamic Yield",
      "Pricemoov",
      "Custom ML models",
    ],
    implementationCost: { min: 8000, max: 40000, currency: "USD" },
    implementationWeeks: 10,
    expectedSavings: {
      hoursPerWeek: 8,
      dollarsPerMonth: 6000,
      errorReductionPercent: 35,
    },
    paybackPeriodMonths: 6,
    complexity: "high",
    prerequisites: [
      "Product pricing history (12+ months)",
      "Competitor pricing data or monitoring",
      "E-commerce platform or POS integration",
      "Defined pricing rules and margin floors",
    ],
    successRate: "61% of European retailers have adopted dynamic pricing (Valcon research)",
    description:
      "AI continuously adjusts prices based on demand, competition, inventory, and market " +
      "signals. Gross profit improvement of 5-10% and average order value lift up to 13% " +
      "during peak periods. EBITDA boost of 2-5 percentage points. No-code platforms unlock " +
      "10-20% revenue gains for small businesses affordably. 75% of small businesses have " +
      "invested in AI for competitive advantage. " +
      "Source: Master of Code AI dynamic pricing; Entefy dynamic pricing future.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 19. Compliance Monitoring
  // ──────────────────────────────────────────────────────────────────
  {
    id: "compliance-monitoring",
    processName: "Compliance Monitoring Automation",
    category: "compliance",
    applicableIndustries: [
      "Financial Services",
      "Healthcare",
      "SaaS",
      "Manufacturing",
      "Insurance",
      "Legal",
    ],
    toolsCommonlyUsed: [
      "Vanta",
      "Drata",
      "Secureframe",
      "LogicGate",
      "Hyperproof",
      "OneTrust",
    ],
    implementationCost: { min: 5000, max: 30000, currency: "USD" },
    implementationWeeks: 8,
    expectedSavings: {
      hoursPerWeek: 10,
      dollarsPerMonth: 3500,
      errorReductionPercent: 60,
    },
    paybackPeriodMonths: 6,
    complexity: "medium",
    prerequisites: [
      "Identified compliance frameworks (SOC 2, HIPAA, GDPR, etc.)",
      "IT infrastructure documentation",
      "Policy and procedure documents",
      "Risk assessment completed",
    ],
    successRate: "65% of organizations say automation is the most effective way to cut compliance costs",
    description:
      "Continuous monitoring of controls, evidence collection, and audit readiness. " +
      "Reduces audit preparation time 40-60%, compliance findings by 50-70%, and " +
      "payback period of 6-12 months. Organizations using AI report $1.9M lower data " +
      "breach costs and 80 fewer days to identify/contain breaches. Average breach " +
      "investigation cost is $200K-500K; monitoring reduces probability by 40-50%, " +
      "yielding $80K-250K expected annual savings. " +
      "Source: Secureframe compliance statistics 2026; InfluenceFlow compliance monitoring 2025.",
  },

  // ──────────────────────────────────────────────────────────────────
  // 20. Report Generation
  // ──────────────────────────────────────────────────────────────────
  {
    id: "automated-report-generation",
    processName: "Automated Report Generation",
    category: "operations",
    applicableIndustries: [
      "All Industries",
      "Financial Services",
      "SaaS",
      "Professional Services",
      "Healthcare",
      "Manufacturing",
    ],
    toolsCommonlyUsed: [
      "Power BI",
      "Tableau",
      "Google Looker",
      "Databox",
      "Klipfolio",
      "Custom scripts (Python + GPT API)",
    ],
    implementationCost: { min: 2000, max: 15000, currency: "USD" },
    implementationWeeks: 4,
    expectedSavings: {
      hoursPerWeek: 10,
      dollarsPerMonth: 2500,
      errorReductionPercent: 45,
    },
    paybackPeriodMonths: 3,
    complexity: "medium",
    prerequisites: [
      "Data sources connected (databases, APIs, spreadsheets)",
      "Defined report templates and KPIs",
      "Stakeholder requirements for dashboards",
      "Data governance / quality baseline",
    ],
    successRate: "62% of SMEs report significant productivity improvement within 6 months of AI adoption",
    description:
      "Automates data aggregation, visualization, narrative generation, and scheduled delivery. " +
      "Saves 15-25 hours/week per employee with ROI in 1-3 months. One SaaS company saved " +
      "1.5 days/week per analyst with self-service analytics. SMEs using AI achieve 23% " +
      "savings on operational costs. Average AI integration cost has dropped from $15,000 " +
      "to $3,000 (80% decrease) between 2023-2026. Returns of 3.7x per dollar invested. " +
      "Source: Functionize automated report generation; BlazeSQL automated BI guide 2026.",
  },
];

export default automationCases;
