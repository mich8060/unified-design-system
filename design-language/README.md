# UDS Design System Language (DSL)

The Design System Language is the human- and machine-readable model for how CHG product UI should look, behave, and compose. It bridges design tokens, React components, Figma variables, and AI-assisted development.

## How to use this folder

| Audience | Start here |
|----------|------------|
| Designers | `philosophy.md`, `foundations/`, `patterns/` |
| Engineers & AI agents | `principles.md`, `decision-rules/`, `relationships/`, `@chghealthcare/unified-design-system/contract` |
| QA & accessibility | `accessibility/`, `anti-patterns/` |

## Canonical runtime sources

- **Tokens:** `--uds-*` CSS variables in `@chghealthcare/unified-design-system/styles.css`
- **Components:** `@chghealthcare/unified-design-system` exports (see `ai/uds-contract.json` → `componentCatalog`)
- **Layout shell:** `AppShell` + `Menu` — see `ai/guides/appshell-navigation.md`
- **Figma:** variable-bound components per `figma.component.rules.md`

## Folder map

- **foundations/** — Token-backed visual primitives (spacing, color, type, radius, etc.)
- **composition/** — Layout and visual structure rules
- **interactions/** — State and feedback conventions
- **accessibility/** — Inclusive design requirements
- **patterns/** — Screen-level recipes aligned with `ai/recipes/`
- **decision-rules/** — When to choose which token or component
- **relationships/** — How scales and hierarchies connect
- **anti-patterns/** — Common mistakes to avoid
- **examples/** — Reference compositions (links to `ai/examples/`)

## Related packages

```ts
import "@chghealthcare/unified-design-system/styles.css"
import { /* components */ } from "@chghealthcare/unified-design-system"
```

Published subpath: `@chghealthcare/unified-design-system/design-language` (this folder).
