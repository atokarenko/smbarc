# Project Research Summary

**Project:** AI Architect -- B2B AI Management Platform for SMB
**Domain:** B2B SaaS / AI Assessment & Transformation Management
**Researched:** 2026-03-05
**Confidence:** MEDIUM

## Executive Summary

AI Architect is a self-serve B2B SaaS platform that scans SMB business processes, produces an AI maturity score, generates a prioritized automation roadmap, and maps risks -- essentially replacing a $50-200K consulting engagement with a $99-499/month product. The competitive gap is clear: consulting firms offer depth but not accessibility, vendor tools offer accessibility but not independence, and nobody occupies the "self-serve AI architect for SMB" position. The recommended approach is a monolithic Next.js 15 application with domain-separated modules, using the Vercel AI SDK for provider-agnostic LLM integration, SQLite for zero-config POC development (Prisma for painless PostgreSQL migration later), and shadcn/ui for rapid dashboard construction.

The core product moment is a single workflow: business scan (hybrid questionnaire + AI follow-ups) leading to maturity score leading to actionable report. Everything else -- role-based views, module catalog, benchmarking -- is decoration until that workflow is impressive. Research across all four areas converges on this: the POC must demonstrate that AI can intelligently assess a business in a way that feels like consulting, not a Google Form. Prompt engineering is product engineering for this application; it deserves first-class treatment with versioned templates, test fixtures, and systematic iteration.

The primary risks are: (1) building platform breadth before workflow depth, which is the most common POC killer; (2) treating prompt quality as an afterthought when it determines whether the demo impresses or flops; (3) producing a maturity score that feels arbitrary and destroys credibility; and (4) failing to validate LLM output before rendering, causing crashes or inconsistent data during demos. All four are Phase 1 concerns and must be addressed from day one.

## Key Findings

### Recommended Stack

The stack centers on Next.js 15 with App Router as the full-stack framework, leveraging React Server Components for server-side data fetching and the Vercel AI SDK (v4) for provider-agnostic LLM integration. SQLite via Prisma provides zero-config persistence for POC with a clear PostgreSQL migration path. The entire stack is JavaScript/TypeScript end-to-end per project constraints.

**Core technologies:**
- **Next.js 15 + React 19 + TypeScript 5.6:** Full-stack framework with Server Components, single deploy unit, type safety across the board
- **Vercel AI SDK (v4) + Zod:** Provider-agnostic LLM abstraction with structured output validation; Zod serves double duty for AI output schemas and API validation
- **Prisma + SQLite (POC) / PostgreSQL (prod):** Schema-first ORM with migration tooling; SQLite for zero-config local dev, Prisma makes the production switch a config change
- **shadcn/ui + Tailwind CSS 4 + Recharts:** Accessible UI components with full control, utility CSS, and composable charting for dashboard visualizations
- **next-intl:** App Router native i18n for EN/RU with Server Component support
- **Auth.js v5:** Lightweight auth for POC; can start even simpler with a role-selector dropdown for demos

**Version caveat:** All versions are based on May 2025 training data. next-intl v4 and Auth.js v5 stability should be verified before project init.

### Expected Features

**Must have (table stakes):**
- Business Process Scan (hybrid questionnaire + AI follow-ups) -- the core product experience
- AI Maturity Score with explainable methodology and named levels
- Automation Roadmap with prioritized, impact-estimated recommendations
- Dashboard tying all outputs together
- PDF/Report Export for stakeholder sharing
- User Authentication (simple for POC)
- Multi-language UI (EN minimum, RU for target market)

**Should have (differentiators):**
- AI-powered follow-up questions -- the "consultant experience" that separates this from static tools
- Risk Map (legal, financial, operational, data, reputational dimensions)
- ROI Forecast with transparent assumptions and ranges
- Role-based views (CEO/COO/CTO) as data filters on the same report
- AI Module Catalog as a static showcase

**Defer (v2+):**
- Comparative Benchmarking (requires aggregate data)
- AI Compliance Tracker (high complexity, shifting regulations)
- Real CRM/ERP integrations (each is a product in itself)
- Team AI Literacy Assessment
- Billing/subscription management

**Critical path:** Auth > Scan > Maturity Score > Roadmap > Dashboard > Export

### Architecture Approach

