# Settings Form

## When to use it

Use for preference, admin, or configuration pages that need consistent field chrome inside an authenticated shell — **single readable column**, not a full-width Card stack.

For many settings sections with secondary nav, use [`settings-nav-panel`](./settings-nav-panel.md). For a focused one-task form, use [`narrow-form`](./narrow-form.md).

## Required layout primitives

- **`AppShell`** + **`Menu`** in **`menu`** + **`AppShell.Main`**.
- **`MainContent containment="fixed"`** — standard reading column (1280 outer / 1000 inner).
- **`PageHeader`** + **`MainStack`** for first-level sections.
- **`SectionHeader`** to group fields — do **not** Card-wrap every field block.
- **`Field`**, **`Input`**, **`Select`**, **`Switch`**, **`Button`** for the form body.
- **Field layout:** stack Fields by default. Use `md:grid-cols-2` only for related pairs (e.g. first & last name) or dense forms that need the space.

## Forbidden substitutions

- **FAIL:** Edge-to-edge Card soup with every section boxed.
- **FAIL:** Skipping `MainContent` / inventing ad-hoc max-widths instead of fixed containment.
- **FAIL:** Unrelated fields side-by-side in a 2-column grid by default.

## JSX skeleton

```tsx
<AppShell menu={<Menu {...menuProps} />} enableRouterOutlet={false}>
  <AppShell.Main>
    <MainContent containment="fixed">
      <PageHeader layout="inline">{/* title + Save */}</PageHeader>
      <MainStack>
        <section className="flex flex-col gap-[length:var(--uds-gap-16)]">
          <SectionHeader>{/* group title */}</SectionHeader>
          {/* Stack Fields by default */}
          <Field>{/* … */}</Field>
          <Field>{/* … */}</Field>
          {/* Related pair only — e.g. first + last name */}
          <div className="grid gap-[length:var(--uds-gap-16)] md:grid-cols-2">
            <Field>{/* First name */}</Field>
            <Field>{/* Last name */}</Field>
          </div>
        </section>
      </MainStack>
    </MainContent>
  </AppShell.Main>
</AppShell>
```

## Canonical example

[`ai/examples/settings-form.tsx`](../examples/settings-form.tsx)

## Brand application

Use `Status` for environment state, `Badge` for rollout labels, and restrained accent borders or medallions to separate critical settings from routine fields.

See also: [`design-language/semantics/page-composition.md`](../../design-language/semantics/page-composition.md).
