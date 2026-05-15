---
title: IsItABuy Project Memory
date: 2026-05-15
tags:
  - project/isitabuy
  - codebase-memory
  - nextjs
  - shopping-advisor
status: current
---

# IsItABuy Project Memory

Use this note as the high-context handoff for future work on this repo.

> [!important] Source of truth
> The live code has moved beyond [[AGENTS|AGENTS.md]]. AGENTS still says the app only has `/` and `/search`, but the current App Router tree has 18 static routes plus `_not-found`.

## Snapshot

- Repo path: `C:\Users\vicky\Desktop\bala-product-search`
- Product: IsItABuy, an AI-powered shopping advisor for buy/wait/avoid shopping verdicts.
- Framework: Next.js 16.2.6, App Router, no `src/` directory.
- React: 19.2.4.
- Language: TypeScript strict mode.
- Styling: Tailwind CSS v4 using `@import "tailwindcss";` and `@theme` in `app/globals.css`.
- Icons: Google Material Symbols are still loaded by a `<link>` in `app/layout.tsx` for legacy routes. Home-page UI now uses `lucide-react` in `SimpleNav`, `HeroSection`, `VerdictSection`, and `ExtensionCTA`.
- Fonts: Sora and Manrope from `next/font/google`.
- Runtime model: frontend-only prototype. No backend, no auth provider, no API routes, no database, no env vars.
- Data model: static demo data embedded directly in pages/components.
- Tests: none configured.
- Obsidian: repo root is an Obsidian vault because `.obsidian/` exists. The `obsidian` CLI was not available on PATH during this scan.

## UI Foundation

Installed on 2026-05-15 for screen-by-screen UI enhancement:

- Motion: `framer-motion`, `gsap`.
- shadcn/ui: initialized with current CLI preset `nova`, Radix base, Tailwind v4, RSC enabled, `lucide` icon library.
- shadcn config: `components.json`.
- shadcn utilities: `lib/utils.ts` with `cn()`.
- Global providers: `TooltipProvider` and `Toaster` wired in `app/layout.tsx`.
- shadcn theme variables are mapped back to the IsItABuy palette in `app/globals.css` so existing classes such as `bg-background`, `text-primary`, and `font-sans` stay aligned with the app.
- Important: preserve `text-secondary` as muted text. A shadcn token collision briefly made it a pale container color; root `--secondary` should remain `#575e70` for light mode.

Installed shadcn components:

`accordion`, `alert`, `alert-dialog`, `avatar`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `collapsible`, `command`, `dialog`, `drawer`, `dropdown-menu`, `field`, `input`, `input-group`, `label`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toggle`, `toggle-group`, `tooltip`.

## Commands

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run start
npm.cmd run lint
```

PowerShell blocks `npm.ps1` on this machine, so use `npm.cmd ...` unless execution policy changes.

## Verification State

Last checked: 2026-05-15 after compact landing verdict card refinement.

- `npm.cmd run build`: passes. Next generated 22 static pages.
- `npm.cmd run lint`: passes with 20 warnings and 0 errors.

Warnings:

- Many `@next/next/no-img-element` warnings because the prototype uses raw `<img>` instead of `next/image`.
- `app/layout.tsx:26` warns about the Google Material Symbols font link.
- `npm.cmd audit --omit=dev`: reports 2 moderate vulnerabilities through `next`'s nested `postcss`. The suggested `npm audit fix --force` would install a breaking/downgraded Next version, so do not run it blindly.

## Route Map

