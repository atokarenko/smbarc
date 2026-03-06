# Phase 03: Dashboard & Reporting - Research

**Researched:** 2026-03-06
**Domain:** Data visualization, charting, PDF generation, role-based views in Next.js 15
**Confidence:** HIGH

## Summary

Phase 03 transforms the existing stub dashboard (which currently shows only summary cards with hardcoded demo data) into a comprehensive multi-view reporting system. The existing `dashboard-content.tsx` already renders the Business Health Score, dimension scores, and summary count cards -- this provides a solid foundation to extend. Three additional pages (roadmap, risks, roi) exist as placeholder stubs and need full implementations.

The key technical challenges are: (1) integrating Recharts for charts via shadcn/ui's built-in chart components, (2) implementing role-adapted content filtering without over-engineering (the `user.role` field already exists in the DB and session), (3) PDF export of the full report using `@react-pdf/renderer`, and (4) bilingual i18n for all new dashboard text.

**Primary recommendation:** Use shadcn/ui's chart component (which wraps Recharts) for all charts, `@react-pdf/renderer` for PDF generation as a client-side download, and a simple role-filter utility that shapes which data sections are visible/emphasized per role.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DASH-01 | Overview dashboard with Business Health Score, key metrics, summary cards | Existing `dashboard-content.tsx` has the score + dimension cards. Needs enhancement with radar chart for dimensions, better summary metrics. Data loading pattern already in `page.tsx`. |
| DASH-02 | Automation Roadmap as visual timeline/priority list | New content for `/roadmap` page. Priority-grouped list with timeline indicators. RoadmapItem type has priority, timeline, expectedImpact fields. Sortable/filterable cards. |
| DASH-03 | Risk Map with risk categories and severity levels | New content for `/risks` page. RiskItem type has category, level, description, mitigation. Color-coded severity, grouped by category. |
| DASH-04 | ROI Forecast with charts showing savings projections | New content for `/roi` page. ROIForecast has items with currentCost, projectedSaving, confidence. Bar chart comparing current vs projected per area. |
| DASH-05 | Dashboard adapts to user role (CEO=strategic, COO=operational, CTO=technical) | User.role already stored as "ceo"/"coo"/"cto". Role passed from session to components. Filter/reorder content sections based on role. |
| DASH-06 | Export full assessment report as PDF | Use `@react-pdf/renderer` v4+ for React 19 compatibility. Client-side PDF generation with download button. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| recharts | ^3.7.0 | Charting engine | shadcn/ui chart components use Recharts under the hood; v3 is latest stable |
| @react-pdf/renderer | ^4.1.0 | PDF generation | React-first approach, React 19 compatible since v4.1.0, builds PDFs from React components |

### Supporting (already installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui (chart) | via CLI | Chart wrapper components (ChartContainer, ChartTooltip, ChartLegend) | All chart rendering -- provides consistent theming |
| shadcn/ui (tabs) | via CLI | Tab navigation within pages | Role-view switching, section tabs on dashboard |
| shadcn/ui (badge) | via CLI | Status indicators | Priority badges, risk level badges |
| lucide-react | ^0.577.0 | Icons | Already used throughout, continue for dashboard icons |
| next-intl | ^4.8.3 | i18n | All new dashboard strings need en/ru translations |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| recharts | chart.js + react-chartjs-2 | Recharts is the shadcn/ui blessed choice; chart.js would require custom styling |
| @react-pdf/renderer | jspdf + html2canvas | html2canvas captures DOM as image (blurry, poor text); @react-pdf/renderer creates proper vector PDFs |
| @react-pdf/renderer | Server-side puppeteer | Requires headless browser on server; overkill for POC, adds infrastructure complexity |

