import { Button, Code, Divider, Layout, ProvidersCard, Text, type ProvidersCardTag } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";

interface ProviderCardData {
  id: string;
  name: string;
  specialty: string;
  location: string;
  availability: string;
  startDate: string;
  statusLabel: string;
  statusVariant: string;
  tags: ProvidersCardTag[];
}

const PROVIDER_CARD_SNIPPET = `<ProvidersCard
  name="Dr. Jordan Reeves"
  specialty="Family Medicine"
  location="Phoenix, AZ"
  availability="Next available: Mar 12"
  startDate="03/18/2026"
  statusLabel="Available"
  statusVariant="green"
  tags={[
    { label: "Telehealth", color: "blue" },
    { label: "Locum", color: "purple" },
  ]}
  secondaryAction={<Button label="View Profile" appearance="outline" />}
  primaryAction={<Button label="Request Assignment" />}
/>`;

const PROVIDER_LIST_SNIPPET = `const providers = [
  {
    id: "provider-1",
    name: "Dr. Jordan Reeves",
    specialty: "Family Medicine",
    location: "Phoenix, AZ",
    availability: "Next available: Mar 12",
    startDate: "03/18/2026",
    statusLabel: "Available",
    statusVariant: "green",
  },
  // ...more providers
];

<Layout direction="column" gap="12">
  {providers.map((provider) => (
    <ProvidersCard
      key={provider.id}
      {...provider}
      secondaryAction={<Button label="View Profile" appearance="outline" />}
      primaryAction={<Button label="Request Assignment" />}
    />
  ))}
</Layout>`;

const PROVIDERS: ProviderCardData[] = [
  {
    id: "provider-1",
    name: "Dr. Jordan Reeves",
    specialty: "Family Medicine",
    location: "Phoenix, AZ",
    availability: "Next available: Mar 12",
    startDate: "03/18/2026",
    statusLabel: "Available",
    statusVariant: "green",
    tags: [
      { label: "Telehealth", color: "blue" },
      { label: "Locum", color: "purple" },
    ],
  },
  {
    id: "provider-2",
    name: "Dr. Alexis Hall",
    specialty: "Cardiology",
    location: "Denver, CO",
    availability: "Next available: Mar 18",
    startDate: "03/24/2026",
    statusLabel: "Reviewing",
    statusVariant: "orange",
    tags: [
      { label: "Travel Ready", color: "cyan" },
      { label: "Compact License", color: "indigo" },
    ],
  },
  {
    id: "provider-3",
    name: "Dr. Casey Morgan",
    specialty: "Hospitalist",
    location: "Nashville, TN",
    availability: "Waitlist",
    startDate: "04/02/2026",
    statusLabel: "Unavailable",
    statusVariant: "red",
    tags: [
      { label: "Night Shift", color: "magenta" },
      { label: "High Priority", color: "orange" },
    ],
  },
];

export function ProvidersCardPatternPage() {
  return (
    <DocPageLayout
      title="Providers Card"
      description="Providers Card is a module-level pattern for presenting a provider snapshot, availability, and quick actions."
    >
      <Layout direction="column" gap="32">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Single Card
          </Text>
          <ProvidersCard
            name={PROVIDERS[0].name}
            specialty={PROVIDERS[0].specialty}
            location={PROVIDERS[0].location}
            availability={PROVIDERS[0].availability}
            startDate={PROVIDERS[0].startDate}
            statusLabel={PROVIDERS[0].statusLabel}
            statusVariant={PROVIDERS[0].statusVariant}
            tags={PROVIDERS[0].tags}
            secondaryAction={<Button label="View Profile" appearance="outline" />}
            primaryAction={<Button label="Request Assignment" />}
          />
          <Code language="tsx" code={PROVIDER_CARD_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Provider Queue
          </Text>
          <Layout direction="column" gap="12">
            {PROVIDERS.map((provider) => (
              <ProvidersCard
                key={provider.id}
                name={provider.name}
                specialty={provider.specialty}
                location={provider.location}
                availability={provider.availability}
                startDate={provider.startDate}
                statusLabel={provider.statusLabel}
                statusVariant={provider.statusVariant}
                tags={provider.tags}
                secondaryAction={<Button label="View Profile" appearance="outline" />}
                primaryAction={<Button label="Request Assignment" />}
              />
            ))}
          </Layout>
          <Code language="tsx" code={PROVIDER_LIST_SNIPPET} />
        </Layout>
      </Layout>
    </DocPageLayout>
  );
}
