

# Plan: Arrow Position Fix & Glow Loop Fix

## What fixed the white flash
Removing `backdrop-blur` from `BaseCard`, `Navigation`, `CommandCard`, and `CommandFilters` in the previous round eliminated the expensive GPU compositing that caused the white flash during fast scrolling. The `background-attachment: fixed` on the body and `will-change: transform` on the glow div also helped.

## 1. Move Chevron Arrow Higher

**Problem**: `bottom-10` places the arrow too low, nearly off-screen.

**Change in `src/components/home/HeroSection.tsx`**:
- Change `className` from `absolute bottom-10` to `absolute bottom-[15vh]` — this places it roughly midway between the subtitle text and the screen bottom, and scales with viewport height.

## 2. Remove Pause Between Glow Loops

**Problem**: After the sequence (Brand -> Commands -> Quotes), `setIdleGlowIndex(null)` fires, then `startIdleTimer()` waits another 10 seconds before restarting. The user wants continuous looping with no gap.

**Change in `src/components/Navigation.tsx`**:
- In `startIdleTimer`, after the sequence completes (at `GLOW_STEP_DURATION * 3`), instead of setting index to `null` and calling `startIdleTimer()` (which adds a 10s delay), immediately restart the sequence by setting index back to `0` and scheduling the next cycle. This creates a seamless loop: `0 -> 1 -> 2 -> 0 -> 1 -> 2 -> ...` until interrupted.

## Files Changed

| File | Change |
|---|---|
| `src/components/home/HeroSection.tsx` | Change arrow position from `bottom-10` to `bottom-[15vh]` |
| `src/components/Navigation.tsx` | Loop glow sequence continuously without the 10s pause between cycles |

