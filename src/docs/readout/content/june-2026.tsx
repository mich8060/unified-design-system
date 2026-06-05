import { Text } from '@chghealthcare/unified-design-system'
import type { ReadoutMonthContent } from '../types'

export const june2026Content: ReadoutMonthContent = {
  callout:
    'June focused on making the system easier to adopt and easier to communicate: shipping complex components, publishing monthly readouts in the docs site, and tightening the loop between design, documentation, and Engineering. The goal remains the same—one shared foundation so every product ships consistent, on-brand UI faster, including as AI-assisted development scales.',
  progressItems: [
    {
      inMotion: false,
      body: (
        <>
          Published the Design System readout in the unified documentation site with a monthly archive,
          so leadership and partner teams can review progress without a separate deck or export.
        </>
      ),
    },
    {
      inMotion: false,
      body: (
        <>
          Expanded the React library with{' '}
          <Text as="span" weight="semibold" appearance="primary">
            complex patterns
          </Text>{' '}
          (data display, navigation modules, and form compositions) that squads need for production
          screens—not only atomic controls.
        </>
      ),
    },
    {
      inMotion: false,
      body: (
        <>
          Continued Documents AI Squad pilot support: Engineering integration for additional screens and
          alignment on which patterns stay canonical in the package versus squad-specific extensions.
        </>
      ),
    },
    {
      inMotion: true,
      body: (
        <>
          In motion: onboarding the next 1–2 squads, finalizing partnership and intake paths with
          Product and Engineering, and preparing LocumSmart branding variants for the redesign
          program.
        </>
      ),
    },
  ],
  showcaseIntro:
    'Highlights from June—what shipped in the library, where teams can see it live, and how the docs site now carries the monthly executive readout.',
  showcaseTiles: [
    {
      href: '/docs/readout',
      img: '/showcase/uds-accent-colors-documentation.png',
      title: 'Readout in the docs site',
      desc: 'Monthly updates live beside the component library so partners always have a current summary and an archive of prior months.',
    },
    {
      href: '/docs/components/table',
      img: '/showcase/button-component-documentation.png',
      title: 'Complex components in the library',
      desc: 'Table, modules, and composed patterns teams can adopt without rebuilding product chrome from scratch.',
    },
    {
      href: 'https://documents-aisquad.vercel.app/',
      img: '/showcase/documents-aisquad-pilot.png',
      title: 'Documents AI Squad pilot UI',
      desc: 'Ongoing pilot screens that validate design-to-code delivery under production constraints.',
    },
  ],
  next30Cards: [
    {
      title: 'Close partnership and intake model',
      body: (
        <>
          Name Product and Engineering partners, publish intake and exception paths, and run the first
          operating cadence so adoption does not bottleneck on a single owner.
        </>
      ),
    },
    {
      title: 'LocumSmart branding + complex components',
      body: (
        <>
          Deliver divisional brand variants and the composite components the redesign needs before
          wide rollout.
        </>
      ),
    },
    {
      title: 'Scale squad onboarding',
      body: (
        <>
          Run structured onboarding for the next squads with clear “system-first” milestones and
          measurable component reuse in their roadmaps.
        </>
      ),
    },
  ],
  valueSnapshot: [
    { metric: 'Components in production', target: 'Full library', current: 'Complex patterns added' },
    { metric: 'Active teams using DS', target: 'All initiatives', current: 'Pilot + onboarding' },
    { metric: 'Engineering capacity freed', target: '20.5 FTEs', current: 'Projected' },
    { metric: 'UX capacity freed', target: '4.9 FTEs', current: 'Projected' },
    { metric: 'Design → Build cycle time', target: '-50%', current: 'Improving' },
  ],
  accomplishmentsTitle: 'Accomplishments in 2025 and Q1–Q2 2026',
  accomplishments: [
    'Built shared infrastructure that lets us ship UI across CompHealth, Weatherby, and LocumSmart without rebuilding from scratch each time',
    'Created a triage model that routes design work by business impact — so high-priority initiatives get speed, and lower-priority work gets efficiency',
    'Accelerated S&P launch by an estimated 3 weeks by reusing pre-built components instead of designing from zero',
    'Positioned our design system as the UI layer for AI squad delivery in SE/FSP — so AISquads can ship faster without design becoming a bottleneck',
    'Eliminated the gap between design and code — components built once in Figma now ship directly as production-ready React, cutting rework between design and engineering',
    'Launched monthly readouts in the unified documentation site so progress is visible without a separate presentation artifact',
  ],
}
