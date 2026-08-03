Create an authenticated tenant dashboard for a healthcare staffing platform (agencies, recruiters, ops managers). Use `@chghealthcare/unified-design-system` only.

Requirements:

- `AppShell` + `Menu` in `menu` (`enableRouterOutlet={false}`); content in `AppShell.Main`
- KPI metrics as **StatisticCards** (or equivalent) in a **horizontal row** with gap **16 or 24**
- **Main section gap** — First-level siblings: only `--uds-gap-16` or `--uds-gap-24` (no `gap-3` / `gap-5`)
- **Required: short regions share a row** — Below KPIs, pair pipeline | placements (and other short regions) in `lg:grid-cols-2` — not one long vertical stack of skinny full-width lists
- **Boxed padding** — Every Card/panel: `CardContent` or p-16/24; content must not touch the box
- Match peer heights in a grid row (esp. non-bottom); stretch when Δ **≤ 150px**; bottom row may stay natural
- If using PageHeader: ≤ **24px** to first content; **no SearchInput** in PageHeaderActions
- If using Filterbar: icon-only `size="icon"` filters **immediately after** SearchInput; actions slot has **one** primary at default size; overflow DotsThree **last** with **`weight="bold"`**
- Medallions at **lg** (default); icon-only Buttons square at **`size="icon"`**
- If including a stacked bar chart: touching segment ends **radius 0**

Before coding, read:

- `node_modules/@chghealthcare/unified-design-system/ai/consumer-ai/COMPOSITION.md` (or repo `ai/consumer-ai/COMPOSITION.md`)
- `ai/examples/workspace-dashboard.tsx`
- `design-language/semantics/appshell-main-containment.md`
