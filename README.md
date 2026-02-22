# Kotlin Reforge Landing Page

Landing page for **Kotlin Reforge**, an initiative focused on modernizing legacy Android apps through Kotlin ports, architecture improvements, and redesign work.

This repository contains a Next.js site that showcases the initiative, project case studies, process, impact, and contribution paths.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- `next-themes` for light/dark mode
- `lucide-react` for icons

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Install and Run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

### Production Build

```bash
pnpm build
pnpm start
```

## Project Structure

```text
app/
  layout.tsx        # global metadata, fonts, theme provider
  page.tsx          # page composition
  globals.css       # design tokens + global styles

components/landing/
  navbar.tsx
  hero.tsx
  projects-section.tsx
  project-card.tsx
  coming-soon-card.tsx
  approach-section.tsx
  stats-bar.tsx
  cta-footer.tsx

public/images/
  *.jpg             # showcase screenshots used in cards/hero
```

## Content Editing Guide

### Update project cards

Edit `components/landing/projects-section.tsx`.

- Project name/category/summary
- Wins (bullet points)
- Repository links
- Screenshot arrays (`showcaseImages`)

### Update stats

Edit `components/landing/stats-bar.tsx`.

### Update hero / messaging

Edit `components/landing/hero.tsx`.

### Update CTA and footer

Edit `components/landing/cta-footer.tsx`.

### Update theme and visual tokens

Edit `app/globals.css`.

### Update SEO metadata

Edit `app/layout.tsx`.

## Adding Screenshots

1. Add files to `public/images/`.
2. Reference them from `showcaseImages` in `components/landing/projects-section.tsx`.
3. Keep clear naming and consistent dimensions when possible.

## Implementation Notes

- `next.config.mjs` currently has:
  - `typescript.ignoreBuildErrors: true`
  - `images.unoptimized: true`
- The `lint` script exists (`eslint .`), but ESLint is not currently listed in `devDependencies`.

## Scripts

- `pnpm dev` - run development server
- `pnpm build` - create production build
- `pnpm start` - run production server
- `pnpm lint` - run lint (requires ESLint setup)

## License

No license file is currently included in this repository.
