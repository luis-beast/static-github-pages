import { memo } from "react";
import BaseBadge from "@/components/ui/BaseBadge";
import { getGameColor } from "@/lib/tagColors";

interface GameBadgeProps {
  game: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const GameBadge = memo(function GameBadge({
  game,
  size = "sm",
  isActive = true,
  onClick,
  className,
}: GameBadgeProps) {
  const color = getGameColor(game);

  return (
    <BaseBadge
      label={game}
      color={color}
      size={size}
      isActive={isActive}
      onClick={onClick}
      className={className}
    />
  );
});

export default GameBadge;
