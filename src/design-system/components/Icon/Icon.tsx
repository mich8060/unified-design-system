import React from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import "./_icon.scss";
import type { IconProps } from "./Icon.types";

type PhosphorIconComponent = React.ElementType<{
  size?: number;
  weight?: string;
  className?: string;
} & Record<string, unknown>>;

const warnedInvalidIcons = new Set<string>();
const __DEV__ = import.meta.env.DEV;

const isRenderableIcon = (value: unknown): value is PhosphorIconComponent =>
  typeof value === "function" || (typeof value === "object" && value !== null);

const toPascalCase = (value: string): string =>
  value
    .split(/(?=[A-Z])|[-_\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

const resolveIconComponent = (iconName: string): PhosphorIconComponent | null => {
  const candidate = PhosphorIcons[iconName as keyof typeof PhosphorIcons];
  if (isRenderableIcon(candidate)) return candidate as PhosphorIconComponent;

  const fallbackCandidate = PhosphorIcons[`${iconName}Icon` as keyof typeof PhosphorIcons];
  if (isRenderableIcon(fallbackCandidate)) {
    return fallbackCandidate as PhosphorIconComponent;
  }

  return null;
};

/**
 * Icons component wrapper for Phosphor icons
 * @param {string} name - The name of the Phosphor icon (e.g., "ArrowRight", "User", "House")
 * @param {number|string} size - The size of the icon (default: 24)
 * @param {string} appearance - Optional: "regular" | "bold" | "thin" | "light" | "duotone" | "fill" (default: "regular")
 * @param {object} props - Additional props to pass to the icon component
 */
function Icon({
  name,
  size = 24,
  appearance = "regular",
  ...props
}: IconProps) {
  const iconName = name ? toPascalCase(String(name)) : "";
  const iconComponent = iconName ? resolveIconComponent(iconName) : null;

  const weightMap = {
    regular: "regular",
    bold: "bold",
    thin: "thin",
    light: "light",
    duotone: "duotone",
    fill: "fill",
    solid: "fill",
    outline: "regular",
  };

  const weight = weightMap[appearance] || "regular";
  if (!iconComponent) {
    if (iconName && __DEV__ && !warnedInvalidIcons.has(iconName)) {
      warnedInvalidIcons.add(iconName);
      console.warn(`Icon "${name}" not found in Phosphor icons.`);
    }
    return null;
  }

  return React.createElement(iconComponent, { size, weight, ...props });
}

export default React.memo(Icon);
