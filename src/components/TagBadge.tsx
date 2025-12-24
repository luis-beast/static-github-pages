import { cn } from "@/lib/utils";
import { getTagColor, getTagColorWithOpacity, toProperCase } from "@/lib/tagColors";

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const TagBadge = ({ 
  tag, 
  size = "sm", 
  isActive = true, 
  onClick, 
  className 
}: TagBadgeProps) => {
  const tagColor = getTagColor(tag);
  const tagBgColor = getTagColorWithOpacity(tag, 0.15);
  
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };
  
  const Component = onClick ? "button" : "span";
  
  const activeStyle = {
    backgroundColor: tagBgColor,
    color: tagColor,
    borderColor: tagColor,
  };
  
  const inactiveStyle = {
    backgroundColor: "hsla(270, 30%, 20%, 0.5)",
    color: "hsl(270, 15%, 60%)",
    borderColor: "hsl(270, 15%, 60%)",
    opacity: 0.5,
  };
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full font-medium border transition-all",
        sizeClasses[size],
        onClick && "cursor-pointer",
        !isActive && onClick && "hover:opacity-75",
        className
      )}
      style={isActive ? activeStyle : inactiveStyle}
    >
      {toProperCase(tag)}
    </Component>
  );
};

export default TagBadge;
