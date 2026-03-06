import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./styles/index.scss";

import { AppShell } from "./app-shell/AppShell";
import Menu from "./design-system/components/Menu";

const lazyNamed = <T extends Record<string, React.ComponentType<unknown>>, K extends keyof T>(
    load: () => Promise<T>,
    exportName: K
) =>
    React.lazy(async () => {
        const module = await load();
        return { default: module[exportName] as React.ComponentType<unknown> };
    });

const ButtonDemoPage = lazyNamed(() => import("./pages/components/ButtonDemoPage"), "ButtonDemoPage");
const ButtonGroupDemoPage = lazyNamed(
    () => import("./pages/components/ButtonGroupDemoPage"),
    "ButtonGroupDemoPage"
);
const TextDemoPage = lazyNamed(() => import("./pages/components/TextDemoPage"), "TextDemoPage");
const TextInputDemoPage = lazyNamed(() => import("./pages/components/TextInputDemoPage"), "TextInputDemoPage");
const DateInputDemoPage = lazyNamed(() => import("./pages/components/DateInputDemoPage"), "DateInputDemoPage");
const DateRangeInputDemoPage = lazyNamed(() => import("./pages/components/DateRangeInputDemoPage"), "DateRangeInputDemoPage");
const PasswordInputDemoPage = lazyNamed(() => import("./pages/components/PasswordInputDemoPage"), "PasswordInputDemoPage");
const PhoneInputDemoPage = lazyNamed(() => import("./pages/components/PhoneInputDemoPage"), "PhoneInputDemoPage");
const CurrencyInputDemoPage = lazyNamed(() => import("./pages/components/CurrencyInputDemoPage"), "CurrencyInputDemoPage");
const SearchInputDemoPage = lazyNamed(() => import("./pages/components/SearchInputDemoPage"), "SearchInputDemoPage");
const SectionHeaderDemoPage = lazyNamed(
    () => import("./pages/components/SectionHeaderDemoPage"),
    "SectionHeaderDemoPage"
);
const URLInputDemoPage = lazyNamed(() => import("./pages/components/URLInputDemoPage"), "URLInputDemoPage");
const TimeInputDemoPage = lazyNamed(() => import("./pages/components/TimeInputDemoPage"), "TimeInputDemoPage");
const ToolbarDemoPage = lazyNamed(() => import("./pages/components/ToolbarDemoPage"), "ToolbarDemoPage");
const ToggleDemoPage = lazyNamed(() => import("./pages/components/ToggleDemoPage"), "ToggleDemoPage");
const IconDemoPage = lazyNamed(() => import("./pages/components/IconDemoPage"), "IconDemoPage");
const AccordionDemoPage = lazyNamed(() => import("./pages/components/AccordionDemoPage"), "AccordionDemoPage");
const ActionMenuDemoPage = lazyNamed(() => import("./pages/components/ActionMenuDemoPage"), "ActionMenuDemoPage");
const BrandingDemoPage = lazyNamed(() => import("./pages/components/BrandingDemoPage"), "BrandingDemoPage");
const AvatarDemoPage = lazyNamed(() => import("./pages/components/AvatarDemoPage"), "AvatarDemoPage");
const BadgeDemoPage = lazyNamed(() => import("./pages/components/BadgeDemoPage"), "BadgeDemoPage");
const CheckboxDemoPage = lazyNamed(() => import("./pages/components/CheckboxDemoPage"), "CheckboxDemoPage");
const CheckboxGroupDemoPage = lazyNamed(
    () => import("./pages/components/CheckboxGroupDemoPage"),
    "CheckboxGroupDemoPage"
);
const DividerDemoPage = lazyNamed(() => import("./pages/components/DividerDemoPage"), "DividerDemoPage");
const AppShellDemoPage = lazyNamed(() => import("./pages/components/AppShellDemoPage"), "AppShellDemoPage");
const ThemeDemoPage = lazyNamed(() => import("./pages/components/ThemeDemoPage"), "ThemeDemoPage");
const TabsDemoPage = lazyNamed(() => import("./pages/components/TabsDemoPage"), "TabsDemoPage");
const FieldDemoPage = lazyNamed(() => import("./pages/components/FieldDemoPage"), "FieldDemoPage");
const FileUploadDemoPage = lazyNamed(() => import("./pages/components/FileUploadDemoPage"), "FileUploadDemoPage");
const FlexDemoPage = lazyNamed(() => import("./pages/components/FlexDemoPage"), "FlexDemoPage");
const MenuDemoPage = lazyNamed(() => import("./pages/components/MenuDemoPage"), "MenuDemoPage");
const ModalDemoPage = lazyNamed(() => import("./pages/components/ModalDemoPage"), "ModalDemoPage");
const PaginationDemoPage = lazyNamed(() => import("./pages/components/PaginationDemoPage"), "PaginationDemoPage");
const ProgressIndicatorDemoPage = lazyNamed(
    () => import("./pages/components/ProgressIndicatorDemoPage"),
    "ProgressIndicatorDemoPage"
);
const SliderDemoPage = lazyNamed(() => import("./pages/components/SliderDemoPage"), "SliderDemoPage");
const StatusDemoPage = lazyNamed(() => import("./pages/components/StatusDemoPage"), "StatusDemoPage");
const StatisticsDemoPage = lazyNamed(() => import("./pages/components/StatisticsDemoPage"), "StatisticsDemoPage");
const TagDemoPage = lazyNamed(() => import("./pages/components/TagDemoPage"), "TagDemoPage");
const TooltipDemoPage = lazyNamed(() => import("./pages/components/TooltipDemoPage"), "TooltipDemoPage");
const RadioGroupDemoPage = lazyNamed(
    () => import("./pages/components/RadioGroupDemoPage"),
    "RadioGroupDemoPage"
);
const ComponentPlaceholderDemoPage = lazyNamed(
    () => import("./pages/components/ComponentPlaceholderDemoPage"),
    "ComponentPlaceholderDemoPage"
);
const SectionHeaderPatternPage = lazyNamed(
    () => import("./pages/patterns/SectionHeaderPatternPage"),
    "SectionHeaderPatternPage"
);
const ChecklistPatternPage = lazyNamed(
    () => import("./pages/patterns/ChecklistPatternPage"),
    "ChecklistPatternPage"
);
const GettingStartedPage = lazyNamed(() => import("./pages/docs/GettingStartedPage"), "GettingStartedPage");
const DesignTokensPage = lazyNamed(() => import("./pages/docs/DesignTokensPage"), "DesignTokensPage");
const ThemingPage = lazyNamed(() => import("./pages/docs/ThemingPage"), "ThemingPage");
const LayoutConventionsPage = lazyNamed(
    () => import("./pages/docs/LayoutConventionsPage"),
    "LayoutConventionsPage"
);
const FoundationsPage = lazyNamed(() => import("./pages/docs/FoundationsPage"), "FoundationsPage");
const SampleItemPage = lazyNamed(() => import("./pages/docs/SampleItemPage"), "SampleItemPage");
const TemplateCanvasPage = lazyNamed(() => import("./pages/docs/TemplateCanvasPage"), "TemplateCanvasPage");

