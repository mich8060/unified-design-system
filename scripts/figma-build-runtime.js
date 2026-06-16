/**
 * Inlined into generated use_figma scripts. Runs inside Figma Plugin API context.
 */

function cartesianProduct(arrays) {
  return arrays.reduce(
    (acc, curr) => acc.flatMap((combo) => curr.map((val) => [...combo, val])),
    [[]],
  )
}

async function findVar(name) {
  const vars = await figma.variables.getLocalVariablesAsync()
  return vars.find((v) => v.name === name) ?? null
}

async function bindFill(node, varName) {
  const v = await findVar(varName)
  if (!v || !('fills' in node)) return
  const existing = node.fills
  const base =
    Array.isArray(existing) && existing.length > 0
      ? { ...existing[0], visible: true }
      : { type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, visible: true }
  const bound = figma.variables.setBoundVariableForPaint(base, 'color', v)
  node.fills = [{ ...bound, visible: true }]
}

async function bindStroke(node, varName, weight = 1) {
  const v = await findVar(varName)
  if (!v || !('strokes' in node)) return
  node.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]
  node.strokeWeight = weight
  node.strokes = [
    figma.variables.setBoundVariableForPaint(node.strokes[0], 'color', v),
  ]
}

async function bindRadius(node, varName) {
  const v = await findVar(varName)
  if (!v) return
  node.setBoundVariable('topLeftRadius', v)
  node.setBoundVariable('topRightRadius', v)
  node.setBoundVariable('bottomLeftRadius', v)
  node.setBoundVariable('bottomRightRadius', v)
}

async function bindGap(node, varName) {
  const v = await findVar(varName)
  if (!v || !('itemSpacing' in node)) return
  node.setBoundVariable('itemSpacing', v)
}

async function bindText(node, { fill, size, weight }) {
  if (fill) await bindFill(node, fill)
  const sizeVar = size ? await findVar(size) : null
  if (sizeVar) node.setBoundVariable('fontSize', sizeVar)
  const weightVar = weight ? await findVar(weight) : null
  if (weightVar) node.setBoundVariable('fontWeight', weightVar)
  const familyVar = await findVar('uds/font/family/inter')
  if (familyVar) node.setBoundVariable('fontFamily', familyVar)
}

/** Apply a local Figma text style (e.g. `Body/16/Medium`), then optional fill token. */
async function applyLocalTextStyle(node, styleName, fillVarName) {
  const style = (await figma.getLocalTextStylesAsync()).find((s) => s.name === styleName)
  if (!style || node.type !== 'TEXT') return null
  await figma.loadFontAsync(style.fontName)
  await node.setTextStyleIdAsync(style.id)
  if (fillVarName) await bindFill(node, fillVarName)
  return style
}

async function loadInter() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' })
}

function variantName(axes, combo) {
  return axes.map((ax, i) => `${ax}=${combo[i]}`).join(', ')
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

async function buildTabsFromSpec(spec) {
  const page = await ensurePage(spec.pageName ?? 'UDS Components')
  if (spec.replaceExisting) {
    for (const node of [...page.children]) {
      if (
        node.type === 'COMPONENT_SET' &&
        (node.name === spec.figmaName || /^Tabs \(\d+\)$/.test(node.name))
      ) {
        node.remove()
      }
    }
  }

  await loadInter()
  const appearances = spec.axes?.Appearance ?? ['Pill', 'Line']
  const fills = spec.axes?.Fill ?? ['false', 'true']
  const tabCounts = spec.tabCounts ?? [2, 3, 4, 5, 6]
  const components = []

  for (const appearance of appearances) {
    for (const fill of fills) {
      for (const tabCount of tabCounts) {
        const count = Number(tabCount)
        for (let active = 1; active <= count; active++) {
          const comp = figma.createComponent()
          comp.name = `Appearance=${appearance}, Tabs=${tabCount}, Active=${active}, Fill=${fill}`
          await buildTabsVariant(comp, spec, {
            Appearance: appearance,
            Tabs: String(tabCount),
            Active: String(active),
            Fill: fill,
          })
          page.appendChild(comp)
          components.push(comp)
        }
      }
    }
  }

  const set = figma.combineAsVariants(components, page)
  set.name = spec.figmaName
  set.x = 100
  set.y = nextCanvasY(page)
  gridLayoutVariants(
    set,
    spec.gridCols ?? 6,
    spec.gridCellW ?? 200,
    spec.gridCellH ?? 52,
  )

  return {
    skipped: false,
    nodeId: set.id,
    name: set.name,
    variantCount: set.children.length,
    samples: set.children.slice(0, 4).map((c) => c.name),
  }
}

async function buildFromSpec(spec) {
  if (spec.kind === 'tabs') {
    return await buildTabsFromSpec(spec)
  }

  const page = await ensurePage(spec.pageName ?? 'UDS Components')
  const existing = page.findOne(
    (n) => n.type === 'COMPONENT_SET' && n.name === spec.figmaName,
  )
  if (existing && spec.replaceExisting) {
    existing.remove()
  } else if (existing) {
    return { skipped: true, nodeId: existing.id, name: existing.name }
  }

  await loadInter()
  const axisNames = Object.keys(spec.axes)
  const axisValues = axisNames.map((k) => spec.axes[k])
  const combinations = cartesianProduct(axisValues)
  const components = []

  for (const combo of combinations) {
    const comp = figma.createComponent()
    comp.name = variantName(axisNames, combo)
    const axis = Object.fromEntries(axisNames.map((k, i) => [k, combo[i]]))
    if (spec.fixedColor) axis.Color = spec.fixedColor
    if (spec.fixedTone) axis.Tone = spec.fixedTone

    if (spec.kind === 'badge') {
      await buildBadgeVariant(comp, spec, axis)
    } else if (spec.kind === 'input') {
      await buildInputVariant(comp, spec, axis)
    } else if (spec.kind === 'checkbox') {
      await buildCheckboxVariant(comp, spec, axis)
    } else if (spec.kind === 'switch') {
      await buildSwitchVariant(comp, spec, axis)
    } else if (spec.kind === 'skeleton') {
      await buildSkeletonVariant(comp, spec, axis)
    } else if (spec.kind === 'spinner') {
      await buildSpinnerVariant(comp, spec, axis)
    } else if (spec.kind === 'label') {
      await buildLabelVariant(comp, spec, axis)
    } else if (spec.kind === 'dot-status') {
      await buildDotStatusVariant(comp, spec, axis)
    } else if (spec.kind === 'avatar') {
      await buildAvatarVariant(comp, spec, axis)
    } else if (spec.kind === 'toggle') {
      await buildToggleVariant(comp, spec, axis)
    } else if (spec.kind === 'radio') {
      await buildRadioVariant(comp, spec, axis)
    } else if (spec.kind === 'textarea') {
      await buildTextareaVariant(comp, spec, axis)
    } else if (spec.kind === 'progress') {
      await buildProgressVariant(comp, spec, axis)
    } else if (spec.kind === 'slider') {
      await buildSliderVariant(comp, spec, axis)
    } else if (spec.kind === 'separator') {
      await buildSeparatorVariant(comp, spec, axis)
    } else if (spec.kind === 'kbd') {
      await buildKbdVariant(comp, spec, axis)
    } else if (spec.kind === 'link') {
      await buildLinkVariant(comp, spec, axis)
    } else if (spec.kind === 'text') {
      await buildTextVariant(comp, spec, axis)
    } else if (spec.kind === 'status') {
      await buildStatusVariant(comp, spec, axis)
    } else if (spec.kind === 'alert') {
      await buildAlertVariant(comp, spec, axis)
    } else if (spec.kind === 'card') {
      await buildCardVariant(comp, spec, axis)
    } else if (spec.kind === 'input-group') {
      await buildInputGroupVariant(comp, spec, axis)
    } else if (spec.kind === 'search-input') {
      await buildSearchInputVariant(comp, spec, axis)
    } else if (spec.kind === 'date-input') {
      await buildDateInputVariant(comp, spec, axis)
    } else if (spec.kind === 'date-range-input') {
      await buildDateRangeInputVariant(comp, spec, axis)
    } else if (spec.kind === 'combobox-input') {
      await buildComboboxInputVariant(comp, spec, axis)
    } else if (spec.kind === 'combobox-item') {
      await buildComboboxItemVariant(comp, spec, axis)
    } else if (spec.kind === 'field') {
      await buildFieldVariant(comp, spec, axis)
    } else if (spec.kind === 'file-upload') {
      await buildFileUploadVariant(comp, spec, axis)
    } else if (spec.kind === 'file-upload-cards') {
      await buildFileUploadCardsVariant(comp, spec, axis)
    } else if (spec.kind === 'menu') {
      await buildMenuVariant(comp, spec, axis)
    } else if (spec.kind === 'check-list' || spec.kind === 'check-list-control') {
      await buildCheckListVariant(comp, spec, axis)
    } else if (spec.kind === 'collapsible') {
      await buildCollapsibleVariant(comp, spec, axis)
    } else if (spec.kind === 'context-menu-item') {
      await buildContextMenuItemVariant(comp, spec, axis)
    } else if (spec.kind === 'context-menu-label') {
      await buildContextMenuLabelVariant(comp, spec, axis)
    } else if (spec.kind === 'context-menu-separator') {
      await buildContextMenuSeparatorVariant(comp, spec, axis)
    } else if (spec.kind === 'context-menu') {
      await buildContextMenuVariant(comp, spec, axis)
    } else if (spec.kind === 'dropdown-menu') {
      await buildDropdownMenuVariant(comp, spec, axis)
    } else if (spec.kind === 'empty') {
      await buildEmptyVariant(comp, spec, axis)
    } else if (spec.kind === 'medallion') {
      await buildMedallionVariant(comp, spec, axis)
    } else if (spec.kind === 'alert-dialog') {
      await buildAlertDialogVariant(comp, spec, axis)
    } else if (spec.kind === 'dialog') {
      await buildDialogVariant(comp, spec, axis)
    } else if (spec.kind === 'drawer') {
      await buildDrawerVariant(comp, spec, axis)
    } else if (spec.kind === 'branding') {
      await buildBrandingVariant(comp, spec, axis)
    } else {
      comp.resize(80, 32)
      await bindFill(comp, 'uds/surface/tertiary')
    }

    page.appendChild(comp)
    components.push(comp)
  }

  const set = figma.combineAsVariants(components, page)
  set.name = spec.figmaName
  set.x = 100
  set.y = nextCanvasY(page)
  const cols = Math.max(1, spec.gridCols ?? axisValues[axisValues.length - 1]?.length ?? 4)
  const cellW = spec.gridCellW ?? 280
  const cellH = spec.gridCellH ?? 64
  gridLayoutVariants(set, cols, cellW, cellH)

  return {
    skipped: false,
    nodeId: set.id,
    name: set.name,
    variantCount: set.children.length,
    samples: set.children.slice(0, 3).map((c) => c.name),
  }
}

const BADGE_CHROMATIC_ACCENTS = [
  'red',
  'orange',
  'yellow',
  'emerald',
  'green',
  'sky',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'fuchsia',
  'magenta',
]

function badgeAccentSlug(figmaAccent) {
  return String(figmaAccent).toLowerCase()
}

function accentColorToken(accent, step) {
  return `uds/color/accent/${accent}/${step}`
}

/** Mirrors badge.tsx chromaticAccentStyle + semanticAccentClassName (light mode tokens). */
function resolveBadgeStyle(figmaAccent, figmaAppearance) {
  const accent = badgeAccentSlug(figmaAccent)
  const appearance = figmaAppearance

  if (BADGE_CHROMATIC_ACCENTS.includes(accent)) {
    switch (appearance) {
      case 'Subtle':
        return {
          fill: null,
          text: accentColorToken(accent, 600),
          stroke: null,
          strokeWeight: 0,
        }
      case 'Pastel':
        return {
          fill: accentColorToken(accent, 100),
          text: accentColorToken(accent, 800),
          stroke: null,
          strokeWeight: 0,
        }
      case 'Outlined':
        return {
          fill: null,
          text: accentColorToken(accent, 600),
          stroke: accentColorToken(accent, 500),
          strokeWeight: 1,
        }
      case 'Solid': {
        const darkFg = accent === 'yellow' || accent === 'orange'
        return {
          fill: accentColorToken(accent, 500),
          text: darkFg ? 'uds/color/black' : 'uds/color/white',
          stroke: null,
          strokeWeight: 0,
        }
      }
      default:
        return { fill: null, text: 'uds/text/primary', stroke: null, strokeWeight: 0 }
    }
  }

  if (accent === 'neutral') {
    switch (appearance) {
      case 'Subtle':
        return {
          fill: null,
          text: 'uds/text/secondary',
          stroke: null,
          strokeWeight: 0,
        }
      case 'Pastel':
        return {
          fill: 'uds/color/neutrals/100',
          text: 'uds/text/primary',
          stroke: null,
          strokeWeight: 0,
        }
      case 'Outlined':
        return {
          fill: null,
          text: 'uds/text/secondary',
          stroke: 'uds/color/neutrals/400',
          strokeWeight: 1,
        }
      case 'Solid':
        return {
          fill: 'uds/color/neutrals/200',
          text: 'uds/text/primary',
          stroke: null,
          strokeWeight: 0,
        }
      default:
        return { fill: null, text: 'uds/text/primary', stroke: null, strokeWeight: 0 }
    }
  }

  if (accent === 'transparent') {
    switch (appearance) {
      case 'Subtle':
        return {
          fill: null,
          text: 'uds/text/secondary',
          stroke: null,
          strokeWeight: 0,
        }
      case 'Pastel':
        return {
          fill: 'uds/color/neutrals/50',
          text: 'uds/text/primary',
          stroke: null,
          strokeWeight: 0,
        }
      case 'Outlined':
        return {
          fill: null,
          text: 'uds/text/secondary',
          stroke: 'uds/border/primary',
          strokeWeight: 1,
        }
      case 'Solid':
        return {
          fill: 'uds/color/white',
          text: 'uds/text/primary',
          stroke: 'uds/border/primary',
          strokeWeight: 1,
        }
      default:
        return { fill: null, text: 'uds/text/primary', stroke: null, strokeWeight: 0 }
    }
  }

  if (accent === 'inverse') {
    switch (appearance) {
      case 'Subtle':
        return {
          fill: null,
          text: 'uds/text/primary',
          stroke: null,
          strokeWeight: 0,
        }
      case 'Pastel':
        return {
          fill: 'uds/color/neutrals/100',
          text: 'uds/text/primary',
          stroke: null,
          strokeWeight: 0,
        }
      case 'Outlined':
        return {
          fill: null,
          text: 'uds/text/primary',
          stroke: 'uds/color/neutrals/700',
          strokeWeight: 1,
        }
      case 'Solid':
        return {
          fill: 'uds/color/black',
          text: 'uds/color/white',
          stroke: null,
          strokeWeight: 0,
        }
      default:
        return { fill: null, text: 'uds/text/primary', stroke: null, strokeWeight: 0 }
    }
  }

  return { fill: null, text: 'uds/text/primary', stroke: null, strokeWeight: 0 }
}

async function buildBadgeVariant(comp, spec, axis) {
  const sizeKey = axis.Size ?? 'Default'
  const shapeKey = axis.Shape ?? 'Pill'
  const padH = spec.paddingH?.[sizeKey] ?? spec.paddingH ?? 8
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.paddingLeft = padH
  comp.paddingRight = padH
  comp.paddingTop = sizeKey === 'Small' ? 2 : 4
  comp.paddingBottom = sizeKey === 'Small' ? 2 : 4
  comp.itemSpacing = 8
  await bindGap(comp, spec.gapVar ?? 'uds/gap/8')

  const style = resolveBadgeStyle(axis.Accent, axis.Appearance)
  if (style.fill) await bindFill(comp, style.fill)
  else comp.fills = []
  if (style.stroke) await bindStroke(comp, style.stroke, style.strokeWeight ?? 1)
  const radiusToken =
    spec.radiusByShape?.[shapeKey] ?? (shapeKey === 'Rect' ? 'uds/radius/2' : 'uds/radius/9999')
  await bindRadius(comp, radiusToken)

  const text = figma.createText()
  text.fontName = { family: 'Inter', style: 'Medium' }
  text.fontSize = sizeKey === 'Small' ? 10 : 12
  text.characters = spec.label ?? 'Label'
  await bindText(text, { fill: style.text })
  comp.appendChild(text)
  text.layoutSizingHorizontal = 'HUG'
}

async function buildInputVariant(comp, spec, axis) {
  const sizeKey = axis.Size === 'Compact' ? 'Compact' : axis.Size
  const h = spec.heightBySize[sizeKey] ?? spec.heightBySize[axis.Size] ?? 44
  const w = spec.width ?? 452
  comp.resize(w, h)
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.paddingLeft = spec.paddingH ?? 12
  comp.paddingRight = spec.paddingH ?? 12
  const fill =
    spec.fillByState?.[axis.State] ?? spec.fillVar ?? 'uds/surface/primary'
  await bindFill(comp, fill)
  await bindRadius(comp, spec.radiusVar)
  const stroke = spec.strokeByState?.[axis.State]
  if (stroke) await bindStroke(comp, stroke)
  if (axis.State === 'Disabled') comp.opacity = 0.5

  const text = figma.createText()
  text.name = 'Placeholder'
  text.fontName = { family: 'Inter', style: 'Regular' }
  text.fontSize = sizeKey === 'Compact' || axis.Size === 'Small' ? 14 : 16
  text.characters = spec.label ?? 'Placeholder'
  await bindText(text, { fill: 'uds/text/disabled' })
  comp.appendChild(text)
  text.layoutGrow = 1
  text.layoutSizingHorizontal = 'FILL'
}

async function buildCheckboxVariant(comp, spec, axis) {
  const s = spec.size ?? 20
  comp.resize(s, s)
  await bindRadius(comp, spec.radiusVar)
  const checked = axis.State === 'Checked' || axis.State === 'Indeterminate'
  if (checked) {
    await bindFill(comp, spec.fillChecked)
  } else {
    await bindFill(comp, spec.fillUnchecked)
  }
  if (spec.strokeVar) await bindStroke(comp, spec.strokeVar)
  if (axis.Disabled === 'True') comp.opacity = 0.5
  if (axis.State === 'Checked') {
    const mark = figma.createText()
    mark.fontName = { family: 'Inter', style: 'Bold' }
    mark.fontSize = 12
    mark.characters = '✓'
    await bindText(mark, { fill: 'uds/text/inverse' })
    comp.appendChild(mark)
    mark.x = 4
    mark.y = 2
  } else if (axis.State === 'Indeterminate') {
    const bar = figma.createRectangle()
    bar.resize(10, 2)
    bar.x = (s - 10) / 2
    bar.y = (s - 2) / 2
    await bindFill(bar, 'uds/icon/inverse')
    comp.appendChild(bar)
  }
}

async function buildSwitchVariant(comp, spec, axis) {
  const w = spec.widthBySize[axis.Size] ?? 48
  const h = spec.heightBySize[axis.Size] ?? 28
  const inset = spec.thumbInsetPx ?? 2
  const thumbSize = spec.thumbSizeBySize?.[axis.Size] ?? (axis.Size === 'Small' ? 16 : 20)
  comp.resize(w, h)
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/9999')

  const checked = axis.Checked === 'True'
  const intermediary = axis.Checked === 'Intermediary'
  const trackFill = checked || intermediary
    ? (intermediary
        ? (spec.trackIntermediary ?? spec.trackOn ?? 'uds/color/primary/700')
        : (spec.trackOn ?? 'uds/color/primary/700'))
    : (spec.trackOff ?? 'uds/border/primary')
  await bindFill(comp, trackFill)

  if (intermediary) {
    const svg = spec.intermediaryIndicatorSvg
    const sizeSpec = spec.intermediaryIndicatorBySize?.[axis.Size] ?? { width: 20, height: 6 }
    const art = figma.createNodeFromSvg(svg)
    art.name = 'Indicator'
    const scale = Math.min(sizeSpec.width / art.width, sizeSpec.height / art.height)
    const indicatorW = Math.max(1, art.width * scale)
    const indicatorH = Math.max(1, art.height * scale)
    art.resize(indicatorW, indicatorH)
    art.x = Math.round((w - indicatorW) / 2)
    art.y = Math.round((h - indicatorH) / 2)
    const fillToken = spec.intermediaryBarFill ?? 'uds/icon/inverse'
    for (const node of art.findAll((n) => 'fills' in n)) {
      await bindFill(node, fillToken)
    }
    comp.appendChild(art)
    return
  }

  const thumb = figma.createEllipse()
  thumb.name = 'Thumb'
  thumb.resize(thumbSize, thumbSize)
  thumb.x = checked ? w - thumbSize - inset : intermediary ? (w - thumbSize) / 2 : inset
  thumb.y = (h - thumbSize) / 2
  await bindFill(thumb, spec.thumb ?? 'uds/surface/primary')
  comp.appendChild(thumb)
}

async function buildSkeletonVariant(comp, spec, axis) {
  const w = spec.widthBySize[axis.Size] ?? 200
  const h = spec.heightBySize[axis.Size] ?? 20
  comp.resize(w, h)
  await bindFill(comp, spec.fillVar)
  await bindRadius(comp, spec.radiusVar)
}

async function buildSpinnerVariant(comp, spec, axis) {
  const s = spec.sizeBySize[axis.Size] ?? 16
  comp.resize(s, s)
  const ring = figma.createEllipse()
  ring.resize(s, s)
  ring.fills = []
  await bindStroke(ring, 'uds/border/secondary', 2)
  comp.appendChild(ring)
}

async function buildLabelVariant(comp, spec, axis) {
  comp.layoutMode = 'HORIZONTAL'
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  const text = figma.createText()
  text.fontName = { family: 'Inter', style: 'Medium' }
  text.fontSize = 14
  text.characters = spec.label ?? 'Label'
  const fill = axis.State === 'Disabled' ? spec.textDisabled : spec.textVar
  await bindText(text, { fill })
  if (axis.State === 'Disabled') comp.opacity = 0.5
  comp.appendChild(text)
}

async function buildDotStatusVariant(comp, spec, axis) {
  const s = spec.defaultSize ?? spec.size ?? 10
  comp.resize(s, s)
  comp.layoutMode = 'NONE'
  comp.clipsContent = false
  const dot = figma.createEllipse()
  dot.name = 'dot'
  dot.resize(s, s)
  dot.x = 0
  dot.y = 0
  const colorMap = {
    Red: 'uds/color/accent/red/500',
    Blue: 'uds/color/accent/blue/500',
    Inverse: 'uds/color/black',
    Orange: 'uds/color/accent/orange/500',
    Sky: 'uds/color/accent/sky/500',
    Indigo: 'uds/color/accent/indigo/500',
    Rose: 'uds/color/accent/rose/500',
    Neutral: 'uds/color/neutrals/500',
    Celery: 'uds/color/accent/emerald/500',
    Lime: 'uds/color/accent/lime/500',
    Yellow: 'uds/color/accent/yellow/500',
    Green: 'uds/color/accent/green/500',
    Cyan: 'uds/color/accent/cyan/500',
    Purple: 'uds/color/accent/purple/500',
    Fuchsia: 'uds/color/accent/fuchsia/500',
    Gray: 'uds/color/neutrals/500',
  }
  const token = colorMap[axis.Variant] ?? 'uds/color/accent/green/500'
  const v = await findVar(token)
  if (v) {
    dot.fills = [
      figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0, g: 0.5, b: 0 } },
        'color',
        v,
      ),
    ]
  } else {
    await bindFill(dot, 'uds/color/accent/green/500')
  }
  if (axis.Outline === 'True') {
    await bindStroke(dot, 'uds/border/primary', 2)
  }
  comp.appendChild(dot)
}

