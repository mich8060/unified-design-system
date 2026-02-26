import React, { useEffect, useMemo, useState } from "react";
import "./_icon.scss";
import type { IconProps } from "./Icon.types";

type PhosphorIconComponent = React.ComponentType<{
  size?: number;
  weight?: string;
  className?: string;
} & Record<string, unknown>>;

type PhosphorIconModule = Record<string, PhosphorIconComponent>;

let phosphorIconsCache: PhosphorIconModule | null = null;
let phosphorIconsLoadError: Error | null = null;
let phosphorIconsPromise: Promise<PhosphorIconModule> | null = null;

const loadPhosphorIcons = async (): Promise<PhosphorIconModule> => {
  if (phosphorIconsCache) return phosphorIconsCache;
  if (phosphorIconsLoadError) throw phosphorIconsLoadError;
  if (!phosphorIconsPromise) {
    phosphorIconsPromise = import("@phosphor-icons/react")
      .then((module) => {
        phosphorIconsCache = module as unknown as PhosphorIconModule;
        return phosphorIconsCache;
      })
      .catch((error: unknown) => {
        phosphorIconsLoadError =
          error instanceof Error ? error : new Error(String(error));
        throw phosphorIconsLoadError;
      });
  }
  return phosphorIconsPromise;
};

/**
 * Icons component wrapper for Phosphor icons
 * @param {string} name - The name of the Phosphor icon (e.g., "ArrowRight", "User", "House")
 * @param {number|string} size - The size of the icon (default: 24)
 * @param {string} appearance - Optional: "regular" | "bold" | "thin" | "light" | "duotone" | "fill" (default: "regular")
 * @param {object} props - Additional props to pass to the icon component
 */
export default function Icon({
  name,
  size = 24,
  appearance = "regular",
  ...props
}: IconProps) {
  const [iconsModule, setIconsModule] = useState<PhosphorIconModule | null>(
    phosphorIconsCache
  );

  useEffect(() => {
    if (iconsModule || phosphorIconsLoadError) return;
    let active = true;
    void loadPhosphorIcons()
      .then((module) => {
        if (active) setIconsModule(module);
      })
      .catch(() => {
        // Error is stored at module scope and thrown during render.
      });
    return () => {
      active = false;
    };
  }, [iconsModule]);

  if (phosphorIconsLoadError) {
    throw new Error(
      'Missing peer dependency "@phosphor-icons/react". Install it with: npm i @phosphor-icons/react'
    );
  }

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
  const IconComponent = useMemo(() => {
    if (!name || !iconsModule) return null;
    const nameString = typeof name === "string" ? name : String(name);
    const iconName = nameString
      .split(/(?=[A-Z])|[-_\s]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
    return iconsModule[iconName] || null;
  }, [iconsModule, name]);

  if (!IconComponent) {
    if (name && iconsModule) {
      console.warn(`Icon "${name}" not found in Phosphor icons.`);
    }
    return null;
  }

  return <IconComponent size={size} weight={weight} {...props} />;
}
