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
const warnedInvalidIcons = new Set<string>();

const isDevEnvironment = (): boolean => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return Boolean(import.meta.env.DEV);
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env.NODE_ENV !== "production";
  }
  return false;
};

const normalizeIconName = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const toPascalCase = (value: string): string =>
  value
    .split(/(?=[A-Z])|[-_\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

const getPhosphorIconNames = (iconsModule: PhosphorIconModule): string[] =>
  Object.entries(iconsModule)
    .filter(([key, value]) => /^[A-Z]/.test(key) && typeof value === "function")
    .map(([key]) => key);

const levenshteinDistance = (a: string, b: string): number => {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + substitutionCost
      );
    }
  }

  return matrix[a.length][b.length];
};

const getIconSuggestions = (
  requestedName: string,
  iconsModule: PhosphorIconModule
): string[] => {
  const candidates = getPhosphorIconNames(iconsModule);
  const requestedNormalized = normalizeIconName(requestedName);

  const directMatches = candidates.filter((candidate) => {
    const normalized = normalizeIconName(candidate);
    return (
      normalized.startsWith(requestedNormalized) ||
      normalized.includes(requestedNormalized) ||
      requestedNormalized.includes(normalized)
    );
  });
  if (directMatches.length > 0) return directMatches.slice(0, 3);

  return candidates
    .map((candidate) => ({
      candidate,
      distance: levenshteinDistance(
        requestedNormalized,
        normalizeIconName(candidate)
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map((entry) => entry.candidate);
};

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
    const iconName = toPascalCase(nameString);
    return iconsModule[iconName] || null;
  }, [iconsModule, name]);

  if (!IconComponent) {
    if (name && iconsModule && isDevEnvironment()) {
      const iconName = toPascalCase(String(name));
      if (!warnedInvalidIcons.has(iconName)) {
        warnedInvalidIcons.add(iconName);
        const suggestions = getIconSuggestions(iconName, iconsModule);
        const suggestionMessage =
          suggestions.length > 0
            ? ` Did you mean: ${suggestions.join(", ")}?`
            : "";
        console.warn(
          `Icon "${name}" not found in Phosphor icons.${suggestionMessage}`
        );
      }
    }
    return null;
  }

  return <IconComponent size={size} weight={weight} {...props} />;
}
