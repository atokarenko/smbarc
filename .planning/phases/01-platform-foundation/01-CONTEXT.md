# Phase 1: Platform Foundation - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Runnable app shell with authentication, i18n (EN/RU), AI provider abstraction, and demo company profiles. This is the infrastructure that all product features build on. No assessment logic, no scoring, no dashboards — just the skeleton.

</domain>

<decisions>
## Implementation Decisions

### Authentication
- Auth.js for local credentials auth, with architecture ready for external OIDC provider connection later
- POC uses **demo mode** — user selects a demo persona (no real registration/login needed for demo)
- Auth.js wiring exists for future real auth, but POC entry is demo user selection
- Role (CEO/COO/CTO) selected at signup, changeable in profile settings
- Role is a "lens" (view filter), not permissions — same data, different presentation

### Onboarding
- After login/demo-select → short welcome wizard: company name, role, industry → dashboard
- Welcome wizard feeds into the assessment context later

### Layout & Navigation
- Sidebar + content layout (Linear/Notion style)
- Full sidebar navigation: Dashboard, Scan, Roadmap, Risks, ROI, Modules, Settings
- Auto theme support (light/dark) with toggle
- shadcn/ui as component library base

### Branding
- Claude's Discretion — choose appropriate name treatment, accent color, placeholder logo

### Demo Profiles
- 3 demo companies covering different industries and AI maturity levels:
  - Retail/E-commerce company
  - Financial services / fintech company
  - Manufacturing / logistics company
- Each shows **full assessment results** (Score + Roadmap + Risk Map + ROI) as if scan was completed
- Demo profiles serve as the primary showcase for the demo — this is what co-founders will see

### AI Provider Abstraction
- claude-max-api-proxy at `http://localhost:3456/v1` — OpenAI-compatible API
- Vercel AI SDK as abstraction layer (supports OpenAI-compatible endpoints via base URL config)
- Full response mode (no streaming) — loading spinner then complete result
- Abstraction should allow swapping to real OpenAI/Anthropic API by changing env vars
- Phase 1 only wires the abstraction layer + verifies connectivity — no actual AI calls for business logic yet

### Claude's Discretion
- Exact color palette and accent colors
- Logo/wordmark placeholder design
- Sidebar icon choices
- Welcome wizard exact steps and field layout
- Demo company names and specific mock data details

</decisions>

<specifics>
## Specific Ideas

- Demo mode is critical for the co-founder demo — user picks a persona, sees full results immediately
- The 3 industries (Retail, Finance, Manufacturing) should show different maturity levels to demonstrate the scoring range
- Sidebar should feel professional — this is positioning as a "consulting-grade" tool, not a toy

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project

### Established Patterns
- None — patterns to be established in this phase

### Integration Points
- AI provider abstraction connects to claude-max-api-proxy at localhost:3456/v1
- Database (SQLite + Prisma) stores demo profiles and user sessions
- next-intl for i18n (EN/RU) — App Router integration

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-platform-foundation*
*Context gathered: 2026-03-05*
