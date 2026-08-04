---
id: appshell-body-surface
category: semantics
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - grammar-regions
  - appshell-ontology
  - appshell-main-containment
  - color
  - cards
  - auth-shell
components:
  - AppShell
  - Card
  - MainContent
patterns:
  - navigation
  - dashboards
  - forms
  - detail-pages
tokens:
  - "--uds-surface-secondary"
  - "--uds-surface-primary"
depends_on:
  - color
  - grammar-regions
influences:
  - dashboards
  - forms
  - cards
conflicts_with:
  - visual-noise
  - layout-mistakes
alternatives: []
---

# AppShell body surface

## What

The **body** of `AppShell`—the content canvas beside the menu (`.appshell--body` / `.appshell--main`)—must use the **surface secondary** color.

## Why

Secondary surface sets the page canvas apart from primary surfaces (cards, panels, inputs). That contrast makes grouped content readable and prevents the whole product from reading as one flat white plane.

## When

Every authenticated product screen that uses `AppShell`.

## Color (required)

| Region | Token | Notes |
|--------|-------|--------|
| **AppShell body / main canvas** | `--uds-surface-secondary` | `.appshell--body` and `.appshell--main` (Main sets this explicitly) |
| Cards / elevated content on that canvas | `--uds-surface-primary` | Default Card / primary panels; `MainContent` `fixed` outer panel |
| Menu rail | Menu’s own surface tokens | Do not paint the menu with ad-hoc page backgrounds |

Main has **no built-in padding**. Prefer **24px** (`--uds-spacing-24`) on **edge** `MainContent`; **fixed** pads the inner 1000px only (outer has no L/R padding) — see [`appshell-main-containment`](./appshell-main-containment.md).

Theme alias: `--secondary` and `--muted` map to `--uds-surface-secondary` in `components.css`, but prefer the explicit UDS token in shell CSS.

## Do not

- Paint `.appshell--main` or `.appshell--body` with `--uds-surface-primary`, raw white/hex, or brand fills
- Override the canvas with a one-off Tailwind `bg-*` on `AppShell.Main` children wrappers (unless a documented recipe exception)
- Confuse **button** `surface-secondary` tokens with **page** `--uds-surface-secondary`

**Exception:** `MainContent` with `containment="fixed"` places a **surface-primary panel** (max 1280px, border-right) **on** the secondary canvas — that is intentional. See [`appshell-main-containment`](./appshell-main-containment.md). Do not recolor the whole Main region to primary instead.

## UDS implementation

In `app-shell.css`, the body region sets:

```css
.appshell--body {
  background: var(--uds-surface-secondary);
}
```

`.appshell--main` sits inside the body and inherits that canvas. Content cards should remain primary surfaces so they lift off the secondary page.

## Example

```tsx
<AppShell menu={<Menu navigationItems={items} />} enableRouterOutlet={false}>
  <AppShell.Main>
    {/* Canvas is surface-secondary from the shell — do not re-bg the page */}
    <Card>{/* card uses surface-primary */}</Card>
  </AppShell.Main>
</AppShell>
```

## How AI should reason

1. Authenticated layout → `AppShell` + `Menu`.
2. Assume page canvas is `--uds-surface-secondary` (already on the shell body).
3. Place primary surfaces (`Card`, etc.) on that canvas—do not make the whole Main primary white.
4. Never hardcode `bg-white` / hex on the AppShell body.

Confidence: Required — AppShell body/main canvas uses `--uds-surface-secondary`.

## Relationships

### Supports

- Hierarchy between page canvas and content cards
- Dashboard / settings readability

### Requires

- AppShell regions, color tokens

### Influences

- Card usage, dashboard recipes, forms in Main

### Uses

- `--uds-surface-secondary` on `.appshell--body`
- `--uds-surface-primary` on cards/panels

### Conflicts With

- Full-bleed primary (white) Main wrappers
- Hardcoded page backgrounds
- Brand-colored page canvases

### Alternatives

- Unauthenticated / marketing surfaces outside AppShell (not this rule)

### Depends On

- color, grammar-regions

### Referenced By

- grammar/regions.md
- ontology/appshell.md
- foundations/color.md
- ai/indexes/concept-index.md (after generate:ai)

## See also

- [AppShell regions](../grammar/regions.md)
- [AppShell.Main containment](./appshell-main-containment.md)
- [AppShell ontology](../ontology/appshell.md)
- [Color](../foundations/color.md)
- [Cards](../patterns/cards.md)
