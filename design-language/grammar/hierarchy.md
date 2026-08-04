---
id: grammar-hierarchy
category: grammar
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - grammar-rules
  - grammar-regions
  - component-hierarchy
components:
  - AppShell
  - Menu
  - SectionHeader
patterns:
  - navigation
  - dashboards
tokens:
  []
depends_on:
  - information-architecture
  - intent
influences:
  - choosing-layout
  - choosing-patterns
conflicts_with:
  - layout-mistakes
alternatives:
  []
---
# Grammar hierarchy

## What

UDS UI composes in a strict containment hierarchy:

```
Experience
  → Application
    → Page
      → Region
        → Section
          → Pattern
            → Component
              → Element
                → Token
```

## Why

Without containment rules, agents invent parallel shells, orphan buttons, and token-level styling on the wrong layer. Grammar keeps composition predictable for humans and RAG.

## When

Every authenticated product screen. Skip AppShell only for truly unauthenticated/marketing surfaces outside this DSL’s default.

## How AI should reason

1. Identify Experience/Application (product + brand).
2. Place Page inside AppShell regions.
3. Fill Sections with Patterns (form, table, dashboard…).
4. Patterns instantiate Components; Components consume Tokens.

Confidence: Required — Do not place Patterns outside Regions or Tokens as ad-hoc hex on Page chrome.


## Relationships

### Supports

- Choosing layout
- Choosing patterns

### Requires

- Intent
- Information architecture

### Influences

- All patterns

### Uses

- AppShell
- Menu
- SectionHeader

### Conflicts With

- Bespoke outer shells

### Alternatives

- —

### Depends On

- semantics/intent

### Referenced By

- grammar/rules.md



## See also

- [Grammar rules](./rules.md)
- [Regions](./regions.md)
