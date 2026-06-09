/**
 * Inlined into Figma Plugin API scripts (use_figma). Keep in sync with Figma file
 * variable scopes — see scripts/lib/figma-variable-scopes.mjs (Node re-export).
 */
function cssNameFromFigmaPath(name) {
  return '--' + name.replace(/\//g, '-')
}

function scopesForFigmaVariable(name, type, collectionName) {
  if (type === 'COLOR') {
    if (name.startsWith('brand/') || name.startsWith('system/')) {
      return ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR']
    }
    if (name.startsWith('uds/surface/') || name.startsWith('uds/scrim/')) {
      return ['FRAME_FILL']
    }
    if (name === 'uds/code/bg') return ['FRAME_FILL']
    if (
      name.startsWith('uds/border/') ||
      name.startsWith('uds/focus/ring') ||
      name.startsWith('uds/button/border/')
    ) {
      return ['STROKE_COLOR']
    }
    if (name.startsWith('uds/text/') || (name.startsWith('uds/code/') && name !== 'uds/code/bg')) {
      return ['TEXT_FILL']
    }
    if (name.startsWith('uds/icon/') || name.startsWith('uds/button/icons/')) {
      return ['SHAPE_FILL', 'STROKE_COLOR']
    }
    if (name.startsWith('uds/')) {
      return ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR', 'TEXT_FILL']
    }
    if (collectionName === 'Semantic Colors') {
      return ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR', 'TEXT_FILL']
    }
    return ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR']
  }

  if (type === 'STRING') {
    if (name.includes('font/family') || name === 'uds/font/family') {
      return ['FONT_FAMILY']
    }
    return []
  }

  if (type === 'FLOAT') {
    if (collectionName === 'Elevation' || name.startsWith('uds/elevation/')) return []

    if (collectionName === 'Typography') return ['LINE_HEIGHT']

    if (name.includes('letter-spacing') || collectionName === 'Letter Spacing') {
      return ['LETTER_SPACING']
    }

    if (name.includes('font/weight') || (collectionName === 'Font' && name.includes('weight'))) {
      return ['FONT_WEIGHT']
    }

    if (name.startsWith('uds/blur/')) return ['EFFECT_FLOAT']

    if (collectionName === 'Responsive') {
      if (name.startsWith('uds/type/')) return ['FONT_SIZE']
      if (name === 'uds/container/columns' || name === 'uds/container/margin') return []
      if (name.startsWith('uds/container/')) return ['GAP']
    }

    const cssName = cssNameFromFigmaPath(name)
    if (cssName.includes('border-width') || cssName.includes('focus-ring')) {
      return ['STROKE_FLOAT']
    }
    if (cssName.includes('radius')) return ['CORNER_RADIUS']
    if (cssName.includes('gap') || cssName.includes('spacing')) return ['GAP']
    return ['WIDTH_HEIGHT']
  }

  return []
}
