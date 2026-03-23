import type { MaturityRubric } from "./types";

const maturityRubrics: Record<string, MaturityRubric> = {
  operations: {
    dimension: "operations",
    dimensionName: "Operations & Processes",
    levels: [
      {
        level: 1,
        name: "Critical",
        scoreRange: "0-20",
        summary:
          "No documented processes. Work is ad-hoc, firefighting is daily. Knowledge exists only in people's heads.",
        characteristics: [
          "No SOPs or process documentation",
          "Daily firefighting — team reacts to problems instead of preventing them",
          "Key processes depend entirely on specific individuals",
          "No metrics or KPIs tracked for operational performance",
        ],
        exampleQuote:
          "Every day is different. We just deal with whatever comes up. I can't leave for a week without things falling apart.",
        signalKeywords: [
          "chaos", "firefighting", "no process", "every day different",
          "depends on me", "no documentation", "everything manual",
          "constantly fixing", "no system",
        ],
        nextSteps: [
          "Document your top 3 most critical processes step-by-step",
          "Assign process owners for each core workflow",
          "Start tracking 1-2 basic metrics (e.g., order completion time, error count)",
          "Create a simple checklist for recurring tasks",
        ],
      },
      {
        level: 2,
        name: "Struggling",
        scoreRange: "21-40",
        summary:
          "Some processes exist but are inconsistent. Errors are frequent, bottlenecks are known but unfixed.",
        characteristics: [
          "Some processes documented but not followed consistently",
          "Known bottlenecks that nobody has time to fix",
          "Frequent errors requiring rework (5-15% rework rate)",
          "Basic tools in place (spreadsheets, email) but disconnected",
        ],
        exampleQuote:
          "We know where the problems are, but we're too busy keeping things running to fix them. Our spreadsheets are a mess.",
        signalKeywords: [
          "bottleneck", "rework", "spreadsheet", "manual", "slow",
          "errors", "workaround", "patch", "too busy to fix",
          "inconsistent", "depends on who does it",
        ],
        nextSteps: [
          "Fix the #1 bottleneck — even a small improvement compounds",
          "Standardize the 5 most frequent tasks with templates/checklists",
          "Connect your top 2 disconnected systems (e.g., CRM + invoicing)",
          "Set up weekly 15-min process review to catch recurring issues",
        ],
      },
      {
        level: 3,
        name: "Stable",
        scoreRange: "41-60",
        summary:
          "Core processes are defined and mostly followed. Some automation exists. Performance is tracked but not optimized.",
        characteristics: [
          "Core processes documented and generally followed",
          "Some automation (email templates, basic workflows)",
          "KPIs exist but are reviewed monthly, not in real-time",
          "Errors happen but are caught and corrected within process",
        ],
        exampleQuote:
          "Things mostly work. We have our processes, but there's still a lot of manual work. We know our numbers but don't always act on them.",
        signalKeywords: [
          "mostly works", "some automation", "track metrics",
          "CRM", "project management tool", "process in place",
          "could be better", "manual steps remain", "review monthly",
        ],
        nextSteps: [
          "Automate the remaining manual steps in your top 3 workflows",
          "Move from monthly to weekly KPI review — act faster on deviations",
          "Implement exception-based alerts instead of routine checking",
          "Cross-train team members to reduce single-person dependencies",
        ],
      },
      {
        level: 4,
        name: "Efficient",
        scoreRange: "61-80",
        summary:
          "Processes are optimized and largely automated. Real-time visibility into operations. Continuous improvement culture.",
        characteristics: [
          "Most repetitive tasks automated (80%+ of routine work)",
          "Real-time dashboards for operational KPIs",
          "Continuous improvement process — regular retrospectives",
          "Systems are integrated (CRM, ERP, accounting connected)",
        ],
        exampleQuote:
          "Our systems talk to each other. We see problems in real-time and fix them fast. The team focuses on exceptions, not routine.",
        signalKeywords: [
          "automated", "integrated", "real-time", "dashboard",
          "continuous improvement", "exceptions only", "systems connected",
          "efficient", "optimized", "data-driven decisions",
        ],
        nextSteps: [
          "Explore AI/ML for predictive operations (demand forecasting, predictive maintenance)",
          "Benchmark against industry leaders, not just your own history",
          "Invest in employee upskilling for higher-value work",
          "Consider process mining to find hidden inefficiencies",
        ],
      },
      {
        level: 5,
        name: "Optimized",
        scoreRange: "81-100",
        summary:
          "Best-in-class operations. AI-augmented decisions, predictive capabilities, near-zero waste. Rare for SMBs.",
        characteristics: [
          "AI/ML used for prediction and optimization",
          "Near-zero waste and minimal manual intervention",
          "Self-healing processes that auto-correct deviations",
          "Operations are a competitive advantage, not just a cost center",
        ],
        exampleQuote:
          "Our system predicts demand and auto-adjusts. The team focuses on strategy and innovation. Operations run themselves 90% of the time.",
        signalKeywords: [
          "AI", "predictive", "self-healing", "auto-adjust",
          "competitive advantage", "innovation", "near-zero waste",
          "machine learning", "prescriptive analytics",
        ],
        nextSteps: [
          "Share best practices — mentor other departments or partner companies",
          "Explore autonomous operations for routine decisions",
          "Invest in R&D for next-generation process innovation",
          "Consider monetizing your operational excellence (consulting, licensing)",
        ],
      },
    ],
  },

  sales: {
    dimension: "sales",
    dimensionName: "Sales & Customers",
    levels: [
      {
        level: 1,
        name: "Critical",
        scoreRange: "0-20",
        summary:
          "No sales process. Revenue depends on word-of-mouth and the founder's personal network. No pipeline tracking.",
        characteristics: [
          "No CRM or pipeline tracking — sales happen organically",
          "Revenue depends on founder's personal relationships",
          "No understanding of CAC, LTV, or conversion rates",
          "Customer feedback is anecdotal, not systematically collected",
        ],
        exampleQuote:
          "Clients come through referrals and my personal network. I don't know exactly how much it costs to get a new customer.",
        signalKeywords: [
          "referrals only", "word of mouth", "no CRM", "don't track",
          "organic", "personal network", "no pipeline", "no metrics",
        ],
        nextSteps: [
          "Set up a basic CRM (even free HubSpot) and start logging every lead",
          "Define your sales stages (lead → qualified → proposal → closed)",
          "Calculate your rough CAC and LTV from last 12 months",
          "Start asking every new customer 'how did you hear about us?'",
        ],
      },
      {
        level: 2,
        name: "Struggling",
        scoreRange: "21-40",
        summary:
          "Basic CRM exists but is messy. Sales process is informal. High lead leakage and inconsistent follow-up.",
        characteristics: [
          "CRM or spreadsheet exists but data is incomplete/outdated",
          "Leads fall through cracks — no systematic follow-up",
          "Sales process varies by person — no standard methodology",
          "Customer complaints handled reactively, not proactively",
        ],
        exampleQuote:
          "We have a CRM but half the team doesn't use it properly. I know we're losing leads but I don't know where exactly.",
        signalKeywords: [
          "messy CRM", "spreadsheet", "leads fall through", "no follow-up",
          "inconsistent", "lose customers", "don't know where",
          "complaints", "no standard process",
        ],
        nextSteps: [
          "Clean your CRM data and make it mandatory for the team",
          "Create a follow-up cadence (e.g., Day 1, Day 3, Day 7, Day 14)",
          "Identify your top 3 lead leakage points and fix them",
          "Implement a basic NPS or satisfaction survey after each sale",
        ],
      },
      {
        level: 3,
        name: "Stable",
        scoreRange: "41-60",
        summary:
          "Sales process is defined with clear stages. CRM is used consistently. Metrics are tracked but conversion optimization is basic.",
        characteristics: [
          "CRM adopted by team with clear pipeline stages",
          "Basic sales metrics tracked (pipeline value, close rate)",
          "Some email automation for leads and follow-ups",
          "Customer feedback collected but not always acted on systematically",
        ],
        exampleQuote:
          "We track our pipeline and know our numbers. Conversion could be better. We send some automated emails but most selling is still manual.",
        signalKeywords: [
          "track pipeline", "know our numbers", "CRM", "conversion",
          "follow-up process", "email automation", "could be better",
          "some automation", "sales stages defined",
        ],
        nextSteps: [
          "Implement lead scoring to focus on highest-potential prospects",
          "A/B test your email sequences and sales scripts",
          "Set up automated nurture campaigns for leads not ready to buy",
          "Analyze your best customers — build an ideal customer profile",
        ],
      },
      {
        level: 4,
        name: "Efficient",
        scoreRange: "61-80",
        summary:
          "Data-driven sales with lead scoring, automated nurture, and clear attribution. Customer success proactively managed.",
        characteristics: [
          "Lead scoring prioritizes highest-value prospects",
          "Automated nurture sequences for different buyer personas",
          "Clear attribution — know which channels drive revenue",
          "Customer success/retention actively managed with health scores",
        ],
        exampleQuote:
          "We know exactly which channels work. Our CRM tells us who to call and when. Churn is tracked and we catch at-risk customers early.",
        signalKeywords: [
          "lead scoring", "attribution", "nurture sequences",
          "customer success", "health score", "churn prediction",
          "data-driven", "segmentation", "LTV optimization",
        ],
        nextSteps: [
          "Implement AI-powered recommendations (next best action, upsell triggers)",
          "Build predictive churn models to intervene earlier",
          "Explore ABM (account-based marketing) for top prospects",
          "Automate expansion/upsell workflows based on usage patterns",
        ],
      },
      {
        level: 5,
        name: "Optimized",
        scoreRange: "81-100",
        summary:
          "AI-augmented sales and customer intelligence. Predictive analytics drive decisions. Revenue operations fully integrated.",
        characteristics: [
          "AI predicts which leads will convert and when",
          "Dynamic pricing/offers based on customer behavior",
          "Revenue operations (sales + marketing + CS) fully unified",
          "Customer intelligence feeds back into product development",
        ],
        exampleQuote:
          "Our system tells reps exactly who to call, what to say, and when. We predict churn 60 days out. Revenue is predictable.",
        signalKeywords: [
          "predictive", "AI-powered", "revenue operations",
          "dynamic pricing", "customer intelligence", "predictable revenue",
          "unified RevOps", "prescriptive selling",
        ],
        nextSteps: [
          "Explore autonomous sales agents for routine transactions",
          "Build customer data platform for 360-degree view",
          "Invest in real-time competitive intelligence",
          "Consider platform/marketplace strategies for exponential growth",
        ],
      },
    ],
  },

  finance: {
    dimension: "finance",
    dimensionName: "Finance & Resources",
    levels: [
      {
        level: 1,
        name: "Critical",
        scoreRange: "0-20",
        summary:
          "No financial visibility. Invoicing manual, books updated monthly or quarterly. Cash flow surprises are common.",
        characteristics: [
          "Bookkeeping done manually or by external accountant quarterly",
          "No real-time view of cash position",
          "Invoices created manually in Word/Excel, sent by email",
          "No budget — spending decisions are gut-feel",
        ],
        exampleQuote:
          "I check the bank account to see if we have money. Our accountant does the books every quarter. I never know our exact margin.",
        signalKeywords: [
          "check bank account", "no budget", "accountant quarterly",
          "manual invoicing", "don't know margin", "surprises",
          "gut feel", "no visibility", "paper invoices",
        ],
        nextSteps: [
          "Set up cloud accounting (QuickBooks, Xero) and connect your bank",
          "Start invoicing from the accounting system, not Word/Excel",
          "Create a simple cash flow forecast for the next 3 months",
          "Define your top 5 expense categories and track monthly",
        ],
      },
      {
        level: 2,
        name: "Struggling",
        scoreRange: "21-40",
        summary:
          "Accounting software exists but is underutilized. Manual data entry, late invoicing, poor collections.",
        characteristics: [
          "Accounting software in place but lots of manual entry",
          "Invoicing delayed — sent days/weeks after work is done",
          "Collections are manual — AR aging is a problem",
          "Budget exists on paper but not actively managed",
        ],
        exampleQuote:
          "We use QuickBooks but still enter a lot of things manually. Invoices go out late and some clients pay very slowly.",
        signalKeywords: [
          "manual entry", "late invoices", "slow payments",
          "AR aging", "cash flow problems", "late payments",
          "QuickBooks", "spreadsheet budget", "data entry",
        ],
        nextSteps: [
          "Automate recurring invoices for regular clients",
          "Set up automated payment reminders (Day 1, 7, 14, 30 overdue)",
          "Connect POS/CRM to accounting to eliminate double entry",
          "Review AR weekly and personally call top 5 overdue accounts",
        ],
      },
      {
        level: 3,
        name: "Stable",
        scoreRange: "41-60",
        summary:
          "Financial systems connected. Monthly P&L reviewed. Budgets managed. Some manual processes remain.",
        characteristics: [
          "Accounting integrated with bank feeds and some systems",
          "Monthly P&L, balance sheet, and cash flow reviewed",
          "Budget tracked against actuals on monthly basis",
          "Some manual processes remain (expense reports, AP approvals)",
        ],
        exampleQuote:
          "We know our numbers every month. P&L looks okay. Cash flow is predictable but could be tighter. Expense reports are still painful.",
        signalKeywords: [
          "monthly P&L", "budget tracking", "know our numbers",
          "bank feeds connected", "cash flow predictable",
          "expense reports manual", "could be tighter",
        ],
        nextSteps: [
          "Automate expense management (receipt scanning, auto-categorization)",
          "Move from monthly to weekly financial flash reports",
          "Implement approval workflows for purchases over threshold",
          "Start forecasting 6-12 months out, not just reviewing backwards",
        ],
      },
      {
        level: 4,
        name: "Efficient",
        scoreRange: "61-80",
        summary:
          "Fully integrated financial systems. Real-time dashboards. Automated AP/AR. Forward-looking forecasting.",
        characteristics: [
          "All financial systems integrated — single source of truth",
          "Real-time financial dashboards (revenue, cash, margins)",
          "AP/AR largely automated with exception-based handling",
          "Rolling forecasts updated regularly, not just annual budget",
        ],
        exampleQuote:
          "I can see our cash position, revenue, and margins in real-time. Invoices go out automatically. We forecast quarterly with high accuracy.",
        signalKeywords: [
          "real-time", "automated invoicing", "integrated",
          "rolling forecast", "dashboard", "exception-based",
          "automated collections", "accurate forecast",
        ],
        nextSteps: [
          "Implement AI-powered cash flow forecasting",
          "Explore dynamic payment terms based on customer risk profile",
          "Automate financial close to reduce month-end crunch",
          "Build scenario models for strategic decisions",
        ],
      },
      {
        level: 5,
        name: "Optimized",
        scoreRange: "81-100",
        summary:
          "AI-augmented financial planning. Predictive analytics for cash flow, revenue, and risk. Autonomous AP/AR.",
        characteristics: [
          "AI predicts cash flow and flags anomalies before they impact business",
          "Automated financial close in 1-2 days (not 1-2 weeks)",
          "Dynamic pricing and margin optimization",
          "Scenario planning built into strategic decision-making",
        ],
        exampleQuote:
          "Our system predicts cash shortfalls 60 days out. Financial close takes 2 days. We run scenarios before every major decision.",
        signalKeywords: [
          "AI forecasting", "predictive", "automated close",
          "scenario planning", "dynamic pricing", "anomaly detection",
          "autonomous", "real-time optimization",
        ],
        nextSteps: [
          "Explore autonomous financial operations for routine decisions",
          "Build integrated business planning (finance + operations + sales)",
          "Consider treasury management optimization",
          "Invest in advanced analytics for M&A or market expansion decisions",
        ],
      },
    ],
  },

  team: {
    dimension: "team",
    dimensionName: "Team & HR",
    levels: [
      {
        level: 1,
        name: "Critical",
        scoreRange: "0-20",
        summary:
          "No HR processes. Hiring is reactive. No onboarding, training, or retention strategy. Key person risk is extreme.",
        characteristics: [
          "Hiring only when desperate — no planning ahead",
          "No onboarding process — new hires figure it out themselves",
          "No training programs or development paths",
          "Extreme key person dependency — if they leave, projects stop",
        ],
        exampleQuote:
          "When someone quits, we scramble to replace them. New people just shadow someone for a week. There's no training budget.",
        signalKeywords: [
          "scramble", "no onboarding", "figure it out", "shadow someone",
          "no training", "key person", "if they leave", "no HR",
          "reactive hiring", "no process",
        ],
        nextSteps: [
          "Create a 30-day onboarding checklist for new hires",
          "Document critical knowledge from your key people NOW",
          "Start planning hires 3 months before you need them",
          "Set up monthly 1-on-1s between managers and direct reports",
        ],
      },
      {
        level: 2,
        name: "Struggling",
        scoreRange: "21-40",
        summary:
          "Basic hiring process exists but is slow. High turnover recognized as a problem. Limited training.",
        characteristics: [
          "Job postings and basic interview process exist",
          "Onboarding is informal — varies by manager",
          "Turnover is high and recognized as a cost problem",
          "Training is ad-hoc — learn on the job",
        ],
        exampleQuote:
          "We post jobs and interview, but it takes forever to fill positions. People leave within a year. Training is basically learning by doing.",
        signalKeywords: [
          "takes forever to hire", "high turnover", "people leave",
          "learning by doing", "informal onboarding", "no training program",
          "slow hiring", "retention problem",
        ],
        nextSteps: [
          "Standardize onboarding — same quality experience for every hire",
          "Conduct exit interviews to understand WHY people leave",
          "Create career paths for your most common roles",
          "Implement an employee engagement pulse survey (quarterly)",
        ],
      },
      {
        level: 3,
        name: "Stable",
        scoreRange: "41-60",
        summary:
          "Structured hiring and onboarding. Some training programs. Turnover is managed but not optimized.",
        characteristics: [
          "Structured hiring process with defined stages",
          "Standardized onboarding program (1-4 weeks)",
          "Some training and development offered",
          "Employee feedback collected periodically",
        ],
        exampleQuote:
          "We have a solid hiring process and onboarding. We offer some training. Turnover is okay but we lose good people to bigger companies.",
        signalKeywords: [
          "structured hiring", "onboarding program", "some training",
          "feedback surveys", "lose to bigger companies",
          "okay turnover", "development opportunities",
        ],
        nextSteps: [
          "Build an internal learning library or mentorship program",
          "Implement stay interviews (not just exit interviews)",
          "Use data to predict flight risks and intervene early",
          "Create leadership development track for high performers",
        ],
      },
      {
        level: 4,
        name: "Efficient",
        scoreRange: "61-80",
        summary:
          "Data-driven HR. Proactive retention strategies. Strong employer brand. Continuous learning culture.",
        characteristics: [
          "HR metrics tracked: time-to-hire, turnover cost, engagement scores",
          "Proactive retention — stay interviews, career pathing, competitive comp",
          "Continuous learning embedded in culture (budget, time allocated)",
          "Strong employer brand — candidates seek you out",
        ],
        exampleQuote:
          "We know our turnover cost per role. We catch flight risks early. People want to work here — our referral pipeline is strong.",
        signalKeywords: [
          "track HR metrics", "retention strategy", "career pathing",
          "employer brand", "referral pipeline", "engagement scores",
          "learning culture", "competitive compensation",
        ],
        nextSteps: [
          "Explore AI for recruiting (resume screening, candidate matching)",
          "Build internal mobility program — fill roles from within",
          "Implement skills-based workforce planning",
          "Create alumni network for boomerang hiring",
        ],
      },
      {
        level: 5,
        name: "Optimized",
        scoreRange: "81-100",
        summary:
          "AI-augmented talent management. Predictive workforce planning. Best-in-class employer brand. Rare for SMBs.",
        characteristics: [
          "AI-powered recruiting and talent matching",
          "Predictive workforce planning — hire before gaps appear",
          "Personalized learning paths driven by skills gaps analysis",
          "Industry-leading retention and engagement metrics",
        ],
        exampleQuote:
          "Our system predicts who might leave and recommends interventions. We plan workforce needs 12 months out. Engagement is top-quartile.",
        signalKeywords: [
          "AI recruiting", "predictive", "workforce planning",
          "personalized learning", "top-quartile engagement",
          "skills gap analysis", "talent analytics",
        ],
        nextSteps: [
          "Explore internal talent marketplace",
          "Build cross-functional rotation programs",
          "Invest in organizational network analysis",
          "Consider becoming an industry thought leader on talent",
        ],
      },
    ],
  },

  data: {
    dimension: "data",
    dimensionName: "Data & Technology",
    levels: [
      {
        level: 1,
        name: "Critical",
        scoreRange: "0-20",
        summary:
          "No centralized data. Spreadsheets and paper dominate. No IT infrastructure beyond email.",
        characteristics: [
          "Data lives in spreadsheets, paper files, and people's heads",
          "No centralized database or customer records system",
          "IT = email and maybe a shared drive",
          "No data backup or security measures",
        ],
        exampleQuote:
          "Everything is in Excel or on paper. If my laptop dies, we lose half our customer data. We don't have an IT person.",
        signalKeywords: [
          "Excel", "paper", "spreadsheet", "no system", "no IT",
          "no backup", "laptop", "shared drive", "manual records",
        ],
        nextSteps: [
          "Move customer data from spreadsheets to a basic CRM",
          "Set up cloud backup for all business-critical data",
          "Implement basic cybersecurity (2FA, password manager)",
          "Audit what data you have and where it lives",
        ],
      },
      {
        level: 2,
        name: "Struggling",
        scoreRange: "21-40",
        summary:
          "Some systems exist (CRM, accounting) but disconnected. Data quality is poor. Reports take hours.",
        characteristics: [
          "2-3 business systems in place but they don't talk to each other",
          "Same data entered in multiple places — inconsistencies common",
          "Getting a simple report takes hours of manual compilation",
          "No data governance — nobody owns data quality",
        ],
        exampleQuote:
          "We have a CRM and accounting software but they're not connected. When I need a report, someone spends half a day in Excel.",
        signalKeywords: [
          "disconnected systems", "double entry", "manual reports",
          "data inconsistencies", "takes hours", "not connected",
          "no integration", "copy-paste between systems",
        ],
        nextSteps: [
          "Connect your top 2 systems (e.g., CRM → accounting via Zapier/Make)",
          "Assign a data owner — someone responsible for data quality",
          "Standardize data entry rules (naming, formats, required fields)",
          "Set up 3-5 standard reports that auto-generate weekly",
        ],
      },
      {
        level: 3,
        name: "Stable",
        scoreRange: "41-60",
        summary:
          "Core systems integrated. Standard reports available. Some data-driven decisions. Data quality improving.",
        characteristics: [
          "Core systems connected (CRM + accounting + ops)",
          "Standard reports generated automatically",
          "Data informs some decisions but intuition still dominates",
          "Basic data security in place (backups, passwords, access control)",
        ],
        exampleQuote:
          "Our systems are connected and reports come out automatically. We use data for some decisions but often still go with gut feel.",
        signalKeywords: [
          "systems connected", "automatic reports", "some data-driven",
          "still gut feel sometimes", "backups in place",
          "integrated", "standard reports",
        ],
        nextSteps: [
          "Build dashboards for real-time visibility (not just periodic reports)",
          "Start using data for ALL major decisions — create a data-first culture",
          "Explore basic analytics (trend analysis, segmentation)",
          "Implement data quality checks and cleansing routines",
        ],
      },
      {
        level: 4,
        name: "Efficient",
        scoreRange: "61-80",
        summary:
          "Fully integrated tech stack. Real-time dashboards. Data-driven culture. Ready for AI adoption.",
        characteristics: [
          "All business systems integrated — single source of truth",
          "Real-time dashboards used daily by leadership",
          "Data-driven decision-making is the norm, not the exception",
          "Cloud-based infrastructure with proper security and compliance",
        ],
        exampleQuote:
          "Every decision starts with data. Our dashboards update in real-time. We've been exploring AI tools for specific use cases.",
        signalKeywords: [
          "single source of truth", "real-time dashboards",
          "data-driven culture", "cloud-based", "AI exploration",
          "integrated tech stack", "security compliance",
        ],
        nextSteps: [
          "Implement AI/ML for specific high-value use cases",
          "Build a data lake/warehouse for advanced analytics",
          "Invest in data literacy training across the organization",
          "Explore predictive analytics and machine learning",
        ],
      },
      {
        level: 5,
        name: "Optimized",
        scoreRange: "81-100",
        summary:
          "AI-native organization. Predictive and prescriptive analytics. Data is a competitive moat.",
        characteristics: [
          "AI/ML embedded in daily operations and decision-making",
          "Predictive models drive proactive business actions",
          "Data is a competitive advantage — unique datasets and insights",
          "Advanced security, governance, and compliance automation",
        ],
        exampleQuote:
          "AI is part of how we operate. We predict and act before problems happen. Our data gives us insights competitors can't match.",
        signalKeywords: [
          "AI-native", "predictive models", "competitive advantage",
          "machine learning", "data moat", "prescriptive analytics",
          "automated governance",
        ],
        nextSteps: [
          "Explore autonomous decision systems for routine operations",
          "Build proprietary datasets and models",
          "Consider data monetization strategies",
          "Invest in advanced AI capabilities (NLP, computer vision, etc.)",
        ],
      },
    ],
  },

  culture: {
    dimension: "culture",
    dimensionName: "Culture & Change Readiness",
    levels: [
      {
        level: 1,
        name: "Critical",
        scoreRange: "0-20",
        summary:
          "Strong resistance to change. 'We've always done it this way' mentality. No innovation culture.",
        characteristics: [
          "Team actively resists new tools and processes",
          "Leadership makes all decisions — no empowerment",
          "Failed technology implementations in the past created cynicism",
          "No budget or time allocated for innovation or improvement",
        ],
        exampleQuote:
          "Last time we tried a new system, nobody used it. The team just went back to the old way. I've given up trying to change things.",
        signalKeywords: [
          "resist change", "always done it this way", "nobody used it",
          "went back to old way", "given up", "no budget for new things",
          "team doesn't want", "failed before",
        ],
        nextSteps: [
          "Start with ONE small, visible win — a tool that saves time immediately",
          "Involve the team in choosing the tool — people support what they help create",
          "Celebrate early adopters publicly",
          "Address past failures honestly — what went wrong and what you'll do differently",
        ],
      },
      {
        level: 2,
        name: "Struggling",
        scoreRange: "21-40",
        summary:
          "Mixed attitudes toward change. Some people willing, others resistant. No structured change management.",
        characteristics: [
          "Some team members embrace change, others resist passively",
          "New tools adopted by some, ignored by others",
          "No formal change management — changes are announced and expected to stick",
          "Small budget for tools but no strategic technology roadmap",
        ],
        exampleQuote:
          "A few people love new tools, but most just want to do their job the old way. We buy tools but adoption is always a struggle.",
        signalKeywords: [
          "some people willing", "adoption struggle", "mixed reactions",
          "buy tools but", "passive resistance", "no roadmap",
          "some use it some don't",
        ],
        nextSteps: [
          "Identify and empower your internal champions — 2-3 people who love new tools",
          "Create a simple change management process: communicate → train → support → measure",
          "Set adoption targets and track them (e.g., 80% CRM usage within 3 months)",
          "Allocate protected time for learning new tools (e.g., 2 hours/week)",
        ],
      },
      {
        level: 3,
        name: "Stable",
        scoreRange: "41-60",
        summary:
          "Generally open to change. Tools adopted with proper training. Some innovation encouraged.",
        characteristics: [
          "Team generally accepts new tools with proper training and support",
          "Leadership supports technology investment",
          "Some experimentation encouraged but not systematic",
          "Moderate technology budget with annual planning",
        ],
        exampleQuote:
          "The team is open to new tools if we train them properly. We invest in technology but don't always have a clear strategy for it.",
        signalKeywords: [
          "open to change", "with training", "invest in technology",
          "no clear strategy", "annual budget", "supportive leadership",
          "some experimentation",
        ],
        nextSteps: [
          "Create a technology roadmap aligned with business goals",
          "Establish an innovation budget (time + money) for experiments",
          "Run quarterly 'what if' sessions — explore new possibilities",
          "Build a feedback loop: adopt → measure → iterate",
        ],
      },
      {
        level: 4,
        name: "Efficient",
        scoreRange: "61-80",
        summary:
          "Innovation culture established. Change is managed well. Technology is seen as a strategic enabler.",
        characteristics: [
          "Proactive technology adoption — team suggests improvements",
          "Structured change management process in place",
          "Innovation time/budget allocated and protected",
          "Cross-functional collaboration on technology initiatives",
        ],
        exampleQuote:
          "Our team brings ideas for improvement. We have a process for evaluating and adopting new tools. Technology is part of our strategy.",
        signalKeywords: [
          "team suggests improvements", "innovation budget",
          "change management process", "strategic technology",
          "cross-functional", "proactive adoption",
        ],
        nextSteps: [
          "Formalize an innovation lab or pilot program",
          "Create metrics for innovation (ideas generated, pilots run, ROI achieved)",
          "Build external partnerships for technology co-development",
          "Invest in emerging tech literacy (AI, automation, data science)",
        ],
      },
      {
        level: 5,
        name: "Optimized",
        scoreRange: "81-100",
        summary:
          "Innovation DNA. Continuous experimentation. Technology-forward culture. Rare for SMBs.",
        characteristics: [
          "Continuous experimentation is part of daily work",
          "Failure is seen as learning — fast-fail culture",
          "Every employee is a technology advocate",
          "Company is often an early adopter and industry innovator",
        ],
        exampleQuote:
          "Everyone here thinks about how to do things better. We run experiments constantly. Being early on AI has given us a real edge.",
        signalKeywords: [
          "continuous experimentation", "fail fast", "early adopter",
          "innovation DNA", "everyone contributes", "competitive edge",
          "industry innovator",
        ],
        nextSteps: [
          "Mentor other companies and share your innovation practices",
          "Explore disruptive business model innovation",
          "Invest in R&D partnerships with universities or startups",
          "Consider open innovation programs",
        ],
      },
    ],
  },

  risks: {
    dimension: "risks",
    dimensionName: "Risks & Compliance",
    levels: [
      {
        level: 1,
        name: "Critical",
        scoreRange: "0-20",
        summary:
          "No risk awareness. No compliance processes. Data security is an afterthought. Business continuity not considered.",
        characteristics: [
          "No awareness of key business risks beyond 'what if we lose a big client'",
          "No data backup, security, or privacy measures",
          "Compliance is reactive — deal with it when regulators come knocking",
          "No business continuity or disaster recovery plan",
        ],
        exampleQuote:
          "I don't think much about risks — just focused on keeping the business running. We don't have any security or compliance stuff set up.",
        signalKeywords: [
          "don't think about risks", "no backup", "no security",
          "no compliance", "just focused on running", "no plan",
          "hope nothing goes wrong", "haven't thought about it",
        ],
        nextSteps: [
          "Back up all critical data TODAY — cloud backup takes 30 minutes to set up",
          "List your top 5 risks — what could shut down the business?",
          "Implement basic security: 2FA on all accounts, password manager",
          "Check your regulatory requirements — don't wait for an audit",
        ],
      },
      {
        level: 2,
        name: "Struggling",
        scoreRange: "21-40",
        summary:
          "Some risk awareness but no systematic management. Basic compliance met. Key person dependencies recognized.",
        characteristics: [
          "Aware of major risks but no mitigation plans",
          "Basic compliance requirements met (tax, licensing)",
          "Key person dependencies recognized but not addressed",
          "Some data backup but recovery never tested",
        ],
        exampleQuote:
          "We know our risks — if our head of sales leaves, we're in trouble. We meet basic legal requirements but haven't done much beyond that.",
        signalKeywords: [
          "know our risks", "haven't addressed", "basic compliance",
          "key person risk", "if they leave", "haven't tested",
          "basic backup", "legal minimum",
        ],
        nextSteps: [
          "Create a risk register — list risks, likelihood, impact, and mitigation",
          "Cross-train for every critical role — at least one backup person",
          "Test your data recovery — can you actually restore from backup?",
          "Review insurance coverage — is it adequate for your actual risks?",
        ],
      },
      {
        level: 3,
        name: "Stable",
        scoreRange: "41-60",
        summary:
          "Risk register exists. Compliance managed systematically. Business continuity basics in place.",
        characteristics: [
          "Risk register maintained and reviewed periodically",
          "Compliance calendar and processes in place",
          "Business continuity plan exists for major scenarios",
          "Data security measures implemented (encryption, access control)",
        ],
        exampleQuote:
          "We track our risks and review them quarterly. Compliance is handled, not always fun but done. We have a basic continuity plan.",
        signalKeywords: [
          "risk register", "quarterly review", "compliance calendar",
          "continuity plan", "security measures", "access control",
          "handled but not fun",
        ],
        nextSteps: [
          "Run tabletop exercises — simulate a major disruption",
          "Automate compliance reporting and deadline tracking",
          "Implement vendor risk assessment process",
          "Review and update cyber liability insurance",
        ],
      },
      {
        level: 4,
        name: "Efficient",
        scoreRange: "61-80",
        summary:
          "Proactive risk management. Automated compliance monitoring. Regular drills and testing.",
        characteristics: [
          "Proactive risk identification — horizon scanning for emerging threats",
          "Automated compliance monitoring and alerting",
          "Regular business continuity drills and plan updates",
          "Third-party risk management for vendors and partners",
        ],
        exampleQuote:
          "We actively look for risks before they find us. Compliance alerts are automated. We run disaster drills twice a year.",
        signalKeywords: [
          "proactive risk", "automated compliance", "disaster drills",
          "vendor risk", "horizon scanning", "automated alerts",
          "regular testing",
        ],
        nextSteps: [
          "Implement AI-powered risk monitoring and anomaly detection",
          "Build predictive risk models for your top threats",
          "Achieve relevant certifications (ISO 27001, SOC 2)",
          "Create a risk-aware culture — everyone owns risk management",
        ],
      },
      {
        level: 5,
        name: "Optimized",
        scoreRange: "81-100",
        summary:
          "AI-augmented risk intelligence. Predictive compliance. Risk management as competitive advantage.",
        characteristics: [
          "AI monitors for emerging risks and compliance changes in real-time",
          "Predictive models flag potential issues before they materialize",
          "Compliance is automated — near-zero manual effort",
          "Risk management enables faster decision-making, not slower",
        ],
        exampleQuote:
          "Our system flags regulatory changes before they affect us. We can move faster than competitors because we manage risk better.",
        signalKeywords: [
          "AI-monitored", "predictive risk", "automated compliance",
          "competitive advantage", "real-time monitoring",
          "faster decisions", "near-zero manual",
        ],
        nextSteps: [
          "Explore autonomous compliance systems",
          "Build a risk intelligence function that informs strategy",
          "Share risk frameworks as thought leadership",
          "Consider risk-as-a-service for your industry peers",
        ],
      },
    ],
  },
};

export default maturityRubrics;
