# Technology Stack

**Project:** AI Architect — B2B AI Management Platform for SMB
**Researched:** 2026-03-05
**Overall confidence:** MEDIUM (versions based on training data cutoff May 2025; could not verify live npm registry or official docs due to tool restrictions)

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | ^15.1 | Full-stack framework | App Router is stable; Server Components reduce client bundle; API Routes serve as backend; single deploy unit ideal for POC. Project constraint: Full JS stack. | MEDIUM |
| React | ^19.0 | UI library | Ships with Next.js 15; Server Components, Actions, `use()` hook for async data. | MEDIUM |
| TypeScript | ^5.6 | Type safety | Non-negotiable for B2B SaaS. Catches data shape errors in questionnaire flows, scoring models, and role-based logic at compile time. | HIGH |

### AI Integration

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vercel AI SDK (`ai`) | ^4.0 | LLM abstraction layer | Provider-agnostic by design — swap Anthropic/OpenAI/local models via config. Streaming support for follow-up questions. `generateText`, `streamText`, `generateObject` cover all use cases (scoring, roadmap generation, conversational follow-ups). | MEDIUM |
| `@ai-sdk/anthropic` | ^1.0 | Claude provider | Primary LLM provider. Works with claude-max-proxy for local dev. | MEDIUM |
| `@ai-sdk/openai` | ^1.0 | OpenAI provider | Secondary/fallback provider. Install but don't couple to it. | MEDIUM |
| Zod | ^3.23 | Schema validation | AI SDK uses Zod for structured output (`generateObject`). Also validates questionnaire responses, API inputs. Single validation library for everything. | HIGH |

### Database

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| SQLite (via `better-sqlite3`) | ^11.0 | Primary database | POC runs locally — zero infrastructure. Fast, embedded, no setup. Stores questionnaire responses, maturity scores, user data. Sufficient for single-tenant POC. | HIGH |
| Prisma | ^6.0 | ORM | Best DX for schema-first approach. Typed queries match TypeScript-first philosophy. Schema file serves as single source of truth for data model. Migration system ready for when you move to PostgreSQL in production. | MEDIUM |

**Migration path:** SQLite (POC) -> PostgreSQL (production). Prisma makes this a config change, not a rewrite.

**Why not Drizzle:** Drizzle has better raw performance and is closer to SQL, but Prisma's schema-first approach, migration tooling, and broader ecosystem win for a team that wants to move fast on a POC. Drizzle is the right choice when you need maximum query control or edge runtime compatibility — neither is a POC priority.

### UI & Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | ^4.0 | Utility CSS | Standard for modern Next.js. Fast prototyping, consistent design system. v4 has CSS-first config. | MEDIUM |
| shadcn/ui | latest | Component library | Not a dependency — copies components into your repo. Full control, accessible, built on Radix primitives. Dashboard components (cards, tables, tabs, charts) out of the box. | HIGH |
| Recharts | ^2.13 | Charts/visualizations | Best React charting library for dashboards. Maturity scores, ROI forecasts, risk maps all need charts. Composable, responsive, good defaults. Integrates with shadcn/ui chart components. | HIGH |
| Lucide React | ^0.450 | Icons | Default icon set for shadcn/ui. Consistent, tree-shakeable. | HIGH |

**Why not MUI/Ant Design:** Too opinionated, heavy bundle, fight-the-framework problem when you need custom dashboard layouts. shadcn/ui gives you the primitives without the lock-in.

### State Management

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| React Server Components | built-in | Server state | Default for data fetching in Next.js App Router. No extra library needed for read operations. | HIGH |
| `nuqs` | ^2.0 | URL search params state | Questionnaire progress, filter state, dashboard view state — all belongs in the URL for shareability and back-button support. | MEDIUM |
| Zustand | ^5.0 | Client state (if needed) | Lightweight store for complex client-side state like multi-step questionnaire wizard, unsaved answers. Only add if React state + URL state aren't enough. | MEDIUM |

