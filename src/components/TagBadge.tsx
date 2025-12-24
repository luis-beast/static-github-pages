import { cn } from "@/lib/utils";
import { getTagColor, toProperCase } from "@/lib/tagColors";

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
  const tagColor = getTagColor(tag);
  const tagBgColor = getColorWithOpacity(tagColor, isActive ? 0.20 : 0.03);
  
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };
  
  const Component = onClick ? "button" : "span";
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full font-medium border transition-all duration-200",
        sizeClasses[size],
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      style={{
        backgroundColor: tagBgColor,
        color: isActive ? tagColor : getColorWithOpacity(tagColor, 0.4),
        borderColor: isActive ? tagColor : getColorWithOpacity(tagColor, 0.2),
        opacity: isActive ? 1 : 0.4,
      }}
    >
      {toProperCase(tag)}
    </Component>
  );
};

export default TagBadge;
