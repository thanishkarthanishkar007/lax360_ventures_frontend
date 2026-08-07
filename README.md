# LAX360 Ventures — Product Showcase + SaaS Business Website

A single-page-app React frontend for LAX360 Ventures: a SaaS product-suite
marketing site with a cinematic intro, a real 3D globe hero visual, and a
gated Contact-first flow, in a premium purple/white theme.

## Stack
- **React 19 + Vite**
- **React Router** — intro → `/contact` gate → `/` home flow
- **Tailwind CSS** — violet/void/paper design tokens
- **Framer Motion** — scroll reveals, count-up stats, marquees, the
  cinematic intro sequence
- **three.js + @react-three/fiber + @react-three/drei** — the real 3D
  rotating globe in the hero
- **lucide-react** icons

## First-load flow (as requested)
1. **Cinematic intro** (~7s, skippable): dark screen → grid emerges →
   purple light streaks → particles converge into the LAX360 Ventures logo
   → tagline "Empowering Businesses Through Intelligent Digital Solutions"
   fades in → the whole scene zooms forward and fades out.
2. User is routed to **`/contact`** first — a minimal gate page showing
   *only* the "Book your demo" form card, centered on the dark background.
   A small "×" skip button sits in the top-right corner for anyone who
   wants to bypass it.
3. Submitting the form shows a success state, then auto-advances to
   **`/`** (Home) after ~1.8s, with a manual "Continue to Home →" link too
   in case someone doesn't want to wait.

The intro plays once per app load (component-state gated, not
`sessionStorage`-persisted) — refreshing the page replays it. If you'd
rather it only ever plays once per browser, say so and I can wire that up
with `sessionStorage`.

## The 3D globe (`src/components/Globe3D.jsx`)
- A real WebGL globe (not CSS) built from a dotted point-cloud sphere.
- Curved network arcs connect four points on the globe.
- Four icons — **CRM, Hospital, AI, Cloud** — hover just above their
  anchor points and gently bob, as HTML overlays anchored to 3D
  coordinates.
- The whole globe auto-rotates; camera is static (a full scroll/drag-zoom
  camera can be added with `OrbitControls` from `@react-three/drei` if you
  want it interactive instead of ambient).
- It's **lazy-loaded** (`React.lazy` + `Suspense`) so the ~900KB three.js
  chunk only downloads once the Hero mounts, keeping the initial bundle
  light. A spinning-ring placeholder shows while it streams in.

## Getting started
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview
```

## Notes
- Company/product names, stats, and testimonial quotes are original
  placeholders — see `TrustedBy.jsx`, `Products.jsx`, `Statistics.jsx`,
  `Testimonials.jsx`.
- Contact/demo forms are client-side only (show a success state); wire
  `handleSubmit` in `src/components/Contact.jsx` to a real API.
- Fully responsive (375px+), respects `prefers-reduced-motion` for the CSS
  animations (the WebGL globe keeps rotating regardless, as is standard
  for canvas content).

## Update log (latest)
- **Logo**: replaced the placeholder shield SVG with the real uploaded
  LAX360 logo (`public/logo.png`, background auto-removed for
  transparency). It now shows in the cinematic intro, navbar, and footer.
- **Demo form card**: widened and re-spaced (`DemoForm.jsx`) to match the
  reference screenshot's proportions.
- **CTAs**: removed "Start Free Trial" everywhere — Navbar, Hero, and the
  Contact CTA banner now show a single "Get Demo" action.
- **About Us**: new section (`AboutUs.jsx`, `#about`) added to the Home
  page between "Trusted By" and "Products", linked from the navbar.
- **Features**: "Features" in the navbar now routes to a dedicated
  `/features` page (`FeaturesPage.jsx`) instead of scrolling — it reuses
  the platform's value props in a fuller 8-feature grid, with its own
  "Get Demo" CTA at the bottom.
- Navbar is now router-aware: section links (About/Products/Industries/
  Customers) smooth-scroll on the home page, but navigate home first (via
  route state) if you click them from `/features` or `/contact`.

## Update log (cinematic intro)
- Replaced the particle-converge logo assembly with a **smoke reveal
  animation** (`CinematicIntro.jsx`): violet/indigo smoke drifts in from
  the left, rose/crimson smoke drifts in from the right, both converge on
  center with a bright flash, then dissolve to reveal the LAX360 logo —
  matching the 5-stage reference (appear from sides → drift to center →
  converge/flash → shield & letters become visible → smoke fades out).
