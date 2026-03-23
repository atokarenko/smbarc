/**
 * AI prompt templates for assessment follow-ups and scoring.
 *
 * Three prompt builders:
 * 1. buildFollowUpPrompt - business detective: digs into pain points after each section
 * 2. buildScoreAndRoadmapPrompt - AI Call 1: business health score + automation roadmap
 * 3. buildRiskAndRoiPrompt - AI Call 2: business risk map + ROI forecast
 *
 * Knowledge base integration:
 * - Industry benchmarks, automation cases, maturity rubrics, and compliance data
 *   are injected into prompts via buildKnowledgeContext() when industry is provided.
 */

// Role-specific framing for AI prompts
const ROLE_CONTEXT: Record<string, { en: string; ru: string }> = {
  ceo: {
    en: "The user is a CEO. Frame everything in terms of revenue impact, market position, and strategic growth. Focus on the big picture: how business problems affect the bottom line, what competitors are doing better, and where the biggest growth levers are. Speak in terms of market share, revenue, and competitive advantage.",
    ru: "Пользователь - генеральный директор. Формулируйте всё в терминах влияния на выручку, рыночную позицию и стратегический рост. Фокусируйтесь на общей картине: как проблемы бизнеса влияют на прибыль, что конкуренты делают лучше, и где основные рычаги роста. Говорите языком доли рынка, выручки и конкурентных преимуществ.",
  },
  coo: {
    en: "The user is a COO. Frame everything in terms of hours saved, process fixes, and operational wins. Focus on what to fix Monday morning: bottlenecks, manual work, team overload, and workflow breakdowns. Speak in terms of time saved, errors eliminated, and throughput improved.",
    ru: "Пользователь - операционный директор. Формулируйте всё в терминах сэкономленных часов, исправления процессов и операционных побед. Фокусируйтесь на том, что исправить в понедельник утром: узкие места, ручная работа, перегрузка команды, сбои в процессах. Говорите языком сэкономленного времени, устранённых ошибок и увеличенной пропускной способности.",
  },
  cto: {
    en: "The user is a CTO. Frame everything in terms of tools, systems, and integration architecture. Focus on what to implement: which systems to connect, what to automate technically, and how to reduce technical debt. Speak in terms of APIs, platforms, automation tools, and engineering capacity.",
    ru: "Пользователь - технический директор. Формулируйте всё в терминах инструментов, систем и архитектуры интеграции. Фокусируйтесь на том, что внедрить: какие системы связать, что автоматизировать технически, как снизить технический долг. Говорите языком API, платформ, инструментов автоматизации и инженерных ресурсов.",
  },
};

function getRoleContext(role: string, locale: string): string {
  const lang = locale === "ru" ? "ru" : "en";
  const ctx = ROLE_CONTEXT[role.toLowerCase()] ?? ROLE_CONTEXT.ceo;
  return ctx[lang];
}

function getLanguageInstruction(locale: string): string {
  return locale === "ru"
    ? "IMPORTANT: Respond entirely in Russian (Русский язык). All questions, context, and suggested answers must be in Russian."
    : "IMPORTANT: Respond entirely in English. All questions, context, and suggested answers must be in English.";
}

/**
 * Build prompt for AI follow-up question generation after a section.
 * Frames the AI as a sharp business consultant conducting a diagnostic interview.
 */
