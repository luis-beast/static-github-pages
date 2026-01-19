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
      <div className="relative bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col shadow-md">
        <div className="w-full p-5 text-left flex-1">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                <span className="text-primary font-mono font-bold">#{number}</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <blockquote className="text-secondary-foreground/80 text-sm leading-relaxed mb-4">
                "{quote}"
              </blockquote>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/20">
                <GameBadge game={game} size="md" isActive />
                <span className="text-muted-foreground/60">•</span>
                <time className="text-muted-foreground text-sm">{timestamp}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

export default QuoteCard;
