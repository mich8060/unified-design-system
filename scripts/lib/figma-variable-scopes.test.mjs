import { strict as assert } from 'node:assert'
import { scopesForFigmaVariable } from './figma-variable-scopes.mjs'

function eq(a, b) {
  assert.deepEqual([...a].sort(), [...b].sort())
}

eq(scopesForFigmaVariable('brand/primary/500', 'COLOR', 'Brand'), [
  'FRAME_FILL',
  'SHAPE_FILL',
  'STROKE_COLOR',
])
eq(scopesForFigmaVariable('uds/surface/primary', 'COLOR', 'Brand'), ['FRAME_FILL'])
eq(scopesForFigmaVariable('uds/text/primary', 'COLOR', 'Brand'), ['TEXT_FILL'])
eq(scopesForFigmaVariable('uds/border/primary', 'COLOR', 'Brand'), ['STROKE_COLOR'])
eq(scopesForFigmaVariable('uds/icon/primary', 'COLOR', 'Brand'), ['SHAPE_FILL', 'STROKE_COLOR'])
eq(scopesForFigmaVariable('uds/code/bg', 'COLOR', 'Brand'), ['FRAME_FILL'])
eq(scopesForFigmaVariable('uds/code/fg', 'COLOR', 'Brand'), ['TEXT_FILL'])
eq(scopesForFigmaVariable('uds/blur/md', 'FLOAT', 'Layout'), ['EFFECT_FLOAT'])
eq(scopesForFigmaVariable('uds/container/columns', 'FLOAT', 'Responsive'), [])
eq(scopesForFigmaVariable('uds/container/padding/x', 'FLOAT', 'Responsive'), ['GAP'])
eq(scopesForFigmaVariable('uds/type/body/14', 'FLOAT', 'Responsive'), ['FONT_SIZE'])
eq(scopesForFigmaVariable('uds/type/body/14', 'FLOAT', 'Typography'), ['LINE_HEIGHT'])

console.log('figma-variable-scopes: ok')
