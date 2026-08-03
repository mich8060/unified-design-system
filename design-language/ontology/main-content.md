---
id: main-content-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - appshell-ontology
  - appshell-main-containment
  - appshell-body-surface
  - page-header-ontology
  - spacing-levels
  - grid
components:
  - MainContent
  - MainStack
  - AppShell
  - Card
patterns:
  - dashboards
  - detail-pages
  - forms
tokens:
  - --uds-container-xl
  - --uds-container-main
  - --uds-surface-primary
  - --uds-surface-secondary
  - --uds-border-primary
  - --uds-gap-16
  - --uds-gap-24
  - --uds-spacing-24
depends_on:
  - appshell-main-containment
  - appshell-body-surface
  - spacing-levels
influences:
  - page-header-ontology
conflicts_with:
  []
alternatives:
  []
design_intent:
  - scanability
  - navigation
---
# MainContent

## What

`MainContent` **is-a** layout wrapper for content inside `AppShell.Main`. It encodes the two containment modes: **edge** and **fixed**.

## API (system facts)

| Prop | Values | Role |
|------|--------|------|
| `containment` | `edge` (default) \| `fixed` | How content sits on the Main canvas |
| `appearance` | `default` (default) \| `expanded` | Padding density |

| Mode | Behavior |
|------|----------|
| `edge` | Full width of Main; transparent on `--uds-surface-secondary`. `appearance="default"`: no built-in padding — recommend `p-[length:var(--uds-spacing-24)]`. `appearance="expanded"`: **48px** padding on the root. |
| `fixed` | **Outer:** max `--uds-container-xl` (1280px), `--uds-surface-primary`, 1px `border-right`, **no left/right padding**, height follows content (**no min-height**). **Inner** (`data-slot="main-content-inner"`): max `--uds-container-main` (1000px), left-aligned; padding **24px** (`default`) or **48px** (`expanded`). |

## Fixed usage (required)

1. Do **not** box the page — no extra Card/border wrapper around all content; no L/R padding on the outer 1280px panel.
2. Rely on the inner **1000px** column’s built-in padding (`appearance` **24** or **48**).
3. Let the outer panel grow with content height (do not stub it short).
4. Use Card / bordered components only when that component is designed as a box.

```tsx
<MainContent containment="fixed">
  <PageHeader layout="inline">…</PageHeader>
  {/* content on the primary surface — not an extra page box */}
</MainContent>
```

## Page body usage

Inside `MainContent` / `AppShell.Main`:

1. After `PageHeader` (inline), wrap first-level sections in **`MainStack`** (built-in gap **24px** / `--uds-gap-24`). Do not invent `gap-3` / `space-y-2` stacks.
2. Prefer **2–3 columns** to break up the page — not only a single vertical stack.
3. Give **designed** boxed surfaces (Card / bordered panels) **padding around the edges** — not a page-level box in fixed mode.

```tsx
<MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
  <PageHeader layout="inline">…</PageHeader>
  <MainStack>
    <div className="flex flex-wrap gap-[length:var(--uds-gap-16)]">{/* StatisticCards */}</div>
    <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2">{/* regions */}</div>
  </MainStack>
</MainContent>
```

See [`appshell-main-containment`](../semantics/appshell-main-containment.md).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Main content containment wrapper |
| **appears in** | `AppShell.Main` |
| **requires** | Surface-secondary Main canvas |
| **supports** | Edge-to-edge and fixed-column product layouts |
| **does-not** | Add L/R padding or a full page box on the fixed outer panel |

## How AI should reason

1. Put page body in `AppShell.Main` (canvas is surface-secondary).
2. Wrap with `MainContent`; use the app’s established `edge` or `fixed` mode from [`appshell-main-containment`](../semantics/appshell-main-containment.md) — keep it consistent across pages.
3. **Edge:** recommend **24px** padding. **Fixed:** no outer L/R padding; inner already has **24px**; no extra page box; panel spans content height.
4. Put first-level sections in **`MainStack`** (gap 24); prefer **2–3 columns**; pad designed boxed components.
5. For fixed, do not add another max-width wrapper — the 1000px inner is built in.
6. Place `PageHeader` and page sections inside `MainContent` (except block PageHeader above it).
7. `AppShell.Footer` portals into `MainContent` when present (end of the content column) — do not duplicate a page-level Footer outside the container.

Confidence: Preferred — Use `MainContent` for Main containment; keep the canvas surface-secondary.

Confidence: Strong Recommendation — Same containment (`edge` or `fixed`) across the app’s pages.

## Relationships

### Supports

- Edge-to-edge and fixed-column product layouts

### Requires

- Surface-secondary Main canvas

### Influences

- page-header-ontology

### Uses

- AppShell

### Conflicts With

- Ad-hoc max-width wrappers inside Main
- Crowded zero-gap section stacks
- Flush content inside bordered boxes
- Boxing the whole fixed page / padding the fixed outer L/R

### Alternatives

- —

### Depends On

- appshell-main-containment
- appshell-body-surface
- spacing-levels

### Referenced By

- ai/indexes/component-index.md

## See also

- [AppShell.Main content containment](../semantics/appshell-main-containment.md)
- [Spacing levels](../semantics/spacing-levels.md)
- [Grid](../foundations/grid.md)
- [AppShell body surface](../semantics/appshell-body-surface.md)
- [Page Header ontology](./page-header.md)
- [AppShell ontology](./appshell.md)
- [Ontology index](./README.md)
