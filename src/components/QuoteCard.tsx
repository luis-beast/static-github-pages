import { memo } from "react";
import { motion } from "framer-motion";
import GameBadge from "./GameBadge";
import type { Quote } from "@/types/quote";

interface QuoteCardProps extends Quote {
  isFocused?: boolean;
  onFocus?: () => void;
}

const QuoteCard = memo(function QuoteCard({ 
  number, 
  quote, 
  game, 
  timestamp,
  isFocused = false,
  onFocus 
}: QuoteCardProps) {
  return (
    <motion.article
      className="group relative cursor-pointer"
      onClick={onFocus}
      whileHover={{ scale: isFocused ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className={`absolute inset-0 bg-primary/5 rounded-2xl blur-xl transition-opacity duration-500 ${isFocused ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
      
      <div className={`relative bg-card/40 backdrop-blur-xl rounded-2xl border p-6 shadow-lg shadow-primary/5 transition-all duration-300 ${
        isFocused 
          ? "border-primary/50 shadow-xl shadow-primary/20" 
          : "border-border/50 group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/10"
      }`}>
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
              <span className="text-primary font-mono font-bold text-lg">#{number}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <blockquote className="text-foreground text-lg md:text-xl leading-relaxed mb-4 font-light">
              "{quote}"
            </blockquote>

            <div className="flex flex-wrap items-center gap-3">
              <GameBadge game={game} size="md" isActive />
              <span className="text-muted-foreground/60">•</span>
              <time className="text-muted-foreground text-sm font-light">{timestamp}</time>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default QuoteCard;
