import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./styles/index.scss";

import { AppShell } from "./app-shell/AppShell";
import { COMPONENT_DEMO_NAV_ITEMS } from "./demos/component-demo.registry";
import { getStaticPageByPath, PATTERN_NAV_ITEMS } from "./demos/static-page.registry";
import Menu from "./design-system/components/Menu";

const lazyNamed = <T extends Record<string, React.ComponentType<unknown>>, K extends keyof T>(
  load: () => Promise<T>,
  exportName: K
) =>
  React.lazy(async () => {
    const module = await load();
    return { default: module[exportName] as React.ComponentType<unknown> };
  });

const ComponentDemoRoutePage = lazyNamed(
  () => import("./pages/components/ComponentDemoRoutePage"),
  "ComponentDemoRoutePage"
);
const StaticPageRoute = lazyNamed(() => import("./pages/StaticPageRoute"), "StaticPageRoute");

type Brand =
  | "default"
  | "comphealth"
  | "weatherby"
  | "connect"
  | "locumsmart"
  | "modio"
  | "gms"
  | "chg"
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
  "chg",
  "wireframe",
];
const BRAND_CLASS_NAMES = BRAND_OPTIONS.map((value) => `brand-${value}`);
const THEME_CLASS_NAMES: Theme[] = ["light", "dark"];

const NAV_ITEMS = [
  {
    label: "Getting Started",
    icon: "Layout",
    children: [
      { label: "Overview", path: "/getting-started" },
      { label: "Installation", path: "/getting-started/installation" },
      { label: "AppShell", path: "/components/app-shell" },
    ],
  },
  {
    label: "Foundations",
    icon: "CodepenLogoIcon",
    children: [
      { label: "Colors", path: "/foundations/colors-primitives" },
      { label: "Typography", path: "/foundations/typography" },
      { label: "Design Tokens", path: "/docs/tokens" },
      { label: "Iconography", path: "/components/icon" },
      { label: "Layout", path: "/components/layout" },
    ],
  },
  {
    label: "Components",
    icon: "DiamondsFourIcon",
    children: [...COMPONENT_DEMO_NAV_ITEMS],
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

  const currentStaticPage = getStaticPageByPath(location.pathname);
  const isShelllessPage = Boolean(currentStaticPage?.shellless);

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

  React.useEffect(() => {
    document.documentElement.setAttribute("data-brand", identity);
  }, [identity]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...BRAND_CLASS_NAMES);
    root.classList.remove(...THEME_CLASS_NAMES.map((value) => `theme-${value}`));
    root.classList.add(`brand-${brand}`);
    root.classList.add(`theme-${theme}`);
  }, [brand, theme]);

  if (isShelllessPage) {
    return (
      <React.Suspense fallback={<div style={ROUTE_FALLBACK_STYLE}>Loading...</div>}>
        <Routes>
          <Route path="*" element={<StaticPageRoute />} />
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
          showBrandSwitcher={false}
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
              <Route path="/components/:componentId" element={<ComponentDemoRoutePage />} />
              <Route path="*" element={<StaticPageRoute />} />
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
