# Detail With Listview

## When to use it

Use for master-detail, search results, inboxes, queues, or review workflows where a persistent secondary pane improves scanning.

## Required layout primitives

- **`AppShell`** with **`className="min-h-dvh w-full min-w-0"`**, **`menu={<Menu … />}`**, and **`listview={…}`** (non-null opens the listview column).
- **`AppShell.Main`** for detail content (only this region scrolls when listview is open).
- **`html`**, **`body`**, **`#root`**: `min-height: 100dvh` (see `setup.md`).

There is no **`showListview`** prop — pass **`listview`** or omit it.

## Listview scroll contract

The shipped shell keeps the **listview column in the flex row** (no consumer `position: fixed`). When `listview` is set:

| Region | Scrolls? |
| --- | --- |
| `.appshell--main` | **Yes** — dashboard / detail |
| `.appshell--listview-open` | **No** — pane is `overflow: hidden` |
| List body inside `listview` | **Yes** — use `data-slot="appshell-listview-scroll"` |

Structure the `listview` slot as one full-height column:

```tsx
const listview = (
  <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
    <motion.div className="shrink-0 border-b px-4 py-3">{/* title, filters — does not scroll */}</div>
    <div data-slot="appshell-listview-scroll" className="p-3">
      <ItemGroup>{/* queue rows */}</ItemGroup>
    </div>
  </div>
)
```

## CSS variables (no magic numbers)

Defined on `[data-slot="appshell"]`:

- `--appshell-menu-width-expanded` (280px)
- `--appshell-menu-width-collapsed` (64px)
- `--appshell-listview-width` (320px)
- `--appshell-header-height` (3.5rem)

Menu collapse updates body offset automatically; listview stays in-flow beside main.

## Forbidden substitutions

- Do not replace the **`listview`** slot with an ad hoc flex split outside AppShell.
- Do not set **`overflow-y: auto`** on the outer listview wrapper (scroll the inner `appshell-listview-scroll` region only).
- Do not use **`position: fixed`** on `.appshell--listview` unless you own all offsets yourself.

## JSX skeleton

```tsx
<AppShell
  className="min-h-dvh w-full min-w-0"
  menu={<Menu {...menuProps} />}
  listview={listView}
  enableRouterOutlet={false}
>
  <AppShell.Main>{/* detail — scrolls independently */}</AppShell.Main>
</AppShell>
```

## Canonical example

[`ai/examples/detail-with-listview.tsx`](../examples/detail-with-listview.tsx)

## Brand application

Use `Item` rows in the scroll region, `Status` for state cues, `Badge` for labels, and token-backed borders or muted surfaces for selection and hierarchy.
