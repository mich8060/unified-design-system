import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import "./_progress-indicator.scss";
import type { ProgressIndicatorProps } from "./ProgressIndicator.types";
import type {
    ProgressIndicatorLabelPosition,
    ProgressIndicatorSize,
    ProgressIndicatorVariant,
} from "./ProgressIndicator.types";

const BASE_CLASS = "uds-progress-indicator";

const variantClassMap: Record<ProgressIndicatorVariant, string> = {
    default: "default",
    blue: "blue",
    green: "green",
    success: "green",
    orange: "orange",
    warning: "orange",
    red: "red",
    error: "red",
    purple: "purple",
};

const sizeClassMap: Record<ProgressIndicatorSize, string> = {
    small: "small",
    medium: "medium",
    large: "large",
};

const labelPositionClassMap: Record<ProgressIndicatorLabelPosition, string> = {
    false: "label-false",
    right: "label-right",
    bottom: "label-bottom",
    "top-floating": "label-top-floating",
    "bottom-floating": "label-bottom-floating",
};

/**
 * ProgressIndicator component for displaying progress bars
 * @param {number} value - Progress value (0-100)
 * @param {number} max - Maximum value (default: 100)
 * @param {string} variant - Color variant: 'default', 'blue', 'green', 'success', 'orange', 'warning', 'red', 'error', 'purple'
 * @param {string} size - Size variant: 'small', 'medium', or 'large'
 * @param {string} label - Optional label text to display above the progress bar
 * @param {boolean} showValue - Whether to show the percentage value
 * @param {string} labelPosition - Where to place the percentage label
 * @param {boolean} showLabel - Whether to show the label (if provided)
 * @param {string} className - Additional CSS classes
 * @param {string} 'aria-label' - Accessible label for screen readers
 * @param {object} props - Additional props to pass to the progress element
 */
export default function ProgressIndicator({
    value = 0,
    max = 100,
    variant = "default",
    size = "medium",
    label,
    showValue = false,
    labelPosition,
    showLabel = true,
    className = "",
    "aria-label": ariaLabel,
    ...props
}: ProgressIndicatorProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const displayValue = Math.round(percentage);
    const valueText = `${displayValue}%`;

    const resolvedLabelPosition: ProgressIndicatorLabelPosition =
        labelPosition ?? (showValue ? "right" : "false");
    const hasInlineRightValue = resolvedLabelPosition === "right";
    const hasBottomValue = resolvedLabelPosition === "bottom";
    const hasFloatingValue =
        resolvedLabelPosition === "top-floating" ||
        resolvedLabelPosition === "bottom-floating";
    const floatingPlacement = resolvedLabelPosition === "bottom-floating" ? "bottom" : "top";
    const bubblePosition = Math.min(Math.max(percentage, 4), 96);
    const tooltipAnchorStyle: React.CSSProperties = {
        position: "absolute",
        left: `${bubblePosition}%`,
        top: resolvedLabelPosition === "bottom-floating" ? "100%" : "0",
        transform: "translateX(-50%)",
        width: "10px",
        height: "10px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    };
    const progressId = React.useId();
    const labelId = label ? `${progressId}-label` : undefined;

    const classNames = [
        BASE_CLASS,
        variantClassMap[variant] && `${BASE_CLASS}--${variantClassMap[variant]}`,
        sizeClassMap[size] && `${BASE_CLASS}--${sizeClassMap[size]}`,
        labelPositionClassMap[resolvedLabelPosition] &&
        `${BASE_CLASS}--${labelPositionClassMap[resolvedLabelPosition]}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");
    const resolvedAriaLabel = ariaLabel || (typeof label === "string" ? label : `Progress: ${valueText}`);

    return (
        <div className={classNames} {...props}>
            {(label && showLabel) || hasInlineRightValue ? (
                <div className={`${BASE_CLASS}__header`}>
                    {label && showLabel && (
                        <span id={labelId} className={`${BASE_CLASS}__label`}>
                            {label}
                        </span>
                    )}
                    {hasInlineRightValue && (
                        <span className={`${BASE_CLASS}__value`}>{valueText}</span>
                    )}
                </div>
            ) : null}

            <div
                className={`${BASE_CLASS}__bar`}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label={resolvedAriaLabel}
                aria-labelledby={labelId}
            >
                <div className={`${BASE_CLASS}__track`}>
                    <div
                        className={`${BASE_CLASS}__fill`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                {hasBottomValue && !hasInlineRightValue && (
                    <span
                        className={[
                            `${BASE_CLASS}__value`,
                            `${BASE_CLASS}__value--bottom`,
                        ].join(" ")}
                    >
                        {valueText}
                    </span>
                )}

                {hasFloatingValue && (
                    <Tooltip
                        content={valueText}
                        placement={floatingPlacement}
                        defaultVisible
                        className={`${BASE_CLASS}__tooltip-anchor`}
                        style={tooltipAnchorStyle}
                    >
                        <span
                            className={`${BASE_CLASS}__marker ${BASE_CLASS}__marker--${floatingPlacement === "bottom" ? "up" : "down"}`}
                            aria-hidden="true"
                        />
                    </Tooltip>
                )}
            </div>
        </div>
    );
}
