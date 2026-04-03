

# Plan: Consolidate Homepage + Smart Idle Glow

Two changes: (1) inline all homepage sections into `Home.tsx` with unified spacing, and (2) make the navbar idle glow only highlight inactive pages.

## 1. Consolidate Homepage

Move all content from HeroSection, AboutSection, HomeSocialsSection, and FeaturesSection directly into `Home.tsx`. Delete the four component files.

**Structure:**
```text
<PageWrapper>
  <section min-h-screen>  ← Hero (parallax, avatar, scroll arrow)
  <section py-12 lg:py-16 px-6>  ← Single container
    <div max-w-5xl 3xl:6xl 4xl:7xl mx-auto space-y-16 lg:space-y-20>
      [About block]
      [Socials block]
      [Features block]
    </div>
  </section>
</PageWrapper>
```

Internal spacing tightened: socials/features row gaps `space-y-10 sm:space-y-12 lg:space-y-16`, intro text margins `mb-8 lg:mb-10`.

## 2. Smart Idle Glow (Inactive Pages Only)

Currently the glow cycles through indices 0 (brand), 1 (Commands), 2 (Quotes) regardless of which page you're on.

**New behavior:** Build a filtered list of "glowable" items based on the current route. Each nav element (brand = `/`, Commands = `/commands`, Quotes = `/quotes`) is only eligible for the glow if its path does NOT match the current `location.pathname`.

- On `/` (home): brand text is hidden anyway + is the active page, so glow only cycles between Commands and Quotes.
- On `/commands`: glow cycles between LaymanLouie and Quotes.
- On `/quotes`: glow cycles between LaymanLouie and Commands.

Implementation: create an array of eligible glow indices filtered by `!isActive`, then cycle through only those indices. The `getGlowStyle` function checks if the current `idleGlowIndex` matches a given nav element's index -- only eligible items will ever be set as the active glow index, so active pages never glow. The cycle timing stays the same (1.5s per step), just with fewer steps per cycle.

## Files Changed

| File | Change |
|---|---|
| `src/pages/Home.tsx` | Rewrite: inline all section content with unified spacing |
| `src/components/Navigation.tsx` | Filter glow sequence to only inactive pages |
| `src/components/home/HeroSection.tsx` | Delete |
| `src/components/home/AboutSection.tsx` | Delete |
| `src/components/home/HomeSocialsSection.tsx` | Delete |
| `src/components/home/FeaturesSection.tsx` | Delete |