**Installation:**
```bash
npm install recharts @react-pdf/renderer
npx shadcn@latest add chart tabs badge table
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  app/[locale]/(app)/
    dashboard/
      page.tsx                    # Server: load assessment + user role
      dashboard-content.tsx       # Client: overview with charts (EXTEND existing)
    roadmap/
      page.tsx                    # Server: load assessment data
      roadmap-content.tsx         # Client: roadmap visualization
    risks/
      page.tsx                    # Server: load assessment data
      risk-map-content.tsx        # Client: risk visualization
    roi/
      page.tsx                    # Server: load assessment data
      roi-forecast-content.tsx    # Client: ROI charts
  components/
    dashboard/
      health-radar-chart.tsx      # Radar chart for 5 dimensions
      roi-bar-chart.tsx           # Bar chart for ROI comparison
      priority-badge.tsx          # Reusable priority/severity badge
      pdf-export-button.tsx       # PDF download trigger
      pdf-report.tsx              # @react-pdf/renderer document definition
    dashboard/role-filter.ts      # Utility: filter/adapt content by role
  lib/
    assessment/types.ts           # Existing -- already has all needed types
    demo-data.ts                  # Existing -- provides test data
```

### Pattern 1: Server Data Loading + Client Rendering (established pattern)
**What:** Server component loads data via Prisma, passes to client component for interactivity
**When to use:** Every dashboard page
**Example:**
```typescript
// page.tsx (server)
export default async function RoadmapPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await auth.api.getSession({ headers: await headers() });

  // Load user's own assessment OR demo company
  const assessment = await loadAssessmentResults(session?.user?.id);
  const role = (session?.user as { role?: string })?.role || "ceo";

  return <RoadmapContent items={assessment?.automationRoadmap ?? []} role={role} />;
}
```

### Pattern 2: Role-Adapted Views (filtering, not branching)
**What:** Same components, different emphasis/ordering based on role. NOT separate page trees.
**When to use:** DASH-05
**Example:**
```typescript
// role-filter.ts
type Role = "ceo" | "coo" | "cto";

interface RoleConfig {
  dashboardSections: string[];  // ordered sections to show
  roadmapSort: "impact" | "timeline" | "technical";
  riskFocus: string[];          // which risk categories to highlight first
  roiView: "summary" | "detailed" | "technical";
}

const ROLE_CONFIGS: Record<Role, RoleConfig> = {
  ceo: {
    dashboardSections: ["healthScore", "roiSummary", "topRisks", "roadmapHighlights"],
    roadmapSort: "impact",
    riskFocus: ["financial", "reputational", "strategic"],
    roiView: "summary",
  },
  coo: {
    dashboardSections: ["healthScore", "roadmapHighlights", "operationalRisks", "roiDetailed"],
    roadmapSort: "timeline",
    riskFocus: ["operational", "process", "team"],
    roiView: "detailed",
  },
  cto: {
    dashboardSections: ["healthScore", "technicalRoadmap", "dataRisks", "roiTechnical"],
    roadmapSort: "technical",
    riskFocus: ["data", "security", "integration"],
    roiView: "technical",
  },
};
```

### Pattern 3: PDF Generation (client-side with @react-pdf/renderer)
**What:** Build PDF document from React components, trigger download on button click
**When to use:** DASH-06
**Example:**
```typescript
// pdf-report.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  // ... more styles
});

export function AssessmentReport({ data, companyName, locale }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{companyName} - Business Health Report</Text>
        {/* Score section, roadmap table, risk list, ROI table */}
      </Page>
    </Document>
  );
}

// pdf-export-button.tsx (client component)
"use client";
import dynamic from "next/dynamic";
// MUST use dynamic import with ssr: false for @react-pdf/renderer in Next.js
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);
```

### Pattern 4: shadcn/ui Chart Usage
**What:** Use ChartContainer + Recharts components for themed, accessible charts
**When to use:** All charts (radar, bar, area)
**Example:**
```typescript
"use client";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  score: { label: "Score", color: "hsl(var(--chart-1))" },
};

export function HealthRadarChart({ dimensions }) {
  const data = Object.entries(dimensions).map(([key, value]) => ({
    dimension: key,
    score: value,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="dimension" />
        <Radar dataKey="score" fill="var(--color-score)" fillOpacity={0.5} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </RadarChart>
    </ChartContainer>
  );
}
```

