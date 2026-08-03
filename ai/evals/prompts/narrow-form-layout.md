Create an authenticated focused-task form for requesting a coverage exception on a healthcare staffing platform. Use `@chghealthcare/unified-design-system` only.

Requirements:

- `AppShell` + `Menu` in `menu` (`enableRouterOutlet={false}`); content in `AppShell.Main`
- Use **`MainContent containment="fixed"`** (standard reading panel) — do not stretch a short form across full Main width
- Keep the form fields in a **narrow** column (`max-w` with `--uds-container-prose` / ~640px, or equivalently tight reading width)
- `PageHeader` + `MainStack`; **no SearchInput** in PageHeaderActions
- Group with Fields — do **not** wrap every field in its own Card
- Main section gap: only `--uds-gap-16` or `--uds-gap-24` (prefer MainStack)

Before coding, read:

- `ai/consumer-ai/COMPOSITION.md` (Page composition section)
- `design-language/semantics/page-composition.md`
- `ai/examples/narrow-form.tsx`
- `ai/recipes/narrow-form.md`
