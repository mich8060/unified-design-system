import { cn, Text } from "@chghealthcare/unified-design-system";
import { roadmapChrome } from "../roadmap-tokens";

interface WeekLinesProps {
  hasStartDivider?: boolean;
  hasEndDivider?: boolean;
  weekCount: number;
}

function WeekLines({
  hasStartDivider = true,
  hasEndDivider = true,
  weekCount,
}: WeekLinesProps) {
  const weekDividers = Array.from({ length: weekCount + 1 }, (_, i) => {
    const isFirst = i === 0;
    const isLast = i === weekCount;
    const isSolid =
      (isFirst && hasStartDivider) || (isLast && hasEndDivider);

    return (
      <div
        key={i}
        className="relative flex h-0 w-0 shrink-0 items-center justify-center self-start"
        style={{
          borderRight:
            isFirst || isLast
              ? "none"
              : "1px dashed var(--uds-border-tertiary)",
          height: "100%",
          opacity: isSolid ? 0.4 : 0.3,
        }}
      />
    );
  });

  return (
    <div
      className="relative mb-[-17px] flex w-full min-h-px min-w-px flex-[1_0_0] content-stretch items-start justify-between"
      data-name="Lines"
      style={{ marginTop: "-50px" }}
    >
      {weekDividers}
    </div>
  );
}

function getWeeksInMonth(monthName: string): number {
  const weeksMap: Record<string, number> = {
    January: 4,
    February: 4,
    March: 5,
    April: 4,
    May: 4,
    June: 4,
    July: 5,
    August: 4,
    September: 4,
    October: 5,
    November: 4,
    December: 4,
  };
  return weeksMap[monthName] || 4;
}

interface MonthProps {
  name: string;
  hasStartDivider?: boolean;
  hasEndDivider?: boolean;
  isLastInQuarter?: boolean;
}

function Month({
  name,
  hasStartDivider = true,
  hasEndDivider = true,
  isLastInQuarter = false,
}: MonthProps) {
  const weekCount = getWeeksInMonth(name);

  return (
    <div
      className="relative flex h-full min-h-px min-w-px flex-[1_0_0] flex-col content-stretch items-center pb-[17px]"
      data-name="Month"
    >
      <WeekLines
        hasStartDivider={hasStartDivider}
        hasEndDivider={hasEndDivider}
        weekCount={weekCount}
      />
      {!isLastInQuarter ? (
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-px",
            roadmapChrome.timelineQuarterRule,
          )}
        />
      ) : null}
    </div>
  );
}

interface QuarterlyProps {
  label: string;
  months: [string, string, string];
  leftPosition: number;
}

export function Quarterly({
  label,
  months,
  leftPosition,
}: QuarterlyProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 z-10 flex flex-col items-center border-r border-[var(--uds-border-primary)] opacity-40",
      )}
      style={{
        left: `${leftPosition}px`,
        width: "600px",
        top: "92px",
      }}
      data-name="Quarterly"
      data-roadmap-quarter={label}
      data-roadmap-quarter-start={leftPosition}
    >
      <div className="relative flex w-full min-h-px min-w-px flex-[1_0_0] content-stretch items-start">
        <Month
          name={months[0] as string}
          hasStartDivider
          hasEndDivider
          isLastInQuarter={false}
        />
        <Month name={months[1] as string} hasEndDivider isLastInQuarter={false} />
        <Month
          name={months[2] as string}
          hasEndDivider={leftPosition + 600 >= 2400}
          isLastInQuarter
        />
      </div>
    </div>
  );
}

export function QuarterlyTimeline() {
  const quarters = [
    {
      label: "Q1",
      months: ["January", "February", "March"] as [string, string, string],
      leftPosition: 0,
    },
    {
      label: "Q2",
      months: ["April", "May", "June"] as [string, string, string],
      leftPosition: 600,
    },
    {
      label: "Q3",
      months: ["July", "August", "September"] as [string, string, string],
      leftPosition: 1200,
    },
    {
      label: "Q4",
      months: ["October", "November", "December"] as [string, string, string],
      leftPosition: 1800,
    },
    {
      label: "Q1 2027",
      months: ["January", "February", "March"] as [string, string, string],
      leftPosition: 2400,
    },
  ];

  return (
    <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
      <div
        className={cn(
          "sticky top-0 left-0 z-100 h-[100px] w-[3000px] border-b",
          roadmapChrome.timelineSticky,
        )}
      >
        {quarters.map((quarter) => (
          <div key={quarter.label}>
            <Text
              as="p"
              appearance="secondary"
              size="14"
              weight="semibold"
              className="absolute text-center whitespace-nowrap"
              style={{
                left: `${quarter.leftPosition}px`,
                width: "600px",
                top: "24px",
              }}
            >
              {quarter.label}
            </Text>
            {quarter.months.map((month, idx) => (
              <Text
                key={`${quarter.label}-${month}`}
                as="p"
                appearance="secondary"
                size="14"
                weight="semibold"
                className="absolute text-center whitespace-nowrap"
                style={{
                  left: `${quarter.leftPosition + idx * 200}px`,
                  width: "200px",
                  top: "73px",
                }}
              >
                {month}
              </Text>
            ))}
            <div
              className={cn(
                "absolute top-0 bottom-0 w-px",
                roadmapChrome.timelineQuarterRule,
              )}
              style={{ left: `${quarter.leftPosition + 599}px` }}
            />
          </div>
        ))}
      </div>

      {quarters.map((quarter) => (
        <Quarterly
          key={quarter.label}
          label={quarter.label}
          months={quarter.months}
          leftPosition={quarter.leftPosition}
        />
      ))}
    </div>
  );
}
