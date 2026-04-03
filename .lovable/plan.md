

# Plan: Ultrawide Scaling, Scroll Arrow Fix, and Navbar Idle Glow

Combines all pending work from the previous plan with your latest feedback.

## 1. Better Space Usage on Ultrawide (All Screens)

**Problem**: At 3440px, content is clustered in the center with large empty margins. Home sections are capped at `max-w-4xl`/`max-w-5xl` (~896px/~1024px). The grid breakpoints are too high to trigger 4 columns at 3440px.

**Changes**:

- **`tailwind.config.ts`**: Lower breakpoints: `3xl: 1800px`, `4xl: 2200px`, `5xl: 3000px`, `6xl: 3600px`. This ensures 4 columns at 3440px.
- **`src/pages/Commands.tsx`** and **`src/pages/Quotes.tsx`**: Add `6xl:grid-cols-6` to the grid. Update all col-span classes to match.
- **`src/components/home/AboutSection.tsx`**: Replace `max-w-4xl` with `max-w-4xl 3xl:max-w-6xl 5xl:max-w-7xl`. Scale heading/text sizes at `3xl`+.
- **`src/components/home/FeaturesSection.tsx`**: Replace `max-w-5xl` with `max-w-5xl 3xl:max-w-6xl 5xl:max-w-7xl`. Scale icon boxes and text.
- **`src/components/home/HomeSocialsSection.tsx`**: Same treatment as Features.
- **`src/components/home/HeroSection.tsx`**: Scale avatar (`3xl:w-56 3xl:h-56`) and heading (`3xl:text-9xl`) for ultrawide.

## 2. Fix Scroll Arrow (Not Appearing)

**Root cause**: Lines 33-34 listen for `mousemove`, `keydown`, `touchstart`, `click` -- all reset the 5-second timer. The user only wants scroll activity to hide/reset it.

**Changes in `src/components/home/HeroSection.tsx`**:
- Remove the `resetIdle` callback and all `mousemove`/`keydown`/`touchstart`/`click` event listeners.
- Start a simple `setTimeout(() => setShowArrow(true), 5000)` on mount.
- Keep the `scrollYProgress` listener: hide arrow when `v > 0.05`, restart 5s timer when user scrolls back to `v <= 0.05`.
- The arrow appears after 5 seconds regardless of mouse/keyboard activity. Only scrolling past the hero hides it.

## 3. Navbar Idle Glow Animation (New Feature)

**Behavior**: After 10 seconds of no "real" interaction (scrolling, route change, clicking buttons/cards), the navbar text glows sequentially: BrandName -> Commands -> Quotes. Any real interaction fades the glow out smoothly (500ms CSS transition).

**Glow colors**:
- "Commands" and "Quotes": white text-shadow (`0 0 12px rgba(255,255,255,0.8), 0 0 24px rgba(255,255,255,0.4)`)
- "LaymanLouie": unified white+purple blend (`0 0 12px rgba(255,255,255,0.7), 0 0 20px rgba(187,102,255,0.5), 0 0 30px rgba(136,0,255,0.3)`) so it looks like one cohesive glow matching both gradient colors.

**Changes**:

- **`src/components/Navigation.tsx`**:
  - Add `idleGlowIndex` state (`null | 0 | 1 | 2`). Index 0 = BrandName, 1 = Commands, 2 = Quotes.
  - 10-second idle timer, reset on `scroll` (window listener), `location.pathname` change, and clicks on interactive elements (capture phase).
  - When timer fires: set index to 0, then 1 after 1.5s, then 2 after 1.5s, then null after 1.5s. If still idle, restart the 10s timer.
  - Apply inline `style={{ textShadow: ..., transition: 'text-shadow 0.5s ease' }}` to the text `<span>` elements. When `idleGlowIndex` doesn't match, `textShadow` is `'none'` -- the CSS transition handles the smooth fade-out.
  - On interaction (scroll/click/route change): set `idleGlowIndex` to null (fades out via transition), clear sequence timeouts, restart 10s idle timer.

- **`src/index.css`**: No changes needed -- glow is applied via inline styles with transitions.

## Files Changed

| File | Change |
|---|---|
| `tailwind.config.ts` | Lower `3xl`/`4xl` breakpoints for earlier column triggers |
| `src/pages/Commands.tsx` | Add `6xl:grid-cols-6`, update col-spans |
| `src/pages/Quotes.tsx` | Same |
| `src/components/home/AboutSection.tsx` | Widen max-w, scale text for ultrawide |
| `src/components/home/HomeSocialsSection.tsx` | Widen max-w, scale elements |
| `src/components/home/FeaturesSection.tsx` | Widen max-w, scale elements |
| `src/components/home/HeroSection.tsx` | Fix arrow (remove mouse/key listeners), scale hero for ultrawide |
| `src/components/Navigation.tsx` | Add idle glow sequence with color-matched text-shadows |

