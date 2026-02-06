import React from "react";
import Icon from "../Icon/Icon";
import "./Tag.scss";

const BASE_CLASS = "uds-tag";

const appearanceClassMap = {
  "label-only": "label-only",
  "icon-left": "icon-left",
};

const sizeClassMap = {
  compact: "compact",
  default: "default",
};

const colorClassMap = {
  transparent: "transparent",
  neutral: "neutral",
  red: "red",
  orange: "orange",
  yellow: "yellow",
  emerald: "emerald",
  green: "green",
  sky: "sky",
  cyan: "cyan",
  blue: "blue",
  indigo: "indigo",
  purple: "purple",
  fuchsia: "fuchsia",
  magenta: "magenta",
  inverse: "inverse",
};

/**
 * Tag component for displaying labels with optional icons
 *
 * @param {string} label - The text content of the tag
 * @param {string} appearance - Visual style variant: 'label-only' or 'icon-left'
 * @param {string} size - Size variant: 'compact' or 'default'
 * @param {string} color - Color variant: 'transparent', 'neutral', 'red', 'orange', 'yellow', 'emerald', 'green', 'sky', 'cyan', 'blue', 'indigo', 'purple', 'fuchsia', 'magenta', 'inverse'
 * @param {boolean} rounded - Whether to use rounded corners (default: true)
 * @param {boolean} solid - Whether to use solid background (default: false)
 * @param {string|boolean} icon - Icon name to display (when appearance is 'icon-left')
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler function
 * @param {object} props - Additional props to pass to the tag element
 */
export default function Tag({
  label = "Label",
  appearance = "label-only",
  size = "compact",
  color = "transparent",
  rounded = true,
  solid = false,
  icon,
  className = "",
  onClick,
  ...props
}) {
  const classNames = [
    BASE_CLASS,
    appearanceClassMap[appearance] &&
      `${BASE_CLASS}--${appearanceClassMap[appearance]}`,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    colorClassMap[color] && `${BASE_CLASS}--${colorClassMap[color]}`,
    rounded && `${BASE_CLASS}--rounded`,
    solid && `${BASE_CLASS}--solid`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Element = onClick ? "button" : "span";
  const hasIcon = appearance === "icon-left" && icon;

  return (
    <Element className={classNames} onClick={onClick} {...props}>
      {hasIcon && typeof icon === "string" && (
        <Icon
          name={icon}
          size={size === "compact" ? 10 : 12}
          appearance="regular"
          className={`${BASE_CLASS}__icon`}
        />
      )}
      {hasIcon && typeof icon !== "string" && (
        <span className={`${BASE_CLASS}__icon`}>{icon}</span>
      )}
      {label && <span className={`${BASE_CLASS}__label`}>{label}</span>}
    </Element>
  );
}
