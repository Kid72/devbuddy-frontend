import { test, expect } from '../utils/fixtures';

/**
 * News Detail Page Tests
 * Validates news article detail page functionality including:
 * - Navigation back to news list
 * - Article content rendering
 * - Error handling
 */

test.describe('News Detail Page', () => {
  test('should navigate back to news list when clicking "Back to News" button', async ({ unauthenticatedPage }) => {
    // Go to news list first
    await unauthenticatedPage.goto('/news');

    // Wait for articles to load
    await unauthenticatedPage.waitForSelector('article, [data-testid="news-card"]', { timeout: 10000 });

    // Get first article
    const articles = unauthenticatedPage.locator('article, [data-testid="news-card"]');
    const count = await articles.count();

    if (count > 0) {
      // Click first article
      await articles.first().click();

      // Should be on article detail page
      await expect(unauthenticatedPage).toHaveURL(/\/news\/.+/);

      // Find and click "Back to News" button
      const backButton = unauthenticatedPage.getByRole('button', { name: /back to news/i });
      await expect(backButton).toBeVisible();
      await backButton.click();

      // Should navigate back to /news (not /)
      await expect(unauthenticatedPage).toHaveURL('/news');

      // Should not be on home page
      const currentUrl = unauthenticatedPage.url();
      expect(currentUrl).not.toBe('/');
      expect(currentUrl).toContain('/news');
    }
  });

  test('should show error state and navigate back correctly when article not found', async ({ unauthenticatedPage }) => {
    // Go to a non-existent article
    await unauthenticatedPage.goto('/news/non-existent-article-id');

    // Should show error state
    await expect(
      unauthenticatedPage.getByText(/article not found|doesn't exist/i)
    ).toBeVisible({ timeout: 10000 });

    // Find and click "Back to News" button in error state
    const backButton = unauthenticatedPage.getByRole('button', { name: /back to news/i });

    if (await backButton.isVisible()) {
      await backButton.click();

      // Should navigate to /news (not /)
      await expect(unauthenticatedPage).toHaveURL('/news');
    }
  });

  test('should display article content correctly', async ({ unauthenticatedPage }) => {
    // Go to news list first
    await unauthenticatedPage.goto('/news');

    // Wait for articles to load
    await unauthenticatedPage.waitForSelector('article, [data-testid="news-card"]', { timeout: 10000 });

    // Click first article
    const articles = unauthenticatedPage.locator('article, [data-testid="news-card"]');
    const count = await articles.count();

    if (count > 0) {
      await articles.first().click();

      // Should show article title
      await expect(unauthenticatedPage.locator('h1')).toBeVisible();

      // Should show article category badge
      await expect(
        unauthenticatedPage.getByText('Technology').first()
      ).toBeVisible();
    }
  });

  test('should have sticky header with back button', async ({ unauthenticatedPage }) => {
    // Go to news list and navigate to an article
    await unauthenticatedPage.goto('/news');
    await unauthenticatedPage.waitForSelector('article, [data-testid="news-card"]', { timeout: 10000 });

    const articles = unauthenticatedPage.locator('article, [data-testid="news-card"]');
    const count = await articles.count();

    if (count > 0) {
      await articles.first().click();

      // Scroll down
      await unauthenticatedPage.evaluate(() => window.scrollTo(0, 500));

      // Back button should still be visible (sticky header)
      const backButton = unauthenticatedPage.getByRole('button', { name: /back to news/i });
      await expect(backButton).toBeVisible();
    }
  });
});
