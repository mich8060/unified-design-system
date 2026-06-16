import {
  Card,
  CardContent,
  Icon,
  Item,
  ItemContent,
  ItemMedia,
  Layout,
  Link,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from '@chghealthcare/unified-design-system'
import {
  docPageCalloutClassName,
  docPageMutedClassName,
  docPagePanelClassName,
  docPageProseClassName,
} from '../doc-page-content-classes'
import {
  type RoadmapStatusRow,
  RoadmapStatusBadge,
  roadmapStatusRows,
} from './roadmapStatus'
import { RoadmapLinkedRisks } from './RoadmapLinkedRisks'
import { ReadoutDocSection } from './ReadoutDocSection'
import type { ReadoutMonthContent } from './types'
import { withBasePath } from '../base-path'

const tableCellClass =
  'min-w-0 whitespace-normal break-words align-top px-2 py-2.5 text-sm leading-6 text-neutral-600 dark:text-neutral-300 sm:px-4 sm:py-4 md:px-6 md:py-5'

const tableHeadClass =
  'min-w-0 whitespace-normal break-words align-top px-2 py-2.5 text-left text-sm font-semibold text-neutral-500 dark:text-neutral-400 sm:px-4 sm:py-4 md:px-6 md:py-5'

const tableStatusCellClass =
  'whitespace-nowrap align-top px-2 py-2.5 text-right text-sm sm:px-3 sm:py-4 md:px-3 md:py-5'

const roadmapTableColumns = [
  'Initiative',
  'Outcome',
  'Next Milestone',
  'Status',
] as const

function RoadmapStatusSection({ rows }: { rows: RoadmapStatusRow[] }) {
  return (
    <div
      className={cn(
        docPagePanelClassName,
        'executive-roadmap-table w-full min-w-0 overflow-hidden p-0',
      )}
    >
      <Table className="w-full min-w-0 table-fixed text-balance">
        <colgroup>
          <col className="executive-roadmap-col-initiative" />
          <col className="executive-roadmap-col-outcome" />
          <col className="executive-roadmap-col-milestone" />
          <col className="executive-roadmap-col-status" />
        </colgroup>
        <TableHeader className="bg-neutral-50/80 dark:bg-neutral-900/50 [&_tr]:border-neutral-200 dark:[&_tr]:border-neutral-800">
          <TableRow>
            {roadmapTableColumns.map((label, index) => (
              <TableHead
                key={label}
                className={cn(tableHeadClass, index === 3 && 'text-right')}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr]:border-neutral-200 dark:[&_tr]:border-neutral-800">
          {rows.map((row) => (
            <TableRow key={row.initiative}>
              <TableCell
                className={cn(
                  tableCellClass,
                  'font-semibold text-neutral-900 dark:text-neutral-100',
                )}
              >
                {row.initiative}
              </TableCell>
              <TableCell className={tableCellClass}>{row.outcome}</TableCell>
              <TableCell className={tableCellClass}>{row.milestone}</TableCell>
              <TableCell className={tableStatusCellClass}>
                <RoadmapStatusBadge status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const whyThisMattersItems = [
  'Reduces rework across design and engineering',
  'Creates a shared system for consistent product delivery',
  'Accelerates speed to production across initiatives',
  'Establishes foundation for AI-assisted development',
] as const

function ExecutiveBulletList({
  items,
  className,
}: {
  items: readonly string[]
  className?: string
}) {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon
            name="CircleIcon"
            size={8}
            weight="fill"
            className="mt-1.5 size-2 shrink-0 text-[var(--uds-border-brand-primary)]"
            aria-hidden
          />
          <span className={cn(docPageProseClassName, 'min-w-0 flex-1')}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href)
}

export function ExecutiveOnePager({ content }: { content: ReadoutMonthContent }) {
  const roadmapRows = content.roadmapRows ?? roadmapStatusRows

  return (
    <>
      <div className={cn(docPageCalloutClassName, 'print:break-inside-avoid')}>
        <p className="text-sm leading-6 text-neutral-800 dark:text-neutral-200">{content.callout}</p>
      </div>

      <ReadoutDocSection title="Progress This Month">
        <div className="executive-progress-grid w-full">
          {content.progressItems.map((item, i) => (
            <div
              key={i}
              className={cn(
                docPagePanelClassName,
                'min-w-0',
                item.inMotion ? 'executive-progress-motion' : 'executive-progress-done',
              )}
            >
              <Item className="executive-progress-item h-full min-w-0 gap-3 p-4 sm:gap-4 sm:p-5">
                <ItemMedia variant="icon" className="shrink-0">
                  <span
                    className={cn(
                      'executive-progress-icon',
                      item.inMotion
                        ? 'executive-progress-icon--motion'
                        : 'executive-progress-icon--done',
                    )}
                    aria-hidden
                  >
                    <Icon
                      name={item.inMotion ? 'CaretRightIcon' : 'CheckIcon'}
                      size={14}
                      weight="bold"
                      color="#ffffff"
                    />
                  </span>
                </ItemMedia>
                <ItemContent className="min-w-0 flex-1">
                  <p className={docPageProseClassName}>{item.body}</p>
                </ItemContent>
              </Item>
            </div>
          ))}
        </div>
      </ReadoutDocSection>

      {content.showcaseTiles && content.showcaseTiles.length > 0 ? (
      <ReadoutDocSection title="Showcase" lead={content.showcaseIntro}>
        <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-5 lg:gap-6 [&>*]:min-w-0 [&>*]:flex-[1_1_240px]">
          {content.showcaseTiles.map((tile) => (
            <Card
              key={tile.href}
              className={cn(
                docPagePanelClassName,
                'executive-showcase-card overflow-hidden p-0 shadow-none transition-shadow print:break-inside-avoid hover:shadow-sm',
              )}
            >
              <Link
                href={withBasePath(tile.href)}
                external={isExternalHref(tile.href)}
                showExternalIcon={false}
                className="group text-inherit no-underline hover:text-inherit"
              >
                <Layout direction="col">
                  <div className="relative h-44 w-full shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 sm:h-48 md:h-52 lg:h-56">
                    <img
                      src={withBasePath(tile.img)}
                      alt=""
                      className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="border-t border-neutral-200 p-4 dark:border-neutral-800 sm:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 text-sm font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-[var(--uds-text-brand-primary)] dark:text-neutral-100">
                        {tile.title}
                      </p>
                      <Icon
                        name="ArrowUpRightIcon"
                        size={16}
                        weight="bold"
                        className="shrink-0 text-[var(--uds-text-brand-primary)] opacity-70 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                    <p className={cn(docPageMutedClassName, 'mt-1.5 sm:mt-2')}>{tile.desc}</p>
                  </CardContent>
                </Layout>
              </Link>
            </Card>
          ))}
        </div>
      </ReadoutDocSection>
      ) : null}

      <ReadoutDocSection title="Roadmap Status">
        <RoadmapStatusSection rows={roadmapRows} />
        {content.roadmapEmbedUrl ? (
          <div
            className={cn(
              docPagePanelClassName,
              'mt-4 overflow-hidden p-0 sm:mt-5 print:hidden',
            )}
          >
            <iframe
              src={content.roadmapEmbedUrl}
              title="Roadmap"
              loading="lazy"
              className="block h-[600px] w-full border-0"
            />
          </div>
        ) : null}
      </ReadoutDocSection>

      <RoadmapLinkedRisks summary={content.roadmapDetailsSummary} />

      <ReadoutDocSection title="Next 30 Days">
        <div className="flex flex-wrap gap-4 md:gap-6 [&>*]:min-w-0 [&>*]:flex-[1_1_280px] md:[&>*]:flex-1">
          {content.next30Cards.map((card) => (
            <div key={card.title} className={cn(docPagePanelClassName, 'p-4 sm:p-5 md:p-6')}>
              <p className={docPageProseClassName}>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {card.title}
                </span>{' '}
                – {card.body}
              </p>
            </div>
          ))}
        </div>
      </ReadoutDocSection>

      <Separator className="bg-neutral-200 dark:bg-neutral-800" decorative />

      <div className="executive-two-column-grid w-full print:break-inside-avoid">
        <ReadoutDocSection title="Why This Matters">
          <ExecutiveBulletList items={whyThisMattersItems} />
        </ReadoutDocSection>

        <ReadoutDocSection title="Value Snapshot">
          <div className="space-y-4 sm:space-y-5">
            {content.valueSnapshot.map((row) => (
              <div
                key={row.metric}
                className="border-b border-neutral-200 pb-3 dark:border-neutral-800"
              >
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {row.metric}
                </p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <p className={docPageMutedClassName}>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                      Target:
                    </span>{' '}
                    {row.target}
                  </p>
                  <p className="text-sm font-medium text-[var(--uds-color-accent-lime-600)]">
                    {row.current}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ReadoutDocSection>
      </div>

      {content.accomplishments && content.accomplishments.length > 0 ? (
        <ReadoutDocSection title={content.accomplishmentsTitle ?? 'Accomplishments'}>
          <ExecutiveBulletList items={content.accomplishments} />
        </ReadoutDocSection>
      ) : null}

      <ReadoutDocSection title="Reference">
        <div className="flex flex-wrap gap-3 sm:gap-4 [&>*]:min-w-0 [&>*]:flex-[1_1_280px]">
          <Card
            className={cn(
              docPagePanelClassName,
              'overflow-hidden p-0 transition-shadow hover:shadow-sm',
            )}
          >
            <Link
              href="https://www.figma.com/deck/LtEBjdROWti4uVL4WM0255"
              external
              showExternalIcon
              className="flex w-full p-4 text-sm font-semibold text-neutral-900 no-underline hover:text-[var(--uds-text-link-primary-hover)] dark:text-neutral-100 sm:p-5 md:p-6"
            >
              Impact Analysis v3
            </Link>
          </Card>
          <Card
            className={cn(
              docPagePanelClassName,
              'overflow-hidden p-0 transition-shadow hover:shadow-sm',
            )}
          >
            <Link
              href={withBasePath('/docs/introduction')}
              showExternalIcon={false}
              className="flex w-full p-4 text-sm font-semibold text-neutral-900 no-underline hover:text-[var(--uds-text-link-primary-hover)] dark:text-neutral-100 sm:p-5 md:p-6"
            >
              Unified DS Documentation
            </Link>
          </Card>
        </div>
      </ReadoutDocSection>

      <p className={cn(docPageMutedClassName, 'italic print:break-inside-avoid')}>
        *Questions? Contact Michael Stevens or Aaron Tate, Director of UX Experience Design.
      </p>

      <p className={cn(docPageMutedClassName, 'text-right font-semibold')}>CHG Healthcare</p>
    </>
  )
}
