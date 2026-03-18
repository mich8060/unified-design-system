import { Divider } from "../../design-system/components/Divider";
import { useState } from "react";
import { Layout } from "../../design-system/components/Layout";
import { Pagination } from "../../design-system/components/Pagination";
import type { ReactNode } from "react";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const PAGINATION_PROPS: ComponentPropRow[] = [
  { prop: "currentPage", type: "number", defaultValue: "1", description: "Current active page (1-indexed)." },
  { prop: "totalPages", type: "number", defaultValue: "10", description: "Total number of available pages." },
  { prop: "onPageChange", type: "(page: number) => void", defaultValue: "-", description: "Called when the selected page changes." },
  {
    prop: "variant",
    type: '"default" | "line"',
    defaultValue: '"default"',
    description: "Visual style of the pagination control.",
  },
  { prop: "showJumpInput", type: "boolean", defaultValue: "false", description: "Shows the jump-to-page input." },
  { prop: "showDoubleButtons", type: "boolean", defaultValue: "false", description: "Shows first/last buttons in addition to previous/next." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional CSS classes for the root element." },
];

function PaginationExample({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Layout
      direction="column"
      gap="12"
      style={{
        width: "100%",
        border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
        borderRadius: "var(--uds-radius-8)",
        padding: "var(--uds-spacing-16)",
        backgroundColor: "var(--uds-surface-primary)",
      }}
    >
      <Text as="h3" variant="heading-20" weight="medium" leading="regular">
        {title}
      </Text>
      <Text as="p" variant="body-14" leading="regular">
        {description}
      </Text>
      <Layout style={{ paddingTop: "var(--uds-spacing-8)" }}>{children}</Layout>
    </Layout>
  );
}

export function PaginationDemoPage() {
  const [defaultPage, setDefaultPage] = useState(1);
  const [linePage, setLinePage] = useState(1);
  const [withJumpPage, setWithJumpPage] = useState(1);
  const [lineWithJumpPage, setLineWithJumpPage] = useState(1);
  const [lineWithDoublePage, setLineWithDoublePage] = useState(1);
  const [smallCountPage, setSmallCountPage] = useState(2);

  return (
    <DocPageLayout
      title="Pagination"
      description="The Pagination component allows users to navigate through multiple pages of content. It displays page numbers, navigation controls, and optional jump-to-page functionality."
    >
      <Layout direction="column" gap="48">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Variants
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Each example is isolated in its own layout block for clearer spacing and easier comparison.
          </Text>
        </Layout>

        <Layout direction="column" gap="24">
          <PaginationExample
            title="Default Variant"
            description="The default pagination variant with a solid background for the active page and single previous/next buttons."
          >
            <Pagination currentPage={defaultPage} totalPages={10} onPageChange={(page: unknown) => typeof page === "number" && setDefaultPage(page)} variant="default" />
          </PaginationExample>

          <PaginationExample
            title="Line Variant"
            description="The line variant displays the active page with blue text and an underline instead of a solid background."
          >
            <Pagination currentPage={linePage} totalPages={10} onPageChange={(page: unknown) => typeof page === "number" && setLinePage(page)} variant="line" />
          </PaginationExample>

          <PaginationExample
            title="With Jump Input"
            description="Default variant with jump-to-page input enabled."
          >
            <Pagination currentPage={withJumpPage} totalPages={10} onPageChange={(page: unknown) => typeof page === "number" && setWithJumpPage(page)} variant="default" showJumpInput />
          </PaginationExample>

          <PaginationExample
            title="Line with Jump Input"
            description="Line variant with jump-to-page input enabled."
          >
            <Pagination currentPage={lineWithJumpPage} totalPages={10} onPageChange={(page: unknown) => typeof page === "number" && setLineWithJumpPage(page)} variant="line" showJumpInput />
          </PaginationExample>

          <PaginationExample
            title="Line with Double Buttons"
            description="Line variant with first/last buttons enabled."
          >
            <Pagination currentPage={lineWithDoublePage} totalPages={10} onPageChange={(page: unknown) => typeof page === "number" && setLineWithDoublePage(page)} variant="line" showDoubleButtons />
          </PaginationExample>

          <PaginationExample
            title="Small Page Count"
            description="Pagination with a small number of pages shows all page numbers without ellipsis."
          >
            <Pagination currentPage={smallCountPage} totalPages={5} onPageChange={(page: unknown) => typeof page === "number" && setSmallCountPage(page)} variant="default" />
          </PaginationExample>
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={PAGINATION_PROPS} title="Pagination Props" />
    </DocPageLayout>
  );
}