type Brand =
    | "default"
    | "comphealth"
    | "weatherby"
    | "connect"
    | "locumsmart"
    | "modio"
    | "gms"
    | "wireframe";
type Theme = "light" | "dark";

const BRAND_OPTIONS: Brand[] = [
    "default",
    "comphealth",
    "weatherby",
    "connect",
    "locumsmart",
    "modio",
    "gms",
    "wireframe",
];

const COMPONENT_NAV_ITEMS = [
    { label: "Accordion", path: "/components/accordion" },
    { label: "ActionMenu", path: "/components/action-menu" },
    { label: "AppShell", path: "/components/app-shell" },
    { label: "Avatar", path: "/components/avatar" },
    { label: "Badge", path: "/components/badge" },
    { label: "Branding", path: "/components/branding" },
    { label: "Breadcrumb", path: "/components/breadcrumb" },
    { label: "Button", path: "/components/button" },
    { label: "ButtonGroup", path: "/components/button-group" },
    { label: "Calendar", path: "/components/calendar" },
    { label: "Card", path: "/components/card" },
    { label: "Checkbox", path: "/components/checkbox" },
    { label: "CheckboxGroup", path: "/components/checkbox-group" },
    { label: "Chip", path: "/components/chip" },
    { label: "Container", path: "/components/container" },
    { label: "CurrencyInput", path: "/components/currency-input" },
    { label: "DateInput", path: "/components/date-input" },
    { label: "DateRangeInput", path: "/components/date-range-input" },
    { label: "Datepicker", path: "/components/datepicker" },
    { label: "Dialog", path: "/components/dialog" },
    { label: "Divider", path: "/components/divider" },
    { label: "DotStatus", path: "/components/dot-status" },
    { label: "Dropdown", path: "/components/dropdown" },
    { label: "EmptyState", path: "/components/empty-state" },
    { label: "EventCard", path: "/components/event-card" },
    { label: "Field", path: "/components/field" },
    { label: "FileUpload", path: "/components/file-upload" },
    { label: "Icon", path: "/components/icon" },
    { label: "ImageAspect", path: "/components/image-aspect" },
    { label: "Key", path: "/components/key" },
    { label: "Menu", path: "/components/menu" },
    { label: "MicroCalendar", path: "/components/micro-calendar" },
    { label: "Modal", path: "/components/modal" },
    { label: "NumberInput", path: "/components/number-input" },
    { label: "Pagination", path: "/components/pagination" },
    { label: "PasswordInput", path: "/components/password-input" },
    { label: "PhoneInput", path: "/components/phone-input" },
    { label: "ProgressCircle", path: "/components/progress-circle" },
    { label: "ProgressIndicator", path: "/components/progress-indicator" },
    { label: "Radio", path: "/components/radio" },
    { label: "RadioGroup", path: "/components/radio-group" },
    { label: "SearchInput", path: "/components/search-input" },
    { label: "SectionHeader", path: "/components/section-header" },
    { label: "Slider", path: "/components/slider" },
    { label: "Status", path: "/components/status" },
    { label: "Steps", path: "/components/steps" },
    { label: "Tabs", path: "/components/tabs" },
    { label: "Table", path: "/components/table" },
    { label: "Text", path: "/components/text" },
    { label: "TextInput", path: "/components/text-input" },
    { label: "Textarea", path: "/components/textarea" },
    { label: "TokenInput", path: "/components/token-input" },
    { label: "TimeInput", path: "/components/time-input" },
    { label: "Toolbar", path: "/components/toolbar" },
    { label: "Toast", path: "/components/toast" },
    { label: "Toggle", path: "/components/toggle" },
    { label: "Tooltip", path: "/components/tooltip" },
    { label: "URLInput", path: "/components/url-input" },
];

