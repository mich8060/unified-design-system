import Button from "../Button/Button";
import "./_button-group.scss";
import type { ButtonGroupProps } from "./ButtonGroup.types";

export function ButtonGroup({
  options = [],
  orientation = "horizontal",
  size = "default",
  disabled = false,
  className = "",
  children,
  ...rest
}: ButtonGroupProps) {
  const classNames = [
    "uds-button-group",
    `uds-button-group--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasOptions = options.length > 0;

  return (
    <div className={classNames} role="group" {...rest}>
      {hasOptions
        ? options.map((option) => (
            <Button
              key={option.id}
              label={option.label}
              appearance="outline"
              layout={option.layout ?? "label-only"}
              size={option.size ?? size}
              icon={option.icon}
              startSlot={option.startSlot}
              endSlot={option.endSlot}
              iconSize={option.iconSize}
              disabled={disabled || option.disabled}
              loading={option.loading}
              onClick={option.onClick}
              className="uds-button-group__button"
            />
          ))
        : children}
    </div>
  );
}
