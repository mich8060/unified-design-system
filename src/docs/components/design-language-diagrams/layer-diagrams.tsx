import type { JSX, ReactNode } from 'react'
import { Text } from '@chghealthcare/unified-design-system'
import { DiagramChip, DiagramFrame } from './DiagramFrame'

function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <Text
      variant="body"
      size="14"
      weight="bold"
      className={light ? 'm-0 text-[var(--system-color-white)]' : 'm-0 text-[var(--uds-text-primary)]'}
    >
      {children}
    </Text>
  )
}

function Hint({ children }: { children: ReactNode }) {
  return (
    <Text variant="body" size="14" weight="regular" appearance="secondary" className="m-0">
      {children}
    </Text>
  )
}

export function PhilosophyDiagram() {
  const values = [
    { title: 'Recognition', body: 'over novelty', color: 'var(--uds-color-accent-violet-600)' },
    { title: 'Clarity', body: 'over density', color: 'var(--uds-color-accent-blue-600)' },
    { title: 'System', body: 'over screen', color: 'var(--uds-color-accent-aqua-600)' },
  ]
  return (
    <DiagramFrame
      titleId="dl-diagram-philosophy"
      caption="Three philosophy values: recognition over novelty, clarity over density, and system over screen."
    >
      <div className="grid gap-[length:var(--uds-gap-16)] sm:grid-cols-3">
        {values.map((value) => (
          <DiagramChip
            key={value.title}
            className="flex-col gap-1 py-4"
            style={{ backgroundColor: value.color }}
          >
            <Label light>{value.title}</Label>
            <Text variant="body" size="14" weight="regular" className="m-0 text-[var(--system-color-white)]">
              {value.body}
            </Text>
          </DiagramChip>
        ))}
      </div>
    </DiagramFrame>
  )
}

export function DesignPhysicsDiagram() {
  const forces = [
    { label: 'Proximity', color: 'var(--uds-color-accent-indigo-600)' },
    { label: 'Weight', color: 'var(--uds-color-accent-blue-600)' },
    { label: 'Contrast', color: 'var(--uds-color-accent-sky-600)' },
    { label: 'Stability', color: 'var(--uds-color-accent-cyan-600)' },
  ]
  return (
    <DiagramFrame
      titleId="dl-diagram-physics"
      caption="Design physics forces—proximity, weight, contrast, and stability—feed into layout."
    >
      <div className="flex flex-col items-stretch gap-[length:var(--uds-gap-16)]">
        <div className="grid grid-cols-2 gap-[length:var(--uds-gap-12)] sm:grid-cols-4">
          {forces.map((force) => (
            <DiagramChip key={force.label} style={{ backgroundColor: force.color }}>
              <Label light>{force.label}</Label>
            </DiagramChip>
          ))}
        </div>
        <div className="flex justify-center" aria-hidden>
          <div className="h-6 w-[2px] rounded-full bg-[var(--uds-border-primary)]" />
        </div>
        <DiagramChip className="border border-uds-border-primary bg-[var(--uds-surface-primary)]">
          <div className="flex flex-col items-center gap-1">
            <Label>Layout that feels ordered</Label>
            <Hint>Groups, emphasis, and navigation that stay put</Hint>
          </div>
        </DiagramChip>
      </div>
    </DiagramFrame>
  )
}

export function SemanticsDiagram() {
  const steps = [
    { label: 'Intent', width: '55%' },
    { label: 'Hierarchy', width: '70%' },
    { label: 'Density', width: '85%' },
    { label: 'Shell meaning', width: '100%' },
  ]
  return (
    <DiagramFrame
      titleId="dl-diagram-semantics"
      caption="Semantics meaning stack from intent through hierarchy and density to shell meaning."
    >
      <ol className="m-0 flex list-none flex-col items-center gap-[length:var(--uds-gap-8)] p-0">
        {steps.map((step, index) => (
          <li key={step.label} className="flex justify-center" style={{ width: step.width, maxWidth: '100%' }}>
            <DiagramChip
              className="w-full"
              style={{
                backgroundColor:
                  index === 0
                    ? 'var(--uds-color-accent-violet-600)'
                    : index === 1
                      ? 'var(--uds-color-accent-blue-600)'
                      : index === 2
                        ? 'var(--uds-color-accent-sky-600)'
                        : 'var(--uds-color-accent-aqua-600)',
              }}
            >
              <Label light>{step.label}</Label>
            </DiagramChip>
          </li>
        ))}
      </ol>
    </DiagramFrame>
  )
}

