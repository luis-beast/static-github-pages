import { memo } from "react";
import BaseBadge from "@/components/ui/BaseBadge";
import { getTagColor } from "@/lib/tagColors";

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const TagBadge = memo(function TagBadge({
  tag,
  size = "sm",
  isActive = true,
  onClick,
  className,
}: TagBadgeProps) {
  return (
    <BaseBadge
      label={tag}
      color={getTagColor(tag)}
      size={size}
      isActive={isActive}
      onClick={onClick}
      className={className}
      useEnhanced={tag.toLowerCase() === "layman"}
    />
  );
});

export default TagBadge;
