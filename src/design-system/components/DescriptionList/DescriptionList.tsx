import React from "react";
import { Text } from "../Text";
import "./_description-list.scss";
import type { DescriptionListProps } from "./DescriptionList.types";

export function DescriptionList({
  items,
  density = "default",
  labelWidth = "md",
  variant = "default",
  bordered = true,
  fullWidth = true,
  className = "",
  ...rest
}: DescriptionListProps) {
  const classNames = [
    "uds-description-list",
    `uds-description-list--density-${density}`,
    `uds-description-list--label-width-${labelWidth}`,
    `uds-description-list--variant-${variant}`,
    fullWidth && "uds-description-list--full-width",
    bordered && variant === "default" && "uds-description-list--bordered",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <dl className={classNames} {...rest}>
      {items.map((item, index) => (
        <div className="uds-description-list__row" key={item.id ?? `row-${index}`}>
          <dt className="uds-description-list__label">
            <Text as="span" variant="body-14" tone="primary" leading="regular" weight="semibold">
              {item.label}
            </Text>
          </dt>
          <dd className="uds-description-list__value">
            <Text as="span" variant="body-14" tone="secondary" leading="regular">
              {item.value}
            </Text>
          </dd>
        </div>
      ))}
    </dl>
  );
}
