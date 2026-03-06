# Phase 04: Module Catalog - Research

**Researched:** 2026-03-06
**Domain:** Static catalog UI with personalized recommendations from assessment data
**Confidence:** HIGH

## Summary

Phase 04 is the final POC phase -- a showcase catalog of AI automation modules (HR, Finance, Legal, Decision Making). This is NOT functional automation; it is a browsable catalog where each module is framed as a business solution ("Automate invoice processing") rather than an abstract AI tool ("AI Finance Module"). Modules show description, expected business impact, and personalized relevance based on the user's completed assessment results.

The implementation is straightforward: static module data (hardcoded, bilingual), a grid/list catalog UI using existing shadcn/ui components, and a simple recommendation algorithm that maps assessment dimension scores to module relevance. No new API routes, no AI calls, no database changes. The existing `loadAssessmentData` pattern from the dashboard page is reused to get assessment results.

**Primary recommendation:** Hardcode module definitions in a TypeScript data file with i18n support, build a card-grid catalog page, and use dimension scores from `AssessmentResults.maturityScore.dimensions` to compute relevance/recommendation ordering.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| MOD-01 | User can browse catalog of AI modules (HR, Finance, Legal, Decision Making) | Static module data file + card grid UI using shadcn Card/Badge components |
| MOD-02 | Each module shows description, expected impact, and relevance to assessment results | Module data structure with description/impact fields + relevance score computed from dimension scores |
| MOD-03 | Modules are recommended based on assessment results (personalized suggestions) | Recommendation algorithm mapping dimension scores to module relevance, sorted by score |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5 | App router, server components | Already the project framework |
| shadcn/ui (radix-ui) | 1.4 | Card, Badge, Tabs components | Already installed, used everywhere |
| next-intl | 4.8 | Bilingual module descriptions | Already configured for EN/RU |
| lucide-react | 0.577 | Module category icons | Already installed |

### No New Dependencies Needed

This phase requires zero new npm packages. Everything needed is already in the project.

## Architecture Patterns

### Recommended Project Structure
```
src/
  lib/
    modules/
      catalog-data.ts          # Module definitions (static data)
      recommendation.ts        # Score-to-relevance mapping logic
      recommendation.test.ts   # Unit tests for recommendation logic
  app/[locale]/(app)/modules/
    page.tsx                   # Server component (load assessment data)
    modules-content.tsx        # Client component (render catalog)
  messages/
    en.json                    # Add "modules" section
    ru.json                    # Add "modules" section
```

### Pattern 1: Server Page + Client Content (Established Project Pattern)
**What:** Server component loads assessment data, passes to client component for rendering.
**When to use:** Every page in this project follows this pattern (dashboard, roadmap, risks, ROI).
**Example:**
```typescript
// page.tsx (server)
export default async function ModulesPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await auth.api.getSession({ headers: await headers() });
  // Reuse same loadAssessmentData pattern from dashboard/page.tsx
  const { results } = await loadAssessmentData(session.user.id);
  return <ModulesContent assessmentResults={results} />;
}
```

### Pattern 2: Static Data with i18n Keys
**What:** Module catalog data is hardcoded in TypeScript, using i18n message keys for all user-facing text.
**When to use:** POC catalog with fixed content, bilingual support.
**Example:**
```typescript
// catalog-data.ts
export interface CatalogModule {
  id: string;
  category: "hr" | "finance" | "legal" | "decision-making";
  icon: string;                    // lucide icon name
  relevantDimensions: string[];    // which assessment dimensions this maps to
  impactLevel: "high" | "medium" | "low";
}

export const CATALOG_MODULES: CatalogModule[] = [
  {
    id: "invoice-processing",
    category: "finance",
    icon: "Receipt",
    relevantDimensions: ["finance", "operations"],
    impactLevel: "high",
  },
  // ... 8-12 modules total
];
```

