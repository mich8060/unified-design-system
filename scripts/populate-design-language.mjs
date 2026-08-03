/**
 * Populate design-language stubs with real UDS system facts
 * (tokens from uds-tokens.css, components, contract antiPatterns, recipes).
 */
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DL = path.join(ROOT, "design-language")

function fm(fields) {
  const lines = ["---"]
  for (const [k, v] of Object.entries(fields)) {
    if (Array.isArray(v)) {
      lines.push(`${k}:`)
      if (!v.length) lines.push("  []")
      else for (const item of v) lines.push(`  - ${JSON.stringify(item).replace(/^"|"$/g, item.includes(":") || item.startsWith("--") ? `"${item}"` : item)}`)
      // simpler:
    } else {
      lines.push(`${k}: ${v}`)
    }
  }
  // Fix array serialization properly
  return null
}

function yaml(fields) {
  const out = ["---"]
  for (const [k, v] of Object.entries(fields)) {
    if (Array.isArray(v)) {
      out.push(`${k}:`)
      if (!v.length) out.push("  []")
      else
        for (const item of v) {
          const s = String(item)
          out.push(s.startsWith("--") || s.includes(":") || s.includes(" ") ? `  - "${s}"` : `  - ${s}`)
        }
    } else {
      out.push(`${k}: ${v}`)
    }
  }
  out.push("---", "")
  return out.join("\n")
}

function rel(sections) {
  const order = [
    "Supports",
    "Requires",
    "Influences",
    "Uses",
    "Conflicts With",
    "Alternatives",
    "Depends On",
    "Referenced By",
  ]
  let s = "\n## Relationships\n\n"
  for (const key of order) {
    const items = sections[key] || []
    s += `### ${key}\n\n`
    s += items.length ? items.map((i) => `- ${i}`).join("\n") + "\n\n" : "- —\n\n"
  }
  return s
}

function seeAlso(links) {
  return (
    "\n## See also\n\n" + links.map(([label, href]) => `- [${label}](${href})`).join("\n") + "\n"
  )
}

// Ids referenced by interactions/*.md `related` arrays, mapped to their real
// path relative to design-language/. hrefForId() throws on a miss instead of
// guessing from the id string, so a stale mapping fails loudly, not silently.
const ID_HREF = {
  "focus-order": "../accessibility/focus-order.md",
  keyboard: "../interactions/keyboard.md",
  "button-ontology": "../ontology/button.md",
  affordance: "../semantics/affordance.md",
  focus: "../interactions/focus.md",
  selected: "../interactions/selected.md",
  validation: "../interactions/validation.md",
  "a11y-forms": "../accessibility/forms.md",
  navigation: "../patterns/navigation.md",
  "menu-ontology": "../ontology/menu.md",
  lists: "../patterns/lists.md",
  dialogs: "../patterns/dialogs.md",
  "errors-tree": "../decision-rules/trees/errors.md",
  "field-ontology": "../ontology/field.md",
  "empty-states": "../patterns/empty-states.md",
  "buttons-tree": "../decision-rules/trees/buttons.md",
}

function hrefForId(id) {
  const href = ID_HREF[id]
  if (!href) throw new Error(`hrefForId: no known path for id "${id}" — add it to ID_HREF`)
  return href
}

async function write(relPath, fields, body) {
  const full = path.join(DL, relPath)
  await mkdir(path.dirname(full), { recursive: true })
  await writeFile(full, yaml(fields) + body.trim() + "\n", "utf8")
  console.log("wrote", relPath)
}

// ─── Accessibility ───────────────────────────────────────────────

