import type { ReactNode } from "react";
import { Button } from "../Button";
import { Divider } from "../Divider";
import { Flex } from "../Flex";
import { Status } from "../Status";
import { Tag } from "../Tag";
import { Text } from "../Text";
import "./_providers-card.scss";
import type { ProvidersCardProps } from "./ProvidersCard.types";

const hasContent = (value: unknown): boolean =>
    value !== undefined && value !== null && value !== false && value !== "";

const getInitials = (name: ReactNode, fallback?: string): string | undefined => {
    if (fallback && fallback.trim().length > 0) {
        return fallback.trim().slice(0, 2).toUpperCase();
    }

    if (typeof name !== "string") {
        return undefined;
    }

    const initials = name
        .split(" ")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return initials || undefined;
};

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
            <Flex direction="column" gap="16">
                <Flex className="uds-providers-card__header" alignItems="flex-start" justifyContent="space-between" gap="12" wrap>
                    <Flex className="uds-providers-card__identity" alignItems="flex-start" justifyContent="flex-start" gap="10">
                        <Flex direction="column" gap="2">
                            <Text as="h3" variant="body-16" weight="bold" leading="regular">
                                {name}
                            </Text>
                            {hasContent(specialty) ? (
                                <Text as="p" variant="body-14" leading="regular" style={{ color: "var(--uds-text-secondary)" }}>
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
                        </Flex>
                    </Flex>
                    {hasContent(statusLabel) ? (
                        <Status label={statusLabel} variant={statusVariant} />
                    ) : null}
                </Flex>
                {tags.length > 0 ? (
                    <Flex className="uds-providers-card__tags" direction="column" gap="8" wrap>
                        <Text as="p" variant="body-14" weight="bold" leading="regular">
                            Provider progress:
                        </Text>
                        <Flex direction="row" gap="8" wrap>
                            {tags.map((tag) => (
                                <Tag key={`${tag.label}-${tag.color ?? "default"}`} label={tag.label} color="neutral" solid appearance="icon-left" icon="CircleDashed" />
                            ))}
                        </Flex>
                    </Flex>
                ) : null}
                <Flex direction="column" gap="8">
                    <Divider />
                    <Flex className="uds-providers-card__actions" alignItems="center" gap="8" wrap>
                        {finalPrimaryAction}
                        {secondaryAction ? secondaryAction : null}
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}
