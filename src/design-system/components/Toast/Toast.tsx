import React from "react";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import DotStatus from "../DotStatus/DotStatus";
import Icon from "../Icon/Icon";
import "./_toast.scss";
import type { ToastProps } from "./Toast.types";

const BASE_CLASS = "uds-toast";

const variantClassMap = {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
};

const actionsClassMap = {
    none: "none",
    close: "close",
    subtle: "subtle",
    buttons: "buttons",
} as const;

const sizeClassMap = {
    default: "default",
    condensed: "condensed",
} as const;

const iconMap = {
    success: "CheckCircle",
    error: "XCircle",
    warning: "Warning",
    info: "Info",
};

const dotVariantMap = {
    success: "green",
    error: "red",
    warning: "orange",
    info: "blue",
} as const;

/**
 * Toast component for displaying notification messages
 * @param {string} message - The message text to display
 * @param {string} variant - Toast variant: 'success', 'error', 'warning', 'info' (default: 'info')
 * @param {string} title - Optional title text
 * @param {boolean} showIcon - Whether to show an icon (default: true)
 * @param {boolean} showClose - Whether to show a close button (default: true)
 * @param {function} onClose - Callback function when toast is closed
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the toast element
 */
export default function Toast({
    message = "Anyone with a link can now view this file.",
    variant = "info",
    title = "Successfully saved!",
    leading,
    icon,
    appearance = "icon",
    actions = "none",
    size = "default",
    avatarSrc,
    avatarInitials = "EB",
    showIcon = true,
    showClose = true,
    primaryActionLabel = "Undo",
    secondaryActionLabel = "Dismiss",
    onPrimaryAction,
    onSecondaryAction,
    onClose,
    className = "",
    ...props
}: ToastProps) {
    const resolvedActions = showClose ? actions : actions === "close" ? "none" : actions;

    const shouldShowMessage = size === "default" && Boolean(message);
    const hasSubtleActions = resolvedActions === "subtle";
    const hasButtonActions = resolvedActions === "buttons";
    const hasCloseAction = resolvedActions === "close";

    const classNames = [
        BASE_CLASS,
        variantClassMap[variant] && `${BASE_CLASS}--${variantClassMap[variant]}`,
        `${BASE_CLASS}--${actionsClassMap[resolvedActions]}`,
        `${BASE_CLASS}--${sizeClassMap[size]}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const resolvedIcon = icon ?? iconMap[variant] ?? "Info";
    const resolvedLeading = (() => {
        if (leading !== undefined) return leading;
        if (!showIcon) return null;
        if (appearance === "avatar") {
            return <Avatar src={avatarSrc} initials={avatarInitials} size="default" />;
        }
        if (appearance === "dot-indicator") {
            return <DotStatus variant={dotVariantMap[variant]} size="medium" />;
        }
        if (typeof resolvedIcon === "string") {
            return <Icon name={resolvedIcon} size={32} appearance="regular" />;
        }
        return resolvedIcon;
    })();

    return (
        <div className={classNames} role="alert" {...props}>
            {resolvedLeading != null && (
                <div className={`${BASE_CLASS}__leading`}>
                    {typeof resolvedLeading === "string" ? (
                        <span className={`${BASE_CLASS}__leading-node`}>{resolvedLeading}</span>
                    ) : (
                        resolvedLeading
                    )}
                </div>
            )}
            <div className={`${BASE_CLASS}__content`}>
                {title && <div className={`${BASE_CLASS}__title`}>{title}</div>}
                {shouldShowMessage && <div className={`${BASE_CLASS}__message`}>{message}</div>}
                {(hasSubtleActions || hasButtonActions) && (
                    <div className={`${BASE_CLASS}__actions`}>
                        {hasSubtleActions && (
                            <>
                                <Button
                                    type="button"
                                    size="small"
                                    appearance="text"
                                    className={`${BASE_CLASS}__subtle-action ${BASE_CLASS}__subtle-action--primary`}
                                    label={primaryActionLabel}
                                    onClick={onPrimaryAction}
                                />
                                <Button
                                    type="button"
                                    size="small"
                                    appearance="text"
                                    className={`${BASE_CLASS}__subtle-action`}
                                    label={secondaryActionLabel}
                                    onClick={onSecondaryAction}
                                />
                            </>
                        )}
                        {hasButtonActions && (
                            <>
                                <Button size="small" label={primaryActionLabel} onClick={onPrimaryAction} />
                                <Button size="small" appearance="outline" label={secondaryActionLabel} onClick={onSecondaryAction} />
                            </>
                        )}
                    </div>
                )}
            </div>
            {hasCloseAction && (
                <Button
                    type="button"
                    appearance="text"
                    layout="icon-only"
                    icon="X"
                    label="Close toast"
                    className={`${BASE_CLASS}__close`}
                    onClick={onClose}
                    aria-label="Close toast"
                />
            )}
        </div>
    );
}
