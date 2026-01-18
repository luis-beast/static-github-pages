import { memo, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { getBadgeStyles } from "@/lib/colorUtils";

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-sm",
  md: "px-3 py-1 text-sm",
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
  const styles = getBadgeStyles(color, isActive, useEnhanced);
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md font-medium border transition-all duration-200",
        SIZE_CLASSES[size],
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      style={styles as CSSProperties}
    >
      {label}
    </Component>
  );
});

export default BaseBadge;
