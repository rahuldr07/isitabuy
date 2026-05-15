---
title: App Routes MOC
date: 2026-05-15
tags:
  - project/isitabuy
  - moc
  - routes
  - nextjs
status: active
aliases:
  - IsItABuy Routes
---

# App Routes MOC

Use this map when changing navigation, adding pages, removing duplicate screens, or asking an AI agent to work on a specific route.

## Route Groups

### Core Shopping Flow

| Route | File | Role |
|---|---|---|
| `/` | `app/page.tsx` | Landing page with hero, demo verdict, extension CTA, footer. |
| `/search` | `app/search/page.tsx` | Product search results with filters and product cards. |
| `/product` | `app/product/page.tsx` | Product detail verdict page. |
| `/compare` | `app/compare/page.tsx` | Product selection flow for comparison. |
| `/compare-items` | `app/compare-items/page.tsx` | Final side-by-side comparison table. |
| `/alternatives` | `app/alternatives/page.tsx` | Rich alternatives page. |
| `/better-alternatives` | `app/better-alternatives/page.tsx` | Leaner/duplicate alternatives page. |

### Deal And Price Tools

| Route | File | Role |
|---|---|---|
| `/deals` | `app/deals/page.tsx` | Deals listing and featured deal. |
| `/deals-worth` | `app/deals-worth/page.tsx` | Deal listing variant; overlaps with `/deals`. |
| `/price-tracker` | `app/price-tracker/page.tsx` | Price chart and retailer comparison concept. |
| `/price-alerts` | `app/price-alerts/page.tsx` | Alerts dashboard and create-alert concept. |
| `/watchlist` | `app/watchlist/page.tsx` | Saved products, stats, filters, and alert summary. |

### Receipt And Assistant Tools

| Route | File | Role |
|---|---|---|
| `/upload-receipt` | `app/upload-receipt/page.tsx` | Receipt upload workflow and OCR concept. |
| `/receipt-analysis` | `app/receipt-analysis/page.tsx` | Receipt result page with savings opportunities. |
| `/concierge` | `app/concierge/page.tsx` | Chat/concierge UI concept. |
| `/ai-chat` | `app/ai-chat/page.tsx` | Advanced AI assistant UI concept. |

### Account And Category

| Route | File | Role |
|---|---|---|
| `/preferences` | `app/preferences/page.tsx` | Personalization and privacy preferences. |
| `/signin` | `app/signin/page.tsx` | Static auth/login concept. |
| `/best-laptops` | `app/best-laptops/page.tsx` | Category/ranking page. |

## Navigation Sources

- `app/components/Navbar.tsx` - fixed landing navigation.
- `app/components/SearchHeader.tsx` - shared search/results header used by multiple pages.
- Several pages contain their own custom nav markup.

## Current Route Health

- Most routes are static UI concepts with embedded demo data.
- Several routes duplicate each other or represent alternate versions.
- Navigation labels and destinations are not fully normalized.
- Some pages use shared components while others duplicate layout patterns.
- Many client pages do not export page-level metadata.

## Canonicalization Candidates

- Pick one canonical alternatives route: `/alternatives` or `/better-alternatives`.
- Pick one canonical deals route: `/deals` or `/deals-worth`.
- Decide whether `/concierge` and `/ai-chat` are separate products or one assistant experience.
- Fix any navigation label that points to the wrong concept, such as "Extension" pointing to `/best-laptops`.

## Good AI Prompts For Route Work

```text
Read [[MOCs/02 App Routes MOC]] and [[IsItABuy Project Memory]]. Consolidate navigation for /search, /deals, and /watchlist. Keep the App Router structure, avoid backend changes, and run npm.cmd run lint.
```

```text
Read app/deals/page.tsx and app/deals-worth/page.tsx. Recommend which route should be canonical, list overlapping sections, and propose a minimal consolidation plan without editing yet.
```

## Related Notes

- [[MOCs/00 IsItABuy MOC|IsItABuy MOC]]
- [[MOCs/03 Frontend Architecture MOC|Frontend Architecture MOC]]
- [[MOCs/06 Vibe Coding Workflow MOC|Vibe Coding Workflow MOC]]
- [[IsItABuy Project Memory]]
