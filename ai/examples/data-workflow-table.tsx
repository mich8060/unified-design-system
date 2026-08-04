import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Button,
  Card,
  CardContent,
  DotsThreeVerticalIcon,
  Filterbar,
  FilterbarActions,
  FilterbarFacets,
  FilterbarFilters,
  FilterbarSearch,
  FilterbarToolbar,
  MainContent,
  MainStack,
  Menu,
  PageHeader,
  PageHeaderBody,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
  SearchInput,
  SlidersIcon,
  SortAscendingIcon,
  Status,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "jobs", label: "Jobs" },
  { id: "clinicians", label: "Clinicians" },
]

const rows = [
  {
    role: "Hospitalist - MD",
    facility: "Mercy General",
    status: "Interviewing" as const,
    owner: "A. Patel",
    start: "Aug 12",
  },
  {
    role: "ED Night - NP",
    facility: "Lakeside Medical",
    status: "Credentialing" as const,
    owner: "J. Kim",
    start: "Sep 2",
  },
  {
    role: "Anesthesia - CRNA",
    facility: "Summit Ortho",
    status: "Offer out" as const,
    owner: "R. Diaz",
    start: "Aug 28",
  },
  {
    role: "ICU - RN",
    facility: "Coastal Health",
    status: "Sourcing" as const,
    owner: "M. Chen",
    start: "Sep 15",
  },
]

/**
 * Data-heavy workflow: edge MainContent, PageHeader → Filterbar → one dominant full-width Table.
 * Teaches when full width is correct — not a stack of skinny Cards.
 */
export function DataWorkflowTableExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={<Menu navigationItems={navigationItems} activeId="jobs" onNavigationSelect={() => {}} />}
      >
        <AppShell.Main>
          <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
            <PageHeader layout="inline">
              <PageHeaderBody>
                <PageHeaderContent>
                  <PageHeaderTitle>Open jobs</PageHeaderTitle>
                  <PageHeaderDescription>
                    A dominant collection workflow stays full width: Filterbar plus one primary table —
                    not a stack of narrow Cards.
                  </PageHeaderDescription>
                </PageHeaderContent>
              </PageHeaderBody>
            </PageHeader>

            <MainStack>
              <Filterbar>
                <FilterbarToolbar>
                  <FilterbarSearch>
                    <SearchInput
                      surface="primary"
                      placeholder="Search jobs…"
                      aria-label="Search jobs"
                    />
                    <FilterbarFilters>
                      <Button type="button" variant="outline" size="icon" aria-label="Filters">
                        <SlidersIcon className="size-5" weight="bold" aria-hidden />
                      </Button>
                      <Button type="button" variant="outline" size="icon" aria-label="Sort">
                        <SortAscendingIcon className="size-5" weight="bold" aria-hidden />
                      </Button>
                    </FilterbarFilters>
                  </FilterbarSearch>
                  <FilterbarActions>
                    <Button type="button" variant="outline">
                      Export
                    </Button>
                    <Button type="button">New job</Button>
                    <Button type="button" variant="outline" size="icon" aria-label="More actions">
                      <DotsThreeVerticalIcon className="size-5" weight="bold" aria-hidden />
                    </Button>
                  </FilterbarActions>
                </FilterbarToolbar>
                <FilterbarFacets>
                  <Button type="button" variant="secondary" size="sm" aria-label="Remove filter: Open">
                    Open
                  </Button>
                  <Button type="button" variant="secondary" size="sm" aria-label="Remove filter: This quarter">
                    This quarter
                  </Button>
                </FilterbarFacets>
              </Filterbar>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Facility</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead className="w-0">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.role}>
                          <TableCell className="font-medium">{row.role}</TableCell>
                          <TableCell>{row.facility}</TableCell>
                          <TableCell>
                            <Status size="compact" variant="info">
                              {row.status}
                            </Status>
                          </TableCell>
                          <TableCell>{row.owner}</TableCell>
                          <TableCell>{row.start}</TableCell>
                          <TableCell className="w-0">
                            <Button variant="link" size="sm" className="px-0">
                              Open
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </MainStack>
          </MainContent>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