function avatarDotSizePx() {
  return 10
}

function avatarStatusOffsetPx(sizeKey) {
  if (sizeKey === 'Extra Small') return 1
  if (sizeKey === 'Large') return -4
  return -1
}

function avatarCameraSizePx(sizeKey) {
  if (sizeKey === 'Extra Small') return 16
  if (sizeKey === 'Small' || sizeKey === 'Default') return 20
  return 24
}

function avatarCameraIconPx(sizeKey) {
  if (sizeKey === 'Extra Small') return 8
  if (sizeKey === 'Small' || sizeKey === 'Default') return 12
  return 16
}

function avatarCameraOffsetPx(sizeKey) {
  if (sizeKey === 'Extra Small') return 6
  if (sizeKey === 'Large') return 4
  return 8
}

async function appendAvatarStatus(comp, spec, axis, avatarSize) {
  const dotPx = avatarDotSizePx()
  const offset = avatarStatusOffsetPx(axis.Size)
  const dotSetId = spec.dotStatusSetNodeId ?? '1813:4697'
  const dotSet = await figma.getNodeByIdAsync(dotSetId)
  const variantName = spec.defaultDotStatusVariant ?? 'Variant=Green, Outline=False'
  const dotComp =
    dotSet?.type === 'COMPONENT_SET'
      ? dotSet.children.find(
          (c) =>
            c.name === variantName ||
            (c.name.startsWith('Variant=Green') && c.name.includes('Outline=False')),
        )
      : null
  if (!dotComp || dotComp.type !== 'COMPONENT') return

  const status = dotComp.createInstance()
  status.name = 'Avatar status'
  status.resize(dotPx, dotPx)
  status.x = avatarSize - dotPx + offset
  status.y = avatarSize - dotPx + offset
  comp.appendChild(status)
  status.isExposedInstance = true
}

async function appendAvatarCamera(comp, spec, axis, avatarSize) {
  const btnPx = avatarCameraSizePx(axis.Size)
  const offset = avatarCameraOffsetPx(axis.Size)
  const btn = figma.createFrame()
  btn.name = 'Avatar camera action'
  btn.resize(btnPx, btnPx)
  btn.x = avatarSize - btnPx + offset
  btn.y = avatarSize - btnPx + offset
  btn.layoutMode = 'NONE'
  btn.clipsContent = true
  await bindRadius(btn, 'uds/radius/9999')
  await bindFill(btn, 'uds/color/neutrals/300')
  await bindStroke(btn, 'uds/surface/primary', 2)

  let iconNode = null
  const iconSetId = spec.iconSetNodeId ?? '501:6'
  const iconSet = await figma.getNodeByIdAsync(iconSetId)
  if (iconSet?.type === 'COMPONENT_SET') {
    const iconComp = iconSet.children.find((c) => c.name === 'Size=16')
    if (iconComp?.type === 'COMPONENT') {
      iconNode = iconComp.createInstance()
      iconNode.name = 'Icon'
      const iconPx = avatarCameraIconPx(axis.Size)
      const cameraCompId = spec.cameraIconComponentId ?? '938:447'
      const cameraComp = await figma.getNodeByIdAsync(cameraCompId)
      if (cameraComp?.type === 'COMPONENT' && iconNode.type === 'INSTANCE') {
        iconNode.swapComponent(cameraComp)
      }
      iconNode.resize(iconPx, iconPx)
      iconNode.x = (btnPx - iconPx) / 2
      iconNode.y = (btnPx - iconPx) / 2
    }
  }
  if (!iconNode) {
    const glyph = figma.createRectangle()
    glyph.resize(Math.round(btnPx * 0.45), Math.round(btnPx * 0.4))
    glyph.name = 'Camera icon'
    glyph.x = (btnPx - glyph.width) / 2
    glyph.y = (btnPx - glyph.height) / 2
    await bindFill(glyph, 'uds/color/black')
    iconNode = glyph
  }
  btn.appendChild(iconNode)
  comp.appendChild(btn)
}

async function buildAvatarVariant(comp, spec, axis) {
  const s = spec.sizeBySize[axis.Size] ?? 48
  const isInitials = axis.Appearance === 'Initials'
  const accessory = axis.Accessory ?? 'None'
  const hasAccessory = accessory === 'Status' || accessory === 'Camera'
  comp.resize(s, s)
  comp.layoutMode = 'NONE'
  comp.clipsContent = !hasAccessory
  await bindRadius(comp, 'uds/radius/9999')
  await bindStroke(comp, 'uds/border/primary', 1)

  if (isInitials) {
    await bindFill(comp, 'uds/color/primary/700')
    const text = figma.createText()
    text.name = 'Initials'
    text.fontName = { family: 'Inter', style: 'Medium' }
    text.fontSize = spec.fontSizeBySize?.[axis.Size] ?? Math.round(s * 0.35)
    text.characters = spec.initialsBySize?.[axis.Size] ?? 'AB'
    text.resize(s, s)
    text.x = 0
    text.y = 0
    text.textAlignHorizontal = 'CENTER'
    text.textAlignVertical = 'CENTER'
    text.textAutoResize = 'NONE'
    await bindText(text, { fill: 'uds/text/inverse' })
    comp.appendChild(text)
  } else {
    comp.fills = []
    const img = figma.createRectangle()
    img.name = 'Avatar image'
    img.resize(s, s)
    img.x = 0
    img.y = 0
    await bindRadius(img, 'uds/radius/9999')
    await bindFill(img, 'uds/surface/tertiary')
    comp.appendChild(img)
  }

  if (accessory === 'Status') {
    await appendAvatarStatus(comp, spec, axis, s)
  }
  if (accessory === 'Camera') {
    await appendAvatarCamera(comp, spec, axis, s)
  }
}

async function buildToggleVariant(comp, spec, axis) {
  const h = spec.heightBySize[axis.Size] ?? 32
  const padH = spec.paddingH ?? 10
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.paddingLeft = padH
  comp.paddingRight = padH
  comp.paddingTop = 4
  comp.paddingBottom = 4
  comp.itemSpacing = 8
  await bindGap(comp, spec.gapVar)
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/2')
  const pressed = axis.Pressed === 'True'
  if (axis.Appearance === 'Outline') {
    await bindStroke(comp, 'uds/border/secondary')
    if (pressed) await bindFill(comp, 'uds/surface/tertiary')
    else comp.fills = []
  } else {
    if (pressed) await bindFill(comp, 'uds/surface/tertiary')
    else comp.fills = []
  }
  const text = figma.createText()
  text.fontName = { family: 'Inter', style: 'Medium' }
  text.fontSize = axis.Size === 'Small' ? 12 : 14
  text.characters = spec.label ?? 'Toggle'
  await bindText(text, { fill: 'uds/text/primary' })
  comp.appendChild(text)
  text.layoutSizingHorizontal = 'HUG'
}

async function buildRadioVariant(comp, spec, axis) {
  const s = spec.size ?? 20
  const dotSize = spec.dotSize ?? 8
  comp.resize(s, s)
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/9999')

  const state = axis.State ?? 'Unchecked'
  const checked = state === 'Checked'
  const invalid = state === 'Invalid'

  if (checked) {
    await bindFill(comp, spec.fillChecked ?? 'uds/color/primary/700')
    await bindStroke(comp, spec.strokeChecked ?? 'uds/color/primary/700')
    const dot = figma.createEllipse()
    dot.name = 'Indicator'
    dot.resize(dotSize, dotSize)
    dot.x = (s - dotSize) / 2
    dot.y = (s - dotSize) / 2
    await bindFill(dot, spec.dotFill ?? 'uds/text/inverse')
    comp.appendChild(dot)
  } else {
    comp.fills = []
    const stroke = invalid
      ? (spec.strokeInvalid ?? 'uds/button/border/primary/destructive')
      : (spec.strokeUnchecked ?? spec.strokeVar ?? 'uds/border/primary')
    await bindStroke(comp, stroke)
  }

  if (axis.Disabled === 'True') comp.opacity = 0.5
}

async function buildTextareaVariant(comp, spec, axis) {
  const w = spec.width ?? 280
  const h = spec.height ?? 96
  comp.resize(w, h)
  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.paddingLeft = 12
  comp.paddingRight = 12
  comp.paddingTop = 10
  comp.paddingBottom = 10
  await bindFill(comp, spec.fillVar)
  await bindRadius(comp, spec.radiusVar)
  const stroke = spec.strokeByState?.[axis.State]
  if (stroke) await bindStroke(comp, stroke)
  if (axis.State === 'Disabled') comp.opacity = 0.5
  const text = figma.createText()
  text.fontName = { family: 'Inter', style: 'Regular' }
  text.fontSize = 14
  text.characters = spec.label ?? 'Placeholder'
  text.textAutoResize = 'HEIGHT'
  text.resize(w - 24, 20)
  await bindText(text, { fill: 'uds/text/disabled' })
  comp.appendChild(text)
}

async function buildProgressVariant(comp, spec, axis) {
  const w = spec.width ?? 240
  const h = spec.height ?? 8
  comp.resize(w, h)
  comp.cornerRadius = h / 2
  comp.clipsContent = true
  await bindFill(comp, 'uds/surface/quaternary')
  const pct = Number(axis.Value) / 100
  const fillW = Math.max(h, Math.round(w * pct))
  const bar = figma.createRectangle()
  bar.resize(fillW, h)
  bar.cornerRadius = h / 2
  await bindFill(bar, 'uds/color/primary/700')
  comp.appendChild(bar)
}

async function buildSliderVariant(comp, spec, axis) {
  const w = spec.width ?? 240
  const trackH = axis.Size === 'Small' ? 6 : 8
  const thumbSize = axis.Size === 'Small' ? 14 : 16
  comp.resize(w, thumbSize)
  const track = figma.createRectangle()
  track.resize(w, trackH)
  track.y = (thumbSize - trackH) / 2
  track.cornerRadius = trackH / 2
  await bindFill(track, 'uds/surface/quaternary')
  comp.appendChild(track)
  const range = figma.createRectangle()
  range.resize(Math.round(w * 0.45), trackH)
  range.y = track.y
  range.cornerRadius = trackH / 2
  await bindFill(range, 'uds/color/primary/700')
  comp.appendChild(range)
  const thumb = figma.createEllipse()
  thumb.resize(thumbSize, thumbSize)
  thumb.x = Math.round(w * 0.45) - thumbSize / 2
  thumb.y = 0
  await bindFill(thumb, 'uds/surface/primary')
  await bindStroke(thumb, 'uds/border/secondary')
  comp.appendChild(thumb)
}

async function buildSeparatorVariant(comp, spec, axis) {
  const isVertical = axis.Orientation === 'Vertical'
  const w = isVertical ? 1 : (spec.width ?? 320)
  const h = isVertical ? (spec.width ?? 320) : spec.height ?? 1
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.itemSpacing = 8

  if (axis.Variant === 'Band') {
    comp.resize(w, 8)
    await bindFill(comp, 'uds/surface/tertiary')
    await bindStroke(comp, 'uds/border/secondary')
    return
  }

  if (axis.Variant === 'Label') {
    comp.layoutSizingHorizontal = 'HUG'
    comp.layoutSizingVertical = 'HUG'
    comp.paddingLeft = 0
    comp.paddingRight = 0
    const lineA = figma.createRectangle()
    lineA.resize(isVertical ? 1 : 80, isVertical ? 80 : 1)
    await bindFill(lineA, 'uds/border/secondary')
    comp.appendChild(lineA)
    const pill = figma.createFrame()
    pill.layoutMode = 'HORIZONTAL'
    pill.layoutSizingHorizontal = 'HUG'
    pill.layoutSizingVertical = 'HUG'
    pill.paddingLeft = 12
    pill.paddingRight = 12
    pill.paddingTop = 4
    pill.paddingBottom = 4
    pill.cornerRadius = 9999
    await bindFill(pill, 'uds/surface/primary')
    await bindStroke(pill, 'uds/border/secondary')
    const label = figma.createText()
    label.fontName = { family: 'Inter', style: 'Regular' }
    label.fontSize = 14
    label.characters = 'Label'
    await bindText(label, { fill: 'uds/text/primary' })
    pill.appendChild(label)
    comp.appendChild(pill)
    const lineB = figma.createRectangle()
    lineB.resize(isVertical ? 1 : 80, isVertical ? 80 : 1)
    await bindFill(lineB, 'uds/border/secondary')
    comp.appendChild(lineB)
    return
  }

  comp.resize(w, h)
  await bindFill(comp, 'uds/border/secondary')
}

async function buildKbdVariant(comp, spec, axis) {
  const appearance = axis.Appearance ?? 'Default'
  const labels = spec.labelsByAppearance ?? {}
  const label = labels[appearance] ?? spec.label ?? '⌘'

  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.minHeight = 20
  comp.minWidth = 20
  await bindPaddingAxis(comp, 'uds/gap/4', 'paddingLeft')
  await bindPaddingAxis(comp, 'uds/gap/4', 'paddingRight')
  comp.paddingTop = 0
  comp.paddingBottom = 0
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/2')

  if (appearance === 'Black') {
    await bindFill(comp, 'uds/color/black')
  } else if (appearance === 'Tooltip') {
    await bindFill(comp, 'uds/surface/primary')
  } else {
    await bindFill(comp, 'uds/surface/quaternary')
  }

  const text = figma.createText()
  text.name = 'key'
  text.characters = label
  await applyLocalTextStyle(text, 'Body/12/Medium', 'uds/text/secondary')
  if (appearance === 'Black') {
    await bindFill(text, 'uds/text/inverse')
  } else if (appearance === 'Tooltip') {
    await bindFill(text, 'uds/text/primary')
  }
  comp.appendChild(text)
  text.layoutSizingHorizontal = 'HUG'
}

async function buildLinkVariant(comp, spec, axis) {
  comp.layoutMode = 'HORIZONTAL'
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.fills = []
  const text = figma.createText()
  text.fontName = { family: 'Inter', style: 'Medium' }
  text.fontSize = 16
  text.characters = spec.label ?? 'Link text'
  const fill =
    axis.State === 'Hover'
      ? 'uds/text/link/primary/hover'
      : 'uds/text/link/primary/default'
  const v = await findVar(fill)
  if (v) {
    await bindText(text, { fill })
  } else {
    await bindText(text, { fill: 'uds/color/primary/700' })
  }
  if (axis.State === 'Hover') text.textDecoration = 'UNDERLINE'
  comp.appendChild(text)
  text.layoutSizingHorizontal = 'HUG'
}

async function buildTextVariant(comp, spec, axis) {
  comp.layoutMode = 'HORIZONTAL'
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.fills = []
  const text = figma.createText()
  const isHeading = axis.Type === 'Heading'
  text.fontName = { family: 'Inter', style: isHeading ? 'Semi Bold' : 'Regular' }
  text.fontSize = isHeading ? 24 : axis.Size === 'Large' ? 16 : 14
  text.characters = isHeading ? 'Heading' : 'Body text sample'
  const appearance = axis.Appearance ?? 'Primary'
  const fillMap = spec.textByAppearance ?? {
    Primary: 'uds/text/primary',
    Secondary: 'uds/text/secondary',
    Tertiary: 'uds/text/tertiary',
  }
  await bindText(text, { fill: fillMap[appearance] ?? 'uds/text/primary' })
  comp.appendChild(text)
  text.layoutSizingHorizontal = 'HUG'
}

