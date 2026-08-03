import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Badge,
  Button,
  Card,
  CardContent,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
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
  SectionHeaderActions,
  SectionHeaderContent,
  SectionHeaderTitle,
  StatisticCard,
  StatisticHeader,
  StatisticLabel,
  StatisticTitle,
  StatisticValue,
  Status,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TooltipProvider,
  UsersIcon,
  WarningIcon,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "clinicians", label: "Clinicians" },
  { id: "jobs", label: "Jobs" },
  { id: "reports", label: "Reports" },
]

const pipeline = [
  {
    role: "Hospitalist - MD",
    facility: "Mercy General",
    status: "Interviewing" as const,
    candidates: 6,
    start: "Aug 12",
  },
  {
    role: "ED Night - NP",
    facility: "Lakeside Medical",
    status: "Credentialing" as const,
    candidates: 3,
    start: "Sep 2",
  },
  {
    role: "Anesthesia - CRNA",
    facility: "Summit Ortho",
    status: "Offer out" as const,
    candidates: 2,
    start: "Aug 28",
  },
]

const placements = [
  { name: "Jordan Ellis, MD", detail: "Hospitalist · Mercy General", when: "Jul 18" },
  { name: "Sam Okonkwo, NP", detail: "ED · Lakeside Medical", when: "Jul 15" },
  { name: "Riley Chen, CRNA", detail: "Anesthesia · Summit Ortho", when: "Jul 12" },
]

const watchlist = [
  {
    title: "DEA renewals due",
    detail: "5 clinicians · next 14 days",
    status: "Needs action" as const,
    variant: "warning" as const,
  },
  {
    title: "License verification lag",
    detail: "2 packets aging past SLA",
    status: "Needs action" as const,
    variant: "error" as const,
  },
  {
    title: "Privileging in flight",
    detail: "Mercy General · 3 providers",
    status: "In progress" as const,
    variant: "info" as const,
  },
]

/**
 * Canonical authenticated dashboard: MainContent + PageHeader + MainStack,
 * horizontal KPIs, then **two** `lg:grid-cols-2` rows — short regions share a row
 * (never stack skinny lists/callouts full-width alone).
 */
