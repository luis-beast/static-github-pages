import { useState } from "react";
import { cn } from "@/lib/utils";
import { getGameColor } from "@/lib/tagColors";
import { getBadgeStyles } from "@/lib/colorUtils";
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

  const color = getGameColor(game);
  const styles = getBadgeStyles(color, isActive);

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
      style={styles}
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
