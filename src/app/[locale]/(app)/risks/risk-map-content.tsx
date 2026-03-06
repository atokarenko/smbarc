"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import type { RiskItem } from "@/lib/assessment/types";
import { getRoleConfig } from "@/components/dashboard/role-filter";
import { PriorityBadge } from "@/components/dashboard/priority-badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskMapContentProps {
  items: RiskItem[];
  role: string;
}

const severityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };

function groupAndSortRisks(
  items: RiskItem[],
  role: string
): { category: string; risks: RiskItem[] }[] {
  const config = getRoleConfig(role);
  const focusCategories = config.riskFocus.map((c) => c.toLowerCase());

  // Group by category
  const groups = new Map<string, RiskItem[]>();
  for (const item of items) {
    const existing = groups.get(item.category) ?? [];
    existing.push(item);
    groups.set(item.category, existing);
  }

  // Sort within each group by severity
  for (const risks of groups.values()) {
    risks.sort(
      (a, b) =>
        (severityOrder[a.level] ?? 2) - (severityOrder[b.level] ?? 2)
    );
  }

  // Sort groups: focused categories first, then by highest severity
  const groupArray = Array.from(groups.entries()).map(([category, risks]) => ({
    category,
    risks,
    isFocused: focusCategories.some((fc) =>
      category.toLowerCase().includes(fc)
    ),
    maxSeverity: Math.min(
      ...risks.map((r) => severityOrder[r.level] ?? 2)
    ),
  }));

  groupArray.sort((a, b) => {
    if (a.isFocused !== b.isFocused) return a.isFocused ? -1 : 1;
    return a.maxSeverity - b.maxSeverity;
  });

  return groupArray.map(({ category, risks }) => ({ category, risks }));
}

const borderColorMap: Record<string, string> = {
  high: "border-l-4 border-l-destructive",
  medium: "border-l-4 border-l-amber-400",
  low: "",
};

export function RiskMapContent({ items, role }: RiskMapContentProps) {
  const t = useTranslations("risks");

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground mb-4">{t("noData")}</p>
        <Link
          href="/scan"
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {t("startAssessment")}
        </Link>
      </div>
    );
  }

  const grouped = groupAndSortRisks(items, role);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      {grouped.map((group) => (
        <div key={group.category} className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Badge variant="outline">{group.category}</Badge>
          </h2>
          <div className="grid gap-3">
            {group.risks.map((risk, index) => (
              <Card
                key={index}
                className={borderColorMap[risk.level] ?? ""}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PriorityBadge level={risk.level} />
                  </div>
                  <CardTitle className="text-base">
                    {risk.description}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-muted/50 p-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("mitigation")}
                    </p>
                    <p className="text-sm">{risk.mitigation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
