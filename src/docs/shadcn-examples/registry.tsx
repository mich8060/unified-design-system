'use client'
/* @refresh reset */

import * as React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@chghealthcare/unified-design-system'
import {
    Alert,
    AlertContent,
    AlertDescription,
    AlertTitle,
} from '@chghealthcare/unified-design-system'
import { AspectRatio } from '@chghealthcare/unified-design-system'
import {
    Avatar,
    AvatarCameraAction,
    AvatarFallback,
    AvatarStatus,
} from '@chghealthcare/unified-design-system'
import { DoctorAvatar } from '@/components/ui/doctor-avatar'
import {
    BADGE_ACCENTS,
    Badge,
    Branding,
    type BadgeAppearance,
    type BrandingAppearance,
} from '@chghealthcare/unified-design-system'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@chghealthcare/unified-design-system'
import { Button } from '@chghealthcare/unified-design-system'
import { ButtonGroup } from '@chghealthcare/unified-design-system'
import {
    Card,
    CardContent,
    CardFooter,
    CardImage,
} from '@chghealthcare/unified-design-system'
import { Checkbox, CheckboxLabel } from '@chghealthcare/unified-design-system'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@chghealthcare/unified-design-system'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@chghealthcare/unified-design-system'
import { DirectionProvider } from '@chghealthcare/unified-design-system'
import { DotStatus, DOT_STATUS_VARIANTS } from '@chghealthcare/unified-design-system'
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@chghealthcare/unified-design-system'
import { FileUpload, FileUploadCards } from '@chghealthcare/unified-design-system'
import { Footer } from '@chghealthcare/unified-design-system'
import { Header } from '@chghealthcare/unified-design-system'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@chghealthcare/unified-design-system'
import {
    CheckList,
    CheckListControl,
    CheckListItem,
    DateInput,
    DateRangeInput,
    DescriptionDetail,
    DescriptionList,
    DescriptionRow,
    DescriptionTerm,
    Input,
    Link,
    NumberInput,
    PasswordInput,
    PhoneInput,
    ProgressCircle,
    ProgressCircles,
    SearchInput,
    SectionHeader,
    SectionHeaderActions,
    SectionHeaderContent,
    SectionHeaderDescription,
    SectionHeaderTitle,
    StatisticCard,
    Statistics,
    StatisticHint,
    StatisticLabel,
    StatisticValue,
    Status,
    Step,
    StepContent,
    StepDescription,
    StepMarker,
    StepTitle,
    Steps,
    TimeInput,
    TimeStepInput,
    TokenInput,
    Toolbar,
    ToolbarDivider,
    ToolbarGroup,
    UrlInput,
} from '@chghealthcare/unified-design-system'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@chghealthcare/unified-design-system'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@chghealthcare/unified-design-system'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@chghealthcare/unified-design-system'
import { Kbd, KbdGroup } from '@chghealthcare/unified-design-system'
import { Label, Layout, RadioGroupLabel } from '@chghealthcare/unified-design-system'
import {
    MEDALLION_COLORS,
    Medallion,
    type MedallionShape,
    type MedallionSize,
} from '@chghealthcare/unified-design-system'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from '@chghealthcare/unified-design-system'
import { NativeSelect, NativeSelectOption } from '@chghealthcare/unified-design-system'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@chghealthcare/unified-design-system'
import {
    getPaginationPages,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationJump,
    PaginationLast,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@chghealthcare/unified-design-system'
import { Progress } from '@chghealthcare/unified-design-system'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@chghealthcare/unified-design-system'
import { RadioGroup, RadioGroupItem } from '@chghealthcare/unified-design-system'
import {
    MicroCalendar,
    MicroCalendarTile,
    type MicroCalendarDateData,
} from '@chghealthcare/unified-design-system/micro-calendar'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@chghealthcare/unified-design-system/resizable'
import { ScrollArea } from '@chghealthcare/unified-design-system'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@chghealthcare/unified-design-system'
import { Separator } from '@chghealthcare/unified-design-system'
import { Skeleton } from '@chghealthcare/unified-design-system'
import { Spinner } from '@chghealthcare/unified-design-system'
import { Slider } from '@chghealthcare/unified-design-system'
import { Switch } from '@chghealthcare/unified-design-system'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@chghealthcare/unified-design-system'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@chghealthcare/unified-design-system'
import { Text, Textarea } from '@chghealthcare/unified-design-system'
import { Toggle } from '@chghealthcare/unified-design-system'
import { ToggleGroup, ToggleGroupItem } from '@chghealthcare/unified-design-system'
import { cn } from '@chghealthcare/unified-design-system'
import {
    ArrowRightIcon,
    BellIcon,
    CaretDownIcon,
    CaretRightIcon,
    DownloadSimpleIcon,
    EnvelopeIcon,
    FileTextIcon,
    HouseIcon,
    Icon,
    InfoIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    QuestionIcon,
    UserIcon,
    SparkleIcon,
    TextBIcon,
    TextItalicIcon,
    WarningCircleIcon,
    CheckCircleIcon,
} from '@chghealthcare/unified-design-system'
import { toast } from 'sonner'
import type { ShadcnUiSlug } from '../shadcn-ui-registry'
import {
    AlertDialogVariants,
    AlertDialogCompactVariants,
    AlertDialogSingleButtonVariants,
    AlertDialogWelcomePreviewInner,
    CalendarRangeDemo,
    CalendarSingleDemo,
    CalendarWelcomePreviewInner,
    ChartBarDemo,
    ComboboxDemo,
    ComboboxCompactDemo,
    ComboboxDefaultDemo,
    CommandInlineDemo,
    DialogVariants,
    DialogWelcomePreviewInner,
    DrawerVariants,
    DropdownVariants,
    EmptyVariants,
    EmptySearch404,
    EmptySingleAction,
    EmptyTwoActions,
    ExampleCanvas,
    PopoverVariants,
    SheetSidePreview,
    SidebarLayoutDemo,
    TooltipVariants,
} from './interactive-previews'
import type { ShadcnExampleSection } from './types'

function CheckboxIndeterminateDemo() {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate')
    return (
        <div className="flex items-center gap-2">
            <Checkbox id="ex-ch-ind" checked={checked} onCheckedChange={setChecked} />
            <CheckboxLabel htmlFor="ex-ch-ind">Partial selection</CheckboxLabel>
        </div>
    )
}

function CollapsibleDemo() {
    const [openDividedFirst, setOpenDividedFirst] = React.useState(false)
    const [openDividedSecond, setOpenDividedSecond] = React.useState(false)
    const [openBoxed, setOpenBoxed] = React.useState(false)

    return (
        <div className="flex w-full max-w-full flex-col gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                    Divided · full-width list rows, hairline separators only
                </p>
                <div className="flex w-full flex-col">
                    <Collapsible
                        open={openDividedFirst}
                        onOpenChange={setOpenDividedFirst}
                        variant="divided"
                        className="w-full"
                    >
                        <CollapsibleTrigger className="flex items-center gap-4">
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                <div
                                    className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
                                    aria-hidden
                                >
                                    <FileTextIcon className="size-5" weight="duotone" />
                                </div>
                                <div className="min-w-0 flex-1 text-left">
                                    <p className="font-medium text-foreground">Credential packet</p>
                                    <p className="text-sm font-normal text-muted-foreground">
                                        PDF · 12 pages · last updated Apr 2
                                    </p>
                                </div>
                                <Badge variant="secondary" shape="rect" className="shrink-0">
                                    Needs review
                                </Badge>
                            </div>
                            <CaretDownIcon
                                className={cn(
                                    'size-4 shrink-0 text-muted-foreground transition-transform',
                                    openDividedFirst && 'rotate-180',
                                )}
                            />
                        </CollapsibleTrigger>
                        <CollapsibleContent contentClassName="text-muted-foreground">
                            <p>
                                Divided variant keeps the chrome minimal: the trigger is flush with the page width and
                                only horizontal rules separate stacked sections.
                            </p>
                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible
                        open={openDividedSecond}
                        onOpenChange={setOpenDividedSecond}
                        variant="divided"
                        className="w-full"
                    >
                        <CollapsibleTrigger className="flex items-center gap-4">
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                <div
                                    className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
                                    aria-hidden
                                >
                                    <BellIcon className="size-5" weight="duotone" />
                                </div>
                                <div className="min-w-0 flex-1 text-left">
                                    <p className="font-medium text-foreground">Notification defaults</p>
                                    <p className="text-sm font-normal text-muted-foreground">
                                        Email digest, SMS, and in-app banners
                                    </p>
                                </div>
                                <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                                    3 channels
                                </span>
                            </div>
                            <CaretDownIcon
                                className={cn(
                                    'size-4 shrink-0 text-muted-foreground transition-transform',
                                    openDividedSecond && 'rotate-180',
                                )}
                            />
                        </CollapsibleTrigger>
                        <CollapsibleContent contentClassName="text-muted-foreground">
                            <p>
                                Stack as many as you need — the last row drops the bottom border so the list matches
                                accordion <code className="font-mono text-xs text-foreground">divided</code> items.
                            </p>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                    Boxed · framed block, header rule only while open
                </p>
                <Collapsible open={openBoxed} onOpenChange={setOpenBoxed} variant="boxed" className="w-full">
                    <CollapsibleTrigger className="flex items-center gap-4">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                            <div
                                className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
                                aria-hidden
                            >
                                <SparkleIcon className="size-5" weight="duotone" />
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                                <p className="font-medium text-foreground">Placement assistant</p>
                                <p className="text-sm font-normal text-muted-foreground">
                                    Locum tenens · 50 mi radius · boards & state filters applied
                                </p>
                            </div>
                            <Badge variant="outline" shape="pill" className="shrink-0">
                                Live preview
                            </Badge>
                        </div>
                        <CaretDownIcon
                            className={cn(
                                'size-4 shrink-0 text-muted-foreground transition-transform',
                                openBoxed && 'rotate-180',
                            )}
                        />
                    </CollapsibleTrigger>
                    <CollapsibleContent contentClassName="text-muted-foreground">
                        <p>
                            Boxed uses a bordered surface: the trigger sits on a solid header field (here, theme
                            background) and picks up a bottom border only when expanded so the panel reads as a
                            separate sheet underneath.
                        </p>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    )
}

function ContextMenuDemo() {
    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full max-w-md items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground outline-none select-none">
                Right-click here — includes a nested submenu
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
                <ContextMenuLabel>Navigation</ContextMenuLabel>
                <ContextMenuItem>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                    Forward
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                    <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        <ContextMenuItem>Duplicate</ContextMenuItem>
                        <ContextMenuItem>Move to…</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuSub>
                            <ContextMenuSubTrigger>Export</ContextMenuSubTrigger>
                            <ContextMenuSubContent>
                                <ContextMenuItem>PDF</ContextMenuItem>
                                <ContextMenuItem>PNG</ContextMenuItem>
                            </ContextMenuSubContent>
                        </ContextMenuSub>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

function InputIconExamples() {
    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <InputGroup>
                <InputGroupAddon>
                    <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </InputGroupAddon>
                <InputGroupInput placeholder="Search…" aria-label="Search" />
            </InputGroup>
            <InputGroup inputSize="sm">
                <InputGroupAddon>
                    <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </InputGroupAddon>
                <InputGroupInput inputSize="sm" placeholder="Compact search" aria-label="Compact search" />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon align="inline-start">
                    <EnvelopeIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </InputGroupAddon>
                <InputGroupInput type="email" placeholder="you@example.com" autoComplete="email" />
                <InputGroupAddon align="inline-end">
                    <UserIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

function HoverCardDemo() {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link" className="h-auto p-0 text-foreground">
                    Hover for profile
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 rounded-[4px]">
                <p className="text-sm font-medium">Preview card</p>
                <p className="mt-1 text-xs text-muted-foreground">Rich hover content lives here.</p>
            </HoverCardContent>
        </HoverCard>
    )
}

function MenubarDemo() {
    return (
        <Menubar className="max-w-fit">
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>New window</MenubarItem>
                    <MenubarItem>Open…</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Undo</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

function NavigationMenuDemo() {
    return (
        <NavigationMenu layout="popover" className="relative max-w-full justify-start">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] list-none gap-1 p-0">
                            <li>
                                <NavigationMenuLink href="#">Overview</NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink href="#">Guides</NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                        Reference
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function ResizableDemo() {
    return (
        <ResizablePanelGroup
            orientation="horizontal"
            className="max-w-md rounded-lg border"
            style={{ minHeight: 120 }}
        >
            <ResizablePanel defaultSize={50} minSize={20}>
                <div className="flex h-full items-center justify-center p-3 text-sm">Panel A</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={20}>
                <div className="flex h-full items-center justify-center p-3 text-sm text-muted-foreground">Panel B</div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

function DirectionRtlDemo() {
    return (
        <DirectionProvider dir="rtl">
            <div className="rounded-lg border p-4 text-sm">
                <p className="text-right">מלל לדוגמה — כיוון מימין לשמאל</p>
            </div>
        </DirectionProvider>
    )
}

function SelectBasicDemo() {
    return (
        <Select defaultValue="apple">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pick a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
        </Select>
    )
}

const selectSearchDemoItems = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'endocrinology', label: 'Endocrinology' },
    { value: 'gastroenterology', label: 'Gastroenterology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'oncology', label: 'Oncology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'radiology', label: 'Radiology' },
]

function SelectSearchableDemo() {
    return (
        <Select defaultValue="neurology">
            <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Choose a specialty" />
            </SelectTrigger>
            <SelectContent
                searchable
                searchPlaceholder="Filter specialties…"
                searchAriaLabel="Filter specialties"
            >
                {selectSearchDemoItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

function InputOTPDemo() {
    return (
        <InputOTP maxLength={6}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSeparator />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    )
}

function InputOTPCompactDemo() {
    return (
        <InputOTP maxLength={6}>
            <InputOTPGroup inputSize="sm" responsive={false}>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSeparator />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    )
}

/** `left` for absolutely positioned triggers so tooltips anchor to the fill edge (0–100). */
function progressIndicatorAnchorLeft(value: number) {
    return `${Math.min(100, Math.max(0, value))}%`
}

/** Info button stays fixed after the track; tooltip is positioned at the fill end via a non-interactive anchor. */
function ProgressDocInfoTooltipRow({
    value,
    label,
}: {
    value: number
    label: string
}) {
    const [open, setOpen] = React.useState(false)
    const tipId = React.useId()

    return (
        <div className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-neutral-800 dark:text-neutral-200">
                {label}
            </span>
            <div className="relative min-w-0 flex-1 py-0.5">
                <Progress value={value} className="w-full" />
                <Tooltip open={open} onOpenChange={setOpen}>
                    <TooltipTrigger asChild>
                        <span
                            className="pointer-events-none absolute top-1/2 h-px w-px -translate-x-1/2 -translate-y-1/2 opacity-0"
                            style={{ left: progressIndicatorAnchorLeft(value) }}
                            aria-hidden
                        />
                    </TooltipTrigger>
                    <TooltipContent
                        id={tipId}
                        side="top"
                        sideOffset={8}
                        align="center"
                        className="tabular-nums"
                        onPointerEnter={() => setOpen(true)}
                        onPointerLeave={() => setOpen(false)}
                    >
                        {value}% complete
                    </TooltipContent>
                </Tooltip>
            </div>
            <button
                type="button"
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-neutral-500 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-neutral-400 dark:hover:text-neutral-200"
                aria-label={`Progress detail: ${value}%`}
                aria-describedby={open ? tipId : undefined}
                onPointerEnter={() => setOpen(true)}
                onPointerLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
            >
                <InfoIcon className="size-4" weight="regular" aria-hidden />
            </button>
        </div>
    )
}

function PaginationDefaultDemo() {
    const pages = getPaginationPages(1, 10, 3)
    return (
        <Pagination variant="default" className="w-full max-w-xl justify-start">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                {pages.map((p, i) =>
                    p === 'ellipsis' ? (
                        <PaginationItem key={`e-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href="#"
                                isActive={p === 1}
                                onClick={(e) => e.preventDefault()}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

function PaginationLineDemo() {
    const pages = getPaginationPages(1, 10, 3)
    return (
        <Pagination variant="line" className="w-full max-w-xl justify-start">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                {pages.map((p, i) =>
                    p === 'ellipsis' ? (
                        <PaginationItem key={`e-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href="#"
                                isActive={p === 1}
                                onClick={(e) => e.preventDefault()}
                                className={p === 4 ? 'bg-muted/80' : undefined}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

function PaginationJumpDemo() {
    return (
        <Pagination variant="default" className="w-full max-w-xl justify-start">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        4
                    </PaginationLink>
                </PaginationItem>
                <PaginationJump totalPages={10} defaultValue={1} />
                <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        10
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

function PaginationLineJumpDemo() {
    return (
        <Pagination variant="line" className="w-full max-w-xl justify-start">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        4
                    </PaginationLink>
                </PaginationItem>
                <PaginationJump totalPages={10} defaultValue={1} />
                <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        10
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

function PaginationLineBoundaryDemo() {
    const pages = getPaginationPages(1, 10, 3)
    return (
        <Pagination variant="line" className="w-full max-w-xl justify-start">
            <PaginationContent>
                <PaginationItem>
                    <PaginationFirst href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                {pages.map((p, i) =>
                    p === 'ellipsis' ? (
                        <PaginationItem key={`e-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href="#"
                                isActive={p === 1}
                                onClick={(e) => e.preventDefault()}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLast href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

function PaginationSmallCountDemo() {
    const pages = [1, 2, 3, 4, 5] as const
    return (
        <Pagination variant="default" className="w-full max-w-xl justify-start">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
                {pages.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            href="#"
                            isActive={p === 2}
                            onClick={(e) => e.preventDefault()}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

function SliderSteppedDemo() {
    const [value, setValue] = React.useState([40])
    return (
        <div className="flex max-w-xs flex-col gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Level</span>
                <span className="tabular-nums text-foreground">{value[0]}</span>
            </div>
            <Slider
                value={value}
                onValueChange={setValue}
                max={100}
                step={10}
                className="w-full"
            />
            <p className="text-xs text-muted-foreground">
                Snaps every 10 from 0 to 100 while dragging or with arrow keys.
            </p>
        </div>
    )
}

function MicroCalendarMonthDemo() {
    const may2026 = React.useMemo(() => new Date(2026, 4, 1), [])
    const [value, setValue] = React.useState(() => new Date(2026, 4, 14))
    const dateData = React.useMemo<Record<string, MicroCalendarDateData>>(
        () => ({
            '2026-05-12': { onAssignment: true },
            '2026-05-13': { onAssignment: true, travel: true },
            '2026-05-14': { travel: true },
            '2026-05-15': { onAssignment: true, travel: true },
            '2026-05-16': { onAssignment: true },
        }),
        [],
    )
    const unavailableDates = React.useMemo(() => [new Date(2026, 4, 20)], [])
    return (
        <MicroCalendar
            month={may2026}
            value={value}
            onDateSelect={setValue}
            dateData={dateData}
            unavailableDates={unavailableDates}
        />
    )
}

function E(
    id: string,
    title: string,
    preview: React.ReactNode,
    code: string,
    description?: string,
    welcomePreviewInner?: React.ReactNode,
): ShadcnExampleSection {
    return {
        id,
        title,
        description,
        preview: <ExampleCanvas>{preview}</ExampleCanvas>,
        previewInner: preview,
        ...(welcomePreviewInner != null ? { welcomePreviewInner } : {}),
        code,
    }
}

const EXAMPLES: Record<ShadcnUiSlug, ShadcnExampleSection[]> = {
    accordion: [
        E(
            'boxed',
            'Border around the group (full width)',
            (
                <Accordion type="single" collapsible variant="boxed" className="w-full">
                    <AccordionItem value="a">
                        <AccordionTrigger>Section one</AccordionTrigger>
                        <AccordionContent>Content for the first section.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="b">
                        <AccordionTrigger>Section two</AccordionTrigger>
                        <AccordionContent>Content for the second section.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            ),
            `<Accordion type="single" collapsible variant="boxed" className="w-full">
  <AccordionItem value="a">
    <AccordionTrigger>Section one</AccordionTrigger>
    <AccordionContent>Content for the first section.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section two</AccordionTrigger>
    <AccordionContent>Content for the second section.</AccordionContent>
  </AccordionItem>
</Accordion>`,
        ),
        E(
            'boxed-filled',
            'Border with secondary surface fill (full width)',
            (
                <Accordion type="single" collapsible variant="boxed-filled" className="w-full">
                    <AccordionItem value="a">
                        <AccordionTrigger>Section one</AccordionTrigger>
                        <AccordionContent>Content for the first section.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="b">
                        <AccordionTrigger>Section two</AccordionTrigger>
                        <AccordionContent>Content for the second section.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            ),
            `<Accordion type="single" collapsible variant="boxed-filled" className="w-full">
  <AccordionItem value="a">
    <AccordionTrigger>Section one</AccordionTrigger>
    <AccordionContent>Content for the first section.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section two</AccordionTrigger>
    <AccordionContent>Content for the second section.</AccordionContent>
  </AccordionItem>
</Accordion>`,
        ),
        E(
            'divided',
            'Borders only between items (full width)',
            (
                <Accordion type="single" collapsible variant="divided" className="w-full">
                    <AccordionItem value="a">
                        <AccordionTrigger>Section one</AccordionTrigger>
                        <AccordionContent>Content for the first section.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="b">
                        <AccordionTrigger>Section two</AccordionTrigger>
                        <AccordionContent>Content for the second section.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            ),
            `<Accordion type="single" collapsible variant="divided" className="w-full">
  <AccordionItem value="a">
    <AccordionTrigger>Section one</AccordionTrigger>
    <AccordionContent>Content for the first section.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section two</AccordionTrigger>
    <AccordionContent>Content for the second section.</AccordionContent>
  </AccordionItem>
</Accordion>`,
        ),
        E(
            'multiple',
            'Multiple panels open (divided style)',
            (
                <Accordion type="multiple" variant="divided" className="w-full">
                    <AccordionItem value="x">
                        <AccordionTrigger>Alpha</AccordionTrigger>
                        <AccordionContent>Multiple mode allows several sections expanded.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="y">
                        <AccordionTrigger>Beta</AccordionTrigger>
                        <AccordionContent>Beta content.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            ),
            `<Accordion type="multiple" variant="divided" className="w-full">
  <AccordionItem value="x">
    <AccordionTrigger>Alpha</AccordionTrigger>
    <AccordionContent>Multiple mode allows several sections expanded.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="y">
    <AccordionTrigger>Beta</AccordionTrigger>
    <AccordionContent>Beta content.</AccordionContent>
  </AccordionItem>
</Accordion>`,
        ),
    ],
    alert: [
        E(
            'default',
            'Default',
            (
                <Alert className="max-w-md">
                    <Medallion color="sky" icon={<InfoIcon weight="bold" aria-hidden />} />
                    <AlertContent>
                        <AlertTitle>Note</AlertTitle>
                        <AlertDescription>Use alerts for inline status that doesn’t block the page.</AlertDescription>
                    </AlertContent>
                </Alert>
            ),
            `import { Medallion } from "@chghealthcare/unified-design-system"
<Alert className="max-w-md">
  <Medallion color="sky" icon={<InfoIcon weight="bold" aria-hidden />} />
  <AlertContent>
    <AlertTitle>Note</AlertTitle>
    <AlertDescription>Use alerts for inline status that doesn’t block the page.</AlertDescription>
  </AlertContent>
</Alert>`,
        ),
        E(
            'destructive',
            'Destructive',
            (
                <Alert variant="destructive" className="max-w-md">
                    <Medallion color="red" icon={<WarningCircleIcon weight="bold" aria-hidden />} />
                    <AlertContent>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Something went wrong. Try again.</AlertDescription>
                    </AlertContent>
                </Alert>
            ),
            `<Alert variant="destructive" className="max-w-md">
  <Medallion color="red" icon={<WarningCircleIcon weight="bold" aria-hidden />} />
  <AlertContent>
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>Something went wrong. Try again.</AlertDescription>
  </AlertContent>
</Alert>`,
        ),
        E(
            'warning',
            'Warning',
            (
                <Alert variant="warning" className="max-w-md">
                    <Medallion color="yellow" icon={<WarningCircleIcon weight="bold" aria-hidden />} />
                    <AlertContent>
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>Review this before you continue.</AlertDescription>
                    </AlertContent>
                </Alert>
            ),
            `<Alert variant="warning" className="max-w-md">
  <Medallion color="yellow" icon={<WarningCircleIcon weight="bold" aria-hidden />} />
  <AlertContent>
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>Review this before you continue.</AlertDescription>
  </AlertContent>
</Alert>`,
        ),
        E(
            'success',
            'Success',
            (
                <Alert variant="success" className="max-w-md">
                    <Medallion color="green" icon={<CheckCircleIcon weight="bold" aria-hidden />} />
                    <AlertContent>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your changes were saved.</AlertDescription>
                    </AlertContent>
                </Alert>
            ),
            `<Alert variant="success" className="max-w-md">
  <Medallion color="green" icon={<CheckCircleIcon weight="bold" aria-hidden />} />
  <AlertContent>
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>Your changes were saved.</AlertDescription>
  </AlertContent>
</Alert>`,
        ),
    ],
    'alert-dialog': [
        {
            id: 'confirm',
            title: 'Confirm action (default)',
            preview: (
                <ExampleCanvas>
                    <AlertDialogVariants />
                </ExampleCanvas>
            ),
            previewInner: <AlertDialogVariants />,
            welcomePreviewInner: <AlertDialogWelcomePreviewInner />,
            code: `<AlertDialog>
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
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogCopy>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        E(
            'small',
            'Small width (320px)',
            (
                <ExampleCanvas>
                    <AlertDialogCompactVariants />
                </ExampleCanvas>
            ),
            `<AlertDialog>
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
</AlertDialog>`,
        ),
        E(
            'single-button',
            'Single button (Continue only)',
            (
                <ExampleCanvas>
                    <AlertDialogSingleButtonVariants />
                </ExampleCanvas>
            ),
            `<AlertDialog>
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
</AlertDialog>`,
        ),
    ],
    'aspect-ratio': [
        E(
            'presets',
            'Ratio presets',
            (
                <div className="flex flex-wrap gap-4">
                    {(
                        [
                            { label: '1:1', ratio: 1, src: '/showcase/aspect-ratio-1-1.png' },
                            { label: '4:3', ratio: 4 / 3, src: '/showcase/aspect-ratio-4-3.png' },
                            { label: '16:9', ratio: 16 / 9, src: '/showcase/aspect-ratio-16-9.png' },
                            { label: '3:2', ratio: 3 / 2, src: '/showcase/aspect-ratio-3-2.png' },
                            { label: '21:9', ratio: 21 / 9, src: '/showcase/aspect-ratio-21-9.png' },
                        ] as const
                    ).map(({ label, ratio, src }) => (
                        <div key={label} className="w-[240px] max-w-full">
                            <AspectRatio ratio={ratio} src={src} alt={`${label} placeholder`} />
                        </div>
                    ))}
                </div>
            ),
            `import { AspectRatio } from "@chghealthcare/unified-design-system"

<div className="w-[240px]">
  <AspectRatio ratio={16 / 9} src="/path/to/image.jpg" alt="16:9 media" />
</div>`,
            undefined,
            (
                <div className="w-[240px] max-w-full">
                    <AspectRatio
                        ratio={16 / 9}
                        src="/showcase/aspect-ratio-16-9.png"
                        alt="16:9 placeholder"
                    />
                </div>
            ),
        ),
        E(
            'common-ratios',
            'Common ratios',
            (
                <div className="flex flex-wrap items-start gap-3">
                    {[
                        { label: '9:16', ratio: 9 / 16 },
                        { label: '2:3', ratio: 2 / 3 },
                        { label: '3:4', ratio: 3 / 4 },
                        { label: '4:5', ratio: 4 / 5 },
                        { label: '1:1', ratio: 1 },
                        { label: '5:4', ratio: 5 / 4 },
                        { label: '4:3', ratio: 4 / 3 },
                        { label: '3:2', ratio: 3 / 2 },
                        { label: '16:10', ratio: 16 / 10 },
                        { label: '16:9', ratio: 16 / 9 },
                        { label: '2:1', ratio: 2 },
                        { label: '21:9', ratio: 21 / 9 },
                    ].map(({ label, ratio }) => (
                        <div key={label} style={{ width: Math.round(140 * ratio) }}>
                            <AspectRatio ratio={ratio}>
                                <div className="flex size-full items-center justify-center">
                                    <span className="text-sm font-medium tabular-nums text-muted-foreground">
                                        {label}
                                    </span>
                                </div>
                            </AspectRatio>
                        </div>
                    ))}
                </div>
            ),
            `import { AspectRatio } from "@chghealthcare/unified-design-system"

// Any ratio works — pass a number (width / height).
const RATIOS = [9 / 16, 2 / 3, 3 / 4, 4 / 5, 1, 5 / 4, 4 / 3, 3 / 2, 16 / 10, 16 / 9, 2, 21 / 9]

{RATIOS.map((ratio) => (
  <div key={ratio} style={{ width: Math.round(140 * ratio) }}>
    <AspectRatio ratio={ratio}>{/* media or label */}</AspectRatio>
  </div>
))}`,
            'A reference strip of common aspect ratios at a shared height — portrait (9:16, 2:3, 3:4, 4:5), square (1:1), and landscape (5:4, 4:3, 3:2, 16:10, 16:9, 2:1, 21:9). Labels read `width:height`, so the value passed to the `ratio` prop is width ÷ height (e.g. `16:9` → `16 / 9`).',
        ),
    ],
    avatar: [
        E(
            'sizes',
            'Sizes & fallback',
            (
                <div className="flex flex-wrap items-center gap-4">
                    <Avatar size="xs">
                        <AvatarFallback>XS</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                        <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                        <AvatarFallback>LG</AvatarFallback>
                    </Avatar>
                </div>
            ),
            `<div className="flex flex-wrap items-center gap-4">
  <Avatar size="xs">
    <AvatarFallback>XS</AvatarFallback>
  </Avatar>
  <Avatar size="sm">
    <AvatarFallback>SM</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>MD</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>LG</AvatarFallback>
  </Avatar>
</div>`,
        ),
        E(
            'doctor-photos',
            'Curated doctor portraits (repo assets only)',
            (
                <div className="flex flex-wrap items-center gap-4">
                    <DoctorAvatar doctor="sarah" size="xs" />
                    <DoctorAvatar doctor="emily" size="sm" />
                    <DoctorAvatar doctor="daniel" />
                    <DoctorAvatar doctor="michael" size="lg" />
                </div>
            ),
            `import { Avatar, AvatarFallback, AvatarImage } from "@chghealthcare/unified-design-system"

<div className="flex flex-wrap items-center gap-4">
  <Avatar className="size-7">
    <AvatarImage src="https://example.com/sarah.png" alt="Sarah Thompson" />
    <AvatarFallback>ST</AvatarFallback>
  </Avatar>
  <Avatar className="size-8">
    <AvatarImage src="https://example.com/emily.png" alt="Emily Thompson" />
    <AvatarFallback>ET</AvatarFallback>
  </Avatar>
  <Avatar className="size-10">
    <AvatarImage src="https://example.com/daniel.png" alt="Daniel Garcia" />
    <AvatarFallback>DG</AvatarFallback>
  </Avatar>
  <Avatar className="size-12">
    <AvatarImage src="https://example.com/michael.png" alt="Michael Reed" />
    <AvatarFallback>MR</AvatarFallback>
  </Avatar>
</div>`,
        ),
        E(
            'status-dot',
            'Status (DotStatus)',
            (
                <div className="flex flex-wrap items-center gap-4">
                    <Avatar size="xs">
                        <AvatarFallback>XS</AvatarFallback>
                        <AvatarStatus variant="green" />
                    </Avatar>
                    <Avatar size="sm">
                        <AvatarFallback>SM</AvatarFallback>
                        <AvatarStatus variant="orange" />
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>MD</AvatarFallback>
                        <AvatarStatus variant="cyan" />
                    </Avatar>
                    <Avatar size="lg">
                        <AvatarFallback>LG</AvatarFallback>
                        <AvatarStatus variant="green" />
                    </Avatar>
                    <DoctorAvatar doctor="emily" size="sm" status="green" />
                </div>
            ),
            `import { Avatar, AvatarFallback, AvatarStatus } from "@chghealthcare/unified-design-system"

<Avatar size="xs">
  <AvatarFallback>XS</AvatarFallback>
  <AvatarStatus variant="green" />
</Avatar>

<Avatar size="sm">
  <AvatarFallback>SM</AvatarFallback>
  <AvatarStatus variant="orange" />
</Avatar>

<Avatar>
  <AvatarFallback>MD</AvatarFallback>
  <AvatarStatus variant="cyan" />
</Avatar>

<Avatar size="lg">
  <AvatarFallback>LG</AvatarFallback>
  <AvatarStatus variant="green" />
</Avatar>`,
        ),
        E(
            'camera-action',
            'Change photo (camera button)',
            (
                <div className="flex flex-wrap items-center gap-4">
                    <Avatar size="xs">
                        <AvatarFallback>XS</AvatarFallback>
                        <AvatarCameraAction onClick={(e) => e.preventDefault()} />
                    </Avatar>
                    <Avatar size="sm">
                        <AvatarFallback>SM</AvatarFallback>
                        <AvatarCameraAction onClick={(e) => e.preventDefault()} aria-label="Upload avatar" />
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>MD</AvatarFallback>
                        <AvatarCameraAction onClick={(e) => e.preventDefault()} />
                    </Avatar>
                    <Avatar size="lg">
                        <AvatarFallback>LG</AvatarFallback>
                        <AvatarCameraAction onClick={(e) => e.preventDefault()} />
                    </Avatar>
                    <DoctorAvatar
                        doctor="emily"
                        size="sm"
                        cameraAction={{
                            onClick: (e) => e.preventDefault(),
                        }}
                    />
                </div>
            ),
            `import { Avatar, AvatarFallback, AvatarCameraAction } from "@chghealthcare/unified-design-system"

<Avatar size="xs">
  <AvatarFallback>XS</AvatarFallback>
  <AvatarCameraAction onClick={(e) => e.preventDefault()} />
</Avatar>

<Avatar size="sm">
  <AvatarFallback>SM</AvatarFallback>
  <AvatarCameraAction onClick={(e) => e.preventDefault()} aria-label="Upload avatar" />
</Avatar>

<Avatar>
  <AvatarFallback>MD</AvatarFallback>
  <AvatarCameraAction onClick={(e) => e.preventDefault()} />
</Avatar>

<Avatar size="lg">
  <AvatarFallback>LG</AvatarFallback>
  <AvatarCameraAction onClick={(e) => e.preventDefault()} />
</Avatar>`,
        ),
    ],
    badge: [
        E(
            'sizes',
            'Sizes',
            (
                <div className="flex flex-wrap items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge accent="blue" appearance="pastel">
                                Label
                            </Badge>
                            <Badge accent="blue" appearance="pastel" icon={<InfoIcon weight="bold" aria-hidden />}>
                                With icon
                            </Badge>
                        </div>
                    </div>
                </div>
            ),
            `<Badge accent="blue" appearance="pastel">Label</Badge>
<Badge accent="blue" appearance="pastel" icon={<InfoIcon weight="bold" aria-hidden />}>With icon</Badge>`,
        ),
        E(
            'variants',
            'Variants',
            (
                <div className="flex flex-wrap items-center gap-2">
                    {(['subtle', 'pastel', 'outlined', 'solid'] as const satisfies readonly BadgeAppearance[]).map(
                        (appearance) => (
                            <Badge key={appearance} accent="blue" appearance={appearance}>
                                {appearance}
                            </Badge>
                        ),
                    )}
                </div>
            ),
            `<Badge accent="blue" appearance="subtle|pastel|outlined|solid">Label</Badge>`,
        ),
        E(
            'accent-colors',
            'Accent colors',
            (
                <div className="space-y-4">
                    {(['subtle', 'pastel', 'outlined', 'solid'] as const satisfies readonly BadgeAppearance[]).map(
                        (appearance) => (
                            <div key={appearance} className="space-y-2">
                                <p className="text-xs font-medium capitalize text-neutral-500 dark:text-neutral-400">
                                    {appearance}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {BADGE_ACCENTS.map((accent) => (
                                        <Badge key={`${appearance}-${accent}`} accent={accent} appearance={appearance}>
                                            {accent}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            ),
            `import { Badge, BADGE_ACCENTS } from "@chghealthcare/unified-design-system"

<Badge accent="blue" appearance="pastel">Label</Badge>`,
        ),
        E(
            'shape-and-icons',
            'Rect shape & icons',
            (
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge shape="rect" accent="neutral" appearance="pastel">
                            Rect
                        </Badge>
                        <Badge shape="rect" accent="blue" appearance="outlined">
                            Outlined
                        </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge
                            accent="neutral"
                            appearance="outlined"
                            icon={<Icon name="PlusIcon" weight="bold" aria-hidden />}
                        >
                            Add item
                        </Badge>
                        <Badge
                            shape="rect"
                            accent="green"
                            appearance="pastel"
                            icon={<Icon name="InfoIcon" weight="bold" aria-hidden />}
                            iconPlacement="inline-end"
                        >
                            Status
                        </Badge>
                    </div>
                </div>
            ),
            `import { Badge, Icon } from "@chghealthcare/unified-design-system"

<Badge shape="rect" accent="neutral" appearance="pastel">Label</Badge>
<Badge accent="neutral" appearance="outlined" icon={<Icon name="PlusIcon" weight="bold" aria-hidden />}>Add item</Badge>
<Badge iconPlacement="inline-end" icon={<Icon name="InfoIcon" weight="bold" aria-hidden />}>
  Status
</Badge>

{/* Or manual: */}
<Badge><Icon name="PlusIcon" data-icon="inline-start" aria-hidden /> Featured</Badge>`,
        ),
    ],
    breadcrumb: [
        E(
            'path',
            'Navigation path',
            (
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">
                                <HouseIcon className="size-4" aria-hidden />
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Library</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            ),
            `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@chghealthcare/unified-design-system"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">
        <HouseIcon className="size-4" aria-hidden />
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Library</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Data</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        ),
    ],
    branding: [
        E(
            'wordmarks',
            'Wordmarks',
            (
                <div className="grid gap-6 sm:grid-cols-2">
                    {(
                        [
                            'Wireframe',
                            'Connect',
                            'CHG',
                            'Locumsmart',
                            'Modio',
                            'MyWeatherby',
                            'MyCompHealth',
                            'Design System',
                        ] as const satisfies readonly BrandingAppearance[]
                    ).map((appearance) => (
                        <div key={appearance} className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{appearance}</p>
                            <Branding appearance={appearance} />
                        </div>
                    ))}
                </div>
            ),
            `import { Branding } from "@chghealthcare/unified-design-system"

<Branding appearance="Connect" />
<Branding appearance="Design System" />`,
            'Full logos render in a 200×80 frame. Override with className when you need a different size.',
            <Branding appearance="Design System" wordmarkAlign="center" />,
        ),
        E(
            'marks',
            'Brand marks',
            (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {(
                        [
                            'Wireframe',
                            'Connect',
                            'CHG',
                            'Locumsmart',
                            'Modio',
                            'MyWeatherby',
                            'MyCompHealth',
                            'Design System',
                        ] as const satisfies readonly BrandingAppearance[]
                    ).map((appearance) => (
                        <div key={appearance} className="flex flex-col items-start gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{appearance}</p>
                            <Branding appearance={appearance} symbol />
                        </div>
                    ))}
                </div>
            ),
            `import { Branding } from "@chghealthcare/unified-design-system"

<Branding appearance="Modio" symbol />
<Branding appearance="MyCompHealth" symbol />`,
            'Marks use a 64×64 frame.',
        ),
    ],
    button: [
        E(
            'variants',
            'Variants',
            (
                <div className="flex flex-wrap gap-2">
                    {(['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const).map((variant) => (
                        <Button key={variant} variant={variant} type="button" className="capitalize">
                            {variant}
                        </Button>
                    ))}
                </div>
            ),
            `<div className="flex flex-wrap gap-2">
  <Button variant="default" type="button">default</Button>
  <Button variant="secondary" type="button">secondary</Button>
  <Button variant="destructive" type="button">destructive</Button>
  <Button variant="outline" type="button">outline</Button>
  <Button variant="ghost" type="button">ghost</Button>
  <Button variant="link" type="button">link</Button>
</div>`,
            undefined,
            (
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button variant="default" type="button">
                        Primary
                    </Button>
                    <Button variant="secondary" type="button">
                        Secondary
                    </Button>
                </div>
            ),
        ),
        E(
            'sizes',
            'Sizes',
            (
                <div className="flex flex-wrap items-center gap-2">
                    {(['2x-sm', 'xs', 'sm', 'default', 'lg', 'icon'] as const).map((size) => (
                        <Button key={size} type="button" size={size} variant="outline">
                            {size === 'icon'
                                ? '↗'
                                : size === '2x-sm'
                                  ? 'Extra Small'
                                  : size === 'xs'
                                    ? 'Small'
                                    : size === 'sm'
                                      ? 'Medium'
                                      : size === 'lg'
                                        ? 'Large'
                                        : 'Default'}
                        </Button>
                    ))}
                </div>
            ),
            `<div className="flex flex-wrap items-center gap-2">
  <Button size="2x-sm" variant="outline" type="button">Extra Small</Button>
  <Button size="xs" variant="outline" type="button">Small</Button>
  <Button size="sm" variant="outline" type="button">Medium</Button>
  <Button size="default" variant="outline" type="button">Default</Button>
  <Button size="lg" variant="outline" type="button">Large</Button>
  <Button size="icon" variant="outline" type="button" aria-label="Open link">↗</Button>
</div>`,
        ),
        E(
            'with-icons',
            'Icons (start / end)',
            (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Button type="button" size="default">
                            <PlusIcon data-icon="inline-start" aria-hidden />
                            Add item
                        </Button>
                        <Button type="button" size="default" variant="outline">
                            Continue
                            <ArrowRightIcon data-icon="inline-end" aria-hidden />
                        </Button>
                        <Button type="button" size="default" variant="secondary">
                            <DownloadSimpleIcon data-icon="inline-start" aria-hidden />
                            Export
                            <CaretRightIcon data-icon="inline-end" aria-hidden />
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Set <span className="font-mono">data-icon=&quot;inline-start&quot;</span> or{' '}
                        <span className="font-mono">data-icon=&quot;inline-end&quot;</span> on the icon so padding lines up with the
                        label.
                    </p>
                </div>
            ),
            `<Button size="default">
  <PlusIcon data-icon="inline-start" aria-hidden />
  Add item
</Button>
<Button size="default" variant="outline">
  Continue
  <ArrowRightIcon data-icon="inline-end" aria-hidden />
</Button>
<Button size="default" variant="secondary">
  <DownloadSimpleIcon data-icon="inline-start" aria-hidden />
  Export
  <CaretRightIcon data-icon="inline-end" aria-hidden />
</Button>`,
            'Icons use the same size rules as other inline content; slot attributes adjust horizontal padding.',
        ),
        E(
            'icon-only',
            'Icon-only sizes',
            (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Button type="button" size="icon-xs" variant="outline" aria-label="Add">
                            <PlusIcon />
                        </Button>
                        <Button type="button" size="icon-sm" variant="outline" aria-label="Add">
                            <PlusIcon />
                        </Button>
                        <Button type="button" size="icon" variant="outline" aria-label="Add">
                            <PlusIcon />
                        </Button>
                        <Button type="button" size="icon-lg" variant="outline" aria-label="Add">
                            <PlusIcon className="size-5" />
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Square hit targets: <span className="font-mono">icon-xs</span> → <span className="font-mono">icon-lg</span>.
                        Always set an accessible name (<span className="font-mono">aria-label</span> or <span className="font-mono">title</span>).
                    </p>
                </div>
            ),
            `<Button size="icon-xs" variant="outline" aria-label="Add">
  <PlusIcon />
</Button>
<Button size="icon" variant="outline" aria-label="Add">
  <PlusIcon />
</Button>`,
            'Use icon-only sizes for compact toolbar and table actions.',
        ),
        E(
            'with-badges',
            'Labels + badges',
            (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Button type="button" size="sm" variant="outline" className="gap-2">
                            <BellIcon data-icon="inline-start" aria-hidden />
                            Notifications
                            <Badge variant="destructive" className="px-1.5">
                                3
                            </Badge>
                        </Button>
                        <Button type="button" size="sm" variant="ghost" className="gap-2">
                            Inbox
                            <Badge variant="secondary">12</Badge>
                        </Button>
                        <Button type="button" size="default" variant="default" className="gap-2">
                            <SparkleIcon data-icon="inline-start" aria-hidden />
                            Upgrade
                            <Badge
                                variant="outline"
                                className="border-primary-foreground/40 bg-primary-foreground/15 text-primary-foreground"
                            >
                                Pro
                            </Badge>
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Pair counts or tags with <span className="font-mono">Badge</span>; keep <span className="font-mono">gap-2</span>{' '}
                        between text and badge when not using <span className="font-mono">data-icon</span> slots.
                    </p>
                </div>
            ),
            `<Button variant="outline" size="sm" className="gap-2">
  <BellIcon data-icon="inline-start" aria-hidden />
  Notifications
  <Badge variant="destructive">3</Badge>
</Button>`,
            'Badges sit inline after the label; tweak Badge classes for contrast on solid primary buttons.',
        ),
    ],
    'button-group': [
        E(
            'horizontal',
            'Horizontal',
            (
                <ButtonGroup className="max-w-fit">
                    <Button size="sm">Save</Button>
                    <Button size="sm" variant="outline">
                        Cancel
                    </Button>
                </ButtonGroup>
            ),
            `<ButtonGroup><Button size="sm">Save</Button><Button variant="outline">Cancel</Button></ButtonGroup>`,
        ),
        E(
            'vertical',
            'Vertical',
            (
                <ButtonGroup orientation="vertical" className="max-w-fit [&>button]:justify-start">
                    <Button size="sm">Copy</Button>
                    <Button size="sm" variant="outline">
                        Paste
                    </Button>
                </ButtonGroup>
            ),
            `<ButtonGroup orientation="vertical" className="max-w-fit [&>button]:justify-start">
  <Button size="sm">Copy</Button>
  <Button size="sm" variant="outline">Paste</Button>
</ButtonGroup>`,
        ),
    ],
    calendar: [
        E(
            'single',
            'Single date',
            <CalendarSingleDemo />,
            `<Calendar mode="single" selected={date} onSelect={setDate} />`,
            undefined,
            <CalendarWelcomePreviewInner />,
        ),
        E('range', 'Range', <CalendarRangeDemo />, `<Calendar mode="range" selected={range} onSelect={setRange} />`),
    ],
    card: [
        E(
            'sizes',
            'Default & compact',
            (
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardImage>
                            <AspectRatio
                                ratio={16 / 9}
                                src="/showcase/aspect-ratio-16-9.png"
                                alt="Card media"
                            />
                        </CardImage>
                        <CardContent>
                            <p className="font-medium text-uds-text-primary">Default card</p>
                            <p className="text-uds-text-secondary">Body content goes here — any elements you like.</p>
                        </CardContent>
                        <CardFooter>
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>
                    <Card size="sm">
                        <CardImage>
                            <AspectRatio
                                ratio={21 / 9}
                                src="/showcase/aspect-ratio-21-9.png"
                                alt="Card media"
                            />
                        </CardImage>
                        <CardContent>
                            <p className="font-medium text-uds-text-primary">Compact card</p>
                            <p className="text-uds-text-secondary">Body content goes here — any elements you like.</p>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm">Save</Button>
                        </CardFooter>
                    </Card>
                </div>
            ),
            `// Card is a three-slot wrapper: CardImage (images only),
// CardContent (any children), CardFooter (buttons only).
// size="sm" renders the Compact variant; image and footer are optional.
<Card>
  <CardImage>
    <AspectRatio ratio={16 / 9} src="/path/to/image.jpg" alt="Card media" />
  </CardImage>
  <CardContent>
    <p className="font-medium text-uds-text-primary">Default card</p>
    <p className="text-uds-text-secondary">Body content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>`,
            undefined,
            (
                <Card className="w-full max-w-sm">
                    <CardImage>
                        <AspectRatio
                            ratio={16 / 9}
                            src="/showcase/aspect-ratio-16-9.png"
                            alt="Card media"
                        />
                    </CardImage>
                    <CardContent>
                        <p className="font-medium text-uds-text-primary">Default card</p>
                        <p className="text-uds-text-secondary">Body content goes here — any elements you like.</p>
                    </CardContent>
                    <CardFooter>
                        <Button>Save</Button>
                    </CardFooter>
                </Card>
            ),
        ),
        E(
            'content-only',
            'Without image or footer',
            (
                <Card className="w-full max-w-sm">
                    <CardContent>
                        <p className="font-medium text-uds-text-primary">Content-only card</p>
                        <p className="text-uds-text-secondary">Image and footer are optional regions.</p>
                    </CardContent>
                </Card>
            ),
            `// Omit CardImage and CardFooter to render a content-only card.
<Card>
  <CardContent>
    <p className="font-medium text-uds-text-primary">Content-only card</p>
    <p className="text-uds-text-secondary">Image and footer are optional regions.</p>
  </CardContent>
</Card>`,
        ),
    ],
    chart: [E('bar', 'Bar chart', <ChartBarDemo />, `import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@chghealthcare/unified-design-system"

const chartData = [
  { month: "Jan", total: 18 },
  { month: "Feb", total: 24 },
  { month: "Mar", total: 21 },
]

const chartConfig = {
  total: {
    label: "Placements",
    color: "var(--chart-1)",
  },
}

<ChartContainer config={chartConfig} className="min-h-[240px] w-full">
  <BarChart data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="total" radius={8} fill="var(--color-total)" />
  </BarChart>
</ChartContainer>`)],
    checkbox: [
        E(
            'states',
            'Checked & unchecked',
            (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox id="ex-ch-1" defaultChecked />
                        <CheckboxLabel htmlFor="ex-ch-1">Subscribed</CheckboxLabel>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="ex-ch-2" />
                        <CheckboxLabel htmlFor="ex-ch-2">Not subscribed</CheckboxLabel>
                    </div>
                </div>
            ),
            `import { Checkbox, CheckboxLabel } from "@chghealthcare/unified-design-system"

<div className="flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <Checkbox id="newsletter" defaultChecked />
    <CheckboxLabel htmlFor="newsletter">Subscribed</CheckboxLabel>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="promos" />
    <CheckboxLabel htmlFor="promos">Not subscribed</CheckboxLabel>
  </div>
</div>`,
        ),
        E(
            'indeterminate',
            'Indeterminate',
            <CheckboxIndeterminateDemo />,
            `import * as React from "react"
import { Checkbox, CheckboxLabel } from "@chghealthcare/unified-design-system"

const [checked, setChecked] = React.useState<boolean | "indeterminate">("indeterminate")

<Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
<CheckboxLabel htmlFor="terms">Partial selection</CheckboxLabel>`,
        ),
    ],
    collapsible: [
        E(
            'toggle',
            'Expand / collapse',
            <CollapsibleDemo />,
            `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@chghealthcare/unified-design-system"

<Collapsible variant="divided" className="w-full">
  <CollapsibleTrigger>Notification defaults</CollapsibleTrigger>
  <CollapsibleContent>Email digest, SMS, and in-app banners.</CollapsibleContent>
</Collapsible>

<Collapsible variant="boxed" className="w-full">
  <CollapsibleTrigger>Placement assistant</CollapsibleTrigger>
  <CollapsibleContent>Locum tenens filters and radius settings.</CollapsibleContent>
</Collapsible>`,
        ),
    ],
    combobox: [
        E(
            'default',
            'Default (44px)',
            <ComboboxDefaultDemo />,
            `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@chghealthcare/unified-design-system"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select an option" className="w-[280px]" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
        ),
        E(
            'compact',
            'Compact (36px)',
            <ComboboxCompactDemo />,
            `<Combobox items={frameworks}>
  <ComboboxInput inputSize="sm" placeholder="Select an option" className="w-[280px]" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
        ),
        E(
            'search',
            'Filterable list',
            <ComboboxDemo />,
            `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@chghealthcare/unified-design-system"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select an option" className="w-[280px]" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
        ),
    ],
    command: [
        E(
            'palette',
            'Command list',
            <CommandInlineDemo />,
            `<Command className="border border-[var(--uds-border-primary)] shadow-md">
  <CommandInput placeholder="Search…" />
  <CommandList>
    <CommandEmpty>No matches.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Settings</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
        ),
    ],
    'context-menu': [
        E(
            'surface',
            'Right-click menu with nested submenus',
            <ContextMenuDemo />,
            `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@chghealthcare/unified-design-system"

<ContextMenu>
  <ContextMenuTrigger className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuLabel>Navigation</ContextMenuLabel>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>Export</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>PDF</ContextMenuItem>
        <ContextMenuItem>PNG</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`,
        ),
    ],
    dialog: [
        E(
            'modal',
            'Modal widths',
            <DialogVariants />,
            `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit profile</Button>
  </DialogTrigger>
  <DialogContent size="md">
    <DialogMain>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Update the public details shown on your account.</DialogDescription>
      </DialogHeader>
      <DialogBody>
        {/* slot for form fields or other content */}
      </DialogBody>
    </DialogMain>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
            undefined,
            <DialogWelcomePreviewInner />,
        ),
    ],
    direction: [
        E(
            'rtl',
            'Direction provider',
            <DirectionRtlDemo />,
            `import { DirectionProvider } from "@chghealthcare/unified-design-system"

<DirectionProvider dir="rtl">
  <ButtonGroup>
    <Button>التالي</Button>
    <Button variant="outline">رجوع</Button>
  </ButtonGroup>
</DirectionProvider>`,
        ),
    ],
    'dot-status': [
        E(
            'base',
            'Base',
            <DotStatus />,
            `import { DotStatus } from "@chghealthcare/unified-design-system"

<DotStatus />`,
            'Default: green hue, medium size, solid fill. Use outline for a 2px primary border.',
        ),
        E(
            'variants',
            'Variants (colors)',
            (
                <div className="flex flex-col gap-3">
                    {DOT_STATUS_VARIANTS.map((v) => (
                        <div key={v} className="flex items-center gap-3">
                            <DotStatus variant={v} />
                            <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">{v}</span>
                        </div>
                    ))}
                </div>
            ),
            `import { DotStatus, DOT_STATUS_VARIANTS } from "@chghealthcare/unified-design-system"

DOT_STATUS_VARIANTS.map((v) => <DotStatus key={v} variant={v} />)`,
        ),
        E(
            'sizes',
            'Sizes',
            (
                <div className="flex flex-col gap-3">
                    {(['small', 'medium', 'large'] as const).map((s) => (
                        <div key={s} className="flex items-center gap-3">
                            <DotStatus size={s} />
                            <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">{s}</span>
                        </div>
                    ))}
                </div>
            ),
            `<DotStatus size="small" />
<DotStatus size="medium" />
<DotStatus size="large" />`,
        ),
        E(
            'outline',
            'Outline',
            (
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <DotStatus outline={false} />
                        <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">outline false</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <DotStatus outline />
                        <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">outline true</span>
                    </div>
                </div>
            ),
            `<DotStatus outline={false} />
<DotStatus outline />`,
        ),
    ],
    drawer: [E('bottom', 'Drawer', <DrawerVariants />, `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Assign clinician</DrawerTitle>
      <DrawerDescription>Review fit before confirming the assignment.</DrawerDescription>
    </DrawerHeader>
    <div className="px-4 pb-4 text-sm text-muted-foreground">
      Bottom sheet pattern, often used on small viewports.
    </div>
  </DrawerContent>
</Drawer>`)],
    'dropdown-menu': [E('menu', 'Dropdown', <DropdownVariants />, `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-56">
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete team</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`)],
    'date-input': [
        E(
            'single-date',
            'Date picker field',
            <DateInput className="max-w-sm" placeholder="mm/dd/yyyy" aria-label="Appointment date" />,
            `<DateInput className="max-w-sm" placeholder="mm/dd/yyyy" aria-label="Appointment date" />`,
            'Default `yearSelection="grid"`: month and year in the caption each show a caret—open a 12-month grid (arrows move the year) or a 12-year grid (arrows page years). From the month grid, tap the caption year + caret to jump to the year grid. Day view keeps normal month arrows. Use `yearSelection="caption"` with `captionLayout` for native dropdowns. Tune `startMonth` / `endMonth` for bounds.',
        ),
    ],
    'date-range-input': [
        E(
            'typed-range',
            'Typed date range',
            (
                <DateRangeInput
                    className="max-w-xl"
                    placeholder="mm/dd/yyyy – mm/dd/yyyy"
                    aria-label="Coverage date range"
                />
            ),
            `<DateRangeInput
  className="max-w-xl"
  placeholder="mm/dd/yyyy – mm/dd/yyyy"
  aria-label="Coverage date range"
/>`,
            'Defaults to `yearSelection="caption"` and `captionLayout="label"`: two-month calendar with text captions and arrow navigation. The field accepts **digits only**; dates auto-format as `mm/dd/yyyy` and the range separator is inserted after the first 8 digits so typing continues into the end date. Blur commits; popover flips when space is tight.',
        ),
    ],
    empty: [
        E(
            'state',
            'Empty state',
            <EmptyVariants />,
            `<Empty>
  <EmptyHeader>
    <EmptyMedia className="[--uds-chrome-media-radius:9999px] [--uds-empty-media-bg:var(--uds-color-accent-blue-100)] [--uds-empty-media-fg:var(--uds-color-accent-blue-700)] dark:[--uds-empty-media-bg-dark:color-mix(in_srgb,var(--uds-color-accent-blue-900)_45%,transparent)] dark:[--uds-empty-media-fg-dark:var(--uds-color-accent-blue-200)]">
      <EnvelopeIcon weight="regular" aria-hidden />
    </EmptyMedia>
    <EmptyTitle>No messages</EmptyTitle>
    <EmptyDescription>Inbox is clear for now.</EmptyDescription>
  </EmptyHeader>
</Empty>`,
        ),
        E(
            'single-action',
            'Single action',
            <EmptySingleAction />,
            `<Empty>
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
</Empty>`,
        ),
        E(
            'two-actions',
            'Two actions',
            <EmptyTwoActions />,
            `<Empty>
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
</Empty>`,
        ),
        E(
            'search-404',
            'Search-focused 404',
            <EmptySearch404 />,
            `<Empty className="min-h-[360px] max-w-lg p-10">
  <EmptyHeader className="max-w-md">
    <EmptyTitle>404 - Not Found</EmptyTitle>
    <EmptyDescription>
      The page you're looking for doesn't exist. Try searching for what you need below.
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
      Need help? <a className="underline underline-offset-4 hover:text-foreground" href="#">Contact support</a>
    </p>
  </EmptyContent>
</Empty>`,
        ),
    ],
    field: [
        E(
            'vertical',
            'Field vertical',
            (
                <FieldSet>
                    <FieldLegend>Newsletter</FieldLegend>
                    <Field>
                        <FieldLabel htmlFor="ex-field-email">Email</FieldLabel>
                        <Input id="ex-field-email" type="email" placeholder="you@example.com" />
                        <FieldDescription>We never share your email.</FieldDescription>
                    </Field>
                </FieldSet>
            ),
            `import { FieldSet, Field, FieldLabel, FieldDescription, FieldLegend } from "@chghealthcare/unified-design-system"

<FieldSet className="max-w-sm">
  <FieldLegend>Newsletter</FieldLegend>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" type="email" placeholder="you@example.com" />
    <FieldDescription>We never share your email.</FieldDescription>
  </Field>
</FieldSet>`,
        ),
        E(
            'horizontal',
            'Horizontal patterns',
            (
                <div className="flex w-full flex-col">
                    <Field orientation="horizontal" className="items-center border-b pb-5">
                        <FieldLabel htmlFor="ex-field-air" className="min-w-32">
                            Airplane mode
                        </FieldLabel>
                        <Switch id="ex-field-air" defaultChecked />
                    </Field>
                    <Field orientation="horizontal" className="items-start border-b py-5">
                        <FieldLabel htmlFor="ex-field-team" className="min-w-32 pt-2">
                            Team name
                        </FieldLabel>
                        <FieldContent>
                            <Input id="ex-field-team" placeholder="Growth Operations" />
                            <FieldDescription>
                                This appears in internal tooling and reporting.
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                    <Field orientation="horizontal" className="items-start pt-5">
                        <FieldLabel htmlFor="ex-field-email-alerts" className="min-w-32">
                            Notifications
                        </FieldLabel>
                        <FieldContent>
                            <div className="flex items-start gap-3 rounded-lg border p-3">
                                <Checkbox id="ex-field-email-alerts" defaultChecked className="mt-0.5" />
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <FieldLabel htmlFor="ex-field-email-alerts" className="w-auto">
                                        Email alerts
                                    </FieldLabel>
                                    <FieldDescription>
                                        Send updates when a candidate is assigned or rescheduled.
                                    </FieldDescription>
                                </div>
                            </div>
                        </FieldContent>
                    </Field>
                </div>
            ),
            `<div className="flex w-full flex-col">
  <Field orientation="horizontal" className="items-center border-b pb-5">
    <FieldLabel htmlFor="airplane-mode" className="min-w-32">
      Airplane mode
    </FieldLabel>
    <Switch id="airplane-mode" defaultChecked />
  </Field>

  <Field orientation="horizontal" className="items-start border-b py-5">
    <FieldLabel htmlFor="team-name" className="min-w-32 pt-2">
      Team name
    </FieldLabel>
    <FieldContent>
      <Input id="team-name" placeholder="Growth Operations" />
      <FieldDescription>
        This appears in internal tooling and reporting.
      </FieldDescription>
    </FieldContent>
  </Field>

  <Field orientation="horizontal" className="items-start pt-5">
    <FieldLabel htmlFor="email-alerts" className="min-w-32">
      Notifications
    </FieldLabel>
    <FieldContent>
      <div className="flex items-start gap-3 rounded-lg border p-3">
        <Checkbox id="email-alerts" defaultChecked className="mt-0.5" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <FieldLabel htmlFor="email-alerts" className="w-auto">
            Email alerts
          </FieldLabel>
          <FieldDescription>
            Send updates when a candidate is assigned or rescheduled.
          </FieldDescription>
        </div>
      </div>
    </FieldContent>
  </Field>
</div>`,
        ),
    ],
    'file-upload': [
        E(
            'basic',
            'Basic Upload',
            <FileUpload onFileSelect={() => {}} />,
            `<FileUpload
  onFileSelect={(files) => console.log(files)}
/>`,
            'Single-file upload with default instruction and validation messaging.',
        ),
        E(
            'small',
            'Small Size',
            (
                <FileUpload
                    size="small"
                    onFileSelect={() => {}}
                />
            ),
            `<FileUpload
  size="small"
  onFileSelect={(files) => console.log(files)}
/>`,
            'Use the small size for compact forms, side panels, and dense layouts.',
        ),
        E(
            'xs',
            'Extra small',
            (
                <FileUpload
                    size="xs"
                    onFileSelect={() => {}}
                />
            ),
            `<FileUpload
  size="xs"
  onFileSelect={(files) => console.log(files)}
/>`,
            'Use `xs` for the tightest dropzones (tables, inline panels, settings rows). Default copy is a single row: semibold title, hyphen, desc; set `title` or `desc` to fall back to stacked lines.',
        ),
    ],
    'file-upload-cards': [
        E(
            'cards',
            'Upload cards with status states',
            (
                <FileUploadCards
                    title="Drop files here or click to upload"
                    desc="PDF, DOCX, PNG up to 10MB each"
                    defaultItems={[
                        {
                            id: 'file-a',
                            name: 'Credentialing packet.pdf',
                            size: 2_150_000,
                            type: 'application/pdf',
                            status: 'success',
                            uploadedAt: 'Uploaded today',
                        },
                        {
                            id: 'file-b',
                            name: 'headshot.png',
                            size: 845_000,
                            type: 'image/png',
                            status: 'uploading',
                            progress: 62,
                        },
                        {
                            id: 'file-c',
                            name: 'license-front.jpg',
                            size: 1_070_000,
                            type: 'image/jpeg',
                            status: 'error',
                            errorMessage: 'Upload failed. Try again.',
                        },
                        {
                            id: 'file-d',
                            name: 'w9-form.pdf',
                            size: 390_000,
                            type: 'application/pdf',
                            status: 'disabled',
                        },
                    ]}
                    onRetry={() => {}}
                />
            ),
            `<FileUploadCards
  title="Drop files here or click to upload"
  desc="PDF, DOCX, PNG up to 10MB each"
  defaultItems={[
    { id: "a", name: "Credentialing packet.pdf", status: "success", size: 2150000, type: "application/pdf" },
    { id: "b", name: "headshot.png", status: "uploading", progress: 62, size: 845000, type: "image/png" },
    { id: "c", name: "license-front.jpg", status: "error", errorMessage: "Upload failed. Try again.", size: 1070000, type: "image/jpeg" },
    { id: "d", name: "w9-form.pdf", status: "disabled", size: 390000, type: "application/pdf" },
  ]}
  onRetry={(item) => console.log("retry", item)}
/>`,
            'Demonstrates success/uploading/error/disabled card states with Medallion thumb, Pill pastel badges, metadata, Progress bar (uploading), and remove/retry actions.',
        ),
        E(
            'cards-compact',
            'Compact density',
            (
                <FileUploadCards
                    density="compact"
                    title="Drop files or click"
                    desc="Max 10MB each"
                    defaultItems={[
                        {
                            id: 'c-a',
                            name: 'Credentialing packet.pdf',
                            size: 2_150_000,
                            type: 'application/pdf',
                            status: 'success',
                            uploadedAt: 'Uploaded today',
                        },
                        {
                            id: 'c-b',
                            name: 'headshot.png',
                            size: 845_000,
                            type: 'image/png',
                            status: 'uploading',
                            progress: 62,
                        },
                    ]}
                    onRetry={() => {}}
                />
            ),
            `<FileUploadCards
  density="compact"
  defaultItems={[/* … */]}
  onRetry={(item) => console.log("retry", item)}
/>`,
            'Use `density="compact"` for checklist-style lists: shorter rows, smaller status badges, and an `xs` dropzone by default.',
        ),
    ],
    'check-list': [
        E(
            'tasks',
            'Checklist tasks',
            (
                <CheckList className="max-w-xl">
                    <CheckListItem>
                        <CheckListControl
                            id="check-license"
                            label="Verify state license"
                            description="Ensure license is active and matches assignment state."
                        />
                    </CheckListItem>
                    <CheckListItem>
                        <CheckListControl
                            id="check-docs"
                            label="Upload credential packet"
                            description="Include DEA, board certificate, and references."
                        />
                    </CheckListItem>
                </CheckList>
            ),
            `<CheckList className="max-w-xl">
  <CheckListItem>
    <CheckListControl id="check-license" label="Verify state license" />
  </CheckListItem>
  <CheckListItem>
    <CheckListControl id="check-docs" label="Upload credential packet" />
  </CheckListItem>
</CheckList>`,
        ),
        E(
            'completed',
            'Mixed completion state',
            (
                <CheckList className="max-w-xl">
                    <CheckListItem>
                        <CheckListControl
                            id="check-onboard-1"
                            checked
                            label="Profile complete"
                            description="Demographics and specialties are saved."
                        />
                    </CheckListItem>
                    <CheckListItem>
                        <CheckListControl
                            id="check-onboard-2"
                            checked
                            label="References verified"
                            description="Two clinical references confirmed."
                        />
                    </CheckListItem>
                    <CheckListItem>
                        <CheckListControl
                            id="check-onboard-3"
                            label="Finalize facility packet"
                            description="One remaining document required."
                        />
                    </CheckListItem>
                </CheckList>
            ),
            `<CheckList>
  <CheckListItem>
    <CheckListControl id="check-onboard-1" checked label="Profile complete" />
  </CheckListItem>
  <CheckListItem>
    <CheckListControl id="check-onboard-3" label="Finalize facility packet" />
  </CheckListItem>
</CheckList>`,
        ),
    ],
    'description-list': [
        E(
            'details',
            'Label/value pairs',
            (
                <DescriptionList className="max-w-xl">
                    <DescriptionRow>
                        <DescriptionTerm>Facility</DescriptionTerm>
                        <DescriptionDetail>St. Joseph Regional Medical Center</DescriptionDetail>
                    </DescriptionRow>
                    <DescriptionRow>
                        <DescriptionTerm>Specialty</DescriptionTerm>
                        <DescriptionDetail>Emergency Medicine</DescriptionDetail>
                    </DescriptionRow>
                    <DescriptionRow>
                        <DescriptionTerm>Start date</DescriptionTerm>
                        <DescriptionDetail>May 14, 2026</DescriptionDetail>
                    </DescriptionRow>
                </DescriptionList>
            ),
            `<DescriptionList className="max-w-xl">
  <DescriptionRow>
    <DescriptionTerm>Facility</DescriptionTerm>
    <DescriptionDetail>St. Joseph Regional Medical Center</DescriptionDetail>
  </DescriptionRow>
</DescriptionList>`,
        ),
        E(
            'stacked-mobile',
            'Long values and wrapping',
            (
                <DescriptionList className="max-w-2xl">
                    <DescriptionRow>
                        <DescriptionTerm>Assignment notes</DescriptionTerm>
                        <DescriptionDetail>
                            Night coverage includes trauma backup every other shift and weekend rounding responsibilities.
                        </DescriptionDetail>
                    </DescriptionRow>
                    <DescriptionRow>
                        <DescriptionTerm>Contact</DescriptionTerm>
                        <DescriptionDetail>staffing.ops@comphealth.example</DescriptionDetail>
                    </DescriptionRow>
                </DescriptionList>
            ),
            `<DescriptionList className="max-w-2xl">
  <DescriptionRow>
    <DescriptionTerm>Assignment notes</DescriptionTerm>
    <DescriptionDetail>Night coverage includes trauma backup every other shift.</DescriptionDetail>
  </DescriptionRow>
</DescriptionList>`,
        ),
    ],
    layout: [
        E(
            'row-gap',
            'Row with numeric gap',
            (
                <Layout direction="row" alignItems="center" gap={3} className="rounded-md border border-dashed p-4">
                    <div className="rounded bg-muted px-3 py-2 text-sm">Item A</div>
                    <div className="rounded bg-muted px-3 py-2 text-sm">Item B</div>
                    <div className="rounded bg-muted px-3 py-2 text-sm">Item C</div>
                </Layout>
            ),
            `<Layout direction="row" alignItems="center" gap={3}>
  <div>Item A</div>
  <div>Item B</div>
  <div>Item C</div>
</Layout>`,
        ),
        E(
            'column-string-gap',
            'Column with string gap and justification',
            (
                <Layout
                    direction="col"
                    justifyContent="space-between"
                    gap="1rem"
                    className="min-h-32 rounded-md border border-dashed p-4"
                >
                    <div className="rounded bg-muted px-3 py-2 text-sm">Top</div>
                    <div className="rounded bg-muted px-3 py-2 text-sm">Bottom</div>
                </Layout>
            ),
            `<Layout direction="col" justifyContent="space-between" gap="1rem">
  <div>Top</div>
  <div>Bottom</div>
</Layout>`,
        ),
        E(
            'row-wrap',
            'Row with wrapping',
            (
                <Layout direction="row" wrap gap={2} className="max-w-xs rounded-md border border-dashed p-4">
                    <div className="shrink-0 rounded bg-muted px-3 py-2 text-sm">One</div>
                    <div className="shrink-0 rounded bg-muted px-3 py-2 text-sm">Two</div>
                    <div className="shrink-0 rounded bg-muted px-3 py-2 text-sm">Three</div>
                    <div className="shrink-0 rounded bg-muted px-3 py-2 text-sm">Four</div>
                </Layout>
            ),
            `<Layout direction="row" wrap gap={2} className="max-w-xs">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
</Layout>`,
        ),
    ],
    link: [
        E(
            'inline',
            'Inline and external links',
            (
                <div className="flex flex-col gap-2">
                    <Link href="#">Internal detail page</Link>
                    <Link href="#" appearance="secondary">
                        Secondary link style
                    </Link>
                    <Link href="https://example.com" external>
                        External policy reference
                    </Link>
                </div>
            ),
            `<Link href="#">Internal detail page</Link>
<Link href="#" appearance="secondary">Secondary link style</Link>
<Link href="https://example.com" external>External policy reference</Link>`,
        ),
        E(
            'in-copy',
            'Inline copy links',
            (
                <p className="max-w-2xl text-sm text-muted-foreground">
                    Visit the <Link href="#">assignment dashboard</Link> or open the{' '}
                    <Link href="https://example.com/docs" external>
                        external credentialing guide
                    </Link>{' '}
                    for requirements.
                </p>
            ),
            `<p>
  Visit the <Link href="#">assignment dashboard</Link> or open the{" "}
  <Link href="https://example.com/docs" external>external credentialing guide</Link>.
</p>`,
        ),
    ],
    'micro-calendar': [
        E(
            'month',
            'Month grid',
            <MicroCalendarMonthDemo />,
            `const dateData: Record<string, MicroCalendarDateData> = {
  "2026-05-12": { onAssignment: true },
  "2026-05-13": { onAssignment: true, travel: true },
  "2026-05-14": { travel: true },
}

<MicroCalendar
  month={new Date(2026, 4, 1)}
  value={selected}
  onDateSelect={setSelected}
  dateData={dateData}
  unavailableDates={[new Date(2026, 4, 20)]}
/>`,
            'Full month with prev/next, week strip collapse, travel / on-assignment markers, unavailable days, and legend when expanded.',
        ),
        E(
            'tile',
            'Compact date tile',
            (
                <div className="flex items-center gap-3">
                    <MicroCalendarTile date={new Date('2026-05-14')} />
                    <MicroCalendarTile date={new Date('2026-05-15')} />
                </div>
            ),
            `<MicroCalendarTile date={new Date("2026-05-14")} />`,
            'Use MicroCalendarTile for the smallest inline date chip (weekday, day, month).',
        ),
        E(
            'event-row',
            'Tile + event summary',
            (
                <div className="flex max-w-md items-center gap-3 rounded-[8px] border p-3">
                    <MicroCalendarTile date={new Date('2026-06-02')} />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">Credentialing review call</p>
                        <p className="mt-1 text-sm text-muted-foreground">Tue, 9:00 AM • 30 minutes</p>
                    </div>
                </div>
            ),
            `<div className="flex items-center gap-3">
  <MicroCalendarTile date={new Date("2026-06-02")} />
  <p>Credentialing review call</p>
</div>`,
        ),
    ],
    'progress-circles': [
        E(
            'radial',
            'Radial progress set',
            (
                <ProgressCircles>
                    <ProgressCircle value={24} />
                    <ProgressCircle value={68} />
                    <ProgressCircle value={100} label="Done" />
                </ProgressCircles>
            ),
            `<ProgressCircles>
  <ProgressCircle value={24} />
  <ProgressCircle value={68} />
  <ProgressCircle value={100} label="Done" />
</ProgressCircles>`,
        ),
        E(
            'sizing',
            'Custom size + stroke',
            (
                <ProgressCircles>
                    <ProgressCircle value={35} size={56} strokeWidth={6} label="Week 1" />
                    <ProgressCircle value={72} size={80} strokeWidth={10} label="Week 2" />
                </ProgressCircles>
            ),
            `<ProgressCircles>
  <ProgressCircle value={35} size={56} strokeWidth={6} label="Week 1" />
  <ProgressCircle value={72} size={80} strokeWidth={10} label="Week 2" />
</ProgressCircles>`,
        ),
    ],
    'section-header': [
        E(
            'header',
            'Title, description, actions',
            (
                <SectionHeader className="max-w-2xl">
                    <SectionHeaderContent>
                        <SectionHeaderTitle>Assignments</SectionHeaderTitle>
                        <SectionHeaderDescription>
                            Track active placements and resolve pending actions.
                        </SectionHeaderDescription>
                    </SectionHeaderContent>
                    <SectionHeaderActions>
                        <Button size="sm">Add assignment</Button>
                    </SectionHeaderActions>
                </SectionHeader>
            ),
            `<SectionHeader>
  <SectionHeaderContent>
    <SectionHeaderTitle>Assignments</SectionHeaderTitle>
    <SectionHeaderDescription>Track active placements and resolve pending actions.</SectionHeaderDescription>
  </SectionHeaderContent>
  <SectionHeaderActions>
    <Button size="sm">Add assignment</Button>
  </SectionHeaderActions>
</SectionHeader>`,
        ),
        E(
            'without-actions',
            'Simple title + description',
            (
                <SectionHeader className="max-w-xl">
                    <SectionHeaderContent>
                        <SectionHeaderTitle>Candidate pipeline</SectionHeaderTitle>
                        <SectionHeaderDescription>
                            Prioritized list of clinicians currently in interview stages.
                        </SectionHeaderDescription>
                    </SectionHeaderContent>
                </SectionHeader>
            ),
            `<SectionHeader>
  <SectionHeaderContent>
    <SectionHeaderTitle>Candidate pipeline</SectionHeaderTitle>
    <SectionHeaderDescription>Prioritized list of clinicians currently in interview stages.</SectionHeaderDescription>
  </SectionHeaderContent>
</SectionHeader>`,
        ),
    ],
    statistics: [
        E(
            'kpis',
            'Metric cards',
            (
                <Statistics>
                    <StatisticCard>
                        <StatisticLabel>Total shifts</StatisticLabel>
                        <StatisticValue>128</StatisticValue>
                        <StatisticHint>+12% from last month</StatisticHint>
                    </StatisticCard>
                    <StatisticCard>
                        <StatisticLabel>Fill rate</StatisticLabel>
                        <StatisticValue>91%</StatisticValue>
                        <StatisticHint>Above target</StatisticHint>
                    </StatisticCard>
                </Statistics>
            ),
            `<Statistics>
  <StatisticCard>
    <StatisticLabel>Total shifts</StatisticLabel>
    <StatisticValue>128</StatisticValue>
  </StatisticCard>
</Statistics>`,
        ),
        E(
            'four-up',
            '4-column dashboard set',
            (
                <Statistics>
                    <StatisticCard>
                        <StatisticLabel>Open roles</StatisticLabel>
                        <StatisticValue>42</StatisticValue>
                    </StatisticCard>
                    <StatisticCard>
                        <StatisticLabel>Submissions</StatisticLabel>
                        <StatisticValue>318</StatisticValue>
                    </StatisticCard>
                    <StatisticCard>
                        <StatisticLabel>Interviews</StatisticLabel>
                        <StatisticValue>76</StatisticValue>
                    </StatisticCard>
                    <StatisticCard>
                        <StatisticLabel>Placements</StatisticLabel>
                        <StatisticValue>23</StatisticValue>
                    </StatisticCard>
                </Statistics>
            ),
            `<Statistics>
  <StatisticCard><StatisticLabel>Open roles</StatisticLabel><StatisticValue>42</StatisticValue></StatisticCard>
  <StatisticCard><StatisticLabel>Submissions</StatisticLabel><StatisticValue>318</StatisticValue></StatisticCard>
</Statistics>`,
        ),
    ],
    status: [
        E(
            'variants',
            'Status variants',
            (
                <div className="flex flex-wrap items-center gap-2">
                    <Status variant="neutral">Draft</Status>
                    <Status variant="info">In review</Status>
                    <Status variant="success">Approved</Status>
                    <Status variant="warning">Needs follow-up</Status>
                    <Status variant="error">Blocked</Status>
                </div>
            ),
            `<Status variant="success">Approved</Status>`,
        ),
        E(
            'without-dot',
            'Status without indicator dot',
            (
                <div className="flex flex-wrap items-center gap-2">
                    <Status variant="success" dot={false}>
                        Active
                    </Status>
                    <Status variant="error" dot={false}>
                        Failed
                    </Status>
                </div>
            ),
            `<Status variant="success" dot={false}>Active</Status>`,
        ),
        E(
            'compact',
            'Compact status',
            (
                <div className="flex flex-wrap items-center gap-2">
                    <Status size="compact" variant="neutral">
                        Draft
                    </Status>
                    <Status size="compact" variant="info">
                        In review
                    </Status>
                    <Status size="compact" variant="success">
                        Approved
                    </Status>
                    <Status size="compact" variant="warning">
                        Needs follow-up
                    </Status>
                    <Status size="compact" variant="error">
                        Blocked
                    </Status>
                </div>
            ),
            `<Status size="compact" variant="success">Approved</Status>`,
        ),
    ],
    steps: [
        E(
            'workflow',
            'Step progress',
            (
                <Steps className="max-w-xl">
                    <Step state="complete">
                        <StepMarker state="complete" />
                        <StepContent>
                            <StepTitle>Profile submitted</StepTitle>
                            <StepDescription>All clinician details were received.</StepDescription>
                        </StepContent>
                    </Step>
                    <Step state="current">
                        <StepMarker state="current" index={2} />
                        <StepContent>
                            <StepTitle>Credential review</StepTitle>
                            <StepDescription>Compliance team is reviewing documentation.</StepDescription>
                        </StepContent>
                    </Step>
                    <Step state="upcoming">
                        <StepMarker state="upcoming" index={3} />
                        <StepContent>
                            <StepTitle>Facility approval</StepTitle>
                            <StepDescription>Awaiting final sign-off.</StepDescription>
                        </StepContent>
                    </Step>
                </Steps>
            ),
            `<Steps>
  <Step state="current">
    <StepMarker state="current" index={2} />
    <StepContent>
      <StepTitle>Credential review</StepTitle>
    </StepContent>
  </Step>
</Steps>`,
        ),
        E(
            'short',
            'Two-step compact flow',
            (
                <Steps className="max-w-md">
                    <Step state="complete">
                        <StepMarker state="complete" />
                        <StepContent>
                            <StepTitle>Upload resume</StepTitle>
                        </StepContent>
                    </Step>
                    <Step state="current">
                        <StepMarker state="current" index={2} />
                        <StepContent>
                            <StepTitle>Complete profile</StepTitle>
                            <StepDescription>Add certifications and preferred schedule.</StepDescription>
                        </StepContent>
                    </Step>
                </Steps>
            ),
            `<Steps>
  <Step state="complete"><StepMarker state="complete" /><StepContent><StepTitle>Upload resume</StepTitle></StepContent></Step>
  <Step state="current"><StepMarker state="current" index={2} /><StepContent><StepTitle>Complete profile</StepTitle></StepContent></Step>
</Steps>`,
        ),
    ],
    toolbar: [
        E(
            'actions',
            'Action toolbar',
            (
                <Toolbar>
                    <ToolbarGroup>
                        <Button size="sm" variant="outline">
                            Save
                        </Button>
                        <Button size="sm" variant="outline">
                            Share
                        </Button>
                    </ToolbarGroup>
                    <ToolbarDivider />
                    <ToolbarGroup>
                        <Button size="sm" variant="ghost">
                            Export
                        </Button>
                    </ToolbarGroup>
                </Toolbar>
            ),
            `<Toolbar>
  <ToolbarGroup>
    <Button size="sm" variant="outline">Save</Button>
  </ToolbarGroup>
  <ToolbarDivider />
  <ToolbarGroup>
    <Button size="sm" variant="ghost">Export</Button>
  </ToolbarGroup>
</Toolbar>`,
        ),
        E(
            'filters',
            'Toolbar with filters',
            (
                <Toolbar>
                    <ToolbarGroup>
                        <Button size="sm" variant="outline">
                            Today
                        </Button>
                        <Button size="sm" variant="outline">
                            This week
                        </Button>
                    </ToolbarGroup>
                    <ToolbarDivider />
                    <ToolbarGroup>
                        <Button size="sm" variant="ghost">
                            Clear
                        </Button>
                        <Button size="sm">Apply</Button>
                    </ToolbarGroup>
                </Toolbar>
            ),
            `<Toolbar>
  <ToolbarGroup>
    <Button size="sm" variant="outline">Today</Button>
    <Button size="sm" variant="outline">This week</Button>
  </ToolbarGroup>
  <ToolbarDivider />
  <ToolbarGroup>
    <Button size="sm">Apply</Button>
  </ToolbarGroup>
</Toolbar>`,
        ),
    ],
    footer: [
        E(
            'default',
            'Footer with copyright and links',
            <Footer
                links={[
                    { label: 'Privacy Policy', href: '#privacy' },
                    { label: 'Terms & Conditions', href: '#terms' },
                ]}
            />,
            `import { Footer } from "@chghealthcare/unified-design-system"

<Footer
  links={[
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms & Conditions", href: "#terms" },
  ]}
/>`,
        ),
    ],
    header: [
        E(
            'default',
            'App header with search and actions',
            <Header
                trailing={
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
                        <Button type="button" variant="ghost" size="sm" className="rounded-full px-0" aria-label="Account">
                            <Avatar size="sm" className="size-8">
                                <AvatarFallback className="text-xs">MT</AvatarFallback>
                            </Avatar>
                        </Button>
                    </>
                }
            />,
            `import { Header } from "@chghealthcare/unified-design-system"

<Header
  trailing={
    <>
      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
        <QuestionIcon className="size-5" />
      </Button>
      <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
        <BellIcon className="size-5" />
      </Button>
      <Button variant="ghost" size="sm" className="rounded-full px-0" aria-label="Account">
        <Avatar size="sm" className="size-8">
          <AvatarFallback className="text-xs">MT</AvatarFallback>
        </Avatar>
      </Button>
    </>
  }
/>`,
        ),
    ],
    'hover-card': [
        E('preview', 'Hover preview', <HoverCardDemo />, `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@chghealthcare/unified-design-system"

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link" className="px-0">@mstevens</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80 rounded-[4px]">
    <div className="space-y-1">
      <h4 className="text-sm font-semibold">@mstevens</h4>
      <p className="text-sm text-muted-foreground">Design system maintainer and documentation owner.</p>
    </div>
  </HoverCardContent>
</HoverCard>`),
    ],
    input: [
        E(
            'default',
            'Text input (44px)',
            <Input className="max-w-sm" placeholder="Placeholder" />,
            `<Input className="max-w-sm" placeholder="Placeholder" />`,
        ),
        E(
            'compact',
            'Compact (36px)',
            <Input inputSize="sm" className="max-w-sm" placeholder="Compact height" />,
            `<Input inputSize="sm" className="max-w-sm" placeholder="Compact height" />`,
        ),
        E('disabled', 'Disabled', <Input className="max-w-sm" disabled placeholder="Disabled" />, `<Input className="max-w-sm" disabled placeholder="Disabled" />`),
        E(
            'icons',
            'With icons (leading, trailing, compact)',
            <InputIconExamples />,
            `import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@chghealthcare/unified-design-system"

<InputGroup className="max-w-sm">
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>`,
        ),
    ],
    'input-group': [
        E(
            'addon',
            'With addon',
            (
                <InputGroup className="max-w-sm">
                    <InputGroupAddon>
                        <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="example.com" />
                </InputGroup>
            ),
            `import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@chghealthcare/unified-design-system"

<InputGroup className="max-w-sm">
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>`,
        ),
        E(
            'icons',
            'Icons in add-ons',
            <InputIconExamples />,
            `import { InputGroup, InputGroupAddon, InputGroupInput } from "@chghealthcare/unified-design-system"

<InputGroup className="max-w-sm">
  <InputGroupAddon>
    <EnvelopeIcon className="size-4 text-muted-foreground" aria-hidden />
  </InputGroupAddon>
  <InputGroupInput placeholder="name@example.com" type="email" />
</InputGroup>`,
        ),
    ],
    'input-otp': [
        E('six', 'Six digits with separator', <InputOTPDemo />, `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSeparator />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`),
        E(
            'compact',
            'Compact (mobile)',
            <InputOTPCompactDemo />,
            `<InputOTP maxLength={6}>
  <InputOTPGroup inputSize="sm" responsive={false}>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSeparator />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
        ),
    ],
    item: [
        E(
            'row',
            'List item',
            (
                <Item appearance="box" variant="outline" className="max-w-md">
                    <ItemContent>
                        <ItemTitle>Item title</ItemTitle>
                        <ItemDescription>Supporting line of text.</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <CaretRightIcon className="size-4 text-muted-foreground" />
                    </ItemActions>
                </Item>
            ),
            `import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@chghealthcare/unified-design-system"

<Item appearance="box" variant="outline" className="max-w-md">
  <ItemContent>
    <ItemTitle>Item title</ItemTitle>
    <ItemDescription>Supporting line of text.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <CaretRightIcon className="size-4 text-muted-foreground" />
  </ItemActions>
</Item>`,
        ),
    ],
    kbd: [
        E(
            'shortcut',
            'Keyboard hint',
            <p className="text-sm">
                Save{' '}
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>S</Kbd>
                </KbdGroup>
            </p>,
            `<KbdGroup><Kbd>⌘</Kbd><Kbd>S</Kbd></KbdGroup>`,
        ),
        E(
            'black',
            'Black keycaps',
            <p className="text-sm">
                Undo{' '}
                <KbdGroup>
                    <Kbd className="bg-black text-white shadow-sm dark:bg-black dark:text-white">
                        ⌘
                    </Kbd>
                    <Kbd className="bg-black text-white shadow-sm dark:bg-black dark:text-white">
                        Z
                    </Kbd>
                </KbdGroup>
            </p>,
            `<KbdGroup>
  <Kbd className="bg-black text-white shadow-sm dark:bg-black dark:text-white">⌘</Kbd>
  <Kbd className="bg-black text-white shadow-sm dark:bg-black dark:text-white">Z</Kbd>
</KbdGroup>`,
        ),
    ],
    label: [
        E(
            'with-input',
            'With control',
            (
                <div className="max-w-sm space-y-2">
                    <Label htmlFor="ex-lab">Username</Label>
                    <Input id="ex-lab" placeholder="shadcn" />
                </div>
            ),
            `<div className="max-w-sm space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="shadcn" />
</div>`,
        ),
    ],
    medallion: [
        E(
            'pastel-colors',
            'Pastel palette (default tone)',
            (
                <div className="space-y-3">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Default <span className="font-mono">tone=&quot;pastel&quot;</span> — tinted surfaces from{' '}
                        <span className="font-mono">MEDALLION_PASTEL_PALETTE</span> with a deeper icon; dark mode inverts
                        surface and icon.
                    </p>
                    <div className="flex flex-wrap items-end gap-x-6 gap-y-8">
                        {MEDALLION_COLORS.map((color) => (
                            <div key={color} className="flex flex-col items-center gap-2">
                                <Medallion
                                    color={color}
                                    tone="pastel"
                                    icon={<FileTextIcon weight="bold" aria-hidden />}
                                />
                                <span className="max-w-[5.5rem] text-center font-mono text-xs text-neutral-500 dark:text-neutral-400">
                                    {color}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ),
            `import { MEDALLION_COLORS, Medallion } from "@chghealthcare/unified-design-system"

{MEDALLION_COLORS.map((color) => (
  <Medallion
    key={color}
    color={color}
    tone="pastel"
    icon={<FileTextIcon weight="bold" aria-hidden />}
  />
))}`,
            'Pastel is the default; omitting `tone` matches `tone="pastel"`.',
        ),
        E(
            'solid-colors',
            'Solid palette (`tone="solid"`)',
            (
                <div className="space-y-3">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        <span className="font-mono">tone=&quot;solid&quot;</span> uses{' '}
                        <span className="font-mono">MEDALLION_SOLID_PALETTE</span> (~800 fill, white icon). Same pairing
                        in dark mode (no inversion). Useful on light gray surfaces such as secondary cards or dropzones.
                    </p>
                    <div className="rounded-xl border border-neutral-200 bg-neutral-100 p-6 dark:border-neutral-700 dark:bg-neutral-900/80">
                        <div className="flex flex-wrap items-end gap-x-6 gap-y-8">
                            {MEDALLION_COLORS.map((color) => (
                                <div key={color} className="flex flex-col items-center gap-2">
                                    <Medallion
                                        color={color}
                                        tone="solid"
                                        icon={<FileTextIcon weight="bold" aria-hidden />}
                                    />
                                    <span className="max-w-[5.5rem] text-center font-mono text-xs text-neutral-600 dark:text-neutral-400">
                                        {color}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ),
            `import { MEDALLION_COLORS, Medallion } from "@chghealthcare/unified-design-system"

{MEDALLION_COLORS.map((color) => (
  <Medallion
    key={color}
    color={color}
    tone="solid"
    icon={<FileTextIcon weight="bold" aria-hidden />}
  />
))}`,
        ),
        E(
            'shapes',
            'Shapes: square, rounded (12px radius), and circle',
            (
                <div className="flex flex-wrap items-end gap-6">
                    {(
                        [
                            ['square', 'square'],
                            ['rounded', 'rounded'],
                            ['circle', 'circle'],
                        ] as const satisfies readonly (readonly [string, MedallionShape])[]
                    ).map(([label, shape]) => (
                        <div key={shape} className="flex flex-col items-center gap-2">
                            <Medallion
                                color="sky"
                                size="lg"
                                shape={shape}
                                icon={<FileTextIcon weight="bold" aria-hidden />}
                            />
                            <span className="text-xs capitalize text-neutral-500 dark:text-neutral-400">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            ),
            `<Medallion color="sky" size="lg" shape="square" icon={<FileTextIcon weight="bold" />} />
<Medallion color="sky" size="lg" shape="rounded" icon={<FileTextIcon weight="bold" />} />
<Medallion color="sky" size="lg" shape="circle" icon={<FileTextIcon weight="bold" />} />`,
        ),
        E(
            'size-shape',
            'Sizes (default circle)',
            (
                <div className="flex flex-wrap items-center gap-4">
                    {(['xs', 'sm', 'default', 'lg', 'xl'] as MedallionSize[]).map((size) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                            <Medallion
                                color="sky"
                                size={size}
                                shape="circle"
                                icon={<FileTextIcon weight="bold" aria-hidden />}
                            />
                            <span className="text-xs capitalize text-neutral-500 dark:text-neutral-400">
                                {size}
                            </span>
                        </div>
                    ))}
                </div>
            ),
            `<Medallion color="sky" icon={<FileTextIcon weight="bold" />} size="lg" shape="circle" />`,
        ),
    ],
    menubar: [
        E('bar', 'Menu bar', <MenubarDemo />, `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@chghealthcare/unified-design-system"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New tab</MenubarItem>
      <MenubarItem>Open…</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`),
    ],
    'native-select': [
        E(
            'default',
            'Default height',
            (
                <NativeSelect defaultValue="a" className="w-[160px]">
                    <NativeSelectOption value="a">Alpha</NativeSelectOption>
                    <NativeSelectOption value="b">Beta</NativeSelectOption>
                </NativeSelect>
            ),
            `<NativeSelect defaultValue="a" className="w-[160px]">
  <NativeSelectOption value="a">Alpha</NativeSelectOption>
  <NativeSelectOption value="b">Beta</NativeSelectOption>
</NativeSelect>`,
        ),
        E(
            'small',
            'Small size',
            (
                <NativeSelect inputSize="sm" defaultValue="1" className="w-[160px]">
                    <NativeSelectOption value="1">One</NativeSelectOption>
                    <NativeSelectOption value="2">Two</NativeSelectOption>
                </NativeSelect>
            ),
            `<NativeSelect inputSize="sm" defaultValue="1" className="w-[160px]">
  <NativeSelectOption value="1">One</NativeSelectOption>
  <NativeSelectOption value="2">Two</NativeSelectOption>
</NativeSelect>`,
        ),
    ],
    'navigation-menu': [
        E(
            'dropdown',
            'Links & dropdown',
            <NavigationMenuDemo />,
            `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@chghealthcare/unified-design-system"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#">Locum staffing</NavigationMenuLink>
        <NavigationMenuLink href="#">Permanent placement</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
        ),
    ],
    'number-input': [
        E(
            'decimal',
            'Numeric value',
            <NumberInput className="max-w-sm" placeholder="0.00" aria-label="Hourly rate" />,
            `<NumberInput className="max-w-sm" placeholder="0.00" aria-label="Hourly rate" />`,
        ),
    ],
    'password-input': [
        E(
            'credential',
            'Password field',
            <PasswordInput className="max-w-sm" placeholder="Enter password" aria-label="Password" />,
            `<PasswordInput className="max-w-sm" placeholder="Enter password" aria-label="Password" />`,
        ),
    ],
    'phone-input': [
        E(
            'contact',
            'Phone number',
            <PhoneInput className="max-w-sm" placeholder="(555) 123-4567" aria-label="Phone number" />,
            `<PhoneInput className="max-w-sm" placeholder="(555) 123-4567" aria-label="Phone number" />`,
        ),
    ],
    pagination: [
        E(
            'pages',
            'Page controls',
            (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            ),
            `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        ),
        E(
            'default-variant',
            'Default with ellipses',
            <PaginationDefaultDemo />,
            `const pages = getPaginationPages({ currentPage: 8, totalPages: 18 })

<Pagination variant="default" className="w-full max-w-xl justify-start">
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
    </PaginationItem>
    {pages.map((page, index) =>
      typeof page === "number" ? (
        <PaginationItem key={page}>
          <PaginationLink href="#" isActive={page === 8} onClick={(e) => e.preventDefault()}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem key={\`ellipsis-\${index}\`}>
          <PaginationEllipsis />
        </PaginationItem>
      ),
    )}
    <PaginationItem>
      <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        ),
        E(
            'line-variant',
            'Line variant',
            <PaginationLineDemo />,
            `const pages = getPaginationPages({ currentPage: 6, totalPages: 12 })

<Pagination variant="line" className="w-full max-w-xl justify-start">
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
    </PaginationItem>
    {pages.map((page, index) =>
      typeof page === "number" ? (
        <PaginationItem key={page}>
          <PaginationLink href="#" isActive={page === 6} onClick={(e) => e.preventDefault()}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem key={\`ellipsis-\${index}\`}>
          <PaginationEllipsis />
        </PaginationItem>
      ),
    )}
    <PaginationItem>
      <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        ),
        E('jump', 'Jump control', <PaginationJumpDemo />, `<PaginationJump>
  <span className="sr-only">Jump to page</span>
</PaginationJump>`),
        E(
            'line-jump',
            'Line with jump',
            <PaginationLineJumpDemo />,
            `<Pagination variant="line"><PaginationJump /></Pagination>`,
        ),
        E(
            'line-boundary',
            'Line with first/last',
            <PaginationLineBoundaryDemo />,
            `<PaginationFirst /><PaginationLast />`,
        ),
        E(
            'small-pages',
            'Compact page list',
            <PaginationSmallCountDemo />,
            `<PaginationLink href="#" isActive>
  2
</PaginationLink>`,
        ),
    ],
    popover: [E('anchored', 'Popover', <PopoverVariants />, `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-2">
      <h4 className="font-medium">Share candidate</h4>
      <p className="text-sm text-muted-foreground">Copy a secure link or send the profile directly.</p>
    </div>
  </PopoverContent>
</Popover>`)],
    progress: [
        E(
            'value',
            'Determinate',
            (
                <div className="flex max-w-xs flex-col gap-4">
                    <Progress value={40} />
                    <Progress value={75} />
                </div>
            ),
            `<Progress value={40} />`,
        ),
        E(
            'with-label',
            'With percent at end',
            (
                <div className="flex w-full max-w-md flex-col gap-4">
                    {(
                        [
                            { value: 15, label: 'Queued' },
                            { value: 48, label: 'In progress' },
                            { value: 92, label: 'Almost done' },
                            { value: 100, label: 'Complete' },
                        ] as const
                    ).map(({ value, label }) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="w-28 shrink-0 text-xs font-medium text-neutral-800 dark:text-neutral-200">
                                {label}
                            </span>
                            <Progress value={value} className="flex-1" />
                            <span className="min-w-9 shrink-0 text-right text-xs font-medium tabular-nums text-neutral-600 dark:text-neutral-300">
                                {value}%
                            </span>
                        </div>
                    ))}
                </div>
            ),
            `<div className="flex items-center gap-3">
  <span className="w-28 shrink-0 text-xs font-medium">In progress</span>
  <Progress value={48} className="flex-1" />
  <span className="min-w-9 text-xs font-medium tabular-nums">48%</span>
</div>`,
        ),
        E(
            'tooltip-bar',
            'Value in tooltip (hover bar)',
            (
                <TooltipProvider delayDuration={200}>
                    <div className="flex w-full max-w-md flex-col gap-5">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Hover the handle at the end of each fill — the tooltip anchors there.
                        </p>
                        {([28, 56, 87] as const).map((value) => (
                            <div key={value} className="relative w-full py-0.5">
                                <Progress value={value} className="w-full" />
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            className="absolute top-1/2 z-10 flex size-6 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                            style={{ left: progressIndicatorAnchorLeft(value) }}
                                            aria-label={`Progress: ${value}%`}
                                        >
                                            <span
                                                className="size-2 shrink-0 rounded-full bg-primary shadow-sm ring-2 ring-background"
                                                aria-hidden
                                            />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={6} align="center">
                                        <span className="tabular-nums">{value}%</span>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </TooltipProvider>
            ),
            `// Relative track + trigger positioned at the fill edge (left: value%, -translate-x-1/2)
<div className="relative w-full py-0.5">
  <Progress value={56} />
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        type="button"
        className="absolute top-1/2 z-10 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-transparent p-0"
        style={{ left: "56%" }}
        aria-label="Progress: 56%"
      >
        <span className="size-2 rounded-full bg-primary ring-2 ring-background" aria-hidden />
      </button>
    </TooltipTrigger>
    <TooltipContent side="top" sideOffset={6}>
      <span className="tabular-nums">56%</span>
    </TooltipContent>
  </Tooltip>
</div>`,
        ),
        E(
            'tooltip-icon',
            'Value in tooltip (info trigger)',
            (
                <TooltipProvider delayDuration={200}>
                    <div className="flex w-full max-w-md flex-col gap-4">
                        {(
                            [
                                { value: 41, label: 'Sync' },
                                { value: 76, label: 'Upload' },
                            ] as const
                        ).map(({ value, label }) => (
                            <ProgressDocInfoTooltipRow key={label} value={value} label={label} />
                        ))}
                    </div>
                </TooltipProvider>
            ),
            `// Fixed info button; invisible 1px anchor at left: value% for tooltip position; controlled open from icon + content hover
<Tooltip open={open} onOpenChange={setOpen}>
  <div className="relative flex-1 py-0.5">
    <Progress value={76} />
    <TooltipTrigger asChild>
      <span
        className="pointer-events-none absolute top-1/2 h-0 w-px -translate-y-1/2"
        style={{ left: "76%" }}
      />
    </TooltipTrigger>
  </div>
  <button
    type="button"
    onPointerEnter={() => setOpen(true)}
    onPointerLeave={() => setOpen(false)}
  >
    <InfoIcon className="size-4" aria-hidden />
    <span className="sr-only">Show upload progress</span>
  </button>
  <TooltipContent onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)}>
    76% complete
  </TooltipContent>
</Tooltip>`,
        ),
    ],
    'radio-group': [
        E(
            'group',
            'Radio options',
            (
                <RadioGroup defaultValue="comfortable" className="max-w-xs">
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="default" id="rg-default" />
                        <RadioGroupLabel htmlFor="rg-default">Default</RadioGroupLabel>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="comfortable" id="rg-comf" />
                        <RadioGroupLabel htmlFor="rg-comf">Comfortable</RadioGroupLabel>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="compact" id="rg-compact" />
                        <RadioGroupLabel htmlFor="rg-compact">Compact</RadioGroupLabel>
                    </div>
                </RadioGroup>
            ),
            `import { RadioGroup, RadioGroupItem, RadioGroupLabel } from "@chghealthcare/unified-design-system"

<RadioGroup defaultValue="comfortable" className="max-w-xs">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="rg-default" />
    <RadioGroupLabel htmlFor="rg-default">Default</RadioGroupLabel>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="rg-comf" />
    <RadioGroupLabel htmlFor="rg-comf">Comfortable</RadioGroupLabel>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="compact" id="rg-compact" />
    <RadioGroupLabel htmlFor="rg-compact">Compact</RadioGroupLabel>
  </div>
</RadioGroup>`,
        ),
    ],
    resizable: [
        E('split', 'Resizable panels', <ResizableDemo />, `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@chghealthcare/unified-design-system"

<ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={35}>Navigation</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={65}>Details</ResizablePanel>
</ResizablePanelGroup>`),
    ],
    'scroll-area': [
        E(
            'scroll',
            'Scroll container',
            (
                <ScrollArea className="h-28 max-w-xs rounded-md border">
                    <div className="space-y-2 p-3 text-sm">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <p key={i}>Line {i + 1}</p>
                        ))}
                    </div>
                </ScrollArea>
            ),
            `<ScrollArea className="h-28 max-w-xs rounded-md border">
  <div className="space-y-2 p-3 text-sm">
    {Array.from({ length: 12 }).map((_, i) => (
      <p key={i}>Line {i + 1}</p>
    ))}
  </div>
</ScrollArea>`,
        ),
    ],
    'search-input': [
        E(
            'query',
            'Search query',
            <SearchInput className="max-w-sm" placeholder="Search providers" aria-label="Search providers" />,
            `<form onSubmit={(e) => e.preventDefault()}>
  <SearchInput className="max-w-sm" placeholder="Search providers" aria-label="Search providers" />
</form>`,
        ),
        E(
            'shortcut',
            'Shortcut hint',
            <SearchInput
                className="max-w-sm"
                variant="shortcut"
                placeholder="Search…"
                aria-label="Search workspace"
            />,
            `<SearchInput
  className="max-w-sm"
  variant="shortcut"
  placeholder="Search…"
  aria-label="Search workspace"
/>`,
        ),
    ],
    select: [
        E(
            'basic',
            'Select',
            <SelectBasicDemo />,
            `<Select defaultValue="staffing">
  <SelectTrigger className="w-[220px]">
    <SelectValue placeholder="Choose a specialty" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="staffing">Staffing</SelectItem>
    <SelectItem value="credentialing">Credentialing</SelectItem>
    <SelectItem value="travel">Travel</SelectItem>
  </SelectContent>
</Select>`,
        ),
        E(
            'searchable',
            'Select with search',
            <SelectSearchableDemo />,
            `<Select defaultValue="neurology">
  <SelectTrigger className="w-[220px]">
    <SelectValue placeholder="Choose a specialty" />
  </SelectTrigger>
  <SelectContent
    searchable
    searchPlaceholder="Filter specialties…"
    searchAriaLabel="Filter specialties"
  >
    <SelectItem value="cardiology">Cardiology</SelectItem>
    <SelectItem value="neurology">Neurology</SelectItem>
    {/* … */}
  </SelectContent>
</Select>`,
        ),
    ],
    separator: [
        E(
            'horizontal',
            'Horizontal',
            <div className="flex max-w-xs flex-col gap-2 text-sm">
                <span>Above</span>
                <Separator />
                <span>Below</span>
            </div>,
            `<Separator />`,
        ),
        E(
            'vertical',
            'Vertical',
            <div className="flex h-8 max-w-xs items-center gap-2 text-sm">
                <span>Left</span>
                <Separator orientation="vertical" />
                <span>Right</span>
            </div>,
            `<Separator orientation="vertical" />`,
        ),
        E(
            'with-label',
            'With label (pill on line)',
            <div className="flex w-full max-w-md flex-col gap-8 text-sm">
                <Separator variant="label" label="Left aligned" labelAlign="left" />
                <Separator variant="label" label="Center aligned" labelAlign="center" />
                <Separator variant="label" label="Right aligned" labelAlign="right" />
            </div>,
            `<div className="flex w-full max-w-md flex-col gap-8">
  <Separator variant="label" label="Left aligned" labelAlign="left" />
  <Separator variant="label" label="Center aligned" labelAlign="center" />
  <Separator variant="label" label="Right aligned" labelAlign="right" />
</div>`,
        ),
        E(
            'band',
            'Band (8px neutral strip)',
            <div className="flex w-full max-w-md flex-col gap-2 text-sm">
                <span>Section A</span>
                <Separator variant="band" />
                <span>Section B</span>
            </div>,
            `<div className="flex w-full max-w-md flex-col gap-2">
  <span>Section A</span>
  <Separator variant="band" />
  <span>Section B</span>
</div>`,
        ),
    ],
    sheet: [E('side', 'Edge sheet', <SheetSidePreview />, `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open sheet</Button>
  </SheetTrigger>
  <SheetContent side="right" className="sm:max-w-md">
    <SheetHeader>
      <SheetTitle>Candidate details</SheetTitle>
      <SheetDescription>Review notes and contact information without leaving the list.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`)],
    sidebar: [
        {
            id: 'layout',
            title: 'App shell',
            previewInner: (
                <div className="flex min-h-0 flex-1 flex-col gap-4">
                    <SidebarLayoutDemo className="min-h-0 flex-1" />
                    <p className="shrink-0 text-sm text-muted-foreground">
                        Full API and rail variants live in{' '}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">src/components/ui/sidebar.tsx</code>.
                    </p>
                </div>
            ),
            preview: (
                <ExampleCanvas className="flex min-h-[calc(100svh-12rem)] flex-col">
                    <div className="flex min-h-0 flex-1 flex-col gap-4">
                        <SidebarLayoutDemo className="min-h-0 flex-1" />
                        <p className="shrink-0 text-sm text-muted-foreground">
                            Full API and rail variants live in{' '}
                            <code className="rounded bg-muted px-1 py-0.5 text-xs">src/components/ui/sidebar.tsx</code>.
                        </p>
                    </div>
                </ExampleCanvas>
            ),
            code: `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@chghealthcare/unified-design-system"

// Controlled icon rail (matches DocShell): set --sidebar-width / --sidebar-width-icon on the provider.
<SidebarProvider open={open} onOpenChange={setOpen} style={{ "--sidebar-width": "280px", "--sidebar-width-icon": "72px" }}>
  <Sidebar id="app-sidebar" collapsible="icon">
    <SidebarHeader>{/* logo / workspace */}</SidebarHeader>
    <SidebarContent>{/* navigation groups */}</SidebarContent>
    <SidebarFooter>{/* account actions */}</SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    <main>{/* page content */}</main>
  </SidebarInset>
</SidebarProvider>`,
        },
    ],
    skeleton: [
        E(
            'placeholders',
            'Loading skeletons',
            <div className="max-w-xs space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
            </div>,
            `<Skeleton className="h-4 w-[200px]" />`,
        ),
    ],
    slider: [
        E(
            'single',
            'Single value',
            <Slider defaultValue={[40]} max={100} step={1} className="max-w-xs" />,
            `<Slider defaultValue={[40]} max={100} step={1} />`,
        ),
        E(
            'range',
            'Range (two thumbs)',
            <Slider defaultValue={[25, 75]} max={100} step={1} className="max-w-xs" />,
            `<Slider defaultValue={[25, 75]} max={100} />`,
        ),
        E(
            'stepped',
            'Stepped movement',
            <SliderSteppedDemo />,
            `const [value, setValue] = React.useState([40])

<div className="flex max-w-xs flex-col gap-3">
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">Level</span>
    <span className="tabular-nums">{value[0]}</span>
  </div>
  <Slider value={value} onValueChange={setValue} max={100} step={10} />
</div>`,
        ),
    ],
    sonner: [
        E(
            'toaster',
            'Toasts',
            <div className="flex max-w-md flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                    Mount <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;Toaster /&gt;</code> near the app root and call{' '}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">toast()</code> from{' '}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">sonner</code>.
                </p>
                <Button type="button" variant="outline" onClick={() => toast.success('Profile saved')}>
                    Show toast
                </Button>
            </div>,
            `import { Toaster } from "@chghealthcare/unified-design-system"
import { toast } from "sonner"

<>
  <Toaster />
  <Button onClick={() => toast.success("Profile saved")}>Show toast</Button>
</>`,
        ),
    ],
    spinner: [
        E(
            'loading',
            'Spinner',
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Spinner />
                Loading…
            </div>,
            `<Spinner />`,
        ),
    ],
    switch: [
        E(
            'sizes',
            'Default & small',
            (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Switch id="sw-def" />
                        <Label htmlFor="sw-def">Default</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="sw-sm" size="sm" />
                        <Label htmlFor="sw-sm">Small</Label>
                    </div>
                </div>
            ),
            `<Switch size="default|sm" />`,
        ),
    ],
    table: [
        E(
            'examples',
            'Basic and caption + footer',
            (
                <div className="flex w-full flex-col gap-8">
                    <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Basic</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Alex</TableCell>
                                    <TableCell>Admin</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Sam</TableCell>
                                    <TableCell>Member</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Caption and footer</p>
                        <Table>
                            <TableCaption>Team members and roles for this workspace.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-right">Hours</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Alex</TableCell>
                                    <TableCell>Admin</TableCell>
                                    <TableCell className="text-right">40</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Sam</TableCell>
                                    <TableCell>Member</TableCell>
                                    <TableCell className="text-right">32</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell className="text-right">72</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            ),
            `<div className="flex w-full flex-col gap-8">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Alex</TableCell>
        <TableCell>Admin</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Sam</TableCell>
        <TableCell>Member</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <Table>
    <TableCaption>Team members and roles for this workspace.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead className="text-right">Hours</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Alex</TableCell>
        <TableCell>Admin</TableCell>
        <TableCell className="text-right">40</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Sam</TableCell>
        <TableCell>Member</TableCell>
        <TableCell className="text-right">32</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell className="text-right">72</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</div>`,
        ),
    ],
    tabs: [
        E(
            'default',
            'Pill tabs (default list)',
            (
                <Tabs defaultValue="account" className="max-w-md">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="text-sm text-muted-foreground">
                        Account settings panel.
                    </TabsContent>
                    <TabsContent value="password" className="text-sm text-muted-foreground">
                        Password settings panel.
                    </TabsContent>
                </Tabs>
            ),
            `<Tabs defaultValue="account" className="max-w-md">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings panel.</TabsContent>
  <TabsContent value="password">Password settings panel.</TabsContent>
</Tabs>`,
        ),
        E(
            'fill',
            'Pill tabs (fill width)',
            (
                <Tabs defaultValue="account" className="max-w-xl">
                    <TabsList fill>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="text-sm text-muted-foreground">
                        Account settings panel.
                    </TabsContent>
                    <TabsContent value="password" className="text-sm text-muted-foreground">
                        Password settings panel.
                    </TabsContent>
                    <TabsContent value="notifications" className="text-sm text-muted-foreground">
                        Notification preferences.
                    </TabsContent>
                </Tabs>
            ),
            `<Tabs defaultValue="account" className="max-w-xl">
  <TabsList fill>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings panel.</TabsContent>
  <TabsContent value="password">Password settings panel.</TabsContent>
  <TabsContent value="notifications">Notification preferences.</TabsContent>
</Tabs>`,
        ),
        E(
            'line',
            'Underline tabs',
            (
                <Tabs defaultValue="one" className="max-w-md">
                    <TabsList variant="line">
                        <TabsTrigger value="one">First</TabsTrigger>
                        <TabsTrigger value="two">Second</TabsTrigger>
                    </TabsList>
                    <TabsContent value="one" className="text-sm text-muted-foreground">
                        First panel.
                    </TabsContent>
                    <TabsContent value="two" className="text-sm text-muted-foreground">
                        Second panel.
                    </TabsContent>
                </Tabs>
            ),
            `<Tabs defaultValue="one" className="max-w-md">
  <TabsList variant="line">
    <TabsTrigger value="one">First</TabsTrigger>
    <TabsTrigger value="two">Second</TabsTrigger>
  </TabsList>
  <TabsContent value="one">First panel.</TabsContent>
  <TabsContent value="two">Second panel.</TabsContent>
</Tabs>`,
        ),
        E(
            'vertical',
            'Vertical tabs',
            (
                <Tabs defaultValue="profile" orientation="vertical" className="max-w-3xl">
                    <TabsList variant="line" className="w-52 border-r border-b-0 pr-2">
                        <TabsTrigger value="profile" className="w-full justify-start">
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="availability" className="w-full justify-start">
                            Availability
                        </TabsTrigger>
                        <TabsTrigger value="documents" className="w-full justify-start">
                            Documents
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="profile"
                        className="rounded-[8px] border border-[var(--uds-border-primary)] p-4 text-sm text-muted-foreground"
                    >
                        Profile details, licenses, and credential highlights.
                    </TabsContent>
                    <TabsContent
                        value="availability"
                        className="rounded-[8px] border border-[var(--uds-border-primary)] p-4 text-sm text-muted-foreground"
                    >
                        Weekly availability and blackout dates.
                    </TabsContent>
                    <TabsContent
                        value="documents"
                        className="rounded-[8px] border border-[var(--uds-border-primary)] p-4 text-sm text-muted-foreground"
                    >
                        Document status and required upload checklist.
                    </TabsContent>
                </Tabs>
            ),
            `<Tabs defaultValue="profile" orientation="vertical" className="max-w-3xl">
  <TabsList variant="line" className="w-52 border-r border-b-0 pr-2">
    <TabsTrigger value="profile" className="w-full justify-start">Profile</TabsTrigger>
    <TabsTrigger value="availability" className="w-full justify-start">Availability</TabsTrigger>
    <TabsTrigger value="documents" className="w-full justify-start">Documents</TabsTrigger>
  </TabsList>
  <TabsContent value="profile" className="rounded-[8px] border p-4">Profile details…</TabsContent>
</Tabs>`,
        ),
    ],
    text: [
        E(
            'groups',
            'Body, heading, and display',
            (
                <div className="flex max-w-xl flex-col gap-4">
                    <Text variant="body" size="14" weight="regular">
                        Body 14 regular — default copy for forms, tables, and supporting lines.
                    </Text>
                    <Text variant="heading" size="24" weight="semibold">
                        Heading 24 semibold — section headings.
                    </Text>
                    <Text variant="display" size="48" weight="semibold">
                        Display 48 semibold — hero and marketing headlines.
                    </Text>
                </div>
            ),
            `import { Text } from "@chghealthcare/unified-design-system"

<Text variant="body" size="14" weight="regular">…</Text>
<Text variant="heading" size="24" weight="semibold">…</Text>
<Text variant="display" size="48" weight="semibold">…</Text>`,
        ),
        E(
            'body-scale',
            'Body sizes',
            (
                <div className="flex max-w-xl flex-col gap-3">
                    <Text variant="body" size="10" weight="medium" as="span" className="text-muted-foreground">
                        Body 10 — captions, meta, and ultra-dense UI.
                    </Text>
                    <Text variant="body" size="12" weight="medium" as="span" className="text-muted-foreground">
                        Body 12 — compact labels and secondary lines.
                    </Text>
                    <Text variant="body" size="14" weight="regular">
                        Body 14 — default body copy.
                    </Text>
                    <Text variant="body" size="16" weight="regular">
                        Body 16 — roomier paragraphs and descriptions.
                    </Text>
                    <Text variant="body" size="18" weight="regular">
                        Body 18 — intermediate body emphasis.
                    </Text>
                    <Text variant="body" size="20" weight="medium">
                        Body 20 — lead copy and emphasized body text.
                    </Text>
                </div>
            ),
            `<Text variant="body" size="10" weight="medium" as="span">…</Text>
<Text variant="body" size="12" weight="medium" as="span">…</Text>
<Text variant="body" size="14" weight="regular">…</Text>
<Text variant="body" size="16" weight="regular">…</Text>
<Text variant="body" size="18" weight="regular">…</Text>
<Text variant="body" size="20" weight="medium">…</Text>`,
        ),
        E(
            'heading-display-scale',
            'Heading and display sizes',
            (
                <div className="flex max-w-xl flex-col gap-4">
                    <Text variant="heading" size="24" weight="semibold">
                        Heading 24
                    </Text>
                    <Text variant="heading" size="28" weight="semibold">
                        Heading 28
                    </Text>
                    <Text variant="heading" size="32" weight="semibold">
                        Heading 32
                    </Text>
                    <Text variant="display" size="36" weight="semibold">
                        Display 36
                    </Text>
                    <Text variant="display" size="48" weight="semibold">
                        Display 48
                    </Text>
                    <Text variant="display" size="60" weight="semibold">
                        Display 60
                    </Text>
                </div>
            ),
            `<Text variant="heading" size="24" weight="semibold">…</Text>
<Text variant="heading" size="28" weight="semibold">…</Text>
<Text variant="heading" size="32" weight="semibold">…</Text>
<Text variant="display" size="36" weight="semibold">…</Text>
<Text variant="display" size="48" weight="semibold">…</Text>
<Text variant="display" size="60" weight="semibold">…</Text>`,
        ),
        E(
            'line-height',
            'Line-height presets',
            (
                <div className="flex max-w-xl flex-col gap-3">
                    <Text variant="body" size="16" lineHeight="tight">
                        Body 16 tight — denser multi-line copy.
                    </Text>
                    <Text variant="body" size="16" lineHeight="regular">
                        Body 16 regular — default rhythm for paragraphs.
                    </Text>
                    <Text variant="body" size="16" lineHeight="loose">
                        Body 16 loose — extra breathing room between lines.
                    </Text>
                </div>
            ),
            `<Text variant="body" size="16" lineHeight="tight">…</Text>
<Text variant="body" size="16" lineHeight="regular">…</Text>
<Text variant="body" size="16" lineHeight="loose">…</Text>`,
        ),
        E(
            'appearance',
            'Semantic text colors',
            (
                <div className="flex max-w-xl flex-col gap-2">
                    <Text variant="body" size="14" appearance="primary">
                        appearance=&quot;primary&quot; — main body copy
                    </Text>
                    <Text variant="body" size="14" appearance="secondary">
                        appearance=&quot;secondary&quot; — supporting copy
                    </Text>
                    <Text variant="body" size="14" appearance="tertiary">
                        appearance=&quot;tertiary&quot; — de-emphasized
                    </Text>
                </div>
            ),
            `<Text variant="body" size="14" appearance="primary">…</Text>
<Text variant="body" size="14" appearance="secondary">…</Text>
<Text variant="body" size="14" appearance="tertiary">…</Text>`,
        ),
    ],
    textarea: [
        E(
            'multiline',
            'Textarea',
            <Textarea className="max-w-md" placeholder="Notes…" />,
            `<Textarea className="max-w-md" placeholder="Notes…" />`,
        ),
    ],
    'time-input': [
        E(
            'clock',
            'Time field',
            <TimeInput className="max-w-sm" defaultValue="09:30" aria-label="Start time" />,
            `<TimeInput className="max-w-sm" defaultValue="09:30" aria-label="Start time" />`,
        ),
        E(
            'clock-timezone',
            'With timezone',
            <TimeInput className="max-w-sm" defaultValue="09:30" showTimezone timezone="EST" aria-label="Start time" />,
            `<TimeInput
  className="max-w-sm"
  defaultValue="09:30"
  showTimezone
  timezone="EST"
  aria-label="Start time"
/>`,
        ),
    ],
    'time-step-input': [
        E(
            'steps',
            'Stepped dropdown times',
            <TimeStepInput className="max-w-sm" stepMinutes={15} startTime="08:00" endTime="17:00" defaultValue="09:30" aria-label="Start time in 15-minute steps" />,
            `<TimeStepInput
  className="max-w-sm"
  stepMinutes={15}
  startTime="08:00"
  endTime="17:00"
  defaultValue="09:30"
  aria-label="Start time in 15-minute steps"
/>`,
        ),
        E(
            'steps-timezone',
            'With timezone',
            <TimeStepInput className="max-w-sm" stepMinutes={15} startTime="08:00" endTime="17:00" defaultValue="09:30" showTimezone timezone="EST" aria-label="Start time in 15-minute steps" />,
            `<TimeStepInput
  className="max-w-sm"
  stepMinutes={15}
  startTime="08:00"
  endTime="17:00"
  defaultValue="09:30"
  showTimezone
  timezone="EST"
  aria-label="Start time in 15-minute steps"
/>`,
        ),
    ],
    'token-input': [
        E(
            'api-token',
            'Token chips',
            <TokenInput className="max-w-md" placeholder="Add skill and press Enter" defaultTokens={["React", "TypeScript"]} aria-label="Skills" />,
            `<TokenInput
  className="max-w-md"
  placeholder="Add skill and press Enter"
  defaultTokens={["React", "TypeScript"]}
  aria-label="Skills"
/>`,
        ),
        E(
            'small',
            'Small (mobile)',
            <TokenInput inputSize="sm" className="max-w-md" placeholder="Add token" defaultTokens={["Design", "Engineering"]} aria-label="Tags" />,
            `<TokenInput
  inputSize="sm"
  className="max-w-md"
  placeholder="Add token"
  defaultTokens={["Design", "Engineering"]}
  aria-label="Tags"
/>`,
        ),
    ],
    toggle: [
        E(
            'variants',
            'Default & outline',
            (
                <div className="flex flex-wrap gap-2">
                    <Toggle aria-label="Bold default" size="sm">
                        <TextBIcon aria-hidden />
                    </Toggle>
                    <Toggle variant="outline" aria-label="Italic outline" size="sm">
                        <TextItalicIcon aria-hidden />
                    </Toggle>
                </div>
            ),
            `<div className="flex flex-wrap gap-2">
  <Toggle aria-label="Bold default" size="sm">
    <TextBIcon aria-hidden />
  </Toggle>
  <Toggle variant="outline" aria-label="Italic outline" size="sm">
    <TextItalicIcon aria-hidden />
  </Toggle>
</div>`,
        ),
    ],
    'toggle-group': [
        E(
            'single',
            'Single selection',
            (
                <ToggleGroup type="single" defaultValue="list" variant="outline" spacing={0}>
                    <ToggleGroupItem value="list" aria-label="List view">
                        List
                    </ToggleGroupItem>
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                        Grid
                    </ToggleGroupItem>
                </ToggleGroup>
            ),
            `<ToggleGroup type="single" defaultValue="list" variant="outline" spacing={0}>
  <ToggleGroupItem value="list" aria-label="List view">List</ToggleGroupItem>
  <ToggleGroupItem value="grid" aria-label="Grid view">Grid</ToggleGroupItem>
</ToggleGroup>`,
        ),
    ],
    tooltip: [E('hover', 'Tooltip', <TooltipVariants />, `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="top">Shows additional context on hover.</TooltipContent>
  </Tooltip>
</TooltipProvider>`)],
    'url-input': [
        E(
            'website',
            'URL field',
            <UrlInput className="max-w-[412px]" placeholder="example.com" aria-label="Website URL" />,
            `<UrlInput className="max-w-[412px]" placeholder="example.com" aria-label="Website URL" />`,
        ),
        E(
            'small',
            'Small',
            <UrlInput className="max-w-[412px]" inputSize="sm" placeholder="example.com" aria-label="Website URL" />,
            `<UrlInput className="max-w-[412px]" inputSize="sm" placeholder="example.com" aria-label="Website URL" />`,
        ),
    ],
}

export function getShadcnExamples(slug: ShadcnUiSlug): ShadcnExampleSection[] {
    return EXAMPLES[slug] ?? []
}
