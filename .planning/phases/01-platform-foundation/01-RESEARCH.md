# Phase 1: Platform Foundation - Research

**Researched:** 2026-03-05
**Domain:** Next.js full-stack application foundation (auth, i18n, AI abstraction, demo data)
**Confidence:** MEDIUM-HIGH

## Summary

Phase 1 establishes a greenfield Next.js application with four subsystems: authentication/demo mode, internationalization (EN/RU), AI provider abstraction for claude-max-proxy, and pre-loaded demo company profiles. This is a pure foundation phase -- no business logic, no assessment, no scoring.

Key research findings that diverge from the original STACK.md research: (1) Auth.js/NextAuth.js has been deprecated and acquired by Better Auth -- the user decision to "wire Auth.js for future OIDC" needs adjustment; (2) Next.js 16 is now the latest stable release with middleware renamed to proxy.ts, but Next.js 15 remains safer for POC; (3) Vercel AI SDK is at v5 (not v4 as STACK.md assumed); (4) next-intl v4 is stable at 4.8.x. For the POC demo mode, the simplest viable auth approach is a lightweight session system with Better Auth wired for future expansion, keeping the spirit of the user's decision.

**Primary recommendation:** Use Next.js 15 (proven stability), Better Auth (successor to Auth.js) for lightweight credential auth + demo mode, next-intl v4.8 for i18n, Vercel AI SDK v5 with `createOpenAI` for claude-max-proxy connectivity.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Auth.js for local credentials auth, with architecture ready for external OIDC provider connection later
- POC uses **demo mode** -- user selects a demo persona (no real registration/login needed for demo)
- Auth.js wiring exists for future real auth, but POC entry is demo user selection
- Role (CEO/COO/CTO) selected at signup, changeable in profile settings
- Role is a "lens" (view filter), not permissions -- same data, different presentation
- After login/demo-select -> short welcome wizard: company name, role, industry -> dashboard
- Sidebar + content layout (Linear/Notion style)
- Full sidebar navigation: Dashboard, Scan, Roadmap, Risks, ROI, Modules, Settings
- Auto theme support (light/dark) with toggle
- shadcn/ui as component library base
- 3 demo companies covering different industries and AI maturity levels (Retail, Finance, Manufacturing)
- Each shows full assessment results as if scan was completed
- claude-max-api-proxy at `http://localhost:3456/v1` -- OpenAI-compatible API
- Vercel AI SDK as abstraction layer
- Full response mode (no streaming) -- loading spinner then complete result
- Phase 1 only wires the abstraction layer + verifies connectivity -- no actual AI calls for business logic yet

### Claude's Discretion
- Exact color palette and accent colors
- Logo/wordmark placeholder design
- Sidebar icon choices
- Welcome wizard exact steps and field layout
- Demo company names and specific mock data details

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PLAT-01 | Interface available in English and Russian with language switcher | next-intl v4.8 with `[locale]` routing, `defineRouting` API, locale switcher component |
| PLAT-02 | User can register, log in, and select role (CEO/COO/CTO) | Better Auth with credentials provider + demo persona selector; role stored in session/DB |
| PLAT-03 | Pre-loaded demo company profiles to showcase results without completing full scan | Prisma seed script with 3 companies (Retail/Finance/Manufacturing), JSON mock data for results |
| PLAT-04 | AI provider abstraction layer supporting claude-max-proxy locally, swappable to other providers | Vercel AI SDK v5 with `createOpenAI({ baseURL })` pointing to localhost:3456/v1 |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | ^15.1 | Full-stack framework | Stable App Router, proven ecosystem. Next.js 16 is out but 15 is safer for POC (avoids middleware->proxy migration, async API changes) |
| React | ^19.0 | UI library | Ships with Next.js 15 |
| TypeScript | ^5.6 | Type safety | Non-negotiable for B2B SaaS |

### Auth
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| better-auth | latest | Authentication | Successor to Auth.js/NextAuth.js (which is now deprecated). Supports credentials, email/password, future OIDC. Works with Prisma + SQLite |

### i18n
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-intl | ^4.8 | EN/RU internationalization | De facto standard for Next.js App Router i18n. Stable v4, Server Component support, type-safe keys, Russian pluralization |