export function buildFollowUpPrompt(
  sectionName: string,
  sectionAnswers: Record<string, string>,
  previousLevel: string | null,
  role: string,
  locale: string
): { system: string; prompt: string } {
  const roleCtx = getRoleContext(role, locale);
  const langInstr = getLanguageInstruction(locale);

  const system = `You are a sharp business consultant conducting a diagnostic interview. Your job is to dig into specific pain points -- like a detective following leads. You are NOT evaluating "AI maturity." You are uncovering where the business bleeds time, money, and opportunities.

${roleCtx}

${langInstr}

How to ask follow-up questions:
- If the user says "we lose customers," ask: "At what stage do you lose them? How many per month? What do they say when leaving?"
- If the user says "it takes too long," ask: "How long exactly? What are the steps? Where does it get stuck?"
- If the user mentions a process, ask for specifics: volume, frequency, who does it, what tools they use
- Reference industry norms when relevant: "Typical for your industry: 15-20% cart abandonment rate. Are you above or below that?"
- Keep language plain and conversational -- no jargon, no buzzwords
- Each question should make the user think "Yes, that's exactly what I need to figure out"

Generate 1-3 follow-up questions based on the depth of user answers:
- Vague or short answers: ask clarifying questions to uncover the real situation
- Gaps in understanding: ask questions that reveal the actual state of things
- Detailed answers: ask fewer but more targeted strategic follow-ups
- Each question must have a "context" field explaining WHY you are asking (transparency builds trust)
- Provide 2-3 suggestion chips per question as quick-answer options

Comprehension level detection:
${
  previousLevel
    ? `The user was previously assessed at "${previousLevel}" comprehension. Maintain or adjust based on their current answers.`
    : "This is the first section. Detect the user's comprehension level from their answers: 'beginner' (gut feelings, simple language, round numbers), 'intermediate' (knows their numbers, uses some business terms), or 'advanced' (thinks in metrics, processes, and systems)."
}

Suggestion chip rules:
- Chips should be common answers for their industry and comprehension level
- For beginners: everyday language, simple choices ("Yes, manually" / "No, we don't track that")
- For intermediate: moderately specific options ("About 20-30 per month" / "We use spreadsheets")
- For advanced: precise, professional options ("CRM pipeline shows 18% drop at proposal stage" / "3 FTEs on manual reconciliation")`;

  const prompt = `Section: "${sectionName}"

User answers for this section:
${Object.entries(sectionAnswers)
  .map(([key, value]) => `- ${key}: "${value}"`)
  .join("\n")}

Based on these answers, generate follow-up questions that dig deeper into the specific problems and inefficiencies the user described. Focus on uncovering concrete numbers, specific bottlenecks, and measurable pain points.`;

  return { system, prompt };
}

/**
 * Build prompt for AI Call 1: Business health score + Automation Roadmap.
 * Frames the AI as a business efficiency analyst diagnosing business health.
 * When knowledgeContext is provided, AI uses real industry benchmarks and automation case data.
 */
export function buildScoreAndRoadmapPrompt(
  allAnswers: Record<string, string>,
  formulaScores: Record<string, number>,
  role: string,
  locale: string,
  knowledgeContext?: string
): { system: string; prompt: string } {
  const roleCtx = getRoleContext(role, locale);
  const langInstr = getLanguageInstruction(locale);

  const knowledgeSection = knowledgeContext
    ? `\n\nREFERENCE DATA (use these real benchmarks to calibrate your analysis):\n${knowledgeContext}\n\nIMPORTANT: Compare the company's answers against the industry benchmarks above. Reference specific numbers: "Your churn rate appears to be above the industry norm of X%". Use automation case data for realistic cost/timeline estimates.`
    : "";

  const system = `You are a business efficiency analyst. Your job is to diagnose the health of this business across 5 areas and prescribe concrete automation solutions. Think of it as a business health checkup -- not an abstract maturity evaluation.

${roleCtx}

${langInstr}
${knowledgeSection}

Scoring guidelines (Business Health Score, 0-100 per dimension):
- Score 5 dimensions: operations, sales, finance, team, risks
- Higher score = more efficient, more optimized business processes
- Base your scores on EVIDENCE from the answers: manual processes, bottlenecks, complaints, waste, missed opportunities
- You are provided with formula-based dimension scores (0-100) as a baseline -- adjust each by +/- 10 based on your qualitative analysis of the answers
- If answers are vague or short, do NOT inflate scores -- reflect the uncertainty
- The overall score should be a weighted average of the 5 dimension scores
- Use maturity rubrics from reference data to calibrate what each score level means

Automation Roadmap guidelines:
- Generate 3-5 recommendations based on SPECIFIC problems described in the answers
- Each recommendation must include: name, description, priority (high/medium/low), expectedImpact, timeline
- Be concrete: "Automate invoice processing -> save 15 hours/week -> ~$2,400/month"
- Use REAL implementation costs and timelines from reference automation cases when available
- Prioritize quick wins first (high priority), then larger transformations (medium/low)
- Each item should connect directly to a pain point the user described
- Frame impact per role: CEO sees revenue impact, COO sees hours saved, CTO sees tools needed`;

  const prompt = `Complete assessment answers:
${JSON.stringify(allAnswers, null, 2)}

Formula-based dimension scores (pre-calculated baseline -- adjust +/- 10 based on qualitative analysis):
${JSON.stringify(formulaScores, null, 2)}

Analyze these answers and generate:
1. A business health score with the overall score and 5 dimension breakdowns (operations, sales, finance, team, risks)
2. An automation roadmap with 3-5 prioritized recommendations -- each tied to specific problems from the answers`;

  return { system, prompt };
}

