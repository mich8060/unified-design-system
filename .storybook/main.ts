import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const PKG = '@chghealthcare/unified-design-system'

const udsSubpathModules = [
  'chart',
  'command',
  'drawer',
  'calendar',
  'date-input',
  'date-range-input',
  'menu',
  'micro-calendar',
  'resizable',
  'sonner',
  'input-otp',
] as const

function createUdsAliases() {
  return [
    { find: `${PKG}/styles.css`, replacement: path.resolve(root, './src/styles.css') },
    { find: `${PKG}/styles/base.css`, replacement: path.resolve(root, './src/styles.base.lib.css') },
    ...udsSubpathModules.map((mod) => ({
      find: `${PKG}/${mod}`,
      replacement: path.resolve(root, `./src/components/ui/${mod}.tsx`),
    })),
    { find: PKG, replacement: path.resolve(root, './src/index.ts') },
    { find: 'uds-tailwind-test/styles.css', replacement: path.resolve(root, './src/styles.css') },
    { find: 'uds-tailwind-test', replacement: path.resolve(root, './src/index.ts') },
    { find: '@', replacement: path.resolve(root, './src') },
  ]
}

const config: StorybookConfig = {
  stories: ['../src/stories/uds/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    config.resolve = config.resolve ?? {}
    const aliases = createUdsAliases()
    const existing = config.resolve.alias
    if (Array.isArray(existing)) {
      config.resolve.alias = [...existing, ...aliases]
    } else {
      config.resolve.alias = { ...(existing ?? {}), ...Object.fromEntries(aliases.map((a) => [a.find, a.replacement])) }
    }
    return config
  },
}

export default config