### Pattern 3: Dimension-Based Relevance Scoring
**What:** Each module maps to 1-2 assessment dimensions. Relevance = average score of mapped dimensions (inverted -- lower health = higher need for automation).
**When to use:** MOD-03 personalized recommendations.
**Example:**
```typescript
// recommendation.ts
export function computeRelevance(
  module: CatalogModule,
  dimensions: MaturityScore["dimensions"]
): number {
  // Lower dimension score = more need for this module = higher relevance
  const scores = module.relevantDimensions.map(
    (d) => dimensions[d as keyof typeof dimensions] ?? 50
  );
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  return 100 - avgScore; // Invert: struggling areas get high relevance
}
```

### Anti-Patterns to Avoid
- **Over-engineering the recommendation engine:** This is a POC. A simple dimension-score mapping is sufficient. Do NOT build ML-based recommendations or collaborative filtering.
- **Storing modules in the database:** Static data file is correct for POC. No CRUD needed.
- **Making functional modules:** Out of scope per REQUIREMENTS.md. Each module is a card with info, not a working tool.
- **Creating individual module detail pages:** A catalog page with expandable cards or a modal is sufficient for POC.

## Module Catalog Content

### Business-First Module Definitions (4 Categories, ~10-12 Modules)

**HR Category:**
- "Automate Hiring Pipeline" -- Screen resumes, schedule interviews, track candidates
- "Employee Onboarding Automation" -- Auto-generate onboarding checklists, assign training
- "Team Performance Analytics" -- Track productivity patterns, identify bottlenecks

**Finance Category:**
- "Invoice Processing Automation" -- Extract data from invoices, match POs, auto-approve
- "Cash Flow Forecasting" -- Predict cash position based on historical patterns
- "Expense Report Automation" -- Auto-categorize expenses, flag anomalies

**Legal Category:**
- "Contract Review Assistant" -- Scan contracts for risky clauses, suggest changes
- "Compliance Monitoring" -- Track regulatory changes, flag non-compliance risks

**Decision Making Category:**
- "Business Intelligence Dashboard" -- Auto-generate insights from operational data
- "Risk Assessment Automation" -- Continuous risk monitoring with early warnings
- "Customer Churn Prediction" -- Identify at-risk customers before they leave

### Dimension-to-Category Mapping
| Category | Primary Dimension | Secondary Dimension |
|----------|-------------------|---------------------|
| HR | team | operations |
| Finance | finance | operations |
| Legal | risks | finance |
| Decision Making | operations | sales |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Module card grid | Custom grid CSS | shadcn Card + Tailwind grid | Already used everywhere in the project |
| Icon rendering | Custom icon component | lucide-react dynamic import | Already installed, huge icon set |
| Bilingual text | Hardcoded strings | next-intl message keys | Established pattern, all pages use it |
| Relevance scoring | Complex ML algorithm | Simple dimension-score inversion | POC -- simple math is transparent and debuggable |

## Common Pitfalls

### Pitfall 1: Making Modules Look Functional
**What goes wrong:** Adding "Enable" or "Start" buttons that suggest modules actually work.
**Why it happens:** Natural instinct to add CTAs to cards.
**How to avoid:** Use "Learn More" or "Coming Soon" labels. Frame as showcase, not activation.
**Warning signs:** Any button that implies the module will do something.

### Pitfall 2: Forgetting the No-Assessment State
**What goes wrong:** Page crashes or shows empty relevance when user has no assessment results.
**Why it happens:** MOD-03 assumes assessment data exists.
**How to avoid:** Show catalog without personalized scores when no assessment. Add "Complete assessment for personalized recommendations" CTA.
**Warning signs:** No null-check on `assessmentResults`.

### Pitfall 3: Not Using Business Language
**What goes wrong:** Module names like "AI Finance Module" instead of "Automate Invoice Processing."
**Why it happens:** Developer naming vs. business naming.
**How to avoid:** Every module name should be an action phrase: "Automate X", "Predict Y", "Monitor Z."
**Warning signs:** Any module name containing "AI Module" or "ML System."

### Pitfall 4: Missing i18n for Module Content
**What goes wrong:** Module descriptions hardcoded in English only.
**Why it happens:** Lots of text content, easy to forget Russian translations.
**How to avoid:** All text in en.json/ru.json from the start. Module data file references i18n keys only.

## Code Examples

