// Unified button style system for app buttons (excluding nav/footer)
// These constants ensure visual consistency across all interactive elements

export const APP_BUTTON_BASE = "rounded-xl border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

export const APP_BUTTON_DEFAULT = "bg-secondary/50 border-border/50 hover:bg-primary/20 hover:border-primary/30";

export const APP_BUTTON_ACTIVE = "bg-primary/10 border-primary/30 hover:bg-primary/20";

// Combined classes for convenience
export const APP_BUTTON = `${APP_BUTTON_BASE} ${APP_BUTTON_DEFAULT}`;
export const APP_BUTTON_SELECTED = `${APP_BUTTON_BASE} ${APP_BUTTON_ACTIVE}`;
