# Phase 2: Assessment & AI Engine - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning (REVISED — business-first approach)

<domain>
## Phase Boundary

Hybrid business assessment: structured questionnaire (15-20 questions across 5 business dimensions) with AI follow-up questions after each section. The assessment focuses on BUSINESS problems — inefficiencies, bottlenecks, risks, wasted resources. AI is the tool that finds solutions, NOT the subject of questions. Produces Business Health Score, Automation Roadmap, Risk Map, and ROI Forecast. Assessment is pausable/resumable.

**KEY PIVOT**: We do NOT ask "How mature is your AI?" — we ask "Where is your business bleeding money? What processes are manual? Where do you lose customers?" Then AI analyzes answers and recommends what to automate.

</domain>

<decisions>
## Implementation Decisions

### Questionnaire Design — BUSINESS-FIRST APPROACH
- **Focus on business pain, not AI knowledge**: Questions ask about business processes, inefficiencies, manual work, bottlenecks, customer complaints, revenue leaks — NOT about "AI strategy" or "AI governance"
- **5 business-centric sections**:
  1. **Operations & Processes** — What manual/repetitive work consumes the most time? Where are bottlenecks? What breaks regularly?
  2. **Sales & Customers** — How do you find customers? Where do you lose them? What's your conversion pipeline? Customer complaints?
  3. **Finance & Resources** — Where do costs grow fastest? What reporting is manual? Cash flow pain points?
  4. **Team & HR** — Hiring bottlenecks? Employee turnover causes? Training gaps? Communication overhead?
  5. **Risks & Compliance** — What keeps you up at night? Legal/regulatory burden? Data security concerns? Single points of failure?
- **Adaptive difficulty**: First questions assess user's business sophistication. Adjust language — some owners think in spreadsheets, others in gut feelings. Both are valid.
- **Hybrid presentation**: Groups of 3-4 related questions per screen
- **Conversational text with AI suggestions**: Open-ended text fields with AI-generated suggestion chips based on industry and previous answers. Suggestions help users who think "I don't know what to write" by showing common problems in their industry.
- **15-20 questions total**: ~3-4 per section. Quick scan, ~5-7 minutes
- **Industry context matters**: Questions should adapt based on declared industry (retail asks about inventory, finance asks about compliance, manufacturing asks about supply chain)

### AI Follow-up Behavior
- **After each section**: AI generates 1-3 follow-up questions digging deeper into the pain points user described
- **AI digs into specifics**: If user says "we lose customers" AI asks "At what stage? How many per month? What do they say when leaving?" — business detective work
- **5-8 follow-ups total** (default). Toggle for "Deep Analysis" mode (unlimited, AI keeps probing until confident)
- **Transparent**: Visual indicator showing "We're asking based on your answers to understand deeper"
- **Suggestions based on industry benchmarks**: AI chips can reference industry norms ("Typical for retail: 15-20% cart abandonment")

### Scoring Methodology
- **Business Health Score** (not "AI Maturity Score"): Formula scores business across 5 dimensions based on identified inefficiencies, risks, and opportunities
- **AI as analyst**: AI takes all answers and produces actionable analysis — where to automate, what risks exist, projected ROI from fixing identified problems
- **5 health levels**: Critical (0-20), Struggling (21-40), Stable (41-60), Efficient (61-80), Optimized (81-100)
- **Two AI calls**:
  - Call 1: Business Health Score + Automation Roadmap (what to automate, priority by impact, expected savings)
  - Call 2: Risk Map + ROI Forecast (business risks from answers, projected ROI from automating identified processes)
- **Role shapes output**: CEO gets "big picture" impact, COO gets "what to fix Monday morning", CTO gets "what tools/systems to implement"
- **Zod-validated structured output**: Both AI calls return validated JSON matching AssessmentResults types

### Assessment Flow & States
- **Free back-navigation**: User can jump to any completed section and modify answers
- **Section stepper progress**: Horizontal stepper showing 5 business sections, completion percentage
- **Processing screen**: "Analyzing your business..." with specific messages like "Finding automation opportunities..." "Calculating potential savings..." "Mapping risk areas..."
- **Auto-save every answer**: Each answer persisted immediately. Resume anytime.
- **State machine**: CREATED -> IN_PROGRESS -> AI_FOLLOWUP -> CALCULATING -> COMPLETE

### Claude's Discretion
- Exact question wording per section (must be plain business language, no jargon)
- AI prompt engineering for follow-ups and scoring
- Scoring formula weights
- Processing screen animation details
- How industry detection shapes question suggestions
- Comprehension level detection approach

</decisions>

<specifics>
## Specific Ideas

- The assessment should feel like talking to a smart business consultant, not filling out a tech survey
- SMB owners know their problems — they just need someone to organize them and show solutions
- Questions should make the user go "Yes! That's exactly my problem!" not "What does AI governance mean?"
- Industry-specific suggestions make users feel understood: "Other retail businesses report inventory management as #1 time sink"
- The output should be actionable: "Automate your invoice processing → save 15 hours/week → $2,400/month"
- Processing screen builds trust: specific messages show we're actually analyzing, not just waiting

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/ai/provider.ts`: AI provider via `getAIProvider()` — ready for generateText()
- `src/lib/demo-data.ts`: AssessmentResults types — output contract (may need renaming/adjusting for business-first framing)
- `src/lib/assessment/`: Types, schemas, scoring, questions — ALL NEED REWRITING for business-first approach
- `src/app/[locale]/(app)/scan/`: Assessment UI components — flow structure reusable, questions/content need rewriting

### Established Patterns
- Server components for data, client for interactivity
- Better Auth session, Prisma DB, next-intl i18n
- Assessment model in Prisma schema (structure fine, content changes)

### Integration Points
- Assessment model exists in Prisma — schema structure OK
- Scan page and flow components exist — rewrite content, keep architecture
- Demo data types define output contract

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-assessment-ai-engine*
*Context gathered: 2026-03-06 (revised: business-first pivot)*
