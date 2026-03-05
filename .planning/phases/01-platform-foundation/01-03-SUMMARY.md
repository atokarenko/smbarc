---
phase: 01-platform-foundation
plan: 03
subsystem: ui
tags: [sidebar, header, theme-toggle, app-shell, dashboard, onboarding, settings, shadcn-sidebar, next-themes, i18n]

# Dependency graph
requires:
  - phase: 01-platform-foundation/01
    provides: Next.js scaffold, Prisma schema, i18n routing, shadcn/ui components, ThemeProvider
  - phase: 01-platform-foundation/02
    provides: Better Auth config, auth client with useSession, demo data types, RoleBadge, locale-switcher, demo companies in DB
provides:
  - App shell with sidebar navigation (7 items) and header (locale, theme, user menu)
  - Protected (app) layout with session check and redirect to login
  - Dashboard page loading and displaying demo company assessment data (maturity score, dimensions, roadmap count, risk count, projected ROI)
  - Placeholder pages for scan, roadmap, risks, roi, modules
  - Settings page with role display/selector and language selector
  - Onboarding wizard with company name, role, industry fields
  - Full EN/RU translations for dashboard, settings, onboarding sections
affects: [02-assessment, 03-dashboard, 04-catalog]

# Tech tracking
tech-stack:
  added: []
  patterns: [shadcn Sidebar component for navigation, SidebarProvider + SidebarInset layout pattern, server component session check in route group layout, client dashboard-content split for server data loading, PlaceholderPage reusable component for stub pages]

key-files:
  created: [src/components/layout/app-shell.tsx, src/components/layout/sidebar.tsx, src/components/layout/header.tsx, src/components/layout/placeholder-page.tsx, src/components/theme/theme-toggle.tsx, src/app/[locale]/(app)/layout.tsx, src/app/[locale]/(app)/dashboard/page.tsx, src/app/[locale]/(app)/dashboard/dashboard-content.tsx, src/app/[locale]/(app)/scan/page.tsx, src/app/[locale]/(app)/roadmap/page.tsx, src/app/[locale]/(app)/risks/page.tsx, src/app/[locale]/(app)/roi/page.tsx, src/app/[locale]/(app)/modules/page.tsx, src/app/[locale]/(app)/settings/page.tsx, src/app/[locale]/(app)/settings/settings-content.tsx, src/app/[locale]/onboarding/page.tsx, src/app/[locale]/onboarding/onboarding-content.tsx]
  modified: [src/messages/en.json, src/messages/ru.json]

key-decisions:
  - "Dashboard splits into server page.tsx (data loading) + client dashboard-content.tsx (rendering) to maintain SSG with dynamic data"
  - "Reusable PlaceholderPage component for all stub pages instead of duplicating coming-soon layout"
  - "Settings page uses locale-aware router.replace for language switching, matching existing LocaleSwitcher pattern"

patterns-established:
  - "App shell: SidebarProvider > AppSidebar + SidebarInset > AppHeader + main content"
  - "Protected routes: (app) route group with layout.tsx checking auth.api.getSession, redirecting to login if no session"
  - "Page split: Server page.tsx (setRequestLocale + data loading) delegates to client content component for interactive UI"
  - "Sidebar navigation: NAV_ITEMS array with key, href, icon -- active state via pathname comparison"

requirements-completed: [PLAT-01, PLAT-02, PLAT-03]

# Metrics
duration: 8min
completed: 2026-03-05
---

# Phase 1 Plan 03: App Shell & Dashboard Summary

**Sidebar navigation with 7 pages, header with locale/theme controls, dashboard rendering demo company maturity scores, settings with role/language selectors, and onboarding wizard**

## Performance

- **Duration:** 8 min (including checkpoint pause for human verification)
- **Started:** 2026-03-05T13:17:02Z
- **Completed:** 2026-03-05T13:41:06Z
- **Tasks:** 2 (1 auto + 1 human-verify checkpoint)
- **Files modified:** 17 created, 2 modified