async function populateAccessibility() {
  await write(
    "accessibility/focus-order.md",
    {
      id: "focus-order",
      category: "accessibility",
      type: "concept",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["focus", "dialogs", "keyboard", "appshell-ontology"],
      components: ["Dialog", "AlertDialog", "Menu", "Button", "AppShell"],
      patterns: ["dialogs", "forms", "navigation"],
      tokens: ["--uds-focus-ring-width", "--uds-focus-ring-border", "--uds-focus-ring-offset"],
      depends_on: ["focus", "affordance"],
      influences: ["dialogs", "forms"],
      conflicts_with: ["accessibility-mistakes"],
      alternatives: [],
    },
    `# Focus order

## What

Keyboard tab order must match visual reading order. Overlay components trap focus while open and restore it to the trigger on close.

## Why

Operational CHG tools are keyboard-heavy. Broken focus order makes queues, dialogs, and Menu unusable for keyboard and AT users.

## When

Every interactive screen—especially Dialog/AlertDialog, Menu expand/collapse, and master–detail listview.

## UDS implementation

| Surface | Behavior |
|---------|----------|
| **Button** | \`focus-visible:ring-3 focus-visible:ring-ring/50\` + \`focus-visible:border-ring\` (\`button-theme.ts\`) |
| **Badge** | \`focus-visible:ring-[3px]\` when focusable |
| **Dialog** | Radix Dialog — focus trap in content; Title/Description required for naming |
| **Menu** | Root is \`<nav data-slot="uds-menu-root">\`; items use \`aria-current="page"\` when active |
| **Focus ring tokens** | \`--uds-focus-ring-width\` (2px), \`--uds-focus-ring-border\`, \`--uds-focus-ring-offset\` |

## How AI should reason

1. Do not invent \`tabIndex\` sequences that fight DOM order—fix the DOM.
2. Prefer UDS Dialog/AlertDialog over custom modals (trap + restore built in).
3. Icon-only buttons need \`aria-label\` so focus landing is announced.
4. After closing overlays, focus returns to the control that opened them.

Confidence: Required — Tab order follows visual order; modals trap focus.

${rel({
  Supports: ["Keyboard access", "Screen reader orientation"],
  Requires: ["Visible focus styles", "Dialog/Menu primitives"],
  Influences: ["Dialogs", "Forms", "Navigation"],
  Uses: ["Button focus-visible rings", "Radix Dialog", "Menu aria-current"],
  "Conflicts With": ["Positive tabindex spaghetti", "Custom modals without trap"],
  Alternatives: ["—"],
  "Depends On": ["interactions/focus"],
  "Referenced By": ["patterns/dialogs.md", "ontology/dialog.md"],
})}
${seeAlso([
  ["Focus interaction", "../interactions/focus.md"],
  ["Dialogs", "../patterns/dialogs.md"],
  ["Keyboard", "../interactions/keyboard.md"],
])}
`,
  )

  await write(
    "accessibility/forms.md",
    {
      id: "a11y-forms",
      category: "accessibility",
      type: "concept",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["forms", "field-ontology", "validation", "accessibility-meaning"],
      components: ["Field", "FieldLabel", "FieldError", "FieldDescription", "Input", "Select", "Switch"],
      patterns: ["forms", "settings-form"],
      tokens: [],
      depends_on: ["field-ontology", "validation"],
      influences: ["settings-form", "forms"],
      conflicts_with: ["accessibility-mistakes"],
      alternatives: [],
    },
    `# Accessible forms

## What

Every control is labeled, described, and (when invalid) announced through UDS \`Field\` chrome—not orphan inputs.

## Why

Settings and credentialing forms are high-stakes. Missing labels or color-only errors fail WCAG and slow agents.

## When

Any \`settings-form\` recipe, Dialog short forms, filter panels with inputs.

## UDS implementation (\`Field\`)

From \`src/components/ui/field.tsx\`:

| Piece | Role |
|-------|------|
| \`Field\` | \`role="group"\`; \`orientation\`: \`vertical\` \\| \`horizontal\` \\| \`responsive\` |
| \`FieldLabel\` / \`FieldTitle\` | Visible name |
| \`FieldDescription\` | Help text |
| \`FieldError\` | \`role="alert"\` |
| \`data-invalid="true"\` | Destructive text styling on the group |
| Disabled | \`group-data-[disabled=true]/field:opacity-50\` |

**Recipe:** \`ai/recipes/settings-form.md\` + \`ai/examples/settings-form.tsx\`.

## How AI should reason

1. Wrap every control in \`Field\` + \`FieldLabel\` (never placeholder-as-label).
2. On error: set invalid state + \`FieldError\` text (not color alone).
3. Required: indicate in label text or legend—not red border only.
4. Prefer Field over raw \`<label>\` + Input unless composing a documented exception.

Confidence: Required — Every input has a Field label; errors use FieldError + invalid state.

${rel({
  Supports: ["settings-form", "Dialog forms"],
  Requires: ["Field", "validation states"],
  Influences: ["Form pattern", "errors tree"],
  Uses: ["Field", "FieldLabel", "FieldError", "Input family"],
  "Conflicts With": ["Placeholder-only labels", "Color-only errors"],
  Alternatives: ["—"],
  "Depends On": ["field-ontology", "validation"],
  "Referenced By": ["patterns/forms.md", "interactions/validation.md"],
})}
${seeAlso([
  ["Forms pattern", "../patterns/forms.md"],
  ["Validation", "../interactions/validation.md"],
  ["Field ontology", "../ontology/field.md"],
])}
`,
  )

  await write(
    "accessibility/color-contrast.md",
    {
      id: "color-contrast",
      category: "accessibility",
      type: "concept",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["color", "contrast-discoverability", "readability", "typography"],
      components: ["Text", "Button", "Badge", "Status", "Link"],
      patterns: ["dashboards", "tables", "forms"],
      tokens: [
        "--uds-text-primary",
        "--uds-text-secondary",
        "--uds-surface-primary",
        "--uds-surface-secondary",
      ],
      depends_on: ["color", "contrast-discoverability"],
      influences: ["readability", "badge-ontology", "status-ontology"],
      conflicts_with: ["visual-noise", "accessibility-mistakes"],
      alternatives: [],
    },
    `# Color contrast

## What

Text and interactive chrome must meet WCAG contrast against their background. UDS encodes safe pairs as semantic tokens.

## Why

Secondary text on tinted brand surfaces is a common AI failure mode in dashboards.

## When

All text, icons-as-controls, Badge/Status labels, Button labels.

## UDS tokens (prefer these pairs)

| Role | Token examples |
|------|----------------|
| Body on page | \`--uds-text-primary\` on \`--uds-surface-primary\` |
| Meta / secondary | \`--uds-text-secondary\` on primary/secondary surfaces |
| Disabled | \`--uds-text-disabled\` on \`--uds-surface-disabled\` |
| Brand emphasis | \`--uds-text-brand-*\` / \`--uds-surface-brand-*\` via components |
| Links | \`--uds-text-link-primary-{default,hover,active,visited}\` |

Use \`Text\` \`appearance\` props (primary/secondary/tertiary/…) instead of raw hex.

**Status/Badge:** meaning also carried by label text (and Status \`variant\`), not hue alone.

## How AI should reason

1. Pick semantic text + surface tokens (or Text/Button/Badge appearances).
2. Avoid \`--uds-text-secondary\` on busy brand tints without checking contrast.
3. Never hardcode hex for product UI.

Confidence: Required — Use semantic text-on-surface tokens; no color-only status.

${rel({
  Supports: ["Readability", "Discoverability"],
  Requires: ["Color foundation"],
  Influences: ["Dashboards", "Tables", "Forms"],
  Uses: ["Text appearances", "semantic color tokens"],
  "Conflicts With": ["Hardcoded hex", "Secondary text on loud tints"],
  Alternatives: ["—"],
  "Depends On": ["color"],
  "Referenced By": ["foundations/color.md", "semantics/readability.md"],
})}
${seeAlso([
  ["Color", "../foundations/color.md"],
  ["Readability", "../semantics/readability.md"],
  ["Contrast physics", "../design-physics/contrast-discoverability.md"],
])}
`,
  )

  await write(
    "accessibility/touch-targets.md",
    {
      id: "touch-targets",
      category: "accessibility",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["button-ontology", "density", "spacing"],
      components: ["Button", "Menu", "Checkbox", "Switch", "Icon buttons"],
      patterns: ["navigation", "forms", "tables"],
      tokens: ["--uds-gap-8", "--uds-spacing-8"],
      depends_on: ["button-ontology"],
      influences: ["density", "tables"],
      conflicts_with: ["accessibility-mistakes"],
      alternatives: [],
    },
    `# Touch targets

## What

Primary interactive targets meet a **minimum 44×44px** hit area (WCAG 2.5.5 / platform norms).

## Why

Dense ops UIs tempt tiny icon buttons. Undersized targets cause mis-taps and fail a11y reviews.

## When

Buttons, Menu items, row icon actions, checkboxes/switches, pagination controls.

## UDS sizes (Button)

From \`button-theme.ts\`:

| \`size\` | Approx height |
|---------|----------------|
| \`default\` | **h-11 (44px)** — preferred default |
| \`sm\` | 36px |
| \`xs\` | 32px |
| \`lg\` | 52px |
| \`icon\` / \`icon-sm\` / … | Match sibling text button height; keep ≥44 when primary |

Inputs: Default ~44px, Compact/Small ~36px (Figma sync notes).

## How AI should reason

1. Default to Button \`size="default"\` (44px) for primary actions.
2. Dense tables may use \`sm\` but keep spacing so hit area stays usable (padding/gap).
3. Icon-only: use \`icon\` sizes + \`aria-label\`; do not shrink below compact without cause.

Confidence: Required — Primary actions ≥ 44×44px (Button default).

Confidence: Preferred — Prefer default over xs in touch-first portals.

${rel({
  Supports: ["Mobile / hybrid ops tools"],
  Requires: ["Button size scale"],
  Influences: ["Density choices", "Table row actions"],
  Uses: ["Button sizes", "Menu items"],
  "Conflicts With": ["Tiny custom icon hit areas"],
  Alternatives: ["Larger invisible padding around compact controls"],
  "Depends On": ["button-ontology"],
  "Referenced By": ["interactions/hover.md", "semantics/density.md"],
})}
${seeAlso([
  ["Button ontology", "../ontology/button.md"],
  ["Density", "../semantics/density.md"],
  ["Buttons tree", "../decision-rules/trees/buttons.md"],
])}
`,
  )

  await write(
    "accessibility/screen-readers.md",
    {
      id: "screen-readers",
      category: "accessibility",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["a11y-semantics", "accessibility-meaning", "status-ontology", "menu-ontology"],
      components: ["Button", "Menu", "Status", "FieldError", "Dialog", "Text"],
      patterns: ["navigation", "forms", "dialogs"],
      tokens: [],
      depends_on: ["a11y-semantics"],
      influences: ["navigation", "forms"],
      conflicts_with: ["accessibility-mistakes"],
      alternatives: [],
    },
    `# Screen readers

## What

UI exposes correct names, roles, and updates so assistive technology can announce state.

## Why

Menu, Status, and FieldError already encode AT behavior—bypassing them with \`div\` + CSS loses announcements.

## When

Icon-only controls, live status changes, dialogs, navigation current page, form errors.

## UDS patterns

| Need | Implementation |
|------|----------------|
| Icon-only Button | \`aria-label\` (required) |
| Decorative Status dot | Status sets dot \`aria-hidden\` — keep the text label |
| Menu current page | \`aria-current="page"\` on active item |
| Menu groups | \`aria-expanded\` / \`aria-controls\` |
| Menu icons | \`aria-hidden\` on decorative icons |
| Form errors | \`FieldError\` → \`role="alert"\` |
| Dialog name | \`DialogTitle\` + \`DialogDescription\` |
| Live status | Prefer Status/Alert text; avoid silent color flips |

## How AI should reason

1. Prefer UDS components (roles built in).
2. Never ship icon-only Button without \`aria-label\`.
3. Status/Badge: include visible text, not color alone.
4. Announce errors via FieldError, not toast-only for blocking field errors.

Confidence: Required — Visible labels or aria-label on every control; FieldError for errors.

${rel({
  Supports: ["Inclusive ops workflows"],
  Requires: ["Correct roles/names"],
  Influences: ["Menu", "Forms", "Dialogs"],
  Uses: ["aria-* on Menu/Button", "FieldError alert", "DialogTitle"],
  "Conflicts With": ["Div buttons", "Color-only status"],
  Alternatives: ["—"],
  "Depends On": ["a11y-semantics"],
  "Referenced By": ["accessibility/semantics.md"],
})}
${seeAlso([
  ["HTML/ARIA semantics", "./semantics.md"],
  ["Menu ontology", "../ontology/menu.md"],
  ["Accessible forms", "./forms.md"],
])}
`,
  )

  await write(
    "accessibility/headings.md",
    {
      id: "headings",
      category: "accessibility",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: ["hierarchy", "section-header-ontology", "readability"],
      components: ["SectionHeader", "Text", "DialogTitle"],
      patterns: ["dashboards", "detail-pages", "forms"],
      tokens: [],
      depends_on: ["hierarchy"],
      influences: ["content-hierarchy-tree", "dashboards"],
      conflicts_with: ["accessibility-mistakes"],
      alternatives: [],
    },
    `# Headings

## What

Page and section titles form a logical heading outline (one h1-equivalent page title, then section headings).

## Why

AT users navigate by headings. Fake bold paragraphs break that outline.

## When

Every page in \`AppShell.Main\`, dashboard sections, settings groups, dialog titles.

## UDS implementation

| Need | Component |
|------|-----------|
| Section title + optional actions | \`SectionHeader\` (first-party) |
| Semantic text roles | \`Text\` with \`variant="heading"\` sizes 24/28/32 |
| Dialog title | \`DialogTitle\` (required for naming) |
| Body copy | \`Text\` \`variant="body"\` (default size 14) |

Do not skip levels for style (e.g. jump body → display without a section heading).

## How AI should reason

1. One primary page title, then \`SectionHeader\` per major block.
2. Use SectionHeader/Text—not oversized \`div\` with font classes alone.
3. Dialog: always DialogTitle.

Confidence: Preferred — SectionHeader for section titles in AppShell.Main.

${rel({
  Supports: ["Hierarchy", "Screen reader nav"],
  Requires: ["SectionHeader / Text"],
  Influences: ["Dashboards", "Detail pages"],
  Uses: ["SectionHeader", "Text heading variant", "DialogTitle"],
  "Conflicts With": ["Bold divs as headings"],
  Alternatives: ["—"],
  "Depends On": ["hierarchy"],
  "Referenced By": ["semantics/hierarchy.md"],
})}
${seeAlso([
  ["Hierarchy", "../semantics/hierarchy.md"],
  ["SectionHeader ontology", "../ontology/section-header.md"],
  ["Content hierarchy tree", "../decision-rules/trees/content-hierarchy.md"],
])}
`,
  )

  await write(
    "accessibility/semantics.md",
    {
      id: "a11y-semantics",
      category: "accessibility",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["accessibility-meaning", "screen-readers", "affordance"],
      components: ["Button", "Link", "Menu", "Dialog", "Field", "Table"],
      patterns: ["navigation", "forms", "tables"],
      tokens: [],
      depends_on: ["accessibility-meaning"],
      influences: ["screen-readers"],
      conflicts_with: ["accessibility-mistakes"],
      alternatives: [],
    },
    `# Accessibility semantics (HTML / ARIA)

## What

This doc is about **HTML roles and names**—not design-semantics concepts (those live in \`semantics/\`).

Correct elements/roles: buttons are \`Button\`, links are \`Link\`, nav is Menu’s \`<nav>\`, dialogs use Dialog primitives.

## Why

\`div onClick\` looks interactive but lacks keyboard and AT semantics. UDS components ship the right roles.

## When

Any interactive or landmark UI.

## UDS landmarks & slots

| Landmark / slot | Implementation |
|-----------------|----------------|
| Product nav | \`Menu\` → \`<nav data-slot="uds-menu-root">\` |
| Main content | \`AppShell.Main\` / \`.appshell--main\` |
| Listview scroll | \`data-slot="appshell-listview-scroll"\` |
| Dialog | Radix Dialog parts with \`data-slot="dialog-*"\` |
| Field group | \`Field\` \`role="group"\` |

## How AI should reason

1. Never use \`div\`/\`span\` with click handlers for primary actions—use \`Button\` / \`Link\`.
2. Do not override roles on UDS primitives unless extending documented patterns.
3. Keep design-semantics (\`semantics/hierarchy.md\` etc.) separate from this a11y file.

Confidence: Required — Use UDS interactive components instead of clickable divs.

${rel({
  Supports: ["Screen readers", "Keyboard"],
  Requires: ["Published components"],
  Influences: ["All interactive patterns"],
  Uses: ["Button", "Link", "Menu nav", "Dialog", "Field"],
  "Conflicts With": ["Div buttons", "Fake links"],
  Alternatives: ["—"],
  "Depends On": ["accessibility-meaning"],
  "Referenced By": ["screen-readers.md"],
})}
${seeAlso([
  ["Screen readers", "./screen-readers.md"],
  ["Design semantics: accessibility meaning", "../semantics/accessibility-meaning.md"],
  ["Affordance", "../semantics/affordance.md"],
])}
`,
  )
}

// ─── Interactions ────────────────────────────────────────────────

