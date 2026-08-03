---
id: menu-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
components:
  - Menu
patterns:
  []
tokens:
  []
depends_on:
  - grammar-hierarchy
influences:
  - information-architecture
conflicts_with:
  []
alternatives:
  []
---
# Menu

## What

`Menu` **is-a** Navigation rail (first-party).

## API (system facts)

| Prop | Detail |
|------|--------|
| `brand` | Default `chg` (or inherits AppShell `brand`); theme tokens + nav defaults |
| `headerVariant` / `headerTitle` | **Deprecated in AppShell** — put identity on `AppShell`; still used for standalone Menu header |
| `navigationItems` | Label + Phosphor icon + href/active |
| `expanded` / `defaultExpanded` | Controlled/uncontrolled rail (syncs with AppShell when composed there) |
| Root | `<nav data-slot="uds-menu-root">` |

Defaults: `ai/recipes/default-navigation.md`. Shell header identity: `ai/guides/menu-header-identity.md`.

Inside **AppShell**, Menu is **nav-only** (no brand row, no collapse control). Branding + toggle live in the AppShell Header.

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Navigation rail (first-party) |
| **contains** | navigation items; utilities/tail (optional standalone header when not in AppShell) |
| **requires** | Placement in AppShell.menu for product apps |
| **uses** | Brand modes; Phosphor icons; aria-current |
| **appears in** | auth-shell; all dashboards |
| **supports** | Information architecture |
| **cannot exist without** | Page content (belongs in Main) |

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Read API table above + contract catalog for props.
3. Prefer this export over bespoke markup.

Confidence: Preferred — Use the published component.


## Relationships

### Supports

- Information architecture

### Requires

- Placement in AppShell.menu

### Influences

- auth-shell
- all dashboards

### Uses

- Brand modes
- Phosphor icons
- aria-current

### Conflicts With

- Bespoke equivalents
- src/components/ui imports

### Alternatives

- See decision trees / choosing-components

### Depends On

- grammar-hierarchy

### Referenced By

- ai/indexes/component-index.md



## See also

- [Ontology index](./README.md)
- [Choosing components](../decision-rules/choosing-components.md)
- [Contract](../../ai/uds-contract.json)
