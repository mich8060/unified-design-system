import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Badge,
  BriefcaseIcon,
  Button,
  Card,
  CardContent,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  MainContent,
  MainStack,
  Medallion,
  Menu,
  PageHeader,
  PageHeaderActions,
  PageHeaderBody,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@chghealthcare/unified-design-system/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const navigationItems: MenuNavigationItem[] = [
  { id: "reports", label: "Reports" },
  { id: "dashboard", label: "Dashboard" },
]

const barConfig = {
  filled: { label: "Filled", color: "var(--chart-1)" },
  open: { label: "Open", color: "var(--chart-2)" },
} satisfies ChartConfig

const barData = [
  { month: "Jan", filled: 42, open: 18 },
  { month: "Feb", filled: 55, open: 12 },
  { month: "Mar", filled: 61, open: 20 },
  { month: "Apr", filled: 48, open: 16 },
  { month: "May", filled: 70, open: 14 },
  { month: "Jun", filled: 66, open: 22 },
  { month: "Jul", filled: 72, open: 18 },
]

const lineConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  cost: { label: "Cost", color: "var(--chart-3)" },
} satisfies ChartConfig

const lineData = [
  { month: "Jan", revenue: 1.2, cost: 0.9 },
  { month: "Feb", revenue: 1.4, cost: 1.0 },
  { month: "Mar", revenue: 1.6, cost: 1.1 },
  { month: "Apr", revenue: 1.5, cost: 1.05 },
  { month: "May", revenue: 1.8, cost: 1.2 },
  { month: "Jun", revenue: 2.0, cost: 1.3 },
  { month: "Jul", revenue: 2.1, cost: 1.35 },
]

const specialtyRows = [
  { specialty: "Hospitalist", share: "28%", trend: "+2%" },
  { specialty: "Emergency", share: "22%", trend: "+1%" },
  { specialty: "Anesthesia", share: "18%", trend: "0%" },
]

const clientRows = [
  { client: "Mercy General", jobs: 24, fill: "86%", revenue: "$420k" },
  { client: "Lakeside Medical", jobs: 18, fill: "79%", revenue: "$310k" },
  { client: "Summit Ortho", jobs: 12, fill: "91%", revenue: "$280k" },
]

/**
 * Canonical Reports / analytics page: MainStack + multi-column grids.
 * Do not stack every chart and table full-width.
 */
