

# Plan: Move ScrollRevealSection Out of Home Directory

`ScrollRevealSection.tsx` is currently the only file in `src/components/home/`. It's a generic scroll-reveal animation wrapper — not home-specific — so it should live with the other shared UI components.

## Changes

| File | Change |
|---|---|
| `src/components/home/ScrollRevealSection.tsx` | Delete |
| `src/components/ScrollRevealSection.tsx` | Create (same content, moved up one level) |
| `src/pages/Home.tsx` | Update import path from `@/components/home/ScrollRevealSection` to `@/components/ScrollRevealSection` |

After this, the empty `src/components/home/` directory is removed.

