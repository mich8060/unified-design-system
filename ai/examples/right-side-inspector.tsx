import "@chghealthcare/unified-design-system/styles.css"

import {
  Badge,
  Button,
  DescriptionDetail,
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Status,
} from "@chghealthcare/unified-design-system"

/**
 * Right-side inspector: Required Header → Body → Footer.
 * Body scrolls; footer actions stay pinned in a horizontal row.
 * SheetTitle stays package 16 — do not upsize to PageHeaderTitle (28).
 * DescriptionList should be multi-row (not a sparse stub).
 * Prefer Sheet for desktop; Drawer uses the same three regions.
 */
export function RightSideInspectorExample({
  open = true,
  onOpenChange,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <div className="flex flex-col gap-[length:var(--uds-gap-8)] pr-8">
            <SheetTitle>Avery Stone</SheetTitle>
            <SheetDescription>Emergency medicine · Board certified</SheetDescription>
            <div className="flex flex-wrap items-center gap-[length:var(--uds-gap-8)]">
              <Status appearance="outlined" variant="success">
                Active
              </Status>
              <Badge accent="blue" appearance="pastel" shape="rect" size="sm">
                Locums
              </Badge>
            </div>
          </div>
        </SheetHeader>
        <SheetBody>
          <DescriptionList>
            <DescriptionRow>
              <DescriptionTerm>NPI</DescriptionTerm>
              <DescriptionDetail>1234567890</DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>Specialty</DescriptionTerm>
              <DescriptionDetail>Emergency Medicine</DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>State</DescriptionTerm>
              <DescriptionDetail>CO</DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>Next assignment</DescriptionTerm>
              <DescriptionDetail>St. Mary&apos;s — Aug 4</DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>Credentialing</DescriptionTerm>
              <DescriptionDetail>Packet complete · privileges verified</DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>Notes</DescriptionTerm>
              <DescriptionDetail>
                Prefers 7-on / 7-off. Confirm housing stipend before offer. Additional
                history and document links belong in this scrollable body so the footer
                stays visible.
              </DescriptionDetail>
            </DescriptionRow>
          </DescriptionList>
        </SheetBody>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Close
          </Button>
          <Button>Assign</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
