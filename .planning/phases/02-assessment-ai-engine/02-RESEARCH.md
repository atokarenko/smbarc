# Phase 2: Assessment & AI Engine - Research (REVISED: Business-First Pivot)

**Researched:** 2026-03-06 (revised)
**Domain:** Business assessment rewrite -- content pivot from AI-maturity to business-problem discovery
**Confidence:** HIGH

## Summary

Phase 2 is a CONTENT REWRITE of existing assessment infrastructure. The architecture (Prisma model, server actions, components, AI SDK integration) is already built and working from Plans 02-01 and 02-02. The pivot changes WHAT we ask and HOW we analyze -- not HOW the system works. The existing 5 AI-centric sections (Strategy, Adoption, Risk Management, ROI Tracking, Governance) must be replaced with 5 business-centric sections (Operations & Processes, Sales & Customers, Finance & Resources, Team & HR, Risks & Compliance). The scoring labels change from CMMI-inspired AI maturity levels (Beginner/Developing/Intermediate/Advanced/Leader) to Business Health levels (Critical/Struggling/Stable/Efficient/Optimized). All AI prompts must be rewritten to analyze business problems and recommend automation solutions rather than evaluate AI readiness.

The key insight is that this is a surgical content replacement, not an architecture rebuild. The files that need rewriting are: `questions.ts` (new business questions), `types.ts` (new dimension names), `scoring.ts` (new level names + keyword list), `schemas.ts` (new dimension keys in Zod schemas), `prompts.ts` (complete rewrite for business analysis framing), `demo-data.ts` (new dimension keys in demo results), and i18n files (updated assessment strings). The UI component architecture (assessment-flow.tsx, actions.ts, all components/) stays the same -- only the content they render changes.

**Primary recommendation:** Treat this as a coordinated find-and-replace across 7-8 files. Change dimension names everywhere simultaneously (types -> questions -> schemas -> scoring -> prompts -> demo-data -> i18n). Do NOT change the Prisma schema (JSON fields are schema-agnostic). Do NOT change the component architecture.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Focus on business pain, not AI knowledge**: Questions ask about business processes, inefficiencies, manual work, bottlenecks, customer complaints, revenue leaks -- NOT about "AI strategy" or "AI governance"
- **5 business-centric sections**:
  1. **Operations & Processes** -- What manual/repetitive work consumes the most time? Where are bottlenecks? What breaks regularly?
  2. **Sales & Customers** -- How do you find customers? Where do you lose them? What's your conversion pipeline? Customer complaints?
  3. **Finance & Resources** -- Where do costs grow fastest? What reporting is manual? Cash flow pain points?
  4. **Team & HR** -- Hiring bottlenecks? Employee turnover causes? Training gaps? Communication overhead?
  5. **Risks & Compliance** -- What keeps you up at night? Legal/regulatory burden? Data security concerns? Single points of failure?
- **Adaptive difficulty**: First questions assess user's business sophistication. Adjust language -- some owners think in spreadsheets, others in gut feelings. Both are valid.
- **Hybrid presentation**: Groups of 3-4 related questions per screen
- **Conversational text with AI suggestions**: Open-ended text fields with AI-generated suggestion chips based on industry and previous answers
- **15-20 questions total**: ~3-4 per section. Quick scan, ~5-7 minutes
- **Industry context matters**: Questions should adapt based on declared industry
- **After each section**: AI generates 1-3 follow-up questions digging deeper into pain points
- **5-8 follow-ups total** (default). Toggle for "Deep Analysis" mode (unlimited)
- **Business Health Score** (not "AI Maturity Score"): 5 health levels: Critical (0-20), Struggling (21-40), Stable (41-60), Efficient (61-80), Optimized (81-100)
- **Two AI calls**: Call 1: Business Health Score + Automation Roadmap. Call 2: Risk Map + ROI Forecast
- **Role shapes output**: CEO gets "big picture", COO gets "what to fix Monday morning", CTO gets "what tools/systems to implement"
- **Zod-validated structured output**: Both AI calls return validated JSON
- **Free back-navigation**: User can jump to any completed section
- **Section stepper progress**: Horizontal stepper showing 5 business sections
- **Processing screen**: "Analyzing your business..." with specific messages
- **Auto-save every answer**: Each answer persisted immediately
- **State machine**: CREATED -> IN_PROGRESS -> AI_FOLLOWUP -> CALCULATING -> COMPLETE

