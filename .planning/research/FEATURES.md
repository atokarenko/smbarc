# Feature Landscape

**Domain:** B2B AI Assessment & Transformation Management Platform for SMB
**Researched:** 2026-03-05
**Overall Confidence:** MEDIUM (based on training data analysis of competitor platforms, AI maturity frameworks, and B2B SaaS patterns; no live web search available)

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Business Process Intake / Scan | Core promise of the product. Users need a structured way to describe their business before getting any output. Questionnaire + guided flow is the minimum. | Medium | Hybrid approach (structured questionnaire + AI follow-up) is the right call. Pure forms feel like a survey; pure chat feels unstructured. Must cover departments (sales, ops, HR, finance, legal, customer support). |
| AI Maturity Score | Every assessment platform produces a score. Users expect a number/grade that summarizes "where am I." Without it, there's no anchor for recommendations. | Medium | Score must be explainable (not just a number). Break into dimensions: data readiness, process automation level, team AI literacy, tool adoption, governance. Industry benchmarks add credibility even if mocked initially. |
| Automation Roadmap / Recommendations | The payoff of the scan. Users do the work of describing their business to get actionable next steps. No roadmap = no value. | High | Must be prioritized (not just a list). Each recommendation needs: what to automate, expected impact, effort estimate, suggested timeline. Ordering logic matters (quick wins first, dependencies respected). |
| Dashboard / Overview | B2B SaaS users expect a central view of their data. A platform without a dashboard feels like a report generator, not a product. | Medium | Must show maturity score, roadmap progress, key metrics at a glance. Role-based views (CEO vs CTO) add value but are not strictly table stakes for POC. |
| PDF/Report Export | Business users need to share findings with stakeholders who will not log in. A downloadable report is the minimum viable sharing mechanism. | Low-Medium | Executive summary format. Branded. Include score, top recommendations, risk highlights. This is how the product spreads inside an organization. |
| User Authentication | Any B2B platform storing business data needs login. Even for POC, "my data is behind a login" is a trust signal. | Low | Simple email/password is fine for POC. No need for SSO/OAuth yet. |
| Multi-language Support (EN minimum) | English is table stakes for any global B2B product. Russian adds local market. | Low-Medium | i18n framework from day one is correct. EN is mandatory; RU is a differentiator for CIS market. |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| AI-Powered Follow-up Questions | Most assessment tools use static questionnaires. Dynamic AI follow-ups that probe deeper based on answers create a "consultant experience" that static tools cannot match. | High | This is the core UX differentiator. The scan should feel like talking to a smart consultant, not filling out a form. LLM generates context-aware follow-ups. Must be bounded (not infinite conversation). |
| Risk Map (multi-dimensional) | Competitors focus on opportunities; few map risks systematically. Legal, financial, reputational, operational, and data risks in one view give executives confidence. | Medium-High | Dimensions: legal/regulatory (GDPR, AI Act), financial (cost overrun, vendor lock-in), operational (staff displacement, process disruption), data (privacy, security, quality), reputational (AI hallucinations, bias). Visualization matters. |
| ROI Forecast / Business Case Generator | Turning "you should automate X" into "automating X saves $Y/month" is what convinces budget holders. Most tools stop at recommendations without quantifying. | High | Needs realistic models: time saved per task x frequency x labor cost. Must show payback period. Even rough estimates are valuable — but must be transparent about assumptions. |
| Role-Based Views (CEO / COO / CTO) | Same data, different lens. CEO sees strategy and ROI. COO sees operational impact and timeline. CTO sees technical requirements and integration complexity. | Medium | True role-based views are rare in SMB tools. Most show one dashboard for everyone. This signals enterprise-readiness while targeting SMB. |
| AI Module Catalog | Moving from "you should automate HR" to "here's an HR AI module you can deploy" closes the gap between assessment and action. | Medium | For POC: curated catalog with descriptions, use cases, expected impact. Not actual deployable modules yet. Categories: HR, Finance, Legal, Sales, Customer Support, Decision Making, Operations. |
| Comparative Benchmarking | "Your AI maturity is 35/100; similar companies in your industry average 52" gives context to the score. | Medium | Requires aggregate data (can be mocked/modeled initially). Industry + company size segmentation. Motivates action through competitive pressure. |
| Reassessment / Progress Tracking | Take the scan again in 3/6 months, see improvement. Turns a one-time assessment into an ongoing management tool. | Medium | Creates retention loop. Shows delta between assessments. "You improved from 35 to 58 in 6 months." Critical for SaaS retention but not needed for POC. |
| AI Compliance / Regulation Tracker | With EU AI Act, US executive orders on AI, and emerging regulations, tracking compliance requirements is increasingly valuable. | High | Growing in importance. Could become table stakes by 2027. For now, a clear differentiator. Map which of their AI uses fall under regulated categories. |
| Team AI Literacy Assessment | Not just "does the company use AI" but "can the team actually work with AI." Identifies training needs. | Medium | Quick assessment per role/department. Feeds into roadmap (if team can not use AI, training comes before tool deployment). |
| Action Plan Templates | Pre-built implementation plans for common automation scenarios (e.g., "Automate invoice processing" step-by-step guide). | Low-Medium | Adds immediate actionable value. Can be AI-generated from templates. Reduces the gap between "recommendation" and "execution." |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Real-time CRM/ERP integrations (v1) | Massive scope expansion. Each integration is a product in itself. SMB has wildly varied tool stacks. Will delay launch by months. | Mock data for POC. Provide manual data input. Plan integration architecture for v2 but do not build connectors. |
| Actual deployable AI modules (v1) | Building real AI automation modules (HR bot, finance assistant) is a separate product line. Premature bundling kills focus. | Catalog with descriptions, expected ROI, and "coming soon" / partner referrals. Marketplace model in v2+. |
| Custom AI model training | SMBs do not have data or expertise for custom models. Offering this creates support burden and expectation mismatch. | Recommend pre-built solutions. The platform is the navigator, not the AI factory. |
| Detailed technical architecture diagrams | SMB executives do not want system architecture. Technical depth alienates the primary buyer (CEO/COO). | Keep technical details in CTO view only. Keep other views business-focused. |
| Billing / subscription management (POC) | Premature optimization. No revenue to collect yet. Adds complexity without validation value. | Free access for POC. Add Stripe integration when product-market fit is validated. |
| Mobile app | Web-first is correct. Assessment is not a mobile use case (long form input, complex visualizations). | Responsive web design covers mobile viewing of dashboards. Full mobile app is anti-feature for this category. |
| Chat-based interface as primary UX | Pure chat UX ("tell me about your business") feels unstructured and creates anxiety about what to say. | Structured scan with AI follow-up questions within sections. Chat can supplement but should not replace structured flow. |
| Gamification / badges | B2B executives find gamification patronizing. "You earned the Data Ready badge!" undermines credibility. | Use professional language. Progress indicators are fine; game mechanics are not. |
| Social features / community | Community building is a separate product. Adding forums/social features dilutes focus and creates moderation burden. | Link to external community if needed. Focus platform on its core value: assessment and roadmap. |
| White-label / custom branding (v1) | Enterprise feature that adds complexity without SMB value. Premature for POC stage. | Single brand. Consider white-label as enterprise tier feature in v3+. |

