import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Button,
  Field,
  FieldContent,
  FieldLabel,
  Input,
  MainContent,
  MainStack,
  Menu,
  PageHeader,
  PageHeaderActions,
  PageHeaderBody,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
  Textarea,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [{ id: "requests", label: "Requests" }]

/**
 * Focused task: fixed MainContent + intentionally narrow prose column
 * (`--uds-container-prose` 640). Do not stretch a short form across full width.
 */
export function NarrowFormExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={<Menu navigationItems={navigationItems} activeId="requests" onNavigationSelect={() => {}} />}
      >
        <AppShell.Main>
          <MainContent containment="fixed">
            <PageHeader layout="inline">
              <PageHeaderBody>
                <PageHeaderContent>
                  <PageHeaderTitle>Request coverage exception</PageHeaderTitle>
                  <PageHeaderDescription>
                    A single focused task stays in a comfortable reading width — not stretched
                    across the full Main canvas.
                  </PageHeaderDescription>
                </PageHeaderContent>
                <PageHeaderActions>
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit request</Button>
                </PageHeaderActions>
              </PageHeaderBody>
            </PageHeader>

            <MainStack>
              <div className="flex w-full max-w-[length:var(--uds-container-prose)] flex-col gap-[length:var(--uds-gap-16)]">
                <Field>
                  <FieldLabel>Facility</FieldLabel>
                  <FieldContent>
                    <Input placeholder="Mercy General" />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>Shift dates</FieldLabel>
                  <FieldContent>
                    <Input placeholder="Aug 12 – Aug 19" />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>Reason</FieldLabel>
                  <FieldContent>
                    <Textarea placeholder="Brief context for the ops reviewer…" rows={4} />
                  </FieldContent>
                </Field>
              </div>
            </MainStack>
          </MainContent>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