### Claude's Discretion
- Exact question wording per section (must be plain business language, no jargon)
- AI prompt engineering for follow-ups and scoring
- Scoring formula weights
- Processing screen animation details
- How industry detection shapes question suggestions
- Comprehension level detection approach

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SCAN-01 | User can complete structured questionnaire covering business processes, current AI usage, risks, and strategy | REWRITE: Replace 5 AI sections with 5 business sections in questions.ts, update dimension type union in types.ts |
| SCAN-02 | AI generates follow-up questions based on user's answers to dig deeper into specific areas | REWRITE: prompts.ts follow-up prompt to ask about business pain points, not AI maturity gaps |
| SCAN-03 | User can pause assessment and resume from where they left off | NO CHANGE: Existing auto-save + state machine architecture works as-is |
| SCAN-04 | Assessment progress is visible (progress bar, sections completed) | MINOR: Update section names in stepper display (i18n strings) |
| SCORE-01 | System generates Business Health Score with breakdown by dimensions | REWRITE: schemas.ts dimension keys from strategy/adoption/etc to operations/sales/finance/team/risks; scoring.ts level names from Beginner/etc to Critical/Struggling/Stable/Efficient/Optimized |
| SCORE-02 | Health Score grounded in methodology with clear explanation of each level | REWRITE: Level descriptions must describe business health, not AI maturity |
| SCORE-03 | System generates Automation Roadmap | REWRITE: prompts.ts to frame roadmap as "what business processes to automate" not "what AI to adopt" |
| SCORE-04 | System generates Risk Map | REWRITE: prompts.ts to analyze business risks from answers, not generic AI risks |
| SCORE-05 | System generates ROI Forecast with ranges and visible assumptions | REWRITE: prompts.ts to project savings from automating identified manual processes |
| SCORE-06 | All analysis outputs via AI with Zod-validated structured output | UPDATE: schemas.ts dimension keys must match new business dimensions |

</phase_requirements>

## Standard Stack

### Core (Already Installed -- NO changes)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| ai (Vercel AI SDK) | ^6.0.116 | Structured AI output via `Output.object()` | No change |
| @ai-sdk/openai | ^3.0.41 | OpenAI-compatible provider (claude-max-proxy) | No change |
| zod | ^4.3.6 | Schema definition and validation | Schemas need content update |
| prisma / @prisma/client | ^6.19.2 | Database ORM | No schema change (JSON fields) |
| next-intl | ^4.8.3 | i18n (EN/RU) | Assessment i18n keys need updating |
| shadcn/ui (radix-ui) | various | UI components | No change |

### No New Dependencies Required
This is purely a content rewrite. No new packages, no new components.

## Architecture Patterns

### What Changes vs What Stays

```
STAYS THE SAME (do NOT touch):
├── prisma/schema.prisma          # Assessment model -- JSON fields are content-agnostic
├── src/app/[locale]/(app)/scan/
│   ├── page.tsx                   # Server component loader
│   ├── assessment-flow.tsx        # Client orchestrator (references ASSESSMENT_SECTIONS)
│   ├── actions.ts                 # Server actions (saveAnswer, generateFollowUpQuestions, completeAssessment)
│   └── components/
│       ├── section-stepper.tsx    # Renders section.name -- auto-updates with new data
│       ├── question-group.tsx     # Renders question.text -- auto-updates with new data
│       ├── ai-followup.tsx        # Unchanged
│       ├── suggestion-chips.tsx   # Unchanged (static chips for now)
│       ├── processing-screen.tsx  # Message text may want updating
│       └── assessment-config.tsx  # "AI Decides" toggle -- unchanged

MUST REWRITE (content changes):
├── src/lib/assessment/
│   ├── types.ts                   # dimension union type + re-exports
│   ├── questions.ts               # All 5 sections + 15-20 questions
│   ├── scoring.ts                 # Level names + keyword list
│   ├── schemas.ts                 # Zod dimension keys
│   └── prompts.ts                 # ALL three prompt builders
├── src/lib/demo-data.ts           # Dimension keys in demo results
├── src/messages/en.json           # Assessment UI strings
└── src/messages/ru.json           # Assessment UI strings (Russian)

MUST UPDATE (tests reflect new content):
├── src/lib/assessment/questions.test.ts   # Dimension names, question counts
├── src/lib/assessment/scoring.test.ts     # Level names, dimension keys
└── src/lib/assessment/schemas.test.ts     # Dimension keys in validation data
```

