import { cn } from "@/lib/utils";

export type Permission = "follower" | "subscriber" | "moderator" | "streamer";

interface PermissionBadgeProps {
  permission: Permission;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const permissionConfig: Record<Permission, { label: string; className: string }> = {
  follower: {
    label: "Follower",
    className: "bg-perm-follower/20 text-perm-follower border-perm-follower/30",
  },
  subscriber: {
    label: "Subscriber",
    className: "bg-perm-subscriber/20 text-perm-subscriber border-perm-subscriber/30",
  },
  moderator: {
    label: "Moderator",
    className: "bg-perm-moderator/20 text-perm-moderator border-perm-moderator/30",
  },
  streamer: {
    label: "Streamer",
    className: "bg-perm-streamer/20 text-perm-streamer border-perm-streamer/30",
  },
};

const PermissionBadge = ({ 
  permission, 
  size = "sm", 
  isActive = true, 
  onClick, 
  className 
}: PermissionBadgeProps) => {
  const config = permissionConfig[permission];
  
  const sizeClasses = {
    sm: "px-2.5 py-1 text-sm",
    md: "px-4 py-2 text-sm",
  };
  
  const Component = onClick ? "button" : "span";
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md font-medium border transition-all",
        sizeClasses[size],
        isActive 
          ? config.className
          : "bg-secondary/50 text-muted-foreground border-border/50 opacity-50 hover:opacity-75",
        onClick && "cursor-pointer",
        className
      )}
    >
      {config.label}
    </Component>
  );
};

export default PermissionBadge;
