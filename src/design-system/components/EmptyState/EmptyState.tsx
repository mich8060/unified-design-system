import React from "react";
import { Medallion } from "../Medallion";
import "./_empty-state.scss";
import type { EmptyStateProps } from "./EmptyState.types";

const resolveMedallionSize = (iconSize: number): "small" | "default" | "large" | "xl" => {
  if (iconSize <= 16) return "small";
  if (iconSize <= 20) return "default";
  if (iconSize <= 24) return "large";
  return "xl";
};

export function EmptyState({
  title,
  description,
  icon = "Inbox",
  iconSize = 32,
  action,
  secondaryAction,
  align = "center",
  className = "",
  ...props
}: EmptyStateProps) {
  const classNames = [
    "uds-empty-state",
    `uds-empty-state--${align}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} {...props}>
      <Medallion
        className="uds-empty-state__icon"
        icon={icon}
        size={resolveMedallionSize(iconSize)}
        color="blue"
        aria-hidden="true"
      />
      <div className="uds-empty-state__content">
        <div className="uds-empty-state__title">{title}</div>
        {description ? <div className="uds-empty-state__description">{description}</div> : null}
      </div>
      {(action || secondaryAction) ? (
        <div className="uds-empty-state__actions">
          {secondaryAction}
          {action}
        </div>
      ) : null}
    </div>
  );
}
