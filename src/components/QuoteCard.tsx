import { getGameColor, getGameColorWithOpacity } from "@/lib/tagColors";

interface QuoteCardProps {
  number: number;
  quote: string;
  game: string;
  timestamp: string;
}

const QuoteCard = ({ number, quote, game, timestamp }: QuoteCardProps) => {
  const gameColor = getGameColor(game);
  const gameBgColor = getGameColorWithOpacity(game, 0.15);

  return (
    <div className="glass-card rounded-lg p-4 hover-lift animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-mono font-semibold">#{number}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-foreground text-lg leading-relaxed mb-3">
            "{quote}"
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <span 
              className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border"
              style={{
                backgroundColor: gameBgColor,
                color: gameColor,
                borderColor: gameColor,
              }}
            >
              {game}
            </span>
            <span className="text-muted-foreground text-sm">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
