import { useEffect, useMemo, useState } from "react";
import { Button } from "../../design-system/components/Button";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Table } from "../../design-system/components/Table";
import { Text } from "../../design-system/components/Text";
import { colorTokens } from "../../design-system/tokens/runtime/color";
import { DocPageLayout } from "./DocPageLayout";

type AccentFamily = keyof typeof colorTokens.accent;
type BrandFamily = keyof typeof colorTokens.brand;

const ACCENT_FAMILIES: AccentFamily[] = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "aqua",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "magenta",
    "rose",
];
const ACCENT_TONE_ORDER = Object.keys(colorTokens.accent[ACCENT_FAMILIES[0]]) as Array<keyof (typeof colorTokens.accent)[AccentFamily]>;
const BRAND_FAMILIES: BrandFamily[] = ["primary", "secondary", "tertiary", "quaternary"];
const BRAND_TONE_ORDER = Object.keys(colorTokens.brand.primary) as Array<keyof (typeof colorTokens.brand)[BrandFamily]>;

const ACCENT_COLUMNS = [
    { key: "preview", label: "Preview" },
    { key: "colorName", label: "Color name" },
    { key: "token", label: "Token" },
    { key: "value", label: "Value" },
];

const toTitleCase = (value: string): string =>
    value.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const readCssVarValue = (tokenName: string): string => {
    if (typeof window === "undefined") return "";
    return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
};

