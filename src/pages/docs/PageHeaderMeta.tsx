import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "../../design-system/components/Breadcrumb";
import { DescriptionList } from "../../design-system/components/DescriptionList";
import { Layout } from "../../design-system/components/Layout";
import { Link } from "../../design-system/components/Link";
import { Text } from "../../design-system/components/Text";
import { UDS_RUNTIME_VERSION } from "../../design-system/version";

interface PageHeaderMetaProps {
    title: string;
    description?: string;
    author?: string;
}

const AUTO_LAST_UPDATED = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});
const AUTHOR_PROFILE_URL = "https://chgit.slack.com/team/U06V9C0K06S";

function getSectionLabel(pathname: string): string {
    if (pathname.startsWith("/components/")) return "Components";
    if (pathname.startsWith("/patterns/")) return "Modules";
    if (pathname.startsWith("/foundations/")) return "Foundations";
    if (pathname === "/docs/tokens") return "Foundations";
    if (pathname === "/docs/components-overview") return "Components";
    return "Getting Started";
}

function getVersionLabel(_pathname: string): string {
    return UDS_RUNTIME_VERSION;
}

function sanitizeLine(value: string): string {
    return value.trim().replace(/\s+/g, " ");
}

function buildDescriptionLines(title: string, description?: string): [string, string, string] {
    const baseLine = sanitizeLine(
        description && description.length > 0
            ? description
            : `${title} provides a focused view of this area of the design system.`
    );

    const usageLine = sanitizeLine(
        `Use this page to understand when to apply ${title}, what patterns it supports, and how it fits into product workflows.`
    );

    const qualityLine = sanitizeLine(
        `Examples and guidance here are aligned to shared tokens, accessibility expectations, and the current system version contract.`
    );

    return [baseLine, usageLine, qualityLine];
}

export function PageHeaderMeta({ title, description, author = "@Michael-Stevens" }: PageHeaderMetaProps) {
    const { pathname } = useLocation();

    const section = useMemo(() => getSectionLabel(pathname), [pathname]);
    const version = useMemo(() => getVersionLabel(pathname), [pathname]);
    const breadcrumbItems = useMemo(
        () => [
            { label: "Unified Design System", href: "/getting-started" },
            { label: section, href: pathname.startsWith("/components/") ? "/docs/components-overview" : undefined },
            { label: title },
        ],
        [pathname, section, title]
    );
    const descriptionLines = useMemo(() => buildDescriptionLines(title, description), [title, description]);
    const descriptionText = useMemo(() => descriptionLines.join(" "), [descriptionLines]);
    const metadataItems = useMemo(
        () => [
            {
                id: "author",
                label: "Author",
                value: (
                    <Link href={AUTHOR_PROFILE_URL} external underline="hover">
                        {author}
                    </Link>
                ),
            },
            { id: "last-updated", label: "Last updated", value: AUTO_LAST_UPDATED },
            { id: "version", label: "Version", value: version },
        ],
        [author, version]
    );

    return (
        <Layout direction="column" gap="0" fullWidth>
            <Layout.Fill>
                <Layout direction="column" gap="16">
                    <Breadcrumb items={breadcrumbItems} />
                    <Text as="h1" variant="heading-32" weight="bold" leading="regular">
                        {title}
                    </Text>
                </Layout>
            </Layout.Fill>
            <Layout direction="row" gap="48" alignItems="flex-end" fullWidth>
                <Layout.Fill>

                    <Text as="p" variant="body-16" leading="regular">
                        {descriptionText}
                    </Text>
                </Layout.Fill>
            <DescriptionList
                items={metadataItems}
                density="compact"
                labelWidth="sm"
                fullWidth={false}
                variant="separators"
            />
            </Layout>
        </Layout>
    );
}
