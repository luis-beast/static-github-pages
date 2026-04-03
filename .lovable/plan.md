

# Plan: Fluid Scaling, Rendering Fix, Idle Scroll Arrow, and Badge Pop

## 1. Fully Fluid Layout for All Resolutions

**Problem**: Content maxes out at `max-w-[2400px]` and 3 columns. Ultrawide monitors waste space.

**Changes**:
- **`tailwind.config.ts`**: Add `5xl: 3200px` and `6xl: 3840px` breakpoints.
- **`src/pages/Commands.tsx`** and **`src/pages/Quotes.tsx`**: Replace `max-w-[2400px]` with fluid `max-w-[95vw]`. Expand grid: `grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-5`. Update empty-state col-span classes to match. Update focused command col-span similarly.
- **Home sections**: Ensure content sections use fluid widths rather than hard pixel caps.

## 2. Fix White Flash When Scrolling

**Problem**: Scrolling quickly on Commands/Quotes briefly shows white before the background renders.

**Changes**:
- **`src/index.css`**: Add `background-color: hsl(270, 60%, 8%)` as fallback and `background-attachment: fixed` on body so the gradient covers the full scroll area.
- **`src/components/PageWrapper.tsx`**: Add `will-change: transform` to the background glow div for GPU compositing.

## 3. Bouncing Scroll-Down Arrow (Idle-Triggered)

**Problem**: No visual cue to scroll on the home page.

**Behavior**: The arrow starts hidden. After 5 seconds of no mouse movement or scrolling, it gently fades in with a slow bounce animation. Any user interaction (mouse move, scroll, click) immediately fades it out. It also fades out as the user scrolls past the hero (tied to `scrollYProgress`).

**Changes**:
- **`src/components/home/HeroSection.tsx`**: Add a `ChevronDown` icon at the bottom of the hero. Use a `useState` + `useEffect` to track idle time (5s timeout on `mousemove`/`scroll`/`keydown` events). Animate with Framer Motion: `initial={{ opacity: 0 }}`, `animate={{ opacity: showArrow ? 1 : 0 }}` with a gentle `y` bounce keyframe. Clicking it smooth-scrolls to the next section. The arrow also fades with the hero's `scrollYProgress` opacity.

## 4. Make "Layman" Tag and "Streamer" Badge Pop More

**Problem**: These premium badges don't stand out enough.

**Changes**:
- **`src/lib/colorUtils.ts`**: Strengthen `ENHANCED_INACTIVE_OPACITY` (bump `text: 0.7`, `border: 0.5`, `background: 0.12`). Add a dedicated `ENHANCED_ACTIVE_BG_OPACITY = 0.3`. Update `getBadgeStyles` so when `useEnhanced` is true, active state gets higher bg opacity and an outer glow `boxShadow` (e.g. `0 0 12px color/0.4`).
- **`src/components/TagBadge.tsx`**: Pass `useEnhanced={tag.toLowerCase() === "layman"}`.
- **`src/components/ui/BaseBadge.tsx`**: When `useEnhanced` is true, apply `font-semibold` class for slightly bolder text.

## Files Changed

| File | Change |
|---|---|
| `tailwind.config.ts` | Add `5xl` and `6xl` breakpoints |
| `src/index.css` | Add `background-color` fallback and `background-attachment: fixed` |
| `src/pages/Commands.tsx` | Fluid max-width, expand grid to 5 columns |
| `src/pages/Quotes.tsx` | Same as Commands |
| `src/components/home/HeroSection.tsx` | Add idle-triggered bouncing scroll arrow |
| `src/components/PageWrapper.tsx` | Add `will-change: transform` to bg glow |
| `src/lib/colorUtils.ts` | Strengthen enhanced badge styles with outer glow |
| `src/components/TagBadge.tsx` | Pass `useEnhanced` for "layman" tag |
| `src/components/ui/BaseBadge.tsx` | Apply semibold weight when `useEnhanced` |