### Anti-Patterns to Avoid
- **Separate component trees per role:** Do NOT build `CeoDashboard`, `CooDashboard`, `CtoDashboard` -- use the same components with role-based configuration (filtering, sorting, emphasis)
- **PDF via DOM screenshot:** Do NOT use html2canvas to screenshot the page -- it produces blurry raster PDFs; use @react-pdf/renderer for proper vector output
- **Massive client bundles:** Do NOT import @react-pdf/renderer at top level -- always use `dynamic()` with `ssr: false` to keep initial bundle small
- **Hardcoded chart colors:** Use CSS variables via `hsl(var(--chart-N))` for theme compatibility (dark mode, custom themes)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Charts | Custom SVG rendering | Recharts via shadcn/ui chart | Handles axes, tooltips, responsiveness, animations, accessibility |
| PDF generation | String concatenation or HTML-to-PDF | @react-pdf/renderer | Proper fonts, layouts, pagination, vector graphics |
| Priority/severity badges | Custom colored spans | shadcn/ui Badge with variant | Consistent styling, accessibility, dark mode support |
| Data tables | Custom table markup | shadcn/ui Table component | Proper accessibility, responsive, consistent styling |
| Tab navigation | Custom state management | shadcn/ui Tabs | Keyboard navigation, ARIA attributes, controlled/uncontrolled modes |

**Key insight:** Every visual element in the dashboard has a shadcn/ui component or Recharts equivalent. Building custom alternatives wastes time and produces inconsistent, inaccessible UI.

## Common Pitfalls

### Pitfall 1: @react-pdf/renderer SSR Crash
**What goes wrong:** Importing @react-pdf/renderer in a server component or at module level crashes Next.js (it uses browser APIs)
**Why it happens:** The library uses `document` and `window` internally
**How to avoid:** Always use `dynamic(() => import(...), { ssr: false })` for PDFDownloadLink and PDFViewer. Keep PDF document definition in its own file.
**Warning signs:** "document is not defined" or "window is not defined" errors during build

### Pitfall 2: Recharts v3 + React 19 Dependency Warning
**What goes wrong:** `react-is` peer dependency may show warnings
**Why it happens:** Recharts v3 may still reference older react-is
**How to avoid:** Use `--legacy-peer-deps` if needed, or add overrides in package.json. Verify charts render correctly after install.
**Warning signs:** npm peer dependency warnings during install

### Pitfall 3: Assessment Data May Not Exist
**What goes wrong:** Dashboard crashes when user has no completed assessment
**Why it happens:** User navigates to dashboard before completing assessment
**How to avoid:** The existing pattern already handles this (null check in dashboard-content.tsx). Replicate this pattern for all sub-pages. Show "complete an assessment first" guidance with link to /scan.
**Warning signs:** Runtime null/undefined errors on property access

### Pitfall 4: Role Value Missing from Session
**What goes wrong:** Role defaults to "ceo" for all users, role-adapted views don't work
**Why it happens:** Session user object may not include role field without explicit selection
**How to avoid:** The existing code already handles this with `(session?.user as { role?: string })?.role || "ceo"`. Use same pattern. Role is set during demo user creation and in settings page.
**Warning signs:** All users see the same view regardless of role setting

### Pitfall 5: i18n Keys Missing for New Content
**What goes wrong:** Untranslated strings appear as key paths like "dashboard.roadmap.title"
**Why it happens:** Adding new UI sections without updating both en.json and ru.json
**How to avoid:** Add all new i18n keys to both locale files in the same task that creates the UI. Established pattern: all dashboard keys under "dashboard" namespace.
**Warning signs:** Raw translation keys visible in UI

