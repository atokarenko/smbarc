"use client";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  loading?: boolean;
}

export function SuggestionChips({
  suggestions,
  onSelect,
  loading = false,
}: SuggestionChipsProps) {
  // Loading state: show skeleton chips
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="inline-flex h-8 w-28 rounded-full bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(suggestion)}
          className="
            inline-flex items-center px-3 py-1.5 rounded-full text-xs
            bg-secondary text-secondary-foreground
            hover:bg-secondary/80
            border border-border/50
            transition-colors cursor-pointer
          "
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