async function buildStatusVariant(comp, spec, axis) {
  const compact = axis.Size === 'Compact'
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.paddingLeft = compact ? 6 : 8
  comp.paddingRight = compact ? 6 : 8
  comp.paddingTop = compact ? 2 : 4
  comp.paddingBottom = compact ? 2 : 4
  comp.itemSpacing = compact ? 6 : 8
  await bindGap(comp, 'uds/gap/8')
  await bindRadius(comp, 'uds/radius/4')
  const tokens = spec.tokensByVariant?.[axis.Variant] ?? {}
  if (tokens.fill) await bindFill(comp, tokens.fill)
  if (tokens.stroke) await bindStroke(comp, tokens.stroke)
  const dot = figma.createEllipse()
  const dotSize = compact ? 6 : 8
  dot.resize(dotSize, dotSize)
  dot.cornerRadius = dotSize / 2
  await bindFill(dot, tokens.text ?? 'uds/text/primary')
  comp.appendChild(dot)
  const text = figma.createText()
  text.fontName = { family: 'Inter', style: 'Medium' }
  text.fontSize = compact ? 12 : 14
  text.characters = 'Status'
  await bindText(text, { fill: tokens.text ?? 'uds/text/primary' })
  comp.appendChild(text)
  text.layoutSizingHorizontal = 'HUG'
}

async function createButtonInstance(buttonSetId, appearance, label, size = 'Default') {
  const set = await figma.getNodeByIdAsync(buttonSetId ?? '554:268')
  if (set?.type !== 'COMPONENT_SET') return null
  const variantName = `Appearance=${appearance}, Size=${size}`
  const btnComp = set.children.find((c) => c.name === variantName)
  if (btnComp?.type !== 'COMPONENT') return null
  const inst = btnComp.createInstance()
  const text = inst.findOne((n) => n.type === 'TEXT')
  if (text) {
    await figma.loadFontAsync(text.fontName)
    text.characters = label
  }
  return inst
}

async function buildAlertDialogVariant(comp, spec, axis) {
  const viewportW = spec.viewportW ?? 720
  const viewportH = spec.viewportH ?? 520
  const dialogW = axis.Size === 'Small' ? 320 : (spec.dialogW ?? 400)
  const copy = spec.copy ?? {
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
    cancel: 'Cancel',
    action: 'Continue',
  }
  const medallionBySize = spec.medallionBySize ?? {
    Default: { color: 'Red', tone: 'Pastel' },
    Small: { color: 'Amber', tone: 'Pastel' },
  }
  const medallion =
    medallionBySize[axis.Size] ?? spec.medallion ?? { color: 'Red', tone: 'Pastel' }
  const medPx = spec.medallionSizePx ?? 40

  comp.resize(viewportW, viewportH)
  comp.layoutMode = 'NONE'
  comp.clipsContent = true

  const overlay = figma.createRectangle()
  overlay.name = 'Alert dialog overlay'
  overlay.resize(viewportW, viewportH)
  overlay.x = 0
  overlay.y = 0
  await bindFill(overlay, spec.scrimVar ?? 'uds/scrim/50')
  comp.appendChild(overlay)

  const dialog = figma.createFrame()
  dialog.name = 'Alert dialog content'
  dialog.layoutMode = 'VERTICAL'
  dialog.primaryAxisAlignItems = 'MIN'
  dialog.counterAxisAlignItems = 'MIN'
  dialog.itemSpacing = 0
  dialog.layoutSizingHorizontal = 'FIXED'
  dialog.layoutSizingVertical = 'HUG'
  dialog.resize(dialogW, 100)
  await bindFill(dialog, spec.fillVar ?? 'uds/surface/primary')
  await bindStroke(dialog, spec.strokeVar ?? 'uds/border/secondary')
  await bindRadius(dialog, spec.radiusVar ?? 'uds/radius/8')

  const body = figma.createFrame()
  body.name = 'Alert dialog header'
  body.layoutMode = 'VERTICAL'
  body.primaryAxisAlignItems = 'MIN'
  body.counterAxisAlignItems = 'MIN'
  body.itemSpacing = 8
  body.paddingLeft = 16
  body.paddingRight = 16
  body.paddingTop = 16
  body.paddingBottom = 16
  body.fills = []

  const setId = spec.medallionSetNodeId ?? '1847:5417'
  const medSet = await figma.getNodeByIdAsync(setId)
  if (medSet?.type === 'COMPONENT_SET') {
    const medName = medallionVariantName(
      { color: medallion.color, tone: medallion.tone, size: medallion.size ?? 'Default' },
      'Default',
    )
    const medComp = medSet.children.find((c) => c.name === medName)
    if (medComp?.type === 'COMPONENT') {
      const medInst = medComp.createInstance()
      medInst.name = 'Alert dialog media'
      medInst.resize(medPx, medPx)
      body.appendChild(medInst)
    }
  }

  const title = figma.createText()
  title.name = 'Alert dialog title'
  title.fontName = { family: 'Inter', style: 'Semi Bold' }
  title.fontSize = 16
  title.characters = copy.title
  title.textAlignHorizontal = 'LEFT'
  title.textAutoResize = 'HEIGHT'
  await bindText(title, { fill: 'uds/text/primary' })
  body.appendChild(title)
  title.layoutSizingHorizontal = 'FILL'

  const desc = figma.createText()
  desc.name = 'Alert dialog description'
  desc.fontName = { family: 'Inter', style: 'Regular' }
  desc.fontSize = 14
  desc.characters = copy.description
  desc.textAlignHorizontal = 'LEFT'
  desc.textAutoResize = 'HEIGHT'
  await bindText(desc, { fill: 'uds/text/secondary' })
  body.appendChild(desc)
  desc.layoutSizingHorizontal = 'FILL'

  dialog.appendChild(body)
  body.layoutSizingHorizontal = 'FILL'

  const footer = figma.createFrame()
  footer.name = 'Alert dialog footer'
  footer.layoutMode = 'HORIZONTAL'
  footer.primaryAxisAlignItems = 'MAX'
  footer.counterAxisAlignItems = 'CENTER'
  footer.itemSpacing = 8
  footer.paddingLeft = 8
  footer.paddingRight = 8
  footer.paddingTop = 8
  footer.paddingBottom = 8
  await bindFill(footer, spec.footerFillVar ?? 'uds/surface/tertiary')
  await bindStroke(footer, spec.footerStrokeVar ?? 'uds/border/secondary')
  footer.strokeTopWeight = 1
  footer.strokeRightWeight = 0
  footer.strokeBottomWeight = 0
  footer.strokeLeftWeight = 0

  const cancel = await createButtonInstance(
    spec.buttonSetNodeId,
    'Outline',
    copy.cancel,
  )
  const action = await createButtonInstance(
    spec.buttonSetNodeId,
    'Default',
    copy.action,
  )
  if (cancel) {
    footer.appendChild(cancel)
    cancel.layoutSizingHorizontal = 'HUG'
  }
  if (action) {
    footer.appendChild(action)
    action.layoutSizingHorizontal = 'HUG'
  }
  dialog.appendChild(footer)
  footer.layoutSizingHorizontal = 'FILL'

  comp.appendChild(dialog)
  dialog.x = Math.round((viewportW - dialogW) / 2)
  dialog.y = Math.round((viewportH - dialog.height) / 2)
}

async function createInputInstance(inputSetId, sizeOrOpts, placeholder) {
  const set = await figma.getNodeByIdAsync(inputSetId ?? '589:236')
  if (set?.type !== 'COMPONENT_SET') return null
  let sizeKey = 'Default'
  let state = 'Default'
  let ph = placeholder
  if (typeof sizeOrOpts === 'object' && sizeOrOpts !== null) {
    sizeKey = sizeOrOpts.size ?? 'Default'
    state = sizeOrOpts.state ?? 'Default'
    ph = sizeOrOpts.placeholder ?? ph
  } else if (sizeOrOpts) {
    sizeKey = sizeOrOpts === 'Compact' ? 'Compact' : 'Default'
  }
  const variantName = `Size=${sizeKey}, State=${state}`
  const inputComp = set.children.find((c) => c.name === variantName)
  if (inputComp?.type !== 'COMPONENT') return null
  const inst = inputComp.createInstance()
  inst.name = 'Input'
  const phNode = inst.findOne((n) => n.name === 'Placeholder' && n.type === 'TEXT')
  if (phNode && ph) {
    await figma.loadFontAsync(phNode.fontName)
    phNode.characters = ph
  }
  return inst
}

async function createRadioInstance(spec, { checked = false, invalid = false, disabled = false } = {}) {
  const setId = spec.radioSetNodeId ?? '1849:5009'
  const set = await figma.getNodeByIdAsync(setId)
  if (set?.type !== 'COMPONENT_SET') return null
  const state = invalid ? 'Invalid' : checked ? 'Checked' : 'Unchecked'
  const variantName = `State=${state}, Disabled=${disabled ? 'True' : 'False'}`
  const radioComp = set.children.find((c) => c.name === variantName)
  if (radioComp?.type !== 'COMPONENT') return null
  const inst = radioComp.createInstance()
  inst.name = 'Radio'
  inst.resize(20, 20)
  return inst
}

async function appendDialogCloseButton(dialog, dialogW, spec) {
  const closeSize = spec.closeSizePx ?? 36
  const close = figma.createFrame()
  close.name = 'Dialog close'
  close.resize(closeSize, closeSize)
  close.layoutMode = 'HORIZONTAL'
  close.primaryAxisAlignItems = 'CENTER'
  close.counterAxisAlignItems = 'CENTER'
  close.fills = []
  close.strokes = []

  const mark = figma.createText()
  mark.name = 'icon'
  mark.fontName = { family: 'Inter', style: 'Regular' }
  mark.fontSize = 16
  mark.characters = '×'
  await bindText(mark, { fill: 'uds/text/secondary' })
  close.appendChild(mark)

  dialog.appendChild(close)
  close.layoutPositioning = 'ABSOLUTE'
  const offset = spec.closeOffsetPx ?? 7
  close.x = dialogW - closeSize - offset
  close.y = offset
}

async function buildDialogVariant(comp, spec, axis) {
  const viewportW = spec.viewportW ?? 720
  const viewportH = spec.viewportH ?? 520
  const dialogWidths = spec.dialogWidths ?? {
    Small: 384,
    Medium: 448,
    Large: 512,
    XLarge: 576,
    '2XL': 672,
  }
  const dialogW = dialogWidths[axis.Size] ?? dialogWidths.Medium ?? 448
  const copy = spec.copy ?? {
    title: 'Edit profile',
    description: 'Update the public details shown on your account.',
    cancel: 'Cancel',
    action: 'Save changes',
  }

  comp.resize(viewportW, viewportH)
  comp.layoutMode = 'NONE'
  comp.clipsContent = true

  const overlay = figma.createRectangle()
  overlay.name = 'Dialog overlay'
  overlay.resize(viewportW, viewportH)
  overlay.x = 0
  overlay.y = 0
  await bindFill(overlay, spec.scrimVar ?? 'uds/scrim/50')
  comp.appendChild(overlay)

  const dialog = figma.createFrame()
  dialog.name = 'Dialog content'
  dialog.layoutMode = 'VERTICAL'
  dialog.primaryAxisAlignItems = 'MIN'
  dialog.counterAxisAlignItems = 'MIN'
  dialog.itemSpacing = 0
  dialog.layoutSizingHorizontal = 'FIXED'
  dialog.layoutSizingVertical = 'HUG'
  dialog.resize(dialogW, 100)
  await bindFill(dialog, spec.fillVar ?? 'uds/surface/primary')
  await bindStroke(dialog, spec.strokeVar ?? 'uds/border/secondary')
  await bindRadius(dialog, spec.radiusVar ?? 'uds/radius/8')
  dialog.clipsContent = true

  const main = figma.createFrame()
  main.name = 'Dialog main'
  main.layoutMode = 'VERTICAL'
  main.primaryAxisAlignItems = 'MIN'
  main.counterAxisAlignItems = 'MIN'
  main.itemSpacing = 16
  await bindGap(main, 'uds/gap/16')
  main.paddingLeft = 16
  main.paddingRight = 16
  main.paddingTop = 16
  main.paddingBottom = 16
  main.fills = []

  const header = figma.createFrame()
  header.name = 'Dialog header'
  header.layoutMode = 'VERTICAL'
  header.primaryAxisAlignItems = 'MIN'
  header.counterAxisAlignItems = 'MIN'
  header.itemSpacing = 4
  await bindGap(header, 'uds/spacing/4')
  header.fills = []
  header.paddingRight = 28

  const title = figma.createText()
  title.name = 'Dialog title'
  title.fontName = { family: 'Inter', style: 'Semi Bold' }
  title.fontSize = 16
  title.characters = copy.title
  title.textAlignHorizontal = 'LEFT'
  title.textAutoResize = 'HEIGHT'
  await bindText(title, { fill: 'uds/text/primary' })
  header.appendChild(title)
  title.layoutSizingHorizontal = 'FILL'

  const desc = figma.createText()
  desc.name = 'Dialog description'
  desc.fontName = { family: 'Inter', style: 'Regular' }
  desc.fontSize = 14
  desc.characters = copy.description
  desc.textAlignHorizontal = 'LEFT'
  desc.textAutoResize = 'HEIGHT'
  await bindText(desc, { fill: 'uds/text/tertiary' })
  header.appendChild(desc)
  desc.layoutSizingHorizontal = 'FILL'

  main.appendChild(header)
  header.layoutSizingHorizontal = 'FILL'

  const body = figma.createFrame()
  body.name = 'Dialog body'
  body.layoutMode = 'VERTICAL'
  body.primaryAxisAlignItems = 'MIN'
  body.counterAxisAlignItems = 'MIN'
  body.itemSpacing = 16
  await bindGap(body, 'uds/gap/16')
  body.fills = []

  const slot = figma.createFrame()
  slot.name = 'Content2'
  slot.layoutMode = 'VERTICAL'
  slot.primaryAxisAlignItems = 'MIN'
  slot.counterAxisAlignItems = 'MIN'
  slot.resize(dialogW - 32, 29)
  slot.fills = []
  body.appendChild(slot)
  slot.layoutSizingHorizontal = 'FILL'

  main.appendChild(body)
  body.layoutSizingHorizontal = 'FILL'

  dialog.appendChild(main)
  main.layoutSizingHorizontal = 'FILL'

  const footer = figma.createFrame()
  footer.name = 'Dialog footer'
  footer.layoutMode = 'HORIZONTAL'
  footer.primaryAxisAlignItems = 'MAX'
  footer.counterAxisAlignItems = 'CENTER'
  footer.itemSpacing = 8
  footer.paddingLeft = 8
  footer.paddingRight = 8
  footer.paddingTop = 8
  footer.paddingBottom = 8
  await bindFill(footer, spec.footerFillVar ?? 'uds/surface/tertiary')
  await bindStroke(footer, spec.footerStrokeVar ?? 'uds/border/secondary')
  footer.strokeTopWeight = 1
  footer.strokeRightWeight = 0
  footer.strokeBottomWeight = 0
  footer.strokeLeftWeight = 0

  const actions = figma.createFrame()
  actions.name = 'Content'
  actions.layoutMode = 'HORIZONTAL'
  actions.primaryAxisAlignItems = 'CENTER'
  actions.counterAxisAlignItems = 'CENTER'
  actions.itemSpacing = 8
  actions.fills = []
  actions.layoutGrow = 1

  const cancel = await createButtonInstance(
    spec.buttonSetNodeId,
    'Outline',
    copy.cancel,
  )
  const action = await createButtonInstance(
    spec.buttonSetNodeId,
    'Default',
    copy.action,
  )
  if (cancel) {
    actions.appendChild(cancel)
    cancel.layoutSizingHorizontal = 'HUG'
  }
  if (action) {
    actions.appendChild(action)
    action.layoutSizingHorizontal = 'HUG'
  }
  footer.appendChild(actions)
  actions.layoutSizingHorizontal = 'FILL'

  dialog.appendChild(footer)
  footer.layoutSizingHorizontal = 'FILL'

  await appendDialogCloseButton(dialog, dialogW, spec)

  comp.appendChild(dialog)
  dialog.x = Math.round((viewportW - dialogW) / 2)
  dialog.y = Math.round((viewportH - dialog.height) / 2)
}

async function bindCornerRadius(node, corners) {
  const v = await findVar('uds/radius/8')
  const keys = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft']
  const props = ['topLeftRadius', 'topRightRadius', 'bottomRightRadius', 'bottomLeftRadius']
  for (let i = 0; i < keys.length; i++) {
    if (corners[keys[i]] && v) node.setBoundVariable(props[i], v)
    else node[props[i]] = 0
  }
}