Monolithic Next.js application with domain-separated modules, not microservices. Code is organized by business domain (assessment, dashboard, catalog, report) rather than technical layer. The assessment flow is modeled as a finite state machine (CREATED > QUESTIONNAIRE > AI_FOLLOWUP > CALCULATING > COMPLETE) enabling resume and error recovery. AI integration uses a provider interface with pluggable implementations -- but for POC, only one implementation (claude-max-proxy) is needed. Prompts are separated from business logic as versioned template files.

**Major components:**
1. **Assessment Flow** -- questionnaire wizard, AI follow-up generation, state machine management
2. **Domain Logic** -- scoring algorithms, risk calculation, ROI forecasting, roadmap generation
3. **AI Abstraction Layer** -- provider interface, prompt template engine, response validation
4. **Dashboard/Report** -- role-filtered views, charts, PDF export
5. **Shared Infrastructure** -- UI design system, i18n, auth, data access layer

### Critical Pitfalls

1. **Platform over-building (Pitfall 4)** -- Build ONE workflow first (scan > score > report). No extra pages/navigation until the core flow is impressive. Role-based views are tabs on the same report, not separate dashboards.
2. **Prompt engineering as afterthought (Pitfall 5)** -- Prompts are the product. Store as versioned template files, create test fixtures with 3-5 business profiles, document prompt dependencies.
3. **Generic assessment experience (Pitfall 1)** -- Cap structured questionnaire at 8-12 questions. AI follow-ups must be contextual and surprising. Show progressive insights during the scan.
4. **LLM output without validation (Pitfall 3)** -- Define Zod schemas for every AI output. Use structured output modes (tool_use). Implement retry-with-correction loops. Cache validated outputs.
5. **Arbitrary maturity score (Pitfall 2)** -- Ground in established frameworks (CMMI, Gartner). Use named levels, decomposable sub-scores, and "here's why" explanations tied to specific answers.

## Implications for Roadmap

Based on combined research, the project naturally decomposes into 4 phases following dependency order and risk mitigation.

### Phase 1: Foundation and Project Skeleton
**Rationale:** Zero external dependencies. Produces a runnable app that all subsequent phases build on. Addresses Pitfall 13 (persistence from day one) and sets up the i18n infrastructure that is a cross-cutting concern.
**Delivers:** Next.js project with Prisma + SQLite, design system (shadcn/ui), i18n routing (EN/RU), simple auth/role selector, database schema with seed data, domain module folder structure.
**Features addressed:** User Authentication, Multi-language Support (infrastructure), Dashboard (shell/layout only).
**Avoids:** Pitfall 13 (in-memory state), Pitfall 4 (by keeping scope to infrastructure only).

### Phase 2: Core Assessment Workflow (AI Integration)
**Rationale:** This is the core product moment and the highest-risk phase. AI integration, prompt engineering, and the scan-to-score pipeline must be solid before any visualization work. Stabilizing AI output schemas here prevents Pitfall 10 (visualization churn).
**Delivers:** AI provider abstraction (interface + claude-proxy implementation), structured questionnaire (8-12 questions), AI follow-up question generation, assessment state machine, maturity scoring algorithm (grounded in CMMI/Gartner), risk calculation, basic automation roadmap generation.
**Features addressed:** Business Process Scan, AI Follow-up Questions, AI Maturity Score, Automation Roadmap (logic), Risk Map (logic).
**Avoids:** Pitfall 1 (generic assessment), Pitfall 2 (arbitrary scoring), Pitfall 3 (unvalidated LLM output), Pitfall 5 (prompt quality), Pitfall 9 (over-engineered AI abstraction).
**Stack elements:** Vercel AI SDK, Zod structured output, Prisma for assessment persistence.

### Phase 3: Output, Visualization, and Role Views
**Rationale:** Depends on Phase 2 stabilized data schemas. Now that AI output formats are locked, build the presentation layer. This is where the product becomes demo-ready.
**Delivers:** Assessment results page, dashboard with charts (Recharts), role-based view filtering (CEO/COO/CTO tabs), report generator, PDF export.
**Features addressed:** Dashboard, PDF/Report Export, Role-Based Views, ROI Forecast (presentation).
**Avoids:** Pitfall 10 (schema changes breaking visualizations), Pitfall 12 (role views as separate codepaths), Pitfall 8 (ROI false precision -- use ranges and visible assumptions).

