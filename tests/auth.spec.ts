import { test, expect } from '@playwright/test';
import { loginWithEmail, logout, isAuthenticated, createTestUser } from './utils/auth';

/**
 * Authentication Flow Tests
 * Tests for login, logout, session persistence, and OAuth flows
 */

test.describe('Authentication Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies();
  });

  test('should redirect to login when not authenticated', async ({ page }) => {
    // Try to access protected route
    await page.goto('/cv');

    // Should redirect to login or show login prompt
    await expect(page).toHaveURL(/\/(login|signin|auth)/);

    // Or check for login button using specific test ID
    await expect(page.getByTestId('auth-submit-button')).toBeVisible();
  });

  test('should show email/password login form', async ({ page }) => {
    await page.goto('/login');

    // Check for email and password inputs
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();

    // Check for sign in button using specific test ID
    await expect(page.getByTestId('auth-submit-button')).toBeVisible();

    // Check for sign up toggle
    await expect(page.getByText(/don't have an account/i)).toBeVisible();
  });

  // OAuth tests disabled for local development
  test.skip('Google OAuth not used in local development', async ({ page }) => {
    // OAuth tests are skipped for local email/password auth
  });

  test.skip('GitHub OAuth not used in local development', async ({ page }) => {
    // OAuth tests are skipped for local email/password auth
  });

  test('should login with email and password', async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
    const testPassword = process.env.TEST_USER_PASSWORD || 'Test123!';

    // Login with test credentials
    await loginWithEmail(page, testEmail, testPassword);

    // Verify user is authenticated
    const authenticated = await isAuthenticated(page);
    expect(authenticated).toBe(true);
  });

  test('should persist session across page refreshes', async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
    const testPassword = process.env.TEST_USER_PASSWORD || 'Test123!';

    // Login
    await loginWithEmail(page, testEmail, testPassword);

    await page.waitForURL('/cv');

    // Refresh page
    await page.reload();

    // Should still be authenticated
    const authenticated = await isAuthenticated(page);
    expect(authenticated).toBe(true);

    // Should still be on CV page
    await expect(page).toHaveURL('/cv');
  });

  test('should show user menu after login', async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
    const testPassword = process.env.TEST_USER_PASSWORD || 'Test123!';

    // Login
    await loginWithEmail(page, testEmail, testPassword);

    // Wait for CV page
    await page.waitForURL('/cv');

    // Check for user menu
    const userMenu = page.getByTestId('user-menu');
    await expect(userMenu).toBeVisible();
  });

  test('should logout and clear session', async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
    const testPassword = process.env.TEST_USER_PASSWORD || 'Test123!';

    // Login first
    await loginWithEmail(page, testEmail, testPassword);

    await page.waitForURL('/cv');

    // Logout
    await logout(page);

    // Should redirect to home
    await expect(page).toHaveURL('/');

    // Verify not authenticated
    const authenticated = await isAuthenticated(page);
    expect(authenticated).toBe(false);
  });

  test('should not access protected routes after logout', async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
    const testPassword = process.env.TEST_USER_PASSWORD || 'Test123!';

    // Login
    await loginWithEmail(page, testEmail, testPassword);

    await page.waitForURL('/cv');

    // Logout
    await logout(page);

    // Try to access protected route
    await page.goto('/cv');

    // Should redirect to login
    await expect(page).toHaveURL(/\/(login|signin|auth)/);
  });

  test('should handle authentication errors gracefully', async ({ page }) => {
    await page.goto('/login');

    // Try to login with invalid credentials
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.getByTestId('auth-submit-button').click();

    // Should show error message
    await expect(page.getByText(/invalid/i)).toBeVisible();

    // Should still be on login page
    await expect(page).toHaveURL('/login');
  });
});
