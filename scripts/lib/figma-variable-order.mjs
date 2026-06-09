import { compareCssTokenNames, compareTypeTokenNames } from '../uds-token-sort.mjs'

function cssNameFromFigmaPath(figmaPath) {
  return `--${figmaPath.replace(/\//g, '-')}`
}

/** Base semantic step before /brand/ or /link/ subpaths (matches Figma manual order). */
function semanticSubpathRank(figmaPath) {
  if (figmaPath.includes('/link/')) return 3
  if (figmaPath.includes('/brand/')) return 2
  return 1
}

/** Figma Layout collection section order (matches manual Figma ordering). */
const LAYOUT_SECTION_RANK = [
  ['uds/spacing/'],
  ['uds/radius/'],
  ['uds/gap/'],
  ['uds/blur/'],
  ['uds/border/width/'],
  ['uds/container/'],
  ['uds/focus/ring/'],
  ['uds/sizing/'],
  ['uds/elevation/'],
  ['uds/font/family'],
  ['uds/font/weight/'],
]

/** Blur token order as arranged in Figma (2xl last). */
const BLUR_STEP_ORDER = ['0', 'sm', 'md', 'lg', 'xl', '3xl', '4xl', '5xl', '6xl', '2xl']

/** Fixed container max-width order in Layout collection. */
const CONTAINER_WIDTH_ORDER = [
  'xs',
  'narrow',
  'prose',
  'sm',
  'md',
  'content',
  'lg',
  'xl',
  'wide',
  '2xl',
]

/**
 * Brand collection semantic groups (after brand ramp). Matches Figma manual order:
 * surface → border/primary → text → border/* → code → color → focus → icon → logo → scrim → shadow → system → button
 * @param {string} figmaPath
 */
export function brandSemanticGroupRank(figmaPath) {
  if (figmaPath.startsWith('uds/surface/')) return 100
  if (figmaPath === 'uds/border/primary') return 200
  if (figmaPath.startsWith('uds/text/')) return 300
  if (figmaPath.startsWith('uds/border/')) return 400
  if (figmaPath.startsWith('uds/code/')) return 500
  if (figmaPath.startsWith('uds/color/')) return 600
  if (figmaPath.startsWith('uds/focus/')) return 700
  if (figmaPath.startsWith('uds/icon/')) return 800
  if (figmaPath.startsWith('uds/logo/')) return 900
  if (figmaPath.startsWith('uds/scrim/')) return 1000
  if (figmaPath.startsWith('uds/shadow/')) return 1100
  if (figmaPath.startsWith('uds/system/')) return 1200
  if (figmaPath.startsWith('uds/button/')) return 1300
  return 9000
}

/** @param {string} a Figma path @param {string} b Figma path */
export function compareBrandSemanticPaths(a, b) {
  const ga = brandSemanticGroupRank(a)
  const gb = brandSemanticGroupRank(b)
  if (ga !== gb) return ga - gb
  const ra = semanticSubpathRank(a)
  const rb = semanticSubpathRank(b)
  if (ra !== rb) return ra - rb
  return compareCssTokenNames(cssNameFromFigmaPath(a), cssNameFromFigmaPath(b))
}

/** @param {[string, ...unknown[]]} a @param {[string, ...unknown[]]} b */
export function compareBrandSemanticEntries(a, b) {
  const pathA = a[0].replace(/^--/, '').replace(/-/g, '/')
  const pathB = b[0].replace(/^--/, '').replace(/-/g, '/')
  return compareBrandSemanticPaths(pathA, pathB)
}

function layoutSectionRank(figmaPath) {
  for (let i = 0; i < LAYOUT_SECTION_RANK.length; i++) {
    const prefixes = LAYOUT_SECTION_RANK[i]
    if (prefixes.some((p) => figmaPath.startsWith(p) || figmaPath === p.replace(/\/$/, ''))) {
      return i * 100
    }
  }
  return 9000
}

function blurStepRank(figmaPath) {
  const step = figmaPath.replace('uds/blur/', '')
  const idx = BLUR_STEP_ORDER.indexOf(step)
  return idx >= 0 ? idx : 999
}

function containerWidthRank(figmaPath) {
  const step = figmaPath.replace('uds/container/', '')
  const idx = CONTAINER_WIDTH_ORDER.indexOf(step)
  return idx >= 0 ? idx : 999
}

/** @param {string} cssName --uds-* custom property */
export function compareLayoutCssNames(a, b) {
  const pathA = a.replace(/^--/, '').replace(/-/g, '/')
  const pathB = b.replace(/^--/, '').replace(/-/g, '/')
  const sa = layoutSectionRank(pathA)
  const sb = layoutSectionRank(pathB)
  if (sa !== sb) return sa - sb
  if (pathA.startsWith('uds/blur/') && pathB.startsWith('uds/blur/')) {
    return blurStepRank(pathA) - blurStepRank(pathB)
  }
  if (
    pathA.startsWith('uds/container/') &&
    pathB.startsWith('uds/container/') &&
    !pathA.includes('padding') &&
    !pathB.includes('padding')
  ) {
    return containerWidthRank(pathA) - containerWidthRank(pathB)
  }
  return compareCssTokenNames(a, b)
}

/** @param {[string, ...unknown[]]} a @param {[string, ...unknown[]]} b */
export function compareLayoutEntries(a, b) {
  return compareLayoutCssNames(a[0], b[0])
}

const RESPONSIVE_SECTION_RANK = [
  ['uds/type/'],
  ['uds/container/'],
  ['uds/letter-spacing/'],
]

function responsiveSectionRank(figmaPath) {
  for (let i = 0; i < RESPONSIVE_SECTION_RANK.length; i++) {
    if (RESPONSIVE_SECTION_RANK[i].some((p) => figmaPath.startsWith(p))) return i * 100
  }
  return 9000
}

/** @param {string} cssName */
export function compareResponsiveCssNames(a, b) {
  const pathA = a.replace(/^--/, '').replace(/-/g, '/').replace(/\/font-size$/, '')
  const pathB = b.replace(/^--/, '').replace(/-/g, '/').replace(/\/font-size$/, '')
  const pathALetter = pathA.replace(/^uds\/type\//, 'uds/letter-spacing/')
  const pathBLetter = pathB.replace(/^uds\/type\//, 'uds/letter-spacing/')
  const sa = responsiveSectionRank(pathA.startsWith('uds/letter-spacing') ? pathA : pathALetter)
  const sb = responsiveSectionRank(pathB.startsWith('uds/letter-spacing') ? pathB : pathBLetter)
  if (sa !== sb) return sa - sb
  if (pathA.startsWith('uds/type/') || pathB.startsWith('uds/type/')) {
    return compareTypeTokenNames(a, b)
  }
  return compareCssTokenNames(a, b)
}

/** @param {[string, ...unknown[]]} a @param {[string, ...unknown[]]} b */
export function compareResponsiveEntries(a, b) {
  return compareResponsiveCssNames(a[0], b[0])
}

/** Figma Responsive collection mode order. */
export const RESPONSIVE_MODE_ORDER = ['Desktop', 'Tablet', 'Mobile']
