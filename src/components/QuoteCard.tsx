import { memo } from "react";
import { motion } from "framer-motion";
import GameBadge from "./GameBadge";
import type { Quote } from "@/types/quote";

type QuoteCardProps = Quote;

const QuoteCard = memo(function QuoteCard({ 
  number, 
  quote, 
  game, 
  timestamp
}: QuoteCardProps) {
  return (
    <article className="relative h-full">
      <div className="relative bg-card/40 backdrop-blur-xl rounded-2xl p-6 shadow-md transition-all duration-300 h-full flex flex-col">
        <div className="flex items-start gap-5 flex-1">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
              <span className="text-primary font-mono font-bold">#{number}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <blockquote className="text-foreground text-base leading-relaxed mb-4 font-light flex-1">
              "{quote}"
            </blockquote>

            <div className="flex flex-wrap items-center gap-3 mt-auto">
              <GameBadge game={game} size="md" isActive />
              <span className="text-muted-foreground/60">•</span>
              <time className="text-muted-foreground text-sm font-light">{timestamp}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

export default QuoteCard;
