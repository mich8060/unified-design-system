import React from "react";
import "./ProgressCircle.scss";

const BASE_CLASS = "uds-progress-circle";

const sizeClassMap = {
  xxs: "xxs",
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
};

const shapeClassMap = {
  circle: "circle",
  "half-circle": "half-circle",
};

/**
 * ProgressCircle component for displaying circular progress indicators
 * @param {number} value - Progress value (0-100)
 * @param {number} max - Maximum value (default: 100)
 * @param {string} size - Size variant: 'xxs', 'xs', 'sm', 'md', or 'lg'
 * @param {string} shape - Shape variant: 'circle' (full circle) or 'half-circle' (semi-circle)
 * @param {string} label - Optional label text to display
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
  showLabel = true,
  className = "",
  "aria-label": ariaLabel,
  ...props
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayValue = Math.round(percentage);

  // Calculate SVG properties based on size
  const sizeConfig = {
    xxs: { size: 64, strokeWidth: 3, fontSize: 14, labelFontSize: 12 },
    xs: { size: 160, strokeWidth: 8, fontSize: 24, labelFontSize: 12 },
    sm: { size: 200, strokeWidth: 10, fontSize: 32, labelFontSize: 12 },
    md: { size: 240, strokeWidth: 12, fontSize: 36, labelFontSize: 12 },
    lg: { size: 280, strokeWidth: 14, fontSize: 48, labelFontSize: 12 },
  };

  const config = sizeConfig[size] || sizeConfig.md;
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference =
    shape === "half-circle"
      ? Math.PI * radius // Half circle
      : 2 * Math.PI * radius; // Full circle
  const offset = circumference - (percentage / 100) * circumference;

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

  // SVG viewBox and dimensions
  const viewBoxSize = config.size;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;

  // For half-circle, we need to adjust the SVG
  const svgHeight = shape === "half-circle" ? viewBoxSize / 2 : viewBoxSize;
  const svgCenterY = shape === "half-circle" ? viewBoxSize : centerY;

  return (
    <div
      className={classNames}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || label || `Progress: ${displayValue}%`}
      aria-labelledby={labelId}
      {...props}
    >
      <svg
        className={`${BASE_CLASS}__svg`}
        width={config.size}
        height={svgHeight}
        viewBox={`0 ${shape === "half-circle" ? viewBoxSize / 2 : 0} ${viewBoxSize} ${svgHeight}`}
      >
        {/* Background track */}
        <circle
          className={`${BASE_CLASS}__track`}
          cx={centerX}
          cy={svgCenterY}
          r={radius}
          fill="none"
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={shape === "half-circle" ? circumference / 2 : 0}
          pathLength={circumference}
        />

        {/* Progress fill */}
        <circle
          className={`${BASE_CLASS}__fill`}
          cx={centerX}
          cy={svgCenterY}
          r={radius}
          fill="none"
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={
            shape === "half-circle" ? circumference / 2 + offset : offset
          }
          pathLength={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${centerX} ${svgCenterY})`}
        />
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
          style={{ fontSize: `${config.fontSize}px` }}
        >
          {displayValue}%
        </span>
      </div>
    </div>
  );
}
