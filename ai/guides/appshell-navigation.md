# AppShell navigation and main content

Normative machine-readable contract: [`ai/appshell.schema.json`](../appshell.schema.json).

## Brand default

Set **`brand`** on **`AppShell`** (default **`chg`**) for Header wordmark + inherited Menu tokens. `Menu` still applies **`document.documentElement.dataset.brand`** (and may pass `brand` / `brandStorageKey` for switchers). Product apps use **`chg`** unless overridden.

## Header identity: product logo vs plain text

Branding + the menu toggle live in the full-width **AppShell Header** (Menu is nav-only inside AppShell).

| Mode | When | Props on **AppShell** |
| --- | --- | --- |
| **Brand** (default) | CHG product apps (`connect`, `comphealth`, `weatherby`, …) | `brand="connect"` — wordmark from `Branding` |
| **Title** | Internal tools, dynamic app names, no approved lockup | `headerVariant="title"` + `headerTitle` |

Full decision rules, examples, and anti-patterns: **[`menu-header-identity.md`](./menu-header-identity.md)**.

## Canonical pattern (Option A — recommended)

Use the package **`Menu`** in the **`menu`** slot. AppShell shipped CSS offsets the content column from **`[data-slot="uds-menu-root"]`** (280px expanded / 56px collapsed). This is the only pattern that works without consumer layout hacks.

```tsx
import {
  AppShell,
  Menu,
  type MenuNavigationItem,
  TooltipProvider,
} from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"

const navigationItems: MenuNavigationItem[] = [
  { id: "overview", label: "Overview" },
  { id: "clinicians", label: "Clinicians" },
]

export function WorkspaceLayout() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="overview"
            onNavigationSelect={(id) => {
              /* route or state */
            }}
          />
        }
      >
        <AppShell.Main>{/* page content */}</AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
```

## `Menu` vs `Sidebar*`

| Surface | Use for |
| --- | --- |
| **`Menu`** | Product shell rail inside **`AppShell.menu`** (authenticated apps). |
| **`Sidebar*`** | In-page side panels, settings sub-nav, or layouts **outside** AppShell — not the AppShell rail unless you own all positioning CSS. |

`menu.tsx` documents that the rail is **built from `Menu` only** — do not compose it from `Sidebar`, `DropdownMenu`, etc.

## Published `AppShell` props (match `dist/index.d.ts`)

| Prop | Purpose |
| --- | --- |
| `menu` | Sidebar rail content (canonical: `<Menu />`). |
| `sidebar` | **Deprecated alias** of `menu` for older docs only. |
| `enableRouterOutlet` | Default `true`. Set `false` when the app does not use React Router with this shell. |
| `listview` | Optional master-detail column; omit to collapse. |
| `headerRight` / `AppShell.Header` | Trailing **utility** actions for the built-in `Header` (help, notifications, account). Do **not** add an additional `SearchInput` here — Header already provides leading search (`headerSearchProps` / default search), unless you set `hideSearch` or `headerLeading`. |
| `hideSearch` | When `true`, omit the Header SearchInput (and skip-to-search). |
| `headerLeading` | Custom Header leading content (replaces SearchInput). Implies search is hidden. |
| `footer` / `AppShell.Footer` | Last child inside `.appshell--main` (document flow, not fixed/absolute); **48px** above; scrolls with page content. |
| `showSkipToContent` | Default `true`. Skip link; jumps to `#uds-appshell-main`. |
| `skipToContentLabel` | Default `"Skip to content"`. |
| `showSkipToSearch` | Default `true`. Skip link; jumps to Header search `#uds-appshell-search` (bypasses the menu rail). |
| `skipToSearchLabel` | Default `"Skip to search"`. |
| `mainContentId` | Default `uds-appshell-main` — id on the `<main>` landmark. |
| `searchContentId` | Default `uds-appshell-search` — id on Header `SearchInput` (overridden by `headerSearchProps.id`). |
| `className` | On root `[data-slot="appshell"]`; use `min-h-dvh w-full min-w-0`. |

