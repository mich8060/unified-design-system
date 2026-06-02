import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Badge,
  Card,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
  Menu,
  Status,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [{ id: "pipeline", label: "Pipeline" }]

const clinicians = ["Avery Stone", "Miles Carter", "Nina Patel", "Olivia Chen"]

export function DetailWithListviewExample() {
  const listview = (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
      <div className="shrink-0 border-b px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Today&apos;s queue</p>
        <p className="text-xs text-muted-foreground">{clinicians.length} patients ready for review</p>
      </div>
      <div data-slot="appshell-listview-scroll" className="p-3">
        <ItemGroup>
          {clinicians.map((name, index) => (
            <Item key={name} variant={index === 0 ? "muted" : "outline"}>
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>Follow-up requested for credentialing packet.</ItemDescription>
              </ItemContent>
              <Badge accent="blue" appearance="pastel" shape="rect">
                0{index + 1}
              </Badge>
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
        menu={<Menu navigationItems={navigationItems} activeId="pipeline" onNavigationSelect={() => {}} />}
        listview={listview}
      >
        <AppShell.Main>
          <div className="space-y-6 p-6">
            <Card className="rounded-[4px] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Olivia Chen</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Main scrolls here; the queue pane stays fixed. List body uses{" "}
                    <code className="text-xs">data-slot=&quot;appshell-listview-scroll&quot;</code>.
                  </p>
                </div>
                <Status variant="info">Reviewing</Status>
              </div>
              <Tabs defaultValue="overview" className="mt-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-4 text-sm text-muted-foreground">
                  Scroll this region to verify the listview column does not move with the dashboard.
                </TabsContent>
                <TabsContent value="documents" className="pt-4 text-sm text-muted-foreground">
                  Supporting documents and related workflow content go here.
                </TabsContent>
              </Tabs>
            </Card>
            {Array.from({ length: 8 }, (_, i) => (
              <Card key={i} className="rounded-[4px] p-5">
                <p className="text-sm text-muted-foreground">Dashboard section {i + 1} — scroll main only.</p>
              </Card>
            ))}
          </div>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
