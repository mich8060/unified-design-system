import Icon from "../Icon/Icon";
import "./_medallion.scss";
import type { MedallionProps, MedallionShape, MedallionSize } from "./Medallion.types";

const BASE_CLASS = "uds-medallion";

const shapeClassMap: Record<MedallionShape, string> = {
  circle: "circle",
  square: "square",
  roundedSquare: "rounded-square",
  diamond: "diamond",
};

const sizeClassMap: Record<MedallionSize, string> = {
  small: "small",
  default: "default",
  large: "large",
  xl: "xl",
};

const iconSizeMap: Record<MedallionSize, number> = {
  small: 16,
  default: 20,
  large: 24,
  xl: 28,
};

/**
 * Medallion displays an icon inside a colored shape.
 */
export function Medallion({
  icon = "FileText",
  shape = "circle",
  size = "default",
  color = "neutral",
  className = "",
  ...rest
}: MedallionProps) {
  const classNames = [
    BASE_CLASS,
    `${BASE_CLASS}--${shapeClassMap[shape]}`,
    `${BASE_CLASS}--${sizeClassMap[size]}`,
    `${BASE_CLASS}--${color}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} {...rest}>
      {typeof icon === "string" ? (
        <Icon name={icon} size={iconSizeMap[size]} className={`${BASE_CLASS}__icon`} />
      ) : (
        <span className={`${BASE_CLASS}__icon`}>{icon}</span>
      )}
    </div>
  );
}