export function GrammarDiagram() {
  const regions = [
    { label: 'Header', span: 'col-span-3' },
    { label: 'Menu', span: 'col-span-1' },
    { label: 'Listview', span: 'col-span-1' },
    { label: 'Main', span: 'col-span-1' },
  ]
  const scales = ['Spacing', 'Type', 'Radius', 'Elevation']
  return (
    <DiagramFrame
      titleId="dl-diagram-grammar"
      caption="AppShell regions—Header, Menu, Listview, Main—beside a scale ladder for spacing, type, radius, and elevation."
    >
      <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
        <div className="grid grid-cols-3 gap-2">
          {regions.map((region) => (
            <DiagramChip
              key={region.label}
              className={`${region.span} border border-uds-border-primary bg-[var(--uds-surface-primary)]`}
            >
              <Label>{region.label}</Label>
            </DiagramChip>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Hint>Scales stay in family</Hint>
          {scales.map((scale, index) => (
            <DiagramChip
              key={scale}
              className="justify-start px-4"
              style={{
                backgroundColor: 'var(--uds-surface-primary)',
                border: '1px solid var(--uds-border-primary)',
                marginLeft: `${index * 12}px`,
              }}
            >
              <Label>{scale}</Label>
            </DiagramChip>
          ))}
        </div>
      </div>
    </DiagramFrame>
  )
}

export function DecisionRulesDiagram() {
  const steps = [
    { label: 'Question', color: 'var(--uds-color-accent-violet-600)' },
    { label: 'Decision tree', color: 'var(--uds-color-accent-blue-600)' },
    { label: 'Pattern', color: 'var(--uds-color-accent-aqua-600)' },
  ]
  return (
    <DiagramFrame
      titleId="dl-diagram-decision-rules"
      caption="Decision flow from a question through a decision tree to a chosen pattern."
    >
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        {steps.map((step, index) => (
          <div key={step.label} className="flex min-w-0 flex-1 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <DiagramChip className="w-full flex-1" style={{ backgroundColor: step.color }}>
              <Label light>{step.label}</Label>
            </DiagramChip>
            {index < steps.length - 1 ? (
              <Text
                variant="body"
                size="16"
                weight="bold"
                appearance="secondary"
                className="m-0 self-center sm:px-1"
                aria-hidden
              >
                →
              </Text>
            ) : null}
          </div>
        ))}
      </div>
    </DiagramFrame>
  )
}

export function PatternsOntologyDiagram() {
  return (
    <DiagramFrame
      titleId="dl-diagram-patterns"
      caption="A screen recipe feeds component knowledge objects such as Button, Card, and PageHeader."
    >
      <div className="flex flex-col items-stretch gap-[length:var(--uds-gap-16)] sm:flex-row sm:items-center">
        <DiagramChip
          className="min-h-[120px] flex-1 flex-col gap-2 border-2 border-[var(--uds-color-accent-blue-500)] bg-[var(--uds-surface-primary)]"
        >
          <Label>Screen recipe</Label>
          <Hint>Dashboard · form · queue</Hint>
        </DiagramChip>
        <Text variant="body" size="16" weight="bold" appearance="secondary" className="m-0 self-center" aria-hidden>
          →
        </Text>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {['Button', 'Card', 'PageHeader'].map((name) => (
            <DiagramChip
              key={name}
              className="min-h-[72px] flex-col gap-1 border border-uds-border-primary bg-[var(--uds-surface-primary)]"
            >
              <Label>{name}</Label>
              <Hint>ontology</Hint>
            </DiagramChip>
          ))}
        </div>
      </div>
    </DiagramFrame>
  )
}

export function FoundationsCompositionDiagram() {
  return (
    <DiagramFrame
      titleId="dl-diagram-foundations"
      caption="Token materials such as color, space, and type assemble into nested composition with overflow control."
    >
      <div className="flex flex-col gap-[length:var(--uds-gap-16)]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {['Color', 'Space', 'Type', 'Radius'].map((token) => (
            <DiagramChip
              key={token}
              style={{ backgroundColor: 'var(--uds-color-accent-cyan-600)' }}
            >
              <Label light>{token}</Label>
            </DiagramChip>
          ))}
        </div>
        <div className="flex justify-center" aria-hidden>
          <div className="h-6 w-[2px] rounded-full bg-[var(--uds-border-primary)]" />
        </div>
        <div className="rounded-[length:var(--uds-radius-12)] border border-uds-border-primary bg-[var(--uds-surface-primary)] p-3">
          <div className="rounded-[length:var(--uds-radius-8)] border border-dashed border-uds-border-primary bg-[var(--uds-surface-secondary)] p-3">
            <div className="rounded-[length:var(--uds-radius-4)] border border-uds-border-primary bg-[var(--uds-surface-primary)] px-3 py-4 text-center">
              <Label>Nested composition</Label>
              <Hint>Overflow scrolls · peers share a row</Hint>
            </div>
          </div>
        </div>
      </div>
    </DiagramFrame>
  )
}

