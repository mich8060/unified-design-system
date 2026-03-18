import { Button } from "../Button";
import { Divider } from "../Divider";
import { Layout } from "../Layout";
import { Status } from "../Status";
import { Tag } from "../Tag";
import { Text } from "../Text";
import "./_providers-card.scss";
import type { ProvidersCardProps } from "./ProvidersCard.types";

const hasContent = (value: unknown): boolean =>
    value !== undefined && value !== null && value !== false && value !== "";

export function ProvidersCard({
    name,
    specialty,
    location,
    availability,
    startDate,
    statusLabel,
    statusVariant = "green",
    avatarSrc,
    avatarInitials,
    tags = [],
    primaryAction,
    secondaryAction,
    className = "",
    ...rest
}: ProvidersCardProps) {
    const finalPrimaryAction =
        primaryAction ?? <Button label="Request Assignment" appearance="ghost" />;

    const classNames = ["uds-providers-card", className].filter(Boolean).join(" ");

    return (
        <div className={classNames} {...rest}>
            <Layout direction="column" gap="16">
                <Layout className="uds-providers-card__header" alignItems="flex-start" justifyContent="space-between" gap="12" wrap>
                    <Layout className="uds-providers-card__identity" alignItems="flex-start" justifyContent="flex-start" gap="10">
                        <Layout direction="column" gap="2">
                            <Text as="h3" variant="body-16" weight="bold" leading="regular">
                                {name}
                            </Text>
                            {hasContent(specialty) ? (
                                <Text as="p" variant="body-14" leading="regular" className="uds-providers-card__specialty">
                                    {specialty}
                                </Text>
                            ) : null}
                            {hasContent(location) ? (
                                <Text as="p" variant="body-14" leading="regular">
                                    {location}
                                </Text>
                            ) : null}

                            {hasContent(startDate) ? (
                                <Text as="p" variant="body-14" leading="regular">
                                    <strong>Start Date:</strong> {startDate}
                                </Text>
                            ) : null}
                        </Layout>
                    </Layout>
                    {hasContent(statusLabel) ? (
                        <Status label={statusLabel} variant={statusVariant} />
                    ) : null}
                </Layout>
                {tags.length > 0 ? (
                    <Layout className="uds-providers-card__tags" direction="column" gap="8" wrap>
                        <Text as="p" variant="body-14" weight="bold" leading="regular">
                            Provider progress:
                        </Text>
                        <Layout direction="row" gap="8" wrap>
                            {tags.map((tag) => (
                                <Tag key={`${tag.label}-${tag.color ?? "default"}`} label={tag.label} color="neutral" solid appearance="icon-left" icon="CircleDashed" />
                            ))}
                        </Layout>
                    </Layout>
                ) : null}
                <Layout direction="column" gap="8">
                    <Divider />
                    <Layout className="uds-providers-card__actions" alignItems="center" gap="8" wrap>
                        {finalPrimaryAction}
                        {secondaryAction ? secondaryAction : null}
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}
