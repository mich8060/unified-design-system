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
  Footer,
  IconContext,
  Menu,
  Toaster,
  TooltipProvider,
} from '@chghealthcare/unified-design-system'
import { DocsVersionSelect } from './components/DocsVersionSelect'
import { useDocsHeaderSearch } from './components/DocsSearch'
import { applyDocsBrandToDocument, DOCS_SITE_DEFAULT_BRAND } from './doc-site-brand'
import { buildDocsMenuUtilities } from './docs-menu-utilities'
import { LATEST_READOUT_ROUTE } from './readout/readout-months'
import { DOCS_SITE_PACKAGE_VERSION } from './doc-site-version'
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
const ProjectReadoutPage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.ProjectReadoutPage })),
)
const ProjectReleasesPage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.ProjectReleasesPage })),
)
const ProjectRoadmapPage = lazy(() =>
  import('./pages/PlaceholderPages').then((m) => ({ default: m.ProjectRoadmapPage })),
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
  const { headerSearchProps, searchDialog } = useDocsHeaderSearch()

  const activeId = useMemo(() => {
    if (pathname.startsWith('/docs/readout')) return 'readout'
    return routeToNavId[pathname]
  }, [pathname, routeToNavId])

  const handleNavigationSelect = useCallback(
    (id: string) => {
      const route = navIdToRoute[id]
      if (route) navigate(route)
    },
    [navIdToRoute, navigate],
  )

  const menuUtilities = useMemo(() => buildDocsMenuUtilities(navigate), [navigate])

  return (
    <>
      {searchDialog}
      <AppShell
        className="min-h-dvh min-w-0 w-full max-w-full overflow-x-hidden"
        headerSearchProps={headerSearchProps}
      >
      <AppShell.Menu>
        <Menu
          navigationItems={navigationItems}
          defaultBrand={DOCS_SITE_DEFAULT_BRAND}
          toolbar={<DocsVersionSelect />}
          activeId={activeId}
          onNavigationSelect={handleNavigationSelect}
          utilities={menuUtilities}
          className="min-h-0 flex-1"
        />
      </AppShell.Menu>
      <AppShell.Footer>
        <Footer
          links={[
            { label: 'Privacy Policy', href: '#privacy' },
            { label: 'Terms & Conditions', href: '#terms' },
          ]}
        />
      </AppShell.Footer>
    </AppShell>
    </>
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
const DOCS_INTRODUCTION_PATHS = new Set(['/docs/introduction', '/docs/welcome'])

function isDocsIntroductionPath(pathname: string): boolean {
  return DOCS_INTRODUCTION_PATHS.has(pathname)
}

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

/** Re-apply after layout/paint when the scroll parent mounts or lazy routes finish. */
function scheduleDocsScrollTop(y: number) {
  setDocsScrollTop(y)
  requestAnimationFrame(() => {
    setDocsScrollTop(y)
    requestAnimationFrame(() => setDocsScrollTop(y))
  })
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
  const { pathname } = location
  const key = location.key
  const lastScrollY = useRef(0)
  const prevKeyRef = useRef<string | null>(null)
  const prevPathnameRef = useRef(pathname)
  /** React Router reports the document load as POP; enable restore only after the first scroll commit. */
  const popRestoreEnabledRef = useRef(false)

  useEffect(() => {
    const previous = history.scrollRestoration
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    const prevKey = prevKeyRef.current
    const prevPathname = prevPathnameRef.current
    if (prevKey != null && prevKey !== key) {
      const yToSave = isDocsIntroductionPath(prevPathname) ? 0 : lastScrollY.current
      writeStoredScrollY(prevKey, yToSave)
    }
    prevKeyRef.current = key
    prevPathnameRef.current = pathname

    if (isDocsIntroductionPath(pathname)) {
      setDocsScrollTop(0)
      lastScrollY.current = 0
      return
    }

    const stored = readStoredScrollY(key)
    const shouldRestorePop = navigationType === 'POP' && popRestoreEnabledRef.current && stored != null

    if (shouldRestorePop) {
      const nextY = stored
      setDocsScrollTop(nextY)
      lastScrollY.current = nextY
    } else {
      setDocsScrollTop(0)
      lastScrollY.current = 0
    }
  }, [key, navigationType, pathname])

  useEffect(() => {
    if (isDocsIntroductionPath(pathname)) {
      scheduleDocsScrollTop(0)
      lastScrollY.current = 0
      popRestoreEnabledRef.current = true
      return
    }

    const stored = readStoredScrollY(key)
    const shouldRestorePop = navigationType === 'POP' && popRestoreEnabledRef.current && stored != null

    if (shouldRestorePop) {
      scheduleDocsScrollTop(stored)
      lastScrollY.current = stored
    } else {
      scheduleDocsScrollTop(0)
      lastScrollY.current = 0
    }

    popRestoreEnabledRef.current = true
  }, [key, navigationType, pathname])

  useEffect(() => {
    if (isDocsIntroductionPath(pathname)) return

    const el = getDocsScrollParent()
    const onScroll = () => {
      lastScrollY.current = readDocsScrollTop()
    }
    const target: EventTarget | null = el ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      target.removeEventListener('scroll', onScroll)
    }
  }, [key, pathname])

  return null
}

/** Documentation chrome uses the docs default brand (CHG); scoped previews set `data-brand` locally. */
function DocsGlobalDefaultBrand() {
  useEffect(() => {
    applyDocsBrandToDocument(DOCS_SITE_DEFAULT_BRAND)
  }, [])
  return null
}

export default function DocsApp() {
  return (
    <IconContext.Provider value={{ weight: 'bold', mirrored: false }}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <DocsVersionProvider key={DOCS_SITE_PACKAGE_VERSION}>
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
                <Route path="docs/readout" element={<Navigate to={LATEST_READOUT_ROUTE} replace />} />
                <Route path="docs/readout/:monthId" element={<ProjectReadoutPage />} />
                <Route path="docs/releases" element={<ProjectReleasesPage />} />
                <Route path="docs/roadmap" element={<ProjectRoadmapPage />} />
                <Route path="docs/project/readout" element={<Navigate to={LATEST_READOUT_ROUTE} replace />} />
                <Route path="docs/project/updates" element={<Navigate to={LATEST_READOUT_ROUTE} replace />} />
                <Route path="docs/project/releases" element={<Navigate to="/docs/releases" replace />} />
                <Route path="docs/project/roadmap" element={<Navigate to="/docs/roadmap" replace />} />
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
