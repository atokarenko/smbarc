"use client";

import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  level: "high" | "medium" | "low";
}

const levelConfig = {
  high: { variant: "destructive" as const, label: "High" },
  medium: { variant: "secondary" as const, label: "Medium" },
  low: { variant: "outline" as const, label: "Low" },
};

export function PriorityBadge({ level }: PriorityBadgeProps) {
  const config = levelConfig[level];
  return (
    <Badge
      variant={config.variant}
      className={
        level === "medium"
          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
          : undefined
      }
    >
      {config.label}
    </Badge>
  );
}
