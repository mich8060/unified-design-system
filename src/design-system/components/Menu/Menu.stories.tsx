import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Menu from "./Menu";
import type { MenuNavItem, MenuMode } from "./Menu.types";

// ---------------------------------------------------------------------------
// Shared fixture data
// ---------------------------------------------------------------------------
const NAV_ITEMS_BASIC: MenuNavItem[] = [
  { label: "Dashboard", icon: "House", path: "/" },
  { label: "Candidates", icon: "Users", path: "/candidates" },
  { label: "Requisitions", icon: "FileText", path: "/requisitions" },
  { label: "Reports", icon: "ChartBar", path: "/reports" },
  { label: "Settings", icon: "Gear", path: "/settings" },
];

const NAV_ITEMS_WITH_CHILDREN: MenuNavItem[] = [
  { label: "Dashboard", icon: "House", path: "/" },
  {
    label: "Candidates",
    icon: "Users",
    children: [
      { label: "Active Candidates", path: "/candidates/active" },
      { label: "Archived", path: "/candidates/archived" },
      { label: "Needs Review", path: "/candidates/review" },
    ],
  },
  {
    label: "Requisitions",
    icon: "FileText",
    children: [
      { label: "Open", path: "/requisitions/open" },
      { label: "Filled", path: "/requisitions/filled" },
      { label: "Closed", path: "/requisitions/closed" },
    ],
  },
  { label: "Reports", icon: "ChartBar", path: "/reports" },
  { label: "Settings", icon: "Gear", path: "/settings" },
];

const BRANDS = ["default", "comphealth", "weatherby", "connect", "locumsmart", "modio", "gms"];

const ACCOUNT_MENU_ITEMS = [
  { label: "Profile", value: "profile" },
  { label: "Preferences", value: "preferences" },
  { label: "Sign Out", value: "sign-out" },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Menu is the primary navigation sidebar. It supports collapsible rail mode, accordion sub-navigation, brand switching, mode toggling, and a user account area.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Story />
        <div
          style={{
            flex: 1,
            padding: "var(--uds-spacing-32)",
            background: "var(--uds-color-surface-secondary)",
            fontFamily: "var(--uds-font-family-body)",
            fontSize: "var(--uds-font-size-16)",
            color: "var(--uds-color-text-primary)",
          }}
        >
          Page content area
        </div>
      </div>
    ),
  ],
  argTypes: {
    defaultExpanded: {
      control: "boolean",
      description: "Initial expanded/collapsed state of the sidebar rail.",
      table: { defaultValue: { summary: "true" } },
    },
    showBrand: {
      control: "boolean",
      description: "Show the brand logo area at the top of the menu.",
      table: { defaultValue: { summary: "true" } },
    },
    showSearch: {
      control: "boolean",
      description: "Show the search input slot.",
      table: { defaultValue: { summary: "false" } },
    },
    showBrandSwitcher: {
      control: "boolean",
      description: "Show the brand-switcher dropdown (requires brands prop).",
      table: { defaultValue: { summary: "true" } },
    },
    showNav: {
      control: "boolean",
      description: "Show the navigation items section.",
      table: { defaultValue: { summary: "true" } },
    },
    showModeToggle: {
      control: "boolean",
      description: "Show the light/dark mode toggle (requires onModeChange handler).",
      table: { defaultValue: { summary: "true" } },
    },
    showUser: {
      control: "boolean",
      description: "Show the user account section at the bottom.",
      table: { defaultValue: { summary: "true" } },
    },
    userName: {
      control: "text",
      description: "Display name shown in the account section.",
    },
    userInitials: {
      control: "text",
      description: "Initials used in the avatar when no image is provided.",
    },
    activeBrand: {
      control: "select",
      options: BRANDS,
      description: "Currently active brand.",
    },
    activeMode: {
      control: "radio",
      options: ["light", "dark"],
      description: "Current light/dark mode.",
    },
    title: {
      control: "text",
      description: "Accessible label for the `<aside>` landmark.",
    },
  },
  args: {
    title: "Main navigation",
    navItems: NAV_ITEMS_BASIC,
    userName: "Jane Doe",
    userInitials: "JD",
    defaultExpanded: true,
    showBrand: true,
    showSearch: false,
    showBrandSwitcher: false,
    showNav: true,
    showModeToggle: false,
    showUser: true,
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default (Expanded)",
  args: {
    defaultExpanded: true,
    navItems: NAV_ITEMS_BASIC,
    showModeToggle: false,
    showBrandSwitcher: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The menu starts expanded with a basic set of flat navigation items and a user account area.",
      },
    },
  },
};

export const CollapsedRail: Story = {
  name: "Collapsed Rail (Icon-Only)",
  args: {
    defaultExpanded: false,
    navItems: NAV_ITEMS_BASIC,
    showModeToggle: false,
    showBrandSwitcher: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When collapsed, only icons are shown. Clicking any item first expands the menu before navigating.",
      },
    },
  },
};

export const WithAccordionNavigation: Story = {
  name: "With Accordion Navigation",
  args: {
    defaultExpanded: true,
    navItems: NAV_ITEMS_WITH_CHILDREN,
    showModeToggle: false,
    showBrandSwitcher: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Top-level items with a `children` array render as accordion sections. The accordion whose child matches the current route opens automatically.",
      },
    },
  },
};