### Pattern 1: Coordinated Dimension Rename

**What:** The dimension names appear in 7+ files. All must change atomically.
**Critical mapping:**

| OLD dimension key | NEW dimension key | OLD section name | NEW section name |
|---|---|---|---|
| `strategy` | `operations` | AI Strategy | Operations & Processes |
| `adoption` | `sales` | AI Adoption | Sales & Customers |
| `riskManagement` | `finance` | Risk Management | Finance & Resources |
| `roiTracking` | `team` | ROI Tracking | Team & HR |
| `governance` | `risks` | AI Governance | Risks & Compliance |

**Files that reference dimension keys:**
1. `types.ts` -- `dimension` union type on `AssessmentSection`
2. `questions.ts` -- each section's `dimension` field
3. `schemas.ts` -- `scoreAndRoadmapSchema.maturityScore.dimensions` object keys
4. `scoring.ts` -- keys in `calculateDimensionScores` output (auto from sections), keyword list
5. `prompts.ts` -- dimension names in prompt text
6. `demo-data.ts` -- `MaturityScore.dimensions` interface and all demo company data
7. Test files -- test data using dimension keys

### Pattern 2: Business-First Question Design

**What:** Questions must feel like talking to a business consultant, not filling out a tech survey.
**Design principles:**
- Lead with pain: "What tasks eat up the most time in your team?" not "Rate your process automation maturity"
- Use everyday language: "Where do you lose customers?" not "What is your customer churn attribution model?"
- Mix open-text (for depth) with single-choice (for quick signals)
- 3-4 questions per section, ~15-20 total
- Each question bilingual (EN/RU) in the question data structure

**Example question structure (Operations section):**
```typescript
{
  id: "ops_manual_tasks",
  text: {
    en: "What tasks or processes in your business are still done manually that you wish could be automated?",
    ru: "Какие задачи или процессы в вашем бизнесе до сих пор делаются вручную, хотя вы хотели бы их автоматизировать?",
  },
  type: "open-text",
  weight: 3,
}
```

### Pattern 3: AI as Business Analyst (Prompt Rewrite)

**What:** AI prompts shift from "evaluate AI maturity" to "diagnose business problems and prescribe automation solutions."
**Three prompt types need rewriting:**

1. **Follow-up prompt** -- After each section, AI acts as a business detective:
   - OLD: "probe deeper into AI maturity gaps"
   - NEW: "dig into specific business pain points -- ask about frequency, cost, impact of problems mentioned"
   - Industry context: "Based on the user's industry ({industry}), reference common benchmarks"

2. **Score + Roadmap prompt** (AI Call 1) -- Business health diagnosis:
   - OLD: "generate AI maturity score across 5 dimensions"
   - NEW: "generate Business Health Score -- how efficiently is this business running? Where are the biggest automation opportunities?"
   - Must frame dimensions as business health areas, not AI readiness
   - Roadmap items: "Automate X -> save Y hours/week -> $Z/month"

3. **Risk + ROI prompt** (AI Call 2) -- Business risk and savings:
   - OLD: "AI adoption risks"
   - NEW: "Business operational risks identified from answers + projected ROI from automating the specific processes the user described"
   - Risks are business risks (cash flow, single points of failure, compliance gaps), not AI risks

### Pattern 4: Scoring Level Rename

**What:** Replace CMMI-inspired AI maturity levels with business health levels.

| OLD Level | NEW Level | Range | Business Meaning |
|-----------|-----------|-------|------------------|
| Beginner | Critical | 0-20 | Business has severe inefficiencies, high risk of failure |
| Developing | Struggling | 21-40 | Many manual processes, significant pain points |
| Intermediate | Stable | 41-60 | Business runs but with notable inefficiencies |
| Advanced | Efficient | 61-80 | Well-run business with optimization opportunities |
| Leader | Optimized | 81-100 | Highly efficient, few automation gaps remain |

### Pattern 5: Demo Data Update

**What:** The 3 demo companies in `demo-data.ts` need dimension key updates.
**Approach:** Keep the same companies/industries/scores -- just rename the dimension keys in the `MaturityScore.dimensions` object and update the `MaturityScore` interface.

