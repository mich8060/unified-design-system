import React from "react";
import { ProvidersCard } from "./ProvidersCard";
import { Button } from "../Button";

export default { title: "Components/ProvidersCard", component: ProvidersCard };

export const Default = {
  args: {
    name: "Dr. Jordan Reeves",
    specialty: "Family Medicine",
    location: "Phoenix, AZ",
    availability: "Next available: Mar 12",
    statusLabel: "Available",
    statusVariant: "green",
    tags: [
      { label: "Telehealth", color: "blue" },
      { label: "Locum", color: "purple" },
    ],
  },
};

export const CustomActions = {
  args: {
    name: "Dr. Alexis Hall",
    specialty: "Cardiology",
    location: "Denver, CO",
    availability: "Next available: Mar 18",
    statusLabel: "Reviewing",
    statusVariant: "orange",
    tags: [
      { label: "Travel Ready", color: "cyan" },
      { label: "Compact License", color: "indigo" },
    ],
    secondaryAction: <Button label="Message" appearance="outline" />,
    primaryAction: <Button label="Shortlist" />,
  },
};
