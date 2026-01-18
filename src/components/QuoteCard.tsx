import { memo } from "react";
import GameBadge from "./GameBadge";
import type { Quote } from "@/types/quote";

const QuoteCard = memo(function QuoteCard({ number, quote, game, timestamp }: Quote) {
  return (
    <article className="glass-card rounded-lg p-4 hover-lift animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-mono font-semibold">#{number}</span>
        </div>

        <div className="flex-1 min-w-0">
          <blockquote className="text-foreground text-lg leading-relaxed mb-3">
            "{quote}"
          </blockquote>

          <div className="flex flex-wrap items-center gap-3">
            <GameBadge game={game} size="md" isActive />
            <time className="text-muted-foreground text-sm">{timestamp}</time>
          </div>
        </div>
      </div>
    </article>
  );
});

export default QuoteCard;
