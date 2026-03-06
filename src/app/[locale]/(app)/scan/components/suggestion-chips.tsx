"use client";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
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
