# AI Implementation Learnings (Validated)

This document captures validated integration guidance for `@mich8060/unified-design-system`, including corrections to common AI-generated assumptions.

## Critical Runtime Requirement

### Router context must come from `react-router-dom`

`Menu` internally uses `useLocation` and `Link` from `react-router-dom`.  
If app code imports router providers from `react-router` instead, `Menu` and related navigation flows can fail at runtime.

Use:

```tsx
import { BrowserRouter } from "react-router-dom";
```

Not:

```tsx
import { BrowserRouter } from "react-router";
```

## Canonical App Shell Pattern

For app-level composition in this repo, prefer:

```tsx
<AppShell brand="default" theme="light">
  <AppShell.Menu>
    <Menu {...menuProps} />
  </AppShell.Menu>
  <AppShell.Content>
    <AppShell.Main>{/* routes/pages */}</AppShell.Main>
  </AppShell.Content>
</AppShell>
```

This keeps brand/theme/layout behavior consistent with shell governance.

## Corrected API Facts

### Text

- **Valid `variant` values**:
  - `display-128`, `display-96`, `display-72`, `display-60`, `display-48`, `display-36`
  - `heading-32`, `heading-28`, `heading-24`
  - `body-20`, `body-16`, `body-14`, `body-12`
- `heading-18`, `heading-16`, and `body-18` are **not** valid in this codebase.

### Avatar

- **Valid sizes**: `small`, `default`, `large`
- `medium` and `xlarge` are not supported by the current `Avatar` API.

### Badge

- `Badge` is a numeric indicator (`count`, `maxCount`) and supports color variants:
  - `red`, `orange`, `yellow`, `green`, `dark-green`, `blue`, `dark-blue`, `purple`, `pink`, `gray`, `outline`
- Variants like `success`, `warning`, `error`, `info`, `default` are not the current `Badge` variant API.

### Flex

- `direction` supports `row` and `column` (not reverse directions in current types).
- `gap` should use UDS spacing tokens where possible (`"8"`, `"12"`, `"16"`, etc., or `spacing-*` token names).

### Steps

- Common statuses remain valid: `complete`, `active`, `incomplete`.
- Additional supported statuses in implementation: `disabled`, `error`, `warning`.

## Styling Rules for AI-Generated Code

- Prefer design-system components and tokenized styles.
- In component SCSS:
  - do **not** introduce raw hex values
  - do **not** add new CSS custom properties
  - consume existing `var(--uds-...)` tokens only
- Do not introduce Tailwind or other CSS frameworks.

For app-level prototype glue code, inline styles are acceptable when needed, but token usage and component props are preferred over hardcoded values.

## Import and Usage Baseline

```tsx
import {
  AppShell,
  Menu,
  Card,
  Avatar,
  Badge,
  Steps,
  Text,
  Flex,
  Accordion,
} from "@mich8060/unified-design-system";
import "@mich8060/unified-design-system/styles.css";
```

## AI Checklist (Before Finalizing Output)

1. Router provider is from `react-router-dom`.
2. App-level layout uses `AppShell` pattern where appropriate.
3. Component props/variants match actual exported TypeScript types.
4. Styles use `--uds-*` tokens (no raw hex in component SCSS).
5. Icons use `Icon`/Phosphor names, not inline SVG sets.