### AI
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| ai (Vercel AI SDK) | ^5.0 | LLM abstraction | Provider-agnostic. `generateText`, `generateObject` for full response mode |
| @ai-sdk/openai | latest | OpenAI-compatible provider | Connects to claude-max-proxy via `createOpenAI({ baseURL })` |
| zod | ^3.23 | Schema validation | Used by AI SDK for structured output, also validates forms/API inputs |

### Database
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| prisma | ^6.0 | ORM | Schema-first, typed queries, migration system |
| @prisma/client | ^6.0 | Database client | Auto-generated typed client |
| better-sqlite3 | ^11.0 | SQLite driver | Zero-config local database for POC |

### UI & Styling
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| tailwindcss | ^4.0 | Utility CSS | CSS-first config in v4, fast prototyping |
| shadcn/ui | latest (copy-paste) | Component library | Radix primitives + Tailwind, full control |
| lucide-react | ^0.450 | Icons | Default icon set for shadcn/ui |
| next-themes | ^0.4 | Theme switching | System/light/dark theme with no flash |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Better Auth | next-auth@beta (Auth.js v5) | Auth.js is deprecated, acquired by Better Auth. Using Auth.js means adopting abandoned software |
| Better Auth | Simple cookie middleware | Simpler for POC but no upgrade path to real auth |
| Next.js 15 | Next.js 16 | 16 has performance gains but middleware->proxy rename and async API changes add risk to a greenfield POC |

**Installation:**
```bash
# Create project
npx create-next-app@15 ai-architect --typescript --tailwind --eslint --app --src-dir

# Auth
npm install better-auth

# i18n
npm install next-intl

# AI
npm install ai @ai-sdk/openai zod

# Database
npm install prisma @prisma/client
npm install better-sqlite3
npm install -D @types/better-sqlite3

# UI
npm install next-themes lucide-react

# shadcn/ui (interactive init)
npx shadcn@latest init
npx shadcn@latest add button card avatar dropdown-menu select separator sheet sidebar navigation-menu

# Dev
npm install -D vitest prettier
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── [locale]/              # Locale-prefixed routes (next-intl)
│       ├── layout.tsx         # Root locale layout with providers
│       ├── page.tsx           # Landing / demo selector
│       ├── (auth)/
│       │   ├── login/page.tsx
│       │   └── register/page.tsx
│       ├── onboarding/page.tsx # Welcome wizard
│       ├── dashboard/page.tsx  # Main dashboard (placeholder)
│       ├── scan/page.tsx       # Placeholder
│       ├── roadmap/page.tsx    # Placeholder
│       ├── risks/page.tsx      # Placeholder
│       ├── roi/page.tsx        # Placeholder
│       ├── modules/page.tsx    # Placeholder
│       └── settings/page.tsx   # Profile, role change, language
│   └── api/
│       ├── auth/[...all]/route.ts  # Better Auth handler
│       └── ai/health/route.ts      # AI connectivity check
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx        # Main sidebar navigation
│   │   ├── header.tsx         # Top bar with lang/theme toggles
│   │   └── app-shell.tsx      # Sidebar + content wrapper
│   ├── auth/
│   │   ├── demo-selector.tsx  # Demo persona picker
│   │   └── role-badge.tsx     # Role display component
│   ├── i18n/
│   │   └── locale-switcher.tsx
│   ├── theme/
│   │   └── theme-toggle.tsx
│   └── ui/                    # shadcn/ui components (auto-generated)
├── lib/
│   ├── auth.ts                # Better Auth server config
│   ├── auth-client.ts         # Better Auth client
│   ├── ai/
│   │   ├── provider.ts        # AI provider abstraction
│   │   └── types.ts           # AI-related types
│   ├── db/
│   │   └── prisma.ts          # Prisma client singleton
│   └── utils.ts               # Shared utilities (cn, etc.)
├── i18n/
│   ├── routing.ts             # defineRouting config
│   ├── request.ts             # getRequestConfig
│   └── navigation.ts          # createNavigation exports
├── messages/
│   ├── en.json                # English translations
│   └── ru.json                # Russian translations
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Demo data seeding
└── middleware.ts               # next-intl + auth middleware
```

