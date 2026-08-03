---
id: appshell-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
  - appshell-body-surface
  - appshell-main-containment
  - main-content-ontology
components:
  - AppShell
  - MainContent
patterns:
  []
tokens:
  - "--uds-surface-secondary"
  - "--uds-container-xl"
depends_on:
  - grammar-hierarchy
influences:
  - spatial-stability
  - listview-drives-main
conflicts_with:
  []
alternatives:
  []
design_intent:
  - navigation
---
# AppShell

## What

`AppShell` **is-a** Layout shell (first-party).

## API (system facts)

| Prop / region | Detail |
|----------------|--------|
| `menu` | Slot for canonical `Menu` |
| `listview` | Optional master pane |
| `listviewWidth` | **320–480** px (clamped); default **320**. Widen when content needs more room |
| `enableRouterOutlet` | Default **true**; set `false` for static apps |
| `brand` / `headerVariant` / `headerTitle` | Full-width Header identity (wordmark or title). See `ai/guides/menu-header-identity.md` |
| `menuExpanded` / `defaultMenuExpanded` | Desktop rail expand / mobile drawer open (AppShell-owned; Menu syncs) |
| `headerRight` / `headerSearchProps` | Header trailing + search — `AppShell.Header` is trailing only; brand/toggle are shell chrome |
| `hideSearch` / `headerLeading` | Omit Header search (`hideSearch`) or replace search only (`headerLeading`) — does not remove brand/toggle |
| `footer` | Optional |
| `showSkipToContent` | Default **true** — skip link to main |
| `skipToContentLabel` | Default `"Skip to content"` |
| `showSkipToSearch` | Default **true** — skip link to Header search (bypasses menu); off when search is suppressed |
| `skipToSearchLabel` | Default `"Skip to search"` |
| `mainContentId` | Default `uds-appshell-main` — id on the `<main>` landmark |
| `searchContentId` | Default `uds-appshell-search` — id on Header `SearchInput` |
| Regions | `AppShell.Menu` \| `.Header` \| `.Listview` \| `.Main` \| `.Footer` |
| Main containment | Wrap Main children in `MainContent` (`edge` \| `fixed`) — see `appshell-main-containment` |
| CSS vars | menu 280/64, listview **320–480** (`--appshell-listview-width`, default 320), header 3.5rem |
| DOM | `.appshell` → `.appshell--chrome` (Header) + `.appshell--workspace` (menu + body); `main.appshell--main#uds-appshell-main`; Header search `#uds-appshell-search`; below `lg` menu is overlay drawer + `.appshell--scrim` |

Schema: `ai/appshell.schema.json`. Guide: `ai/guides/appshell-navigation.md`.

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Layout shell (first-party) |
| **contains** | menu; header; main; listview; footer |
| **requires** | Menu in menu slot for product nav |
| **uses** | AppShell CSS variables; optional React Router Outlet |
| **appears in** | All screenRecipes |
| **supports** | Spatial stability; Master–detail |
| **cannot exist without** | Menu content (compose Menu) |

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Read API table above + contract catalog for props.
3. Prefer this export over bespoke markup.

Confidence: Preferred — Use the published component.


## Relationships

### Supports

- Spatial stability
- Master–detail

### Requires

- Menu in menu slot for product nav

### Influences

- All screenRecipes

### Uses

- AppShell CSS variables
- optional React Router Outlet

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
