# Phase 2: Assessment & AI Engine - Research

**Researched:** 2026-03-06
**Domain:** Multi-step questionnaire with AI-powered follow-ups and structured output generation
**Confidence:** HIGH

## Summary

Phase 2 builds a hybrid business assessment flow: a structured 5-section questionnaire (15-20 questions) with AI-generated follow-up questions after each section, culminating in AI-generated results (Maturity Score, Automation Roadmap, Risk Map, ROI Forecast). The core technical challenges are: (1) a multi-step form with state machine management and auto-save, (2) AI calls using Vercel AI SDK v6 structured output with Zod v4 schemas, and (3) a Prisma schema extension for assessment persistence.

The existing codebase provides solid foundations: `getAIProvider()` returns an OpenAI-compatible model via `@ai-sdk/openai`, `AssessmentResults` types in `demo-data.ts` define the exact output contract, Prisma/SQLite is ready for schema extension, and shadcn/ui provides the component library. The AI SDK v6 has moved from `generateObject` to `generateText` + `Output.object()` -- this is the pattern to use.

**Primary recommendation:** Use `generateText` with `Output.object({ schema })` from AI SDK v6 for all structured AI calls. Build a state-machine-driven assessment flow with Prisma-backed persistence and server actions for mutations.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Adaptive difficulty**: First 1-2 questions assess user's comprehension level. If user understands professional terms, questions use business/technical language. If not, questions are simplified to plain language. AI determines the level.
- **5 sections matching maturity dimensions**: Strategy, Adoption, Risk Management, ROI Tracking, Governance
- **Hybrid presentation**: Groups of 3-4 related questions per screen
- **Conversational text with AI suggestions**: Primary input is open-ended text fields, but with AI-generated suggestion chips (2-3 pre-filled answer variants) based on previous answers and detected user level
- **15-20 questions total**: ~3-4 per dimension. Quick scan, ~5-7 minutes
- **After each section**: AI generates 1-3 follow-up questions per section based on answers, before moving to next section
- **5-8 follow-ups total** (default mode). Toggle switch at assessment start to enable "AI Decides" mode (unlimited follow-ups, AI stops when confident)
- **Transparent**: Visual indicator showing "AI is asking based on your answers" -- distinct from structured questions
- **Formula + AI enrichment**: Structured answers feed a weighted scoring formula across 5 dimensions. AI enriches with narrative descriptions, roadmap priorities, risk explanations, ROI reasoning
- **5 CMMI-inspired levels**: Beginner (0-20), Developing (21-40), Intermediate (41-60), Advanced (61-80), Leader (81-100)
- **Two AI calls**: Call 1: Score analysis + Automation Roadmap. Call 2: Risk Map + ROI Forecast
- **Role shapes output**: AI prompt includes user's role (CEO/COO/CTO). Different narrative angle per role.
- **Zod-validated structured output**: Both AI calls return Zod-validated JSON matching existing AssessmentResults types
- **Free back-navigation**: User can jump to any completed section and modify answers. AI follow-ups for that section re-run on modification
- **Section stepper progress**: Horizontal stepper showing all 5 dimensions, current section highlighted, completion percentage visible
- **Processing screen on completion**: Animated "Analyzing your business..." screen (15-30 seconds) while AI calls run
- **Auto-save every answer**: Each answer persisted to DB immediately. No explicit save button needed
- **Assessment state machine**: CREATED -> IN_PROGRESS -> AI_FOLLOWUP -> CALCULATING -> COMPLETE

