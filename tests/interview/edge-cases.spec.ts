/**
 * Test Suite 7: Edge Cases and Boundary Tests
 * Tests edge cases, boundary conditions, and unusual scenarios
 */

import { test, expect } from '@playwright/test'
import {
  mockInterviewQuestionsAPI,
  mockInterviewQuestionDetailAPI,
  mockInterviewCategoriesAPI,
  mockPartialData,
  mockEmptyData,
  mockCustomQuestion,
  clearAllMocks,
} from '../utils/interview-mocks'
import { InterviewQuestion } from '../fixtures/interview-data'

test.describe('Edge Cases', () => {
  test('should handle single question correctly', async ({ page }) => {
    await clearAllMocks(page)
    await mockInterviewCategoriesAPI(page)
    await mockPartialData(page, 1)

    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    const resultsCounter = page.getByTestId('results-counter')
    await expect(resultsCounter).toContainText('1 of 1 question')

    const cards = page.getByTestId('question-card')
    await expect(cards).toHaveCount(1)

    // Pagination should not be visible
    const pagination = page.getByTestId('pagination')
    await expect(pagination).not.toBeVisible()
  })

  test('should handle very long question titles', async ({ page }) => {
    const longTitleQuestion: Partial<InterviewQuestion> = {
      id: 'java-long-title',
      title: 'This is an extremely long question title that should be properly handled by the UI without breaking the layout or causing horizontal scrolling issues on the page',
      difficulty: 'medium',
      category: 'Edge Cases',
    }

    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await mockCustomQuestion(page, 'java-long-title', longTitleQuestion)

    await page.goto('/interview/java/java-long-title')
    await page.waitForSelector('[data-testid="question-title"]')

    const title = page.getByTestId('question-title')
    await expect(title).toBeVisible()

    // Title should not cause overflow
    const box = await title.boundingBox()
    if (box) {
      const viewportWidth = page.viewportSize()?.width || 0
      expect(box.width).toBeLessThanOrEqual(viewportWidth)
    }
  })

  test('should handle questions with many tags', async ({ page }) => {
    const manyTagsQuestion: Partial<InterviewQuestion> = {
      id: 'java-many-tags',
      title: 'Question with many tags',
      tags: [
        'java', 'collections', 'generics', 'streams', 'lambda',
        'concurrent', 'thread-safe', 'performance', 'optimization',
        'best-practices', 'design-patterns', 'solid-principles'
      ],
      difficulty: 'hard',
      category: 'Advanced',
    }

    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await mockCustomQuestion(page, 'java-many-tags', manyTagsQuestion)

    await page.goto('/interview/java/java-many-tags')
    await page.waitForSelector('[data-testid="question-tags"]')

    const tagsContainer = page.getByTestId('question-tags')
    await expect(tagsContainer).toBeVisible()

    // All tags should be visible (with wrapping)
    const tags = tagsContainer.locator('span')
    const count = await tags.count()
    expect(count).toBe(12)
  })

  test('should handle special characters in search', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="search-input"]')

    const searchInput = page.getByTestId('search-input')

    // Test various special characters
    const specialChars = ['@#$%', '🎉', '<script>', 'test&test', 'test"quote']

    for (const char of specialChars) {
      await searchInput.fill(char)
      await page.waitForTimeout(300)

      // Should not crash or break the UI
      await expect(searchInput).toBeVisible()
      await expect(page.getByTestId('results-counter')).toBeVisible()

      await searchInput.clear()
    }
  })

  test('should handle rapid filter changes', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="difficulty-filter"]')

    const difficultyFilter = page.getByTestId('difficulty-filter')

    // Rapidly change filters
    await difficultyFilter.click()
    await page.getByRole('option', { name: 'Easy' }).click()
    await page.waitForTimeout(100)

    await difficultyFilter.click()
    await page.getByRole('option', { name: 'Medium' }).click()
    await page.waitForTimeout(100)

    await difficultyFilter.click()
    await page.getByRole('option', { name: 'Hard' }).click()
    await page.waitForTimeout(100)

    await difficultyFilter.click()
    await page.getByRole('option', { name: 'All Levels' }).click()

    // Should stabilize and show results
    await page.waitForTimeout(500)
    await expect(page.getByTestId('results-counter')).toBeVisible()
    await expect(page.getByTestId('question-card').first()).toBeVisible()
  })

  test('should handle browser back button navigation', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await mockInterviewQuestionDetailAPI(page, 'java-1')

    // Navigate through pages
    await page.goto('/interview')
    await page.waitForSelector('[data-testid="page-title"]')

    await page.getByTestId('practice-button-java').click()
    await page.waitForURL('/interview/java')

    await page.getByTestId('question-card').first().click()
    await page.waitForURL(/\/interview\/java\/java-\d+/)

    // Use browser back button
    await page.goBack()
    await expect(page).toHaveURL('/interview/java')
    await expect(page.getByTestId('results-counter')).toBeVisible()

    await page.goBack()
    await expect(page).toHaveURL('/interview')
    await expect(page.getByTestId('page-title')).toBeVisible()
  })

  test('should handle empty search results', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="search-input"]')

    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('nonexistentquestionxyz123')
    await page.waitForTimeout(500)

    // Should show "no questions found" message
    await expect(page.locator('text=No questions found')).toBeVisible()

    // Clear search should restore results
    await page.getByTestId('search-clear').click()
    await page.waitForTimeout(500)

    await expect(page.getByTestId('question-card').first()).toBeVisible()
  })

  test('should handle invalid question ID in URL', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')

    await page.goto('/interview/java/invalid-question-id-999')
    await page.waitForTimeout(1000)

    // Should show error state
    const errorState = page.getByTestId('error-state')
    const errorVisible = await errorState.isVisible()

    if (errorVisible) {
      await expect(errorState).toContainText('not found')
    }

    // Back button should still work
    const backButton = page.getByTestId('back-button')
    await backButton.click()
    await page.waitForURL('/interview/java')
  })
})
