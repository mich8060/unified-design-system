import React from "react";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { FileUpload } from "../../design-system/components/FileUpload";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const FILE_UPLOAD_PROPS: ComponentPropRow[] = [
  {
    prop: "onFileSelect",
    type: "(files: FileList) => void",
    defaultValue: "-",
    description: "Callback fired when valid files are selected.",
  },
  {
    prop: "accept",
    type: "string[]",
    defaultValue: "[]",
    description: "Accepted MIME types or extensions.",
  },
  {
    prop: "maxSize",
    type: "number",
    defaultValue: "10",
    description: "Maximum file size in MB.",
  },
  {
    prop: "acceptText",
    type: "string",
    defaultValue: "derived from accept",
    description: "Explicit helper text for accepted file types.",
  },
  {
    prop: "instructionText",
    type: "string",
    defaultValue: '"Drop files here or click to upload"',
    description: "Instruction copy shown in the upload surface.",
  },
  {
    prop: "size",
    type: '"default" | "small"',
    defaultValue: '"default"',
    description: "Controls overall upload surface height, spacing, and typography.",
  },
  {
    prop: "multiple",
    type: "boolean",
    defaultValue: "false",
    description: "Allows selecting more than one file.",
  },
  {
    prop: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables drag/drop and picker interaction.",
  },
  {
    prop: "...rest",
    type: "InputHTMLAttributes<HTMLInputElement>",
    defaultValue: "-",
    description: "Native file input attributes (id, name, required, aria-*).",
  },
];

const BASIC_SNIPPET = `<FileUpload
  onFileSelect={(files) => console.log(files)}
/>`;

const MULTIPLE_SNIPPET = `<FileUpload
  multiple
  onFileSelect={(files) => console.log(files)}
/>`;

const SMALL_SNIPPET = `<FileUpload
  size="small"
  instructionText="Drop file or click to upload"
  onFileSelect={(files) => console.log(files)}
/>`;

const TYPE_RESTRICTION_SNIPPET = `<FileUpload
  accept={["image/png", "image/jpeg"]}
  acceptText="PNG, JPG"
  maxSize={5}
  onFileSelect={(files) => console.log(files)}
/>`;

const REQUIRED_SNIPPET = `<FileUpload
  required
  instructionText="Upload at least one document"
  onFileSelect={(files) => console.log(files)}
/>`;

const DISABLED_SNIPPET = `<FileUpload
  disabled
  instructionText="File upload is currently disabled"
/>`;

const fileNamesFromSelection = (value: unknown): string[] => {
  if (value instanceof FileList) {
    return Array.from(value).map((file) => file.name);
  }

  return [];
};

interface UploadExampleProps {
  title: string;
  description: string;
  snippet: string;
  children: React.ReactNode;
}

function UploadExample({ title, description, snippet, children }: UploadExampleProps) {
  return (
    <Layout direction="column" gap="12">
      <Text as="h2" variant="heading-24" weight="medium" leading="regular">
        {title}
      </Text>
      <Text as="p" variant="body-14" leading="regular">
        {description}
      </Text>
      {children}
      <Code code={snippet} language="tsx" />
    </Layout>
  );
}

export function FileUploadDemoPage() {
  const [basicFiles, setBasicFiles] = React.useState<string[]>([]);
  const [multipleFiles, setMultipleFiles] = React.useState<string[]>([]);
  const [restrictedFiles, setRestrictedFiles] = React.useState<string[]>([]);
  const [requiredFiles, setRequiredFiles] = React.useState<string[]>([]);
  const [smallFiles, setSmallFiles] = React.useState<string[]>([]);

  return (
    <DocPageLayout
      title="File Upload"
      description="FileUpload supports drag-and-drop and picker-based selection with consistent validation, sizing, and state handling."
    >
      <Layout direction="column" gap="48">
        <UploadExample
          title="Basic Upload"
          description="Single-file upload with default instruction and validation messaging."
          snippet={BASIC_SNIPPET}
        >
          <FileUpload onFileSelect={(files) => setBasicFiles(fileNamesFromSelection(files))} />
          {basicFiles.length > 0 ? (
            <Text as="p" variant="body-12" leading="regular">
              Selected: {basicFiles.join(", ")}
            </Text>
          ) : null}
        </UploadExample>
        <Divider variant="solid" />

        <UploadExample
          title="Small Size"
          description="Use the small size for compact forms, side panels, and dense layouts."
          snippet={SMALL_SNIPPET}
        >
          <FileUpload
            size="small"
            instructionText="Drop file or click to upload"
            onFileSelect={(files) => setSmallFiles(fileNamesFromSelection(files))}
          />
          {smallFiles.length > 0 ? (
            <Text as="p" variant="body-12" leading="regular">
              Selected: {smallFiles.join(", ")}
            </Text>
          ) : null}
        </UploadExample>
        <Divider variant="solid" />

        <UploadExample
          title="Multiple Files"
          description="Enable multiple selection for batch upload workflows."
          snippet={MULTIPLE_SNIPPET}
        >
          <FileUpload multiple onFileSelect={(files) => setMultipleFiles(fileNamesFromSelection(files))} />
          {multipleFiles.length > 0 ? (
            <Text as="p" variant="body-12" leading="regular">
              Selected: {multipleFiles.join(", ")}
            </Text>
          ) : null}
        </UploadExample>
        <Divider variant="solid" />

        <UploadExample
          title="File Type Restrictions"
          description="Limit uploads to images and enforce a 5MB maximum."
          snippet={TYPE_RESTRICTION_SNIPPET}
        >
          <FileUpload
            accept={["image/png", "image/jpeg"]}
            acceptText="PNG, JPG"
            maxSize={5}
            onFileSelect={(files) => setRestrictedFiles(fileNamesFromSelection(files))}
          />
          {restrictedFiles.length > 0 ? (
            <Text as="p" variant="body-12" leading="regular">
              Selected: {restrictedFiles.join(", ")}
            </Text>
          ) : null}
        </UploadExample>
        <Divider variant="solid" />

        <UploadExample
          title="File Required"
          description="Mark the underlying file input as required for form flows."
          snippet={REQUIRED_SNIPPET}
        >
          <FileUpload
            required
            instructionText="Upload at least one document"
            onFileSelect={(files) => setRequiredFiles(fileNamesFromSelection(files))}
          />
          {requiredFiles.length > 0 ? (
            <Text as="p" variant="body-12" leading="regular">
              Selected: {requiredFiles.join(", ")}
            </Text>
          ) : null}
        </UploadExample>
        <Divider variant="solid" />

        <UploadExample
          title="Disabled State"
          description="Use disabled state when upload is unavailable based on feature flags, permissions, or process state."
          snippet={DISABLED_SNIPPET}
        >
          <FileUpload disabled instructionText="File upload is currently disabled" />
        </UploadExample>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={FILE_UPLOAD_PROPS} title="Props Reference" />
    </DocPageLayout>
  );
}
