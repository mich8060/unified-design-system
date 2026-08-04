/**
 * One-shot bootstrap for Design System Language knowledge architecture.
 * Idempotent: skips files that already have YAML front matter unless FORCE=1.
 */
import { mkdir, readFile, writeFile, rename, access } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DL = path.join(ROOT, "design-language")
const FORCE = process.env.FORCE === "1"

function fm(fields) {
  const lines = ["---"]
  for (const [k, v] of Object.entries(fields)) {
    if (Array.isArray(v)) {
      lines.push(`${k}:`)
      if (v.length === 0) lines.push("  []")
      else v.forEach((item) => lines.push(`  - ${item}`))
    } else {
      lines.push(`${k}: ${v}`)
    }
  }
  lines.push("---", "")
  return lines.join("\n")
}

function hasFrontMatter(text) {
  return text.startsWith("---\n") || text.startsWith("---\r\n")
}

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

async function writeDoc(relPath, fields, body) {
  const full = path.join(DL, relPath)
  await mkdir(path.dirname(full), { recursive: true })
  if ((await exists(full)) && !FORCE) {
    const existing = await readFile(full, "utf8")
    if (hasFrontMatter(existing) && existing.length > 200) return "skip"
  }
  await writeFile(full, fm(fields) + body.trim() + "\n", "utf8")
  return "write"
}

function relBlock(sections) {
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
  let out = "\n## Relationships\n\n"
  for (const key of order) {
    const items = sections[key] || []
    out += `### ${key}\n\n`
    if (!items.length) out += "- —\n\n"
    else out += items.map((i) => `- ${i}`).join("\n") + "\n\n"
  }
  return out
}

function seeAlso(links) {
  if (!links?.length) return ""
  return (
    "\n## See also\n\n" + links.map((l) => `- [${l.label}](${l.href})`).join("\n") + "\n"
  )
}

// Every id ever passed through hrefForId() below, mapped to its real path
// relative to design-language/. Written in `../dir/file.md` form so a single
// entry resolves correctly from any doc one level under design-language/
// (semantics/, design-physics/, etc.) — do not shorten to `./file.md`.
// Add new entries here instead of guessing a path from the id string;
// hrefForId() throws on a miss so a stale mapping fails loudly, not silently.
const ID_HREF = {
  proximity: "../semantics/proximity.md",
  grouping: "../semantics/grouping.md",
  spacing: "../foundations/spacing.md",
  "visual-weight": "../semantics/visual-weight.md",
  emphasis: "../semantics/emphasis.md",
  hierarchy: "../semantics/hierarchy.md",
  "information-architecture": "../semantics/information-architecture.md",
  navigation: "../patterns/navigation.md",
  "appshell-ontology": "../ontology/appshell.md",
  motion: "../foundations/motion.md",
  dialogs: "../patterns/dialogs.md",
  "menu-ontology": "../ontology/menu.md",
  "color-contrast": "../accessibility/color-contrast.md",
  affordance: "../semantics/affordance.md",
  readability: "../semantics/readability.md",
  philosophy: "../philosophy.md",
  "choosing-patterns": "../decision-rules/choosing-patterns.md",
  "dsl-principles": "../principles.md",
  whitespace: "../semantics/whitespace.md",
  density: "../semantics/density.md",
  alignment: "../semantics/alignment.md",
  forms: "../patterns/forms.md",
  tables: "../patterns/tables.md",
  "detail-pages": "../patterns/detail-pages.md",
  focus: "../interactions/focus.md",
  hover: "../interactions/hover.md",
  disabled: "../interactions/disabled.md",
  intent: "../semantics/intent.md",
  "errors-tree": "../decision-rules/trees/errors.md",
  "grammar-hierarchy": "../grammar/hierarchy.md",
  "confidence-semantic": "../semantics/confidence-semantic.md",
  "front-matter-schema": "../_meta/front-matter-schema.md",
  validation: "../interactions/validation.md",
  "a11y-semantics": "../accessibility/semantics.md",
  "focus-order": "../accessibility/focus-order.md",
  "screen-readers": "../accessibility/screen-readers.md",
  typography: "../foundations/typography.md",
  urgency: "../semantics/urgency.md",
}

function hrefForId(id) {
  const href = ID_HREF[id]
  if (!href) throw new Error(`hrefForId: no known path for id "${id}" — add it to ID_HREF`)
  return href
}

// --- Move gestalt composition → semantics ---
const MOVES = [
  "hierarchy",
  "density",
  "grouping",
  "proximity",
  "visual-weight",
  "whitespace",
  "alignment",
]

async function migrateComposition() {
  await mkdir(path.join(DL, "semantics"), { recursive: true })
  for (const name of MOVES) {
    const from = path.join(DL, "composition", `${name}.md`)
    const to = path.join(DL, "semantics", `${name}.md`)
    if ((await exists(from)) && !(await exists(to))) {
      await rename(from, to)
      console.log(`moved composition/${name}.md → semantics/${name}.md`)
    }
  }
}