const PATTERN_NAV_ITEMS = [
    { label: "Menu", path: "/components/menu" },
    { label: "Checklist", path: "/patterns/checklist" },
    { label: "Section Header", path: "/patterns/section-header" },
    { label: "Statistics", path: "/components/statistics" },
];

const PLACEHOLDER_COMPONENT_PAGES = [
    { componentName: "Breadcrumb", path: "/components/breadcrumb" },
    { componentName: "Calendar", path: "/components/calendar" },
    { componentName: "Card", path: "/components/card" },
    { componentName: "Container", path: "/components/container" },
    { componentName: "Chip", path: "/components/chip" },
    { componentName: "Datepicker", path: "/components/datepicker" },
    { componentName: "Dialog", path: "/components/dialog" },
    { componentName: "DotStatus", path: "/components/dot-status" },
    { componentName: "Dropdown", path: "/components/dropdown" },
    { componentName: "EmptyState", path: "/components/empty-state" },
    { componentName: "EventCard", path: "/components/event-card" },
    { componentName: "ImageAspect", path: "/components/image-aspect" },
    { componentName: "Key", path: "/components/key" },
    { componentName: "MicroCalendar", path: "/components/micro-calendar" },
    { componentName: "NumberInput", path: "/components/number-input" },
    { componentName: "ProgressCircle", path: "/components/progress-circle" },
    { componentName: "Radio", path: "/components/radio" },
    { componentName: "Steps", path: "/components/steps" },
    { componentName: "Table", path: "/components/table" },
    { componentName: "Textarea", path: "/components/textarea" },
    { componentName: "TokenInput", path: "/components/token-input" },
    { componentName: "Toast", path: "/components/toast" },
];

