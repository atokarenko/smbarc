"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  ShieldAlert,
  Map,
  BarChart3,
  Target,
  Users,
  Shield,
  DollarSign,
  Scale,
} from "lucide-react";
import type { AssessmentResults } from "@/lib/demo-data";

function getMaturityLevel(score: number): string {
  if (score >= 80) return "leader";
  if (score >= 60) return "advanced";
  if (score >= 40) return "intermediate";
  if (score >= 20) return "developing";
  return "beginner";
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 60) return "text-blue-600 dark:text-blue-400";
  if (score >= 40) return "text-amber-600 dark:text-amber-400";
  if (score >= 20) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

const DIMENSION_ICONS = {
  strategy: Target,
  adoption: Users,
  riskManagement: Shield,
  roiTracking: DollarSign,
  governance: Scale,
} as const;

interface DashboardContentProps {
  assessmentResults: AssessmentResults | null;
  companyName: string | null;
}

export function DashboardContent({
  assessmentResults,
  companyName,
}: DashboardContentProps) {
  const t = useTranslations();

  if (!assessmentResults) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BarChart3 className="mb-4 h-12 w-12 text-muted-foreground/50" />
        <h2 className="text-lg font-semibold">{t("dashboard.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("dashboard.noData")}
        </p>
      </div>
    );
  }

  const { maturityScore, automationRoadmap, riskMap, roiForecast } = assessmentResults;
  const level = getMaturityLevel(maturityScore.overall);
  const scoreColor = getScoreColor(maturityScore.overall);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("dashboard.title")}
        </h1>
        {companyName && (
          <p className="text-sm text-muted-foreground">{companyName}</p>
        )}
      </div>

      {/* Overall Maturity Score */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("dashboard.maturityScore")}</CardTitle>
          <CardDescription>{t("dashboard.maturityDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-3">
            <span className={`text-5xl font-bold tabular-nums ${scoreColor}`}>
              {maturityScore.overall}
            </span>
            <span className="text-lg text-muted-foreground">/100</span>
            <span className={`ml-2 rounded-md px-2.5 py-0.5 text-sm font-medium ${scoreColor} bg-current/10`}>
              {t(`dashboard.levels.${level}`)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Dimension Scores */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(Object.entries(maturityScore.dimensions) as [keyof typeof DIMENSION_ICONS, number][]).map(
          ([key, value]) => {
            const Icon = DIMENSION_ICONS[key];
            const dimColor = getScoreColor(value);
            return (
              <Card key={key}>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t(`dashboard.dimensions.${key}`)}
                    </span>
                  </div>
                  <div className={`mt-2 text-2xl font-bold tabular-nums ${dimColor}`}>
                    {value}
                    <span className="text-sm font-normal text-muted-foreground">/100</span>
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2">
              <Map className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t("dashboard.roadmapItems")}
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold tabular-nums">
              {automationRoadmap.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t("dashboard.risks")}
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold tabular-nums">
              {riskMap.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t("dashboard.projectedRoi")}
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              ${(roiForecast.totalSavings / 1000).toFixed(0)}K
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {roiForecast.timeframe}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
