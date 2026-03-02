# Runtime Tokens Migration

This project now exposes tokens as typed JavaScript modules in addition to CSS variables.

## What changed

- Added typed runtime token exports under `dist/tokens/*`.
- Added generated CSS output at `dist/tokens/tokens.css`.
- CSS token names remain unchanged (existing `--uds-*` / `--system-*` variables).
- Token CSS is generated from TypeScript token source (`src/design-system/tokens/runtime/*`).

## New imports

### Programmatic tokens (tree-shakeable)

```ts
import { spacingTokens } from "@mich8060/unified-design-system/tokens/spacing";
import { radiusTokens } from "@mich8060/unified-design-system/tokens/radius";
import { colorTokens } from "@mich8060/unified-design-system/tokens/color";
```

### Aggregate runtime tokens

```ts
import { runtimeTokens, tokensByCategory } from "@mich8060/unified-design-system/tokens";
```

### Generated token CSS (optional, additive)

```ts
import "@mich8060/unified-design-system/tokens.css";
```

## Migration steps

1. Keep existing style import unchanged:
   - `@mich8060/unified-design-system/styles.css`
2. Replace hardcoded token literals in app code with typed token imports where useful.
3. If your app needs token CSS independent from full component styles, import `tokens.css`.
4. For new token additions, update TS source in `src/design-system/tokens/runtime/*` and run `npm run build`.

## Backward compatibility

- Existing component styling is not changed by this migration.
- Existing CSS custom property names are preserved.
