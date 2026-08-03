import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Button,
  Card,
  CardContent,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
  MainContent,
  MainStack,
  Menu,
  PageHeader,
  PageHeaderActions,
  PageHeaderBody,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
  SearchInput,
  Status,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toolbar,
  ToolbarCenter,
  ToolbarDescription,
  ToolbarTitle,
  TooltipProvider,
  type MenuNavigationItem,
  type StatusVariant,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [{ id: "clinicians", label: "Clinicians" }]

type ClinicianRow = {
  id: string
  name: string
  meta: string
  status: string
  statusVariant: StatusVariant
}

const clinicians: ClinicianRow[] = [
  {
    id: "sam",
    name: "Sam Okonkwo, NP",
    meta: "Emergency Medicine · Phoenix, AZ",
    status: "Available",
    statusVariant: "success",
  },
  {
    id: "riley",
    name: "Riley Chen, CRNA",
    meta: "Anesthesia · Salt Lake City, UT",
    status: "Credentialing",
    statusVariant: "warning",
  },
  {
    id: "avery",
    name: "Avery Patel, RN",
    meta: "ICU · Boise, ID",
    status: "On assignment",
    statusVariant: "info",
  },
  {
    id: "morgan",
    name: "Morgan Blake, MD",
    meta: "Radiology · Austin, TX",
    status: "Available",
    statusVariant: "success",
  },
  {
    id: "casey",
    name: "Casey Rivera, PA",
    meta: "Orthopedics · Albuquerque, NM",
    status: "Inactive",
    statusVariant: "neutral",
  },
  {
    id: "jordan",
    name: "Jordan Ellis, MD",
    meta: "Hospitalist · Denver, CO",
    status: "On assignment",
    statusVariant: "info",
  },
]

/**
 * AppShell listview master pane: Toolbar as the primary titlebar for the
 * content below, optional SearchInput, then `Item` (or Card) rows for entities.
 */
export function DetailWithListviewExample() {
  const selectedId = "jordan"

  const listview = (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
      <div className="shrink-0">
        <Toolbar size="lg" aria-label="Clinician queue">
          <ToolbarCenter>
            <ToolbarTitle>Clinician queue</ToolbarTitle>
            <ToolbarDescription>{clinicians.length} records</ToolbarDescription>
          </ToolbarCenter>
        </Toolbar>
        <div className="border-b border-border p-[length:var(--uds-spacing-4)]">
          <SearchInput
            inputSize="sm"
            placeholder="Search clinician queue…"
            aria-label="Search clinician queue"
          />
        </div>
      </div>
      <div data-slot="appshell-listview-scroll" className="min-h-0 flex-1">
        <ItemGroup className="gap-0">
          {clinicians.map((row) => (
            <Item
              key={row.id}
              appearance="list"
              variant={row.id === selectedId ? "muted" : "default"}
              size="default"
            >
              <ItemContent>
                <ItemTitle>{row.name}</ItemTitle>
                <ItemDescription>{row.meta}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Status appearance="outlined" size="compact" variant={row.statusVariant}>
                  {row.status}
                </Status>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="clinicians"
            onNavigationSelect={() => {}}
          />
        }
        listview={listview}
      >
        <AppShell.Main>
          <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
            <PageHeader layout="inline">
              <PageHeaderBody>
                <PageHeaderContent>
                  <PageHeaderTitle>Jordan Ellis, MD</PageHeaderTitle>
                  <PageHeaderDescription>
                    Hospitalist · Denver, CO · managed by Maya Torres. Main scrolls; listview stays
                    fixed.
                  </PageHeaderDescription>
                </PageHeaderContent>
                <PageHeaderActions>
                  <Status appearance="outlined" variant="info">
                    On assignment
                  </Status>
                  <Button variant="outline">View details</Button>
                  <Button>Update availability</Button>
                </PageHeaderActions>
              </PageHeaderBody>
            </PageHeader>

            <MainStack>
              <Tabs defaultValue="overview" className="flex flex-col gap-[length:var(--uds-gap-24)]">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="credentials">Credentials</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="text-sm text-muted-foreground">
                  Scroll this region to verify the listview column does not move with the detail.
                </TabsContent>
                <TabsContent value="credentials" className="text-sm text-muted-foreground">
                  Licenses and credentialing packet summary.
                </TabsContent>
                <TabsContent value="history" className="text-sm text-muted-foreground">
                  Assignment and activity history.
                </TabsContent>
              </Tabs>
              <div className="grid gap-[length:var(--uds-gap-16)] lg:grid-cols-2 lg:items-start">
                {Array.from({ length: 4 }, (_, i) => (
                  <Card key={i}>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Detail section {i + 1} — section titles use SectionHeader (24), never match
                        PageHeaderTitle (28).
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </MainStack>
          </MainContent>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
