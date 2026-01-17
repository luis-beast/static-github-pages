/**
 * Shared color utilities for badge components.
 * All colors use HSL format for consistency with the design system.
 */

/**
 * Converts an HSL color string to HSLA with specified opacity.
 */
export function withOpacity(hslColor: string, opacity: number): string {
  return hslColor.replace("hsl(", "hsla(").replace(")", `, ${opacity})`);
}

/** Opacity values for inactive badge states */
export interface BadgeOpacityConfig {
  background: number;
  text: number;
  border: number;
}

/** Standard opacity for inactive badges */
export const INACTIVE_OPACITY: BadgeOpacityConfig = {
  background: 0.06,
  text: 0.55,
  border: 0.35,
};

/** Enhanced opacity for darker/brand colors (Layman, Streamer) */
export const ENHANCED_INACTIVE_OPACITY: BadgeOpacityConfig = {
  background: 0.08,
  text: 0.6,
  border: 0.4,
};

/** Background opacity for active badges */
export const ACTIVE_BG_OPACITY = 0.2;

/** Inner glow opacity for all badges */
export const INNER_GLOW_OPACITY = 0.3;

/**
 * Computes all badge style properties based on color and state.
 */
export function getBadgeStyles(
  color: string,
  isActive: boolean,
  useEnhanced = false
) {
  const config = useEnhanced ? ENHANCED_INACTIVE_OPACITY : INACTIVE_OPACITY;

  return {
    backgroundColor: withOpacity(color, isActive ? ACTIVE_BG_OPACITY : config.background),
    color: isActive ? color : withOpacity(color, config.text),
    borderColor: isActive ? color : withOpacity(color, config.border),
    boxShadow: `inset 0 0 8px ${withOpacity(color, INNER_GLOW_OPACITY)}`,
  };
}
