# UDS AppShell — Layout and Composition Reference

You are working with the AppShell layout component from the UDS (Unified Design System) package. This document describes its slot system, positioning mechanics, responsive coordination with the Menu rail, and the Header / Footer / Listview sub-components. Use this as the authoritative reference when generating or modifying code that involves AppShell.

---

## 1. Package Contract

- Import components from `uds-tailwind-test`
- Import styles from `uds-tailwind-test/styles.css`
- Icons: use `@phosphor-icons/react` (Phosphor Icons), weight `"bold"` by default
- Never import from internal paths like `src/components/ui/*` or `dist/*`

---

## 2. Component API

```tsx
import { AppShell, Header, Footer, Menu } from "uds-tailwind-test"
import "uds-tailwind-test/styles.css"
```

### AppShellProps

```ts
type AppShellProps = React.ComponentProps<"div"> & {
  menu?: React.ReactNode      // Fixed sidebar slot (typically a configured <Menu>)
  headerRight?: React.ReactNode // Trailing Header actions
  headerLeading?: React.ReactNode // Custom Header leading (replaces SearchInput)
  hideSearch?: boolean        // Omit Header SearchInput
  headerSearchProps?: SearchInputProps
  listview?: React.ReactNode  // Optional animated secondary pane (e.g. record list, search results)
  footer?: React.ReactNode    // In-flow at end of appshell--main (not fixed); 48px above
}
```

All four slots are optional. Pass `undefined` / omit to hide any region.

---

## 3. DOM Structure

AppShell renders this tree:

```
div.appshell [data-slot="appshell"]
├── div.appshell--chrome        (full-width Header: toggle + brand + search + trailing)
│   └── <Header />
├── div.appshell--workspace
│   ├── div.appshell--menu      (when menu is provided; under chrome)
│   │   └── <Menu /> (nav-only; branding lives in Header)
│   ├── button.appshell--scrim  (below lg when drawer open)
│   └── div.appshell--body
│       └── div.appshell--content
│           ├── div.appshell--listview [.appshell--listview-open]
│           │   └── listview content (fixed-width inner, animated container)
│           └── div.appshell--main-column
│               └── main.appshell--main
│                   ├── <Suspense> → <Outlet /> (React Router)
│                   ├── {children / AppShell.Main}
│                   └── div.appshell--footer?  (in-flow after content; not fixed/absolute)
│                       └── <Footer />
```

`<Outlet />` from React Router is rendered automatically inside `appshell--main` via `<Suspense>`, so routed pages appear there without extra wiring. Direct `children` / `AppShell.Main` render after the Outlet. Optional `AppShell.Footer` is the **last** child of `.appshell--main` (document flow).

---

## 4. Layout Geometry (SCSS)

### Constants

| Token | Value | Purpose |
|-------|-------|---------|
| `$menu-expanded` | 280px | Menu rail width when expanded |
| `$menu-collapsed` | 56px | Menu rail width when collapsed |
| `$listview-width` | 320–480px (default 320) | Secondary pane width (`listviewWidth` / `--appshell-listview-width`) |

### Root `.appshell`

- `display: flex; flex-direction: column`
- `min-height: 100vh; width: 100%`
- `background: var(--background); font-family: var(--font-sans); color: var(--foreground)`

### Body `.appshell--body`

- `flex: 1; flex-direction: column; min-height: 0`
- **`margin-left: 280px`** (expanded menu) or **`56px`** (collapsed menu)
- `transition: margin-left 200ms ease-out`
- Menu state is detected purely via CSS: `:has([data-slot="uds-menu-root"][data-expanded="false"])`

### Chrome `.appshell--chrome`

- Full-width **fixed** Header at the top of the viewport (`position: fixed; top: 0`, `height: var(--appshell-header-height)` / `3.5rem`) — same pinning model as Menu (no overscroll bounce)
- AppShell pads `padding-top: var(--appshell-header-height)` so the workspace clears the chrome
- Contains menu toggle + brand/title + search + trailing (`brand` / `headerVariant` / `headerTitle` on AppShell)
- Menu rail is fixed under the chrome (`top: var(--appshell-header-height)`)
- Below `lg`: menu is an overlay drawer; `.appshell--scrim` closes it; body is full width

### Footer `.appshell--footer`

- **Not** `position: fixed` or `absolute` — `position: static` in document flow
- When **`MainContent`** is on the page, the footer **portals into** `data-slot="main-content-footer"` (inside the active edge/fixed container)
- Otherwise rendered as the **last child inside `.appshell--main`** (after Outlet and main children)
- **`margin-top: var(--uds-spacing-48)`** (48px space above the footer)
- `flex-shrink: 0; width: 100%` — scrolls with page content
- When present as a main sibling, preceding main children do not `flex-grow` so the footer is not pinned to the scrollport bottom
- Nested `[data-slot="uds-footer"]` has its top border suppressed in shell CSS

### Content `.appshell--content`

