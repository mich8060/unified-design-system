# UDS Contract

Use [`ai/uds-contract.json`](./ai/uds-contract.json) as the source of truth.

- AppShell (props, regions, DOM, AI rules): [`ai/appshell.schema.json`](./ai/appshell.schema.json)
- AppShell navigation: [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md)

- Allowed imports: `@chghealthcare/unified-design-system` and `@chghealthcare/unified-design-system/styles.css`
- Default authenticated layout: `AppShell` with **`Menu`** in the **`menu`** slot; page content in **`AppShell.Main`**
- `Sidebar*` is for in-page side panels, not the AppShell product rail unless you own rail CSS
- Prefer existing UDS components before inventing new chrome
- Consult `ai/recipes/*.md` and `ai/examples/*.tsx` before composing a new screen
