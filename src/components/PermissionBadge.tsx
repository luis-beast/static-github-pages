import { cn } from "@/lib/utils";

export type Permission = "follower" | "subscriber" | "moderator" | "streamer";

interface PermissionBadgeProps {
  permission: Permission;
  className?: string;
}

const permissionConfig: Record<Permission, { label: string; className: string }> = {
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

const PermissionBadge = ({ permission, className }: PermissionBadgeProps) => {
  const config = permissionConfig[permission];
  
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default PermissionBadge;
