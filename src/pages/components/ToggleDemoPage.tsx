import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { Toggle } from "../../design-system/components/Toggle";
import { useState } from "react";
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
            <Layout direction="column" gap="24">
                <Text as="h2" variant="heading-24" weight="bold" leading="regular">
                    Settings
                </Text>
                <Layout alignItems="center" gap="24">
                    <Toggle checked={notifications} onChange={setNotifications} />
                    <Text as="span" variant="body-16" leading="regular">
                        Email notifications
                    </Text>
                </Layout>
                <Layout alignItems="center" gap="12">
                    <Toggle checked={marketing} onChange={setMarketing} />
                    <Text as="span" variant="body-16" leading="regular">
                        Marketing updates
                    </Text>
                </Layout>
            </Layout>
            <Divider variant="solid" />

            <Layout direction="column" gap="16">
                <Text as="h2" variant="heading-24" weight="bold" leading="regular">
                    Size Variants
                </Text>
                <Layout alignItems="center" gap="24">
                    <Layout alignItems="center" gap="8">
                        <Toggle checked size="large" />
                        <Text as="span" variant="body-14" leading="regular">
                            Large
                        </Text>
                    </Layout>
                    <Layout alignItems="center" gap="8">
                        <Toggle checked size="small" />
                        <Text as="span" variant="body-14" leading="regular">
                            Small
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
            <Divider variant="solid" />

            <Layout direction="column" gap="16">
                <Text as="h2" variant="heading-24" weight="bold" leading="regular">
                    State Variants
                </Text>
                <Layout alignItems="center" gap="24" wrap>
                    <Layout alignItems="center" gap="8">
                        <Toggle state="off" />
                        <Text as="span" variant="body-14" leading="regular">
                            Off
                        </Text>
                    </Layout>
                    <Layout alignItems="center" gap="8">
                        <Toggle state="on" />
                        <Text as="span" variant="body-14" leading="regular">
                            On
                        </Text>
                    </Layout>
                    <Layout alignItems="center" gap="8">
                        <Toggle state="indeterminate" />
                        <Text as="span" variant="body-14" leading="regular">
                            Indeterminate
                        </Text>
                    </Layout>
                    <Layout alignItems="center" gap="8">
                        <Toggle checked disabled />
                        <Text as="span" variant="body-14" leading="regular">
                            On Disabled
                        </Text>
                    </Layout>
                    <Layout alignItems="center" gap="8">
                        <Toggle state="indeterminate" disabled />
                        <Text as="span" variant="body-14" leading="regular">
                            Indeterminate Disabled
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
            <Divider variant="solid" />

            <ComponentPropsTable rows={TOGGLE_PROPS} />
        </DocPageLayout>
    );
}
