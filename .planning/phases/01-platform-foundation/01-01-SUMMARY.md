---
phase: 01-platform-foundation
plan: 01
subsystem: infra
tags: [nextjs, prisma, sqlite, next-intl, i18n, vitest, shadcn-ui, tailwind, next-themes]

# Dependency graph
requires: []
provides:
  - Next.js 15 application scaffold with App Router
  - Prisma schema with User, Session, Account, Verification, Company models
  - SQLite database (dev.db) with all tables
  - next-intl EN/RU locale routing with middleware
  - Translation files for common UI strings
  - Locale switcher component
  - Vitest test infrastructure with 4 stub files (9 todos)
  - shadcn/ui components (button, card, avatar, dropdown-menu, select, separator, sheet, sidebar, navigation-menu, badge)
  - ThemeProvider (next-themes) wired in root layout
affects: [01-02-PLAN, 01-03-PLAN, 02-assessment, 03-dashboard, 04-catalog]

# Tech tracking
tech-stack:
  added: [next@15, react@19, prisma@6, @prisma/client@6, better-sqlite3, next-intl@4, better-auth, ai@5, @ai-sdk/openai, zod, next-themes, lucide-react, shadcn/ui, vitest@4, @testing-library/react, @testing-library/jest-dom, jsdom]
  patterns: [locale-prefixed routing with [locale] segment, Prisma client singleton via globalThis, next-intl middleware for locale detection, NextIntlClientProvider in root layout, ThemeProvider with class strategy, static generation with generateStaticParams and setRequestLocale]

key-files:
  created: [prisma/schema.prisma, src/i18n/routing.ts, src/i18n/request.ts, src/i18n/navigation.ts, src/messages/en.json, src/messages/ru.json, src/middleware.ts, src/app/[locale]/layout.tsx, src/app/[locale]/page.tsx, src/components/i18n/locale-switcher.tsx, src/lib/db/prisma.ts, vitest.config.ts, tests/setup.ts]
  modified: [next.config.ts, .gitignore, package.json]

key-decisions:
  - "Downgraded Prisma from v7 to v6 -- v7 removed datasource url from schema files, requiring config migration incompatible with better-auth adapter expectations"
  - "Used @testing-library/jest-dom/vitest import path instead of base import to resolve expect not defined error in Vitest v4"

patterns-established:
  - "Locale routing: All pages under src/app/[locale]/ with generateStaticParams for en/ru"
  - "Prisma client singleton: globalThis pattern in src/lib/db/prisma.ts"
  - "i18n middleware: next-intl createMiddleware as default export in src/middleware.ts"
  - "Theme support: ThemeProvider wrapping NextIntlClientProvider in root layout"

requirements-completed: [PLAT-01]

# Metrics
duration: 7min
completed: 2026-03-05
---

# Phase 1 Plan 01: Project Bootstrap Summary

**Next.js 15 scaffold with Prisma SQLite (5 models), next-intl EN/RU locale routing, shadcn/ui components, and Vitest test infrastructure**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-05T12:59:56Z
- **Completed:** 2026-03-05T13:06:43Z
- **Tasks:** 2
- **Files modified:** 42 created, 3 modified

## Accomplishments
- Running Next.js 15 application with static generation for /en and /ru locale pages
- Prisma schema with User, Session, Account, Verification, and Company models; SQLite database created
- Full next-intl i18n setup: routing, request config, navigation helpers, middleware, locale switcher
- Vitest configured with 4 test files containing 9 todo stubs (0 failures)
- shadcn/ui initialized with 11 components, ThemeProvider wired for dark mode

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Next.js project, install dependencies, set up Prisma and Vitest** - `480cffe` (feat)
2. **Task 2: Set up next-intl i18n with EN/RU translations and locale switcher** - `10786c2` (feat)

## Files Created/Modified
- `prisma/schema.prisma` - Database schema with User, Session, Account, Verification, Company models
- `src/i18n/routing.ts` - Locale routing config (en, ru) using defineRouting
- `src/i18n/request.ts` - Request locale resolution using getRequestConfig
- `src/i18n/navigation.ts` - Locale-aware navigation exports (Link, redirect, usePathname, useRouter)
- `src/messages/en.json` - English translations (common, demo, onboarding, pages)
- `src/messages/ru.json` - Russian translations matching en.json structure
- `src/middleware.ts` - next-intl middleware for locale routing
- `src/app/[locale]/layout.tsx` - Root locale layout with NextIntlClientProvider and ThemeProvider
- `src/app/[locale]/page.tsx` - Landing page with app name, demo CTA, login button
- `src/components/i18n/locale-switcher.tsx` - Client component toggling between EN and RU
- `src/lib/db/prisma.ts` - Prisma client singleton with globalThis pattern
- `vitest.config.ts` - Test framework config with jsdom environment and @ alias
- `tests/setup.ts` - Test setup importing jest-dom matchers
- `next.config.ts` - Updated with next-intl plugin
- `.gitignore` - Updated for .env and dev.db exclusions

## Decisions Made
- **Prisma v6 instead of v7:** Prisma v7 (latest) removed `url` from datasource in schema files, requiring a new `prisma.config.ts` approach. Downgraded to v6 for compatibility with better-auth Prisma adapter and established patterns.
- **Vitest jest-dom import path:** Used `@testing-library/jest-dom/vitest` instead of the base import to provide Vitest-compatible expect extensions.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Prisma v7 datasource URL incompatibility**
- **Found during:** Task 1 (Prisma db push)
- **Issue:** npm installed Prisma v7 (latest), which no longer supports `url = env("DATABASE_URL")` in schema files
- **Fix:** Downgraded to prisma@6 and @prisma/client@6
- **Files modified:** package.json, package-lock.json
- **Verification:** `npx prisma db push` succeeded, dev.db created
- **Committed in:** 480cffe (Task 1 commit)

**2. [Rule 1 - Bug] Vitest setup file expect not defined**
- **Found during:** Task 1 (vitest run)
- **Issue:** `import "@testing-library/jest-dom"` failed because `expect` was not globally available in Vitest
- **Fix:** Changed to `import "@testing-library/jest-dom/vitest"` which provides Vitest-compatible matchers
- **Files modified:** tests/setup.ts
- **Verification:** `npx vitest run` passes with 9 todos, 0 failures
- **Committed in:** 480cffe (Task 1 commit)

**3. [Rule 3 - Blocking] create-next-app capital letter rejection**
- **Found during:** Task 1 (project creation)
- **Issue:** `npx create-next-app@15 .` failed because directory name "B2B_Automate_Business" contains capital letters
- **Fix:** Created project in /tmp/next-tmp, then rsync'd files to project root
- **Files modified:** None (workaround for tooling limitation)
- **Verification:** All project files present in repo root
- **Committed in:** 480cffe (Task 1 commit)

---

**Total deviations:** 3 auto-fixed (1 bug, 2 blocking)
**Impact on plan:** All auto-fixes necessary for correctness and tool compatibility. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Project scaffold complete with all dependencies for Plans 02 (auth/demo) and 03 (AI abstraction)
- Database ready for better-auth integration and demo data seeding
- i18n infrastructure ready for all future page translations
- Test infrastructure ready for implementation tests

## Self-Check: PASSED

All 13 key files verified present. Both task commits (480cffe, 10786c2) verified in git log.

---
*Phase: 01-platform-foundation*
*Completed: 2026-03-05*
