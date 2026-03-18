import { Badge } from "../../design-system/components/Badge";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const BADGE_COLORS = [
    "blue",
    "cyan",
    "green",
    "magenta",
    "indigo",
    "rose",
    "neutral",
    "orange",
    "purple",
    "red",
    "sky",
    "yellow",
    "inverse",
    "lime",
] as const;

const BADGE_PROPS: ComponentPropRow[] = [
    { prop: "count", type: "number | string", defaultValue: "-", description: "Value displayed in the badge (hidden when 0/falsy)." },
    {
        prop: "variant",
        type: BADGE_COLORS.map((color) => `"${color}"`).join(" | "),
        defaultValue: '"red"',
        description: "Badge color variant.",
    },
    {
        prop: "appearance",
        type: '"solid" | "outlined"',
        defaultValue: '"solid"',
        description: "Visual style of the badge.",
    },
    {
        prop: "rounded",
        type: "boolean",
        defaultValue: "true",
        description: "Whether the badge uses pill corners (`true`) or square corners (`false`).",
    },
    { prop: "maxCount", type: "number", defaultValue: "99", description: "Maximum displayed number before showing `maxCount+`." },
    { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on badge root." },
];

export function BadgeDemoPage() {
    return (
        <DocPageLayout
            title="Badge"
            description="Badge displays concise counts and status indicators with color, appearance, and shape variants."
        >
            <Layout direction="column" gap="48" fullWidth>
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Color Variants (Solid, Rounded)
                </Text>
                <Layout direction="row" gap="12" fullWidth>
                    <Layout direction="column" gap="24">
                        <Text as="p" variant="body-18" weight="semibold" leading="regular">
                            Rounded Solid Variants
                        </Text>
                        <Layout direction="column"gap="12" wrap>
                            {BADGE_COLORS.map((variant) => (
                                <Layout key={variant} alignItems="center" gap="8">
                                    <Badge count={8} variant={variant} appearance="solid" rounded />
                                    <Text as="span" variant="body-12" leading="regular">
                                        {variant}
                                    </Text>
                                </Layout>
                            ))}
                        </Layout>
                    </Layout>
                    <Layout direction="column" gap="24">
                        <Text as="p" variant="body-18" weight="semibold" leading="regular">
                            Rounded Outline Variants
                        </Text>
                        <Layout direction="column" gap="12" wrap>
                            {BADGE_COLORS.map((variant) => (
                                <Layout key={variant} alignItems="center" gap="8">
                                    <Badge count={8} variant={variant} appearance="outlined" rounded />
                                    <Text as="span" variant="body-12" leading="regular">
                                        {variant}
                                    </Text>
                                </Layout>
                            ))}
                        </Layout>
                    </Layout>
                    <Layout direction="column" gap="24">
                        <Text as="p" variant="body-18" weight="semibold" leading="regular">
                        Square Solid Variants
                        </Text>
                        <Layout direction="column" gap="12" wrap>
                            {BADGE_COLORS.map((variant) => (
                                <Layout key={variant} alignItems="center" gap="8">
                                    <Badge count={8} variant={variant} appearance="solid" rounded={false} />
                                    <Text as="span" variant="body-12" leading="regular">
                                        {variant}
                                    </Text>
                                </Layout>
                            ))}
                        </Layout>
                    </Layout>
                    <Layout direction="column" gap="24">
                        <Text as="p" variant="body-18" weight="semibold" leading="regular">
                        Square Outline Variants
                        </Text>
                        <Layout direction="column" gap="12" wrap>
                            {BADGE_COLORS.map((variant) => (
                                <Layout key={variant} alignItems="center" gap="8">
                                    <Badge count={8} variant={variant} appearance="outlined" rounded={false} />
                                    <Text as="span" variant="body-12" leading="regular">
                                        {variant}
                                    </Text>
                                </Layout>
                            ))}
                        </Layout>
                    </Layout>
                </Layout>
                <Divider variant="solid" />

                <Layout direction="column" gap="12">
                    <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                        Appearance Variants
                    </Text>
                    <Layout alignItems="center" gap="16" wrap>
                        <Layout alignItems="center" gap="8">
                            <Badge count={12} variant="blue" appearance="solid" rounded />
                            <Text as="span" variant="body-12" leading="regular">
                                solid
                            </Text>
                        </Layout>
                        <Layout alignItems="center" gap="8">
                            <Badge count={12} variant="blue" appearance="outlined" rounded />
                            <Text as="span" variant="body-12" leading="regular">
                                outlined
                            </Text>
                        </Layout>
                    </Layout>
                </Layout>
                <Divider variant="solid" />

                <Layout direction="column" gap="12">
                    <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                        Shape Variants
                    </Text>
                    <Layout alignItems="center" gap="16" wrap>
                        <Layout alignItems="center" gap="8">
                            <Badge count={42} variant="magenta" appearance="solid" rounded />
                            <Text as="span" variant="body-12" leading="regular">
                                rounded
                            </Text>
                        </Layout>
                        <Layout alignItems="center" gap="8">
                            <Badge count={42} variant="magenta" appearance="solid" rounded={false} />
                            <Text as="span" variant="body-12" leading="regular">
                                square
                            </Text>
                        </Layout>
                    </Layout>
                </Layout>
                <Divider variant="solid" />

                <Layout direction="column" gap="12">
                    <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                        Count Formatting
                    </Text>
                    <Layout alignItems="center" gap="16" wrap>
                        <Layout alignItems="center" gap="8">
                            <Badge count={8} />
                            <Text as="span" variant="body-12" leading="regular">
                                8
                            </Text>
                        </Layout>
                        <Layout alignItems="center" gap="8">
                            <Badge count={128} maxCount={99} />
                            <Text as="span" variant="body-12" leading="regular">
                                99+
                            </Text>
                        </Layout>
                        <Layout alignItems="center" gap="8">
                            <Badge count={0} />
                            <Text as="span" variant="body-12" leading="regular">
                                hidden when 0
                            </Text>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>

            <Divider variant="solid" />
            <ComponentPropsTable rows={BADGE_PROPS} />
        </DocPageLayout>
    );
}
