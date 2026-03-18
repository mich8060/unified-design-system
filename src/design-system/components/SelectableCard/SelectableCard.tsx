import React from "react";
import { Text } from "../Text";
import "./_selectable-card.scss";
import type { SelectableCardProps } from "./SelectableCard.types";

export function SelectableCard({
  selected = false,
  disabled = false,
  onSelect,
  onClick,
  leading,
  title,
  description,
  meta,
  status,
  trailing,
  className = "",
  children,
  ...rest
}: SelectableCardProps) {
  const isInteractive = typeof onSelect === "function" || typeof onClick === "function";
  const classNames = [
    "uds-selectable-card",
    selected && "uds-selectable-card--selected",
    disabled && "uds-selectable-card--disabled",
    isInteractive && "uds-selectable-card--interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
  };

  const content = children ?? (
    <>
      {leading ? <div className="uds-selectable-card__leading">{leading}</div> : null}
      <div className="uds-selectable-card__content">
        {title ? (
          <Text as="h4" variant="body-16" weight="semibold">
            {title}
          </Text>
        ) : null}
        {description ? (
          <Text as="p" variant="body-14" tone="secondary">
            {description}
          </Text>
        ) : null}
        {meta ? <div className="uds-selectable-card__meta">{meta}</div> : null}
      </div>
      {status ? <div className="uds-selectable-card__status">{status}</div> : null}
      {trailing ? <div className="uds-selectable-card__trailing">{trailing}</div> : null}
    </>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={(event) => {
          onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
          handleClick();
        }}
        aria-pressed={selected}
        disabled={disabled}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={classNames} {...rest}>
      {content}
    </div>
  );
}
