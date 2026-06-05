import type { ReactNode } from "react";
import {
  Badge,
  Link,
  cn,
  type BadgeAccent,
} from "@chghealthcare/unified-design-system";
import { udsLinkClass } from "./uds-link";

const statusBadgeConfig: Record<
  string,
  { accent: BadgeAccent; appearance: "solid" | "pastel" }
> = {
  "In Progress": { accent: "green", appearance: "solid" },
  "At Risk": { accent: "yellow", appearance: "solid" },
  Blocked: { accent: "red", appearance: "solid" },
  Pending: { accent: "neutral", appearance: "pastel" },
};

export function RoadmapStatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const config =
    statusBadgeConfig[status] ?? ({ accent: "neutral", appearance: "solid" } as const);
  const pendingDetail = status === "Pending" && className?.includes("executive-badge-pending");

  return (
    <Badge
      accent={config.accent}
      appearance={pendingDetail ? "solid" : config.appearance}
      shape="pill"
      className={cn(
        "max-w-full whitespace-nowrap",
        status === "In Progress" && "executive-badge-lime",
        pendingDetail && "executive-badge-pending",
        className,
      )}
    >
      {status}
    </Badge>
  );
}

export type RoadmapRiskDetail = {
  issues: string;
  currentlyDoing: string;
  neededToUnblock: string;
};

export type RoadmapStatusRow = {
  initiative: string;
  status: string;
  outcome: ReactNode;
  milestone: string;
  /** Present for At Risk / Blocked rows — drives Key Risks section */
  riskDetail?: RoadmapRiskDetail;
};

export const roadmapStatusRows: RoadmapStatusRow[] = [
  {
    initiative: "React Production Baseline",
    status: "In Progress",
    outcome: (
      <>
        Teams can build directly from DS React components.{" "}
        <Link href="/docs/introduction" className={udsLinkClass}>
          Documentation
        </Link>
      </>
    ),
    milestone: "Component library expansion",
  },
  {
    initiative: "Documents AISquad Pilot",
    status: "In Progress",
    outcome: (
      <>
        Validated DS → React delivery model.{" "}
        <Link href="https://documents-aisquad.vercel.app/" className={udsLinkClass} external>
          Prototype
        </Link>
      </>
    ),
    milestone: "React component validation",
  },
  {
    initiative: "Partnership Model",
    status: "At Risk",
    outcome: "Clear ownership, standards, and scaling model",
    milestone: "Resourcing decision needed",
    riskDetail: {
      issues:
        "Ownership, escalation, and contribution rules are not yet anchored with executive sponsors. One person still spans design-system design and engineering, so adoption work competes with foundation delivery and will not scale past current pilot volume. We are still trying to find partners in Product and Engineering who can act as partners—carrying day-to-day alignment on what ships, when exceptions apply, and how partner requests flow into the design system team.",
      currentlyDoing:
        "Drafting governance guardrails, supporting the Documents MVT pilot, and sequencing RFCs and contribution paths. Surfacing capacity data to leadership so tradeoffs (depth vs. breadth) are explicit, and socializing the need for named Product and Engineering partners roles.",
      neededToUnblock:
        "Product:\n• Name a product partners to co-own intake and prioritization for design-system work against roadmap tradeoffs.\n• Represent partner teams in governance forums and help socialize standards and adoption expectations.\n\nEngineering:\n• Name an engineering partners to co-sign technical standards, review contributions, and answer implementation questions quickly.\n• Align sprint capacity for shared fixes and migrations that depend on the React baseline.\n\nBeyond liaisons: a leadership decision on dedicated system ownership and FTE allocation, plus agreement on operating cadence (review board, intake, exceptions). Without that, the Roadmap Status milestone “Resourcing decision needed” cannot close.",
    },
  },
  {
    initiative: "Locumsmart Deployment",
    status: "Pending",
    outcome: "First full product running on DS patterns",
    milestone: "Tier rollout",
  },
  {
    initiative: "Usage Standardization",
    status: "In Progress",
    outcome: "Consistent system adoption across teams",
    milestone: "Adoption guidelines",
  },
];

export function roadmapRowsWithRiskDetail(): RoadmapStatusRow[] {
  return roadmapStatusRows.filter(
    (r) =>
      r.riskDetail &&
      (r.status === "At Risk" || r.status === "Blocked"),
  );
}
