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
    } else if (spec.kind === 'field') {
      await buildFieldVariant(comp, spec, axis)
    } else if (spec.kind === 'empty') {
      await buildEmptyVariant(comp, spec, axis)
    } else if (spec.kind === 'medallion') {
      await buildMedallionVariant(comp, spec, axis)
    } else if (spec.kind === 'alert-dialog') {
      await buildAlertDialogVariant(comp, spec, axis)
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
  const h = spec.heightBySize[axis.Size] ?? 44
  const w = spec.width ?? 240
  comp.resize(w, h)
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.paddingLeft = spec.paddingH ?? 12
  comp.paddingRight = spec.paddingH ?? 12
  await bindFill(comp, spec.fillVar)
  await bindRadius(comp, spec.radiusVar)
  const stroke = spec.strokeByState?.[axis.State]
  if (stroke) await bindStroke(comp, stroke)
  if (axis.State === 'Disabled') comp.opacity = 0.5

  const text = figma.createText()
  text.fontName = { family: 'Inter', style: 'Regular' }
  text.fontSize = axis.Size === 'Small' ? 14 : 16
  text.characters = spec.label ?? 'Placeholder'
  await bindText(text, { fill: 'uds/text/disabled' })
  comp.appendChild(text)
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
  if (checked) {
    const mark = figma.createText()
    mark.fontName = { family: 'Inter', style: 'Bold' }
    mark.fontSize = 12
    mark.characters = axis.State === 'Indeterminate' ? '−' : '✓'
    await bindText(mark, { fill: 'uds/text/inverse' })
    comp.appendChild(mark)
    mark.x = 4
    mark.y = 2
  }
}

async function buildSwitchVariant(comp, spec, axis) {
  const w = spec.widthBySize[axis.Size] ?? 48
  const h = spec.heightBySize[axis.Size] ?? 28
  comp.resize(w, h)
  comp.cornerRadius = h / 2
  const on = axis.Checked === 'True'
  await bindFill(comp, on ? spec.trackOn : spec.trackOff)
  const thumb = figma.createEllipse()
  const thumbSize = axis.Size === 'Small' ? 16 : 20
  thumb.resize(thumbSize, thumbSize)
  thumb.x = on ? w - thumbSize - 2 : 2
  thumb.y = (h - thumbSize) / 2
  await bindFill(thumb, spec.thumb)
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
  const s = spec.size ?? 10
  comp.resize(s, s)
  const dot = figma.createEllipse()
  dot.resize(s, s)
  const colorMap = {
    Green: 'uds/color/accent/green/500',
    Yellow: 'uds/color/accent/yellow/500',
    Red: 'uds/color/accent/red/500',
    Gray: 'uds/icon/disabled',
    Blue: 'uds/color/primary/700',
  }
  const token = colorMap[axis.Variant] ?? 'uds/color/primary/700'
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
    await bindFill(dot, 'uds/color/primary/700')
  }
  comp.appendChild(dot)
}

const AVATAR_STATUS_COLOR = {
  Green: 'uds/color/accent/green/500',
  Orange: 'uds/color/accent/orange/500',
  Cyan: 'uds/color/accent/cyan/500',
}

function avatarStatusFromAccessory(accessory) {
  if (!accessory?.startsWith('Status ')) return null
  return accessory.replace('Status ', '')
}

function avatarDotSizePx(sizeKey) {
  return sizeKey === 'Large' ? 14 : 10
}

function avatarCameraSizePx(sizeKey) {
  return sizeKey === 'Extra Small' || sizeKey === 'Small' ? 16 : 20
}

function avatarCameraOffsetPx(sizeKey) {
  return sizeKey === 'Extra Small' || sizeKey === 'Small' ? 2 : 4
}

async function appendAvatarStatus(comp, spec, axis, avatarSize, statusKey) {
  const dotPx = avatarDotSizePx(axis.Size)
  const inset = Math.max(0, Math.round((avatarSize - dotPx) * 0.12))
  const dot = figma.createEllipse()
  dot.resize(dotPx, dotPx)
  await bindFill(dot, AVATAR_STATUS_COLOR[statusKey] ?? 'uds/color/accent/green/500')
  dot.name = 'Avatar status'
  dot.x = avatarSize - dotPx + inset
  dot.y = avatarSize - dotPx + inset
  const ring = figma.createEllipse()
  ring.name = 'Status ring'
  ring.resize(dotPx + 4, dotPx + 4)
  ring.x = dot.x - 2
  ring.y = dot.y - 2
  await bindFill(ring, 'uds/surface/primary')
  comp.appendChild(ring)
  comp.appendChild(dot)
}

