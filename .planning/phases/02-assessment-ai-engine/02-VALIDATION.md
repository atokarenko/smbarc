---
phase: 2
slug: assessment-ai-engine
status: draft
nyquist_compliant: false
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

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | SCAN-01 | integration | `npx vitest run` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | SCAN-03, SCAN-04 | integration | `npx vitest run` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | SCAN-02 | integration | `npx vitest run` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 2 | SCORE-01..06 | integration | `npx vitest run` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/assessment-flow.test.ts` — stub for questionnaire flow (SCAN-01, SCAN-03, SCAN-04)
- [ ] `src/__tests__/ai-followup.test.ts` — stub for AI follow-up generation (SCAN-02)
- [ ] `src/__tests__/scoring.test.ts` — stub for maturity scoring + structured output (SCORE-01..06)

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

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
