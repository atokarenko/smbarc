"use client";

import { Badge } from "@/components/ui/badge";

const ROLE_STYLES: Record<string, string> = {
  ceo: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  coo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cto: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

interface RoleBadgeProps {
  role: string;
  label?: string;
}

export function RoleBadge({ role, label }: RoleBadgeProps) {
  const normalizedRole = role.toLowerCase();
  const style = ROLE_STYLES[normalizedRole] || "";

  return (
    <Badge variant="outline" className={style}>
      {label || role.toUpperCase()}
    </Badge>
  );
}
