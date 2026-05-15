---
title: Vibe Coding Workflow MOC
date: 2026-05-15
tags:
  - project/isitabuy
  - moc
  - workflow
  - ai-coding
status: active
aliases:
  - IsItABuy Vibe Coding
  - AI Coding Workflow
---

# Vibe Coding Workflow MOC

Use this map to work faster with AI coding tools while keeping the project coherent.

## What A MOC Is

MOC means Map of Content. It is not normal documentation that must be read from top to bottom. It is a navigation note that points to the right context, decisions, files, risks, and next actions.

For vibe coding, a MOC gives the AI agent the missing "project brain" before it edits code.

## How To Use MOCs Efficiently

1. Start from [[MOCs/00 IsItABuy MOC|IsItABuy MOC]].
2. Pick the one focused MOC for the task.
3. Tell the AI which MOC to read before it edits.
4. Include the target file or route.
5. Give acceptance criteria.
6. Ask it to run `npm.cmd run lint` and `npm.cmd run build` for real changes.
7. After the task, update the relevant MOC if the architecture or product direction changed.

## Prompt Template

```text
Read [[MOCs/00 IsItABuy MOC]], [[IsItABuy Project Memory]], and [[MOCs/<relevant MOC>]].

Task:
<one narrow change>

Target files/routes:
<files or routes>

Constraints:
- Keep Next.js App Router patterns.
- Use Tailwind v4 tokens from app/globals.css.
- Keep the app frontend-only unless I explicitly ask for backend work.
- Do not rewrite unrelated pages.

Acceptance criteria:
- <what must be true in the UI/code>
- <what must not regress>

Verification:
- Run npm.cmd run lint
- Run npm.cmd run build
```

## Good Task Types

- "Improve `/product` verdict hierarchy without changing data."
- "Make `/search` filters work on local demo products."
- "Consolidate duplicate nav items across `Navbar` and `SearchHeader`."
- "Extract shared product types and demo data."
- "Normalize affiliate disclosure copy."
- "Create a canonical route plan for alternatives/deals/chat duplicates."
- "Add page metadata to static routes."

## Bad Task Shapes

- "Make it production ready."
- "Add AI."
- "Fix all UI."
- "Connect everything."
- "Make it better."

Those are too wide. Break them into one route, one behavior, or one data model step.

## High-Leverage Work Order

1. Update stale docs and keep MOCs current.
2. Consolidate duplicate route concepts.
3. Normalize navigation.
4. Extract shared demo data and types.
5. Make search, filters, compare, and watchlist use shared local data.
6. Add lightweight tests only after behavior exists.
7. Add backend/API/AI only after local data contracts are stable.

## Example Prompts

### UI pass

```text
Read [[MOCs/04 UI System MOC]] and app/product/page.tsx. Improve the product detail page for faster verdict scanning. Keep existing demo data, use existing tokens, and avoid adding backend code. Verify with npm.cmd run lint.
```

### Refactor pass

```text
Read [[MOCs/03 Frontend Architecture MOC]] and [[MOCs/05 Data and AI Roadmap MOC]]. Extract product card data from /search into a typed shared demo data module, then update /search to use it. Keep UI unchanged. Run lint and build.
```

### Planning pass

```text
Read [[MOCs/02 App Routes MOC]]. Compare /deals and /deals-worth. Do not edit files. Return a route consolidation plan with risks and a recommended canonical route.
```

## Maintenance Rule

When code changes alter routes, shared components, product direction, theme tokens, or data contracts, update the matching MOC in the same session. MOCs lose value when they become stale.

## Related Notes

- [[MOCs/00 IsItABuy MOC|IsItABuy MOC]]
- [[MOCs/01 Product Strategy MOC|Product Strategy MOC]]
- [[MOCs/02 App Routes MOC|App Routes MOC]]
- [[MOCs/03 Frontend Architecture MOC|Frontend Architecture MOC]]
- [[MOCs/04 UI System MOC|UI System MOC]]
- [[MOCs/05 Data and AI Roadmap MOC|Data and AI Roadmap MOC]]
- [[IsItABuy Project Memory]]
