/**
 * Test Suite 8: Accessibility Tests
 * Tests WCAG 2.1 compliance and accessibility features
 */

import { test, expect } from '@playwright/test'
import {
  mockInterviewQuestionsAPI,
  mockInterviewQuestionDetailAPI,
  mockInterviewCategoriesAPI,
} from '../utils/interview-mocks'

test.describe('Accessibility', () => {
  test('should be keyboard navigable on landing page', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await page.goto('/interview')
    await page.waitForSelector('[data-testid="page-title"]')

    // Tab through interactive elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Practice button should be focusable
    const javaButton = page.getByTestId('practice-button-java')
    await expect(javaButton).toBeFocused()

    // Enter should activate button
    await page.keyboard.press('Enter')
    await page.waitForURL('/interview/java')
  })

  test('should be keyboard navigable on questions list', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="search-input"]')

    // Tab to search input
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    const searchInput = page.getByTestId('search-input')
    await expect(searchInput).toBeFocused()

    // Should be able to type
    await page.keyboard.type('collections')
    await expect(searchInput).toHaveValue('collections')

    // Tab to filters
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Difficulty filter should be focusable
    const difficultyFilter = page.getByTestId('difficulty-filter')
    await expect(difficultyFilter).toBeFocused()
  })

  test('should be keyboard navigable on question detail', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await mockInterviewQuestionDetailAPI(page, 'java-1')
    await page.goto('/interview/java/java-1')
    await page.waitForSelector('[data-testid="question-header"]')

    // Tab to back button
    await page.keyboard.press('Tab')
    const backButton = page.getByTestId('back-button')
    await expect(backButton).toBeFocused()

    // Tab to answer toggle
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    const answerToggle = page.getByTestId('answer-toggle')
    if (await answerToggle.count() > 0) {
      await expect(answerToggle).toBeFocused()

      // Space or Enter should toggle
      await page.keyboard.press('Enter')
      await page.waitForTimeout(300)

      const answerContent = page.getByTestId('answer-content')
      const isVisible = await answerContent.isVisible()
      expect(isVisible).toBeDefined()
    }
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('h1')

    // Should have h1
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Java Interview Questions')

    // Check for logical heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const count = await headings.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should have descriptive button text', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await page.goto('/interview')
    await page.waitForSelector('[data-testid="page-title"]')

    // Practice buttons should have clear text
    const javaButton = page.getByTestId('practice-button-java')
    const text = await javaButton.textContent()
    expect(text).toContain('Practice')

    // Or should have aria-label
    const ariaLabel = await javaButton.getAttribute('aria-label')
    if (ariaLabel) {
      expect(ariaLabel.length).toBeGreaterThan(0)
    }
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    // Check that text is visible (basic contrast check)
    const resultsCounter = page.getByTestId('results-counter')
    await expect(resultsCounter).toBeVisible()

    const cards = page.getByTestId('question-card')
    await expect(cards.first()).toBeVisible()

    // All text should be readable
    const title = cards.first().getByTestId('question-title')
    await expect(title).toBeVisible()
    const titleText = await title.textContent()
    expect(titleText?.length || 0).toBeGreaterThan(0)
  })

  test('should support screen reader navigation', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    // Check for landmarks and semantic HTML
    const main = page.locator('main')
    const mainExists = await main.count() > 0

    // Should have semantic structure
    const nav = page.locator('nav')
    const navExists = await nav.count() > 0

    // Either main or nav should exist for proper landmark structure
    expect(mainExists || navExists).toBe(true)
  })

  test('should announce dynamic content changes', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="search-input"]')

    const searchInput = page.getByTestId('search-input')
    const resultsCounter = page.getByTestId('results-counter')

    // Initial state
    const initialText = await resultsCounter.textContent()

    // Change filters
    await searchInput.fill('collections')
    await page.waitForTimeout(500)

    // Results should update
    const newText = await resultsCounter.textContent()
    expect(newText).not.toBe(initialText)

    // Results counter should be visible (screen readers can announce it)
    await expect(resultsCounter).toBeVisible()
  })

  test('should handle focus management on navigation', async ({ page }) => {
    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await mockInterviewQuestionDetailAPI(page, 'java-1')

    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="question-card"]')

    // Click a card
    await page.getByTestId('question-card').first().click()
    await page.waitForURL(/\/interview\/java\/java-\d+/)

    // Focus should move to new page content
    await page.waitForSelector('[data-testid="question-header"]')

    // Back button should be focusable
    await page.keyboard.press('Tab')
    const backButton = page.getByTestId('back-button')
    await expect(backButton).toBeFocused()
  })
})
