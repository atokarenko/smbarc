import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type {
  AssessmentResults,
  RoadmapItem,
  RiskItem,
} from "@/lib/assessment/types";

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

function formatCurrency(value: number): string {
  return "$" + value.toLocaleString("en-US");
}

function sortByPriority<T extends { priority?: string; level?: string }>(
  items: T[],
  key: "priority" | "level"
): T[] {
  return [...items].sort(
    (a, b) =>
      (PRIORITY_ORDER[a[key] ?? "low"] ?? 2) -
      (PRIORITY_ORDER[b[key] ?? "low"] ?? 2)
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.4,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 12,
  },
  companyName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  date: {
    fontSize: 9,
    color: "#999999",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    marginTop: 20,
    color: "#333333",
  },
  text: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  scoreBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 10,
  },
  overallScore: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    color: "#333333",
  },
  scoreLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  dimensionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dimensionName: {
    fontSize: 11,
    color: "#333333",
  },
  dimensionScore: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#333333",
  },
  // Table styles
  table: {
    marginTop: 6,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#666666",
    textTransform: "uppercase",
  },
  tableCell: {
    fontSize: 10,
    color: "#333333",
  },
  tableCellBold: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#333333",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#333333",
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    fontSize: 8,
    color: "#999999",
    textAlign: "center",
  },
});

// Column width configs for tables
const ROADMAP_COLS = { name: "25%", priority: "12%", timeline: "15%", impact: "48%" } as const;
const RISK_COLS = { category: "18%", level: "12%", description: "40%", mitigation: "30%" } as const;
const ROI_COLS = { area: "25%", currentCost: "20%", saving: "20%", confidence: "15%", pct: "20%" } as const;

interface AssessmentReportProps {
  data: AssessmentResults;
  companyName: string;
}

