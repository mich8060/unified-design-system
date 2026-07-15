import type { ReactNode } from 'react'
import { Layout, cn } from '@chghealthcare/unified-design-system'
import { docPageProseClassName } from '../doc-page-content-classes'
import type { RoadmapStatusRow } from './roadmapStatus'
import { RoadmapStatusBadge, roadmapRowsWithRiskDetail } from './roadmapStatus'
import { ReadoutDocSection } from './ReadoutDocSection'

type Props = {
  rows?: RoadmapStatusRow[]
  className?: string
  /** When provided, render a condensed summary instead of the full risk breakdown */
  summary?: ReactNode
}

export function RoadmapLinkedRisks({ rows, className = '', summary }: Props) {
  const riskRows = rows ?? roadmapRowsWithRiskDetail()
  const hasRiskCallouts = riskRows.length > 0

  if (summary) {
    return (
      <ReadoutDocSection
        title="Details"
        lead={
          <>
            Summary of{' '}
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Roadmap Status
            </span>{' '}
            risk items—full detail was reported in a prior month.
          </>
        }
        className={cn('print:break-inside-avoid', className)}
      >
        <div className="executive-risk-warning rounded-[length:var(--uds-radius-12)] py-3 pl-4 pr-3 sm:py-4 sm:pl-5 sm:pr-4">
          {hasRiskCallouts ? (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {riskRows.map((row) => (
                <div key={row.initiative} className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {row.initiative}
                  </h3>
                  <RoadmapStatusBadge status={row.status} />
                </div>
              ))}
            </div>
          ) : null}
          <div className={cn(docPageProseClassName, 'space-y-3')}>{summary}</div>
        </div>
      </ReadoutDocSection>
    )
  }

  const lead = hasRiskCallouts ? (
    <>
      Directly tied to <span className="font-semibold text-neutral-900 dark:text-neutral-100">Roadmap Status</span>{' '}
      items marked{' '}
      <span className="font-semibold text-neutral-900 dark:text-neutral-100">At Risk</span> (yellow),{' '}
      <span className="font-semibold text-neutral-900 dark:text-neutral-100">Blocked</span> (red), or{' '}
      <span className="font-semibold text-neutral-900 dark:text-neutral-100">Pending</span> (gray) below.
    </>
  ) : (
    <>
      Context for{' '}
      <span className="font-semibold text-neutral-900 dark:text-neutral-100">Roadmap Status</span>{' '}
      items that need more than the table shows.
    </>
  )

  return (
    <ReadoutDocSection title="Details" lead={lead} className={cn('print:break-inside-avoid', className)}>
      {hasRiskCallouts ? (
        <Layout direction="col" gap={5} className="sm:gap-6 md:gap-7">
          {riskRows.map((row) => {
            const isBlocked = row.status === 'Blocked'
            return (
              <div
                key={row.initiative}
                className={cn(
                  'rounded-[length:var(--uds-radius-12)] py-3 pl-4 pr-3 sm:py-4 sm:pl-5 sm:pr-4',
                  isBlocked ? 'executive-risk-error' : 'executive-risk-warning',
                )}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-3.5">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {row.initiative}
                  </h3>
                  <RoadmapStatusBadge status={row.status} />
                </div>

                {row.riskDetail ? (
                  <dl className="space-y-4">
                    <p className={docPageProseClassName}>
                      Building the Design System has three major phases: building the foundation,
                      building the organization around it, and maintenance and scaling. We&apos;re at
                      the point where the second phase can no longer wait — the decisions made now
                      about stewardship, partnership, and process will determine how far and how fast
                      the system can scale
                    </p>
                    <div>
                      <dt className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        What are the issues?
                      </dt>
                      <dd className={cn(docPageProseClassName, 'mt-2 space-y-3')}>
                        <p>
                          The design system has no named partners in Product or Engineering. Without
                          them, every adoption conversation, exception request, and contribution goes
                          through one person, which caps how fast the system can scale.
                        </p>
                        <p>
                          I am no longer alone on the team—UX Designer Casey Jennings and Principal
                          Designer Leo Vroegindewey are helping with the DSL, Figma-to-production
                          alignment, and AI-ready data contracts. That adds design capacity, but we still
                          do not have named partners in Product or Engineering.
                        </p>
                        <p>
                          Without Product and Engineering support, I am still caught between designer,
                          strategy, and developer roles. We still lack a dedicated developer to align the
                          codebase to CHG engineering standards—without that, foundation work and adoption
                          support keep competing for the same capacity.
                        </p>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        What is currently being done?
                      </dt>
                      <dd className={cn(docPageProseClassName, 'mt-2 space-y-3')}>
                        <p>
                          I now have UX Designer Casey Jennings assigned to help with the Design System
                          Language (DSL) and to align our Figma components to production.
                        </p>
                        <p>
                          Principal Designer Leo Vroegindewey has stepped in to help with the Design
                          System Language (DSL) data contracts and ensure they are easily consumable by
                          AI.
                        </p>
                        <p>
                          I met with Rachel Heitz to discuss what would help us unblock on the
                          Engineering side of things.
                        </p>
                        <p>
                          Surfacing capacity data to leadership so the depth-versus-breadth tradeoff is
                          explicit, and making the case for named Product and Engineering partners.
                        </p>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        What is needed to unblock?
                      </dt>
                      <dd className={cn(docPageProseClassName, 'mt-2 space-y-3')}>
                        <p className="italic">To enable the below, leadership needs to:</p>
                        <ul className="list-disc space-y-2 pl-6">
                          <li>
                            Name a Product partner and an Engineering partner to co-own intake,
                            prioritization, and technical review with the design system team.
                          </li>
                          <li>
                            Make a resourcing decision on dedicated system ownership and FTE
                            allocation.
                          </li>
                        </ul>
                        <p className="italic">From the Product Partner (some examples):</p>
                        <ul className="list-disc space-y-2 pl-6">
                          <li>
                            Help ensure design system components and adoption work are included in
                            upcoming product roadmaps. Surface the scoped component work during
                            planning conversations, so it gets sequenced alongside other priorities
                            rather than continually deferred.
                          </li>
                          <li>
                            Flag component needs early in feature scoping. When a squad is planning work
                            that will require UI patterns we don&apos;t have, loop in the design system
                            team before decisions are made to build custom.
                          </li>
                          <li>
                            Serve as the intake point for partner squads. Route adoption questions,
                            exception requests, and new component requests through a single path so the
                            design system team isn&apos;t chasing alignment across teams.
                          </li>
                        </ul>
                        <p className="italic">From the Engineering Partner (some examples):</p>
                        <ul className="list-disc space-y-2 pl-6">
                          <li>
                            Co-sign technical standards and review contributions. Give the design system
                            team a partner on the engineering side who can validate React patterns, API
                            decisions, and release practices before they ship.
                          </li>
                          <li>
                            Surface duplication across squads. When multiple teams are rebuilding the
                            same component, flag it so we can prioritize generalization instead of
                            letting drift continue.
                          </li>
                          <li>
                            Help squads use the system in new builds. Answer implementation questions
                            quickly so teams aren&apos;t blocked, and coach squads toward system-first
                            decisions in day-to-day build conversations.
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                ) : null}
              </div>
            )
          })}
        </Layout>
      ) : null}
    </ReadoutDocSection>
  )
}
