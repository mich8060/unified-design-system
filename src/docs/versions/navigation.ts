import {
  DiamondsFourIcon,
  LayoutIcon,
  PresentationChartIcon,
  SquaresFourIcon,
  StackIcon,
  type MenuNavigationItem,
} from '@chghealthcare/unified-design-system'
import type { ShadcnUiEntry } from '../shadcn-ui-registry'
import type { CatalogEntry } from '../types'
import type { DocsVersionNavigation } from './types'

const SECTIONS_SLUGS = new Set(['header', 'footer'])

export function buildDocsVersionNavigation(
  catalog: CatalogEntry[],
  shadcnComponents: ShadcnUiEntry[],
  welcomeMenuIcon?: MenuNavigationItem['icon'],
): DocsVersionNavigation {
  const foundationChildren: MenuNavigationItem[] = [...catalog]
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    .map((entry) => ({ id: `foundation-${entry.slug}`, label: entry.name }))

  const componentChildren: MenuNavigationItem[] = shadcnComponents
    .filter((entry) => !SECTIONS_SLUGS.has(entry.slug))
    .map((entry) => ({ id: `component-${entry.slug}`, label: entry.name }))

  const items: MenuNavigationItem[] = [
    {
      id: 'introduction',
      label: 'Introduction',
      icon: welcomeMenuIcon,
    },
    {
      id: 'getting-started',
      label: 'Getting Started',
      icon: LayoutIcon,
      children: [
        { id: 'getting-started-install', label: 'Install' },
        { id: 'getting-started-usage', label: 'Usage' },
        { id: 'getting-started-app-shell', label: 'AppShell' },
      ],
    },
    {
      id: 'foundations',
      label: 'Foundations',
      icon: SquaresFourIcon,
      children: foundationChildren,
    },
    {
      id: 'components',
      label: 'Components',
      icon: DiamondsFourIcon,
      children: componentChildren,
    },
    {
      id: 'sections',
      label: 'Modules',
      icon: StackIcon,
      children: [
        { id: 'section-menu', label: 'Menu' },
        { id: 'section-header', label: 'Header' },
        { id: 'section-footer', label: 'Footer' },
      ],
    },
    {
      id: 'patterns',
      label: 'Patterns',
      icon: PresentationChartIcon,
      children: [{ id: 'pattern-dashboard', label: 'Dashboard' }],
    },
  ]

  const navIdToRoute: Record<string, string> = {
    introduction: '/docs/introduction',
    'getting-started-install': '/docs/getting-started/install',
    'getting-started-usage': '/docs/getting-started/usage',
    'getting-started-app-shell': '/docs/getting-started/app-shell',
    'section-menu': '/docs/sections/menu',
    'section-header': '/docs/sections/header',
    'section-footer': '/docs/sections/footer',
    'pattern-dashboard': '/docs/patterns/dashboard',
    ...Object.fromEntries(catalog.map((entry) => [`foundation-${entry.slug}`, `/docs/foundations/${entry.slug}`])),
    ...Object.fromEntries(
      shadcnComponents.map((entry) => [`component-${entry.slug}`, `/docs/components/${entry.slug}`]),
    ),
  }

  const routeToNavId = Object.fromEntries(Object.entries(navIdToRoute).map(([id, path]) => [path, id]))

  return { items, navIdToRoute, routeToNavId }
}

export function resolveDocsRouteForVersion(
  navigation: DocsVersionNavigation,
  pathname: string,
): string {
  if (navigation.routeToNavId[pathname]) return pathname
  return '/docs/introduction'
}
