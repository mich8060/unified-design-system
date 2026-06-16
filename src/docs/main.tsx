import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import interUrl from '@/assets/fonts/Inter-Variable.woff2?url'
import '@chghealthcare/unified-design-system/styles.css'

const _fontPreload = Object.assign(document.createElement('link'), {
  rel: 'preload', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous', href: interUrl,
})
document.head.prepend(_fontPreload)
import '@/fonts.css'
import '@/styles/docs.css'
import DocsApp from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocsApp />
  </StrictMode>,
)