**Why not Redux/Jotai:** Redux is overkill for this app. Jotai is fine but Zustand has better DX for the "one global store" pattern a questionnaire wizard needs. Most state should live on the server or in the URL.

### Internationalization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| `next-intl` | ^4.0 | i18n (EN/RU) | Built specifically for Next.js App Router. Server Component support, type-safe message keys, ICU message format. Handles pluralization rules (critical for Russian). | MEDIUM |

**Why not `next-i18next`:** Designed for Pages Router; `next-intl` is the App Router native solution. `next-i18next` works but requires workarounds for Server Components.

**Why not `react-intl`:** Lower-level, more manual wiring. `next-intl` wraps the same ICU standard with Next.js-specific DX.

### Authentication

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| NextAuth.js (Auth.js) | ^5.0 | Authentication | Role-based access (CEO/COO/CTO) requires auth. v5 (Auth.js) supports App Router natively. For POC: credentials provider (email/password). Production: add OAuth later. | MEDIUM |

**POC simplification:** Start with a simple session/cookie approach if Auth.js feels heavy. The role system matters more than the auth mechanism for POC. A simple middleware that checks a cookie and maps to a role is sufficient.

### PDF/Report Generation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| `@react-pdf/renderer` | ^4.0 | PDF reports | Generate AI Maturity Reports, ROI Forecasts, Risk Maps as downloadable PDFs. React component model means you reuse your chart/layout components. | MEDIUM |

**Alternative considered:** Puppeteer/Playwright for HTML-to-PDF. Heavier, requires headless browser, but produces pixel-perfect output matching the dashboard. Consider for v2 if React-PDF layout limitations become painful.

### Dev Tooling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| ESLint | ^9.0 | Linting | Flat config in v9. Next.js has built-in ESLint config. | MEDIUM |
| Prettier | ^3.4 | Formatting | Consistent code style. Non-negotiable for any project. | HIGH |
| Vitest | ^2.0 | Unit/integration tests | Fast, Vite-based, ESM-native. Better DX than Jest for modern stacks. | HIGH |
| Playwright | ^1.48 | E2E tests | Cross-browser, reliable. Test questionnaire flows, dashboard rendering, role switching. | HIGH |

### Infrastructure (Production — future)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| PostgreSQL | 16+ | Production database | When moving beyond POC. Prisma migration from SQLite is straightforward. | HIGH |
| Vercel | — | Hosting | Natural fit for Next.js. Edge functions, serverless, preview deploys. | HIGH |
| Upstash Redis | — | Rate limiting, caching | AI API calls are expensive. Cache maturity scores, rate-limit questionnaire submissions. | MEDIUM |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 15 | Remix/Nuxt | Project constraint is Next.js. Remix has better forms but weaker ecosystem. Nuxt is Vue. |
| ORM | Prisma | Drizzle ORM | Drizzle is faster/lighter but Prisma's migration system and schema-first DX wins for rapid POC dev |
| ORM | Prisma | Kysely | Type-safe query builder, not a full ORM. Good for complex queries but too low-level for POC speed |
| UI | shadcn/ui | Radix UI (direct) | shadcn/ui IS Radix + Tailwind. Using Radix directly means writing all the styling yourself |
| UI | shadcn/ui | MUI / Ant Design | Heavy, opinionated, hard to customize, bundle size concerns |
| Charts | Recharts | Nivo / Victory | Nivo is beautiful but heavier. Victory has worse DX. Recharts hits the sweet spot |
| Charts | Recharts | D3 (direct) | Too low-level for dashboard charts. Recharts is built on D3 anyway |
| i18n | next-intl | next-i18next | Pages Router era. Not designed for App Router / Server Components |
| Auth | Auth.js v5 | Lucia | Lucia was deprecated in early 2025. Auth.js is the maintained standard |
| Auth | Auth.js v5 | Clerk/Auth0 | Third-party SaaS adds cost and vendor lock-in. Unnecessary for POC |
| State | Zustand | Redux Toolkit | Overkill for this app's client state needs |
| State | URL state (nuqs) | React state | Questionnaire progress should survive page refresh and be shareable |
| PDF | @react-pdf/renderer | Puppeteer | Headless browser is heavy for POC. React-PDF is lighter, component-model |
| AI | Vercel AI SDK | LangChain | LangChain is bloated, over-abstracted for this use case. AI SDK is leaner, better typed, streaming-first |
| DB (POC) | SQLite | PostgreSQL | Zero-config local dev. No Docker/server needed for POC |
| Testing | Vitest | Jest | Vitest is faster, ESM-native, better DX with modern stacks |