- Built entirely with CSS blur + `mix-blend-mode: screen` + Framer Motion
  (no video/image assets needed), so it stays lightweight and easy to
  retime — all durations and colors are in the `SMOKE_BLOBS` array and the
  `useEffect` timer list at the top of the file.

## Correction (Hero visual only — intro left untouched)
The cinematic intro was reverted back to the original particle-converge
version. The **smoke reveal animation was applied to the Home page Hero's
circular rotation graphic instead** (`SmokeReveal.jsx` replaces the old
`Globe3D.jsx`):
- Violet/indigo and rose/crimson smoke now drifts continuously inside the
  same circular stage the globe used to occupy, with the logo breathing
  at the center as if the smoke keeps revealing it.
- The four floating product chips (CRM, Hospital, AI, Cloud) are kept,
  now as simple bobbing CSS/Framer Motion elements instead of 3D-anchored
  HTML overlays.
- `three`, `@react-three/fiber`, and `@react-three/drei` have been
  removed from `package.json` since nothing uses WebGL anymore — the
  production bundle dropped from ~1.3MB to ~420KB as a result.

## Update log (nav restructure + magnetic hover)
- **Navigation**: every nav item now opens its own dedicated page instead
  of scrolling to a section on Home — `/about`, `/products`,
  `/industries`, `/teams`, `/customers`, `/contact`. The old
  scroll-to-section + cross-page `location.state` plumbing was removed.
- **"Features" → "Teams"**: the old `/features` page is gone; `/teams`
  (`TeamsPage.jsx`) is a new team-showcase page with 8 member cards and a
  "we're hiring" CTA.
- **"Contact Us" added** to the main nav list, pointing at the existing
  `/contact` demo-request page (separate from the "Get Demo" pill button,
  same destination, different visual weight — standard SaaS-nav pattern).
- Home page content is unchanged — all sections (About, Products,
  Industries, Testimonials, etc.) still live there too; the dedicated
  pages reuse the same section components under a page-specific header
  (`PageHeader.jsx`) rather than duplicating content by hand.
- **Magnetic hover animation**: replaced the smoke-reveal Hero visual with
  `MagneticLogo.jsx` — the logo is pulled toward the cursor with spring
  physics (clamped drift, proximity-based glow + scale), a pulsing cursor
  ring follows the pointer, and everything eases back to idle on mouse
  leave, matching the reference's 5-stage behavior (idle → cursor
  approaches → attraction → glow & scale → return to idle).

## Update log (Contact split, real clients, studio-lighting intro)
- **Contact Us vs Book Demo are now two separate pages**:
  - `/contact` — new dedicated Contact Us page (`ContactPage.jsx`): office
    address, email, phone, business hours, an embedded Google Map, and
    social links. Has a small "Prefer to book a demo instead?" link
    through to `/book-demo`.
  - `/book-demo` — the original demo-request form gate page (renamed from
    the old `ContactPage.jsx` to `BookDemoPage.jsx`, content unchanged).
    This is also where the cinematic intro now routes to, and where every
    "Get Demo" button (Navbar, Hero, Products) points.
  - Update the map location/address in `ContactPage.jsx`'s `DETAILS`
    array and the `iframe src` once you have a real office address.
- **Customers section**: removed the star-rating display entirely.
  `TrustedBy.jsx` and `Testimonials.jsx` now showcase real target-client
  types — Apollo Clinic, XYZ Hospital, ABC College, DEF School, GHI
  Clinic — each testimonial card carries an icon "logo" badge (hospital
  icon for clinics, graduation cap for schools/colleges) instead of a
  star rating.
- **Cinematic intro rebuilt** to match the "studio lighting" reference
  video: dark stage with a glossy floor, a volumetric spotlight cone
  descending from above with drifting dust motes, the logo emerging in
  the light with a soft floor reflection, then a slow push-in before
  handing off to the app. Still ~7.5s, still skippable.

## Update log (intro reverted, Home nav, Vision section)
- **Cinematic intro reverted** back to the original particle-converge
  version (dark screen → grid → purple light streaks → particles
  converge into the logo → tagline → zoom exit). The studio-lighting
  spotlight version has been removed.
- **"Home" added to the navbar** as the first item, linking to `/`.
- **New "Vision" section** (`Vision.jsx`) added to the About Us page,
  under the existing About content — a forward-looking mission statement
  plus three pillars (Global reach, AI-native products, One unified
  platform).

