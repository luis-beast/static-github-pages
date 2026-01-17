import { useState } from "react";
import { cn } from "@/lib/utils";
import { getTagColor, USE_RANDOMIZED_COLORS } from "@/lib/tagColors";
import { Plus, X } from "lucide-react";

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const getColorWithOpacity = (color: string, opacity: number): string => {
  return color.replace("hsl(", "hsla(").replace(")", `, ${opacity})`);
};

const TagBadge = ({ 
  tag, 
  size = "sm", 
  isActive = true, 
  onClick,
  className 
}: TagBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const tagColor = getTagColor(tag);
  const isLayman = tag.toLowerCase() === "layman";
  
  // Layman tag uses darker color, so needs higher opacity when inactive
  // When not using randomized colors, all tags get slightly brighter inactive state
  const inactiveOpacity = isLayman ? 0.6 : (!USE_RANDOMIZED_COLORS ? 0.55 : 0.4);
  const inactiveBgOpacity = isLayman ? 0.08 : (!USE_RANDOMIZED_COLORS ? 0.06 : 0.03);
  const inactiveColorOpacity = isLayman ? 0.6 : (!USE_RANDOMIZED_COLORS ? 0.55 : 0.4);
  const inactiveBorderOpacity = isLayman ? 0.4 : (!USE_RANDOMIZED_COLORS ? 0.35 : 0.2);
  
  const tagBgColor = getColorWithOpacity(tagColor, isActive ? 0.20 : inactiveBgOpacity);
  
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
        backgroundColor: tagBgColor,
        color: isActive ? tagColor : getColorWithOpacity(tagColor, inactiveColorOpacity),
        borderColor: isActive ? tagColor : getColorWithOpacity(tagColor, inactiveBorderOpacity),
        opacity: isActive ? 1 : inactiveOpacity,
      }}
    >
      {onClick && (
        <span 
          className={cn(
            "transition-all duration-200 overflow-hidden",
            isHovered ? "opacity-100 w-3 mr-1" : "opacity-0 w-0 mr-0"
          )}
        >
          {isActive ? (
            <X className={iconSize} />
          ) : (
            <Plus className={iconSize} />
          )}
        </span>
      )}
      {tag}
    </Component>
  );
};

export default TagBadge;