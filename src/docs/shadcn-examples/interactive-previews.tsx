'use client'
/* @refresh reset */

import { useState, type CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogCopy,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@chghealthcare/unified-design-system'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@chghealthcare/unified-design-system'
import { Calendar } from '@chghealthcare/unified-design-system'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  ChartContainer,
  type ChartConfig,
} from '@chghealthcare/unified-design-system'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@chghealthcare/unified-design-system'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@chghealthcare/unified-design-system'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@chghealthcare/unified-design-system'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@chghealthcare/unified-design-system'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@chghealthcare/unified-design-system'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@chghealthcare/unified-design-system'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chghealthcare/unified-design-system'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@chghealthcare/unified-design-system'
import { DoctorAvatar } from '@/components/ui/doctor-avatar'
import {
  cn,
  DiamondsFourIcon,
  EnvelopeIcon,
  LayoutIcon,
  ListIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  WarningCircleIcon,
} from '@chghealthcare/unified-design-system'
import { type DateRange } from 'react-day-picker'

export function ExampleCanvas({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative z-10 rounded-lg border border-border bg-card p-6 text-card-foreground',
        className,
      )}
    >
      {children}
    </div>
  )
}

const dialogWidthExamples = [
  { label: 'Small (sm:max-w-sm)', widthClass: 'sm:max-w-sm' },
  { label: 'Medium (sm:max-w-md)', widthClass: 'sm:max-w-md' },
  { label: 'Large (sm:max-w-lg)', widthClass: 'sm:max-w-lg' },
  { label: 'XL (sm:max-w-xl)', widthClass: 'sm:max-w-xl' },
  { label: '2XL (sm:max-w-2xl)', widthClass: 'sm:max-w-2xl' },
] as const

