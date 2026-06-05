import { Text } from '@chghealthcare/unified-design-system'
import type { ReadoutMonthContent } from '../types'

export const may2026Content: ReadoutMonthContent = {
  callout:
    "The Design System is CHG's shared foundation for efficiently building software at scale — the standards and components that keep every product consistent, intuitive, and on-brand. Common UI elements like buttons, forms, and search experiences are built once and used everywhere. As AI-powered development becomes the norm, the Design System is a critical layer that keeps every AI-produced experience consistent, trustworthy, and ready to ship while reducing the need for extensive re-work.",
  progressItems: [
    {
      inMotion: false,
      body: (
        <>
          Delivered initial 79 React component patterns to Engineering. These components are now ready
          for integration into the Documents AI Squad pilot and are available for other squad/product
          teams to adopt in upcoming sprints.
        </>
      ),
    },
    {
      inMotion: false,
      body: (
        <>
          Validated with Engineering our approach for UX-authored React components, enabling the UX
          team to build components to 60–80% of the UI layer upfront. This offloads foundational
          component work from{' '}
          <Text as="span" weight="semibold" appearance="primary">
            under-capacity
          </Text>{' '}
          Engineering teams and shortens the path from design to deployment.
        </>
      ),
    },
    {
      inMotion: false,
      body: (
        <>
          Advanced Documents AI Squad pilot from concept and research to production-ready UI using the
          design-to-code workflow, proving out 20 components in production conditions and establishing
          the adoption pattern for future squad/product teams to follow.
        </>
      ),
    },
    {
      inMotion: true,
      body: (
        <>
          In motion: expanding the component library from simple to complex components by the end of
          July and onboarding 1–2 squads with product partner alignment to ensure prioritization and
          adoption.
        </>
      ),
    },
  ],
  showcaseIntro:
    'A quick visual pass at what shipped this period—new patterns in the library, product UI from the pilot, and where to explore the system itself—so the Design System feels tangible, not abstract.',
  showcaseTiles: [
    {
      href: '/docs/getting-started/app-shell',
      img: '/showcase/button-component-documentation.png',
      title: 'New React patterns in the library',
      desc: 'Production-ready components teams can pull into upcoming sprints—patterns you can see in code, not just on a slide.',
    },
    {
      href: 'https://documents-aisquad.vercel.app/',
      img: '/showcase/documents-aisquad-pilot.png',
      title: 'Documents AI Squad pilot UI',
      desc: 'Design-to-code workflow showing up as real screens—proof the system can carry a squad from research to production-ready UI.',
    },
    {
      href: '/docs/foundations/colors',
      img: '/showcase/uds-accent-colors-documentation.png',
      title: 'The library, end to end',
      desc: 'Documentation and token layer that make the system legible for partners who need to understand scope, reuse, and where to plug in.',
    },
  ],
  next30Cards: [
    {
      title: 'Expand Production-Ready React Component Library',
      body: (
        <>
          Complete transition from an in-house design system to a Shadcn/Tailwind framework, aligning
          with widely adopted frameworks that AI can more easily understand and generate against,
          enabling faster development and scalable growth.
        </>
      ),
    },
    {
      title: 'Support Documents Initiative Implementation',
      body: (
        <>
          Shifting from build and design to supporting DS and UX implementation with Engineering to
          ensure successful hand-off.
        </>
      ),
    },
    {
      title: 'Prepare Design System for LocumSmart Integration',
      body: (
        <>
          Ensure divisional branding identity variant of the DS is prepared, including creating complex
          components for the redesign.
        </>
      ),
    },
  ],
  valueSnapshot: [
    { metric: 'Components in production', target: 'Full library', current: 'Growing baseline' },
    { metric: 'Active teams using DS', target: 'All initiatives', current: 'Early adoption' },
    { metric: 'Engineering capacity freed', target: '20.5 FTEs', current: 'Projected' },
    { metric: 'UX capacity freed', target: '4.9 FTEs', current: 'Projected' },
    { metric: 'Design → Build cycle time', target: '-50%', current: 'Improving' },
  ],
  accomplishmentsTitle: 'Accomplishments in 2025 and Q1 2026',
  accomplishments: [
    'Built shared infrastructure that lets us ship UI across CompHealth, Weatherby, and LocumSmart without rebuilding from scratch each time',
    'Created a triage model that routes design work by business impact — so high-priority initiatives get speed, and lower-priority work gets efficiency',
    'Accelerated S&P launch by an estimated 3 weeks by reusing pre-built components instead of designing from zero',
    'Positioned our design system as the UI layer for AI squad delivery in SE/FSP — so AISquads can ship faster without design becoming a bottleneck',
    'Eliminated the gap between design and code — components built once in Figma now ship directly as production-ready React, cutting rework between design and engineering',
  ],
}
