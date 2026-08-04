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

## Required: listview pane composition

**`Toolbar`** is the primary titlebar for the content below. Entities are **`Item`** or **`Card`**. Canonical:

```tsx
const listview = (
  <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
    <div className="shrink-0">
      <Toolbar size="lg" aria-label="Clinician queue">
        <ToolbarCenter>
          <ToolbarTitle>Clinician queue</ToolbarTitle>
          <ToolbarDescription>6 records</ToolbarDescription>
        </ToolbarCenter>
      </Toolbar>
      <div className="border-b border-border p-[length:var(--uds-spacing-4)]">
        <SearchInput inputSize="sm" placeholder="Search clinician queue…" />
      </div>
    </div>
    <div data-slot="appshell-listview-scroll" className="min-h-0 flex-1">
      <ItemGroup className="gap-0">
        <Item appearance="list" variant={selected ? "muted" : "default"}>
          <ItemContent>
            <ItemTitle>…</ItemTitle>
            <ItemDescription>Specialty · Place</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Status appearance="outlined" size="compact" variant="success">
              Available
            </Status>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  </div>
)
```

| Region | Rule |
| --- | --- |
| Titlebar | **`Toolbar`** — queue name in `ToolbarTitle`, count/meta in `ToolbarDescription`; optional Start/End actions. Prefer `size="lg"` for stacked title + description |
| SearchInput | **Required** when present: **4px** padding on all sides around the field (`p-[length:var(--uds-spacing-4)]`) **and** `border-b` on the wrapper — never flush to the pane |
| Entities | **`Item`** (dense queues: `appearance="list"`, `ItemGroup gap-0`) **or** **`Card`** (+ `CardContent`) for richer entity surfaces |
| Trailing chrome (Item) | **One** `Status` (`outlined` + `compact`) in `ItemActions` |
| Selection (Item) | `variant="muted"` |

**FAIL IF:** custom title/count header instead of Toolbar; ad-hoc entity rows instead of Item/Card; listview SearchInput without 4px pad or without bottom border.

See [`design-language/semantics/listview-drives-main.md`](../../design-language/semantics/listview-drives-main.md).

## CSS variables (no magic numbers)

Defined on `[data-slot="appshell"]`:

- `--appshell-menu-width-expanded` (280px)
- `--appshell-menu-width-collapsed` (56px)
- `--appshell-listview-width` (**320–480px**, default **320**; set via `listviewWidth`)
- `--appshell-listview-width-min` / `--appshell-listview-width-max` (320 / 480)
- `--appshell-header-height` (3.5rem)

Menu collapse updates body offset automatically; listview stays in-flow beside main.

## Forbidden substitutions

- Do not replace the **`listview`** slot with an ad hoc flex split outside AppShell.
- Do not set **`overflow-y: auto`** on the outer listview wrapper (scroll the inner `appshell-listview-scroll` region only).
- Do not use **`position: fixed`** on `.appshell--listview` unless you own all offsets yourself.
- Do not invent a custom title/count block — use **`Toolbar`**.

## JSX skeleton

```tsx
<AppShell
  className="min-h-dvh w-full min-w-0"
  menu={<Menu {...menuProps} />}
  listview={listView}
  listviewWidth={320} /* 320–480 based on content need */
  enableRouterOutlet={false}
>
  <AppShell.Main>{/* detail — scrolls independently */}</AppShell.Main>
</AppShell>
```

## Canonical example

[`ai/examples/detail-with-listview.tsx`](../examples/detail-with-listview.tsx)
