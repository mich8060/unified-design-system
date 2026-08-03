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
} from '@chghealthcare/unified-design-system'

const navigationItems: MenuNavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'roles', label: 'Open roles' },
  { id: 'clinicians', label: 'Clinicians' },
  { id: 'reports', label: 'Reports' },
]

const queueItems = ['Avery Stone', 'Miles Carter', 'Nina Patel', 'Olivia Chen']

export function App() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu navigationItems={navigationItems} activeId="dashboard" onNavigationSelect={() => {}} />
        }
        listview={
          <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
            <div className="shrink-0 border-b px-4 py-2">
              <p className="text-sm font-semibold text-foreground">Candidate queue</p>
              <p className="text-xs text-muted-foreground">4 profiles ready for review</p>
            </div>
            <div data-slot="appshell-listview-scroll" className="flex flex-col gap-2 p-3">
              {queueItems.map((name, index) => (
                <button
                  key={name}
                  type="button"
                  className="rounded-[4px] border bg-card px-3 py-3 text-left transition hover:border-foreground/20"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{name}</p>
                      <p className="text-xs text-muted-foreground">Follow-up requested</p>
                    </div>
                    <span className="text-xs text-muted-foreground">0{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        }
        footer={
          <div className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground">
            <span>4 candidates selected</span>
            <span>Synced 2 minutes ago</span>
          </div>
        }
      >
        <AppShell.Main>
          <div className="flex flex-col gap-6 p-6">
            <SectionHeader>
              <SectionHeaderContent>
                <SectionHeaderTitle>Candidate review board</SectionHeaderTitle>
                <SectionHeaderDescription>
                  Consumer fixture: Menu in menu, listview prop, AppShell.Main — matches published AppShell API.
                </SectionHeaderDescription>
              </SectionHeaderContent>
              <SectionHeaderActions>
                <Badge accent="blue" appearance="pastel" shape="rect">
                  Priority queue
                </Badge>
              </SectionHeaderActions>
            </SectionHeader>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
              <Card className="rounded-[4px] p-5">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">Open requisition</p>
                      <p className="text-sm text-muted-foreground">Hospitalist coverage, Phoenix metro</p>
                    </div>
                    <Medallion color="blue" shape="rounded" icon={<span>18</span>} />
                  </div>
                  <Status variant="info">Review in progress</Status>
                </div>
              </Card>
            </div>
          </div>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
