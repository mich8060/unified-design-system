import { Button } from "../../design-system/components/Button";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { COMPONENT_DEMOS } from "../../demos/component-demo.registry";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import tooltipThumbnail from "../../design-system/assets/images/tooltip-thumbnail.png";
import urlInputThumbnail from "../../design-system/assets/images/url-input-thumbnail.png";
import toastThumbnail from "../../design-system/assets/images/toast-thumbnail.png";
import toggleThumbnail from "../../design-system/assets/images/toggle-thumbnail.png";
import toolbarThumbnail from "../../design-system/assets/images/toolbar-thumbnail.png";
import { DocPageLayout } from "./DocPageLayout";
import "./_getting-started-page.scss";

const QUICK_STEPS = [
    "Choose a brand and theme from the left menu.",
    "Browse component demos to understand available variants and states.",
    "Use semantic design tokens for spacing, color, and typography decisions.",
];

function getComponentCategory(slug: string): string {
    return CATEGORY_BY_SLUG[slug] ?? "General";
}

function getComponentDescription(label: string, kind: "module" | "placeholder"): string {
    if (kind === "module") {
        return `${label} includes documented variants and a live demo you can explore.`;
    }

    return `${label} is scaffolded in the system and ready for expanded demo coverage.`;
}

function ComponentCardIllustration({ slug, label }: { slug: string; label: string }) {
    const p = {
        className: "getting-started__component-illustration",
        viewBox: "0 0 120 44" as const,
        "aria-hidden": true,
        focusable: false,
    };

    switch (slug) {
        case "accordion":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="3" width="112" height="11" rx="3" className="gs-illustration__stroke" />
                    <rect x="4" y="16" width="112" height="11" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M107 20 L110 23 L113 20" fill="none" stroke="var(--uds-system-action-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="8" y="29" width="72" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="4" y="35" width="112" height="8" rx="3" className="gs-illustration__stroke" />
                </svg>
            );
        case "action-menu":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="18" cy="12" r="3" className="gs-illustration__dot" />
                    <circle cx="18" cy="22" r="3" className="gs-illustration__dot gs-illustration__pulse" />
                    <circle cx="18" cy="32" r="3" className="gs-illustration__dot" />
                    <rect x="26" y="8" width="88" height="28" rx="4" className="gs-illustration__stroke gs-illustration__pulse-soft" />
                    <rect x="32" y="14" width="50" height="4" rx="2" className="gs-illustration__fill" />
                    <rect x="32" y="22" width="36" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="32" y="30" width="44" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "app-shell":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="4" className="gs-illustration__stroke" />
                    <rect x="4" y="4" width="112" height="10" rx="4" className="gs-illustration__fill-soft" />
                    <rect x="4" y="14" width="22" height="26" className="gs-illustration__fill-soft" />
                    <rect x="32" y="18" width="72" height="5" rx="2.5" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="32" y="27" width="50" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "avatar":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="30" cy="22" r="14" className="gs-illustration__stroke" />
                    <circle cx="30" cy="17" r="5" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M16 36 Q18 26 30 26 Q42 26 44 36" fill="var(--uds-surface-brand-tertiary)" fillOpacity="0.3" />
                    <circle cx="70" cy="22" r="10" className="gs-illustration__stroke" />
                    <circle cx="70" cy="18" r="4" className="gs-illustration__fill" />
                    <path d="M60 34 Q62 27 70 27 Q78 27 80 34" fill="var(--uds-surface-brand-tertiary)" fillOpacity="0.3" />
                    <circle cx="100" cy="22" r="8" className="gs-illustration__fill-soft" />
                    <circle cx="100" cy="19" r="3" className="gs-illustration__fill" />
                </svg>
            );
        case "badge":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="14" y="12" width="72" height="20" rx="6" className="gs-illustration__stroke" />
                    <rect x="22" y="19" width="44" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <circle cx="86" cy="12" r="8" className="gs-illustration__dot gs-illustration__pulse" />
                    <rect x="83" y="9" width="6" height="6" rx="1" fill="var(--uds-surface-primary)" />
                </svg>
            );
        case "branding":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="26" cy="22" r="12" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <circle cx="52" cy="22" r="12" className="gs-illustration__stroke" />
                    <circle cx="78" cy="22" r="12" className="gs-illustration__fill-soft" />
                    <rect x="96" y="14" width="18" height="16" rx="4" className="gs-illustration__fill" />
                </svg>
            );
        case "breadcrumb":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="16" width="22" height="12" rx="3" className="gs-illustration__fill-soft" />
                    <path d="M30 22 L36 22 M33 18 L37 22 L33 26" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="40" y="16" width="22" height="12" rx="3" className="gs-illustration__fill-soft" />
                    <path d="M66 22 L72 22 M69 18 L73 22 L69 26" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="76" y="16" width="38" height="12" rx="3" className="gs-illustration__fill gs-illustration__pulse" />
                </svg>
            );
        case "button":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="20" y="10" width="80" height="24" rx="7" className="gs-illustration__fill gs-illustration__pulse" />
                    <rect x="32" y="19" width="56" height="6" rx="3" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                </svg>
            );
        case "button-group":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="13" width="34" height="18" rx="5" className="gs-illustration__fill gs-illustration__pulse" />
                    <rect x="43" y="13" width="34" height="18" rx="5" className="gs-illustration__stroke" />
                    <rect x="82" y="13" width="34" height="18" rx="5" className="gs-illustration__stroke" />
                </svg>
            );
        case "calendar":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="6" y="4" width="108" height="36" rx="4" className="gs-illustration__stroke" />
                    <rect x="6" y="4" width="108" height="12" rx="4" className="gs-illustration__fill-soft" />
                    <circle cx="22" cy="26" r="3" className="gs-illustration__dot gs-illustration__pulse" />
                    <circle cx="38" cy="26" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="54" cy="26" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="70" cy="26" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="86" cy="26" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="102" cy="26" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="22" cy="37" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="38" cy="37" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="54" cy="37" r="3" className="gs-illustration__dot-soft" />
                </svg>
            );
        case "checkbox":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="14" y="13" width="18" height="18" rx="4" className="gs-illustration__fill gs-illustration__pulse" />
                    <path d="M18 22 L22 26 L30 17" fill="none" stroke="var(--uds-surface-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="40" y="17" width="66" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <rect x="40" y="26" width="44" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "checkbox-group":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="6" y="5" width="12" height="12" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M9 11 L12 14 L18 7" fill="none" stroke="var(--uds-surface-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="22" y="8" width="56" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <rect x="6" y="20" width="12" height="12" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M9 26 L12 29 L18 22" fill="none" stroke="var(--uds-surface-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="22" y="23" width="44" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <rect x="6" y="34" width="12" height="8" rx="3" className="gs-illustration__stroke" />
                    <rect x="22" y="36" width="60" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "chip":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="13" width="44" height="18" rx="9" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="10" y="19" width="26" height="6" rx="3" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                    <rect x="54" y="13" width="56" height="18" rx="9" className="gs-illustration__stroke" />
                    <rect x="60" y="19" width="36" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <path d="M100 18 L106 26 M106 18 L100 26" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case "code":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="4" className="gs-illustration__stroke" />
                    <rect x="4" y="4" width="112" height="10" rx="4" className="gs-illustration__fill-soft" />
                    <path d="M14 20 L10 24 L14 28" fill="none" stroke="var(--uds-system-action-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 20 L26 24 L22 28" fill="none" stroke="var(--uds-system-action-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="32" y="20" width="44" height="4" rx="2" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="32" y="28" width="30" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="32" y="36" width="50" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "container":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="4" className="gs-illustration__stroke" />
                    <rect x="14" y="11" width="92" height="22" rx="3" className="gs-illustration__fill-soft gs-illustration__pulse-soft" />
                    <rect x="22" y="17" width="56" height="5" rx="2.5" className="gs-illustration__fill" />
                    <rect x="22" y="26" width="38" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "currency-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="112" height="24" rx="5" className="gs-illustration__stroke" />
                    <rect x="8" y="14" width="22" height="16" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="12" y="19" width="8" height="6" rx="2" className="gs-illustration__fill gs-illustration__pulse" />
                    <path d="M34 10 L34 34" stroke="var(--uds-border-primary)" strokeWidth="1" />
                    <rect x="40" y="19" width="48" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "date-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="112" height="24" rx="5" className="gs-illustration__stroke" />
                    <rect x="10" y="17" width="60" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="88" y="13" width="22" height="18" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M93 18 L105 18 M93 22 L105 22 M96 13 L96 16 M102 13 L102 16" fill="none" stroke="var(--uds-surface-primary)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case "date-range-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="12" width="48" height="20" rx="5" className="gs-illustration__stroke" />
                    <rect x="8" y="19" width="28" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <path d="M56 22 L64 22 M61 18 L65 22 L61 26" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="68" y="12" width="48" height="20" rx="5" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="72" y="19" width="28" height="6" rx="3" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                </svg>
            );
        case "datepicker":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="2" width="112" height="14" rx="4" className="gs-illustration__stroke" />
                    <rect x="8" y="5" width="40" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="98" y="3" width="14" height="12" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="4" y="18" width="112" height="24" rx="4" className="gs-illustration__stroke gs-illustration__pulse-soft" />
                    <rect x="8" y="22" width="18" height="5" rx="2.5" className="gs-illustration__fill" />
                    <circle cx="30" cy="33" r="3" className="gs-illustration__dot" />
                    <circle cx="44" cy="33" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="58" cy="33" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="72" cy="33" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="86" cy="33" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="100" cy="33" r="3" className="gs-illustration__dot-soft" />
                </svg>
            );
        case "description-list":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="5" width="36" height="6" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="46" y="5" width="70" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="4" y="18" width="30" height="6" rx="3" className="gs-illustration__fill" />
                    <rect x="46" y="18" width="54" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="4" y="31" width="36" height="6" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="46" y="31" width="62" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "dialog":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="4" className="gs-illustration__fill-soft" />
                    <rect x="16" y="7" width="88" height="30" rx="5" className="gs-illustration__stroke gs-illustration__pulse-soft" />
                    <rect x="22" y="13" width="50" height="6" rx="3" className="gs-illustration__fill" />
                    <path d="M16 23 H104" stroke="var(--uds-border-primary)" strokeWidth="1" />
                    <rect x="22" y="27" width="72" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <path d="M94 10 L100 16 M100 10 L94 16" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case "divider":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="6" y="8" width="108" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <path d="M6 22 L48 22" className="gs-illustration__line" />
                    <rect x="50" y="16" width="20" height="12" rx="4" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M72 22 L114 22" className="gs-illustration__line" />
                    <rect x="6" y="32" width="108" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "dot-status":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="18" cy="14" r="5" className="gs-illustration__dot gs-illustration__pulse" />
                    <rect x="30" y="11" width="54" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <circle cx="18" cy="30" r="5" className="gs-illustration__dot-soft" />
                    <rect x="30" y="27" width="40" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "dropdown":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="2" width="112" height="14" rx="4" className="gs-illustration__stroke" />
                    <rect x="8" y="6" width="52" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <path d="M106 7 L110 10 L114 7" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="4" y="18" width="112" height="24" rx="4" className="gs-illustration__stroke gs-illustration__pulse-soft" />
                    <rect x="8" y="22" width="104" height="7" rx="3" className="gs-illustration__fill" />
                    <rect x="8" y="32" width="78" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "empty-state":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="20" y="4" width="80" height="36" rx="6" className="gs-illustration__stroke" />
                    <path d="M60 15 L60 29 M53 22 L67 22" className="gs-illustration__line gs-illustration__pulse" />
                    <rect x="34" y="33" width="24" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "event-card":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="5" className="gs-illustration__stroke" />
                    <rect x="4" y="4" width="28" height="36" rx="5" className="gs-illustration__fill" />
                    <rect x="8" y="13" width="16" height="6" rx="2" fill="var(--uds-surface-primary)" fillOpacity="0.6" />
                    <rect x="8" y="23" width="16" height="4" rx="2" fill="var(--uds-surface-primary)" fillOpacity="0.4" />
                    <rect x="38" y="10" width="70" height="6" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="38" y="20" width="54" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="38" y="28" width="40" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "field":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="6" y="3" width="36" height="7" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="6" y="14" width="108" height="18" rx="5" className="gs-illustration__stroke" />
                    <rect x="12" y="20" width="56" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <rect x="6" y="36" width="62" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "file-upload":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="6" y="4" width="108" height="36" rx="5" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeDasharray="6 3" />
                    <path d="M60 28 L60 16 M54 22 L60 16 L66 22" className="gs-illustration__line gs-illustration__float" />
                    <rect x="44" y="31" width="32" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "flex":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="32" height="24" rx="4" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="44" y="10" width="32" height="24" rx="4" className="gs-illustration__fill-soft" />
                    <rect x="84" y="10" width="32" height="24" rx="4" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "image-aspect":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="12" y="4" width="96" height="36" rx="4" className="gs-illustration__stroke" />
                    <path d="M22 34 L44 14 L62 28 L76 18 L98 34 Z" className="gs-illustration__fill-soft" />
                    <circle cx="34" cy="16" r="5" className="gs-illustration__fill gs-illustration__pulse-soft" />
                </svg>
            );
        case "icon":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <path d="M60 6 L64 16 L75 17 L67 24 L69 35 L60 29 L51 35 L53 24 L45 17 L56 16 Z" className="gs-illustration__fill gs-illustration__pulse" />
                </svg>
            );
        case "key":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="8" y="8" width="30" height="28" rx="5" className="gs-illustration__fill-soft" />
                    <rect x="8" y="8" width="30" height="28" rx="5" className="gs-illustration__stroke" />
                    <rect x="44" y="10" width="22" height="10" rx="3" className="gs-illustration__fill-soft gs-illustration__pulse-soft" />
                    <rect x="44" y="24" width="18" height="10" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="70" y="10" width="16" height="10" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="70" y="24" width="22" height="10" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="90" y="10" width="22" height="10" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="16" y="20" width="14" height="8" rx="2" className="gs-illustration__fill gs-illustration__pulse" />
                </svg>
            );
        case "layout":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="4" className="gs-illustration__stroke" />
                    <rect x="4" y="4" width="26" height="36" rx="4" className="gs-illustration__fill-soft" />
                    <rect x="90" y="4" width="26" height="36" rx="4" className="gs-illustration__fill-soft" />
                    <rect x="36" y="8" width="48" height="6" rx="2" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="36" y="18" width="36" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="36" y="26" width="44" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "link":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="10" y="17" width="66" height="7" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M10 26 L76 26" className="gs-illustration__line" />
                    <path d="M80 22 L88 15" className="gs-illustration__line" />
                    <path d="M82 15 L88 15 L88 21" fill="none" stroke="var(--uds-system-action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "medallion":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="38" cy="22" r="16" className="gs-illustration__stroke" />
                    <circle cx="38" cy="22" r="10" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <circle cx="38" cy="22" r="4" className="gs-illustration__dot" />
                    <circle cx="82" cy="22" r="12" className="gs-illustration__stroke" />
                    <circle cx="82" cy="22" r="7" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "menu":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="4" className="gs-illustration__stroke" />
                    <rect x="8" y="8" width="104" height="10" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="8" y="21" width="104" height="8" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="8" y="32" width="104" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "micro-calendar":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="20" y="2" width="80" height="40" rx="4" className="gs-illustration__stroke" />
                    <rect x="20" y="2" width="80" height="12" rx="4" className="gs-illustration__fill-soft" />
                    <rect x="26" y="4" width="28" height="7" rx="2" className="gs-illustration__fill" />
                    <circle cx="34" cy="22" r="3" className="gs-illustration__dot gs-illustration__pulse" />
                    <circle cx="46" cy="22" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="58" cy="22" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="70" cy="22" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="82" cy="22" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="34" cy="33" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="46" cy="33" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="58" cy="33" r="3" className="gs-illustration__dot-soft" />
                </svg>
            );
        case "modal":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="4" className="gs-illustration__fill-soft" />
                    <rect x="16" y="7" width="88" height="30" rx="5" className="gs-illustration__stroke gs-illustration__pulse-soft" />
                    <rect x="22" y="12" width="44" height="6" rx="3" className="gs-illustration__fill" />
                    <path d="M16 22 L104 22" stroke="var(--uds-border-primary)" strokeWidth="1" />
                    <rect x="22" y="26" width="72" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <path d="M94 10 L100 16 M100 10 L94 16" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case "number-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="112" height="24" rx="5" className="gs-illustration__stroke" />
                    <rect x="8" y="14" width="20" height="16" rx="3" className="gs-illustration__fill-soft" />
                    <path d="M13 22 L23 22" className="gs-illustration__line" />
                    <rect x="36" y="17" width="48" height="10" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="92" y="14" width="20" height="16" rx="3" className="gs-illustration__fill-soft" />
                    <path d="M97 22 L107 22 M102 17 L102 27" className="gs-illustration__line" />
                </svg>
            );
        case "pagination":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="14" width="14" height="16" rx="3" className="gs-illustration__stroke" />
                    <rect x="24" y="14" width="14" height="16" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="44" y="14" width="14" height="16" rx="3" className="gs-illustration__fill gs-illustration__pulse" />
                    <rect x="64" y="14" width="14" height="16" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="84" y="14" width="14" height="16" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="102" y="14" width="14" height="16" rx="3" className="gs-illustration__stroke" />
                </svg>
            );
        case "password-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="112" height="24" rx="5" className="gs-illustration__stroke" />
                    <circle cx="18" cy="22" r="3" className="gs-illustration__dot" />
                    <circle cx="30" cy="22" r="3" className="gs-illustration__dot" />
                    <circle cx="42" cy="22" r="3" className="gs-illustration__dot" />
                    <circle cx="54" cy="22" r="3" className="gs-illustration__dot" />
                    <path d="M82 22 Q92 13 102 22 Q92 31 82 22 Z" className="gs-illustration__fill-soft gs-illustration__pulse-soft" />
                    <circle cx="92" cy="22" r="4" className="gs-illustration__fill" />
                    <circle cx="92" cy="22" r="2" fill="var(--uds-surface-primary)" />
                </svg>
            );
        case "phone-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="112" height="24" rx="5" className="gs-illustration__stroke" />
                    <rect x="8" y="14" width="26" height="16" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="10" y="17" width="10" height="10" rx="2" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M38 14 L38 34" stroke="var(--uds-border-primary)" strokeWidth="1" />
                    <rect x="44" y="19" width="52" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "progress-circle":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="60" cy="22" r="16" fill="none" className="gs-illustration__stroke" />
                    <circle cx="60" cy="22" r="16" fill="none" stroke="var(--uds-system-action-primary)" strokeWidth="3" strokeLinecap="round" strokeDasharray="65 36" strokeDashoffset="25" className="gs-illustration__pulse" />
                    <rect x="52" y="19" width="16" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "progress-indicator":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="6" y="18" width="108" height="8" rx="4" className="gs-illustration__stroke" />
                    <rect x="6" y="18" width="70" height="8" rx="4" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="22" y="8" width="20" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="64" y="30" width="20" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "radio":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="22" cy="22" r="9" className="gs-illustration__stroke" />
                    <circle cx="22" cy="22" r="5" className="gs-illustration__fill gs-illustration__pulse" />
                    <rect x="38" y="19" width="68" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "radio-group":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="16" cy="10" r="6" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <circle cx="16" cy="10" r="3" fill="var(--uds-surface-primary)" />
                    <rect x="26" y="7" width="56" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <circle cx="16" cy="24" r="6" className="gs-illustration__stroke" />
                    <rect x="26" y="21" width="42" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <circle cx="16" cy="38" r="6" className="gs-illustration__stroke" />
                    <rect x="26" y="35" width="50" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "search-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="112" height="24" rx="12" className="gs-illustration__stroke" />
                    <circle cx="22" cy="22" r="6" fill="none" stroke="var(--uds-system-action-primary)" strokeWidth="2" className="gs-illustration__pulse" />
                    <path d="M27 27 L32 32" stroke="var(--uds-system-action-primary)" strokeWidth="2" strokeLinecap="round" />
                    <rect x="38" y="19" width="60" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "scroll-view":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="108" height="36" rx="5" className="gs-illustration__stroke" />
                    <rect x="8" y="8" width="78" height="5" rx="2.5" className="gs-illustration__fill" />
                    <rect x="8" y="16" width="66" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="8" y="23" width="72" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="8" y="30" width="54" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="106" y="8" width="4" height="28" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="106" y="10" width="4" height="12" rx="2" className="gs-illustration__fill gs-illustration__slide" />
                </svg>
            );
        case "section-header":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="6" y="5" width="64" height="10" rx="4" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <path d="M6 20 L114 20" className="gs-illustration__line" />
                    <rect x="6" y="27" width="84" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <rect x="6" y="36" width="58" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "selectable-card":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="52" height="36" rx="5" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <circle cx="48" cy="10" r="7" fill="var(--uds-system-action-primary)" />
                    <path d="M44 10 L47 13 L53 7" fill="none" stroke="var(--uds-surface-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="10" y="23" width="34" height="4" rx="2" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                    <rect x="64" y="4" width="52" height="36" rx="5" className="gs-illustration__stroke" />
                    <rect x="70" y="14" width="34" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="70" y="24" width="24" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "slider":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="8" y="20" width="104" height="4" rx="2" className="gs-illustration__stroke" />
                    <rect x="8" y="20" width="62" height="4" rx="2" className="gs-illustration__fill" />
                    <circle cx="70" cy="22" r="8" fill="var(--uds-surface-primary)" stroke="var(--uds-system-action-primary)" strokeWidth="2" className="gs-illustration__pulse" />
                </svg>
            );
        case "status":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="18" cy="13" r="5" className="gs-illustration__dot gs-illustration__pulse" />
                    <rect x="28" y="10" width="52" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <circle cx="18" cy="29" r="5" className="gs-illustration__dot-soft" />
                    <rect x="28" y="26" width="40" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "statistics":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="22" y="6" width="76" height="18" rx="4" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="32" y="10" width="56" height="10" rx="3" fill="var(--uds-surface-primary)" fillOpacity="0.4" />
                    <rect x="28" y="29" width="64" height="7" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "steps":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <circle cx="20" cy="22" r="8" className="gs-illustration__fill gs-illustration__pulse" />
                    <rect x="17" y="19" width="6" height="6" rx="1" fill="var(--uds-surface-primary)" />
                    <path d="M28 22 L52 22" className="gs-illustration__line" />
                    <circle cx="60" cy="22" r="8" className="gs-illustration__fill" />
                    <rect x="57" y="19" width="6" height="6" rx="1" fill="var(--uds-surface-primary)" />
                    <path d="M68 22 L92 22" className="gs-illustration__line" />
                    <circle cx="100" cy="22" r="8" className="gs-illustration__stroke" />
                </svg>
            );
        case "tabs":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="34" height="14" rx="4" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="42" y="4" width="34" height="14" rx="4" className="gs-illustration__fill-soft" />
                    <rect x="80" y="4" width="34" height="14" rx="4" className="gs-illustration__fill-soft" />
                    <path d="M4 18 L38 18" stroke="var(--uds-system-action-primary)" strokeWidth="2" />
                    <rect x="4" y="20" width="112" height="20" rx="4" className="gs-illustration__stroke" />
                    <rect x="10" y="25" width="66" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="10" y="33" width="46" height="4" rx="2" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "tag":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="13" width="50" height="18" rx="9" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="10" y="19" width="32" height="6" rx="3" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                    <rect x="60" y="13" width="42" height="18" rx="9" className="gs-illustration__stroke" />
                    <rect x="66" y="19" width="26" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "table":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="4" className="gs-illustration__stroke" />
                    <rect x="4" y="4" width="112" height="10" rx="4" className="gs-illustration__fill" />
                    <path d="M42 4 L42 40 M80 4 L80 40" stroke="var(--uds-border-primary)" strokeWidth="0.75" />
                    <path d="M4 22 L116 22 M4 31 L116 31" stroke="var(--uds-border-primary)" strokeWidth="0.75" />
                    <rect x="8" y="6" width="26" height="5" rx="1.5" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                    <rect x="46" y="6" width="22" height="5" rx="1.5" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                    <rect x="84" y="6" width="24" height="5" rx="1.5" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                    <rect x="8" y="15" width="20" height="4" rx="1.5" className="gs-illustration__fill-soft" />
                    <rect x="46" y="15" width="28" height="4" rx="1.5" className="gs-illustration__fill-soft" />
                    <rect x="84" y="15" width="22" height="4" rx="1.5" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "text":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="6" y="5" width="92" height="8" rx="3" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="6" y="17" width="108" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <rect x="6" y="25" width="98" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                    <rect x="6" y="33" width="64" height="5" rx="2.5" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "text-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="112" height="24" rx="5" className="gs-illustration__stroke" />
                    <rect x="12" y="18" width="50" height="8" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="64" y="17" width="2" height="10" rx="1" className="gs-illustration__dot gs-illustration__pulse" />
                </svg>
            );
        case "textarea":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="4" width="112" height="36" rx="5" className="gs-illustration__stroke" />
                    <rect x="10" y="10" width="70" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="10" y="18" width="84" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="10" y="26" width="60" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <rect x="10" y="34" width="2" height="4" rx="1" className="gs-illustration__dot gs-illustration__pulse" />
                    <path d="M108 30 L116 38 M112 34 L116 38 L116 30" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case "theme":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <path d="M60 6 A16 16 0 0 1 60 38 Z" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <circle cx="60" cy="22" r="16" fill="none" className="gs-illustration__stroke" />
                    <path d="M60 4 L60 8 M60 36 L60 40 M76 22 L80 22 M40 22 L44 22 M72 10 L75 7 M45 37 L48 34 M72 34 L75 37 M45 7 L48 10" fill="none" stroke="var(--uds-system-action-primary)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="94" cy="14" r="2" className="gs-illustration__dot-soft" />
                    <circle cx="104" cy="22" r="3" className="gs-illustration__dot-soft" />
                    <circle cx="92" cy="30" r="2" className="gs-illustration__dot-soft" />
                </svg>
            );
        case "token-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="8" width="112" height="28" rx="5" className="gs-illustration__stroke" />
                    <rect x="8" y="13" width="32" height="18" rx="9" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="12" y="19" width="18" height="6" rx="3" fill="var(--uds-surface-primary)" fillOpacity="0.5" />
                    <rect x="46" y="13" width="38" height="18" rx="9" className="gs-illustration__fill-soft" />
                    <rect x="50" y="19" width="24" height="6" rx="3" className="gs-illustration__fill-soft" />
                    <rect x="88" y="17" width="2" height="10" rx="1" className="gs-illustration__dot gs-illustration__pulse" />
                </svg>
            );
        case "time-input":
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="10" width="112" height="24" rx="5" className="gs-illustration__stroke" />
                    <circle cx="22" cy="22" r="9" fill="none" stroke="var(--uds-border-primary)" strokeWidth="1.5" className="gs-illustration__pulse-soft" />
                    <path d="M22 14 L22 22 L27 22" fill="none" stroke="var(--uds-system-action-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="40" y="19" width="60" height="6" rx="3" className="gs-illustration__fill-soft" />
                </svg>
            );
        case "toolbar":
            return (
                <img
                    src={toolbarThumbnail}
                    alt={`${label} thumbnail`}
                />
            );
        case "toast":
            return (
                <img
                    src={toastThumbnail}
                    alt={`${label} thumbnail`}
                />
            );
        case "toggle":
            return (
                <img
                    src={toggleThumbnail}
                    alt={`${label} thumbnail`}
                />
            );
        case "tooltip":
            return (
                <img
                    src={tooltipThumbnail}
                    alt={`${label} thumbnail`}
                />
            );
        case "url-input":
            return (
                <img
                    src={urlInputThumbnail}
                    alt={`${label} thumbnail`}
                />
            );
        default:
            return (
                <svg {...p}>
                    <title>{label}</title>
                    <rect x="4" y="8" width="112" height="28" rx="8" className="gs-illustration__stroke" />
                    <rect x="12" y="16" width="36" height="4" rx="2" className="gs-illustration__fill gs-illustration__pulse-soft" />
                    <rect x="12" y="24" width="56" height="4" rx="2" className="gs-illustration__fill-soft" />
                    <circle cx="94" cy="22" r="8" className="gs-illustration__dot gs-illustration__pulse" />
                </svg>
            );
    }
}