### Assessment Data Loading (Reuse from Dashboard)
```typescript
// Exact pattern from src/app/[locale]/(app)/dashboard/page.tsx
import { prisma } from "@/lib/db/prisma";
import type { AssessmentResults } from "@/lib/demo-data";

async function loadAssessmentData(userId: string) {
  const userAssessment = await prisma.assessment.findFirst({
    where: { userId, status: "COMPLETE" },
    orderBy: { updatedAt: "desc" },
    select: { results: true },
  });
  if (userAssessment?.results) {
    return JSON.parse(userAssessment.results) as AssessmentResults;
  }
  // Fallback: demo company
  const demo = await prisma.company.findFirst({ where: { isDemo: true } });
  return demo?.assessmentResults
    ? (JSON.parse(demo.assessmentResults) as AssessmentResults)
    : null;
}
```

### Module Card with Relevance Badge
```typescript
// Uses existing shadcn Card + Badge components
<Card className="relative">
  <CardHeader>
    <div className="flex items-center gap-2">
      <ModuleIcon name={module.icon} className="h-5 w-5" />
      <Badge variant={relevance > 70 ? "default" : "secondary"}>
        {relevance > 70 ? t("modules.recommended") : t("modules.relevance", { score: relevance })}
      </Badge>
    </div>
    <CardTitle className="text-base">{t(`modules.items.${module.id}.name`)}</CardTitle>
    <CardDescription>{t(`modules.items.${module.id}.description`)}</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      {t(`modules.items.${module.id}.impact`)}
    </p>
  </CardContent>
</Card>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static product pages | Interactive catalog with personalization | N/A for POC | Simple scoring is sufficient |

This is a POC catalog. No industry "state of the art" applies -- the goal is a clean, informative showcase, not a marketplace.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.x |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run src/lib/modules/` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MOD-01 | Catalog data has all 4 categories with modules | unit | `npx vitest run src/lib/modules/catalog-data.test.ts -t "categories"` | No -- Wave 0 |
| MOD-02 | Each module has description, impact, relevantDimensions | unit | `npx vitest run src/lib/modules/catalog-data.test.ts -t "module fields"` | No -- Wave 0 |
| MOD-03 | Recommendation scoring returns higher relevance for lower dimension scores | unit | `npx vitest run src/lib/modules/recommendation.test.ts -t "relevance"` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/modules/`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before verify

### Wave 0 Gaps
- [ ] `src/lib/modules/recommendation.test.ts` -- covers MOD-03 relevance scoring
- [ ] `src/lib/modules/catalog-data.test.ts` -- covers MOD-01, MOD-02 data integrity

## Open Questions

1. **Exact number of modules per category**
   - What we know: 4 categories (HR, Finance, Legal, Decision Making), ~10-12 modules total
   - What's unclear: Exact count per category
   - Recommendation: 2-3 per category, 10-12 total. Enough to look substantive without being overwhelming.

2. **Module detail view vs. expand-in-place**
   - What we know: No separate detail pages needed for POC
   - What's unclear: Whether to use accordion/expand or just show all info on card
   - Recommendation: Show key info directly on card (description + impact + relevance badge). No expand needed -- keep it simple.

## Sources

### Primary (HIGH confidence)
- Project codebase: `src/lib/demo-data.ts` -- AssessmentResults type with dimension scores
- Project codebase: `src/app/[locale]/(app)/dashboard/page.tsx` -- loadAssessmentData pattern
- Project codebase: `src/messages/en.json` -- existing i18n structure
- `.planning/REQUIREMENTS.md` -- MOD-01, MOD-02, MOD-03 definitions
- `.planning/phases/02-assessment-ai-engine/02-CONTEXT.md` -- business-first framing

### Secondary (MEDIUM confidence)
- N/A -- no external libraries or APIs needed

### Tertiary (LOW confidence)
- N/A

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all components already installed, zero new dependencies
- Architecture: HIGH - follows exact patterns established in Phases 1-3
- Pitfalls: HIGH - common UI catalog pitfalls, well-understood domain

**Research date:** 2026-03-06
**Valid until:** Indefinite -- static catalog page with no external dependencies