### Claude's Discretion
- Exact questionnaire questions and wording per dimension
- AI prompt engineering for follow-up generation and scoring
- Scoring formula weights per dimension
- Processing screen animation and messaging details
- Suggestion chip generation strategy
- How comprehension level detection works (could be first question, could be continuous)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SCAN-01 | User can complete structured questionnaire covering business processes, current AI usage, risks, and strategy | 5-section questionnaire design with 3-4 questions per section, Prisma Assessment model for persistence |
| SCAN-02 | AI generates follow-up questions based on user's answers to dig deeper into specific areas | `generateText` + `Output.object()` call after each section to produce 1-3 follow-up questions |
| SCAN-03 | User can pause assessment and resume from where they left off | Auto-save via server actions on every answer, assessment state machine in DB, resume from stored state |
| SCAN-04 | Assessment progress is visible (progress bar, sections completed) | Horizontal section stepper component, completion percentage from stored answers vs total questions |
| SCORE-01 | System generates AI Maturity Score with breakdown by dimensions | Formula-based scoring across 5 dimensions + AI narrative enrichment via structured output call |
| SCORE-02 | Maturity Score is grounded in methodology with clear explanation of each level | 5 CMMI-inspired levels with score ranges, AI generates level explanations in structured output |
| SCORE-03 | System generates Automation Roadmap | AI Call 1 output includes `RoadmapItem[]` matching existing `demo-data.ts` type |
| SCORE-04 | System generates Risk Map | AI Call 2 output includes `RiskItem[]` matching existing `demo-data.ts` type |
| SCORE-05 | System generates ROI Forecast with ranges and visible assumptions | AI Call 2 output includes `ROIForecast` matching existing `demo-data.ts` type |
| SCORE-06 | All analysis outputs are generated via AI with Zod-validated structured output | `Output.object({ schema })` with Zod v4 schemas matching `AssessmentResults` interface |

</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| ai (Vercel AI SDK) | ^6.0.116 | Structured AI output generation | Already installed; `Output.object()` for Zod-validated responses |
| @ai-sdk/openai | ^3.0.41 | OpenAI-compatible provider | Already installed; connects to claude-max-proxy |
| zod | ^4.3.6 | Schema definition and validation | Already installed; Zod v4 works with AI SDK v6 `Output.object()` |
| prisma / @prisma/client | ^6.19.2 | Database ORM | Already installed; extend schema for Assessment model |
| next-intl | ^4.8.3 | i18n (EN/RU) | Already installed; all assessment UI must be bilingual |
| shadcn/ui (radix-ui) | ^1.4.3 | UI components | Already installed; Card, Input, Button, Badge, etc. |

### New Components Needed (via shadcn CLI)
| Component | Purpose | When to Use |
|-----------|---------|-------------|
| Textarea | Open-ended answer input fields | Primary questionnaire input |
| Progress | Progress bar for section completion | Assessment stepper progress indicator |
| Tabs | Section switching (optional) | Alternative to custom stepper if simpler |
| RadioGroup | Multiple choice sub-questions | Where structured options are needed |
| Switch | "AI Decides" toggle | Assessment configuration toggle |
| Label | Form field labels | Throughout questionnaire forms |

### No New Dependencies Required
The entire phase can be built with existing dependencies. No new npm packages needed.

**Installation (shadcn components only):**
```bash
npx shadcn@latest add textarea progress radio-group switch label tabs
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/[locale]/(app)/scan/
│   ├── page.tsx                    # Server component: load assessment state
│   ├── assessment-flow.tsx         # Client component: main assessment orchestrator
│   ├── components/
│   │   ├── section-stepper.tsx     # Horizontal stepper showing 5 sections
│   │   ├── question-group.tsx      # Renders 3-4 questions for a section
│   │   ├── ai-followup.tsx         # AI follow-up questions (distinct visual)
│   │   ├── suggestion-chips.tsx    # AI-generated answer chips
│   │   ├── processing-screen.tsx   # "Analyzing your business..." animation
│   │   └── assessment-config.tsx   # Toggle for AI Decides mode
│   └── actions.ts                  # Server actions for save/AI calls
├── lib/
│   ├── assessment/
│   │   ├── questions.ts            # Static questionnaire definitions (EN/RU)
│   │   ├── scoring.ts              # Formula-based scoring logic
│   │   ├── schemas.ts              # Zod schemas for AI output validation
│   │   ├── prompts.ts              # AI prompt templates
│   │   └── types.ts                # Assessment-specific types
│   └── ai/
│       └── provider.ts             # Existing -- no changes needed
├── messages/
│   ├── en.json                     # Add assessment.* keys
│   └── ru.json                     # Add assessment.* keys
└── prisma/
    └── schema.prisma               # Add Assessment model
```

