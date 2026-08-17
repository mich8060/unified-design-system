import { Link, Navigate, useParams } from 'react-router-dom'
import { DesignLanguageContractDiagram } from '../components/DesignLanguageContractDiagram'
import { DesignLanguageLayersDiagram } from '../components/DesignLanguageLayersDiagram'
import { DESIGN_LANGUAGE_DIAGRAMS } from '../components/design-language-diagrams/layer-diagrams'
import { CodePanel } from '../components/CodePanel'
import { DESIGN_LANGUAGE_ARTICLES } from '../design-language/articles'
import {
  DESIGN_LANGUAGE_LAYER_BY_ID,
  DESIGN_LANGUAGE_LAYERS,
  DESIGN_LANGUAGE_OVERVIEW_ROUTE,
  isDesignLanguageLayerId,
  resolveDesignLanguageRedirect,
} from '../design-language/layers'
import { MarkdownishPage } from './MarkdownishPage'

export function DesignLanguageOverviewPage() {
  return (
    <MarkdownishPage
      kicker="Design Language"
      title="Overview"
      description="The Design System Language (DSL) explains why UDS decisions exist, when to apply them, and how humans and AI should reason about composition—not only which component to import."
    >
      <p>
        Runtime components and the machine-readable contract answer <strong>what</strong> to use and{' '}
        <strong>how</strong> the APIs work. The Design System Language answers <strong>why</strong> and{' '}
        <strong>when</strong>: intent, hierarchy, spacing, shell regions, patterns, and anti-patterns. It ships with the
        package as{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">
          @chghealthcare/unified-design-system/design-language
        </code>{' '}
        and lives in the repo under{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">design-language/</code>.
      </p>

      <DesignLanguageContractDiagram />

      <h2 className="pt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">What it is for</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Designers</strong> — shared philosophy, physics, and
          patterns so specs match what ships.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">Engineers</strong> — composition rules before inventing
          layout chrome; prefer recipes and existing exports.
        </li>
        <li>
          <strong className="text-neutral-900 dark:text-neutral-100">AI agents</strong> — a structured reasoning path
          (intent → grammar → decision trees → patterns → components) with confidence labels and retrieval indexes.
        </li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Knowledge layers</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Layers only depend downward. Start high when the problem is ambiguous; drop to tokens and examples when you are
        implementing a settled layout. The Menu lists eight hub pages—each a short article with a supporting diagram.
      </p>
      <div className="mt-4">
        <DesignLanguageLayersDiagram />
      </div>
      <div className="mt-4 overflow-x-auto rounded-[length:var(--uds-radius-8)] border border-uds-border-primary">
        <table className="w-full min-w-[min(100%,520px)] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-uds-border-primary bg-[var(--uds-surface-secondary)]">
              <th className="px-3 py-2 font-semibold text-[var(--uds-text-primary)]">Layer</th>
              <th className="px-3 py-2 font-semibold text-[var(--uds-text-primary)]">Role</th>
            </tr>
          </thead>
          <tbody className="text-[var(--uds-text-secondary)]">
            {DESIGN_LANGUAGE_LAYERS.map((layer) => (
              <tr key={layer.id} className="border-b border-uds-border-primary last:border-b-0">
                <td className="px-3 py-2 font-medium text-[var(--uds-text-primary)]">
                  <Link to={layer.route} className="docs-link font-medium">
                    {layer.label}
                  </Link>
                </td>
                <td className="px-3 py-2">
                  {DESIGN_LANGUAGE_ARTICLES[layer.id]?.summary ?? layer.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">How to reason</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          State <strong className="text-neutral-900 dark:text-neutral-100">intent</strong> (what the user is trying to do).
        </li>
        <li>
          Apply <strong className="text-neutral-900 dark:text-neutral-100">grammar</strong> — AppShell regions, listview vs
          right panel, MainContent containment.
        </li>
        <li>
          Choose a <strong className="text-neutral-900 dark:text-neutral-100">recipe / pattern</strong> via decision trees
          before inventing layout.
        </li>
        <li>
          Implement with contract <strong className="text-neutral-900 dark:text-neutral-100">components</strong> and{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/examples</code>.
        </li>
        <li>
          Respect <strong className="text-neutral-900 dark:text-neutral-100">confidence</strong> labels in the DSL
          (Required vs Strong Recommendation vs Optional).
        </li>
      </ol>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Contract vs design language
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/uds-contract.json</code> (package export{' '}
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">/contract</code>) is normative for APIs,
          recipes, and anti-patterns when prose disagrees.
        </li>
        <li>
          <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">design-language/</code> is normative for
          composition reasoning and design intent.
        </li>
        <li>
          Retrieval indexes under <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/indexes/</code>{' '}
          help agents find the right DSL article quickly.
        </li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Consumer AI bootstrap</h2>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Setup agents (not designers/PMs) run this after install so hot-path stubs land in the app, then commit the
        result:
      </p>
      <CodePanel label="From the consumer app root (agent-owned)" language="bash" code={`npx uds-copy-ai-rules`} />
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        That wires Cursor, Claude Code, AGENTS, or Copilot stubs from{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/consumer-ai/</code>. Paste-ready prompt:{' '}
        <Link to="/docs/getting-started/usage" className="docs-link font-medium">
          Usage → Copy-paste setup prompt
        </Link>
        . Full steps:{' '}
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">ai/guides/consumer-ai-bootstrap.md</code>.
      </p>

      <h2 className="pt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Where to go next</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-300">
        <li>
          <Link to="/docs/design-language/philosophy" className="docs-link font-medium">
            Philosophy
          </Link>{' '}
          — start of the knowledge stack.
        </li>
        <li>
          <Link to="/docs/getting-started/usage" className="docs-link font-medium">
            Usage
          </Link>{' '}
          — allowed imports and shell composition in product code.
        </li>
        <li>
          <Link to="/docs/getting-started/app-shell" className="docs-link font-medium">
            AppShell demo
          </Link>{' '}
          — the default authenticated layout regions.
        </li>
        <li>
          Foundations and Components in this site — token scales and live APIs that the DSL points at.
        </li>
      </ul>
    </MarkdownishPage>
  )
}

export function DesignLanguageLayerPage() {
  const { layerId = '' } = useParams<{ layerId: string }>()

  const redirectTo = resolveDesignLanguageRedirect(layerId)
  if (redirectTo) {
    return <Navigate to={redirectTo} replace />
  }

  if (!isDesignLanguageLayerId(layerId)) {
    return (
      <MarkdownishPage kicker="Design Language" title="Page not found">
        <p>
          That Design Language page is not in this section.{' '}
          <Link to={DESIGN_LANGUAGE_OVERVIEW_ROUTE} className="docs-link font-medium">
            Back to Overview
          </Link>
          .
        </p>
      </MarkdownishPage>
    )
  }

  const layer = DESIGN_LANGUAGE_LAYER_BY_ID[layerId]
  const article = DESIGN_LANGUAGE_ARTICLES[layer.id]
  const Diagram = DESIGN_LANGUAGE_DIAGRAMS[layer.id]
  const layerIndex = DESIGN_LANGUAGE_LAYERS.findIndex((entry) => entry.id === layer.id)
  const prev = layerIndex > 0 ? DESIGN_LANGUAGE_LAYERS[layerIndex - 1] : null
  const next =
    layerIndex >= 0 && layerIndex < DESIGN_LANGUAGE_LAYERS.length - 1
      ? DESIGN_LANGUAGE_LAYERS[layerIndex + 1]
      : null

  const digDeeper = layer.topics.filter(
    (topic) => topic.title !== 'Overview' && topic.title !== 'Ontology Overview' && topic.title !== 'Components Index',
  )

  return (
    <MarkdownishPage
      kicker="Design Language"
      title={layer.label}
      description={article?.summary ?? layer.role}
    >
      {article ? (
        <>
          {article.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}

          {Diagram ? (
            <div className="my-2">
              <Diagram />
            </div>
          ) : null}

          <h2>When this helps</h2>
          <p>{article.when}</p>

          <h2>Ideas to keep in mind</h2>
          <div className="mt-3 flex flex-col gap-[length:var(--uds-gap-16)]">
            {article.themes.map((theme) => (
              <div
                key={theme.title}
                className="rounded-[length:var(--uds-radius-8)] border border-uds-border-primary bg-[var(--uds-surface-secondary)] p-[length:var(--uds-spacing-16)]"
              >
                <p className="m-0 font-semibold text-[var(--uds-text-primary)]">{theme.title}</p>
                <p className="mt-2 mb-0 text-[var(--uds-text-secondary)]">{theme.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-2">{article.closing}</p>
        </>
      ) : (
        <>
          <p>{layer.howToUse}</p>
          {Diagram ? (
            <div className="my-2">
              <Diagram />
            </div>
          ) : null}
        </>
      )}

      {layer.related.length > 0 ? (
        <>
          <h2>Related here in the docs</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {layer.related.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="docs-link font-medium">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {digDeeper.length > 0 ? (
        <>
          <h2>Dig deeper</h2>
          <p>
            These are the named topics in this layer—useful search terms when you are reading the Design Language
            package or asking an agent for the matching article.
          </p>
          <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
            {digDeeper.map((topic) => (
              <li
                key={topic.path}
                className="rounded-[length:var(--uds-radius-8)] border border-uds-border-primary bg-[var(--uds-surface-primary)] px-3 py-1.5 text-sm font-medium text-[var(--uds-text-primary)]"
              >
                {topic.title.replace(/^Tree · /, '')}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <nav
        className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-uds-border-primary pt-4 text-sm"
        aria-label="Adjacent Design Language pages"
      >
        <div>
          {prev ? (
            <Link to={prev.route} className="docs-link font-medium">
              ← {prev.label}
            </Link>
          ) : (
            <Link to={DESIGN_LANGUAGE_OVERVIEW_ROUTE} className="docs-link font-medium">
              ← Overview
            </Link>
          )}
        </div>
        <div>
          {next ? (
            <Link to={next.route} className="docs-link font-medium">
              {next.label} →
            </Link>
          ) : (
            <Link to={DESIGN_LANGUAGE_OVERVIEW_ROUTE} className="docs-link font-medium">
              Overview →
            </Link>
          )}
        </div>
      </nav>
    </MarkdownishPage>
  )
}

/** @deprecated Use DesignLanguageOverviewPage — kept for lazy import aliases during migration. */
export const DesignLanguagePage = DesignLanguageOverviewPage
