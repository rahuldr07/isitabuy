---
title: UI System MOC
date: 2026-05-15
tags:
  - project/isitabuy
  - moc
  - ui
  - design-system
  - tailwind
status: active
aliases:
  - IsItABuy UI System
---

# UI System MOC

Use this map before changing colors, typography, spacing, components, icons, or page visual design.

## Visual Foundation

- Font: Plus Jakarta Sans from `next/font/google`.
- Icons: Google Material Symbols Outlined loaded in `app/layout.tsx`.
- Styling engine: Tailwind CSS v4.
- Theme location: `app/globals.css`.
- Component primitives: shadcn/ui in `components/ui/`.
- Utility helper: `cn()` from `lib/utils.ts`.

## Tailwind Theme

Theme values are defined inside `@theme` blocks in `app/globals.css`. There is no `tailwind.config.js`.

Important color families:

- Surface: `surface`, `surface-container`, `surface-container-low`, `surface-container-high`, `background`.
- Text: `on-surface`, `on-surface-variant`, `foreground`, `muted-foreground`.
- Brand/action: `primary`, `primary-container`, `secondary`, `tertiary`.
- Verdicts: `verdict-buy`, `verdict-wait`, `verdict-avoid`, `verdict-better`.
- State: `error`, `error-container`, `outline`, `outline-variant`.

Important utilities:

- Typography: `.text-display-xl`, `.text-headline-lg`, `.text-headline-md`, `.text-body-lg`, `.text-body-md`, `.text-label-sm`.
- Spacing: `.px-gutter`, `.px-margin-mobile`, `.py-stack-lg`, `.py-stack-md`, `.mb-stack-lg`, `.gap-gutter`, `.max-w-container-max`.
- Shadows: `.shadow-soft`, `.shadow-elevated`, `shadow-premium`, `shadow-premium-hover`.
- Icons: `.material-symbols-outlined`, `.material-symbols-outlined.filled`.

## shadcn/ui Usage

The project has shadcn configured with:

- Style: Radix Nova.
- RSC: enabled.
- Tailwind CSS file: `app/globals.css`.
- UI alias: `@/components/ui`.
- Icon library: lucide.

Use shadcn primitives for controls and overlays when they fit the interaction:

- Button, badge, card, input, textarea, field, label.
- Dialog, alert-dialog, drawer, sheet, popover, dropdown-menu.
- Tabs, accordion, collapsible, command, navigation-menu.
- Table, pagination, scroll-area.
- Checkbox, radio-group, switch, slider, toggle, toggle-group.
- Tooltip and sonner toast.

## Design Rules For This Product

- Shopping advisor pages should be clear, scannable, and evidence-led.
- Put verdict and price/value evidence before decorative content.
- Keep controls compact and task-focused.
- Avoid adding broad marketing sections where a tool-like screen is expected.
- Use familiar icons for actions instead of text-heavy controls when the action is obvious.
- Preserve responsive behavior and check mobile widths after page changes.

## Style Drift To Watch

- Many pages use hardcoded colors instead of theme tokens.
- Some class names are referenced but not defined in `globals.css`.
- Raw remote `<img>` tags produce lint warnings.
- Some page layouts duplicate nav and shell patterns.
- The palette can drift if arbitrary amber/brown/slate values are added without checking the whole page.

## Good AI Prompts For UI Work

```text
Read [[MOCs/04 UI System MOC]] and app/globals.css. Improve the /watchlist page visual hierarchy using existing Tailwind v4 tokens and shadcn primitives. Do not add a new design system.
```

```text
Audit app/product/page.tsx for UI style drift. List hardcoded colors, undefined utility classes, and repeated layout patterns before editing.
```

## Related Notes

- [[MOCs/00 IsItABuy MOC|IsItABuy MOC]]
- [[MOCs/03 Frontend Architecture MOC|Frontend Architecture MOC]]
- [[MOCs/06 Vibe Coding Workflow MOC|Vibe Coding Workflow MOC]]
- [[IsItABuy Project Memory]]
