# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build (output: dist/)
npm run preview  # Preview built site
```

No lint or test commands are configured.

## Architecture

**Astro 5 static site** (SSG) deployed to Cloudflare Pages. All pages pre-render to static HTML at build time — there is no server-side runtime.

- [src/pages/](src/pages/) — File-based routing. Each `.astro` file becomes a route. Blog posts are individual static `.astro` files (no CMS or dynamic routing).
- [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) — Single shared layout wrapping every page. Handles `<head>`, SEO meta tags, JSON-LD schema, Nav, and Footer.
- [src/components/](src/components/) — Nav, Footer, Icons (inline SVG library).
- [src/styles/global.css](src/styles/global.css) — Tailwind base imports + global overrides.

**External integrations (client-side only):**
- Contact form → Formspree (`https://formspree.io/f/xjgpvgle`) via `fetch`
- QA Check tool (`/qa-check`) → Google PageSpeed Insights API (no API key, public endpoint)

## Design System

Defined in [tailwind.config.mjs](tailwind.config.mjs). Brutalist aesthetic — thick borders, high contrast.

| Token | Value | Use |
|-------|-------|-----|
| `ink` | `#111111` | Primary text/dark bg |
| `cream` | `#f0ede6` | Light background |
| `paper` | `#e8e4dc` | Secondary bg |
| `yellow` | `#f5e642` | Primary CTA accent |
| `yellow-dark` | `#d4c30a` | Hover state |
| `muted` | `#777777` | Secondary text |

Fonts: **Space Grotesk** (body) and **Space Mono** (labels/metadata), loaded from Google Fonts via BaseLayout.

## Content & Language

All content is in **Bulgarian**. The site is a service business (buildify.bg) targeting Bulgarian SMBs. Services: websites, AI bots, plugins, QA testing. Blog posts are standalone static pages, not a data-driven collection.