// --- Enrich stubs for existing moved files ---
async function enrichSemanticsMoved() {
  const docs = {
    hierarchy: {
      fields: {
        id: "hierarchy",
        category: "semantics",
        type: "concept",
        priority: "critical",
        ai_priority: "critical",
        confidence_default: "preferred",
        related: ["visual-weight", "emphasis", "typography", "section-header-ontology", "readability"],
        components: ["SectionHeader", "Text", "Badge"],
        patterns: ["dashboards", "detail-pages", "forms"],
        tokens: ["--uds-text-primary", "--uds-text-secondary"],
        depends_on: ["visual-weight-physics"],
        influences: ["content-hierarchy-tree", "dashboards"],
        conflicts_with: ["visual-noise"],
        alternatives: [],
      },
      body: `# Visual hierarchy

## What

Visual hierarchy is the ordered presentation of information so users perceive **page title → section headers → primary content → supporting metadata** without reading every pixel.

## Why

Operational CHG tools are data-rich. Hierarchy prevents every element from competing equally, which reduces cognitive load and scanning time.

## When

Use on every page and every multi-section pattern. Increase hierarchy strength when density rises (queues, triage, analytics).

## How AI should reason

1. Identify the single primary question the screen answers.
2. Assign one dominant title (\`SectionHeader\` / page heading).
3. Group supporting content under section headers.
4. Demote metadata with secondary text / badges—not larger type.

Confidence: Required — Do not rely on size alone; use semantic text roles and \`SectionHeader\`.

Confidence: Preferred — Keep one primary CTA per section.

${relBlock({
  Supports: ["Readability", "Information architecture", "Content hierarchy decisions"],
  Requires: ["Typography tokens", "Visual weight"],
  Influences: ["Dashboards", "Forms", "Detail pages"],
  Uses: ["SectionHeader", "Text", "Badge"],
  "Conflicts With": ["Visual noise (equal weight everywhere)"],
  Alternatives: ["Progressive disclosure when hierarchy alone is insufficient"],
  "Depends On": ["Design physics: visual weight"],
  "Referenced By": ["decision-rules/trees/content-hierarchy.md"],
})}
${seeAlso([
  { label: "Visual weight", href: "./visual-weight.md" },
  { label: "Emphasis", href: "./emphasis.md" },
  { label: "Typography", href: "../foundations/typography.md" },
])}
`,
    },
    density: {
      fields: {
        id: "density",
        category: "semantics",
        type: "concept",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: ["proximity", "whitespace", "spacing", "ops-queue-dashboard"],
        components: ["Item", "Table", "Card"],
        patterns: ["tables", "lists", "dashboards", "ops-queue-dashboard", "triage-dashboard"],
        tokens: ["--uds-space-4", "--uds-space-8", "--uds-space-16"],
        depends_on: ["proximity-physics"],
        influences: ["choosing-spacing", "tables"],
        conflicts_with: ["visual-noise"],
        alternatives: ["progressive-disclosure"],
      },
      body: `# Information density

## What

Density is how much information occupies a given region without collapsing hierarchy or touch targets.

## Why

Ops queues and triage screens need high information per viewport, but unconstrained density becomes visual noise.

## When

- **Higher density:** queues, tables, triage, analytics feeds.
- **Lower density:** marketing-adjacent portals, empty states, first-run flows, settings with long help text.

## How AI should reason

1. Classify screen intent (ops vs portal vs settings).
2. Pick a recipe that matches density (\`ops-queue-dashboard\`, \`triage-dashboard\` vs \`workspace-dashboard\`).
3. Tighten spacing between *related* rows; keep section gaps larger.
4. Never shrink touch targets below accessibility minimums.

Confidence: Preferred — Prefer recipe-aligned density over ad-hoc compact CSS.

${relBlock({
  Supports: ["Operational scanning", "Queue patterns"],
  Requires: ["Spacing tokens", "Proximity"],
  Influences: ["Tables", "Lists", "Dashboards"],
  Uses: ["Item", "Table", "Card"],
  "Conflicts With": ["Visual noise", "Touch-target violations"],
  Alternatives: ["Progressive disclosure", "Master–detail listview"],
  "Depends On": ["Proximity physics"],
  "Referenced By": ["patterns/dashboards.md", "decision-rules/choosing-patterns.md"],
})}
${seeAlso([
  { label: "Proximity", href: "./proximity.md" },
  { label: "Whitespace", href: "./whitespace.md" },
  { label: "Choosing patterns", href: "../decision-rules/choosing-patterns.md" },
])}
`,
    },
    grouping: {
      fields: {
        id: "grouping",
        category: "semantics",
        type: "concept",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: ["proximity", "forms", "cards", "information-architecture"],
        components: ["Card", "Field", "Separator"],
        patterns: ["forms", "settings-form", "dashboards"],
        tokens: ["--uds-space-16", "--uds-space-24"],
        depends_on: ["proximity"],
        influences: ["forms", "filters"],
        conflicts_with: ["layout-mistakes"],
        alternatives: [],
      },
      body: `# Grouping

## What

Grouping places related controls and content into perceptible clusters (cards, field groups, sections).

## Why

Users infer meaning from clusters. Ungrouped fields force linear reading of every control.

## When

Always group by task affinity (identity fields together, notification prefs together). Prefer fewer, clearer groups over many tiny cards.

## How AI should reason

1. List fields/actions by user goal.
2. Split into 2–5 groups max per page section.
3. Use \`Card\` or section headers—not nested cards for decoration.
4. Place primary actions with the group they commit.

Confidence: Preferred — Cards are for interaction/containers, not every paragraph.

${relBlock({
  Supports: ["Forms", "Settings", "Filters"],
  Requires: ["Proximity", "Hierarchy"],
  Influences: ["Form pattern", "Dashboard sections"],
  Uses: ["Card", "Field", "Separator", "SectionHeader"],
  "Conflicts With": ["Card wrapping everything"],
  Alternatives: ["Flat sections with headers when cards add no interaction value"],
  "Depends On": ["Proximity"],
  "Referenced By": ["patterns/forms.md"],
})}
${seeAlso([
  { label: "Proximity", href: "./proximity.md" },
  { label: "Forms", href: "../patterns/forms.md" },
])}
`,
    },
    proximity: {
      fields: {
        id: "proximity",
        category: "semantics",
        type: "concept",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: ["proximity-physics", "spacing", "grouping", "density"],
        components: ["Button", "Field", "ButtonGroup"],
        patterns: ["forms", "dialogs"],
        tokens: ["--uds-space-8", "--uds-space-16"],
        depends_on: ["proximity-physics", "spacing"],
        influences: ["grouping", "choosing-spacing"],
        conflicts_with: ["spacing-mistakes"],
        alternatives: [],
      },
      body: `# Proximity

## What

Related objects sit closer together than unrelated objects. Distance encodes relationship.

## Why

Gestalt proximity is how users parse structure before reading labels.

## When

Apply between label↔control, related actions, and row metadata. Increase gap between unrelated sections.

## How AI should reason

1. Identify related pairs (label+input, primary+secondary action).
2. Use smaller token steps within the pair; larger between groups.
3. Do not use equal gaps everywhere—that erases structure.

Confidence: Required — Use spacing tokens (\`--uds-space-*\`), never ad-hoc pixel stacks that fight the scale.

${relBlock({
  Supports: ["Grouping", "Forms", "Whitespace meaning"],
  Requires: ["Spacing foundation"],
  Influences: ["Density", "Choosing spacing"],
  Uses: ["Spacing tokens", "ButtonGroup"],
  "Conflicts With": ["Spacing mistakes (uniform gaps)"],
  Alternatives: ["—"],
  "Depends On": ["Design physics: proximity"],
  "Referenced By": ["design-physics/proximity.md"],
})}
${seeAlso([
  { label: "Proximity physics", href: "../design-physics/proximity.md" },
  { label: "Spacing", href: "../foundations/spacing.md" },
])}
`,
    },
    "visual-weight": {
      fields: {
        id: "visual-weight",
        category: "semantics",
        type: "concept",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: ["visual-weight-physics", "hierarchy", "emphasis", "color"],
        components: ["Button", "Badge", "Status", "Medallion"],
        patterns: ["dashboards", "dialogs"],
        tokens: ["--uds-text-primary", "--uds-surface-brand"],
        depends_on: ["visual-weight-physics"],
        influences: ["hierarchy", "buttons-tree"],
        conflicts_with: ["visual-noise"],
        alternatives: ["urgency"],
      },
      body: `# Visual weight

## What

Visual weight is perceived importance from contrast, size, color role, and position—not decoration.

## Why

Important objects must win attention; secondary chrome must recede.

## When

Primary actions, critical status, and page titles carry more weight. Metadata, borders, and icons carry less.

## How AI should reason

1. Rank content: critical → primary → secondary → tertiary.
2. Map to Button appearances, Status/Badge, and text roles.
3. Limit high-weight accents per viewport (usually one primary CTA).

Confidence: Preferred — Prefer semantic color roles over brighter hex hacks.

${relBlock({
  Supports: ["Hierarchy", "Emphasis", "Primary actions"],
  Requires: ["Color semantics", "Typography"],
  Influences: ["Button decisions", "Dashboard KPIs"],
  Uses: ["Button", "Badge", "Status", "Medallion"],
  "Conflicts With": ["Visual noise"],
  Alternatives: ["Urgency (time-critical) when weight alone is insufficient"],
  "Depends On": ["Design physics: visual weight"],
  "Referenced By": ["decision-rules/trees/buttons.md"],
})}
${seeAlso([
  { label: "Visual weight physics", href: "../design-physics/visual-weight.md" },
  { label: "Hierarchy", href: "./hierarchy.md" },
])}
`,
    },
    whitespace: {
      fields: {
        id: "whitespace",
        category: "semantics",
        type: "concept",
        priority: "high",
        ai_priority: "medium",
        confidence_default: "preferred",
        related: ["whitespace-relationships", "proximity", "density", "spacing"],
        components: ["Card", "AppShell"],
        patterns: ["dashboards", "empty-states"],
        tokens: ["--uds-space-24", "--uds-space-32"],
        depends_on: ["whitespace-relationships"],
        influences: ["density", "dashboards"],
        conflicts_with: ["spacing-mistakes"],
        alternatives: [],
      },
      body: `# Whitespace

## What

Whitespace (negative space) communicates separation and breathing room; it is structural, not “empty leftover.”

## Why

Without intentional whitespace, proximity collapses and groups blur.

## When

Increase whitespace between major regions; reduce within tight operational rows. Empty states may use more open space.

## How AI should reason

1. Treat whitespace as a relationship signal (see design physics).
2. Prefer token steps over arbitrary padding.
3. Do not fill whitespace with decorative cards.

Confidence: Preferred — Section gaps > control gaps.

${relBlock({
  Supports: ["Grouping", "Readability"],
  Requires: ["Spacing tokens"],
  Influences: ["Density", "Layout decisions"],
  Uses: ["AppShell regions", "Card padding"],
  "Conflicts With": ["Spacing mistakes"],
  Alternatives: ["—"],
  "Depends On": ["Whitespace relationships physics"],
  "Referenced By": ["design-physics/whitespace-relationships.md"],
})}
${seeAlso([
  { label: "Whitespace physics", href: "../design-physics/whitespace-relationships.md" },
  { label: "Density", href: "./density.md" },
])}
`,
    },
    alignment: {
      fields: {
        id: "alignment",
        category: "semantics",
        type: "concept",
        priority: "high",
        ai_priority: "medium",
        confidence_default: "preferred",
        related: ["alignment-order", "grid", "forms", "tables"],
        components: ["Field", "Table", "ButtonGroup"],
        patterns: ["forms", "tables", "dashboards"],
        tokens: [],
        depends_on: ["alignment-order"],
        influences: ["forms", "tables"],
        conflicts_with: ["layout-mistakes"],
        alternatives: [],
      },
      body: `# Alignment

## What

Alignment creates shared edges and columns so the eye finds order quickly.

## Why

Misaligned labels, values, and actions increase scanning cost and look unfinished.

## When

Forms (label/control columns), tables (value columns), toolbars (action clusters), and dashboard KPI rows.

## How AI should reason

1. Pick a grid or column model for the region.
2. Align related labels/values on a shared edge.
3. Keep primary actions aligned consistently across sections.

Confidence: Preferred — Prefer UDS Field/Table layout over custom absolute positioning.

${relBlock({
  Supports: ["Forms", "Tables", "Perceived quality"],
  Requires: ["Grid / layout grammar"],
  Influences: ["Layout decision tree"],
  Uses: ["Field", "Table", "ButtonGroup"],
  "Conflicts With": ["Layout mistakes"],
  Alternatives: ["—"],
  "Depends On": ["Alignment-order physics"],
  "Referenced By": ["design-physics/alignment-order.md"],
})}
${seeAlso([
  { label: "Alignment physics", href: "../design-physics/alignment-order.md" },
  { label: "Grid", href: "../foundations/grid.md" },
])}
`,
    },
  }

  for (const [name, doc] of Object.entries(docs)) {
    await writeDoc(`semantics/${name}.md`, doc.fields, doc.body)
  }
}

