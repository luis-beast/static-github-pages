

# Plan: Reduce Wasted Space on Homepage

The homepage has massive vertical padding between sections (`py-32` = 128px top+bottom, `py-24` = 96px) and large gaps between items (`space-y-32` = 128px on large screens, `mb-20` = 80px). On ultrawide, the content is narrow compared to available width, and the vertical spacing makes it feel very empty.

## Changes

### 1. Reduce Section Padding
- **`AboutSection.tsx`**: `py-32` → `py-16 lg:py-24` (halved)
- **`HomeSocialsSection.tsx`**: `py-24` → `py-16 lg:py-20`
- **`FeaturesSection.tsx`**: `py-32` → `py-16 lg:py-24`

### 2. Reduce Internal Spacing
- **`HomeSocialsSection.tsx`** and **`FeaturesSection.tsx`**: Reduce `mb-20` (intro text margin) to `mb-12 lg:mb-16`. Reduce `space-y-16 sm:space-y-24 lg:space-y-32` to `space-y-12 sm:space-y-16 lg:space-y-20`.
- **`AboutSection.tsx`**: Reduce blockquote bottom margin `mb-12 sm:mb-16 lg:mb-20` to `mb-6 sm:mb-8 lg:mb-10`.

### 3. Widen Socials & Features for Ultrawide
The alternating rows (icon + text) are capped at `max-w-5xl` (~1024px), which on a 3440px screen leaves ~70% of horizontal space empty. 
- **`HomeSocialsSection.tsx`** and **`FeaturesSection.tsx`**: The container already scales to `5xl:max-w-7xl`, but add `4xl:max-w-7xl` to kick in earlier at 2200px+, filling more width sooner.

## Files Changed

| File | Change |
|---|---|
| `src/components/home/AboutSection.tsx` | Reduce vertical padding and bottom margins |
| `src/components/home/HomeSocialsSection.tsx` | Reduce padding, item gaps, widen container earlier |
| `src/components/home/FeaturesSection.tsx` | Same as Socials |

