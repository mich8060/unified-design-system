# Shell header identity (`brand` vs `title`)

Normative for AI agents composing **`AppShell`** + **`Menu`**. Branding and the menu toggle live in the **full-width AppShell Header** above the rail — not in Menu.

Related: [`appshell-navigation.md`](./appshell-navigation.md), [`../appshell-layout-prompt.md`](../appshell-layout-prompt.md), [`../recipes/default-navigation.md`](../recipes/default-navigation.md).

---

## Decision rule (read first)

| Situation | `headerVariant` | Header shows |
| --- | --- | --- |
| CHG product app with a known brand (`connect`, `comphealth`, `weatherby`, `locumsmart`, `modio`, `careermd`, `gms`, `chg`, …) | **`"brand"`** (default) | SVG **wordmark** from **`Branding`** (always visible; no collapsed mark swap) |
| Internal tool, platform admin, partner white-label, MVP, or any app **without** an approved CHG product lockup | **`"title"`** | Plain text from **`headerTitle`** |
| Unsure whether marketing approved a logo | **`"title"`** | Safer until brand assets are confirmed |

**Do not** use `headerVariant="title"` for standard CHG product shells that already have a `brand` id in [`uds-brand`](../uds-contract.json) / `UDS_BRAND_IDS`.

**Do not** use `headerVariant="brand"` (or omit it) when there is no product brand—users will see the wrong CHG logo.

---

## API

```tsx
import { AppShell, Menu } from "@chghealthcare/unified-design-system"

// Default — product brand wordmark in Header + brand tokens
<AppShell
  brand="connect"
  menu={<Menu navigationItems={items} />}
/>

// Non-brand — text in Header; tokens still from brand prop
<AppShell
  headerVariant="title"
  headerTitle="Internal portal"
  brand="default"
  menu={<Menu navigationItems={items} />}
/>
```

| Prop (on **`AppShell`**) | Required | Purpose |
| --- | --- | --- |
| `headerVariant` | No (default `"brand"`) | `"brand"` → wordmark; `"title"` → text header |
| `headerTitle` | **Yes** when `headerVariant="title"` | Full product name in the Header |
| `headerShortTitle` | No | Legacy; unused for Header wordmark mode |
| `brand` | No (default `"chg"`) | Header artwork + inherited Menu tokens when Menu omits `brand` |

Menu may still accept deprecated `headerVariant` / `headerTitle` for **standalone** Menu (no AppShell). Inside AppShell, Menu is **nav-only** (no logos, no collapse control).

---

## When to use `headerVariant="title"`

Use for apps that are:

- Internal-only (ops, compliance, engineering consoles)
- Multi-tenant where the **tenant name** is dynamic (pass tenant name as `headerTitle`; do not invent SVG lockups)
- Early prototypes before brand assignment
- Sub-brands or experiments **not** listed in `UDS_BRAND_IDS`
- Embedded modules inside a parent product that already owns the chrome

## When to use `headerVariant="brand"` (default)

Use for shipped CHG Healthcare product applications:

- Connect, CompHealth, Weatherby, Locumsmart, Modio, CareerMD, GMS, CHG default shell
- Any screen that should match marketing-approved wordmarks in `src/assets/branding/svg/`
- When `brandOptions` lets users switch between **product** brands (not arbitrary strings)

Pair with:

- `brand="<uds-brand-id>"` on **`AppShell`** matching the product
- `navigationItems={getDefaultNavigation(brand)}` or contract rows from `brand-menus.json` when defaults apply
- Optional Menu `brandStorageKey` only when persisting a **product** brand choice

---

## Visual behavior

**Header (all breakpoints):** Menu toggle (always visible) + wordmark or `headerTitle` + search + trailing. Wordmark does **not** swap to a mark when the rail collapses.

**Desktop (`lg+`):** Menu rail under the Header (280px expanded / 56px collapsed). Body offsets by rail width.

**Below `lg`:** Menu is an overlay drawer; Header uses compact search (icon expands the same field). Scrim + Escape close the drawer.

**Tokens:** `brand` drives `[data-brand=…]` CSS variables. For neutral internal tools, prefer `brand="default"` or `brand="wireframe"` unless a product palette is intentional.

---

## AppShell example (non-brand)

```tsx
import {
  AppShell,
  Menu,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"

const NAV: MenuNavigationItem[] = [
  { id: "home", label: "Home", icon: LayoutIcon },
  { id: "reports", label: "Reports", icon: ChartBarIcon },
]

export function InternalShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        headerVariant="title"
        headerTitle="Credentialing hub"
        brand="default"
        menu={
          <Menu
            defaultExpanded
            aria-label="Application menu"
            navigationItems={NAV}
            activeId="home"
          />
        }
      >
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
```

---

## Anti-patterns

- Putting branding or the collapse control inside Menu when using AppShell
- Swapping to a collapsed **mark** logo in the rail
- Hiding the menu toggle when the rail is collapsed
- Using `headerVariant="brand"` without an approved product brand id
- Putting `SearchInput` in `AppShell.Header` / `headerRight` (trailing is for actions only)