async function buildDrawerVariant(comp, spec, axis) {
  const viewportW = spec.viewportW ?? 720
  const viewportH = spec.viewportH ?? 520
  const sideW = spec.sidePanelW ?? 384
  const bottomH = spec.bottomPanelH ?? 300
  const direction = axis.Direction ?? 'Bottom'
  const copy = spec.copy ?? {
    title: 'Assign clinician',
    description: 'Review fit before confirming the assignment.',
    close: 'Close',
  }

  comp.resize(viewportW, viewportH)
  comp.layoutMode = 'NONE'
  comp.clipsContent = true

  const overlay = figma.createRectangle()
  overlay.name = 'Drawer overlay'
  overlay.resize(viewportW, viewportH)
  overlay.x = 0
  overlay.y = 0
  await bindFill(overlay, spec.scrimVar ?? 'uds/scrim/50')
  comp.appendChild(overlay)

  const drawer = figma.createFrame()
  drawer.name = 'Drawer content'
  drawer.layoutMode = 'VERTICAL'
  drawer.primaryAxisAlignItems = 'MIN'
  drawer.counterAxisAlignItems = 'MIN'
  drawer.itemSpacing = 0
  drawer.clipsContent = true
  await bindFill(drawer, spec.fillVar ?? 'uds/surface/primary')
  await bindStroke(drawer, spec.strokeVar ?? 'uds/border/secondary')

  let panelW = viewportW
  let panelH = bottomH
  let panelX = 0
  let panelY = viewportH - bottomH

  if (direction === 'Bottom') {
    drawer.strokeTopWeight = 1
    drawer.strokeRightWeight = 0
    drawer.strokeBottomWeight = 0
    drawer.strokeLeftWeight = 0
    await bindCornerRadius(drawer, {
      topLeft: true,
      topRight: true,
      bottomRight: false,
      bottomLeft: false,
    })
  } else if (direction === 'Top') {
    panelH = bottomH
    panelY = 0
    drawer.strokeTopWeight = 0
    drawer.strokeRightWeight = 0
    drawer.strokeBottomWeight = 1
    drawer.strokeLeftWeight = 0
    await bindCornerRadius(drawer, {
      topLeft: false,
      topRight: false,
      bottomRight: true,
      bottomLeft: true,
    })
  } else if (direction === 'Left') {
    panelW = sideW
    panelH = viewportH
    panelX = 0
    panelY = 0
    drawer.strokeTopWeight = 0
    drawer.strokeRightWeight = 1
    drawer.strokeBottomWeight = 0
    drawer.strokeLeftWeight = 0
    await bindCornerRadius(drawer, {
      topLeft: false,
      topRight: true,
      bottomRight: true,
      bottomLeft: false,
    })
  } else if (direction === 'Right') {
    panelW = sideW
    panelH = viewportH
    panelX = viewportW - sideW
    panelY = 0
    drawer.strokeTopWeight = 0
    drawer.strokeRightWeight = 0
    drawer.strokeBottomWeight = 0
    drawer.strokeLeftWeight = 1
    await bindCornerRadius(drawer, {
      topLeft: true,
      topRight: false,
      bottomRight: false,
      bottomLeft: true,
    })
  }

  drawer.resize(panelW, panelH)

  if (direction === 'Bottom') {
    const handleRow = figma.createFrame()
    handleRow.name = 'Drawer handle'
    handleRow.layoutMode = 'VERTICAL'
    handleRow.primaryAxisAlignItems = 'CENTER'
    handleRow.counterAxisAlignItems = 'CENTER'
    handleRow.paddingTop = 16
    handleRow.paddingBottom = 0
    handleRow.paddingLeft = 16
    handleRow.paddingRight = 16
    handleRow.fills = []

    const handle = figma.createRectangle()
    handle.name = 'Handle'
    handle.resize(100, 4)
    await bindFill(handle, spec.handleFillVar ?? 'uds/surface/tertiary')
    const pillVar = await findVar('uds/radius/full')
    if (pillVar) {
      handle.setBoundVariable('topLeftRadius', pillVar)
      handle.setBoundVariable('topRightRadius', pillVar)
      handle.setBoundVariable('bottomLeftRadius', pillVar)
      handle.setBoundVariable('bottomRightRadius', pillVar)
    } else {
      handle.cornerRadius = 999
    }
    handleRow.appendChild(handle)
    drawer.appendChild(handleRow)
    handleRow.layoutSizingHorizontal = 'FILL'
  }

  const header = figma.createFrame()
  header.name = 'Drawer header'
  header.layoutMode = 'VERTICAL'
  header.primaryAxisAlignItems = 'MIN'
  header.counterAxisAlignItems = 'MIN'
  header.itemSpacing = 2
  header.paddingLeft = 16
  header.paddingRight = 16
  header.paddingTop = direction === 'Bottom' ? 0 : 16
  header.paddingBottom = 16
  header.fills = []

  const title = figma.createText()
  title.name = 'Drawer title'
  title.fontName = { family: 'Inter', style: 'Medium' }
  title.fontSize = 16
  title.characters = copy.title
  title.textAlignHorizontal = 'LEFT'
  title.textAutoResize = 'HEIGHT'
  await bindText(title, { fill: 'uds/text/primary' })
  header.appendChild(title)
  title.layoutSizingHorizontal = 'FILL'

  const desc = figma.createText()
  desc.name = 'Drawer description'
  desc.fontName = { family: 'Inter', style: 'Regular' }
  desc.fontSize = 14
  desc.characters = copy.description
  desc.textAlignHorizontal = 'LEFT'
  desc.textAutoResize = 'HEIGHT'
  await bindText(desc, { fill: 'uds/text/tertiary' })
  header.appendChild(desc)
  desc.layoutSizingHorizontal = 'FILL'

  drawer.appendChild(header)
  header.layoutSizingHorizontal = 'FILL'

  const body = figma.createFrame()
  body.name = 'Drawer body'
  body.layoutMode = 'VERTICAL'
  body.primaryAxisAlignItems = 'MIN'
  body.counterAxisAlignItems = 'MIN'
  body.paddingLeft = 16
  body.paddingRight = 16
  body.paddingBottom = 16
  body.fills = []

  const slot = figma.createFrame()
  slot.name = 'Content'
  slot.layoutMode = 'VERTICAL'
  slot.resize(panelW - 32, 48)
  slot.fills = []
  body.appendChild(slot)
  slot.layoutSizingHorizontal = 'FILL'

  drawer.appendChild(body)
  body.layoutSizingHorizontal = 'FILL'
  body.layoutGrow = 1

  const footer = figma.createFrame()
  footer.name = 'Drawer footer'
  footer.layoutMode = 'VERTICAL'
  footer.primaryAxisAlignItems = 'MIN'
  footer.counterAxisAlignItems = 'MIN'
  footer.itemSpacing = 8
  footer.paddingLeft = 16
  footer.paddingRight = 16
  footer.paddingTop = 16
  footer.paddingBottom = 16
  footer.fills = []

  const close = await createButtonInstance(
    spec.buttonSetNodeId,
    'Outline',
    copy.close,
  )
  if (close) {
    footer.appendChild(close)
    close.layoutSizingHorizontal = 'HUG'
  }

  drawer.appendChild(footer)
  footer.layoutSizingHorizontal = 'FILL'

  comp.appendChild(drawer)
  drawer.x = panelX
  drawer.y = panelY
}

function medallionVariantName(axis, fallbackSize = 'Default') {
  const size = axis.size ?? axis.Size ?? fallbackSize
  const color = axis.color ?? axis.Color ?? 'Blue'
  const tone = axis.tone ?? axis.Tone ?? 'Pastel'
  return `Size=${size}, Color=${color}, Tone=${tone}`
}

async function createMedallionInstance(spec, medallionAxis) {
  const setId = spec.medallionSetNodeId ?? '1847:5417'
  const set = await figma.getNodeByIdAsync(setId)
  if (set?.type !== 'COMPONENT_SET') return null
  const variantName = medallionVariantName(medallionAxis, spec.medallionSize ?? 'Default')
  const medallionComp = set.children.find((c) => c.name === variantName)
  if (medallionComp?.type !== 'COMPONENT') return null
  const inst = medallionComp.createInstance()
  inst.name = 'Medallion'
  return inst
}

async function buildAlertVariant(comp, spec, axis) {
  const variantKey = axis.Variant ?? 'Default'
  const copy = spec.copyByVariant?.[variantKey] ?? {
    title: 'Alert title',
    description: 'Supporting description for the alert.',
  }
  const medallionAxis = spec.medallionByVariant?.[variantKey] ?? {
    color: 'Sky',
    tone: 'Pastel',
  }
  const destructive = variantKey === 'Destructive'
  const warning = variantKey === 'Warning'
  const constructive = variantKey === 'Success'
  const titleToken = destructive
    ? 'uds/button/border/primary/destructive'
    : warning
      ? 'uds/system/warning/primary'
      : constructive
        ? 'uds/system/constructive/primary'
        : 'uds/text/primary'
  const descToken = destructive
    ? 'uds/button/border/primary/destructive'
    : warning
      ? 'uds/system/warning/primary'
      : constructive
        ? 'uds/system/constructive/primary'
        : 'uds/text/secondary'

  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.paddingLeft = 16
  comp.paddingRight = 16
  comp.paddingTop = 16
  comp.paddingBottom = 16
  comp.itemSpacing = 12
  await bindGap(comp, spec.gapVar ?? 'uds/gap/12')
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/8')
  await bindFill(comp, spec.fillVar ?? 'uds/surface/primary')
  await bindStroke(
    comp,
    destructive
      ? 'uds/button/border/primary/destructive'
      : warning
        ? 'uds/system/warning/primary'
        : constructive
          ? 'uds/system/constructive/primary'
          : 'uds/border/secondary',
  )

  const medallion = await createMedallionInstance(spec, medallionAxis)
  if (medallion) comp.appendChild(medallion)

  const content = figma.createFrame()
  content.name = 'Alert content'
  content.layoutMode = 'VERTICAL'
  content.primaryAxisAlignItems = 'MIN'
  content.counterAxisAlignItems = 'MIN'
  content.itemSpacing = 0
  content.fills = []
  const title = figma.createText()
  title.name = 'Alert title'
  title.fontName = { family: 'Inter', style: 'Medium' }
  title.characters = copy.title
  title.textAutoResize = 'HEIGHT'
  await applyLocalTextStyle(title, 'Body/16/Semibold', titleToken)
  content.appendChild(title)
  title.layoutSizingHorizontal = 'HUG'
  const desc = figma.createText()
  desc.name = 'Alert description'
  desc.fontName = { family: 'Inter', style: 'Regular' }
  desc.characters = copy.description
  desc.textAutoResize = 'HEIGHT'
  await applyLocalTextStyle(desc, 'Body/14/Regular', descToken)
  content.appendChild(desc)
  desc.layoutSizingHorizontal = 'HUG'
  comp.appendChild(content)
  content.layoutSizingHorizontal = 'HUG'
  content.layoutSizingVertical = 'HUG'

  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
}

async function bindPaddingAxis(node, varName, axis) {
  const v = await findVar(varName)
  if (!v) return
  node.setBoundVariable(axis, v)
}

async function buildCardVariant(comp, spec, axis) {
  const w = spec.width ?? 320
  const small = axis.Size === 'Small'
  const copy =
    spec.copyBySize?.[axis.Size] ??
    spec.copy ?? {
      title: 'Default card',
      description: 'Supporting description text.',
      footerAction: 'Save',
    }

  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = 'HUG'
  comp.clipsContent = true
  comp.resize(w, 211)
  comp.paddingTop = 0
  comp.paddingBottom = 0
  comp.paddingLeft = 0
  comp.paddingRight = 0
  comp.itemSpacing = 0
  await bindFill(comp, spec.fillVar ?? 'uds/surface/primary')
  await bindStroke(comp, spec.strokeVar ?? 'uds/border/primary')
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/8')

  const image = figma.createFrame()
  image.name = '.image'
  image.layoutMode = 'VERTICAL'
  image.primaryAxisAlignItems = 'MIN'
  image.counterAxisAlignItems = 'MIN'
  image.itemSpacing = 0
  image.fills = []
  image.layoutGrow = 1
  const imageSlot = figma.createFrame()
  imageSlot.name = small ? 'Slot2' : 'Slot3'
  imageSlot.fills = []
  imageSlot.layoutGrow = 1
  image.appendChild(imageSlot)
  imageSlot.layoutSizingHorizontal = 'FILL'
  comp.appendChild(image)
  image.layoutSizingHorizontal = 'FILL'

  const header = figma.createFrame()
  header.name = '.header'
  header.layoutMode = 'HORIZONTAL'
  header.primaryAxisAlignItems = 'MIN'
  header.counterAxisAlignItems = 'MIN'
  header.itemSpacing = 0
  header.fills = []
  await bindPaddingAxis(header, 'uds/gap/16', 'paddingLeft')
  await bindPaddingAxis(header, 'uds/gap/16', 'paddingRight')
  await bindPaddingAxis(header, 'uds/gap/12', 'paddingTop')
  await bindPaddingAxis(header, 'uds/gap/12', 'paddingBottom')

  const headerText = figma.createFrame()
  headerText.name = '.header-text'
  headerText.layoutMode = 'VERTICAL'
  headerText.primaryAxisAlignItems = 'MIN'
  headerText.counterAxisAlignItems = 'MIN'
  headerText.itemSpacing = 0
  headerText.fills = []

  const title = figma.createText()
  title.name = '.title'
  title.fontName = { family: 'Inter', style: 'Medium' }
  title.characters = copy.title
  title.textAutoResize = 'HEIGHT'
  await applyLocalTextStyle(
    title,
    small ? 'Body/14/Medium' : 'Body/16/Medium',
    'uds/text/primary',
  )
  headerText.appendChild(title)
  title.layoutSizingHorizontal = 'FILL'

  const desc = figma.createText()
  desc.name = '.description'
  desc.fontName = { family: 'Inter', style: 'Regular' }
  desc.characters = copy.description
  desc.textAutoResize = 'HEIGHT'
  await applyLocalTextStyle(desc, 'Body/14/Regular', 'uds/text/secondary')
  headerText.appendChild(desc)
  desc.layoutSizingHorizontal = 'FILL'

  header.appendChild(headerText)
  headerText.layoutSizingHorizontal = 'FILL'
  comp.appendChild(header)
  header.layoutSizingHorizontal = 'FILL'

  const content = figma.createFrame()
  content.name = '.content'
  content.layoutMode = 'VERTICAL'
  content.primaryAxisAlignItems = 'MIN'
  content.counterAxisAlignItems = 'MIN'
  content.itemSpacing = 0
  content.fills = []
  content.layoutGrow = 1
  const contentSlot = figma.createFrame()
  contentSlot.name = 'Slot'
  contentSlot.fills = []
  contentSlot.layoutGrow = 1
  content.appendChild(contentSlot)
  contentSlot.layoutSizingHorizontal = 'FILL'
  comp.appendChild(content)
  content.layoutSizingHorizontal = 'FILL'

  const footer = figma.createFrame()
  footer.name = '.footer'
  footer.layoutMode = 'HORIZONTAL'
  footer.primaryAxisAlignItems = 'MAX'
  footer.counterAxisAlignItems = 'CENTER'
  footer.itemSpacing = 8
  footer.fills = []
  await bindFill(footer, spec.footerFillVar ?? 'uds/surface/tertiary')
  await bindStroke(footer, spec.footerStrokeVar ?? 'uds/border/primary')
  footer.strokeTopWeight = 1
  footer.strokeRightWeight = 0
  footer.strokeBottomWeight = 0
  footer.strokeLeftWeight = 0
  await bindPaddingAxis(footer, 'uds/gap/16', 'paddingLeft')
  await bindPaddingAxis(footer, 'uds/gap/16', 'paddingRight')
  await bindPaddingAxis(footer, 'uds/gap/12', 'paddingTop')
  await bindPaddingAxis(footer, 'uds/gap/12', 'paddingBottom')

  const footerBtn = await createButtonInstance(
    spec.buttonSetNodeId,
    'Default',
    copy.footerAction,
    small ? 'Small' : 'Default',
  )
  if (footerBtn) {
    footerBtn.name = '.footer-action'
    footer.appendChild(footerBtn)
    footerBtn.layoutSizingHorizontal = 'HUG'
  }

  comp.appendChild(footer)
  footer.layoutSizingHorizontal = 'FILL'
}

async function buildTabsTrigger(label, active, isLine, fill = false) {
  const t = figma.createText()
  t.fontName = { family: 'Inter', style: active ? 'Semi Bold' : 'Regular' }
  t.fontSize = 14
  t.characters = label
  const textFill = isLine
    ? active
      ? 'uds/text/brand/quaternary'
      : 'uds/text/secondary'
    : active
      ? 'uds/text/inverse'
      : 'uds/text/secondary'
  await bindText(t, { fill: textFill })

  if (!isLine) {
    const trigger = figma.createFrame()
    trigger.name = 'Tabs trigger'
    trigger.layoutMode = 'HORIZONTAL'
    trigger.primaryAxisAlignItems = 'CENTER'
    trigger.counterAxisAlignItems = 'CENTER'
    trigger.layoutSizingVertical = 'HUG'
    trigger.minHeight = 40
    trigger.paddingLeft = 24
    trigger.paddingRight = 24
    trigger.fills = []
    trigger.layoutSizingHorizontal = fill ? 'FILL' : 'HUG'
    if (active) {
      await bindRadius(trigger, 'uds/radius/4')
      await bindFill(trigger, 'uds/surface/brand/quaternary')
    }
    trigger.appendChild(t)
    t.layoutSizingHorizontal = 'HUG'
    return trigger
  }

  const trigger = figma.createFrame()
  trigger.name = 'Tabs trigger'
  trigger.layoutMode = 'VERTICAL'
  trigger.primaryAxisAlignItems = 'MIN'
  trigger.counterAxisAlignItems = 'MIN'
  trigger.layoutSizingHorizontal = 'HUG'
  trigger.layoutSizingVertical = 'HUG'
  trigger.itemSpacing = 0
  trigger.fills = []
  trigger.layoutSizingHorizontal = fill ? 'FILL' : 'HUG'

  const labelWrap = figma.createFrame()
  labelWrap.name = 'Label'
  labelWrap.layoutMode = 'HORIZONTAL'
  labelWrap.primaryAxisAlignItems = 'CENTER'
  labelWrap.counterAxisAlignItems = 'CENTER'
  labelWrap.layoutSizingHorizontal = 'HUG'
  labelWrap.layoutSizingVertical = 'HUG'
  labelWrap.paddingLeft = 24
  labelWrap.paddingRight = 24
  labelWrap.paddingTop = 12
  labelWrap.paddingBottom = 12
  labelWrap.fills = []
  labelWrap.appendChild(t)
  t.layoutSizingHorizontal = 'HUG'
  trigger.appendChild(labelWrap)

  if (active) {
    const indicator = figma.createRectangle()
    indicator.name = 'Active indicator'
    indicator.resize(100, 2)
    indicator.fills = []
    await bindFill(indicator, 'uds/text/brand/quaternary')
    trigger.appendChild(indicator)
    indicator.layoutAlign = 'STRETCH'
    indicator.layoutSizingHorizontal = 'FILL'
    indicator.layoutSizingVertical = 'FIXED'
    indicator.minHeight = 2
    indicator.maxHeight = 2
  }

  return trigger
}

async function buildTabsVariant(comp, spec, axis) {
  const isLine = axis.Appearance === 'Line'
  const isFill = axis.Fill === 'true' || axis.Fill === 'Fill' || axis.Width === 'Fill'
  const fillWidth = spec.fillPreviewWidth ?? 360
  const count = Math.min(6, Math.max(2, Number(axis.Tabs) || 2))
  const activeIdx = Math.max(0, Math.min(count - 1, Number(axis.Active) - 1))

  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = isLine ? 'MAX' : 'CENTER'
  comp.itemSpacing = isLine ? 4 : 0
  comp.fills = []
  comp.layoutSizingHorizontal = isFill ? 'FIXED' : 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.clipsContent = true

  if (isLine) {
    await bindStroke(comp, 'uds/border/primary')
    comp.strokeTopWeight = 0
    comp.strokeRightWeight = 0
    comp.strokeBottomWeight = 1
    comp.strokeLeftWeight = 0
  } else {
    comp.paddingLeft = 3
    comp.paddingRight = 3
    comp.paddingTop = 3
    comp.paddingBottom = 3
    comp.itemSpacing = 0
    await bindFill(comp, 'uds/surface/secondary')
    await bindStroke(comp, 'uds/border/secondary')
    await bindRadius(comp, 'uds/radius/6')
  }

  for (let i = 0; i < count; i++) {
    comp.appendChild(
      await buildTabsTrigger(`Tab ${i + 1}`, i === activeIdx, isLine, isFill),
    )
  }

  if (isFill) {
    comp.resize(fillWidth, comp.height)
    comp.layoutSizingHorizontal = 'FIXED'
  }
}

async function buildFieldVariant(comp, spec, axis) {
  const vertical = axis.Appearance !== 'Horizontal'
  const isError = axis.State === 'Error'
  const w = spec.width ?? 756
  const labelW = spec.labelWidthPx ?? 128
  const slotH = spec.contentSlotHeight ?? 44
  const copy = spec.copy ?? {}
  const errorToken = vertical
    ? 'uds/button/border/primary/destructive'
    : 'uds/system/destructive/primary'
  const hintText = isError ? (copy.errorHint ?? copy.hint ?? 'Enter a valid email address.') : (copy.hint ?? 'We never share your email.')

  comp.layoutMode = vertical ? 'VERTICAL' : 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.itemSpacing = 8
  await bindGap(comp, 'uds/gap/8')
  comp.fills = []
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = 'HUG'
  comp.resize(w, 10)

  const label = figma.createText()
  label.name = 'Field label'
  label.characters = copy.label ?? 'Email'
  label.textAutoResize = vertical ? 'WIDTH_AND_HEIGHT' : 'HEIGHT'
  await applyLocalTextStyle(label, 'Body/14/Medium', isError ? errorToken : 'uds/text/primary')
  comp.appendChild(label)
  if (!vertical) {
    label.resize(labelW, label.height)
    label.layoutSizingHorizontal = 'FIXED'
  } else {
    label.layoutSizingHorizontal = 'HUG'
  }

  const appendContentSlot = async (parent, slotWidth) => {
    const slot = figma.createFrame()
    slot.name = 'Content'
    slot.resize(slotWidth, slotH)
    slot.fills = []
    slot.clipsContent = true
    const input = await createInputInstance(spec.inputSetNodeId, {
      state: isError ? 'Error' : 'Default',
      placeholder: copy.placeholder ?? 'you@example.com',
    })
    if (input) {
      slot.appendChild(input)
      input.layoutSizingHorizontal = 'FILL'
      input.resize(slotWidth, slotH)
    }
    parent.appendChild(slot)
    slot.layoutSizingHorizontal = 'FILL'
    return slot
  }

  const appendHint = async (parent, layerName) => {
    const hint = figma.createText()
    hint.name = layerName
    hint.characters = hintText
    hint.textAutoResize = 'HEIGHT'
    await applyLocalTextStyle(hint, 'Body/12/Regular', isError ? errorToken : 'uds/text/tertiary')
    parent.appendChild(hint)
    hint.layoutSizingHorizontal = 'FILL'
    return hint
  }

  if (vertical) {
    await appendContentSlot(comp, w)
    await appendHint(comp, isError ? 'Field error' : 'Field description')
  } else {
    const fieldContent = figma.createFrame()
    fieldContent.name = 'Field content'
    fieldContent.layoutMode = 'VERTICAL'
    fieldContent.primaryAxisAlignItems = 'MIN'
    fieldContent.counterAxisAlignItems = 'MIN'
    fieldContent.itemSpacing = 4
    fieldContent.fills = []
    fieldContent.layoutGrow = 1
    comp.appendChild(fieldContent)
    fieldContent.layoutSizingHorizontal = 'FILL'

    const slotWidth = w - labelW - 8
    await appendContentSlot(fieldContent, slotWidth)
    await appendHint(fieldContent, 'Field description')
  }

  comp.resize(w, comp.height)
}

