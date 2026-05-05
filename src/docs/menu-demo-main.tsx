import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { applyDocsBrandToDocument } from '@/docs/doc-site-brand'
import {
  ChatCircleDotsIcon,
  Menu,
  PhoneIcon,
  getDefaultNavigation,
  type MenuUtilityItem,
} from '@chg-ds/unified-design-system'
import '@/fonts.css'
import '@chg-ds/unified-design-system/styles.css'

/** Active brand for this iframe demo (tokens + header/collapsed marks). */
const MENU_DEMO_BRAND = 'connect' as const

applyDocsBrandToDocument(MENU_DEMO_BRAND)

const params = new URLSearchParams(window.location.search)
if (params.get('dark') === '1') {
  document.documentElement.classList.add('dark')
}

const WORKSPACE_OPTIONS = [
  { value: 'clinical', label: 'Clinical workspace' },
  { value: 'billing', label: 'Billing workspace' },
  { value: 'admin', label: 'Admin workspace' },
] as const

const UTILITY_LINKS: MenuUtilityItem[] = [
  { id: 'phone', label: '888-888-8888', href: 'tel:+18888888888', icon: PhoneIcon },
  { id: 'feedback', label: 'Feedback', href: '#feedback', icon: ChatCircleDotsIcon },
]

const CONNECT_NAVIGATION_ITEMS = getDefaultNavigation(MENU_DEMO_BRAND)

function MenuDemoApp() {
  const [workspace, setWorkspace] = useState<string>(WORKSPACE_OPTIONS[0].value)
  const [activeNavId, setActiveNavId] = useState<string>(CONNECT_NAVIGATION_ITEMS[0].id)

  return (
    <div className="min-h-screen min-w-full bg-neutral-800">
      <Menu
        defaultExpanded
        aria-label="Application menu"
        navigationItems={[...CONNECT_NAVIGATION_ITEMS]}
        navigationProps={{ 'aria-label': 'Primary navigation' }}
        activeId={activeNavId}
        onNavigationSelect={(id) => {
          setActiveNavId(id)
        }}
        workspace={{
          options: [...WORKSPACE_OPTIONS],
          value: workspace,
          onWorkspaceChange: (next) => {
            setWorkspace(next)
          },
          'aria-label': 'Workspace',
        }}
        utilities={UTILITY_LINKS}
      />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MenuDemoApp />
  </StrictMode>,
)
