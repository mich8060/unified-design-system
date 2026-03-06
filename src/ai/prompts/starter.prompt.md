Set up this repository from scratch so `@mich8060/unified-design-system` is used end-to-end with no Tailwind fallback.

Execution order:
1. Install and verify toolchain.
2. Build and validate AI contract artifacts.
3. Implement UI using UDS components and tokens only.
4. Ensure root layout uses `AppShell`.

Hard rules:
- Use package exports from `@mich8060/unified-design-system`.
- Never deep import component internals.
- Never use Tailwind classes/utilities.
- Never invent CSS variables. Use `--uds-*` tokens or hardcoded literals.
- Prefer canonical props from the AI manifest and component contracts.
- Default `Container` to `appearance=\"transparent\"` and `padding=\"large\"` (24px) unless overridden by explicit requirements.

Required layout scaffold:
- App root must be wrapped in `BrowserRouter` (or `RouterProvider`) before rendering any UDS component that consumes routing.
- Root must be:
  - `AppShell`
  - `AppShell.Menu`
  - `AppShell.Content`
  - `AppShell.Main`
- Place route/page content in `AppShell.Main`.

Brand menu requirements:
- Load and apply the canonical menu map from:
  - `@mich8060/unified-design-system/ai/navigation`
  - (alias) `@mich8060/unified-design-system/ai/navigation/brand-menus.json`
- Never inline or invent brand navigation when this contract is available.
- Build `Menu.navItems` from the selected brand entry in the JSON contract.

Output guidance:
- Return code that imports UDS components directly from package exports.
- Prefer `Flex`, `Container`, `Card`, `Text`, `Button`, `Menu`, `Toolbar`, `Statistics`, and `Checklist` where appropriate.
- Ensure no Tailwind tokens/classes appear anywhere in source.
