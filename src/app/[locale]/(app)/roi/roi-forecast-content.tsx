"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import type { ROIForecast } from "@/lib/assessment/types";
import { getRoleConfig } from "@/components/dashboard/role-filter";
import { PriorityBadge } from "@/components/dashboard/priority-badge";
import { RoiBarChart } from "@/components/dashboard/roi-bar-chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RoiForecastContentProps {
  forecast: ROIForecast | null;
  role: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

const confidenceOrder: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function RoiForecastContent({
  forecast,
  role,
}: RoiForecastContentProps) {
  const t = useTranslations("roi");

  if (!forecast) {
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

  const config = getRoleConfig(role);

  // Sort items based on role
  const sortedItems = [...forecast.items];
  if (config.roiView === "technical") {
    // CTO: sort by highest confidence first
    sortedItems.sort(
      (a, b) =>
        (confidenceOrder[a.confidence] ?? 2) -
        (confidenceOrder[b.confidence] ?? 2)
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {t("totalSavings")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(forecast.totalSavings)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {t("timeframe")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{forecast.timeframe}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {t("areasAnalyzed", { count: forecast.items.length })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{forecast.items.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar chart */}
      <Card>
        <CardContent className="pt-6">
          <RoiBarChart items={sortedItems} />
        </CardContent>
      </Card>

      {/* Detailed table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("area")}</TableHead>
                <TableHead className="text-right">
                  {t("currentCost")}
                </TableHead>
                <TableHead className="text-right">
                  {t("projectedSaving")}
                </TableHead>
                <TableHead className="text-right">
                  {t("savingPercent")}
                </TableHead>
                <TableHead>{t("confidence")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedItems.map((item, index) => {
                const savingPct =
                  item.currentCost > 0
                    ? ((item.projectedSaving / item.currentCost) * 100).toFixed(
                        0
                      )
                    : "N/A";
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.area}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.currentCost)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-primary">
                      {formatCurrency(item.projectedSaving)}
                    </TableCell>
                    <TableCell className="text-right">
                      {savingPct === "N/A" ? savingPct : `${savingPct}%`}
                    </TableCell>
                    <TableCell>
                      <PriorityBadge level={item.confidence} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