```typescript
// OLD
dimensions: {
  strategy: 20,
  adoption: 15,
  riskManagement: 30,
  roiTracking: 25,
  governance: 35,
}

// NEW
dimensions: {
  operations: 20,
  sales: 15,
  finance: 30,
  team: 25,
  risks: 35,
}
```

### Anti-Patterns to Avoid
- **Changing Prisma schema:** The Assessment model stores answers/results as JSON strings. Dimension names are inside the JSON, not in the schema. No migration needed.
- **Changing component architecture:** The UI components read from `ASSESSMENT_SECTIONS` data. Changing the data automatically changes what renders. Do not restructure components.
- **Changing server actions:** `actions.ts` references `ASSESSMENT_SECTIONS` and calls prompt builders. The action logic is dimension-agnostic. Do not rewrite actions.
- **Partial dimension rename:** If you rename `strategy` to `operations` in types.ts but not in schemas.ts, the Zod type inference will break. All files must change together.
- **Deleting old assessment data:** Existing assessments in the DB may have old dimension keys. The code should handle this gracefully (old assessments show as-is, new ones use new keys).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dimension rename coordination | Manual search-and-replace | Single type definition in types.ts, let TypeScript compiler find all references | Compiler catches mismatches |
| Question i18n | Separate translation files for questions | Inline `{ en, ru }` in question data (existing pattern) | Questions are data, not UI text |
| Scoring formula rewrite | New scoring algorithm | Keep existing algorithm, just update keyword list and level names | Formula logic is content-agnostic |
| Prompt templates | Inline strings in actions | Keep prompt builder functions in prompts.ts | Testable, reviewable, centralized |

## Common Pitfalls

### Pitfall 1: Incomplete Dimension Rename
**What goes wrong:** TypeScript compiles but runtime breaks because one file still uses old dimension keys.
**Why it happens:** The dimension keys appear as string literals in schemas.ts Zod definitions and as object keys in demo-data.ts -- these aren't caught by the type union change in types.ts.
**How to avoid:** Start with types.ts dimension union. Then fix every TypeScript error. Then search for string literals "strategy", "adoption", "riskManagement", "roiTracking", "governance" across all files.
**Warning signs:** Tests pass but AI output has wrong dimension keys; demo data shows `undefined` for dimension scores.