### Pattern 1: Server Actions for Mutations
**What:** Use Next.js server actions for all data mutations (save answers, trigger AI calls)
**When to use:** Every answer submission, AI follow-up generation, final scoring
**Example:**
```typescript
// src/app/[locale]/(app)/scan/actions.ts
"use server";

import { generateText, Output } from "ai";
import { z } from "zod";
import { getAIProvider } from "@/lib/ai/provider";
import { prisma } from "@/lib/db/prisma";

export async function saveAnswer(
  assessmentId: string,
  sectionIndex: number,
  questionIndex: number,
  answer: string
) {
  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
  });
  if (!assessment) throw new Error("Assessment not found");

  const answers = JSON.parse(assessment.answers || "{}");
  const key = `s${sectionIndex}_q${questionIndex}`;
  answers[key] = answer;

  await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      answers: JSON.stringify(answers),
      currentSection: sectionIndex,
      updatedAt: new Date(),
    },
  });
}
```

### Pattern 2: AI Structured Output with Output.object()
**What:** Use AI SDK v6 `generateText` + `Output.object()` for Zod-validated AI responses
**When to use:** Follow-up question generation, scoring + roadmap, risk + ROI
**Example:**
```typescript
// AI SDK v6 pattern for structured output
import { generateText, Output } from "ai";
import { z } from "zod";
import { getAIProvider } from "@/lib/ai/provider";

// Follow-up question generation
const followUpSchema = z.object({
  questions: z.array(z.object({
    question: z.string(),
    context: z.string(), // why AI is asking this
    suggestedAnswers: z.array(z.string()), // 2-3 chips
  })),
  comprehensionLevel: z.enum(["beginner", "intermediate", "advanced"]),
});

export async function generateFollowUps(
  sectionAnswers: Record<string, string>,
  sectionName: string,
  previousLevel: string | null,
  role: string,
  locale: string
) {
  const { output } = await generateText({
    model: getAIProvider(),
    output: Output.object({ schema: followUpSchema }),
    system: `You are an AI business assessment assistant...`,
    prompt: `Based on the user's answers for "${sectionName}" section...`,
  });

  return output; // Zod-validated, typed as z.infer<typeof followUpSchema>
}
```

### Pattern 3: Assessment State Machine
**What:** Database-backed state machine for assessment lifecycle
**When to use:** Track assessment progress, enable pause/resume, manage transitions
```typescript
// Assessment states
type AssessmentStatus =
  | "CREATED"       // Assessment initialized, no answers
  | "IN_PROGRESS"   // User is answering structured questions
  | "AI_FOLLOWUP"   // Showing AI follow-up questions for current section
  | "CALCULATING"   // Final AI scoring in progress
  | "COMPLETE";     // Results generated and stored

// State transitions
const VALID_TRANSITIONS: Record<AssessmentStatus, AssessmentStatus[]> = {
  CREATED: ["IN_PROGRESS"],
  IN_PROGRESS: ["AI_FOLLOWUP", "CALCULATING"], // CALCULATING if last section
  AI_FOLLOWUP: ["IN_PROGRESS"],                // Move to next section
  CALCULATING: ["COMPLETE"],
  COMPLETE: [],                                 // Terminal state
};
```

### Pattern 4: Scoring Formula + AI Enrichment
**What:** Deterministic formula for numeric scores, AI for narratives/recommendations
**When to use:** Separating reliable scoring from AI creativity
```typescript
// Formula-based scoring (deterministic, no AI needed)
function calculateDimensionScore(
  sectionAnswers: Record<string, string>,
  sectionWeights: Record<string, number>
): number {
  // Map qualitative answers to numeric values
  // Apply weights per question
  // Normalize to 0-100 scale
  return normalizedScore;
}