// --- New semantics concepts ---
async function writeNewSemantics() {
  const concepts = [
    {
      id: "emphasis",
      title: "Emphasis",
      what: "Emphasis is deliberate highlighting of a small set of elements so they stand out from peers.",
      why: "Without controlled emphasis, everything shouts and nothing guides action.",
      when: "Primary CTAs, critical alerts, key KPIs. Not for every icon or badge.",
      reason: "1. Cap high-emphasis elements per viewport.\n2. Use Button appearance / Status / semantic color—not outlines everywhere.\n3. Pair with hierarchy so emphasis reinforces structure.",
      related: ["visual-weight", "urgency", "hierarchy"],
      components: ["Button", "Badge", "Alert", "Status"],
      patterns: ["dialogs", "dashboards"],
    },
    {
      id: "affordance",
      title: "Affordance",
      what: "Affordance is the perceived possibility of action—controls look and behave like things you can use.",
      why: "Users should not guess what is clickable. Fake affordances and missing states erode trust.",
      when: "All interactive components: buttons, links, inputs, tabs, menu items.",
      reason: "1. Prefer real UDS interactive components over styled divs.\n2. Ensure hover/focus/disabled/pressed states exist.\n3. Icons alone are not enough—label actions.",
      related: ["focus", "hover", "disabled", "intent"],
      components: ["Button", "Link", "Input", "Menu"],
      patterns: ["navigation", "forms"],
    },
    {
      id: "urgency",
      title: "Urgency",
      what: "Urgency signals time-critical or blocking conditions that need attention before other work.",
      why: "Operational tools must surface blockers without turning every status into an emergency.",
      when: "Errors blocking submit, SLA breaches, destructive confirms. Not for routine success toasts.",
      reason: "1. Ask: does this require immediate action?\n2. If yes → Alert / destructive Dialog / Status danger.\n3. If no → Badge or secondary Status.",
      related: ["emphasis", "errors-tree", "dialogs"],
      components: ["Alert", "Status", "Badge", "Dialog"],
      patterns: ["dialogs", "empty-states"],
    },
    {
      id: "information-architecture",
      title: "Information architecture",
      what: "Information architecture (IA) is how content and navigation are structured across regions, pages, and menus.",
      why: "Wrong IA forces users to hunt. Correct IA matches mental models (shell → page → section).",
      when: "Any multi-page product; especially AppShell + Menu navigation and multi-section settings.",
      reason: "1. Place durable nav in Menu.\n2. Place page-local structure in headings/sections.\n3. Use listview for master–detail, not a second global nav.",
      related: ["grammar-hierarchy", "navigation", "intent"],
      components: ["AppShell", "Menu", "SectionHeader", "Breadcrumb"],
      patterns: ["navigation", "detail-pages"],
    },
    {
      id: "intent",
      title: "Intent",
      what: "Intent is the user’s goal for the current screen (scan queue, edit settings, confirm destroy, compare rows).",
      why: "Pattern and recipe choice follows intent—not aesthetic preference.",
      when: "At the start of every screen generation or redesign.",
      reason: "1. State the user goal in one sentence.\n2. Map to `decision-rules/choosing-patterns.md`.\n3. Only then pick components.",
      related: ["choosing-patterns", "confidence-semantic"],
      components: ["AppShell"],
      patterns: ["dashboards", "forms", "tables"],
    },
    {
      id: "confidence-semantic",
      title: "Confidence (semantic)",
      what: "Confidence describes how certain the system is about a recommendation or state—and how strongly UI should assert it.",
      why: "AI and humans need to distinguish immutable rules from flexible guidance (see front-matter confidence labels).",
      when: "Documenting rules; surfacing uncertain AI suggestions; soft vs hard validation.",
      reason: "1. Tag rules Required / Strong / Optional.\n2. Do not present Optional as Required.\n3. In UI, uncertain states use secondary Status—not destructive Alert.",
      related: ["front-matter-schema", "validation", "urgency"],
      components: ["Status", "Alert", "Badge"],
      patterns: ["forms"],
    },
    {
      id: "accessibility-meaning",
      title: "Accessibility meaning",
      what: "Accessibility meaning is the semantic role and name technology exposes—not only visual appearance.",
      why: "A green badge that is only color fails. Roles, names, and focus order carry meaning to AT users.",
      when: "Every interactive and status-bearing UI.",
      reason: "1. Use components with correct roles.\n2. Do not convey status by color alone.\n3. Preserve heading order and focus.",
      related: ["a11y-semantics", "color-contrast", "focus-order", "screen-readers"],
      components: ["Button", "Status", "Field", "Dialog"],
      patterns: ["forms", "dialogs"],
    },
    {
      id: "visual-importance",
      title: "Visual importance",
      what: "Visual importance ranks elements by business/user criticality so layout and weight can match.",
      why: "Without an importance ranking, hierarchy and emphasis have no input.",
      when: "Before choosing type size, color role, or placement.",
      reason: "1. Rank elements 1–n by criticality.\n2. Map rank → hierarchy + visual weight.\n3. Demote chrome.",
      related: ["hierarchy", "visual-weight", "emphasis"],
      components: ["SectionHeader", "Button", "Badge"],
      patterns: ["dashboards"],
    },
    {
      id: "readability",
      title: "Readability",
      what: "Readability is how easily text and data can be scanned and understood at intended density.",
      why: "Healthcare ops UIs fail when type, contrast, or line length fight the task.",
      when: "All text, tables, and form labels.",
      reason: "1. Use typography tokens and Text.\n2. Maintain contrast.\n3. Prefer scannable lists/tables over paragraphs for operational data.",
      related: ["typography", "color-contrast", "hierarchy", "density"],
      components: ["Text", "Table", "DescriptionList"],
      patterns: ["tables", "lists", "forms"],
    },
  ]

  for (const c of concepts) {
    const body = `# ${c.title}

## What

${c.what}

## Why

${c.why}

## When

${c.when}

## How AI should reason

${c.reason}

Confidence: Preferred — Follow related decision trees before inventing layout.

${relBlock({
  Supports: c.related.map((r) => `\`${r}\``),
  Requires: ["Philosophy", "Design physics"],
  Influences: c.patterns,
  Uses: c.components,
  "Conflicts With": ["Visual noise", "Layout mistakes"],
  Alternatives: ["—"],
  "Depends On": ["semantics foundation concepts"],
  "Referenced By": ["ai/indexes/concept-index.md"],
})}
${seeAlso(c.related.slice(0, 4).map((r) => ({ label: r, href: hrefForId(r) })))}
`
    await writeDoc(
      `semantics/${c.id}.md`,
      {
        id: c.id,
        category: "semantics",
        type: "concept",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: c.related,
        components: c.components,
        patterns: c.patterns,
        tokens: [],
        depends_on: [],
        influences: c.patterns,
        conflicts_with: ["visual-noise"],
        alternatives: [],
      },
      body,
    )
  }
}

// --- Design physics ---
async function writePhysics() {
  const principles = [
    {
      id: "proximity-physics",
      file: "proximity.md",
      title: "Related objects move closer together",
      why: "Human vision groups by distance before reading labels. Encoding relationship in space is cheaper than adding borders or cards.",
      implements: ["proximity", "grouping", "spacing"],
    },
    {
      id: "visual-weight-physics",
      file: "visual-weight.md",
      title: "Important objects gain visual weight",
      why: "Attention is finite. Weight (contrast, size, position) steers the eye to what matters for the task.",
      implements: ["visual-weight", "emphasis", "hierarchy"],
    },
    {
      id: "spatial-stability",
      file: "spatial-stability.md",
      title: "Navigation remains spatially stable",
      why: "When global nav jumps, users re-orient on every route. Stable AppShell + Menu builds spatial memory.",
      implements: ["information-architecture", "navigation", "appshell-ontology"],
    },
    {
      id: "motion-identity",
      file: "motion-identity.md",
      title: "Motion preserves identity",
      why: "Motion should help users track the same object across states (expand menu, open dialog)—not decorate arbitrarily.",
      implements: ["motion", "dialogs", "menu-ontology"],
    },
    {
      id: "contrast-discoverability",
      file: "contrast-discoverability.md",
      title: "Contrast increases discoverability",
      why: "Low contrast hides controls and status. Adequate contrast makes interactive and critical content findable.",
      implements: ["color-contrast", "affordance", "readability"],
    },
    {
      id: "consistency-load",
      file: "consistency-load.md",
      title: "Consistency reduces cognitive load",
      why: "Reusing patterns and components means users transfer learning across CHG products.",
      implements: ["philosophy", "choosing-patterns", "dsl-principles"],
    },
    {
      id: "whitespace-relationships",
      file: "whitespace-relationships.md",
      title: "White space communicates relationships",
      why: "Gaps are signals. Equal whitespace erases structure; intentional whitespace defines groups.",
      implements: ["whitespace", "proximity", "density"],
    },
    {
      id: "alignment-order",
      file: "alignment-order.md",
      title: "Alignment creates order",
      why: "Shared edges form implicit grids the eye trusts, speeding scan of forms and tables.",
      implements: ["alignment", "forms", "tables"],
    },
    {
      id: "progressive-disclosure",
      file: "progressive-disclosure.md",
      title: "Progressive disclosure reduces complexity",
      why: "Showing everything at once overwhelms. Reveal detail as intent narrows (listview detail, dialogs, drawers).",
      implements: ["detail-pages", "dialogs", "density"],
    },
  ]

  await writeDoc(
    "design-physics/README.md",
    {
      id: "design-physics-index",
      category: "physics",
      type: "index",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: principles.map((p) => p.id),
      components: [],
      patterns: [],
      tokens: [],
      depends_on: ["philosophy"],
      influences: ["hierarchy", "density"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Design physics

Universal principles that hold across products. They explain *why* semantics and foundations exist—not token values.

| Principle | File |
|-----------|------|
${principles.map((p) => `| ${p.title} | [\`${p.file}\`](./${p.file}) |`).join("\n")}
`,
  )

  for (const p of principles) {
    await writeDoc(
      `design-physics/${p.file}`,
      {
        id: p.id,
        category: "physics",
        type: "principle",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: p.implements,
        components: [],
        patterns: [],
        tokens: [],
        depends_on: ["philosophy"],
        influences: p.implements,
        conflicts_with: [],
        alternatives: [],
      },
      `# ${p.title}

