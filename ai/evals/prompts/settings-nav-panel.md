Create an authenticated workspace settings page with **many settings sections** (Profile, Notifications, Security, Integrations). Use `@chghealthcare/unified-design-system` only.

Requirements:

- `AppShell` + `Menu` in `menu` (`enableRouterOutlet={false}`); content in `AppShell.Main`
- In-Main settings IA: **`Tabs` with `orientation="vertical"`** (prefer `variant="line"`) + `TabsContent` panels — not the product Menu as the only settings IA, and **not** AppShell `listview`
- Do **not** hand-roll section nav with `Item appearance="list"`; use vertical Tabs
- Active section shows Fields in the panel; do **not** Card-wrap every field block
- `PageHeader` + `MainStack`; **24px** between vertical `TabsList` and panel content
- No SearchInput in PageHeaderActions

Before coding, read:

- `ai/consumer-ai/COMPOSITION.md` (Page composition section)
- `design-language/semantics/page-composition.md`
- `design-language/ontology/tabs.md`
- `ai/examples/settings-nav-panel.tsx`
- `ai/recipes/settings-nav-panel.md`
