import { memo } from "react";
import BaseBadge from "./ui/BaseBadge";
import { getTagColor } from "@/lib/tagColors";

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
}

const TagBadge = memo(function TagBadge({ tag, size = "sm", isActive = true, onClick }: TagBadgeProps) {
  const color = getTagColor(tag);
  const isPremium = tag.toLowerCase() === "layman";

  return (
    <BaseBadge
      label={tag}
      color={color}
      size={size}
      isActive={isActive}
      onClick={onClick}
      useEnhanced={isPremium}
    />
  );
});

export default TagBadge;
