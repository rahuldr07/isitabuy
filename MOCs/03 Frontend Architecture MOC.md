---
title: Frontend Architecture MOC
date: 2026-05-15
tags:
  - project/isitabuy
  - moc
  - frontend
  - architecture
  - nextjs
status: active
aliases:
  - IsItABuy Frontend Architecture
---

# Frontend Architecture MOC

Use this map before changing components, page structure, state, routing, or shared UI behavior.

## App Shape

- Framework: Next.js 16 App Router.
- Directory style: no `src/`; app code lives directly in `app/`.
- Language: TypeScript strict mode.
- Styling: Tailwind CSS v4 with theme values in `app/globals.css`.
- Data: static demo arrays and JSX embedded mostly inside page files.
- Runtime: frontend-only prototype with no API routes, database, auth, or env vars.

## Component Layers

### App-Specific Components

Location: `app/components/`

- `Navbar.tsx` - landing navigation.
- `SearchHeader.tsx` - search/results header used by many pages.
- `HeroSection.tsx` - landing hero and search input.
- `VerdictSection.tsx` - landing verdict showcase.
- `ExtensionCTA.tsx` - browser extension promo.
- `Footer.tsx` - footer and disclosure.
- `FilterSidebar.tsx` - search filters; local UI state only.
- `ProductCard.tsx` - product result card.
- `CompareFilterSidebar.tsx` - compare filters; local UI state only.
- `CompareProductCard.tsx` - compare card and exported `CompareProduct` type.
- `CompareTray.tsx` - fixed compare selection tray.

### shadcn/ui Components

Location: `components/ui/`

This folder contains reusable primitives generated through shadcn, backed by Radix UI and `lucide-react`. Use these for dialogs, popovers, fields, controls, tabs, sheets, drawers, toggles, buttons, badges, tables, and similar primitives.

### Shared Utilities

- `lib/utils.ts` - `cn()` utility for class merging.
- `components.json` - shadcn setup, aliases, Tailwind CSS path, icon library.

## State And Interactivity

Current real interactions:

- `HeroSection` stores input and routes to `/search?q=...`.
- `FilterSidebar` toggles local checkbox/radio-like state but does not filter data.
- `ComparePage` stores selected product IDs and feeds `CompareTray`.
- `CompareFilterSidebar` stores local filter state but does not filter data.
- `ConciergePage` and `AIChatPage` store input values but do not call an AI backend.

## Architecture Constraints

- Do not use Pages Router patterns.
- Client components need `"use client";` at the top.
- Prefer existing component patterns before adding new abstractions.
- Keep static prototype changes scoped unless the task explicitly moves toward real data.
- Use `Link` from `next/link` for internal navigation when editing navigation.
- Before adding new Next.js APIs, check local Next docs under `node_modules/next/dist/docs/`.

## Refactor Opportunities

- Extract demo product data and shared types into a small module.
- Consolidate duplicate navigation/header implementations.
- Normalize route metadata.
- Make filters actually filter local demo data before adding backend complexity.
- Migrate raw remote images to `next/image` only after configuring allowed image sources.
- Create route-level layout primitives if repeated page scaffolding keeps growing.

## Verification

Use these commands:

```powershell
npm.cmd run lint
npm.cmd run build
```

Use `npm.cmd`, not bare `npm`, because PowerShell may block `npm.ps1`.

## Related Notes

- [[MOCs/00 IsItABuy MOC|IsItABuy MOC]]
- [[MOCs/02 App Routes MOC|App Routes MOC]]
- [[MOCs/04 UI System MOC|UI System MOC]]
- [[IsItABuy Project Memory]]
