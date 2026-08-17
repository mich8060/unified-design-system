/**
 * Design Language docs hubs (SPA).
 * Package folders under design-language/ stay granular for AI; docs nav consolidates to 8 pages.
 */

export type DesignLanguageTopic = {
  title: string
  /** Path relative to the package / repo root (design-language/…). */
  path: string
}

export type DesignLanguageRelatedLink = {
  label: string
  to: string
}

export type DesignLanguageLayer = {
  id: string
  label: string
  role: string
  howToUse: string
  navId: string
  route: string
  topics: DesignLanguageTopic[]
  related: DesignLanguageRelatedLink[]
}

export const DESIGN_LANGUAGE_OVERVIEW_NAV_ID = 'design-language-overview'
export const DESIGN_LANGUAGE_OVERVIEW_ROUTE = '/docs/design-language'

/** Retired slugs → canonical merged hub. */
export const DESIGN_LANGUAGE_REDIRECTS: Record<string, string> = {
  relationships: '/docs/design-language/grammar',
  ontology: '/docs/design-language/patterns',
  components: '/docs/design-language/patterns',
  composition: '/docs/design-language/foundations',
  accessibility: '/docs/design-language/interactions',
  'anti-patterns': '/docs/design-language/examples',
}

export const DESIGN_LANGUAGE_LAYERS: DesignLanguageLayer[] = [
  {
    id: 'philosophy',
    label: 'Philosophy',
    role: 'Why the system exists and the tradeoffs we protect',
    howToUse: 'Start here when the problem is ambiguous or values conflict.',
    navId: 'design-language-philosophy',
    route: '/docs/design-language/philosophy',
    topics: [
      { title: 'Philosophy', path: 'design-language/philosophy.md' },
      { title: 'Principles', path: 'design-language/principles.md' },
      { title: 'Glossary', path: 'design-language/glossary.md' },
    ],
    related: [],
  },
  {
    id: 'design-physics',
    label: 'Design Physics',
    role: 'Universal forces—proximity, weight, contrast, stability, load',
    howToUse: 'Use when a layout feels off but you cannot yet name the bug.',
    navId: 'design-language-design-physics',
    route: '/docs/design-language/design-physics',
    topics: [
      { title: 'Overview', path: 'design-language/design-physics/README.md' },
      { title: 'Alignment Order', path: 'design-language/design-physics/alignment-order.md' },
      { title: 'Choice Complexity', path: 'design-language/design-physics/choice-complexity.md' },
      { title: 'Cognitive Load', path: 'design-language/design-physics/cognitive-load.md' },
      { title: 'Common Region', path: 'design-language/design-physics/common-region.md' },
      { title: 'Consistency Load', path: 'design-language/design-physics/consistency-load.md' },
      { title: 'Contrast Discoverability', path: 'design-language/design-physics/contrast-discoverability.md' },
      { title: 'Laws of UX', path: 'design-language/design-physics/laws-of-ux.md' },
      { title: 'Motion Identity', path: 'design-language/design-physics/motion-identity.md' },
      { title: 'Progressive Disclosure', path: 'design-language/design-physics/progressive-disclosure.md' },
      { title: 'Proximity', path: 'design-language/design-physics/proximity.md' },
      { title: 'Spatial Stability', path: 'design-language/design-physics/spatial-stability.md' },
      { title: 'Target Acquisition', path: 'design-language/design-physics/target-acquisition.md' },
      { title: 'Visual Weight', path: 'design-language/design-physics/visual-weight.md' },
      { title: 'Whitespace Relationships', path: 'design-language/design-physics/whitespace-relationships.md' },
    ],
    related: [],
  },
  {
    id: 'semantics',
    label: 'Semantics',
    role: 'What the UI means—hierarchy, density, intent, shell',
    howToUse: 'Name meaning before picking components.',
    navId: 'design-language-semantics',
    route: '/docs/design-language/semantics',
    topics: [
      { title: 'Accessibility Meaning', path: 'design-language/semantics/accessibility-meaning.md' },
      { title: 'Affordance', path: 'design-language/semantics/affordance.md' },
      { title: 'Alignment', path: 'design-language/semantics/alignment.md' },
      { title: 'AppShell Body Surface', path: 'design-language/semantics/appshell-body-surface.md' },
      { title: 'AppShell Main Containment', path: 'design-language/semantics/appshell-main-containment.md' },
      { title: 'Button Icon Size', path: 'design-language/semantics/button-icon-size.md' },
      { title: 'Confidence Semantic', path: 'design-language/semantics/confidence-semantic.md' },
      { title: 'Density', path: 'design-language/semantics/density.md' },
      { title: 'Dominant Variant', path: 'design-language/semantics/dominant-variant.md' },
      { title: 'Emphasis', path: 'design-language/semantics/emphasis.md' },
      { title: 'Grouping', path: 'design-language/semantics/grouping.md' },
      { title: 'Hierarchy', path: 'design-language/semantics/hierarchy.md' },
      { title: 'Information Architecture', path: 'design-language/semantics/information-architecture.md' },
      { title: 'Intent', path: 'design-language/semantics/intent.md' },
      { title: 'Listview Drives Main', path: 'design-language/semantics/listview-drives-main.md' },
      { title: 'Nested Radius', path: 'design-language/semantics/nested-radius.md' },
      { title: 'Page Composition', path: 'design-language/semantics/page-composition.md' },
      { title: 'Proximity', path: 'design-language/semantics/proximity.md' },
      { title: 'Readability', path: 'design-language/semantics/readability.md' },
      { title: 'Right Side Panel', path: 'design-language/semantics/right-side-panel.md' },
      { title: 'Row Dividers', path: 'design-language/semantics/row-dividers.md' },
      { title: 'Spacing Levels', path: 'design-language/semantics/spacing-levels.md' },
      { title: 'Stacked Bar Radius', path: 'design-language/semantics/stacked-bar-radius.md' },
      { title: 'Stacked Text', path: 'design-language/semantics/stacked-text.md' },
      { title: 'Toolbar Action Slots', path: 'design-language/semantics/toolbar-action-slots.md' },
      { title: 'Urgency', path: 'design-language/semantics/urgency.md' },
      { title: 'Visual Importance', path: 'design-language/semantics/visual-importance.md' },
      { title: 'Visual Weight', path: 'design-language/semantics/visual-weight.md' },
      { title: 'Whitespace', path: 'design-language/semantics/whitespace.md' },
    ],
    related: [],
  },
  {
    id: 'grammar',
    label: 'Grammar & Relationships',
    role: 'Valid regions and the scales that keep a screen coherent',
    howToUse: 'Check what is allowed where, then keep spacing, type, and radius on scale.',
    navId: 'design-language-grammar',
    route: '/docs/design-language/grammar',
    topics: [
      { title: 'Hierarchy', path: 'design-language/grammar/hierarchy.md' },
      { title: 'Regions', path: 'design-language/grammar/regions.md' },
      { title: 'Rules', path: 'design-language/grammar/rules.md' },
      { title: 'Component Hierarchy', path: 'design-language/relationships/component-hierarchy.md' },
      { title: 'Elevation Scale', path: 'design-language/relationships/elevation-scale.md' },
      { title: 'Graph', path: 'design-language/relationships/graph.md' },
      { title: 'Radius Scale', path: 'design-language/relationships/radius-scale.md' },
      { title: 'Spacing Scale', path: 'design-language/relationships/spacing-scale.md' },
      { title: 'Typography Scale', path: 'design-language/relationships/typography-scale.md' },
      { title: 'Visual Rhythm', path: 'design-language/relationships/visual-rhythm.md' },
    ],
    related: [{ label: 'AppShell demo', to: '/docs/getting-started/app-shell' }],
  },
  {
    id: 'decision-rules',
    label: 'Decision Rules',
    role: 'Choosing among legal options—patterns, spacing, trees',
    howToUse: 'Open when Grammar says yes to more than one approach.',
    navId: 'design-language-decision-rules',
    route: '/docs/design-language/decision-rules',
    topics: [
      { title: 'Choosing Components', path: 'design-language/decision-rules/choosing-components.md' },
      { title: 'Choosing Elevation', path: 'design-language/decision-rules/choosing-elevation.md' },
      { title: 'Choosing Layout', path: 'design-language/decision-rules/choosing-layout.md' },
      { title: 'Choosing Patterns', path: 'design-language/decision-rules/choosing-patterns.md' },
      { title: 'Choosing Radius', path: 'design-language/decision-rules/choosing-radius.md' },
      { title: 'Choosing Spacing', path: 'design-language/decision-rules/choosing-spacing.md' },
      { title: 'Tree · Buttons', path: 'design-language/decision-rules/trees/buttons.md' },
      { title: 'Tree · Content Hierarchy', path: 'design-language/decision-rules/trees/content-hierarchy.md' },
      { title: 'Tree · Dashboards', path: 'design-language/decision-rules/trees/dashboards.md' },
      { title: 'Tree · Dialogs', path: 'design-language/decision-rules/trees/dialogs.md' },
      { title: 'Tree · Empty States', path: 'design-language/decision-rules/trees/empty-states.md' },
      { title: 'Tree · Errors', path: 'design-language/decision-rules/trees/errors.md' },
      { title: 'Tree · Forms', path: 'design-language/decision-rules/trees/forms.md' },
      { title: 'Tree · Layout', path: 'design-language/decision-rules/trees/layout.md' },
      { title: 'Tree · Navigation', path: 'design-language/decision-rules/trees/navigation.md' },
      { title: 'Tree · Tables', path: 'design-language/decision-rules/trees/tables.md' },
    ],
    related: [],
  },
  {
    id: 'patterns',
    label: 'Patterns & Ontology',
    role: 'Screen recipes and component knowledge objects',
    howToUse: 'Pick the page shape, then read how each ingredient behaves and fails.',
    navId: 'design-language-patterns',
    route: '/docs/design-language/patterns',
    topics: [
      { title: 'Screen Layout Patterns', path: 'design-language/patterns/screen-layout-patterns.md' },
      { title: 'Alert Dialogs', path: 'design-language/patterns/alert-dialogs.md' },
      { title: 'Cards', path: 'design-language/patterns/cards.md' },
      { title: 'Dashboards', path: 'design-language/patterns/dashboards.md' },
      { title: 'Detail Pages', path: 'design-language/patterns/detail-pages.md' },
      { title: 'Dialogs', path: 'design-language/patterns/dialogs.md' },
      { title: 'Empty States', path: 'design-language/patterns/empty-states.md' },
      { title: 'Filters', path: 'design-language/patterns/filters.md' },
      { title: 'Forms', path: 'design-language/patterns/forms.md' },
      { title: 'Lists', path: 'design-language/patterns/lists.md' },
      { title: 'Navigation', path: 'design-language/patterns/navigation.md' },
      { title: 'Search', path: 'design-language/patterns/search.md' },
      { title: 'Tables', path: 'design-language/patterns/tables.md' },
      { title: 'Ontology Overview', path: 'design-language/ontology/README.md' },
      { title: 'Alert Dialog', path: 'design-language/ontology/alert-dialog.md' },
      { title: 'AppShell', path: 'design-language/ontology/appshell.md' },
      { title: 'Badge', path: 'design-language/ontology/badge.md' },
      { title: 'Button', path: 'design-language/ontology/button.md' },
      { title: 'Card', path: 'design-language/ontology/card.md' },
      { title: 'Dialog', path: 'design-language/ontology/dialog.md' },
      { title: 'Drawer', path: 'design-language/ontology/drawer.md' },
      { title: 'Field', path: 'design-language/ontology/field.md' },
      { title: 'Filterbar', path: 'design-language/ontology/filterbar.md' },
      { title: 'Main Content', path: 'design-language/ontology/main-content.md' },
      { title: 'Medallion', path: 'design-language/ontology/medallion.md' },
      { title: 'Menu', path: 'design-language/ontology/menu.md' },
      { title: 'Page Header', path: 'design-language/ontology/page-header.md' },
      { title: 'Section Header', path: 'design-language/ontology/section-header.md' },
      { title: 'Sheet', path: 'design-language/ontology/sheet.md' },
      { title: 'Statistic Card', path: 'design-language/ontology/statistic-card.md' },
      { title: 'Status', path: 'design-language/ontology/status.md' },
      { title: 'Table List', path: 'design-language/ontology/table-list.md' },
      { title: 'Tabs', path: 'design-language/ontology/tabs.md' },
      { title: 'Toolbar', path: 'design-language/ontology/toolbar.md' },
      { title: 'Components Index', path: 'design-language/components/README.md' },
    ],
    related: [
      { label: 'Patterns · Dashboard', to: '/docs/patterns/dashboard' },
      { label: 'Components catalog', to: '/docs/components/button' },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations & Composition',
    role: 'Tokens and how pieces nest, overflow, and reflow',
    howToUse: 'Drop here when implementing a settled layout.',
    navId: 'design-language-foundations',
    route: '/docs/design-language/foundations',
    topics: [
      { title: 'Borders', path: 'design-language/foundations/borders.md' },
      { title: 'Color', path: 'design-language/foundations/color.md' },
      { title: 'Corner Radius', path: 'design-language/foundations/corner-radius.md' },
      { title: 'Elevation', path: 'design-language/foundations/elevation.md' },
      { title: 'Grid', path: 'design-language/foundations/grid.md' },
      { title: 'Iconography', path: 'design-language/foundations/iconography.md' },
      { title: 'Motion', path: 'design-language/foundations/motion.md' },
      { title: 'Opacity', path: 'design-language/foundations/opacity.md' },
      { title: 'Shadows', path: 'design-language/foundations/shadows.md' },
      { title: 'Sizing', path: 'design-language/foundations/sizing.md' },
      { title: 'Spacing', path: 'design-language/foundations/spacing.md' },
      { title: 'Typography', path: 'design-language/foundations/typography.md' },
      { title: 'Alignment', path: 'design-language/composition/alignment.md' },
      { title: 'Density', path: 'design-language/composition/density.md' },
      { title: 'Grouping', path: 'design-language/composition/grouping.md' },
      { title: 'Hierarchy', path: 'design-language/composition/hierarchy.md' },
      { title: 'Nesting', path: 'design-language/composition/nesting.md' },
      { title: 'Overflow', path: 'design-language/composition/overflow.md' },
      { title: 'Proximity', path: 'design-language/composition/proximity.md' },
      { title: 'Responsive Layout', path: 'design-language/composition/responsive-layout.md' },
      { title: 'Visual Weight', path: 'design-language/composition/visual-weight.md' },
      { title: 'Whitespace', path: 'design-language/composition/whitespace.md' },
    ],
    related: [{ label: 'Foundations catalog', to: '/docs/foundations/color' }],
  },
  {
    id: 'interactions',
    label: 'Interactions & Accessibility',
    role: 'States people feel, plus inclusive requirements',
    howToUse: 'Specify control behavior and check access while designing—not after.',
    navId: 'design-language-interactions',
    route: '/docs/design-language/interactions',
    topics: [
      { title: 'Disabled', path: 'design-language/interactions/disabled.md' },
      { title: 'Drag Drop', path: 'design-language/interactions/drag-drop.md' },
      { title: 'Focus', path: 'design-language/interactions/focus.md' },
      { title: 'Hover', path: 'design-language/interactions/hover.md' },
      { title: 'Keyboard', path: 'design-language/interactions/keyboard.md' },
      { title: 'Loading', path: 'design-language/interactions/loading.md' },
      { title: 'Pressed', path: 'design-language/interactions/pressed.md' },
      { title: 'Selected', path: 'design-language/interactions/selected.md' },
      { title: 'Validation', path: 'design-language/interactions/validation.md' },
      { title: 'Action Spacing', path: 'design-language/accessibility/action-spacing.md' },
      { title: 'Color Contrast', path: 'design-language/accessibility/color-contrast.md' },
      { title: 'Focus Order', path: 'design-language/accessibility/focus-order.md' },
      { title: 'Forms', path: 'design-language/accessibility/forms.md' },
      { title: 'Headings', path: 'design-language/accessibility/headings.md' },
      { title: 'Screen Readers', path: 'design-language/accessibility/screen-readers.md' },
      { title: 'Semantics', path: 'design-language/accessibility/semantics.md' },
      { title: 'Touch Targets', path: 'design-language/accessibility/touch-targets.md' },
    ],
    related: [],
  },
  {
    id: 'examples',
    label: 'Anti-Patterns & Examples',
    role: 'Mistakes to avoid and worked references to prefer',
    howToUse: 'Skim when a layout is noisy, or when you learn faster from a screen.',
    navId: 'design-language-examples',
    route: '/docs/design-language/examples',
    topics: [
      { title: 'Accessibility Mistakes', path: 'design-language/anti-patterns/accessibility-mistakes.md' },
      { title: 'Layout Mistakes', path: 'design-language/anti-patterns/layout-mistakes.md' },
      { title: 'Radius Mistakes', path: 'design-language/anti-patterns/radius-mistakes.md' },
      { title: 'Spacing Mistakes', path: 'design-language/anti-patterns/spacing-mistakes.md' },
      { title: 'Visual Noise', path: 'design-language/anti-patterns/visual-noise.md' },
      { title: 'Before After', path: 'design-language/examples/before-after.md' },
      { title: 'Cards', path: 'design-language/examples/cards.md' },
      { title: 'Dashboards', path: 'design-language/examples/dashboards.md' },
      { title: 'Forms', path: 'design-language/examples/forms.md' },
      { title: 'Navigation', path: 'design-language/examples/navigation.md' },
      { title: 'Tables', path: 'design-language/examples/tables.md' },
    ],
    related: [
      { label: 'Patterns · Dashboard', to: '/docs/patterns/dashboard' },
      { label: 'AppShell demo', to: '/docs/getting-started/app-shell' },
    ],
  },
]

export const DESIGN_LANGUAGE_LAYER_BY_ID = Object.fromEntries(
  DESIGN_LANGUAGE_LAYERS.map((layer) => [layer.id, layer]),
) as Record<string, DesignLanguageLayer>

export function isDesignLanguageLayerId(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(DESIGN_LANGUAGE_LAYER_BY_ID, id)
}

export function resolveDesignLanguageRedirect(layerId: string): string | null {
  return DESIGN_LANGUAGE_REDIRECTS[layerId] ?? null
}
