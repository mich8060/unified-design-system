import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Button,
  Field,
  FieldContent,
  FieldDescription,
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
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Status,
  Switch,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [{ id: "notifications", label: "Notifications" }]

/**
 * Settings form: MainContent fixed (1280/1000 reading column) + PageHeader + MainStack.
 * Group fields with SectionHeader — do not Card-wrap every field block.
 * Stack Fields by default; md:grid-cols-2 only for related pairs (e.g. first + last name).
 */
export function SettingsFormExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={<Menu navigationItems={navigationItems} activeId="notifications" onNavigationSelect={() => {}} />}
      >
        <AppShell.Main>
          <MainContent containment="fixed">
            <PageHeader layout="inline">
              <PageHeaderBody>
                <PageHeaderContent>
                  <PageHeaderTitle>Notification routing</PageHeaderTitle>
                  <PageHeaderDescription>
                    Keep configuration screens inside a fixed reading column. Group fields with
                    SectionHeader — do not wrap every block in a Card.
                  </PageHeaderDescription>
                </PageHeaderContent>
                <PageHeaderActions>
                  <Status variant="success">Production</Status>
                  <Button>Save changes</Button>
                </PageHeaderActions>
              </PageHeaderBody>
            </PageHeader>

            <MainStack>
              <section className="flex flex-col gap-[length:var(--uds-gap-16)]">
                <SectionHeader>
                  <SectionHeaderContent>
                    <SectionHeaderTitle>Delivery</SectionHeaderTitle>
                    <SectionHeaderDescription>
                      Sender identity and escalation policy for outbound alerts.
                    </SectionHeaderDescription>
                  </SectionHeaderContent>
                </SectionHeader>

                <Field>
                  <FieldLabel>Email sender</FieldLabel>
                  <FieldContent>
                    <Input placeholder="staffing@unified.example" />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Escalation policy</FieldLabel>
                  <FieldContent>
                    <Select defaultValue="high-touch">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-touch">High touch</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
              </section>

              <section className="flex flex-col gap-[length:var(--uds-gap-16)]">
                <SectionHeader>
                  <SectionHeaderContent>
                    <SectionHeaderTitle>Contact</SectionHeaderTitle>
                    <SectionHeaderDescription>
                      Related name fields share a row; unrelated fields stay stacked.
                    </SectionHeaderDescription>
                  </SectionHeaderContent>
                </SectionHeader>

                <div className="grid gap-[length:var(--uds-gap-16)] md:grid-cols-2">
                  <Field>
                    <FieldLabel>First name</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Alex" />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel>Last name</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Rivera" />
                    </FieldContent>
                  </Field>
                </div>
              </section>

              <section className="flex flex-col gap-[length:var(--uds-gap-16)]">
                <SectionHeader>
                  <SectionHeaderContent>
                    <SectionHeaderTitle>Digests</SectionHeaderTitle>
                    <SectionHeaderDescription>
                      Use Switch and Status for stateful configuration instead of ad hoc badges.
                    </SectionHeaderDescription>
                  </SectionHeaderContent>
                </SectionHeader>

                <Field>
                  <FieldLabel>Send daily digests</FieldLabel>
                  <FieldDescription>Summaries arrive at 07:00 local time for subscribed roles.</FieldDescription>
                  <FieldContent className="flex justify-start">
                    <Switch defaultChecked />
                  </FieldContent>
                </Field>
              </section>
            </MainStack>
          </MainContent>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