### Pitfall 6: Chart Hydration Mismatch
**What goes wrong:** Charts flicker or throw hydration errors
**Why it happens:** Recharts renders differently on server vs client
**How to avoid:** All chart components MUST be client components ("use client"). The server page loads data, client component renders charts. This is already the established pattern.
**Warning signs:** React hydration warnings in console

## Code Examples

### Loading Assessment Data (established pattern to replicate)
```typescript
// Reusable data loader for all dashboard pages
// Source: existing pattern from src/app/[locale]/(app)/dashboard/page.tsx
async function loadAssessmentData(userId?: string) {
  if (!userId) return null;

  // Try user's own completed assessment first
  const assessment = await prisma.assessment.findFirst({
    where: { userId, status: "COMPLETE" },
    orderBy: { updatedAt: "desc" },
  });

  if (assessment?.results) {
    return JSON.parse(assessment.results) as AssessmentResults;
  }

  // Fall back to demo company
  const demoCompany = await prisma.company.findFirst({
    where: { isDemo: true },
  });

  if (demoCompany?.assessmentResults) {
    return JSON.parse(demoCompany.assessmentResults) as AssessmentResults;
  }

  return null;
}
```

### ROI Bar Chart
```typescript
"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ROIItem } from "@/lib/assessment/types";

const chartConfig = {
  currentCost: { label: "Current Cost", color: "hsl(var(--chart-1))" },
  projectedSaving: { label: "Projected Saving", color: "hsl(var(--chart-2))" },
};

export function RoiBarChart({ items }: { items: ROIItem[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <BarChart data={items} layout="vertical">
        <CartesianGrid horizontal={false} />
        <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
        <YAxis type="category" dataKey="area" width={120} />
        <Bar dataKey="currentCost" fill="var(--color-currentCost)" radius={4} />
        <Bar dataKey="projectedSaving" fill="var(--color-projectedSaving)" radius={4} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}
```

