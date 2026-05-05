import { lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, type ComponentProps } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigationType,
  useParams,
} from 'react-router-dom'
import {
  AppShell,
  BellIcon,
  Button,
  DiamondsFourIcon,
  Footer,
  Header,
  HouseIcon,
  IconContext,
  LayoutIcon,
  Menu,
  PresentationChartIcon,
  QuestionIcon,
  SquaresFourIcon,
  StackIcon,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  cn,
  type MenuNavigationItem,
} from '@chg-ds/unified-design-system'
import { CATALOG_META } from './catalog-meta'
import { applyDocsBrandToDocument, persistDocsBrand } from './doc-site-brand'
import { DOCS_VERSION_OPTIONS } from './doc-site-version'
import { getAllShadcnUiComponents } from './shadcn-ui-registry'

const ComponentDocPage = lazy(() =>
  import('./pages/ComponentDocPage').then((m) => ({ default: m.ComponentDocPage })),
)
const ShadcnComponentDocPage = lazy(() =>
  import('./pages/ShadcnComponentDocPage').then((m) => ({ default: m.ShadcnComponentDocPage })),
)
const InstallPage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.InstallPage })),
)
const UsagePage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.UsagePage })),
)
const AppShellDemoPage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.AppShellDemoPage })),
)
const MenuPage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.MenuPage })),
)
const PatternsDashboardPage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.PatternsDashboardPage })),
)
const WelcomePage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.WelcomePage })),
)

const SECTIONS_SLUGS = new Set(['header', 'footer'])

function WelcomeMenuIcon(props: ComponentProps<typeof HouseIcon>) {
  const { className, ...rest } = props
  return <HouseIcon {...rest} size={32} className={cn('shrink-0', className)} />
}

/* ── Navigation data ── */

const foundationChildren: MenuNavigationItem[] = [...CATALOG_META]
  .sort((a, b) => a.name.localeCompare(b.name, 'en'))
  .map((entry) => ({ id: `foundation-${entry.slug}`, label: entry.name }))

const componentChildren: MenuNavigationItem[] = getAllShadcnUiComponents()
  .filter((entry) => !SECTIONS_SLUGS.has(entry.slug))
  .map((entry) => ({ id: `component-${entry.slug}`, label: entry.name }))

const NAVIGATION_ITEMS: MenuNavigationItem[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: WelcomeMenuIcon,
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

/* ── Route ↔ nav-id maps ── */

const NAV_ID_TO_ROUTE: Record<string, string> = {
  introduction: '/docs/introduction',
  'getting-started-install': '/docs/getting-started/install',
  'getting-started-usage': '/docs/getting-started/usage',
  'getting-started-app-shell': '/docs/getting-started/app-shell',
  'section-menu': '/docs/sections/menu',
  'section-header': '/docs/sections/header',
  'section-footer': '/docs/sections/footer',
  'pattern-dashboard': '/docs/patterns/dashboard',
  ...Object.fromEntries(
    [...CATALOG_META].map((e) => [`foundation-${e.slug}`, `/docs/foundations/${e.slug}`]),
  ),
  ...Object.fromEntries(
    getAllShadcnUiComponents().map((e) => [`component-${e.slug}`, `/docs/components/${e.slug}`]),
  ),
}

const ROUTE_TO_NAV_ID: Record<string, string> = Object.fromEntries(
  Object.entries(NAV_ID_TO_ROUTE).map(([id, path]) => [path, id]),
)

/* ── Helpers ── */

const DEFAULT_FOUNDATIONS_SLUG = 'display'

function RedirectUtilitiesToFoundations() {
  const { slug } = useParams<{ slug: string }>()
  const resolved =
    slug === 'layout-display' ||
    slug === 'layout-position' ||
    slug === 'display-and-placement'
      ? DEFAULT_FOUNDATIONS_SLUG
      : (slug ?? DEFAULT_FOUNDATIONS_SLUG)
  return <Navigate to={`/docs/foundations/${resolved}`} replace />
}

/* ── Layout with configured Menu ── */

function DocsLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const activeId = useMemo(() => ROUTE_TO_NAV_ID[pathname], [pathname])

  const handleNavigationSelect = useCallback(
    (id: string) => {
      const route = NAV_ID_TO_ROUTE[id]
      if (route) navigate(route)
    },
    [navigate],
  )

  return (
    <AppShell
      menu={
        <Menu
          navigationItems={NAVIGATION_ITEMS}
          brandOptions={DOCS_VERSION_OPTIONS}
          activeId={activeId}
          onNavigationSelect={handleNavigationSelect}
        />
      }
      header={
        <Header
          trailing={
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="rounded-full" aria-label="Help">
                    <QuestionIcon className="size-5" aria-hidden />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Help</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
                    <BellIcon className="size-5" aria-hidden />
                    <span className="absolute top-1 right-1 size-2 rounded-full bg-[var(--uds-color-accent-red-500)] ring-2 ring-[var(--uds-surface-primary)]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </>
          }
        />
      }
      footer={
        <Footer
          links={[
            { label: 'Privacy Policy', href: '#privacy' },
            { label: 'Terms & Conditions', href: '#terms' },
          ]}
        />
      }
    />
  )
}

