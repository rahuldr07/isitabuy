---
title: IsItABuy MOC
date: 2026-05-15
tags:
  - project/isitabuy
  - moc
  - index
status: active
aliases:
  - IsItABuy Map of Content
  - Project MOC
---

# IsItABuy MOC

This is the main map for the IsItABuy project. Start here when you want context before editing, planning, debugging, or asking an AI coding agent to make changes.

> [!important] Current source of truth
> Use [[IsItABuy Project Memory]] for the latest scanned state of the repo. Some older files, especially [[AGENTS]], are outdated compared with the current code.

## Core Maps

- [[MOCs/01 Product Strategy MOC|Product Strategy MOC]] - what the product is, who it serves, and what experience should stay consistent.
- [[MOCs/02 App Routes MOC|App Routes MOC]] - route inventory and what each screen currently represents.
- [[MOCs/03 Frontend Architecture MOC|Frontend Architecture MOC]] - how the Next.js app is organized and where shared behavior lives.
- [[MOCs/04 UI System MOC|UI System MOC]] - visual system, Tailwind tokens, shadcn setup, icons, and style risks.
- [[MOCs/05 Data and AI Roadmap MOC|Data and AI Roadmap MOC]] - future entities, APIs, AI verdict pipeline, and backend direction.
- [[MOCs/06 Vibe Coding Workflow MOC|Vibe Coding Workflow MOC]] - how to use these notes effectively while coding with AI.

## Fast Orientation

- Product: AI-powered shopping advisor with buy, wait, avoid, and better alternative verdicts.
- Current state: frontend-only Next.js prototype with static demo data.
- Main user actions: search product, compare items, inspect verdict, track price, save/watch items, analyze receipts, ask shopping assistant.
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Material Symbols, Plus Jakarta Sans.
- Verification: use `npm.cmd run build` and `npm.cmd run lint` on this Windows machine.

## Important Local Files

- `app/page.tsx` - landing page composition.
- `app/layout.tsx` - root metadata, font, Material Symbols, shadcn providers.
- `app/globals.css` - Tailwind v4 theme, custom utilities, shadcn theme variables.
- `app/components/` - app-specific shared components.
- `components/ui/` - shadcn/ui primitives.
- `lib/utils.ts` - `cn()` utility used by shadcn components.
- `components.json` - shadcn configuration.
- `AGENTS.md` - agent instructions, partly outdated.
- `IsItABuy Project Memory.md` - current high-context codebase memory.

## Common Workflows

Use this order when starting a new change:

1. Read [[IsItABuy Project Memory]].
2. Open the most relevant MOC from [[#Core Maps]].
3. Inspect the target files directly.
4. Ask the AI agent for a narrow change with file paths, acceptance criteria, and verification command.
5. Run `npm.cmd run lint` and `npm.cmd run build` after non-trivial edits.

## Open Questions

- Which duplicated routes should be canonical: `/alternatives` vs `/better-alternatives`, `/deals` vs `/deals-worth`, `/concierge` vs `/ai-chat`?
- Should the app remain a polished static prototype, or move next into real search/data/AI behavior?
- What is the final policy around affiliate commission vs commission-free recommendations?
- Should raw external images be migrated to `next/image` with configured remote domains?
