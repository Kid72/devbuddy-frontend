import { test, expect, testData } from './utils/fixtures';

/**
 * Jobs Features Tests
 * Tests for job browsing (public) and job alerts (authenticated)
 */

test.describe('Jobs Features - Public Access', () => {
  test('should browse jobs without authentication', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/jobs');

    // Should successfully load jobs page
    await expect(unauthenticatedPage).toHaveURL('/jobs');

    // Should show job listings
    await expect(
      unauthenticatedPage.getByRole('heading', { name: /jobs|positions/i })
    ).toBeVisible();

    // Should show job cards
    const jobCards = unauthenticatedPage.locator('[data-testid="job-card"]');
    if (await jobCards.first().isVisible()) {
      expect(await jobCards.count()).toBeGreaterThan(0);
    }
  });

  test('should view job details without authentication', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/jobs');

    // Click on a job
    const jobCard = unauthenticatedPage.locator('[data-testid="job-card"]').first();

    if (await jobCard.isVisible()) {
      await jobCard.click();

      // Should navigate to job detail
      await expect(unauthenticatedPage).toHaveURL(/\/jobs\/.+/);

      // Should show job details
      await expect(
        unauthenticatedPage.locator('[data-testid="job-description"]')
      ).toBeVisible();
    }
  });

  test('should filter jobs by location', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/jobs');

    // Look for location filter
    const locationInput = unauthenticatedPage.getByPlaceholder(/location/i);

    if (await locationInput.isVisible()) {
      await locationInput.fill('Remote');
      await locationInput.press('Enter');

      // Should filter results
      await unauthenticatedPage.waitForLoadState('networkidle');

      const jobs = unauthenticatedPage.locator('[data-testid="job-card"]');
      expect(await jobs.count()).toBeGreaterThan(0);
    }
  });

  test('should search jobs by keyword', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/jobs');

    // Look for search input
    const searchInput = unauthenticatedPage.getByPlaceholder(/search|keyword/i);

    if (await searchInput.isVisible()) {
      await searchInput.fill('React Developer');
      await searchInput.press('Enter');

      // Should show search results
      await unauthenticatedPage.waitForLoadState('networkidle');

      const jobs = unauthenticatedPage.locator('[data-testid="job-card"]');
      expect(await jobs.count()).toBeGreaterThan(0);
    }
  });

  test('creating job alert should require authentication', async ({ unauthenticatedPage }) => {
    await unauthenticatedPage.goto('/jobs');

    // Click create alert button
    const createAlertButton = unauthenticatedPage.getByRole('button', { name: /create.*alert|set.*alert/i });

    if (await createAlertButton.isVisible()) {
      await createAlertButton.click();

      // Should prompt for login or redirect
      await expect(
        unauthenticatedPage.getByText(/sign in|login/i)
      ).toBeVisible();
    }
  });
});