export function AssessmentReport({ data, companyName }: AssessmentReportProps) {
  const { maturityScore, automationRoadmap, riskMap, roiForecast } = data;
  const sortedRoadmap = sortByPriority(automationRoadmap, "priority");
  const sortedRisks = sortByPriority(riskMap, "level");

  const dimensionLabels: Record<string, string> = {
    operations: "Operations",
    sales: "Sales",
    finance: "Finance",
    team: "Team",
    risks: "Risks",
  };

  function getHealthLevel(score: number): string {
    if (score >= 80) return "Optimized";
    if (score >= 60) return "Efficient";
    if (score >= 40) return "Stable";
    if (score >= 20) return "Struggling";
    return "Critical";
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.reportTitle}>Business Health Report</Text>
          <Text style={styles.date}>
            Generated on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </Text>
        </View>

        {/* Business Health Score */}
        <Text style={styles.sectionTitle}>Business Health Score</Text>
        <View style={styles.scoreBox}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={styles.overallScore}>{maturityScore.overall}</Text>
            <Text style={{ fontSize: 16, color: "#999999", marginLeft: 4 }}>/100</Text>
            <Text style={{ fontSize: 12, color: "#666666", marginLeft: 12 }}>
              {getHealthLevel(maturityScore.overall)}
            </Text>
          </View>
        </View>

        {/* Dimension Breakdown */}
        <View style={{ marginBottom: 10 }}>
          {(Object.entries(maturityScore.dimensions) as [string, number][]).map(
            ([key, value]) => (
              <View style={styles.dimensionRow} key={key}>
                <Text style={styles.dimensionName}>
                  {dimensionLabels[key] ?? key}
                </Text>
                <Text style={styles.dimensionScore}>{value}/100</Text>
              </View>
            )
          )}
        </View>

        {/* Automation Roadmap */}
        <Text style={styles.sectionTitle}>Automation Roadmap</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: ROADMAP_COLS.name }]}>Name</Text>
            <Text style={[styles.tableHeaderCell, { width: ROADMAP_COLS.priority }]}>Priority</Text>
            <Text style={[styles.tableHeaderCell, { width: ROADMAP_COLS.timeline }]}>Timeline</Text>
            <Text style={[styles.tableHeaderCell, { width: ROADMAP_COLS.impact }]}>Expected Impact</Text>
          </View>
          {sortedRoadmap.map((item: RoadmapItem, i: number) => (
            <View style={styles.tableRow} key={i}>
              <Text style={[item.priority === "high" ? styles.tableCellBold : styles.tableCell, { width: ROADMAP_COLS.name }]}>
                {item.name}
              </Text>
              <Text style={[item.priority === "high" ? styles.tableCellBold : styles.tableCell, { width: ROADMAP_COLS.priority }]}>
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
              </Text>
              <Text style={[styles.tableCell, { width: ROADMAP_COLS.timeline }]}>{item.timeline}</Text>
              <Text style={[styles.tableCell, { width: ROADMAP_COLS.impact }]}>{item.expectedImpact}</Text>
            </View>
          ))}
        </View>

        {/* Risk Map */}
        <Text style={styles.sectionTitle}>Risk Map</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: RISK_COLS.category }]}>Category</Text>
            <Text style={[styles.tableHeaderCell, { width: RISK_COLS.level }]}>Severity</Text>
            <Text style={[styles.tableHeaderCell, { width: RISK_COLS.description }]}>Description</Text>
            <Text style={[styles.tableHeaderCell, { width: RISK_COLS.mitigation }]}>Mitigation</Text>
          </View>
          {sortedRisks.map((item: RiskItem, i: number) => (
            <View style={styles.tableRow} key={i}>
              <Text style={[item.level === "high" ? styles.tableCellBold : styles.tableCell, { width: RISK_COLS.category }]}>
                {item.category}
              </Text>
              <Text style={[item.level === "high" ? styles.tableCellBold : styles.tableCell, { width: RISK_COLS.level }]}>
                {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
              </Text>
              <Text style={[styles.tableCell, { width: RISK_COLS.description }]}>{item.description}</Text>
              <Text style={[styles.tableCell, { width: RISK_COLS.mitigation }]}>{item.mitigation}</Text>
            </View>
          ))}
        </View>

        {/* ROI Forecast */}
        <Text style={styles.sectionTitle}>ROI Forecast</Text>
        <View style={styles.scoreBox}>
          <Text style={{ fontSize: 12, fontFamily: "Helvetica-Bold", color: "#333333" }}>
            Total Projected Savings: {formatCurrency(roiForecast.totalSavings)}
          </Text>
          <Text style={{ fontSize: 10, color: "#666666", marginTop: 2 }}>
            Timeframe: {roiForecast.timeframe}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: ROI_COLS.area }]}>Area</Text>
            <Text style={[styles.tableHeaderCell, { width: ROI_COLS.currentCost }]}>Current Cost</Text>
            <Text style={[styles.tableHeaderCell, { width: ROI_COLS.saving }]}>Projected Saving</Text>
            <Text style={[styles.tableHeaderCell, { width: ROI_COLS.confidence }]}>Confidence</Text>
            <Text style={[styles.tableHeaderCell, { width: ROI_COLS.pct }]}>Saving %</Text>
          </View>
          {roiForecast.items.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={[styles.tableCell, { width: ROI_COLS.area }]}>{item.area}</Text>
              <Text style={[styles.tableCell, { width: ROI_COLS.currentCost }]}>
                {formatCurrency(item.currentCost)}
              </Text>
              <Text style={[styles.tableCell, { width: ROI_COLS.saving }]}>
                {formatCurrency(item.projectedSaving)}
              </Text>
              <Text style={[styles.tableCell, { width: ROI_COLS.confidence }]}>
                {item.confidence.charAt(0).toUpperCase() + item.confidence.slice(1)}
              </Text>
              <Text style={[styles.tableCell, { width: ROI_COLS.pct }]}>
                {item.currentCost > 0
                  ? ((item.projectedSaving / item.currentCost) * 100).toFixed(1) + "%"
                  : "N/A"}
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={[styles.tableCellBold, { width: ROI_COLS.area }]}>Total</Text>
            <Text style={[styles.tableCellBold, { width: ROI_COLS.currentCost }]}>
              {formatCurrency(roiForecast.items.reduce((s, i) => s + i.currentCost, 0))}
            </Text>
            <Text style={[styles.tableCellBold, { width: ROI_COLS.saving }]}>
              {formatCurrency(roiForecast.totalSavings)}
            </Text>
            <Text style={[styles.tableCell, { width: ROI_COLS.confidence }]} />
            <Text style={[styles.tableCell, { width: ROI_COLS.pct }]} />
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by AI Architect | {companyName} | {new Date().toLocaleDateString("en-US")}
        </Text>
      </Page>
    </Document>
  );
}