export function WorkspaceDashboardExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="dashboard"
            onNavigationSelect={() => {
              /* wire to router or state */
            }}
          />
        }
      >
        <AppShell.Main>
          {/* PageHeader inline owns ≤24px to following content via mb — do not also gap against it */}
          <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
            <PageHeader layout="inline">
              <PageHeaderBody>
                <PageHeaderContent>
                  <PageHeaderTitle>Dashboard</PageHeaderTitle>
                  <PageHeaderDescription>
                    Monitor clinician coverage, open jobs, and compliance risk across your tenants.
                  </PageHeaderDescription>
                </PageHeaderContent>
                <PageHeaderActions>
                  <Button variant="outline">Export summary</Button>
                  <Button>New job request</Button>
                </PageHeaderActions>
              </PageHeaderBody>
            </PageHeader>

            <MainStack>
              {/* StatisticCards: horizontal row, gap 16 or 24 */}
              <div className="flex flex-wrap gap-[length:var(--uds-gap-16)]">
                {(
                  [
                    ["Open jobs", "148", "blue"],
                    ["Active clinicians", "1,284", "sky"],
                    ["Compliance at risk", "17", "amber"],
                    ["Billable this period", "$2.4M", "green"],
                  ] as const
                ).map(([label, value, color]) => (
                  <StatisticCard key={label} className="min-w-[12rem] flex-1">
                    <StatisticHeader>
                      <StatisticTitle>
                        <StatisticLabel>{label}</StatisticLabel>
                        <Medallion color={color} shape="rounded" icon={<UsersIcon aria-hidden />} />
                      </StatisticTitle>
                      <StatisticValue>{value}</StatisticValue>
                    </StatisticHeader>
                  </StatisticCard>
                ))}
              </div>

              {/* Row 1 REQUIRED: table | short list — not stacked full-width */}
              <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2 lg:items-start">
                <div className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                  <SectionHeader>
                    <SectionHeaderContent>
                      <SectionHeaderTitle>Staffing pipeline</SectionHeaderTitle>
                    </SectionHeaderContent>
                    <SectionHeaderActions>
                      <Button variant="link" size="sm" className="px-0">
                        View all jobs
                      </Button>
                    </SectionHeaderActions>
                  </SectionHeader>
                  <Card>
                    {/* p-0: cell edge pad; Table is borderless inside CardContent (one Card outline) */}
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Role</TableHead>
                            <TableHead>Facility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Candidates</TableHead>
                            <TableHead>Start</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pipeline.map((row) => (
                            <TableRow key={row.role}>
                              <TableCell className="font-medium">{row.role}</TableCell>
                              <TableCell>{row.facility}</TableCell>
                              <TableCell>
                                <Status size="compact" variant="info">
                                  {row.status}
                                </Status>
                              </TableCell>
                              <TableCell>{row.candidates}</TableCell>
                              <TableCell>{row.start}</TableCell>
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
                      <SectionHeaderTitle>Recent placements</SectionHeaderTitle>
                    </SectionHeaderContent>
                  </SectionHeader>
                  <Card>
                    {/* outline Items are Main-only — never copy into AppShell listview (use appearance="list") */}
                    <CardContent className="flex flex-col gap-[length:var(--uds-gap-12)]">
                      <ItemGroup>
                        {placements.map((p) => (
                          <Item key={p.name} variant="outline">
                            <ItemContent>
                              <ItemTitle>{p.name}</ItemTitle>
                              <ItemDescription>{p.detail}</ItemDescription>
                            </ItemContent>
                            <Badge
                              size="sm"
                              accent="transparent"
                              appearance="outlined"
                              shape="rect"
                            >
                              {p.when}
                            </Badge>
                          </Item>
                        ))}
                      </ItemGroup>
                      <Button variant="link" size="sm" className="self-start px-0">
                        Open placement calendar
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Row 2 REQUIRED: watchlist | callout — items-start avoids stretch voids when densities differ */}
              <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2 lg:items-start">
                <div className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                  <SectionHeader>
                    <SectionHeaderContent>
                      <SectionHeaderTitle>Compliance watchlist</SectionHeaderTitle>
                    </SectionHeaderContent>
                    <SectionHeaderActions>
                      <Button variant="link" size="sm" className="px-0">
                        Open compliance
                      </Button>
                    </SectionHeaderActions>
                  </SectionHeader>
                  {/* outline Items are Main-only — never copy into AppShell listview */}
                  <Card>
                    <CardContent className="flex flex-col gap-[length:var(--uds-gap-12)]">
                      <ItemGroup>
                        {watchlist.map((item) => (
                          <Item key={item.title} variant="outline">
                            <ItemMedia>
                              <Medallion
                                color={item.variant === "info" ? "sky" : "amber"}
                                shape="rounded"
                                icon={<WarningIcon aria-hidden />}
                              />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>{item.title}</ItemTitle>
                              <ItemDescription>{item.detail}</ItemDescription>
                            </ItemContent>
                            <Status size="compact" variant={item.variant}>
                              {item.status}
                            </Status>
                          </Item>
                        ))}
                      </ItemGroup>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                  <SectionHeader>
                    <SectionHeaderContent>
                      <SectionHeaderTitle>Ops focus</SectionHeaderTitle>
                    </SectionHeaderContent>
                  </SectionHeader>
                  <Card>
                    <CardContent className="flex flex-col gap-[length:var(--uds-gap-16)]">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Close the week strong</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Review aging credential packets and confirm starts for next week before Friday close.
                        </p>
                      </div>
                      <Button className="w-full sm:w-auto">Review action queue</Button>
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
