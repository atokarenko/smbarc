# Domain Pitfalls

**Domain:** B2B AI Assessment / Management Platform for SMB
**Project:** AI Architect
**Researched:** 2026-03-05
**Confidence:** MEDIUM (based on domain expertise; WebSearch unavailable for verification)

---

## Critical Pitfalls

Mistakes that cause rewrites, lost credibility, or product failure.

### Pitfall 1: Assessment That Feels Like a Survey, Not Intelligence

**What goes wrong:** The business scan devolves into a long, generic questionnaire. Users fill in 30+ fields, click submit, and get a report that feels like a template with their company name injected. There is no "aha moment." The output reads like a generic consulting deck, not a personalized AI strategy.

**Why it happens:** Developers focus on data collection completeness instead of insight quality. They try to cover every business domain in the questionnaire, making it exhaustive but exhausting. The AI follow-up questions are shallow ("Tell me more about X") instead of probing.

**Consequences:**
- Users abandon the scan midway (SMB owners have zero patience for surveys)
- Completed assessments produce generic reports that don't impress demo audiences
- The product feels like a glorified Google Form + ChatGPT wrapper

**Prevention:**
- Cap the initial structured questionnaire at 8-12 questions max
- Make AI follow-up questions contextual and surprising (e.g., "You said you have 15 employees but no CRM -- how do you track customer conversations today?")
- Show progressive insights DURING the scan, not only at the end -- give value before asking for more input
- Test with real SMB owners early: if they say "I've seen this before," the scan is too generic

**Detection (warning signs):**
- Scan completion rate below 60%
- Users describe the output as "obvious" or "generic"
- Reports for different businesses look 80%+ similar

**Phase relevance:** Phase 1 (MVP/POC). This is the core product moment. If the scan feels dumb, the demo fails.

---

### Pitfall 2: AI Maturity Score Without Credible Methodology

**What goes wrong:** The maturity score (e.g., "Your AI Maturity: 3.2 / 10") looks arbitrary. Users ask "How did you calculate this?" and there is no defensible answer. The score doesn't map to any recognized framework, and changing one answer swings the score wildly.

**Why it happens:** Developers invent a scoring formula ad-hoc (weighted averages of questionnaire answers) without grounding it in established maturity models. The weights are guesses. Edge cases produce nonsensical results (e.g., a company with zero AI usage scores higher than one with some AI because of "readiness" factors).

**Consequences:**
- Loss of credibility with business audience -- especially CTOs and COOs who will challenge the methodology
- The score becomes meaningless if it can't be explained in 30 seconds
- Co-founders and investors will ask "What does 3.2 mean?" and "Why not 4.1?" -- no good answer kills trust

