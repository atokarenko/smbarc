# Architecture Patterns

**Domain:** B2B AI Assessment/Management Platform for SMB
**Researched:** 2026-03-05
**Confidence:** MEDIUM (based on established SaaS patterns and Next.js architecture best practices; no WebSearch verification available)

## Recommended Architecture

**Monolithic Next.js Application with Domain-Separated Modules**

For a POC/early-stage B2B SaaS, a monolith is correct. Microservices add deployment complexity with zero benefit at this stage. Next.js App Router provides natural separation between server and client concerns via React Server Components, API routes, and server actions.

```
+------------------------------------------------------------------+
|                        NEXT.JS APPLICATION                        |
|                                                                    |
|  +------------------+  +-------------------+  +-----------------+ |
|  |   PUBLIC PAGES   |  |  ASSESSMENT FLOW  |  |   DASHBOARDS    | |
|  |  Landing, Auth   |  |  Questionnaire    |  |  CEO / COO / CTO| |
|  |                  |  |  AI Follow-up     |  |  Role-filtered   | |
|  +--------+---------+  +--------+----------+  +--------+--------+ |
|           |                     |                       |          |
|  +--------+---------------------+-----------------------+--------+ |
|  |                    SHARED UI LAYER                             | |
|  |  Components, i18n (EN/RU), Layout, Navigation                 | |
|  +---------------------------------------------------------------+ |
|           |                     |                       |          |
|  +--------+---------------------+-----------------------+--------+ |
|  |                   SERVER LAYER (App Router)                    | |
|  |  Server Actions | API Routes | Server Components              | |
|  +-------+------------------+-------------------+----------------+ |
|          |                  |                   |                   |
|  +-------+------+  +-------+--------+  +-------+--------------+   |
|  | DOMAIN LOGIC |  | AI ABSTRACTION |  | REPORT GENERATOR     |   |
|  | Assessment   |  | LLM Provider   |  | PDF/Dashboard output |   |
|  | Scoring      |  | Prompt Engine  |  |                      |   |
|  | Risk Calc    |  | Response Parse |  |                      |   |
|  +-------+------+  +-------+--------+  +-------+--------------+   |
|          |                  |                   |                   |
|  +-------+------------------+-------------------+----------------+ |
|  |                    DATA ACCESS LAYER                           | |
|  |  Prisma ORM | Repository Pattern                              | |
|  +---------------------------------------------------------------+ |
|                             |                                      |
+-----------------------------+--------------------------------------+
                              |
              +---------------+---------------+
              |          DATABASE              |
              |  PostgreSQL (prod)             |
              |  SQLite (POC/local dev)        |
              +-------------------------------+
                              |
              +---------------+---------------+
              |     AI PROVIDER (external)     |
              |  claude-max-proxy (local)      |
              |  OpenAI / Anthropic API (prod) |
              +-------------------------------+
```

### Component Boundaries

| Component | Responsibility | Communicates With | Build Phase |
|-----------|---------------|-------------------|-------------|
| **Public Pages** | Landing, auth, onboarding | Shared UI, Server Layer | Phase 1 |
| **Assessment Flow** | Questionnaire wizard, AI follow-up questions, data collection | AI Abstraction, Domain Logic, Shared UI | Phase 2 |
| **Domain Logic** | Scoring algorithms, risk calculation, ROI forecasting, roadmap generation | Data Access, AI Abstraction | Phase 2-3 |
| **AI Abstraction Layer** | LLM provider switching, prompt management, response parsing, streaming | External AI Provider | Phase 2 |
| **Report Generator** | Transform assessment data into structured reports, PDF export | Domain Logic, Data Access | Phase 3 |
| **Dashboards** | Role-filtered views (CEO/COO/CTO), charts, metrics | Domain Logic, Shared UI, Data Access | Phase 3-4 |
| **Shared UI Layer** | Design system, i18n, layout, navigation | All frontend components | Phase 1 |
| **Data Access Layer** | Database operations, repository pattern, data validation | Database | Phase 1 |
| **i18n System** | EN/RU translations, locale detection, content switching | Shared UI, all pages | Phase 1 |

### Data Flow

**Primary Flow: Business Assessment**

