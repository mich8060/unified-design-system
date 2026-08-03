# Settings Nav Panel

## When to use it

Use when a settings/admin area has **many sections** and needs an **in-Main** secondary navigation column beside a content panel.

Do **not** confuse with:

- AppShell **`Menu`** (product rail)
- AppShell **`listview`** (collection that drives Main detail)

## Required layout primitives

- **`AppShell`** + **`Menu`** + **`MainContent containment="edge"`** (or fixed if the whole settings chrome should sit in the 1000 reading column).
- **`PageHeader`** + **`MainStack`**.
- **Settings section nav (Required):** **`Tabs`** with **`orientation="vertical"`** and preferred **`variant="line"`** (default). Triggers are left-aligned; the list hugs the longest label (min **200px**). Put section panels in **`TabsContent`**. See [`design-language/ontology/tabs.md`](../../design-language/ontology/tabs.md).
- Gap between vertical `TabsList` and panel content: **24px** (`gap-[length:var(--uds-gap-24)]` on `Tabs`).
- Panel: `SectionHeader` / `h2` at body/20 + Fields — no Card-per-field.
- **Field layout:** stack Fields by default; `md:grid-cols-2` only for related pairs or dense forms — see [`settings-form`](./settings-form.md) / [`forms`](../../design-language/patterns/forms.md).

## Forbidden substitutions

- **FAIL:** Putting settings section links in the product Menu as the only IA.
- **FAIL:** Using AppShell `listview` for settings sections that do not drive a master–detail collection.
- **FAIL:** Full-width stack of Cards for each settings section with no nav column.
- **FAIL:** Hand-rolled nav from `Item appearance="list"` / custom link stacks instead of vertical `Tabs` for section switching.
- **FAIL:** Horizontal `Tabs` as the primary settings section rail when a side nav is appropriate.
- **FAIL:** Unrelated fields side-by-side in the panel by default.

## JSX skeleton

```tsx
<MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
  <PageHeader layout="inline">{/* … */}</PageHeader>
  <MainStack>
    <Tabs
      orientation="vertical"
      defaultValue="profile"
      className="w-full gap-[length:var(--uds-gap-24)]"
    >
      <TabsList aria-label="Settings sections">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        {/* … */}
      </TabsList>
      <TabsContent value="profile" className="min-w-0 flex-1 mt-0">
        {/* Fields for active section */}
      </TabsContent>
    </Tabs>
  </MainStack>
</MainContent>
```

## Canonical example

[`ai/examples/settings-nav-panel.tsx`](../examples/settings-nav-panel.tsx)

See also: [`page-composition`](../../design-language/semantics/page-composition.md), [`settings-form`](./settings-form.md), [`tabs` ontology](../../design-language/ontology/tabs.md).