## What

${p.title}.

## Why

${p.why}

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.

${relBlock({
  Supports: p.implements,
  Requires: ["Philosophy"],
  Influences: p.implements,
  Uses: ["Foundations", "Semantics"],
  "Conflicts With": ["Decorative motion", "Ad-hoc layout"],
  Alternatives: ["—"],
  "Depends On": ["philosophy"],
  "Referenced By": ["semantics/", "grammar/"],
})}
${seeAlso(p.implements.slice(0, 3).map((id) => ({ label: id, href: hrefForId(id) })))}
`,
    )
  }
}

// --- Grammar ---
async function writeGrammar() {
  await writeDoc(
    "grammar/hierarchy.md",
    {
      id: "grammar-hierarchy",
      category: "grammar",
      type: "rule",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["grammar-rules", "grammar-regions", "component-hierarchy"],
      components: ["AppShell", "Menu", "SectionHeader"],
      patterns: ["navigation", "dashboards"],
      tokens: [],
      depends_on: ["information-architecture", "intent"],
      influences: ["choosing-layout", "choosing-patterns"],
      conflicts_with: ["layout-mistakes"],
      alternatives: [],
    },
    `# Grammar hierarchy

## What

UDS UI composes in a strict containment hierarchy:

\`\`\`
Experience
  → Application
    → Page
      → Region
        → Section
          → Pattern
            → Component
              → Element
                → Token
\`\`\`

## Why

Without containment rules, agents invent parallel shells, orphan buttons, and token-level styling on the wrong layer. Grammar keeps composition predictable for humans and RAG.

## When

Every authenticated product screen. Skip AppShell only for truly unauthenticated/marketing surfaces outside this DSL’s default.

## How AI should reason

1. Identify Experience/Application (product + brand).
2. Place Page inside AppShell regions.
3. Fill Sections with Patterns (form, table, dashboard…).
4. Patterns instantiate Components; Components consume Tokens.

Confidence: Required — Do not place Patterns outside Regions or Tokens as ad-hoc hex on Page chrome.

${relBlock({
  Supports: ["Choosing layout", "Choosing patterns"],
  Requires: ["Intent", "Information architecture"],
  Influences: ["All patterns"],
  Uses: ["AppShell", "Menu", "SectionHeader"],
  "Conflicts With": ["Bespoke outer shells"],
  Alternatives: ["—"],
  "Depends On": ["semantics/intent"],
  "Referenced By": ["grammar/rules.md"],
})}
${seeAlso([
  { label: "Grammar rules", href: "./rules.md" },
  { label: "Regions", href: "./regions.md" },
])}
`,
  )

  await writeDoc(
    "grammar/rules.md",
    {
      id: "grammar-rules",
      category: "grammar",
      type: "rule",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["grammar-hierarchy", "grammar-regions", "buttons-tree"],
      components: ["Button", "AppShell", "Menu"],
      patterns: ["forms", "dialogs", "navigation"],
      tokens: [],
      depends_on: ["grammar-hierarchy"],
      influences: ["forms", "dialogs", "dashboards"],
      conflicts_with: ["layout-mistakes"],
      alternatives: [],
    },
    `# Grammar rules

## What

Valid construction rules for UDS interfaces.

## Core rules

| Rule | Why |
|------|-----|
| Buttons belong inside **actions** | Actions encode intent (submit, cancel, navigate). Orphan buttons lack context. |
| Actions belong inside **patterns** | Patterns (form, dialog, table toolbar) own when actions appear. |
| Patterns belong inside **sections** | Sections provide hierarchy headings and scanning structure. |
| Sections belong inside **pages** | Pages map to routes / main content. |
| Pages belong inside **regions** | AppShell regions (main, listview, header…) own scroll and chrome. |
| Product nav belongs in **Menu** inside \`AppShell.menu\` | Spatial stability; do not reinvent rails with \`Sidebar*\` unless you own CSS. |
| Tokens style **components**, not raw page divs | Keeps brand modes and a11y intact. |

## How AI should reason

1. Name the pattern (form / table / dashboard / dialog…).
2. Place it in a section under \`AppShell.Main\` (or listview).
3. Attach actions to that pattern.
4. Only then choose Button appearances.

Confidence: Required — Authenticated screens use AppShell + Menu.

Confidence: Preferred — One primary button per action group.

${relBlock({
  Supports: ["Consistent composition"],
  Requires: ["Grammar hierarchy", "Regions"],
  Influences: ["All decision trees"],
  Uses: ["Button", "AppShell", "Menu"],
  "Conflicts With": ["Layout anti-patterns"],
  Alternatives: ["—"],
  "Depends On": ["grammar-hierarchy"],
  "Referenced By": ["decision-rules/trees/"],
})}
${seeAlso([
  { label: "Hierarchy", href: "./hierarchy.md" },
  { label: "Regions", href: "./regions.md" },
])}
`,
  )

  await writeDoc(
    "grammar/regions.md",
    {
      id: "grammar-regions",
      category: "grammar",
      type: "rule",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["grammar-rules", "appshell-ontology", "menu-ontology", "detail-pages"],
      components: ["AppShell", "Menu", "AppShell.Header", "AppShell.Footer"],
      patterns: ["navigation", "detail-pages"],
      tokens: [
        "--appshell-menu-width-expanded",
        "--appshell-listview-width",
      ],
      depends_on: ["spatial-stability"],
      influences: ["detail-with-listview", "auth-shell"],
      conflicts_with: ["layout-mistakes"],
      alternatives: [],
    },
    `# AppShell region grammar

## What

AppShell defines regions: **menu**, **header**, **main**, **listview**, **footer**. Each has a job.

## Why

Regions stabilize navigation and scroll. Putting page content in the wrong region breaks master–detail and router outlet behavior.

## When

All authenticated product UI. See \`ai/appshell.schema.json\` for props.

## Region rules

| Region | Contains | Does not contain |
|--------|----------|------------------|
| \`menu\` | Canonical \`Menu\` | Ad-hoc \`Sidebar*\` + fixed rail CSS (unless product owns it) |
| \`header\` | Page-level chrome / \`AppShell.Header\` | Primary product nav |
| \`main\` | Page sections & patterns (\`AppShell.Main\`) | Global nav |
| \`listview\` | Master list / queue | Detail editor (belongs in main) |
| \`footer\` | Secondary app chrome | Primary nav |

## How AI should reason

1. Default \`enableRouterOutlet={false}\` for static demos; use layout routes when outlet is enabled.
2. Only \`.appshell--main\` scrolls for master–detail; listview uses pinned header + \`data-slot="appshell-listview-scroll"\`.
3. Never CSS-collapse the outlet to “fix” empty main.

Confidence: Required — Menu in menu slot; page content in Main.

${relBlock({
  Supports: ["Spatial stability", "Master–detail"],
  Requires: ["AppShell", "Menu"],
  Influences: ["Detail pages", "Navigation"],
  Uses: ["AppShell regions", "CSS variables"],
  "Conflicts With": ["Bespoke shells", "Sidebar-in-menu hacks"],
  Alternatives: ["—"],
  "Depends On": ["spatial-stability"],
  "Referenced By": ["ai/guides/appshell-navigation.md"],
})}
${seeAlso([
  { label: "AppShell ontology", href: "../ontology/appshell.md" },
  { label: "Navigation guide", href: "../../ai/guides/appshell-navigation.md" },
])}
`,
  )
}

