import "@chghealthcare/unified-design-system/styles.css"

import {
  AppShell,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  Link,
  Medallion,
  Menu,
  Progress,
  Step,
  StepContent,
  StepMarker,
  Steps,
  TooltipProvider,
  UsersIcon,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "home", label: "Home" },
  { id: "jobs", label: "Jobs" },
  { id: "documents", label: "Documents" },
]

const walkthrough = [
  {
    index: 1,
    title: "Complete your profile",
    description: "Confirm specialty, NPI, and preferred locations so matches stay accurate.",
    action: "Continue profile",
  },
  {
    index: 2,
    title: "Upload credentials",
    description: "License, DEA, and malpractice documents unlock faster privileging.",
  },
  {
    index: 3,
    title: "Review open jobs",
    description: "Shortlist roles that fit your availability and compensation targets.",
  },
  {
    index: 4,
    title: "Meet your team",
    description: "Your recruiter and credentialing specialist stay available throughout onboarding.",
  },
] as const

export function ProviderPortalHomeExample() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="home"
            onNavigationSelect={() => {
              /* wire to router or state */
            }}
          />
        }
      >
        <AppShell.Main>
          <div className="flex min-w-0 flex-col gap-[length:var(--uds-gap-24)] p-[length:var(--uds-spacing-24)]">
            <Card className="flex flex-col gap-[length:var(--uds-gap-16)] rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-24)] sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Profile completion</p>
                <p className="mt-1 text-lg font-semibold text-foreground">You are 65% complete</p>
                <Progress value={65} className="mt-3 max-w-md" />
              </div>
              <Button>Finish profile</Button>
            </Card>

            <div className="grid grid-cols-1 gap-[length:var(--uds-gap-24)] lg:grid-cols-[445px_minmax(0,1fr)]">
              <div className="flex flex-col gap-[length:var(--uds-gap-16)]">
                <Card className="flex flex-row items-start gap-[length:var(--uds-gap-16)] rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                  <Avatar size="lg">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-[length:var(--uds-gap-12)] py-2">
                    <h2 className="text-xl font-bold text-foreground">Dr. Jordan Doe</h2>
                    <div className="flex flex-wrap gap-[length:var(--uds-gap-16)]">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-foreground">Specialty</span>
                        <Badge accent="transparent" appearance="outlined" shape="rect">
                          Emergency Medicine
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-foreground">NPI</span>
                        <Badge accent="transparent" appearance="outlined" shape="rect">
                          1234567890
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                  <div className="mb-3 flex items-center gap-2">
                    <Medallion color="blue" tone="pastel" shape="rounded" icon={<UsersIcon aria-hidden />} />
                    <h3 className="font-semibold text-foreground">My team</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Sam Rivera — Recruiter</li>
                    <li>Casey Nguyen — Credentialing</li>
                  </ul>
                  <Link href="#team" className="mt-3 inline-flex text-sm">
                    View contacts
                  </Link>
                </Card>

                <Card className="rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                  <h3 className="font-semibold text-foreground">Reminders</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Upload your CA license by Friday.</p>
                </Card>

                <Card className="rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-16)]">
                  <h3 className="font-semibold text-foreground">Quick links</h3>
                  <div className="mt-3 flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      Document vault
                    </Button>
                    <Button variant="outline" size="sm">
                      Availability
                    </Button>
                  </div>
                </Card>
              </div>

              <Card className="flex flex-col gap-[length:var(--uds-gap-24)] rounded-[length:var(--uds-radius-8)] p-[length:var(--uds-spacing-24)]">
                <h2 className="text-xl font-semibold text-foreground">What to expect</h2>
                <Steps className="gap-[length:var(--uds-gap-24)]">
                  {walkthrough.map((step) => (
                    <Step key={step.index} className="gap-[length:var(--uds-gap-16)]">
                      <StepMarker index={step.index} />
                      <StepContent>
                        <p className="text-base font-semibold text-foreground">{step.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                        {"action" in step && step.action ? (
                          <div className="py-3">
                            <Button variant="outline">{step.action}</Button>
                          </div>
                        ) : null}
                      </StepContent>
                    </Step>
                  ))}
                </Steps>
                <p className="text-sm text-muted-foreground">
                  Right-column variants may swap this `Steps` walkthrough for `MicroCalendar` availability or
                  `Accordion` job discovery — see the recipe.
                </p>
              </Card>
            </div>
          </div>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
