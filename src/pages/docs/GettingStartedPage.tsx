import { useNavigate } from "react-router-dom";
import { Button, Flex, Text } from "../../design-system";
import { DocPageLayout } from "./DocPageLayout";

const QUICK_STEPS = [
    "Choose a brand and theme from the left menu.",
    "Browse component demos to understand available variants and states.",
    "Use semantic design tokens for spacing, color, and typography decisions.",
];

export function GettingStartedPage() {
    const navigate = useNavigate();

    return (
        <DocPageLayout
            title="Overview"
            description="Use this workspace to explore the Unified Design System, validate component behavior, and build consistent UI patterns."
        >
            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Quick Start
                </Text>
                <Flex as="ol" direction="column" gap="8">
                    {QUICK_STEPS.map((step) => (
                        <Text as="li" key={step} variant="body-16" leading="regular">
                            {step}
                        </Text>
                    ))}
                </Flex>
            </Flex>

            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Jump To
                </Text>
                <Flex alignItems="center" gap="12" wrap>
                    <Button
                        label="View Button Demo"
                        icon="ArrowRight"
                        layout="icon-right"
                        onClick={() => navigate("/components/button")}
                    />
                    <Button
                        appearance="soft"
                        label="View Text Demo"
                        icon="ArrowRight"
                        layout="icon-right"
                        onClick={() => navigate("/components/text")}
                    />
                </Flex>
            </Flex>

            <Flex direction="column" gap="12">
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    Foundations Docs
                </Text>
                <Flex alignItems="center" gap="12" wrap>
                    <Button
                        appearance="outline"
                        label="Design Tokens"
                        icon="ArrowRight"
                        layout="icon-right"
                        onClick={() => navigate("/docs/tokens")}
                    />
                    <Button
                        appearance="outline"
                        label="Theming"
                        icon="ArrowRight"
                        layout="icon-right"
                        onClick={() => navigate("/docs/theming")}
                    />
                    <Button
                        appearance="outline"
                        label="Layout Conventions"
                        icon="ArrowRight"
                        layout="icon-right"
                        onClick={() => navigate("/docs/layout-conventions")}
                    />
                </Flex>
            </Flex>
        </DocPageLayout>
    );
}
