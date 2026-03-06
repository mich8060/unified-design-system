export interface CompositionPairConstraint {
  parent: string;
  child: string;
  reason?: string;
}

export interface CompositionConstraints {
  allowedChildrenByParent: Record<string, string[]>;
  allowedParentsByChild: Record<string, string[]>;
  disallowedPairs: CompositionPairConstraint[];
}

const allowedChildrenByParent: Record<string, string[]> = {
  AppShell: ["Menu", "Container", "Flex", "Text", "Button"],
  Container: ["Flex", "Table", "Text", "Button", "Field", "Divider", "Tag"],
  Field: ["TextInput", "Input", "Dropdown", "Datepicker", "Textarea", "Checkbox", "Radio", "Toggle", "Slider", "FileUpload"],
  Modal: ["Text", "Button", "Divider", "Field", "TextInput", "Dropdown", "Datepicker", "Textarea", "Tag"],
  Table: ["Tag", "Status", "Avatar", "Button", "ActionMenu", "ProgressIndicator", "DotStatus"],
  Tabs: ["Text", "Tag", "Button", "Table", "Field"],
  Menu: ["ActionMenu", "Dropdown", "Toggle", "Text", "Icon"],
};

const allowedParentsByChild: Record<string, string[]> = {
  ActionMenu: ["Menu", "Table"],
  Avatar: ["Table"],
  Button: ["AppShell", "Container", "Flex", "Modal", "Table", "Tabs"],
  Checkbox: ["Field"],
  Container: ["AppShell", "root"],
  Datepicker: ["Field", "Modal"],
  Divider: ["Container", "Modal"],
  DotStatus: ["Table"],
  Dropdown: ["Field", "Menu", "Modal"],
  Field: ["Container", "Modal", "Tabs"],
  FileUpload: ["Field"],
  Flex: ["AppShell", "Container"],
  Icon: ["Menu"],
  Input: ["Field"],
  Menu: ["AppShell", "root"],
  Modal: ["AppShell", "Container", "root"],
  ProgressIndicator: ["Table"],
  Radio: ["Field"],
  Slider: ["Field"],
  Status: ["Table"],
  Table: ["Container", "Tabs"],
  Tag: ["Container", "Modal", "Table", "Tabs"],
  Text: ["AppShell", "Container", "Flex", "Menu", "Modal", "Tabs"],
  TextInput: ["Field", "Modal"],
  Textarea: ["Field", "Modal"],
  Toggle: ["Field", "Menu"],
};

const disallowedPairs: CompositionPairConstraint[] = [
  { parent: "Modal", child: "Modal", reason: "Nested modals create inaccessible focus traps." },
  { parent: "Dialog", child: "Dialog", reason: "Nested dialogs reduce escape behavior predictability." },
  { parent: "Toast", child: "Modal", reason: "Toast surfaces must remain non-blocking." },
  { parent: "Toast", child: "Dialog", reason: "Toast surfaces must remain non-blocking." },
  { parent: "Table", child: "Table", reason: "Nested tables reduce readability and responsiveness." },
  { parent: "Button", child: "Button", reason: "Interactive controls cannot be nested." },
];

export const CompositionRules: CompositionConstraints = {
  allowedChildrenByParent,
  allowedParentsByChild,
  disallowedPairs,
};
