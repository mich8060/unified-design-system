import type { AIManifest } from "./types";

export const UDS_AI_MANIFEST: AIManifest = {
  schemaVersion: "1.0.0",
  package: "@mich8060/unified-design-system",
  metadataVersion: "0.1.0",
  components: [
    {
      name: "Button",
      metadataExport: "BUTTON_METADATA",
      metadataImportPath: "@mich8060/unified-design-system/ai",
    },
    {
      name: "Table",
      metadataExport: "TABLE_METADATA",
      metadataImportPath: "@mich8060/unified-design-system/ai",
    },
    {
      name: "Field",
      metadataExport: "FIELD_METADATA",
      metadataImportPath: "@mich8060/unified-design-system/ai",
    },
    {
      name: "Modal",
      metadataExport: "MODAL_METADATA",
      metadataImportPath: "@mich8060/unified-design-system/ai",
    },
  ],
  patternExport: "UDS_FLOW_PATTERNS",
  tokenIntentExport: "UDS_TOKEN_INTENTS",
  layoutRuleExport: "UDS_LAYOUT_RULES",
  antiPatternExport: "UDS_GLOBAL_ANTI_PATTERNS",
};
