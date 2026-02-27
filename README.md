# UDS Sample Application (Spec-driven + SCSS + Multi-brand + Governed App Shell)

This repo is a working reference implementation showing:

- Token-driven SCSS architecture (primitives → semantics → brands)
- Design-system components styled with SCSS (BEM, no raw values)
- Spec-driven component contracts (spec objects in code)
- Canonical component template + spec template
- A governed, configurable application shell with routing (routing lives in the shell)
- Brand + theme applied at the shell root
- Slot-based shell regions + structured layout config
- Linting “lockdown” (ESLint + Stylelint) and a CLI scaffold generator

## Quick start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview build
- `npm run lint` – eslint
- `npm run lint:styles` – stylelint for scss
- `npm run format` – prettier
- `npm run generate:component -- Name` – scaffold a new component folder from the canonical template

See `/docs` for the full methodology and governance model.

- [Claude Rules](docs/claude-rules.md) – conventions and constraints for AI-assisted development in this repo

## NPM package quick start

Install the package and required peer dependencies:

```bash
npm i @mich8060/unified-design-system react react-dom react-router-dom @phosphor-icons/react
```

Import components and styles:

```tsx
import { AppShell, Button, Flex, Menu, Text, TextInput } from "@mich8060/unified-design-system";
import "@mich8060/unified-design-system/styles.css";
```

## Common prop pitfalls

- `Button` uses `appearance`, not `variant`
  - valid values: `primary`, `soft`, `outline`, `text`, `ghost`, `disabled`, `destructive`
- `Text` requires a `variant` value such as `heading-32` or `body-16`
- `TextInput` icon placement uses `iconPosition` with `left` or `right`
- `Menu` mode uses `light` or `dark`

## Exported constants

Use exported constants to avoid guessing valid values:

```tsx
import {
  BUTTON_APPEARANCES,
  TEXT_VARIANTS,
  TEXT_WEIGHTS,
  TEXT_INPUT_STATES,
  ICON_APPEARANCES
} from "@mich8060/unified-design-system";
```
