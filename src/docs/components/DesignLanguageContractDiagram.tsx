import { Text } from '@chghealthcare/unified-design-system'

/**
 * Conceptual map: Design Language (why/when) + Runtime Contract (what/how)
 * → consistent product experiences. Uses UDS tokens and Text only.
 */
export function DesignLanguageContractDiagram() {
  return (
    <figure
      className="not-prose m-0 flex w-full min-w-0 flex-col items-center gap-0 rounded-[length:var(--uds-radius-12)] bg-[var(--uds-surface-secondary)] px-[length:var(--uds-spacing-48)] py-[length:var(--uds-spacing-80)]"
      aria-labelledby="dsl-contract-diagram-title"
    >
      <figcaption id="dsl-contract-diagram-title" className="sr-only">
        Design Language covers why and when; Runtime Contract covers what and how; together they produce
        consistent product experiences.
      </figcaption>

      <div className="flex w-full min-w-0 flex-col items-stretch gap-[length:var(--uds-gap-16)] sm:flex-row sm:items-center sm:justify-center sm:gap-[length:var(--uds-gap-24)]">
        <div
          className="flex min-h-[140px] min-w-0 flex-1 flex-col items-center justify-center gap-[length:var(--uds-gap-8)] rounded-[length:var(--uds-radius-12)] border-2 border-[var(--uds-color-primary-500)] bg-[var(--uds-surface-primary)] px-[length:var(--uds-spacing-24)] py-[length:var(--uds-spacing-24)] text-center"
          data-diagram-node="design-language"
        >
          <Text variant="body" size="14" weight="regular" appearance="primary" className="m-0">
            Design Language
          </Text>
          <Text
            variant="heading"
            size="24"
            weight="bold"
            className="m-0 text-[var(--uds-color-primary-600)]"
          >
            Why + When
          </Text>
          <Text variant="body" size="14" weight="regular" appearance="secondary" className="m-0">
            Intent and composition
          </Text>
        </div>

        <div
          className="flex size-11 shrink-0 items-center justify-center self-center rounded-[9999px] border border-uds-border-primary bg-[var(--uds-surface-primary)]"
          aria-hidden
        >
          <Text
            variant="heading"
            size="28"
            weight="regular"
            appearance="primary"
            className="relative top-[-2px] m-0 leading-none"
          >
            +
          </Text>
        </div>

        <div
          className="flex min-h-[140px] min-w-0 flex-1 flex-col items-center justify-center gap-[length:var(--uds-gap-8)] rounded-[length:var(--uds-radius-12)] border-2 border-[var(--uds-color-accent-cyan-500)] bg-[var(--uds-surface-primary)] px-[length:var(--uds-spacing-24)] py-[length:var(--uds-spacing-24)] text-center"
          data-diagram-node="runtime-contract"
        >
          <Text variant="body" size="14" weight="regular" appearance="primary" className="m-0">
            Runtime Contract
          </Text>
          <Text
            variant="heading"
            size="24"
            weight="bold"
            className="m-0 text-[var(--uds-color-accent-cyan-600)]"
          >
            What + How
          </Text>
          <Text variant="body" size="14" weight="regular" appearance="secondary" className="m-0">
            Components and APIs
          </Text>
        </div>
      </div>

      {/* Converging connector — CSS only, token colors */}
      <div className="relative flex h-10 w-full max-w-md items-end justify-center" aria-hidden>
        <div className="absolute left-1/4 top-0 h-4 w-[2px] -translate-x-1/2 bg-[var(--uds-color-primary-500)] sm:left-[calc(25%+0.5rem)]" />
        <div className="absolute right-1/4 top-0 h-4 w-[2px] translate-x-1/2 bg-[var(--uds-color-accent-cyan-500)] sm:right-[calc(25%+0.5rem)]" />
        <div className="absolute left-1/4 right-1/4 top-4 h-[2px] bg-[linear-gradient(to_right,var(--uds-color-primary-500),var(--uds-color-accent-cyan-500))] sm:left-[calc(25%+0.5rem)] sm:right-[calc(25%+0.5rem)]" />
        <div className="absolute left-1/2 top-4 h-6 w-[2px] -translate-x-1/2 bg-[var(--uds-border-primary)]" />
      </div>

      <div
        className="flex w-full max-w-xl items-center justify-center rounded-[length:var(--uds-radius-12)] border-2 border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] px-[length:var(--uds-spacing-24)] py-[length:var(--uds-spacing-16)] text-center"
        data-diagram-node="outcome"
      >
        <Text variant="body" size="16" weight="medium" appearance="primary" className="m-0">
          Consistent product experiences
        </Text>
      </div>
    </figure>
  )
}
