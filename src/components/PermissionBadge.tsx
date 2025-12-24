import { cn } from "@/lib/utils";

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
  const config = permissionConfig[permission];
  const permColor = config.color;
  const permBgColor = getPermissionColorWithOpacity(permColor, isActive ? 0.20 : 0.03);
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-sm",
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
        backgroundColor: permBgColor,
        color: isActive ? permColor : `${permColor.slice(0, -1)}, 0.4)`.replace("hsl", "hsla"),
        borderColor: isActive ? permColor : `${permColor.slice(0, -1)}, 0.2)`.replace("hsl", "hsla"),
        opacity: isActive ? 1 : 0.4,
      }}
    >
      {config.label}
    </Component>
  );
};

export default PermissionBadge;
