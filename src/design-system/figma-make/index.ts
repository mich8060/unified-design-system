// Narrow export surface for Figma Make integrations.
export { AppShell } from "../../app-shell/AppShell";
export type { AppShellProps, AppShellSlots, AppShellSectionProps } from "../../app-shell/AppShell";

export { ActionMenu } from "../components/ActionMenu";
export { Avatar } from "../components/Avatar";
export { Badge } from "../components/Badge";
export { Button } from "../components/Button";
export { Checkbox } from "../components/Checkbox";
export { Checklist } from "../components/Checklist";
export { Code } from "../components/Code";
export { Container } from "../components/Container";
export { DateInput } from "../components/DateInput";
export { DateRangeInput } from "../components/DateRangeInput";
export { Divider } from "../components/Divider";
export { Dropdown } from "../components/Dropdown";
export { Field } from "../components/Field";
export { FileUpload } from "../components/FileUpload";
export { Flex } from "../components/Flex";
export { Icon } from "../components/Icon";
export { Menu } from "../components/Menu";
export { Modal } from "../components/Modal";
export { Pagination } from "../components/Pagination";
export { ProgressIndicator } from "../components/ProgressIndicator";
export { SearchInput } from "../components/SearchInput";
export { Slider } from "../components/Slider";
export { Status } from "../components/Status";
export { Steps } from "../components/Steps";
export { Table } from "../components/Table";
export { Tabs } from "../components/Tabs";
export { Tag } from "../components/Tag";
export { Text } from "../components/Text";
export { TextInput } from "../components/TextInput";
export { Textarea } from "../components/Textarea";
export { TimeInput } from "../components/TimeInput";
export { Toolbar } from "../components/Toolbar";
export { Toggle } from "../components/Toggle";
export { Tooltip } from "../components/Tooltip";

export { ThemeProvider, createBrand, createTheme, useTheme, useThemeController } from "../theme";
export { createUDSRuntimeHelperSDK } from "../ai/sdk";
export { validateAIOutput } from "../ai/validation/validateAIOutput";

export const FIGMA_MAKE_CONTRACT_ENTRYPOINT = "@mich8060/unified-design-system/ai/figma-make";
export const FIGMA_MAKE_PROMPT_ENTRYPOINT = "@mich8060/unified-design-system/ai/prompts/figma-make";
