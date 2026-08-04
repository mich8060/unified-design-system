import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Badge,
  Button,
  Card,
  ClockIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  MainContent,
  MainStack,
  Medallion,
  Menu,
  SearchInput,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  Status,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TooltipProvider,
  UsersIcon,
  WarningCircleIcon,
  WarningIcon,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "triage", label: "Triage" },
  { id: "providers", label: "Providers" },
]

const stats = [
  { id: "esc", label: "Escalations", value: "12", hint: "Open today", color: "red" as const, icon: WarningIcon },
  { id: "nr", label: "Not responding", value: "7", hint: "Past SLA", color: "amber" as const, icon: ClockIcon },
  { id: "apr", label: "Approvals", value: "18", hint: "In queue", color: "sky" as const, icon: UsersIcon },
  { id: "pool", label: "Pool invites", value: "4", hint: "Pending", color: "emerald" as const, icon: WarningCircleIcon },
]

export function TriageDashboardExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="triage"
            onNavigationSelect={() => {
              /* wire to router or state */
            }}
          />
        }
      >
        <AppShell.Main>
          <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
            <MainStack>
            <SectionHeader>
              <SectionHeaderContent>
                <p className="text-sm text-muted-foreground">Monday, July 20</p>
                <SectionHeaderTitle>Good morning</SectionHeaderTitle>
              </SectionHeaderContent>
            </SectionHeader>

            <div className="flex flex-wrap items-center gap-3">
              <SearchInput
                surface="primary"
                placeholder="Search…"
                aria-label="Search"
                className="min-w-[240px] max-w-sm flex-1"
              />
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Sort
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[length:var(--uds-gap-16)] sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={stat.id}
                    className="flex flex-col gap-[length:var(--uds-gap-12)] rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]"
                  >
                    <div className="flex items-start justify-between gap-[length:var(--uds-gap-16)]">
                      <p className="text-sm font-semibold text-foreground">{stat.label}</p>
                      <Medallion color={stat.color} tone="pastel" size="lg" shape="rounded" icon={<Icon aria-hidden />} />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-muted-foreground">{stat.hint}</p>
                      <Button variant="link" size="sm" className="px-0">
                        View
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div>
              <h2 className="mb-3 text-base font-semibold text-foreground">Since last visit</h2>
              <div className="grid gap-[length:var(--uds-gap-16)] md:grid-cols-3">
                <Card className="rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                  <Status variant="error" dot>
                    Critical
                  </Status>
                  <p className="mt-2 font-medium text-foreground">2 escalations aging past 24h</p>
                  <Button variant="link" size="sm" className="mt-2 px-0">
                    Review
                  </Button>
                </Card>
                <Card className="rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                  <Status variant="warning" dot>
                    Attention needed
                  </Status>
                  <p className="mt-2 font-medium text-foreground">5 providers not responding</p>
                  <Button variant="link" size="sm" className="mt-2 px-0">
                    Notify
                  </Button>
                </Card>
                <Card className="rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                  <Status variant="info" dot>
                    Urgent
                  </Status>
                  <p className="mt-2 font-medium text-foreground">3 pool invites expiring today</p>
                  <Button variant="link" size="sm" className="mt-2 px-0">
                    Send
                  </Button>
                </Card>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-[length:var(--uds-gap-24)] lg:grid-cols-3">
              <Card className="flex max-h-[28rem] flex-col overflow-hidden rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground">Escalations</h3>
                  <Button variant="link" size="sm" className="px-0">
                    View all
                  </Button>
                </div>
                <ItemGroup className="min-h-0 flex-1 overflow-y-auto">
                  {["License hold", "Missing COI", "Hospital privileges"].map((title) => (
                    <Item key={title} variant="outline">
                      <ItemContent>
                        <ItemTitle>{title}</ItemTitle>
                        <ItemDescription>Assigned · awaiting action</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Button size="sm">Escalate</Button>
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              </Card>

              <Card className="flex max-h-[28rem] flex-col overflow-hidden rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground">Providers not responding</h3>
                </div>
                <ItemGroup className="min-h-0 flex-1 overflow-y-auto">
                  {[
                    { name: "Alex Chen", state: "No reply · 48h" },
                    { name: "Jordan Lee", state: "Invite pending" },
                  ].map((row) => (
                    <Item key={row.name} variant="outline">
                      <ItemContent>
                        <ItemTitle>{row.name}</ItemTitle>
                        <ItemDescription>{row.state}</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Badge accent="orange" appearance="outlined" shape="pill">
                          Stalled
                        </Badge>
                        <Button variant="outline" size="sm">
                          Notify
                        </Button>
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              </Card>

              <Card className="flex max-h-[28rem] flex-col overflow-hidden rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <Badge accent="sky" appearance="solid" shape="pill" size="sm">
                      5
                    </Badge>
                  </div>
                  <Button variant="link" size="sm" className="px-0">
                    Mark all read
                  </Button>
                </div>
                <Tabs defaultValue="all" className="flex flex-col gap-[length:var(--uds-gap-24)]">
                  <TabsList variant="line">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="escalation">Escalation</TabsTrigger>
                    <TabsTrigger value="approvals">Approvals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <ItemGroup>
                      <Item variant="outline">
                        <ItemMedia>
                          <Medallion color="red" tone="pastel" shape="rounded" icon={<WarningIcon aria-hidden />} />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>Escalation assigned</ItemTitle>
                          <ItemDescription>
                            <span className="inline-flex items-center gap-1">
                              <ClockIcon className="size-3.5" aria-hidden /> 12m ago
                            </span>
                          </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <Button size="sm">Open</Button>
                        </ItemActions>
                      </Item>
                      <Item variant="outline">
                        <ItemMedia>
                          <Medallion color="emerald" tone="pastel" shape="rounded" icon={<UsersIcon aria-hidden />} />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>Approval completed</ItemTitle>
                          <ItemDescription>Pool invite accepted</ItemDescription>
                        </ItemContent>
                      </Item>
                    </ItemGroup>
                  </TabsContent>
                  <TabsContent value="escalation" />
                  <TabsContent value="approvals" />
                </Tabs>
              </Card>
            </div>
            </MainStack>
          </MainContent>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
