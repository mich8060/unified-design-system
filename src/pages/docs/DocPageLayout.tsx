import React, { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Flex } from "../../design-system/components/Flex";
import { Text } from "../../design-system/components/Text";

interface DocPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const isCodeElement = (node: React.ReactNode): boolean => {
  if (!React.isValidElement(node)) return false;

  const elementType = node.type as unknown;
  if (elementType === Code) return true;

  const typeName =
    typeof elementType === "function"
      ? elementType.name
      : typeof elementType === "object" &&
          elementType !== null &&
          "displayName" in (elementType as Record<string, unknown>)
        ? String((elementType as { displayName?: string }).displayName ?? "")
        : "";
  if (typeName === "Code") return true;

  return React.Children.toArray(node.props.children).some(isCodeElement);
};

export function DocPageLayout({ title, description, children }: DocPageLayoutProps) {
  const { pathname } = useLocation();
  const isComponentRoute = pathname.startsWith("/components/");
  const hasCodeExample = React.Children.toArray(children).some(isCodeElement);
  const defaultSnippet = `<${title} />`;

  return (
    <Flex className="app-shell__demo-page" direction="column" gap="0">
      <Flex className="app-shell__page-header" direction="column" gap="8">
        <Text as="h1" variant="heading-32" weight="bold" leading="regular">
          {title}
        </Text>
        <Text as="p" variant="body-16" leading="regular">
          {description}
        </Text>
      </Flex>
      <Flex className="app-shell__contentInner" direction="column" gap="24">
        {children}
        {isComponentRoute && !hasCodeExample ? (
          <>
            <Divider variant="solid" />
            <Flex direction="column" gap="12">
              <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                Code Example
              </Text>
              <Code language="tsx" code={defaultSnippet} />
            </Flex>
          </>
        ) : null}
      </Flex>
    </Flex>
  );
}
