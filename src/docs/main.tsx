import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@chghealthcare/unified-design-system/styles.css'
import '@/fonts.css'
import '@/styles/docs.css'
import DocsApp from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocsApp />
  </StrictMode>,
)
