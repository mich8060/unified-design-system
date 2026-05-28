/** @typedef {'scale' | 'step' | 'alpha'} SegmentKind */

export const COLOR_SCALE_STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

export const SEMANTIC_STEP_ORDER = ['primary', 'secondary', 'tertiary', 'quaternary']

const SCALE_RANK = new Map(COLOR_SCALE_STEPS.map((n, i) => [String(n), i]))

/**
 * @param {string} segment
 * @returns {{ kind: SegmentKind, rank: number, label: string }}
 */
function segmentSortKey(segment) {
  const scaleRank = SCALE_RANK.get(segment)
  if (scaleRank != null) {
    return { kind: 'scale', rank: scaleRank, label: segment }
  }
  const stepRank = SEMANTIC_STEP_ORDER.indexOf(segment)
  if (stepRank >= 0) {
    return { kind: 'step', rank: stepRank, label: segment }
  }
  return { kind: 'alpha', rank: 0, label: segment }
}

/**
 * Compare CSS custom property names for design-token ordering:
 * numeric ramps 25→1000, then primary→quaternary, then alphabetical.
 * @param {string} a
 * @param {string} b
 */
export function compareCssTokenNames(a, b) {
  const segsA = a.replace(/^--/, '').split('-')
  const segsB = b.replace(/^--/, '').split('-')
  const len = Math.max(segsA.length, segsB.length)

  for (let i = 0; i < len; i++) {
    const sa = segsA[i]
    const sb = segsB[i]
    if (sa === undefined) return -1
    if (sb === undefined) return 1
    if (sa === sb) continue

    const ka = segmentSortKey(sa)
    const kb = segmentSortKey(sb)

    if (ka.kind === 'scale' && kb.kind === 'scale') {
      if (ka.rank !== kb.rank) return ka.rank - kb.rank
      continue
    }
    if (ka.kind === 'step' && kb.kind === 'step') {
      if (ka.rank !== kb.rank) return ka.rank - kb.rank
      continue
    }

    // Prefer scale/step ordering when only one side is a ranked token
    if (ka.kind === 'scale' && kb.kind !== 'scale') return -1
    if (kb.kind === 'scale' && ka.kind !== 'scale') return 1
    if (ka.kind === 'step' && kb.kind !== 'step') return -1
    if (kb.kind === 'step' && ka.kind !== 'step') return 1

    const cmp = sa.localeCompare(sb, undefined, { numeric: true })
    if (cmp !== 0) return cmp
  }

  return 0
}

/**
 * @param {string} cssName
 * @param {string} hexOrRgba
 */
export function compareColorTokenEntries(a, b) {
  const byName = compareCssTokenNames(a[0], b[0])
  return byName !== 0 ? byName : String(a[0]).localeCompare(String(b[0]))
}

export const TYPE_VARIANT_ORDER = ['display', 'heading', 'body']

const TYPE_VARIANT_RANK = new Map(TYPE_VARIANT_ORDER.map((v, i) => [v, i]))

const TYPE_TOKEN_RE = /^--uds-type-(display|heading|body)-(\d+)/

/**
 * Compare typography token names by variant (display → heading → body),
 * then by size descending (largest first).
 * @param {string} a
 * @param {string} b
 */
export function compareTypeTokenNames(a, b) {
  const ma = a.match(TYPE_TOKEN_RE)
  const mb = b.match(TYPE_TOKEN_RE)
  if (!ma || !mb) return compareCssTokenNames(a, b)

  const rankA = TYPE_VARIANT_RANK.get(ma[1]) ?? TYPE_VARIANT_ORDER.length
  const rankB = TYPE_VARIANT_RANK.get(mb[1]) ?? TYPE_VARIANT_ORDER.length
  if (rankA !== rankB) return rankA - rankB

  const sizeA = Number(ma[2])
  const sizeB = Number(mb[2])
  if (sizeA !== sizeB) return sizeB - sizeA // largest first

  return a.localeCompare(b)
}

/**
 * Entry comparator (`[cssName, ...]`) using {@link compareTypeTokenNames}.
 * @param {[string, ...unknown[]]} a
 * @param {[string, ...unknown[]]} b
 */
export function compareTypeTokenEntries(a, b) {
  return compareTypeTokenNames(a[0], b[0])
}