// AI enrichment (creative, adds value)
// Score + Roadmap call receives the formula scores and raw answers
// AI uses scores as ground truth, generates narrative and roadmap
```

### Anti-Patterns to Avoid
- **Single massive AI call:** Do NOT send all answers to one AI call. Split into follow-ups (per section) + two scoring calls (Score+Roadmap / Risk+ROI) as specified.
- **Client-side AI calls:** All AI calls MUST go through server actions. Never expose AI provider to client.
- **Storing answers in client state only:** Every answer must persist to DB immediately via server action. Client state is supplementary.
- **Hardcoding questions in components:** Questions should be in a data structure (`questions.ts`), not scattered across JSX.
- **Streaming for structured output:** The project uses full response mode (loading spinner then complete result). Do NOT use `streamText` for structured output -- use `generateText`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Structured AI output | Custom JSON parsing from text | `Output.object({ schema })` from AI SDK v6 | Handles retries, validation, type inference automatically |
| Form state with auto-save | Custom useState + fetch calls | Server actions + Prisma + simple client state | Server actions give atomic saves, Prisma gives persistence |
| Multi-step progress | Custom step tracking logic | Simple state derived from DB data (currentSection, answers count) | Assessment state is already in DB; derive UI from it |
| Schema validation | Manual JSON.parse + checks | Zod v4 schemas (already installed) | Type-safe, composable, works with AI SDK |
| i18n for questions | Custom translation logic | next-intl message keys | Already established pattern in the project |

**Key insight:** The heaviest lift is prompt engineering, not infrastructure. The AI SDK, Prisma, and Next.js server actions handle the plumbing -- focus implementation effort on crafting good prompts and question design.

## Common Pitfalls

### Pitfall 1: AI Output Schema Mismatch with Demo Data Types
**What goes wrong:** AI generates output that doesn't exactly match the `AssessmentResults` interface from `demo-data.ts`, causing runtime errors when dashboard tries to render.
**Why it happens:** Zod schema for AI output is written separately from the existing types, leading to drift.
**How to avoid:** Define Zod schemas that structurally mirror the existing TypeScript interfaces. Then use `z.infer<typeof schema>` as the canonical type. Consider replacing the manual interfaces in `demo-data.ts` with Zod-inferred types.
**Warning signs:** Dashboard renders for demo data but crashes for real assessment data.

### Pitfall 2: AI Call Timeout
**What goes wrong:** AI structured output calls take too long (>30s), especially with complex schemas and large prompts.
**Why it happens:** Two sequential AI calls + complex schemas + large answer payloads.
**How to avoid:** Run the two scoring AI calls in parallel (`Promise.all`). Keep prompts focused. Set reasonable `maxTokens`. The processing screen gives 15-30s of UX cover.
**Warning signs:** Processing screen shows for >30 seconds. Consider adding a timeout with graceful error.

### Pitfall 3: SQLite JSON Field Limitations
**What goes wrong:** Trying to query inside JSON fields in SQLite for assessment answers or results.
**Why it happens:** SQLite's JSON support is limited compared to PostgreSQL. Prisma's JSON field in SQLite is stored as TEXT.
**How to avoid:** Store answers as a JSON TEXT string but always load/parse the full object. Don't try to do partial JSON queries. Keep the Assessment model flat (status, currentSection as real columns).
**Warning signs:** Complex Prisma `where` clauses on JSON fields that don't work.

### Pitfall 4: Back-Navigation Re-running AI Follow-ups
**What goes wrong:** User goes back to modify Section 2 answers, but AI follow-ups don't re-generate, leaving stale follow-up answers.
**Why it happens:** Follow-up answers from the old run are still stored.
**How to avoid:** When a user modifies answers in a section, clear that section's follow-up answers and regenerate. Track which sections have been modified since last follow-up.
**Warning signs:** AI follow-up answers reference questions that no longer exist.

### Pitfall 5: Zod v4 API Differences
**What goes wrong:** Using Zod v3 patterns like `z.string().email()` or `.strict()` that have changed in v4.
**Why it happens:** Most examples online still use Zod v3 syntax.
**How to avoid:** Use Zod v4 patterns. For simple schemas (objects, strings, numbers, arrays, enums, literals), the API is identical. Avoid `.strict()` (use `z.strictObject()`), `.passthrough()` (use `z.looseObject()`). The `.describe()` method still works in Zod v4 and is important for AI context.
**Warning signs:** Type errors or runtime errors from Zod schema definitions.

### Pitfall 6: Locale-Aware AI Prompts
**What goes wrong:** AI generates English responses when user is in Russian locale, or vice versa.
**Why it happens:** Prompt doesn't include locale instruction.
**How to avoid:** Include locale in AI system prompt: "Respond in {locale === 'ru' ? 'Russian' : 'English'}". Test with both locales. Note from STATE.md: "Russian-language AI output quality unknown -- consider English-only AI output for POC."
**Warning signs:** Mixed language in assessment results.

## Code Examples

### AI Scoring Call (Call 1: Score + Roadmap)
```typescript
// Source: Verified with installed AI SDK v6 + Zod v4
import { generateText, Output } from "ai";
import { z } from "zod";
import { getAIProvider } from "@/lib/ai/provider";

