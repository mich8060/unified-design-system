# UDS AI Rules

Canonical contract: [`ai/uds-contract.json`](./ai/uds-contract.json)

- AppShell schema (regions, props, behavior): [`ai/appshell.schema.json`](./ai/appshell.schema.json)
- AppShell navigation guide: [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md)

- Import runtime components only from `@chghealthcare/unified-design-system`.
- Import styles only from `@chghealthcare/unified-design-system/styles.css`.
- Do not import from `src/components/ui/*`, `dist/*`, `@/*`, or any `*-base`, `*-core`, `*-theme`, `*-uds` module in consumer-facing code.
- For authenticated product screens, default to `AppShell`.
- Compose the **`AppShell` `menu` slot** with the package **`Menu`** component (canonical). Do not use `Sidebar*` in `menu` unless the product owns full rail CSS.
- **`Menu`** defaults to brand **`chg`** (CHG wordmark + tokens). Override with the **`brand`** prop; do not use `docs-site-data-brand` in consumer apps.
- **`Menu` header:** use default **`headerVariant="brand"`** (or omit) for CHG product apps with an approved lockup. Use **`headerVariant="title"`** with **`headerTitle`** (and optional **`headerShortTitle`**) for internal tools, dynamic tenant names, or apps without a product brand—see [`ai/guides/menu-header-identity.md`](./ai/guides/menu-header-identity.md).
- Put page content in **`AppShell.Main`**. Set **`enableRouterOutlet={false}`** for static apps; use nested React Router layout routes when the default outlet is enabled.
- Use existing UDS exports before inventing new layout or component chrome.
- Prefer recipe-aligned patterns from `ai/recipes/*.md` and `ai/examples/*.tsx` when generating a new screen.
- Treat `ai/uds-contract.json` as normative when prose docs disagree.
- **Do not** use CSS that collapses `.appshell--main > :first-child` to fix layout.
- **Do not** assume consumer `react-router-dom` alone fills AppShell without a layout route under the same router.