### Pattern 1: AI Provider via createOpenAI with baseURL
**What:** Use `@ai-sdk/openai`'s `createOpenAI` to connect to claude-max-proxy at localhost:3456/v1 as an OpenAI-compatible endpoint.
**When to use:** Always -- this is the abstraction layer.
**Example:**
```typescript
// src/lib/ai/provider.ts
import { createOpenAI } from '@ai-sdk/openai';

export function getAIProvider() {
  const provider = createOpenAI({
    baseURL: process.env.AI_BASE_URL || 'http://localhost:3456/v1',
    apiKey: process.env.AI_API_KEY || 'not-needed-for-local-proxy',
  });

  return provider(process.env.AI_MODEL || 'claude-sonnet-4-20250514');
}

// Usage in a route handler (Phase 1: just connectivity test)
import { generateText } from 'ai';
import { getAIProvider } from '@/lib/ai/provider';

export async function GET() {
  try {
    const result = await generateText({
      model: getAIProvider(),
      prompt: 'Say "hello" in one word.',
    });
    return Response.json({ status: 'connected', response: result.text });
  } catch (error) {
    return Response.json({ status: 'error', message: String(error) }, { status: 500 });
  }
}
```

### Pattern 2: next-intl Setup with defineRouting
**What:** Locale-prefixed routing with `[locale]` segment, middleware for locale detection, Server Component translations.
**When to use:** All pages and components that render text.
**Example:**
```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

// src/i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
```

### Pattern 3: Better Auth with Demo Mode
**What:** Better Auth for real auth infrastructure, plus a demo persona selector that creates a session without requiring real credentials.
**When to use:** POC entry point is demo selector; real login form exists but is secondary.
**Example:**
```typescript
// src/lib/auth.ts (server)
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { prisma } from './db/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'sqlite' }),
  emailAndPassword: { enabled: true },
  plugins: [nextCookies()],
});

// src/lib/auth-client.ts (client)
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient();

// API route handler: src/app/api/auth/[...all]/route.ts
import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const { GET, POST } = toNextJsHandler(auth);
```

### Pattern 4: Theme Toggle with next-themes
**What:** System theme auto-detection with manual light/dark toggle using next-themes + shadcn/ui.
**Example:**
```typescript
// src/components/theme/theme-toggle.tsx
'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

### Pattern 5: Demo Company Seed Data
**What:** Prisma seed script that creates 3 demo companies with full mock assessment results (scores, risk map, ROI, roadmap).
**When to use:** `npx prisma db seed` populates demo data.
**Example:**
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEMO_COMPANIES = [
  {
    name: 'RetailFlow Inc.',
    industry: 'retail',
    maturityLevel: 'beginner',     // Low AI maturity
    description: 'Mid-size e-commerce retailer, 200 employees',
  },
  {
    name: 'FinCore Solutions',
    industry: 'finance',
    maturityLevel: 'intermediate', // Medium AI maturity
    description: 'Fintech company, 500 employees, some ML in production',
  },
  {
    name: 'TechManufact Ltd.',
    industry: 'manufacturing',
    maturityLevel: 'advanced',     // Higher AI maturity
    description: 'Smart manufacturing, 1000 employees, IoT + predictive maintenance',
  },
];

async function seed() {
  for (const company of DEMO_COMPANIES) {
    await prisma.company.create({
      data: {
        name: company.name,
        industry: company.industry,
        isDemo: true,
        // ... plus full mock assessment results as JSON
      },
    });
  }
}

seed();
```