const GLYPH_COMPONENT_CACHE = {}

async function importGlyphComponent(componentKey, weight = 'Regular') {
  const cacheKey = `${componentKey}:${weight}`
  if (GLYPH_COMPONENT_CACHE[cacheKey]) return GLYPH_COMPONENT_CACHE[cacheKey]
  const set = await figma.importComponentSetByKeyAsync(componentKey)
  const comp =
    set.children.find((c) => c.name === `Weight=${weight}`) ?? set.children[0]
  GLYPH_COMPONENT_CACHE[cacheKey] = comp
  return comp
}

async function bindDashedStroke(node, varName, weight = 1) {
  await bindStroke(node, varName, weight)
  node.dashPattern = [4, 4]
}

const FILE_UPLOAD_MEDALLION_SIZE = {
  Default: 'Extra Large',
  Small: 'Small',
  XS: 'Extra Small',
}

const FILE_UPLOAD_COPY = {
  Default: {
    instruction: 'Drop file here or click to upload',
    helper: 'All files up to 10MB',
  },
  Small: {
    instruction: 'Drop file or click to upload',
    helper: 'All files up to 10MB',
  },
  XS: {
    instruction: 'Drop file or click',
    helper: 'Max 10MB',
    inline: true,
  },
}

async function swapMedallionGlyph(medallionInst, glyphComp, iconColorToken = 'uds/color/white') {
  const iconWrap = medallionInst.findOne((n) => n.name === 'Icon')
  if (!iconWrap) return
  const inner = iconWrap.findOne((n) => n.type === 'INSTANCE')
  if (inner && glyphComp?.type === 'COMPONENT') {
    inner.swapComponent(glyphComp)
    const vector = inner.findOne(
      (n) => n.type === 'VECTOR' || (n.type === 'BOOLEAN_OPERATION' && 'fills' in n),
    )
    if (vector && 'fills' in vector) {
      const v = await findVar(iconColorToken)
      if (v) {
        const base = { type: 'SOLID', color: { r: 1, g: 1, b: 1 }, visible: true }
        vector.fills = [
          { ...figma.variables.setBoundVariableForPaint(base, 'color', v), visible: true },
        ]
      }
    }
  }
}

async function createUploadMedallionInstance(spec, uploadSize) {
  const medallionSize = FILE_UPLOAD_MEDALLION_SIZE[uploadSize] ?? 'Extra Large'
  const medallion = await createMedallionInstance(spec, {
    Size: medallionSize,
    Color: 'Blue',
    Tone: 'Solid',
  })
  if (!medallion) return null
  const uploadGlyph = await importGlyphComponent(
    spec.uploadSimpleIconKey ?? '58381645f3f638a5348482f5deda708fdec4f12e',
    'Bold',
  )
  await swapMedallionGlyph(medallion, uploadGlyph)
  return medallion
}

async function createBadgeInstance(badgeSetId, accent, appearance, label) {
  const set = await figma.getNodeByIdAsync(badgeSetId ?? '746:341')
  if (set?.type !== 'COMPONENT_SET') return null
  const variantName = `Accent=${accent}, Appearance=${appearance}`
  const badgeComp = set.children.find((c) => c.name === variantName)
  if (badgeComp?.type !== 'COMPONENT') return null
  const inst = badgeComp.createInstance()
  inst.name = 'Badge'
  const text = inst.findOne((n) => n.type === 'TEXT')
  if (text) {
    await figma.loadFontAsync(text.fontName)
    text.characters = label
  }
  return inst
}

async function createFileUploadInstance(spec, size, state) {
  const setId = spec.fileUploadSetNodeId
  let set = setId ? await figma.getNodeByIdAsync(setId) : null
  if (!set || set.type !== 'COMPONENT_SET') {
    const page = figma.currentPage
    set = page.findOne((n) => n.type === 'COMPONENT_SET' && n.name === 'FileUpload')
  }
  if (set?.type !== 'COMPONENT_SET') return null
  const variantName = `Size=${size}, State=${state}`
  const variant = set.children.find((c) => c.name === variantName)
  if (variant?.type !== 'COMPONENT') return null
  return variant.createInstance()
}

function fileUploadStatusBadge(status) {
  switch (status) {
    case 'uploading':
      return { label: 'Uploading', accent: 'Sky' }
    case 'success':
      return { label: 'Uploaded', accent: 'Green' }
    case 'error':
      return { label: 'Error', accent: 'Red' }
    case 'disabled':
      return { label: 'Disabled', accent: 'Neutral' }
    default:
      return { label: 'Ready', accent: 'Neutral' }
  }
}

async function createFileActionButton(spec, glyphKey, sizePx, weight = 'Regular') {
  const btn = figma.createFrame()
  btn.name = 'Action'
  btn.resize(sizePx, sizePx)
  btn.layoutMode = 'HORIZONTAL'
  btn.primaryAxisAlignItems = 'CENTER'
  btn.counterAxisAlignItems = 'CENTER'
  btn.fills = []
  btn.strokes = []
  await bindRadius(btn, 'uds/radius/8')
  const glyph = await importGlyphComponent(glyphKey, weight)
  const iconPx = sizePx <= 28 ? 14 : 16
  const icon = await createIcon16Instance(spec, glyph?.id)
  if (icon) {
    icon.resize(iconPx, iconPx)
    btn.appendChild(icon)
    const vector = icon.findOne(
      (n) => n.type === 'VECTOR' || (n.type === 'BOOLEAN_OPERATION' && 'fills' in n),
    )
    if (!vector) {
      const inner = icon.findOne((n) => n.type === 'INSTANCE')
      const innerVec = inner?.findOne(
        (n) => n.type === 'VECTOR' || (n.type === 'BOOLEAN_OPERATION' && 'fills' in n),
      )
      if (innerVec && 'fills' in innerVec) await bindFill(innerVec, 'uds/text/secondary')
    } else {
      await bindFill(vector, 'uds/text/secondary')
    }
  }
  return btn
}

async function appendFileUploadCard(parent, spec, item, compact) {
  const status = item.status ?? 'idle'
  const badgeConfig = fileUploadStatusBadge(status)
  const isDisabled = status === 'disabled'
  const pad = compact ? 8 : 12
  const thumbPx = compact ? 32 : 40
  const actionPx = compact ? 28 : 32

  const card = figma.createFrame()
  card.name = 'File upload card'
  card.layoutMode = 'VERTICAL'
  card.primaryAxisAlignItems = 'MIN'
  card.counterAxisAlignItems = 'MIN'
  card.fills = []
  card.strokes = []
  card.itemSpacing = 0
  card.paddingLeft = pad
  card.paddingRight = pad
  card.paddingTop = pad
  card.paddingBottom = pad
  await bindRadius(card, 'uds/radius/8')
  await bindFill(card, 'uds/surface/secondary')
  await bindStroke(card, 'uds/border/primary')
  if (isDisabled) card.opacity = 0.6

  const row = figma.createFrame()
  row.name = 'Card row'
  row.layoutMode = 'HORIZONTAL'
  row.primaryAxisAlignItems = compact ? 'CENTER' : 'MIN'
  row.counterAxisAlignItems = 'MIN'
  row.itemSpacing = compact ? 8 : 12
  row.fills = []
  row.strokes = []
  row.layoutSizingHorizontal = 'FILL'

  const thumb = figma.createFrame()
  thumb.name = 'Thumb'
  thumb.resize(thumbPx, thumbPx)
  thumb.layoutMode = 'HORIZONTAL'
  thumb.primaryAxisAlignItems = 'CENTER'
  thumb.counterAxisAlignItems = 'CENTER'
  thumb.clipsContent = true
  await bindRadius(thumb, 'uds/radius/8')
  await bindFill(thumb, 'uds/surface/tertiary')
  const thumbGlyphKey =
    item.thumbIconKey ??
    (item.type?.startsWith('image/')
      ? spec.imageIconKey ?? '68c2b3b798f7884bee893c4b943055978f8395d6'
      : spec.fileIconKey ?? 'b6abfee2cc2369d1fa0b5decc772e806ad8e8436')
  const thumbIcon = await createIcon16Instance(
    spec,
    (await importGlyphComponent(thumbGlyphKey, 'Regular'))?.id,
  )
  if (thumbIcon) {
    thumbIcon.resize(compact ? 16 : 20, compact ? 16 : 20)
    thumb.appendChild(thumbIcon)
  }
  row.appendChild(thumb)
  thumb.layoutSizingHorizontal = 'HUG'

  const body = figma.createFrame()
  body.name = 'Body'
  body.layoutMode = 'VERTICAL'
  body.primaryAxisAlignItems = 'MIN'
  body.counterAxisAlignItems = 'MIN'
  body.itemSpacing = compact ? 4 : 4
  body.fills = []
  body.layoutGrow = 1

  const titleRow = figma.createFrame()
  titleRow.name = 'Title row'
  titleRow.layoutMode = 'HORIZONTAL'
  titleRow.primaryAxisAlignItems = 'CENTER'
  titleRow.counterAxisAlignItems = 'CENTER'
  titleRow.itemSpacing = 8
  titleRow.fills = []
  titleRow.layoutSizingHorizontal = 'FILL'
  await bindGap(titleRow, 'uds/gap/8')

  const title = figma.createText()
  title.name = 'File name'
  title.characters = item.name ?? 'document.pdf'
  title.textAutoResize = 'WIDTH_AND_HEIGHT'
  await applyLocalTextStyle(
    title,
    compact ? 'Body/14/Semibold' : 'Body/16/Semibold',
    'uds/text/primary',
  )
  titleRow.appendChild(title)
  title.layoutSizingHorizontal = 'HUG'

  const badge = await createBadgeInstance(
    spec.badgeSetNodeId,
    badgeConfig.accent,
    'Pastel',
    badgeConfig.label,
  )
  if (badge) {
    titleRow.appendChild(badge)
    badge.layoutSizingHorizontal = 'HUG'
  }
  body.appendChild(titleRow)
  titleRow.layoutSizingHorizontal = 'FILL'

  if (item.meta) {
    const meta = figma.createText()
    meta.name = 'Metadata'
    meta.characters = item.meta
    meta.textAutoResize = 'WIDTH_AND_HEIGHT'
    await applyLocalTextStyle(
      meta,
      compact ? 'Body/12/Regular' : 'Body/14/Regular',
      'uds/text/secondary',
    )
    body.appendChild(meta)
    meta.layoutSizingHorizontal = 'FILL'
  }

  if (status === 'uploading') {
    const progressWrap = figma.createFrame()
    progressWrap.name = 'Progress'
    progressWrap.layoutMode = 'VERTICAL'
    progressWrap.primaryAxisAlignItems = 'MIN'
    progressWrap.counterAxisAlignItems = 'MIN'
    progressWrap.itemSpacing = 4
    progressWrap.fills = []
    progressWrap.layoutSizingHorizontal = 'FILL'
    await bindGap(progressWrap, 'uds/gap/4')

    const track = figma.createFrame()
    track.name = 'Progress track'
    track.resize(200, 8)
    track.layoutMode = 'NONE'
    track.clipsContent = true
    track.cornerRadius = 4
    await bindFill(track, 'uds/surface/quaternary')
    const pct = Math.max(0, Math.min(100, item.progress ?? 0))
    const bar = figma.createRectangle()
    bar.resize(Math.max(8, Math.round(track.width * (pct / 100))), 8)
    bar.cornerRadius = 4
    await bindFill(bar, 'uds/color/primary/700')
    track.appendChild(bar)
    progressWrap.appendChild(track)
    track.layoutSizingHorizontal = 'FILL'

    const pctText = figma.createText()
    pctText.name = 'Progress label'
    pctText.characters = `${pct}% uploaded`
    pctText.textAutoResize = 'WIDTH_AND_HEIGHT'
    await applyLocalTextStyle(pctText, 'Body/12/Regular', 'uds/text/secondary')
    progressWrap.appendChild(pctText)
    body.appendChild(progressWrap)
    progressWrap.layoutSizingHorizontal = 'FILL'
  }

  if (status === 'error' && item.errorMessage) {
    const err = figma.createText()
    err.name = 'Error message'
    err.characters = item.errorMessage
    err.textAutoResize = 'WIDTH_AND_HEIGHT'
    await applyLocalTextStyle(err, 'Body/12/Regular', 'uds/button/border/primary/destructive')
    body.appendChild(err)
    err.layoutSizingHorizontal = 'FILL'
  }

  row.appendChild(body)
  body.layoutSizingHorizontal = 'FILL'

  const actions = figma.createFrame()
  actions.name = 'Actions'
  actions.layoutMode = 'HORIZONTAL'
  actions.primaryAxisAlignItems = 'CENTER'
  actions.counterAxisAlignItems = 'CENTER'
  actions.itemSpacing = 4
  actions.fills = []
  await bindGap(actions, 'uds/gap/4')

  if (status !== 'disabled') {
    const eye = await createFileActionButton(
      spec,
      spec.eyeIconKey ?? 'f5ccd714d3f6cb4441e56c7d4626c31224301113',
      actionPx,
    )
    const download = await createFileActionButton(
      spec,
      spec.downloadIconKey ?? 'df2da3892f5d897c9198b88a12b6f94822100df1',
      actionPx,
    )
    if (eye) actions.appendChild(eye)
    if (download) actions.appendChild(download)
  }
  if (status === 'error') {
    const retry = await createFileActionButton(
      spec,
      spec.retryIconKey ?? '88e807f6551a60fa9c3d3f18ad7649d66237359a',
      actionPx,
    )
    if (retry) actions.appendChild(retry)
  }
  if (status !== 'disabled') {
    const remove = await createFileActionButton(
      spec,
      spec.removeIconKey ?? '51df6cfead413600e416d3fe72013237453a0194',
      actionPx,
    )
    if (remove) actions.appendChild(remove)
  }
  row.appendChild(actions)
  actions.layoutSizingHorizontal = 'HUG'

  card.appendChild(row)
  row.layoutSizingHorizontal = 'FILL'
  parent.appendChild(card)
  card.layoutSizingHorizontal = 'FILL'
  return card
}

async function buildFileUploadVariant(comp, spec, axis) {
  const size = axis.Size ?? 'Default'
  const state = axis.State ?? 'Default'
  const isXs = size === 'XS'
  const isDragging = state === 'Dragging'
  const isDisabled = state === 'Disabled'
  const copy = FILE_UPLOAD_COPY[size] ?? FILE_UPLOAD_COPY.Default
  const w = isXs ? (spec.widthXs ?? 400) : (spec.width ?? 480)
  const minH = isXs ? 48 : size === 'Small' ? 128 : 272
  const pad = isXs ? 12 : 24

  comp.layoutMode = isXs ? 'HORIZONTAL' : 'VERTICAL'
  comp.primaryAxisAlignItems = isXs ? 'MIN' : 'CENTER'
  comp.counterAxisAlignItems = isXs ? 'CENTER' : 'CENTER'
  comp.itemSpacing = isXs ? 8 : 0
  if (isXs) await bindGap(comp, 'uds/gap/8')
  comp.paddingLeft = pad
  comp.paddingRight = pad
  comp.paddingTop = pad
  comp.paddingBottom = pad
  comp.resize(w, minH)
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = isXs ? 'HUG' : 'FIXED'
  await bindRadius(comp, 'uds/radius/8')
  await bindFill(
    comp,
    isDragging ? 'uds/surface/tertiary' : 'uds/surface/secondary',
  )
  await bindDashedStroke(
    comp,
    isDragging ? 'uds/border/secondary' : 'uds/border/primary',
  )
  if (isDisabled) comp.opacity = 0.5

  const medallion = await createUploadMedallionInstance(spec, size)
  if (medallion) {
    comp.appendChild(medallion)
  }

  const textWrap = figma.createFrame()
  textWrap.name = 'Copy'
  textWrap.layoutMode = 'VERTICAL'
  textWrap.primaryAxisAlignItems = isXs ? 'MIN' : 'CENTER'
  textWrap.counterAxisAlignItems = isXs ? 'MIN' : 'CENTER'
  textWrap.itemSpacing = isXs ? 4 : 4
  textWrap.fills = []

  if (isXs && copy.inline) {
    const line = figma.createText()
    line.name = 'Instruction'
    line.characters = `${copy.instruction} · ${copy.helper}`
    line.textAutoResize = 'HEIGHT'
    line.resize(w - pad * 2 - 24 - 8, line.height)
    await applyLocalTextStyle(line, 'Body/14/Semibold', 'uds/text/primary')
    textWrap.appendChild(line)
    comp.appendChild(textWrap)
    textWrap.layoutGrow = 1
    line.layoutSizingHorizontal = 'FILL'
  } else {
    const instruction = figma.createText()
    instruction.name = 'Instruction'
    instruction.characters = copy.instruction
    instruction.textAutoResize = 'WIDTH_AND_HEIGHT'
    await applyLocalTextStyle(
      instruction,
      size === 'Small' ? 'Body/16/Semibold' : 'Body/16/Medium',
      'uds/text/primary',
    )
    textWrap.appendChild(instruction)
    instruction.layoutSizingHorizontal = 'HUG'

    const helper = figma.createText()
    helper.name = 'Helper'
    helper.characters = copy.helper
    helper.textAutoResize = 'WIDTH_AND_HEIGHT'
    await applyLocalTextStyle(
      helper,
      size === 'Small' ? 'Body/12/Regular' : 'Body/14/Regular',
      'uds/text/secondary',
    )
    textWrap.appendChild(helper)
    helper.layoutSizingHorizontal = 'HUG'
    comp.appendChild(textWrap)
    textWrap.layoutSizingHorizontal = 'FILL'
  }

  if (!isXs) {
    comp.resize(w, Math.max(minH, comp.height))
  }
}

