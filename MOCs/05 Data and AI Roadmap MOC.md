---
title: Data and AI Roadmap MOC
date: 2026-05-15
tags:
  - project/isitabuy
  - moc
  - data
  - ai
  - roadmap
status: active
aliases:
  - IsItABuy Data Roadmap
  - IsItABuy AI Roadmap
---

# Data And AI Roadmap MOC

Use this map when moving from static prototype screens toward real product data, AI verdicts, persistence, alerts, receipts, or chat.

## Current Reality

- No backend exists.
- No API routes exist.
- No database exists.
- No auth/session provider exists.
- No environment variables are required.
- Search, filters, chat, alerts, receipt upload, and verdict generation are presentational or local-state only.

## Likely Domain Entities

- Product - title, brand, category, image, identifiers, specs.
- Offer - product, retailer, price, previous price, stock, product URL, affiliate flag.
- Verdict - product, decision, score, confidence, evidence, timestamp.
- ReviewSummary - trust score, review counts, suspicious patterns, source summaries.
- PriceHistory - product, retailer, date, price.
- WatchlistItem - user, product, target price, alert rules.
- Receipt - user, retailer, date, total, OCR text, matched line items, consent.
- PreferenceProfile - budget, preferred retailers, blocked brands, categories, privacy and notification settings.
- ChatSession - user/session, messages, attached products, produced verdicts.

## Possible API Shape

```text
POST /api/search
GET  /api/products/:id
GET  /api/products/:id/offers
GET  /api/products/:id/price-history
POST /api/verdicts
POST /api/watchlist
POST /api/alerts
POST /api/receipts
POST /api/chat
```

## AI Verdict Pipeline Concept

1. Normalize product input from search text, URL, barcode, or receipt line item.
2. Resolve product identity and candidate matches.
3. Gather evidence: offers, price history, reviews, specs, alternatives.
4. Score each evidence dimension.
5. Generate verdict: buy, wait, avoid, or better alternative.
6. Produce explainable evidence snippets and confidence level.
7. Persist result so product pages, watchlist, chat, and receipt flows reference the same verdict object.

## Minimum Useful Backend Step

Before connecting real third-party data, implement local structured data:

- Move repeated demo products into `lib/demo-data.ts` or a similar module.
- Create shared TypeScript interfaces for products, offers, verdicts, and scores.
- Make search and filters operate against local demo data.
- Reuse the same product IDs across search, product detail, compare, watchlist, deals, and receipt pages.

This gives the prototype real behavior without committing to vendors, scraping, auth, or storage too early.

## Risk Areas

- Product data from retailers may have inconsistent identifiers and images.
- Price history needs source reliability and timestamp clarity.
- Review trust scoring needs transparent signals, not vague AI claims.
- Receipt OCR requires user consent and privacy-sensitive storage decisions.
- Affiliate monetization can conflict with "independent" positioning unless policy is explicit.
- AI answers should cite product evidence already stored or fetched by the app.

## Good AI Prompts For Data Work

```text
Read [[MOCs/05 Data and AI Roadmap MOC]]. Extract shared demo product types and data used by /search, /product, /watchlist, and /compare into a local lib module. Keep behavior static but remove duplicated product definitions.
```

```text
Design a minimal Verdict TypeScript interface for this app. It must support buy/wait/avoid, score breakdowns, alternatives, evidence snippets, confidence, and timestamp. Do not implement backend routes yet.
```

## Related Notes

- [[MOCs/00 IsItABuy MOC|IsItABuy MOC]]
- [[MOCs/01 Product Strategy MOC|Product Strategy MOC]]
- [[MOCs/03 Frontend Architecture MOC|Frontend Architecture MOC]]
- [[IsItABuy Project Memory]]
