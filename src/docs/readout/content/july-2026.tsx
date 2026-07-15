import { Text } from '@chghealthcare/unified-design-system'
import type { ReadoutMonthContent } from '../types'

export const july2026Content: ReadoutMonthContent = {
  callout:
    'July has been spent trying the Design System Language Data Model—the structured contract that describes our components, tokens, and patterns so AI and tooling understand what good design looks like at CHG. Alongside that work, we expanded Storybook coverage, established Figma token syncing, and continued preparing the system for Credentialing and AI squads to build on. The goal remains the same—one shared foundation so every product ships consistent, on-brand UI faster, including as AI-assisted development scales.',
  progressItems: [
    {
      inMotion: true,
      body: (
        <>
          <Text as="span" weight="semibold" appearance="primary">
            Design System Language Data Model
          </Text>
          —trying the structured contract that describes our components, tokens, and patterns so AI
          and tooling understand what good design looks like at CHG.
        </>
      ),
    },
    {
      inMotion: false,
      body: (
        <>
          Added{' '}
          <Text as="span" weight="semibold" appearance="primary">
            Storybook coverage
          </Text>{' '}
          for the full UDS component library—85 generated stories wired to UDS styles so teams can
          browse and validate every component in isolation.
        </>
      ),
    },
    {
      inMotion: false,
      body: (
        <>
          Established{' '}
          <Text as="span" weight="semibold" appearance="primary">
            Figma token syncing
          </Text>
          —consolidated the variable sync pipeline and documented canonical scripts so design tokens
          stay aligned between CSS and Figma.
        </>
      ),
    },
    {
      inMotion: true,
      body: (
        <>
          Expanding design system readiness efforts to support upcoming{' '}
          <Text as="span" weight="semibold" appearance="primary">
            Credentialing initiatives
          </Text>{' '}
          and future product adoption.
        </>
      ),
    },
    {
      inMotion: false,
      body: (
        <>
          Migrated the{' '}
          <Text as="span" weight="semibold" appearance="primary">
            documentation website
          </Text>{' '}
          behind our security wall so the design system lives within CHG&rsquo;s protected
          environment.
        </>
      ),
    },
    {
      inMotion: true,
      body: (
        <>
          In motion: preparing the UDS for AI squads to take and start developing with, finalizing
          partnership and intake paths with Product and Engineering, and preparing LocumSmart
          branding variants for the redesign program.
        </>
      ),
    },
  ],
  roadmapRows: [
    {
      initiative: 'Design System Language Data Model',
      status: 'On Track',
      outcome: 'Structured contract for components, tokens, and patterns that AI and tooling can consume',
      milestone: 'Validate with AI squads and engineering workflows',
    },
    {
      initiative: 'Establish Governance',
      status: 'In motion',
      outcome: 'Contribution rules, UX gates, cross-functional ownership',
      milestone: 'Rules live and enforced on new work',
    },
    {
      initiative: 'Credentialing UDS readiness',
      status: 'In motion',
      outcome: 'DS ready for Credentialing workflows',
      milestone: 'Q2–Q3 readiness checkpoint',
    },
    {
      initiative: 'Connect UDS readiness',
      status: 'In motion',
      outcome: 'DS ready for Connect workflows',
      milestone: 'Sequenced after core UDS + capacity',
    },
    {
      initiative: 'LocumSmart UDS readiness',
      status: 'Pending',
      outcome: 'DS ready for LocumSmart workflows',
      milestone: 'Sequenced after core UDS + capacity',
    },
    {
      initiative: 'Partnership Model',
      status: 'At Risk',
      outcome: 'Clear ownership, standards, and scaling model',
      milestone: 'Resourcing decision needed',
    },
  ],
  roadmapEmbedUrl: '/roadmap/embed.html',
  next30Cards: [
    {
      title: 'Credentialing UDS readiness',
      body: (
        <>
          Prepare the components, patterns, and tokens Credentialing needs and hit the Q2–Q3
          readiness checkpoint so the squad can build on the system without rework.
        </>
      ),
    },
    {
      title: 'Ready the UDS for AI squads',
      body: (
        <>
          Finish packaging components, tokens, and AI context so AI squads can pick up the system and
          start developing production screens directly on the shared foundation.
        </>
      ),
    },
    {
      title: 'Design System Language (DSL)',
      body: (
        <>
          Validate the Design System Language data model with AI squads and engineering workflows—
          harden the contracts for components, tokens, and patterns so tooling and AI-assisted
          development stay on-brand and consistent.
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
}
