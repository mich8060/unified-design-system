import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  cn,
} from "@chghealthcare/unified-design-system";

const ADDITIONAL_CAPACITY_BOX_WIDTH = "min(36rem, calc(100vw - 48px))";

export function RoadmapCapacityCallout({
  explanation,
  leftPx,
  bottomPx,
}: {
  explanation: string;
  leftPx: number;
  bottomPx: number;
}) {
  return (
    <Card
      size="sm"
      className={cn(
        "fixed z-[35] max-w-[min(36rem,calc(100vw-48px))] rounded-[length:var(--uds-radius-8)] py-0 shadow-md",
      )}
      style={{
        left: leftPx,
        bottom: bottomPx,
        width: ADDITIONAL_CAPACITY_BOX_WIDTH,
      }}
    >
      <CardContent className="px-3 py-2">
        <CardTitle className="text-uds-14">Additional Capacity</CardTitle>
        <CardDescription className="text-uds-12 leading-snug">
          {explanation}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
