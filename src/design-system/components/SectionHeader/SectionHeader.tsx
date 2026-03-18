import { Layout } from "../Layout";
import { Text } from "../Text";
import "./_section-header.scss";
import type { SectionHeaderProps } from "./SectionHeader.types";

export function SectionHeader({
    eyebrow,
    title,
    description,
    meta,
    actions,
    divider = false,
    className = "",
    ...rest
}: SectionHeaderProps) {
    const classNames = [
        "uds-section-header",
        divider && "uds-section-header--with-divider",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classNames} {...rest}>
            <Layout direction="column" gap="2" className="uds-section-header__content">
                {eyebrow ? (
                    <Text as="span" variant="body-12" weight="semibold" leading="regular" className="uds-section-header__eyebrow">
                        {eyebrow}
                    </Text>
                ) : null}
                <Text as="h2" variant="heading-24" weight="medium" leading="regular">
                    {title}
                </Text>
                {description ? (
                    <Text as="p" variant="body-16" leading="regular" className="uds-section-header__description">
                        {description}
                    </Text>
                ) : null}
                {meta ? (
                    <Layout alignItems="center" gap="8" wrap className="uds-section-header__meta">
                        {meta}
                    </Layout>
                ) : null}
            </Layout>
            {actions ? (
                <Layout alignItems="center" gap="8" wrap className="uds-section-header__actions">
                    {actions}
                </Layout>
            ) : null}
        </div>
    );
}