**Not on the published API:** `sidebarWidth`, `showListview`, `mainClassName` — use `listview={node}` and classes on `AppShell` / `AppShell.Main` instead.

## Accessibility helpers

AppShell ships a **skip nav** (`.appshell-skip-nav`) as the first focusable region:

1. **Skip to content** → `<main id="uds-appshell-main" tabindex="-1">`
2. **Skip to search** → Header `SearchInput` (`#uds-appshell-search`), so keyboard/AT users do not tab through the entire menu rail to reach search

Links are visually hidden until focused. Header wraps default search in `role="search"` for landmark navigation. Do not nest another `<main>` inside `AppShell.Main`.

## Main region: `<Outlet />` + `AppShell.Main`

Inside `main.appshell--main`, AppShell renders (in order):

1. Optional **`<Outlet />`** (when `enableRouterOutlet` is `true`, default).
2. **`AppShell.Main`** children (or unmarked children parsed as main).
3. Optional **`AppShell.Footer`** / `footer` — last child, document flow (not fixed/absolute), with **48px** (`--uds-spacing-48`) above.

### Content containment (`MainContent`)

The Main canvas is always **`--uds-surface-secondary`**. Wrap page UI in **`MainContent`**:

| `containment` | Behavior |
|---------------|----------|
| **`edge`** (default) | Content goes edge to edge on the secondary canvas. Recommend **24px** padding on `MainContent`. |
| **`fixed`** | Outer max **1280px** (`--uds-container-xl`), **surface-primary**, **1px border-right**, **no L/R padding**, height follows content (**no min-height**). Inner max **1000px** with **24px padding** built in. Do not wrap the page in an extra box. |

`.appshell--main` uses **`--uds-surface-secondary`**. Edge `MainContent` has no built-in padding — **recommend** `className="p-[length:var(--uds-spacing-24)]"`. Fixed mode pads the **inner** column only.

**Page body:** stack sections with gap **16 or 24**; prefer **2–3 columns**; pad designed boxed components (`CardContent`). **Never more than 24px** between `PageHeader` bottom and the first content item. See [`appshell-main-containment`](../../design-language/semantics/appshell-main-containment.md) and [`page-header`](../../design-language/ontology/page-header.md).

See [`design-language/semantics/appshell-main-containment.md`](../../design-language/semantics/appshell-main-containment.md).

```tsx
<AppShell.Main>
  <MainContent containment="fixed">{/* inner already has 24px; no outer L/R pad */}
    …
  </MainContent>
</AppShell.Main>
```

### Static app (no React Router)

```tsx
<AppShell enableRouterOutlet={false} menu={<Menu {...menuProps} />}>
  <AppShell.Main>
    <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
      {dashboard}
    </MainContent>
  </AppShell.Main>
</AppShell>
```

### Routed app (React Router)

Wrap the shell in **one** `<BrowserRouter>` (or `RouterProvider`) and nest routes so the layout route renders `AppShell` and child routes render into the shell outlet:

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<ShellLayout />}>
      <Route path="dashboard" element={<DashboardPage />} />
    </Route>
  </Routes>
</BrowserRouter>

function ShellLayout() {
  return (
    <AppShell menu={<Menu {...menuProps} />}>
      {/* Routed pages render in the bundled <Outlet />; optional chrome in AppShell.Main */}
    </AppShell>
  )
}
```

Install **`react-router-dom`** as a peer when using `enableRouterOutlet` (default). The shell does not ship a public router wrapper.

### Content-only pages under a layout route

For multi-page product apps, keep **one** shell layout that owns `AppShell` + `Menu`. Child routes render **page content only** into the bundled `<Outlet />` — do not nest another `AppShell` / `Menu` on each page.

```tsx
import { useLocation, useNavigate } from "react-router-dom"
import { AppShell, Menu, type MenuNavigationItem } from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "queue", label: "My queue" },
  {
    id: "group:dashboards",
    label: "Dashboards",
    children: [
      { id: "triage", label: "Triage" },
      { id: "analytics", label: "Analytics" },
    ],
  },
]

function ShellLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const activeId =
    pathname.includes("analytics") ? "analytics" :
    pathname.includes("triage") ? "triage" :
    "queue"

  return (
    <AppShell
      className="min-h-dvh w-full min-w-0"
      menu={
        <Menu
          navigationItems={navigationItems}
          activeId={activeId}
          onNavigationSelect={(id) => {
            if (id.startsWith("group:")) return
            void navigate(id === "queue" ? "/queue" : `/${id}`)
          }}
        />
      }
    />
  )
}

// Page modules export body chrome only, e.g.:
// export function TriagePage() {
//   return <div className="flex min-w-0 flex-col gap-6 p-4 md:p-6">…</div>
// }
```

With default **`enableRouterOutlet={true}`**, child routes render **only** through AppShell’s bundled `<Outlet />`. **FAIL:** do **not** also put `<Outlet />` (or full page UI) as AppShell children — that double-mounts the page and causes overlapping / duplicated chrome.

If you prefer an explicit outlet in the tree, set **`enableRouterOutlet={false}`** and render **one** `<Outlet />` inside **`AppShell.Main`** — never both.

**Grouped nav:** use `MenuNavigationItem.children` for collapsible parents (icon on the group row; leaf rows typically omit icons). Map registry/route ids → paths in `onNavigationSelect`; ignore group parent ids.

**Do not** wrap each page in a second `BrowserRouter`, or put page UI in both `AppShell.Main` and a child route at the same time unless you intend dual regions.

## Debug checklist

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Overlapping / duplicated page chrome | `<Outlet />` (or page UI) as AppShell children **while** `enableRouterOutlet` is `true` | Use **one** outlet only: bundled outlet **or** `enableRouterOutlet={false}` + one `<Outlet />` in `AppShell.Main` |
| Content pushed to bottom / double stack | Page in loose children **and** outlet; page root uses `flex-1` / `h-full` fighting shell flex | Put UI in **`AppShell.Main`** only; avoid `flex-1` on the page root inside the shell |
| Main area empty | `enableRouterOutlet={true}` but no matching child route / no parent `Router` | Add routes under the layout route, or set **`enableRouterOutlet={false}`** and use **`AppShell.Main`** |
| Main empty after “fix” | CSS hiding `.appshell--main > :first-child` (e.g. `max-height: 0`) | **Remove** that hack; fix composition instead |
| Rail overlaps content / wrong offset | `Sidebar` in `menu` instead of `Menu` | Use **`<Menu />`** in **`menu`**, or add full rail CSS yourself |
| Brand switcher / rail width wrong | Expecting `sidebarWidth` prop | Use **`Menu`** expand/collapse (`data-expanded` on `uds-menu-root`); widths are 280px / 56px in `app-shell.css` |

## Listview (master–detail)

When `listview` is set:

1. `AppShell` uses `className="min-h-dvh w-full min-w-0"` and locks to `100dvh` while the listview is open.
2. **Only `.appshell--main` scrolls** (dashboard / detail in `AppShell.Main`).
3. The listview column stays in the flex row (no consumer `position: fixed`).
4. Structure the `listview` slot:

```tsx
<div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
  <div className="shrink-0 border-b px-4 py-2">Today&apos;s queue</div>
  <div data-slot="appshell-listview-scroll" className="p-3">
    <ItemGroup>{/* rows */}</ItemGroup>
  </div>
</div>
```

CSS variables on `[data-slot="appshell"]`: `--appshell-listview-width` (**320–480px**, default 320; prefer prop `listviewWidth`), `--appshell-listview-width-min` / `--appshell-listview-width-max`, `--appshell-menu-width-expanded`, `--appshell-menu-width-collapsed`, `--appshell-header-height`.

## Anti-patterns

- Do **not** put `Sidebar collapsible="none"` in `menu` and add `fixed inset-y-0 w-[280px]` — use **`Menu`**.
- Do **not** add a second `BrowserRouter` only around page content expecting it to feed AppShell’s outlet.
- Do **not** collapse `.appshell--main > :first-child` to hide an empty outlet.
- Do **not** use `h-full flex-1` on the outermost page wrapper inside main unless you understand the shell flex column.
