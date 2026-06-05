import {
  Alert,
  AlertContent,
  AlertTitle,
  Field,
  FieldLabel,
  Textarea,
} from "@chghealthcare/unified-design-system";
import type { RoadmapEvent } from "../roadmap-data";

export function RoadmapRiskFields({
  idPrefix,
  values,
  onChange,
  intro,
}: {
  idPrefix: string;
  intro: string;
  values: Pick<
    RoadmapEvent,
    "riskIssue" | "riskMitigation" | "riskNeededToUnblock"
  >;
  onChange: (patch: Partial<RoadmapEvent>) => void;
}) {
  return (
    <Alert className="border-[var(--uds-color-accent-amber-300)] bg-[var(--uds-color-accent-amber-25)]">
      <AlertContent className="w-full gap-4">
        <AlertTitle className="text-uds-12">{intro}</AlertTitle>
        <div className="flex w-full flex-col gap-4">
          <Field>
            <FieldLabel htmlFor={`${idPrefix}-risk-issue`}>
              What are the issues?
            </FieldLabel>
            <Textarea
              id={`${idPrefix}-risk-issue`}
              value={values.riskIssue ?? ""}
              onChange={(e) => onChange({ riskIssue: e.target.value })}
              rows={2}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${idPrefix}-risk-mitigation`}>
              What is being done now?
            </FieldLabel>
            <Textarea
              id={`${idPrefix}-risk-mitigation`}
              value={values.riskMitigation ?? ""}
              onChange={(e) => onChange({ riskMitigation: e.target.value })}
              rows={2}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${idPrefix}-risk-unblock`}>
              What is needed to unblock?
            </FieldLabel>
            <Textarea
              id={`${idPrefix}-risk-unblock`}
              value={values.riskNeededToUnblock ?? ""}
              onChange={(e) =>
                onChange({ riskNeededToUnblock: e.target.value })
              }
              rows={2}
            />
          </Field>
        </div>
      </AlertContent>
    </Alert>
  );
}
