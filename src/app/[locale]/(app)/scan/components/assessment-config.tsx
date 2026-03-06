"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssessmentConfigProps {
  onStart: (aiDecideMode: boolean) => void;
  locale: string;
}

const texts = {
  en: {
    title: "AI Maturity Assessment",
    subtitle:
      "Answer questions across 5 dimensions to discover your company's AI readiness level. Takes about 5-7 minutes.",
    aiDecideToggle: "AI Decides",
    aiDecideDescription:
      "Let AI decide how many follow-up questions to ask based on your answers. Default: 5-8 follow-ups.",
    begin: "Start Assessment",
  },
  ru: {
    title: "Оценка зрелости ИИ",
    subtitle:
      "Ответьте на вопросы по 5 направлениям, чтобы узнать уровень AI-готовности вашей компании. Займет около 5-7 минут.",
    aiDecideToggle: "ИИ решает",
    aiDecideDescription:
      "Позвольте ИИ решать, сколько уточняющих вопросов задать на основе ваших ответов. По умолчанию: 5-8 уточнений.",
    begin: "Начать оценку",
  },
} as const;

export function AssessmentConfig({ onStart, locale }: AssessmentConfigProps) {
  const [aiDecideMode, setAiDecideMode] = useState(false);
  const t = locale === "ru" ? texts.ru : texts.en;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">{t.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI Decides toggle */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <Label htmlFor="ai-decide" className="text-sm font-medium">
                {t.aiDecideToggle}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t.aiDecideDescription}
              </p>
            </div>
            <Switch
              id="ai-decide"
              checked={aiDecideMode}
              onCheckedChange={setAiDecideMode}
            />
          </div>

          {/* Start button */}
          <Button
            onClick={() => onStart(aiDecideMode)}
            className="w-full"
            size="lg"
          >
            {t.begin}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
