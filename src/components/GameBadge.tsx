import { cn } from "@/lib/utils";
import { getGameColor, USE_RANDOMIZED_COLORS } from "@/lib/tagColors";

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
  
  // When not using randomized colors, games get slightly brighter inactive state
  const inactiveOpacity = !USE_RANDOMIZED_COLORS ? 0.55 : 0.4;
  const inactiveBgOpacity = !USE_RANDOMIZED_COLORS ? 0.06 : 0.03;
  const inactiveColorOpacity = !USE_RANDOMIZED_COLORS ? 0.55 : 0.4;
  const inactiveBorderOpacity = !USE_RANDOMIZED_COLORS ? 0.35 : 0.2;
  
  const gameBgColor = getColorWithOpacity(gameColor, isActive ? 0.20 : inactiveBgOpacity);
  
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
        color: isActive ? gameColor : getColorWithOpacity(gameColor, inactiveColorOpacity),
        borderColor: isActive ? gameColor : getColorWithOpacity(gameColor, inactiveBorderOpacity),
        opacity: isActive ? 1 : inactiveOpacity,
      }}
    >
      {game}
    </Component>
  );
};

export default GameBadge;
