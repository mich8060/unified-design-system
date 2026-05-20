# Settings Form

## When to use it

Use for preference, admin, or configuration pages that need consistent field chrome inside an authenticated shell.

## Required layout primitives

- **`AppShell`** + **`Menu`** in **`menu`** + **`AppShell.Main`**.
- **`Field`**, **`Input`**, **`Select`**, **`Switch`**, **`Button`** for the form body.

## JSX skeleton

```tsx
<AppShell menu={<Menu {...menuProps} />} enableRouterOutlet={false}>
  <AppShell.Main>
    <SectionHeader>{/* title */}</SectionHeader>
    <Card>{/* fields */}</Card>
  </AppShell.Main>
</AppShell>
```

## Canonical example

[`ai/examples/settings-form.tsx`](../examples/settings-form.tsx)

## Brand application

Use `Status` for environment state, `Badge` for rollout labels, and restrained accent borders or medallions to separate critical settings from routine fields.