- `display: flex; flex: 1; min-height: 0`
- Horizontal flex row containing the listview pane and the main area side by side

### Main `.appshell--main`

- `flex: 1; flex-direction: column; min-width: 0; min-height: 0`
- This is where page content renders

---

## 5. Listview Animation

The listview uses a reveal + fade pattern (not a squish):

### Container `.appshell--listview`

**Closed state (default):**
- `width: 0; min-width: 0; overflow: hidden; flex-shrink: 0`
- `border-right: 0 solid transparent`
- Inner content (`> *`): `width/min-width/max-width: var(--appshell-listview-width)` (320–480px); `opacity: 0`
- Transition: `width 250ms ease-out, min-width 250ms ease-out, border-color 250ms ease-out`
- Inner content transition: `opacity 250ms ease-out`

**Open state `.appshell--listview-open`:**
- `width/min-width: var(--appshell-listview-width)` (320–480px); pane `overflow: hidden`
- `border-right: var(--uds-border-width-1) solid var(--border)`
- Inner content (`> *`): `opacity: 1`

The container expands from 0 to `--appshell-listview-width` (320–480px; default 320, set via `listviewWidth`) while inner content stays fixed at that width. The container clips with `overflow: hidden`, acting as a reveal mask. Content fades in simultaneously (same 250ms timing).

### Triggering

Listview opens when `listview` prop is not `undefined`/`null`:

```tsx
<AppShell
  menu={<Menu ... />}
  listview={showListview ? <MyListviewContent /> : undefined}
>
```

---

## 6. Menu Coordination

AppShell does **not** manage the Menu's expand/collapse state. The Menu component owns that internally via `useMenuRail()`. AppShell reacts to it purely through CSS:

```scss
// When menu reports collapsed, shift body inward
.appshell:has([data-slot="uds-menu-root"][data-expanded="false"]) .appshell--body {
    margin-left: 56px;
    width: calc(100% - 56px);
}
```

Body `margin-left` / `width` transition is 200ms ease-out to stay synchronized with the Menu rail's width transition.

The Header chrome and Menu rail are both `position: fixed` (header at `top: 0`; menu under `--appshell-header-height`). AppShell offsets `.appshell--body` via `margin-left`. Footer is **in-flow** at the end of `.appshell--main` (not separately left-offset).

---

## 7. Header Component

```tsx
import { Header } from "uds-tailwind-test"
```

### HeaderProps

```ts
type HeaderProps = React.ComponentProps<"header"> & {
  trailing?: React.ReactNode    // Right-aligned actions (icon buttons, avatar, dropdowns)
  searchProps?: SearchInputProps // Props for the default SearchInput (ignored when children provided or hideSearch)
  hideSearch?: boolean // Omit default SearchInput when children are not provided
}
```

### Default rendering

- `<header data-slot="uds-header">`
- Height: `h-15` (60px)
- `flex items-center gap-3 border-b border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] px-4`
- **Leading area (default):** `SearchInput` with `inputSize="sm"`, `variant="shortcut"`, placeholder "Search...", keyboard hint (Cmd+K). Wrapped in `flex-1 min-w-0 md:max-w-md`.
- **Leading area (custom):** Pass `children` to replace the search with breadcrumbs, page title, etc.
- **Trailing area:** `ml-auto flex items-center gap-1` — pass icon buttons, avatars, dropdown menus via `trailing` prop.

### SearchInput (default leading content)

The built-in search field uses the `InputGroup` pattern:
- Magnifying glass icon on the left (submit button)
- Text input `type="search"`
- When `variant="shortcut"`: trailing Kbd hint showing `⌘ K`
- Full width within its flex-1 container, capped at `md:max-w-md`

### Typical trailing composition

```tsx
<Header
  trailing={
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <QuestionIcon className="size-5" aria-hidden />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Help</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
            <BellIcon className="size-5" aria-hidden />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-[var(--uds-color-accent-red-500)] ring-2 ring-[var(--uds-surface-primary)]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="rounded-full px-0" aria-label="Account">
            <Avatar size="sm" className="size-8">
              <AvatarFallback className="text-xs">MT</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  }
/>
```

---

## 8. Footer Component

```tsx
import { Footer } from "uds-tailwind-test"
```

### FooterProps

```ts
type FooterLink = { label: string; href: string }

type FooterProps = React.ComponentProps<"footer"> & {
  copyright?: string       // Left-aligned text (defaults to "© {year} CHG Management, Inc. All rights reserved.")
  links?: FooterLink[]     // Right-aligned navigation links
}
```

### Default rendering

- `<footer data-slot="uds-footer">`
- `flex items-center justify-between gap-3 border-t border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] px-4 py-2`
- `text-xs text-[var(--uds-text-tertiary)]`
- Left: copyright string
- Right: `<nav aria-label="Footer links">` with anchor tags, `hover:text-[var(--uds-text-primary)] hover:underline`
- Pass `children` to fully replace the default content

### Typical usage

```tsx
<Footer
  links={[
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms & Conditions", href: "#terms" },
  ]}
/>
```

