"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  UserSearch,
  UserPlus,
  BarChart3,
  Receipt,
  TrendingUp,
  CreditCard,
  FileSearch,
  Shield,
  LayoutDashboard,
  AlertTriangle,
  UserMinus,
  type LucideIcon,
} from "lucide-react";
import type { AssessmentResults } from "@/lib/demo-data";
import {
  CATALOG_MODULES,
  MODULE_CATEGORIES,
} from "@/lib/modules/catalog-data";
import { getRecommendedModules } from "@/lib/modules/recommendation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, LucideIcon> = {
  UserSearch,
  UserPlus,
  BarChart3,
  Receipt,
  TrendingUp,
  CreditCard,
  FileSearch,
  Shield,
  LayoutDashboard,
  AlertTriangle,
  UserMinus,
};

function ModuleIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className="size-5" />;
}

const impactColors: Record<string, string> = {
  high: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  medium:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

interface ModulesContentProps {
  assessmentResults: AssessmentResults | null;
}

export function ModulesContent({ assessmentResults }: ModulesContentProps) {
  const t = useTranslations("modules");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const dimensions = assessmentResults?.maturityScore?.dimensions ?? null;
  const modulesWithRelevance = getRecommendedModules(CATALOG_MODULES, dimensions);

  const filtered = selectedCategory
    ? modulesWithRelevance.filter((m) => m.category === selectedCategory)
    : modulesWithRelevance;

  // Sort alphabetically by id when no assessment data
  const sorted = dimensions
    ? filtered
    : [...filtered].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      {!dimensions && (
        <div className="rounded-lg border border-dashed p-4 text-center">
          <p className="text-muted-foreground mb-2">{t("noAssessment")}</p>
          <Button asChild variant="default" size="sm">
            <Link href="/scan">{t("noAssessmentCta")}</Link>
          </Button>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("allCategories")}
        </button>
        {MODULE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Module cards grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((mod) => (
          <Card key={mod.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                  <ModuleIcon name={mod.icon} />
                </div>
                <Badge variant="outline" className="text-xs">
                  {t(`categories.${mod.category}`)}
                </Badge>
              </div>
              <CardTitle className="text-base">
                {t(`items.${mod.id}.name`)}
              </CardTitle>
              <CardDescription className="text-sm">
                {t(`items.${mod.id}.description`)}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-3">
              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {t("impact")}
                </p>
                <p className="text-sm">{t(`items.${mod.id}.impact`)}</p>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-0">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${impactColors[mod.impactLevel]}`}
                >
                  {t(`impactLevels.${mod.impactLevel}`)}
                </Badge>
                {dimensions && mod.relevance > 70 && (
                  <Badge variant="default" className="text-xs">
                    {t("recommended")}
                  </Badge>
                )}
                {dimensions && mod.relevance > 0 && mod.relevance <= 70 && (
                  <Badge variant="secondary" className="text-xs">
                    {t("relevance", { score: mod.relevance })}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {t("comingSoon")}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