| Route | File | Purpose | Current implementation |
|---|---|---|---|
| `/` | `app/page.tsx` | Landing page | Composes `Navbar`, `HeroSection`, `VerdictSection`, `ExtensionCTA`, `Footer`. |
| `/search` | `app/search/page.tsx` | Product search results | Static products list with `SearchHeader`, `FilterSidebar`, `ProductCard`, `Footer`. |
| `/product` | `app/product/page.tsx` | Product detail verdict page | Sony WH-1000XM5 detail with gallery, verdict, scores, offers, sticky nav, bottom purchase panel. |
| `/compare` | `app/compare/page.tsx` | Search-style comparison picker | Client page with static `CompareProduct[]`, selected IDs state, `CompareProductCard`, `CompareFilterSidebar`, `CompareTray`. |
| `/compare-items` | `app/compare-items/page.tsx` | Final side-by-side comparison | Static comparison table for Sennheiser/Sony/Bose headphones. |
| `/alternatives` | `app/alternatives/page.tsx` | Rich alternatives page | Client page comparing Sony to Sennheiser and other headphone alternatives. |
| `/better-alternatives` | `app/better-alternatives/page.tsx` | Leaner alternatives variant | Similar to `/alternatives`; appears duplicated/older or alternate design. |
| `/deals` | `app/deals/page.tsx` | Deals list | Uses shared `SearchHeader` and `Footer`; filters, featured deal, deal cards. |
| `/deals-worth` | `app/deals-worth/page.tsx` | Deals list variant | Similar to `/deals`; custom nav and near-duplicate content. |
| `/best-laptops` | `app/best-laptops/page.tsx` | Category/ranking page | Client page for AI-ranked laptops with filters and product cards. Navbar labels this as "Extension" in some places, which is semantically wrong. |
| `/price-tracker` | `app/price-tracker/page.tsx` | Price history | Client/static Sony price chart placeholder and retailer comparison. |
| `/price-alerts` | `app/price-alerts/page.tsx` | Alerts dashboard | Active alerts, history, create-alert card, notification preferences, extension CTA. |
| `/watchlist` | `app/watchlist/page.tsx` | Saved products | Watchlist dashboard with stats, filters, saved cards, recommended actions, alert summary. |
| `/upload-receipt` | `app/upload-receipt/page.tsx` | Receipt upload flow | Seven-step workflow, upload dropzone, privacy consent, OCR status, matched products. |
| `/receipt-analysis` | `app/receipt-analysis/page.tsx` | Receipt results | Target order summary, savings opportunities, matched product analysis, refund/action cards. |
| `/concierge` | `app/concierge/page.tsx` | Chat/concierge UI concept | Client page with chat sidebar, example Breville answer, sticky input. |
| `/ai-chat` | `app/ai-chat/page.tsx` | More advanced assistant UI concept | Client page with saved verdicts, air fryer recommendation, product cards, right analysis panel. |
| `/preferences` | `app/preferences/page.tsx` | Account personalization | Shopping preferences, budget/rules, preferred retailers, blocked brands, categories, privacy profile. |
| `/signin` | `app/signin/page.tsx` | Auth marketing/login page | Static sign-in/create-account UI and social login buttons. |

## Shared Components

- `app/components/Navbar.tsx`: fixed landing navbar. Contains many product links and a `Get Started` link to `/search`.
- `app/components/SearchHeader.tsx`: search/results header used by many pages. Very large nav with many links plus a search hero. It is currently not interactive.
- `app/components/Footer.tsx`: shared footer with affiliate disclosure.
- `app/components/HeroSection.tsx`: client component. Holds `query` state and uses `useRouter()` to push to `/search?q=...`.
- `app/components/VerdictSection.tsx`: landing demo verdict card for Sony WH-1000XM5 with score cards.
- `app/components/ExtensionCTA.tsx`: browser extension promo section.
- `app/components/FilterSidebar.tsx`: client filter UI for `/search`; local state only, no actual filtering.
- `app/components/ProductCard.tsx`: search result card. Typed `Product` interface is local to component and duplicated in `/search`.
- `app/components/CompareFilterSidebar.tsx`: client filter UI for `/compare`; local state only.
- `app/components/CompareProductCard.tsx`: typed `CompareProduct` export plus card renderer.
- `app/components/CompareTray.tsx`: fixed bottom tray shown when selected products exist.

