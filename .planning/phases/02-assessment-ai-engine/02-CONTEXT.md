# Phase 2: Assessment & AI Engine - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Hybrid business assessment: structured questionnaire (15-20 questions across 5 dimensions) with AI follow-up questions after each section. Produces AI Maturity Score, Automation Roadmap, Risk Map, and ROI Forecast. Assessment is pausable/resumable. No dashboard visualization changes (Phase 3) -- this phase stores results that existing demo dashboard can render.

</domain>

<decisions>
## Implementation Decisions

### Questionnaire Design
- **Adaptive difficulty**: First 1-2 questions assess user's comprehension level. If user understands professional terms, questions use business/technical language. If not, questions are simplified to plain language. AI determines the level.
- **5 sections matching maturity dimensions**: Strategy, Adoption, Risk Management, ROI Tracking, Governance
- **Hybrid presentation**: Groups of 3-4 related questions per screen
- **Conversational text with AI suggestions**: Primary input is open-ended text fields, but with AI-generated suggestion chips (2-3 pre-filled answer variants) based on previous answers and detected user level
- **15-20 questions total**: ~3-4 per dimension. Quick scan, ~5-7 minutes

### AI Follow-up Behavior
- **After each section**: AI generates 1-3 follow-up questions per section based on answers, before moving to next section
- **5-8 follow-ups total** (default mode). Toggle switch at assessment start to enable "AI Decides" mode (unlimited follow-ups, AI stops when confident)
- **Transparent**: Visual indicator showing "AI is asking based on your answers" -- distinct from structured questions
- **Adaptive suggestions**: Claude's Discretion on whether AI-suggested chips adapt to comprehension level

### Scoring Methodology
- **Formula + AI enrichment**: Structured answers feed a weighted scoring formula across 5 dimensions. AI enriches with narrative descriptions, roadmap priorities, risk explanations, ROI reasoning
- **5 CMMI-inspired levels**: Beginner (0-20), Developing (21-40), Intermediate (41-60), Advanced (61-80), Leader (81-100) -- matches existing demo data types
- **Two AI calls**:
  - Call 1: Score analysis + Automation Roadmap (what to automate, priorities, expected impact)
  - Call 2: Risk Map + ROI Forecast (risk categories with severity, savings projections with confidence ranges)
- **Role shapes output**: AI prompt includes user's role (CEO/COO/CTO). CEO gets strategic framing, COO gets operational emphasis, CTO gets technical depth. Same underlying data, different narrative angle.
- **Zod-validated structured output**: Both AI calls return Zod-validated JSON matching existing AssessmentResults types

### Assessment Flow & States
- **Free back-navigation**: User can jump to any completed section and modify answers. AI follow-ups for that section re-run on modification
- **Section stepper progress**: Horizontal stepper showing all 5 dimensions, current section highlighted, completion percentage visible
- **Processing screen on completion**: After final answer, animated "Analyzing your business..." screen (15-30 seconds) while AI calls run. Builds anticipation.
- **Auto-save every answer**: Each answer persisted to DB immediately. User can close browser and resume exactly where they left off. No explicit save button needed.
- **Assessment state machine**: CREATED -> IN_PROGRESS -> AI_FOLLOWUP -> CALCULATING -> COMPLETE

### Claude's Discretion
- Exact questionnaire questions and wording per dimension
- AI prompt engineering for follow-up generation and scoring
- Scoring formula weights per dimension
- Processing screen animation and messaging details
- Suggestion chip generation strategy
- How comprehension level detection works (could be first question, could be continuous)

</decisions>

<specifics>
## Specific Ideas

- The assessment should feel like a smart conversation, not a bureaucratic form
- SMB users often lack AI terminology -- the adaptive difficulty is critical for not losing them
- AI-suggested answer chips help users who don't know what to write but shouldn't feel limiting
- The "AI Decides" toggle is a power-user feature -- default 5-8 follow-ups is the demo-friendly path
- Processing screen is an opportunity to build trust: "We're analyzing 47 data points across 5 dimensions..."

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/ai/provider.ts`: AI provider via `getAIProvider()` -- ready to call with `generateText()`
- `src/lib/ai/types.ts`: `AIHealthStatus` type -- pattern for AI response types
- `src/lib/demo-data.ts`: `AssessmentResults`, `MaturityScore`, `RoadmapItem`, `RiskItem`, `ROIForecast` types -- scoring output MUST match these interfaces
- `src/components/ui/`: Full shadcn/ui component library (Button, Card, Input, Select, etc.)
- `src/i18n/`: next-intl i18n setup -- all assessment UI must be bilingual (EN/RU)

### Established Patterns
- Server components for data loading, client components for interactivity (dashboard pattern from Phase 1)
- Better Auth session check via `auth.api.getSession()` in server components
- Prisma for DB access via `src/lib/db/prisma.ts`
- Full response mode (no streaming) -- loading spinner then complete result

### Integration Points
- `prisma/schema.prisma`: Needs new Assessment model with state, answers, results
- `src/app/[locale]/(app)/scan/page.tsx`: Placeholder page exists -- replace with assessment UI
- `src/lib/demo-data.ts`: Output types are the contract -- AI-generated results must match `AssessmentResults`
- Company model has `assessmentResults` JSON field -- can store results there or in new Assessment table

</code_context>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 02-assessment-ai-engine*
*Context gathered: 2026-03-06*
