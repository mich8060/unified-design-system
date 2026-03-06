# ProvidersCard

Tier: 3

Purpose:
- Presents a provider summary with identity, status, metadata, tags, and quick actions.

Basic usage:

```tsx
<ProvidersCard
  name="Dr. Jordan Reeves"
  specialty="Family Medicine"
  location="Phoenix, AZ"
  availability="Next available: Mar 12"
  statusLabel="Available"
  statusVariant="green"
  tags={[
    { label: "Telehealth", color: "blue" },
    { label: "Locum", color: "purple" },
  ]}
/>
```