## Accomplishments
- Complete app shell with shadcn Sidebar component, collapsible to icons, with user info and role badge in footer
- Header with sidebar trigger, locale switcher, theme toggle, and user avatar dropdown (settings, logout)
- Dashboard loading demo company data from Prisma and displaying maturity score (overall + 5 dimensions), roadmap count, risk count, projected ROI
- All 7 sidebar pages routed and accessible: Dashboard, Assessment, Roadmap, Risks, ROI, Modules, Settings
- Settings page showing current role with selector and language selector
- Onboarding wizard with company name, role, industry fields
- Full EN/RU translations for all new sections (dashboard, settings, onboarding with industry names)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build app shell with sidebar, header, theme toggle, and all pages** - `d272ccf` (feat)
2. **Task 2: Verify complete Phase 1 application** - Human verification checkpoint (approved with issues noted)

## Files Created/Modified
- `src/components/layout/app-shell.tsx` - SidebarProvider wrapper combining sidebar + header + content
- `src/components/layout/sidebar.tsx` - Main sidebar with 7 nav items, user info, role badge
- `src/components/layout/header.tsx` - Top bar with sidebar trigger, locale switcher, theme toggle, user avatar dropdown
- `src/components/layout/placeholder-page.tsx` - Reusable coming-soon page with construction icon
- `src/components/theme/theme-toggle.tsx` - Sun/Moon toggle using next-themes useTheme
- `src/app/[locale]/(app)/layout.tsx` - Protected layout checking session, redirecting to login
- `src/app/[locale]/(app)/dashboard/page.tsx` - Server component loading demo company data from Prisma
- `src/app/[locale]/(app)/dashboard/dashboard-content.tsx` - Client component rendering maturity score cards
- `src/app/[locale]/(app)/scan/page.tsx` - Assessment placeholder
- `src/app/[locale]/(app)/roadmap/page.tsx` - Roadmap placeholder
- `src/app/[locale]/(app)/risks/page.tsx` - Risks placeholder
- `src/app/[locale]/(app)/roi/page.tsx` - ROI placeholder
- `src/app/[locale]/(app)/modules/page.tsx` - Modules placeholder
- `src/app/[locale]/(app)/settings/page.tsx` - Settings server wrapper
- `src/app/[locale]/(app)/settings/settings-content.tsx` - Settings client with role/language selectors
- `src/app/[locale]/onboarding/page.tsx` - Onboarding server wrapper
- `src/app/[locale]/onboarding/onboarding-content.tsx` - Onboarding wizard form
- `src/messages/en.json` - Added dashboard, settings, onboarding translations
- `src/messages/ru.json` - Added dashboard, settings, onboarding translations (Russian)

## Decisions Made
- **Dashboard server/client split:** Dashboard page.tsx is a server component that loads demo company data from Prisma, then passes it to a client DashboardContent component for rendering. This maintains the SSG pattern while allowing dynamic data.
- **Reusable PlaceholderPage:** Created a shared component for all stub pages instead of duplicating the coming-soon layout in each page file.
- **Settings locale switching:** Uses the same `router.replace(pathname, { locale })` pattern as the existing LocaleSwitcher component for consistency.

## Deviations from Plan

None - plan executed exactly as written.

## Known Issues (from Human Verification)

**Landing page buttons not interactive:** The landing page (`src/app/[locale]/page.tsx`, created in Plan 01-01) has "Try Demo" and "Log in" buttons that are not wired to any navigation. They render correctly but do nothing on click. This is a pre-existing gap from Plan 01-01 -- the buttons were created as visual placeholders without `href` or `onClick` handlers. This should be addressed as a gap closure task (wire buttons to `/login` route).

## Issues Encountered
None beyond the pre-existing landing page button issue noted above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 1 complete: all 3 plans executed
- App shell, auth, i18n, AI abstraction, demo data all in place
- Phase 2 (Assessment & AI Engine) can begin -- will build on the protected routes and AI provider abstraction
- Landing page button wiring should be addressed before or during Phase 2

## Self-Check: PASSED

All 17 key files verified present. Task commit (d272ccf) verified in git log.

---
*Phase: 01-platform-foundation*
*Completed: 2026-03-05*
