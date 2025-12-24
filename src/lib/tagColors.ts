// Toggle for randomized colors vs unified brand colors
// false = All tags/games use Layman Legion Color (#BB66FF), Layman tag uses Layman Color (#8800FF)
// true = Use randomized hue assignment
export const USE_RANDOMIZED_COLORS = false;

// Brand colors
const LAYMAN_LEGION_COLOR = "hsl(270, 100%, 71%)";  // #BB66FF - for general tags/games
const LAYMAN_COLOR = "hsl(270, 100%, 50%)";         // #8800FF - for Layman tag (brand color)

// Unique HSL colors for command group tags (used when USE_RANDOMIZED_COLORS = true)
// Avoiding: follower (200), subscriber (45), moderator (150), streamer/layman (270)
// Also avoiding purple hues (250-290) to keep them distinct from The Layman brand color
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
  300,  // Magenta (safe, far from 270 purple)
  320,  // Hot pink
  340,  // Rose
  355,  // Crimson
  105,  // Spring green
  50,   // Gold-yellow
  170,  // Aqua
];

// Map to store consistent color assignments for tags
const colorAssignments = new Map<string, number>();
let nextColorIndex = 0;

// Map to store consistent color assignments for games
const gameColorAssignments = new Map<string, number>();
let nextGameColorIndex = 0;

function getHueForTag(tag: string): number {
  const normalizedTag = tag.toLowerCase();
  
  // "layman" uses streamer hue (270)
  if (normalizedTag === "layman") {
    return 270;
  }
  
  // Check if already assigned
  if (colorAssignments.has(normalizedTag)) {
    return colorAssignments.get(normalizedTag)!;
  }
  
  // Assign next available color
  const hue = TAG_HUES[nextColorIndex % TAG_HUES.length];
  colorAssignments.set(normalizedTag, hue);
  nextColorIndex++;
  
  return hue;
}

function getHueForGame(game: string): number {
  const normalizedGame = game.toLowerCase();
  
  // Check if already assigned
  if (gameColorAssignments.has(normalizedGame)) {
    return gameColorAssignments.get(normalizedGame)!;
  }
  
  // Assign next available color
  const hue = TAG_HUES[nextGameColorIndex % TAG_HUES.length];
  gameColorAssignments.set(normalizedGame, hue);
  nextGameColorIndex++;
  
  return hue;
}

export function getTagColor(tag: string): string {
  const normalizedTag = tag.toLowerCase();
  
  // "layman" always uses the Layman Color (brand color)
  if (normalizedTag === "layman") {
    return LAYMAN_COLOR;
  }
  
  // If not using randomized colors, return Layman Legion Color
  if (!USE_RANDOMIZED_COLORS) {
    return LAYMAN_LEGION_COLOR;
  }
  
  const hue = getHueForTag(tag);
  return `hsl(${hue}, 70%, 55%)`;
}

export function getTagColorWithOpacity(tag: string, opacity: number): string {
  const normalizedTag = tag.toLowerCase();
  
  // "layman" always uses the Layman Color (brand color)
  if (normalizedTag === "layman") {
    return `hsla(270, 100%, 50%, ${opacity})`;
  }
  
  // If not using randomized colors, return Layman Legion Color with opacity
  if (!USE_RANDOMIZED_COLORS) {
    return `hsla(270, 100%, 71%, ${opacity})`;
  }
  
  const hue = getHueForTag(tag);
  return `hsla(${hue}, 70%, 55%, ${opacity})`;
}

export function getGameColor(game: string): string {
  // If not using randomized colors, return Layman Legion Color
  if (!USE_RANDOMIZED_COLORS) {
    return LAYMAN_LEGION_COLOR;
  }
  
  const hue = getHueForGame(game);
  return `hsl(${hue}, 70%, 55%)`;
}

export function getGameColorWithOpacity(game: string, opacity: number): string {
  // If not using randomized colors, return Layman Legion Color with opacity
  if (!USE_RANDOMIZED_COLORS) {
    return `hsla(270, 100%, 71%, ${opacity})`;
  }
  
  const hue = getHueForGame(game);
  return `hsla(${hue}, 70%, 55%, ${opacity})`;
}

/**
 * Normalizes a string for search by converting to lowercase and removing diacritics/accents.
 * This allows "pokemon" to match "Pokémon", "cafe" to match "Café", etc.
 */
export function normalizeForSearch(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
