import { getGameColor, getGameColorWithOpacity } from "@/lib/tagColors";

interface GameBadgeProps {
  game: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
}

const GameBadge = ({ game, size = "sm", isActive = true, onClick }: GameBadgeProps) => {
  const gameColor = getGameColor(game);
  const gameBgColor = getGameColorWithOpacity(game, isActive ? 0.20 : 0.03);
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };
  
  const Component = onClick ? "button" : "span";
  
  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-center rounded-md font-medium border transition-all duration-200 ${sizeClasses[size]} ${onClick ? "cursor-pointer hover:scale-105" : ""}`}
      style={{
        backgroundColor: gameBgColor,
        color: isActive ? gameColor : `${gameColor}40`,
        borderColor: isActive ? gameColor : `${gameColor}20`,
        opacity: isActive ? 1 : 0.4,
      }}
    >
      {game}
    </Component>
  );
};

export default GameBadge;
