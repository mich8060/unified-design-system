import type { MenuNavigationItem } from '@chghealthcare/unified-design-system'
import { LATEST_READOUT_ROUTE, READOUT_MONTHS } from './readout/readout-months'
import type { ShadcnUiEntry } from './shadcn-ui-registry'
import type { CatalogEntry } from './types'
import type { DocsVersionNavigation } from './versions/types'

export type DocsSearchResult = {
  id: string
  label: string
  route: string
  group: string
  description?: string
}

const GROUP_ORDER = [
  'Documentation',
  'Getting Started',
  'Foundations',
  'Components',
  'Modules',
  'Patterns',
  'Projects',
] as const

const DOCS_UTILITY_SEARCH_RESULTS: DocsSearchResult[] = [
  {
    id: 'readout',
    label: 'Readout',
    route: LATEST_READOUT_ROUTE,
    group: 'Projects',
    description: 'Design system monthly executive readout (latest month)',
  },
  ...READOUT_MONTHS.map((month) => ({
    id: `readout-${month.id}`,
    label: `Readout — ${month.label}`,
    route: month.route,
    group: 'Projects',
    description: `Design system update for ${month.label}`,
  })),
  {
    id: 'releases',
    label: 'Releases',
    route: '/docs/releases',
    group: 'Projects',
    description: 'Published package versions and changelogs',
  },
  {
    id: 'roadmap',
    label: 'Roadmap',
    route: '/docs/roadmap',
    group: 'Projects',
    description: 'Planned foundations, components, and platform work',
  },
]

function descriptionForNavId(
  id: string,
  catalogBySlug: Map<string, CatalogEntry>,
  shadcnBySlug: Map<string, ShadcnUiEntry>,
): string | undefined {
  if (id.startsWith('foundation-')) {
    return catalogBySlug.get(id.slice('foundation-'.length))?.description
  }
  if (id.startsWith('component-')) {
    const entry = shadcnBySlug.get(id.slice('component-'.length))
    return entry ? `${entry.name} component documentation` : undefined
  }
  return undefined
}

function walkNavigation(
  items: ReadonlyArray<MenuNavigationItem>,
  navIdToRoute: DocsVersionNavigation['navIdToRoute'],
  catalogBySlug: Map<string, CatalogEntry>,
  shadcnBySlug: Map<string, ShadcnUiEntry>,
  parentGroup: string | null,
  results: DocsSearchResult[],
) {
  for (const item of items) {
    const route = navIdToRoute[item.id]
    const group = parentGroup ?? 'Documentation'

    if (route) {
      results.push({
        id: item.id,
        label: item.label,
        route,
        group,
        description: descriptionForNavId(item.id, catalogBySlug, shadcnBySlug),
      })
    }

    if (item.children?.length) {
      walkNavigation(item.children, navIdToRoute, catalogBySlug, shadcnBySlug, item.label, results)
    }
  }
}

export function buildDocsSearchIndex(
  navigation: DocsVersionNavigation,
  catalog: CatalogEntry[],
  shadcnComponents: ShadcnUiEntry[],
): DocsSearchResult[] {
  const catalogBySlug = new Map(catalog.map((entry) => [entry.slug, entry]))
  const shadcnBySlug = new Map(shadcnComponents.map((entry) => [entry.slug, entry]))
  const results: DocsSearchResult[] = []

  walkNavigation(navigation.items, navigation.navIdToRoute, catalogBySlug, shadcnBySlug, null, results)
  results.push(...DOCS_UTILITY_SEARCH_RESULTS)

  const order = new Map(GROUP_ORDER.map((name, index) => [name, index]))

  return results.sort((a, b) => {
    const ga = order.get(a.group as (typeof GROUP_ORDER)[number]) ?? GROUP_ORDER.length
    const gb = order.get(b.group as (typeof GROUP_ORDER)[number]) ?? GROUP_ORDER.length
    if (ga !== gb) return ga - gb
    return a.label.localeCompare(b.label, 'en')
  })
}

export function groupDocsSearchResults(results: DocsSearchResult[]): { group: string; items: DocsSearchResult[] }[] {
  const grouped = new Map<string, DocsSearchResult[]>()

  for (const result of results) {
    const list = grouped.get(result.group) ?? []
    list.push(result)
    grouped.set(result.group, list)
  }

  return [...grouped.entries()]
    .sort(([a], [b]) => {
      const order = new Map(GROUP_ORDER.map((name, index) => [name, index]))
      const ga = order.get(a as (typeof GROUP_ORDER)[number]) ?? GROUP_ORDER.length
      const gb = order.get(b as (typeof GROUP_ORDER)[number]) ?? GROUP_ORDER.length
      if (ga !== gb) return ga - gb
      return a.localeCompare(b, 'en')
    })
    .map(([group, items]) => ({ group, items }))
}

export function docsSearchResultValue(result: DocsSearchResult): string {
  return [result.label, result.group, result.description ?? '', result.route.replace(/\//g, ' ')].join(' ')
}
