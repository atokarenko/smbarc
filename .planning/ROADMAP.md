# Roadmap: AI Architect

## Overview

AI Architect delivers a self-serve AI assessment platform for SMB in four phases: platform foundation (auth, i18n, AI abstraction), core assessment workflow (scan + AI scoring), dashboard visualization (charts, role views, export), and module catalog (browsable AI modules with personalized recommendations). The critical path follows a strict dependency chain: infrastructure enables assessment, assessment produces data, data feeds visualization, visualization context powers catalog recommendations.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Platform Foundation** - Project skeleton with auth, i18n, AI provider abstraction, and demo profiles
- [x] **Phase 2: Assessment & AI Engine** - Business-first assessment rewrite: business questions, health scoring, AI prompts as business analyst, and full end-to-end wiring (completed 2026-03-06)
- [ ] **Phase 3: Dashboard & Reporting** - Visual dashboard with role-based views, charts, and PDF export
- [ ] **Phase 4: Module Catalog** - Browsable AI module catalog with personalized recommendations from assessment results

## Phase Details

### Phase 1: Platform Foundation
**Goal**: User can access a running application with auth, language switching, and demo data -- the shell that all product features build on
**Depends on**: Nothing (first phase)
**Requirements**: PLAT-01, PLAT-02, PLAT-03, PLAT-04
**Success Criteria** (what must be TRUE):
  1. User can register, log in, and select their role (CEO, COO, or CTO)
  2. User can switch interface language between English and Russian, and all UI text renders in the selected language
  3. User can select a pre-loaded demo company profile and see placeholder results without completing a scan
  4. Application uses AI provider abstraction layer that connects to claude-max-proxy locally
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Project scaffold, dependencies, Prisma DB, i18n (EN/RU), Vitest test infra
- [x] 01-02-PLAN.md — Better Auth + demo mode, AI provider abstraction, demo company seed data
- [x] 01-03-PLAN.md — App shell layout (sidebar, header, theme), all pages, dashboard with demo data

### Phase 2: Assessment & AI Engine
**Goal**: User can complete a full business health assessment (questionnaire + AI follow-ups) and receive Business Health Score, automation roadmap, risk map, and ROI forecast
**Depends on**: Phase 1
**Requirements**: SCAN-01, SCAN-02, SCAN-03, SCAN-04, SCORE-01, SCORE-02, SCORE-03, SCORE-04, SCORE-05, SCORE-06
**Success Criteria** (what must be TRUE):
  1. User can complete a structured questionnaire covering business operations, sales, finance, team, and risks
  2. AI generates contextual follow-up questions based on user answers, acting as a business detective
  3. User can pause an in-progress assessment and resume from where they left off, with progress visibly tracked
  4. After completing the assessment, user sees a Business Health Score with named levels (Critical/Struggling/Stable/Efficient/Optimized) and breakdown by 5 business dimensions
  5. After completing the assessment, user sees an automation roadmap, risk map, and ROI forecast -- all generated via AI with validated structured output
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md — Data layer atomic rewrite: dimension keys, business questions, health scoring levels, Zod schemas, demo data, and all tests
- [ ] 02-02-PLAN.md — AI prompts rewrite (business detective/analyst framing) + i18n/UI text updates for business health language

### Phase 3: Dashboard & Reporting
**Goal**: User sees a comprehensive dashboard presenting all assessment outputs with role-appropriate views, charts, and exportable reports
**Depends on**: Phase 2
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06
**Success Criteria** (what must be TRUE):
  1. User sees an overview dashboard with maturity score, key metrics, and summary cards
  2. User can view automation roadmap as a visual timeline, risk map with severity levels, and ROI forecast with charts
  3. Dashboard content adapts to the user's role -- CEO sees strategic view, COO sees operational, CTO sees technical
  4. User can export a full assessment report as PDF
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Module Catalog
**Goal**: User can browse AI modules and receive personalized recommendations based on their assessment results
**Depends on**: Phase 2
**Requirements**: MOD-01, MOD-02, MOD-03
**Success Criteria** (what must be TRUE):
  1. User can browse a catalog of AI modules organized by domain (HR, Finance, Legal, Decision Making)
  2. Each module displays description, expected impact, and relevance to the user's assessment results
  3. Modules are ranked and recommended based on the user's specific assessment data
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 > 2 > 3 > 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Platform Foundation | 3/3 | Complete | 2026-03-05 |
| 2. Assessment & AI Engine | 2/2 | Complete   | 2026-03-06 |
| 3. Dashboard & Reporting | 0/2 | Not started | - |
| 4. Module Catalog | 0/1 | Not started | - |
