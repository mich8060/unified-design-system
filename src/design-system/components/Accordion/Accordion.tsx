import React, { useId, useMemo, useState } from "react";
import { Layout } from "../Layout";
import Icon from "../Icon/Icon";
import { SearchInput } from "../SearchInput";
import "./_accordion.scss";
import type { AccordionItemProps, AccordionProps } from "./Accordion.types";

const toSafeIdPart = (value: string): string => {
    const normalized = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return normalized || "item";
};

/**
 * AccordionItem component - individual accordion item
 * @param {string} label - The label text for the accordion item
 * @param {boolean} defaultExpanded - Whether the item is expanded by default
 * @param {React.ReactNode} children - Content to display when expanded
 * @param {string} className - Additional CSS classes
 * @param {function} onToggle - Callback when item is toggled (receives new expanded state)
 * @param {object} props - Additional props to pass to the accordion item
 */
export function AccordionItem({
    label,
    defaultExpanded = false,
    children,
    className = "",
    onToggle,
    id,
    ...props
}: AccordionItemProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const generatedId = useId();
    const baseId = useMemo(() => {
        if (typeof id === "string" && id.trim()) {
            return toSafeIdPart(id);
        }
        if (typeof label === "string" && label.trim()) {
            return toSafeIdPart(label);
        }
        return toSafeIdPart(generatedId);
    }, [generatedId, id, label]);
    const headerId = `accordion-header-${baseId}`;
    const contentId = `accordion-content-${baseId}`;

    const handleToggle = () => {
        const newExpanded = !expanded;
        setExpanded(newExpanded);
        onToggle?.(newExpanded);
    };

    return (
        <div className={`accordion-item ${className}`} {...props}>
            <button
                type="button"
                id={headerId}
                className="accordion-item__header"
                onClick={handleToggle}
                aria-expanded={expanded}
                aria-controls={contentId}
            >
                <span className="accordion-item__label">{label}</span>
                <Icon
                    name="CaretDown"
                    size={16}
                    appearance="bold"
                    className={`accordion-item__icon ${expanded ? "accordion-item__icon--expanded" : ""}`}
                />
            </button>
            <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className={`accordion-item__body ${expanded ? "accordion-item__body--expanded" : ""}`}
            >
                <div className="accordion-item__body-inner">
                    {children}
                </div>
            </div>
        </div>
    );
}

/**
 * Accordion component - container for accordion items
 * @param {React.ReactNode} children - AccordionItem components
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props to pass to the accordion container
 */
export default function Accordion({
    title,
    itemCount,
    headerActions,
    search = false,
    searchPlaceholder = "Search",
    searchValue,
    onSearchChange,
    children,
    className = "",
    ...props
}: AccordionProps) {
    const { variant = "default", ...rest } = props;
    const variantClass = variant === "secondary" ? "accordion--secondary" : "";
    const accordionClassName = ["accordion", variantClass, className].filter(Boolean).join(" ");

    return (
        <div className={accordionClassName} {...rest}>
            {(title || typeof itemCount === "number" || headerActions || search) ? (
                <Layout className="accordion__group-header" alignItems="center" justifyContent="space-between" gap="12">
                    <Layout className="accordion__group-meta" alignItems="center" gap="8">
                        {title ? <span className="accordion__group-title">{title}</span> : null}
                        {typeof itemCount === "number" ? (
                            <span className="accordion__group-count" aria-label={`${itemCount} items`}>
                                {itemCount}
                            </span>
                        ) : null}
                    </Layout>
                    <Layout className="accordion__group-actions" alignItems="center" gap="8">
                        {search ? (
                            <SearchInput
                                value={searchValue}
                                onChange={(event) => onSearchChange?.(event.currentTarget.value)}
                                placeholder={searchPlaceholder}
                                size="compact"
                                width="sm"
                                context="toolbar"
                            />
                        ) : null}
                        {headerActions}
                    </Layout>
                </Layout>
            ) : null}
            {children}
        </div>
    );
}
