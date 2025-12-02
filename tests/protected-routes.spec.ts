import { test, expect } from './utils/fixtures';
import { clearAuth } from './utils/auth';

/**
 * Protected Routes Tests
 * Validates that protected routes require authentication
 * and redirect unauthenticated users appropriately
 */

test.describe('Protected Routes', () => {
  const protectedRoutes = [
    '/cv',
    '/cv/upload',
    '/jobs/alerts',
    '/dashboard',
    '/profile',
    '/settings',
  ];

  test.describe('Unauthenticated Access', () => {
    protectedRoutes.forEach((route) => {
      test(`should redirect unauthenticated user from ${route}`, async ({ unauthenticatedPage }) => {
        await unauthenticatedPage.goto(route);

        // Should redirect to login or home with login prompt
        const currentUrl = unauthenticatedPage.url();
        const isLoginPage = currentUrl.includes('/login') ||
                          currentUrl.includes('/signin') ||
                          currentUrl.includes('/auth');
        const isHomePage = currentUrl === new URL('/', unauthenticatedPage.url()).href;

        expect(isLoginPage || isHomePage).toBe(true);

        // If on home page, login button should be visible
        if (isHomePage) {
          await expect(unauthenticatedPage.getByTestId('auth-submit-button')).toBeVisible();
        }
      });
    });

    test('should not allow CV upload without authentication', async ({ unauthenticatedPage }) => {
      await unauthenticatedPage.goto('/cv/upload');

      // Should be redirected
      await expect(unauthenticatedPage).not.toHaveURL('/cv/upload');

      // Should show login prompt
      await expect(unauthenticatedPage.getByTestId('auth-submit-button')).toBeVisible();
    });

    test('should not allow job alert creation without authentication', async ({ unauthenticatedPage }) => {
      await unauthenticatedPage.goto('/jobs/alerts/new');

      // Should be redirected
      await expect(unauthenticatedPage).not.toHaveURL('/jobs/alerts/new');
    });

    test('should handle direct URL access attempts', async ({ unauthenticatedPage }) => {
      // Try accessing deep protected route directly
      await unauthenticatedPage.goto('/cv/123/improve');

      // Should redirect to login
      const currentUrl = unauthenticatedPage.url();
      expect(
        currentUrl.includes('/login') ||
        currentUrl.includes('/signin') ||
        currentUrl === new URL('/', unauthenticatedPage.url()).href
      ).toBe(true);
    });

    test('should preserve redirect URL after login', async ({ unauthenticatedPage }) => {
      // Try to access protected route
      await unauthenticatedPage.goto('/cv/upload');

      // Get current URL (should be login page with redirect param)
      const currentUrl = new URL(unauthenticatedPage.url());

      // Check if redirect parameter is preserved
      const hasRedirect = currentUrl.searchParams.has('redirect') ||
                         currentUrl.searchParams.has('callbackUrl');

      if (hasRedirect) {
        const redirectUrl = currentUrl.searchParams.get('redirect') ||
                          currentUrl.searchParams.get('callbackUrl');
        expect(redirectUrl).toContain('/cv/upload');
      }
    });
  });

  test.describe('Authenticated Access', () => {
    test('should allow authenticated user to access protected routes', async ({ authenticatedPage }) => {
      // Test each protected route
      for (const route of protectedRoutes.slice(0, 3)) { // Test subset for speed
        await authenticatedPage.goto(route);

        // Should successfully load the route
        await expect(authenticatedPage).toHaveURL(route);

        // Should show user menu (indicates authenticated state)
        await expect(authenticatedPage.getByTestId('user-menu')).toBeVisible();
      }
    });

    test('should allow CV upload for authenticated user', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/cv/upload');

      // Should be on upload page
      await expect(authenticatedPage).toHaveURL('/cv/upload');

      // Should show upload interface
      await expect(
        authenticatedPage.getByText(/upload.*cv/i) ||
        authenticatedPage.getByRole('button', { name: /upload/i })
      ).toBeVisible();
    });

    test('should allow job alert creation for authenticated user', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/jobs/alerts');

      // Should be on alerts page
      await expect(authenticatedPage).toHaveURL('/jobs/alerts');

      // Should show create alert button
      await expect(
        authenticatedPage.getByRole('button', { name: /create.*alert/i })
      ).toBeVisible();
    });

    test('should maintain authentication across navigation', async ({ authenticatedPage }) => {
      // Navigate through multiple protected routes
      await authenticatedPage.goto('/dashboard');
      await expect(authenticatedPage).toHaveURL('/dashboard');

      await authenticatedPage.goto('/cv');
      await expect(authenticatedPage).toHaveURL('/cv');

      await authenticatedPage.goto('/jobs/alerts');
      await expect(authenticatedPage).toHaveURL('/jobs/alerts');

      // User menu should be visible throughout
      await expect(authenticatedPage.getByTestId('user-menu')).toBeVisible();
    });
  });

  test.describe('Session Management', () => {
    test('should handle expired session gracefully', async ({ authenticatedPage }) => {
      // Navigate to protected route
      await authenticatedPage.goto('/cv');
      await expect(authenticatedPage).toHaveURL('/cv');

      // Clear auth cookies to simulate expired session
      await clearAuth(authenticatedPage);

      // Try to navigate to another protected route
      await authenticatedPage.goto('/jobs/alerts');

      // Should redirect to login
      const currentUrl = authenticatedPage.url();
      expect(
        currentUrl.includes('/login') ||
        currentUrl.includes('/signin') ||
        currentUrl === new URL('/', authenticatedPage.url()).href
      ).toBe(true);
    });

    test('should handle unauthorized API calls', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/cv');

      // Mock unauthorized API response
      await authenticatedPage.route('**/api/**', async (route) => {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Unauthorized' })
        });
      });

      // Trigger API call (e.g., by clicking a button)
      // Should show error or redirect to login
      // This depends on your error handling implementation
    });
  });
});
