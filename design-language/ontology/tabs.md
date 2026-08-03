---
id: tabs-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - navigation
  - grammar-hierarchy
components:
  - Tabs
  - TabsList
  - TabsTrigger
  - TabsContent
patterns:
  - navigation
tokens:
  - "--uds-spacing-24"
  - "--uds-gap-24"
depends_on:
  - grammar-hierarchy
  - spacing-levels
influences:
  - navigation
conflicts_with: []
alternatives: []
design_intent:
  - navigation
  - scanability
---
# Tabs

## What

`Tabs` **is-a** page-local navigation control that partitions related views into peer panels without leaving the page.

## API (system facts)

| Part | Role |
|------|------|
| `Tabs` | Root (`orientation` horizontal default / vertical) |
| `TabsList` | Tab strip — `variant` **`line`** (underline, preferred default) or `default` (pill); **`fill`** |
| `TabsTrigger` | One tab |
| `TabsContent` | Panel for the active value |

**Vertical = same chrome as horizontal.** `orientation="vertical"` rotates the strip: `line` uses a **right** border track + active indicator (same 2px brand token as the bottom underline); `default` keeps the pill container. Same type, colors, and hover/active states. Line padding: horizontal **`px-6` / `py-3`**; vertical **`px-6` / `py-2`** (8px top/bottom). Do **not** hand-roll `border-r border-b-0` on `TabsList`.

**Vertical sizing (Required):** Labels are **left-aligned**. The list **hugs the longest label** with a **minimum width of 200px** (no full-width / `fill` mode when vertical — `fill` is horizontal-only).

## Variant — underline preferred

**Preferred:** Use **`variant="line"`** (underlined active tab). This is the package default — omit the prop or pass `line` explicitly.

| `TabsList` `variant` | When |
|----------------------|------|
| **`line`** (default) | Page sections, detail panels, settings — **preferred** |
| `default` | Pill / segmented control look when the strip should read as a contained switcher |

Do **not** default new UI to the pill strip (`variant="default"`) unless that denser switcher treatment is intentional.

```tsx
<Tabs defaultValue="overview" className="flex flex-col gap-[length:var(--uds-gap-24)]">
  <TabsList>{/* line + fill={false} are defaults */}</TabsList>
  <TabsContent value="overview">{/* 24px from TabsList */}</TabsContent>
</Tabs>
```

Confidence: Preferred — Tabs `variant="line"` (underlined).

## Spacing after TabsList (Required)

**Required:** Always leave **24px** between the tab strip (`TabsList`) and the next item — typically `TabsContent`, or the next sibling section if content sits outside `TabsContent`.

Prefer root gap or content margin with the spacing token:

```tsx
{/* Prefer */}
<Tabs defaultValue="overview" className="flex flex-col gap-[length:var(--uds-gap-24)]">
  <TabsList>…</TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>

{/* Or */}
<TabsContent value="overview" className="mt-[length:var(--uds-spacing-24)]">…</TabsContent>
```

**FAIL IF:** TabsList sits tight against the panel (`mt-0`, `mt-2`, `mt-3`, `pt-2`, `gap-2` / `gap-3`, or any gap other than **24** between strip and next content).

Confidence: **Required** — 24px between TabsList and the next item.

## Layout — condensed triggers, full-width list (preferred)

**Preferred:** `fill={false}` (package default). The **TabsList container stays `w-full`** (underline / strip spans the content band); **triggers stay condensed** (hug label width, left-aligned).

| Prop | Behavior | When |
|------|----------|------|
| **`fill={false}`** (default) | List `w-full`; triggers do **not** `flex-1` | Horizontal tabs in Main / cards / settings — **preferred** |
| `fill={true}` | List `w-full`; triggers share width equally | Intentional equal-width tab bars only |

Do **not** use equal-width (`fill={true}`) as the default look for **horizontal** tabs. Do **not** shrink a horizontal list to content width — the strip/border must still span the band.

**Vertical:** ignore `fill` — the list always hugs the longest label; labels stay left-aligned. Do **not** set a fixed list width or force `w-full` on the rail.

**FAIL IF:** Horizontal tabs use equal-flex triggers by default; or a horizontal list hugs content so the underline stops mid-band. **FAIL IF:** Vertical tabs are stretched full-width or center-aligned.

Confidence: Preferred — Tabs `fill={false}` (condensed triggers; list still full width when horizontal).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | In-page section navigation |
| **appears in** | Settings, dashboards, detail panels |
| **does-not** | Replace AppShell `Menu` / product rail |

## Settings nav panel (Required)

**Required:** When composing the **[`settings-nav-panel`](../../ai/recipes/settings-nav-panel.md)** pattern (many settings sections, in-Main nav | panel), use **`Tabs` with `orientation="vertical"`** (prefer `variant="line"`). Do **not** substitute a hand-rolled `Item` list or horizontal tabs for that side rail.

Canonical: [`ai/examples/settings-nav-panel.tsx`](../../ai/examples/settings-nav-panel.tsx).

Confidence: **Required** — vertical Tabs for settings-nav-panel section navigation.

## How AI should reason

1. Page-local peer panels → `Tabs` (not a second Menu rail).
2. **Settings with many sections** → vertical `Tabs` via [`settings-nav-panel`](../../ai/recipes/settings-nav-panel.md).
3. Prefer **`variant="line"`** (underlined, default) over the pill strip.
4. Prefer **`fill={false}`** (default) — condensed triggers; list still full width when horizontal.
5. Put **24px** between `TabsList` and the next item (`gap-24` on `Tabs` or `mt` / spacing **24** on `TabsContent`).
6. Use `fill={true}` only for horizontal equal-width triggers.
7. Vertical → left-aligned labels; list hugs the longest label (`fill` does not apply).

Confidence: Preferred — Tabs underlined (`line`); condensed triggers (`fill={false}`).

Confidence: Required — 24px between TabsList and the next item.

Confidence: Required — vertical Tabs for settings-nav-panel.

## Relationships

### Supports

- Page-local navigation

### Conflicts With

- Equal-width flex triggers as the default horizontal look
- Content-hugging TabsList that cuts the underline short
- Tight TabsList → content gaps (not 24px)

### Alternatives

- In-page anchors for long single-scroll pages

### Depends On

- grammar-hierarchy
- spacing-levels

### Referenced By

- ai/indexes/component-index.md

## See also

- [Navigation](../patterns/navigation.md)
- [Spacing levels](../semantics/spacing-levels.md)
- [Ontology index](./README.md)
