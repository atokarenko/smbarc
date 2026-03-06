---
phase: 02-assessment-ai-engine
plan: 02
subsystem: ui
tags: [react, shadcn, next-intl, auto-save, stepper, debounce, server-actions, prisma]

# Dependency graph
requires:
  - phase: 02-assessment-ai-engine
    provides: Assessment Prisma model, AssessmentSection/Question types, scoring/progress functions
provides:
  - Multi-step assessment questionnaire UI at /scan
  - Server actions for assessment CRUD (create, saveAnswer, saveFollowUpAnswer, transitionState)
  - Section stepper with progress bar and free back-navigation
  - Debounced auto-save to DB via server actions
  - Pause/resume from exact position
  - Static placeholder suggestion chips (Plan 03 wires AI)
  - Assessment config screen with AI Decides toggle
  - Bilingual i18n strings (EN/RU)
affects: [02-03, 03-dashboard-visualization]

# Tech tracking
tech-stack:
  added: [shadcn/textarea, shadcn/progress, shadcn/radio-group, shadcn/switch, shadcn/label]
  patterns:
    - "Server component loads DB state, passes serialized props to client orchestrator"
    - "Debounced auto-save (300ms) via useRef timers and server actions"
    - "Completed section tracking via Set<number> derived from answers state"
    - "Static placeholder suggestions pattern -- swap for AI in Plan 03"

key-files:
  created:
    - src/app/[locale]/(app)/scan/actions.ts
    - src/app/[locale]/(app)/scan/assessment-flow.tsx
    - src/app/[locale]/(app)/scan/components/section-stepper.tsx
    - src/app/[locale]/(app)/scan/components/question-group.tsx
    - src/app/[locale]/(app)/scan/components/suggestion-chips.tsx
    - src/app/[locale]/(app)/scan/components/assessment-config.tsx
  modified:
    - src/app/[locale]/(app)/scan/page.tsx
    - src/messages/en.json
    - src/messages/ru.json
    - package.json

key-decisions:
  - "User role read from User model directly (no CompanyMember join table exists)"
  - "Debounce 300ms for auto-save balances responsiveness with server load"
  - "Static suggestion chips use 3 generic responses per locale -- sufficient placeholder for Plan 03 AI wire-up"
  - "Assessment numbering is global across sections (not per-section) for clearer progress indication"

patterns-established:
  - "Server action auth pattern: requireAuth() helper extracts userId from session"
  - "Assessment data serialization: server component JSON.parse -> plain object props to client"
  - "Section completion derived from answers state, not stored in DB"

requirements-completed: [SCAN-01, SCAN-02, SCAN-03, SCAN-04]

# Metrics
duration: 4min
completed: 2026-03-06
---

# Phase 2 Plan 02: Assessment Questionnaire UI Summary

**Multi-step questionnaire at /scan with 5-section stepper, debounced auto-save, pause/resume, suggestion chips, and bilingual i18n**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-06T12:15:25Z
- **Completed:** 2026-03-06T12:19:17Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments
- Server actions for full assessment CRUD: createAssessment, saveAnswer, saveFollowUpAnswer, transitionState, getOrCreateAssessment -- all with auth validation
- Assessment flow client orchestrator with section navigation, debounced auto-save (300ms), and progress tracking via calculateProgress
- Horizontal 5-step stepper with completion indicators, clickable completed sections, and percentage progress bar
- Question groups rendering open-text textareas with placeholder suggestion chips and single-choice radio groups
- Assessment config start screen with AI Decides toggle and bilingual explanations
- Full i18n support with assessment keys added to both en.json and ru.json

## Task Commits

Each task was committed atomically:

1. **Task 1: Install shadcn components + server actions + scan page server component** - `aff8e05` (feat)
2. **Task 2: Assessment flow client component with stepper, question groups, auto-save** - `edb0aad` (feat)

## Files Created/Modified
- `src/app/[locale]/(app)/scan/actions.ts` - Server actions for assessment CRUD with auth
- `src/app/[locale]/(app)/scan/assessment-flow.tsx` - Client orchestrator for full assessment flow
- `src/app/[locale]/(app)/scan/page.tsx` - Server component loading assessment from DB
- `src/app/[locale]/(app)/scan/components/section-stepper.tsx` - Horizontal stepper with progress
- `src/app/[locale]/(app)/scan/components/question-group.tsx` - Question rendering with auto-save
- `src/app/[locale]/(app)/scan/components/suggestion-chips.tsx` - Clickable suggestion chips
- `src/app/[locale]/(app)/scan/components/assessment-config.tsx` - Start screen with AI toggle
- `src/messages/en.json` - Added assessment i18n keys (EN)
- `src/messages/ru.json` - Added assessment i18n keys (RU)
- `src/components/ui/textarea.tsx` - shadcn textarea component
- `src/components/ui/progress.tsx` - shadcn progress component
- `src/components/ui/radio-group.tsx` - shadcn radio-group component
- `src/components/ui/switch.tsx` - shadcn switch component
- `src/components/ui/label.tsx` - shadcn label component
- `package.json` - Updated with new shadcn dependencies

## Decisions Made
- User role read from User.role field directly since no CompanyMember join table exists in the schema
- Debounce timer set to 300ms for auto-save -- balances responsive feel with reasonable server action frequency
- Static suggestion chips use 3 generic responses per locale as placeholder until Plan 03 wires AI-generated suggestions
- Question numbering is global across all sections (not reset per section) for clearer progress indication to users

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed company member lookup for user role**
- **Found during:** Task 1 (scan page server component)
- **Issue:** Plan referenced company.members relation which does not exist in Prisma schema; User has role field directly
- **Fix:** Changed page.tsx to query User model directly for role instead of joining through CompanyMember
- **Files modified:** src/app/[locale]/(app)/scan/page.tsx
- **Verification:** TypeScript compiles cleanly
- **Committed in:** aff8e05 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor schema mismatch fix. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Full questionnaire UI ready for AI integration in Plan 03
- Server actions provide the save/transition interface Plan 03 needs
- Suggestion chips component accepts dynamic suggestions -- just pass AI-generated ones
- AssessmentFlow completion handler is a placeholder ready for AI processing screen

## Self-Check: PASSED

All 14 files verified on disk. Both task commits (aff8e05, edb0aad) found in git history.

---
*Phase: 02-assessment-ai-engine*
*Completed: 2026-03-06*
