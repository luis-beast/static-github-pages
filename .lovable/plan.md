

# Fix: Footer Scroll-Reveal Animation

## Problem
The footer's `useInView` hook has `once: false`, causing it to fade in/out repeatedly every time you scroll past it. It should animate in once per page visit.

## Fix

**File: `src/components/Footer.tsx`** (line 11)

Change `once: false` to `once: true`:

```typescript
const isInView = useInView(footerRef, { once: true, margin: "-50px" });
```

This is a single-line change. Since the Footer remounts on each page navigation, it will still animate fresh on every new page -- just won't re-trigger when scrolling up and back down on the same page.

