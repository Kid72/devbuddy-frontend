import { test, expect, testData, helpers } from './utils/fixtures';
import path from 'path';

/**
 * CV Workflow Tests
 * Tests for CV upload, AI improvements, and export functionality
 * Requires authentication
 */

test.describe('CV Workflow', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv');
  });

  test('should upload CV file', async ({ authenticatedPage }) => {
    // Navigate to upload page
    await authenticatedPage.goto('/cv/upload');

    // Check for file input
    const fileInput = authenticatedPage.locator('input[type="file"]');
    await expect(fileInput).toBeVisible();

    // Upload a test file
    const testFilePath = path.join(__dirname, 'fixtures/sample-cv.pdf');

    // Set the file
    await fileInput.setInputFiles(testFilePath);

    // Submit upload
    const uploadButton = authenticatedPage.getByRole('button', { name: /upload|submit/i });
    await uploadButton.click();

    // Wait for upload to complete
    await helpers.waitForApiResponse(authenticatedPage, /\/api\/cv\/upload/);

    // Should show success message
    await expect(
      authenticatedPage.getByText(/uploaded successfully|upload complete/i)
    ).toBeVisible({ timeout: 15000 });

    // Should redirect to CV view or improvement page
    await expect(authenticatedPage).toHaveURL(/\/cv\/.+/);
  });

  test('should view AI improvements', async ({ authenticatedPage }) => {
    // Assume CV is already uploaded
    // Navigate to improvements page
    await authenticatedPage.goto('/cv/123/improve');

    // Mock API response with improvements
    await authenticatedPage.route('**/api/cv/*/improve', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          improvements: [
            {
              id: '1',
              section: 'Summary',
              original: 'Experienced developer',
              suggestion: 'Results-driven software engineer with 5+ years of experience',
              type: 'enhancement'
            },
            {
              id: '2',
              section: 'Skills',
              original: 'JavaScript, React',
              suggestion: 'JavaScript (ES6+), React.js, TypeScript, Node.js',
              type: 'expansion'
            }
          ]
        })
      });
    });

    // Reload to trigger API call
    await authenticatedPage.reload();

    // Should show improvements
    await expect(
      authenticatedPage.getByText(/improvements|suggestions/i)
    ).toBeVisible();

    // Should show individual suggestions
    const suggestions = authenticatedPage.locator('[data-testid="suggestion-card"]');
    expect(await suggestions.count()).toBeGreaterThan(0);
  });

  test('should accept AI suggestions', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv/123/improve');

    // Mock improvements
    await authenticatedPage.route('**/api/cv/*/improve', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          improvements: [
            {
              id: '1',
              section: 'Summary',
              original: 'Developer',
              suggestion: 'Senior Software Engineer',
              type: 'enhancement'
            }
          ]
        })
      });
    });

    await authenticatedPage.reload();

    // Find accept button
    const acceptButton = authenticatedPage.getByRole('button', { name: /accept/i }).first();

    if (await acceptButton.isVisible()) {
      // Click accept
      await acceptButton.click();

      // Should show accepted state
      await expect(
        authenticatedPage.getByText(/accepted|applied/i)
      ).toBeVisible();
    }
  });

  test('should reject AI suggestions', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv/123/improve');

    // Mock improvements
    await authenticatedPage.route('**/api/cv/*/improve', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          improvements: [
            {
              id: '1',
              section: 'Summary',
              original: 'Developer',
              suggestion: 'Senior Software Engineer',
              type: 'enhancement'
            }
          ]
        })
      });
    });

    await authenticatedPage.reload();

    // Find reject button
    const rejectButton = authenticatedPage.getByRole('button', { name: /reject|dismiss/i }).first();

    if (await rejectButton.isVisible()) {
      // Click reject
      await rejectButton.click();

      // Suggestion should be removed or marked as rejected
      await expect(
        authenticatedPage.getByText(/rejected|dismissed/i)
      ).toBeVisible();
    }
  });

  test('should download CV as DOCX', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv/123');

    // Mock download endpoint
    await authenticatedPage.route('**/api/cv/*/download/docx', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        body: Buffer.from('mock docx content'),
        headers: {
          'Content-Disposition': 'attachment; filename="cv.docx"'
        }
      });
    });

    // Start download
    const downloadPromise = authenticatedPage.waitForEvent('download');

    const downloadButton = authenticatedPage.getByRole('button', { name: /download.*docx/i });
    await downloadButton.click();

    // Wait for download
    const download = await downloadPromise;

    // Verify download
    expect(download.suggestedFilename()).toContain('.docx');
  });

  test('should download CV as PDF', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv/123');

    // Mock download endpoint
    await authenticatedPage.route('**/api/cv/*/download/pdf', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/pdf',
        body: Buffer.from('mock pdf content'),
        headers: {
          'Content-Disposition': 'attachment; filename="cv.pdf"'
        }
      });
    });

    // Start download
    const downloadPromise = authenticatedPage.waitForEvent('download');

    const downloadButton = authenticatedPage.getByRole('button', { name: /download.*pdf/i });
    await downloadButton.click();

    // Wait for download
    const download = await downloadPromise;

    // Verify download
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('should show CV upload progress', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv/upload');

    // Slow down upload to see progress
    await authenticatedPage.route('**/api/cv/upload', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: '123', status: 'uploaded' })
      });
    });

    const fileInput = authenticatedPage.locator('input[type="file"]');
    const testFilePath = path.join(__dirname, 'fixtures/sample-cv.pdf');

    await fileInput.setInputFiles(testFilePath);

    const uploadButton = authenticatedPage.getByRole('button', { name: /upload/i });
    await uploadButton.click();

    // Should show progress indicator
    await expect(
      authenticatedPage.getByText(/uploading|processing/i)
    ).toBeVisible();
  });

  test('should handle upload errors gracefully', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv/upload');

    // Mock upload error
    await authenticatedPage.route('**/api/cv/upload', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid file format' })
      });
    });

    const fileInput = authenticatedPage.locator('input[type="file"]');
    const testFilePath = path.join(__dirname, 'fixtures/sample-cv.pdf');

    await fileInput.setInputFiles(testFilePath);

    const uploadButton = authenticatedPage.getByRole('button', { name: /upload/i });
    await uploadButton.click();

    // Should show error message
    await expect(
      authenticatedPage.getByText(/error|failed|invalid/i)
    ).toBeVisible();
  });

  test('should list uploaded CVs', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv');

    // Mock CV list
    await authenticatedPage.route('**/api/cv', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          cvs: [
            { id: '1', name: 'Software Engineer CV', updatedAt: '2024-01-15' },
            { id: '2', name: 'Senior Developer CV', updatedAt: '2024-01-10' }
          ]
        })
      });
    });

    await authenticatedPage.reload();

    // Should show CV list
    const cvCards = authenticatedPage.locator('[data-testid="cv-card"]');
    expect(await cvCards.count()).toBeGreaterThan(0);
  });

  test('should delete CV', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/cv');

    // Mock delete endpoint
    await authenticatedPage.route('**/api/cv/*/delete', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

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
});
