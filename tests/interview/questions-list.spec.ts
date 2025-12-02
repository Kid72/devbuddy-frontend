/**
 * Test Suite 2: Questions List Page
 * Tests the questions list page with filtering, searching, and pagination
 */

import { test, expect } from '@playwright/test'
import {
  mockInterviewQuestionsAPI,
  mockInterviewCategoriesAPI,
  mockPartialData,
  clearAllMocks,
} from '../utils/interview-mocks'

test.describe('Questions List Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')
  })

  test('should display correct page title and description', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Java Interview Questions')
    await expect(page.locator('text=Core Java, Spring Boot, JVM, Collections')).toBeVisible()
  })

  test('should display question cards with all details', async ({ page }) => {
    const firstCard = page.getByTestId('question-card').first()

    await expect(firstCard).toBeVisible()
    await expect(firstCard.getByTestId('difficulty-badge')).toBeVisible()
    await expect(firstCard.getByTestId('category-badge')).toBeVisible()
    await expect(firstCard.getByTestId('question-title')).toBeVisible()
    await expect(firstCard.getByTestId('question-tags')).toBeVisible()
  })

  test('should filter questions by difficulty', async ({ page }) => {
    const resultsCounter = page.getByTestId('results-counter')
    const initialCount = await resultsCounter.textContent()

    // Select Easy difficulty
    await page.getByTestId('difficulty-filter').click()
    await page.getByRole('option', { name: 'Easy' }).click()

    // Wait for results to update
    await page.waitForTimeout(500)

    const newCount = await resultsCounter.textContent()
    expect(newCount).not.toBe(initialCount)

    // Verify all visible cards are Easy
    const cards = page.getByTestId('question-card')
    const count = await cards.count()

    for (let i = 0; i < count; i++) {
      const badge = cards.nth(i).getByTestId('difficulty-badge')
      await expect(badge).toContainText('Easy')
    }
  })

  test('should search questions by keyword', async ({ page }) => {
    const searchInput = page.getByTestId('search-input')

    await searchInput.fill('jvm')
    await page.waitForTimeout(500)

    // Should show filtered results
    const resultsText = await page.getByTestId('results-counter').textContent()
    expect(resultsText).toContain('of 20 questions')

    // Clear search
    await page.getByTestId('search-clear').click()
    await page.waitForTimeout(500)

    const clearedResults = await page.getByTestId('results-counter').textContent()
    expect(clearedResults).toContain('20 of 20 questions')
  })

  test('should clear all filters when Clear Filters clicked', async ({ page }) => {
    // Apply filters
    await page.getByTestId('difficulty-filter').click()
    await page.getByRole('option', { name: 'Medium' }).click()
    await page.waitForTimeout(500)

    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('test')
    await page.waitForTimeout(500)

    // Clear all filters
    const clearButton = page.getByTestId('clear-filters')
    if (await clearButton.isVisible()) {
      await clearButton.click()
      await page.waitForTimeout(500)

      // Verify filters cleared
      await expect(searchInput).toHaveValue('')
      const resultsCounter = page.getByTestId('results-counter')
      await expect(resultsCounter).toContainText('20 of 20 questions')
    }
  })

  test('should navigate to question detail when card clicked', async ({ page }) => {
    const firstCard = page.getByTestId('question-card').first()
    await firstCard.click()

    // Should navigate to detail page
    await page.waitForURL(/\/interview\/java\/java-\d+/)
    await expect(page.getByTestId('question-header')).toBeVisible()
  })

  test('should paginate results correctly', async ({ page }) => {
    const pagination = page.getByTestId('pagination')

    // Check if pagination is visible (only if more than 12 questions)
    const paginationVisible = await pagination.isVisible()

    if (paginationVisible) {
      // Click page 2
      const page2Button = page.getByTestId('pagination-page-2')
      await page2Button.click()
      await page.waitForTimeout(500)

      // Should load different questions
      await expect(page.getByTestId('question-card').first()).toBeVisible()

      // Previous button should be enabled
      const prevButton = page.getByTestId('pagination-prev')
      await expect(prevButton).toBeEnabled()
    }
  })

  test('should handle partial data correctly', async ({ page }) => {
    await clearAllMocks(page)
    await mockPartialData(page, 3)

    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    const resultsCounter = page.getByTestId('results-counter')
    await expect(resultsCounter).toContainText('3 of 3 questions')

    const cards = page.getByTestId('question-card')
    await expect(cards).toHaveCount(3)
  })

  test('should navigate back to landing page', async ({ page }) => {
    const backButton = page.getByRole('button', { name: /back to interview prep/i })
    await backButton.click()

    await page.waitForURL('/interview')
    await expect(page.getByTestId('page-title')).toBeVisible()
  })
})
