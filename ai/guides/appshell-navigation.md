# AppShell navigation and main content

Normative machine-readable contract: [`ai/appshell.schema.json`](../appshell.schema.json).

## Brand default

`Menu` applies **`document.documentElement.dataset.brand`** and header **`Branding`** from the **`brand`** prop (default **`chg`**). Product apps and the docs site both use **`defaultBrand="chg"`** unless a stored brand exists in `localStorage`.

## Header identity: product logo vs plain text

| Mode | When | Props |
| --- | --- | --- |
| **Brand** (default) | CHG product apps (`connect`, `comphealth`, `weatherby`, …) | `brand="connect"` — logos from `Branding` |
| **Title** | Internal tools, dynamic app names, no approved lockup | `headerVariant="title"` + `headerTitle` (+ optional `headerShortTitle`) |

Full decision rules, examples, and anti-patterns: **[`menu-header-identity.md`](./menu-header-identity.md)**.

## Canonical pattern (Option A — recommended)

Use the package **`Menu`** in the **`menu`** slot. AppShell shipped CSS offsets the content column from **`[data-slot="uds-menu-root"]`** (280px expanded / 64px collapsed). This is the only pattern that works without consumer layout hacks.

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
| `headerRight` / `AppShell.Header` | Trailing actions for the built-in `Header` (search + actions). |
| `footer` / `AppShell.Footer` | Scrolls with main content at the bottom of the main column. |
| `className` | On root `[data-slot="appshell"]`; use `min-h-dvh w-full min-w-0`. |

**Not on the published API:** `sidebarWidth`, `showListview`, `mainClassName` — use `listview={node}` and classes on `AppShell` / `AppShell.Main` instead.

## Main region: `<Outlet />` + `AppShell.Main`

Inside `.appshell--main`, AppShell renders (in order):

1. Optional **`<Outlet />`** (when `enableRouterOutlet` is `true`, default).
2. **`AppShell.Main`** children (or unmarked children parsed as main).

### Static app (no React Router)

```tsx
<AppShell enableRouterOutlet={false} menu={<Menu {...menuProps} />}>
  <AppShell.Main>{dashboard}</AppShell.Main>
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

## Debug checklist

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Content pushed to bottom / double stack | Page in loose children **and** outlet; page root uses `flex-1` / `h-full` fighting shell flex | Put UI in **`AppShell.Main`** only; avoid `flex-1` on the page root inside the shell |
| Main area empty | `enableRouterOutlet={true}` but no matching child route / no parent `Router` | Add routes under the layout route, or set **`enableRouterOutlet={false}`** and use **`AppShell.Main`** |
| Main empty after “fix” | CSS hiding `.appshell--main > :first-child` (e.g. `max-height: 0`) | **Remove** that hack; fix composition instead |
| Rail overlaps content / wrong offset | `Sidebar` in `menu` instead of `Menu` | Use **`<Menu />`** in **`menu`**, or add full rail CSS yourself |
| Brand switcher / rail width wrong | Expecting `sidebarWidth` prop | Use **`Menu`** expand/collapse (`data-expanded` on `uds-menu-root`); widths are 280px / 64px in `app-shell.scss` |

## Listview (master–detail)

When `listview` is set:

1. `AppShell` uses `className="min-h-dvh w-full min-w-0"` and locks to `100dvh` while the listview is open.
2. **Only `.appshell--main` scrolls** (dashboard / detail in `AppShell.Main`).
3. The listview column stays in the flex row (no consumer `position: fixed`).
4. Structure the `listview` slot:

```tsx
<div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
  <div className="shrink-0 border-b px-4 py-3">Today&apos;s queue</div>
  <div data-slot="appshell-listview-scroll" className="p-3">
    <ItemGroup>{/* rows */}</ItemGroup>
  </div>
</div>
```

CSS variables on `[data-slot="appshell"]`: `--appshell-listview-width`, `--appshell-menu-width-expanded`, `--appshell-menu-width-collapsed`, `--appshell-header-height`.

## Anti-patterns

- Do **not** put `Sidebar collapsible="none"` in `menu` and add `fixed inset-y-0 w-[280px]` — use **`Menu`**.
- Do **not** add a second `BrowserRouter` only around page content expecting it to feed AppShell’s outlet.
- Do **not** collapse `.appshell--main > :first-child` to hide an empty outlet.
- Do **not** use `h-full flex-1` on the outermost page wrapper inside main unless you understand the shell flex column.