## Feature Dependencies

```
User Authentication ─────────────────────────────────┐
                                                      v
Business Process Scan (questionnaire) ──────> AI Follow-up Questions
         │                                            │
         v                                            v
    AI Maturity Score ──────────────────> Comparative Benchmarking
         │
         ├──────────> Automation Roadmap ──────> ROI Forecast
         │                  │
         │                  └──────> Action Plan Templates
         │
         ├──────────> Risk Map ──────────────> Compliance Tracker
         │
         └──────────> Team AI Literacy Assessment
                                │
                                v
                      Training Recommendations (part of roadmap)

Dashboard ← aggregates all of the above

PDF/Report Export ← renders dashboard + recommendations

AI Module Catalog ← linked from Automation Roadmap recommendations

Role-Based Views ← presentation layer on Dashboard + Roadmap + Risk Map

Reassessment / Progress Tracking ← requires stored historical scan data

Multi-language ← cross-cutting concern, applied to all features
```

**Critical path:** Authentication > Scan > Maturity Score > Roadmap > Dashboard > Export

**Secondary path:** Scan > Risk Map (can parallelize with Roadmap)

**Tertiary:** ROI Forecast, Role Views, Catalog, Benchmarking (enhance core but not blocking)

## MVP Recommendation

**Prioritize (Phase 1 — POC):**

