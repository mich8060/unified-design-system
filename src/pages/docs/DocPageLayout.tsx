import React, { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { PageHeaderMeta } from "./PageHeaderMeta";

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
        <Layout className="app-shell__demo-page" direction="column" gap="0">
            <Layout className="app-shell__page-header" direction="column" gap="8">
                <Layout className="app-shell__page-header-inner" direction="column" gap="8">
                    <PageHeaderMeta title={title} description={description} />
                </Layout>
            </Layout>
            <Layout className="app-shell__contentInner" direction="column" gap="24">
                {children}
                {isComponentRoute && !hasCodeExample ? (
                    <>
                        <Divider variant="solid" />
                        <Layout direction="column" gap="12">
                            <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                                Code Example
                            </Text>
                            <Code language="tsx" code={defaultSnippet} />
                        </Layout>
                    </>
                ) : null}
            </Layout>
        </Layout>
    );
}