async function buildFileUploadCardsVariant(comp, spec, axis) {
  const compact = axis.Density === 'Compact'
  const w = spec.width ?? 480
  const dropSize = compact ? 'XS' : 'Default'
  const stackGap = compact ? 8 : 16

  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.itemSpacing = stackGap
  comp.fills = []
  comp.strokes = []
  comp.resize(w, 10)
  await bindGap(comp, compact ? 'uds/gap/8' : 'uds/gap/16')

  const dropzone =
    (await createFileUploadInstance(spec, dropSize, 'Default')) ??
    (await (async () => {
      const frame = figma.createFrame()
      frame.name = 'FileUpload placeholder'
      frame.resize(w, compact ? 48 : 272)
      await bindDashedStroke(frame, 'uds/border/primary')
      await bindFill(frame, 'uds/surface/secondary')
      return frame
    })())
  dropzone.name = 'FileUpload'
  comp.appendChild(dropzone)
  dropzone.layoutSizingHorizontal = 'FILL'

  const cards = spec.demoItems ?? []
  const list = figma.createFrame()
  list.name = 'Cards'
  list.layoutMode = 'VERTICAL'
  list.primaryAxisAlignItems = 'MIN'
  list.counterAxisAlignItems = 'MIN'
  list.itemSpacing = compact ? 8 : 12
  list.fills = []
  list.strokes = []
  await bindGap(list, compact ? 'uds/gap/8' : 'uds/gap/12')

  for (const item of cards) {
    await appendFileUploadCard(list, spec, item, compact)
  }

  comp.appendChild(list)
  list.layoutSizingHorizontal = 'FILL'
  comp.resize(w, comp.height)
}

async function createBrandingInstance(spec, appearance, symbol) {
  const set = await figma.getNodeByIdAsync(spec.brandingSetNodeId ?? '1103:533')
  if (set?.type !== 'COMPONENT_SET') return null
  const variantName = `Appearance=${appearance}, Symbol=${symbol ? 'True' : 'False'}`
  const comp = set.children.find((c) => c.name === variantName)
  if (comp?.type !== 'COMPONENT') return null
  const inst = comp.createInstance()
  inst.name = symbol ? 'Branding mark' : 'Branding wordmark'
  return inst
}

