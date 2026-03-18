import type { SVGAttributes } from "react";

/** Supported icon render styles mapped to Phosphor weights. */
export type IconAppearance =
  | "regular"
  | "bold"
  | "thin"
  | "light"
  | "duotone"
  | "fill"
  | "solid"
  | "outline";
export type IconTone = "primary" | "secondary" | "tertiary" | "placeholder" | "disabled";

/**
 * Public props for the UDS Icon component.
 *
 * @example
 * ```tsx
 * <Icon name="House" size={20} appearance="duotone" />
 * ```
 */
export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Phosphor icon name, e.g. "House", "Gear", "MagnifyingGlass". */
  name?: string;
  /** Icon size in pixels. */
  size?: number;
  /** Icon style variant. */
  appearance?: IconAppearance;
  /** Semantic color tone. */
  tone?: IconTone;
}
