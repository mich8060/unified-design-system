# Consumer test performance — lazy barrel

## Problem

`dist/index.js` (the main barrel) contains 98 eager `import` statements. Every consumer test that imports _any_ UDS component causes all 84+ component modules to load and initialize — including heavy transitive dependencies like `recharts`, `cmdk`, `vaul`, and `react-day-picker` — even if the test only uses `Button`.

This typically adds 2–8 seconds to cold test-suite startup in consumer CI pipelines.

## Solution — activate the `"test"` export condition

UDS ships `dist/lazy-index.cjs`: a CJS `Proxy` barrel where each component module is `require()`-d only when one of its named exports is first accessed. A test that imports only `Button` and `Alert` will load exactly those two component modules.

Enable it with one line in your test config:

### Vitest

```ts
// vitest.config.ts
export default defineConfig({
  resolve: {
    conditions: ["test"],
  },
  // ... rest of config
})
```

### Jest (ts-jest / babel-jest)

```js
// jest.config.js
module.exports = {
  testEnvironmentOptions: {
    customExportConditions: ["test"],
  },
  // ... rest of config
}
```

> **Note:** Jest's `customExportConditions` is only honoured when using the `node` or `node-esm` test environment. If you use a custom resolver, ensure it reads the `exports` field from `package.json` and honours the `"test"` condition.

## What loads eagerly vs lazily

| Import style | What loads |
|---|---|
| `import { Button } from '@chghealthcare/unified-design-system'` with `test` condition | Only `dist/components/ui/button.cjs` |
| `import { Button } from '@chghealthcare/unified-design-system'` without `test` condition | All 84+ component modules |
| `import { Button } from '@chghealthcare/unified-design-system/button'` | Only `dist/components/ui/button.cjs` (always, no config needed) |

## Alternative — subpath imports (zero config needed)

If changing the vitest/jest config is not possible, switch test imports to subpaths:

```ts
// Before
import { Button, Alert, Badge } from "@chghealthcare/unified-design-system"

// After
import { Button } from "@chghealthcare/unified-design-system/button"
import { Alert } from "@chghealthcare/unified-design-system/alert"
import { Badge } from "@chghealthcare/unified-design-system/badge"
```

Subpaths are always available regardless of export conditions.

## Maintaining the lazy barrel

`dist/lazy-index.cjs` is generated as part of `npm run build:lib` via `scripts/generate-lazy-barrel.mjs`. It reads `dist/index.js` to extract the named export → module path mapping. No manual maintenance is needed — run the build and the barrel regenerates.
