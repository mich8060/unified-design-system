import Icon from "../Icon/Icon";
import { Text } from "../Text/Text";
import "./_statistics.scss";
import type { StatisticsProps } from "./Statistics.types";
import ProgressIndicator from "../ProgressIndicator";
import type { CSSProperties } from "react";

const TREND_ICON: Record<NonNullable<StatisticsProps["trend"]>, string> = {
    up: "TrendUp",
    down: "TrendDown",
    neutral: "Minus",
};

export function Statistics({
    label,
    value,
    helperText,
    changeText,
    trend = "neutral",
    icon,
    iconAccent,
    labelBoxColor,
    progressValue,
    progressLabel,
    className = "",
    style,
    ...rest
}: StatisticsProps) {
    const hasContent = (content: unknown): boolean =>
        content !== undefined && content !== null && content !== false && content !== "";

    const clampedProgress =
        typeof progressValue === "number" && Number.isFinite(progressValue)
            ? Math.min(100, Math.max(0, progressValue))
            : undefined;

    const hasHeader = hasContent(label) || Boolean(icon);
    const hasValue = hasContent(value);
    const hasHelper = hasContent(helperText);
    const hasChange = hasContent(changeText);

    const iconTileStyle: CSSProperties | undefined =
        typeof labelBoxColor === "string" && labelBoxColor.trim().length > 0
            ? { backgroundColor: labelBoxColor.trim() }
            : undefined;

    const classNames = [
        "uds-statistics",
        iconAccent && `uds-statistics--icon-accent-${iconAccent}`,
        hasChange && `uds-statistics--trend-${trend}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classNames} style={style} {...rest}>
            {hasHeader ? (
                <div className="uds-statistics__header">
                    <div className="uds-statistics__main">
                        {icon ? (
                            <div className="uds-statistics__icon">
                                {hasContent(label) ? (
                                    <Text as="span" variant="body-14" weight="semibold" leading="regular" className="uds-statistics__label">
                                        {label}
                                    </Text>
                                ) : null}
                                <span className="uds-statistics__icon-tile" style={iconTileStyle} aria-hidden="true">
                                    <Icon name={icon} size={24} />
                                </span>
                            </div>
                        ) : null}
                        <div className="uds-statistics__text">
                            {hasValue ? (
                                <div className="uds-statistics__value">
                                    <Text as="p" variant="display-48" weight="bold" leading="regular">
                                        {value}
                                    </Text>
                                </div>
                            ) : null}

                            {hasHelper ? (
                                <Text as="p" variant="body-14" leading="regular">
                                    {helperText}
                                </Text>
                            ) : null}

                            {hasChange ? (
                                <div className="uds-statistics__change">
                                    <Icon name={TREND_ICON[trend]} size={14} />
                                    <Text as="span" variant="body-14" weight="semibold" leading="regular">
                                        {changeText}
                                    </Text>
                                </div>
                            ) : null}
                        </div>

                        {clampedProgress !== undefined ? (
                            <div className="uds-statistics__progress-row">
                                <ProgressIndicator size="large" value={clampedProgress} className="uds-statistics__progress-indicator" />
                                {hasContent(progressLabel) ? (
                                    <Text as="span" variant="body-12" weight="semibold" leading="regular" className="uds-statistics__progress-label">
                                        {progressLabel}
                                    </Text>
                                ) : null}

                            </div>
                        ) : null}

                    </div>
                </div>
            ) : null}
        </div>
    );
}
