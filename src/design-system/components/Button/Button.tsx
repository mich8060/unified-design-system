import type { MouseEvent } from "react";
import Icon from "../Icon/Icon";
import type { ButtonProps } from "./Button.types";
import "./_button.scss";

const BASE_CLASS = "uds-button";

const layoutClassMap: Record<NonNullable<ButtonProps["layout"]>, string> = {
  "label-only": `${BASE_CLASS}--label-only`,
  "icon-left": `${BASE_CLASS}--icon-left`,
  "icon-right": `${BASE_CLASS}--icon-right`,
  "icon-only": `${BASE_CLASS}--icon-only`,
  only: `${BASE_CLASS}--only`,
};

const appearanceClassMap: Record<NonNullable<ButtonProps["appearance"]>, string> = {
  primary: `${BASE_CLASS}--primary`,
  soft: `${BASE_CLASS}--soft`,
  outline: `${BASE_CLASS}--outline`,
  text: `${BASE_CLASS}--text`,
  ghost: `${BASE_CLASS}--ghost`,
  disabled: `${BASE_CLASS}--disabled`,
  destructive: `${BASE_CLASS}--destructive`,
};

const sizeClassMap: Record<NonNullable<ButtonProps["size"]>, string> = {
  large: `${BASE_CLASS}--large`,
  default: `${BASE_CLASS}--default`,
  small: `${BASE_CLASS}--small`,
  xsmall: `${BASE_CLASS}--xsmall`,
};

export default function Button({
  label,
  appearance = "primary",
  layout = "label-only",
  size = "default",
  icon,
  startSlot,
  endSlot,
  iconSize,
  icons,
  children,
  tracking,
  loading = false,
  className,
  onClick,
  disabled,
  "aria-label": ariaLabel,
  ...rest
}: ButtonProps) {
  const classNames = [
    BASE_CLASS,
    appearanceClassMap[appearance],
    layoutClassMap[layout],
    sizeClassMap[size],
    loading && `${BASE_CLASS}--loading`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isIconOnly = layout === "icon-only" || layout === "only";
  const hasVisibleLabel = Boolean(label) && !isIconOnly;

  const iconComponent =
    typeof icon === "string" ? (
      <Icon name={icon} size={iconSize} appearance="regular" />
    ) : (
      icon ?? null
    );

  const iconContent = iconComponent || icons || children || null;

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
  const startSlotNode = startSlot ? (
    <span className={`${BASE_CLASS}__slot ${BASE_CLASS}__slot--start`}>{startSlot}</span>
  ) : null;
  const endSlotNode = endSlot ? (
    <span className={`${BASE_CLASS}__slot ${BASE_CLASS}__slot--end`}>{endSlot}</span>
  ) : null;

  const renderContent = () => {
    if (layout === "icon-left") return <>{startSlotNode ?? iconNode}{labelNode}{endSlotNode}</>;
    if (layout === "icon-right") return <>{startSlotNode}{labelNode}{endSlotNode ?? iconNode}</>;
    if (isIconOnly) return startSlotNode || endSlotNode || iconNode || labelNode;
    return <>{startSlotNode}{labelNode || iconNode}{endSlotNode}</>;
  };

  const isDisabled = appearance === "disabled" || Boolean(disabled) || loading;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (tracking) {
      const payload = {
        component: "Button",
        action: "click",
        label,
        ...(typeof tracking === "object" ? tracking : { event: tracking }),
      };
      window.dispatchEvent(new CustomEvent("uds:track", { detail: payload }));
    }
    onClick?.(event);
  };

  const buttonAriaLabel =
    ariaLabel ||
    (isIconOnly && label ? label : undefined) ||
    (isIconOnly && typeof icon === "string" ? `${icon} icon` : undefined);

  return (
    <button
      type="button"
      className={classNames}
      disabled={isDisabled}
      aria-busy={loading ? "true" : undefined}
      aria-label={buttonAriaLabel}
      onClick={handleClick}
      {...rest}
    >
      <span
        className={`${BASE_CLASS}__content`}
        aria-hidden={loading ? "true" : undefined}
      >
        {renderContent()}
      </span>
      {loading ? (
        <span className={`${BASE_CLASS}__loader`} aria-hidden="true">
          <Icon name="CircleNotch" size={iconSize} appearance="regular" />
        </span>
      ) : null}
    </button>
  );
}
