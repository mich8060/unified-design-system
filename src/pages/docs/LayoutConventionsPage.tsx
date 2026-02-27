import { Flex, Text } from "../../design-system";
import { DocPageLayout } from "./DocPageLayout";

const LAYOUT_RULES = [
    "Use `AppShell` regions (`Menu`, `Content`, and `Main`) for application-level structure.",
    "Use the `Flex` component for layout composition instead of custom wrappers.",
    "Keep spacing aligned to the token scale to preserve rhythm across pages.",
];

const PAGE_PATTERN = [
    "Page header: clear title + short intent description",
    "Content sections: grouped by user task or component behavior",
    "Examples first, then reference details",
];

export function LayoutConventionsPage() {
    return (
        <DocPageLayout
            title="Layout Conventions"
            description="Layout conventions keep documentation and demo pages predictable and easy to scan."
        >
            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Rules
                </Text>
                <Flex as="ul" direction="column" gap="8">
                    {LAYOUT_RULES.map((item) => (
                        <Text as="li" key={item} variant="body-16" leading="regular">
                            {item}
                        </Text>
                    ))}
                </Flex>
            </Flex>

            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Recommended Page Pattern
                </Text>
                <Flex as="ul" direction="column" gap="8">
                    {PAGE_PATTERN.map((item) => (
                        <Text as="li" key={item} variant="body-16" leading="regular">
                            {item}
                        </Text>
                    ))}
                </Flex>
            </Flex>
        </DocPageLayout>
    );
}
