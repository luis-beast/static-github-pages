import { useState, memo, useCallback, type CSSProperties } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBadgeStyles } from "@/lib/colorUtils";

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-sm",
  md: "px-3 py-1 text-sm",
} as const;

const ICON_SIZES = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
} as const;

export interface BaseBadgeProps {
  label: string;
  color: string;
  size?: keyof typeof SIZE_CLASSES;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  useEnhanced?: boolean;
}

const BaseBadge = memo(function BaseBadge({
  label,
  color,
  size = "sm",
  isActive = true,
  onClick,
  className,
  useEnhanced = false,
}: BaseBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const styles = getBadgeStyles(color, isActive, useEnhanced);
  const iconSize = ICON_SIZES[size];
  const Component = onClick ? "button" : "span";

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <Component
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "inline-flex items-center rounded-md font-medium border transition-all duration-200",
        SIZE_CLASSES[size],
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      style={styles as CSSProperties}
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
      {label}
    </Component>
  );
});

export default BaseBadge;
