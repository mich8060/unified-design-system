import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Menu } from "../../design-system/components/Menu";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

type MenuExample = {
  title: string;
  description: string;
  props: Record<string, unknown>;
};

type DemoBrand = "default" | "comphealth" | "weatherby" | "connect" | "chg" | "wireframe";
type DemoMode = "light" | "dark";

const MENU_PROPS: ComponentPropRow[] = [
  { prop: "title", type: "string", defaultValue: '"Menu"', description: "Accessible label for the menu region." },
  { prop: "navItems", type: "MenuNavItem[]", defaultValue: "[]", description: "Top-level navigation items with optional children." },
  { prop: "brands", type: "string[]", defaultValue: "[]", description: "Available brands for the switcher." },
  { prop: "activeBrand", type: "string", defaultValue: "-", description: "Currently selected brand value." },
  { prop: "onBrandChange", type: "(brand: string) => void", defaultValue: "-", description: "Fires when a brand is selected." },
  { prop: "activeMode", type: '"light" | "dark"', defaultValue: '"light"', description: "Current mode for the mode toggle section." },
  { prop: "onModeChange", type: '(mode: "light" | "dark") => void', defaultValue: "-", description: "Fires when mode changes." },
  { prop: "showBrand", type: "boolean", defaultValue: "true", description: "Shows/hides the top branding region." },
  { prop: "showSearch", type: "boolean", defaultValue: "true", description: "Shows/hides the search section." },
  { prop: "showBrandSwitcher", type: "boolean", defaultValue: "true", description: "Shows/hides the brands dropdown section." },
  { prop: "showNav", type: "boolean", defaultValue: "true", description: "Shows/hides the navigation list." },
  { prop: "showModeToggle", type: "boolean", defaultValue: "true", description: "Shows/hides the light/dark mode controls." },
  { prop: "showUser", type: "boolean", defaultValue: "true", description: "Shows/hides the account footer section." },
  { prop: "userName", type: "string", defaultValue: '"Jane Doe"', description: "Name shown in account section when expanded." },
  { prop: "userInitials", type: "string", defaultValue: '"JD"', description: "Avatar initials fallback for the user." },
  { prop: "accountMenuItems", type: "ActionMenuItem[]", defaultValue: "[]", description: "Action menu items rendered from account footer trigger." },
  { prop: "identity", type: "string", defaultValue: '"design-system"', description: "Branding identity key used by the Branding component." },
  { prop: "defaultExpanded", type: "boolean", defaultValue: "true", description: "Initial expanded/collapsed state." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes for the menu root." },
];

const MENU_NAV_ITEMS = [
  { label: "Overview", icon: "House", path: "/getting-started" },
  {
    label: "Foundations",
    icon: "Palette",
    children: [
      { label: "Colors", path: "/foundations/colors-primitives" },
      { label: "Design Tokens", path: "/docs/tokens" },
    ],
  },
  {
    label: "Components",
    icon: "SquaresFour",
    children: [
      { label: "Button", path: "/components/button" },
      { label: "DescriptionList", path: "/components/description-list" },
      { label: "Field", path: "/components/field" },
      { label: "Flex", path: "/components/flex" },
      { label: "Menu", path: "/components/menu" },
    ],
  },
];

const MENU_BRANDS = ["default", "comphealth", "weatherby", "connect", "chg", "wireframe"];

const ACCOUNT_ITEMS = [
  {
    label: "Profile",
    icon: "UserCircle",
    onClick: () => window.location.assign("/sample-item"),
  },
  {
    label: "Settings",
    icon: "Gear",
    onClick: () => window.location.assign("/docs/tokens"),
  },
  { divider: true },
  {
    label: "View Components",
    icon: "SquaresFour",
    onClick: () => window.location.assign("/components/button"),
  },
  {
    label: "Sign out",
    icon: "SignOut",
    destructive: true,
    onClick: () => window.location.assign("/getting-started"),
  },
];

const BASE_MENU_PROPS: Record<string, unknown> = {
  navItems: MENU_NAV_ITEMS,
  brands: MENU_BRANDS,
  activeBrand: "default",
  onBrandChange: () => {},
  activeMode: "light",
  onModeChange: () => {},
  showBrand: true,
  showSearch: true,
  showBrandSwitcher: true,
  showNav: true,
  showModeToggle: true,
  showUser: true,
  userName: "Emily Brown",
  userInitials: "EB",
  identity: "design-system",
  accountMenuItems: ACCOUNT_ITEMS,
  defaultExpanded: true,
};

const MENU_EXAMPLES: MenuExample[] = [
  {
    title: "Full Feature (Expanded)",
    description: "Branding, search, brand switcher, nav, mode toggle, and account actions.",
    props: {},
  },
  {
    title: "Collapsed Rail",
    description: "Starts collapsed to show icon-first navigation behavior.",
    props: { defaultExpanded: false },
  },
  {
    title: "No Search",
    description: "Hides the search section for simpler menus.",
    props: { showSearch: false },
  },
  {
    title: "No Brand Switcher",
    description: "Keeps a fixed brand identity without switch controls.",
    props: { showBrandSwitcher: false },
  },
  {
    title: "No Mode Toggle",
    description: "Removes light/dark controls from the footer region.",
    props: { showModeToggle: false },
  },
  {
    title: "No User Section",
    description: "Removes the account area and account action menu.",
    props: { showUser: false },
  },
  {
    title: "Nav Only",
    description: "Keeps the main navigation while hiding utility regions.",
    props: { showSearch: false, showBrandSwitcher: false, showModeToggle: false, showUser: false },
  },
  {
    title: "Dark Mode Example",
    description: "Shows the menu configured with dark mode state.",
    props: { activeMode: "dark" },
  },
];

const frameStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "620px",
  border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
  borderRadius: "var(--uds-radius-8)",
  overflow: "hidden",
  backgroundColor: "var(--uds-surface-primary)",
};

