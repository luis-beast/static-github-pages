// Unique HSL colors for command group tags
// Avoiding: follower (200), subscriber (45), moderator (150), streamer (270)
const TAG_HUES = [
  20,   // Orange
  330,  // Pink
  180,  // Cyan
  60,   // Yellow-green
  300,  // Magenta
  120,  // Green
  240,  // Blue
  350,  // Red-pink
  80,   // Lime
  210,  // Sky blue
  15,   // Burnt orange
  290,  // Purple-magenta
  160,  // Teal
  30,   // Gold
  260,  // Violet
];

// Map to store consistent color assignments
const colorAssignments = new Map<string, number>();
let nextColorIndex = 0;

export function getTagColor(tag: string): string {
  const normalizedTag = tag.toLowerCase();
  
  // "layman" uses streamer color (270)
  if (normalizedTag === "layman") {
    return "hsl(270, 80%, 65%)";
  }
  
  // Check if already assigned
  if (colorAssignments.has(normalizedTag)) {
    const hue = colorAssignments.get(normalizedTag)!;
    return `hsl(${hue}, 70%, 55%)`;
  }
  
  // Assign next available color
  const hue = TAG_HUES[nextColorIndex % TAG_HUES.length];
  colorAssignments.set(normalizedTag, hue);
  nextColorIndex++;
  
  return `hsl(${hue}, 70%, 55%)`;
}

export function toProperCase(str: string): string {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