## Update log (faster intro, video hero background)
- **Cinematic intro is ~1s faster** — total runtime trimmed from ~7.2s to
  ~6.2s by tightening the gap between each stage (still the particle-
  converge version, just snappier pacing). Timings live in the
  `useEffect` timer list at the top of `CinematicIntro.jsx` if you want to
  adjust further.
- **Home page Hero now has a video background**: the uploaded studio-
  lighting logo reveal clip plays muted/looped behind the Hero content
  (`public/videos/hero-bg.mp4`), dimmed with the existing violet-glow +
  grid overlays on top so the text stays readable. Swap the file at that
  path to change the footage — no code changes needed as long as the
  filename stays `hero-bg.mp4`, or update the `<source>` path in
  `Hero.jsx` if you rename it.

## Update log (Hologram Materialization animation)
Replaced the magnetic-hover logo with a premium **Hologram
Materialization** sequence (`HologramLogo.jsx`), keeping the existing
circular stage, ambient blobs, starfield, ground glow, dashed ring, and
floating product chips untouched:
1. Logo starts fully invisible.
2. A holographic grid fades in at the center.
3. Blue/violet scan lines sweep across it.
4. ~70 glowing particles converge inward from all directions.
5–7. An SVG wireframe shield draws its outline, then the "L" and "A"
   strokes draw in with a glowing stroke animation.
8. The wireframe crossfades into the real full-color logo.
9. A light sweep passes left-to-right across the revealed logo.
10–11. A soft purple bloom/glow settles in, and the logo breathes gently
   at idle (subtle scale/float loop).
12. On hover: glow intensifies, the logo scales to 1.05 and lifts
   slightly, and a pulsing energy ring loops outward.

Built entirely with Framer Motion + inline SVG `pathLength` animation +
Tailwind — no video/image assets, no three.js, GPU-friendly transforms
(opacity/scale/translate) throughout for smooth 60fps playback.

## Update log (Mobile Number field + real backend wiring)
- The "Book a Demo" form (`DemoForm.jsx`) now has a **Mobile Number**
  field, and submits a real `POST` to the backend at
  `${VITE_API_BASE_URL}/api/demo-requests` (defaults to
  `http://localhost:8080` — see `.env.example`). Shows a proper loading
  state and surfaces backend validation/error messages instead of just
  faking success.
- Companion backend: see the separate `lax360-backend` project (Java +
  Spring Boot + MongoDB Atlas + Resend), built to deploy on Render.
  Set `VITE_API_BASE_URL` to your deployed Render URL once it's live.

## Fix: 404 on refresh for any route other than "/" (Vercel)
Added `vercel.json` with a catch-all rewrite:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
**Root cause:** Vercel was serving files by exact path match with no SPA
fallback. `/` maps to `index.html` directly, so it (and refreshing it)
always worked. Nested routes like `/customers`, `/about`, `/products`
only exist client-side once React Router reads the URL after
`index.html` loads — clicking a nav link works because React Router
intercepts it in the browser, but a hard refresh sends a real request to
Vercel for that exact path, which had no matching file → 404. This
rewrite tells Vercel to always serve `index.html` for any path and let
React Router take over from there, so refreshing any route now works.

## Update log (Vision/Mission content + full Industries list)
- **About page**: "Our Vision" and "Our Mission" now use the exact
  provided copy, restructured into two full-width statement cards
  (`AboutUs.jsx`) instead of the old cramped 3-up pillar grid, since the
  new text is much longer.
- **Industries**: expanded from 6 to the full 14-industry list
  (Healthcare, Education, Finance, Banking, Retail, Manufacturing,
  Logistics, Real Estate, Hospitality, Construction, Insurance,
  Government, Startups, E-commerce) in a compact icon-tile grid
  (`Industries.jsx`).

## Update log (navbar bleed-through fix + Industries hover cards)
- **Fixed navbar transparency bug**: the navbar previously had NO
  background at all until you scrolled (`scrolled` was false at the top
  of every page), so large page headings sitting right underneath —
  like the Industries page's "Built to flex across sectors." — showed
  straight through it. The navbar now always renders with an opaque
  `bg-void/95 backdrop-blur-xl` background on every page, at every scroll
  position, so nothing behind it is ever visible again.
- **Industries cards now reveal a description on hover/tap**
  (`Industries.jsx`): each of the 14 cards shows just an icon + name by
  default; hovering (or tapping, for touch devices — both are wired up)
  smoothly expands a short one-line description with a fade + height
  animation, plus a small arrow indicator that slides in to signal the
  card is interactive.