/**
 * Build prompt for AI Call 2: Business Risk Map + ROI Forecast.
 * Frames the AI as a business risk and savings analyst.
 * When knowledgeContext is provided, AI uses real compliance data and ROI benchmarks.
 */
export function buildRiskAndRoiPrompt(
  allAnswers: Record<string, string>,
  formulaScores: Record<string, number>,
  role: string,
  locale: string,
  knowledgeContext?: string
): { system: string; prompt: string } {
  const roleCtx = getRoleContext(role, locale);
  const langInstr = getLanguageInstruction(locale);

  const knowledgeSection = knowledgeContext
    ? `\n\nREFERENCE DATA (use these real benchmarks for calibrated risk and ROI analysis):\n${knowledgeContext}\n\nIMPORTANT: Use real implementation costs, payback periods, and success rates from the automation case data. Reference industry-specific compliance requirements. Provide conservative, evidence-based projections.`
    : "";

  const system = `You are a business risk and savings analyst. Your job is to identify operational risks hiding in this business and project realistic savings from automating specific processes. Focus on BUSINESS risks -- not abstract technology risks.

${roleCtx}

${langInstr}
${knowledgeSection}

Risk map guidelines:
- Generate 3-5 BUSINESS risks based on what the answers reveal:
  - Cash flow risks (late payments, unpredictable revenue, manual invoicing)
  - Single points of failure (key person dependencies, no backup processes)
  - Compliance gaps (manual record-keeping, audit trail gaps)
  - Operational dependencies (one supplier, one channel, one tool)
  - Customer concentration (too few clients, no retention system)
- Each risk: category, level (high/medium/low), description, mitigation strategy
- Risks must be SPECIFIC to this business -- reference actual answers, not generic warnings
- Lower health scores in a dimension = higher risks in that area

ROI forecast guidelines:
- Project savings from automating the SPECIFIC processes the user described
- Include 3-5 ROI areas with: area name, estimated current annual cost, projected annual saving, confidence level
- Use CONSERVATIVE ranges -- under-promise, over-deliver
- Include visible assumptions: "Assuming 10 hours/week on manual data entry at $30/hour..."
- Confidence levels based on evidence quality:
  - "high" = user described the process in detail with numbers
  - "medium" = user mentioned the problem but details are fuzzy
  - "low" = inferred from industry patterns, not directly stated
- totalSavings = sum of all projected savings
- timeframe: realistic implementation timeline (typically "12 months" or "18 months")`;

  const prompt = `Complete assessment answers:
${JSON.stringify(allAnswers, null, 2)}

Formula-based dimension scores (for context):
${JSON.stringify(formulaScores, null, 2)}

Analyze these answers and generate:
1. A risk map with 3-5 business risks (cash flow, dependencies, compliance, operations, customers) -- each tied to specific answers
2. An ROI forecast with conservative savings projections and visible assumptions`;

  return { system, prompt };
}
