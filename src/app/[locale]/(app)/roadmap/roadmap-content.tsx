"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import type { RoadmapItem } from "@/lib/assessment/types";
import { getRoleConfig } from "@/components/dashboard/role-filter";
import { PriorityBadge } from "@/components/dashboard/priority-badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoadmapContentProps {
  items: RoadmapItem[];
  role: string;
}

function parseTimelineMonths(timeline: string): number {
  // Parse strings like "2-3 months", "6-9 months", "9-12 months"
  const match = timeline.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };

function sortItems(items: RoadmapItem[], role: string): RoadmapItem[] {
  const config = getRoleConfig(role);
  const sorted = [...items];

  switch (config.roadmapSort) {
    case "timeline":
      sorted.sort(
        (a, b) => parseTimelineMonths(a.timeline) - parseTimelineMonths(b.timeline)
      );
      break;
    case "impact":
    case "technical":
    default:
      sorted.sort(
        (a, b) =>
          (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2)
      );
      break;
  }

  return sorted;
}

export function RoadmapContent({ items, role }: RoadmapContentProps) {
  const t = useTranslations("roadmap");

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

  const sorted = sortItems(items, role);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <div className="grid gap-4">
        {sorted.map((item, index) => (
          <Card
            key={index}
            className={
              item.priority === "high"
                ? "border-l-4 border-l-destructive"
                : item.priority === "medium"
                  ? "border-l-4 border-l-amber-400"
                  : ""
            }
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <PriorityBadge level={item.priority} />
                <Badge variant="outline" className="text-xs">
                  {item.timeline}
                </Badge>
              </div>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("impact")}
                </p>
                <p className="text-sm">{item.expectedImpact}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
