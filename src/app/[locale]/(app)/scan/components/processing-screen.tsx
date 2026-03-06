"use client";

import { useState, useEffect } from "react";

interface ProcessingScreenProps {
  totalAnswers: number;
  locale: string;
}

const MESSAGES = {
  en: [
    "Analyzing your business...",
    "Finding automation opportunities...",
    "Calculating potential savings...",
    "Mapping risk areas...",
    "Building your action plan...",
  ],
  ru: [
    "Анализируем ваш бизнес...",
    "Ищем возможности для автоматизации...",
    "Рассчитываем потенциальную экономию...",
    "Составляем карту рисков...",
    "Формируем план действий...",
  ],
};

export function ProcessingScreen({ totalAnswers, locale }: ProcessingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const msgs = locale === "ru" ? MESSAGES.ru : MESSAGES.en;

  // Rotate messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % msgs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [msgs.length]);

  const tagline =
    locale === "ru"
      ? `Мы анализируем ${totalAnswers} ответов по 5 направлениям бизнеса...`
      : `We're analyzing ${totalAnswers} answers across 5 business areas...`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Animated indicator */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 rounded-full border-4 border-primary/20 animate-ping" />
        <div className="absolute h-16 w-16 rounded-full border-4 border-primary/30 animate-pulse" />
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary animate-pulse"
          >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>
      </div>

      {/* Rotating message */}
      <div className="text-center space-y-3">
        <h2 className="text-xl font-semibold transition-opacity duration-500">
          {msgs[messageIndex]}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          {tagline}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {msgs.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              idx <= messageIndex
                ? "bg-primary"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
