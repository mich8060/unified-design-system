---
id: component-hierarchy
category: relationship
type: concept
priority: high
ai_priority: high
confidence_default: required
related:
  - grammar-hierarchy
  - grammar-rules
  - ontology-index
components:
  - AppShell
  - Menu
  - SectionHeader
  - Button
patterns:
  []
tokens:
  []
depends_on:
  - grammar-hierarchy
influences:
  - choosing-components
conflicts_with:
  - layout-mistakes
alternatives:
  []
---
# Component hierarchy

Maps grammar layers to UDS objects:

```
Application → AppShell
  Region(menu) → Menu
  Region(main) → AppShell.Main
    Section → SectionHeader + content
      Pattern → Form / Table / Dashboard sections
        Component → Field, Button, Card, Status, …
          Token → --uds-*
```

Buttons live in pattern **actions**, not floating in the shell chrome (except header utilities).

Confidence: Required — Respect shell → section → pattern → component.


## Relationships

### Supports

- Grammar

### Requires

- AppShell
- Menu

### Influences

- choosing-components

### Uses

- Ontology objects

### Conflicts With

- layout-mistakes

### Alternatives

- —

### Depends On

- grammar-hierarchy

### Referenced By

- grammar/hierarchy.md



## See also

- [Grammar hierarchy](../grammar/hierarchy.md)
- [Ontology](../ontology/README.md)
