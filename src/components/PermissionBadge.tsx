import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";

export type Permission = "follower" | "subscriber" | "moderator" | "streamer";

interface PermissionBadgeProps {
  permission: Permission;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const permissionConfig: Record<Permission, { label: string; color: string }> = {
  follower: {
    label: "Follower",
    color: "hsl(200, 80%, 55%)",
  },
  subscriber: {
    label: "Subscriber",
    color: "hsl(45, 90%, 55%)",
  },
  moderator: {
    label: "Moderator",
    color: "hsl(150, 70%, 45%)",
  },
  streamer: {
    label: "Streamer",
    color: "hsl(270, 100%, 50%)",
  },
};

const getPermissionColorWithOpacity = (color: string, opacity: number): string => {
  return color.replace("hsl(", "hsla(").replace(")", `, ${opacity})`);
};

const PermissionBadge = ({ 
  permission, 
  size = "sm", 
  isActive = true, 
  onClick, 
  className 
}: PermissionBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = permissionConfig[permission];
  const permColor = config.color;
  const isStreamer = permission === "streamer";
  
  // Streamer uses darker Layman Color, so needs higher opacity when inactive
  const inactiveOpacity = isStreamer ? 0.6 : 0.4;
  const inactiveBgOpacity = isStreamer ? 0.08 : 0.03;
  const inactiveColorOpacity = isStreamer ? 0.6 : 0.4;
  const inactiveBorderOpacity = isStreamer ? 0.4 : 0.2;
  
  const permBgColor = getPermissionColorWithOpacity(permColor, isActive ? 0.20 : inactiveBgOpacity);
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-sm",
    md: "px-3 py-1 text-sm",
  };

  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  
  const Component = onClick ? "button" : "span";
  
  return (
    <Component
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "inline-flex items-center rounded-md font-medium border transition-all duration-200",
        sizeClasses[size],
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      style={{
        backgroundColor: permBgColor,
        color: isActive ? permColor : getPermissionColorWithOpacity(permColor, inactiveColorOpacity),
        borderColor: isActive ? permColor : getPermissionColorWithOpacity(permColor, inactiveBorderOpacity),
        opacity: isActive ? 1 : inactiveOpacity,
      }}
    >
      {onClick && isHovered && (
        <span className="mr-1 transition-all duration-200 animate-fade-in">
          {isActive ? (
            <X className={iconSize} />
          ) : (
            <Plus className={iconSize} />
          )}
        </span>
      )}
      {config.label}
    </Component>
  );
};

export default PermissionBadge;