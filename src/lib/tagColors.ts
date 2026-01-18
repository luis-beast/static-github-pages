export const USE_RANDOMIZED_COLORS = false;

const LAYMAN_LEGION_COLOR = "hsl(270, 100%, 71%)";
const LAYMAN_COLOR = "hsl(270, 100%, 50%)";

const TAG_HUES = [0, 15, 30, 55, 70, 90, 110, 130, 165, 180, 210, 300, 320, 340, 355, 105, 50, 170];

const tagColorMap = new Map<string, number>();
const gameColorMap = new Map<string, number>();
let tagColorIndex = 0;
let gameColorIndex = 0;

const assignTagHue = (tag: string): number => {
  const key = tag.toLowerCase();
  if (key === "layman") return 270;

  if (!tagColorMap.has(key)) {
    tagColorMap.set(key, TAG_HUES[tagColorIndex % TAG_HUES.length]);
    tagColorIndex++;
  }

  return tagColorMap.get(key)!;
};

const assignGameHue = (game: string): number => {
  const key = game.toLowerCase();

  if (!gameColorMap.has(key)) {
    gameColorMap.set(key, TAG_HUES[gameColorIndex % TAG_HUES.length]);
    gameColorIndex++;
  }

  return gameColorMap.get(key)!;
};

export const getTagColor = (tag: string): string => {
  const key = tag.toLowerCase();
  if (key === "layman") return LAYMAN_COLOR;
  if (!USE_RANDOMIZED_COLORS) return LAYMAN_LEGION_COLOR;

  const hue = assignTagHue(tag);
  return `hsl(${hue}, 70%, 55%)`;
};

export const getGameColor = (game: string): string => {
  if (!USE_RANDOMIZED_COLORS) return LAYMAN_LEGION_COLOR;

  const hue = assignGameHue(game);
  return `hsl(${hue}, 70%, 55%)`;
};
