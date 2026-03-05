---
phase: 1
slug: platform-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | PLAT-01 | integration | `npx vitest run` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | PLAT-02 | integration | `npx vitest run` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | PLAT-03 | integration | `npx vitest run` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | PLAT-04 | unit | `npx vitest run` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest` + `@testing-library/react` — install test framework
- [ ] `tests/setup.ts` — test setup and shared config
- [ ] `__tests__/plat-01-i18n.test.ts` — stub for i18n switching
- [ ] `__tests__/plat-02-auth.test.ts` — stub for demo auth + role selection
- [ ] `__tests__/plat-03-demo.test.ts` — stub for demo profile loading
- [ ] `__tests__/plat-04-ai.test.ts` — stub for AI provider abstraction connectivity

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual theme toggle (light/dark) | PLAT-01 | CSS visual check | Toggle theme, verify no flash, correct colors in both modes |
| Sidebar navigation responsiveness | PLAT-01 | Layout visual check | Resize browser, verify sidebar collapses appropriately |
| Demo profile data renders correctly | PLAT-03 | Visual data check | Select each demo company, verify all sections render with mock data |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
