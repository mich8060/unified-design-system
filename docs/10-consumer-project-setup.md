# Consumer Project Setup (Getting Started)

Use this guide when setting up a new app that consumes `@mich8060/unified-design-system`.

## 1) Install Dependencies

```bash
npm i @mich8060/unified-design-system react react-dom react-router-dom @phosphor-icons/react
```

## 2) Import UDS Styles Once

In your app entry file (for example `src/main.tsx`), import styles one time:

```tsx
import "@mich8060/unified-design-system/styles.css";
```

Without this import, components will render with major visual drift.

## 3) Wrap App with Router

`Menu` and some navigation flows require router context from `react-router-dom`.

```tsx
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@mich8060/unified-design-system/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

Use `BrowserRouter` from `react-router-dom`, not `react-router`.

## 4) Build with UDS Components

```tsx
import { AppShell, Menu, Flex, Text, Button } from "@mich8060/unified-design-system";

const navItems = [
  { label: "Home", icon: "House", path: "/" },
  { label: "Profile", icon: "User", path: "/profile" },
];

export default function App() {
  return (
    <AppShell brand="default" theme="light">
      <AppShell.Menu>
        <Menu navItems={navItems} showSearch={false} />
      </AppShell.Menu>
      <AppShell.Content>
        <AppShell.Main>
          <Flex direction="column" gap="16">
            <Text as="h1" variant="heading-32" weight="bold" leading="regular">
              Welcome
            </Text>
            <Button label="Get Started" appearance="primary" />
          </Flex>
        </AppShell.Main>
      </AppShell.Content>
    </AppShell>
  );
}
```

## 5) Common Pitfalls

- `Button` uses `appearance`, not `variant`.
- `Text` variants must match supported values (`heading-32`, `heading-24`, `body-16`, etc.).
- `Avatar` sizes are `small | default | large`.
- Icons use Phosphor PascalCase names (for example `House`, `CalendarBlank`).

## 6) Quick Troubleshooting

### Error: `useLocation() may be used only in the context of a <Router>`

Cause: app is not wrapped with `BrowserRouter` from `react-router-dom`.

### Icons do not render

Cause: missing `@phosphor-icons/react` dependency or invalid icon name.

### Components look unstyled

Cause: missing `@mich8060/unified-design-system/styles.css` import.

