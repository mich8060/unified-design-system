export interface MenuChildItem {
  label: string;
  path: string;
}

export interface MenuNavItem {
  label: string;
  icon: string;
  path?: string;
  children?: MenuChildItem[];
}

export type MenuMode = "light" | "dark";

export interface MenuProps {
  title?: string;
  className?: string;
  navItems?: MenuNavItem[];
  brands?: string[];
  activeBrand?: string;
  onBrandChange?: (value: string | number) => void;
  activeMode?: MenuMode;
  onModeChange?: (value: MenuMode) => void;
  showBrand?: boolean;
  showSearch?: boolean;
  showBrandSwitcher?: boolean;
  showNav?: boolean;
  showModeToggle?: boolean;
  showUser?: boolean;
  identity?: string;
}
