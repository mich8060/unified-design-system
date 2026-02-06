import React from "react";
import Icon from "../Icon/Icon";
import Badge from "../Badge/Badge";
import "./Chip.scss";

const BASE_CLASS = "uds-chip";

const appearanceClassMap = {
  outline: "outline",
  primary: "primary",
};

const shapeClassMap = {
  pill: "pill",
  rounded: "rounded",
};

const iconPlacementClassMap = {
  both: "icon-both",
  left: "icon-left",
  right: "icon-right",
  none: "icon-none",
};

/**
 * Chip component for displaying labels, tags, or filters
 * @param {string} label - The text content of the chip
 * @param {string} appearance - Visual style variant: 'outline' or 'primary'
 * @param {string} shape - Shape variant: 'pill' (fully rounded) or 'rounded' (slightly rounded)
 * @param {string} iconPlacement - Icon placement: 'both', 'left', 'right', or 'none'
 * @param {string} icon - Icon name to display (when iconPlacement is not 'none')
 * @param {number|string} badge - Badge count to display
 * @param {string} badgeVariant - Badge color variant (default: 'red')
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler function
 * @param {boolean} disabled - Whether the chip is disabled
 * @param {object} props - Additional props to pass to the chip element
 */
export default function Chip({
  label,
  appearance = "outline",
  shape = "pill",
  iconPlacement = "none",
  icon,
  badge,
  badgeVariant = "red",
  className = "",
  onClick,
  disabled = false,
  ...props
}) {
  const classNames = [
    BASE_CLASS,
    appearanceClassMap[appearance] &&
      `${BASE_CLASS}--${appearanceClassMap[appearance]}`,
    shapeClassMap[shape] && `${BASE_CLASS}--${shapeClassMap[shape]}`,
    iconPlacementClassMap[iconPlacement] &&
      `${BASE_CLASS}--${iconPlacementClassMap[iconPlacement]}`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasLeftIcon = iconPlacement === "both" || iconPlacement === "left";
  const hasRightIcon = iconPlacement === "both" || iconPlacement === "right";
  const hasAnyIcon = iconPlacement !== "none";

  const Element = onClick ? "button" : "span";

  return (
    <Element
      className={classNames}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {hasLeftIcon && icon && (
        <Icon
          name={icon}
          size={16}
          appearance="regular"
          className={`${BASE_CLASS}__icon ${BASE_CLASS}__icon--left`}
        />
      )}
      {label && <span className={`${BASE_CLASS}__label`}>{label}</span>}
      {hasRightIcon && icon && (
        <Icon
          name={icon}
          size={16}
          appearance="regular"
          className={`${BASE_CLASS}__icon ${BASE_CLASS}__icon--right`}
        />
      )}
      {badge && (
        <Badge
          count={badge}
          variant={badgeVariant}
          className={`${BASE_CLASS}__badge`}
        />
      )}
    </Element>
  );
}