export const WithBrandSwitcher: Story = {
  name: "With Brand Switcher",
  args: {
    defaultExpanded: true,
    navItems: NAV_ITEMS_BASIC,
    brands: BRANDS,
    activeBrand: "comphealth",
    onBrandChange: action("onBrandChange"),
    showBrandSwitcher: true,
    showModeToggle: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `brands` and `onBrandChange` are provided the brand-switcher dropdown is shown. Selecting a brand fires `onBrandChange`.",
      },
    },
  },
};

export const WithModeToggle: Story = {
  name: "With Light / Dark Mode Toggle",
  render: (args) => {
    const [mode, setMode] = useState<MenuMode>("light");
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Menu
          {...args}
          activeMode={mode}
          onModeChange={(newMode) => {
            setMode(newMode);
            action("onModeChange")(newMode);
          }}
        />
        <div
          style={{
            flex: 1,
            padding: "var(--uds-spacing-32)",
            background: "var(--uds-color-surface-secondary)",
            fontFamily: "var(--uds-font-family-body)",
            fontSize: "var(--uds-font-size-16)",
            color: "var(--uds-color-text-primary)",
          }}
        >
          Current mode: <strong>{mode}</strong>
        </div>
      </div>
    );
  },
  args: {
    defaultExpanded: true,
    navItems: NAV_ITEMS_BASIC,
    showModeToggle: true,
    showBrandSwitcher: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Providing `onModeChange` enables the toggle. Toggling between light/dark is fully controlled — the parent owns the `activeMode` state.",
      },
    },
  },
};

export const WithSearch: Story = {
  name: "With Search",
  args: {
    defaultExpanded: true,
    navItems: NAV_ITEMS_BASIC,
    showSearch: true,
    showModeToggle: false,
    showBrandSwitcher: false,
  },
  parameters: {
    docs: {
      description: {
        story: "`showSearch={true}` renders a search input beneath the brand area.",
      },
    },
  },
};

export const WithAccountMenu: Story = {
  name: "With Account Menu Items",
  args: {
    defaultExpanded: true,
    navItems: NAV_ITEMS_BASIC,
    userName: "Dr. Sarah Chen",
    userInitials: "SC",
    accountMenuItems: ACCOUNT_MENU_ITEMS,
    showModeToggle: false,
    showBrandSwitcher: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Providing `accountMenuItems` renders a dot-menu trigger next to the user name. Clicking reveals the action menu.",
      },
    },
  },
};

export const FullyFeatured: Story = {
  name: "Fully Featured",
  render: () => {
    const [brand, setBrand] = useState("comphealth");
    const [mode, setMode] = useState<MenuMode>("light");

    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Menu
          title="Main navigation"
          navItems={NAV_ITEMS_WITH_CHILDREN}
          brands={BRANDS}
          activeBrand={brand}
          onBrandChange={(b) => {
            setBrand(b);
            action("onBrandChange")(b);
          }}
          activeMode={mode}
          onModeChange={(m) => {
            setMode(m);
            action("onModeChange")(m);
          }}
          showBrand
          showSearch
          showBrandSwitcher
          showNav
          showModeToggle
          showUser
          userName="Jane Doe"
          userInitials="JD"
          accountMenuItems={ACCOUNT_MENU_ITEMS}
          defaultExpanded
        />
        <div
          style={{
            flex: 1,
            padding: "var(--uds-spacing-32)",
            background: "var(--uds-color-surface-secondary)",
            fontFamily: "var(--uds-font-family-body)",
            fontSize: "var(--uds-font-size-16)",
            color: "var(--uds-color-text-primary)",
          }}
        >
          <p>Active brand: <strong>{brand}</strong></p>
          <p>Active mode: <strong>{mode}</strong></p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Every feature enabled simultaneously: brand logo, search, brand switcher, accordion nav, mode toggle, and user account menu.",
      },
    },
  },
};

export const NavOnly: Story = {
  name: "Navigation Only (Minimal)",
  args: {
    defaultExpanded: true,
    navItems: NAV_ITEMS_BASIC,
    showBrand: false,
    showSearch: false,
    showBrandSwitcher: false,
    showNav: true,
    showModeToggle: false,
    showUser: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Strip everything except navigation — useful when the brand header is handled elsewhere.",
      },
    },
  },
};

export const LargeNavSet: Story = {
  name: "Large Navigation Set (10 Items)",
  args: {
    defaultExpanded: true,
    navItems: [
      { label: "Dashboard", icon: "House", path: "/" },
      { label: "Candidates", icon: "Users", path: "/candidates" },
      { label: "Requisitions", icon: "FileText", path: "/requisitions" },
      { label: "Placements", icon: "Briefcase", path: "/placements" },
      { label: "Contacts", icon: "AddressBook", path: "/contacts" },
      { label: "Facilities", icon: "Buildings", path: "/facilities" },
      { label: "Credentialing", icon: "Certificate", path: "/credentialing" },
      { label: "Payroll", icon: "Money", path: "/payroll" },
      { label: "Reports", icon: "ChartBar", path: "/reports" },
      { label: "Settings", icon: "Gear", path: "/settings" },
    ],
    showModeToggle: false,
    showBrandSwitcher: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A realistic set of 10 navigation items to verify scroll behaviour and layout stability.",
      },
    },
  },
};
