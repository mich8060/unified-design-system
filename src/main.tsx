import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/index.scss";

import { AppShell } from "./app-shell/AppShell";
import Menu from "./design-system/components/Menu";
import { ButtonDemoPage } from "./pages/components/ButtonDemoPage";
import { TextDemoPage } from "./pages/components/TextDemoPage";
import { TextInputDemoPage } from "./pages/components/TextInputDemoPage";
import { ToggleDemoPage } from "./pages/components/ToggleDemoPage";
import { IconDemoPage } from "./pages/components/IconDemoPage";
import { AccordionDemoPage } from "./pages/components/AccordionDemoPage";
import { ActionMenuDemoPage } from "./pages/components/ActionMenuDemoPage";
import { BrandingDemoPage } from "./pages/components/BrandingDemoPage";
import { AvatarDemoPage } from "./pages/components/AvatarDemoPage";
import { BadgeDemoPage } from "./pages/components/BadgeDemoPage";
import { CheckboxDemoPage } from "./pages/components/CheckboxDemoPage";
import { DividerDemoPage } from "./pages/components/DividerDemoPage";
import { AppShellDemoPage } from "./pages/components/AppShellDemoPage";
import { ThemeDemoPage } from "./pages/components/ThemeDemoPage";
import { TabsDemoPage } from "./pages/components/TabsDemoPage";
import { ComponentPlaceholderDemoPage } from "./pages/components/ComponentPlaceholderDemoPage";
import { GettingStartedPage } from "./pages/docs/GettingStartedPage";
import { DesignTokensPage } from "./pages/docs/DesignTokensPage";
import { ThemingPage } from "./pages/docs/ThemingPage";
import { LayoutConventionsPage } from "./pages/docs/LayoutConventionsPage";
import { FoundationsPage } from "./pages/docs/FoundationsPage";
import { SampleItemPage } from "./pages/docs/SampleItemPage";

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
    { label: "Calendar", path: "/components/calendar" },
    { label: "Card", path: "/components/card" },
    { label: "Container", path: "/components/container" },
    { label: "Checkbox", path: "/components/checkbox" },
    { label: "Chip", path: "/components/chip" },
    { label: "Datepicker", path: "/components/datepicker" },
    { label: "Dialog", path: "/components/dialog" },
    { label: "Divider", path: "/components/divider" },
    { label: "DotStatus", path: "/components/dot-status" },
    { label: "Dropdown", path: "/components/dropdown" },
    { label: "EmptyState", path: "/components/empty-state" },
    { label: "EventCard", path: "/components/event-card" },
    { label: "Field", path: "/components/field" },
    { label: "FileUpload", path: "/components/file-upload" },
    { label: "Flex", path: "/components/flex" },
    { label: "Icon", path: "/components/icon" },
    { label: "ImageAspect", path: "/components/image-aspect" },
    { label: "Key", path: "/components/key" },
    { label: "Menu", path: "/components/menu" },
    { label: "MicroCalendar", path: "/components/micro-calendar" },
    { label: "Modal", path: "/components/modal" },
    { label: "Pagination", path: "/components/pagination" },
    { label: "PillToggle", path: "/components/pill-toggle" },
    { label: "Playground", path: "/components/playground" },
    { label: "ProgressCircle", path: "/components/progress-circle" },
    { label: "ProgressIndicator", path: "/components/progress-indicator" },
    { label: "Radio", path: "/components/radio" },
    { label: "Slider", path: "/components/slider" },
    { label: "Status", path: "/components/status" },
    { label: "Steps", path: "/components/steps" },
    { label: "Table", path: "/components/table" },
    { label: "Tabs", path: "/components/tabs" },
    { label: "Tag", path: "/components/tag" },
    { label: "Theme API", path: "/components/theme" },
    { label: "Text", path: "/components/text" },
    { label: "TextInput", path: "/components/text-input" },
    { label: "Textarea", path: "/components/textarea" },
    { label: "Toast", path: "/components/toast" },
    { label: "Toggle", path: "/components/toggle" },
    { label: "Tooltip", path: "/components/tooltip" },
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
    { componentName: "Field", path: "/components/field" },
    { componentName: "FileUpload", path: "/components/file-upload" },
    { componentName: "Flex", path: "/components/flex" },
    { componentName: "ImageAspect", path: "/components/image-aspect" },
    { componentName: "Key", path: "/components/key" },
    { componentName: "Menu", path: "/components/menu" },
    { componentName: "MicroCalendar", path: "/components/micro-calendar" },
    { componentName: "Modal", path: "/components/modal" },
    { componentName: "Pagination", path: "/components/pagination" },
    { componentName: "PillToggle", path: "/components/pill-toggle" },
    { componentName: "Playground", path: "/components/playground" },
    { componentName: "ProgressCircle", path: "/components/progress-circle" },
    { componentName: "ProgressIndicator", path: "/components/progress-indicator" },
    { componentName: "Radio", path: "/components/radio" },
    { componentName: "Slider", path: "/components/slider" },
    { componentName: "Status", path: "/components/status" },
    { componentName: "Steps", path: "/components/steps" },
    { componentName: "Table", path: "/components/table" },
    { componentName: "Tag", path: "/components/tag" },
    { componentName: "Textarea", path: "/components/textarea" },
    { componentName: "Toast", path: "/components/toast" },
    { componentName: "Tooltip", path: "/components/tooltip" },
];

const NAV_ITEMS = [
    {
        label: "Sample Item",
        icon: "FileText",
        path: "/sample-item",
    },
    {
        label: "Getting Started",
        icon: "Layout",
        children: [
            { label: "Design Tokens", path: "/docs/tokens" },
            { label: "Layout Conventions", path: "/docs/layout-conventions" },
            { label: "Overview", path: "/getting-started" },
            { label: "Theming", path: "/docs/theming" },
        ],
    },
    {
        label: "Foundations",
        icon: "Palette",
        children: [{ label: "Colors & Primitives", path: "/foundations/colors-primitives" }],
    },
    {
        label: "Components",
        icon: "SquaresFour",
        children: COMPONENT_NAV_ITEMS,
    },
];

const ACCOUNT_MENU_ITEMS = [
    { label: "View profile", icon: "UserCircle" },
    { label: "Account settings", icon: "Gear" },
    { divider: true },
    { label: "Sign out", icon: "SignOut", destructive: true },
];

function App() {
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

    return (
        <AppShell brand={brand} theme={theme}>
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
                        <Route path="/components/checkbox" element={<CheckboxDemoPage />} />
                        <Route path="/components/divider" element={<DividerDemoPage />} />
                        <Route path="/components/icon" element={<IconDemoPage />} />
                        <Route path="/components/text" element={<TextDemoPage />} />
                        <Route path="/components/text-input" element={<TextInputDemoPage />} />
                        <Route path="/components/tabs" element={<TabsDemoPage />} />
                        <Route path="/components/theme" element={<ThemeDemoPage />} />
                        <Route path="/components/toggle" element={<ToggleDemoPage />} />
                        {PLACEHOLDER_COMPONENT_PAGES.map(({ componentName, path }) => (
                            <Route
                                key={path}
                                path={path}
                                element={<ComponentPlaceholderDemoPage componentName={componentName} />}
                            />
                        ))}
                    </Routes>
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
