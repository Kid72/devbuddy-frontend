import { test as base, Page } from '@playwright/test';
import { getAuthStatePath, loginWithEmail } from './auth';
import path from 'path';

/**
 * Custom Playwright fixtures for DevBuddy tests
 * Extends base test with authenticated page and other utilities
 */

type DevBuddyFixtures = {
  authenticatedPage: Page;
  unauthenticatedPage: Page;
};

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<DevBuddyFixtures>({
  /**
   * Authenticated page fixture
   * Provides a page that's already logged in
   * NOTE: Always creates fresh context and logs in to ensure HTTP-only cookies are set
   * properly by Supabase SSR. StorageState only transfers localStorage, not cookies.
   */
  authenticatedPage: async ({ browser }, use) => {
    // Always create fresh context and login
    // This ensures cookies are set properly by Supabase SSR
    const context = await browser.newContext();
    const page = await context.newPage();

    // Login with email - this will set HTTP-only cookies that the middleware needs
    await loginWithEmail(page, 'test@example.com', 'testpassword123');

    // Use the authenticated page for tests
    await use(page);
    await context.close();
  },

  /**
   * Unauthenticated page fixture
   * Provides a clean page with no auth
   */
  unauthenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';

/**
 * Test data helpers
 */
export const testData = {
  users: {
    validUser: {
      email: 'test@example.com',
      password: 'Test123!@#',
      name: 'Test User',
    },
    invalidUser: {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    },
  },

  cv: {
    samplePdfPath: path.join(__dirname, '../fixtures/sample-cv.pdf'),
  },

  jobs: {
    sampleAlert: {
      keywords: 'Senior Developer, React, TypeScript',
      location: 'Remote',
      minSalary: 100000,
    },
  },
};

/**
 * Common test helpers
 */
export const helpers = {
  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(page: Page, timeout = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  },

  /**
   * Take screenshot with timestamp
   */
  async takeTimestampedScreenshot(page: Page, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
  },

  /**
   * Wait for API response
   */
  async waitForApiResponse(page: Page, urlPattern: string | RegExp) {
    return await page.waitForResponse(
      (response) => {
        const url = response.url();
        if (typeof urlPattern === 'string') {
          return url.includes(urlPattern);
        }
        return urlPattern.test(url);
      },
      { timeout: 30000 }
    );
  },

  /**
   * Fill form and submit
   */
  async fillAndSubmitForm(page: Page, formData: Record<string, string>, submitButtonText = 'Submit') {
    for (const [name, value] of Object.entries(formData)) {
      await page.fill(`[name="${name}"]`, value);
    }
    await page.getByRole('button', { name: submitButtonText }).click();
  },
};
