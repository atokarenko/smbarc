"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Factory,
  ShoppingCart,
  Briefcase,
  Monitor,
  Heart,
  UtensilsCrossed,
  HardHat,
  DollarSign,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { IndustryProfile } from "@/lib/knowledge/industries/types";
import type { AutomationCase } from "@/lib/knowledge/automation-cases/types";
import type { ComplianceProfile } from "@/lib/knowledge/compliance/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  retail: ShoppingCart,
  manufacturing: Factory,
  professionalservices: Briefcase,
  technology: Monitor,
  healthcare: Heart,
  foodhospitality: UtensilsCrossed,
  construction: HardHat,
};

const CATEGORY_LABELS: Record<string, string> = {
  operations: "Operations",
  sales: "Sales & Marketing",
  finance: "Finance",
  hr: "HR",
  "customer-service": "Customer Service",
  compliance: "Compliance",
};

const complexityColors: Record<string, string> = {
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const severityColors: Record<string, string> = {
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  important: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  recommended: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

interface KnowledgeContentProps {
  industries: IndustryProfile[];
  automationCases: AutomationCase[];
  compliance: ComplianceProfile;
}

export function KnowledgeContent({
  industries,
  automationCases,
  compliance,
}: KnowledgeContentProps) {
  const t = useTranslations("knowledge");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const searchLower = search.toLowerCase();

  // Filter automation cases
  const categories = [...new Set(automationCases.map((c) => c.category))];
  const filteredCases = automationCases.filter((c) => {
    const matchesSearch =
      !search ||
      c.processName.toLowerCase().includes(searchLower) ||
      c.description.toLowerCase().includes(searchLower) ||
      c.category.toLowerCase().includes(searchLower);
    const matchesCategory = !selectedCategory || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter industries
  const filteredIndustries = industries.filter(
    (ind) =>
      !search ||
      ind.name.toLowerCase().includes(searchLower) ||
      ind.description.toLowerCase().includes(searchLower)
  );

  // Flatten compliance requirements for display
  const allCompliance = [
    ...compliance.general.gdpr.map((r) => ({ ...r, framework: "GDPR" })),
    ...compliance.general.aiAct.map((r) => ({ ...r, framework: "EU AI Act" })),
    ...compliance.general.dataProtection.map((r) => ({
      ...r,
      framework: t("dataProtection"),
    })),
  ];
  const filteredCompliance = allCompliance.filter(
    (r) =>
      !search ||
      r.name.toLowerCase().includes(searchLower) ||
      r.framework.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="industries">
        <TabsList>
          <TabsTrigger value="industries">{t("tabs.industries")}</TabsTrigger>
          <TabsTrigger value="automationCases">{t("tabs.automationCases")}</TabsTrigger>
          <TabsTrigger value="compliance">{t("tabs.compliance")}</TabsTrigger>
        </TabsList>

        {/* Industries Tab */}
        <TabsContent value="industries" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredIndustries.map((ind) => {
              const Icon = INDUSTRY_ICONS[ind.id] ?? Factory;
              return (
                <Card key={ind.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs">
                          {ind.typicalCompanySize}
                        </Badge>
                        <Badge variant="secondary" className="ml-1 text-xs">
                          {ind.avgRevenueRange}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-base">{ind.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {ind.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    {/* Key metrics */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-muted-foreground">{t("industries.profitMargin")}</p>
                        <p className="font-medium">{ind.benchmarks.financial.profitMargin.split(";")[0]}</p>
                      </div>
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-muted-foreground">{t("industries.turnover")}</p>
                        <p className="font-medium">{ind.benchmarks.hr.employeeTurnoverRate.split("—")[0].split(";")[0]}</p>
                      </div>
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-muted-foreground">{t("industries.aiAdoption")}</p>
                        <p className="font-medium">{ind.benchmarks.technology.aiAdoption.split(" ")[0]}</p>
                      </div>
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-muted-foreground">DSO</p>
                        <p className="font-medium">{ind.benchmarks.financial.daysSalesOutstanding} {t("industries.days")}</p>
                      </div>
                    </div>

                    {/* Top pain points */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {t("industries.painPoints")}
                      </p>
                      <ul className="space-y-1">
                        {ind.commonPainPoints.slice(0, 3).map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs">
                            <AlertTriangle className="mt-0.5 size-3 shrink-0 text-amber-500" />
                            <span>{p.split("—")[0].split("(")[0].trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Top opportunities */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {t("industries.opportunities")}
                      </p>
                      <ul className="space-y-1">
                        {ind.topAutomationOpportunities.slice(0, 3).map((o, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs">
                            <TrendingUp className="mt-0.5 size-3 shrink-0 text-green-500" />
                            <span>{o.split("—")[0].trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {filteredIndustries.length === 0 && (
            <p className="text-muted-foreground text-center py-8">{t("noResults")}</p>
          )}
        </TabsContent>

        {/* Automation Cases Tab */}
        <TabsContent value="automationCases" className="mt-6 space-y-4">
          {/* Category filter */}
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((c) => (
              <Card key={c.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {CATEGORY_LABELS[c.category] ?? c.category}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${complexityColors[c.complexity]}`}
                    >
                      {t(`complexity.${c.complexity}`)}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{c.processName}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">
                    {c.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  {/* Key ROI metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-md bg-muted/50 p-2">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="size-3" />
                        {t("cases.cost")}
                      </div>
                      <p className="font-medium">
                        ${c.implementationCost.min.toLocaleString()}-${c.implementationCost.max.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-2">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="size-3" />
                        {t("cases.savings")}
                      </div>
                      <p className="font-medium text-green-600 dark:text-green-400">
                        ${c.expectedSavings.dollarsPerMonth.toLocaleString()}/{t("cases.mo")}
                      </p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-2">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="size-3" />
                        {t("cases.payback")}
                      </div>
                      <p className="font-medium">
                        {c.paybackPeriodMonths} {t("cases.months")}
                      </p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-2">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="size-3" />
                        {t("cases.timeSaved")}
                      </div>
                      <p className="font-medium">
                        {c.expectedSavings.hoursPerWeek} {t("cases.hrsWeek")}
                      </p>
                    </div>
                  </div>

                  {/* Tools */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {t("cases.tools")}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {c.toolsCommonlyUsed.slice(0, 4).map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                      {c.toolsCommonlyUsed.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{c.toolsCommonlyUsed.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Success rate */}
                  <div className="flex items-start gap-1.5 text-xs">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-green-500" />
                    <span className="text-muted-foreground">{c.successRate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredCases.length === 0 && (
            <p className="text-muted-foreground text-center py-8">{t("noResults")}</p>
          )}
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="mt-6 space-y-6">
          {/* General requirements */}
          <div>
            <h2 className="text-lg font-semibold mb-4">{t("compliance.generalTitle")}</h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredCompliance.map((r, i) => (
                <Card key={`${r.framework}-${i}`} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield className="size-4 text-muted-foreground" />
                      <Badge variant="outline" className="text-xs">
                        {r.framework}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${severityColors[r.severity]}`}
                      >
                        {t(`compliance.severity.${r.severity}`)}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{r.name}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm">
                      {r.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="rounded-md bg-muted/50 p-2 text-xs">
                      <p className="text-muted-foreground">{t("compliance.costToComply")}</p>
                      <p className="font-medium">{r.typicalCostToComply}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {t("compliance.keySteps")}
                      </p>
                      <ul className="space-y-1">
                        {r.actionableSteps.slice(0, 3).map((step, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs">
                            <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-green-500" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredCompliance.length === 0 && (
              <p className="text-muted-foreground text-center py-8">{t("noResults")}</p>
            )}
          </div>

          {/* Industry-specific compliance */}
          {!search && (
            <div>
              <h2 className="text-lg font-semibold mb-4">{t("compliance.industryTitle")}</h2>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {Object.entries(compliance.byIndustry).map(([key, ind]) => (
                  <Card key={key}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{ind.industry}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          {t("compliance.keyRegulations")}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {ind.keyRegulations.map((reg) => (
                            <Badge key={reg} variant="outline" className="text-xs">
                              {reg}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          {t("compliance.commonGaps")}
                        </p>
                        <ul className="space-y-1">
                          {ind.commonGaps.slice(0, 3).map((gap, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs">
                              <AlertTriangle className="mt-0.5 size-3 shrink-0 text-amber-500" />
                              <span>{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {ind.certifications.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            {t("compliance.certifications")}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {ind.certifications.map((cert) => (
                              <Badge key={cert} variant="secondary" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* AI Implementation Checklist */}
          {!search && (
            <div>
              <h2 className="text-lg font-semibold mb-4">{t("compliance.checklistTitle")}</h2>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                {(["preImplementation", "duringImplementation", "ongoingMonitoring"] as const).map(
                  (phase) => (
                    <Card key={phase}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">
                          {t(`compliance.phases.${phase}`)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {compliance.aiImplementationChecklist[phase].map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs">
                              <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
