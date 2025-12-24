import { cn } from "@/lib/utils";
import { getGameColor, getGameColorWithOpacity } from "@/lib/tagColors";

interface GameBadgeProps {
  game: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const getColorWithOpacity = (color: string, opacity: number): string => {
  return color.replace("hsl(", "hsla(").replace(")", `, ${opacity})`);
};

const GameBadge = ({ game, size = "sm", isActive = true, onClick, className }: GameBadgeProps) => {
  const gameColor = getGameColor(game);
  const gameBgColor = getColorWithOpacity(gameColor, isActive ? 0.20 : 0.03);
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };
  
  const Component = onClick ? "button" : "span";
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md font-medium border transition-all duration-200",
        sizeClasses[size],
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      style={{
        backgroundColor: gameBgColor,
        color: isActive ? gameColor : getColorWithOpacity(gameColor, 0.4),
        borderColor: isActive ? gameColor : getColorWithOpacity(gameColor, 0.2),
        opacity: isActive ? 1 : 0.4,
      }}
    >
      {game}
    </Component>
  );
};

export default GameBadge;
