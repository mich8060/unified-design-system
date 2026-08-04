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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "settings", label: "Settings" },
  { id: "jobs", label: "Jobs" },
]

/**
 * Settings IA: in-Main vertical Tabs | content panel.
 * Distinct from AppShell Menu (product rail) and listview (collection drives Main).
 */
export function SettingsNavPanelExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={<Menu navigationItems={navigationItems} activeId="settings" onNavigationSelect={() => {}} />}
      >
        <AppShell.Main>
          <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
            <PageHeader layout="inline">
              <PageHeaderBody>
                <PageHeaderContent>
                  <PageHeaderTitle>Workspace settings</PageHeaderTitle>
                  <PageHeaderDescription>
                    Many settings sections use vertical Tabs plus a content panel — not the product
                    Menu rail and not AppShell listview.
                  </PageHeaderDescription>
                </PageHeaderContent>
                <PageHeaderActions>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save changes</Button>
                </PageHeaderActions>
              </PageHeaderBody>
            </PageHeader>

            <MainStack>
              <Tabs
                orientation="vertical"
                defaultValue="notifications"
                className="w-full gap-[length:var(--uds-gap-24)]"
              >
                <TabsList aria-label="Settings sections">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-0 min-w-0 flex-1">
                  <section className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                    <h2 className="text-[length:var(--uds-font-size-body)] font-semibold leading-snug">
                      Profile
                    </h2>
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
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 min-w-0 flex-1">
                  <section className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                    <h2 className="text-[length:var(--uds-font-size-body)] font-semibold leading-snug">
                      Notifications
                    </h2>
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
                    <Field>
                      <FieldLabel>Send daily digests</FieldLabel>
                      <FieldDescription>Summaries for subscribed roles at 07:00 local.</FieldDescription>
                      <FieldContent className="flex justify-start">
                        <Switch defaultChecked />
                      </FieldContent>
                    </Field>
                  </section>
                </TabsContent>

                <TabsContent value="security" className="mt-0 min-w-0 flex-1">
                  <section className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                    <h2 className="text-[length:var(--uds-font-size-body)] font-semibold leading-snug">
                      Security
                    </h2>
                    <Field>
                      <FieldLabel>Session timeout (minutes)</FieldLabel>
                      <FieldContent>
                        <Input type="number" defaultValue={30} />
                      </FieldContent>
                    </Field>
                  </section>
                </TabsContent>

                <TabsContent value="integrations" className="mt-0 min-w-0 flex-1">
                  <section className="flex min-w-0 flex-col gap-[length:var(--uds-gap-16)]">
                    <h2 className="text-[length:var(--uds-font-size-body)] font-semibold leading-snug">
                      Integrations
                    </h2>
                    <Field>
                      <FieldLabel>Webhook URL</FieldLabel>
                      <FieldContent>
                        <Input placeholder="https://" />
                      </FieldContent>
                    </Field>
                  </section>
                </TabsContent>
              </Tabs>
            </MainStack>
          </MainContent>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
