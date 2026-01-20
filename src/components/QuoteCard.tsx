import { memo, useMemo } from "react";
import GameBadge from "./GameBadge";
import BaseCard from "./ui/BaseCard";
import type { Quote } from "@/types/quote";
import { formatMSTToLocal, getUserTimezoneAbbr } from "@/lib/timezone";

type QuoteCardProps = Quote;

const QuoteCard = memo(function QuoteCard({ 
  number, 
  quote, 
  game, 
  timestamp
}: QuoteCardProps) {
  // Convert MST timestamp to user's local timezone
  const { localTimestamp, timezoneAbbr } = useMemo(() => ({
    localTimestamp: formatMSTToLocal(timestamp),
    timezoneAbbr: getUserTimezoneAbbr(),
  }), [timestamp]);
  return (
    <BaseCard interactive={false}>
      <div className="w-full p-5 text-left flex-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
              <span className="text-primary font-mono font-bold">#{number}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <blockquote className="text-secondary-foreground/80 text-base leading-relaxed mb-4">
              "{quote}"
            </blockquote>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/20">
              <GameBadge game={game} size="md" isActive />
              <span className="text-muted-foreground/60">•</span>
              <time className="text-muted-foreground text-base" title={`Original: ${timestamp} MST`}>
                {localTimestamp} <span className="text-muted-foreground/60 text-sm">{timezoneAbbr}</span>
              </time>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
});

export default QuoteCard;
