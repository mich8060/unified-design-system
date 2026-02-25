const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");
const DIST_ENTRIES_DIR = path.join(DIST_DIR, "entries");

const COMPONENT_EXPORTS = [
  "Accordion",
  "ActionMenu",
  "Avatar",
  "Badge",
  "Branding",
  "Breadcrumb",
  "Button",
  "Calendar",
  "Card",
  "Checkbox",
  "Chip",
  "Datepicker",
  "Divider",
  "DotStatus",
  "Dropdown",
  "EventCard",
  "Field",
  "FileUpload",
  "Flex",
  "Icon",
  "ImageAspect",
  "Input",
  "Key",
  "Menu",
  "MicroCalendar",
  "Modal",
  "Pagination",
  "PillToggle",
  "Playground",
  "ProgressCircle",
  "ProgressIndicator",
  "Radio",
  "Slider",
  "Status",
  "Steps",
  "Table",
  "Tabs",
  "Tag",
  "Textarea",
  "Toast",
  "Toggle",
  "Tooltip",
  "UDS",
];

function writeFile(absPath, content) {
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, content, "utf8");
}

function generateEntryFiles() {
  fs.mkdirSync(DIST_ENTRIES_DIR, { recursive: true });

  COMPONENT_EXPORTS.forEach((name) => {
    const esmPath = path.join(DIST_ENTRIES_DIR, `${name}.js`);
    const cjsPath = path.join(DIST_ENTRIES_DIR, `${name}.cjs`);

    writeFile(
      esmPath,
      `export { ${name} as default } from "../uds-components.es.js";\n`,
    );
    writeFile(
      cjsPath,
      `"use strict";\nmodule.exports = require("../uds-components.umd.js").${name};\n`,
    );
  });
}

function copyBuiltTokens() {
  const srcTokens = path.join(ROOT, "src/styles/tokens.css");
  const distTokens = path.join(DIST_DIR, "tokens.css");

  if (!fs.existsSync(srcTokens)) {
    throw new Error("Expected src/styles/tokens.css to exist before postbuild.");
  }

  fs.copyFileSync(srcTokens, distTokens);
}

function run() {
  generateEntryFiles();
  copyBuiltTokens();
  console.log(`Generated ${COMPONENT_EXPORTS.length} dist entry shims.`);
  console.log("Copied src/styles/tokens.css -> dist/tokens.css");
}

run();
