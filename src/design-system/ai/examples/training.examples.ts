import type { UINodeTree } from "../manifest/types";

export interface AITrainingExample {
  id: string;
  scenario: string;
  kind: "valid" | "invalid";
  tags: string[];
  output: {
    tree: UINodeTree;
    manifestVersion?: string;
    governanceVersion?: string;
    policyVersion?: string;
  };
  expected: {
    status: "pass" | "fail";
    violationCodes?: string[];
  };
  rationale: {
    why: string;
    fix?: string;
  };
}

export const UDS_TRAINING_EXAMPLES: readonly AITrainingExample[] = [
  {
    id: "valid-auth-form",
    scenario: "Simple authentication card with semantic layout and one primary action.",
    kind: "valid",
    tags: ["form", "auth", "field-wrapping"],
    output: {
      tree: {
        type: "Container",
        props: { gap: "--uds-spacing-24" },
        children: [
          {
            type: "Card",
            children: [
              { type: "Text", props: { variant: "heading-24" } },
              { type: "Field", children: [{ type: "TextInput", props: { type: "email", iconPosition: "left" } }] },
              { type: "Field", children: [{ type: "TextInput", props: { type: "password" } }] },
              {
                type: "Flex",
                children: [
                  { type: "Button", props: { appearance: "primary", label: "Sign in" } },
                  { type: "Button", props: { appearance: "text", label: "Forgot password?" } }
                ]
              }
            ]
          }
        ]
      }
    },
    expected: { status: "pass" },
    rationale: {
      why: "Uses allowed composition (Container > Card > Field/Text/Button), valid spacing token, and a single primary action."
    }
  },
  {
    id: "valid-table-summary",
    scenario: "Data summary area with table-related indicators and a single primary action.",
    kind: "valid",
    tags: ["table", "status", "dashboard"],
    output: {
      tree: {
        type: "Container",
        children: [
          {
            type: "Flex",
            children: [
              { type: "Text", props: { variant: "heading-24" } },
              { type: "Button", props: { appearance: "primary", label: "Create row" } }
            ]
          },
          {
            type: "Table",
            children: [
              { type: "Status", props: { variant: "success", text: "Ready" } },
              { type: "Tag", props: { variant: "blue", label: "Active" } },
              { type: "DotStatus", props: { status: "positive" } },
              { type: "ActionMenu", props: { triggerLabel: "Row actions" } }
            ]
          }
        ]
      }
    },
    expected: { status: "pass" },
    rationale: {
      why: "Uses allowed Table children and keeps primary action count within limit."
    }
  },
  {
    id: "invalid-two-primary-actions",
    scenario: "Section contains two primary buttons.",
    kind: "invalid",
    tags: ["actions", "policy"],
    output: {
      tree: {
        type: "Container",
        children: [
          { type: "Button", props: { appearance: "primary", label: "Save" } },
          { type: "Button", props: { appearance: "primary", label: "Publish" } }
        ]
      }
    },
    expected: { status: "fail", violationCodes: ["RULE_MAX_PRIMARY_ACTIONS"] },
    rationale: {
      why: "Violates max primary actions per section.",
      fix: "Keep one primary action and convert the rest to secondary appearances."
    }
  },
  {
    id: "invalid-raw-html-and-inline-style",
    scenario: "Output includes raw HTML and inline style values.",
    kind: "invalid",
    tags: ["raw-html", "inline-style", "governance"],
    output: {
      tree: {
        type: "Container",
        children: [
          {
            type: "div",
            props: { style: { color: "#ff0000" } },
            children: [{ type: "Text", props: { variant: "body-16" } }]
          }
        ]
      }
    },
    expected: {
      status: "fail",
      violationCodes: [
        "RULE_UNKNOWN_COMPONENT",
        "RULE_RAW_HTML_DISALLOWED",
        "RULE_INLINE_STYLE_DISALLOWED"
      ]
    },
    rationale: {
      why: "Governance forbids raw HTML tags and inline styling in generated output.",
      fix: "Replace raw HTML with UDS components and use tokenized component props."
    }
  },
  {
    id: "invalid-spacing-token",
    scenario: "Spacing prop uses a non-system token.",
    kind: "invalid",
    tags: ["tokens", "spacing"],
    output: {
      tree: {
        type: "Container",
        props: { gap: "--uds-spacing-999" },
        children: [{ type: "Text", props: { variant: "body-16" } }]
      }
    },
    expected: { status: "fail", violationCodes: ["RULE_UNKNOWN_SPACING_TOKEN"] },
    rationale: {
      why: "Spacing token is outside allowed spacing system.",
      fix: "Use an allowed token such as --uds-spacing-8/12/16/24."
    }
  },
  {
    id: "invalid-composition-parent-child",
    scenario: "Composition places a form field directly inside Menu.",
    kind: "invalid",
    tags: ["composition", "parent-child", "layout"],
    output: {
      tree: {
        type: "Menu",
        children: [{ type: "Field", children: [{ type: "TextInput", props: { type: "text" } }] }]
      }
    },
    expected: {
      status: "fail",
      violationCodes: ["RULE_INVALID_COMPOSITION", "RULE_INVALID_PARENT_COMPOSITION"]
    },
    rationale: {
      why: "Field is not an allowed Menu child and Field requires a form/container context.",
      fix: "Use Menu-approved children or move Field under Container/Card/Modal/Tabs."
    }
  },
  {
    id: "invalid-ambiguous-prop-alias",
    scenario: "Uses an ambiguous legacy alias prop instead of canonical prop.",
    kind: "invalid",
    tags: ["props", "aliases", "governance"],
    output: {
      tree: {
        type: "Chip",
        props: { label: "Demo", iconplacement: "left", icon: "User" }
      }
    },
    expected: { status: "fail", violationCodes: ["RULE_AMBIGUOUS_PROP_ALIAS"] },
    rationale: {
      why: "Alias props create inconsistent generation behavior across models.",
      fix: "Use canonical prop name `iconPlacement`."
    }
  },
  {
    id: "invalid-version-mismatch",
    scenario: "Output version fields do not match current governance contract.",
    kind: "invalid",
    tags: ["versioning", "contract", "governance"],
    output: {
      manifestVersion: "0.0.1",
      governanceVersion: "0.0.1",
      policyVersion: "0.0.1",
      tree: {
        type: "Container",
        children: [{ type: "Text", props: { variant: "body-16" } }]
      }
    },
    expected: {
      status: "fail",
      violationCodes: [
        "RULE_VERSION_MISMATCH_MANIFESTVERSION",
        "RULE_VERSION_MISMATCH_GOVERNANCEVERSION",
        "RULE_VERSION_MISMATCH_POLICYVERSION"
      ]
    },
    rationale: {
      why: "Generated output must declare versions that match the active AI contract.",
      fix: "Use the current manifest/governance/policy versions from UDSGovernance."
    }
  },
  {
    id: "invalid-schema-node-type",
    scenario: "Malformed output with missing node type.",
    kind: "invalid",
    tags: ["schema", "malformed"],
    output: {
      tree: {
        type: "",
        children: [{ type: "Text", props: { variant: "body-16" } }]
      }
    },
    expected: { status: "fail", violationCodes: ["SCHEMA_NODE_TYPE"] },
    rationale: {
      why: "Schema requires each node to have a non-empty string `type`.",
      fix: "Set a valid UDS component type for every node."
    }
  }
];