async function bindIconFill(iconInst, fillToken) {
  if (!iconInst || !fillToken) return
  const nodes = iconInst.findAll(
    (n) => (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION') && 'fills' in n,
  )
  for (const vector of nodes) {
    await bindFill(vector, fillToken)
  }
}

async function createMenuGlyph(spec, iconName, sizePx, fillToken, weight = 'Duotone') {
  const key = spec.iconKeys?.[iconName]
  if (!key) return null
  const glyph = await importGlyphComponent(key, weight)
  const iconSet = await figma.getNodeByIdAsync(spec.iconSetNodeId ?? '501:6')
  const sizeName = sizePx <= 16 ? 'Size=16' : sizePx <= 20 ? 'Size=20' : 'Size=24'
  const iconComp = iconSet?.children?.find((c) => c.name === sizeName)
  if (iconComp?.type !== 'COMPONENT') return null
  const inst = iconComp.createInstance()
  inst.name = 'Icon'
  inst.resize(sizePx, sizePx)
  const inner = inst.findOne((n) => n.type === 'INSTANCE')
  if (inner && glyph?.type === 'COMPONENT') inner.swapComponent(glyph)
  await bindIconFill(inst, fillToken ?? 'uds/text/primary')
  return inst
}

async function createMenuToggleButton(spec) {
  const btn = figma.createFrame()
  btn.name = 'Menu toggle'
  btn.resize(44, 44)
  btn.layoutMode = 'HORIZONTAL'
  btn.primaryAxisAlignItems = 'CENTER'
  btn.counterAxisAlignItems = 'CENTER'
  btn.fills = []
  btn.strokes = []
  const icon = await createMenuGlyph(spec, 'List', 20, 'uds/text/primary', 'Bold')
  if (icon) btn.appendChild(icon)
  return btn
}

async function appendMenuNavLeaf(parent, spec, item, active) {
  const row = figma.createFrame()
  row.name = 'Nav leaf'
  row.layoutMode = 'HORIZONTAL'
  row.primaryAxisAlignItems = 'CENTER'
  row.counterAxisAlignItems = 'CENTER'
  row.resize(parent.width, 36)
  row.paddingLeft = 24
  row.paddingRight = 16
  row.fills = []
  row.strokes = []
  row.strokeLeftWeight = active ? 2 : 1
  await bindStroke(row, active ? 'uds/surface/brand/quaternary' : 'uds/border/primary')
  if (active) await bindFill(row, 'uds/color/neutrals/50')

  const label = figma.createText()
  label.name = 'Label'
  label.characters = item.label
  label.textAutoResize = 'WIDTH_AND_HEIGHT'
  await applyLocalTextStyle(
    label,
    'Body/14/Regular',
    active ? 'uds/text/primary' : 'uds/text/tertiary',
  )
  row.appendChild(label)
  parent.appendChild(row)
  row.layoutSizingHorizontal = 'FILL'
  return row
}

async function appendMenuNavBranch(parent, spec, item, width, activeChild) {
  const branchActive = item.active || false
  const branchRow = figma.createFrame()
  branchRow.name = 'Nav branch'
  branchRow.layoutMode = 'HORIZONTAL'
  branchRow.primaryAxisAlignItems = 'CENTER'
  branchRow.counterAxisAlignItems = 'CENTER'
  branchRow.itemSpacing = 12
  branchRow.resize(width, 44)
  branchRow.paddingLeft = 16
  branchRow.paddingRight = 8
  branchRow.fills = []
  await bindGap(branchRow, 'uds/gap/12')

  const icon = await createMenuGlyph(
    spec,
    item.icon,
    24,
    branchActive ? 'uds/text/inverse' : 'uds/text/primary',
  )
  if (icon) {
    branchRow.appendChild(icon)
    icon.layoutSizingHorizontal = 'HUG'
  }

  const label = figma.createText()
  label.name = 'Label'
  label.characters = item.label
  label.textAutoResize = 'WIDTH_AND_HEIGHT'
  await applyLocalTextStyle(
    label,
    'Body/16/Medium',
    branchActive ? 'uds/text/inverse' : 'uds/text/primary',
  )
  branchRow.appendChild(label)
  label.layoutGrow = 1
  label.layoutSizingHorizontal = 'FILL'

  const caret = await createMenuGlyph(
    spec,
    'CaretDown',
    16,
    branchActive ? 'uds/text/inverse' : 'uds/text/primary',
    'Regular',
  )
  if (caret) {
    branchRow.appendChild(caret)
    caret.layoutSizingHorizontal = 'HUG'
  }

  parent.appendChild(branchRow)
  branchRow.layoutSizingHorizontal = 'FILL'

  if (item.expanded && item.children?.length) {
    const childrenWrap = figma.createFrame()
    childrenWrap.name = 'Nav children'
    childrenWrap.layoutMode = 'VERTICAL'
    childrenWrap.primaryAxisAlignItems = 'MIN'
    childrenWrap.counterAxisAlignItems = 'MIN'
    childrenWrap.itemSpacing = 0
    childrenWrap.fills = []
    childrenWrap.resize(width, 10)
    parent.appendChild(childrenWrap)
    childrenWrap.layoutSizingHorizontal = 'FILL'
    for (const child of item.children) {
      await appendMenuNavLeaf(childrenWrap, spec, child, child.label === activeChild)
    }
    childrenWrap.resize(width, childrenWrap.height)
  }
}

async function appendMenuNavRow(parent, spec, item, width) {
  const active = Boolean(item.active)
  if (item.children?.length) {
    await appendMenuNavBranch(parent, spec, item, width, null)
    return
  }

  const row = figma.createFrame()
  row.name = 'Nav item'
  row.layoutMode = 'HORIZONTAL'
  row.primaryAxisAlignItems = 'CENTER'
  row.counterAxisAlignItems = 'CENTER'
  row.itemSpacing = 12
  row.resize(width, 44)
  row.paddingLeft = 16
  row.paddingRight = 16
  row.fills = []
  row.strokes = []
  await bindGap(row, 'uds/gap/12')
  if (active) await bindFill(row, 'uds/surface/brand/quaternary')

  if (item.icon) {
    const icon = await createMenuGlyph(
      spec,
      item.icon,
      24,
      active ? 'uds/text/inverse' : 'uds/text/primary',
    )
    if (icon) {
      row.appendChild(icon)
      icon.layoutSizingHorizontal = 'HUG'
    }
  } else if (spec.brandKey === 'Wireframe') {
    const bar = figma.createRectangle()
    bar.name = 'Wireframe icon'
    bar.resize(24, 24)
    await bindFill(bar, 'uds/surface/tertiary')
    await bindRadius(bar, 'uds/radius/4')
    row.appendChild(bar)
  }

  const label = figma.createText()
  label.name = 'Label'
  label.characters = item.label
  label.textAutoResize = 'WIDTH_AND_HEIGHT'
  await applyLocalTextStyle(
    label,
    'Body/16/Medium',
    active ? 'uds/text/inverse' : 'uds/text/primary',
  )
  row.appendChild(label)
  label.layoutGrow = 1
  label.layoutSizingHorizontal = 'FILL'

  parent.appendChild(row)
  row.layoutSizingHorizontal = 'FILL'
}

async function appendMenuNavCollapsed(parent, spec, item) {
  const active = Boolean(item.active)
  const btn = figma.createFrame()
  btn.name = 'Nav item'
  btn.resize(44, 44)
  btn.layoutMode = 'HORIZONTAL'
  btn.primaryAxisAlignItems = 'CENTER'
  btn.counterAxisAlignItems = 'CENTER'
  btn.fills = []
  btn.strokes = []
  btn.cornerRadius = 4
  if (active) await bindFill(btn, 'uds/surface/brand/quaternary')

  if (item.icon) {
    const icon = await createMenuGlyph(
      spec,
      item.icon,
      24,
      active ? 'uds/text/inverse' : 'uds/text/primary',
    )
    if (icon) btn.appendChild(icon)
  } else {
    const bar = figma.createRectangle()
    bar.resize(20, 20)
    await bindFill(bar, active ? 'uds/text/inverse' : 'uds/surface/tertiary')
    bar.cornerRadius = 4
    btn.appendChild(bar)
  }

  parent.appendChild(btn)
  btn.layoutSizingHorizontal = 'HUG'
}

async function appendMenuHeader(parent, spec, appearance, expanded) {
  const header = figma.createFrame()
  header.name = 'Menu header'
  header.layoutMode = 'HORIZONTAL'
  header.primaryAxisAlignItems = 'CENTER'
  header.counterAxisAlignItems = 'CENTER'
  header.itemSpacing = 0
  header.resize(parent.width, 56)
  header.fills = []
  header.strokes = []
  await bindFill(header, 'uds/surface/primary')
  await bindStroke(header, 'uds/border/primary')
  header.strokeBottomWeight = 1
  header.strokeTopWeight = 0
  header.strokeLeftWeight = 0
  header.strokeRightWeight = 0

  if (expanded) {
    const toggleSlot = figma.createFrame()
    toggleSlot.name = 'Toggle slot'
    toggleSlot.resize(44, 56)
    toggleSlot.fills = []
    toggleSlot.layoutMode = 'HORIZONTAL'
    toggleSlot.primaryAxisAlignItems = 'CENTER'
    toggleSlot.counterAxisAlignItems = 'CENTER'
    const toggle = await createMenuToggleButton(spec)
    toggleSlot.appendChild(toggle)
    header.appendChild(toggleSlot)

    const brandSlot = figma.createFrame()
    brandSlot.name = 'Brand slot'
    brandSlot.layoutMode = 'HORIZONTAL'
    brandSlot.primaryAxisAlignItems = 'CENTER'
    brandSlot.counterAxisAlignItems = 'CENTER'
    brandSlot.fills = []
    brandSlot.layoutGrow = 1
    const branding = await createBrandingInstance(spec, appearance, false)
    if (branding) {
      branding.resize(188, 56)
      brandSlot.appendChild(branding)
    }
    header.appendChild(brandSlot)
    brandSlot.layoutSizingHorizontal = 'FILL'

    const spacer = figma.createFrame()
    spacer.name = 'Header spacer'
    spacer.resize(44, 56)
    spacer.fills = []
    header.appendChild(spacer)
  } else {
    const brandSlot = figma.createFrame()
    brandSlot.name = 'Brand slot'
    brandSlot.layoutMode = 'HORIZONTAL'
    brandSlot.primaryAxisAlignItems = 'CENTER'
    brandSlot.counterAxisAlignItems = 'CENTER'
    brandSlot.fills = []
    brandSlot.layoutGrow = 1
    const branding = await createBrandingInstance(spec, appearance, true)
    if (branding) {
      branding.resize(36, 36)
      brandSlot.appendChild(branding)
    }
    header.appendChild(brandSlot)
    brandSlot.layoutSizingHorizontal = 'FILL'
  }

  parent.appendChild(header)
  header.layoutSizingHorizontal = 'FILL'
}

async function appendMenuNavigation(parent, spec, brandKey, expanded) {
  const nav = figma.createFrame()
  nav.name = 'Navigation'
  nav.layoutMode = 'VERTICAL'
  nav.primaryAxisAlignItems = 'MIN'
  nav.counterAxisAlignItems = expanded ? 'MIN' : 'CENTER'
  nav.itemSpacing = expanded ? 0 : 4
  nav.fills = []
  nav.clipsContent = true
  nav.layoutGrow = 1

  const items = spec.navigationByBrand?.[brandKey] ?? spec.navigationByBrand?.Default ?? []
  if (expanded) {
    for (const item of items) {
      await appendMenuNavRow(nav, { ...spec, brandKey }, item, parent.width)
    }
  } else {
    for (const item of items) {
      if (item.children?.length) continue
      await appendMenuNavCollapsed(nav, spec, item)
    }
  }

  parent.appendChild(nav)
  nav.layoutSizingHorizontal = 'FILL'
  nav.layoutSizingVertical = 'FILL'
}

async function buildMenuVariant(comp, spec, axis) {
  const brandKey = axis.Brand ?? 'Default'
  const expanded = axis.Rail !== 'Collapsed'
  const appearance = spec.brandToAppearance?.[brandKey] ?? 'Design System'
  const w = expanded ? (spec.expandedWidth ?? 280) : (spec.collapsedWidth ?? 64)
  const h = spec.height ?? 720

  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.itemSpacing = 0
  comp.resize(w, h)
  comp.clipsContent = true
  await bindFill(comp, 'uds/surface/primary')
  await bindStroke(comp, 'uds/border/primary')
  comp.strokeRightWeight = 1
  comp.strokeTopWeight = 0
  comp.strokeBottomWeight = 0
  comp.strokeLeftWeight = 0

  await appendMenuHeader(comp, spec, appearance, expanded)
  await appendMenuNavigation(comp, spec, brandKey, expanded)
}

const MEDALLION_PASTEL_FG_1000 = new Set(['yellow', 'amber', 'lime'])

function medallionColorSlug(figmaColor) {
  return String(figmaColor).toLowerCase()
}

function medallionTokenPath(color, step) {
  if (color === 'neutrals') return `uds/color/neutrals/${step}`
  return `uds/color/accent/${color}/${step}`
}

function resolveMedallionTokens(figmaColor, figmaTone) {
  const color = medallionColorSlug(figmaColor)
  if (figmaTone === 'Solid') {
    return {
      fill:
        color === 'neutrals'
          ? 'uds/color/neutrals/500'
          : medallionTokenPath(color, 500),
      icon: 'uds/color/white',
    }
  }
  const fgStep = MEDALLION_PASTEL_FG_1000.has(color) ? 1000 : 700
  return {
    fill: medallionTokenPath(color, 25),
    icon:
      color === 'neutrals'
        ? 'uds/color/neutrals/700'
        : medallionTokenPath(color, fgStep),
  }
}

const MEDALLION_SIZE_PX = {
  'Extra Small': 24,
  Small: 32,
  Default: 40,
  Large: 48,
  'Extra Large': 64,
}

async function buildMedallionVariant(comp, spec, axis) {
  const sizeKey = axis.Size ?? 'Default'
  const shapeKey = axis.Shape ?? 'Circle'
  const sizePx = MEDALLION_SIZE_PX[sizeKey] ?? spec.defaultSizePx ?? 40
  const iconPx = spec.iconPxBySize?.[sizeKey] ?? Math.round(sizePx * 0.45)

  comp.resize(sizePx, sizePx)
  // Fixed square container — auto-layout HUG collapses width to the icon only.
  comp.layoutMode = 'NONE'
  comp.clipsContent = true

  if (shapeKey === 'Circle') {
    await bindRadius(comp, 'uds/radius/9999')
  } else if (shapeKey === 'Rounded') {
    comp.cornerRadius = 12
  } else {
    comp.cornerRadius = 0
  }

  const style = resolveMedallionTokens(axis.Color, axis.Tone)
  await bindFill(comp, style.fill)

  let iconNode = null
  const iconSetId = spec.iconSetNodeId ?? '501:6'
  const iconVariantName = spec.iconVariantBySize?.[sizeKey] ?? 'Size=20'
  const iconSet = await figma.getNodeByIdAsync(iconSetId)
  if (iconSet?.type === 'COMPONENT_SET') {
    const iconComp = iconSet.children.find((c) => c.name === iconVariantName)
    if (iconComp?.type === 'COMPONENT') {
      const inst = iconComp.createInstance()
      inst.resize(iconPx, iconPx)
      iconNode = inst
      const vector = inst.findOne(
        (n) => n.type === 'VECTOR' || (n.type === 'BOOLEAN_OPERATION' && 'fills' in n),
      )
      if (vector && 'fills' in vector) {
        const v = await findVar(style.icon)
        if (v) {
          const iconBase = { type: 'SOLID', color: { r: 0, g: 0, b: 0 }, visible: true }
          const iconBound = figma.variables.setBoundVariableForPaint(iconBase, 'color', v)
          vector.fills = [{ ...iconBound, visible: true }]
        }
      }
    }
  }

  if (!iconNode) {
    const glyph = figma.createRectangle()
    glyph.resize(Math.round(iconPx * 0.7), Math.round(iconPx * 0.85))
    await bindFill(glyph, style.icon)
    iconNode = glyph
  }

  iconNode.name = 'Icon'
  iconNode.x = Math.round((sizePx - iconNode.width) / 2)
  iconNode.y = Math.round((sizePx - iconNode.height) / 2)
  comp.appendChild(iconNode)
}

function brandingSvgForAppearance(appearance, symbol) {
  if (typeof BRANDING_SVGS === 'undefined' || !BRANDING_SVGS[appearance]) return null
  return symbol ? BRANDING_SVGS[appearance].mark : BRANDING_SVGS[appearance].wordmark
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

async function createCheckboxInstance(spec, { checked = false, disabled = false } = {}) {
  const setId = spec.checkboxSetNodeId ?? '590:230'
  const set = await figma.getNodeByIdAsync(setId)
  if (set?.type !== 'COMPONENT_SET') return null
  const state = checked ? 'Checked' : 'Unchecked'
  const variantName = `State=${state}, Disabled=${disabled ? 'True' : 'False'}`
  const checkboxComp = set.children.find((c) => c.name === variantName)
  if (checkboxComp?.type !== 'COMPONENT') return null
  const inst = checkboxComp.createInstance()
  inst.name = 'Checkbox'
  inst.resize(20, 20)
  return inst
}

async function buildCheckListControlContent(spec, axis, copy) {
  const checked = axis.Checked === 'True'
  const disabled = axis.Disabled === 'True'
  const hasDescription = axis.Description === 'True'

  const row = figma.createFrame()
  row.name = '.check-list-control'
  row.layoutMode = 'HORIZONTAL'
  row.primaryAxisAlignItems = 'MIN'
  row.counterAxisAlignItems = 'MIN'
  row.itemSpacing = 8
  await bindGap(row, 'uds/gap/8')
  row.fills = []

  const checkbox = await createCheckboxInstance(spec, { checked, disabled })
  if (checkbox) {
    row.appendChild(checkbox)
  }

  const textCol = figma.createFrame()
  textCol.name = '.text'
  textCol.layoutMode = 'VERTICAL'
  textCol.primaryAxisAlignItems = 'MIN'
  textCol.counterAxisAlignItems = 'MIN'
  textCol.itemSpacing = 4
  await bindGap(textCol, 'uds/gap/4')
  textCol.fills = []
  textCol.layoutGrow = 1

  const label = figma.createText()
  label.name = '.label'
  label.fontName = { family: 'Inter', style: 'Medium' }
  label.characters = copy.label ?? 'Task label'
  label.textAutoResize = 'HEIGHT'
  await applyLocalTextStyle(
    label,
    'Body/14/Medium',
    disabled ? 'uds/text/disabled' : 'uds/text/primary',
  )
  textCol.appendChild(label)

  if (hasDescription) {
    const desc = figma.createText()
    desc.name = '.description'
    desc.fontName = { family: 'Inter', style: 'Regular' }
    desc.characters = copy.description ?? 'Supporting description for the task.'
    desc.textAutoResize = 'HEIGHT'
    await applyLocalTextStyle(desc, 'Body/14/Regular', 'uds/text/secondary')
    textCol.appendChild(desc)
  }

  row.appendChild(textCol)
  textCol.layoutSizingHorizontal = 'FILL'

  return row
}

async function createCollapsibleIcon(spec, expanded) {
  const iconSetId = spec.iconSetNodeId ?? '501:6'
  const iconVariantName = spec.iconVariant ?? 'Size=16'
  const iconSet = await figma.getNodeByIdAsync(iconSetId)
  if (iconSet?.type !== 'COMPONENT_SET') return null
  const iconComp = iconSet.children.find((c) => c.name === iconVariantName)
  if (iconComp?.type !== 'COMPONENT') return null
  const inst = iconComp.createInstance()
  inst.name = 'icon'
  inst.resize(16, 16)
  return inst
}

async function buildCollapsibleVariant(comp, spec, axis) {
  const w = spec.width ?? 360
  const divided = axis.Variant === 'Divided'
  const expanded = axis.State === 'Expanded'
  const collapsedH = spec.collapsedHeight ?? 40
  const expandedH = spec.expandedHeight ?? 64

  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.itemSpacing = 0
  comp.fills = []
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = 'HUG'
  comp.resize(w, expanded ? expandedH : collapsedH)

  if (divided) {
    comp.strokes = []
    await bindStroke(comp, 'uds/border/secondary')
    comp.strokeTopWeight = 0
    comp.strokeLeftWeight = 0
    comp.strokeRightWeight = 0
    comp.strokeBottomWeight = 1
  } else {
    await bindFill(comp, 'uds/surface/primary')
    await bindStroke(comp, 'uds/border/primary')
    await bindRadius(comp, 'uds/radius/4')
    comp.clipsContent = true
  }

  const trigger = figma.createFrame()
  trigger.name = '.trigger'
  trigger.layoutMode = 'HORIZONTAL'
  trigger.primaryAxisAlignItems = 'CENTER'
  trigger.counterAxisAlignItems = 'CENTER'
  trigger.itemSpacing = 12
  await bindGap(trigger, 'uds/gap/12')
  trigger.fills = []
  await bindPaddingAxis(trigger, 'uds/gap/16', 'paddingLeft')
  await bindPaddingAxis(trigger, 'uds/gap/16', 'paddingRight')
  await bindPaddingAxis(trigger, 'uds/gap/8', 'paddingTop')
  await bindPaddingAxis(trigger, 'uds/gap/8', 'paddingBottom')

  if (!divided && expanded) {
    await bindStroke(trigger, 'uds/border/primary')
    trigger.strokeTopWeight = 0
    trigger.strokeLeftWeight = 0
    trigger.strokeRightWeight = 0
    trigger.strokeBottomWeight = 1
  }

  const triggerSlot = figma.createFrame()
  triggerSlot.name = 'Content'
  triggerSlot.resize(300, 24)
  triggerSlot.fills = []
  triggerSlot.layoutGrow = 1

  const icon = await createCollapsibleIcon(spec, expanded)
  const iconLeft = axis.IconPosition === 'Left'
  if (iconLeft && icon) trigger.appendChild(icon)
  trigger.appendChild(triggerSlot)
  if (!iconLeft && icon) trigger.appendChild(icon)

  comp.appendChild(trigger)
  trigger.layoutSizingHorizontal = 'FILL'
  trigger.layoutSizingVertical = 'HUG'

  if (expanded) {
    const contentSlot = figma.createFrame()
    contentSlot.name = '.content'
    contentSlot.resize(w, 24)
    contentSlot.fills = []
    comp.appendChild(contentSlot)
    contentSlot.layoutSizingHorizontal = 'FILL'
    contentSlot.layoutSizingVertical = 'HUG'
  }
}

async function buildCheckListVariant(comp, spec, axis) {
  const w = spec.width ?? 340
  const copy = spec.copy ?? {}
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.itemSpacing = 8
  await bindGap(comp, 'uds/gap/8')
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = 'HUG'
  comp.resize(w, 64)
  await bindFill(comp, 'uds/surface/primary')
  await bindStroke(comp, 'uds/border/primary')
  await bindRadius(comp, 'uds/radius/8')
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingLeft')
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingRight')
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingTop')
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingBottom')

  const row = await buildCheckListControlContent(spec, axis, copy)
  comp.appendChild(row)
  row.layoutSizingHorizontal = 'FILL'
  row.layoutSizingVertical = 'HUG'
}

async function buildEmptyVariant(comp, spec, axis) {
  const recipe = axis.Recipe ?? axis.Layout ?? 'Default'
  const w = spec.width ?? 448
  const copy = spec.copy ?? {}
  const recipeCopy = copy[recipe] ?? copy.Default ?? {
    title: 'No messages',
    description: 'Inbox is clear for now.',
  }
  const withContent = recipe === 'SingleAction' || recipe === 'TwoActions' || recipe === 'Search404'

  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.fills = []
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = 'HUG'
  comp.itemSpacing = withContent ? 24 : 0
  if (withContent) await bindGap(comp, 'uds/gap/16')
  await bindPaddingAxis(comp, 'uds/gap/24', 'paddingLeft')
  await bindPaddingAxis(comp, 'uds/gap/24', 'paddingRight')
  await bindPaddingAxis(comp, 'uds/gap/24', 'paddingTop')
  await bindPaddingAxis(comp, 'uds/gap/24', 'paddingBottom')

  const header = figma.createFrame()
  header.name = 'Empty header'
  header.layoutMode = 'VERTICAL'
  header.primaryAxisAlignItems = 'CENTER'
  header.counterAxisAlignItems = 'CENTER'
  header.itemSpacing = 0
  header.fills = []

  if (recipe !== 'Search404') {
    const iconWrap = figma.createFrame()
    iconWrap.name = 'Empty icon'
    iconWrap.layoutMode = 'VERTICAL'
    iconWrap.primaryAxisAlignItems = 'CENTER'
    iconWrap.counterAxisAlignItems = 'CENTER'
    iconWrap.fills = []
    iconWrap.layoutSizingHorizontal = 'HUG'
    iconWrap.layoutSizingVertical = 'HUG'
    await bindPaddingAxis(iconWrap, 'uds/gap/24', 'paddingBottom')

    const medallion = await createMedallionInstance(
      spec,
      {
        ...(spec.medallion ?? { color: 'Blue', tone: 'Pastel' }),
        size:
          spec.medallionSize ??
          ({ 24: 'Extra Small', 32: 'Small', 40: 'Default', 48: 'Large', 64: 'Extra Large' }[
            spec.medallionSizePx
          ] ?? 'Extra Large'),
      },
    )
    if (medallion) {
      medallion.name = 'Medallion'
      iconWrap.appendChild(medallion)
    }
    header.appendChild(iconWrap)
    iconWrap.layoutSizingHorizontal = 'HUG'
    iconWrap.layoutSizingVertical = 'HUG'
  }

  const title = figma.createText()
  title.name = 'Empty title'
  title.characters = recipeCopy.title ?? 'No messages'
  title.textAlignHorizontal = 'CENTER'
  title.textAutoResize = 'HEIGHT'
  await applyLocalTextStyle(title, 'Body/18/Medium', 'uds/text/primary')
  header.appendChild(title)
  title.layoutSizingHorizontal = 'FILL'

  const desc = figma.createText()
  desc.name = 'Empty description'
  desc.characters =
    recipeCopy.description ?? 'Inbox is clear for now.'
  desc.textAlignHorizontal = 'CENTER'
  desc.textAutoResize = 'HEIGHT'
  await applyLocalTextStyle(desc, 'Body/16/Regular', 'uds/text/tertiary')
  header.appendChild(desc)
  desc.layoutSizingHorizontal = 'FILL'

  comp.appendChild(header)
  header.layoutSizingHorizontal = 'FILL'
  header.layoutSizingVertical = 'HUG'

  if (withContent) {
    const content = figma.createFrame()
    content.name = 'Empty content'
    content.layoutMode =
      recipe === 'TwoActions' ? 'HORIZONTAL' : 'VERTICAL'
    content.primaryAxisAlignItems = 'CENTER'
    content.counterAxisAlignItems = 'CENTER'
    content.itemSpacing = recipe === 'TwoActions' ? 8 : 16
    if (recipe === 'TwoActions') await bindGap(content, 'uds/gap/8')
    else await bindGap(content, 'uds/gap/16')
    content.fills = []
    content.layoutSizingHorizontal = 'HUG'
    content.layoutSizingVertical = 'HUG'

    if (recipe === 'Search404') {
      const input = await createInputInstance(
        spec.inputSetNodeId,
        'Default',
        recipeCopy.searchPlaceholder ?? 'Search documentation…',
      )
      if (input) {
        content.appendChild(input)
        input.layoutSizingHorizontal = 'FIXED'
        input.resize(320, input.height)
      }
    } else if (recipe === 'TwoActions') {
      const secondary = await createButtonInstance(
        spec.buttonSetNodeId,
        'Outline',
        recipeCopy.secondary ?? 'Import messages',
      )
      const primary = await createButtonInstance(
        spec.buttonSetNodeId,
        'Default',
        recipeCopy.primary ?? 'Compose message',
      )
      if (secondary) content.appendChild(secondary)
      if (primary) content.appendChild(primary)
    } else if (recipe === 'SingleAction') {
      const action = await createButtonInstance(
        spec.buttonSetNodeId,
        'Default',
        recipeCopy.action ?? 'Compose message',
      )
      if (action) content.appendChild(action)
    }

    comp.appendChild(content)
    content.layoutSizingHorizontal = 'HUG'
    content.layoutSizingVertical = 'HUG'
  }

  comp.resize(w, comp.height)
}

async function createMenuIcon16(spec, glyphId) {
  const iconSetId = spec.iconSetNodeId ?? '501:6'
  const iconSet = await figma.getNodeByIdAsync(iconSetId)
  const size16 = iconSet?.children?.find((c) => c.name === 'Size=16')
  if (!size16?.type || size16.type !== 'COMPONENT') return null
  const inst = size16.createInstance()
  inst.name = 'icon'
  inst.resize(16, 16)
  const glyph = glyphId ? await figma.getNodeByIdAsync(glyphId) : null
  const inner = inst.findOne((n) => n.type === 'INSTANCE')
  if (inner && glyph?.type === 'COMPONENT') inner.swapComponent(glyph)
  return inst
}

async function createKbdShortcutFrame(spec, chars) {
  const kbdSetId = spec.kbdSetNodeId ?? '1686:4530'
  const kbdSet = await figma.getNodeByIdAsync(kbdSetId)
  const defaultKbd = kbdSet?.children?.find((c) => c.name === 'Appearance=Default')
  if (!defaultKbd?.type || defaultKbd.type !== 'COMPONENT') return null

  const frame = figma.createFrame()
  frame.name = 'shortcut'
  frame.layoutMode = 'HORIZONTAL'
  frame.primaryAxisAlignItems = 'CENTER'
  frame.counterAxisAlignItems = 'CENTER'
  frame.itemSpacing = 4
  await bindGap(frame, 'uds/gap/4')
  frame.fills = []
  frame.layoutSizingHorizontal = 'HUG'
  frame.layoutSizingVertical = 'HUG'

  for (const ch of chars) {
    const inst = defaultKbd.createInstance()
    const key = inst.findOne((n) => n.name === 'key' && n.type === 'TEXT')
    if (key) key.characters = ch
    frame.appendChild(inst)
  }

  return frame
}

async function createMenuCheckIndicator(spec) {
  const icon = await createMenuIcon16(spec, spec.checkIconComponentId)
  if (icon) {
    icon.name = 'check'
    return icon
  }
  const check = figma.createText()
  check.name = 'check'
  check.characters = '✓'
  await applyLocalTextStyle(check, 'Body/14/Regular', 'uds/text/primary')
  return check
}

async function buildContextMenuItemRow(comp, spec, axis) {
  const w = spec.width ?? 224
  const type = axis.Type
  const copy = spec.copy ?? {}
  const focused =
    type === 'Focused' ||
    type === 'DestructiveFocused' ||
    type === 'SubTriggerFocused'
  const destructive =
    type === 'Destructive' || type === 'DestructiveFocused'
  const disabled = type === 'Disabled'
  const subTrigger = type === 'SubTrigger' || type === 'SubTriggerFocused'
  const withShortcut = type === 'WithShortcut'
  const checkboxChecked = type === 'CheckboxChecked'
  const checkboxUnchecked = type === 'CheckboxUnchecked'

  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.itemSpacing = 6
  await bindGap(comp, 'uds/gap/6')
  comp.fills = []
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = 'HUG'
  comp.resize(w, 32)
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingLeft')
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingRight')
  await bindPaddingAxis(comp, 'uds/gap/6', 'paddingTop')
  await bindPaddingAxis(comp, 'uds/gap/6', 'paddingBottom')

  if (focused) {
    if (type === 'DestructiveFocused') {
      await bindFill(comp, 'uds/system/destructive/quaternary')
    } else {
      await bindFill(comp, 'uds/surface/tertiary')
    }
  }

  const label = figma.createText()
  label.name = 'label'
  const typeCopy = copy[type]
  label.characters =
    (typeof typeCopy === 'string' ? typeCopy : undefined) ??
    copy.label ??
    (subTrigger ? 'More' : withShortcut ? 'Back' : checkboxChecked ? 'Show Bookmarks' : 'Menu item')
  await applyLocalTextStyle(label, 'Body/14/Regular', 'uds/text/primary')
  if (destructive) await bindFill(label, 'uds/system/destructive/primary')
  if (disabled) {
    await bindFill(label, 'uds/text/disabled')
    comp.opacity = 0.5
  }
  comp.appendChild(label)
  label.layoutGrow = 1

  if (withShortcut) {
    const shortcutChars = copy.shortcutChars ?? ['⌘', '[']
    const shortcut = await createKbdShortcutFrame(spec, shortcutChars)
    if (shortcut) comp.appendChild(shortcut)
  }

  if (subTrigger) {
    const caret = await createMenuIcon16(spec, spec.caretRightIconComponentId ?? '1033:1857')
    if (caret) comp.appendChild(caret)

    const submenu = figma.createFrame()
    submenu.name = 'Submenu'
    submenu.layoutMode = 'VERTICAL'
    submenu.primaryAxisAlignItems = 'MIN'
    submenu.counterAxisAlignItems = 'MIN'
    submenu.fills = []
    submenu.resize(w, 20)
    const slot = figma.createFrame()
    slot.name = 'Slot'
    slot.resize(w - 2, 20)
    slot.fills = []
    submenu.appendChild(slot)
    comp.appendChild(submenu)
  }

  if (checkboxChecked) {
    const check = await createMenuCheckIndicator(spec)
    comp.appendChild(check)
  }
}

async function buildContextMenuItemVariant(comp, spec, axis) {
  await buildContextMenuItemRow(comp, spec, axis)
}

async function buildContextMenuLabelVariant(comp, spec, _axis) {
  const w = spec.width ?? 224
  const copy = spec.copy ?? {}
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'CENTER'
  comp.fills = []
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = 'HUG'
  comp.resize(w, 32)
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingLeft')
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingRight')
  await bindPaddingAxis(comp, 'uds/gap/6', 'paddingTop')
  await bindPaddingAxis(comp, 'uds/gap/6', 'paddingBottom')

  const label = figma.createText()
  label.name = 'label'
  label.characters = copy.label ?? 'Navigation'
  await applyLocalTextStyle(label, 'Body/14/Semibold', 'uds/text/secondary')
  comp.appendChild(label)
  label.layoutGrow = 1
}

async function buildContextMenuSeparatorVariant(comp, spec, _axis) {
  const w = spec.width ?? 224
  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.fills = []
  comp.layoutSizingHorizontal = 'FIXED'
  comp.layoutSizingVertical = 'HUG'
  comp.resize(w, 9)
  await bindPaddingAxis(comp, 'uds/gap/4', 'paddingTop')
  await bindPaddingAxis(comp, 'uds/gap/4', 'paddingBottom')

  const line = figma.createRectangle()
  line.name = 'line'
  line.resize(w, 1)
  await bindFill(line, 'uds/border/primary')
  comp.appendChild(line)
  line.layoutSizingHorizontal = 'FILL'
}

async function instantiateContextMenuPart(setName, variantQuery) {
  const page = figma.currentPage
  const set = page.findOne(
    (n) => n.type === 'COMPONENT_SET' && n.name === setName,
  )
  if (!set) return null
  const variant = set.children.find((c) => {
    if (typeof variantQuery === 'string') return c.name === variantQuery
    return Object.entries(variantQuery).every(([k, v]) =>
      c.name.includes(`${k}=${v}`),
    )
  })
  if (!variant) return null
  return variant.createInstance()
}

async function buildContextMenuContentFrame(spec, items, options = {}) {
  const w = spec.width ?? 224
  const frame = figma.createFrame()
  frame.name = options.name ?? '.content'
  frame.layoutMode = 'VERTICAL'
  frame.primaryAxisAlignItems = 'MIN'
  frame.counterAxisAlignItems = 'MIN'
  frame.itemSpacing = 0
  frame.fills = []
  frame.layoutSizingHorizontal = 'FIXED'
  frame.layoutSizingVertical = 'HUG'
  frame.resize(w, 120)
  await bindFill(frame, 'uds/surface/primary')
  await bindStroke(frame, 'uds/border/primary')
  await bindRadius(frame, 'uds/radius/8')
  frame.clipsContent = true
  await bindPaddingAxis(frame, 'uds/gap/4', 'paddingTop')
  await bindPaddingAxis(frame, 'uds/gap/4', 'paddingBottom')

  for (const item of items) {
    if (item.kind === 'instance') {
      const inst = await instantiateContextMenuPart(item.set, item.variant)
      if (inst) {
        if (item.label) {
          const label = inst.findOne((n) => n.name === 'label' && n.type === 'TEXT')
          if (label) {
            await figma.loadFontAsync(label.fontName)
            label.characters = item.label
          }
        }
        frame.appendChild(inst)
        inst.layoutSizingHorizontal = 'FILL'
        inst.layoutSizingVertical = 'HUG'
      }
    } else if (item.kind === 'text-item') {
      const row = figma.createFrame()
      row.name = '.item'
      await buildContextMenuItemRow(row, spec, { Type: item.type ?? 'Default' })
      const textNode = row.findOne((n) => n.name === 'label' && n.type === 'TEXT')
      if (textNode && item.label) textNode.characters = item.label
      const shortcutFrame = row.findOne((n) => n.name === 'shortcut' && n.type === 'FRAME')
      if (shortcutFrame && item.shortcutChars) {
        const kbds = shortcutFrame.children.filter((c) => c.type === 'INSTANCE')
        item.shortcutChars.forEach((ch, i) => {
          const key = kbds[i]?.findOne((n) => n.name === 'key' && n.type === 'TEXT')
          if (key) key.characters = ch
        })
      }
      frame.appendChild(row)
      row.layoutSizingHorizontal = 'FILL'
      row.layoutSizingVertical = 'HUG'
    }
  }

  return frame
}

async function buildContextMenuVariant(comp, spec, _axis) {
  const w = spec.width ?? 224
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.fills = []
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.resize(w, 194)

  const mainItems = [
    { kind: 'instance', set: '.context-menu-label', variant: 'Label=Default' },
    { kind: 'text-item', type: 'WithShortcut', label: 'Back', shortcutChars: ['⌘', '['] },
    { kind: 'text-item', type: 'WithShortcut', label: 'Forward', shortcutChars: ['⌘', ']'] },
    { kind: 'instance', set: '.context-menu-separator', variant: 'Separator=Default' },
    { kind: 'instance', set: '.context-menu-item', variant: { Type: 'Default' } },
    { kind: 'instance', set: '.context-menu-separator', variant: 'Separator=Default' },
    { kind: 'instance', set: '.context-menu-item', variant: { Type: 'Destructive' } },
  ]

  const content = await buildContextMenuContentFrame(spec, mainItems, {
    name: 'Content',
  })
  comp.appendChild(content)
  content.layoutSizingHorizontal = 'HUG'
  content.layoutSizingVertical = 'HUG'
}

async function buildDropdownMenuVariant(comp, spec, axis) {
  const recipe = axis.Recipe ?? 'Default'
  const w = spec.width ?? 224
  const copy = spec.copy ?? {}
  const recipeCopy = copy[recipe] ?? copy.Default ?? {}

  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.counterAxisAlignItems = 'MIN'
  comp.fills = []
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.itemSpacing = spec.triggerGap ?? 8
  await bindGap(comp, spec.triggerGapVar ?? 'uds/gap/8')

  const trigger = await createButtonInstance(
    spec.buttonSetNodeId,
    recipeCopy.triggerAppearance ?? 'Outline',
    recipeCopy.trigger ?? 'Open menu',
    recipeCopy.triggerSize ?? 'Default',
  )
  if (trigger) {
    trigger.name = 'Trigger'
    comp.appendChild(trigger)
    trigger.layoutSizingHorizontal = 'HUG'
    trigger.layoutSizingVertical = 'HUG'
  }

  const labels = copy.labels ?? {}
  const mainItems =
    recipe === 'Account'
      ? [
          {
            kind: 'instance',
            set: '.context-menu-label',
            variant: 'Label=Default',
            label: labels.section ?? 'My account',
          },
          { kind: 'instance', set: '.context-menu-separator', variant: 'Separator=Default' },
          { kind: 'text-item', type: 'Default', label: labels.profile ?? 'Profile' },
          { kind: 'text-item', type: 'Default', label: labels.billing ?? 'Billing' },
          { kind: 'text-item', type: 'Default', label: labels.signOut ?? 'Sign out' },
        ]
      : [
          { kind: 'text-item', type: 'Default', label: labels.profile ?? 'Profile' },
          { kind: 'text-item', type: 'Default', label: labels.billing ?? 'Billing' },
          { kind: 'instance', set: '.context-menu-separator', variant: 'Separator=Default' },
          {
            kind: 'instance',
            set: '.context-menu-item',
            variant: { Type: 'Destructive' },
            label: labels.delete ?? 'Delete team',
          },
        ]

  const content = await buildContextMenuContentFrame(spec, mainItems, {
    name: 'Content',
  })
  comp.appendChild(content)
  content.layoutSizingHorizontal = 'FIXED'
  content.layoutSizingVertical = 'HUG'
}

async function createIcon16Instance(spec, glyphComponentId) {
  const iconSetId = spec.iconSetNodeId ?? '501:6'
  const iconSet = await figma.getNodeByIdAsync(iconSetId)
  const size16 = iconSet?.children?.find((c) => c.name === 'Size=16')
  if (!size16?.type || size16.type !== 'COMPONENT') return null
  const inst = size16.createInstance()
  inst.name = 'icon'
  inst.resize(16, 16)
  const glyph = glyphComponentId ? await figma.getNodeByIdAsync(glyphComponentId) : null
  const inner = inst.findOne((n) => n.type === 'INSTANCE')
  if (inner && glyph?.type === 'COMPONENT') inner.swapComponent(glyph)
  return inst
}

async function createInputGroupControlFrame(spec, axis, placeholder) {
  const padH = 12
  const fontSize = axis.Size === 'Small' || axis.Size === 'Compact' ? 14 : 16
  const control = figma.createFrame()
  control.name = '.input-group-control'
  control.layoutMode = 'HORIZONTAL'
  control.primaryAxisAlignItems = 'CENTER'
  control.counterAxisAlignItems = 'CENTER'
  control.fills = []
  control.strokes = []
  control.paddingLeft = padH
  control.paddingRight = padH
  control.paddingTop = 0
  control.paddingBottom = 0

  const ph = figma.createText()
  ph.name = 'placeholder'
  ph.characters = placeholder ?? spec.label ?? 'Placeholder'
  ph.fontName = { family: 'Inter', style: 'Regular' }
  ph.fontSize = fontSize
  await bindText(ph, { fill: 'uds/text/disabled' })
  control.appendChild(ph)
  ph.layoutGrow = 1
  return control
}

async function applyInputGroupShell(comp, spec, axis) {
  const sizeKey = axis.Size === 'Small' ? 'Compact' : axis.Size
  const h = spec.heightBySize?.[sizeKey] ?? spec.heightBySize?.[axis.Size] ?? (sizeKey === 'Compact' || axis.Size === 'Small' ? 36 : 44)
  const w = spec.width ?? 280
  comp.resize(w, h)
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.itemSpacing = 0
  comp.paddingLeft = 0
  comp.paddingRight = 0
  comp.paddingTop = 0
  comp.paddingBottom = 0
  const fill =
    spec.fillByState?.[axis.State ?? 'Default'] ?? spec.fillVar ?? 'uds/surface/primary'
  await bindFill(comp, fill)
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/4')
  const stroke = spec.strokeByState?.[axis.State ?? 'Default']
  if (stroke) await bindStroke(comp, stroke)
  if (axis.State === 'Disabled') comp.opacity = 0.5
}

async function createInputGroupAddonFrame(spec, align, child) {
  const addon = figma.createFrame()
  addon.name = '.input-group-addon'
  addon.layoutMode = 'HORIZONTAL'
  addon.primaryAxisAlignItems = 'CENTER'
  addon.counterAxisAlignItems = 'CENTER'
  addon.fills = []
  addon.layoutSizingHorizontal = 'HUG'
  addon.layoutSizingVertical = 'HUG'
  if (align === 'inline-start') {
    await bindPaddingAxis(addon, 'uds/gap/8', 'paddingLeft')
    addon.paddingRight = 0
  } else {
    addon.paddingLeft = 0
    await bindPaddingAxis(addon, 'uds/gap/8', 'paddingRight')
  }
  addon.paddingTop = 0
  addon.paddingBottom = 0
  if (child) {
    addon.appendChild(child)
    if ('layoutSizingHorizontal' in child) child.layoutSizingHorizontal = 'HUG'
  }
  return addon
}

async function buildInputGroupVariant(comp, spec, axis) {
  await applyInputGroupShell(comp, spec, axis)
  const control = await createInputGroupControlFrame(spec, axis)
  comp.appendChild(control)
  control.layoutGrow = 1
  control.layoutSizingHorizontal = 'FILL'
  control.layoutSizingVertical = 'FILL'
}

async function buildSearchInputVariant(comp, spec, axis) {
  const shellAxis = { Size: axis.Size, State: 'Default' }
  await applyInputGroupShell(comp, spec, shellAxis)

  const searchIcon = await createIcon16Instance(
    spec,
    spec.magnifyingGlassGlyphId ?? '1730:4',
  )
  if (searchIcon) {
    const startAddon = await createInputGroupAddonFrame(spec, 'inline-start', searchIcon)
    comp.appendChild(startAddon)
    startAddon.layoutSizingHorizontal = 'HUG'
    startAddon.layoutSizingVertical = 'FILL'
  }

  const placeholder =
    axis.Recipe === 'Shortcut'
      ? (spec.copy?.shortcutPlaceholder ?? 'Search…')
      : (spec.copy?.placeholder ?? 'Search')
  const control = await createInputGroupControlFrame(spec, axis, placeholder)
  control.paddingLeft = axis.Size === 'Small' ? 0 : 0
  comp.appendChild(control)
  control.layoutGrow = 1
  control.layoutSizingHorizontal = 'FILL'
  control.layoutSizingVertical = 'FILL'

  if (axis.Recipe === 'Shortcut') {
    const shortcut = await createKbdShortcutFrame(spec, ['⌘', 'K'])
    if (shortcut) {
      const endAddon = await createInputGroupAddonFrame(spec, 'inline-end', shortcut)
      comp.appendChild(endAddon)
      endAddon.layoutSizingHorizontal = 'HUG'
      endAddon.layoutSizingVertical = 'FILL'
    }
  }
}

async function applyInputShellStateEffects(comp, axis) {
  if (axis.State !== 'Focused' && axis.State !== 'Error') {
    comp.effects = []
    return
  }
  const varName =
    axis.State === 'Focused'
      ? 'uds/system/action/tertiary'
      : 'uds/system/destructive/tertiary'
  const colorVar = await findVar(varName)
  const offsets = [
    { x: -3, y: 3 },
    { x: 3, y: -3 },
    { x: 3, y: 3 },
    { x: -3, y: -3 },
  ]
  comp.effects = offsets.map((offset) => {
    const effect = {
      type: 'DROP_SHADOW',
      color: { r: 0.75, g: 0.86, b: 0.99, a: 1 },
      offset,
      radius: 0,
      spread: 0,
      visible: true,
      blendMode: 'NORMAL',
    }
    if (colorVar) {
      return figma.variables.setBoundVariableForEffect(effect, 'color', colorVar)
    }
    return effect
  })
}

async function appendDateSegmentTexts(
  textFrame,
  segments,
  axis,
  namePrefix,
  textFill,
) {
  const fontSize = axis.Size === 'Compact' ? 14 : 16
  const textStyle = axis.Size === 'Compact' ? 'Body/14/Regular' : 'Body/16/Regular'
  const parts = [
    { layer: namePrefix ? `${namePrefix}mm` : 'mm', key: 'month' },
    { layer: namePrefix ? `${namePrefix}dd` : 'dd', key: 'day' },
    { layer: namePrefix ? `${namePrefix}yyyy` : 'yyyy', key: 'year' },
  ]

  for (let i = 0; i < parts.length; i++) {
    if (i > 0) {
      const sep = figma.createText()
      sep.name = namePrefix ? `/${namePrefix.replace(/-$/, '')}` : '/'
      sep.characters = '/'
      sep.fontName = { family: 'Inter', style: 'Regular' }
      sep.fontSize = fontSize
      await applyLocalTextStyle(sep, textStyle, textFill)
      textFrame.appendChild(sep)
    }
    const t = figma.createText()
    t.name = parts[i].layer
    t.characters = segments[parts[i].key]
    t.fontName = { family: 'Inter', style: 'Regular' }
    t.fontSize = fontSize
    await applyLocalTextStyle(t, textStyle, textFill)
    textFrame.appendChild(t)
  }
}

async function buildDateInputVariant(comp, spec, axis) {
  const h = spec.heightBySize?.[axis.Size] ?? (axis.Size === 'Compact' ? 36 : 44)
  const w = spec.width ?? 452
  comp.resize(w, h)
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.itemSpacing = 0
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingLeft')
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingRight')
  const fill =
    spec.fillByState?.[axis.State] ?? spec.fillVar ?? 'uds/surface/primary'
  await bindFill(comp, fill)
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/4')
  const stroke = spec.strokeByState?.[axis.State] ?? 'uds/border/primary'
  await bindStroke(comp, stroke)
  if (axis.State === 'Disabled') comp.opacity = 0.5
  await applyInputShellStateEffects(comp, axis)

  const fontSize = axis.Size === 'Compact' ? 14 : 16
  const textStyle = axis.Size === 'Compact' ? 'Body/14/Regular' : 'Body/16/Regular'
  const segments = spec.copy?.segments ?? { month: 'mm', day: 'dd', year: 'yyyy' }

  const textFrame = figma.createFrame()
  textFrame.name = 'Text'
  textFrame.layoutMode = 'HORIZONTAL'
  textFrame.primaryAxisAlignItems = 'CENTER'
  textFrame.counterAxisAlignItems = 'CENTER'
  textFrame.itemSpacing = axis.Size === 'Default' ? 2 : 1
  textFrame.fills = []
  textFrame.layoutGrow = 1

  const textFill = 'uds/text/primary'
  const parts = [
    { layer: 'mm', key: 'month' },
    { layer: 'dd', key: 'day' },
    { layer: 'yyyy', key: 'year' },
  ]

  for (let i = 0; i < parts.length; i++) {
    if (i > 0) {
      const sep = figma.createText()
      sep.name = '/'
      sep.characters = '/'
      sep.fontName = { family: 'Inter', style: 'Regular' }
      sep.fontSize = fontSize
      await applyLocalTextStyle(sep, textStyle, textFill)
      textFrame.appendChild(sep)
    }
    const t = figma.createText()
    t.name = parts[i].layer
    t.characters = segments[parts[i].key]
    t.fontName = { family: 'Inter', style: 'Regular' }
    t.fontSize = fontSize
    await applyLocalTextStyle(t, textStyle, textFill)
    textFrame.appendChild(t)
  }

  comp.appendChild(textFrame)
  textFrame.layoutSizingHorizontal = 'FILL'

  const icon = await createIcon16Instance(
    spec,
    spec.calendarBlankGlyphId ?? '1739:4579',
  )
  if (icon) {
    icon.name = 'Icon'
    comp.appendChild(icon)
    icon.layoutSizingHorizontal = 'HUG'
  }
}

async function buildDateRangeInputVariant(comp, spec, axis) {
  const h = spec.heightBySize?.[axis.Size] ?? (axis.Size === 'Compact' ? 36 : 44)
  const w = spec.width ?? 452
  comp.resize(w, h)
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.itemSpacing = 0
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingLeft')
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingRight')
  const fill =
    spec.fillByState?.[axis.State] ?? spec.fillVar ?? 'uds/surface/primary'
  await bindFill(comp, fill)
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/4')
  const stroke = spec.strokeByState?.[axis.State] ?? 'uds/border/primary'
  await bindStroke(comp, stroke)
  if (axis.State === 'Disabled') comp.opacity = 0.5
  await applyInputShellStateEffects(comp, axis)

  const fontSize = axis.Size === 'Compact' ? 14 : 16
  const textStyle = axis.Size === 'Compact' ? 'Body/14/Regular' : 'Body/16/Regular'
  const segments = spec.copy?.segments ?? { month: 'mm', day: 'dd', year: 'yyyy' }
  const rangeSeparator = spec.copy?.rangeSeparator ?? ' – '
  const textFill =
    axis.State === 'Disabled' ? 'uds/text/disabled' : 'uds/text/primary'

  const textFrame = figma.createFrame()
  textFrame.name = 'Text'
  textFrame.layoutMode = 'HORIZONTAL'
  textFrame.primaryAxisAlignItems = 'CENTER'
  textFrame.counterAxisAlignItems = 'CENTER'
  textFrame.itemSpacing = axis.Size === 'Default' ? 2 : 1
  textFrame.fills = []
  textFrame.layoutGrow = 1

  await appendDateSegmentTexts(textFrame, segments, axis, '', textFill)

  const sep = figma.createText()
  sep.name = 'range-separator'
  sep.characters = rangeSeparator
  sep.fontName = { family: 'Inter', style: 'Regular' }
  sep.fontSize = fontSize
  await applyLocalTextStyle(sep, textStyle, textFill)
  textFrame.appendChild(sep)

  await appendDateSegmentTexts(textFrame, segments, axis, 'end-', textFill)

  comp.appendChild(textFrame)
  textFrame.layoutSizingHorizontal = 'FILL'

  const icon = await createIcon16Instance(
    spec,
    spec.calendarBlankGlyphId ?? '1739:4579',
  )
  if (icon) {
    icon.name = 'Icon'
    comp.appendChild(icon)
    icon.layoutSizingHorizontal = 'HUG'
  }
}

async function createInputGroupIconButton(spec, glyphId) {
  const btn = figma.createFrame()
  btn.name = '.input-group-button'
  btn.resize(24, 24)
  btn.layoutMode = 'HORIZONTAL'
  btn.primaryAxisAlignItems = 'CENTER'
  btn.counterAxisAlignItems = 'CENTER'
  btn.fills = []
  btn.strokes = []
  const icon = await createIcon16Instance(spec, glyphId ?? '1033:1857')
  if (icon) {
    icon.name = 'icon'
    btn.appendChild(icon)
    icon.layoutSizingHorizontal = 'HUG'
    icon.layoutSizingVertical = 'HUG'
  }
  return btn
}

async function buildComboboxInputVariant(comp, spec, axis) {
  const shellAxis = { Size: axis.Size, State: 'Default' }
  await applyInputGroupShell(comp, spec, shellAxis)
  if (spec.fillVar) await bindFill(comp, spec.fillVar)
  const stroke = spec.strokeByState?.Default ?? spec.strokeByState?.[axis.State]
  if (stroke) await bindStroke(comp, stroke)

  const placeholder = spec.copy?.placeholder ?? 'Select an option'
  const control = await createInputGroupControlFrame(spec, axis, placeholder)
  if (axis.Size === 'Small') {
    control.paddingLeft = 10
    control.paddingRight = 10
  }
  comp.appendChild(control)
  control.layoutGrow = 1
  control.layoutSizingHorizontal = 'FILL'
  control.layoutSizingVertical = 'FILL'

  const caretIcon = await createIcon16Instance(
    spec,
    spec.caretDownGlyphId ?? spec.caretRightGlyphId ?? '527:6',
  )
  if (caretIcon) {
    caretIcon.name = 'icon'
    const endAddon = await createInputGroupAddonFrame(spec, 'inline-end', caretIcon)
    comp.appendChild(endAddon)
    endAddon.layoutSizingHorizontal = 'HUG'
    endAddon.layoutSizingVertical = 'FILL'
  }
}

async function buildComboboxItemVariant(comp, spec, axis) {
  const w = spec.width ?? 240
  const state = axis.State
  const copy = spec.copy ?? {}

  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.itemSpacing = 0
  comp.fills = []
  comp.strokes = []
  comp.resize(w, 32)
  await bindPaddingAxis(comp, 'uds/gap/12', 'paddingLeft')
  comp.paddingRight = 32
  comp.paddingTop = 6
  comp.paddingBottom = 6

  if (state === 'Highlighted') {
    await bindFill(comp, 'uds/system/action/quaternary')
  } else if (state === 'Selected') {
    await bindFill(comp, 'uds/color/accent/blue/700')
  }
  if (state === 'Disabled') comp.opacity = 0.5

  const label = figma.createText()
  label.name = 'label'
  label.characters = copy[state] ?? copy.label ?? 'React'
  const textFill = state === 'Selected' ? 'uds/text/inverse' : 'uds/text/primary'
  await applyLocalTextStyle(label, 'Body/14/Regular', textFill)
  comp.appendChild(label)
  label.layoutGrow = 1
  label.layoutSizingHorizontal = 'FILL'

  if (state === 'Selected') {
    const check = await createMenuCheckIndicator(spec)
    check.name = 'check'
    if (check.type === 'TEXT') {
      await applyLocalTextStyle(check, 'Body/14/Regular', 'uds/text/inverse')
    }
    comp.appendChild(check)
    if ('layoutSizingHorizontal' in check) check.layoutSizingHorizontal = 'HUG'
  }
}
