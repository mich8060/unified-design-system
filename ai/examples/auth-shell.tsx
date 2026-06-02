import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Card,
  Menu,
  Status,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "assignments", label: "Assignments" },
  { id: "messages", label: "Messages" },
  { id: "reports", label: "Reports" },
]

export function AuthShellExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu navigationItems={navigationItems} activeId="dashboard" onNavigationSelect={() => {}} />
        }
      >
        <AppShell.Main>
          <div className="p-6">
            <Card className="rounded-[4px] border-[var(--uds-color-accent-blue-200)] p-6">
              <h1 className="text-2xl font-semibold text-foreground">Today&apos;s review queue</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Use AppShell with <code className="text-xs">menu</code> + <code className="text-xs">Menu</code> and page
                content in <code className="text-xs">AppShell.Main</code>.
              </p>
              <Status variant="info" className="mt-4">
                Live staffing
              </Status>
            </Card>
          </div>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
