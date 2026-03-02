import { useState } from "react";
import { Divider, Flex, Text, Toggle } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TOGGLE_PROPS: ComponentPropRow[] = [
    { prop: "checked", type: "boolean", defaultValue: "false", description: "Checked state for controlled usage." },
    { prop: "state", type: '"off" | "on" | "indeterminate"', defaultValue: "-", description: "Visual state override." },
    { prop: "size", type: '"large" | "small"', defaultValue: '"large"', description: "Size variant." },
    { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." },
    { prop: "onChange", type: "(checked: boolean) => void", defaultValue: "-", description: "Called when checked state changes." },
    { prop: "id", type: "string", defaultValue: "-", description: "Optional id for htmlFor linkage." },
];

export function ToggleDemoPage() {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);

    return (
        <DocPageLayout
            title="Toggle"
            description="Toggle is used for immediate on/off preferences and feature states."
        >
            <Flex direction="column" gap="24">
                <Text as="h2" variant="heading-24" weight="bold" leading="regular">
                    Settings
                </Text>
                <Flex alignItems="center" gap="24">
                    <Toggle checked={notifications} onChange={setNotifications} />
                    <Text as="span" variant="body-16" leading="regular">
                        Email notifications
                    </Text>
                </Flex>
                <Flex alignItems="center" gap="12">
                    <Toggle checked={marketing} onChange={setMarketing} />
                    <Text as="span" variant="body-16" leading="regular">
                        Marketing updates
                    </Text>
                </Flex>
            </Flex>
            <Divider variant="solid" />

            <Flex direction="column" gap="16">
                <Text as="h2" variant="heading-24" weight="bold" leading="regular">
                    Size Variants
                </Text>
                <Flex alignItems="center" gap="24">
                    <Flex alignItems="center" gap="8">
                        <Toggle checked size="large" />
                        <Text as="span" variant="body-14" leading="regular">
                            Large
                        </Text>
                    </Flex>
                    <Flex alignItems="center" gap="8">
                        <Toggle checked size="small" />
                        <Text as="span" variant="body-14" leading="regular">
                            Small
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Divider variant="solid" />

            <Flex direction="column" gap="16">
                <Text as="h2" variant="heading-24" weight="bold" leading="regular">
                    State Variants
                </Text>
                <Flex alignItems="center" gap="24" wrap>
                    <Flex alignItems="center" gap="8">
                        <Toggle state="off" />
                        <Text as="span" variant="body-14" leading="regular">
                            Off
                        </Text>
                    </Flex>
                    <Flex alignItems="center" gap="8">
                        <Toggle state="on" />
                        <Text as="span" variant="body-14" leading="regular">
                            On
                        </Text>
                    </Flex>
                    <Flex alignItems="center" gap="8">
                        <Toggle state="indeterminate" />
                        <Text as="span" variant="body-14" leading="regular">
                            Indeterminate
                        </Text>
                    </Flex>
                    <Flex alignItems="center" gap="8">
                        <Toggle checked disabled />
                        <Text as="span" variant="body-14" leading="regular">
                            On Disabled
                        </Text>
                    </Flex>
                    <Flex alignItems="center" gap="8">
                        <Toggle state="indeterminate" disabled />
                        <Text as="span" variant="body-14" leading="regular">
                            Indeterminate Disabled
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Divider variant="solid" />

            <ComponentPropsTable rows={TOGGLE_PROPS} />
        </DocPageLayout>
    );
}