export function FoundationsPage() {
    const [activeBrandFamily, setActiveBrandFamily] = useState<BrandFamily>("primary");
    const [activeAccentFamily, setActiveAccentFamily] = useState<AccentFamily>(ACCENT_FAMILIES[0]);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [cssVarVersion, setCssVarVersion] = useState(0);

    const copyToClipboard = async (value: string, key: string) => {
        if (typeof window === "undefined") return;

        try {
            if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(value);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = value;
                textArea.setAttribute("readonly", "");
                textArea.style.position = "absolute";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopiedKey(key);
            window.setTimeout(() => {
                setCopiedKey((current) => (current === key ? null : current));
            }, 1200);
        } catch {
            setCopiedKey(null);
        }
    };

    const renderCopyCell = (displayValue: string, copyValue: string, key: string, label: string) => (
        <Layout alignItems="center" gap="8">
            <Text as="span" variant="body-14" leading="regular">
                {displayValue}
            </Text>
            <Button
                appearance="ghost"
                size="xsmall"
                layout="icon-only"
                icon={copiedKey === key ? "Check" : "Copy"}
                label={copiedKey === key ? `Copied ${label}` : `Copy ${label}`}
                aria-label={copiedKey === key ? `${toTitleCase(label)} copied` : `Copy ${label} ${copyValue}`}
                onClick={() => {
                    void copyToClipboard(copyValue, key);
                }}
            />
        </Layout>
    );

    const buildColorRow = (colorName: string, tokenValue: string, resolvedValue: string, keyPrefix: string) => ({
        preview: (
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--uds-radius-8)",
                    border: "1px solid var(--uds-border-primary)",
                    backgroundColor: resolvedValue,
                }}
            />
        ),
        colorName,
        token: renderCopyCell(tokenValue, tokenValue, `${keyPrefix}-token`, "token"),
        value: renderCopyCell(resolvedValue, resolvedValue, `${keyPrefix}-value`, "hex value"),
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const root = document.documentElement;
        const observer = new MutationObserver((mutations) => {
            const hasClassChange = mutations.some(
                (mutation) =>
                    mutation.type === "attributes" &&
                    (mutation.attributeName === "class" || mutation.attributeName === "data-brand")
            );
            if (hasClassChange) {
                setCssVarVersion((value) => value + 1);
            }
        });

        observer.observe(root, {
            attributes: true,
            attributeFilter: ["class", "data-brand"],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const systemRows = useMemo(
        () =>
            Object.entries(colorTokens.system).map(([name, value]) =>
                buildColorRow(toTitleCase(name), `--system-color-${name}`, value, `system-${name}`)
            ),
        [copiedKey]
    );

    const neutralRows = useMemo(
        () =>
            Object.entries(colorTokens.neutrals).map(([tone, value]) =>
                buildColorRow(`Neutrals ${tone}`, `--system-color-neutrals-${tone}`, value, `neutrals-${tone}`)
            ),
        [copiedKey]
    );

    const brandRows = useMemo(() => {
        return BRAND_TONE_ORDER.map((tone) => {
            const tokenValue = `--uds-color-${activeBrandFamily}-${tone}`;
            const resolvedValue = readCssVarValue(tokenValue);
            return buildColorRow(
                `${toTitleCase(activeBrandFamily)} ${tone}`,
                tokenValue,
                resolvedValue,
                `${activeBrandFamily}-${tone}`
            );
        });
    }, [activeBrandFamily, copiedKey, cssVarVersion]);

    const accentRows = useMemo(() => {
        const scale = colorTokens.accent[activeAccentFamily];

        return ACCENT_TONE_ORDER.map((tone) => {
            const value = scale[tone];
            const tokenValue = `--system-color-accent-${activeAccentFamily}-${tone}`;
            return buildColorRow(
                `${toTitleCase(activeAccentFamily)} ${tone}`,
                tokenValue,
                value,
                `${activeAccentFamily}-${tone}`
            );
        });
    }, [activeAccentFamily, copiedKey]);

    return (
        <DocPageLayout
            title="Colors"
            description="Color scales used as the visual foundation of the design system."
        >
            <Layout direction="column" gap="24">
                <Text as="h2" variant="heading-24" weight="bold" leading="regular">
                    Colors
                </Text>

                <Layout direction="column" gap="12">
                    <Text as="h3" variant="heading-24" weight="medium" leading="regular">
                        System Colors
                    </Text>
                    <Table columns={ACCENT_COLUMNS} data={systemRows} />
                </Layout>
                <Divider variant="solid" />

                <Layout direction="column" gap="12">
                    <Text as="h3" variant="heading-24" weight="medium" leading="regular">
                        Neutral Scale
                    </Text>
                    <Table columns={ACCENT_COLUMNS} data={neutralRows} />
                </Layout>
                <Divider variant="solid" />

                <Layout direction="column" gap="24">
                    <Layout direction="column" gap="0">
                    <Text as="h3" variant="heading-24" weight="medium" leading="regular">
                        Brand Scale Explorer
                    </Text>
                    <Text as="p" variant="body-14" leading="regular" tone="secondary">
                        Select a 500-tone brand swatch to view all tones for that family. Values reflect the active brand.
                    </Text>
                    </Layout>

                    <Layout wrap gap="8">
                        {BRAND_FAMILIES.map((family) => {
                            const isActive = family === activeBrandFamily;
                            return (
                                <button
                                    key={family}
                                    type="button"
                                    onClick={() => setActiveBrandFamily(family)}
                                    aria-pressed={isActive}
                                    aria-label={`${toTitleCase(family)} brand scale`}
                                    title={`${toTitleCase(family)} 500`}
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "999px",
                                        cursor: "pointer",
                                        border: isActive
                                            ? "2px solid var(--uds-border-interactive)"
                                            : "1px solid var(--uds-border-primary)",
                                        boxShadow: isActive ? "0 0 0 2px var(--uds-border-interactive-subtle)" : "none",
                                        backgroundColor: readCssVarValue(`--uds-color-${family}-500`),
                                    }}
                                />
                            );
                        })}
                    </Layout>

                    <Table columns={ACCENT_COLUMNS} data={brandRows} />
                </Layout>

                <Divider variant="solid" />

                <Layout direction="column" gap="24">
                    <Layout direction="column" gap="0">
                        <Text as="h3" variant="heading-24" weight="medium" leading="regular">
                            Accent Scale Explorer
                        </Text>
                        <Text as="p" variant="body-14" leading="regular" tone="secondary">
                            Select a 500-tone swatch to view all tones for that accent family.
                        </Text>
                    </Layout>

                    <Layout wrap gap="8">
                        {ACCENT_FAMILIES.map((family) => {
                            const isActive = family === activeAccentFamily;
                            return (
                                <button
                                    key={family}
                                    type="button"
                                    onClick={() => setActiveAccentFamily(family)}
                                    aria-pressed={isActive}
                                    aria-label={`${toTitleCase(family)} accent scale`}
                                    title={`${toTitleCase(family)} 500`}
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "999px",
                                        cursor: "pointer",
                                        border: isActive
                                            ? "2px solid var(--uds-border-interactive)"
                                            : "1px solid var(--uds-border-primary)",
                                        boxShadow: isActive ? "0 0 0 2px var(--uds-border-interactive-subtle)" : "none",
                                        backgroundColor: colorTokens.accent[family]["500"],
                                    }}
                                />
                            );
                        })}
                    </Layout>

                    <Table columns={ACCENT_COLUMNS} data={accentRows} />
                </Layout>

            </Layout>
        </DocPageLayout>
    );
}
