import React, { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import "./_modal.scss";
import type { ModalProps } from "./Modal.types";

const BASE_CLASS = "uds-modal";

const sizeClassMap = {
    small: "small",
    default: "default",
    large: "large",
    fullscreen: "fullscreen",
};

function toReactNode(value: unknown): React.ReactNode {
    if (value === null || value === undefined || typeof value === "boolean") return null;
    if (React.isValidElement(value) || typeof value === "string" || typeof value === "number") {
        return value;
    }
    return null;
}

/**
 * Modal component — Accessible dialog overlay
 *
 * A standalone, controlled modal that renders via a portal.
 * Supports title/subtitle/badge header, scrollable content, footer actions,
 * size variants, backdrop click dismissal, and Escape key dismissal.
 *
 * @param {boolean}       open             - Whether the modal is visible
 * @param {function}      onClose          - Called when the user requests close (Escape, backdrop, X button)
 * @param {string}        title            - Header title text
 * @param {string}        subtitle         - Header subtitle text
 * @param {React.ReactNode} badge          - Optional badge element next to the title
 * @param {React.ReactNode} header         - Custom header override (replaces title/subtitle/badge)
 * @param {React.ReactNode} footer         - Footer content (typically action buttons)
 * @param {string}        size             - "small" (480px) | "default" (640px) | "large" (800px) | "fullscreen"
 * @param {boolean}       closeOnBackdrop  - Close when clicking the overlay backdrop (default true)
 * @param {boolean}       closeOnEscape    - Close on Escape key press (default true)
 * @param {HTMLElement}   container        - Portal target element (default document.body)
 * @param {string}        className        - Additional CSS classes for the dialog panel
 * @param {React.ReactNode} children       - Modal body content
 * @param {object}        props            - Additional props spread onto the dialog element
 */
function Modal({
    open = false,
    onClose,
    title,
    subtitle,
    badge,
    header,
    footer,
    size = "default",
    closeOnBackdrop = true,
    closeOnEscape = true,
    dismissible = false,
    headerActions,
    headerAlign = "start",
    footerAlign = "space-between",
    bodyPadding = "none",
    container,
    className = "",
    children,
    ...props
}: ModalProps) {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const resolvedTitle = toReactNode(title);
    const resolvedSubtitle = toReactNode(subtitle);
    const resolvedBadge = toReactNode(badge);
    const resolvedHeader =
        toReactNode(header) ??
        (resolvedTitle || resolvedSubtitle || resolvedBadge ? (
            <>
                {resolvedTitle}
                {resolvedSubtitle}
                {resolvedBadge}
            </>
        ) : null);
    const resolvedFooter = toReactNode(footer);
    const resolvedChildren = toReactNode(children);
    const resolvedHeaderActions = toReactNode(headerActions);
    const dialogProps = props as React.HTMLAttributes<HTMLDivElement>;

    // Lock body scroll and trap focus when open
    useEffect(() => {
        if (open) {
            previousActiveElement.current =
                document.activeElement instanceof HTMLElement ? document.activeElement : null;
            document.body.style.overflow = "hidden";

            // Focus the dialog panel for keyboard accessibility
            requestAnimationFrame(() => {
                dialogRef.current?.focus();
            });

            return () => {
                document.body.style.overflow = "";
                // Restore focus to previously active element
                previousActiveElement.current?.focus();
            };
        }
    }, [open]);

    // Escape key handler
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Escape" && closeOnEscape && onClose) {
                e.stopPropagation();
                onClose();
            }
        },
        [closeOnEscape, onClose],
    );

    // Backdrop click handler
    const handleBackdropClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget && closeOnBackdrop && onClose) {
                onClose();
            }
        },
        [closeOnBackdrop, onClose],
    );

    if (!open) return null;

    const sizeClass =
        typeof size === "string" && size in sizeClassMap
            ? sizeClassMap[size as keyof typeof sizeClassMap]
            : sizeClassMap.default;

    const dialogClasses = [
        BASE_CLASS,
        `${BASE_CLASS}--${sizeClass}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const headerClasses = [
        `${BASE_CLASS}__header`,
        `${BASE_CLASS}__header--align-${headerAlign}`,
    ]
        .filter(Boolean)
        .join(" ");
    const bodyClasses = [
        `${BASE_CLASS}__body`,
        `${BASE_CLASS}__body--padding-${bodyPadding}`,
    ]
        .filter(Boolean)
        .join(" ");
    const footerClasses = [
        `${BASE_CLASS}__footer`,
        `${BASE_CLASS}__footer--align-${footerAlign}`,
    ]
        .filter(Boolean)
        .join(" ");

    const overlayClasses = [
        `${BASE_CLASS}__overlay`,
        size === "fullscreen" && `${BASE_CLASS}__overlay--fullscreen`,
    ]
        .filter(Boolean)
        .join(" ");

    const modal = (
        <div
            className={overlayClasses}
            onClick={handleBackdropClick}
            aria-hidden="true"
        >
            <div
                ref={dialogRef}
                className={dialogClasses}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                {...dialogProps}
            >
                {resolvedHeader || dismissible || resolvedHeaderActions ? (
                    <div className={headerClasses}>
                        {resolvedHeader ? <div className={`${BASE_CLASS}__header-content`}>{resolvedHeader}</div> : null}
                        {resolvedHeaderActions ? (
                            <div className={`${BASE_CLASS}__header-actions`}>{resolvedHeaderActions}</div>
                        ) : null}
                        {dismissible ? (
                            <Button
                                appearance="text"
                                layout="icon-only"
                                size="default"
                                icon="X"
                                label="Close modal"
                                onClick={() => onClose?.()}
                            />
                        ) : null}
                    </div>
                ) : null}

                {/* Body */}
                <div className={bodyClasses}>{resolvedChildren}</div>

                {/* Footer */}
                {resolvedFooter && <div className={footerClasses}>{resolvedFooter}</div>}
            </div>
        </div>
    );

    const portalContainer = container instanceof HTMLElement ? container : document.body;
    return createPortal(modal, portalContainer);
}

export default React.memo(Modal);
