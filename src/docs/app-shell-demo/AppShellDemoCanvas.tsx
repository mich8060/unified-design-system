import { useState } from 'react'
import {
  AppShell,
  Avatar,
  AvatarFallback,
  BellIcon,
  Button,
  ChatCircleDotsIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Footer,
  Menu,
  PhoneIcon,
  QuestionIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type MenuUtilityItem,
} from '@chghealthcare/unified-design-system'
import { applyDocsBrandToDocument } from '@/docs/doc-site-brand'
import './app-shell-demo.css'

const APP_SHELL_DEMO_BRAND = 'default' as const
applyDocsBrandToDocument(APP_SHELL_DEMO_BRAND)

const UTILITY_LINKS: MenuUtilityItem[] = [
  { id: 'phone', label: '888-888-8888', href: 'tel:+18888888888', icon: PhoneIcon },
  { id: 'feedback', label: 'Feedback', href: '#feedback', icon: ChatCircleDotsIcon },
]

const LISTVIEW_RECORDS = [
  { name: 'Avery Stone', status: 'Review requested' },
  { name: 'Miles Carter', status: 'Pending approval' },
  { name: 'Nina Patel', status: 'In progress' },
  { name: 'Olivia Chen', status: 'Scheduled' },
  { name: 'Isaac Reed', status: 'Review requested' },
]

export function AppShellDemoCanvas() {
  const [activeNavId, setActiveNavId] = useState<string>('dashboard')
  const [showListview, setShowListview] = useState(false)

  return (
    <div className="box-border min-h-0 w-full">
      <p className="mb-3 max-w-3xl text-sm text-neutral-600 dark:text-neutral-400">
        <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">AppShell</code> with brand-aware
        default navigation and an optional animated listview pane.
      </p>

      <div className="mb-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowListview((v) => !v)}
          className="rounded-[4px] border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
        >
          {showListview ? 'Hide' : 'Show'} listview
        </button>
      </div>

      <div className="appshell-demo-frame">
        <AppShell
          className="appshell-demo-root"
        >
          <AppShell.Menu>
            <Menu
              defaultExpanded
              activeId={activeNavId}
              onNavigationSelect={(id) => setActiveNavId(id)}
              utilities={UTILITY_LINKS}
            />
          </AppShell.Menu>
          <AppShell.Header>
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="rounded-full" aria-label="Help">
                    <QuestionIcon className="size-5" aria-hidden />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Help</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
                    <BellIcon className="size-5" aria-hidden />
                    <span className="absolute top-1 right-1 size-2 rounded-full bg-[var(--uds-color-accent-red-500)] ring-2 ring-[var(--uds-surface-primary)]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="ghost" size="sm" className="rounded-full px-0" aria-label="Account">
                    <Avatar size="sm" className="size-8">
                      <AvatarFallback className="text-xs">MT</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          </AppShell.Header>
          <AppShell.Listview>
            {showListview ? (
              <div className="flex h-full flex-col bg-white dark:bg-neutral-950">
                <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Patient queue</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {LISTVIEW_RECORDS.length} active cases
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-2 overflow-auto p-3">
                  {LISTVIEW_RECORDS.map((record, index) => (
                    <div
                      key={record.name}
                      className="rounded-[6px] border border-neutral-200 bg-neutral-50 p-3 transition hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{record.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">{record.status}</p>
                        </div>
                        <span className="text-xs text-neutral-400 dark:text-neutral-500">0{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : undefined}
          </AppShell.Listview>
          <AppShell.Footer>
            <Footer
              links={[
                { label: 'Privacy Policy', href: '#privacy' },
                { label: 'Terms & Conditions', href: '#terms' },
              ]}
            />
          </AppShell.Footer>
          <AppShell.Main>
            <div className="flex h-full flex-col bg-white dark:bg-neutral-950">
              <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Active: <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">{activeNavId}</code>
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Click a nav item to update the active state. Toggle the listview to see the animated slide.
                </p>
              </div>
              <div className="grid flex-1 gap-4 p-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
                <div className="rounded-[8px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Main content area</p>
                  <div className="mt-4 space-y-3">
                    <div className="h-3 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
                    <div className="h-3 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
                    <div className="h-3 w-3/5 rounded bg-neutral-200 dark:bg-neutral-800" />
                  </div>
                </div>
                <div className="rounded-[8px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Side panel</p>
                  <div className="mt-4 space-y-2">
                    {['Verify insurance', 'Send follow-up', 'Confirm availability'].map((task) => (
                      <div
                        key={task}
                        className="rounded-md bg-white px-3 py-2 text-sm text-neutral-700 ring-1 ring-neutral-200 dark:bg-neutral-950 dark:text-neutral-300 dark:ring-neutral-800"
                      >
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AppShell.Main>
        </AppShell>
      </div>
    </div>
  )
}