export function InteractionsAccessibilityDiagram() {
  const states = ['Hover', 'Focus', 'Pressed', 'Selected']
  const checks = ['Contrast', 'Targets', 'Labels', 'Order']
  return (
    <DiagramFrame
      titleId="dl-diagram-interactions"
      caption="Interaction states—hover, focus, pressed, selected—paired with accessibility checks for contrast, targets, labels, and order."
    >
      <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Hint>States people feel</Hint>
          <div className="flex flex-wrap gap-2">
            {states.map((state, index) => (
              <DiagramChip
                key={state}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? 'var(--uds-color-accent-blue-600)'
                      : 'var(--uds-color-accent-sky-600)',
                }}
              >
                <Label light>{state}</Label>
              </DiagramChip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Hint>Inclusive checks</Hint>
          <div className="grid grid-cols-2 gap-2">
            {checks.map((check) => (
              <DiagramChip
                key={check}
                className="border border-uds-border-primary bg-[var(--uds-surface-primary)]"
              >
                <Label>{check}</Label>
              </DiagramChip>
            ))}
          </div>
        </div>
      </div>
    </DiagramFrame>
  )
}

export function AntiPatternsExamplesDiagram() {
  return (
    <DiagramFrame
      titleId="dl-diagram-examples"
      caption="Avoid noisy stacked full-width cards; prefer a patterned layout with clear hierarchy."
    >
      <div className="grid gap-[length:var(--uds-gap-16)] sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-[length:var(--uds-radius-8)] border border-[var(--uds-color-accent-red-400)] bg-[var(--uds-surface-primary)] p-3">
          <Text
            variant="body"
            size="14"
            weight="bold"
            className="m-0 text-[var(--uds-color-accent-red-600)]"
          >
            Avoid
          </Text>
          <div className="flex flex-col gap-1.5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-8 rounded-[length:var(--uds-radius-4)] bg-[var(--uds-surface-secondary)]"
                aria-hidden
              />
            ))}
          </div>
          <Hint>Skinny full-width stack</Hint>
        </div>
        <div className="flex flex-col gap-2 rounded-[length:var(--uds-radius-8)] border border-[var(--uds-color-accent-green-400)] bg-[var(--uds-surface-primary)] p-3">
          <Text
            variant="body"
            size="14"
            weight="bold"
            className="m-0 text-[var(--uds-color-accent-green-600)]"
          >
            Prefer
          </Text>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="col-span-2 h-8 rounded-[length:var(--uds-radius-4)] bg-[var(--uds-color-accent-green-100)]" aria-hidden />
            <div className="h-14 rounded-[length:var(--uds-radius-4)] bg-[var(--uds-surface-secondary)]" aria-hidden />
            <div className="h-14 rounded-[length:var(--uds-radius-4)] bg-[var(--uds-surface-secondary)]" aria-hidden />
          </div>
          <Hint>Patterned columns</Hint>
        </div>
      </div>
    </DiagramFrame>
  )
}

export const DESIGN_LANGUAGE_DIAGRAMS: Record<string, () => JSX.Element> = {
  philosophy: PhilosophyDiagram,
  'design-physics': DesignPhysicsDiagram,
  semantics: SemanticsDiagram,
  grammar: GrammarDiagram,
  'decision-rules': DecisionRulesDiagram,
  patterns: PatternsOntologyDiagram,
  foundations: FoundationsCompositionDiagram,
  interactions: InteractionsAccessibilityDiagram,
  examples: AntiPatternsExamplesDiagram,
}
