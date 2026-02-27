import { Flex, Text } from "../../design-system";
import { DocPageLayout } from "./DocPageLayout";

export function SampleItemPage() {
    return (
        <DocPageLayout
            title="Sample Item"
            description="This is a standalone sample page that is not grouped under the Getting Started or Components sections."
        >
            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Standalone Navigation Item
                </Text>
                <Text as="p" variant="body-16" leading="regular">
                    Use this page for custom documentation or ad-hoc content that should live at the top level of the menu.
                </Text>
            </Flex>
        </DocPageLayout>
    );
}
