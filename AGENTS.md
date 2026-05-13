# IsItABuy — AI-Powered Shopping Advisor

## Project Overview

IsItABuy is a Next.js web application that provides AI-driven shopping verdicts. Users can search for products, paste URLs, or scan barcodes to receive independent, commission-free buy/wait/avoid recommendations based on price history, review quality, specifications, and alternatives.

The project is currently a frontend-only prototype with static demo data. It consists of a marketing landing page (`/`) and a search results page (`/search`).

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | [Next.js](https://nextjs.org) | 16.2.6 |
| UI Library | [React](https://react.dev) | 19.2.4 |
| Language | [TypeScript](https://www.typescriptlang.org) | ^5 |
| Styling | [Tailwind CSS](https://tailwindcss.com) | ^4 |
| Icons | [Material Symbols](https://fonts.google.com/icons) (Google Fonts) |
| Font | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts) |
| Linting | [ESLint](https://eslint.org) ^9 + `eslint-config-next` |

## Project Structure

```
├── app/                          # Next.js App Router (src-less structure)
│   ├── components/               # React components (flat, no sub-folders)
│   │   ├── ExtensionCTA.tsx      # Browser extension promo section
│   │   ├── FilterSidebar.tsx     # Search filters (client component)
│   │   ├── Footer.tsx            # Site footer
│   │   ├── HeroSection.tsx       # Landing page hero + search input
│   │   ├── Navbar.tsx            # Top navigation bar
│   │   ├── ProductCard.tsx       # Product result card (client component)
│   │   ├── SearchHeader.tsx      # Search page nav + search input
│   │   └── VerdictSection.tsx    # Landing page demo verdict showcase
│   ├── search/
│   │   └── page.tsx              # /search route
│   ├── favicon.ico
│   ├── globals.css               # Tailwind theme, custom utilities, animations
│   ├── layout.tsx                # Root layout with metadata + font loading
│   └── page.tsx                  # Landing page (/)
├── public/                       # Static assets (SVGs)
├── next.config.ts                # Next.js config (empty/default)
├── tsconfig.json                 # TypeScript config
├── postcss.config.mjs            # PostCSS config (Tailwind v4 plugin)
├── eslint.config.mjs             # ESLint flat config
└── package.json
```

## Build and Development Commands

All commands use `npm` (lockfile is `package-lock.json`):

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Code Style Guidelines

### TypeScript
- Strict mode enabled (`"strict": true` in `tsconfig.json`).
- 
TypeScript path aliases: `@/*` maps to `./*`.
- Prefer explicit interfaces for component props (e.g., `ProductCardProps`).
- Client components must include `"use client";` at the top.

### React & Components
- Default exports are used for all page and component modules.
- Components are functional and typed with implicit return types.
- Props are destructured in the function signature.

### Styling (Tailwind CSS v4)
- Tailwind v4 uses `@import "tailwindcss";` and `@theme` blocks in `globals.css` instead of a traditional `tailwind.config.js`.
- Custom theme tokens (colors, spacing, shadows, typography) are defined inside `@theme`.
- Custom utility classes (e.g., `.text-display-xl`, `.shadow-premium`) are defined in `globals.css` after the `@theme` block.
- Color naming follows Material Design 3 conventions: `surface`, `on-surface`, `surface-container`, `primary-container`, `outline`, `error`, etc.
- Verdict colors: `verdict-buy` (#16a34a), `verdict-wait` (#f59e0b), `verdict-avoid` (#dc2626).

### Icons
- Use Google Material Symbols Outlined via a `<link>` in `layout.tsx`.
- Icons are rendered as `<span className="material-symbols-outlined">icon_name</span>`.
- Filled variants use the additional `.filled` class.

## Testing Instructions

There are currently **no automated tests** in this project (no Jest, Vitest, Playwright, or Cypress configurations present). Testing is manual:

1. Run `npm run dev`.
2. Open `http://localhost:3000` to verify the landing page.
3. Navigate to `http://localhost:3000/search` to verify the search results page.
4. Resize the browser to test responsive breakpoints (mobile, tablet, desktop).

If you add tests, place them alongside the relevant modules or in a top-level `__tests__/` directory and wire them into `package.json` scripts.

## Deployment

The project is configured for static or serverless deployment on [Vercel](https://vercel.com) (the platform built by the creators of Next.js).

- `next.config.ts` is currently empty (default config). Add `output: "export"` if you need a fully static export.
- No environment variables or secrets are currently used (`.env` is gitignored but not required for the prototype).

## Security Considerations

- No API keys, authentication, or backend logic exist yet.
- All product images are loaded from external sources (`images.pexels.com`). If moving to production, consider adding a `Content-Security-Policy` and restricting `img-src`.
- The `.env` file is gitignored. If secrets are added later, ensure they are never exposed to the client bundle.
- No user input is currently processed by a backend; the search inputs are purely presentational.

## Notes for AI Agents

- This is **Next.js 16** with the **App Router**. Do not assume Pages Router conventions.
- Tailwind CSS is **v4**; there is no `tailwind.config.js`. Theme customization happens inside `globals.css` via `@theme`.
- The codebase is English-only (comments, variable names, UI copy).
- Before adding new Next.js APIs, consult the local docs in `node_modules/next/dist/docs/` because this version may have breaking changes relative to older training data.
