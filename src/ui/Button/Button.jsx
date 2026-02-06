import "./Button.scss";
import Icons from "../Icon/Icon";

const BASE_CLASS = "uds-button";

const layoutClassMap = {
  "label-only": "label-only",
  "icon-left": "icon-left",
  "icon-right": "icon-right",
  "icon-only": "icon-only",
  only: "only",
};

const appearanceClassMap = {
  primary: "primary",
  soft: "soft",
  outline: "outline",
  text: "text",
  ghost: "ghost",
  disabled: "disabled",
  destructive: "destructive",
};

const sizeClassMap = {
  large: "large",
  default: "default",
  small: "small",
  xsmall: "xsmall",
};

export default function Button({
  label,
  appearance = "primary",
  layout = "label-only",
  size = "default",
  icon,
  iconSize,
  icons,
  children,
  "aria-label": ariaLabel,
  className,
  ...rest
}) {
  const classNames = [
    BASE_CLASS,
    // Only add appearance class if it's not the default (primary)
    appearance !== "primary" &&
      appearanceClassMap[appearance] &&
      appearanceClassMap[appearance],
    // Only add layout class if it's not the default (label-only)
    layout !== "label-only" && layoutClassMap[layout] && layoutClassMap[layout],
    // Only add size class if it's not the default (default)
    size !== "default" && sizeClassMap[size] && sizeClassMap[size],
    className, // Add custom className if provided
  ]
    .filter(Boolean)
    .join(" ");

  // Determine if this is an icon-only button
  const isIconOnly = layout === "icon-only" || layout === "only";
  const hasVisibleLabel = label && !isIconOnly;

  // Handle icon prop - can be string (icon name) or JSX element (Icon component)
  // If string, render Icons component internally without size constraints
  // Icon size should be controlled by iconSize prop or Icons component default, not button size
  const iconComponent = icon ? (
    typeof icon === "string" ? (
      <Icons name={icon} size={iconSize} appearance="regular" />
    ) : (
      icon // If it's already a JSX element, use it directly
    )
  ) : null;

  // Support legacy icons prop (JSX element) and children for backward compatibility
  const iconContent = iconComponent || icons || children;

  const iconNode = iconContent ? (
    <span
      className={`${BASE_CLASS}__icon`}
      aria-hidden={hasVisibleLabel ? "true" : undefined}
    >
      {iconContent}
    </span>
  ) : null;

  const labelNode = label ? (
    <span className={`${BASE_CLASS}__label`}>{label}</span>
  ) : null;

  const renderContent = () => {
    switch (layout) {
      case "icon-left":
        return (
          <>
            {iconNode}
            {labelNode}
          </>
        );
      case "icon-right":
        return (
          <>
            {labelNode}
            {iconNode}
          </>
        );
      case "icon-only":
      case "only":
        return iconNode || labelNode;
      case "label-only":
      default:
        return labelNode || iconNode;
    }
  };

  const isDisabled = appearance === "disabled" || rest.disabled;

  // Accessibility: For icon-only buttons, ensure there's an accessible label
  // Priority: explicit aria-label prop > label prop > fallback based on icon name
  const buttonAriaLabel =
    ariaLabel ||
    (isIconOnly && label ? label : undefined) ||
    (isIconOnly && icon ? `${icon} icon` : undefined);

  return (
    <button
      type="button"
      className={classNames}
      disabled={isDisabled}
      aria-label={buttonAriaLabel || undefined}
      {...rest}
    >
      {renderContent()}
    </button>
  );
}
