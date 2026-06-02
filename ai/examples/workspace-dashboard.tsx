import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Badge,
  Card,
  Medallion,
  Menu,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderContent,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Status,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "overview", label: "Overview" },
  { id: "clinicians", label: "Clinicians" },
  { id: "reports", label: "Reports" },
]

export function WorkspaceDashboardExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="overview"
            onNavigationSelect={() => {
              /* wire to router or state */
            }}
          />
        }
      >
        <AppShell.Main>
          <div className="flex flex-col gap-6 p-6">
            <SectionHeader>
              <SectionHeaderContent>
                <SectionHeaderTitle>Coverage dashboard</SectionHeaderTitle>
                <SectionHeaderDescription>
                  Canonical AppShell: Menu in the menu slot, page content in AppShell.Main, no consumer layout hacks.
                </SectionHeaderDescription>
              </SectionHeaderContent>
              <SectionHeaderActions>
                <Badge accent="blue" appearance="pastel" shape="rect">
                  Priority staffing
                </Badge>
              </SectionHeaderActions>
            </SectionHeader>

            <div className="grid gap-4 xl:grid-cols-3">
              {[
                ["Open submissions", "24", "blue"],
                ["Credentialing risk", "3", "amber"],
                ["Confirmed starts", "8", "green"],
              ].map(([label, value, color]) => (
                <Card key={label} className="rounded-[4px] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{label}</p>
                      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
                    </div>
                    <Medallion color={color as "blue" | "amber" | "green"} shape="rounded" icon={<span>{value}</span>} />
                  </div>
                </Card>
              ))}
            </div>

            <Card className="rounded-[4px] p-5">
              <div className="flex items-center gap-3">
                <Status variant="warning">Action needed</Status>
                <p className="text-sm text-muted-foreground">Three assignments are waiting on licensure validation.</p>
              </div>
            </Card>
          </div>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
