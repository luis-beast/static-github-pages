import { useState } from "react";
import { cn } from "@/lib/utils";
import { getGameColor, USE_RANDOMIZED_COLORS } from "@/lib/tagColors";
import { withOpacity, DEFAULT_INACTIVE_OPACITY, UNIFIED_INACTIVE_OPACITY, ACTIVE_BACKGROUND_OPACITY, BADGE_INNER_GLOW_OPACITY } from "@/lib/colorUtils";
import { Plus, X } from "lucide-react";

interface GameBadgeProps {
  game: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-sm",
  md: "px-3 py-1 text-sm",
} as const;

const GameBadge = ({
  game,
  size = "sm",
  isActive = true,
  onClick,
  className,
}: GameBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const gameColor = getGameColor(game);

  // Use unified opacity when not randomized, default otherwise
  const inactiveConfig = USE_RANDOMIZED_COLORS
    ? DEFAULT_INACTIVE_OPACITY
    : UNIFIED_INACTIVE_OPACITY;

  const backgroundColor = withOpacity(
    gameColor,
    isActive ? ACTIVE_BACKGROUND_OPACITY : inactiveConfig.background
  );

  const textColor = isActive
    ? gameColor
    : withOpacity(gameColor, inactiveConfig.text);

  const borderColor = isActive
    ? gameColor
    : withOpacity(gameColor, inactiveConfig.border);

  const innerGlow = `inset 0 0 8px ${withOpacity(gameColor, BADGE_INNER_GLOW_OPACITY)}`;

  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "inline-flex items-center rounded-md font-medium border transition-all duration-200",
        SIZE_CLASSES[size],
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      style={{
        backgroundColor,
        color: textColor,
        borderColor,
        boxShadow: innerGlow,
      }}
    >
      {onClick && (
        <span
          className={cn(
            "transition-all duration-200 overflow-hidden",
            isHovered ? "opacity-100 w-3 mr-1" : "opacity-0 w-0 mr-0"
          )}
        >
          {isActive ? <X className={iconSize} /> : <Plus className={iconSize} />}
        </span>
      )}
      {game}
    </Component>
  );
};

export default GameBadge;
