---
phase: 2
slug: assessment-ai-engine
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-03-06
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | vitest.config.ts (exists from Phase 1) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 02-01-01 | 01 | 1 | SCAN-01, SCAN-03 | unit | `npx tsc --noEmit` | pending |
| 02-01-02 | 01 | 1 | SCAN-04, SCORE-01 | unit | `npx tsc --noEmit` | pending |
| 02-01-03 | 01 | 1 | SCORE-02, SCORE-06 | unit | `npx vitest run --reporter=verbose` | pending |
| 02-02-01 | 02 | 2 | SCAN-02, SCORE-03 | unit | `npx tsc --noEmit` | pending |
| 02-02-02 | 02 | 2 | SCORE-04 | unit | `grep` (text verification) | pending |
| 02-02-03 | 02 | 2 | SCORE-05 | unit | `npx tsc --noEmit` + `grep` | pending |

*Status: pending / green / red / flaky*

---

## Task Details

**Plan 01 — Data Layer Rewrite (Wave 1)**
- 02-01-01: Atomic dimension rename across types, schemas, scoring, and demo-data
- 02-01-02: Rewrite questions with business-focused content
- 02-01-03: Update all test files for new content

**Plan 02 — Prompts + UI Text (Wave 2, depends on Plan 01)**
- 02-02-01: Complete rewrite of AI prompts for business-first framing
- 02-02-02: Update i18n files and assessment-flow completion text
- 02-02-03: Update processing screen and dashboard components

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Adaptive question difficulty | SCAN-01 | AI-driven language adaptation | Complete assessment as non-technical user, verify simplified language |
| AI follow-up relevance | SCAN-02 | AI output quality check | Answer section, verify follow-ups are contextually relevant |
| Processing screen animation | SCORE-01 | Visual animation check | Complete assessment, verify processing screen shows and transitions to results |
| Section stepper UX | SCAN-04 | Visual progress check | Navigate through sections, verify stepper updates correctly |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify commands
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Task map matches actual plan structure (6 tasks: 3 in Plan 01, 3 in Plan 02)
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