function MenuExamplePreview({ exampleProps }: { exampleProps: Record<string, unknown> }) {
  const initialBrand =
    typeof exampleProps.activeBrand === "string" &&
    MENU_BRANDS.includes(exampleProps.activeBrand)
      ? (exampleProps.activeBrand as DemoBrand)
      : "default";
  const initialMode = exampleProps.activeMode === "dark" ? "dark" : "light";
  const [activeBrand, setActiveBrand] = useState<DemoBrand>(initialBrand);
  const [activeMode, setActiveMode] = useState<DemoMode>(initialMode);

  const handleBrandChange = (nextBrand: string) => {
    if (MENU_BRANDS.includes(nextBrand)) {
      setActiveBrand(nextBrand as DemoBrand);
    }
  };

  const handleModeChange = (mode: DemoMode) => {
    setActiveMode(mode);
  };

  const identity = activeBrand === "default" ? "design-system" : activeBrand;

  return (
    <div
      className={`brand-${activeBrand} theme-${activeMode}`}
      style={frameStyle}
    >
      <Menu
        {...BASE_MENU_PROPS}
        {...exampleProps}
        activeBrand={activeBrand}
        onBrandChange={handleBrandChange}
        activeMode={activeMode}
        onModeChange={handleModeChange}
        identity={identity}
        className="example"
      />
    </div>
  );
}

export function MenuDemoPage() {
  return (
    <DocPageLayout
      title="Menu"
      description="Menu provides application navigation with optional search, brand switching, mode controls, and account actions."
    >
      <Layout direction="column" gap="48">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Variations
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Live examples of the major Menu configurations and toggles.
          </Text>
        </Layout>

        <Layout wrap gap="24" alignItems="stretch">
          {MENU_EXAMPLES.map((example) => (
            <Layout
              key={example.title}
              direction="column"
              gap="12"
              style={{ flex: "1 1 560px", minWidth: "420px" }}
            >
              <Text as="h3" variant="heading-20" weight="medium" leading="regular">
                {example.title}
              </Text>
              <Text as="p" variant="body-14" leading="regular">
                {example.description}
              </Text>

              <MenuExamplePreview exampleProps={example.props} />
            </Layout>
          ))}
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={MENU_PROPS} />
    </DocPageLayout>
  );
}
