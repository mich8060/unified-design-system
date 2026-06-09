// Helpers for serving the docs SPA from a deployment subpath (e.g. GitHub Pages
// at "/unified-design-system/"). `import.meta.env.BASE_URL` reflects the Vite
// `base` resolved for the current build: "/" in dev, the repo subpath in prod.
const rawBase = import.meta.env.BASE_URL

/** Router basename for the docs SPA (no trailing slash, except the root "/"). */
export const docsRouterBasename = rawBase === '/' ? '/' : rawBase.replace(/\/$/, '')

/**
 * Prefix an app-root-relative path (e.g. "/showcase/x.png" or "/docs/roadmap")
 * with the deployment base path so it resolves correctly when the site is served
 * from a subpath. External URLs and relative paths are returned unchanged.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path
  return `${rawBase.replace(/\/$/, '')}${path}`
}
