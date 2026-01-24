import type { Permission } from "@/components/PermissionBadge";

export const BRAND_GRADIENTS = {
  layman: "linear-gradient(to bottom, #ffffff, #a0a0a0)",
  louie: "linear-gradient(to bottom, #bb66FF, #8800FF)",
} as const;

export const EASING = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  reveal: 0.8,
} as const;

export const NAV_ITEMS = [
  { path: "/commands", label: "Commands" },
  { path: "/quotes", label: "Quotes" },
] as const;

export const FOOTER_NAV_LINKS = [
  { label: "Home", path: "/" },
] as const;

export const FOOTER_LEGAL_LINKS: readonly { label: string; path: string }[] = [];

export const KNOWN_ROUTES = [
  "/",
  "/quotes",
  "/commands",
] as const;

export const SCROLL_THRESHOLD = 100;

export const PERMISSION_PRIORITY: Record<Permission, number> = {
  follower: 1,
  subscriber: 2,
  moderator: 3,
  streamer: 4,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const listItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 },
};

export const layoutTransition = {
  layout: { duration: DURATION.normal, ease: EASING.snappy },
  opacity: { duration: DURATION.fast },
  y: { duration: DURATION.fast },
};