1. **Business Process Scan** (hybrid questionnaire + AI follow-ups) — this IS the product experience. Without a compelling scan, nothing else matters.
2. **AI Maturity Score** — the tangible output of the scan. Gives users their "number."
3. **Automation Roadmap** — the actionable payoff. Top 5-10 prioritized recommendations with impact estimates.
4. **Risk Map** — differentiator that shows sophistication. Simpler to build than ROI forecast.
5. **Dashboard** — unified view tying it all together.
6. **PDF Export** — enables sharing, which enables sales.

**Prioritize (Phase 2 — Validation):**

7. **ROI Forecast** — quantified business case. Needs more data modeling.
8. **Role-Based Views** — CEO/COO/CTO perspectives. Enhancement of existing dashboard.
9. **AI Module Catalog** — showcase of what's possible. Catalog, not implementation.
10. **Reassessment / Progress Tracking** — retention mechanism.

**Defer (Phase 3+):**

- Comparative Benchmarking: Requires aggregate data that does not exist at launch.
- AI Compliance Tracker: High complexity, rapidly changing regulatory landscape.
- Team AI Literacy Assessment: Nice-to-have, not core value prop.
- Action Plan Templates: Content creation effort, can be AI-generated later.
- Real integrations: Only after PMF validated.

## Competitive Landscape Notes

**Confidence: MEDIUM** (training data, no live verification)

The "AI assessment for business" space splits into several categories:

1. **Consulting firms' free assessments** (McKinsey AI Maturity, Deloitte AI readiness) — free PDF questionnaires, no software product. They generate leads for consulting engagements. Low tech, high credibility.

2. **Process mining tools** (Celonis, UiPath Process Mining) — discover processes from system logs. Enterprise-focused, $100K+ deals. Not assessment-first, discovery-first.

3. **AI platform vendors' readiness checks** (Microsoft AI readiness, Google Cloud AI maturity) — free tools that funnel users to their cloud products. Vendor-locked recommendations.

4. **Automation consultancy platforms** (Catalytic/Pushbot, various boutiques) — consulting-as-a-service with some tooling. People-heavy, not self-serve.

5. **Nobody occupies the "self-serve AI architect for SMB" position** — this is the gap. A product that combines assessment depth of consulting with accessibility of SaaS, targeting businesses that cannot afford $50K consulting engagements.

**Key insight:** The competitive moat is not in any single feature but in the combination of assessment + roadmap + risk + ROI in one self-serve tool. Consultants do this manually for $50-200K. Enterprise tools do this for $100K+ licenses. Nobody does it for $99-499/month for SMB.

## Sources

- Training data analysis of B2B SaaS patterns, AI maturity frameworks (McKinsey, Deloitte, Gartner), process mining tools (Celonis, UiPath), automation platforms (Workato, Zapier, Make)
- Domain knowledge of SMB B2B product patterns
- **Confidence note:** All findings are MEDIUM confidence based on training data (cutoff ~early 2025). The competitive landscape may have shifted. Recommend verifying with live market research before finalizing roadmap.