const DOCS_SCROLL_STORAGE_PREFIX = 'uds-docs:win-scroll:'

function readStoredScrollY(key: string): number | null {
  try {
    const raw = sessionStorage.getItem(DOCS_SCROLL_STORAGE_PREFIX + key)
    if (raw == null) return null
    const n = Number(raw)
    return Number.isFinite(n) && n >= 0 ? n : null
  } catch {
    return null
  }
}

function writeStoredScrollY(key: string, y: number) {
  try {
    sessionStorage.setItem(DOCS_SCROLL_STORAGE_PREFIX + key, String(y))
  } catch {
    /* quota / private mode */
  }
}

/**
 * PUSH/REPLACE (e.g. sidebar nav): scroll to top.
 * POP (back/forward): restore window scroll for that history entry.
 */
function DocWindowScrollRestoration() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const key = location.key
  const lastScrollY = useRef(0)
  const prevKeyRef = useRef<string | null>(null)

  useLayoutEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey != null && prevKey !== key) {
      writeStoredScrollY(prevKey, lastScrollY.current)
    }
    prevKeyRef.current = key

    if (navigationType === 'POP') {
      const y = readStoredScrollY(key)
      const nextY = y ?? 0
      window.scrollTo(0, nextY)
      lastScrollY.current = nextY
    } else {
      window.scrollTo(0, 0)
      lastScrollY.current = 0
    }
  }, [key, navigationType])

  useEffect(() => {
    const onScroll = () => {
      lastScrollY.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [key])

  return null
}

/** Documentation chrome uses default brand tokens globally; scoped previews set `data-brand` locally. */
function DocsGlobalDefaultBrand() {
  useEffect(() => {
    applyDocsBrandToDocument('default')
    persistDocsBrand('default')
  }, [])
  return null
}

/* ── App entry ── */

export default function DocsApp() {
  return (
    <IconContext.Provider value={{ weight: 'bold', mirrored: false }}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <DocsGlobalDefaultBrand />
          <DocWindowScrollRestoration />
          <Routes>
            <Route path="/" element={<DocsLayout />}>
              <Route index element={<Navigate to="/docs/introduction" replace />} />
              <Route path="docs/introduction" element={<WelcomePage />} />
              <Route path="docs/welcome" element={<Navigate to="/docs/introduction" replace />} />
              <Route path="docs/getting-started/install" element={<InstallPage />} />
              <Route path="docs/getting-started/usage" element={<UsagePage />} />
              <Route path="docs/getting-started/app-shell" element={<AppShellDemoPage />} />
              <Route path="docs/sections/menu" element={<MenuPage />} />
              <Route path="docs/sections/:slug" element={<ShadcnComponentDocPage />} />
              <Route path="docs/patterns/dashboard" element={<PatternsDashboardPage />} />
              {/* Redirects from old routes */}
              <Route path="docs/getting-started/menu" element={<Navigate to="/docs/sections/menu" replace />} />
              <Route path="docs/components/header" element={<Navigate to="/docs/sections/header" replace />} />
              <Route path="docs/components/footer" element={<Navigate to="/docs/sections/footer" replace />} />
              <Route
                path="docs/foundations/layout-display"
                element={<Navigate to="/docs/foundations/display" replace />}
              />
              <Route
                path="docs/foundations/layout-position"
                element={<Navigate to="/docs/foundations/display" replace />}
              />
              <Route
                path="docs/foundations/display-and-placement"
                element={<Navigate to="/docs/foundations/display" replace />}
              />
              <Route path="docs/foundations/:slug" element={<ComponentDocPage />} />
              <Route path="docs/utilities/:slug" element={<RedirectUtilitiesToFoundations />} />
              <Route path="docs/components/:slug" element={<ShadcnComponentDocPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/docs/introduction" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </IconContext.Provider>
  )
}
