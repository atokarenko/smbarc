# Requirements: AI Architect

**Defined:** 2026-03-05
**Core Value:** Предприниматель получает ясную картину: где он с AI, что автоматизировать дальше, какой эффект и какие риски -- вместо хаотичного внедрения.

## v1 Requirements

### Assessment

- [x] **SCAN-01**: User can complete structured questionnaire covering business processes, current AI usage, risks, and strategy
- [ ] **SCAN-02**: AI generates follow-up questions based on user's answers to dig deeper into specific areas
- [x] **SCAN-03**: User can pause assessment and resume from where they left off
- [x] **SCAN-04**: Assessment progress is visible (progress bar, sections completed)

### Scoring & Analysis

- [x] **SCORE-01**: System generates AI Maturity Score with breakdown by dimensions (strategy, adoption, risk management, ROI tracking, governance)
- [x] **SCORE-02**: Maturity Score is grounded in methodology (CMMI-inspired levels) with clear explanation of each level
- [ ] **SCORE-03**: System generates Automation Roadmap -- what to automate, in what order, with expected impact
- [ ] **SCORE-04**: System generates Risk Map covering legal, financial, reputational, operational, and data risks
- [ ] **SCORE-05**: System generates ROI Forecast with ranges and visible assumptions (not false-precision point estimates)
- [x] **SCORE-06**: All analysis outputs are generated via AI with Zod-validated structured output

### Dashboard

- [ ] **DASH-01**: User sees overview dashboard with Maturity Score, key metrics, and summary cards
- [ ] **DASH-02**: User can view Automation Roadmap as visual timeline/priority list
- [ ] **DASH-03**: User can view Risk Map with risk categories and severity levels
- [ ] **DASH-04**: User can view ROI Forecast with charts showing savings projections
- [ ] **DASH-05**: Dashboard adapts to user role -- CEO sees strategic view, COO sees operational, CTO sees technical
- [ ] **DASH-06**: User can export full assessment report as PDF

### Module Catalog

- [ ] **MOD-01**: User can browse catalog of AI modules (HR, Finance, Legal, Decision Making)
- [ ] **MOD-02**: Each module shows description, expected impact, and relevance to user's assessment results
- [ ] **MOD-03**: Modules are recommended based on assessment results (personalized suggestions)

### Platform

- [x] **PLAT-01**: Interface available in English and Russian with language switcher
- [x] **PLAT-02**: User can register, log in, and select role (CEO/COO/CTO)
- [x] **PLAT-03**: Pre-loaded demo company profiles to showcase results without completing full scan
- [x] **PLAT-04**: AI provider abstraction layer supporting claude-max-proxy locally, swappable to other providers

## v2 Requirements

### Assessment Enhancements

- **SCAN-V2-01**: Integration with CRM/Finance/HR systems for automated data collection
- **SCAN-V2-02**: Industry-specific assessment templates (healthcare, retail, fintech)
- **SCAN-V2-03**: Reassessment workflow -- track progress over time

### Analytics

- **ANLYT-V2-01**: Industry benchmarking -- compare maturity score against peers
- **ANLYT-V2-02**: Compliance tracker (EU AI Act, industry regulations)
- **ANLYT-V2-03**: Team AI literacy assessment

### Platform

- **PLAT-V2-01**: Billing and subscription management ($99-499/month tiers)
- **PLAT-V2-02**: OAuth/SSO (Google, Microsoft)
- **PLAT-V2-03**: Multi-tenant organization management

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real CRM/HR/Finance integrations | v2 -- POC uses mock data and questionnaire |
| Functional AI modules (actual HR automation, etc.) | v2+ -- POC shows catalog only |
| Mobile app | Web-first, responsive design sufficient |
| Real-time collaboration | Single-user assessment for v1 |
| Custom branding/white-label | Enterprise feature, not POC |
| Payment processing | No billing in POC |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PLAT-01 | Phase 1 | Complete |
| PLAT-02 | Phase 1 | Complete |
| PLAT-03 | Phase 1 | Complete |
| PLAT-04 | Phase 1 | Complete |
| SCAN-01 | Phase 2 | Complete |
| SCAN-02 | Phase 2 | Pending |
| SCAN-03 | Phase 2 | Complete |
| SCAN-04 | Phase 2 | Complete |
| SCORE-01 | Phase 2 | Complete |
| SCORE-02 | Phase 2 | Complete |
| SCORE-03 | Phase 2 | Pending |
| SCORE-04 | Phase 2 | Pending |
| SCORE-05 | Phase 2 | Pending |
| SCORE-06 | Phase 2 | Complete |
| DASH-01 | Phase 3 | Pending |
| DASH-02 | Phase 3 | Pending |
| DASH-03 | Phase 3 | Pending |
| DASH-04 | Phase 3 | Pending |
| DASH-05 | Phase 3 | Pending |
| DASH-06 | Phase 3 | Pending |
| MOD-01 | Phase 4 | Pending |
| MOD-02 | Phase 4 | Pending |
| MOD-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-05 after roadmap creation*
