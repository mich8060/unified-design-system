---
id: sheet-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - right-side-panel
  - dialog-ontology
  - drawer-ontology
  - listview-drives-main
  - ontology-index
components:
  - Sheet
  - SheetContent
  - SheetHeader
  - SheetBody
  - SheetTitle
  - SheetDescription
  - SheetFooter
  - SheetTrigger
patterns:
  - dialogs
tokens: []
depends_on:
  - right-side-panel
influences:
  - progressive-disclosure
conflicts_with: []
alternatives:
  - dialog-ontology
  - drawer-ontology
design_intent:
  - navigation
  - discovery
---

# Sheet

## What

`Sheet` **is-a** edge overlay panel (Radix Dialog-based). Default **`SheetContent side="right"`** is the UDS right side panel for inspectors.

Compose **Header → Body → Footer**. Body scrolls; Header and Footer stay pinned. Same region contract as [`drawer-ontology`](./drawer.md).

## API (system facts)

| Part | Detail |
|------|--------|
| `Sheet` | Root |
| `SheetContent` | `side?: "top" \| "right" \| "bottom" \| "left"` — **default `"right"`**; full-height flex column + `overflow-hidden`; panel corners **0px** (`rounded-none`) |
| `SheetHeader` | Pinned head; bottom border; title / description / badges / close |
| `SheetBody` | **Required** scrollable middle — `min-h-0 flex-1 overflow-y-auto` |
| `SheetTitle` / `SheetDescription` | Naming + intro — title is **16** semibold (never upsize to page/section 24–28) |
| `SheetFooter` | Pinned foot; top border; **horizontal** actions on left/right sheets |
| `SheetTrigger` / `SheetClose` | Open/close |
| Body content | Prefer dense `DescriptionList` (several rows); copy `ai/examples/right-side-inspector.tsx` |

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Overlay / edge panel |
| **contains** | Header → Body → Footer (Required for inspectors with actions) |
| **appears in** | Main-content inspectors, “more details” flows |
| **supports** | [`right-side-panel`](../semantics/right-side-panel.md) |
| **does not replace** | AppShell `listview` (master that drives Main) |
| **vs Dialog** | Sheet keeps edge context; Dialog centers short tasks |
| **vs Drawer** | Drawer shares the same regions; prefer Sheet for desktop right inspectors |

## How AI should reason

1. More detail about Main → Sheet `side="right"`.
2. Always provide `SheetTitle` at package size (**16**) — do not apply `text-2xl` / heading-28.
3. Put scrollable content in **`SheetBody`**; pin actions in **`SheetFooter`** (horizontal row on side sheets).
4. Use a multi-row `DescriptionList` (or equivalent) — not a sparse 1–2 field stub.
5. Do not build custom `fixed inset-y-0 right-0` panels when Sheet fits.

Confidence: **Required** — three regions + scrolling body for side inspectors. Preferred component vs Drawer for desktop.

## FAIL IF

- Freeform children under `SheetContent` with no `SheetBody`
- Side sheet footer stacks buttons when a horizontal Close + primary row is expected
- Body has no overflow / content pushes Footer off-screen
- Oversized panel title (`text-2xl` / heading-24+ competing with `PageHeaderTitle`)
- Sparse inspector body (one or two fields) when the product has a full attribute set — copy `ai/examples/right-side-inspector.tsx`

## Canonical composition

```tsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Details</SheetTitle>
      <SheetDescription>More about the selected item in Main.</SheetDescription>
    </SheetHeader>
    <SheetBody>{/* scrolls */}</SheetBody>
    <SheetFooter>
      <Button variant="outline">Close</Button>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

Exemplar: `ai/examples/right-side-inspector.tsx`.

## Relationships

### Supports

- right-side-panel

### Requires

- Accessible title

### Influences

- Inspector UX in dashboards/tables

### Uses

- Sheet* exports from the package

### Conflicts With

- Bespoke right rails

### Alternatives

- Dialog, full page, listview (different jobs)

### Depends On

- right-side-panel

### Referenced By

- ai/indexes/component-index.md

## See also

- [Right side panel](../semantics/right-side-panel.md)
- [Drawer ontology](./drawer.md)
- [Dialog ontology](./dialog.md)
- [Ontology index](./README.md)
- Exemplar: `ai/examples/right-side-inspector.tsx`
