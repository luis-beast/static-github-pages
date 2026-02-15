

# Fix: Scroll to Top on Page Refresh

## Problem
When the user refreshes the browser, the page stays at its previous scroll position instead of scrolling to the top. The existing `useLayoutEffect` in `PageWrapper` only runs on component mount during client-side navigation, but on a full page refresh the browser restores the previous scroll position after the component mounts.

## Solution

**File: `src/App.tsx`** -- Add a one-time scroll-to-top effect at the app root level.

Add a `useLayoutEffect` at the top of the `AppContent` component that runs once on initial mount, calling `window.scrollTo(0, 0)`. This fires before the browser's scroll restoration can kick in.

Additionally, set `history.scrollRestoration = 'manual'` to prevent the browser from automatically restoring the previous scroll position on refresh.

```tsx
// Inside AppContent component
useLayoutEffect(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
}, []);
```

This is a small addition to one file. The `PageWrapper` scroll logic remains unchanged for client-side navigation.

