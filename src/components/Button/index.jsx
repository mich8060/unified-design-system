import React from "react";
import "./styles.scss";

function Button({
    children,
    icon,
    iconPlacement = "leading",
    iconOnly = false,
    size,                               // "xs" | "sm" | "lg" | undefined
    variant = "default",                 // "default" | "ghost" | "soft" | "outline"
    className = "",
    ...rest
}) {
    const hasIcon = !!icon;
    const placement = iconPlacement === "tailing" ? "trailing" : iconPlacement;
    const isIconOnly = iconOnly && hasIcon;

    // pull user props we might need, and prevent them from overwriting ours
    const {
        onClick: userOnClick,
        onKeyDown: userOnKeyDown,
        className: _omitClassName,
        title: titleFromUser,
        ["aria-label"]: ariaLabelFromUser,
        tabIndex: userTabIndex,
        type: userType,
        ...buttonProps
    } = rest;

    // a11y: icon only must have a name
    if (isIconOnly && !ariaLabelFromUser && !titleFromUser) {
        console.warn("Button (iconOnly) requires aria-label or title for accessibility.");
    }

    // support aria-disabled (for <a role="button"> cases)
    const ariaDisabled =
        buttonProps["aria-disabled"] === true || buttonProps["aria-disabled"] === "true";

    const onClick = ariaDisabled ? undefined : userOnClick;
    const tabIndex = ariaDisabled ? -1 : userTabIndex;

    // ---- classes -----------------------------------------------------------
    const validVariants = ["ghost", "soft", "outline", "default"];
    const validSizes = ["xs", "sm", "lg"];

    // BEM: variants use double hyphen, default = no modifier class
    const variantClass =
        variant && validVariants.includes(variant) && variant !== "default"
            ? `uds-btn--${variant}`
            : null;

    // sizes use single hyphen per your earlier convention
    const sizeClass =
        size && validSizes.includes(size) ? `uds-btn-${size}` : null;

    if (variant && !validVariants.includes(variant)) {
        console.warn(`Button: invalid variant "${variant}". Allowed: ${validVariants.join(", ")}`);
    }
    if (size && !validSizes.includes(size)) {
        console.warn(`Button: invalid size "${size}". Allowed: ${validSizes.join(", ")}`);
    }

    const classes = [
        "uds-btn",
        sizeClass,
        variantClass,
        isIconOnly
            ? "uds-btn--icon-only"
            : hasIcon
              ? (placement === "trailing" ? "uds-btn--icon-trailing" : "uds-btn--icon-leading")
              : null,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // key handling (do not call undefined)
    function handleKeyDown(e) {
        if (ariaDisabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        userOnKeyDown?.(e);
    }

    return (
        <button
            {...buttonProps}                      // spread FIRST so we can override below
            type={userType || "button"}
            className={classes}
            disabled={buttonProps.disabled}
            aria-disabled={ariaDisabled || undefined}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            tabIndex={tabIndex}
            // only add an accessible name when icon-only
            aria-label={isIconOnly ? (ariaLabelFromUser || titleFromUser) : undefined}
            title={titleFromUser}
        >
            {isIconOnly ? (
                <>
                    <span className="uds-btn__icon" aria-hidden="true">{icon}</span>
                    <span className="uds-btn__label">{children}</span>
                </>
            ) : hasIcon ? (
                placement === "trailing" ? (
                    <>
                        <span className="uds-btn__label">{children}</span>
                        <span className="uds-btn__icon" aria-hidden="true">{icon}</span>
                    </>
                ) : (
                    <>
                        <span className="uds-btn__icon" aria-hidden="true">{icon}</span>
                        <span className="uds-btn__label">{children}</span>
                    </>
                )
            ) : (
                <span className="uds-btn__label">{children}</span>
            )}
        </button>
    );
}

export default Button;
