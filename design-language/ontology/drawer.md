---
id: drawer-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: required
related:
  - sheet-ontology
  - right-side-panel
  - dialog-ontology
  - ontology-index
components:
  - Drawer
  - DrawerContent
  - DrawerHeader
  - DrawerBody
  - DrawerFooter
  - DrawerTitle
  - DrawerDescription
patterns:
  - dialogs
tokens: []
depends_on:
  - right-side-panel
influences:
  - progressive-disclosure
conflicts_with: []
alternatives:
  - sheet-ontology
design_intent:
  - navigation
  - discovery
---

# Drawer

## What

`Drawer` **is-a** edge overlay panel (Vaul). Same **three-region** contract as `Sheet`: **Header / Body / Footer**. Prefer **`Sheet`** for desktop right inspectors; use **Drawer** when the product already chose Drawer (mobile pull-handle, bottom sheet, or existing consumer pattern).

Panel corners are **0px** (`rounded-none`) on every edge — flush to the viewport. Left/right drawers are **320–600px** wide (`min-w-[320px] max-w-[600px]`); do not override past that band.

## API (system facts)

| Part | Detail |
|------|--------|
| `Drawer` / `DrawerTrigger` / `DrawerClose` | Root / open / close — from `@chghealthcare/unified-design-system/drawer` |
| `DrawerContent` | Direction via Vaul; full-height flex column + `overflow-hidden`; **radius 0**; left/right width **320–600px** |
| `DrawerHeader` | Pinned head; bottom border; title / description / badges / close |
| `DrawerBody` | **Required** scrollable middle — `min-h-0 flex-1 overflow-y-auto` |
| `DrawerFooter` | Pinned foot; top border; **horizontal** actions on left/right drawers |
| `DrawerTitle` / `DrawerDescription` | Accessible name + intro — title is **16** semibold (never upsize to page/section 24–28) |

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Overlay / edge panel |
| **contains** | Header → Body → Footer (Required for inspectors with actions) |
| **supports** | [`right-side-panel`](../semantics/right-side-panel.md) when used as a side inspector |
| **vs Sheet** | Sheet is the documented desktop default; Drawer shares the same region chrome |
| **does not replace** | AppShell `listview` |

## How AI should reason

1. Edge inspector → compose **Header → Body → Footer** (never freeform children only).
2. Long content goes in **`DrawerBody`** so it scrolls; Header and Footer stay pinned.
3. Side-drawer footer actions are a **horizontal row** (e.g. Close + primary), not a stacked column.
4. Prefer Sheet for new desktop right panels unless Drawer is already established.

Confidence: **Required** — three regions + scrolling body for side inspectors.

## FAIL IF

- Freeform children under `DrawerContent` with no `DrawerBody` (content and actions compete for space)
- Side drawer footer stacks buttons in a column when Figma/product expects a row
- Body has no overflow / content pushes Footer off-screen
- Oversized panel title (`text-2xl` / heading-24+ competing with `PageHeaderTitle`)
- Side drawer wider than **600px** or narrower than **320px**
- Any corner radius on `DrawerContent` (must stay **0**)
- Sparse inspector body (one or two fields) when a multi-row `DescriptionList` fits — copy `ai/examples/right-side-inspector.tsx`
- Inventing a custom fixed right rail instead of Drawer/Sheet

## Canonical composition

```tsx
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@chghealthcare/unified-design-system/drawer"
import { Button } from "@chghealthcare/unified-design-system"

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Clinician</DrawerTitle>
      <DrawerDescription>Inspect selected record.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* scrolls */}</DrawerBody>
    <DrawerFooter>
      <Button variant="outline">Close</Button>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Relationships

### Supports

- right-side-panel

### Requires

- DrawerTitle for accessible name
- DrawerBody when content can exceed viewport height

### Alternatives

- Sheet (preferred desktop right panel)

## See also

- [Sheet ontology](./sheet.md)
- [Right side panel](../semantics/right-side-panel.md)
- Exemplar: `ai/examples/right-side-inspector.tsx`
