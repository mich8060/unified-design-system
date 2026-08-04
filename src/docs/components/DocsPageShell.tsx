import type { ComponentProps, ReactNode } from 'react'
import {
  MainContent,
  MainStack,
  PageHeader,
  PageHeaderActions,
  PageHeaderBody,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderEyebrow,
  PageHeaderNav,
  PageHeaderTitle,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderDescription,
  SectionHeaderTitle,
} from '@chghealthcare/unified-design-system'
import { cn } from '@/lib/utils'

type DocsPageShellProps = {
  /** Overline above the title (e.g. Components, Foundations). */
  eyebrow?: string
  title: string
  description?: ReactNode
  /** Breadcrumb row for `PageHeaderNav`. */
  breadcrumb?: ReactNode
  /** Trailing actions in `PageHeaderBody` (e.g. CTAs). */
  actions?: ReactNode
  /**
   * Where actions sit relative to the title stack.
   * `below` places them under the description with 24px gap.
   */
  actionsPlacement?: 'trailing' | 'below'
  children: ReactNode
  /**
   * Spans the full fixed primary panel (1280px), not the 1000px reading column.
   * Renders after `children` and before `afterBleed`.
   */
  panelBleed?: ReactNode
  /** Reading-column content below `panelBleed` (also capped at 1000px). */
  afterBleed?: ReactNode
}

const docsReadingColumnClassName =
  'box-border w-full min-w-0 max-w-[length:var(--uds-container-main)] px-[length:var(--uds-spacing-48)]'

/**
 * Canonical docs chrome: block expanded PageHeader + fixed expanded MainContent / MainStack.
 * Matches the Accordion documentation page layout.
 */
export function DocsPageShell({
  eyebrow,
  title,
  description,
  breadcrumb,
  actions,
  actionsPlacement = 'trailing',
  children,
  panelBleed,
  afterBleed,
}: DocsPageShellProps) {
  return (
    <>
      <PageHeader
        layout="block"
        appearance="expanded"
        actionsPlacement={actionsPlacement}
      >
        {breadcrumb ? <PageHeaderNav>{breadcrumb}</PageHeaderNav> : null}
        <PageHeaderBody>
          <PageHeaderContent>
            {eyebrow ? <PageHeaderEyebrow>{eyebrow}</PageHeaderEyebrow> : null}
            <PageHeaderTitle>{title}</PageHeaderTitle>
            {description ? (
              <PageHeaderDescription>{description}</PageHeaderDescription>
            ) : null}
          </PageHeaderContent>
          {actions ? <PageHeaderActions>{actions}</PageHeaderActions> : null}
        </PageHeaderBody>
      </PageHeader>

      <MainContent
        containment="fixed"
        appearance="expanded"
        className={
          panelBleed
            ? '[&_[data-slot=main-content-inner]]:max-w-none [&_[data-slot=main-content-inner]]:p-0'
            : undefined
        }
      >
        {panelBleed ? (
          <div className="flex w-full min-w-0 flex-col gap-[length:calc(var(--uds-spacing-48)+var(--uds-spacing-24))] py-[length:var(--uds-spacing-48)]">
            <div className={docsReadingColumnClassName}>
              <MainStack appearance="expanded">{children}</MainStack>
            </div>
            <div className="box-border w-full min-w-0 px-[length:var(--uds-spacing-48)]">
              {panelBleed}
            </div>
            {afterBleed ? (
              <div className={docsReadingColumnClassName}>
                <MainStack appearance="expanded">{afterBleed}</MainStack>
              </div>
            ) : null}
          </div>
        ) : (
          <MainStack appearance="expanded">{children}</MainStack>
        )}
      </MainContent>
    </>
  )
}

/** First-level docs section: SectionHeader (body/20/semibold h2) + inner 16px stack. */
export function DocsPageSection({
  title,
  description,
  children,
}: {
  title: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
      <SectionHeader>
        <SectionHeaderContent>
          <SectionHeaderTitle>{title}</SectionHeaderTitle>
          {description ? (
            <SectionHeaderDescription>{description}</SectionHeaderDescription>
          ) : null}
        </SectionHeaderContent>
      </SectionHeader>
      {children}
    </section>
  )
}

/** Demo stage on the fixed primary panel — UDS tokens (≤12 radius, 16 inset). */
export function DocsExampleStage({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "box-border w-full min-w-0 rounded-[length:var(--uds-radius-8)] border border-uds-border-primary bg-[var(--uds-surface-secondary)] p-[length:var(--uds-spacing-16)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
