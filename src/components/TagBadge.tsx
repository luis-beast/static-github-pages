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
  const color = getTagColor(tag);
  const useEnhanced = tag.toLowerCase() === "layman";

  return (
    <BaseBadge
      label={tag}
      color={color}
      size={size}
      isActive={isActive}
      onClick={onClick}
      className={className}
      useEnhanced={useEnhanced}
    />
  );
});

export default TagBadge;
