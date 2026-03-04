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
  AppShell: ["Menu", "Container", "Flex", "Card", "Text", "Button"],
  Container: ["Flex", "Card", "Table", "Text", "Button", "Field", "Divider", "Tag"],
  Field: ["TextInput", "Input", "Dropdown", "Datepicker", "Textarea", "Checkbox", "Radio", "Toggle", "Slider", "FileUpload"],
  Modal: ["Text", "Button", "Divider", "Field", "TextInput", "Dropdown", "Datepicker", "Textarea", "Tag"],
  Card: ["Text", "Flex", "Button", "Tag", "Status", "Table", "Divider", "Avatar", "ActionMenu", "Field"],
  Table: ["Tag", "Status", "Avatar", "Button", "ActionMenu", "ProgressIndicator", "DotStatus"],
  Tabs: ["Text", "Tag", "Button", "Card", "Table", "Field"],
  Menu: ["ActionMenu", "Dropdown", "Toggle", "Text", "Icon"],
};

const allowedParentsByChild: Record<string, string[]> = {
  ActionMenu: ["Card", "Menu", "Table"],
  Avatar: ["Card", "Table"],
  Button: ["AppShell", "Card", "Container", "Flex", "Modal", "Table", "Tabs"],
  Card: ["AppShell", "Container", "Tabs"],
  Checkbox: ["Field"],
  Container: ["AppShell", "root"],
  Datepicker: ["Field", "Modal"],
  Divider: ["Card", "Container", "Modal"],
  DotStatus: ["Table"],
  Dropdown: ["Field", "Menu", "Modal"],
  Field: ["Card", "Container", "Modal", "Tabs"],
  FileUpload: ["Field"],
  Flex: ["AppShell", "Card", "Container"],
  Icon: ["Menu"],
  Input: ["Field"],
  Menu: ["AppShell", "root"],
  Modal: ["AppShell", "Container", "root"],
  ProgressIndicator: ["Table"],
  Radio: ["Field"],
  Slider: ["Field"],
  Status: ["Card", "Table"],
  Table: ["Card", "Container", "Tabs"],
  Tag: ["Card", "Container", "Modal", "Table", "Tabs"],
  Text: ["AppShell", "Card", "Container", "Flex", "Menu", "Modal", "Tabs"],
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
