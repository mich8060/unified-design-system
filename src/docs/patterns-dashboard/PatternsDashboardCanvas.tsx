import {
    ArrowUpIcon,
    BellIcon,
    BookmarkIcon,
    BuildingsIcon,
    CalendarBlankIcon,
    CurrencyCircleDollarIcon,
    DotsThreeVerticalIcon,
    FileTextIcon,
    GearSixIcon,
    QuestionIcon,
    SquaresFourIcon,
    UsersThreeIcon,
} from '@chghealthcare/unified-design-system'
import { useState } from 'react'
import {
    AppShell,
    Avatar,
    AvatarFallback,
    Badge,
    Button,
    Card,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    Footer,
    Menu,
    MicroCalendar,
    Separator,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    type MicroCalendarDateData,
} from '@chghealthcare/unified-design-system'
import './patterns-dashboard.css'

const CRM_NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: SquaresFourIcon },
    { id: 'prospects', label: 'Prospects', icon: UsersThreeIcon },
    { id: 'clients', label: 'Clients', icon: BuildingsIcon },
    { id: 'deals', label: 'Deals', icon: CurrencyCircleDollarIcon },
    { id: 'appointments', label: 'Appointments', icon: CalendarBlankIcon },
    { id: 'invoices', label: 'Invoices', icon: FileTextIcon },
    { id: 'settings', label: 'Settings', icon: GearSixIcon },
]

const prospects = [
    {
        name: 'Chandler Bing',
        detail: 'Enterprise · SaaS',
        contacted: 'Nov 2, 2025',
        status: 'qualified' as const,
    },
    {
        name: 'Monica Geller',
        detail: 'SMB · Retail',
        contacted: 'Nov 1, 2025',
        status: 'hot' as const,
    },
    {
        name: 'Ross Geller',
        detail: 'Academic',
        contacted: 'Oct 28, 2025',
        status: 'qualified' as const,
    },
]

/** Demo "today" for {@link MicroCalendar} (April 1, 2026). */
const patternsDashboardCalendarToday = new Date(2026, 3, 1)

const patternsDashboardCalendarDateData: Record<string, MicroCalendarDateData> = {
    '2026-04-08': { onAssignment: true },
    '2026-04-10': { travel: true, onAssignment: true },
    '2026-04-14': { travel: true },
}

/* ── Dashboard canvas ── */

/**
 * Isolated CRM-style dashboard with the brand-aware {@link Menu} sidebar.
 */
