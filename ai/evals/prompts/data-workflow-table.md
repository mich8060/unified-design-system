Create an authenticated **jobs list / data workflow** screen for a healthcare staffing platform. Use `@chghealthcare/unified-design-system` only.

Requirements:

- `AppShell` + `Menu` in `menu` (`enableRouterOutlet={false}`); content in `AppShell.Main`
- **`MainContent containment="edge"`** — full width is correct for a dominant table workflow
- `PageHeader` (no SearchInput in PageHeaderActions) + `MainStack`
- **`Filterbar`**: `SearchInput` → icon-only `FilterbarFilters` (`size="icon"`) immediately after search → `FilterbarActions` with **one** primary; if >3 actions, DotsThree **last** with `weight="bold"`
- **One** dominant full-width `Card` > `CardContent className="p-0"` > `Table` (one outline — Card only)
- Table: compact/`sm` nested Status; trailing actions cell `className="w-0"`
- Do **not** split the primary collection into a stack of skinny full-width Cards

Before coding, read:

- `ai/consumer-ai/COMPOSITION.md` (Page composition section)
- `design-language/semantics/page-composition.md`
- `ai/examples/data-workflow-table.tsx`
- `ai/recipes/data-workflow-table.md`
- `design-language/ontology/filterbar.md`
