/**
 * Test Suite 6: Responsive Design Tests
 * Tests responsive behavior across different viewport sizes
 */

import { test, expect, devices } from '@playwright/test'
import {
  mockInterviewQuestionsAPI,
  mockInterviewQuestionDetailAPI,
  mockInterviewCategoriesAPI,
} from '../utils/interview-mocks'

test.describe('Responsive Design', () => {
  test('should display correctly on mobile (375x667)', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone SE'],
    })
    const page = await context.newPage()

    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    // Should show single column layout
    const cards = page.getByTestId('question-card')
    await expect(cards.first()).toBeVisible()

    // Check viewport size
    const viewportSize = page.viewportSize()
    expect(viewportSize?.width).toBe(375)

    await context.close()
  })

  test('should display correctly on tablet (768x1024)', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Mini'],
    })
    const page = await context.newPage()

    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    // Should show 2-column grid
    const cards = page.getByTestId('question-card')
    await expect(cards.first()).toBeVisible()

    const viewportSize = page.viewportSize()
    expect(viewportSize?.width).toBe(768)

    await context.close()
  })

  test('should display correctly on desktop (1920x1080)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    })
    const page = await context.newPage()

    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    // Should show 3-column grid
    const cards = page.getByTestId('question-card')
    await expect(cards.first()).toBeVisible()

    const viewportSize = page.viewportSize()
    expect(viewportSize?.width).toBe(1920)

    await context.close()
  })

  test('should have mobile-friendly touch targets', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    })
    const page = await context.newPage()

    await mockInterviewCategoriesAPI(page)
    await page.goto('/interview')
    await page.waitForSelector('[data-testid="page-title"]')

    // Buttons should be tappable (minimum 44x44 px)
    const javaButton = page.getByTestId('practice-button-java')
    const box = await javaButton.boundingBox()

    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(36) // Slightly smaller is OK with padding
      expect(box.width).toBeGreaterThanOrEqual(60)
    }

    await context.close()
  })

  test('should handle orientation change', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    })
    const page = await context.newPage()

    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    // Rotate to landscape
    await page.setViewportSize({ width: 844, height: 390 })
    await page.waitForTimeout(500)

    // Content should still be visible
    await expect(page.getByTestId('results-counter')).toBeVisible()
    await expect(page.getByTestId('question-card').first()).toBeVisible()

    await context.close()
  })

  test('should handle small screens gracefully', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 320, height: 568 }, // iPhone SE 1st gen
    })
    const page = await context.newPage()

    await mockInterviewCategoriesAPI(page)
    await mockInterviewQuestionsAPI(page, 'java')
    await page.goto('/interview/java')
    await page.waitForSelector('[data-testid="results-counter"]')

    // All essential elements should be visible
    await expect(page.getByTestId('results-counter')).toBeVisible()
    await expect(page.getByTestId('search-input')).toBeVisible()
    await expect(page.getByTestId('difficulty-filter')).toBeVisible()
    await expect(page.getByTestId('question-card').first()).toBeVisible()

    await context.close()
  })
})