const NAV_ITEMS = [
    {
        label: "Getting Started",
        icon: "Layout",
        children: [
            { label: "Overview", path: "/getting-started" },
            { label: "Layout Conventions", path: "/docs/layout-conventions" },
            { label: "Template Canvas", path: "/template-canvas" },
            { label: "Theming", path: "/docs/theming" },
            { label: "Theme API", path: "/components/theme" },
        ],
    },
    {
        label: "Foundations",
        icon: "CodepenLogoIcon",
        children: [
            { label: "Colors & Primitives", path: "/foundations/colors-primitives" },
            { label: "Design Tokens", path: "/docs/tokens" },
            { label: "Flex", path: "/components/flex" },
        ],
    },
    {
        label: "Components",
        icon: "DiamondsFourIcon",
        children: COMPONENT_NAV_ITEMS,
    },
    {
        label: "Modules",
        icon: "CirclesThreeIcon",
        children: PATTERN_NAV_ITEMS,
    },
];

const ACCOUNT_MENU_ITEMS = [
    { label: "View profile", icon: "UserCircle" },
    { label: "Account settings", icon: "Gear" },
    { divider: true },
    { label: "Sign out", icon: "SignOut", destructive: true },
];

const ROUTE_FALLBACK_STYLE: React.CSSProperties = {
    minHeight: "240px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--uds-text-secondary)",
    background: "var(--uds-surface-primary)",
};

