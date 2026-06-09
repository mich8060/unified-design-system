import { Text } from '@chghealthcare/unified-design-system'
import type { ReadoutMonthContent } from '../types'

export const june2026Content: ReadoutMonthContent = {
  callout:
    'June focused on getting the system into the hands of more teams and ready for what is next: Praxis integrated the UDS into its concept work, we began training AI to understand what good design looks like at CHG, and we started preparing the system for Credentialing and AI squads to build on. The goal remains the same—one shared foundation so every product ships consistent, on-brand UI faster, including as AI-assisted development scales.',
  progressItems: [
    {
      inMotion: false,
      body: (
        <>
          <Text as="span" weight="semibold" appearance="primary">
            Praxis integrated the UDS
          </Text>{' '}
          into its workflows—an AI tool whose agents turn existing data into structured requirements,
          user stories, and committed Jira tickets, now grounded in our design system.
        </>
      ),
    },
    {
      inMotion: true,
      body: (
        <>
          <Text as="span" weight="semibold" appearance="primary">
            Training AI
          </Text>{' '}
          to be smarter about the design system—teaching it what good design looks like at CHG so
          AI-assisted work stays on-brand and consistent.
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
      inMotion: true,
      body: (
        <>
          Migrating the{' '}
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
      initiative: 'Design System to Code',
      status: 'Complete',
      outcome: 'React production baseline',
      milestone: 'Maintain & extend for new squads',
    },
    {
      initiative: 'Documents AISquad',
      status: 'Complete',
      outcome: 'Design → React pilot',
      milestone: 'Research-backed iteration (usability audits in flight)',
    },
    {
      initiative: 'Establish Governance',
      status: 'On Track',
      outcome: 'Contribution rules, UX gates, cross-functional ownership',
      milestone: 'Rules live and enforced on new work',
    },
    {
      initiative: 'Credentialing UDS readiness',
      status: 'Pending',
      outcome: 'DS ready for Credentialing workflows',
      milestone: 'Q2–Q3 readiness checkpoint',
    },
    {
      initiative: 'LocumSmart UDS readiness',
      status: 'Pending',
      outcome: 'DS ready for LocumSmart workflows',
      milestone: 'Sequenced after core UDS + capacity',
    },
    {
      initiative: 'Connect UDS readiness',
      status: 'Pending',
      outcome: 'DS ready for Connect workflows',
      milestone: 'Sequenced after core UDS + capacity',
    },
    {
      initiative: 'Partnership Model',
      status: 'At Risk',
      outcome: 'Clear ownership, standards, and scaling model',
      milestone: 'Resourcing decision needed',
    },
  ],
  roadmapEmbedUrl: '/roadmap/roadmap.html',
  roadmapDetailsSummary: (
    <>
      <p>
        The Partnership Model remains the primary risk and is unchanged from last month: the design
        system still has no named Product or Engineering partners, and one person spans both
        design-system design and engineering—so adoption work continues to compete with foundation
        delivery. The pending resourcing decision is still the gating item.
      </p>
      <p>
        LocumSmart and Connect UDS readiness stay pending, sequenced after core UDS work and
        capacity. Full risk breakdown and the specific unblock asks were reported in the May
        readout.
      </p>
    </>
  ),
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
      title: 'Complete the docs migration',
      body: (
        <>
          Finish moving the documentation site behind our security wall so the design system lives
          within CHG’s protected environment.
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