async function appendAvatarCamera(comp, spec, axis, avatarSize) {
  const btnPx = avatarCameraSizePx(axis.Size)
  const offset = avatarCameraOffsetPx(axis.Size)
  const btn = figma.createFrame()
  btn.name = 'Avatar camera action'
  btn.resize(btnPx, btnPx)
  btn.x = avatarSize - btnPx + offset
  btn.y = avatarSize - btnPx + offset
  btn.layoutMode = 'HORIZONTAL'
  btn.primaryAxisAlignItems = 'CENTER'
  btn.counterAxisAlignItems = 'CENTER'
  btn.clipsContent = true
  await bindRadius(btn, 'uds/radius/9999')
  await bindFill(btn, 'uds/color/neutrals/300')
  await bindStroke(btn, 'uds/surface/primary', 2)

  let iconNode = null
  const iconSetId = spec.iconSetNodeId ?? '501:6'
  const iconSet = await figma.getNodeByIdAsync(iconSetId)
  if (iconSet?.type === 'COMPONENT_SET') {
    const iconSizeName = btnPx <= 16 ? 'Size=16' : 'Size=20'
    const iconComp = iconSet.children.find((c) => c.name === iconSizeName)
    if (iconComp?.type === 'COMPONENT') {
      iconNode = iconComp.createInstance()
      const iconPx = btnPx <= 16 ? 12 : 14
      iconNode.resize(iconPx, iconPx)
      iconNode.name = 'Camera icon'
    }
  }
  if (!iconNode) {
    const glyph = figma.createRectangle()
    glyph.resize(Math.round(btnPx * 0.45), Math.round(btnPx * 0.4))
    glyph.name = 'Camera icon'
    await bindFill(glyph, 'uds/color/black')
    iconNode = glyph
  }
  btn.appendChild(iconNode)
  iconNode.layoutSizingHorizontal = 'HUG'
  iconNode.layoutSizingVertical = 'HUG'
  comp.appendChild(btn)
}