export function PatternsDashboardCanvas() {
    const [activeNavId, setActiveNavId] = useState('dashboard')
    const [microCalendarMonth, setMicroCalendarMonth] = useState(() => new Date(2026, 3, 1))
    const [microCalendarValue, setMicroCalendarValue] = useState<Date | undefined>(() => new Date(2026, 3, 1))

    return (
        <div className="box-border min-h-0 w-full max-w-[1280px] font-sans">
            <p className="mb-3 text-sm text-[var(--uds-text-secondary)]">
                CRM dashboard preview: brand-aware <code className="rounded bg-[var(--uds-surface-tertiary)] px-1">Menu</code>{' '}
                sidebar with its standard header (collapse control + branding) and UDS tokens in the main canvas.
            </p>

            <div
                className="patterns-dashboard-frame"
            >
                <AppShell className="patterns-dashboard-root">
                    <AppShell.Menu>
                        <Menu
                            className="patterns-dashboard-menu"
                            defaultExpanded
                            aria-label="CRM navigation"
                            navigationItems={CRM_NAV_ITEMS}
                            activeId={activeNavId}
                            onNavigationSelect={(id) => setActiveNavId(id)}
                        />
                    </AppShell.Menu>
                    <AppShell.Header>
                        <>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button type="button" variant="ghost" size="icon" className="rounded-full" aria-label="Help">
                                        <QuestionIcon className="size-5" aria-hidden />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Help</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button type="button" variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
                                        <BellIcon className="size-5" aria-hidden />
                                        <span className="absolute top-1 right-1 size-2 rounded-full bg-[var(--uds-color-accent-red-500)] ring-2 ring-[var(--uds-surface-primary)]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Notifications</TooltipContent>
                            </Tooltip>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full px-0"
                                        aria-label="Account"
                                    >
                                        <Avatar size="sm" className="size-8">
                                            <AvatarFallback className="text-xs">MT</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    </AppShell.Header>
                    <AppShell.Main>
                        <div className="flex h-full min-h-0 min-w-0 flex-col bg-[var(--uds-surface-secondary)]">
                            <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
                            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                                <div>
                                    <h1 className="text-2xl font-semibold text-[var(--uds-text-primary)]">My performance over time</h1>
                                    <p className="max-w-2xl text-sm text-[var(--uds-text-tertiary)]">
                                        Revenue, pipeline health, and follow-ups for your book of business.
                                    </p>
                                </div>

                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <Card className="rounded-sm border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] py-4 ring-1 ring-[var(--uds-border-primary)]/60">
                                    <div className="px-4">
                                        <p className="text-xs font-medium tracking-wide text-[var(--uds-text-tertiary)]">Total revenue</p>
                                        <div className="mt-3 flex items-baseline gap-2">
                                            <p className="text-3xl font-semibold tabular-nums text-[var(--uds-text-primary)]">$2,445,744</p>
                                        </div>
                                        <Badge
                                            appearance="pastel"
                                            accent="emerald"
                                            shape="pill"
                                            className="mt-3"
                                            icon={<ArrowUpIcon className="size-3" aria-hidden />}
                                        >
                                            +8.2%
                                        </Badge>
                                    </div>
                                </Card>
                                <Card className="rounded-sm border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] py-4 ring-1 ring-[var(--uds-border-primary)]/60">
                                    <div className="px-4">
                                        <p className="text-xs font-medium tracking-wide text-[var(--uds-text-tertiary)]">Avg deal size</p>
                                        <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--uds-text-primary)]">$489,149</p>
                                    </div>
                                </Card>
                                <Card className="rounded-sm border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] py-4 ring-1 ring-[var(--uds-border-primary)]/60">
                                    <div className="px-4">
                                        <p className="text-xs font-medium tracking-wide text-[var(--uds-text-tertiary)]">Total clients</p>
                                        <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--uds-text-primary)]">5</p>
                                        <Badge appearance="pastel" accent="emerald" shape="pill" className="mt-3">
                                            +20%
                                        </Badge>
                                    </div>
                                </Card>
                                <Card className="rounded-sm border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] py-4 ring-1 ring-[var(--uds-border-primary)]/60">
                                    <div className="px-4">
                                        <p className="text-xs font-medium tracking-wide text-[var(--uds-text-tertiary)]">Total invoices</p>
                                        <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--uds-text-primary)]">31</p>
                                        <Badge appearance="pastel" accent="red" shape="pill" className="mt-3">
                                            +8.2%
                                        </Badge>
                                    </div>
                                </Card>
                            </div>

                            <div className="mt-6 grid min-h-0 gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.85fr)]">
                                <Card className="min-h-[280px] rounded-sm border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] py-4 ring-1 ring-[var(--uds-border-primary)]/60">
                                    <div className="flex items-center justify-between gap-2 px-4">
                                        <p className="text-lg font-semibold text-[var(--uds-text-primary)]">Prospects to watch</p>
                                        <Button type="button" variant="ghost" size="sm" className="text-[var(--uds-text-link-primary-default)]">
                                            View all
                                        </Button>
                                    </div>
                                    <Separator className=" bg-[var(--uds-border-primary)]" />
                                    <ul className="flex flex-col gap-0">
                                        {prospects.map((p, i) => (
                                            <li key={p.name}>
                                                {i > 0 ? <Separator className="my-1 bg-[var(--uds-border-primary)]" /> : null}
                                                <div className="flex flex-wrap items-start gap-3 rounded-xl px-4 py-1 hover:bg-[var(--uds-surface-secondary)]">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-medium text-[var(--uds-text-primary)]">{p.name}</p>
                                                        <p className="mt-0.5 text-xs text-[var(--uds-text-tertiary)]">{p.detail}</p>
                                                        <p className="mt-2 text-xs text-[var(--uds-text-secondary)]">Last contacted {p.contacted}</p>
                                                    </div>
                                                    <div className="flex shrink-0 flex-col items-end gap-2">
                                                        {p.status === 'qualified' ? (
                                                            <Badge appearance="pastel" accent="cyan" shape="pill">
                                                                Qualified
                                                            </Badge>
                                                        ) : (
                                                            <Badge appearance="pastel" accent="orange" shape="pill">
                                                                Hot
                                                            </Badge>
                                                        )}
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button type="button" variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${p.name}`}>
                                                                    <DotsThreeVerticalIcon className="size-5" aria-hidden />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>Open</DropdownMenuItem>
                                                                <DropdownMenuItem>Assign</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>

                                <div className="min-w-0">
                                    <MicroCalendar
                                        className="w-full max-w-none"
                                        today={patternsDashboardCalendarToday}
                                        month={microCalendarMonth}
                                        onMonthChange={setMicroCalendarMonth}
                                        value={microCalendarValue}
                                        onDateSelect={setMicroCalendarValue}
                                        dateData={patternsDashboardCalendarDateData}
                                        aria-label="Schedule"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 rounded-sm border border-dashed border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)]/60 px-4 py-6 text-center">
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia className="[--uds-chrome-media-radius:9999px] [--uds-empty-media-bg:var(--uds-color-accent-blue-100)] [--uds-empty-media-fg:var(--uds-color-accent-blue-700)] dark:[--uds-empty-media-bg-dark:color-mix(in_srgb,var(--uds-color-accent-blue-900)_45%,transparent)] dark:[--uds-empty-media-fg-dark:var(--uds-color-accent-blue-200)]">
                                            <BookmarkIcon weight="duotone" aria-hidden />
                                        </EmptyMedia>
                                        <EmptyTitle>Bookmarked prospects</EmptyTitle>
                                        <EmptyDescription>Pin records here to track them across sessions.</EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </div>
                        </div>
                        </div>
                    </AppShell.Main>
                    <AppShell.Footer>
                        <Footer
                            links={[
                                { label: 'Privacy Policy', href: '#privacy' },
                                { label: 'Terms & Conditions', href: '#terms' },
                            ]}
                        />
                    </AppShell.Footer>
                </AppShell>
            </div>

        </div>
    )
}