```
User fills questionnaire (structured)
        |
        v
Server Action validates & stores partial answers
        |
        v
AI Abstraction generates follow-up questions
  (based on structured answers + domain context)
        |
        v
User answers AI follow-up questions
        |
        v
Domain Logic calculates:
  - AI Maturity Score (weighted scoring model)
  - Risk Map (category-based risk assessment)
  - ROI Forecast (time/cost savings projection)
  - Automation Roadmap (prioritized list)
        |
        v
Results stored in DB as Assessment record
        |
        v
Dashboard renders role-filtered view
  CEO: Strategic overview, ROI, competitive position
  COO: Operational risks, automation priority, timeline
  CTO: Technical readiness, integration complexity, stack
```

**AI Integration Flow**

```
Application Code
        |
        v
AI Provider Interface (TypeScript interface)
  generateFollowUp(context: AssessmentContext): Question[]
  generateReport(assessment: Assessment): Report
  analyzeRisks(businessData: BusinessData): RiskMap
        |
        v
Provider Implementation
  +--> ClaudeMaxProxyProvider (local dev)
  |      POST http://localhost:PORT/v1/messages
  |
  +--> AnthropicProvider (production)
  |      Anthropic SDK
  |
  +--> OpenAIProvider (alternative)
         OpenAI SDK
```

## Patterns to Follow

### Pattern 1: AI Provider Abstraction

**What:** Interface-based LLM provider with pluggable implementations. All AI calls go through a single abstraction that handles prompt construction, response parsing, error handling, and streaming.

**Why:** The project explicitly requires provider flexibility (claude-max-proxy locally, real APIs in production). This also isolates prompt engineering from business logic.

```typescript
// src/lib/ai/types.ts
interface AIProvider {
  chat(messages: ChatMessage[], options?: AIOptions): Promise<AIResponse>;
  stream(messages: ChatMessage[], options?: AIOptions): AsyncIterable<string>;
}

interface AIOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

// src/lib/ai/providers/claude-proxy.ts
class ClaudeMaxProxyProvider implements AIProvider {
  constructor(private baseUrl: string) {}
  async chat(messages, options) { /* HTTP to local proxy */ }
  async *stream(messages, options) { /* SSE from local proxy */ }
}

// src/lib/ai/index.ts
function getAIProvider(): AIProvider {
  switch (process.env.AI_PROVIDER) {
    case 'claude-proxy': return new ClaudeMaxProxyProvider(process.env.PROXY_URL);
    case 'anthropic': return new AnthropicProvider(process.env.ANTHROPIC_KEY);
    case 'openai': return new OpenAIProvider(process.env.OPENAI_KEY);
  }
}
```

### Pattern 2: Prompt Template Engine

**What:** Structured prompt templates separated from code, with variable interpolation and versioning. Assessment prompts are the core IP of this product.

**Why:** Prompts will be iterated heavily. Mixing them into business logic makes iteration painful and version tracking impossible.

```typescript
// src/lib/ai/prompts/follow-up.ts
export const FOLLOW_UP_PROMPT = {
  version: '1.0',
  system: `You are an AI business assessment expert. Based on the user's
    answers to a structured questionnaire about their {{industry}} business,
    generate {{count}} targeted follow-up questions to deepen the assessment.

    Focus areas: {{focusAreas}}
    Already covered: {{coveredTopics}}

    Response format: JSON array of {question, category, why}`,

  buildMessages(context: FollowUpContext): ChatMessage[] {
    return [
      { role: 'system', content: interpolate(this.system, context) },
      { role: 'user', content: JSON.stringify(context.answers) }
    ];
  }
};
```

### Pattern 3: Assessment as State Machine

**What:** The assessment flow is a finite state machine: CREATED -> QUESTIONNAIRE -> AI_FOLLOWUP -> CALCULATING -> COMPLETE. Each state has clear entry/exit conditions and allowed transitions.

**Why:** Assessment is multi-step, can be abandoned mid-way, and involves async AI calls. A state machine prevents invalid states (e.g., generating a report before questionnaire is complete) and enables resume-from-where-you-left-off.

```typescript
type AssessmentState =
  | 'CREATED'          // Company profile entered
  | 'QUESTIONNAIRE'    // Structured questions in progress
  | 'AI_FOLLOWUP'      // AI-generated follow-up questions
  | 'CALCULATING'      // Scoring & analysis in progress
  | 'COMPLETE'         // Results ready
  | 'ERROR';           // Something failed

const TRANSITIONS: Record<AssessmentState, AssessmentState[]> = {
  CREATED: ['QUESTIONNAIRE'],
  QUESTIONNAIRE: ['AI_FOLLOWUP', 'ERROR'],
  AI_FOLLOWUP: ['CALCULATING', 'ERROR'],
  CALCULATING: ['COMPLETE', 'ERROR'],
  COMPLETE: [],
  ERROR: ['QUESTIONNAIRE', 'AI_FOLLOWUP'], // retry points
};
```

