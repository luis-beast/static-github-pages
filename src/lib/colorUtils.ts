/**
 * Shared color utility functions for badges and themed components.
 * All colors use HSL format for consistency with the design system.
 */

/**
 * Converts an HSL color string to HSLA with specified opacity.
 * @param hslColor - HSL color string like "hsl(270, 100%, 50%)"
 * @param opacity - Opacity value from 0 to 1
 * @returns HSLA color string
 */
export function withOpacity(hslColor: string, opacity: number): string {
  return hslColor.replace("hsl(", "hsla(").replace(")", `, ${opacity})`);
}

/**
 * Configuration for badge inactive states.
 * Some colors (like Layman brand purple) need higher opacity when inactive
 * to maintain visibility against dark backgrounds.
 */
export interface BadgeOpacityConfig {
  overall: number;
  background: number;
  text: number;
  border: number;
}

/** Default opacity values for inactive badges */
export const DEFAULT_INACTIVE_OPACITY: BadgeOpacityConfig = {
  overall: 0.4,
  background: 0.03,
  text: 0.4,
  border: 0.2,
};

/** Higher opacity values for darker/brand colors that need more visibility */
export const ENHANCED_INACTIVE_OPACITY: BadgeOpacityConfig = {
  overall: 0.6,
  background: 0.08,
  text: 0.6,
  border: 0.4,
};

/** Slightly brighter opacity for non-randomized colors */
export const UNIFIED_INACTIVE_OPACITY: BadgeOpacityConfig = {
  overall: 0.55,
  background: 0.06,
  text: 0.55,
  border: 0.35,
};

/** Active state opacity (used for background) */
export const ACTIVE_BACKGROUND_OPACITY = 0.2;
