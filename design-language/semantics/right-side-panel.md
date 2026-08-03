---
id: right-side-panel
category: semantics
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - listview-drives-main
  - progressive-disclosure
  - dialogs
  - dialogs-tree
  - grammar-regions
  - appshell-ontology
  - sheet-ontology
  - drawer-ontology
components:
  - Sheet
  - SheetContent
  - SheetHeader
  - SheetBody
  - SheetFooter
  - SheetTitle
  - SheetDescription
  - Drawer
  - DrawerHeader
  - DrawerBody
  - DrawerFooter
  - AppShell
patterns:
  - dialogs
  - detail-pages
  - dashboards
tokens:
  - "--uds-elevation-modal"
depends_on:
  - progressive-disclosure
  - grammar-regions
influences:
  - dialogs
  - choosing-layout
conflicts_with:
  - layout-mistakes
  - visual-noise
alternatives:
  - dialogs
  - detail-pages
---

# Right side panel for Main details

## What

When the user needs **more detail about something already shown in the AppShell main content body**, open a **right-hand side panel**—do not bury that detail in a new full page or a centered Dialog by default.

In UDS, the canonical right side panel is **`Sheet`** with **`SheetContent side="right"`** (default). Panel corners are **0px** radius (`rounded-none`) — flush to the viewport edge. The same **0px** radius applies to `Drawer` content on every side. Left/right **Drawer** width is clamped **320–600px**.

## Why

Main stays the working context; the panel adds progressive disclosure without replacing the shell layout. That differs from **`listview`**, which holds a **master collection that drives** what Main shows.

## When (required → right Sheet)

Use a right side panel when **any** of these are true:

| Signal | Example |
|--------|---------|
| User needs **more detail** about an entity/row/card **already in Main** | “View details”, inspector, activity, metadata |
| Main should **remain visible** underneath/beside the detail | Review a record without leaving the dashboard/table |
| Detail is **secondary** to the Main task (inspect, not replace the page) | Side notes, history, properties |
| Content is **too much for a small Dialog** but not a full route | Long description, multi-section inspector |

## When not

| Situation | Prefer |
|-----------|--------|
| A **collection selects what Main shows** (master → detail page) | AppShell **`listview`** ([`listview-drives-main`](./listview-drives-main.md)) |
| Short confirm / destructive decision | `AlertDialog` |
| Temporary workspace (small multi-input task, return to context) | `Dialog` — [`dialogs`](../patterns/dialogs.md) |
| Critical error / acknowledgment | Alert / Toast — **not** Dialog |
| Full primary workflow / many fields | Full page (`settings-form`) or Main detail route |
| Product area navigation | `Menu` |
| Mobile-style bottom sheet / pull handle | `Drawer` (not the default for desktop Main inspectors) |

## Pairing with listview

| Pane | Role |
|------|------|
| **`listview` (left)** | Master list that **changes** Main |
| **`AppShell.Main`** | Primary workspace |
| **`Sheet` right** | Extra detail about something **in Main** |

Valid: listview → Main record → Sheet for deep properties.  
Invalid: putting the master list in a right Sheet, or faking an inspector as a second column only inside Main when Sheet fits.

## UDS implementation

**Required:** three regions — **Header / Body / Footer**. Body scrolls; Header and Footer stay pinned with border separators. Side-panel footer actions are a **horizontal** row. See [`sheet-ontology`](../ontology/sheet.md) and [`drawer-ontology`](../ontology/drawer.md). Copy `ai/examples/right-side-inspector.tsx`.

```tsx
import {
  Button,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@chghealthcare/unified-design-system"

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Details</SheetTitle>
      <SheetDescription>More about the selected item in Main.</SheetDescription>
    </SheetHeader>
    <SheetBody>{/* scrolls — DescriptionList, sections, etc. */}</SheetBody>
    <SheetFooter>
      <Button variant="outline">Close</Button>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

- Default `side` is **`"right"`** — keep it for this pattern.
- Include `SheetTitle` (accessible name).
- Prefer Sheet over inventing `fixed right-0` panels or `Sidebar*` as an AppShell rail.
- Drawer is allowed with the **same** Header / Body / Footer regions (`@chghealthcare/unified-design-system/drawer`).

**FAIL IF:** freeform children only under Content; stacked footer buttons on a side inspector; body content pushes actions off-screen; oversized `SheetTitle`/`DrawerTitle` (must stay 16 — never match page/section titles); sparse 1–2 field inspector when a dense `DescriptionList` is available (`ai/examples/right-side-inspector.tsx`).

## How AI should reason

1. Is this “more about what’s in Main”? → **right `Sheet`**.
2. Is this “pick from a list to fill Main”? → **`listview`**, not Sheet.
3. Is this a quick confirm / prevent harm? → **AlertDialog** ([`alert-dialogs`](../patterns/alert-dialogs.md)).
4. Is this a small multi-input temporary workspace? → **Dialog** ([`dialogs`](../patterns/dialogs.md)).
5. Do not use a permanent DIY right column in Main when an overlay Sheet inspector is the need.

Confidence: Required — More detail about Main content → right side panel (`Sheet` `side="right"`).

Confidence: Required — Do not confuse with listview (master that drives Main).

## Relationships

### Supports

- Progressive disclosure, Main context retention

### Requires

- Sheet primitives, AppShell Main as context

### Influences

- Dialogs tree, detail inspection UX

### Uses

- Sheet, SheetContent (side=right), SheetHeader / SheetBody / SheetFooter / Title / Description
- Drawer with the same Header / Body / Footer regions when already chosen

### Conflicts With

- Master list in a right Sheet
- Custom fixed right rails instead of Sheet
- Using Dialog for large inspectors by default

### Alternatives

- listview-drives-main when the list owns Main
- Full page detail when the detail becomes the primary task
- Dialog for short focused decisions

### Depends On

- progressive-disclosure, grammar-regions

### Referenced By

- decision-rules/trees/dialogs.md
- semantics/listview-drives-main.md
- ai/indexes/concept-index.md (after generate:ai)

## See also

- [Listview when it drives Main](./listview-drives-main.md)
- [Progressive disclosure](../design-physics/progressive-disclosure.md)
- [Dialogs](../patterns/dialogs.md)
- [Dialogs tree](../decision-rules/trees/dialogs.md)
- [AppShell regions](../grammar/regions.md)
