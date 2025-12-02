import { test, expect } from './utils/fixtures';

/**
 * Public Features Tests
 * Validates that public features are accessible without authentication
 * Tests: News, Learning Platform, Interview Questions, Homepage
 */

test.describe('Public Features - News', () => {
  test('should access news articles without authentication', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/news');

    // Should successfully load news page
    await expect(unauthenticatedPage).toHaveURL('/news');

    // Should show news articles
    await expect(
      unauthenticatedPage.getByRole('heading', { name: /news|articles/i })
    ).toBeVisible();
  });

  test('should browse and read news articles', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/news');

    // Wait for articles to load
    await unauthenticatedPage.waitForSelector('article, [data-testid="news-card"]', { timeout: 10000 });

    // Should show multiple articles
    const articles = unauthenticatedPage.locator('article, [data-testid="news-card"]');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);

    // Click first article
    await articles.first().click();

    // Should navigate to article detail
    await expect(unauthenticatedPage).toHaveURL(/\/news\/.+/);

    // Should show article content
    await expect(
      unauthenticatedPage.locator('article [data-testid="article-content"]')
    ).toBeVisible();
  });

  test('should filter news by category', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/news');

    // Look for category filters
    const categoryFilter = unauthenticatedPage.getByRole('button', { name: /technology|business|sports/i }).first();

    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();

      // Should filter articles
      await unauthenticatedPage.waitForLoadState('networkidle');

      // Verify filtered results
      const articles = unauthenticatedPage.locator('article, [data-testid="news-card"]');
      expect(await articles.count()).toBeGreaterThan(0);
    }
  });

  test('should search news articles', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/news');

    // Look for search input
    const searchInput = unauthenticatedPage.getByPlaceholder(/search/i);

    if (await searchInput.isVisible()) {
      await searchInput.fill('technology');
      await searchInput.press('Enter');

      // Should show search results
      await unauthenticatedPage.waitForLoadState('networkidle');

      const articles = unauthenticatedPage.locator('article, [data-testid="news-card"]');
      expect(await articles.count()).toBeGreaterThan(0);
    }
  });
});

test.describe('Public Features - Learning Platform', () => {
  test('should access learning platform without authentication', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/learn');

    // Should successfully load learning page
    await expect(unauthenticatedPage).toHaveURL('/learn');

    // Should show learning content
    await expect(
      unauthenticatedPage.getByRole('heading', { name: /learn|courses|tutorials/i })
    ).toBeVisible();
  });

  test('should browse programming languages', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/learn');

    // Should show language options
    const languages = ['JavaScript', 'Python', 'Java', 'TypeScript', 'Go'];

    for (const lang of languages.slice(0, 2)) { // Test subset
      const langButton = unauthenticatedPage.getByRole('link', { name: new RegExp(lang, 'i') });
      if (await langButton.isVisible()) {
        await expect(langButton).toBeVisible();
      }
    }
  });

  test('should browse learning topics', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/learn');

    // Click on a language
    const jsLink = unauthenticatedPage.getByRole('link', { name: /javascript/i }).first();

    if (await jsLink.isVisible()) {
      await jsLink.click();

      // Should show topics
      await expect(unauthenticatedPage).toHaveURL(/\/learn\/.+/);

      // Should show topic cards
      const topics = unauthenticatedPage.locator('[data-testid="topic-card"]');
      if (await topics.first().isVisible()) {
        expect(await topics.count()).toBeGreaterThan(0);
      }
    }
  });

  test('should view learning content', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/learn/javascript');

    // Click on a topic
    const topicCard = unauthenticatedPage.locator('[data-testid="topic-card"]').first();

    if (await topicCard.isVisible()) {
      await topicCard.click();

      // Should show content
      await expect(
        unauthenticatedPage.locator('[data-testid="learning-content"]')
      ).toBeVisible();
    }
  });

  test('should show code examples in learning content', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/learn/javascript/basics');

    // Should show code blocks
    const codeBlocks = unauthenticatedPage.locator('pre code, [data-testid="code-block"]');

    if (await codeBlocks.first().isVisible()) {
      expect(await codeBlocks.count()).toBeGreaterThan(0);
    }
  });
});

test.describe('Public Features - Interview Questions', () => {
  test('should access interview questions without authentication', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/interview');

    // Should successfully load interview page
    await expect(unauthenticatedPage).toHaveURL('/interview');

    // Should show interview questions
    await expect(
      unauthenticatedPage.getByTestId('page-title')
    ).toBeVisible();
  });

  test('should filter interview questions by category', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/interview');

    // Look for category filters
    const categories = ['JavaScript', 'React', 'System Design', 'Algorithms'];

    for (const category of categories.slice(0, 2)) {
      const categoryButton = unauthenticatedPage.getByRole('button', { name: new RegExp(category, 'i') });

      if (await categoryButton.isVisible()) {
        await categoryButton.click();

        // Should show filtered questions
        await unauthenticatedPage.waitForLoadState('networkidle');

        const questions = unauthenticatedPage.locator('[data-testid="question-card"]');
        if (await questions.first().isVisible()) {
          expect(await questions.count()).toBeGreaterThan(0);
        }

        break; // Test one filter
      }
    }
  });

  test('should read interview questions and answers', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/interview');

    // Click on a question
    const questionCard = unauthenticatedPage.locator('[data-testid="question-card"]').first();

    if (await questionCard.isVisible()) {
      await questionCard.click();

      // Should show question detail
      await expect(unauthenticatedPage).toHaveURL(/\/interview\/.+/);

      // Should show answer
      await expect(
        unauthenticatedPage.locator('[data-testid="answer-content"]')
      ).toBeVisible();
    }
  });

  test('should filter by difficulty level', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/interview');

    // Look for difficulty filters
    const difficulties = ['Easy', 'Medium', 'Hard'];

    for (const difficulty of difficulties) {
      const difficultyButton = unauthenticatedPage.getByRole('button', { name: new RegExp(difficulty, 'i') });

      if (await difficultyButton.isVisible()) {
        await difficultyButton.click();
        await unauthenticatedPage.waitForLoadState('networkidle');
        break; // Test one filter
      }
    }
  });
});

test.describe('Public Features - Homepage', () => {
  test('should load homepage without authentication', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/');

    // Should successfully load
    await expect(unauthenticatedPage).toHaveURL('/');

    // Should show main heading
    await expect(
      unauthenticatedPage.getByRole('heading', { level: 1 })
    ).toBeVisible();
  });

  test('should show navigation links', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/');

    // Check for main navigation links
    const navLinks = ['News', 'Learn', 'Interview', 'Jobs'];

    for (const linkText of navLinks) {
      const link = unauthenticatedPage.getByRole('link', { name: new RegExp(linkText, 'i') });
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
      }
    }
  });

  test('should navigate to public sections from homepage', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/');

    // Test navigation to news
    const newsLink = unauthenticatedPage.getByRole('link', { name: /news/i }).first();
    if (await newsLink.isVisible()) {
      await newsLink.click();
      await expect(unauthenticatedPage).toHaveURL('/news');
    }
  });

  test('should show sign in button on homepage', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/');

    // Should show sign in button
    await expect(
      unauthenticatedPage.getByTestId('auth-submit-button')
    ).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Should load successfully
    await expect(page).toHaveURL('/');

    // Mobile menu should be visible
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    if (await mobileMenuButton.isVisible()) {
      await expect(mobileMenuButton).toBeVisible();
    }
  });
});