// --- Ontology ---
async function writeOntology() {
  const objects = [
    {
      id: "appshell-ontology",
      file: "appshell.md",
      name: "AppShell",
      isA: "Layout shell",
      contains: ["Menu slot", "Header", "Main", "Listview", "Footer"],
      requires: ["Menu (canonical) for product nav"],
      uses: ["Spacing", "Brand tokens", "Router outlet (optional)"],
      appearsIn: ["All authenticated recipes"],
      supports: ["Spatial stability", "Master–detail"],
      cannot: ["Meaningful product nav (needs Menu)"],
    },
    {
      id: "menu-ontology",
      file: "menu.md",
      name: "Menu",
      isA: "Navigation component",
      contains: ["Brand/title header", "Navigation items", "Optional footer slot"],
      requires: ["AppShell.menu placement"],
      uses: ["Brand modes", "Phosphor icons", "headerVariant"],
      appearsIn: ["auth-shell", "all dashboards"],
      supports: ["Information architecture"],
      cannot: ["Brand identity tokens (uses theme)"],
    },
    {
      id: "button-ontology",
      file: "button.md",
      name: "Button",
      isA: "Interactive component",
      contains: ["Label", "Optional icon"],
      requires: ["Action intent"],
      uses: ["Spacing", "Radius", "Typography", "Color roles"],
      appearsIn: ["Forms", "Cards", "Dialogs", "Toolbars"],
      supports: ["Primary / secondary actions"],
      cannot: ["State (hover/focus/disabled)"],
    },
    {
      id: "card-ontology",
      file: "card.md",
      name: "Card",
      isA: "Container component",
      contains: ["Header", "Body", "Optional footer actions"],
      requires: ["Grouped content worth separating"],
      uses: ["Radius ≤12", "Surface color", "Spacing"],
      appearsIn: ["Dashboards", "Settings groups"],
      supports: ["Grouping"],
      cannot: ["Meaningful hierarchy alone (needs headers)"],
    },
    {
      id: "field-ontology",
      file: "field.md",
      name: "Field",
      isA: "Form primitive",
      contains: ["Label", "Control", "Description", "Error"],
      requires: ["Input/Select/Switch/etc."],
      uses: ["Spacing", "Typography", "Validation states"],
      appearsIn: ["Forms", "Settings", "Dialogs"],
      supports: ["Accessibility meaning"],
      cannot: ["Validation rules (product logic)"],
    },
    {
      id: "dialog-ontology",
      file: "dialog.md",
      name: "Dialog",
      isA: "Overlay pattern/component",
      contains: ["Title", "Body", "Actions"],
      requires: ["User decision or focused task"],
      uses: ["Button", "Field", "Focus trap"],
      appearsIn: ["Destructive confirms", "Short forms"],
      supports: ["Progressive disclosure", "Urgency"],
      cannot: ["Focus management"],
    },
    {
      id: "table-list-ontology",
      file: "table-list.md",
      name: "Table / List",
      isA: "Collection pattern",
      contains: ["Rows", "Columns or Item rows", "Optional filters"],
      requires: ["Many comparable or scannable items"],
      uses: ["Badge", "Status", "Item", "Table"],
      appearsIn: ["Queues", "Analytics feeds", "Directories"],
      supports: ["Density", "Alignment"],
      cannot: ["Data fetching"],
    },
    {
      id: "section-header-ontology",
      file: "section-header.md",
      name: "SectionHeader",
      isA: "Hierarchy component",
      contains: ["Title", "Optional description", "Optional actions"],
      requires: ["Section to label"],
      uses: ["Typography", "Spacing"],
      appearsIn: ["Dashboards", "Settings", "Detail pages"],
      supports: ["Hierarchy", "Readability"],
      cannot: ["Page-level routing"],
    },
    {
      id: "badge-ontology",
      file: "badge.md",
      name: "Badge",
      isA: "Feedback component",
      contains: ["Short label"],
      requires: ["Status or category to annotate"],
      uses: ["Semantic color", "Typography"],
      appearsIn: ["Tables", "Cards", "Lists"],
      supports: ["Emphasis (secondary)", "Density"],
      cannot: ["Color alone for meaning"],
    },
    {
      id: "status-ontology",
      file: "status.md",
      name: "Status",
      isA: "Feedback component",
      contains: ["Label", "Optional indicator"],
      requires: ["State to communicate"],
      uses: ["Semantic color", "Dot/icon"],
      appearsIn: ["Queues", "Detail headers", "Provider workflows"],
      supports: ["Urgency", "Accessibility meaning"],
      cannot: ["Color alone for meaning"],
    },
  ]

  await writeDoc(
    "ontology/README.md",
    {
      id: "ontology-index",
      category: "ontology",
      type: "index",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: objects.map((o) => o.id),
      components: objects.map((o) => o.name.split(" / ")[0]),
      patterns: [],
      tokens: [],
      depends_on: ["grammar-hierarchy"],
      influences: [],
      conflicts_with: [],
      alternatives: [],
    },
    `# Ontology

Knowledge objects for major UDS concepts. Prop APIs remain in \`ai/uds-contract.json\` → \`componentCatalog\`.

| Object | File |
|--------|------|
${objects.map((o) => `| ${o.name} | [\`${o.file}\`](./${o.file}) |`).join("\n")}
`,
  )

  for (const o of objects) {
    await writeDoc(
      `ontology/${o.file}`,
      {
        id: o.id,
        category: "ontology",
        type: "object",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: ["grammar-hierarchy", "components-index"],
        components: [o.name.split(" / ")[0].replace("AppShell", "AppShell")],
        patterns: o.appearsIn.filter((x) => !x.includes(" ")),
        tokens: [],
        depends_on: [],
        influences: o.supports,
        conflicts_with: [],
        alternatives: [],
      },
      `# ${o.name}

## What

\`${o.name}\` **is-a** ${o.isA}.

## Ontology

| Relation | Objects |
|----------|---------|
| **is-a** | ${o.isA} |
| **contains** | ${o.contains.join(", ")} |
| **requires** | ${o.requires.join(", ")} |
| **uses** | ${o.uses.join(", ")} |
| **appears in** | ${o.appearsIn.join(", ")} |
| **supports** | ${o.supports.join(", ")} |
| **cannot exist without** | ${o.cannot.join(", ")} |

## How AI should reason

1. Confirm the object is the right layer (component vs pattern vs region).
2. Check **requires** before nesting.
3. Read contract catalog for props; this page is relational only.

Confidence: Preferred — Prefer this object over bespoke markup when it fits.

${relBlock({
  Supports: o.supports,
  Requires: o.requires,
  Influences: o.appearsIn,
  Uses: o.uses,
  "Conflicts With": ["Bespoke equivalents"],
  Alternatives: ["See decision trees"],
  "Depends On": ["Grammar"],
  "Referenced By": ["ai/indexes/component-index.md"],
})}
${seeAlso([
  { label: "Components index", href: "../components/README.md" },
  { label: "Contract", href: "../../ai/uds-contract.json" },
])}
`,
    )
  }
}

