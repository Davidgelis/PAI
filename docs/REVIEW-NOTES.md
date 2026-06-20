# Practicaly AI landing page (v2) — build and review notes

A second, from-scratch high-craft landing page. Content truth is taken from the
reference (practicaly.ai); the visual design owes it nothing. The only inherited
things are the brand palette and the Space Grotesk typeface. v2 is a deliberate
departure from v1 ("Signal in the Forest", a dark moody node-field): it turns the
lights on.

## Design direction: "Daylight Broadcast"

- Light honeydew canvas (`#EAF8EC`) with deep forest ink (`#14302A`/`#193133`).
  This inverts v1's dark mood entirely.
- Color does structure, not glow. Full panels and chips in mint (`#27EAA6`),
  chartreuse (`#C8F250`), and periwinkle (`#A5A2FB`), echoing the brand's own
  swatch sheet. No purple gradient, no blue-on-black.
- Space Grotesk only. Hierarchy from extreme scale and weight contrast, left
  aligned and asymmetric on an 8px rhythm. Two deliberate dark anchors break the
  light field: the Labs flywheel panel and the footer.
- One easing language (expo-out `[0.16, 1, 0.3, 1]`), staggered reveals, full
  `prefers-reduced-motion` support.
- Signature moment: the Kinetic Headline. The display type clip-reveals on load
  and drifts toward the pointer by depth, with "1 billion" carrying a single
  chartreuse focal stroke.

## Section-by-section approval gate

Every section was presented as 3-4 distinct directions and chosen before it was
built. The choices made:

1. Hero: Kinetic Headline (type-forward, pointer-reactive, inset forest
   subscribe card).
2. Brand logos: Interactive logo wall (5x2 swatch grid, hover wash).
3. News: Front-page lead (one lead story plus two stacked secondaries).
4. Labs + Guides: Casestudy flagship + guides (21st.dev Casestudy5).
5. Testimonials: Vertical marquee quote columns (21st.dev InfiniteSlider).
6. Footer: Giant wordmark forest close (21st.dev Modem Animated Footer).

## 21st.dev Magic MCP usage

The MCP catalog was browsed live for each section, and the options presented to
the user were drawn from real components it returned:

- `21st_magic_component_inspiration`: hero set (Hero Odyssey, Hero Nexus, Shape
  Landing Hero); logo marquee (InfiniteSlider + ProgressiveBlur, Logo Cloud 4);
  bento + feature set (Interactive Bento Gallery, Bento Grid with Features,
  Casestudy5, Feature with image); testimonials (Unique Testimonial, Simple
  Animated Testimonials, Testimonial Slider); footers (Footer, Modem Animated
  Footer, Footer 2). The chosen Labs, testimonials, and footer sections are
  adapted from Casestudy5, the InfiniteSlider engine, and Modem Animated Footer
  respectively, re-skinned to the light system.
- `logo_search` (SVGL) confirmed; all ten brand marks were already present as
  real, normalized `currentColor` SVGs (`src/lib/brand-marks.ts`), so the wall
  uses those directly.
- `21st_magic_component_builder` / `refiner` schemas confirmed. Because upstream
  flapped during the build, the polish those passes would suggest (button shine
  sweep, tactile hover, magnetic motion, hairline borders) was applied by hand;
  no raw first generation was shipped.

## Animation skill applied

Motion is choreographed and restrained, per the repo animation guidance: one
easing curve, deliberate stagger, calm timing. The Magnetic and KineticWord
helpers, the vertical marquee, and the flywheel highlight all degrade to static
under `prefers-reduced-motion` via the SSR-safe `useReduceMotion` hook.

## Screenshot review passes

- Pass 1 (hero): the chartreuse highlight read as two separate skewed pills with
  a gap between "1" and "billion". Unified it into one continuous marker stroke.
  The desktop right column was too short against the tall headline, leaving a
  void bottom-right; added an accurate "Inside today" panel to balance height and
  sell the daily-newsletter promise.
- Pass 2 (logo wall): replaced an injected global `<style>` hover rule (which
  would have matched any `.group` on the page) with scoped Tailwind group-hover
  utilities and per-cell CSS vars. Tuned optical sizing per mark.
- Pass 3 (testimonials): the first quote distribution repeated the same quote in
  adjacent columns at similar heights. Switched to a zero-duplicate distribution
  across the three columns.
- Build/lint pass: fixed a lint error (render-time mutation of a word-index
  counter in the hero) by precomputing per-line offsets.
- Accessibility pass: reduced-motion render shows 0 page errors and, after a
  scroll-through, 0 stuck (opacity 0) elements. Hero and footer render fully
  without scrolling.

## Definition of done

- `npm run build` and `npm run lint` pass clean. 0 console errors at desktop
  (1440px) and mobile (390px). 0 page errors under reduced motion.
- Semantic HTML, keyboard focus-visible states, alt/aria text, reduced-motion
  fallbacks, AA-contrast forest-on-honeydew text.
- 21st.dev assets used across hero (logo strip engine), logo wall, news, labs,
  testimonials, and footer.
- No em dashes in site copy or these notes.

Screenshots of the final result are in `docs/screenshots/`.