async function buildAvatarVariant(comp, spec, axis) {
  const s = spec.sizeBySize[axis.Size] ?? 48
  const isInitials = axis.Appearance === 'Initials'
  const accessory = axis.Accessory ?? 'None'
  const statusKey = avatarStatusFromAccessory(accessory)
  const hasAccessory = accessory !== 'None'
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

  if (statusKey) {
    await appendAvatarStatus(comp, spec, axis, s, statusKey)
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
  comp.resize(s, s)
  comp.cornerRadius = s / 2
  const checked = axis.State === 'Checked'
  if (checked) {
    await bindFill(comp, 'uds/color/primary/700')
    const dot = figma.createEllipse()
    const dotSize = 8
    dot.resize(dotSize, dotSize)
    dot.x = (s - dotSize) / 2
    dot.y = (s - dotSize) / 2
    await bindFill(dot, 'uds/text/inverse')
    comp.appendChild(dot)
  } else {
    await bindFill(comp, 'uds/surface/primary')
    if (spec.strokeVar) await bindStroke(comp, spec.strokeVar)
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
  const small = axis.Size === 'Small'
  comp.layoutMode = 'HORIZONTAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
  comp.paddingLeft = small ? 4 : 6
  comp.paddingRight = small ? 4 : 6
  comp.paddingTop = 2
  comp.paddingBottom = 2
  comp.minHeight = small ? 18 : 20
  await bindFill(comp, 'uds/surface/quaternary')
  await bindRadius(comp, spec.radiusVar ?? 'uds/radius/4')
  const text = figma.createText()
  text.fontName = { family: 'Inter', style: 'Medium' }
  text.fontSize = small ? 10 : 12
  text.characters = spec.label ?? '⌘K'
  await bindText(text, { fill: 'uds/text/primary' })
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

async function createButtonInstance(buttonSetId, appearance, label) {
  const set = await figma.getNodeByIdAsync(buttonSetId ?? '554:268')
  if (set?.type !== 'COMPONENT_SET') return null
  const variantName = `Appearance=${appearance}, Size=Default`
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

  const setId = spec.medallionSetNodeId ?? '754:436'
  const medSet = await figma.getNodeByIdAsync(setId)
  if (medSet?.type === 'COMPONENT_SET') {
    const medName = `Color=${medallion.color}, Tone=${medallion.tone}`
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

async function createMedallionInstance(spec, medallionAxis) {
  const setId = spec.medallionSetNodeId ?? '754:436'
  const set = await figma.getNodeByIdAsync(setId)
  if (set?.type !== 'COMPONENT_SET') return null
  const variantName = `Color=${medallionAxis.color}, Tone=${medallionAxis.tone}`
  const medallionComp = set.children.find((c) => c.name === variantName)
  if (medallionComp?.type !== 'COMPONENT') return null
  const inst = medallionComp.createInstance()
  inst.name = 'Medallion'
  const px = spec.medallionSizePx ?? 40
  inst.resize(px, px)
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
  const titleToken = destructive
    ? 'uds/button/border/primary/destructive'
    : 'uds/text/primary'
  const descToken = destructive
    ? 'uds/button/border/primary/destructive'
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
    destructive ? 'uds/button/border/primary/destructive' : 'uds/border/secondary',
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
  title.fontSize = 16
  title.characters = copy.title
  title.textAutoResize = 'HEIGHT'
  await bindText(title, { fill: titleToken })
  content.appendChild(title)
  title.layoutSizingHorizontal = 'HUG'
  const desc = figma.createText()
  desc.name = 'Alert description'
  desc.fontName = { family: 'Inter', style: 'Regular' }
  desc.fontSize = 14
  desc.characters = copy.description
  desc.textAutoResize = 'HEIGHT'
  await bindText(desc, { fill: descToken })
  content.appendChild(desc)
  desc.layoutSizingHorizontal = 'HUG'
  comp.appendChild(content)
  content.layoutSizingHorizontal = 'HUG'
  content.layoutSizingVertical = 'HUG'

  comp.layoutSizingHorizontal = 'HUG'
  comp.layoutSizingVertical = 'HUG'
}

async function buildCardVariant(comp, spec, axis) {
  const w = spec.width ?? 320
  const small = axis.Size === 'Small'
  comp.resize(w, small ? 140 : 160)
  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'MIN'
  comp.itemSpacing = small ? 12 : 16
  comp.paddingTop = small ? 12 : 16
  comp.paddingBottom = small ? 12 : 16
  comp.paddingLeft = small ? 12 : 16
  comp.paddingRight = small ? 12 : 16
  await bindGap(comp, 'uds/gap/8')
  await bindFill(comp, 'uds/surface/primary')
  await bindRadius(comp, 'uds/radius/8')
  await bindStroke(comp, 'uds/border/secondary')
  const header = figma.createFrame()
  header.layoutMode = 'VERTICAL'
  header.itemSpacing = 4
  header.fills = []
  const title = figma.createText()
  title.fontName = { family: 'Inter', style: 'Medium' }
  title.fontSize = small ? 14 : 16
  title.characters = 'Card title'
  await bindText(title, { fill: 'uds/text/primary' })
  header.appendChild(title)
  const desc = figma.createText()
  desc.fontName = { family: 'Inter', style: 'Regular' }
  desc.fontSize = 14
  desc.characters = 'Card description'
  await bindText(desc, { fill: 'uds/text/secondary' })
  header.appendChild(desc)
  header.layoutSizingHorizontal = 'FILL'
  comp.appendChild(header)
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
  const vertical = axis.Orientation === 'Vertical'
  const w = spec.width ?? 280
  comp.resize(w, vertical ? 72 : 44)
  comp.layoutMode = vertical ? 'VERTICAL' : 'HORIZONTAL'
  comp.primaryAxisAlignItems = vertical ? 'MIN' : 'CENTER'
  comp.counterAxisAlignItems = vertical ? 'MIN' : 'CENTER'
  comp.itemSpacing = 8
  await bindGap(comp, 'uds/gap/8')
  comp.fills = []
  const label = figma.createText()
  label.fontName = { family: 'Inter', style: 'Medium' }
  label.fontSize = 14
  label.characters = 'Label'
  const labelFill =
    axis.State === 'Error' ? 'uds/button/border/primary/destructive' : 'uds/text/primary'
  await bindText(label, { fill: labelFill })
  comp.appendChild(label)
  if (!vertical) label.layoutSizingHorizontal = 'HUG'
  const input = figma.createFrame()
  input.resize(vertical ? w : 180, 44)
  input.layoutMode = 'HORIZONTAL'
  input.primaryAxisAlignItems = 'CENTER'
  input.paddingLeft = 12
  input.paddingRight = 12
  await bindFill(input, 'uds/surface/secondary')
  await bindRadius(input, 'uds/radius/4')
  const stroke =
    axis.State === 'Error' ? 'uds/button/border/primary/destructive' : 'uds/border/secondary'
  await bindStroke(input, stroke)
  const ph = figma.createText()
  ph.fontName = { family: 'Inter', style: 'Regular' }
  ph.fontSize = 14
  ph.characters = 'Placeholder'
  await bindText(ph, { fill: 'uds/text/disabled' })
  input.appendChild(ph)
  comp.appendChild(input)
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

  iconNode.x = Math.round((sizePx - iconNode.width) / 2)
  iconNode.y = Math.round((sizePx - iconNode.height) / 2)
  comp.appendChild(iconNode)
}

async function buildEmptyVariant(comp, spec, axis) {
  const w = spec.width ?? 320
  comp.resize(w, 200)
  comp.layoutMode = 'VERTICAL'
  comp.primaryAxisAlignItems = 'CENTER'
  comp.counterAxisAlignItems = 'CENTER'
  comp.itemSpacing = 16
  await bindGap(comp, 'uds/gap/8')
  comp.fills = []
  const icon = figma.createFrame()
  icon.resize(48, 48)
  await bindFill(icon, 'uds/surface/tertiary')
  await bindRadius(icon, 'uds/radius/8')
  comp.appendChild(icon)
  const title = figma.createText()
  title.fontName = { family: 'Inter', style: 'Medium' }
  title.fontSize = 18
  title.characters = 'No results'
  await bindText(title, { fill: 'uds/text/primary' })
  comp.appendChild(title)
  const desc = figma.createText()
  desc.fontName = { family: 'Inter', style: 'Regular' }
  desc.fontSize = 14
  desc.characters = 'Try adjusting your filters.'
  await bindText(desc, { fill: 'uds/text/secondary' })
  comp.appendChild(desc)
}
