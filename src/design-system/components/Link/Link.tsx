import type { MouseEvent } from "react";
import Icon from "../Icon/Icon";
import "./_link.scss";
import type { LinkProps } from "./Link.types";

const BASE_CLASS = "uds-link";

export function Link({
  appearance = "primary",
  underline = "always",
  external = false,
  iconTrailing,
  disabled = false,
  className = "",
  target,
  rel,
  href,
  onClick,
  tabIndex,
  children,
  ...rest
}: LinkProps) {
  const classNames = [
    BASE_CLASS,
    `${BASE_CLASS}--${appearance}`,
    `${BASE_CLASS}--underline-${underline}`,
    (external || appearance === "external") && `${BASE_CLASS}--external`,
    disabled && `${BASE_CLASS}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedTarget = external && !target ? "_blank" : target;
  const computedRel =
    resolvedTarget === "_blank"
      ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
      : rel;
  const trailingIconName = iconTrailing || (external || appearance === "external" ? "ArrowSquareOut" : undefined);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  return (
    <a
      className={classNames}
      href={disabled ? undefined : href}
      target={resolvedTarget}
      rel={computedRel || undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={handleClick}
      {...rest}
    >
      <span className={`${BASE_CLASS}__label`}>{children}</span>
      {trailingIconName ? (
        <span className={`${BASE_CLASS}__icon`} aria-hidden="true">
          <Icon name={trailingIconName} size={14} tone="secondary" />
        </span>
      ) : null}
    </a>
  );
}

export default Link;
