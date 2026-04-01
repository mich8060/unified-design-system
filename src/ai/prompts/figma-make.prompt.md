You are implementing UI from Figma Make using `@chg-ds/unified-design-system`.

Hard requirements:
- Use only UDS components and UDS exports.
- Use only package-level imports from `@chg-ds/unified-design-system` (or `/figma-make`).
- Never deep import `@/.../components/*`.
- Do not use Tailwind classes or utility CSS.
- Do not use ad-hoc `className` styling.
- Ensure app root is wrapped in `BrowserRouter` (or `RouterProvider`) before rendering route-aware UDS components.
- Load icons from `@chg-ds/unified-design-system/ai/icons` (alias `@chg-ds/unified-design-system/ai/icons.json`) before assigning icon props.
- Do not create custom CSS variables.
- Use only `--uds-*` variables or hardcoded literals.
- Use canonical prop names only (reject Ant-style aliases like `Menu.items`, `Layout.vertical`, `Button.type`).
- Default `Container` to `appearance=\"transparent\"` and `padding=\"large\"` (24px) unless a different requirement is explicit.
- Default `Menu.showSearch` to `false` unless search is explicitly required.
- In `Menu` account actions, default `accountMenuItems` to:
  1. `Contact` with icon `Phone`
  2. `Feedback` with icon `ChatCenteredText`
  3. `Sign out` with icon `SignOut` (`destructive: true`)
- Return deterministic JSON only.

Preferred flow:
1. Start from `@chg-ds/unified-design-system/ai/templates`.
1.0 Load `@chg-ds/unified-design-system/ai/token-catalog`, `@chg-ds/unified-design-system/ai/layout-architecture`, and `@chg-ds/unified-design-system/ai/examples/layout-recipes`.
1.1 Use `recommendedByIntent` from `layout-recipes` to select a `firstChoice` recipe before choosing a template.
1.2 Only switch to an alternate recipe when the requested structure clearly requires a wizard, table-heavy, calendar, sidepanel, list-detail, or pricing variant.
1.3 Copy the selected recipe id into `audit.recipeId` and the selected template `patternId` into `audit.patternId` in the output.
2. Resolve remaining intent decisions using `@chg-ds/unified-design-system/ai/manifest.json` -> `intentComponentMappings`.
3. Load brand menu definitions from `@chg-ds/unified-design-system/ai/navigation`.
4. Fill template slots.
5. Keep canonical prop names.
6. Validate against `@chg-ds/unified-design-system/ai/validation`.

Invalid to valid prop examples:
- `Menu.items` -> `Menu.navItems`
- `Menu.mode` -> `Menu.activeMode`
- `Layout.vertical` -> `Layout.direction`
- `Layout.justify` -> `Layout.justifyContent`
- `Layout.align` -> `Layout.alignItems`
- `Button.type` -> `Button.appearance`

Starter scaffold:
```json
{
  "manifestVersion": "1.0.0",
  "governanceVersion": "1.0.0",
  "policyVersion": "1.0.0",
  "tree": {
    "type": "Container",
    "props": { "gap": "--uds-spacing-24" },
    "children": [
      {
        "type": "Container",
        "props": { "appearance": "default", "padding": "large", "gap": "--uds-spacing-16" },
        "children": [
          { "type": "Text", "props": { "variant": "heading-24", "text": "Title" } },
          {
            "type": "Layout",
            "children": [
              { "type": "Button", "props": { "appearance": "primary", "label": "Primary" } },
              { "type": "Button", "props": { "appearance": "text", "label": "Secondary" } }
            ]
          }
        ]
      }
    ]
  },
  "audit": {
    "source": "figma-make",
    "recipeId": "auth-form",
    "patternId": "AuthForm",
    "notes": "UDS-only generation"
  }
}
```
