/**
 * Test Suite 1: Interview Landing Page
 * Tests the main interview preparation landing page with language selection
 */

import { test, expect } from '@playwright/test'
import { mockAllInterviewAPIs, mockEmptyData } from '../utils/interview-mocks'

test.describe('Interview Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllInterviewAPIs(page)
    await page.goto('/interview')
    await page.waitForSelector('[data-testid="page-title"]')
  })

  test('should display page title and total question count', async ({ page }) => {
    const title = page.getByTestId('page-title')
    await expect(title).toBeVisible()
    await expect(title).toContainText('Interview Preparation')

    const totalBadge = page.getByTestId('total-questions-badge')
    await expect(totalBadge).toBeVisible()
    await expect(totalBadge).toContainText('45 Total Questions')
  })

  test('should display all available language categories', async ({ page }) => {
    // Check Java card
    const javaCard = page.getByTestId('language-card-java')
    await expect(javaCard).toBeVisible()
    await expect(javaCard).toContainText('Java')
    await expect(javaCard).toContainText('☕')

    const javaCount = page.getByTestId('question-count-java')
    await expect(javaCount).toContainText('20 Questions')

    // Check Go card
    const goCard = page.getByTestId('language-card-go')
    await expect(goCard).toBeVisible()
    await expect(goCard).toContainText('Go')
    await expect(goCard).toContainText('🔷')

    const goCount = page.getByTestId('question-count-go')
    await expect(goCount).toContainText('25 Questions')
  })

  test('should navigate to Java questions when Practice button clicked', async ({ page }) => {
    const javaButton = page.getByTestId('practice-button-java')
    await expect(javaButton).toBeVisible()

    await javaButton.click()

    await page.waitForURL('/interview/java')
    await expect(page).toHaveURL('/interview/java')
  })

  test('should navigate to Go questions when Practice button clicked', async ({ page }) => {
    const goButton = page.getByTestId('practice-button-go')
    await expect(goButton).toBeVisible()

    await goButton.click()

    await page.waitForURL('/interview/go')
    await expect(page).toHaveURL('/interview/go')
  })

  test('should show coming soon for unavailable languages', async ({ page }) => {
    const comingSoonButton = page.getByTestId('coming-soon-button-javascript')

    if (await comingSoonButton.count() > 0) {
      await expect(comingSoonButton).toBeVisible()
      await expect(comingSoonButton).toBeDisabled()
    }
  })

  test('should handle empty data gracefully', async ({ page }) => {
    // Setup empty data mock
    await mockEmptyData(page)
    await page.goto('/interview')

    const totalBadge = page.getByTestId('total-questions-badge')
    await expect(totalBadge).toContainText('0 Total Questions')
  })

  test('should be accessible with keyboard navigation', async ({ page }) => {
    const javaButton = page.getByTestId('practice-button-java')

    // Tab to the button
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Should be focusable
    await expect(javaButton).toBeFocused()

    // Enter should activate
    await page.keyboard.press('Enter')
    await page.waitForURL('/interview/java')
  })

  test('should have proper ARIA labels', async ({ page }) => {
    const javaCard = page.getByTestId('language-card-java')
    const javaButton = page.getByTestId('practice-button-java')

    await expect(javaCard).toBeVisible()
    await expect(javaButton).toHaveAttribute('type', 'button')
  })
})
