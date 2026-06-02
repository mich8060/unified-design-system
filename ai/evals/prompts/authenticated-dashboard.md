Create a new authenticated dashboard screen for a staffing operations workspace using the Unified Design System package.

Requirements:
- import components only from `@chghealthcare/unified-design-system`
- import styles only from `@chghealthcare/unified-design-system/styles.css`
- use `AppShell` as the executed layout with `enableRouterOutlet={false}`
- compose the **`menu`** slot with **`<Menu navigationItems={…} />`** (not `Sidebar*` in menu)
- put page content in **`AppShell.Main`**
- use `Badge`, `Status`, `Medallion`, and `Card` for branded emphasis

Before coding, read `ai/guides/appshell-navigation.md` and `ai/examples/workspace-dashboard.tsx`.
