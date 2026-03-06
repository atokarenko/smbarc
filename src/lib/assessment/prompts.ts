/**
 * AI prompt templates for assessment follow-ups and scoring.
 *
 * Three prompt builders:
 * 1. buildFollowUpPrompt - generates follow-up questions after each section
 * 2. buildScoreAndRoadmapPrompt - AI Call 1: maturity score + automation roadmap
 * 3. buildRiskAndRoiPrompt - AI Call 2: risk map + ROI forecast
 */

// Role-specific framing for AI prompts
const ROLE_CONTEXT: Record<string, { en: string; ru: string }> = {
  ceo: {
    en: "The user is a CEO. Emphasize strategic impact, competitive advantage, and business value. Frame recommendations in terms of growth, market positioning, and long-term vision.",
    ru: "Пользователь - генеральный директор. Акцентируйте стратегическое влияние, конкурентные преимущества и бизнес-ценность. Формулируйте рекомендации в терминах роста, позиционирования на рынке и долгосрочного видения.",
  },
  coo: {
    en: "The user is a COO. Emphasize operational efficiency, process automation, and workflow optimization. Frame recommendations in terms of productivity gains, cost reduction, and scalability.",
    ru: "Пользователь - операционный директор. Акцентируйте операционную эффективность, автоматизацию процессов и оптимизацию рабочих потоков. Формулируйте рекомендации в терминах повышения производительности, снижения затрат и масштабируемости.",
  },
  cto: {
    en: "The user is a CTO. Emphasize technical implementation, architecture decisions, and engineering capacity. Frame recommendations in terms of technical debt, integration complexity, and team capabilities.",
    ru: "Пользователь - технический директор. Акцентируйте техническую реализацию, архитектурные решения и инженерный потенциал. Формулируйте рекомендации в терминах технического долга, сложности интеграции и возможностей команды.",
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

  const system = `You are an AI business assessment assistant conducting a structured maturity evaluation. Your role is to generate insightful follow-up questions that probe deeper into areas where the user's answers suggest gaps, uncertainties, or opportunities for more detail.

${roleCtx}

${langInstr}

Guidelines for follow-up questions:
- Generate 1-3 follow-up questions based on the quality and depth of user answers
- If answers are vague or short, ask clarifying questions to understand the real situation
- If answers show gaps in understanding, ask questions that help reveal the actual state
- If answers are detailed and comprehensive, ask fewer but more strategic follow-ups
- Each question should have a "context" field explaining WHY you are asking (transparency)
- Provide 2-3 suggestion chips per question as quick-answer options

Comprehension level detection:
${
  previousLevel
    ? `The user was previously assessed at "${previousLevel}" comprehension. Maintain or adjust this level based on their current answers. If they use more/less technical language than expected, adjust accordingly.`
    : "This is the first section. Detect the user's comprehension level from their answers: 'beginner' (uses simple, non-technical language), 'intermediate' (understands basic concepts but not deeply), or 'advanced' (uses technical terminology fluently)."
}

Suggestion chip rules:
- Chips should match the detected comprehension level
- For beginners: simple, everyday language options
- For intermediate: moderately technical options
- For advanced: professional/technical options`;

  const prompt = `Section: "${sectionName}"

User answers for this section:
${Object.entries(sectionAnswers)
  .map(([key, value]) => `- ${key}: "${value}"`)
  .join("\n")}

Generate follow-up questions based on these answers. Focus on areas where the user was vague, where there might be interesting depth to explore, or where additional context would help assess their maturity level more accurately.`;

  return { system, prompt };
}

/**
 * Build prompt for AI Call 1: Score analysis + Automation Roadmap.
 */
export function buildScoreAndRoadmapPrompt(
  allAnswers: Record<string, string>,
  formulaScores: Record<string, number>,
  role: string,
  locale: string
): { system: string; prompt: string } {
  const roleCtx = getRoleContext(role, locale);
  const langInstr = getLanguageInstruction(locale);

  const system = `You are an AI maturity assessment analyst. Analyze business assessment answers and generate a maturity score with automation roadmap.

${roleCtx}

${langInstr}

Scoring guidelines:
- You are provided with formula-based dimension scores (0-100) calculated from answer patterns
- You may adjust each dimension score by +/- 10 points based on qualitative analysis of the answers
- Stay grounded in the data -- if answers are short and vague, scores should reflect that
- The overall score should be a weighted average of the 5 dimension scores
- Each dimension: strategy, adoption, riskManagement, roiTracking, governance

Automation roadmap guidelines:
- Generate 3-5 prioritized automation recommendations
- Each item should include: name, description, priority (high/medium/low), expectedImpact, timeline
- Recommendations should be realistic and specific to what the answers reveal about the company
- Prioritize quick wins (high priority) over long-term aspirational projects`;

  const prompt = `Complete assessment answers:
${JSON.stringify(allAnswers, null, 2)}

Formula-based dimension scores (pre-calculated, use as baseline):
${JSON.stringify(formulaScores, null, 2)}

Analyze these answers and generate:
1. A maturity score with the overall score and 5 dimension breakdowns (adjust formula scores +/- 10 based on qualitative analysis)
2. An automation roadmap with 3-5 prioritized recommendations`;

  return { system, prompt };
}

/**
 * Build prompt for AI Call 2: Risk Map + ROI Forecast.
 */
export function buildRiskAndRoiPrompt(
  allAnswers: Record<string, string>,
  formulaScores: Record<string, number>,
  role: string,
  locale: string
): { system: string; prompt: string } {
  const roleCtx = getRoleContext(role, locale);
  const langInstr = getLanguageInstruction(locale);

  const system = `You are an AI risk and ROI analyst. Analyze business assessment answers and generate a risk map with ROI forecast.

${roleCtx}

${langInstr}

Risk map guidelines:
- Generate 3-5 risks covering categories such as: legal/regulatory, financial, reputational, operational, data/privacy
- Each risk should include: category, level (high/medium/low), description, mitigation strategy
- Risks should be specific to what the answers reveal -- not generic AI risks
- Consider the maturity level when assessing risk: lower maturity = higher foundational risks

ROI forecast guidelines:
- Generate realistic savings projections based on the company's described situation
- Include 3-5 ROI areas with: area name, estimated current annual cost, projected annual saving with AI, confidence level
- Use conservative ranges -- it's better to under-promise
- totalSavings should be the sum of all projected savings
- timeframe should reflect realistic implementation timeline (typically "12 months" or "18 months")
- Include visible assumptions in descriptions -- be transparent about what drives the numbers
- Confidence levels: "high" for proven automation areas, "medium" for likely improvements, "low" for aspirational`;

  const prompt = `Complete assessment answers:
${JSON.stringify(allAnswers, null, 2)}

Formula-based dimension scores (for context):
${JSON.stringify(formulaScores, null, 2)}

Analyze these answers and generate:
1. A risk map with 3-5 risks covering different categories
2. An ROI forecast with realistic savings projections`;

  return { system, prompt };
}