async function populateInteractions() {
  const specs = [
    {
      file: "focus.md",
      id: "focus",
      title: "Focus",
      what: "Keyboard focus is visible and predictable on interactive UDS controls.",
      impl: `| Component | Pattern |
|-----------|---------|
| Button | \`focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50\` |
| Badge | \`focus-visible:ring-[3px]\` when interactive |
| Tokens | \`--uds-focus-ring-width\` 2px, border + offset tokens |
| Field | Invalid uses \`aria-invalid\` / \`data-invalid\` rings |`,
      reason: "1. Do not remove focus rings.\n2. Prefer focus-visible (mouse users keep clean UI).\n3. After Dialog close, restore trigger focus.",
      related: ["focus-order", "keyboard", "button-ontology"],
      components: ["Button", "Badge", "Input", "Dialog"],
    },
    {
      file: "hover.md",
      id: "hover",
      title: "Hover",
      what: "Hover feedback uses tokenized button/surface hover roles—not ad-hoc brightness filters.",
      impl: `| Control | Pattern |
|---------|---------|
| Button default | \`hover:bg-uds-button-surface-primary-hover\` |
| Secondary/ghost | Muted / secondary hover tokens in \`button-theme.ts\` |
| Links | \`--uds-text-link-primary-hover\` via Text/Link appearances |`,
      reason: "1. Use Button/Link variants.\n2. Hover is not the only affordance—keyboard focus must also work.\n3. Do not rely on hover-only tooltips for essential info.",
      related: ["affordance", "button-ontology", "focus"],
      components: ["Button", "Link"],
    },
    {
      file: "pressed.md",
      id: "pressed",
      title: "Pressed",
      what: "Active/pressed feedback confirms a control engaged.",
      impl: `Button: \`active:not-aria-[haspopup]:translate-y-px\` (subtle press). Menus/dialogs use open state via \`data-open\` / \`aria-expanded\`.`,
      reason: "1. Prefer component built-ins.\n2. For toggles use selected/aria-pressed patterns on Toggle/ToggleGroup.\n3. Do not fake press with only color if state must persist—use selected.",
      related: ["selected", "button-ontology"],
      components: ["Button", "Toggle"],
    },
    {
      file: "disabled.md",
      id: "disabled",
      title: "Disabled",
      what: "Disabled controls are non-interactive and visually muted via component disabled styles.",
      impl: `| Component | Pattern |
|-----------|---------|
| Button | \`disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50\` + disabled surface/text tokens |
| Field | \`group-data-[disabled=true]/field:opacity-50\` |
| Surfaces | \`--uds-surface-disabled\`, \`--uds-text-disabled\`, \`--uds-border-disabled\` |`,
      reason: "1. Use the \`disabled\` prop—do not only gray with CSS.\n2. Prefer explaining why via FieldDescription when a primary action is disabled.\n3. Disabled ≠ read-only; use read-only inputs when value must remain focusable.",
      related: ["validation", "affordance", "a11y-forms"],
      components: ["Button", "Field", "Input"],
    },
    {
      file: "selected.md",
      id: "selected",
      title: "Selected",
      what: "Selection state marks the current item in lists, nav, and toggles.",
      impl: `| Surface | Pattern |
|---------|---------|
| Menu item | \`data-active\` + \`aria-current="page"\` when route matches |
| Toggle / ToggleGroup | selected styling via component props |
| Listview rows | Product-selected row styling; keep keyboard focus visible |`,
      reason: "1. Drive from route/state—not CSS :hover alone.\n2. Menu: set active from router.\n3. Tables: selected row must remain distinguishable without color-only cues.",
      related: ["navigation", "menu-ontology", "lists"],
      components: ["Menu", "Toggle", "Item", "Table"],
    },
    {
      file: "keyboard.md",
      id: "keyboard",
      title: "Keyboard",
      what: "All pointer actions have keyboard equivalents through UDS/Radix primitives.",
      impl: `- Button/Link: Enter/Space activate
- Dialog: Escape closes; Tab cycles within trap
- Menu: arrow keys within nav patterns as implemented; expand/collapse via control
- Select/Combobox/DropdownMenu: Radix keyboard model`,
      reason: "1. Do not replace Radix/UDS overlays with div menus.\n2. Ensure custom listview rows are focusable buttons/links if clickable.\n3. See focus-order for tab sequence.",
      related: ["focus-order", "focus", "dialogs"],
      components: ["Dialog", "Menu", "DropdownMenu", "Select", "Button"],
    },
    {
      file: "validation.md",
      id: "validation",
      title: "Validation",
      what: "Field-level and form-level validation use invalid state + error text.",
      impl: `| Mechanism | Detail |
|-----------|--------|
| Field | \`data-invalid="true"\` → destructive styling |
| FieldError | \`role="alert"\` |
| Button/Input | \`aria-invalid:border-destructive\` + ring |
| Blocking vs soft | Blocking → Alert/Dialog (errors tree); field → FieldError |`,
      reason: "1. Pair invalid styling with FieldError text.\n2. Don’t use toast as the only message for field errors.\n3. Follow errors decision tree for page-level failures.",
      related: ["a11y-forms", "errors-tree", "field-ontology"],
      components: ["Field", "FieldError", "Alert", "Input"],
    },
    {
      file: "loading.md",
      id: "loading",
      title: "Loading",
      what: "Loading states use Spinner/Skeleton/Progress—not disabled-looking fake content without announcement.",
      impl: `| Component | Use |
|-----------|-----|
| \`Spinner\` | Inline / button busy |
| \`Skeleton\` | Content placeholders in Main/listview |
| \`Progress\` / \`ProgressCircles\` | Determinate progress |
| Button | Disable + Spinner child while submitting |`,
      reason: "1. Prefer Skeleton in known layouts over blank Main.\n2. Disable submit Button while pending.\n3. Avoid layout jump—reserve space.",
      related: ["empty-states", "buttons-tree"],
      components: ["Spinner", "Skeleton", "Progress", "Button"],
    },
    {
      file: "drag-drop.md",
      id: "drag-drop",
      title: "Drag and drop",
      what: "Drag-and-drop is optional enhancement; keyboard/file-picker equivalents required.",
      impl: `File upload: use \`FileUpload\` / \`FileUploadCards\` (first-party) rather than bespoke drop zones without keyboard path. Provide explicit file picker button.`,
      reason: "1. Always offer click-to-upload.\n2. Announce errors via FieldError/Alert.\n3. Do not make drag the only path.",
      related: ["a11y-forms", "affordance"],
      components: ["FileUpload", "FileUploadCards", "Button"],
    },
  ]

  for (const s of specs) {
    await write(
      `interactions/${s.file}`,
      {
        id: s.id,
        category: "interaction",
        type: "concept",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: s.related,
        components: s.components,
        patterns: [],
        tokens: [],
        depends_on: [],
        influences: s.related,
        conflicts_with: ["accessibility-mistakes"],
        alternatives: [],
      },
      `# ${s.title}

## What

${s.what}

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using ${s.components.join(", ")}.

## UDS implementation

${s.impl}

## How AI should reason

${s.reason}

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.

${rel({
  Supports: ["Affordance", "Accessibility"],
  Requires: ["Published components"],
  Influences: s.related,
  Uses: s.components,
  "Conflicts With": ["Custom state CSS that removes focus/disabled semantics"],
  Alternatives: ["—"],
  "Depends On": ["affordance"],
  "Referenced By": ["ai/indexes/concept-index.md"],
})}
${seeAlso(s.related.slice(0, 3).map((r) => [r, hrefForId(r)]))}
`,
    )
  }
}

// ─── Foundations ─────────────────────────────────────────────────

