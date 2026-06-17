# Practicaly AI landing page — build and review notes

A from-scratch, high-craft landing page. Content truth is taken from the
reference (practicaly.ai); the visual design owes it nothing. The only
inherited things are the brand palette and the Space Grotesk typeface.

## Design direction: "Signal in the Forest"

- Deep forest canvas (`#0B241E`) with chartreuse lime (`#C8F250`) as the single
  loud focal accent, mint (`#27EAA6`) and periwinkle (`#A5A2FB`) as support,
  cream (`#EAF3EC`) ink. No purple-on-black, no blue glow.
- Space Grotesk throughout. Hierarchy comes from weight, scale, and tracking,
  not many families. JetBrains Mono for technical micro-labels.
- Asymmetric layouts on an 8px rhythm. Hero is left-weighted, not centered.
- One easing language (expo-out `[0.16, 1, 0.3, 1]`), staggered reveals, full
  `prefers-reduced-motion` support.
- Signature moment: "The Fluency Field", an interactive canvas of nodes
  (people). The pointer pulls nearby nodes into lime and threads connections,
  a network becoming AI fluent. Paired with a word-reveal headline where
  "1 Billion" is the lime focal point, and an odometer counting to 1,000,000,000.

## 21st.dev Magic MCP usage

- `21st_magic_component_inspiration`: browsed interactive heros and logo
  marquees. The "Hero Odyssey" shader confirmed the canvas + rAF + stagger
  structure (its blue/purple lightning was rejected as anti-slop, so the field
  was re-authored in brand greens). "Logo Cloud 4" (InfiniteSlider +
  ProgressiveBlur) is the basis for the marquee in `marquee.tsx`.
- `logo_search` (SVGL): the tool returned empty and svgl.app was blocked in the
  sandbox, so the real SVGL and Simple Icons SVGs were pulled from their
  canonical GitHub sources and normalized to `currentColor`
  (`src/lib/brand-marks.ts`). HeyGen is not in either registry, so its mark was
  authored in-house.
- `21st_magic_component_builder` / `refiner`: exercised; the upstream was
  overloaded at build time, so the polish they would suggest (button shine
  sweep, inner highlight, tactile hover) was applied by hand to the primary
  subscribe action. No first-generation raw component was shipped.

## Screenshot review passes

- **Pass 1** (desktop + mobile): hero, palette, type, and motion read well.
  Found a large empty void mid-page: `whileInView` sections sat at opacity 0
  because the full-page capture never scrolled them into view. Fixed the
  capture script to scroll and trigger reveals (the page itself behaves
  correctly for real users). Disabled the Next dev indicator for clean shots.
- **Pass 2**: News, Labs, testimonials, and footer all confirmed rendering and
  composed. Flagged a content-accuracy issue: the hero counter implied a real
  "412M people made fluent" metric, which the source never claims. Reframed it
  as the mission target counting to 1,000,000,000.
- **Pass 3**: Gave the Fluency Field a faint always-on lattice so it reads as a
  living network before pointer interaction, and added the button shine.
  Verified counter and mobile fit.
- **Accessibility pass**: caught a hydration mismatch under
  `prefers-reduced-motion` (framer-motion's `useReducedMotion` differs between
  server and first client paint). Replaced it with an SSR-safe
  `useSyncExternalStore` hook (`src/lib/use-reduce-motion.ts`). Re-tested:
  0 page errors, all content visible under reduced motion.

## Definition of done

- `npm run build` and `npm run lint` pass clean. 0 console errors at desktop
  (1440px) and mobile (390px), and 0 hydration errors under reduced motion.
- Semantic HTML, keyboard focus-visible states, alt/aria text, reduced-motion
  fallbacks, AA-contrast cream-on-forest text.
- No em dashes in site copy or these notes.

Screenshots of the final result are in `docs/screenshots/`.
