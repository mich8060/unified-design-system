# Narrow Form

## When to use it

Use for a **focused single task** (short form, request, exception) where reading comfort matters more than filling Main width.

## Required layout primitives

- **`AppShell`** + **`Menu`** + **`AppShell.Main`**.
- **`MainContent containment="fixed"`** for the standard product panel.
- Inner column capped with **`max-w-[length:var(--uds-container-prose)]`** (640px) for the form fields.
- **`PageHeader`** + **`MainStack`**; Fields without Card-wrapping every control.

## Forbidden substitutions

- **FAIL:** Stretching a 3–5 field form edge-to-edge across Main.
- **FAIL:** Boxing each field in its own Card.

## JSX skeleton

```tsx
<MainContent containment="fixed">
  <PageHeader layout="inline">{/* title + primary */}</PageHeader>
  <MainStack>
    <div className="flex w-full max-w-[length:var(--uds-container-prose)] flex-col gap-[length:var(--uds-gap-16)]">
      {/* Fields */}
    </div>
  </MainStack>
</MainContent>
```

## Canonical example

[`ai/examples/narrow-form.tsx`](../examples/narrow-form.tsx)

See also: [`page-composition`](../../design-language/semantics/page-composition.md), [`settings-form`](./settings-form.md).