## Current Architecture Pattern

- Pages are mostly large static JSX files with embedded demo content.
- Interactive behavior is minimal and local:
  - `HeroSection` routes to `/search`.
  - `FilterSidebar` toggles local checkbox state only.
  - `ComparePage` toggles selected product IDs and feeds `CompareTray`.
  - `CompareFilterSidebar` manages checkbox/range state only.
  - `ConciergePage` and `AIChatPage` hold input value state only.
- No server components fetch data.
- No route handlers, server actions, API clients, local storage, auth sessions, or persistence.
- `metadata` exists on some static pages but is missing on most client pages.

## Styling System

Core theme lives in `app/globals.css`.

Important tokens:

- Colors: `surface`, `on-surface`, `surface-container-*`, `primary`, `primary-container`, `secondary`, `outline`, `error`.
- Verdict colors: `verdict-buy`, `verdict-wait`, `verdict-avoid`, `verdict-better`.
- Typography utilities: `.text-display-xl`, `.text-headline-lg`, `.text-headline-md`, `.text-body-lg`, `.text-body-md`, `.text-label-sm`.
- Spacing utilities: `.px-gutter`, `.px-margin-mobile`, `.py-stack-lg`, `.py-stack-md`, `.mb-stack-lg`, `.gap-gutter`, `.max-w-container-max`.
- Shadows: `.shadow-soft`, `.shadow-elevated`, Tailwind token shadows `shadow-premium`, `shadow-premium-hover`.
- Icon helper: `.material-symbols-outlined` plus `.filled`.

Watch for style drift:

- Some pages use one-off arbitrary colors heavily (`#16A34A`, `#F59E0B`, `#DC2626`, slate values) instead of theme tokens.
- Several class names appear to be used but are not defined in `globals.css`: `shadow-ambient-low`, `shadow-ambient-high`, `premium-shadow`, `verdict-shadow`, `card-shadow`, `custom-scrollbar`, `hide-scrollbar`, `no-scrollbar`, `docked`, `full-width`.
- Many page-level navbars duplicate `Navbar` or `SearchHeader` with slight variations.

## Product And UX Vocabulary

Recurring user-facing concepts:

- AI Buy Score
- Buy / Wait / Avoid verdicts
- Review Trust
- Price Score
- Value Score
- Quality Score
- Better Alternative
- Commission-free or "not based on commission"
- Price history and target alerts
- Receipt OCR, receipt analysis, price protection, refund help
- Watchlist, saved verdicts, personalization/preferences
- Browser extension for retailer sites

Main demo products:

- Sony WH-1000XM5: flagship example across landing, search, product, deals, alerts, watchlist, receipt analysis.
- Sennheiser Momentum 4: common better alternative.
- MacBook Air M3: wait/watchlist/deals example.
- Dyson V15: avoid/better alternative example.
- Ninja AF101 Air Fryer: chat/deals/receipt example.
- Breville Bambino Plus: concierge chat example.

## Current Nav Baseline

User requested a simple shared navigation menu:

- Logo text: `IsItABuy AI`
- Main nav: `How it Works`, `Deals`, `Best Products`, `Compare`, `Extension`
- Right nav: `Login`, `Get Started`

Implemented through `app/components/SimpleNav.tsx` for the landing page, SearchHeader-based pages, and the major standalone top-nav pages. `How it Works` links to `/#how-it-works`; `Extension` links to `/#extension`. The shared nav includes a compact mobile/tablet dropdown for the main links.

On very narrow widths, `Get Started` moves into the dropdown so the logo and menu do not clip. Desktop and tablet keep `Login` and `Get Started` on the right.

## Current Color Direction

Amber remains the primary brand/accent color through `primary-container` (`#F59E0B`). Do not make black/navy the global primary treatment. Dark neutrals can still be used sparingly for contrast where the existing design already used them, such as media panels or neutral CTAs.

## Current Typography Direction

