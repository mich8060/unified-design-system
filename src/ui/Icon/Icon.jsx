import React, { useMemo } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";

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
}) {
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
    if (!name) return null;
    const nameString = typeof name === "string" ? name : String(name);
    const iconName = nameString
      .split(/(?=[A-Z])|[-_\s]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
    return PhosphorIcons[iconName] || null;
  }, [name]);

  if (!IconComponent) {
    if (name) {
      console.warn(`Icon "${name}" not found in Phosphor icons.`);
    }
    return null;
  }

  return <IconComponent size={size} weight={weight} {...props} />;
}
