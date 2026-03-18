import { useMemo, useState } from "react";
import { Checklist, type ChecklistItem, Divider, Layout, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";

const BASE_STEPS: ChecklistItem[] = [
  { id: "identity", label: "Identity & Credentialing" },
  { id: "education", label: "Education & Training" },
  { id: "practice", label: "Practice History" },
  { id: "compliance", label: "Compliance & Background" },
  { id: "review", label: "Review & Sign" },
];

export function ChecklistPatternPage() {
  const [activeStepId, setActiveStepId] = useState(BASE_STEPS[0].id);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);

  const items = useMemo(
    () =>
      BASE_STEPS.map((item) => ({
        ...item,
        completed: completedStepIds.includes(item.id),
      })),
    [completedStepIds]
  );

  const activeStep = useMemo(
    () => BASE_STEPS.find((item) => item.id === activeStepId),
    [activeStepId]
  );

  const handleSelectStep = (item: ChecklistItem, index: number) => {
    setActiveStepId(item.id);
    setCompletedStepIds((prev) => {
      const next = new Set(prev);
      for (let i = 0; i <= index; i += 1) {
        next.add(BASE_STEPS[i].id);
      }
      return Array.from(next);
    });
  };

  return (
    <DocPageLayout
      title="Checklist"
      description="Checklist pattern for application-style sidebar progress. Selecting a step marks it complete."
    >
      <Layout alignItems="flex-start" gap="24" wrap>
        <Checklist
          title="Application"
          items={items}
          activeItemId={activeStepId}
          onItemSelect={handleSelectStep}
        />

        <Layout
          direction="column"
          gap="12"
          style={{
            flex: "1 1 320px",
            minHeight: "280px",
            border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
            borderRadius: "var(--uds-radius-8)",
            padding: "var(--uds-spacing-20)",
            background: "var(--uds-surface-primary)",
          }}
        >
          <Text as="h3" variant="heading-24" weight="medium" leading="regular">
            {activeStep?.label}
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Use this area for the content associated with the selected checklist step.
          </Text>
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <Text as="p" variant="body-14" leading="regular">
        Behavior: a completed step shows a filled indicator with a check icon.
      </Text>
    </DocPageLayout>
  );
}
