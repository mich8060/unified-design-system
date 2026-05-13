import type { ShadcnComponentMeta } from '../shadcn-component-meta'
import type { ShadcnExampleSection } from '../shadcn-examples/types'
import type { ShadcnUiEntry, ShadcnUiSlug } from '../shadcn-ui-registry'
import type { CatalogEntry, DocSection, PropDefinition } from '../types'
import { buildDocsVersionNavigation } from './navigation'
import type { DocsVersionBundle, DocsVersionId } from './types'

type CreateDocsVersionBundleInput = {
  id: DocsVersionId
  catalog: CatalogEntry[]
  shadcnSlugs: readonly ShadcnUiSlug[]
  getCustomSections: (slug: string) => DocSection[] | undefined
  getShadcnComponentMeta: (slug: ShadcnUiSlug) => ShadcnComponentMeta
  getShadcnComponentProps: (slug: ShadcnUiSlug) => PropDefinition[]
  getShadcnExamples: (slug: ShadcnUiSlug) => ShadcnExampleSection[]
  formatShadcnComponentName: (slug: string) => string
  getShadcnDocsUrl: (slug: string) => string
  welcomeMenuIcon?: DocsVersionBundle['welcomeMenuIcon']
}

export function createDocsVersionBundle(input: CreateDocsVersionBundleInput): DocsVersionBundle {
  const bySlug = Object.fromEntries(input.catalog.map((entry) => [entry.slug, entry])) as Record<string, CatalogEntry>

  const getAllShadcnUiComponents = (): ShadcnUiEntry[] =>
    [...input.shadcnSlugs]
      .map((slug) => ({
        slug,
        name: input.formatShadcnComponentName(slug),
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))

  const isShadcnUiSlug = (slug: string): slug is ShadcnUiSlug =>
    (input.shadcnSlugs as readonly string[]).includes(slug)

  const navigation = buildDocsVersionNavigation(input.catalog, getAllShadcnUiComponents(), input.welcomeMenuIcon)

  return {
    id: input.id,
    catalog: input.catalog,
    shadcnSlugs: input.shadcnSlugs,
    navigation,
    getAllComponents: () => [...input.catalog].sort((a, b) => a.name.localeCompare(b.name, 'en')),
    getCatalogEntry: (slug: string) => bySlug[slug],
    resolveSections: (entry: CatalogEntry) => {
      const custom = input.getCustomSections(entry.slug)
      if (custom && custom.length > 0) return custom

      const stubCode = `<div className="rounded-[4px] border border-neutral-200 p-6 text-sm text-neutral-600 dark:border-neutral-700">
  {/* ${entry.name}: add JSX preview + UDS-first classes. See ai/uds-contract.json. */}
</div>`

      return [
        {
          id: 'preview',
          title: 'Preview placeholder',
          description:
            'Add a matching example in src/docs/sections/custom-sections.tsx for this utility category.',
          code: stubCode,
          preview: (
            <div className="rounded-[4px] border border-neutral-200 bg-white p-6 text-center text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">{entry.name}</p>
              <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                Use the UDS contract and recipe examples instead of inventing parallel placeholder chrome.
              </p>
            </div>
          ),
        },
      ]
    },
    getCustomSections: input.getCustomSections,
    getAllShadcnUiComponents,
    isShadcnUiSlug,
    getShadcnComponentMeta: input.getShadcnComponentMeta,
    getShadcnComponentProps: input.getShadcnComponentProps,
    getShadcnExamples: input.getShadcnExamples,
    formatShadcnComponentName: input.formatShadcnComponentName,
    getShadcnDocsUrl: input.getShadcnDocsUrl,
    welcomeMenuIcon: input.welcomeMenuIcon,
  }
}
