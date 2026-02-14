

# Plan: Layout, UX, and Bug Fixes

## 1. Widescreen Layout - Remove Container Max-Width Cap

**Problem**: The Tailwind `container` is capped at `1400px` (`2xl`), wasting space on larger monitors.

**Changes**:
- **`tailwind.config.ts`**: Remove the `container.screens["2xl"]` cap entirely, or raise it significantly. Add custom breakpoints for `3xl` (1920px) and `4xl` (2560px).
- **`src/pages/Commands.tsx`** and **`src/pages/Quotes.tsx`**: Change the grid from `grid-cols-1 lg:grid-cols-2` to `grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3`. Also change the filter bar's `max-w-5xl` to match (e.g., `max-w-none` or a wider constraint).
- **`src/components/CommandFilters.tsx`**: Change `max-w-5xl` to match the new grid width approach.
- **Global**: Replace all `max-w-5xl mx-auto` constraints on content grids with a responsive approach that grows with viewport. Keep `container mx-auto px-4` for horizontal padding so there's always side spacing.

## 2. Three-Column Grid for Commands and Quotes

**Changes in `src/pages/Commands.tsx`**:
- Grid classes: `grid-cols-1 md:grid-cols-2 3xl:grid-cols-3`
- When a command is focused (expanded with `col-span-2`), on 3xl it should use `3xl:col-span-3` to span all columns.

**Changes in `src/pages/Quotes.tsx`**:
- Grid classes: `grid-cols-1 md:grid-cols-2 3xl:grid-cols-3`

## 3. Clear Button on Search Inputs

**Changes in `src/pages/Quotes.tsx`** and **`src/components/CommandFilters.tsx`**:
- Add an `X` (clear) button inside the search input container that appears when the input has text.
- Positioned absolute on the right side of the input (like the Search icon is on the left).
- Clicking it clears the search query. Uses the `X` icon from lucide-react with a subtle hover effect.

## 4. ScrollRevealSection - Animate Only Once

**Changes in `src/components/home/ScrollRevealSection.tsx`**:
- Simplify to use `useInView` with `once: true` only.
- Remove the "reset when scrolled above" logic entirely. Once revealed, it stays revealed.

## 5. Fix: Scroll Past Filtered Content

**Problem**: When filtering commands, the page height doesn't shrink because `AnimatePresence mode="popLayout"` keeps exiting elements in the layout flow.

**Changes in `src/pages/Commands.tsx`**:
- Change `AnimatePresence mode="popLayout"` to `mode="sync"` or simply remove the `mode` prop.
- Remove `layout` and `layoutId` from the individual command `motion.div` wrappers. These are causing the grid to reserve space for exiting items and creating blank spots.
- Use simpler `initial`/`animate`/`exit` opacity transitions without layout animations.

## 6. Fix: Blank Spots / Wrong Order in Grid

**Problem** (shown in screenshot): Cards render with gaps - e.g., card #62 appears alone on the right while #1 and #2 are on the left. This is caused by `layout` + `layoutId` props combined with `AnimatePresence mode="popLayout"`, which tries to animate layout positions and can leave "phantom" space.

**Fix** (same changes as item 5):
- Remove `layout` and `layoutId` from command card wrappers in both `Commands.tsx` and `Quotes.tsx`.
- Use `mode="wait"` or no mode on `AnimatePresence` so items don't overlap during transitions.
- This eliminates the spring-based layout animations that cause positional glitches, trading them for clean fade transitions.

## 7. Clean Up Unused Tailwind Config

While editing `tailwind.config.ts`:
- Remove the `sidebar` color tokens (sidebar was deleted previously).
- Remove the `accordion-down`/`accordion-up` keyframes and animations (accordion component was deleted).

---

## Technical Summary of File Changes

| File | Changes |
|---|---|
| `tailwind.config.ts` | Remove container 2xl cap, add 3xl/4xl breakpoints, remove sidebar colors and accordion animations |
| `src/pages/Commands.tsx` | Responsive 3-col grid, remove layout/layoutId, fix AnimatePresence mode, widen max-w constraints |
| `src/pages/Quotes.tsx` | Responsive 3-col grid, remove layout/layoutId, fix AnimatePresence mode, widen max-w constraints |
| `src/components/CommandFilters.tsx` | Widen max-w constraint to match grid |
| `src/components/home/ScrollRevealSection.tsx` | Simplify to `once: true`, remove reset logic |
| `src/pages/Commands.tsx` + `src/pages/Quotes.tsx` | Add clear (X) button to search inputs |

