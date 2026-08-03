import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Badge,
  BriefcaseIcon,
  Button,
  Card,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  MagnifyingGlassIcon,
  MainContent,
  MainStack,
  Medallion,
  Menu,
  SearchInput,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderContent,
  SectionHeaderTitle,
  Status,
  TooltipProvider,
  WarningIcon,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"
import { MicroCalendar } from "@chghealthcare/unified-design-system/micro-calendar"

const navigationItems: MenuNavigationItem[] = [
  { id: "queue", label: "My queue" },
  { id: "calendar", label: "Calendar" },
]

const facets = ["Assigned to me", "Due this week", "High priority"] as const

const queueItems = [
  {
    id: "1",
    title: "License verification — Dr. Rivera",
    description: "CA medical license renewal packet",
    status: "warning" as const,
  },
  {
    id: "2",
    title: "Privileging follow-up — Mercy Health",
    description: "Awaiting hospital coordinator reply",
    status: "info" as const,
  },
  {
    id: "3",
    title: "Onboarding checklist — Locum start",
    description: "Two outstanding document requests",
    status: "error" as const,
  },
]

export function OpsQueueDashboardExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="queue"
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
                <SectionHeaderTitle>My dashboard</SectionHeaderTitle>
              </SectionHeaderContent>
              <SectionHeaderActions>
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button size="sm">New task</Button>
              </SectionHeaderActions>
            </SectionHeader>

            <div className="flex flex-wrap gap-2">
              {["Review queue", "Message provider", "Log call"].map((label) => (
                <Button key={label} variant="outline" size="sm">
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SearchInput
                surface="primary"
                placeholder="Search…"
                aria-label="Search"
                className="min-w-[240px] max-w-sm flex-1"
              />
              {facets.map((facet) => (
                <Badge key={facet} accent="blue" appearance="pastel" shape="pill">
                  {facet}
                </Badge>
              ))}
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Sort
                </Button>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-[length:var(--uds-gap-24)] lg:grid-cols-[minmax(0,1fr)_320px]">
              <Card className="rounded-[length:var(--uds-radius-4)] p-[length:var(--uds-spacing-24)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-foreground">Open work</h2>
                  <Badge accent="sky" appearance="solid" shape="pill" size="sm">
                    {queueItems.length}
                  </Badge>
                </div>
                <ItemGroup>
                  {queueItems.map((item) => (
                    <Item key={item.id} variant="outline">
                      <ItemMedia>
                        <Medallion
                          color={item.status === "error" ? "red" : item.status === "warning" ? "amber" : "sky"}
                          tone="pastel"
                          shape="rounded"
                          icon={<WarningIcon aria-hidden />}
                        />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{item.title}</ItemTitle>
                        <ItemDescription>{item.description}</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Status variant={item.status} dot>
                          Needs attention
                        </Status>
                        <Button variant="outline" size="sm">
                          Open
                        </Button>
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              </Card>

              <div className="flex min-w-0 flex-col gap-[length:var(--uds-gap-24)]">
                <Card className="rounded-[length:var(--uds-radius-4)] p-[length:var(--uds-spacing-24)]">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Tracking</h3>
                      <p className="text-sm text-muted-foreground">Credential milestones</p>
                    </div>
                    <Medallion color="blue" tone="pastel" shape="rounded" icon={<BriefcaseIcon aria-hidden />} />
                  </div>
                  <MicroCalendar />
                </Card>

                <Card className="rounded-[length:var(--uds-radius-4)] p-[length:var(--uds-spacing-24)]">
                  <h3 className="text-base font-semibold text-foreground">Approaching due dates</h3>
                  <ItemGroup className="mt-4">
                    <Item variant="outline">
                      <ItemMedia>
                        <Medallion color="amber" tone="pastel" shape="rounded" icon={<MagnifyingGlassIcon aria-hidden />} />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>DEA certificate</ItemTitle>
                        <ItemDescription>Due in 5 days</ItemDescription>
                      </ItemContent>
                    </Item>
                    <Item variant="outline">
                      <ItemContent>
                        <ItemTitle>Malpractice COI</ItemTitle>
                        <ItemDescription>Due in 12 days</ItemDescription>
                      </ItemContent>
                    </Item>
                  </ItemGroup>
                </Card>
              </div>
            </div>
            </MainStack>
          </MainContent>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
