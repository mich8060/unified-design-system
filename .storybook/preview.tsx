import type { Preview } from '@storybook/react-vite'
import interUrl from '../src/assets/fonts/Inter-Variable.woff2?url'
import '@chghealthcare/unified-design-system/styles.css'
import '../src/components/ui/app-shell.css'
import '../src/fonts.css'

const fontPreload = Object.assign(document.createElement('link'), {
  rel: 'preload',
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous',
  href: interUrl,
})
document.head.prepend(fontPreload)

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['UDS', '*'],
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