### Pattern 4: Domain Module Organization

**What:** Group code by business domain, not by technical layer.

**Why:** This project has clear domains (assessment, scoring, risk, reporting). Domain grouping keeps related code together and makes it easy to understand what each module does.

```
src/
  domains/
    assessment/
      components/         # React components for assessment flow
      actions.ts          # Server actions (create, update, submit)
      schema.ts           # Zod validation schemas
      types.ts            # TypeScript types
      scoring.ts          # Maturity score calculation
      risk.ts             # Risk map calculation
      roi.ts              # ROI forecast calculation
    dashboard/
      components/         # Dashboard charts, widgets
      role-views/         # CEO, COO, CTO specific views
      actions.ts
    catalog/
      components/         # AI module catalog (MVP: display only)
      data.ts             # Static catalog data
    report/
      generator.ts        # Report compilation
      pdf.ts              # PDF export
      templates/          # Report templates
  lib/
    ai/                   # AI provider abstraction
    db/                   # Prisma client, repositories
    i18n/                 # Internationalization
    auth/                 # Simple auth (POC)
  app/                    # Next.js App Router pages
    [locale]/             # Locale-prefixed routes
      page.tsx            # Landing
      assessment/
        new/page.tsx
        [id]/page.tsx
        [id]/results/page.tsx
      dashboard/page.tsx
      catalog/page.tsx
```

### Pattern 5: i18n with next-intl and Locale-Prefixed Routes

**What:** Use `next-intl` with `[locale]` route segments for EN/RU support. Store translations as JSON files, one per namespace per locale.

**Why:** `next-intl` is the standard solution for Next.js App Router i18n. Locale-prefixed URLs (/en/dashboard, /ru/dashboard) are SEO-friendly and allow easy locale switching. Separating translations by namespace (assessment, dashboard, common) keeps files manageable.

```
messages/
  en/
    common.json       # Shared UI strings
    assessment.json   # Assessment flow strings
    dashboard.json    # Dashboard strings
    report.json       # Report strings
  ru/
    common.json
    assessment.json
    dashboard.json
    report.json
```

### Pattern 6: Role-Based View Filtering (Not Authorization)

**What:** For POC, implement role as a view filter, not a security boundary. Same data, different presentation. CEO sees strategic metrics, COO sees operational, CTO sees technical.

**Why:** Building real RBAC for a POC is over-engineering. The value proposition is "different roles need different views of the same assessment data." Implement this as view configuration, not access control.

```typescript
// src/domains/dashboard/role-views/config.ts
const ROLE_VIEWS: Record<Role, DashboardConfig> = {
  CEO: {
    sections: ['maturity-score', 'roi-summary', 'competitive-position', 'strategic-risks'],
    metrics: ['total-savings', 'automation-coverage', 'risk-level'],
    language: 'business',  // affects how metrics are labeled
  },
  COO: {
    sections: ['automation-roadmap', 'operational-risks', 'process-impact', 'timeline'],
    metrics: ['hours-saved', 'process-count', 'implementation-effort'],
    language: 'operational',
  },
  CTO: {
    sections: ['tech-readiness', 'integration-complexity', 'data-architecture', 'tech-risks'],
    metrics: ['api-count', 'data-quality', 'security-score'],
    language: 'technical',
  },
};
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Over-Engineering Auth for POC
**What:** Building full OAuth/SSO/RBAC for a demo product.
**Why bad:** Weeks of work for something out of scope. POC needs to demonstrate value, not security.
**Instead:** Simple session-based auth or even a role-selector dropdown for demo purposes. Real auth is a v2 concern.

### Anti-Pattern 2: Real-Time AI Streaming Everywhere
**What:** Streaming every AI response token-by-token to the UI.
**Why bad:** Adds complexity (SSE, state management for partial responses) for minimal POC benefit. Follow-up question generation does not need streaming -- the user waits for a batch of questions, not a character stream.
**Instead:** Use streaming only for the report generation step where wait times are long. Use simple request/response for follow-up questions and scoring.

### Anti-Pattern 3: Premature Database Optimization
**What:** Complex schemas, materialized views, caching layers.
**Why bad:** POC handles single-digit concurrent users. Optimization is waste.
**Instead:** Simple relational schema. SQLite for local dev (zero config), PostgreSQL-compatible schema for production later. Prisma makes switching trivial.

### Anti-Pattern 4: Tightly Coupling Prompts to Business Logic
**What:** Embedding LLM prompts directly in scoring/assessment functions.
**Why bad:** Prompts change 10x more frequently than business logic. When prompts are scattered through business code, iterating on them requires touching critical logic.
**Instead:** Prompt Template Engine (Pattern 2) with clear separation.

### Anti-Pattern 5: Building a Microservice for AI
**What:** Separate AI service with its own deployment, API, and data store.
**Why bad:** Adds network hops, deployment complexity, and operational burden for a POC. The AI abstraction layer within the monolith provides the same flexibility without the overhead.
**Instead:** In-process AI provider abstraction. Extract to a service only when you need independent scaling (thousands of concurrent assessments).

## Database Schema (Conceptual)

```
Company
  id, name, industry, size, locale, created_at

