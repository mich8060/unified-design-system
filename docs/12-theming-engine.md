# Theming Engine API

This introduces an explicit theming API while keeping existing AppShell class behavior (`brand-*`, `theme-*`) backward compatible.

## Proposed Folder Structure

```text
src/design-system/theme/
  createBrand.ts
  createTheme.ts
  ThemeProvider.tsx
  theme.types.ts
  index.ts
```

## Type Definitions (Core)

- `ThemeDefinition<BrandName>`
  - `baseTokens`
  - `brands`
  - `modes`
  - `defaultBrand`
  - `defaultMode`
- `BrandDefinition`
  - `name`
  - `className`
  - `tokens`
  - `modeTokens`
- `ResolvedTheme`
  - `brand`
  - `mode`
  - `classNames`
  - `cssVars`
- `ThemeEngine`
  - `resolve()`
  - `applyToElement()`

## Usage Example

```tsx
import {
  ThemeProvider,
  createBrand,
  createTheme,
  useTheme,
  useThemeController,
} from "@mich8060/unified-design-system";

const theme = createTheme({
  defaultBrand: "default",
  defaultMode: "light",
  brands: {
    default: createBrand("default"),
    comphealth: createBrand("comphealth"),
  },
});

function ModeToggle() {
  const { mode } = useTheme();
  const controller = useThemeController();
  return (
    <button onClick={() => controller.setMode(mode === "light" ? "dark" : "light")}>
      Toggle mode
    </button>
  );
}

export function AppRoot() {
  return (
    <ThemeProvider theme={theme}>
      <ModeToggle />
      {/* Existing AppShell usage stays valid */}
    </ThemeProvider>
  );
}
```

## Backward Compatibility

- Existing AppShell usage still works as-is.
- Theme engine applies `brand-*` and `theme-*` classes to a target element (default: `document.documentElement`), matching current token selector strategy.
- Existing CSS variables remain in place and emitted.

## Tradeoffs

- **Pros**
  - Theming is now an explicit, typed API.
  - Brand/mode overrides are structured and composable.
  - DOM class + CSS var updates happen imperatively in a store, avoiding app-wide rerender cascades.
  - Tree-shakeable imports by module boundary.

- **Cons**
  - More moving parts than pure CSS-only theming.
  - If consumers choose to subscribe to theme state via `useTheme`, those subscribed components still re-render on changes (expected).
  - Existing token CSS remains the compatibility source, so full token unification should be planned incrementally.