export function AnalyticsOverviewExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="reports"
            onNavigationSelect={() => {
              /* wire to router or state */
            }}
          />
        }
      >
        <AppShell.Main>
          <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
            <PageHeader layout="inline">
              <PageHeaderBody>
                <PageHeaderContent>
                  <PageHeaderTitle>Reports</PageHeaderTitle>
                  <PageHeaderDescription>
                    Fill rates, activity, and client performance — use columns to keep the page scannable.
                  </PageHeaderDescription>
                </PageHeaderContent>
                <PageHeaderActions>
                  <Button variant="outline">Schedule report</Button>
                  <Button>Export CSV</Button>
                </PageHeaderActions>
              </PageHeaderBody>
            </PageHeader>

            <MainStack>
              {/* REQUIRED: short regions share rows — never stack chart|feed|chart|callout|tables all full-width */}
              {/* Row 1: chart | activity feed */}
              <div className="grid min-w-0 grid-cols-1 gap-[length:var(--uds-gap-24)] lg:grid-cols-3">
                <Card className="min-w-0 lg:col-span-2">
                  <CardContent className="flex flex-col gap-[length:var(--uds-gap-16)]">
                    <div className="flex flex-wrap items-start justify-between gap-[length:var(--uds-gap-12)]">
                      <div className="flex min-w-0 items-center gap-[length:var(--uds-gap-12)]">
                        <Medallion
                          color="emerald"
                          tone="pastel"
                          shape="circle"
                          icon={<BriefcaseIcon aria-hidden />}
                        />
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-foreground">Filled vs open roles</h3>
                          <p className="text-xs text-muted-foreground">Last 7 months</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Customize
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge accent="green" appearance="pastel" shape="rect">
                        Filled 72%
                      </Badge>
                      <Badge accent="blue" appearance="pastel" shape="rect">
                        Open 28%
                      </Badge>
                      <Badge accent="amber" appearance="pastel" shape="rect">
                        Goal 90%
                      </Badge>
                    </div>
                    <ChartContainer config={barConfig} className="h-[280px] w-full">
                      <BarChart accessibilityLayer data={barData} margin={{ top: 8, right: 8, left: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} width={32} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="filled" stackId="a" fill="var(--color-filled)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="open" stackId="a" fill="var(--color-open)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="flex min-h-0 min-w-0 flex-col lg:max-h-[28rem]">
                  <CardContent className="flex min-h-0 flex-1 flex-col">
                    <h3 className="mb-3 font-semibold text-foreground">Activity feed</h3>
                    <Tabs defaultValue="insights" className="flex min-h-0 flex-1 flex-col gap-[length:var(--uds-gap-24)]">
                      <TabsList variant="line">
                        <TabsTrigger value="insights">Insights</TabsTrigger>
                        <TabsTrigger value="alerts">Alerts</TabsTrigger>
                      </TabsList>
                      <TabsContent value="insights" className="min-h-0 flex-1 space-y-3 overflow-y-auto">
                        {[
                          "West region fill rate up 4% week over week",
                          "Compliance packet aging on 3 clinicians",
                          "New bid activity on ICU nights",
                        ].map((title) => (
                          <div
                            key={title}
                            className="rounded-[length:var(--uds-radius-4)] border p-[length:var(--uds-spacing-12)]"
                          >
                            <p className="text-sm font-medium text-foreground">{title}</p>
                            <p className="text-xs text-muted-foreground">Updated today</p>
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="alerts">
                        <Empty>
                          <EmptyHeader>
                            <EmptyTitle>No alerts</EmptyTitle>
                            <EmptyDescription>Priority alerts will appear here.</EmptyDescription>
                          </EmptyHeader>
                        </Empty>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Row 2: revenue chart | priority callout */}
              <div className="grid min-w-0 grid-cols-1 gap-[length:var(--uds-gap-24)] lg:grid-cols-3">
                <Card className="min-w-0 lg:col-span-2">
                  <CardContent className="flex flex-col gap-[length:var(--uds-gap-16)]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-foreground">Revenue vs cost</h3>
                      <Badge accent="green" appearance="pastel" shape="rect">
                        Margin
                      </Badge>
                    </div>
                    <ChartContainer config={lineConfig} className="h-[240px] w-full">
                      <LineChart accessibilityLayer data={lineData} margin={{ top: 8, right: 8, left: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} width={32} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="cost" stroke="var(--color-cost)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="min-w-0">
                  <CardContent className="flex h-full flex-col justify-between gap-[length:var(--uds-gap-16)]">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Priority focus</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Three clients are below fill-rate target this week. Open the action plan to assign owners.
                      </p>
                    </div>
                    <Button className="w-full">Open action plan</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Row 3: two tables side by side — not stacked full-width */}
              <div className="grid min-w-0 grid-cols-1 gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
                <div className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                  <SectionHeader>
                    <SectionHeaderContent>
                      <SectionHeaderTitle>Specialty mix</SectionHeaderTitle>
                    </SectionHeaderContent>
                  </SectionHeader>
                  <Card>
                    <CardContent className="p-0">{/* Table borderless in Card — one outline */}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Specialty</TableHead>
                            <TableHead>Share</TableHead>
                            <TableHead>Trend</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {specialtyRows.map((row) => (
                            <TableRow key={row.specialty}>
                              <TableCell className="font-medium">{row.specialty}</TableCell>
                              <TableCell>{row.share}</TableCell>
                              <TableCell>{row.trend}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                  <SectionHeader>
                    <SectionHeaderContent>
                      <SectionHeaderTitle>Client performance</SectionHeaderTitle>
                    </SectionHeaderContent>
                  </SectionHeader>
                  <Card>
                    <CardContent className="p-0">{/* Table borderless in Card — one outline */}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Jobs</TableHead>
                            <TableHead>Fill rate</TableHead>
                            <TableHead>Revenue</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clientRows.map((row) => (
                            <TableRow key={row.client}>
                              <TableCell className="font-medium">{row.client}</TableCell>
                              <TableCell>{row.jobs}</TableCell>
                              <TableCell>{row.fill}</TableCell>
                              <TableCell>{row.revenue}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
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