const roadmapItemSchema = z.object({
  name: z.string().describe("Name of the automation initiative"),
  description: z.string().describe("What to automate and why"),
  priority: z.enum(["high", "medium", "low"]),
  expectedImpact: z.string().describe("Expected business impact"),
  timeline: z.string().describe("Implementation timeline estimate"),
});

const scoreAndRoadmapSchema = z.object({
  maturityScore: z.object({
    overall: z.number().describe("Overall maturity score 0-100"),
    dimensions: z.object({
      strategy: z.number().describe("Strategy dimension score 0-100"),
      adoption: z.number().describe("Adoption dimension score 0-100"),
      riskManagement: z.number().describe("Risk Management dimension score 0-100"),
      roiTracking: z.number().describe("ROI Tracking dimension score 0-100"),
      governance: z.number().describe("Governance dimension score 0-100"),
    }),
  }),
  automationRoadmap: z.array(roadmapItemSchema)
    .describe("3-5 prioritized automation recommendations"),
});

export async function generateScoreAndRoadmap(
  allAnswers: Record<string, string>,
  formulaScores: Record<string, number>, // pre-calculated by formula
  role: string,
  locale: string
) {
  const { output } = await generateText({
    model: getAIProvider(),
    output: Output.object({ schema: scoreAndRoadmapSchema }),
    system: `You are an AI maturity assessment analyst. Analyze business assessment answers and generate a maturity score with automation roadmap.

Role context: The user is a ${role}. ${role === "ceo" ? "Emphasize strategic impact and business value." : role === "coo" ? "Emphasize operational efficiency and process automation." : "Emphasize technical implementation and architecture."}

Language: Respond entirely in ${locale === "ru" ? "Russian" : "English"}.

The formula-based dimension scores are provided as guidelines. You may adjust them +/- 10 points based on qualitative analysis of the answers, but stay grounded in the data.`,
    prompt: `Assessment answers:\n${JSON.stringify(allAnswers, null, 2)}\n\nFormula-based scores:\n${JSON.stringify(formulaScores, null, 2)}`,
  });

  return output;
}
```

### AI Scoring Call (Call 2: Risk + ROI)
```typescript
const riskItemSchema = z.object({
  category: z.string().describe("Risk category name"),
  level: z.enum(["high", "medium", "low"]),
  description: z.string().describe("Risk description"),
  mitigation: z.string().describe("Mitigation strategy"),
});