---

## 9. Loading State

AppShell includes a built-in Suspense fallback (`AppShellFallback`) that renders while lazy-loaded route components are loading:

- Centered container: `mx-auto max-w-4xl px-8 py-10 lg:max-w-5xl`
- Three animated pulse bars (heading width, two paragraph widths)
- `animate-pulse rounded bg-neutral-200 dark:bg-neutral-800`

This is automatic — no configuration needed.

---

## 10. CSS Custom Properties

| Property | Default | Purpose |
|----------|---------|---------|
| `--appshell-header-height` | `3.5rem` | Fixed header height (matches package Header `h-14`) |
| `--uds-spacing-48` | `48px` | Margin-top on `.appshell--footer` (space above in-flow footer) |
| `--background` | (theme) | AppShell root background |
| `--foreground` | (theme) | AppShell root text color |
| `--font-sans` | Inter Variable | Font family |
| `--uds-border-primary` | (token) | Header/Footer border color |
| `--uds-surface-primary` | (token) | Header/Footer background |
| `--uds-text-tertiary` | (token) | Footer text color |
| `--uds-text-primary` | (token) | Footer link hover color |
| `--border` | (theme) | Listview border-right color |
| `--uds-border-width-1` | (token) | Listview border-right width |

---

## 11. Complete Usage Example

```tsx
import { useState } from "react"
import {
  AppShell,
  Header,
  Footer,
  Menu,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  type MenuNavigationItem,
  type MenuUtilityItem,
} from "uds-tailwind-test"
import "uds-tailwind-test/styles.css"
import {
  BellIcon,
  LayoutIcon,
  BriefcaseIcon,
  UsersIcon,
  PhoneIcon,
  ChatCircleDotsIcon,
  QuestionIcon,
} from "@phosphor-icons/react"

const NAV_ITEMS: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "requests", label: "Requests", icon: BriefcaseIcon },
  { id: "providers", label: "Providers", icon: UsersIcon },
]

const UTILITIES: MenuUtilityItem[] = [
  { id: "phone", label: "888-888-8888", href: "tel:+18888888888", icon: PhoneIcon },
  { id: "feedback", label: "Feedback", href: "#feedback", icon: ChatCircleDotsIcon },
]

function App() {
  const [activeId, setActiveId] = useState("dashboard")
  const [showListview, setShowListview] = useState(false)

  return (
    <TooltipProvider>
      <AppShell
        menu={
          <Menu
            defaultExpanded
            navigationItems={NAV_ITEMS}
            activeId={activeId}
            onNavigationSelect={(id) => setActiveId(id)}
            utilities={UTILITIES}
          />
        }
        header={
          <Header
            trailing={
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
                      <QuestionIcon className="size-5" aria-hidden />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Help</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
                      <BellIcon className="size-5" aria-hidden />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </>
            }
          />
        }
        listview={
          showListview ? (
            <div className="flex h-full flex-col bg-white dark:bg-neutral-950">
              <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                <p className="text-sm font-semibold">Patient queue</p>
              </div>
              <div className="flex-1 overflow-auto p-3">
                {/* List items here */}
              </div>
            </div>
          ) : undefined
        }
        footer={
          <Footer
            links={[
              { label: "Privacy Policy", href: "#privacy" },
              { label: "Terms & Conditions", href: "#terms" },
            ]}
          />
        }
      >
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold">Page content</h1>
          <button onClick={() => setShowListview((v) => !v)}>
            Toggle listview
          </button>
        </main>
      </AppShell>
    </TooltipProvider>
  )
}
```

---

## 12. Layout Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│ viewport                                                             │
│ ┌────────────┬───────────────────────────────────────────────────────┐│
│ │            │  appshell--header (in-flow)                          ││
│ │            │  ┌─────────────────────────────────────────────────┐ ││
│ │  Menu      │  │ SearchInput              [Help] [Bell] [Avatar]│ ││
│ │  (fixed)   │  └─────────────────────────────────────────────────┘ ││
│ │            ├───────────────────────────────────────────────────────┤│
│ │  280px or  │  appshell--content                                   ││
│ │   56px     │  ┌──────────┬────────────────────────────────────────┤│
│ │            │  │ listview │  appshell--main (scrolls)              ││
│ │  Header    │  │ 320–480  │    <Outlet /> + AppShell.Main          ││
│ │  Brand     │  │ (animated│    ↕ 24px (--uds-spacing-24)           ││
│ │  Workspace │  │  reveal  │    appshell--footer (in-flow, static)  ││
│ │  Nav items │  │  + fade) │    © … · Privacy · Terms               ││
│ │  Utilities │  │          │                                        ││
│ │            │  └──────────┴────────────────────────────────────────┤│
│ └────────────┴───────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

Header chrome and Menu are both `position: fixed`. The body column uses `margin-left` to stay clear of the menu. Footer is in-flow at the end of `.appshell--main` (after content, with 48px above) and scrolls with the page.