// --- Decision trees ---
async function writeTrees() {
  const trees = [
    {
      id: "navigation-tree",
      file: "navigation.md",
      title: "Navigation",
      mermaid: `flowchart TD
  start[Need navigation?] --> durable{Durable across pages?}
  durable -->|Yes| menu[Menu in AppShell.menu]
  durable -->|No| local{In-page sections?}
  local -->|Yes| tabs[Tabs or in-page anchors]
  local -->|No| crumbs[Breadcrumb / back]
  menu --> brand{Product brand lockup?}
  brand -->|Yes| hvBrand[headerVariant brand]
  brand -->|No| hvTitle[headerVariant title]
`,
      steps: `Need navigation?
→ Durable across pages? → **Menu** in AppShell.menu
→ Page-local only? → Tabs / section nav
→ Trail context? → Breadcrumb
→ Brand lockup? → headerVariant brand vs title`,
    },
    {
      id: "forms-tree",
      file: "forms.md",
      title: "Forms",
      mermaid: `flowchart TD
  start[Collect or edit data?] --> many{Many fields?}
  many -->|No| dialog[Dialog or inline Field]
  many -->|Yes| page[Settings / form page pattern]
  page --> groups[Group by task]
  groups --> actions[Primary Save + Secondary Cancel]
  dialog --> validate[Field validation states]
  actions --> validate
`,
      steps: `Collect/edit data?
→ Few fields + focused decision → Dialog
→ Many fields → Form / settings-form recipe
→ Group sections → Primary save + secondary cancel
→ Always use Field chrome`,
    },
    {
      id: "tables-tree",
      file: "tables.md",
      title: "Tables",
      mermaid: `flowchart TD
  start[Many items?] --> compare{Need comparison across attributes?}
  compare -->|Yes| table[Table]
  compare -->|No| scan{Need fast scanning / actions?}
  scan -->|Yes| list[List / Item rows]
  scan -->|No| cards[Cards only if each item is a task container]
`,
      steps: `Many items?
→ Compare attributes → Table
→ Scan + row actions → List / Item
→ Each item is a rich task container → Cards (sparingly)`,
    },
    {
      id: "dashboards-tree",
      file: "dashboards.md",
      title: "Dashboards",
      mermaid: `flowchart TD
  start[Operational overview?] --> dense{High density ops?}
  dense -->|Queue + calendar| ops[ops-queue-dashboard]
  dense -->|KPI + Item panels| triage[triage-dashboard]
  dense -->|Charts + feed| analytics[analytics-overview]
  dense -->|Provider workflow| provider[provider-portal-home]
  dense -->|Simple KPIs| workspace[workspace-dashboard]
`,
      steps: `Operational overview?
→ Queue + calendar aside → ops-queue-dashboard
→ Dense triage KPI + Items → triage-dashboard
→ Charts + feed → analytics-overview
→ Provider identity + workflow → provider-portal-home
→ Simple KPIs → workspace-dashboard`,
    },
    {
      id: "empty-states-tree",
      file: "empty-states.md",
      title: "Empty states",
      mermaid: `flowchart TD
  start[No data?] --> error{Is it an error?}
  error -->|Yes| errors[See errors tree]
  error -->|No| first{First-run / zero items?}
  first -->|Yes| empty[Empty pattern + one primary CTA]
  first -->|No| filters[Clear filters / adjust query]
`,
      steps: `No data?
→ Error → errors tree
→ First-run → Empty + single primary CTA
→ Filters too tight → prompt to clear filters`,
    },
    {
      id: "errors-tree",
      file: "errors.md",
      title: "Errors",
      mermaid: `flowchart TD
  start[Something failed?] --> block{Blocks the task?}
  block -->|Yes| hard[Alert or Dialog + recovery action]
  block -->|No| field{Field-level?}
  field -->|Yes| ferr[Field error text]
  field -->|No| toast[Toast / inline Status]
`,
      steps: `Failure?
→ Blocks task → Alert or Dialog with recovery
→ Field-level → Field error
→ Transient → Toast / Status
Never color-alone`,
    },
    {
      id: "buttons-tree",
      file: "buttons.md",
      title: "Buttons",
      mermaid: `flowchart TD
  start[Need an action?] --> primary{Primary goal of region?}
  primary -->|Yes| one[One primary Button]
  primary -->|No| secondary[Secondary / ghost / link]
  one --> danger{Destructive?}
  danger -->|Yes| dest[Destructive appearance + confirm]
  danger -->|No| place[Place in pattern action area]
`,
      steps: `Action needed?
→ Region’s primary goal → one primary Button
→ Supporting → secondary/ghost
→ Destructive → destructive + confirm dialog
Belong inside pattern actions`,
    },
    {
      id: "dialogs-tree",
      file: "dialogs.md",
      title: "Dialogs",
      mermaid: `flowchart TD
  start[Interrupt flow?] --> confirm{Confirm destructive/irreversible?}
  confirm -->|Yes| alert[AlertDialog]
  confirm -->|No| short{Short focused task?}
  short -->|Yes| dialog[Dialog]
  short -->|No| page[Full page / drawer instead]
`,
      steps: `Need interruption?
→ Destructive confirm → AlertDialog
→ Short focused task → Dialog
→ Large form → full page or drawer (not a huge dialog)`,
    },
    {
      id: "layout-tree",
      file: "layout.md",
      title: "Layout",
      mermaid: `flowchart TD
  start[Authenticated screen?] --> shell[AppShell + Menu]
  shell --> detail{Master–detail?}
  detail -->|Yes| listview[listview slot + Main detail]
  detail -->|No| main[Content in AppShell.Main]
  main --> sections[Sections → Patterns]
`,
      steps: `Authenticated?
→ AppShell + Menu
→ Master–detail? → listview + Main
→ Else → sections/patterns in Main
Static app → enableRouterOutlet false`,
    },
    {
      id: "content-hierarchy-tree",
      file: "content-hierarchy.md",
      title: "Content hierarchy",
      mermaid: `flowchart TD
  start[Order content] --> title[Page title / SectionHeader]
  title --> primary[Primary content / data]
  primary --> support[Supporting metadata]
  support --> chrome[Chrome last]
`,
      steps: `Order content:
1 Page title
2 Primary content
3 Supporting metadata
4 Chrome / secondary actions
Map to Text roles + SectionHeader`,
    },
  ]

  for (const t of trees) {
    await writeDoc(
      `decision-rules/trees/${t.file}`,
      {
        id: t.id,
        category: "decision",
        type: "tree",
        priority: "critical",
        ai_priority: "critical",
        confidence_default: "preferred",
        related: ["choosing-patterns", "grammar-rules"],
        components: [],
        patterns: [],
        tokens: [],
        depends_on: ["intent"],
        influences: [],
        conflicts_with: [],
        alternatives: [],
      },
      `# Decision tree: ${t.title}

## What

Branching reasoning for **${t.title.toLowerCase()}** decisions.

## Why

Isolated tips do not scale. Trees force intent → structure → component order.

## When

Before generating or refactoring UI in this category.

## Tree

\`\`\`mermaid
${t.mermaid.trim()}
\`\`\`

## Reasoning outline

${t.steps}

Confidence: Preferred — Follow the tree; jump to recipes only after intent is classified.

${relBlock({
  Supports: ["Deterministic AI composition"],
  Requires: ["Intent"],
  Influences: ["Patterns", "Ontology"],
  Uses: ["Grammar", "Semantics"],
  "Conflicts With": ["Ad-hoc component soup"],
  Alternatives: ["choosing-patterns for recipe routing"],
  "Depends On": ["intent"],
  "Referenced By": ["ai/indexes/decision-index.md"],
})}
${seeAlso([
  { label: "Choosing patterns", href: "../choosing-patterns.md" },
  { label: "Grammar rules", href: "../../grammar/rules.md" },
])}
`,
    )
  }
}

// --- Components index ---
async function writeComponentsIndex() {
  await writeDoc(
    "components/README.md",
    {
      id: "components-index",
      category: "component",
      type: "index",
      priority: "high",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["ontology-index", "button-ontology", "appshell-ontology"],
      components: ["AppShell", "Menu", "Button", "Card", "Field", "Dialog"],
      patterns: [],
      tokens: [],
      depends_on: ["grammar-hierarchy"],
      influences: [],
      conflicts_with: [],
      alternatives: [],
    },
    `# Components

Component **APIs and catalog** live in [\`ai/uds-contract.json\`](../../ai/uds-contract.json) → \`componentCatalog\`.

This DSL layer does **not** duplicate props. Use:

| Need | Go to |
|------|--------|
| Relational model (is-a, requires, uses) | [\`ontology/\`](../ontology/) |
| When to choose which control | [\`decision-rules/\`](../decision-rules/) |
| Runtime imports | \`@chghealthcare/unified-design-system\` |

Confidence: Required — Do not invent parallel component docs that drift from the contract.
`,
  )
}

// --- Apply front matter to remaining files ---
const CATEGORY_BY_DIR = {
  foundations: "foundation",
  composition: "composition",
  patterns: "pattern",
  "decision-rules": "decision",
  relationships: "relationship",
  interactions: "interaction",
  accessibility: "accessibility",
  "anti-patterns": "anti-pattern",
  examples: "example",
  semantics: "semantics",
}

function idFromFile(rel) {
  const base = path.basename(rel, ".md")
  if (base === "README") return path.dirname(rel).split("/").pop() + "-readme"
  // disambiguate accessibility/semantics
  if (rel.includes("accessibility/semantics")) return "a11y-semantics"
  if (rel.includes("semantics/") && base === "confidence-semantic") return "confidence-semantic"
  return base
}

async function ensureFrontMatterOnFile(relFromDl) {
  const full = path.join(DL, relFromDl)
  if (!(await exists(full))) return
  let text = await readFile(full, "utf8")
  if (hasFrontMatter(text) && !FORCE) return

  const parts = relFromDl.split("/")
  const dir = parts[0]
  const category =
    dir === "philosophy.md" || relFromDl === "philosophy.md"
      ? "philosophy"
      : dir === "principles.md" || relFromDl === "principles.md"
        ? "philosophy"
        : dir === "glossary.md" || relFromDl === "glossary.md"
          ? "index"
          : dir === "MIGRATION.md" || relFromDl === "MIGRATION.md"
            ? "index"
            : CATEGORY_BY_DIR[dir] || "index"

  const id = idFromFile(relFromDl)
  // strip existing FM if FORCE
  if (hasFrontMatter(text)) {
    text = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, "")
  }

  const fields = {
    id,
    category,
    type:
      category === "pattern"
        ? "pattern"
        : category === "decision"
          ? "rule"
          : category === "anti-pattern"
            ? "rule"
            : category === "example"
              ? "index"
              : "concept",
    priority: "medium",
    ai_priority: "medium",
    confidence_default: "preferred",
    related: [],
    components: [],
    patterns: [],
    tokens: [],
    depends_on: [],
    influences: [],
    conflicts_with: [],
    alternatives: [],
  }

  // Ensure relationship section exists
  if (!text.includes("## Relationships")) {
    text =
      text.trimEnd() +
      "\n" +
      relBlock({
        Supports: [],
        Requires: [],
        Influences: [],
        Uses: [],
        "Conflicts With": [],
        Alternatives: [],
        "Depends On": [],
        "Referenced By": [],
      })
  }

  await writeFile(full, fm(fields) + text.replace(/^\uFEFF/, ""), "utf8")
}

async function walkMd(dir, base = "") {
  const { readdir } = await import("node:fs/promises")
  const entries = await readdir(dir, { withFileTypes: true })
  const out = []
  for (const e of entries) {
    const rel = path.join(base, e.name)
    if (e.isDirectory()) {
      if (e.name === "_meta") {
        out.push(...(await walkMd(path.join(dir, e.name), rel)))
        continue
      }
      out.push(...(await walkMd(path.join(dir, e.name), rel)))
    } else if (e.name.endsWith(".md")) out.push(rel)
  }
  return out
}

