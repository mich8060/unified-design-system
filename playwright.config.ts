import { defineConfig, devices } from "@playwright/test"

const PORT = 4173
const BASE_URL = `http://127.0.0.1:${PORT}`

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "docs-smoke",
      testMatch: /docs-smoke\/.*\.spec\.ts/,
    },
    {
      name: "visual",
      testMatch: /visual\/.*\.spec\.ts/,
      expect: {
        toHaveScreenshot: {
          maxDiffPixelRatio: 0.02,
          animations: "disabled",
        },
      },
    },
  ],
})
