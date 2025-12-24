// Unique HSL colors for command group tags
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
  // "layman" uses the brand color
  if (normalizedTag === "layman") {
    return `hsl(270, 100%, 50%)`;
  }
  const hue = getHueForTag(tag);
  return `hsl(${hue}, 70%, 55%)`;
}

export function getTagColorWithOpacity(tag: string, opacity: number): string {
  const normalizedTag = tag.toLowerCase();
  // "layman" uses the brand color
  if (normalizedTag === "layman") {
    return `hsla(270, 100%, 50%, ${opacity})`;
  }
  const hue = getHueForTag(tag);
  return `hsla(${hue}, 70%, 55%, ${opacity})`;
}

export function getGameColor(game: string): string {
  const hue = getHueForGame(game);
  return `hsl(${hue}, 70%, 55%)`;
}

export function getGameColorWithOpacity(game: string, opacity: number): string {
  const hue = getHueForGame(game);
  return `hsla(${hue}, 70%, 55%, ${opacity})`;
}

export function toProperCase(str: string): string {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
