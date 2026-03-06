"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface HealthRadarChartProps {
  dimensions: Record<string, number>;
  labels?: Record<string, string>;
}

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function HealthRadarChart({
  dimensions,
  labels,
}: HealthRadarChartProps) {
  const data = Object.entries(dimensions).map(([key, value]) => ({
    dimension: labels?.[key] ?? key,
    score: value,
  }));

  return (
    <ChartContainer config={chartConfig} className="mx-auto h-[300px] w-full">
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="dimension" />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
        <Radar
          dataKey="score"
          fill="var(--color-score)"
          fillOpacity={0.5}
          stroke="var(--color-score)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  );
}
