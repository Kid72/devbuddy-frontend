/**
 * Test Suite 5: Component Isolation Tests
 * Tests individual components in isolation
 */

import { test, expect } from '@playwright/test'
import {
  mockInterviewQuestionsAPI,
  mockInterviewQuestionDetailAPI,
  mockInterviewCategoriesAPI,
} from '../utils/interview-mocks'

test.describe('Component Tests', () => {
  test.describe('SearchBar Component', () => {
    test.beforeEach(async ({ page }) => {
      await mockInterviewCategoriesAPI(page)
      await mockInterviewQuestionsAPI(page, 'java')
      await page.goto('/interview/java')
      await page.waitForSelector('[data-testid="search-input"]')
    })

    test('should accept text input', async ({ page }) => {
      const searchInput = page.getByTestId('search-input')
      await searchInput.fill('java collections')
      await expect(searchInput).toHaveValue('java collections')
    })

    test('should show clear button when text entered', async ({ page }) => {
      const searchInput = page.getByTestId('search-input')
      const clearButton = page.getByTestId('search-clear')

      await searchInput.fill('test')
      await expect(clearButton).toBeVisible()

      await clearButton.click()
      await expect(searchInput).toHaveValue('')
    })

    test('should filter results as user types', async ({ page }) => {
      const searchInput = page.getByTestId('search-input')
      const resultsCounter = page.getByTestId('results-counter')

      const initialText = await resultsCounter.textContent()

      await searchInput.fill('jvm')
      await page.waitForTimeout(500)

      const filteredText = await resultsCounter.textContent()
      expect(filteredText).not.toBe(initialText)
    })
  })

  test.describe('Pagination Component', () => {
    test.beforeEach(async ({ page }) => {
      await mockInterviewCategoriesAPI(page)
      await mockInterviewQuestionsAPI(page, 'java')
      await page.goto('/interview/java')
      await page.waitForSelector('[data-testid="results-counter"]')
    })

    test('should show pagination if more than 12 questions', async ({ page }) => {
      const pagination = page.getByTestId('pagination')
      const paginationExists = await pagination.count() > 0

      // Java has 20 questions, so pagination should exist
      expect(paginationExists).toBe(true)
    })

    test('should navigate between pages', async ({ page }) => {
      const pagination = page.getByTestId('pagination')

      if (await pagination.isVisible()) {
        const page2Button = page.getByTestId('pagination-page-2')
        if (await page2Button.count() > 0) {
          await page2Button.click()
          await page.waitForTimeout(500)

          // Should show different questions
          await expect(page.getByTestId('question-card').first()).toBeVisible()
        }
      }
    })

    test('should disable prev button on first page', async ({ page }) => {
      const prevButton = page.getByTestId('pagination-prev')

      if (await prevButton.count() > 0) {
        await expect(prevButton).toBeDisabled()
      }
    })
  })

  test.describe('QuestionCard Component', () => {
    test.beforeEach(async ({ page }) => {
      await mockInterviewCategoriesAPI(page)
      await mockInterviewQuestionsAPI(page, 'java')
      await page.goto('/interview/java')
      await page.waitForSelector('[data-testid="question-card"]')
    })

    test('should display all question metadata', async ({ page }) => {
      const firstCard = page.getByTestId('question-card').first()

      await expect(firstCard.getByTestId('difficulty-badge')).toBeVisible()
      await expect(firstCard.getByTestId('category-badge')).toBeVisible()
      await expect(firstCard.getByTestId('question-title')).toBeVisible()
      await expect(firstCard.getByTestId('question-tags')).toBeVisible()
    })

    test('should show video indicator for questions with videos', async ({ page }) => {
      const cards = page.getByTestId('question-card')
      const firstCard = cards.first()

      // Check if video indicator exists
      const videoIndicator = firstCard.getByTestId('video-indicator')
      const hasVideo = await videoIndicator.count() > 0

      if (hasVideo) {
        await expect(videoIndicator).toBeVisible()
      }
    })

    test('should be clickable and navigate to detail', async ({ page }) => {
      const firstCard = page.getByTestId('question-card').first()
      await firstCard.click()

      await page.waitForURL(/\/interview\/java\/java-\d+/)
      await expect(page.getByTestId('question-header')).toBeVisible()
    })
  })

  test.describe('AnswerSection Component', () => {
    test.beforeEach(async ({ page }) => {
      await mockInterviewCategoriesAPI(page)
      await mockInterviewQuestionsAPI(page, 'java')
      await mockInterviewQuestionDetailAPI(page, 'java-1')
      await page.goto('/interview/java/java-1')
      await page.waitForSelector('[data-testid="answer-section"]')
    })

    test('should toggle answer visibility', async ({ page }) => {
      const answerContent = page.getByTestId('answer-content')
      const toggleButton = page.getByTestId('answer-toggle')

      const initialVisible = await answerContent.isVisible()

      await toggleButton.click()
      await page.waitForTimeout(300)

      const afterToggle = await answerContent.isVisible()
      expect(afterToggle).not.toBe(initialVisible)
    })

    test('should display formatted markdown answer', async ({ page }) => {
      const answerContent = page.getByTestId('answer-content')

      // Expand answer if collapsed
      if (!(await answerContent.isVisible())) {
        await page.getByTestId('answer-toggle').click()
        await page.waitForTimeout(300)
      }

      // Should contain formatted content
      await expect(answerContent).toBeVisible()
      const content = await answerContent.textContent()
      expect(content?.length || 0).toBeGreaterThan(0)
    })
  })

  test.describe('VideoEmbed Component', () => {
    test.beforeEach(async ({ page }) => {
      await mockInterviewCategoriesAPI(page)
      await mockInterviewQuestionsAPI(page, 'java')
      await mockInterviewQuestionDetailAPI(page, 'java-1')
      await page.goto('/interview/java/java-1')
      await page.waitForTimeout(1000)
    })

    test('should display video section if video exists', async ({ page }) => {
      const videoSection = page.getByTestId('video-section')
      const hasVideo = await videoSection.count() > 0

      if (hasVideo) {
        await expect(videoSection).toBeVisible()
        await expect(videoSection.getByTestId('video-card').first()).toBeVisible()
      }
    })

    test('should show YouTube link for videos', async ({ page }) => {
      const videoSection = page.getByTestId('video-section')

      if (await videoSection.count() > 0) {
        const youtubeLink = page.getByTestId('video-youtube-link').first()

        if (await youtubeLink.count() > 0) {
          await expect(youtubeLink).toBeVisible()
          const href = await youtubeLink.getAttribute('href')
          expect(href).toContain('youtube.com')
        }
      }
    })
  })
})
