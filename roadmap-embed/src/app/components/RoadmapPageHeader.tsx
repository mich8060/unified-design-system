import type { ReactNode } from "react";
import {
  cn,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderContent,
  SectionHeaderDescription,
  SectionHeaderTitle,
} from "@chghealthcare/unified-design-system";
import { roadmapChrome } from "../roadmap-tokens";

export function RoadmapPageHeader({
  title,
  subtitle,
  toolbar,
  actions,
}: {
  title: string;
  subtitle: string;
  toolbar?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <SectionHeader
      className={cn(
        roadmapChrome.header,
        "fixed top-0 right-0 left-0 z-10 flex-col gap-4 min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between min-[720px]:gap-6",
      )}
      data-roadmap-header
    >
      <SectionHeaderContent>
        <SectionHeaderTitle className="text-[var(--uds-text-inverse)]">
          {title}
        </SectionHeaderTitle>
        <SectionHeaderDescription className="mt-1 text-uds-14 leading-snug text-[var(--uds-text-inverse)]/90">
          {subtitle}
        </SectionHeaderDescription>
      </SectionHeaderContent>
      {toolbar || actions ? (
        <SectionHeaderActions className="flex-wrap gap-3 sm:gap-4">
          {toolbar}
          {actions}
        </SectionHeaderActions>
      ) : null}
    </SectionHeader>
  );
}
