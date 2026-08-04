import { ArrowUpIcon, Text } from '@chghealthcare/unified-design-system'

const LAYERS = [
  { label: 'Philosophy & principles', width: '42%', color: 'var(--uds-color-accent-violet-600)' },
  { label: 'Design physics', width: '52%', color: 'var(--uds-color-accent-indigo-600)' },
  { label: 'Semantics', width: '62%', color: 'var(--uds-color-accent-blue-600)' },
  { label: 'Grammar', width: '72%', color: 'var(--uds-color-accent-sky-600)' },
  { label: 'Decision rules', width: '82%', color: 'var(--uds-color-accent-cyan-600)' },
  { label: 'Patterns & ontology', width: '90%', color: 'var(--uds-color-accent-aqua-500)' },
  { label: 'Foundations & examples', width: '100%', color: 'var(--uds-color-accent-aqua-600)' },
] as const

/**
 * Knowledge-layer pyramid for the Design Language docs page.
 * Dependencies point downward; annotations match DSL reasoning direction.
 */
export function DesignLanguageLayersDiagram() {
  return (
    <figure
      className="not-prose m-0 flex w-full min-w-0 flex-col items-center gap-[length:var(--uds-gap-24)] rounded-[length:var(--uds-radius-12)] bg-[var(--uds-surface-secondary)] px-[length:var(--uds-spacing-24)] py-[length:var(--uds-spacing-48)] sm:px-[length:var(--uds-spacing-48)]"
      aria-labelledby="dsl-layers-diagram-title"
    >
      <figcaption id="dsl-layers-diagram-title" className="sr-only">
        Design Language knowledge layers form a pyramid from philosophy at the top to foundations and
        examples at the base. Start high when ambiguous; move down to implement. Each layer depends on
        the layers below it.
      </figcaption>

      <div className="flex w-full max-w-3xl flex-col items-stretch gap-[length:var(--uds-gap-16)] lg:flex-row lg:items-center lg:gap-[length:var(--uds-gap-24)]">
        <aside className="hidden min-w-0 shrink-0 flex-col items-center justify-center gap-[length:var(--uds-gap-12)] lg:flex lg:w-[7.5rem]">
          <div
            className="flex h-40 flex-col items-center justify-center gap-0"
            style={{ color: 'var(--uds-color-accent-violet-600)' }}
            aria-hidden
          >
            <ArrowUpIcon size={20} weight="bold" className="-mb-1.5 shrink-0" />
            <div className="w-[2px] flex-1 rounded-full bg-current" />
          </div>
          <Text
            variant="body"
            size="14"
            weight="medium"
            appearance="primary"
            className="m-0 max-w-[7.5rem] text-center"
          >
            Start high when ambiguous
          </Text>
        </aside>

        <ol className="m-0 flex w-full min-w-0 list-none flex-col items-center gap-[length:var(--uds-gap-8)] p-0">
          {LAYERS.map((layer) => (
            <li
              key={layer.label}
              className="flex min-h-11 items-center justify-center px-[length:var(--uds-spacing-16)] py-[length:var(--uds-spacing-12)] text-center"
              style={{
                width: layer.width,
                maxWidth: '100%',
                backgroundColor: layer.color,
                borderRadius: 'var(--uds-radius-12)',
              }}
            >
              <Text
                variant="body"
                size="14"
                weight="bold"
                className="m-0 text-[var(--system-color-white)]"
              >
                {layer.label}
              </Text>
            </li>
          ))}
        </ol>

        <aside className="hidden min-w-0 shrink-0 flex-col items-center justify-center gap-[length:var(--uds-gap-12)] lg:flex lg:w-[7.5rem]">
          <div
            className="flex h-40 flex-col items-center justify-center gap-0"
            style={{ color: 'var(--uds-color-accent-aqua-600)' }}
            aria-hidden
          >
            <div className="w-[2px] flex-1 rounded-full bg-current" />
            <ArrowUpIcon size={20} weight="bold" className="-mt-1.5 shrink-0 rotate-180" />
          </div>
          <Text
            variant="body"
            size="14"
            weight="medium"
            appearance="primary"
            className="m-0 max-w-[7.5rem] text-center"
          >
            Move down to implement
          </Text>
        </aside>
      </div>

      <div className="flex w-full flex-col items-center gap-[length:var(--uds-gap-8)] text-center lg:hidden">
        <Text variant="body" size="14" weight="medium" appearance="secondary" className="m-0">
          Start high when ambiguous · Move down to implement
        </Text>
      </div>

      <Text variant="body" size="14" weight="medium" appearance="primary" className="m-0 text-center">
        Each layer depends on the layers below it
      </Text>
    </figure>
  )
}
