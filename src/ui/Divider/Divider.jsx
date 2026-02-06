import React from "react";
import Icon from "../Icon/Icon";
import "./Divider.scss";

const BASE_CLASS = "uds-divider";

const alignmentClassMap = {
  left: "left",
  center: "center",
  right: "right",
};

const variantClassMap = {
  line: "line",
  solid: "solid",
};

/**
 * Divider component for separating content sections
 * @param {string} variant - Variant style: 'line' (default) or 'solid' (8px solid box)
 * @param {string} label - Optional text label to display on the divider (only for 'line' variant)
 * @param {string} icon - Optional icon name to display on the divider (only for 'line' variant)
 * @param {string} alignment - Alignment of label/icon: 'left', 'center', or 'right' (only for 'line' variant)
 * @param {boolean} labelWithIcon - Whether to show icon within the label text (e.g., "+ Divider Label") (only for 'line' variant)
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the divider element
 */
export default function Divider({
  variant = "line",
  label,
  icon,
  alignment = "center",
  labelWithIcon = false,
  className = "",
  ...props
}) {
  const classNames = [
    BASE_CLASS,
    variantClassMap[variant] && `${BASE_CLASS}--${variantClassMap[variant]}`,
    variant === "line" &&
      alignmentClassMap[alignment] &&
      `${BASE_CLASS}--${alignmentClassMap[alignment]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasLabel = !!label;
  const hasIcon = !!icon;
  const hasContent = hasLabel || hasIcon;
  const isSolidVariant = variant === "solid";

  return (
    <div
      className={classNames}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    >
      {!isSolidVariant && hasContent && (
        <div className={`${BASE_CLASS}__content ${hasIcon && !hasLabel ? `${BASE_CLASS}__content--icon-only` : ''} ${hasLabel ? `${BASE_CLASS}__content--with-label` : ''}`}>
          {hasIcon && !hasLabel && (
            <span className={`${BASE_CLASS}__icon`}>
              <Icon name={icon} size={16} appearance="regular" />
            </span>
          )}
          {hasLabel && (
            <span className={`${BASE_CLASS}__label`}>
              {labelWithIcon && hasIcon && (
                <Icon
                  name={icon}
                  size={16}
                  appearance="regular"
                  className={`${BASE_CLASS}__label-icon`}
                />
              )}
              {label}
            </span>
          )}
          {hasIcon && hasLabel && !labelWithIcon && (
            <span className={`${BASE_CLASS}__icon`}>
              <Icon name={icon} size={16} appearance="regular" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