### PDF Dynamic Import Pattern
```typescript
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { AssessmentResults } from "@/lib/assessment/types";

// Dynamic import prevents SSR crash
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <Button disabled><Download className="mr-2 h-4 w-4" />Loading...</Button> }
);

export function PdfExportButton({ data, companyName }: { data: AssessmentResults; companyName: string }) {
  // Lazy import the report document too
  const [ReportDoc, setReportDoc] = useState<React.ComponentType<any> | null>(null);

  // Load report component on first render
  // ...

  return (
    <PDFDownloadLink
      document={<AssessmentReport data={data} companyName={companyName} />}
      fileName={`${companyName}-health-report.pdf`}
    >
      {({ loading }) => (
        <Button variant="outline" disabled={loading}>
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Generating..." : "Export PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Recharts v2 | Recharts v3 (latest) | 2024-2025 | Better tree-shaking, React 19 support, improved types |
| Custom chart wrappers | shadcn/ui Chart component | 2024 | Built-in theming, accessibility, consistent styling |
| html2canvas + jsPDF | @react-pdf/renderer v4 | 2024-2025 | React 19 support, proper vector PDFs, React component model |
| Separate role dashboards | Role-config filtering | Standard pattern | Avoids code duplication, easier to maintain |

**Deprecated/outdated:**
- Recharts v2: Still functional but v3 is current. shadcn/ui is transitioning to v3 support.
- html2canvas-based PDF: Produces raster images, not searchable/accessible PDFs

## Open Questions

1. **Chart rendering on mobile**
   - What we know: Recharts is responsive via ResponsiveContainer, shadcn ChartContainer handles this
   - What's unclear: Exact mobile breakpoints for chart readability
   - Recommendation: Test with demo data at 375px width; radar chart may need to switch to a simpler list view on very small screens

2. **PDF bilingual support**
   - What we know: @react-pdf/renderer supports custom fonts including Cyrillic
   - What's unclear: Whether default fonts handle Russian text well
   - Recommendation: Start with default fonts, add custom font (Inter or similar) only if Russian characters render poorly. Register fonts via `Font.register()`.

3. **Assessment data loading for real vs demo users**
   - What we know: Current dashboard loads first demo company. Real assessments store results in Assessment.results JSON field.
   - What's unclear: Whether the current data loading should try user's own assessment first, then fall back to demo
   - Recommendation: Load user's completed assessment first (`status: "COMPLETE"`), fall back to demo company if none exists. Refactor into shared utility.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest + jsdom |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DASH-01 | Dashboard renders health score + dimensions + summary cards | unit | `npx vitest run src/__tests__/dashboard-content.test.tsx -x` | No -- Wave 0 |
| DASH-02 | Roadmap renders items sorted by priority with badges | unit | `npx vitest run src/__tests__/roadmap-content.test.tsx -x` | No -- Wave 0 |
| DASH-03 | Risk map renders items with severity color coding | unit | `npx vitest run src/__tests__/risk-map-content.test.tsx -x` | No -- Wave 0 |
| DASH-04 | ROI chart renders with correct data mapping | unit | `npx vitest run src/__tests__/roi-forecast.test.tsx -x` | No -- Wave 0 |
| DASH-05 | Role config returns correct section ordering | unit | `npx vitest run src/__tests__/role-filter.test.ts -x` | No -- Wave 0 |
| DASH-06 | PDF export button renders, document builds without crash | unit | `npx vitest run src/__tests__/pdf-export.test.tsx -x` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/dashboard-content.test.tsx` -- covers DASH-01 (enhanced dashboard rendering)
- [ ] `src/__tests__/roadmap-content.test.tsx` -- covers DASH-02
- [ ] `src/__tests__/risk-map-content.test.tsx` -- covers DASH-03
- [ ] `src/__tests__/roi-forecast.test.tsx` -- covers DASH-04
- [ ] `src/__tests__/role-filter.test.ts` -- covers DASH-05 (pure logic, easiest to test)
- [ ] `src/__tests__/pdf-export.test.tsx` -- covers DASH-06 (mock @react-pdf/renderer)
- [ ] Framework install: `npm install recharts @react-pdf/renderer` -- neither currently in package.json
- [ ] shadcn components: `npx shadcn@latest add chart tabs badge table` -- chart/tabs/badge/table not yet installed

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/app/[locale]/(app)/dashboard/` -- established patterns for data loading and component structure
- Existing codebase: `src/lib/demo-data.ts` -- type definitions and sample data
- Existing codebase: `prisma/schema.prisma` -- User.role field, Assessment.results JSON storage
- shadcn/ui docs: https://ui.shadcn.com/docs/components/radix/chart -- chart component uses Recharts
- @react-pdf/renderer: https://react-pdf.org/compatibility -- React 19 compatibility confirmed v4.1.0+

### Secondary (MEDIUM confidence)
- npm recharts v3.7.0: https://www.npmjs.com/package/recharts -- latest stable version
- npm @react-pdf/renderer: https://www.npmjs.com/package/@react-pdf/renderer -- latest v4.x
- GitHub recharts React 19 issue: https://github.com/recharts/recharts/issues/4558 -- compatibility discussion

### Tertiary (LOW confidence)
- Recharts v3 + shadcn/ui integration status: shadcn tracking via https://github.com/shadcn-ui/ui/issues/7669 -- may need minor adjustments

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- Recharts is the shadcn blessed choice, @react-pdf/renderer is the dominant React PDF library
- Architecture: HIGH -- follows established patterns already in the codebase (server page + client content)
- Pitfalls: HIGH -- based on direct code inspection and known Next.js SSR constraints
- PDF export: MEDIUM -- @react-pdf/renderer v4 React 19 support confirmed, but Cyrillic font handling untested

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable libraries, 30 days)
