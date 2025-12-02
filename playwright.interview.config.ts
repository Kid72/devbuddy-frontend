import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, 'tests/.env.test') });
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright configuration for Interview Feature Tests
 * Uses API mocking instead of real backend, so no global setup needed
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/interview',

  // No global setup - using API mocks
  // globalSetup: undefined,

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 1,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Overall timeout for each test
  timeout: parseInt(process.env.TEST_TIMEOUT || '30000'),

  // Expect timeout
  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT || '5000'),
  },

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'test-results/interview-report' }],
    ['json', { outputFile: 'test-results/interview-results.json' }],
    ['list']
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: process.env.PLAYWRIGHT_SCREENSHOT as any || 'only-on-failure',

    // Video on failure
    video: process.env.PLAYWRIGHT_VIDEO as any || 'retain-on-failure',

    // Maximum time each action can take
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '10000'),

    // Browser context options
    viewport: { width: 1280, height: 720 },

    // Extra HTTP headers
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