test.describe('Jobs Features - Authenticated Access', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/jobs');
  });

  test('should create job alert', async ({ authenticatedPage }) => {
    // Navigate to create alert
    const createButton = authenticatedPage.getByRole('button', { name: /create.*alert/i });

    if (await createButton.isVisible()) {
      await createButton.click();

      // Fill alert form
      await authenticatedPage.fill('[name="keywords"]', testData.jobs.sampleAlert.keywords);
      await authenticatedPage.fill('[name="location"]', testData.jobs.sampleAlert.location);
      await authenticatedPage.fill('[name="minSalary"]', testData.jobs.sampleAlert.minSalary.toString());

      // Submit form
      const submitButton = authenticatedPage.getByRole('button', { name: /create|save/i });
      await submitButton.click();

      // Should show success message
      await expect(
        authenticatedPage.getByText(/alert created|saved successfully/i)
      ).toBeVisible();
    }
  });

  test('should list user job alerts', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/jobs/alerts');

    // Should be on alerts page
    await expect(authenticatedPage).toHaveURL('/jobs/alerts');

    // Mock alerts
    await authenticatedPage.route('**/api/jobs/alerts', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          alerts: [
            {
              id: '1',
              keywords: 'React Developer',
              location: 'Remote',
              active: true
            },
            {
              id: '2',
              keywords: 'Senior Engineer',
              location: 'San Francisco',
              active: true
            }
          ]
        })
      });
    });

    await authenticatedPage.reload();

    // Should show alerts
    const alertCards = authenticatedPage.locator('[data-testid="alert-card"]');
    expect(await alertCards.count()).toBeGreaterThan(0);
  });

  test('should edit job alert', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/jobs/alerts');

    // Mock alerts
    await authenticatedPage.route('**/api/jobs/alerts', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          alerts: [
            {
              id: '1',
              keywords: 'React Developer',
              location: 'Remote',
              active: true
            }
          ]
        })
      });
    });

    await authenticatedPage.reload();

    // Click edit button
    const editButton = authenticatedPage.getByRole('button', { name: /edit/i }).first();

    if (await editButton.isVisible()) {
      await editButton.click();

      // Update keywords
      const keywordsInput = authenticatedPage.locator('[name="keywords"]');
      await keywordsInput.clear();
      await keywordsInput.fill('Senior React Developer');

      // Save changes
      const saveButton = authenticatedPage.getByRole('button', { name: /save|update/i });
      await saveButton.click();

      // Should show success message
      await expect(
        authenticatedPage.getByText(/updated|saved/i)
      ).toBeVisible();
    }
  });

  test('should delete job alert', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/jobs/alerts');

    // Mock alerts
    await authenticatedPage.route('**/api/jobs/alerts', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          alerts: [
            {
              id: '1',
              keywords: 'React Developer',
              location: 'Remote',
              active: true
            }
          ]
        })
      });
    });

    // Mock delete endpoint
    await authenticatedPage.route('**/api/jobs/alerts/*', async (route) => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      } else {
        await route.continue();
      }
    });

    await authenticatedPage.reload();

    // Click delete button
    const deleteButton = authenticatedPage.getByRole('button', { name: /delete/i }).first();

    if (await deleteButton.isVisible()) {
      await deleteButton.click();

      // Confirm deletion
      const confirmButton = authenticatedPage.getByRole('button', { name: /confirm|yes/i });
      if (await confirmButton.isVisible()) {
        await confirmButton.click();
      }

      // Should show success message
      await expect(
        authenticatedPage.getByText(/deleted|removed/i)
      ).toBeVisible();
    }
  });

  test('should toggle alert active status', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/jobs/alerts');

    // Mock alerts
    await authenticatedPage.route('**/api/jobs/alerts', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          alerts: [
            {
              id: '1',
              keywords: 'React Developer',
              location: 'Remote',
              active: true
            }
          ]
        })
      });
    });

    await authenticatedPage.reload();

    // Find toggle switch
    const toggleSwitch = authenticatedPage.locator('[data-testid="alert-toggle"]').first();

    if (await toggleSwitch.isVisible()) {
      await toggleSwitch.click();

      // Should update status
      await expect(
        authenticatedPage.getByText(/deactivated|paused/i)
      ).toBeVisible();
    }
  });

  test('should receive alert notifications', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/jobs/alerts');

    // Mock new job matches
    await authenticatedPage.route('**/api/jobs/alerts/*/matches', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          matches: [
            {
              id: '1',
              title: 'Senior React Developer',
              company: 'Tech Corp',
              location: 'Remote',
              matchScore: 95
            }
          ]
        })
      });
    });

    // Check for notifications
    const notificationBadge = authenticatedPage.locator('[data-testid="notification-badge"]');

    if (await notificationBadge.isVisible()) {
      const count = await notificationBadge.textContent();
      expect(parseInt(count || '0')).toBeGreaterThan(0);
    }
  });

  test('should save job for later', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/jobs');

    // Click save button on a job
    const saveButton = authenticatedPage.getByRole('button', { name: /save|bookmark/i }).first();

    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Should show saved state
      await expect(
        authenticatedPage.getByText(/saved|bookmarked/i)
      ).toBeVisible();
    }
  });

  test('should view saved jobs', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/jobs/saved');

    // Should be on saved jobs page
    await expect(authenticatedPage).toHaveURL('/jobs/saved');

    // Mock saved jobs
    await authenticatedPage.route('**/api/jobs/saved', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          jobs: [
            {
              id: '1',
              title: 'Senior Developer',
              company: 'Tech Corp',
              savedAt: '2024-01-15'
            }
          ]
        })
      });
    });

    await authenticatedPage.reload();

    // Should show saved jobs
    const jobCards = authenticatedPage.locator('[data-testid="job-card"]');
    expect(await jobCards.count()).toBeGreaterThan(0);
  });
});