const roiItemSchema = z.object({
  area: z.string().describe("Business area"),
  currentCost: z.number().describe("Estimated current annual cost"),
  projectedSaving: z.number().describe("Projected annual saving with AI"),
  confidence: z.enum(["high", "medium", "low"]),
});

const riskAndRoiSchema = z.object({
  riskMap: z.array(riskItemSchema)
    .describe("3-5 risks covering legal, financial, reputational, operational, and data categories"),
  roiForecast: z.object({
    totalSavings: z.number().describe("Total projected annual savings"),
    timeframe: z.string().describe("Forecast timeframe"),
    items: z.array(roiItemSchema).describe("3-5 ROI areas with savings projections"),
  }),
});
```

### Prisma Schema Extension
```prisma
model Assessment {
  id              String   @id @default(cuid())
  userId          String
  companyId       String?
  status          String   @default("CREATED") // CREATED|IN_PROGRESS|AI_FOLLOWUP|CALCULATING|COMPLETE
  currentSection  Int      @default(0)         // 0-4 for the 5 sections
  aiDecideMode    Boolean  @default(false)      // "AI Decides" toggle
  comprehensionLevel String? // beginner|intermediate|advanced -- detected by AI
  answers         String?  // JSON: { "s0_q0": "answer", "s0_q1": "answer", ... }
  followUpAnswers String?  // JSON: { "s0_f0": "answer", ... }
  followUpQuestions String? // JSON: stored AI-generated follow-up questions per section
  formulaScores   String?  // JSON: pre-calculated formula scores per dimension
  results         String?  // JSON: full AssessmentResults after completion
  locale          String   @default("en")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Add to User model:
// assessments Assessment[]
```

### Server Action: Auto-Save Pattern
```typescript
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";

export async function saveAndContinue(
  assessmentId: string,
  sectionIndex: number,
  questionKey: string,
  answer: string
) {
  const assessment = await prisma.assessment.findUniqueOrThrow({
    where: { id: assessmentId },
  });

  const answers = JSON.parse(assessment.answers || "{}");
  answers[questionKey] = answer;

  await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      answers: JSON.stringify(answers),
      currentSection: sectionIndex,
      status: "IN_PROGRESS",
    },
  });

  // No revalidatePath needed -- client manages its own state
  // DB is source of truth for resume
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `generateObject()` | `generateText()` + `Output.object()` | AI SDK v6 (2025) | Old still works but deprecated; use new pattern |
| Zod v3 `z.string().email()` | Zod v4 `z.email()` | Zod v4 (2025) | Only affects string format validators; basic schemas unchanged |
| `zodSchema()` wrapper | Direct Zod schema in `Output.object()` | AI SDK v6 | No wrapper needed; pass schema directly |
| Client-side API calls | Server actions | Next.js 14+ (stable) | Better security, simpler auth, atomic operations |

**Deprecated/outdated:**
- `generateObject`: Still works in AI SDK v6 but deprecated. Use `generateText` + `Output.object()`.
- `streamObject`: Deprecated. Use `streamText` + `Output.object()` (but this project uses full response mode, not streaming).

## Open Questions

1. **Russian AI output quality**
   - What we know: STATE.md flags "Russian-language AI output quality unknown"
   - What's unclear: Whether claude-sonnet-4 via claude-max-proxy produces quality Russian text for structured business content
   - Recommendation: Include locale in prompts. If Russian quality is poor, consider AI output always in English with UI labels in Russian. Test during implementation.

2. **AI call latency with claude-max-proxy**
   - What we know: Health check works, but structured output calls with long prompts may take significantly longer
   - What's unclear: Actual latency for the two scoring calls with full answer payloads
   - Recommendation: Run both scoring calls in parallel. Processing screen provides 15-30s UX cover. Add timeout handling.