### Phase 4: Polish, Demo Readiness, and Differentiators
**Rationale:** Additive enhancements that make the demo more compelling but can be cut for time. This phase turns a working product into a showcase.
**Delivers:** AI module catalog (static), 3-5 diverse mock business profiles for demo, progressive result rendering (addressing wait time UX), mobile-responsive polish, guided demo walkthrough.
**Features addressed:** AI Module Catalog, demo preparation.
**Avoids:** Pitfall 7 (single happy-path mock), Pitfall 11 (long wait times during demo).

### Phase Ordering Rationale

- **Foundation before AI:** The database schema, i18n, and auth are prerequisites for the assessment flow. Building these first means Phase 2 can focus entirely on the hard problem (AI quality).
- **AI logic before visualization:** The architecture research and pitfalls research both independently recommend stabilizing AI output schemas before building charts. This avoids the visualization churn cycle that wastes weeks.
- **Workflow before platform:** All research converges on this. The scan-to-report workflow IS the product. Dashboard, catalog, and role views are enhancement layers on that core.
- **Demo readiness as final phase:** Mock profiles, progressive loading, and polish are important but only matter when the core product works.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Core Assessment):** Prompt engineering for follow-up questions and scoring requires iterative experimentation. The maturity scoring methodology needs grounding in specific CMMI/Gartner framework details. AI output schema design is critical and non-trivial. This phase benefits from `/gsd:research-phase`.
- **Phase 3 (ROI Forecast specifically):** Building credible ROI models with transparent assumptions requires domain research into labor cost benchmarks, automation time savings by task type, and industry-specific data.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Next.js setup, Prisma, shadcn/ui, next-intl are all well-documented with established patterns. No research needed.
- **Phase 4 (Polish):** Static catalog, mock data, responsive design are straightforward implementation work.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Versions based on May 2025 training data; next-intl v4 and Auth.js v5 stability unverified. Core choices (Next.js, Prisma, shadcn/ui) are high-confidence. |
| Features | MEDIUM | Competitive landscape analysis based on training data. The identified gap (self-serve AI architect for SMB) needs live market validation. Feature prioritization is sound. |
| Architecture | MEDIUM-HIGH | Monolith + domain modules + state machine are well-established patterns. AI provider abstraction is industry standard. Specific next-intl and claude-max-proxy integration details unverified. |
| Pitfalls | MEDIUM-HIGH | Pitfalls are drawn from domain expertise in B2B SaaS and LLM-powered apps. The top 5 are highly likely to occur if not prevented. Framework-specific pitfalls (CMMI/Gartner references) need verification. |

**Overall confidence:** MEDIUM

### Gaps to Address

- **Package version verification:** Run `npm view` for all core packages before project init. next-intl v4 and Auth.js v5 were in flux as of training data cutoff.
- **claude-max-proxy compatibility:** Exact API surface and Vercel AI SDK integration need testing during Phase 2 setup.
- **Maturity scoring methodology:** The research recommends CMMI/Gartner frameworks but does not provide the specific dimension weights or level definitions. This must be researched and defined before Phase 2 scoring implementation.
- **Russian-language AI output quality:** LLM output quality in Russian may differ significantly from English. Needs testing during Phase 2 prompt development. Consider English-only AI output for POC with Russian UI.
- **Competitive landscape validation:** The "nobody occupies self-serve AI architect for SMB" finding is from training data. The market may have shifted. Validate before finalizing positioning.

## Sources

### Primary (HIGH confidence)
- Project constraints from PROJECT.md (project-specific requirements)
- Established Next.js App Router patterns and Prisma ORM conventions
- B2B SaaS architecture patterns (well-documented, industry standard)

### Secondary (MEDIUM confidence)
- Training data analysis of competitor platforms (McKinsey, Deloitte, Gartner AI assessments, Celonis, UiPath)
- AI maturity framework references (CMMI, Gartner, Microsoft AI Maturity Model)
- Vercel AI SDK and next-intl API patterns (may have evolved post-cutoff)
- LLM integration patterns for AI-native applications

### Tertiary (LOW confidence)
- Specific package versions (need npm registry verification)
- Competitive landscape positioning (needs live market research)
- claude-max-proxy integration details (needs hands-on testing)

---
*Research completed: 2026-03-05*
*Ready for roadmap: yes*
