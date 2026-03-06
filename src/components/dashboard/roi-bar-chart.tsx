"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ROIItem } from "@/lib/assessment/types";

interface RoiBarChartProps {
  items: ROIItem[];
}

const chartConfig = {
  currentCost: {
    label: "Current Cost",
    color: "var(--chart-1)",
  },
  projectedSaving: {
    label: "Projected Saving",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function RoiBarChart({ items }: RoiBarChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
      <BarChart
        data={items}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          type="category"
          dataKey="area"
          width={140}
          tick={{ fontSize: 12 }}
        />
        <XAxis
          type="number"
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="currentCost"
          fill="var(--color-currentCost)"
          radius={4}
        />
        <Bar
          dataKey="projectedSaving"
          fill="var(--color-projectedSaving)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
