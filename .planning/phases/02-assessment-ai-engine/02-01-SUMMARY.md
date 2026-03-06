---
phase: 02-assessment-ai-engine
plan: 01
subsystem: assessment
tags: [prisma, zod, scoring, cmmi, bilingual, vitest, tdd]

# Dependency graph
requires:
  - phase: 01-platform-foundation
    provides: Prisma schema with User model, demo-data.ts interfaces
provides:
  - Assessment Prisma model with state machine fields
  - AssessmentSection/Question types and state machine transitions
  - 19 bilingual questions across 5 dimensions (Strategy, Adoption, Risk Management, ROI Tracking, Governance)
  - Zod schemas (followUp, scoreAndRoadmap, riskAndRoi) matching AssessmentResults interfaces
  - Formula-based dimension scoring with CMMI level assignment
  - Progress calculation for assessment completion
affects: [02-02, 02-03, 03-dashboard-visualization]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "TDD with Vitest for assessment logic"
    - "Zod v4 schemas with .describe() for AI structured output"
    - "Question definitions as typed data structures (not inline JSX)"
    - "Formula scoring heuristic: length-based baseline + keyword bonus for open-text, index mapping for single-choice"

key-files:
  created:
    - src/lib/assessment/types.ts
    - src/lib/assessment/questions.ts
    - src/lib/assessment/schemas.ts
    - src/lib/assessment/scoring.ts
    - src/lib/assessment/questions.test.ts
    - src/lib/assessment/schemas.test.ts
    - src/lib/assessment/scoring.test.ts
  modified:
    - prisma/schema.prisma

key-decisions:
  - "19 questions total (4 per section except ROI Tracking with 3) -- within 15-20 range"
  - "Open-text scoring uses length baseline (0-85) plus keyword bonus (up to +15) -- gives AI a reasonable starting point to refine"
  - "Single-choice options ordered by maturity (index 0 = lowest, last = highest) for linear score mapping"
  - "Re-export demo-data types from assessment/types.ts so consumers import from one place"

patterns-established:
  - "AssessmentSection data structure pattern: id, bilingual name, dimension key, questions array"
  - "Zod schemas mirror TypeScript interfaces exactly for compile-time type safety"
  - "State machine transitions as static Record for validation"

requirements-completed: [SCAN-01, SCAN-03, SCAN-04, SCORE-01, SCORE-02, SCORE-06]

# Metrics
duration: 5min
completed: 2026-03-06
---

# Phase 2 Plan 01: Assessment Data Foundation Summary

**Prisma Assessment model, 19 bilingual questions across 5 dimensions, Zod schemas matching AssessmentResults types, formula scoring with CMMI levels, and 65 passing tests**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-06T12:07:47Z
- **Completed:** 2026-03-06T12:12:27Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Assessment model added to Prisma schema with state machine (CREATED/IN_PROGRESS/AI_FOLLOWUP/CALCULATING/COMPLETE), JSON answer storage, and user relation
- 19 bilingual questions (EN/RU) across 5 dimensions with conversational tone, mix of open-text and single-choice types, and weighted scoring
- Zod schemas structurally identical to AssessmentResults/MaturityScore/RoadmapItem/RiskItem/ROIForecast interfaces from demo-data.ts
- Formula-based scoring engine with dimension scores (0-100), CMMI level assignment at correct boundaries, and progress calculation
- 65 comprehensive tests covering question structure, state transitions, schema validation, type compatibility, scoring edge cases, and CMMI boundary values

## Task Commits

Each task was committed atomically:

1. **Task 1: Prisma Assessment model + assessment types + questionnaire definitions** - `b96824c` (feat)
2. **Task 2: Zod schemas for AI output + scoring formula + progress calculation** - `4a44726` (feat)

## Files Created/Modified
- `prisma/schema.prisma` - Added Assessment model with state, answers, results JSON fields
- `src/lib/assessment/types.ts` - AssessmentStatus, VALID_TRANSITIONS, Question, AssessmentSection, FollowUpQuestion types
- `src/lib/assessment/questions.ts` - ASSESSMENT_SECTIONS with 19 questions, getQuestionsForSection, getTotalQuestionCount
- `src/lib/assessment/schemas.ts` - followUpSchema, scoreAndRoadmapSchema, riskAndRoiSchema Zod schemas
- `src/lib/assessment/scoring.ts` - calculateDimensionScores, calculateOverallScore, getMaturityLevel, calculateProgress
- `src/lib/assessment/questions.test.ts` - 20 tests for question structure and state transitions
- `src/lib/assessment/schemas.test.ts` - 16 tests for schema validation and type compatibility
- `src/lib/assessment/scoring.test.ts` - 29 tests for scoring logic and CMMI boundaries

## Decisions Made
- 19 questions total (4 per section, 3 for ROI Tracking) -- within the 15-20 specified range
- Open-text scoring heuristic: length baseline (0-85) + keyword bonus (up to +15 for domain-relevant terms) -- gives AI enrichment a reasonable starting point
- Single-choice options ordered by maturity level (index 0 = least mature) for straightforward linear score mapping
- Re-exported demo-data.ts types from assessment/types.ts so downstream consumers have a single import source

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All data contracts established: types, schemas, and scoring logic ready for UI (Plan 02) and AI integration (Plan 03)
- Prisma schema applied to dev DB, client generated
- Zod schemas validated against demo data structures, ready for Output.object() usage in AI calls

## Self-Check: PASSED

All 8 files verified on disk. Both task commits (b96824c, 4a44726) found in git history.

---
*Phase: 02-assessment-ai-engine*
*Completed: 2026-03-06*
