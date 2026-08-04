Create an authenticated **Reports** page for a healthcare staffing platform. Use `@chghealthcare/unified-design-system` only.

Requirements:

- `AppShell` + `Menu` in `menu` (`enableRouterOutlet={false}`); content in `AppShell.Main`
- **`MainContent`** (`edge`) with 24px padding + **`PageHeader`** + **`MainStack`** (section gap 24)
- **Row 1:** `lg:grid-cols-3` — primary chart (`lg:col-span-2`) | activity feed panel
- **Row 2:** `lg:grid-cols-3` — secondary chart (`lg:col-span-2`) | priority callout / aside
- **Row 3:** `lg:grid-cols-2` — Specialty mix table | Client performance table
- Prefer **`Card` + `CardContent`** (16px padding); tables may use `CardContent className="p-0"`
- No full-width vertical stack of every widget
- No `SearchInput` in PageHeaderActions; Medallion default **lg**

Before coding, read:

- `node_modules/@chghealthcare/unified-design-system/ai/consumer-ai/COMPOSITION.md`
- `ai/examples/analytics-overview.tsx`
- `ai/recipes/analytics-overview.md`
