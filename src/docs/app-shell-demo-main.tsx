import { IconContext } from '@chghealthcare/unified-design-system'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { TooltipProvider } from '@chghealthcare/unified-design-system'
import { Toaster } from '@/components/ui/sonner'
import { AppShellDemoCanvas } from '@/docs/app-shell-demo/AppShellDemoCanvas'
import interUrl from '@/assets/fonts/Inter-Variable.woff2?url'
import '@/fonts.css'

const _fontPreload = Object.assign(document.createElement('link'), {
  rel: 'preload', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous', href: interUrl,
})
document.head.prepend(_fontPreload)
import '@chghealthcare/unified-design-system/styles.css'

const params = new URLSearchParams(window.location.search)
if (params.get('dark') === '1') {
  document.documentElement.classList.add('dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MemoryRouter initialEntries={['/']}>
      <IconContext.Provider value={{ weight: 'bold', mirrored: false }}>
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen bg-neutral-100 p-4 dark:bg-neutral-950">
            <div className="mx-auto w-full max-w-[1280px]">
              <AppShellDemoCanvas />
            </div>
          </div>
        </TooltipProvider>
      </IconContext.Provider>
    </MemoryRouter>
  </StrictMode>,
)
