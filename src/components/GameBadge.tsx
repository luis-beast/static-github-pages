import { useState } from "react";
import { cn } from "@/lib/utils";
import { getGameColor, USE_RANDOMIZED_COLORS } from "@/lib/tagColors";
import { Plus, X } from "lucide-react";

interface GameBadgeProps {
  game: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  showIcon?: boolean;
  className?: string;
}

const getColorWithOpacity = (color: string, opacity: number): string => {
  return color.replace("hsl(", "hsla(").replace(")", `, ${opacity})`);
};

const GameBadge = ({ game, size = "sm", isActive = true, onClick, showIcon = true, className }: GameBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const gameColor = getGameColor(game);
  
  // When not using randomized colors, games get slightly brighter inactive state
  const inactiveOpacity = !USE_RANDOMIZED_COLORS ? 0.55 : 0.4;
  const inactiveBgOpacity = !USE_RANDOMIZED_COLORS ? 0.06 : 0.03;
  const inactiveColorOpacity = !USE_RANDOMIZED_COLORS ? 0.55 : 0.4;
  const inactiveBorderOpacity = !USE_RANDOMIZED_COLORS ? 0.35 : 0.2;
  
  const gameBgColor = getColorWithOpacity(gameColor, isActive ? 0.20 : inactiveBgOpacity);
  
  // Match TagBadge sizing: use same padding and rounded-full
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  
  const Component = onClick ? "button" : "span";
  
  return (
    <Component
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "inline-flex items-center rounded-full font-medium border transition-all duration-200",
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
      {onClick && showIcon && (
        <span 
          className={cn(
            "transition-opacity duration-200 w-3 mr-1 flex items-center justify-center",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          {isActive ? (
            <X className={iconSize} />
          ) : (
            <Plus className={iconSize} />
          )}
        </span>
      )}
      {game}
    </Component>
  );
};

export default GameBadge;