async function populateFoundations() {
  await write(
    "foundations/typography.md",
    {
      id: "typography",
      category: "foundation",
      type: "concept",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["hierarchy", "readability", "typography-scale", "section-header-ontology"],
      components: ["Text", "SectionHeader"],
      patterns: ["dashboards", "forms", "detail-pages"],
      tokens: ["--uds-font-family", "--uds-font-size-14", "--uds-font-weight-semibold"],
      depends_on: [],
      influences: ["hierarchy", "readability"],
      conflicts_with: ["visual-noise"],
      alternatives: [],
    },
    `# Typography

## What

UDS type is Inter-based (\`--uds-font-family\`) exposed through the \`Text\` component and \`--uds-type-*\` / \`--uds-font-size-*\` tokens.

## Why

Ad-hoc font sizes break hierarchy and dark/light theme type ramps.

## When

All product copy. Prefer \`Text\` / \`SectionHeader\` over raw Tailwind text sizes for semantic roles.

## Text API (\`src/components/ui/text.tsx\`)

| Prop | Values |
|------|--------|
| \`variant\` | \`body\` \\| \`heading\` \\| \`display\` |
| \`size\` (body) | 10, 12, **14 (default)**, 16, 18, 20 |
| \`size\` (heading) | **24 (default)**, 28, 32 |
| \`size\` (display) | 36, 48 (default), 60, 72, 96, 128 |
| \`appearance\` | primary/secondary/tertiary/quaternary/disabled/placeholder/inverse + brand-* + link-* |
| \`weight\` | regular / medium / semibold / bold → \`font-uds-*\` |
| \`lineHeight\` | regular \\| tight \\| loose |

## How AI should reason

1. Page/section titles → SectionHeader or Text \`heading\`.
2. Body → Text \`body\` size 14 default.
3. Map importance to \`appearance\` (primary vs secondary), not random hex.
4. Avoid display sizes inside dense AppShell.Main ops screens.

Confidence: Required — Use Text/SectionHeader + tokens; do not hardcode font stacks.

${rel({
  Supports: ["Hierarchy", "Readability"],
  Requires: ["Font tokens"],
  Influences: ["All patterns"],
  Uses: ["Text", "SectionHeader", "--uds-font-*", "--uds-type-*"],
  "Conflicts With": ["Ad-hoc px type"],
  Alternatives: ["—"],
  "Depends On": ["—"],
  "Referenced By": ["relationships/typography-scale.md"],
})}
${seeAlso([
  ["Typography scale", "../relationships/typography-scale.md"],
  ["Hierarchy", "../semantics/hierarchy.md"],
  ["Headings a11y", "../accessibility/headings.md"],
])}
`,
  )

  await write(
    "foundations/elevation.md",
    {
      id: "elevation",
      category: "foundation",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: ["choosing-elevation", "elevation-scale", "shadows", "dialogs"],
      components: ["Dialog", "DropdownMenu", "Popover", "Tooltip", "Toast"],
      patterns: ["dialogs"],
      tokens: [
        "--uds-elevation-dropdown",
        "--uds-elevation-modal",
        "--uds-elevation-toast",
        "--uds-elevation-tooltip",
      ],
      depends_on: [],
      influences: ["dialogs", "choosing-elevation"],
      conflicts_with: ["visual-noise"],
      alternatives: [],
    },
    `# Elevation

## What

Elevation is the **z-index stacking scale** for overlays (not decorative card shadows alone).

## Token scale (\`uds-tokens.css\`)

| Token | Value | Typical use |
|-------|------:|-------------|
| \`--uds-elevation-base\` | 0 | Page |
| \`--uds-elevation-sticky\` | 100 | Sticky headers |
| \`--uds-elevation-dropdown\` | 500 | Menus / selects |
| \`--uds-elevation-menu\` | 1000 | Elevated menus |
| \`--uds-elevation-overlay\` | 1100 | Backdrops |
| \`--uds-elevation-modal\` | 1300 | Dialogs |
| \`--uds-elevation-toast\` | 1400 | Toasts (Sonner) |
| \`--uds-elevation-tooltip\` | 1500 | Tooltips |

Shadow recipes (\`--uds-boxshadow-sm|default|md|lg|xl|2xl|inner\`) compose \`--uds-shadow-*\` color stops.

## How AI should reason

1. Prefer component defaults (Dialog/Dropdown already stack correctly).
2. Do not invent z-index wars on cards inside Main.
3. See choosing-elevation for when shadows vs flat borders.

Confidence: Preferred — Use overlay components; don’t hand-stack z-index on content cards.

${rel({
  Supports: ["Overlay discoverability"],
  Requires: ["Elevation tokens"],
  Influences: ["Dialogs", "Menus"],
  Uses: ["--uds-elevation-*", "--uds-boxshadow-*"],
  "Conflicts With": ["Shadow on every Card"],
  Alternatives: ["Border separation for cards"],
  "Depends On": ["—"],
  "Referenced By": ["choosing-elevation.md"],
})}
${seeAlso([
  ["Choosing elevation", "../decision-rules/choosing-elevation.md"],
  ["Shadows", "./shadows.md"],
  ["Elevation scale", "../relationships/elevation-scale.md"],
])}
`,
  )

  await write(
    "foundations/shadows.md",
    {
      id: "shadows",
      category: "foundation",
      type: "concept",
      priority: "medium",
      ai_priority: "medium",
      confidence_default: "preferred",
      related: ["elevation", "choosing-elevation", "visual-noise"],
      components: ["Dialog", "DropdownMenu", "Card"],
      patterns: ["dialogs", "cards"],
      tokens: ["--uds-boxshadow-sm", "--uds-boxshadow-md", "--uds-shadow-10"],
      depends_on: ["elevation"],
      influences: ["cards"],
      conflicts_with: ["visual-noise"],
      alternatives: [],
    },
    `# Shadows

## What

Shadow tokens (\`--uds-shadow-5|8|10|12|15|18|25\` and \`--uds-boxshadow-*\`) support elevation perception for overlays.

## Why

Multi-layer custom shadows create visual noise in dense dashboards. UDS ships recipes.

## When

Overlays (dialog, menu, popover). Cards: prefer border/surface tokens first.

## How AI should reason

1. Do not copy multi-shadow CSS from generic AI layouts.
2. Use component chrome (Dialog already elevated).
3. Cards in \`workspace-dashboard\` / triage: flat + border unless product already uses shadow.

Confidence: Preferred — Prefer borders on cards; shadows for overlays.

${rel({
  Supports: ["Elevation"],
  Requires: ["Shadow tokens"],
  Influences: ["Dialogs"],
  Uses: ["--uds-boxshadow-*"],
  "Conflicts With": ["visual-noise"],
  Alternatives: ["Border / surface separation"],
  "Depends On": ["elevation"],
  "Referenced By": ["foundations/elevation.md"],
})}
${seeAlso([
  ["Elevation", "./elevation.md"],
  ["Visual noise", "../anti-patterns/visual-noise.md"],
])}
`,
  )

  await write(
    "foundations/iconography.md",
    {
      id: "iconography",
      category: "foundation",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["navigation", "button-ontology", "affordance"],
      components: ["Menu", "Button", "Badge", "HouseIcon"],
      patterns: ["navigation"],
      tokens: [],
      depends_on: [],
      influences: ["navigation", "default-navigation"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Iconography

## What

UDS icons are **Phosphor** glyphs exposed as package icon components (e.g. \`HouseIcon\`), including Menu \`navigationItems\`.

## Why

Ad-hoc SVG chevrons and emoji break optical size and brand consistency. Figma uses Icon + INSTANCE_SWAP the same way.

## When

Menu items, Button leading icons, empty states, Badge optional icon.

## Rules

- Import icons from \`@chghealthcare/unified-design-system\` (published icon components).
- Menu defaults: see \`ai/recipes/default-navigation.md\` for brand default sets.
- Decorative icons: \`aria-hidden\` (Menu already does this on nav icons).
- Icon-only Button: require \`aria-label\`.
- Do not use text characters (\`>\`, \`v\`) as chevrons.

Confidence: Required — Phosphor via package icons; no ad-hoc SVG chevrons.

${rel({
  Supports: ["Navigation affordance"],
  Requires: ["Package icon exports"],
  Influences: ["Menu", "Buttons"],
  Uses: ["Phosphor icon components"],
  "Conflicts With": ["Emoji as UI icons", "Raw SVG chevrons"],
  Alternatives: ["—"],
  "Depends On": ["—"],
  "Referenced By": ["patterns/navigation.md", "ai/recipes/default-navigation.md"],
})}
${seeAlso([
  ["Navigation", "../patterns/navigation.md"],
  ["Default navigation recipe", "../../ai/recipes/default-navigation.md"],
  ["Screen readers", "../accessibility/screen-readers.md"],
])}
`,
  )

  await write(
    "foundations/motion.md",
    {
      id: "motion",
      category: "foundation",
      type: "concept",
      priority: "medium",
      ai_priority: "medium",
      confidence_default: "preferred",
      related: ["motion-identity", "dialogs", "menu-ontology"],
      components: ["Dialog", "Menu", "Drawer"],
      patterns: ["dialogs", "navigation"],
      tokens: [],
      depends_on: ["motion-identity"],
      influences: ["dialogs"],
      conflicts_with: ["visual-noise"],
      alternatives: [],
    },
    `# Motion

## What

Motion preserves object identity across state changes (Menu expand, Dialog open/close) using component transitions (\`data-open\` / \`data-closed\` on Dialog overlay/content).

## Why

Decorative bounce/glow fights operational clarity and can violate motion sensitivity expectations.

## When

Shell chrome (Menu width), overlays (Dialog/Drawer), subtle Button press (\`translate-y-px\`). Not for KPI cards.

## How AI should reason

1. Prefer built-in Dialog/Menu motion.
2. Do not add attention-seeking loops on dashboards.
3. Align with design-physics \`motion-identity\`.

Confidence: Preferred — Motion only to preserve identity or explain state change.

${rel({
  Supports: ["Spatial stability", "Overlay comprehension"],
  Requires: ["Component transitions"],
  Influences: ["Dialogs", "Menu"],
  Uses: ["Radix data-open/closed", "Menu expand"],
  "Conflicts With": ["Decorative motion / glow"],
  Alternatives: ["Instant state with clear focus"],
  "Depends On": ["motion-identity"],
  "Referenced By": ["design-physics/motion-identity.md"],
})}
${seeAlso([
  ["Motion identity physics", "../design-physics/motion-identity.md"],
  ["Dialogs", "../patterns/dialogs.md"],
])}
`,
  )

  await write(
    "foundations/borders.md",
    {
      id: "borders",
      category: "foundation",
      type: "concept",
      priority: "medium",
      ai_priority: "medium",
      confidence_default: "preferred",
      related: ["color", "cards", "tables"],
      components: ["Card", "Table", "Separator", "Input"],
      patterns: ["cards", "tables", "forms"],
      tokens: [
        "--uds-border-primary",
        "--uds-border-secondary",
        "--uds-border-width-1",
        "--uds-border-width-2",
      ],
      depends_on: ["color"],
      influences: ["cards", "tables"],
      conflicts_with: ["visual-noise"],
      alternatives: ["shadows"],
    },
    `# Borders

## What

Semantic border colors and widths: \`--uds-border-primary|secondary|tertiary|quaternary|disabled|inverse\` (+ brand), widths \`--uds-border-width-1|2|4|6|none\`.

## Why

Hairline chaos and stacked card outlines create visual noise. Tokens keep tables/cards aligned to theme.

## When

Card outlines, input borders, table rules, Separator. Prefer \`--uds-border-primary/secondary\` over hex.

## How AI should reason

1. Use component borders (Input/Card) before custom.
2. One border weight per region; don’t double-outline nested cards (see nesting).
3. Brand borders via brand tokens / components—not custom.

Confidence: Preferred — Semantic border tokens; avoid nested Card borders.

${rel({
  Supports: ["Grouping without shadow"],
  Requires: ["Color tokens"],
  Influences: ["Cards", "Tables", "Forms"],
  Uses: ["--uds-border-*"],
  "Conflicts With": ["visual-noise"],
  Alternatives: ["Surface fills", "Separator"],
  "Depends On": ["color"],
  "Referenced By": ["composition/nesting.md"],
})}
${seeAlso([
  ["Color", "./color.md"],
  ["Nesting", "../composition/nesting.md"],
  ["Cards", "../patterns/cards.md"],
])}
`,
  )

  await write(
    "foundations/opacity.md",
    {
      id: "opacity",
      category: "foundation",
      type: "concept",
      priority: "medium",
      ai_priority: "low",
      confidence_default: "preferred",
      related: ["disabled", "shadows"],
      components: ["Button", "Field"],
      patterns: [],
      tokens: [],
      depends_on: [],
      influences: ["disabled"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Opacity

## What

Opacity communicates disabled/decorative state. Button/Field use \`opacity-50\` when disabled; prefer semantic disabled tokens for text/surfaces when available.

## Why

Random opacity on content reduces contrast below WCAG without looking “disabled.”

## When

Disabled controls, decorative overlays—not primary body text.

Confidence: Preferred — Use \`disabled\` props; don’t fade body copy for hierarchy.

${rel({
  Supports: ["Disabled affordance"],
  Requires: ["Disabled states"],
  Influences: ["Button", "Field"],
  Uses: ["disabled:opacity-50", "disabled tokens"],
  "Conflicts With": ["Low-contrast faded text as hierarchy"],
  Alternatives: ["Text appearance secondary/tertiary"],
  "Depends On": ["disabled"],
  "Referenced By": ["interactions/disabled.md"],
})}
${seeAlso([
  ["Disabled", "../interactions/disabled.md"],
  ["Color contrast", "../accessibility/color-contrast.md"],
])}
`,
  )

  await write(
    "foundations/sizing.md",
    {
      id: "sizing",
      category: "foundation",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: ["touch-targets", "spacing", "button-ontology"],
      components: ["Button", "Input", "AppShell"],
      patterns: ["forms", "navigation"],
      tokens: ["--appshell-menu-width-expanded", "--appshell-listview-width"],
      depends_on: ["touch-targets"],
      influences: ["forms", "navigation"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Sizing

## What

Control and region sizes come from component size props and AppShell CSS variables—not magic numbers.

## Key sizes

| Surface | Size |
|---------|------|
| Button default | 44px height (\`h-11\`) |
| Button sm / xs | 36px / 32px |
| Input default / compact | ~44px / ~36px |
| Menu expanded / collapsed | \`--appshell-menu-width-expanded\` **280px** / \`--appshell-menu-width-collapsed\` **64px** |
| Listview | \`--appshell-listview-width\` **320px** |
| Header | \`--appshell-header-height\` **3.5rem** |

## How AI should reason

1. Use Button/Input size variants.
2. Do not override AppShell widths with bespoke fixed rails.
3. Meet touch-target minimums for primary actions.

Confidence: Preferred — Prefer AppShell CSS variables for shell geometry.

${rel({
  Supports: ["Touch targets", "Spatial stability"],
  Requires: ["Component size APIs"],
  Influences: ["Layout", "Forms"],
  Uses: ["Button sizes", "AppShell CSS vars"],
  "Conflicts With": ["Fixed inset-y Sidebar hacks"],
  Alternatives: ["—"],
  "Depends On": ["touch-targets"],
  "Referenced By": ["grammar/regions.md"],
})}
${seeAlso([
  ["Touch targets", "../accessibility/touch-targets.md"],
  ["AppShell regions", "../grammar/regions.md"],
  ["Spacing", "./spacing.md"],
])}
`,
  )

  await write(
    "foundations/grid.md",
    {
      id: "grid",
      category: "foundation",
      type: "concept",
      priority: "medium",
      ai_priority: "medium",
      confidence_default: "preferred",
      related: ["alignment", "responsive-layout", "dashboards"],
      components: ["AppShell", "Card"],
      patterns: ["dashboards", "forms"],
      tokens: ["--uds-gap-16", "--uds-gap-24"],
      depends_on: ["alignment", "spacing"],
      influences: ["dashboards"],
      conflicts_with: ["layout-mistakes"],
      alternatives: [],
    },
    `# Grid

## What

UDS does not ship a separate 12-column framework. Layout grids are composed with AppShell regions + CSS flex/grid using \`--uds-gap-*\` spacing.

## Why

Shell geometry (menu/listview/main) is the primary grid. Inner pages use simple columns (e.g. KPI row + stack) aligned to spacing tokens.

## When

Dashboard KPI rows, settings two-column (label/field via Field orientation), analytics chart + feed.

## How AI should reason

1. Outer grid = AppShell regions.
2. Inner grid = flex/grid + gap tokens (16/24).
3. Align columns (see alignment semantics).
4. Follow recipe examples for dense dashboards rather than inventing a Bootstrap-like grid.

Confidence: Preferred — Compose with AppShell + gap tokens; no third-party grid system.

${rel({
  Supports: ["Alignment", "Dashboards"],
  Requires: ["Spacing", "AppShell"],
  Influences: ["Dashboard patterns"],
  Uses: ["--uds-gap-*", "flex/grid"],
  "Conflicts With": ["Bespoke page frameworks outside shell"],
  Alternatives: ["—"],
  "Depends On": ["spacing", "alignment"],
  "Referenced By": ["patterns/dashboards.md"],
})}
${seeAlso([
  ["Alignment", "../semantics/alignment.md"],
  ["Responsive layout", "../composition/responsive-layout.md"],
  ["Dashboards", "../patterns/dashboards.md"],
])}
`,
  )
}

// ─── Anti-patterns, composition, relationships, examples, ontology ─

async function populateAntiPatterns() {
  const contract = [
    "Do not build a bespoke outer shell with raw div/aside markup when AppShell plus Menu already fits the screen.",
    "Do not put Sidebar* in AppShell.menu and add fixed inset-y-0 rail CSS — use Menu in menu.",
    "Do not use AppShell props sidebarWidth, showListview, or mainClassName — they are not on the published API.",
    "Do not use CSS that collapses .appshell--main > :first-child to fix layout.",
    "Do not assume consumer-only react-router-dom fills AppShell without a layout route under the same router.",
    "Do not import from src/components/ui/*, dist/*, or repo-local aliases in consumer code.",
    "Do not invent a parallel component system for buttons, fields, badges, or status treatments when package exports exist.",
    "Do not default to stock shadcn layout patterns when UDS-specific first-party components are available.",
  ]

  await write(
    "anti-patterns/layout-mistakes.md",
    {
      id: "layout-mistakes",
      category: "anti-pattern",
      type: "rule",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["grammar-regions", "appshell-ontology", "choosing-layout"],
      components: ["AppShell", "Menu"],
      patterns: ["navigation"],
      tokens: [],
      depends_on: [],
      influences: [],
      conflicts_with: ["grammar-rules"],
      alternatives: ["auth-shell", "detail-with-listview"],
    },
    `# Layout mistakes

## What

Contract-normative layout anti-patterns (from \`ai/uds-contract.json\` → \`antiPatterns\`).

## Never do this

${contract
  .filter((s) => /AppShell|Sidebar|router|shell|mainClassName|showListview|sidebarWidth|first-child/i.test(s))
  .map((s) => `- ${s}`)
  .join("\n")}

## How AI should reason

1. Start from \`auth-shell\` / AppShell + Menu.
2. Master–detail → \`listview\` prop + \`detail-with-listview\` recipe.
3. Static apps → \`enableRouterOutlet={false}\`.
4. If outlet is empty, fix routes—do not CSS-collapse \`.appshell--main > :first-child\`.

Confidence: Required — These match the published contract.

${rel({
  Supports: ["Correct shell composition"],
  Requires: ["AppShell", "Menu"],
  Influences: ["All authenticated screens"],
  Uses: ["ai/recipes/auth-shell.md"],
  "Conflicts With": ["grammar-regions (when violated)"],
  Alternatives: ["Published recipes"],
  "Depends On": ["—"],
  "Referenced By": ["AGENTS.md", "grammar/regions.md"],
})}
${seeAlso([
  ["Choosing layout", "../decision-rules/choosing-layout.md"],
  ["Regions", "../grammar/regions.md"],
  ["Auth shell recipe", "../../ai/recipes/auth-shell.md"],
])}
`,
  )

  await write(
    "anti-patterns/spacing-mistakes.md",
    {
      id: "spacing-mistakes",
      category: "anti-pattern",
      type: "rule",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["spacing", "proximity", "choosing-spacing"],
      components: [],
      patterns: [],
      tokens: ["--uds-gap-8", "--uds-gap-16"],
      depends_on: [],
      influences: [],
      conflicts_with: ["spacing"],
      alternatives: [],
    },
    `# Spacing mistakes

## What

Common spacing failures in UDS consumers and AI output.

## Never / avoid

- Hardcoded \`p-[13px]\`, \`gap-[7px]\`, or arbitrary spacing outside \`--uds-gap-*\` / \`--uds-spacing-*\`
- Equal gaps everywhere (erases proximity)
- Section gaps smaller than field-stack gaps
- Negative margins to “fix” AppShell padding

## Do instead

Use the gap scale: 2, 4, 8, 12, 16, 20, 24, 32, 40 — see \`foundations/spacing.md\`.

Confidence: Required — Stay on UDS spacing tokens.

${rel({
  Supports: ["Proximity"],
  Requires: ["Spacing foundation"],
  Influences: ["—"],
  Uses: ["--uds-gap-*"],
  "Conflicts With": ["spacing (correct usage)"],
  Alternatives: ["choosing-spacing table"],
  "Depends On": ["—"],
  "Referenced By": ["foundations/spacing.md"],
})}
${seeAlso([
  ["Spacing", "../foundations/spacing.md"],
  ["Choosing spacing", "../decision-rules/choosing-spacing.md"],
])}
`,
  )

  await write(
    "anti-patterns/radius-mistakes.md",
    {
      id: "radius-mistakes",
      category: "anti-pattern",
      type: "rule",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["corner-radius", "choosing-radius"],
      components: ["Card", "Button"],
      patterns: ["cards"],
      tokens: ["--uds-radius-12", "--uds-radius-9999"],
      depends_on: [],
      influences: [],
      conflicts_with: ["corner-radius"],
      alternatives: [],
    },
    `# Radius mistakes

## What

Violations of the UDS rectangle radius cap.

## Never

- \`rounded-2xl\`, \`rounded-3xl\`, \`rounded-[16px]\` (or larger) on **rectangular** surfaces
- \`rounded-full\` on cards, dialogs, inputs, or panels to fake large corners
- Ignoring that tokens include \`--uds-radius-16|20|24\` in CSS — **product UI policy still caps rectangles at 12px**

## Do instead

Prefer \`--uds-radius-4\` for chrome; max \`--uds-radius-12\` for rectangles; \`9999\` only for pills/circles/avatars.

Confidence: Required — Rectangles ≤ 12px.

${rel({
  Supports: ["Consistent chrome"],
  Requires: ["corner-radius policy"],
  Influences: ["—"],
  Uses: ["--uds-radius-4/8/12"],
  "Conflicts With": ["corner-radius (when violated)"],
  Alternatives: ["choosing-radius"],
  "Depends On": ["—"],
  "Referenced By": ["foundations/corner-radius.md", "AGENTS.md"],
})}
${seeAlso([
  ["Corner radius", "../foundations/corner-radius.md"],
  ["Choosing radius", "../decision-rules/choosing-radius.md"],
])}
`,
  )

  await write(
    "anti-patterns/visual-noise.md",
    {
      id: "visual-noise",
      category: "anti-pattern",
      type: "rule",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: ["density", "hierarchy", "shadows", "emphasis"],
      components: ["Card", "Badge", "Button"],
      patterns: ["dashboards"],
      tokens: [],
      depends_on: [],
      influences: [],
      conflicts_with: ["hierarchy", "density"],
      alternatives: ["progressive-disclosure"],
    },
    `# Visual noise

## What

Too many equal-weight surfaces, badges, shadows, and primary buttons in one viewport.

## Avoid

- Card wrapping every paragraph/KPI without hierarchy
- Multiple primary Buttons per section
- Stacked shadows + loud badges + charts all competing
- Stock “AI dashboard” purple gradients / glow (not UDS)

## Do instead

- One primary CTA per region
- Recipe-aligned density (\`ops-queue-dashboard\`, \`triage-dashboard\`, etc.)
- Status/Badge sparingly; SectionHeader for structure
- Flat cards + semantic color

Confidence: Preferred — Prefer clarity over ornament in AppShell.Main.

${rel({
  Supports: ["Clarity over density (philosophy)"],
  Requires: ["Hierarchy", "Intent"],
  Influences: ["—"],
  Uses: ["Recipes", "SectionHeader"],
  "Conflicts With": ["hierarchy (when violated)"],
  Alternatives: ["progressive-disclosure", "listview"],
  "Depends On": ["—"],
  "Referenced By": ["philosophy.md", "semantics/density.md"],
})}
${seeAlso([
  ["Density", "../semantics/density.md"],
  ["Choosing patterns", "../decision-rules/choosing-patterns.md"],
  ["Shadows", "../foundations/shadows.md"],
])}
`,
  )

  await write(
    "anti-patterns/accessibility-mistakes.md",
    {
      id: "accessibility-mistakes",
      category: "anti-pattern",
      type: "rule",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["a11y-forms", "screen-readers", "color-contrast", "touch-targets"],
      components: ["Button", "Field", "Status"],
      patterns: ["forms"],
      tokens: [],
      depends_on: [],
      influences: [],
      conflicts_with: ["a11y-forms"],
      alternatives: [],
    },
    `# Accessibility mistakes

## Never

- Clickable \`div\`/\`span\` instead of \`Button\` / \`Link\`
- Icon-only Button without \`aria-label\`
- Placeholder-as-label (skip \`FieldLabel\`)
- Errors shown only as red borders / toast without \`FieldError\`
- Status by color alone (no text)
- Removing \`focus-visible\` rings
- Touch targets ≪ 44px for primary actions
- Custom modal without focus trap (skip UDS Dialog)

## Also from contract

- Do not invent parallel buttons/fields/badges/status when package exports exist.

Confidence: Required.

${rel({
  Supports: ["Inclusive UI"],
  Requires: ["UDS components"],
  Influences: ["—"],
  Uses: ["Field", "Button", "Dialog", "Status"],
  "Conflicts With": ["a11y-forms (when violated)"],
  Alternatives: ["Published Field/Dialog patterns"],
  "Depends On": ["—"],
  "Referenced By": ["accessibility/*.md"],
})}
${seeAlso([
  ["Accessible forms", "../accessibility/forms.md"],
  ["Screen readers", "../accessibility/screen-readers.md"],
  ["Touch targets", "../accessibility/touch-targets.md"],
])}
`,
  )
}

async function populateComposition() {
  await write(
    "composition/nesting.md",
    {
      id: "nesting",
      category: "composition",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: ["cards", "grouping", "borders", "visual-noise"],
      components: ["Card"],
      patterns: ["cards", "dashboards", "forms"],
      tokens: [],
      depends_on: ["grouping"],
      influences: ["cards"],
      conflicts_with: ["visual-noise"],
      alternatives: ["section-header-ontology"],
    },
    `# Nesting

## What

Limit bordered surface nesting. Card-inside-Card only when the inner card is a distinct interactive unit.

## Why

Deep nested outlines are a common AI dashboard failure and create visual noise.

## When / when not

| OK | Avoid |
|----|-------|
| Card section containing a Table | Card > Card > Card for static text |
| Dialog containing a Field group | Card around every Field |
| Listview Item rows | Nested cards for each meta line |

Prefer flat sections with \`SectionHeader\` over deep bordered boxes.

Confidence: Preferred — Prefer SectionHeader + spacing over nested Cards.

${rel({
  Supports: ["Clarity"],
  Requires: ["Grouping judgment"],
  Influences: ["Cards", "Dashboards"],
  Uses: ["Card", "SectionHeader"],
  "Conflicts With": ["visual-noise"],
  Alternatives: ["Flat sections"],
  "Depends On": ["grouping"],
  "Referenced By": ["patterns/cards.md"],
})}
${seeAlso([
  ["Cards", "../patterns/cards.md"],
  ["Grouping", "../semantics/grouping.md"],
  ["Visual noise", "../anti-patterns/visual-noise.md"],
])}
`,
  )

  await write(
    "composition/overflow.md",
    {
      id: "overflow",
      category: "composition",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["grammar-regions", "detail-pages", "appshell-ontology"],
      components: ["AppShell", "ScrollArea"],
      patterns: ["detail-pages"],
      tokens: [],
      depends_on: ["grammar-regions"],
      influences: ["detail-with-listview"],
      conflicts_with: ["layout-mistakes"],
      alternatives: [],
    },
    `# Overflow & scrolling

## What

AppShell scroll ownership: **only \`.appshell--main\` scrolls** for master–detail. Listview uses a pinned header + \`data-slot="appshell-listview-scroll"\` body.

## Why

Wrong overflow creates double scrollbars or clipped queues—the most common AppShell integration bug.

## Rules

1. Shell: \`className="min-h-dvh w-full min-w-0"\`.
2. \`html\`, \`body\`, \`#root\` fill the viewport.
3. Listview: flex column; header \`shrink-0\`; list body on \`data-slot="appshell-listview-scroll"\`.
4. Do **not** CSS-collapse \`.appshell--main > :first-child\` to hide an empty router outlet.
5. Long tables: scroll inside Main or use recipe patterns—not nested page scroll on \`body\`.

**Recipe:** \`ai/recipes/detail-with-listview.md\`.

Confidence: Required — Honor AppShell scroll contract.

${rel({
  Supports: ["Master–detail"],
  Requires: ["AppShell regions"],
  Influences: ["detail-with-listview"],
  Uses: ["appshell--main", "appshell-listview-scroll"],
  "Conflicts With": ["layout-mistakes"],
  Alternatives: ["—"],
  "Depends On": ["grammar-regions"],
  "Referenced By": ["patterns/detail-pages.md", "ai/guides/appshell-navigation.md"],
})}
${seeAlso([
  ["Regions", "../grammar/regions.md"],
  ["Detail pages", "../patterns/detail-pages.md"],
  ["Detail listview recipe", "../../ai/recipes/detail-with-listview.md"],
])}
`,
  )

  await write(
    "composition/responsive-layout.md",
    {
      id: "responsive-layout",
      category: "composition",
      type: "concept",
      priority: "medium",
      ai_priority: "medium",
      confidence_default: "preferred",
      related: ["appshell-ontology", "density", "touch-targets"],
      components: ["AppShell", "Menu", "Field"],
      patterns: ["navigation", "dashboards", "forms"],
      tokens: ["--appshell-menu-width-expanded", "--appshell-menu-width-collapsed"],
      depends_on: ["sizing"],
      influences: ["dashboards"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Responsive layout

## What

Responsive behavior builds on AppShell (collapsible Menu 280↔64) and Field \`orientation="responsive"\`, not a separate breakpoint framework.

## Why

Product apps are desktop-ops first but must remain usable when the rail collapses and on narrower widths.

## UDS levers

| Lever | Behavior |
|-------|----------|
| Menu | Expanded 280px / collapsed 64px via shell vars |
| Field | \`orientation="responsive"\` |
| Touch | Keep 44px primary targets |
| Dashboards | Stack KPI rows; follow recipe examples |

## How AI should reason

1. Don’t replace Menu with a custom responsive Sidebar.
2. Prefer stacking sections over horizontal squeeze in Main.
3. Test collapsed Menu icon rail (labels hidden—icons + aria-labels matter).

Confidence: Preferred — Use AppShell/Menu collapse; don’t fork the rail.

${rel({
  Supports: ["Multi-device ops"],
  Requires: ["AppShell", "Menu"],
  Influences: ["Navigation", "Forms"],
  Uses: ["Menu expand state", "Field orientation"],
  "Conflicts With": ["Fixed duplicate mobile nav hacks"],
  Alternatives: ["—"],
  "Depends On": ["sizing"],
  "Referenced By": ["patterns/navigation.md"],
})}
${seeAlso([
  ["Sizing", "../foundations/sizing.md"],
  ["Navigation", "../patterns/navigation.md"],
  ["Touch targets", "../accessibility/touch-targets.md"],
])}
`,
  )
}

async function populateRelationships() {
  await write(
    "relationships/spacing-scale.md",
    {
      id: "spacing-scale",
      category: "relationship",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["spacing", "proximity", "choosing-spacing"],
      components: [],
      patterns: [],
      tokens: ["--uds-gap-2", "--uds-gap-40", "--uds-spacing-0", "--uds-spacing-80"],
      depends_on: ["spacing"],
      influences: ["choosing-spacing"],
      conflicts_with: ["spacing-mistakes"],
      alternatives: [],
    },
    `# Spacing scale

## Gap tokens (\`--uds-gap-*\`)

| Token | px |
|-------|---:|
| \`--uds-gap-2\` | 2 |
| \`--uds-gap-4\` | 4 |
| \`--uds-gap-8\` | 8 |
| \`--uds-gap-12\` | 12 |
| \`--uds-gap-16\` | 16 |
| \`--uds-gap-20\` | 20 |
| \`--uds-gap-24\` | 24 |
| \`--uds-gap-32\` | 32 |
| \`--uds-gap-40\` | 40 |

## Spacing tokens (\`--uds-spacing-*\`)

Also available: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 24, 32, 36, 40, 48, 64, 80 (px). Source: \`src/styles/uds-tokens.css\`.

## Relationship to semantics

Smaller steps bind related objects (proximity); larger steps separate sections (whitespace / hierarchy).

Confidence: Required — Use these scales only.

${rel({
  Supports: ["Proximity", "Density"],
  Requires: ["uds-tokens.css"],
  Influences: ["choosing-spacing"],
  Uses: ["--uds-gap-*", "--uds-spacing-*"],
  "Conflicts With": ["spacing-mistakes"],
  Alternatives: ["—"],
  "Depends On": ["spacing"],
  "Referenced By": ["foundations/spacing.md"],
})}
${seeAlso([
  ["Spacing", "../foundations/spacing.md"],
  ["Choosing spacing", "../decision-rules/choosing-spacing.md"],
])}
`,
  )

  await write(
    "relationships/radius-scale.md",
    {
      id: "radius-scale",
      category: "relationship",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["corner-radius", "choosing-radius", "radius-mistakes"],
      components: ["Button", "Card", "Dialog"],
      patterns: [],
      tokens: ["--uds-radius-0", "--uds-radius-12", "--uds-radius-9999"],
      depends_on: ["corner-radius"],
      influences: ["choosing-radius"],
      conflicts_with: ["radius-mistakes"],
      alternatives: [],
    },
    `# Radius scale

## Tokens (\`uds-tokens.css\`)

| Token | px | Product UI note |
|-------|---:|-----------------|
| \`--uds-radius-0\` | 0 | Sharp |
| \`--uds-radius-2\` | 2 | |
| \`--uds-radius-4\` | 4 | **Prefer for app chrome** (Button uses ~4px) |
| \`--uds-radius-6\` | 6 | |
| \`--uds-radius-8\` | 8 | Overlays / menus as shipped |
| \`--uds-radius-12\` | 12 | **Max for rectangles** |
| \`--uds-radius-16|20|24\` | 16–24 | Exist in CSS — **do not use on product rectangles** |
| \`--uds-radius-9999\` | pill | Circles/pills only |

Confidence: Required — Cap rectangles at 12px even if larger tokens exist.

${rel({
  Supports: ["Corner radius policy"],
  Requires: ["Tokens"],
  Influences: ["choosing-radius"],
  Uses: ["--uds-radius-*"],
  "Conflicts With": ["radius-mistakes"],
  Alternatives: ["—"],
  "Depends On": ["corner-radius"],
  "Referenced By": ["foundations/corner-radius.md"],
})}
${seeAlso([
  ["Corner radius", "../foundations/corner-radius.md"],
  ["Radius mistakes", "../anti-patterns/radius-mistakes.md"],
])}
`,
  )

  await write(
    "relationships/typography-scale.md",
    {
      id: "typography-scale",
      category: "relationship",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: ["typography", "hierarchy"],
      components: ["Text"],
      patterns: [],
      tokens: ["--uds-font-size-14", "--uds-font-size-24"],
      depends_on: ["typography"],
      influences: ["hierarchy"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Typography scale

## Text sizes (component)

| Variant | Sizes (px) | Default |
|---------|------------|---------|
| body | 10, 12, 14, 16, 18, 20 | **14** |
| heading | 24, 28, 32 | **24** |
| display | 36, 48, 60, 72, 96, 128 | **48** |

Underlying tokens: \`--uds-font-size-{10…128}\`, \`--uds-line-*\`, weights 400/500/600/700.

## Relationship

Larger steps jump hierarchy levels. Ops dashboards should stay in body/heading—not display—inside AppShell.Main.

Confidence: Preferred — Prefer body 14 + heading 24 in product shells.

${rel({
  Supports: ["Hierarchy"],
  Requires: ["typography"],
  Influences: ["Section headers"],
  Uses: ["Text sizes", "--uds-font-size-*"],
  "Conflicts With": ["Display type in dense queues"],
  Alternatives: ["—"],
  "Depends On": ["typography"],
  "Referenced By": ["foundations/typography.md"],
})}
${seeAlso([
  ["Typography", "../foundations/typography.md"],
  ["Hierarchy", "../semantics/hierarchy.md"],
])}
`,
  )

  await write(
    "relationships/elevation-scale.md",
    {
      id: "elevation-scale",
      category: "relationship",
      type: "concept",
      priority: "medium",
      ai_priority: "medium",
      confidence_default: "preferred",
      related: ["elevation", "choosing-elevation"],
      components: ["Dialog", "Tooltip"],
      patterns: ["dialogs"],
      tokens: ["--uds-elevation-base", "--uds-elevation-tooltip"],
      depends_on: ["elevation"],
      influences: ["dialogs"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Elevation scale

Stacking order (low → high): base (0) → sticky (100) → dropdown (500) → menu (1000) → overlay (1100) → modal (1300) → toast (1400) → tooltip (1500).

Higher elevation must mean true overlay intent (see choosing-elevation). Content cards stay at base.

Confidence: Preferred — Don’t manually assign tooltip z-index to cards.

${rel({
  Supports: ["Overlay clarity"],
  Requires: ["elevation"],
  Influences: ["Dialogs"],
  Uses: ["--uds-elevation-*"],
  "Conflicts With": ["z-index wars"],
  Alternatives: ["—"],
  "Depends On": ["elevation"],
  "Referenced By": ["foundations/elevation.md"],
})}
${seeAlso([
  ["Elevation", "../foundations/elevation.md"],
  ["Choosing elevation", "../decision-rules/choosing-elevation.md"],
])}
`,
  )

  await write(
    "relationships/component-hierarchy.md",
    {
      id: "component-hierarchy",
      category: "relationship",
      type: "concept",
      priority: "high",
      ai_priority: "high",
      confidence_default: "required",
      related: ["grammar-hierarchy", "grammar-rules", "ontology-index"],
      components: ["AppShell", "Menu", "SectionHeader", "Button"],
      patterns: [],
      tokens: [],
      depends_on: ["grammar-hierarchy"],
      influences: ["choosing-components"],
      conflicts_with: ["layout-mistakes"],
      alternatives: [],
    },
    `# Component hierarchy

Maps grammar layers to UDS objects:

\`\`\`
Application → AppShell
  Region(menu) → Menu
  Region(main) → AppShell.Main
    Section → SectionHeader + content
      Pattern → Form / Table / Dashboard sections
        Component → Field, Button, Card, Status, …
          Token → --uds-*
\`\`\`

Buttons live in pattern **actions**, not floating in the shell chrome (except header utilities).

Confidence: Required — Respect shell → section → pattern → component.

${rel({
  Supports: ["Grammar"],
  Requires: ["AppShell", "Menu"],
  Influences: ["choosing-components"],
  Uses: ["Ontology objects"],
  "Conflicts With": ["layout-mistakes"],
  Alternatives: ["—"],
  "Depends On": ["grammar-hierarchy"],
  "Referenced By": ["grammar/hierarchy.md"],
})}
${seeAlso([
  ["Grammar hierarchy", "../grammar/hierarchy.md"],
  ["Ontology", "../ontology/README.md"],
])}
`,
  )

  await write(
    "relationships/visual-rhythm.md",
    {
      id: "visual-rhythm",
      category: "relationship",
      type: "concept",
      priority: "medium",
      ai_priority: "medium",
      confidence_default: "preferred",
      related: ["spacing-scale", "typography-scale", "density"],
      components: ["SectionHeader", "Card"],
      patterns: ["dashboards", "forms"],
      tokens: ["--uds-gap-16", "--uds-gap-24"],
      depends_on: ["spacing-scale", "typography-scale"],
      influences: ["dashboards"],
      conflicts_with: ["visual-noise"],
      alternatives: [],
    },
    `# Visual rhythm

## What

Repeating spacing + type steps so sections feel measured: field stacks at 12–16 gap, sections at 24–32, titles via SectionHeader.

## Why

Irregular rhythm reads as unfinished and increases scan cost in triage/ops views.

## How AI should reason

1. Pick a vertical rhythm from the spacing scale and stick to it in a page.
2. Match recipe density (workspace vs ops-queue) rather than mixing both.
3. Keep heading sizes consistent across sibling sections.

Confidence: Preferred — Consistent gap steps per page.

${rel({
  Supports: ["Readability", "Density control"],
  Requires: ["Spacing + type scales"],
  Influences: ["Dashboards", "Forms"],
  Uses: ["--uds-gap-16/24", "SectionHeader"],
  "Conflicts With": ["visual-noise"],
  Alternatives: ["—"],
  "Depends On": ["spacing-scale", "typography-scale"],
  "Referenced By": ["patterns/dashboards.md"],
})}
${seeAlso([
  ["Spacing scale", "./spacing-scale.md"],
  ["Density", "../semantics/density.md"],
])}
`,
  )
}

async function populateExamples() {
  const examples = [
    ["examples/forms.md", "examples-forms", "Forms", "settings-form", "ai/examples/settings-form.tsx", "ai/recipes/settings-form.md"],
    ["examples/navigation.md", "examples-navigation", "Navigation", "auth-shell", "ai/examples/auth-shell.tsx", "ai/recipes/auth-shell.md"],
    ["examples/cards.md", "examples-cards", "Cards", "workspace-dashboard", "ai/examples/workspace-dashboard.tsx", "ai/recipes/workspace-dashboard.md"],
    ["examples/tables.md", "examples-tables", "Tables", "detail-with-listview", "ai/examples/detail-with-listview.tsx", "ai/recipes/detail-with-listview.md"],
    ["examples/before-after.md", "examples-before-after", "Before / after", null, null, "design-language/anti-patterns/"],
  ]

  for (const [file, id, title, recipe, example, recipePath] of examples) {
    if (file.includes("before-after")) {
      await write(
        file,
        {
          id,
          category: "example",
          type: "index",
          priority: "medium",
          ai_priority: "medium",
          confidence_default: "preferred",
          related: ["layout-mistakes", "visual-noise", "radius-mistakes"],
          components: ["AppShell", "Menu"],
          patterns: [],
          tokens: [],
          depends_on: [],
          influences: [],
          conflicts_with: [],
          alternatives: [],
        },
        `# Before / after

## Before (reject)

- Bespoke \`div\`/\`aside\` shell instead of AppShell + Menu
- \`Sidebar*\` in \`AppShell.menu\` with \`fixed inset-y-0\` rail CSS
- \`rounded-2xl\` cards, purple glow gradients, multi-shadow KPI tiles
- Placeholder-only inputs; div buttons

## After (accept)

- \`AppShell\` + \`Menu\` + \`AppShell.Main\`
- Recipe from \`choosing-patterns\` + matching \`ai/examples/*.tsx\`
- Tokens + Field/Button/Status
- Radius ≤ 12px on rectangles

Confidence: Required — Match contract antiPatterns and recipes.

${rel({
  Supports: ["Agent self-check"],
  Requires: ["Anti-patterns", "Recipes"],
  Influences: ["—"],
  Uses: ["ai/examples"],
  "Conflicts With": ["layout-mistakes"],
  Alternatives: ["—"],
  "Depends On": ["—"],
  "Referenced By": ["anti-patterns/"],
})}
${seeAlso([
  ["Layout mistakes", "../anti-patterns/layout-mistakes.md"],
  ["Choosing patterns", "../decision-rules/choosing-patterns.md"],
])}
`,
      )
      continue
    }

    await write(
      file,
      {
        id,
        category: "example",
        type: "index",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: [recipe, "choosing-patterns"].filter(Boolean),
        components: [],
        patterns: [recipe].filter(Boolean),
        tokens: [],
        depends_on: [],
        influences: [],
        conflicts_with: [],
        alternatives: [],
      },
      `# ${title} examples

| Artifact | Path |
|----------|------|
| Recipe | [\`${recipePath}\`](../../${recipePath}) |
| Example | [\`${example}\`](../../${example}) |

Open the example fixture for copy-pasteable AppShell composition. Do not re-implement from screenshots alone.

Confidence: Preferred — Start from the example file.

${rel({
  Supports: ["Implementation fidelity"],
  Requires: ["Recipes"],
  Influences: ["—"],
  Uses: [example],
  "Conflicts With": ["—"],
  Alternatives: ["—"],
  "Depends On": ["—"],
  "Referenced By": ["patterns/"],
})}
${seeAlso([
  ["Choosing patterns", "../decision-rules/choosing-patterns.md"],
  ["Recipe", `../../${recipePath}`],
])}
`,
    )
  }

  // dashboards already enriched earlier — refresh with full recipe table
  await write(
    "examples/dashboards.md",
    {
      id: "examples-dashboards",
      category: "example",
      type: "index",
      priority: "high",
      ai_priority: "critical",
      confidence_default: "preferred",
      related: ["dashboards", "choosing-patterns", "dashboards-tree"],
      components: ["AppShell", "Menu", "SectionHeader", "Card", "Chart", "Status"],
      patterns: [
        "workspace-dashboard",
        "ops-queue-dashboard",
        "triage-dashboard",
        "provider-portal-home",
        "analytics-overview",
      ],
      tokens: [],
      depends_on: ["choosing-patterns"],
      influences: [],
      conflicts_with: [],
      alternatives: [],
    },
    `# Dashboard examples

Canonical fixtures from \`ai/examples/\` (also listed in contract \`screenRecipes\`):

| Recipe id | Recipe | Example |
|-----------|--------|---------|
| \`workspace-dashboard\` | [\`ai/recipes/workspace-dashboard.md\`](../../ai/recipes/workspace-dashboard.md) | [\`workspace-dashboard.tsx\`](../../ai/examples/workspace-dashboard.tsx) |
| \`ops-queue-dashboard\` | [\`ai/recipes/ops-queue-dashboard.md\`](../../ai/recipes/ops-queue-dashboard.md) | [\`ops-queue-dashboard.tsx\`](../../ai/examples/ops-queue-dashboard.tsx) |
| \`triage-dashboard\` | [\`ai/recipes/triage-dashboard.md\`](../../ai/recipes/triage-dashboard.md) | [\`triage-dashboard.tsx\`](../../ai/examples/triage-dashboard.tsx) |
| \`provider-portal-home\` | [\`ai/recipes/provider-portal-home.md\`](../../ai/recipes/provider-portal-home.md) | [\`provider-portal-home.tsx\`](../../ai/examples/provider-portal-home.tsx) |
| \`analytics-overview\` | [\`ai/recipes/analytics-overview.md\`](../../ai/recipes/analytics-overview.md) | [\`analytics-overview.tsx\`](../../ai/examples/analytics-overview.tsx) |

Pick via [\`choosing-patterns\`](../decision-rules/choosing-patterns.md) or the [dashboards tree](../decision-rules/trees/dashboards.md).

Confidence: Preferred — Copy structure from the matching example; do not invent a fourth dashboard layout.

${rel({
  Supports: ["Dense + simple dashboard fidelity"],
  Requires: ["choosing-patterns"],
  Influences: ["—"],
  Uses: ["ai/examples/*dashboard*"],
  "Conflicts With": ["visual-noise generic dashboards"],
  Alternatives: ["—"],
  "Depends On": ["dashboards"],
  "Referenced By": ["patterns/dashboards.md"],
})}
${seeAlso([
  ["Dashboards pattern", "../patterns/dashboards.md"],
  ["Dashboards tree", "../decision-rules/trees/dashboards.md"],
])}
`,
  )
}

async function populateOntology() {
  const objects = [
    {
      file: "appshell.md",
      id: "appshell-ontology",
      name: "AppShell",
      isA: "Layout shell (first-party)",
      api: `| Prop / region | Detail |
|----------------|--------|
| \`menu\` | Slot for canonical \`Menu\` |
| \`listview\` | Optional master pane |
| \`enableRouterOutlet\` | Default **true**; set \`false\` for static apps |
| \`headerRight\` / \`headerSearchProps\` | Header utilities |
| \`footer\` | Optional |
| Regions | \`AppShell.Menu\` \\| \`.Header\` \\| \`.Listview\` \\| \`.Main\` \\| \`.Footer\` |
| CSS vars | menu 280/64, listview 320, header 3.5rem |
| DOM | \`.appshell\`, \`.appshell--main\`, \`data-slot="appshell-listview-scroll"\` |

Schema: \`ai/appshell.schema.json\`. Guide: \`ai/guides/appshell-navigation.md\`.`,
      contains: ["menu", "header", "main", "listview", "footer"],
      requires: ["Menu in menu slot for product nav"],
      uses: ["AppShell CSS variables", "optional React Router Outlet"],
      appearsIn: ["All screenRecipes"],
      supports: ["Spatial stability", "Master–detail"],
      influencesIds: ["spatial-stability", "listview-drives-main"],
      cannot: ["Menu content (compose Menu)"],
    },
    {
      file: "menu.md",
      id: "menu-ontology",
      name: "Menu",
      isA: "Navigation rail (first-party)",
      api: `| Prop | Detail |
|------|--------|
| \`brand\` | Default \`chg\`; override per product |
| \`headerVariant\` | \`brand\` (default) \\| \`title\` |
| \`headerTitle\` / \`headerShortTitle\` | For title variant |
| \`navigationItems\` | Label + Phosphor icon + href/active |
| \`expanded\` / \`defaultExpanded\` | Controlled/uncontrolled rail |
| Root | \`<nav data-slot="uds-menu-root">\` |

Defaults: \`ai/recipes/default-navigation.md\`. Header identity: \`ai/guides/menu-header-identity.md\`.`,
      contains: ["header", "navigation items", "utilities/tail"],
      requires: ["Placement in AppShell.menu"],
      uses: ["Brand modes", "Phosphor icons", "aria-current"],
      appearsIn: ["auth-shell", "all dashboards"],
      supports: ["Information architecture"],
      influencesIds: ["information-architecture"],
      cannot: ["Page content (belongs in Main)"],
    },
    {
      file: "button.md",
      id: "button-ontology",
      name: "Button",
      isA: "Interactive component (preferred)",
      api: `| Prop | Values |
|------|--------|
| \`variant\` | default \\| outline \\| secondary \\| ghost \\| destructive \\| link |
| \`size\` | default (44px) \\| sm (36) \\| xs (32) \\| lg (52) \\| icon* |
| States | hover token surfaces, focus-visible ring-3, disabled opacity-50, active translate |
| Radius | ~4px (\`--uds-radius-4\`) |

Avoid importing \`BaseButton\` / theme internals (\`avoid-directly\` in catalog).`,
      contains: ["Label", "Optional icon"],
      requires: ["Action intent"],
      uses: ["--uds-button-* tokens", "focus ring tokens"],
      appearsIn: ["Forms", "Dialogs", "Cards", "Toolbars"],
      supports: ["Primary/secondary actions"],
      influencesIds: ["buttons-tree"],
      cannot: ["Hover/focus/disabled state machinery"],
    },
    {
      file: "card.md",
      id: "card-ontology",
      name: "Card",
      isA: "Container component",
      api: `Use for grouped interactive/summary units in dashboards and settings. Prefer radius ≤12. Avoid nesting Cards (see composition/nesting).`,
      contains: ["Header", "Body", "Optional footer actions"],
      requires: ["Content worth separating"],
      uses: ["Surface/border/radius tokens"],
      appearsIn: ["workspace-dashboard", "settings groups"],
      supports: ["Grouping"],
      influencesIds: ["grouping"],
      cannot: ["Hierarchy alone (needs SectionHeader)"],
    },
    {
      file: "field.md",
      id: "field-ontology",
      name: "Field",
      isA: "Form primitive",
      api: `| Export | Role |
|--------|------|
| \`Field\` | \`role="group"\`; orientation vertical/horizontal/responsive |
| \`FieldLabel\` / \`FieldTitle\` | Name |
| \`FieldDescription\` | Help |
| \`FieldError\` | \`role="alert"\` |
| \`data-invalid\` | Destructive styling |

Compose with Input, Select, Switch, etc.`,
      contains: ["Label", "Control", "Description", "Error"],
      requires: ["An input control child"],
      uses: ["Validation/disabled group styles"],
      appearsIn: ["settings-form", "Dialogs"],
      supports: ["Accessible forms"],
      influencesIds: ["a11y-forms"],
      cannot: ["Product validation rules"],
    },
    {
      file: "dialog.md",
      id: "dialog-ontology",
      name: "Dialog",
      isA: "Overlay (Radix-based)",
      api: `Parts: Root, Trigger, Portal, Overlay, Content, Header, Footer, Title, Description, Close — each with \`data-slot="dialog-*"\`. Use AlertDialog for destructive confirms. Elevation ~ modal (1300).`,
      contains: ["Title", "Body", "Actions"],
      requires: ["DialogTitle for accessible name"],
      uses: ["Button", "Field", "Focus trap"],
      appearsIn: ["Destructive confirms", "Short forms"],
      supports: ["Progressive disclosure"],
      influencesIds: ["progressive-disclosure"],
      cannot: ["Focus trap (provided by Radix)"],
    },
    {
      file: "table-list.md",
      id: "table-list-ontology",
      name: "Table / List",
      isA: "Collection pattern",
      api: `| Need | Component |
|------|-----------|
| Compare attributes | \`Table\` |
| Scan + row actions | \`Item\` (first-party) / list rows |
| Master–detail | AppShell \`listview\` + Main |

See tables decision tree.`,
      contains: ["Rows", "Columns or Item rows", "Optional filters"],
      requires: ["Many items"],
      uses: ["Badge", "Status", "Button"],
      appearsIn: ["Queues", "detail-with-listview", "triage"],
      supports: ["Density", "Alignment"],
      influencesIds: ["density", "alignment"],
      cannot: ["Data fetching"],
    },
    {
      file: "section-header.md",
      id: "section-header-ontology",
      name: "SectionHeader",
      isA: "Hierarchy component (first-party)",
      api: `Title + optional description + optional actions. Primary tool for sectioning AppShell.Main content in recipes.`,
      contains: ["Title", "Optional description", "Optional actions"],
      requires: ["A section to label"],
      uses: ["Typography tokens"],
      appearsIn: ["All dashboard recipes", "settings-form"],
      supports: ["Hierarchy", "Headings a11y"],
      influencesIds: ["hierarchy", "headings"],
      cannot: ["Routing"],
    },
    {
      file: "badge.md",
      id: "badge-ontology",
      name: "Badge",
      isA: "Feedback component (preferred)",
      api: `| Prop | Values |
|------|--------|
| \`accent\` | transparent/neutral/red/orange/yellow/emerald/green/sky/cyan/blue/indigo/purple/fuchsia/magenta/inverse |
| \`appearance\` | subtle \\| pastel \\| outlined \\| solid |
| \`shape\` | pill \\| rect |
| \`size\` | default \\| sm |`,
      contains: ["Short label", "Optional icon"],
      requires: ["Category/status to annotate"],
      uses: ["Semantic color"],
      appearsIn: ["Tables", "Cards", "Lists"],
      supports: ["Secondary emphasis"],
      influencesIds: ["emphasis"],
      cannot: ["Meaning without text"],
    },
    {
      file: "status.md",
      id: "status-ontology",
      name: "Status",
      isA: "Feedback component (first-party, preferred)",
      api: `| Prop | Values |
|------|--------|
| \`variant\` | neutral \\| success \\| warning \\| error \\| info |
| \`size\` | default \\| compact |
| \`dot\` | boolean (default true; decorative \`aria-hidden\`) |`,
      contains: ["Label", "Optional dot"],
      requires: ["State to communicate"],
      uses: ["Semantic status colors"],
      appearsIn: ["Queues", "triage", "provider-portal"],
      supports: ["Urgency", "Accessibility meaning"],
      influencesIds: ["urgency", "accessibility-meaning"],
      cannot: ["Color-alone meaning"],
    },
  ]

  await write(
    "ontology/README.md",
    {
      id: "ontology-index",
      category: "ontology",
      type: "index",
      priority: "high",
      ai_priority: "critical",
      confidence_default: "preferred",
      related: objects.map((o) => o.id),
      components: ["AppShell", "Menu", "Button", "Card", "Field", "Dialog", "Table", "SectionHeader", "Badge", "Status"],
      patterns: [],
      tokens: [],
      depends_on: ["grammar-hierarchy"],
      influences: ["choosing-components"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Ontology

Knowledge objects for major UDS concepts. **Prop catalogs** remain in \`ai/uds-contract.json\` → \`componentCatalog\`.

| Object | File |
|--------|------|
${objects.map((o) => `| ${o.name} | [\`${o.file}\`](./${o.file}) |`).join("\n")}

Import runtime components from \`@chghealthcare/unified-design-system\` only.
`,
  )

  for (const o of objects) {
    await write(
      `ontology/${o.file}`,
      {
        id: o.id,
        category: "ontology",
        type: "object",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: ["ontology-index", "choosing-components", "grammar-hierarchy"],
        components: [o.name.split(" / ")[0]],
        patterns: [],
        tokens: [],
        depends_on: ["grammar-hierarchy"],
        influences: o.influencesIds,
        conflicts_with: [],
        alternatives: [],
      },
      `# ${o.name}

## What

\`${o.name}\` **is-a** ${o.isA}.

## API (system facts)

${o.api}

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | ${o.isA} |
| **contains** | ${o.contains.join("; ")} |
| **requires** | ${o.requires.join("; ")} |
| **uses** | ${o.uses.join("; ")} |
| **appears in** | ${o.appearsIn.join("; ")} |
| **supports** | ${o.supports.join("; ")} |
| **cannot exist without** | ${o.cannot.join("; ")} |

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Read API table above + contract catalog for props.
3. Prefer this export over bespoke markup.

Confidence: Preferred — Use the published component.

${rel({
  Supports: o.supports,
  Requires: o.requires,
  Influences: o.appearsIn,
  Uses: o.uses,
  "Conflicts With": ["Bespoke equivalents", "src/components/ui imports"],
  Alternatives: ["See decision trees / choosing-components"],
  "Depends On": ["grammar-hierarchy"],
  "Referenced By": ["ai/indexes/component-index.md"],
})}
${seeAlso([
  ["Ontology index", "./README.md"],
  ["Choosing components", "../decision-rules/choosing-components.md"],
  ["Contract", "../../ai/uds-contract.json"],
])}
`,
    )
  }
}

async function main() {
  console.log("Populating accessibility…")
  await populateAccessibility()
  console.log("Populating interactions…")
  await populateInteractions()
  console.log("Populating foundations…")
  await populateFoundations()
  console.log("Populating anti-patterns…")
  await populateAntiPatterns()
  console.log("Populating composition…")
  await populateComposition()
  console.log("Populating relationships…")
  await populateRelationships()
  console.log("Populating examples…")
  await populateExamples()
  console.log("Populating ontology…")
  await populateOntology()
  console.log("Done.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
