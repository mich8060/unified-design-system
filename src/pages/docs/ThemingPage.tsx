import { Flex, Text } from "../../design-system";
import { DocPageLayout } from "./DocPageLayout";

const THEMING_NOTES = [
    "Theme is controlled at the app shell level with light and dark modes.",
    "Brand and theme classes are applied at the root so components remain brand-agnostic.",
    "When creating new UI, validate both light and dark to ensure accessible contrast.",
];

const VALIDATION_CHECKLIST = [
    "Text readability on primary and secondary surfaces",
    "Interactive states (hover, focus, disabled) in both themes",
    "Borders, separators, and elevation contrast",
];

export function ThemingPage() {
    return (
        <DocPageLayout
            title="Theming"
            description="Theming lets the same components adapt to light/dark presentation while preserving behavior."
        >
            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    How It Works
                </Text>
                <Flex as="ul" direction="column" gap="8">
                    {THEMING_NOTES.map((item) => (
                        <Text as="li" key={item} variant="body-16" leading="regular">
                            {item}
                        </Text>
                    ))}
                </Flex>
            </Flex>

            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Validation Checklist
                </Text>
                <Flex as="ul" direction="column" gap="8">
                    {VALIDATION_CHECKLIST.map((item) => (
                        <Text as="li" key={item} variant="body-16" leading="regular">
                            {item}
                        </Text>
                    ))}
                </Flex>
            </Flex>
        </DocPageLayout>
    );
}
