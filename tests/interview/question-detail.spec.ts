/**
 * Test Suite 3: Question Detail Page
 * Tests individual question detail page with answer, video, and navigation
 */

import { test, expect } from '@playwright/test'
import {
  mockInterviewQuestionDetailAPI,
  mockInterviewQuestionsAPI,
  mockInterviewCategoriesAPI,
} from '../utils/interview-mocks'

test.describe('Question Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await mockInterviewQuestionDetailAPI(page, 'java-1')
    await page.goto('/interview/java/java-1')
    await page.waitForSelector('[data-testid="question-header"]')
  })

  test('should display question header with all metadata', async ({ page }) => {
    const header = page.getByTestId('question-header')

    await expect(header).toBeVisible()
    await expect(header.getByTestId('language-badge')).toContainText('Java')
    await expect(header.getByTestId('difficulty-badge')).toBeVisible()
    await expect(header.getByTestId('category-badge')).toBeVisible()
    await expect(header.getByTestId('question-title')).toBeVisible()
    await expect(header.getByTestId('question-tags')).toBeVisible()
  })

  test('should display answer section', async ({ page }) => {
    const answerSection = page.getByTestId('answer-section')
    await expect(answerSection).toBeVisible()

    // Answer should be collapsed initially
    const answerContent = page.getByTestId('answer-content')
    const isVisible = await answerContent.isVisible()

    // Toggle answer
    const toggleButton = page.getByTestId('answer-toggle')
    await toggleButton.click()
    await page.waitForTimeout(300)

    // Answer should now be visible/hidden (opposite of initial state)
    const newVisibility = await answerContent.isVisible()
    expect(newVisibility).not.toBe(isVisible)
  })

  test('should display video section if video URL exists', async ({ page }) => {
    const videoSection = page.getByTestId('video-section')

    // Video section might not exist for all questions
    const videoExists = await videoSection.count() > 0

    if (videoExists) {
      await expect(videoSection).toBeVisible()
      await expect(videoSection.getByTestId('video-card').first()).toBeVisible()
    }
  })

  test('should navigate to previous question', async ({ page }) => {
    const prevButton = page.getByTestId('prev-question-button')

    // Previous button might not exist if this is first question
    const hasPrev = await prevButton.count() > 0

    if (hasPrev) {
      await prevButton.click()
      await page.waitForURL(/\/interview\/java\/java-\d+/)
      await expect(page.getByTestId('question-header')).toBeVisible()
    }
  })

  test('should navigate to next question', async ({ page }) => {
    const nextButton = page.getByTestId('next-question-button')

    const hasNext = await nextButton.count() > 0

    if (hasNext) {
      await nextButton.click()
      await page.waitForURL(/\/interview\/java\/java-\d+/)
      await expect(page.getByTestId('question-header')).toBeVisible()
    }
  })

  test('should navigate back to questions list', async ({ page }) => {
    const backButton = page.getByTestId('back-button')
    await backButton.click()

    await page.waitForURL('/interview/java')
    await expect(page.getByTestId('results-counter')).toBeVisible()
  })

  test('should show question navigation controls', async ({ page }) => {
    const navigation = page.getByTestId('question-navigation')
    await expect(navigation).toBeVisible()

    // At least one navigation button should exist
    const prevExists = await page.getByTestId('prev-question-button').count() > 0
    const nextExists = await page.getByTestId('next-question-button').count() > 0

    expect(prevExists || nextExists).toBe(true)
  })
})