export function GettingStartedPage() {
    const navigate = useNavigate();

    return (
        <DocPageLayout
            title="Overview"
            description="Use this workspace to explore the Unified Design System, validate component behavior, and build consistent UI patterns."
        >

            <Layout direction="column" gap="12">
                <Layout alignItems="center" justifyContent="space-between" wrap gap="8">
                    <Text as="h2" variant="heading-24" weight="semibold" leading="regular">
                        Component Library
                    </Text>
                    <Text as="p" variant="body-14" leading="regular">
                        {COMPONENT_DEMOS.length} components
                    </Text>
                </Layout>
                <div className="getting-started__component-grid">
                    {COMPONENT_DEMOS.map((component, index) => (
                        <button
                            key={component.slug}
                            type="button"
                            className="getting-started__component-card"
                            onClick={() => navigate(`/components/${component.slug}`)}
                            style={{ animationDelay: `${(index % 10) * 35}ms` } as CSSProperties}
                        >
                            <div className="getting-started__component-thumbnail">
                                <ComponentCardIllustration slug={component.slug} label={component.label} />
                            </div>
                            <Layout direction="column" gap="0">
                                <Text as="span" variant="heading-20" weight="semibold" leading="tight">
                                    {component.label}
                                </Text>
                                <Text as="span" variant="body-16" leading="regular">
                                    {getComponentDescription(component.label, component.kind)}
                                </Text>
                            </Layout>
                        </button>
                    ))}
                </div>
            </Layout>
        </DocPageLayout>
    );
}
