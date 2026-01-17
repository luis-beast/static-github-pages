import { useState } from "react";
import { cn } from "@/lib/utils";
import { withOpacity, DEFAULT_INACTIVE_OPACITY, ENHANCED_INACTIVE_OPACITY, ACTIVE_BACKGROUND_OPACITY, BADGE_INNER_GLOW_OPACITY } from "@/lib/colorUtils";
import { Plus, X } from "lucide-react";

export type Permission = "follower" | "subscriber" | "moderator" | "streamer";

interface PermissionBadgeProps {
  permission: Permission;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Permission display configuration with HSL colors */
export const PERMISSION_CONFIG: Record<Permission, { label: string; color: string }> = {
  follower: { label: "Follower", color: "hsl(200, 80%, 55%)" },
  subscriber: { label: "Subscriber", color: "hsl(45, 90%, 55%)" },
  moderator: { label: "Moderator", color: "hsl(150, 70%, 45%)" },
  streamer: { label: "Streamer", color: "hsl(270, 100%, 50%)" },
};

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-sm",
  md: "px-3 py-1 text-sm",
} as const;

const PermissionBadge = ({
  permission,
  size = "sm",
  isActive = true,
  onClick,
  className,
}: PermissionBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const config = PERMISSION_CONFIG[permission];
  const permColor = config.color;
  const isStreamer = permission === "streamer";

  // Streamer uses darker brand color, needs enhanced visibility when inactive
  const inactiveConfig = isStreamer ? ENHANCED_INACTIVE_OPACITY : DEFAULT_INACTIVE_OPACITY;

  const backgroundColor = withOpacity(
    permColor,
    isActive ? ACTIVE_BACKGROUND_OPACITY : inactiveConfig.background
  );

  const textColor = isActive
    ? permColor
    : withOpacity(permColor, inactiveConfig.text);

  const borderColor = isActive
    ? permColor
    : withOpacity(permColor, inactiveConfig.border);

  const innerGlow = `inset 0 0 8px ${withOpacity(permColor, BADGE_INNER_GLOW_OPACITY)}`;

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
      {config.label}
    </Component>
  );
};

export default PermissionBadge;
