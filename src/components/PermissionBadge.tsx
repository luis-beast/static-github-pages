import { useState } from "react";
import { cn } from "@/lib/utils";
import { getBadgeStyles } from "@/lib/colorUtils";
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
const PERMISSION_CONFIG: Record<Permission, { label: string; color: string }> = {
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

  const { label, color } = PERMISSION_CONFIG[permission];
  const useEnhanced = permission === "streamer";
  const styles = getBadgeStyles(color, isActive, useEnhanced);

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
      {label}
    </Component>
  );
};

export default PermissionBadge;
