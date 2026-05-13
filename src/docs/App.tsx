import { lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
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
  Footer,
  IconContext,
  Menu,
  QuestionIcon,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@chg-ds/unified-design-system'
import { DocsVersionSelect } from './components/DocsVersionSelect'
import { applyDocsBrandToDocument, DOCS_BRAND_OPTIONS, readStoredDocsBrand } from './doc-site-brand'
import {
  DocsVersionProvider,
  DocsVersionRouteGuard,
  useDocsVersion,
  useDocsVersionBundle,
} from './versions/context'

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

function DocsLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const bundle = useDocsVersionBundle()
  const { items: navigationItems, navIdToRoute, routeToNavId } = bundle.navigation

  const activeId = useMemo(() => routeToNavId[pathname], [pathname, routeToNavId])

  const handleNavigationSelect = useCallback(
    (id: string) => {
      const route = navIdToRoute[id]
      if (route) navigate(route)
    },
    [navIdToRoute, navigate],
  )

  return (
    <AppShell className="min-h-dvh min-w-0 w-full max-w-full overflow-x-hidden">
      <AppShell.Menu>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <DocsVersionSelect />
          <Menu
            navigationItems={navigationItems}
            brandOptions={DOCS_BRAND_OPTIONS}
            activeId={activeId}
            onNavigationSelect={handleNavigationSelect}
            className="min-h-0 flex-1"
          />
        </div>
      </AppShell.Menu>
      <AppShell.Header>
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
      </AppShell.Header>
      <AppShell.Footer>
        <Footer
          links={[
            { label: 'Privacy Policy', href: '#privacy' },
            { label: 'Terms & Conditions', href: '#terms' },
          ]}
        />
      </AppShell.Footer>
    </AppShell>
  )
}

function VersionedDocOutlet() {
  const { versionId } = useDocsVersion()

  return (
    <DocsVersionRouteGuard>
      <Outlet key={versionId} />
    </DocsVersionRouteGuard>
  )
}

const DOCS_SCROLL_STORAGE_PREFIX = 'uds-docs:win-scroll:'

/** Docs chrome scrolls inside `.appshell--main`, not `window` (see `app-shell.scss`). */
function getDocsScrollParent(): HTMLElement | null {
  return document.querySelector('[data-slot="appshell"] .appshell--main')
}

function readDocsScrollTop(): number {
  const el = getDocsScrollParent()
  return el ? el.scrollTop : window.scrollY
}

function setDocsScrollTop(y: number) {
  const el = getDocsScrollParent()
  if (el) {
    el.scrollTop = y
  } else {
    window.scrollTo(0, y)
  }
}

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
 * POP (back/forward): restore scroll for that history entry.
 *
 * Uses `.appshell--main` when present; otherwise falls back to `window`.
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
      setDocsScrollTop(nextY)
      lastScrollY.current = nextY
    } else {
      setDocsScrollTop(0)
      lastScrollY.current = 0
    }
  }, [key, navigationType])

  useEffect(() => {
    const el = getDocsScrollParent()
    const onScroll = () => {
      lastScrollY.current = readDocsScrollTop()
    }
    const target: EventTarget | null = el ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      target.removeEventListener('scroll', onScroll)
    }
  }, [key])

  return null
}

/** Documentation chrome follows the stored site brand (Connect by default); scoped previews set `data-brand` locally. */
function DocsGlobalDefaultBrand() {
  useEffect(() => {
    applyDocsBrandToDocument(readStoredDocsBrand())
  }, [])
  return null
}

export default function DocsApp() {
  return (
    <IconContext.Provider value={{ weight: 'bold', mirrored: false }}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <DocsVersionProvider>
            <DocsGlobalDefaultBrand />
            <DocWindowScrollRestoration />
            <Routes>
              <Route path="/" element={<DocsLayout />}>
                <Route element={<VersionedDocOutlet />}>
                <Route index element={<Navigate to="/docs/introduction" replace />} />
                <Route path="docs/introduction" element={<WelcomePage />} />
                <Route path="docs/welcome" element={<Navigate to="/docs/introduction" replace />} />
                <Route path="docs/getting-started/install" element={<InstallPage />} />
                <Route path="docs/getting-started/usage" element={<UsagePage />} />
                <Route path="docs/getting-started/app-shell" element={<AppShellDemoPage />} />
                <Route path="docs/sections/menu" element={<MenuPage />} />
                <Route path="docs/sections/:slug" element={<ShadcnComponentDocPage />} />
                <Route path="docs/patterns/dashboard" element={<PatternsDashboardPage />} />
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
              </Route>
              <Route path="*" element={<Navigate to="/docs/introduction" replace />} />
            </Routes>
          </DocsVersionProvider>
        </BrowserRouter>
      </TooltipProvider>
    </IconContext.Provider>
  )
}
