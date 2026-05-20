import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DOCS_VERSION_STORAGE_KEY, getDocsSiteDefaultVersion } from '../doc-site-version'
import { getDocsVersionOptions } from './manifest'
import { loadDocsVersionBundle, prefetchDefaultDocsVersionBundle, resolveDocsVersionId } from './resolve'
import { resolveDocsRouteForVersion } from './navigation'
import type { DocsVersionBundle, DocsVersionId } from './types'

type DocsVersionContextValue = {
  versionId: DocsVersionId
  bundle: DocsVersionBundle
  status: 'loading' | 'ready'
  setDocsVersion: (id: DocsVersionId) => void
  versionOptions: ReturnType<typeof getDocsVersionOptions>
}

const DocsVersionContext = createContext<DocsVersionContextValue | null>(null)

export function DocsVersionProvider({ children }: { children: ReactNode }) {
  const [versionId, setVersionId] = useState<DocsVersionId>(() => resolveDocsVersionId(getDocsSiteDefaultVersion()))
  const [bundle, setBundle] = useState<DocsVersionBundle | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')

  useLayoutEffect(() => {
    setVersionId(getDocsSiteDefaultVersion())
    try {
      window.localStorage.removeItem(DOCS_VERSION_STORAGE_KEY)
    } catch {
      /* private mode */
    }
  }, [])

  useEffect(() => {
    void prefetchDefaultDocsVersionBundle()
  }, [])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    void loadDocsVersionBundle(versionId).then((nextBundle) => {
      if (cancelled) return
      setBundle(nextBundle)
      setStatus('ready')
    })

    return () => {
      cancelled = true
    }
  }, [versionId])

  const setDocsVersion = useCallback((id: DocsVersionId) => {
    setVersionId(resolveDocsVersionId(id))
  }, [])

  const value = useMemo<DocsVersionContextValue | null>(() => {
    if (!bundle) return null
    return {
      versionId,
      bundle,
      status,
      setDocsVersion,
      versionOptions: getDocsVersionOptions(),
    }
  }, [bundle, setDocsVersion, status, versionId])

  if (!value) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-neutral-500" role="status">
        Loading documentation…
      </div>
    )
  }

  return <DocsVersionContext.Provider value={value}>{children}</DocsVersionContext.Provider>
}

export function useDocsVersion() {
  const context = useContext(DocsVersionContext)
  if (!context) {
    throw new Error('useDocsVersion must be used within DocsVersionProvider.')
  }
  return {
    versionId: context.versionId,
    status: context.status,
    setDocsVersion: context.setDocsVersion,
    versionOptions: context.versionOptions,
  }
}

export function useDocsVersionBundle() {
  const context = useContext(DocsVersionContext)
  if (!context) {
    throw new Error('useDocsVersionBundle must be used within DocsVersionProvider.')
  }
  return context.bundle
}

export function DocsVersionRouteGuard({ children }: { children: ReactNode }) {
  const bundle = useDocsVersionBundle()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const resolved = resolveDocsRouteForVersion(bundle.navigation, pathname)
    if (resolved !== pathname) {
      navigate(resolved, { replace: true })
    }
  }, [bundle.id, bundle.navigation, navigate, pathname])

  return <>{children}</>
}