export function DialogVariants() {
  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-2xl text-sm text-muted-foreground">
        Pass{' '}
        <code className="font-mono text-xs text-foreground">className</code> on{' '}
        <code className="font-mono text-xs text-foreground">DialogContent</code> — e.g.{' '}
        <code className="font-mono text-xs text-foreground">sm:max-w-lg</code> — to set max width per
        dialog. Defaults use <code className="font-mono text-xs text-foreground">sm:max-w-sm</code>.
      </p>
      <div className="flex flex-wrap gap-2">
        {dialogWidthExamples.map(({ label, widthClass }) => (
          <Dialog key={widthClass}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                {label}
              </Button>
            </DialogTrigger>
            <DialogContent className={widthClass}>
              <DialogHeader>
                <DialogTitle>{label}</DialogTitle>
                <DialogDescription>
                  This panel uses{' '}
                  <code className="font-mono text-xs text-foreground">{widthClass}</code> on{' '}
                  <code className="font-mono text-xs text-foreground">DialogContent</code>. Still full
                  width below <code className="font-mono text-xs text-foreground">sm</code> with{' '}
                  <code className="font-mono text-xs text-foreground">max-w-[calc(100%-2rem)]</code> from
                  the primitive. Esc or the close control dismisses.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

export function AlertDialogVariants() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" size="sm">
          Delete item
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia icon={<WarningCircleIcon weight="bold" aria-hidden />} />
          <AlertDialogCopy>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogCopy>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/** Compact (320px) layout — title and description sit directly under media; no AlertDialogCopy. */
export function AlertDialogCompactVariants() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Open compact dialog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia icon={<WarningCircleIcon weight="bold" aria-hidden />} />
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/** Figma Buttons=Single — Continue only; Cancel is omitted at runtime. */
export function AlertDialogSingleButtonVariants() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Confirm action
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent buttons="single">
        <AlertDialogHeader>
          <AlertDialogMedia icon={<WarningCircleIcon weight="bold" aria-hidden />} />
          <AlertDialogCopy>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogCopy>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/**
 * Inline shell for the welcome card preview: same structure and UDS classes as
 * {@link AlertDialogVariants} / {@link UdsAlertDialogContent}, without portal or Radix root
 * (preview is inert and non-interactive).
 */
export function AlertDialogWelcomePreviewInner() {
  return (
    <div className="flex w-full justify-center">
      <div
        data-size="default"
        data-slot="alert-dialog-content"
        className={cn(
          'group/alert-dialog-content relative box-border flex w-full max-w-[400px] shrink-0 flex-col gap-0 overflow-hidden rounded-[length:var(--uds-radius-8)] border border-[var(--uds-border-secondary)] bg-[var(--uds-surface-primary)] text-[var(--uds-text-primary)] shadow-lg',
        )}
      >
        <AlertDialogHeader>
          <AlertDialogMedia icon={<WarningCircleIcon weight="bold" aria-hidden />} />
          <AlertDialogCopy>
            <h2
              data-slot="alert-dialog-title"
              className="w-full font-sans text-base font-semibold leading-normal text-[var(--uds-text-primary)] [font-family:var(--font-inter)]"
            >
              Are you sure?
            </h2>
            <p
              data-slot="alert-dialog-description"
              className="w-full font-sans text-sm font-normal leading-normal text-[var(--uds-text-secondary)] [font-family:var(--font-inter)]"
            >
              This action cannot be undone.
            </p>
          </AlertDialogCopy>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="button">Continue</Button>
        </AlertDialogFooter>
      </div>
    </div>
  )
}

export function EmptyVariants() {
  return (
    <div className="flex justify-center">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia className="[--uds-chrome-media-radius:9999px] [--uds-empty-media-bg:var(--uds-color-accent-blue-100)] [--uds-empty-media-fg:var(--uds-color-accent-blue-700)] dark:[--uds-empty-media-bg-dark:color-mix(in_srgb,var(--uds-color-accent-blue-900)_45%,transparent)] dark:[--uds-empty-media-fg-dark:var(--uds-color-accent-blue-200)]">
            <EnvelopeIcon weight="regular" aria-hidden />
          </EmptyMedia>
          <EmptyTitle>No messages</EmptyTitle>
          <EmptyDescription>Inbox is clear for now.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}

export function EmptySingleAction() {
  return (
    <div className="flex justify-center">
      <Empty className="max-w-md gap-6">
        <EmptyHeader>
          <EmptyMedia className="[--uds-chrome-media-radius:9999px] [--uds-empty-media-bg:var(--uds-color-accent-blue-100)] [--uds-empty-media-fg:var(--uds-color-accent-blue-700)] dark:[--uds-empty-media-bg-dark:color-mix(in_srgb,var(--uds-color-accent-blue-900)_45%,transparent)] dark:[--uds-empty-media-fg-dark:var(--uds-color-accent-blue-200)]">
            <EnvelopeIcon weight="regular" aria-hidden />
          </EmptyMedia>
          <EmptyTitle>No messages</EmptyTitle>
          <EmptyDescription>Inbox is clear for now.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Compose message</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export function EmptyTwoActions() {
  return (
    <div className="flex justify-center">
      <Empty className="max-w-md gap-6">
        <EmptyHeader>
          <EmptyMedia className="[--uds-chrome-media-radius:9999px] [--uds-empty-media-bg:var(--uds-color-accent-blue-100)] [--uds-empty-media-fg:var(--uds-color-accent-blue-700)] dark:[--uds-empty-media-bg-dark:color-mix(in_srgb,var(--uds-color-accent-blue-900)_45%,transparent)] dark:[--uds-empty-media-fg-dark:var(--uds-color-accent-blue-200)]">
            <EnvelopeIcon weight="regular" aria-hidden />
          </EmptyMedia>
          <EmptyTitle>Nothing queued</EmptyTitle>
          <EmptyDescription>Send a note now or import conversations from another inbox.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="sm:flex-row sm:justify-center">
          <Button>Start message</Button>
          <Button variant="outline">Import messages</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export function EmptySearch404() {
  return (
    <div className="flex justify-center">
      <Empty className="min-h-[360px] max-w-lg p-10">
        <EmptyHeader className="max-w-md">
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-[320px] gap-4">
          <InputGroup>
            <InputGroupAddon>
              <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            </InputGroupAddon>
            <InputGroupInput placeholder="Try searching for pages..." aria-label="Search for pages" />
            <InputGroupAddon align="inline-end" className="px-3 text-muted-foreground">
              /
            </InputGroupAddon>
          </InputGroup>
          <p className="text-center font-sans text-uds-16 font-uds-regular text-uds-text-tertiary">
            Need help?{' '}
            <a className="underline underline-offset-4 hover:text-foreground" href="#">
              Contact support
            </a>
          </p>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export function SheetSidePreview() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Open sheet
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet panel</SheetTitle>
          <SheetDescription>Slides in from the chosen side (here: right).</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export function DrawerVariants() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Open drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Bottom sheet pattern, often used on small viewports.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DropdownVariants() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function PopoverVariants() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <p className="text-sm text-muted-foreground">Popover content stays anchored to the trigger.</p>
      </PopoverContent>
    </Popover>
  )
}

export function TooltipVariants() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" variant="ghost" size="sm">
          Hover me
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip copy</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function CalendarSingleDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start">
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border shadow-sm" />
      <p className="text-sm text-muted-foreground">
        Selected: {date ? date.toDateString() : 'none'}
      </p>
    </div>
  )
}

/** Welcome strip only: calendar only, centered with 48px offset from strip top (see welcome-card-preview). */
export function CalendarWelcomePreviewInner() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="flex w-full justify-center">
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border shadow-sm" />
    </div>
  )
}

export function CalendarRangeDemo() {
  const [range, setRange] = useState<DateRange | undefined>()
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-lg border shadow-sm"
    />
  )
}

const chartData = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function ChartBarDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full max-w-md">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

const comboItems = [
  { value: 'next', label: 'Next.js' },
  { value: 'vite', label: 'Vite' },
  { value: 'remix', label: 'Remix' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'svelte', label: 'SvelteKit' },
  { value: 'astro', label: 'Astro' },
]

/** Root `items` is required for list filtering and for `ComboboxEmpty` (see Base UI Combobox docs). */
const comboItemValues = comboItems.map((item) => item.value)

export function ComboboxDemo() {
  const [value, setValue] = useState<string | null>(null)
  return (
    <Combobox value={value} onValueChange={setValue} items={comboItemValues}>
      <ComboboxInput placeholder="Pick a framework…" className="w-[240px]" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No results.</ComboboxEmpty>
          <ComboboxGroup>
            {comboItems.map((item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function CommandInlineDemo() {
  return (
    <Command className="max-h-56 border shadow-md">
      <CommandInput placeholder="Search…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

const DEMO_SIDEBAR_EXPANDED_PX = 280
const DEMO_SIDEBAR_MINIMIZED_PX = 72

/**
 * Doc-shell-shaped app layout: controlled `collapsible="icon"`, 280px / 72px rail, header + nav + footer + inset.
 * The outer wrapper uses a transform so the sidebar’s `position: fixed` layer stays inside the rounded preview.
 */
export function SidebarLayoutDemo({ className }: { className?: string } = {}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  return (
    <div
      className={cn(
        'relative h-full min-h-[20rem] w-full max-w-4xl overflow-hidden rounded-xl border border-neutral-200 bg-white [transform:translateZ(0)] dark:border-neutral-800 dark:bg-neutral-950',
        className,
      )}
      aria-label="App shell preview"
    >
      <SidebarProvider
        open={sidebarExpanded}
        onOpenChange={setSidebarExpanded}
        className="flex h-full min-h-0 w-full flex-col bg-white font-sans text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
        style={
          {
            '--sidebar-width': `${DEMO_SIDEBAR_EXPANDED_PX}px`,
            '--sidebar-width-icon': `${DEMO_SIDEBAR_MINIMIZED_PX}px`,
          } as CSSProperties
        }
      >
        <div className="relative flex h-full min-h-0 w-full flex-col">
          <div className="flex h-full min-h-0 w-full flex-1">
            <div
              className={cn('contents', !sidebarExpanded && 'group/collapsed-rail')}
            >
              <Sidebar
                id="sidebar-demo-shell"
                collapsible="icon"
                className="z-30 border-neutral-200 dark:border-neutral-800 [&_[data-sidebar=sidebar]]:bg-white dark:[&_[data-sidebar=sidebar]]:bg-neutral-950"
              >
                <SidebarHeader className="border-0 p-0">
                  {sidebarExpanded ? (
                    <div className="relative h-14 shrink-0 border-b border-neutral-200 dark:border-neutral-800">
                      <button
                        type="button"
                        aria-label="Minimize navigation"
                        aria-controls="sidebar-demo-shell"
                        aria-expanded={sidebarExpanded}
                        onClick={() => setSidebarExpanded(false)}
                        className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                      >
                        <ListIcon className="h-5 w-5" aria-hidden />
                      </button>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          Acme Docs
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-14 shrink-0 border-b border-neutral-200 dark:border-neutral-800">
                      <button
                        type="button"
                        aria-label="Expand navigation"
                        aria-controls="sidebar-demo-shell"
                        aria-expanded={sidebarExpanded}
                        onClick={() => setSidebarExpanded(true)}
                        className={cn(
                          'peer absolute left-1/2 top-1/2 z-20 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md text-neutral-500 transition-opacity duration-200 ease-out',
                          'pointer-events-none opacity-0',
                          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100',
                          'group-hover/collapsed-rail:pointer-events-auto group-hover/collapsed-rail:opacity-100',
                          'focus-visible:pointer-events-auto focus-visible:opacity-100',
                        )}
                      >
                        <ListIcon className="h-5 w-5" aria-hidden />
                      </button>
                      <div
                        className={cn(
                          'pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200 ease-out',
                          'opacity-100 group-hover/collapsed-rail:opacity-0 peer-focus-visible:opacity-0',
                        )}
                      >
                        <span className="flex size-9 items-center justify-center rounded-md text-sm font-bold text-neutral-900 dark:text-neutral-100">
                          A
                        </span>
                      </div>
                    </div>
                  )}
                </SidebarHeader>

                {sidebarExpanded ? (
                  <div className="shrink-0 border-b border-neutral-200 px-2 py-2 dark:border-neutral-800">
                    <div className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                      Workspace · Production
                    </div>
                  </div>
                ) : null}

                <SidebarContent className="min-h-0 flex-1 text-sm">
                  {sidebarExpanded ? (
                    <nav
                      className="flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto px-0 py-2"
                      aria-label="Example sections"
                    >
                      <div className="flex flex-col">
                        <div className="sticky top-0 z-[1] flex w-full items-center gap-2 border-y border-neutral-200 bg-white px-[20px] py-[12px] text-base font-medium text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
                          <LayoutIcon className="h-6 w-6 shrink-0 text-neutral-500 dark:text-neutral-400" aria-hidden />
                          <span>Getting Started</span>
                        </div>
                        <div className="flex flex-col pl-[32px]">
                          <span className="block border-l-2 border-neutral-200 px-[20px] py-2 text-[14px] text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                            Install
                          </span>
                          <span className="block border-l-2 border-black px-[20px] py-2 text-[14px] text-neutral-900 dark:border-white dark:text-neutral-100">
                            Usage
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="sticky top-0 z-[1] flex w-full items-center gap-2 border-y border-neutral-200 bg-white px-[20px] py-[12px] text-base font-medium text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
                          <SquaresFourIcon className="h-6 w-6 shrink-0 text-neutral-500 dark:text-neutral-400" aria-hidden />
                          <span>Foundations</span>
                        </div>
                        <div className="flex flex-col pl-[32px]">
                          <span className="block border-l-2 border-neutral-200 px-[20px] py-2 text-[14px] text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                            Colors
                          </span>
                          <span className="block border-l-2 border-neutral-200 px-[20px] py-2 text-[14px] text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                            Typography
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="sticky top-0 z-[1] flex w-full items-center gap-2 border-y border-neutral-200 bg-white px-[20px] py-[12px] text-base font-medium text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
                          <DiamondsFourIcon className="h-6 w-6 shrink-0 text-neutral-500 dark:text-neutral-400" aria-hidden />
                          <span>Components</span>
                        </div>
                        <div className="flex flex-col pl-[32px]">
                          <span className="block border-l-2 border-neutral-200 px-[20px] py-2 text-[14px] text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                            Button
                          </span>
                          <span className="block border-l-2 border-neutral-200 px-[20px] py-2 text-[14px] text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                            Dialog
                          </span>
                        </div>
                      </div>
                    </nav>
                  ) : (
                    <div className="flex min-h-0 flex-1 flex-col items-center gap-1 overflow-y-auto py-2">
                      <button
                        type="button"
                        title="Getting Started"
                        className="flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
                      >
                        <LayoutIcon className="h-6 w-6 shrink-0" aria-hidden />
                      </button>
                      <button
                        type="button"
                        title="Foundations"
                        className="flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
                      >
                        <SquaresFourIcon className="h-6 w-6 shrink-0" aria-hidden />
                      </button>
                      <button
                        type="button"
                        title="Components"
                        className="flex size-12 shrink-0 items-center justify-center rounded-[4px] text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
                      >
                        <DiamondsFourIcon className="h-6 w-6 shrink-0" aria-hidden />
                      </button>
                    </div>
                  )}
                </SidebarContent>

                <SidebarFooter className="mt-auto shrink-0 p-0">
                  {sidebarExpanded ? (
                    <div className="shrink-0">
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-2 px-4 py-3 text-left outline-none',
                          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                          'focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600',
                        )}
                      >
                        <DoctorAvatar
                          className="shrink-0"
                          size="xs"
                          doctor="emily"
                          fallback="EB"
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1 truncate text-[14px] font-normal text-neutral-700 dark:text-neutral-300">
                          Emily Brown
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex shrink-0 justify-center py-2">
                      <button
                        type="button"
                        aria-label="Account"
                        title="Emily Brown"
                        className={cn(
                          'rounded-md p-1 outline-none',
                          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                          'focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600',
                        )}
                      >
                        <DoctorAvatar
                          className="shrink-0"
                          size="xs"
                          doctor="emily"
                          fallback="EB"
                          aria-hidden
                        />
                      </button>
                    </div>
                  )}
                </SidebarFooter>
              </Sidebar>
            </div>

            <SidebarInset className="min-h-0 min-w-0 bg-white dark:bg-neutral-950">
              <header className="flex h-12 shrink-0 items-center gap-2 border-b border-neutral-200 px-3 dark:border-neutral-800 md:h-14 md:px-4">
                <SidebarTrigger />
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Dashboard</span>
              </header>
              <div className="flex flex-1 flex-col gap-3 overflow-auto p-4 text-sm text-neutral-600 dark:text-neutral-400">
                <p>
                  Same shell pattern as the documentation site:{' '}
                  <span className="font-mono text-xs">SidebarProvider</span> with{' '}
                  <span className="font-mono text-xs">open</span> /{' '}
                  <span className="font-mono text-xs">onOpenChange</span>,{' '}
                  <span className="font-mono text-xs">collapsible=&quot;icon&quot;</span>, and 280px / 72px CSS
                  variables. The main region uses <span className="font-mono text-xs">SidebarInset</span>; put{' '}
                  <span className="font-mono text-xs">SidebarTrigger</span> in the header for sheet / keyboard
                  users.
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                  This preview is wrapped with <span className="font-mono">translateZ(0)</span> so the sidebar’s
                  fixed rail does not cover the whole viewport.
                </p>
              </div>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
