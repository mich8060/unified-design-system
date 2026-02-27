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
import { BrandingDemoPage } from "./pages/components/BrandingDemoPage";
import { GettingStartedPage } from "./pages/docs/GettingStartedPage";
import { DesignTokensPage } from "./pages/docs/DesignTokensPage";
import { ThemingPage } from "./pages/docs/ThemingPage";
import { LayoutConventionsPage } from "./pages/docs/LayoutConventionsPage";
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
            { label: "Overview", path: "/getting-started" },
            { label: "Design Tokens", path: "/docs/tokens" },
            { label: "Theming", path: "/docs/theming" },
            { label: "Layout Conventions", path: "/docs/layout-conventions" },
        ],
    },
    {
        label: "Components",
        icon: "SquaresFour",
        children: [
            { label: "Button", path: "/components/button" },
            { label: "Text", path: "/components/text" },
            { label: "TextInput", path: "/components/text-input" },
            { label: "Toggle", path: "/components/toggle" },
            { label: "Icon", path: "/components/icon" },
            { label: "Accordion", path: "/components/accordion" },
            { label: "Branding", path: "/components/branding" },
        ],
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
                    showModeToggle
                    userName="Emily Brown"
                    userInitials="EB"
                />
            </AppShell.Menu>
            <AppShell.Content>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/getting-started" replace />} />
                        <Route path="/getting-started" element={<GettingStartedPage />} />
                        <Route path="/sample-item" element={<SampleItemPage />} />
                        <Route path="/docs/tokens" element={<DesignTokensPage />} />
                        <Route path="/docs/theming" element={<ThemingPage />} />
                        <Route
                            path="/docs/layout-conventions"
                            element={<LayoutConventionsPage />}
                        />
                        <Route path="/components/button" element={<ButtonDemoPage />} />
                        <Route path="/components/text" element={<TextDemoPage />} />
                        <Route path="/components/text-input" element={<TextInputDemoPage />} />
                        <Route path="/components/toggle" element={<ToggleDemoPage />} />
                        <Route path="/components/icon" element={<IconDemoPage />} />
                        <Route path="/components/accordion" element={<AccordionDemoPage />} />
                        <Route path="/components/branding" element={<BrandingDemoPage />} />
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