async function enrichKeyDocs() {
  // philosophy
  await writeDoc(
    "philosophy.md",
    {
      id: "philosophy",
      category: "philosophy",
      type: "principle",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["dsl-principles", "consistency-load", "intent"],
      components: ["AppShell", "Menu"],
      patterns: [],
      tokens: [],
      depends_on: [],
      influences: ["design-physics-index"],
      conflicts_with: [],
      alternatives: [],
    },
    `# Design philosophy

CHG Unified Design System exists so every product ships **consistent, trustworthy, on-brand UI faster**—including as AI-assisted development scales.

## What we optimize for

- **Recognition over novelty** — Users moving between CHG products should feel familiar patterns, not a new design language per app.
- **Clarity over density** — Operational tools may be data-rich, but hierarchy, spacing, and grouping prevent visual noise.
- **System over screen** — Individual screens compose from shared foundations and patterns, not local conventions.

## How AI should reason

1. Prefer existing recipes and components over novel layouts.
2. Optimize for task clarity before visual flourish.
3. When unsure, choose the more consistent CHG pattern.

## Relationship to the DSL data model

| Layer | Answers |
|-------|---------|
| DSL (\`design-language/\`) | *Why* and *when* |
| Contract (\`ai/uds-contract.json\`) | *What* is available |
| React components | *How* it ships |

When prose here disagrees with shipped components, **components and tokens win** until this documentation is updated.

Confidence: Required — Do not invent a parallel visual language per app.

${relBlock({
  Supports: ["All DSL layers"],
  Requires: [],
  Influences: ["Design physics", "Semantics", "Patterns"],
  Uses: [],
  "Conflicts With": ["One-off brand forks"],
  Alternatives: [],
  "Depends On": [],
  "Referenced By": ["principles.md", "ai/indexes/concept-index.md"],
})}
${seeAlso([
  { label: "Principles", href: "./principles.md" },
  { label: "Design physics", href: "./design-physics/README.md" },
])}
`,
  )

  await writeDoc(
    "principles.md",
    {
      id: "dsl-principles",
      category: "philosophy",
      type: "principle",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "required",
      related: ["philosophy", "grammar-rules", "front-matter-schema"],
      components: ["AppShell", "Menu", "Button", "Field", "Card"],
      patterns: [],
      tokens: ["--uds-*"],
      depends_on: ["philosophy"],
      influences: [],
      conflicts_with: ["layout-mistakes", "radius-mistakes"],
      alternatives: [],
    },
    `# DSL principles

1. **Tokens before values** — Use \`--uds-*\` variables and component variants; do not hardcode hex, px spacing, or ad-hoc radius.
2. **Components before markup** — Prefer UDS exports (\`Button\`, \`Field\`, \`Card\`, \`AppShell\`) over bespoke HTML/CSS.
3. **Semantic before decorative** — Color, elevation, and weight communicate meaning (status, hierarchy, affordance).
4. **Shell before screen** — Authenticated product UI defaults to \`AppShell\` with \`Menu\` in the menu slot; page content in \`AppShell.Main\`.
5. **Accessible by default** — Focus, contrast, touch targets, and semantics are not optional polish.
6. **Brand via modes** — Product brand differences use token modes and \`Menu\`/\`Branding\` props—not one-off color overrides.
7. **AI-readable** — Decisions align with \`ai/uds-contract.json\` and this DSL so agents produce on-brand UI.

Confidence: Required — Principles 1, 2, 4, and 5 are non-negotiable for product UI.

${relBlock({
  Supports: ["Consistent AI output"],
  Requires: ["Philosophy"],
  Influences: ["Grammar", "Decision rules"],
  Uses: ["Tokens", "Components"],
  "Conflicts With": ["Anti-patterns"],
  Alternatives: [],
  "Depends On": ["philosophy"],
  "Referenced By": ["AGENTS.md"],
})}
${seeAlso([
  { label: "Philosophy", href: "./philosophy.md" },
  { label: "Anti-patterns", href: "./anti-patterns/layout-mistakes.md" },
])}
`,
  )

  // choosing-patterns enriched
  await writeDoc(
    "decision-rules/choosing-patterns.md",
    {
      id: "choosing-patterns",
      category: "decision",
      type: "rule",
      priority: "critical",
      ai_priority: "critical",
      confidence_default: "preferred",
      related: [
        "dashboards-tree",
        "forms-tree",
        "layout-tree",
        "intent",
      ],
      components: ["AppShell", "Menu"],
      patterns: [
        "auth-shell",
        "workspace-dashboard",
        "detail-with-listview",
        "settings-form",
        "ops-queue-dashboard",
        "triage-dashboard",
        "provider-portal-home",
        "analytics-overview",
      ],
      tokens: [],
      depends_on: ["intent"],
      influences: [],
      conflicts_with: ["layout-mistakes"],
      alternatives: [],
    },
    `# Choosing patterns

Map **screen intent** to \`ai/recipes/\` before inventing layout.

| Intent | Recipe |
| --- | --- |
| Authenticated shell only | \`auth-shell\` |
| Simple KPI / summary dashboard | \`workspace-dashboard\` |
| Master–detail / queue + detail | \`detail-with-listview\` |
| Settings / preferences form | \`settings-form\` |
| Ops queue + calendar aside | \`ops-queue-dashboard\` |
| Dense triage (KPIs + Item panels) | \`triage-dashboard\` |
| Provider portal (identity rail + workflow) | \`provider-portal-home\` |
| Analytics chart + feed panels | \`analytics-overview\` |

If no recipe fits, compose from \`patterns/\` and validate against \`anti-patterns/\`.

## How AI should reason

1. Write the user goal (intent).
2. Run the dashboards / forms / layout decision trees.
3. Select the recipe row above.
4. Open matching \`ai/examples/*.tsx\`.

Confidence: Preferred — Prefer a listed recipe over a novel dashboard.

${relBlock({
  Supports: ["Recipe selection"],
  Requires: ["Intent"],
  Influences: ["All screen generation"],
  Uses: ["ai/recipes", "ai/examples"],
  "Conflicts With": ["Bespoke shells"],
  Alternatives: ["Compose from patterns/ if none fit"],
  "Depends On": ["intent"],
  "Referenced By": ["ai/indexes/decision-index.md", "ai/indexes/pattern-index.md"],
})}
${seeAlso([
  { label: "Dashboards tree", href: "./trees/dashboards.md" },
  { label: "Patterns: dashboards", href: "../patterns/dashboards.md" },
])}
`,
  )
}

