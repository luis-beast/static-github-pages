export const withOpacity = (hslColor: string, opacity: number): string =>
  hslColor.replace("hsl(", "hsla(").replace(")", `, ${opacity})`);

export interface BadgeOpacityConfig {
  background: number;
  text: number;
  border: number;
}

export const INACTIVE_OPACITY: BadgeOpacityConfig = {
  background: 0.06,
  text: 0.55,
  border: 0.35,
};

export const ENHANCED_INACTIVE_OPACITY: BadgeOpacityConfig = {
  background: 0.08,
  text: 0.6,
  border: 0.4,
};

export const ACTIVE_BG_OPACITY = 0.2;
export const INNER_GLOW_OPACITY = 0.3;

export const getBadgeStyles = (color: string, isActive: boolean, useEnhanced = false) => {
  const config = useEnhanced ? ENHANCED_INACTIVE_OPACITY : INACTIVE_OPACITY;

  return {
    backgroundColor: withOpacity(color, isActive ? ACTIVE_BG_OPACITY : config.background),
    color: isActive ? color : withOpacity(color, config.text),
    borderColor: isActive ? color : withOpacity(color, config.border),
    boxShadow: `inset 0 0 8px ${withOpacity(color, INNER_GLOW_OPACITY)}`,
  };
};