Use Sora as the primary/display font for headings, nav labels, buttons, scores, and brand-forward UI. Use Manrope as the secondary/body font for paragraphs, dense card copy, labels inside data-heavy sections, and form text. `app/layout.tsx` wires both through `next/font/google`; `app/globals.css` maps `font-sans` to Manrope and heading/display/label tokens to Sora.

## Current Landing Verdict Card

`app/components/VerdictSection.tsx` is the landing-page card below the hero. Current direction is the compact three-part showcase: product image, price/AI score/actions, and the original-style score breakdown list. Desktop uses three columns; mobile/tablet stacks cleanly. Keep amber as the brand/action accent and green only for buy/verdict signals.

## Known Drift And Cleanup Targets

1. `AGENTS.md` and `README.md` are outdated. README is still mostly `create-next-app`; AGENTS lists only the older route/component set.
2. There are duplicate or overlapping route concepts:
   - `/alternatives` vs `/better-alternatives`
   - `/deals` vs `/deals-worth`
   - `/concierge` vs `/ai-chat`
3. Navigation is inconsistent:
   - Top navigation now uses the shared `SimpleNav` baseline across the main routes.
   - Footer/link clusters and the AI chat sidebar can still mention `IsItABuy` or older route labels.
4. Text encoding/mojibake appears in terminal output for some symbols (em dash, bullet, copyright sign, star symbols). Files may contain valid Unicode, but verify encoding before editing copy.
5. Raw remote `<img>` usage is common. Moving to `next/image` will require configuring remote image domains in `next.config.ts`, especially `images.pexels.com` and `lh3.googleusercontent.com`.
6. Search/filter inputs are presentational. They do not filter, submit, persist, or call APIs.
7. Affiliate disclosure messaging is inconsistent: some places say commission-free/independent while footer says affiliate commission may be earned. Product policy should be normalized.

## Best Next Engineering Moves

High leverage order:

1. Fix lint errors by replacing raw home links with `Link`.
2. Update README and AGENTS to match the live route map.
3. Decide which duplicate route variants are canonical, then remove or redirect stale ones.
4. Finish consolidating remaining custom route navs into `SimpleNav`.
5. Extract shared demo data/types from page files into a small data module.
6. Add real search/filter behavior before adding backend complexity.
7. Add a lightweight test setup only when behavior becomes real. Until then, build + lint + manual browser checks are enough.

## Future Backend Shape

Likely entities when moving beyond prototype:

- Product: id, title, brand, category, image, identifiers, specs.
- Offer: product id, retailer, price, previous price, stock, URL, affiliate flag.
- Verdict: product id, score, decision, confidence, score breakdown, evidence, timestamp.
- ReviewSummary: trust score, source counts, fake-review signals, review excerpts.
- PriceHistory: product id, retailer, date, price.
- WatchlistItem: user id, product id, target price, alert rules.
- Receipt: user id, retailer, date, total, OCR text, line items, consent/audit fields.
- PreferenceProfile: budget, retailers, blocked brands, categories, notification settings.

Potential routes/APIs later:

- `POST /api/search`
- `GET /api/products/:id`
- `GET /api/products/:id/offers`
- `GET /api/products/:id/price-history`
- `POST /api/watchlist`
- `POST /api/alerts`
- `POST /api/receipts`
- `POST /api/chat`

## Working Rules For Future Agents

- Read this note, then inspect the target files before editing.
- Follow Next.js App Router conventions. Do not introduce Pages Router patterns.
- Use Tailwind v4 theme tokens in `app/globals.css`; do not create `tailwind.config.js` unless there is a specific migration reason.
- Use `lucide-react` for home-page UI enhancements. Material Symbols remain only for legacy routes until those screens are migrated.
- Keep edits scoped. This prototype has many large static files, so avoid unrelated rewrites.
- If adding backend or data fetching, confirm the product/data model first because existing UI copy implies more capabilities than the code has.
- Use `npm.cmd` on this Windows machine for verification.