3. **Comprehension level detection strategy**
   - What we know: User decision says "first 1-2 questions assess level, AI determines"
   - What's unclear: Whether to use a dedicated AI call for level detection or fold it into the first section's follow-up generation
   - Recommendation: Fold into first follow-up call. After section 1 answers, the follow-up generation call also returns `comprehensionLevel`. This avoids an extra AI call.

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
| SCAN-01 | Questionnaire questions exist for all 5 sections | unit | `npx vitest run src/lib/assessment/questions.test.ts -t "questions" --reporter=verbose` | No -- Wave 0 |
| SCAN-02 | AI follow-up schema validates correctly | unit | `npx vitest run src/lib/assessment/schemas.test.ts -t "followUp" --reporter=verbose` | No -- Wave 0 |
| SCAN-03 | Assessment state persists and resumes | unit | `npx vitest run src/lib/assessment/scoring.test.ts -t "resume" --reporter=verbose` | No -- Wave 0 |
| SCAN-04 | Progress calculation from answers | unit | `npx vitest run src/lib/assessment/scoring.test.ts -t "progress" --reporter=verbose` | No -- Wave 0 |
| SCORE-01 | Formula scoring produces valid 0-100 scores per dimension | unit | `npx vitest run src/lib/assessment/scoring.test.ts -t "scoring" --reporter=verbose` | No -- Wave 0 |
| SCORE-02 | CMMI level assignment from scores | unit | `npx vitest run src/lib/assessment/scoring.test.ts -t "cmmi" --reporter=verbose` | No -- Wave 0 |
| SCORE-03 | Score+Roadmap schema matches AssessmentResults types | unit | `npx vitest run src/lib/assessment/schemas.test.ts -t "scoreRoadmap" --reporter=verbose` | No -- Wave 0 |
| SCORE-04 | Risk schema matches RiskItem type | unit | `npx vitest run src/lib/assessment/schemas.test.ts -t "riskMap" --reporter=verbose` | No -- Wave 0 |
| SCORE-05 | ROI schema matches ROIForecast type | unit | `npx vitest run src/lib/assessment/schemas.test.ts -t "roiForecast" --reporter=verbose` | No -- Wave 0 |
| SCORE-06 | Output.object() works with defined schemas | unit | `npx vitest run src/lib/assessment/schemas.test.ts -t "outputObject" --reporter=verbose` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/assessment/questions.test.ts` -- covers SCAN-01 (question structure validation)
- [ ] `src/lib/assessment/schemas.test.ts` -- covers SCAN-02, SCORE-03, SCORE-04, SCORE-05, SCORE-06 (Zod schema validation)
- [ ] `src/lib/assessment/scoring.test.ts` -- covers SCAN-03, SCAN-04, SCORE-01, SCORE-02 (formula scoring, progress, state)

## Sources

### Primary (HIGH confidence)
- Installed `ai@6.0.116` package -- verified `Output.object()`, `generateText()` exports exist and work with Zod v4
- Installed `zod@4.3.6` -- verified schema creation works with AI SDK Output.object()
- Existing codebase: `src/lib/ai/provider.ts`, `src/lib/demo-data.ts` -- verified exact types and patterns
- [AI SDK v6 Migration Guide](https://ai-sdk.dev/docs/migration-guides/migration-guide-6-0) -- generateObject to generateText migration
- [AI SDK Structured Data Docs](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) -- Output.object pattern

### Secondary (MEDIUM confidence)
- [AI SDK generateObject Reference](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object) -- deprecated but documented
- [Zod v4 Migration Guide](https://zod.dev/v4/changelog) -- breaking changes from v3

### Tertiary (LOW confidence)
- Russian AI output quality -- flagged in STATE.md as unknown, no verification available
- AI call latency through claude-max-proxy for structured output -- untested

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed, verified working together
- Architecture: HIGH - patterns follow established Next.js App Router + AI SDK conventions
- Pitfalls: HIGH - identified from real codebase constraints (SQLite, Zod v4, locale)
- AI structured output: HIGH - verified `Output.object()` works with Zod v4 via local node test

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable stack, 30 days)
