# Jot Bilkhu — website source

Jot's site ("I build owner-led businesses their entire operating system"), built by Tee's team, October 2026.
Live preview it was built from: https://jot-studio-v2.vercel.app

This repo is the full source. Any developer or AI agent (e.g. jot_klawbi_bot) can clone it, edit, and deploy.

## Run it

```bash
npm ci
npm run dev          # http://localhost:3000
npm run build        # static export → out/
```

Node 20+. Next.js 16 (static export), Tailwind 4, framer-motion (hover/magnetic only).

## Where things are

| You want to change | Edit |
|---|---|
| Any words on the site (name, phone, email, services, case studies, captions) | `data/site.ts`: all copy lives here, nothing is hard-coded in components |
| Colors, fonts, spacing (design system) | `app/globals.css`: pure black/white, Barlow Condensed (headings) + Inter (body) |
| Page order / which sections show | `app/page.tsx` |
| One section's layout | `components/<Section>.tsx` (HeroScrub, Day, Story, Work, Services, How, About, Closing, Footer, Nav, MobileBar) |
| Images | `public/`: `hero/` (hero frames), `concept/` (section art), `shots/` (product screenshots), `jot-headshot.jpg` |
| Page title, description, social preview | `app/layout.tsx` |

## Deploy

**Vercel (easiest):** import this repo at vercel.com/new. The framework is detected as Next.js, and the default build settings work.
- `vercel.json` currently sets **noindex**, because this was a preview. Remove the `X-Robots-Tag` header before going live on the real domain, so Google can index it.
- Point the domain at the new Vercel project.

**Any static host:** run `npm run build` and upload the `out/` folder.

## Rules that keep it working

- The hero is a scroll-pinned image sequence (`components/HeroScrub.tsx`). It uses **native scroll** on purpose. Don't add Lenis or other smooth-scroll libraries; they broke desktop scrolling in testing.
- In animated headings, keep the space **outside** each word's inline-block span, or the words run together ("Ibuildowner-led").
- Respect `prefers-reduced-motion`: the site already falls back to static content. Keep that when adding motion.
- After any change, check the page at **1440 px desktop and 390 px mobile** for horizontal overflow and readable text before deploying.
- Copy, contact details and case studies came from Jot's original site. Don't invent numbers, clients or claims.
