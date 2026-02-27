import { Flex, Text } from "../../design-system";
import { DocPageLayout } from "./DocPageLayout";

const TOKEN_GUIDANCE = [
    "Use semantic tokens in components (for example: var(--uds-text-primary), var(--uds-surface-primary), and var(--uds-border-primary)).",
    "Avoid raw values in component styles. Prefer spacing, radius, and typography from the token scale.",
    "Treat token updates as design system changes, not one-off component overrides.",
];

const COMMON_TOKEN_FAMILIES = [
    "Color: --uds-text-*, --uds-surface-*, --uds-border-*",
    "Spacing: --uds-spacing-*",
    "Typography: --uds-font-size-*, --uds-font-weight-*, --uds-line-*",
    "Radius and border: --uds-radius-*, --uds-border-width-*",
];

export function DesignTokensPage() {
    return (
        <DocPageLayout
            title="Design Tokens"
            description="Design tokens keep visual decisions consistent across brands and themes."
        >
            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Core Guidance
                </Text>
                <Flex as="ul" direction="column" gap="8">
                    {TOKEN_GUIDANCE.map((item) => (
                        <Text as="li" key={item} variant="body-16" leading="regular">
                            {item}
                        </Text>
                    ))}
                </Flex>
            </Flex>

            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Common Token Families
                </Text>
                <Flex as="ul" direction="column" gap="8">
                    {COMMON_TOKEN_FAMILIES.map((item) => (
                        <Text as="li" key={item} variant="body-16" leading="regular">
                            {item}
                        </Text>
                    ))}
                </Flex>
            </Flex>
        </DocPageLayout>
    );
}
