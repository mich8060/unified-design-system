/**
 * Minimal Figma plugin runtime for Branding batch builds only.
 */

async function findVar(name) {
  const vars = await figma.variables.getLocalVariablesAsync()
  return vars.find((v) => v.name === name) ?? null
}

async function bindFill(node, varName) {
  const v = await findVar(varName)
  if (!v || !('fills' in node)) return
  const base = { type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, visible: true }
  const bound = figma.variables.setBoundVariableForPaint(base, 'color', v)
  node.fills = [{ ...bound, visible: true }]
}

async function bindRadius(node, varName) {
  const v = await findVar(varName)
  if (!v) return
  node.setBoundVariable('topLeftRadius', v)
  node.setBoundVariable('topRightRadius', v)
  node.setBoundVariable('bottomLeftRadius', v)
  node.setBoundVariable('bottomRightRadius', v)
}

function gridLayoutVariants(set, cols, cellW, cellH, gap = 24) {
  const variants = set.children
  variants.forEach((variant, idx) => {
    const col = idx % cols
    const row = Math.floor(idx / cols)
    variant.x = col * (cellW + gap)
    variant.y = row * (cellH + gap)
  })
  const rows = Math.ceil(variants.length / cols)
  const pad = 40
  set.resize(
    cols * cellW + (cols - 1) * gap + pad * 2,
    rows * cellH + (rows - 1) * gap + pad * 2,
  )
}

function nextCanvasY(page, startY = 1900) {
  let maxBottom = startY
  for (const n of page.children) {
    if ('height' in n) maxBottom = Math.max(maxBottom, n.y + n.height + 80)
  }
  return maxBottom
}

async function ensurePage(name) {
  let page = figma.root.children.find((p) => p.type === 'PAGE' && p.name === name)
  if (!page) {
    page = figma.createPage()
    page.name = name
  }
  await figma.setCurrentPageAsync(page)
  return page
}

const BRANDING_PLUGIN_KEYS = {
  Wireframe: 'wireframe',
  Connect: 'connect',
  CHG: 'chg',
  Locumsmart: 'locumsmart',
  Modio: 'modio',
  CareerMD: 'careermd',
  MyWeatherby: 'weatherby',
  MyCompHealth: 'comphealth',
  'Design System': 'design-system',
}

function brandingSvgForAppearance(appearance, symbol) {
  const slug = BRANDING_PLUGIN_KEYS[appearance]
  if (slug) {
    const kind = symbol ? 'mark' : 'wordmark'
    const stored = figma.root.getSharedPluginData('uds', `branding/${slug}/${kind}`)
    if (stored) return stored
  }
  if (typeof BRANDING_SVGS !== 'undefined' && BRANDING_SVGS[appearance]) {
    return symbol ? BRANDING_SVGS[appearance].mark : BRANDING_SVGS[appearance].wordmark
  }
  return null
}

async function buildBrandingVariant(comp, spec, axis) {
  const isSymbol = axis.Symbol === 'True'
  const frame = isSymbol
    ? (spec.markFrame ?? { width: 64, height: 64 })
    : (spec.wordmarkFrame ?? { width: 200, height: 80 })
  const frameW = frame.width
  const frameH = frame.height
  comp.resize(frameW, frameH)
  comp.layoutMode = 'NONE'
  comp.clipsContent = true
  comp.fills = []

  const svgString = brandingSvgForAppearance(axis.Appearance, isSymbol)
  if (!svgString) {
    const placeholder = figma.createRectangle()
    placeholder.name = isSymbol ? 'Mark placeholder' : 'Wordmark placeholder'
    placeholder.resize(frameW, frameH)
    placeholder.x = 0
    placeholder.y = 0
    await bindFill(placeholder, 'uds/surface/tertiary')
    await bindRadius(placeholder, 'uds/radius/4')
    comp.appendChild(placeholder)
    return
  }

  const art = figma.createNodeFromSvg(svgString)
  art.name = isSymbol ? 'Mark' : 'Wordmark'
  const scale = Math.min(frameW / art.width, frameH / art.height, 1)
  const w = Math.max(1, art.width * scale)
  const h = Math.max(1, art.height * scale)
  art.resize(w, h)
  const alignStart = !isSymbol
  art.x = alignStart ? 0 : Math.round((frameW - w) / 2)
  art.y = Math.round((frameH - h) / 2)
  comp.appendChild(art)
}

async function buildBrandingBatch(spec) {
  const page = await ensurePage(spec.pageName ?? 'UDS Components')
  if (spec.replaceExisting) {
    const existing = page.findOne(
      (n) => n.type === 'COMPONENT_SET' && n.name === spec.figmaName,
    )
    if (existing) existing.remove()
    for (const child of [...page.children]) {
      if (
        child.type === 'COMPONENT' &&
        child.name.startsWith('Appearance=') &&
        child.name.includes('Symbol=')
      ) {
        child.remove()
      }
    }
  }
  const components = []
  for (const appearance of spec.appearances) {
    for (const symbol of ['False', 'True']) {
      const comp = figma.createComponent()
      comp.name = `Appearance=${appearance}, Symbol=${symbol}`
      await buildBrandingVariant(comp, spec, { Appearance: appearance, Symbol: symbol })
      page.appendChild(comp)
      components.push(comp)
    }
  }
  return {
    batch: spec.batchIndex ?? 0,
    created: components.length,
    samples: components.map((c) => c.name),
  }
}

async function combineBrandingSet() {
  const page = await ensurePage('UDS Components')
  const existing = page.findOne(
    (n) => n.type === 'COMPONENT_SET' && n.name === 'Branding',
  )
  if (existing) existing.remove()

  const comps = page.children.filter(
    (n) =>
      n.type === 'COMPONENT' &&
      n.name.startsWith('Appearance=') &&
      n.name.includes('Symbol='),
  )
  if (comps.length < 16) {
    return { err: 'expected 16 components', found: comps.length, names: comps.map((c) => c.name) }
  }
  const set = figma.combineAsVariants(comps, page)
  set.name = 'Branding'
  set.x = 100
  set.y = nextCanvasY(page)
  gridLayoutVariants(set, 8, 220, 96)
  return {
    nodeId: set.id,
    name: set.name,
    variantCount: set.children.length,
    samples: set.children.slice(0, 4).map((c) => c.name),
  }
}