### Anti-Patterns to Avoid
- **Over-engineering auth for POC:** Do NOT build full RBAC, OAuth flows, or email verification. Demo mode is the primary entry. Real auth is wired but minimal.
- **Translating everything upfront:** Start with common.json covering shared UI, add namespaced files as features are built. Do NOT translate placeholder page content yet.
- **Making real AI calls in Phase 1:** Phase 1 only verifies AI connectivity. No prompt engineering, no business logic AI calls. Wire the abstraction + health check endpoint.
- **Building real sidebar pages:** Sidebar navigation links exist, but most pages are placeholders with a "Coming soon" message in both languages. Do NOT build real dashboard/scan/roadmap content.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Theme switching | Custom CSS variable toggling | next-themes | Handles SSR flash, system preference, localStorage persistence |
| Locale routing | Manual `[locale]` param parsing | next-intl middleware + routing | Handles redirects, cookie persistence, locale detection, SEO |
| Auth sessions | Custom JWT/cookie logic | Better Auth | Session management, CSRF protection, future OAuth extensibility |
| AI provider switching | Custom fetch wrapper for LLM APIs | Vercel AI SDK createOpenAI | Handles retries, streaming, structured output, provider abstraction |
| UI primitives | Custom accessible dropdowns, dialogs, selects | shadcn/ui (Radix) | WAI-ARIA compliance, keyboard navigation, focus management |
| Sidebar layout | Custom CSS grid sidebar | shadcn/ui Sidebar component | Responsive, collapsible, mobile-friendly, accessible |

## Common Pitfalls

### Pitfall 1: Auth.js is Deprecated
**What goes wrong:** Using `next-auth@beta` (Auth.js v5) in a new project. Auth.js has been acquired by Better Auth and will not receive new features.
**Why it happens:** STACK.md research was based on May 2025 training data. The deprecation happened after that.
**How to avoid:** Use `better-auth` instead. It's the official successor, supports the same use cases, and has an active maintainer team.
**Warning signs:** `next-auth@beta` npm warnings, migration docs pointing to Better Auth.

### Pitfall 2: next-intl Middleware Conflict with Auth
**What goes wrong:** Both next-intl and Better Auth want to control middleware. Naive composition breaks locale detection or auth redirects.
**Why it happens:** Next.js has a single middleware entry point.
**How to avoid:** Compose middleware manually -- run next-intl middleware for locale routing, then check auth state in the same middleware function. Better Auth provides `auth.api.getSession()` for server-side session checks rather than requiring its own middleware.
**Warning signs:** Infinite redirects, locale lost after login.

### Pitfall 3: Tailwind v4 CSS-First Config
**What goes wrong:** Looking for `tailwind.config.ts` and `darkMode: 'class'` setting. Tailwind v4 uses CSS-first configuration.
**Why it happens:** Most tutorials still reference Tailwind v3 config patterns.
**How to avoid:** In Tailwind v4, configuration goes in CSS via `@theme` directive. Dark mode with `class` strategy is configured via `@variant dark (&.dark)` or by importing `tailwindcss/theme` in your CSS. shadcn/ui init handles this automatically.
**Warning signs:** Config file not found errors, dark mode not toggling.

### Pitfall 4: next-intl Static Rendering
**What goes wrong:** Dynamic rendering for all pages because `[locale]` is a dynamic route segment.
**Why it happens:** Next.js treats dynamic route params as preventing static rendering by default.
**How to avoid:** Add `generateStaticParams()` returning all locale values, and call `setRequestLocale(locale)` in each layout and page before using next-intl hooks.
**Warning signs:** All pages show "dynamic" in build output when they should be static.

### Pitfall 5: SQLite + Prisma JSON Columns
**What goes wrong:** Trying to query JSON fields with Prisma's `JsonFilter` on SQLite. SQLite JSON support in Prisma is limited compared to PostgreSQL.
**Why it happens:** Prisma docs show JSON operations but not all work on SQLite.
**How to avoid:** Store complex data as JSON string columns, parse in application code. For POC, read-heavy JSON is fine -- just don't try to filter/query inside JSON blobs at the database level.
**Warning signs:** Prisma errors about unsupported operations on SQLite.

### Pitfall 6: Better Auth Schema Requirements
**What goes wrong:** Prisma schema doesn't include required Better Auth tables.
**Why it happens:** Better Auth needs specific tables (user, session, account, verification) that must be in your Prisma schema.
**How to avoid:** Run `npx @better-auth/cli generate` to auto-generate the required Prisma schema additions. Or manually add the tables per Better Auth docs.
**Warning signs:** Runtime errors about missing tables.

## Code Examples