function App() {
    const location = useLocation();
    const [brand, setBrand] = React.useState<Brand>("default");
    const [theme, setTheme] = React.useState<Theme>("light");

    const handleBrandChange = React.useCallback((nextBrand: unknown) => {
        if (typeof nextBrand === "string" && BRAND_OPTIONS.includes(nextBrand as Brand)) {
            setBrand(nextBrand as Brand);
        }
    }, []);

    const handleModeChange = React.useCallback((nextMode: unknown) => {
        if (nextMode === "light" || nextMode === "dark") {
            setTheme(nextMode);
        }
    }, []);

    const identity = React.useMemo(
        () => (brand === "default" ? "design-system" : brand),
        [brand]
    );

    if (location.pathname === "/template-canvas") {
        return (
            <React.Suspense fallback={<div style={ROUTE_FALLBACK_STYLE}>Loading...</div>}>
                <Routes>
                    <Route path="/template-canvas" element={<TemplateCanvasPage />} />
                </Routes>
            </React.Suspense>
        );
    }

    return (
        <AppShell
            brand={brand}
            theme={theme}
            mobileBrandLabel={identity}
            mobileAccountMenuItems={ACCOUNT_MENU_ITEMS}
            mobileUserName="Emily Brown"
            mobileUserInitials="EB"
        >
            <AppShell.Menu>
                <Menu
                    navItems={NAV_ITEMS}
                    accountMenuItems={ACCOUNT_MENU_ITEMS}
                    identity={identity}
                    brands={BRAND_OPTIONS}
                    activeBrand={brand}
                    onBrandChange={handleBrandChange}
                    activeMode={theme}
                    onModeChange={handleModeChange}
                    showBrandSwitcher
                    showSearch={false}
                    showModeToggle
                    userName="Emily Brown"
                    userInitials="EB"
                />
            </AppShell.Menu>
            <AppShell.Content>
                <AppShell.Main>
                    <React.Suspense fallback={<div style={ROUTE_FALLBACK_STYLE}>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/getting-started" replace />} />
                            <Route path="/docs/tokens" element={<DesignTokensPage />} />
                            <Route
                                path="/docs/layout-conventions"
                                element={<LayoutConventionsPage />}
                            />
                            <Route path="/getting-started" element={<GettingStartedPage />} />
                            <Route path="/docs/theming" element={<ThemingPage />} />
                            <Route path="/foundations/colors-primitives" element={<FoundationsPage />} />
                            <Route path="/sample-item" element={<SampleItemPage />} />
                            <Route path="/components/accordion" element={<AccordionDemoPage />} />
                            <Route path="/components/action-menu" element={<ActionMenuDemoPage />} />
                            <Route path="/components/app-shell" element={<AppShellDemoPage />} />
                            <Route path="/components/avatar" element={<AvatarDemoPage />} />
                            <Route path="/components/badge" element={<BadgeDemoPage />} />
                            <Route path="/components/branding" element={<BrandingDemoPage />} />
                            <Route path="/components/button" element={<ButtonDemoPage />} />
                            <Route path="/components/button-group" element={<ButtonGroupDemoPage />} />
                            <Route path="/components/checkbox" element={<CheckboxDemoPage />} />
                            <Route path="/components/checkbox-group" element={<CheckboxGroupDemoPage />} />
                            <Route path="/components/divider" element={<DividerDemoPage />} />
                            <Route path="/components/field" element={<FieldDemoPage />} />
                            <Route path="/components/file-upload" element={<FileUploadDemoPage />} />
                            <Route path="/components/flex" element={<FlexDemoPage />} />
                            <Route path="/components/icon" element={<IconDemoPage />} />
                            <Route path="/components/menu" element={<MenuDemoPage />} />
                            <Route path="/components/modal" element={<ModalDemoPage />} />
                            <Route path="/components/pagination" element={<PaginationDemoPage />} />
                            <Route path="/components/progress-indicator" element={<ProgressIndicatorDemoPage />} />
                            <Route path="/components/slider" element={<SliderDemoPage />} />
                            <Route path="/components/status" element={<StatusDemoPage />} />
                            <Route path="/components/statistics" element={<StatisticsDemoPage />} />
                            <Route path="/components/text" element={<TextDemoPage />} />
                            <Route path="/components/text-input" element={<TextInputDemoPage />} />
                            <Route path="/components/date-input" element={<DateInputDemoPage />} />
                            <Route path="/components/date-range-input" element={<DateRangeInputDemoPage />} />
                            <Route path="/components/password-input" element={<PasswordInputDemoPage />} />
                            <Route path="/components/phone-input" element={<PhoneInputDemoPage />} />
                            <Route path="/components/currency-input" element={<CurrencyInputDemoPage />} />
                            <Route path="/components/search-input" element={<SearchInputDemoPage />} />
                            <Route path="/components/section-header" element={<SectionHeaderDemoPage />} />
                            <Route path="/components/url-input" element={<URLInputDemoPage />} />
                            <Route path="/components/time-input" element={<TimeInputDemoPage />} />
                            <Route path="/components/toolbar" element={<ToolbarDemoPage />} />
                            <Route path="/components/radio-group" element={<RadioGroupDemoPage />} />
                            <Route path="/components/tabs" element={<TabsDemoPage />} />
                            <Route path="/components/tag" element={<TagDemoPage />} />
                            <Route path="/components/theme" element={<ThemeDemoPage />} />
                            <Route path="/components/toggle" element={<ToggleDemoPage />} />
                            <Route path="/components/tooltip" element={<TooltipDemoPage />} />
                            <Route path="/patterns/checklist" element={<ChecklistPatternPage />} />
                            <Route path="/patterns/section-header" element={<SectionHeaderPatternPage />} />
                            {PLACEHOLDER_COMPONENT_PAGES.map(({ componentName, path }) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={<ComponentPlaceholderDemoPage componentName={componentName} />}
                                />
                            ))}
                        </Routes>
                    </React.Suspense>
                </AppShell.Main>
            </AppShell.Content>
        </AppShell>
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
