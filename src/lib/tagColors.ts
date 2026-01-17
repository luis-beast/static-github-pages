/**
 * Tag and game color utilities for consistent theming.
 * 
 * Toggle USE_RANDOMIZED_COLORS to switch between:
 * - false: All tags/games use Layman Legion Color (#BB66FF), Layman tag uses Layman Color (#8800FF)
 * - true: Use randomized hue assignment for visual variety
 */

export const USE_RANDOMIZED_COLORS = false;

// Brand colors
const LAYMAN_LEGION_COLOR = "hsl(270, 100%, 71%)"; // #BB66FF - for general tags/games
const LAYMAN_COLOR = "hsl(270, 100%, 50%)";        // #8800FF - for Layman tag (brand color)

/**
 * Available HSL hues for randomized color assignment.
 * Excludes: follower (200), subscriber (45), moderator (150), streamer/layman (270)
 * Also avoids purple hues (250-290) to stay distinct from Layman brand.
 */
const TAG_HUES = [
  0,    // Red
  15,   // Vermillion
  30,   // Orange
  55,   // Yellow-gold
  70,   // Yellow-green
  90,   // Lime
  110,  // Green
  130,  // Emerald
  165,  // Teal
  180,  // Cyan
  210,  // Sky blue
  300,  // Magenta
  320,  // Hot pink
  340,  // Rose
  355,  // Crimson
  105,  // Spring green
  50,   // Gold-yellow
  170,  // Aqua
];

// Persistent color assignments for consistent rendering
const tagColorMap = new Map<string, number>();
const gameColorMap = new Map<string, number>();
let tagColorIndex = 0;
let gameColorIndex = 0;

function assignTagHue(tag: string): number {
  const key = tag.toLowerCase();
  
  // "layman" always uses brand hue
  if (key === "layman") return 270;
  
  if (!tagColorMap.has(key)) {
    tagColorMap.set(key, TAG_HUES[tagColorIndex % TAG_HUES.length]);
    tagColorIndex++;
  }
  
  return tagColorMap.get(key)!;
}

function assignGameHue(game: string): number {
  const key = game.toLowerCase();
  
  if (!gameColorMap.has(key)) {
    gameColorMap.set(key, TAG_HUES[gameColorIndex % TAG_HUES.length]);
    gameColorIndex++;
  }
  
  return gameColorMap.get(key)!;
}

export function getTagColor(tag: string): string {
  const key = tag.toLowerCase();
  
  // "layman" always uses brand color
  if (key === "layman") return LAYMAN_COLOR;
  
  // Unified color mode
  if (!USE_RANDOMIZED_COLORS) return LAYMAN_LEGION_COLOR;
  
  // Randomized mode
  const hue = assignTagHue(tag);
  return `hsl(${hue}, 70%, 55%)`;
}

export function getGameColor(game: string): string {
  // Unified color mode
  if (!USE_RANDOMIZED_COLORS) return LAYMAN_LEGION_COLOR;
  
  // Randomized mode
  const hue = assignGameHue(game);
  return `hsl(${hue}, 70%, 55%)`;
}
