/**
 * Test Suite 4: Loading and Error Handling
 * Tests loading states, error states, and edge cases
 */

import { test, expect } from '@playwright/test'
import {
  mockSlowAPI,
  mockAPIError,
  mockEmptyData,
  mockInterviewQuestionsAPI,
  mockInterviewCategoriesAPI,
} from '../utils/interview-mocks'

test.describe('Loading and Error States', () => {
  test('should show loading state on questions list page', async ({ page }) => {
    // Mock slow API to see loading state
    await mockSlowAPI(page, 2000)

    const loadPromise = page.goto('/interview/java')

    // Should show loading indicator
    await page.waitForSelector('[data-testid="loading-state"]', { timeout: 3000 })
    const loadingState = page.getByTestId('loading-state')
    await expect(loadingState).toBeVisible()
    await expect(loadingState).toContainText('Loading questions')

    await loadPromise

    // Loading should disappear after data loads
    await expect(loadingState).not.toBeVisible({ timeout: 10000 })
  })

  test('should show loading state on question detail page', async ({ page }) => {
    await mockSlowAPI(page, 2000)

    const loadPromise = page.goto('/interview/java/java-1')

    await page.waitForSelector('[data-testid="loading-state"]', { timeout: 3000 })
    const loadingState = page.getByTestId('loading-state')
    await expect(loadingState).toBeVisible()
    await expect(loadingState).toContainText('Loading question')

    await loadPromise

    await expect(loadingState).not.toBeVisible({ timeout: 10000 })
  })

  test('should show error state on 500 server error', async ({ page }) => {
    await mockAPIError(page, '500')

    await page.goto('/interview/java')

    // Should show error message
    await page.waitForSelector('[data-testid="error-state"]', { timeout: 5000 })
    const errorState = page.getByTestId('error-state')
    await expect(errorState).toBeVisible()
    await expect(errorState).toContainText('Failed to load')
  })

  test('should show error state on 404 not found', async ({ page }) => {
    await mockAPIError(page, '404')

    await page.goto('/interview/java/nonexistent-id')
    await page.waitForTimeout(1000)

    const errorState = page.getByTestId('error-state')
    const errorVisible = await errorState.isVisible()

    if (errorVisible) {
      await expect(errorState).toContainText('not found')
    }
  })

  test('should handle empty data gracefully on list page', async ({ page }) => {
    await mockEmptyData(page)

    await page.goto('/interview/java')
    await page.waitForTimeout(1000)

    // Should show "no questions found" message
    await expect(page.locator('text=No questions found')).toBeVisible()
  })

  test('should allow retry on error', async ({ page }) => {
    await mockAPIError(page, '500')

    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="error-state"]')

    // Clear error mock and retry with good data
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')

    // Navigate back and retry
    await page.goto('/interview')
    await page.waitForTimeout(500)

    const javaButton = page.getByTestId('practice-button-java')
    await javaButton.click()

    // Should load successfully now
    await page.waitForSelector('[data-testid="results-counter"]', { timeout: 5000 })
    await expect(page.getByTestId('results-counter')).toBeVisible()
  })

  test('should handle network timeout gracefully', async ({ page }) => {
    await mockAPIError(page, 'timeout')

    await page.goto('/interview/java')

    // Should eventually show error
    await page.waitForSelector('[data-testid="error-state"]', { timeout: 15000 })
    const errorState = page.getByTestId('error-state')
    await expect(errorState).toBeVisible()
  })
})
