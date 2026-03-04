import React from "react";
import "./_progress-circle.scss";
import type { ProgressCircleProps } from "./ProgressCircle.types";
import type { ProgressCircleSize } from "./ProgressCircle.types";
import type { ProgressCircleShape } from "./ProgressCircle.types";

const BASE_CLASS = "uds-progress-circle";

const sizeClassMap: Record<ProgressCircleSize, string> = {
  xxs: "xxs",
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
};

const shapeClassMap: Record<ProgressCircleShape, string> = {
  circle: "circle",
  "half-circle": "half-circle",
};

/**
 * ProgressCircle component for displaying circular progress indicators
 * @param {number} value - Progress value (0-100)
 * @param {number} max - Maximum value (default: 100)
 * @param {string} size - Size variant: 'xxs', 'xs', 'sm', 'md', or 'lg'
 * @param {string} shape - Shape variant: 'circle' or 'half-circle'
 * @param {string} label - Optional label text to display
 * @param {string} valueLabel - Optional custom center value text
 * @param {boolean} showLabel - Whether to show the label (if provided)
 * @param {string} className - Additional CSS classes
 * @param {string} 'aria-label' - Accessible label for screen readers
 * @param {object} props - Additional props to pass to the progress element
 */
export default function ProgressCircle({
  value = 40,
  max = 100,
  size = "md",
  shape = "circle",
  label,
  valueLabel,
  showLabel = true,
  className = "",
  "aria-label": ariaLabel,
  ...props
}: ProgressCircleProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayValue = Math.round(percentage);
  const isHalfCircle = shape === "half-circle";

  // Calculate SVG properties based on size
  const sizeConfig: Record<
    ProgressCircleSize,
    { size: number; strokeWidth: number; fontSize: number; labelFontSize: number }
  > = {
    xxs: { size: 64, strokeWidth: 3, fontSize: 14, labelFontSize: 12 },
    xs: { size: 160, strokeWidth: 8, fontSize: 24, labelFontSize: 12 },
    sm: { size: 200, strokeWidth: 10, fontSize: 32, labelFontSize: 12 },
    md: { size: 240, strokeWidth: 12, fontSize: 36, labelFontSize: 12 },
    lg: { size: 280, strokeWidth: 14, fontSize: 48, labelFontSize: 12 },
  };

  const config = sizeConfig[size];
  const radius = (config.size - config.strokeWidth) / 2;
  const fullCircleOffset = 100 - percentage;
  const halfCircleOffset = 100 - percentage;

  const classNames = [
    BASE_CLASS,
    sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
    shapeClassMap[shape] && `${BASE_CLASS}--${shapeClassMap[shape]}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const progressId = `progress-circle-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = label ? `${progressId}-label` : undefined;
  const resolvedAriaLabel =
    ariaLabel ??
    (typeof label === "string" || typeof label === "number"
      ? String(label)
      : `Progress: ${displayValue}%`);

  // SVG viewBox and dimensions
  const viewBoxSize = config.size;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;

  const svgHeight = isHalfCircle ? viewBoxSize / 2 + config.strokeWidth : viewBoxSize;
  const svgCenterY = centerY;
  const halfCirclePath = `M ${centerX - radius} ${svgCenterY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${svgCenterY}`;

  return (
    <div
      className={classNames}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={resolvedAriaLabel}
      aria-labelledby={labelId}
      {...props}
    >
      <svg
        className={`${BASE_CLASS}__svg`}
        width={config.size}
        height={svgHeight}
        viewBox={`0 0 ${viewBoxSize} ${svgHeight}`}
      >
        {isHalfCircle ? (
          <>
            {/* Top half track (left to right arc) */}
            <path
              className={`${BASE_CLASS}__track`}
              d={halfCirclePath}
              fill="none"
              strokeWidth={config.strokeWidth}
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={0}
              strokeLinecap="round"
            />

            {/* Top half fill (left to right) */}
            <path
              className={`${BASE_CLASS}__fill`}
              d={halfCirclePath}
              fill="none"
              strokeWidth={config.strokeWidth}
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={halfCircleOffset}
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* Full circle track */}
            <circle
              className={`${BASE_CLASS}__track`}
              cx={centerX}
              cy={svgCenterY}
              r={radius}
              fill="none"
              strokeWidth={config.strokeWidth}
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={0}
            />

            {/* Full circle fill */}
            <circle
              className={`${BASE_CLASS}__fill`}
              cx={centerX}
              cy={svgCenterY}
              r={radius}
              fill="none"
              strokeWidth={config.strokeWidth}
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={fullCircleOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${centerX} ${svgCenterY})`}
            />
          </>
        )}
      </svg>

      {/* Content overlay */}
      <div className={`${BASE_CLASS}__content`}>
        {label && showLabel && (
          <span id={labelId} className={`${BASE_CLASS}__label`}>
            {label}
          </span>
        )}
        <span
          className={`${BASE_CLASS}__value`}
        >
          {valueLabel ?? `${displayValue}%`}
        </span>
      </div>
    </div>
  );
}
