/**
 * Human-facing mini-articles for each Design Language hub page.
 */

export type DesignLanguageArticleTheme = {
  title: string
  body: string
}

export type DesignLanguageArticle = {
  summary: string
  intro: string[]
  when: string
  themes: DesignLanguageArticleTheme[]
  closing: string
}

export const DESIGN_LANGUAGE_ARTICLES: Record<string, DesignLanguageArticle> = {
  philosophy: {
    summary: 'Why UDS exists, and the tradeoffs we protect when screens get busy.',
    intro: [
      'Before tokens, components, or layout grids, Design Language starts with a point of view: CHG products should feel familiar to people who move between them, clear even when the work is data-heavy, and built from a shared system—not a new local convention on every page.',
      'Philosophy is the “why” you return to when two good-looking options disagree. It is also where the principles live: prefer tokens and components over one-off markup, treat accessibility as default, and let brand differences ride modes rather than custom paint.',
    ],
    when: 'Open this page when the problem is ambiguous, when a redesign is tempted by novelty, or when a debate is really about values (clarity vs density, system vs screen) rather than a single control.',
    themes: [
      {
        title: 'Recognition over novelty',
        body: 'People should recognize the product family, not relearn chrome. Familiar patterns beat clever one-offs.',
      },
      {
        title: 'Clarity over density',
        body: 'Operational tools can be rich—but hierarchy, spacing, and grouping have to keep the noise down.',
      },
      {
        title: 'System over screen',
        body: 'A screen is a composition of shared foundations and patterns. Local exceptions need a strong reason.',
      },
    ],
    closing:
      'Once the intent is clear, move into Design Physics for the universal “why this feels right,” then Semantics to name what the UI means.',
  },

  'design-physics': {
    summary: 'Universal forces behind good UI—proximity, weight, contrast, stability, and load.',
    intro: [
      'Design Physics explains why layouts feel ordered or chaotic before you ever pick a component. Things that belong together sit closer. Important actions carry more visual weight. Navigation stays put. Motion keeps identity so people do not lose their place.',
      'These ideas are product-agnostic. Brand color does not invent proximity; tokens and components express physics that already have to be true.',
    ],
    when: 'Use this page when a screen feels “off” but you cannot yet name the bug—or when you need a durable reason that survives brand and theme changes.',
    themes: [
      {
        title: 'Group with space and sameness',
        body: 'Proximity and common region tell people what belongs together without a heavy box around every group.',
      },
      {
        title: 'Weight and contrast guide the eye',
        body: 'Emphasis is earned. Contrast makes the next action discoverable; everything bold is the same as nothing bold.',
      },
      {
        title: 'Stability and load',
        body: 'Keep navigation spatially stable. Respect cognitive load and choice complexity—more options slow decisions.',
      },
    ],
    closing:
      'Physics gives you the forces. Semantics turns them into meaning for CHG product UI—hierarchy, density, intent, and shell containment.',
  },

  semantics: {
    summary: 'What the interface means: hierarchy, density, intent, affordance, and shell rules.',
    intro: [
      'Semantics is the vocabulary of meaning. A page title is not just larger type—it is the only headline at that level. Density is not “make it smaller”; it is a deliberate choice about how much information a region can carry.',
      'This is also where shell-specific meaning lives: the body canvas stays secondary so cards can be primary; MainContent chooses edge or fixed containment and sticks with it; listview drives Main when the collection changes the detail.',
    ],
    when: 'Reach for Semantics when you know the layout “shape” but need to name the rules—or when AI and humans need shared language before composing components.',
    themes: [
      {
        title: 'Hierarchy and readability',
        body: 'Only the page title sits at the top of the type ladder. Sections stay quieter so people can scan.',
      },
      {
        title: 'Density and whitespace',
        body: 'Dense queues and airy settings pages are both valid—if the density matches the job and the spacing still reads as grouped.',
      },
      {
        title: 'Shell meaning',
        body: 'AppShell regions, toolbar slots, and right-side inspectors are semantic contracts, not decorative chrome.',
      },
    ],
    closing:
      'With meaning named, Grammar & relationships checks whether the composition is allowed—and whether scales stay coherent.',
  },

  grammar: {
    summary: 'Valid shell regions plus the scales that keep spacing, type, and radius in family.',
    intro: [
      'Grammar asks whether the sentence is legal. Authenticated product UI defaults to AppShell with Menu in the menu slot and content in Main. Listview is for collections that drive the detail. A right sheet is for more about something already in Main—not a second navigation rail.',
      'Relationships are the ligaments: spacing, typography, radius, and elevation sit on scales. Nested radius tightens with depth. Visual rhythm is the beat people feel even if they never name it.',
    ],
    when: 'Check this page before inventing a custom split, before putting branding in the rail, or when something feels inconsistent across a screen.',
    themes: [
      {
        title: 'Regions have jobs',
        body: 'Header, menu, listview, main, and overlays each answer a different question. Borrowing the wrong region creates confusion.',
      },
      {
        title: 'Containment stays consistent',
        body: 'Edge vs fixed MainContent is an app-level choice. Mixing modes route-to-route breaks the mental model.',
      },
      {
        title: 'Scales stay relative',
        body: 'Jumping two steps on spacing or type for a small content change usually breaks rhythm. Same hierarchy level, same radius.',
      },
    ],
    closing:
      'When the sentence is valid and the scales hold, Decision rules help you choose among legal options.',
  },

  'decision-rules': {
    summary: 'How to choose when several good options are still on the table.',
    intro: [
      'Decision rules sit between “this is allowed” and “this is the pattern we ship.” Choosing guides walk you through spacing, elevation, radius, layout, components, and screen patterns. Decision trees go further for recurring forks—forms, tables, dialogs, empty states, navigation, and more.',
      'The goal is not bureaucracy. It is to make the same call tomorrow that you made yesterday, so products stay coherent as teams and AI assistants scale.',
    ],
    when: 'Open this page when Grammar says yes to more than one approach, or when a PR review keeps rediscovering the same debate.',
    themes: [
      {
        title: 'Choosing guides',
        body: 'Start with choosing-patterns and choosing-components when the screen type is unclear; use spacing, radius, and elevation choosers for local polish.',
      },
      {
        title: 'Trees for common forks',
        body: 'Tables vs lists, dialog vs sheet, empty-state content—trees encode the questions in order so you do not skip a constraint.',
      },
      {
        title: 'Confidence labels',
        body: 'Required vs Strong Recommendation vs Optional tells you how hard a rule should push back in review.',
      },
    ],
    closing:
      'After you choose, Patterns & ontology describe the recipe and the component knowledge you will actually compose.',
  },

  patterns: {
    summary: 'Screen-level recipes and the component knowledge that fills them.',
    intro: [
      'Patterns answer “what kind of page is this?” A settings form, a master–detail queue, a workspace dashboard, and a dense data table each have anatomy. Screen-layout patterns keep teams from defaulting to a stack of full-width cards.',
      'Ontology treats components as knowledge objects: what they are for, what they require, and what “wrong” looks like. A Badge hugs its label; a PageHeader never hosts the global search in its actions. The thin Components index points into the runtime catalog—reason here, implement there.',
    ],
    when: 'Pick a pattern after Decision rules, before placing Cards. Read ontology when a review is really “this component is doing the wrong job.”',
    themes: [
      {
        title: 'Screen layout patterns',
        body: 'Named layouts for common product jobs—use them as the skeleton before decorating with components.',
      },
      {
        title: 'FAIL rules',
        body: 'Concrete anti-uses (full-width badges, SearchInput in PageHeaderActions, skinny full-width feeds) keep reviews short.',
      },
      {
        title: 'Handoff to the catalog',
        body: 'Props, variants, and demos live in the Components section of this site—not duplicated as a second library.',
      },
    ],
    closing:
      'For token scales and nesting craft, continue to Foundations & composition. For APIs and previews, jump to the Components catalog.',
  },

  foundations: {
    summary: 'Token materials and how pieces nest, overflow, and reflow together.',
    intro: [
      'Foundations are the materials. Spacing steps, type sizes, corner radius (never above 12px on rectangles), elevation, and color ramps show up as `--uds-*` tokens. This site’s Foundations catalog shows those scales in context.',
      'Composition is the craft layer: nesting depth changes radius; overflow must not clip meaning; groups form with proximity; responsive layout reflows without inventing a second information architecture.',
    ],
    when: 'Open this page when implementing a decided layout, aligning custom CSS to tokens, or fixing stretched voids and clipped rows.',
    themes: [
      {
        title: 'Tokens before values',
        body: 'Prefer semantic variables and component variants over hard-coded color and spacing.',
      },
      {
        title: 'Nesting and overflow',
        body: 'Depth tightens chrome; clipping content is a fail. Prefer scroll regions with clear jobs.',
      },
      {
        title: 'Responsive without reinvention',
        body: 'Breakpoints change density and columns—they should not invent a new product IA mid-resize.',
      },
    ],
    closing:
      'Static assembly is only half the story. Interactions & accessibility cover how controls feel—and who can use them.',
  },

  interactions: {
    summary: 'States people can feel, plus inclusive requirements that are part of the design.',
    intro: [
      'Interactions make the interface answer back. Focus rings are how keyboard users know where they are. Loading should preserve layout. Disabled must look unavailable without becoming mysterious. Validation explains what to fix.',
      'Accessibility is not a late audit. Contrast, touch targets, heading structure, form labeling, and screen-reader semantics are how the product stays usable—including when AI generates the first draft of a screen.',
    ],
    when: 'Use this page while specifying control behavior, reviewing keyboard paths, or checking forms and custom controls.',
    themes: [
      {
        title: 'Focus and keyboard',
        body: 'Every interactive path needs a visible, logical focus order—not only a mouse hover.',
      },
      {
        title: 'Transient vs sticky state',
        body: 'Hover is temporary; selected and disabled communicate lasting availability.',
      },
      {
        title: 'Perceive and operate',
        body: 'Color is never the only signal. Targets stay hittable. Labels and roles match what people see.',
      },
    ],
    closing:
      'When something repeatedly goes wrong, Anti-patterns & examples names the mistake—and points at references that got it right.',
  },

  examples: {
    summary: 'Named mistakes to avoid, and worked examples that show the language in context.',
    intro: [
      'Anti-patterns are the short list of “please don’t.” Layout that invents a second shell. Radius that balloons past 12px. Spacing that collapses hierarchy. Visual noise that treats every region like a billboard.',
      'Examples are not a second component library. They point at forms, tables, dashboards, navigation, and before/after notes—plus demos on this site—so you can match a job, not just a widget.',
    ],
    when: 'Skim when a layout is noisy, when a PR introduces custom chrome, or when you learn faster from a screen than from a rule.',
    themes: [
      {
        title: 'Layout and noise',
        body: 'Extra boxes, competing primaries, and full-width skinny stacks are usually pattern or grammar misses.',
      },
      {
        title: 'Spacing and radius',
        body: 'Ad-hoc gaps and oversized corners fight the scales Foundations & relationships already define.',
      },
      {
        title: 'Prefer a reference',
        body: 'Use before/after notes and live demos when explaining a change or onboarding someone new.',
      },
    ],
    closing:
      'When you are ready to build, return to Overview for the reasoning order—or jump straight to the pattern and components you chose.',
  },
}