Assessment
  id, company_id, state (enum), role, created_at, completed_at

QuestionnaireAnswer
  id, assessment_id, question_key, answer_value, section

AIFollowUpQuestion
  id, assessment_id, question_text, category, answer_value

AssessmentResult
  id, assessment_id, maturity_score, risk_map (JSON),
  roi_forecast (JSON), automation_roadmap (JSON),
  raw_ai_response (JSON)
```

Key design decisions:
- **Store raw AI responses** alongside parsed results. LLM outputs are non-deterministic; keeping originals enables debugging and re-parsing without re-running expensive AI calls.
- **JSON columns for complex results** (risk_map, roi_forecast). These are read-heavy, write-once structures. No need to normalize into separate tables for POC.
- **State on Assessment** enables resume and error recovery.

## Suggested Build Order

Based on dependency analysis, components should be built in this order:

```
Phase 1: Foundation (no AI needed)
  1. Next.js project setup + Prisma + SQLite
  2. Shared UI layer (design system, layout)
  3. i18n infrastructure (next-intl, locale routing)
  4. Simple auth / role selector
  5. Database schema + seed data

Phase 2: Core Assessment (AI integration starts)
  6. AI Provider Abstraction (interface + claude-proxy impl)
  7. Structured questionnaire flow (state machine)
  8. AI follow-up question generation
  9. Scoring algorithms (maturity, risk, ROI)

Phase 3: Output & Visualization
  10. Assessment results page
  11. Report generator
  12. Role-based dashboard views (CEO/COO/CTO)
  13. Charts and visualizations

Phase 4: Polish & Demo
  14. AI module catalog (static showcase)
  15. PDF export
  16. Demo data / guided walkthrough
  17. Mobile-responsive polish
```

**Why this order:**
- Phase 1 has zero external dependencies and produces a runnable app skeleton
- Phase 2 introduces AI but only for generation (not presentation), keeping scope tight
- Phase 3 depends on Phase 2 data to have something to display
- Phase 4 is additive polish that can be cut for time

## Scalability Considerations

| Concern | POC (1-5 users) | Early Product (100 users) | Scale (10K+ users) |
|---------|-----------------|---------------------------|---------------------|
| **Database** | SQLite, local file | PostgreSQL, single instance | PostgreSQL with read replicas |
| **AI calls** | claude-max-proxy, sequential | API with rate limiting | Queue-based processing, multiple providers |
| **Auth** | Role selector / basic session | NextAuth.js with credentials | OAuth/SSO, proper RBAC |
| **Caching** | None | In-memory (unstable_cache) | Redis for sessions + AI response cache |
| **Deployment** | Local `npm run dev` | Single VPS / Vercel | Containerized, auto-scaling |
| **i18n** | 2 locales (EN/RU) | 2-5 locales | ICU message format, professional translations |

## Sources

- Next.js App Router architecture patterns (official docs, well-established patterns)
- Prisma ORM for database abstraction (standard in Next.js ecosystem)
- next-intl for internationalization (de facto standard for App Router i18n)
- B2B SaaS assessment platform patterns (domain knowledge from established platforms like Gartner IT Score, McKinsey digital assessment tools)
- LLM integration patterns (provider abstraction is standard practice across AI-powered applications)
- Assessment state machine pattern (standard UX pattern for multi-step data collection flows)

**Confidence note:** Architecture recommendations are based on well-established Next.js/React patterns and B2B SaaS conventions. The AI provider abstraction pattern is standard across the industry. MEDIUM confidence overall because WebSearch verification was unavailable to confirm latest next-intl API surface and claude-max-proxy compatibility details.