**Prevention:**
- Ground the methodology in established frameworks (CMMI for AI, Gartner AI Maturity Model, or Microsoft's AI Maturity Model) and reference them explicitly
- Define clear, named levels (e.g., Level 1: Ad-hoc, Level 2: Experimental, Level 3: Operational, Level 4: Systematic, Level 5: Transformational) instead of arbitrary numbers
- Make the score decomposable: show sub-scores per dimension (Data readiness, Process automation, Team skills, Strategy alignment, Governance)
- Include a "Here's why" explanation for each score component -- AI-generated but tied to specific user answers
- Test edge cases: what does a company with zero AI get? A company fully automated? Does the range feel right?

**Detection (warning signs):**
- You cannot explain the scoring formula to a non-technical person in under 60 seconds
- Two similar companies get very different scores
- The score doesn't change meaningfully when key answers change

**Phase relevance:** Phase 1 (POC). The maturity score IS the core deliverable. Must be credible from day one.

---

### Pitfall 3: LLM Output Treated as Structured Data Without Validation

**What goes wrong:** The app sends business data to the LLM and parses the response as structured JSON for rendering dashboards, charts, and recommendations. The LLM sometimes returns malformed JSON, hallucinated metrics, inconsistent categorizations, or recommendations that contradict each other across sections.

**Why it happens:** Developers treat LLM output as deterministic. They build the UI assuming the AI will always return well-structured, consistent data. No validation layer exists between AI output and UI rendering.

**Consequences:**
- Dashboard crashes on malformed AI responses during a demo
- ROI numbers that don't add up (AI says "save $50K" in one section and "$12K" in summary)
- Risk categories that shift between report views
- Inconsistent language (English in one section, Russian in another when the prompt leaks)

**Prevention:**
- Define strict JSON schemas (using Zod or similar) for every AI output and validate before rendering
- Implement a retry-with-correction loop: if validation fails, re-prompt with the error
- Use structured output modes where available (Claude's tool_use, OpenAI's function calling) -- do NOT rely on free-text JSON generation
- Cache validated AI outputs -- never re-generate the same assessment section twice (results will differ)
- Build a deterministic fallback: if AI fails 3 times, show a graceful degradation, not a crash

**Detection (warning signs):**
- UI occasionally shows "undefined" or broken layouts
- Same business scan produces noticeably different reports on re-run
- Numbers in different report sections don't cross-reference correctly

**Phase relevance:** Phase 1 (POC). This is an engineering fundamental. Must be solid before the demo.

---

### Pitfall 4: Building a Platform When You Need a Workflow

**What goes wrong:** The team builds a full "platform" with navigation, settings, user profiles, module catalogs, and dashboards -- but the core user journey (scan -> score -> report) is incomplete or unpolished. The demo has 15 menu items but the main workflow feels like a prototype.

**Why it happens:** Platform thinking is exciting. Building module catalogs, role-based views, and dashboards feels productive. But the core value is a single workflow: business submits info, AI analyzes, user gets actionable report. Everything else is decoration for a POC.

**Consequences:**
- Demo audience sees breadth but no depth -- "it looks big but doesn't do anything well"
- Development time spent on navigation and UI chrome instead of the core AI analysis quality
- The POC fails to demonstrate the core insight: that AI can intelligently assess a business

**Prevention:**
- For the POC: build ONE perfect workflow first. Scan -> Score -> Report. Make it impressive.
- Navigation and extra pages are "Phase 2 polish." The POC demo should be walkable in 3 minutes.
- Role-based views (CEO/COO/CTO) for POC can be filter tabs on the SAME report, not separate dashboards
- Module catalog for POC is a static page, not a dynamic system

**Detection (warning signs):**
- You have more than 5 routes/pages before the core scan-to-report flow is complete
- The team is discussing database schemas for user management before the AI analysis works well
- More time spent on layout/navigation than on prompt engineering and output quality

**Phase relevance:** Phase 1 (POC). Ruthless scope control is the difference between a convincing demo and a half-built platform.

---

### Pitfall 5: Prompt Engineering as Afterthought

**What goes wrong:** The team treats AI prompts as simple strings that "just work." Prompts are inline in code, not versioned, not tested, and not iterated. The quality of the AI assessment -- the ENTIRE product value -- depends on prompts that got zero systematic attention.

**Why it happens:** Developers focus on the application layer (API routes, database, UI components) because that is familiar work. Prompt engineering feels like "just writing text" and gets deferred. But for an AI-native product, prompt quality IS product quality.

**Consequences:**
- AI output is mediocre, generic, or inconsistent
- Changing one prompt breaks the flow of downstream prompts (e.g., the scoring prompt expects data the scan prompt no longer produces)
- No way to A/B test or improve prompts systematically
- Switching AI providers (claude-max-proxy to OpenAI API) requires rewriting all prompts because they were implicitly tuned for one model

**Prevention:**
- Store prompts as versioned template files, not inline strings
- Create a prompt testing harness: feed the same 3-5 test business profiles through the pipeline and check output quality
- Document prompt dependencies: which prompts feed which, what format each expects
- Include example outputs in each prompt (few-shot) to stabilize format
- Make the AI provider abstraction prompt-aware: different models may need different prompt styles

**Detection (warning signs):**
- Prompts are embedded in API route handlers
- No test fixtures for AI outputs
- Switching from one model version to another breaks the report

**Phase relevance:** Phase 1 (POC). Prompts are the product. Treat them as first-class artifacts from day one.

---

## Moderate Pitfalls

### Pitfall 6: Multilingual AI Output Is Harder Than Multilingual UI

**What goes wrong:** The team implements i18n for UI labels (buttons, headers, navigation) but forgets that the AI-generated content -- which is 80% of what users see -- also needs to be consistently in the right language. The AI mixes languages, uses awkward translations, or produces Russian business terms that don't exist.

**Prevention:**
- Enforce language in EVERY prompt, not just the system message
- Include language-specific examples in few-shot prompts
- For POC: pick ONE language for AI output (Russian for the demo audience) and translate UI only. Don't try to make AI output bilingual in Phase 1.
- Test AI output in both languages with the same input -- quality often differs significantly between languages

**Detection (warning signs):**
- AI responses contain mixed-language content
- Business terminology sounds unnatural in one language
- Report quality is noticeably worse in one language

**Phase relevance:** Phase 1 design decision, Phase 2 implementation. For POC, hardcode the AI output language.

---

### Pitfall 7: Mock Data That Doesn't Stress the System

**What goes wrong:** Mock data for the demo represents a "perfect" SMB: clear departments, standard processes, obvious AI opportunities. The demo goes great, but real businesses have messy, contradictory, incomplete data. The system was never tested against edge cases.

**Prevention:**
- Create 3-5 mock business profiles that represent DIFFERENT archetypes:
  - Solo entrepreneur (1 person, no departments)
  - Small team (5-10 people, some processes)
  - Growing SMB (30-50 people, structured)
  - Non-standard business (creative agency, manufacturing, services)
- Include at least one "adversarial" profile: contradictory answers, vague responses, unusual business model
- Test the AI pipeline against ALL profiles before the demo

**Detection (warning signs):**
- Only one mock business profile exists
- The demo always uses the same example
- Nobody has tested with a business that doesn't fit the expected pattern

**Phase relevance:** Phase 1 (POC). Multiple mock profiles make the demo more convincing and stress-test the AI.

---

### Pitfall 8: ROI Forecasts That Destroy Credibility

**What goes wrong:** The ROI forecast module produces specific dollar amounts ("You will save $127,450 per year") that are impossible to justify. Users immediately ask "Where did that number come from?" and the answer is "The AI estimated it based on industry averages" -- which is not credible for a specific business.

**Prevention:**
- Use ranges, not point estimates ("$80K-$150K annually")
- Show the assumptions explicitly ("Based on: 15 employees * avg 5 hrs/week on manual data entry * $35/hr")
- Qualify with confidence levels ("HIGH confidence: email automation savings; LOW confidence: revenue growth from AI-driven sales")
- Benchmark against published industry data where possible, and cite sources
- Label clearly: "Estimated potential" not "You will save"

**Detection (warning signs):**
- ROI numbers have false precision (cents, exact dollars)
- No assumptions or methodology shown
- Numbers seem "too good to be true" -- this kills trust immediately

**Phase relevance:** Phase 1 (POC). ROI is a key demo talking point. It must feel honest, not inflated.

---

### Pitfall 9: AI Provider Abstraction That Over-Engineers Too Early

**What goes wrong:** The team builds a sophisticated AI provider abstraction layer (with plugin architecture, streaming support, retry strategies, model routing) before validating that the core product works with ONE provider. Weeks are spent on infrastructure that doesn't improve the POC demo.

**Prevention:**
- For POC: a simple interface with ONE implementation (claude-max-proxy) is sufficient
  ```typescript
  interface AIProvider {
    generate(prompt: string, schema: ZodSchema): Promise<T>
  }
  ```
- Do NOT build: model routing, fallback chains, streaming, token counting, cost tracking
- Swap-ability comes from having the interface, not from building all the implementations
- Add providers when there is an actual need (e.g., a customer requires OpenAI)

**Detection (warning signs):**
- More than 200 lines of code in the AI abstraction layer for POC
- Discussions about "which models to support" before the product works with one
- Building config UI for model selection

**Phase relevance:** Phase 1 (POC). Interface yes, elaborate implementation no.

---

### Pitfall 10: Dashboard Visualization Before Data Model Stability

**What goes wrong:** The team builds beautiful charts and dashboards, then changes the AI output format (because prompt engineering is iterative) and has to rebuild all visualizations. This cycle repeats 3-4 times, burning significant development time.

**Prevention:**
- Stabilize the AI output schema FIRST (using Zod schemas as contracts)
- Build visualizations only after the schema has been tested with 3+ mock profiles without changes
- Start with simple data tables, not charts. Tables are trivial to update when the schema changes. Charts are not.
- Use a charting library that binds to data shapes (Recharts, not raw D3)

**Detection (warning signs):**
- Chart components are being rewritten for the third time
- AI output format changes break the dashboard
- More time debugging chart rendering than improving AI analysis quality

**Phase relevance:** Phase 1 (POC). Stabilize data contracts before building visualizations.

---

## Minor Pitfalls

### Pitfall 11: Ignoring AI Response Latency in UX

**What goes wrong:** A full business assessment requires multiple LLM calls (scan analysis, scoring, report generation, ROI calculation). Each takes 5-15 seconds. The user clicks "Generate Report" and stares at a spinner for 45-90 seconds, then either refreshes (losing everything) or assumes it's broken.

**Prevention:**
- Show progressive results: render each section as it completes, not all at once
- Use streaming where the AI provider supports it (but only for the final report, not for structured data)
- Show a step-by-step progress indicator: "Analyzing processes... Calculating maturity score... Generating recommendations..."
- For POC: pre-generate reports for mock profiles so the demo doesn't have awkward wait times

**Phase relevance:** Phase 1 (POC). A 60-second spinner kills a demo.

---

### Pitfall 12: Role-Based Views as Separate Codepaths

**What goes wrong:** CEO, COO, and CTO views are implemented as completely separate pages/components with duplicated logic. Any change to the report structure requires updates in three places.

**Prevention:**
- Implement roles as DATA FILTERS on the same report, not separate rendering paths
- One report component, with a role-aware filter that shows/hides/reorders sections
- For POC: a simple tab switcher on the report page is sufficient

**Phase relevance:** Phase 1 (POC). Keep it simple -- tabs, not separate dashboards.

---

### Pitfall 13: Saving State Without a Real Database in POC

**What goes wrong:** The POC starts with in-memory state or JSON files, then the team tries to "add a database later." The data model was never designed for persistence, and retrofitting it requires touching every API endpoint.

**Prevention:**
- Use SQLite (via Prisma or Drizzle) from day one -- zero infrastructure overhead, file-based, but gives you a real data model
- Define the schema for: BusinessProfile, Assessment, Report, MaturityScore
- Even for POC, having persistent data means you can restart the app without losing demo data

**Phase relevance:** Phase 1 (POC). SQLite is free complexity-wise and saves pain later.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Business scan (questionnaire + AI) | Too many questions, generic feel (Pitfall 1) | Cap at 8-12 questions, show insights during scan |
| AI Maturity Score | Arbitrary scoring, no credible methodology (Pitfall 2) | Ground in established framework, named levels, decomposable |
| Report generation | LLM output parsing failures (Pitfall 3) | Zod validation, structured output mode, retry loop |
| Overall POC scope | Platform over-building (Pitfall 4) | ONE workflow first: scan -> score -> report |
| AI integration | Prompt quality neglected (Pitfall 5) | Prompts as versioned files, test fixtures |
| Multilingual | AI output language mixing (Pitfall 6) | Pick one language for AI output in POC |
| Demo preparation | Single happy-path mock (Pitfall 7) | 3-5 diverse business profiles |
| ROI forecasting | False precision kills trust (Pitfall 8) | Ranges, visible assumptions, confidence labels |
| AI abstraction | Over-engineering (Pitfall 9) | Simple interface, one implementation |
| Dashboard | Visualization churn from schema changes (Pitfall 10) | Stabilize schema first, tables before charts |
| UX during generation | Long wait times (Pitfall 11) | Progressive rendering, pre-generated demo data |
| Role-based views | Code duplication (Pitfall 12) | Filter pattern, not separate codepaths |
| Data persistence | In-memory state for POC (Pitfall 13) | SQLite from day one |

## Priority Order for POC

The pitfalls that will most likely derail the POC demo, in order:

1. **Pitfall 4** (Platform over-building) -- the most common POC killer
2. **Pitfall 5** (Prompt quality) -- determines whether the demo impresses
3. **Pitfall 1** (Generic assessment) -- the "so what?" problem
4. **Pitfall 3** (LLM output validation) -- the "it crashed during demo" problem
5. **Pitfall 2** (Scoring credibility) -- the "why should I trust this?" problem

## Sources

- Domain expertise in B2B SaaS product development and AI-native applications
- Established AI maturity frameworks: CMMI Institute AI Maturity Model, Gartner AI Maturity Model
- Common patterns observed in LLM-powered application development
- **Confidence note:** WebSearch was unavailable. Findings are based on domain knowledge. Recommendations for established frameworks (CMMI, Gartner) should be verified against current documentation before implementation.