### Pitfall 2: Schema/Type Mismatch After Rename
**What goes wrong:** The `AssessmentResults` type (re-exported from demo-data.ts via types.ts) has `MaturityScore.dimensions` with old keys, but schemas.ts Zod schema has new keys. The `z.infer` type doesn't match the TypeScript interface.
**Why it happens:** Two separate definitions of the same shape -- TypeScript interface and Zod schema.
**How to avoid:** Update `MaturityScore.dimensions` in demo-data.ts FIRST (it's the canonical type definition). Then update the Zod schema to match. Then verify schemas.test.ts type compatibility tests still compile.
**Warning signs:** TypeScript errors in actions.ts where `scoreResult.output.maturityScore` is assigned to `results`.

### Pitfall 3: Keyword List Not Updated for Business Context
**What goes wrong:** Open-text scoring gives low scores because keyword bonus list still contains AI-specific terms.
**Why it happens:** `scoring.ts` has a hardcoded keyword list including "ai", "machine learning", "governance", "deployment" -- these don't match business-pain language.
**How to avoid:** Replace keyword list with business-relevant terms: "manual", "bottleneck", "customer", "revenue", "cost", "employee", "process", "inefficient", "hours", "complaints", "turnover", "invoice", "inventory", etc.
**Warning signs:** Detailed business-focused answers still get low scores.

### Pitfall 4: Processing Screen Messages Still AI-Focused
**What goes wrong:** User sees "Calculating AI maturity..." instead of "Analyzing your business..."
**Why it happens:** Processing screen component has hardcoded messages.
**How to avoid:** Update processing-screen.tsx messages and i18n keys to use business-focused language: "Finding automation opportunities...", "Calculating potential savings...", "Mapping risk areas..."
**Warning signs:** UX disconnect -- business questions followed by AI-focused processing messages.

### Pitfall 5: Test Data Using Old Dimension Keys
**What goes wrong:** Tests fail after rename because test fixtures use `strategy`, `adoption`, etc.
**Why it happens:** Test files have their own data objects with hardcoded dimension keys.
**How to avoid:** Update ALL test files simultaneously with the main code changes.
**Warning signs:** `vitest run` shows failures in schemas.test.ts and scoring.test.ts.

### Pitfall 6: i18n Keys for Dashboard Still Reference Old Names
**What goes wrong:** Dashboard page (Phase 3) will try to render dimension names and find stale i18n keys.
**Why it happens:** en.json/ru.json have `dimensions.strategy`, `dimensions.adoption`, etc.
**How to avoid:** Update i18n dimension keys now. The dashboard isn't built yet, but demo data display may use these keys.
**Warning signs:** Dashboard shows "undefined" for dimension labels when it gets built.

## Code Examples

### New Dimension Type (types.ts change)
```typescript
// OLD
export interface AssessmentSection {
  id: string;
  name: { en: string; ru: string };
  dimension: "strategy" | "adoption" | "riskManagement" | "roiTracking" | "governance";
  questions: Question[];
}

// NEW
export interface AssessmentSection {
  id: string;
  name: { en: string; ru: string };
  dimension: "operations" | "sales" | "finance" | "team" | "risks";
  questions: Question[];
}
```

### New Scoring Levels (scoring.ts change)
```typescript
// OLD
export function getMaturityLevel(score: number) {
  if (score <= 20) return { level: "Beginner", range: "0-20" };
  else if (score <= 40) return { level: "Developing", range: "21-40" };
  // ...
}

// NEW
export function getHealthLevel(score: number) {
  if (score <= 20) return { level: "Critical", range: "0-20" };
  else if (score <= 40) return { level: "Struggling", range: "21-40" };
  else if (score <= 60) return { level: "Stable", range: "41-60" };
  else if (score <= 80) return { level: "Efficient", range: "61-80" };
  else return { level: "Optimized", range: "81-100" };
}
```

### New Schema Dimensions (schemas.ts change)
```typescript
// OLD
dimensions: z.object({
  strategy: z.number(),
  adoption: z.number(),
  riskManagement: z.number(),
  roiTracking: z.number(),
  governance: z.number(),
}),

// NEW
dimensions: z.object({
  operations: z.number().describe("Operations & Processes score 0-100"),
  sales: z.number().describe("Sales & Customers score 0-100"),
  finance: z.number().describe("Finance & Resources score 0-100"),
  team: z.number().describe("Team & HR score 0-100"),
  risks: z.number().describe("Risks & Compliance score 0-100"),
}),
```

### New Business Keywords (scoring.ts change)
```typescript
// OLD keywords (AI-focused)
const keywords = ["strategy", "roadmap", "kpi", "ai", "machine learning", "governance", ...];

// NEW keywords (business-focused)
const keywords = [
  "manual", "bottleneck", "process", "automate", "automation",
  "customer", "revenue", "cost", "expense", "invoice",
  "employee", "turnover", "hiring", "training",
  "compliance", "risk", "deadline", "inventory",
  "hours", "time", "waste", "inefficient", "complaint",
  "spreadsheet", "report", "pipeline", "conversion",
];
```

### New MaturityScore Interface (demo-data.ts change)
```typescript
// OLD
export interface MaturityScore {
  overall: number;
  dimensions: {
    strategy: number;
    adoption: number;
    riskManagement: number;
    roiTracking: number;
    governance: number;
  };
}

// NEW
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
```

### Follow-Up Prompt Rewrite Example (prompts.ts)
```typescript
// NEW system prompt for follow-ups
const system = `You are a sharp business consultant conducting a diagnostic interview.
Your job is to identify where this business is bleeding money, wasting time, or at risk.

Based on the user's answers for the "${sectionName}" section, generate 1-3 follow-up
questions that dig deeper into the specific problems they described.

${roleCtx}
${langInstr}

Guidelines:
- Be a business detective: if they say "we lose customers," ask "At what stage?
  How many per month? What do they say when leaving?"
- Reference industry norms when relevant: "Typical for ${industry}: 15-20% cart abandonment"
- Keep language plain and conversational -- no jargon
- Each question should make the user think "Yes, that's exactly what I need to figure out"
- Suggestion chips should be common answers for their industry

Comprehension level: ${previousLevel ? `Previously "${previousLevel}". Adjust if their language changed.` : "Detect from answers: 'beginner' (gut feelings, simple language), 'intermediate' (knows numbers, uses some business terms), 'advanced' (thinks in metrics, processes, systems)."}`;
```

### Score & Roadmap Prompt Rewrite Example (prompts.ts)
```typescript
// NEW system prompt for Business Health Score + Automation Roadmap
const system = `You are a business efficiency analyst. Analyze assessment answers to determine
how well this business is running and where automation would have the biggest impact.

${roleCtx}
${langInstr}

Business Health Score guidelines:
- Score 5 dimensions (operations, sales, finance, team, risks) from 0-100
- Higher score = more efficient/optimized business
- Base your scores on evidence from answers: manual processes, bottlenecks, complaints, waste
- Formula scores are provided as baseline -- adjust +/- 10 based on qualitative analysis

Automation Roadmap guidelines:
- Generate 3-5 automation recommendations based on the SPECIFIC problems described
- Each item: what to automate, expected time/money saved, priority, timeline
- Be concrete: "Automate invoice processing -> save 15 hours/week -> ~$2,400/month"
- Prioritize by: quick wins first (high priority), then larger transformations
- Frame in terms the user's role cares about (CEO: revenue impact, COO: hours saved, CTO: tools needed)`;
```

## State of the Art

| Old Approach (current code) | New Approach (pivot) | Impact |
|---|---|---|
| AI Maturity assessment | Business Health assessment | All questions, prompts, scoring labels change |
| CMMI-inspired levels | Business health levels | Level names and descriptions change |
| "How mature is your AI?" | "Where is your business bleeding?" | Complete tone/framing shift |
| AI adoption risks | Business operational risks | Risk analysis framing changes |
| AI strategy roadmap | Business automation roadmap | Roadmap framing changes |

**Not changing:**
- AI SDK usage pattern (`generateText` + `Output.object()`)
- Prisma Assessment model (JSON fields are content-agnostic)
- Component architecture (data-driven rendering)
- Server action pattern
- State machine (same 5 states)

## Open Questions

1. **Industry field in User/Assessment**
   - What we know: CONTEXT.md says "Industry context matters" and questions should adapt based on industry
   - What's unclear: Where is industry stored? The User model has `role` but not `industry`. The Assessment model doesn't have it either.
   - Recommendation: Add industry as a question in the first section (Operations), or as a pre-assessment selector. Store in Assessment model as a new field, OR extract from first answer. For the rewrite, prompts can reference industry from answers rather than a dedicated field.

2. **How to handle existing assessments with old dimension keys**
   - What we know: Completed assessments in the DB have `strategy`, `adoption`, etc. in their JSON results
   - What's unclear: Whether to migrate or leave them
   - Recommendation: Leave them. Old assessments were likely test data. New assessments will use new keys. If needed, a simple migration script can rename keys in JSON strings.

3. **Processing screen messages**
   - What we know: Current messages may reference AI maturity
   - What's unclear: Exact current messages in processing-screen.tsx
   - Recommendation: Update to business-focused messages: "Analyzing your business...", "Finding automation opportunities...", "Calculating potential savings...", "Mapping risk areas..."

4. **Russian AI output quality**
   - What we know: STATE.md flags this as unknown
   - What's unclear: Quality of business-focused Russian output from Claude
   - Recommendation: Same as before -- include locale in prompts, test with both. Business language may actually be easier for AI in Russian than technical AI terminology.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 with jsdom |
| Config file | `vitest.config.ts` (exists) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SCAN-01 | New business questions exist for all 5 sections | unit | `npx vitest run src/lib/assessment/questions.test.ts --reporter=verbose` | YES -- needs updating |
| SCAN-02 | Follow-up schema validates correctly | unit | `npx vitest run src/lib/assessment/schemas.test.ts --reporter=verbose` | YES -- needs updating |
| SCAN-03 | Assessment state persists and resumes | unit | `npx vitest run src/lib/assessment/scoring.test.ts --reporter=verbose` | YES -- no change needed |
| SCAN-04 | Progress calculation from answers | unit | `npx vitest run src/lib/assessment/scoring.test.ts --reporter=verbose` | YES -- no change needed |
| SCORE-01 | Formula scoring produces valid 0-100 scores per dimension | unit | `npx vitest run src/lib/assessment/scoring.test.ts --reporter=verbose` | YES -- dimension keys update |
| SCORE-02 | Business health level assignment from scores | unit | `npx vitest run src/lib/assessment/scoring.test.ts --reporter=verbose` | YES -- level names update |
| SCORE-03 | Score+Roadmap schema matches new dimension keys | unit | `npx vitest run src/lib/assessment/schemas.test.ts --reporter=verbose` | YES -- dimension keys update |
| SCORE-04 | Risk schema matches RiskItem type | unit | `npx vitest run src/lib/assessment/schemas.test.ts --reporter=verbose` | YES -- no change |
| SCORE-05 | ROI schema matches ROIForecast type | unit | `npx vitest run src/lib/assessment/schemas.test.ts --reporter=verbose` | YES -- no change |
| SCORE-06 | Schemas work with Output.object() | unit | `npx vitest run src/lib/assessment/schemas.test.ts --reporter=verbose` | YES -- dimension keys update |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
None -- existing test infrastructure covers all phase requirements. Tests need content updates (dimension keys, level names) but no new test files are needed.

## Detailed File Change Map

This is the authoritative reference for what changes in each file:

### 1. `src/lib/demo-data.ts`
- `MaturityScore.dimensions` interface: rename 5 keys
- All 3 demo company `dimensions` objects: rename keys
- Keep score values the same

### 2. `src/lib/assessment/types.ts`
- `AssessmentSection.dimension` union: `"operations" | "sales" | "finance" | "team" | "risks"`
- Re-exports from demo-data.ts remain unchanged (types are structural)

### 3. `src/lib/assessment/questions.ts`
- Replace ALL 5 sections with new business-focused sections
- New section IDs: "operations", "sales", "finance", "team-hr", "risks-compliance"
- New dimension values: "operations", "sales", "finance", "team", "risks"
- New question IDs, text (EN/RU), types, weights
- Keep helper functions (getQuestionsForSection, getTotalQuestionCount)

### 4. `src/lib/assessment/scoring.ts`
- `getMaturityLevel` -> `getHealthLevel` (rename function + update levels)
- Update keyword list to business-focused terms
- `calculateDimensionScores` -- no logic change (reads from sections data)
- `calculateOverallScore` -- no change
- `calculateProgress` -- no change

### 5. `src/lib/assessment/schemas.ts`
- `scoreAndRoadmapSchema.maturityScore.dimensions` -- rename 5 keys
- Update `.describe()` strings to reference business health
- `followUpSchema` -- update describe strings (optional)
- `riskAndRoiSchema` -- no structural change (risk/ROI types stay same)

### 6. `src/lib/assessment/prompts.ts`
- COMPLETE REWRITE of all 3 prompt builders
- `buildFollowUpPrompt` -- business detective framing
- `buildScoreAndRoadmapPrompt` -- business health analyst framing
- `buildRiskAndRoiPrompt` -- business risk/ROI analyst framing
- Keep function signatures the same
- Keep ROLE_CONTEXT structure, update text for business framing

### 7. `src/messages/en.json` + `src/messages/ru.json`
- Update `assessment.start.title`: "Business Health Assessment"
- Update dimension names under dashboard keys
- Update any references to "AI Maturity" -> "Business Health"
- Update `assessment.complete.message`

### 8. Test files (3 files)
- `questions.test.ts` -- update dimension names in assertions
- `scoring.test.ts` -- update dimension keys in test data, level name assertions
- `schemas.test.ts` -- update dimension keys in test data objects

### 9. `src/app/[locale]/(app)/scan/components/processing-screen.tsx`
- Update processing messages to business-focused text (if hardcoded)

### 10. `src/app/[locale]/(app)/scan/assessment-flow.tsx`
- Update completion message text (if hardcoded, not from i18n)
- Line 47: "Your AI maturity assessment is complete!" -> "Your business health assessment is complete!"

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis -- all files read and understood in full
- CONTEXT.md -- locked decisions from user discussion
- REQUIREMENTS.md -- phase requirement IDs

### Secondary (MEDIUM confidence)
- AI SDK v6 patterns verified in existing working code (actions.ts already uses `generateText` + `Output.object()`)

### Tertiary (LOW confidence)
- Russian AI output quality -- still unknown, flagged in STATE.md

## Metadata

**Confidence breakdown:**
- Architecture: HIGH -- no architecture changes, existing code is working
- Content changes: HIGH -- clear mapping of old->new across all files
- Prompt quality: MEDIUM -- prompts are discretionary, quality depends on execution
- Test coverage: HIGH -- existing tests just need content updates

**Research date:** 2026-03-06 (revised for business-first pivot)
**Valid until:** 2026-04-06
