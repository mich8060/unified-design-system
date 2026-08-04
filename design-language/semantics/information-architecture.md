---
id: information-architecture
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
 - grammar-hierarchy
 - navigation
 - intent
 - laws-of-ux
components:
 - AppShell
 - Menu
 - SectionHeader
 - Breadcrumb
patterns:
 - navigation
 - detail-pages
tokens:
 []
depends_on:
 []
influences:
 - navigation
 - detail-pages
conflicts_with:
 - visual-noise
alternatives:
 []
---
# Information architecture

## What

Information architecture (IA) is how content and navigation are structured across regions, pages, and menus.

## Why

Wrong IA forces users to hunt. Correct IA matches mental models (shell → page → section).

Also known as matching the user’s **Mental Model** — see [`laws-of-ux`](../design-physics/laws-of-ux.md).

## When

Any multi-page product; especially AppShell + Menu navigation and multi-section settings.

## How AI should reason

1. Place durable nav in Menu.
2. Place page-local structure in headings/sections.
3. Use listview for master–detail, not a second global nav.

Confidence: Preferred — Follow related decision trees before inventing layout.


## Relationships

### Supports

- `grammar-hierarchy`
- `navigation`
- `intent`

### Requires

- Philosophy
- Design physics

### Influences

- navigation
- detail-pages

### Uses

- AppShell
- Menu
- SectionHeader
- Breadcrumb

### Conflicts With

- Visual noise
- Layout mistakes

### Alternatives

- —

### Depends On

- semantics foundation concepts

### Referenced By

- ai/indexes/concept-index.md



## See also

- [grammar-hierarchy](../grammar/hierarchy.md)
- [navigation](../patterns/navigation.md)
- [intent](./intent.md)
- [Laws of UX index](../design-physics/laws-of-ux.md)