### Prisma Schema for Phase 1
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// Better Auth required tables
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  role          String    @default("ceo") // ceo | coo | cto
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts       Account[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  accountId         String
  providerId        String
  accessToken       String?
  refreshToken      String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope             String?
  idToken           String?
  password          String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Verification {
  id         String   @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

// Application tables
model Company {
  id          String   @id @default(cuid())
  name        String
  industry    String
  size        String?
  description String?
  isDemo      Boolean  @default(false)
  locale      String   @default("en")
  assessmentResults String? // JSON string with full mock results for demo
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Translation File Structure
```json
// messages/en.json
{
  "common": {
    "appName": "AI Architect",
    "navigation": {
      "dashboard": "Dashboard",
      "scan": "Assessment",
      "roadmap": "Roadmap",
      "risks": "Risks",
      "roi": "ROI",
      "modules": "Modules",
      "settings": "Settings"
    },
    "roles": {
      "ceo": "CEO",
      "coo": "COO",
      "cto": "CTO"
    },
    "actions": {
      "login": "Log in",
      "register": "Sign up",
      "logout": "Log out",
      "tryDemo": "Try Demo",
      "switchLanguage": "Switch language"
    }
  },
  "demo": {
    "title": "Select a Demo Company",
    "subtitle": "Explore AI readiness results for sample companies",
    "selectRole": "Select your role",
    "viewResults": "View Results"
  },
  "onboarding": {
    "welcome": "Welcome to AI Architect",
    "companyName": "Company name",
    "selectRole": "Your role",
    "selectIndustry": "Industry",
    "continue": "Continue"
  }
}
```

```json
// messages/ru.json
{
  "common": {
    "appName": "AI Architect",
    "navigation": {
      "dashboard": "Панель управления",
      "scan": "Оценка",
      "roadmap": "Дорожная карта",
      "risks": "Риски",
      "roi": "ROI",
      "modules": "Модули",
      "settings": "Настройки"
    },
    "roles": {
      "ceo": "Генеральный директор",
      "coo": "Операционный директор",
      "cto": "Технический директор"
    },
    "actions": {
      "login": "Войти",
      "register": "Регистрация",
      "logout": "Выйти",
      "tryDemo": "Попробовать демо",
      "switchLanguage": "Сменить язык"
    }
  },
  "demo": {
    "title": "Выберите демо-компанию",
    "subtitle": "Результаты AI-готовности для примеров компаний",
    "selectRole": "Выберите роль",
    "viewResults": "Посмотреть результаты"
  },
  "onboarding": {
    "welcome": "Добро пожаловать в AI Architect",
    "companyName": "Название компании",
    "selectRole": "Ваша роль",
    "selectIndustry": "Отрасль",
    "continue": "Продолжить"
  }
}
```

### Locale Switcher Component
```typescript
// src/components/i18n/locale-switcher.tsx
'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const nextLocale = locale === 'en' ? 'ru' : 'en';
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLocale}>
      {locale === 'en' ? 'RU' : 'EN'}
    </Button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| NextAuth.js / Auth.js v5 beta | Better Auth | 2025 (Auth.js deprecated, acquired by Better Auth) | Must use better-auth for new projects. Migration guide exists. |
| Vercel AI SDK v4 | Vercel AI SDK v5 | 2025 | v5 is current stable. API surface similar but version matters for install. |
| next-intl v3 | next-intl v4.8 | 2025 | Stable v4, streamlined API, `defineRouting` replaces older config patterns |
| middleware.ts (Next.js 15) | proxy.ts (Next.js 16) | Oct 2025 | If using Next.js 16, middleware.ts must be renamed. Staying on 15 avoids this. |
| Tailwind v3 config file | Tailwind v4 CSS-first | 2025 | No tailwind.config.ts needed. Config in CSS. create-next-app handles this. |
| AI SDK domain: sdk.vercel.ai | AI SDK domain: ai-sdk.dev | 2025 | Documentation URL changed. Old URLs redirect. |

**Deprecated/outdated:**
- Auth.js / NextAuth.js: Deprecated, acquired by Better Auth. Do not use for new projects.
- Lucia auth: Deprecated in early 2025. Not an option.
- Tailwind v3 config patterns: v4 uses CSS-first config. `darkMode: 'class'` in config file no longer applies.

## Open Questions

1. **Better Auth Prisma adapter maturity**
   - What we know: Better Auth docs list Prisma as a supported adapter. Multiple community starters exist.
   - What's unclear: Exact schema requirements may differ from what's documented. Auto-generation CLI (`@better-auth/cli`) reliability unknown.
   - Recommendation: Run `npx @better-auth/cli generate` early. If it fails, manually add tables per docs. Validate schema before building on top of it.

2. **claude-max-proxy API compatibility**
   - What we know: It exposes an OpenAI-compatible API at localhost:3456/v1.
   - What's unclear: Exact model names available, whether it supports all OpenAI chat completions parameters, error response format.
   - Recommendation: Phase 1 health check endpoint should test basic `generateText` call. Document discovered model names and limitations.

3. **next-intl + Better Auth middleware composition**
   - What we know: Both need middleware-level access. next-intl needs locale routing, Better Auth needs session access.
   - What's unclear: Best composition pattern. Whether `auth.api.getSession()` works inside next-intl middleware chain.
   - Recommendation: Use next-intl middleware as primary, add auth checks via `auth.api.getSession({ headers })` within the middleware function. Protect routes by checking session in the composed middleware.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest ^2.0 |
| Config file | vitest.config.ts (to be created in Wave 0) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PLAT-01 | Language switcher toggles EN/RU, translations render correctly | unit + integration | `npx vitest run src/__tests__/i18n.test.ts -t "locale"` | -- Wave 0 |
| PLAT-02 | Demo persona selector creates session with role | integration | `npx vitest run src/__tests__/auth.test.ts -t "demo"` | -- Wave 0 |
| PLAT-03 | Demo companies seeded and displayed with mock results | unit | `npx vitest run src/__tests__/demo-data.test.ts` | -- Wave 0 |
| PLAT-04 | AI provider connects to localhost:3456, health check returns | integration | `npx vitest run src/__tests__/ai-provider.test.ts` | -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `vitest.config.ts` -- Vitest configuration with path aliases
- [ ] `src/__tests__/i18n.test.ts` -- Translation loading and locale switching
- [ ] `src/__tests__/auth.test.ts` -- Demo auth flow, session creation
- [ ] `src/__tests__/demo-data.test.ts` -- Seed data structure validation
- [ ] `src/__tests__/ai-provider.test.ts` -- AI provider config and connectivity (mock)

## Sources

### Primary (HIGH confidence)
- [next-intl official docs](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing) -- v4 setup with defineRouting, middleware, locale layout
- [next-intl v4 release](https://next-intl.dev/blog/next-intl-4-0) -- v4.8.3 is latest stable
- [Better Auth Next.js integration](https://better-auth.com/docs/integrations/next) -- API route handler, Prisma adapter, nextCookies plugin
- [AI SDK OpenAI provider](https://ai-sdk.dev/providers/ai-sdk-providers/openai) -- createOpenAI with baseURL for compatible endpoints
- [shadcn/ui dark mode](https://ui.shadcn.com/docs/dark-mode/next) -- next-themes setup for Next.js

### Secondary (MEDIUM confidence)
- [Auth.js deprecated, joined Better Auth](https://better-auth.com/blog/authjs-joins-better-auth) -- Auth.js acquisition confirmed via GitHub discussion and official blog
- [Next.js 16 release](https://nextjs.org/blog/next-16) -- middleware->proxy rename, Turbopack default
- [AI SDK v5 on npm](https://www.npmjs.com/package/ai) -- v5.0.144 latest
- [Next.js 15 vs 16 comparison](https://www.descope.com/blog/post/nextjs15-vs-nextjs16) -- stability analysis

### Tertiary (LOW confidence)
- Better Auth Prisma + SQLite adapter specifics -- confirmed supported, exact schema details need validation at implementation time

## Metadata

**Confidence breakdown:**
- Standard stack: MEDIUM-HIGH -- versions verified via web search and official docs, Auth.js deprecation confirmed
- Architecture: HIGH -- patterns follow well-established Next.js App Router conventions
- Pitfalls: HIGH -- middleware composition, Auth.js deprecation, Tailwind v4 changes all verified
- AI integration: MEDIUM -- createOpenAI with baseURL pattern confirmed, but claude-max-proxy specific compatibility untested

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (30 days -- stack is stable, no fast-moving dependencies expected)
