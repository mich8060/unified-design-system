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
    audit?: Record<string, unknown>;
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
    scenario: "Simple authentication container with semantic layout and one primary action.",
    kind: "valid",
    tags: ["form", "auth", "field-wrapping", "composition"],
    output: {
      tree: {
        type: "Container",
        props: { gap: "--uds-spacing-24" },
        children: [
          { type: "Text", props: { variant: "heading-24" } },
          { type: "Field", children: [{ type: "TextInput", props: { type: "email", iconPosition: "left" } }] },
          { type: "Field", children: [{ type: "TextInput", props: { type: "password" } }] },
          { type: "Button", props: { appearance: "primary", label: "Sign in" } },
          { type: "Button", props: { appearance: "text", label: "Forgot password?" } }
        ]
      }
    },
    expected: { status: "pass" },
    rationale: {
      why: "Uses allowed composition (Container > Field/Text/Button), valid spacing token, and a single primary action."
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
          { type: "Text", props: { variant: "heading-24" } },
          { type: "Button", props: { appearance: "primary", label: "Create row" } },
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
    id: "valid-pattern-authform",
    scenario: "Auth form output declares patternId and satisfies required structure components.",
    kind: "valid",
    tags: ["pattern", "auth", "deterministic"],
    output: {
      tree: {
        type: "Container",
        props: { gap: "--uds-spacing-24" },
        children: [
          { type: "Text", props: { variant: "heading-24", text: "Sign in" } },
          { type: "Field", children: [{ type: "TextInput", props: { type: "email" } }] },
          { type: "Field", children: [{ type: "TextInput", props: { type: "password" } }] },
          { type: "Button", props: { appearance: "primary", label: "Sign in" } }
        ]
      },
      audit: {
        patternId: "AuthForm",
        source: "training-example"
      }
    },
    expected: { status: "pass" },
    rationale: {
      why: "Declares patternId and includes all required AuthForm components in canonical order."
    }
  },
  {
    id: "invalid-pattern-missing-required-component",
    scenario: "Pattern-bound output omits a required component from declared pattern.",
    kind: "invalid",
    tags: ["pattern", "structure", "governance"],
    output: {
      tree: {
        type: "Container",
        children: [
          { type: "Text", props: { variant: "heading-24", text: "Sign in" } },
          { type: "Field", children: [{ type: "TextInput", props: { type: "email" } }] },
          { type: "Field", children: [{ type: "TextInput", props: { type: "password" } }] }
        ]
      },
      audit: {
        patternId: "AuthForm",
        source: "training-example"
      }
    },
    expected: { status: "fail", violationCodes: ["RULE_PATTERN_REQUIRED_COMPONENT_MISSING"] },
    rationale: {
      why: "AuthForm requires a primary submit Button and it is missing.",
      fix: "Add Button with appearance='primary' in the form action section."
    }
  },
  {
    id: "invalid-pattern-id-unknown",
    scenario: "Output declares a patternId not present in the pattern registry.",
    kind: "invalid",
    tags: ["pattern", "contract"],
    output: {
      tree: {
        type: "Container",
        children: [{ type: "Text", props: { variant: "body-16", text: "Hello" } }]
      },
      audit: {
        patternId: "UnknownPattern123",
      }
    },
    expected: { status: "fail", violationCodes: ["RULE_UNKNOWN_PATTERN_ID"] },
    rationale: {
      why: "Pattern-bound generation must reference known patterns only.",
      fix: "Use a valid patternId from PatternRegistry."
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
    id: "invalid-custom-css-variable",
    scenario: "Uses non-UDS CSS variable references in component props.",
    kind: "invalid",
    tags: ["tokens", "css-variables", "governance"],
    output: {
      tree: {
        type: "Container",
        props: { surfaceColor: "var(--brand-primary-500)" },
        children: [{ type: "Text", props: { color: "--custom-text-color", variant: "body-16" } }]
      }
    },
    expected: {
      status: "fail",
      violationCodes: ["RULE_CUSTOM_CSS_VAR_DISALLOWED"]
    },
    rationale: {
      why: "Generated output must not introduce custom CSS variables outside --uds-* namespace.",
      fix: "Use --uds-* references or hardcoded literal values."
    }
  },
  {
    id: "invalid-tailwind-classname",
    scenario: "Output includes Tailwind utility classes.",
    kind: "invalid",
    tags: ["tailwind", "className", "governance"],
    output: {
      tree: {
        type: "Container",
        props: { className: "p-4 bg-blue-600 text-white" },
        children: [{ type: "Text", props: { variant: "body-16", text: "Example" } }]
      }
    },
    expected: { status: "fail", violationCodes: ["RULE_TAILWIND_CLASS_DISALLOWED"] },
    rationale: {
      why: "Figma Make output must not fall back to Tailwind utility classes.",
      fix: "Use UDS components and governed tokenized props instead of className utilities."
    }
  },
  {
    id: "invalid-menu-ant-props",
    scenario: "Menu uses Ant-style props that are not part of the UDS contract.",
    kind: "invalid",
    tags: ["menu", "props", "contract-drift"],
    output: {
      tree: {
        type: "Menu",
        props: {
          items: [{ label: "Dashboard", icon: "House", path: "/" }],
          selectedKeys: ["/"],
          mode: "inline",
        }
      }
    },
    expected: { status: "fail", violationCodes: ["RULE_FORBIDDEN_PROP"] },
    rationale: {
      why: "Menu must use UDS canonical props, not Ant-style API props.",
      fix: "Use navItems plus activeMode/app state driven selection."
    }
  },
  {
    id: "invalid-layout-ant-props",
    scenario: "Layout uses vertical/justify/align aliases from non-UDS APIs.",
    kind: "invalid",
    tags: ["layout", "props", "contract-drift"],
    output: {
      tree: {
        type: "Layout",
        props: {
          vertical: true,
          justify: "space-between",
          align: "center",
        },
        children: [{ type: "Text", props: { variant: "body-16" } }]
      }
    },
    expected: { status: "fail", violationCodes: ["RULE_FORBIDDEN_PROP"] },
    rationale: {
      why: "Layout must use canonical props for deterministic cross-model behavior.",
      fix: "Use direction, justifyContent, and alignItems props."
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
      fix: "Use Menu-approved children or move Field under Container/Modal/Tabs."
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
