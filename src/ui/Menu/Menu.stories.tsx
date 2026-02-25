import React, { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import Menu from "./Menu";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "House", path: "/" },
  {
    label: "People",
    icon: "Users",
    children: [
      { label: "Providers", path: "/providers" },
      { label: "Recruiters", path: "/recruiters" },
    ],
  },
  { label: "Jobs", icon: "Briefcase", path: "/jobs" },
];

const BRANDS = ["CHG", "CompHealth", "Weatherby", "Global Medical"];

const meta = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: any) => (
      <MemoryRouter initialEntries={["/providers"]}>
        <div style={{ minHeight: "100vh", padding: "16px", background: "#f6f7fb" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    navItems: { control: "object" },
    brands: { control: "object" },
    activeBrand: { control: "text" },
    activeMode: { control: "inline-radio", options: ["light", "dark"] },
  },
};

export default meta;

export const Default = {
  render: (args: any) => {
    const [activeBrand, setActiveBrand] = useState(args.activeBrand);
    const [activeMode, setActiveMode] = useState(args.activeMode);

    return (
      <Menu
        {...args}
        activeBrand={activeBrand}
        onBrandChange={setActiveBrand}
        activeMode={activeMode}
        onModeChange={setActiveMode}
      />
    );
  },
  args: {
    navItems: NAV_ITEMS,
    brands: BRANDS,
    activeBrand: "CHG",
    activeMode: "light",
    showBrand: true,
    showSearch: true,
    showBrandSwitcher: true,
    showNav: true,
    showModeToggle: true,
    showUser: true,
    identity: "design-system",
  },
};