## Key Architecture Decisions

### AI Provider Abstraction

The Vercel AI SDK provides the abstraction layer the project requires. Define a single interface:

```typescript
// lib/ai/provider.ts
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';

const providers = {
  anthropic: anthropic('claude-sonnet-4-20250514'),
  openai: openai('gpt-4o'),
} as const;

export function getModel() {
  const provider = process.env.AI_PROVIDER || 'anthropic';
  return providers[provider as keyof typeof providers];
}
```

For local dev with claude-max-proxy, configure `ANTHROPIC_BASE_URL` to point to the proxy.

### Questionnaire Data Model

Structured answers + AI follow-ups need a flexible schema:

```typescript
// Prisma schema sketch
model Assessment {
  id          String   @id @default(cuid())
  companyId   String
  status      String   // draft | in_progress | completed
  answers     Json     // structured questionnaire answers
  aiFollowUps Json     // AI-generated follow-up Q&A pairs
  maturityScore Json   // computed scores by category
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Use JSON columns for flexible nested data (questionnaire answers vary by module). SQLite supports JSON natively.

### Role-Based Views

Not separate apps — same dashboard with filtered/prioritized data:

```typescript
type Role = 'ceo' | 'coo' | 'cto';

// Each dashboard widget declares which roles see it
const widgetConfig = {
  roiForecast: { roles: ['ceo', 'coo'], priority: { ceo: 1, coo: 3 } },
  riskMap: { roles: ['ceo', 'cto'], priority: { ceo: 2, cto: 1 } },
  automationRoadmap: { roles: ['coo', 'cto'], priority: { coo: 1, cto: 2 } },
  maturityScore: { roles: ['ceo', 'coo', 'cto'], priority: { ceo: 3, coo: 2, cto: 3 } },
};
```

## Installation

```bash
# Create project
npx create-next-app@latest ai-architect --typescript --tailwind --eslint --app --src-dir

# Core dependencies
npm install ai @ai-sdk/anthropic @ai-sdk/openai zod
npm install prisma @prisma/client better-sqlite3
npm install next-intl next-auth@beta
npm install recharts lucide-react
npm install nuqs zustand
npm install @react-pdf/renderer

# Dev dependencies
npm install -D vitest @testing-library/react playwright
npm install -D prettier eslint-config-prettier

# shadcn/ui (interactive init)
npx shadcn@latest init
npx shadcn@latest add button card table tabs chart dialog form input select
```

## Version Confidence Note

All versions listed are based on training data with cutoff of May 2025. Before starting development:

1. Run `npm view [package] version` for each core dependency to confirm latest stable
2. Check Next.js blog (nextjs.org/blog) for any breaking changes in v15.x
3. Check AI SDK changelog for v4.x compatibility
4. Verify `next-intl` v4 is stable (was in development as of early 2025)
5. Confirm Auth.js v5 is stable (was beta through much of 2024-2025)

## Sources

- Training data knowledge (May 2025 cutoff) — MEDIUM confidence
- Project constraints from PROJECT.md — HIGH confidence
- Could not verify: npm registry, official documentation sites, or web search (tools restricted)
- All version numbers should be validated before project initialization