async function enrichPatterns() {
  const patternBodies = {
    "patterns/forms.md": {
      id: "forms",
      title: "Forms",
      recipe: "settings-form",
      goal: "Allow the user to edit structured data (e.g. profile).",
      reasoning: `Contains multiple inputs
→ Form pattern
→ Grouped sections (grouping + proximity)
→ Field for each control
→ Primary Save action
→ Secondary Cancel action`,
    },
    "patterns/tables.md": {
      id: "tables",
      title: "Tables",
      recipe: null,
      goal: "Compare many records across attributes.",
      reasoning: `Many items + comparison
→ Table pattern
→ Sticky header optional
→ Status/Badge in cells
→ Row actions in a trailing column`,
    },
    "patterns/dashboards.md": {
      id: "dashboards",
      title: "Dashboards",
      recipe: "workspace-dashboard (or dense recipes)",
      goal: "Give an operational overview so the user knows what needs attention.",
      reasoning: `Overview intent
→ Classify density (decision tree)
→ Pick recipe (workspace / ops-queue / triage / analytics / provider)
→ SectionHeader + KPI/Cards/Charts
→ Secondary feed or queue`,
    },
    "patterns/navigation.md": {
      id: "navigation",
      title: "Navigation",
      recipe: "auth-shell / default-navigation",
      goal: "Move between durable product areas without re-learning layout.",
      reasoning: `Durable destinations
→ AppShell + Menu
→ navigationItems with Phosphor icons
→ headerVariant brand or title
→ Active state from route`,
    },
    "patterns/dialogs.md": {
      id: "dialogs",
      title: "Dialogs",
      recipe: null,
      goal: "Complete a short, focused decision without leaving the page.",
      reasoning: `Interrupt needed
→ Destructive? AlertDialog
→ Short form/task? Dialog
→ Actions: primary confirm + secondary cancel
→ Focus trap via UDS Dialog`,
    },
    "patterns/empty-states.md": {
      id: "empty-states",
      title: "Empty states",
      recipe: null,
      goal: "Explain absence of data and offer one next step.",
      reasoning: `No rows
→ Not an error? Empty pattern
→ One clear primary CTA
→ Avoid dense chrome`,
    },
    "patterns/lists.md": {
      id: "lists",
      title: "Lists",
      recipe: null,
      goal: "Scan many items with row-level actions (not multi-column comparison).",
      reasoning: `Many items, scan not compare
→ List / Item pattern
→ Optional listview master–detail
→ Status + title + meta`,
    },
    "patterns/cards.md": {
      id: "cards",
      title: "Cards",
      recipe: null,
      goal: "Contain a related cluster or interactive unit.",
      reasoning: `Need a container for interaction/grouping
→ Card
→ Header + body + optional actions
→ Do not card every paragraph`,
    },
    "patterns/detail-pages.md": {
      id: "detail-pages",
      title: "Detail pages",
      recipe: "detail-with-listview",
      goal: "Review one entity while keeping the collection visible.",
      reasoning: `Master–detail intent
→ AppShell listview + Main
→ Pinned list header + scroll body
→ Detail sections in Main`,
    },
    "patterns/filters.md": {
      id: "filters",
      title: "Filters",
      recipe: null,
      goal: "Narrow a collection without leaving the page.",
      reasoning: `Collection too broad
→ Filter group near the list/table
→ SearchInput + selects
→ Empty state when zero results`,
    },
    "patterns/search.md": {
      id: "search",
      title: "Search",
      recipe: null,
      goal: "Find an item by query.",
      reasoning: `User has a query
→ SearchInput
→ Results as list/table
→ Empty state for no hits`,
    },
  }

  for (const [rel, p] of Object.entries(patternBodies)) {
    await writeDoc(
      rel,
      {
        id: p.id,
        category: "pattern",
        type: "pattern",
        priority: "high",
        ai_priority: "high",
        confidence_default: "preferred",
        related: ["choosing-patterns", "grammar-rules", "intent"],
        components: [],
        patterns: [p.id],
        tokens: [],
        depends_on: ["intent", "grammar-hierarchy"],
        influences: [],
        conflicts_with: [],
        alternatives: [],
      },
      `# ${p.title}

## What

Screen/UI pattern for **${p.title.toLowerCase()}**.

## Why

Encodes a repeatable solution so products and AI do not reinvent structure.

## When

See decision trees and \`choosing-patterns.md\`. ${p.recipe ? `Primary recipe: \`${p.recipe}\`.` : ""}

## Goal (example)

${p.goal}

## Reasoning

\`\`\`
${p.reasoning}
\`\`\`

## How AI should reason

1. Confirm intent matches this pattern.
2. Follow grammar (pattern inside section inside page region).
3. Use UDS components listed in related ontology / contract.
4. Open \`ai/examples/\` when a recipe exists.

Confidence: Preferred — Prefer recipe fixtures when listed.

${relBlock({
  Supports: [p.goal],
  Requires: ["Intent", "Grammar"],
  Influences: ["Component selection"],
  Uses: ["UDS components", "Tokens"],
  "Conflicts With": ["Anti-patterns"],
  Alternatives: ["See choosing-patterns"],
  "Depends On": ["intent"],
  "Referenced By": ["ai/indexes/pattern-index.md", "ai/indexes/reasoning-index.md"],
})}
${seeAlso([
  { label: "Choosing patterns", href: "../decision-rules/choosing-patterns.md" },
  { label: "Examples", href: `../examples/${p.id === "detail-pages" ? "navigation" : p.id === "empty-states" || p.id === "filters" || p.id === "search" || p.id === "lists" || p.id === "dialogs" ? "before-after" : p.id}.md` },
])}
`,
    )
  }

  // dense recipe pattern stubs as part of dashboards cross-links — examples update
  await writeDoc(
    "examples/dashboards.md",
    {
      id: "examples-dashboards",
      category: "example",
      type: "index",
      priority: "high",
      ai_priority: "high",
      confidence_default: "preferred",
      related: ["dashboards", "choosing-patterns"],
      components: [],
      patterns: [
        "workspace-dashboard",
        "ops-queue-dashboard",
        "triage-dashboard",
        "provider-portal-home",
        "analytics-overview",
      ],
      tokens: [],
      depends_on: [],
      influences: [],
      conflicts_with: [],
      alternatives: [],
    },
    `# Dashboard examples

Canonical fixtures:

| Recipe | Example |
|--------|---------|
| workspace-dashboard | [\`ai/examples/workspace-dashboard.tsx\`](../../ai/examples/workspace-dashboard.tsx) |
| ops-queue-dashboard | [\`ai/examples/ops-queue-dashboard.tsx\`](../../ai/examples/ops-queue-dashboard.tsx) |
| triage-dashboard | [\`ai/examples/triage-dashboard.tsx\`](../../ai/examples/triage-dashboard.tsx) |
| provider-portal-home | [\`ai/examples/provider-portal-home.tsx\`](../../ai/examples/provider-portal-home.tsx) |
| analytics-overview | [\`ai/examples/analytics-overview.tsx\`](../../ai/examples/analytics-overview.tsx) |

${relBlock({
  Supports: ["Pattern learning"],
  Requires: [],
  Influences: [],
  Uses: ["ai/examples"],
  "Conflicts With": [],
  Alternatives: [],
  "Depends On": ["dashboards"],
  "Referenced By": ["patterns/dashboards.md"],
})}
`,
  )
}

async function writeRelationshipGraph() {
  await writeDoc(
    "relationships/graph.md",
    {
      id: "relationship-graph",
      category: "relationship",
      type: "index",
      priority: "high",
      ai_priority: "critical",
      confidence_default: "preferred",
      related: ["grammar-hierarchy", "ontology-index"],
      components: [],
      patterns: [],
      tokens: [],
      depends_on: [],
      influences: [],
      conflicts_with: [],
      alternatives: [],
    },
    `# Relationship graph

Human-readable adjacency for the DSL. Per-document edges live in each file’s **Relationships** section and YAML \`depends_on\` / \`influences\` / \`conflicts_with\` / \`alternatives\`.

## Layer edges

\`\`\`mermaid
flowchart TB
  philosophy[philosophy] --> physics[design-physics]
  physics --> semantics[semantics]
  semantics --> grammar[grammar]
  grammar --> decisions[decision-rules]
  decisions --> relationships[relationships]
  relationships --> patterns[patterns]
  patterns --> ontology[ontology]
  ontology --> foundations[foundations]
  patterns --> examples[examples]
\`\`\`

## High-value edges

| From | Relation | To |
|------|----------|-----|
| intent | influences | choosing-patterns |
| choosing-patterns | uses | ai/recipes |
| grammar-regions | requires | appshell-ontology, menu-ontology |
| hierarchy | influences | content-hierarchy-tree |
| density | influences | dashboards-tree |
| proximity-physics | implements via | proximity, grouping |
| button-ontology | appears in | forms, dialogs, cards |
| layout-mistakes | conflicts with | grammar-rules |

Machine indexes: [\`ai/indexes/relationship-index.md\`](../../ai/indexes/relationship-index.md).

Confidence: Preferred — Prefer typed edges over orphan pages.

${relBlock({
  Supports: ["RAG traversal"],
  Requires: ["Front matter on all docs"],
  Influences: ["AI indexes"],
  Uses: [],
  "Conflicts With": [],
  Alternatives: ["Future graph.json"],
  "Depends On": [],
  "Referenced By": ["ai/indexes/relationship-index.md"],
})}
`,
  )
}

async function writeMigration() {
  await writeDoc(
    "MIGRATION.md",
    {
      id: "dsl-migration",
      category: "index",
      type: "index",
      priority: "high",
      ai_priority: "medium",
      confidence_default: "preferred",
      related: ["design-language-readme", "front-matter-schema"],
      components: [],
      patterns: [],
      tokens: [],
      depends_on: [],
      influences: [],
      conflicts_with: [],
      alternatives: [],
    },
    `# DSL migration summary

## What changed

The \`design-language/\` folder moved from a flat stub library to a **layered Design System Language** with semantics, grammar, design physics, ontology, decision trees, YAML front matter, and typed relationships.

## Path map (composition → semantics)

| Old path | New path |
|----------|----------|
| \`composition/hierarchy.md\` | \`semantics/hierarchy.md\` |
| \`composition/density.md\` | \`semantics/density.md\` |
| \`composition/grouping.md\` | \`semantics/grouping.md\` |
| \`composition/proximity.md\` | \`semantics/proximity.md\` |
| \`composition/visual-weight.md\` | \`semantics/visual-weight.md\` |
| \`composition/whitespace.md\` | \`semantics/whitespace.md\` |
| \`composition/alignment.md\` | \`semantics/alignment.md\` |

Remaining in \`composition/\`: \`nesting.md\`, \`overflow.md\`, \`responsive-layout.md\`.

## New folders

| Path | Purpose |
|------|---------|
| \`semantics/\` | Design meaning concepts |
| \`grammar/\` | Experience→Token rules + AppShell regions |
| \`design-physics/\` | Universal principles |
| \`ontology/\` | Knowledge objects |
| \`decision-rules/trees/\` | Decision trees |
| \`components/\` | Thin index → contract |
| \`_meta/\` | Front matter schema |
| \`ai/indexes/\` | AI retrieval indexes |

## Backwards compatibility

- Package export \`@chghealthcare/unified-design-system/design-language\` unchanged.
- \`ai/recipes\`, \`ai/examples\`, and \`ai/uds-contract.json\` remain runtime sources of truth for *what*.
- Agents should read DSL for *why/when* and contract for *what*.

## Future improvements

1. Expand ontology to full \`componentCatalog\`.
2. Emit \`relationships/graph.json\` from front matter.
3. CI check: require front matter keys + valid \`related\` ids.
4. RAG eval suite against \`ai/evals/\` prompts.
5. Auto-link checker for See also hrefs.
`,
  )
}

async function main() {
  console.log("Migrating composition → semantics…")
  await migrateComposition()

  console.log("Writing physics, grammar, ontology, trees…")
  await writePhysics()
  await writeGrammar()
  await writeOntology()
  await writeTrees()
  await writeComponentsIndex()
  await writeNewSemantics()
  await enrichSemanticsMoved()
  await enrichKeyDocs()
  await enrichPatterns()
  await writeRelationshipGraph()
  await writeMigration()

  console.log("Ensuring front matter on all markdown…")
  const files = await walkMd(DL)
  for (const rel of files) {
    await ensureFrontMatterOnFile(rel)
  }

  console.log(`Done. Processed ${files.length} markdown files under design-language/.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
