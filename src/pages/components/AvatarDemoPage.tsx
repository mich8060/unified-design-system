import { Avatar, Divider, Flex, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const AVATAR_PROPS: ComponentPropRow[] = [
  { prop: "src", type: "string", defaultValue: "-", description: "Image source URL for avatar photo." },
  { prop: "initials", type: "string", defaultValue: "-", description: "Initials rendered when no image source is provided." },
  { prop: "name", type: "string", defaultValue: "-", description: "Full name used to auto-generate initials when initials is empty." },
  { prop: "status", type: "boolean", defaultValue: "false", description: "Shows online status indicator dot (hidden when camera button is enabled)." },
  {
    prop: "size",
    type: '"small" | "default" | "large"',
    defaultValue: '"default"',
    description: "Avatar size variant: small 36x36, default 48x48, large 64x64.",
  },
  { prop: "showCameraButton", type: "boolean", defaultValue: "false", description: "Shows bottom-right camera action button variant." },
  { prop: "cameraButtonAriaLabel", type: "string", defaultValue: '"Change avatar photo"', description: "Accessible label for camera action button." },
  { prop: "onCameraClick", type: "(event) => void", defaultValue: "-", description: "Callback fired when camera button is clicked." },
  { prop: "alt", type: "string", defaultValue: '""', description: "Alt text for image when src is present." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional CSS classes on avatar root." },
  {
    prop: "...rest",
    type: "HTMLAttributes<HTMLDivElement>",
    defaultValue: "-",
    description: "Native div attributes like id, data-*, aria-*.",
  },
];

const DEMO_IMAGE =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80";

export function AvatarDemoPage() {
  return (
    <DocPageLayout
      title="Avatar"
      description="Avatars display user images or initials with optional status and camera-action variants."
    >
      <Flex direction="column" gap="48">
        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Variants
          </Text>
          <Flex alignItems="center" gap="16" wrap>
            <Avatar src={DEMO_IMAGE} alt="User profile photo" />
            <Avatar initials="JD" />
            <Avatar name="Jane Smith" />
            <Avatar initials="ON" status />
            <Avatar src={DEMO_IMAGE} showCameraButton />
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Size Variants
          </Text>
          <Flex alignItems="center" gap="16" wrap>
            <Avatar initials="SM" size="small" />
            <Avatar initials="MD" size="default" />
            <Avatar initials="LG" size="large" />
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Camera Button Variant
          </Text>
          <Flex alignItems="center" gap="16" wrap>
            <Avatar initials="SM" size="small" showCameraButton />
            <Avatar initials="MD" size="default" showCameraButton />
            <Avatar initials="LG" size="large" showCameraButton />
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            State Combinations
          </Text>
          <Flex alignItems="center" gap="16" wrap>
            <Avatar initials="ST" status />
            <Avatar src={DEMO_IMAGE} status />
            <Avatar initials="CM" showCameraButton />
            <Avatar src={DEMO_IMAGE} status showCameraButton cameraButtonAriaLabel="Edit image" />
            <Avatar initials="" name="" />
          </Flex>
        </Flex>
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={AVATAR_PROPS} />
    </DocPageLayout>
  );
}
