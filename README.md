# Jot Bilkhu - Custom Software Studio

A single, short reference page for business owners. Next.js 16 static export, React 19, Framer Motion, and native scrolling.

## Local development

Node 20.9+.

```sh
npm ci
npm run dev
npm run build
```

The build generates `out/` and refreshes `public/llms.txt`. No deployment or commit is part of local development.

The build uses Next's Webpack option because Turbopack stalled in the restricted
local environment. Fonts are bundled locally, so building needs no Google Fonts
connection. Font copyright notices and the OFL license are in `app/fonts/OFL.txt`.

## Editing

- `data/site.ts`: one exported `SITE` object containing all copy, image descriptions, links, contact details, and metadata. Change `PHONE_TEL` here to change the dialed number.
- `app/page.tsx`: semantic, server-rendered sections, in reading order.
- `components/RoomBackground.tsx`: four responsive room layers, scroll-driven dissolves, and warm-to-cool grading.
- `components/Motion.tsx`: progressive reveals, typewriter, process line, portrait, magnetic links, and card tilt.
- `app/globals.css`: responsive layout, Arvo / Fraunces / Inter (bundled through next/font/local) typography, grain and flow-line effects.
- `data/structured.ts`: Person, ProfessionalService, and five FAQ answers derived from the page copy.
- `scripts/generate-llms.mjs`: plain-text page summary from the same data object.

All text is readable in exported HTML. Reveals start only after hydration, remain at least 88% opaque, and settle after six seconds even if the observer fails. Missing IntersectionObserver leaves content visible. The typewriter reserves its entire layout and has a four-second completion fallback. Reduced motion selects the finished room in the picture's media sources before JavaScript, disables spatial movement and grain, and keeps simple fades. Only the initial room frame has high fetch priority; later frames and content images are lazy and dimensions are reserved.

Check 390px mobile and 1440px desktop, keyboard navigation, reduced motion, JavaScript disabled, image source selection, and the `#start` contact links after layout changes. No Lenis or scroll interception.

## Preview indexing

`SITE.SITE_LIVE` remains `false`, and `SITE.SITE_URL` remains `https://jot-studio-v3.vercel.app`. Page metadata remains `noindex, nofollow`; `vercel.json` independently supplies the same `X-Robots-Tag`. Robots and sitemap routes remain available. Going live is a separate, explicit decision.
