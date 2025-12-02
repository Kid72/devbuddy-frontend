/**
 * API Mocking Helpers for Interview Feature Tests
 * Provides route interception and mock responses for Playwright tests
 */

import { Page, Route } from '@playwright/test'
import {
  InterviewQuestion,
  InterviewStats,
  mockStats,
  mockCategories,
  getQuestionsByLanguage,
  getQuestionById,
  filterByDifficulty,
  searchQuestions,
} from '../fixtures/interview-data'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MockAPIOptions {
  delay?: number // Simulate network delay in ms
  statusCode?: number // HTTP status code
  failRate?: number // Probability of failure (0-1)
}

export interface QuestionsAPIResponse {
  questions: InterviewQuestion[]
  total: number
  page: number
  limit: number
}

// ============================================================================
// STATS API MOCKING
// ============================================================================

/**
 * Mock the interview stats API endpoint
 */
export async function mockInterviewStatsAPI(
  page: Page,
  options: MockAPIOptions = {}
) {
  const { delay = 0, statusCode = 200, failRate = 0 } = options

  await page.route('**/api/interview/stats', async (route: Route) => {
    // Simulate delay
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Simulate random failure
    if (failRate > 0 && Math.random() < failRate) {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      })
      return
    }

    // Success response
    await route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify(mockStats),
    })
  })
}

// ============================================================================
// QUESTIONS LIST API MOCKING
// ============================================================================

/**
 * Mock the questions list API endpoint
 */
export async function mockInterviewQuestionsAPI(
  page: Page,
  language: string,
  options: MockAPIOptions = {}
) {
  const { delay = 0, statusCode = 200, failRate = 0 } = options

  await page.route(
    `**/api/interview/categories/${language}/questions**`,
    async (route: Route) => {
      // Simulate delay
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      // Simulate random failure
      if (failRate > 0 && Math.random() < failRate) {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to fetch questions' }),
        })
        return
      }

      // Parse query parameters
      const url = new URL(route.request().url())
      const limit = parseInt(url.searchParams.get('limit') || '100')
      const offset = parseInt(url.searchParams.get('offset') || '0')
      const difficulty = url.searchParams.get('difficulty')
      const search = url.searchParams.get('search')

      // Get questions for language
      let questions = getQuestionsByLanguage(language)

      // Apply filters
      if (difficulty && difficulty !== 'all') {
        questions = filterByDifficulty(
          questions,
          difficulty as 'easy' | 'medium' | 'hard'
        )
      }

      if (search) {
        questions = searchQuestions(questions, search)
      }

      // Apply pagination
      const total = questions.length
      const paginatedQuestions = questions.slice(offset, offset + limit)

      // Success response
      const response: QuestionsAPIResponse = {
        questions: paginatedQuestions,
        total,
        page: Math.floor(offset / limit) + 1,
        limit,
      }

      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify(response),
      })
    }
  )
}

// ============================================================================
// QUESTION DETAIL API MOCKING
// ============================================================================

/**
 * Mock the question detail API endpoint
 */
export async function mockInterviewQuestionDetailAPI(
  page: Page,
  questionId: string,
  options: MockAPIOptions = {}
) {
  const { delay = 0, statusCode = 200, failRate = 0 } = options

  await page.route(
    `**/api/interview/questions/${questionId}`,
    async (route: Route) => {
      // Simulate delay
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      // Simulate random failure
      if (failRate > 0 && Math.random() < failRate) {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to fetch question' }),
        })
        return
      }

      // Get question by ID
      const question = getQuestionById(questionId)

      if (!question) {
        await route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Question not found' }),
        })
        return
      }

      // Success response
      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify(question),
      })
    }
  )
}

// ============================================================================
// CATEGORIES API MOCKING
// ============================================================================

/**
 * Mock the categories API endpoint
 */
export async function mockInterviewCategoriesAPI(
  page: Page,
  options: MockAPIOptions = {}
) {
  const { delay = 0, statusCode = 200, failRate = 0 } = options

  await page.route('**/api/interview/categories', async (route: Route) => {
    // Simulate delay
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Simulate random failure
    if (failRate > 0 && Math.random() < failRate) {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to fetch categories' }),
      })
      return
    }

    // Success response
    await route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify({ categories: mockCategories }),
    })
  })
}

// ============================================================================
// COMPREHENSIVE API MOCKING (ALL ENDPOINTS)
// ============================================================================

/**
 * Mock all interview API endpoints at once
 */
export async function mockAllInterviewAPIs(
  page: Page,
  options: MockAPIOptions = {}
) {
  await mockInterviewStatsAPI(page, options)
  await mockInterviewCategoriesAPI(page, options)
  await mockInterviewQuestionsAPI(page, 'java', options)
  await mockInterviewQuestionsAPI(page, 'go', options)
  await mockInterviewQuestionsAPI(page, 'javascript', options)
  await mockInterviewQuestionsAPI(page, 'python', options)

  // Mock all question detail endpoints (dynamic)
  await page.route('**/api/interview/questions/*', async (route: Route) => {
    const url = new URL(route.request().url())
    const questionId = url.pathname.split('/').pop() || ''

    const { delay = 0, statusCode = 200, failRate = 0 } = options

    // Simulate delay
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Simulate random failure
    if (failRate > 0 && Math.random() < failRate) {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to fetch question' }),
      })
      return
    }

    // Get question by ID
    const question = getQuestionById(questionId)

    if (!question) {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Question not found' }),
      })
      return
    }

    // Success response
    await route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify(question),
    })
  })
}

// ============================================================================
// SLOW API SIMULATION
// ============================================================================

/**
 * Mock slow API responses for performance testing
 */
export async function mockSlowAPI(page: Page, delayMs: number = 5000) {
  await mockAllInterviewAPIs(page, { delay: delayMs })
}

// ============================================================================
// ERROR API SIMULATION
// ============================================================================

/**
 * Mock API errors for error handling tests
 */
export async function mockAPIError(
  page: Page,
  errorType: '500' | '404' | '403' | 'timeout' = '500'
) {
  const errorResponses = {
    '500': {
      status: 500,
      body: { error: 'Internal server error' },
    },
    '404': {
      status: 404,
      body: { error: 'Not found' },
    },
    '403': {
      status: 403,
      body: { error: 'Forbidden' },
    },
    timeout: {
      status: 408,
      body: { error: 'Request timeout' },
    },
  }

  const errorConfig = errorResponses[errorType]

  // Mock all endpoints to return error
  await page.route('**/api/interview/**', async (route: Route) => {
    if (errorType === 'timeout') {
      // Simulate timeout by delaying and then failing
      await new Promise(resolve => setTimeout(resolve, 10000))
    }

    await route.fulfill({
      status: errorConfig.status,
      contentType: 'application/json',
      body: JSON.stringify(errorConfig.body),
    })
  })
}

// ============================================================================
// FLAKY API SIMULATION
// ============================================================================

/**
 * Mock flaky API for resilience testing
 */
export async function mockFlakyAPI(page: Page, failureRate: number = 0.3) {
  await mockAllInterviewAPIs(page, { failRate: failureRate })
}

// ============================================================================
// EMPTY DATA SIMULATION
// ============================================================================

/**
 * Mock API responses with empty data
 */
export async function mockEmptyData(page: Page) {
  await page.route('**/api/interview/stats', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        totalQuestions: 0,
        languageBreakdown: [],
      }),
    })
  })

  await page.route('**/api/interview/categories/*/questions**', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        questions: [],
        total: 0,
        page: 1,
        limit: 100,
      }),
    })
  })
}

// ============================================================================
// PARTIAL DATA SIMULATION
// ============================================================================

/**
 * Mock API with partial/limited data for edge cases
 */
export async function mockPartialData(page: Page, questionCount: number = 3) {
  await mockInterviewStatsAPI(page)

  await page.route('**/api/interview/categories/*/questions**', async (route: Route) => {
    const url = new URL(route.request().url())
    const language = url.pathname.split('/')[4] // Extract language from path

    let questions = getQuestionsByLanguage(language)
    questions = questions.slice(0, questionCount)

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        questions,
        total: questions.length,
        page: 1,
        limit: 100,
      }),
    })
  })
}

// ============================================================================
// NETWORK CONDITIONS SIMULATION
// ============================================================================

/**
 * Simulate different network conditions
 */
export async function simulateNetworkCondition(
  page: Page,
  condition: 'fast' | 'slow' | 'offline' | 'unstable'
) {
  switch (condition) {
    case 'fast':
      await mockAllInterviewAPIs(page, { delay: 50 })
      break
    case 'slow':
      await mockAllInterviewAPIs(page, { delay: 3000 })
      break
    case 'offline':
      await page.route('**/api/**', route => route.abort())
      break
    case 'unstable':
      await mockAllInterviewAPIs(page, { delay: 2000, failRate: 0.5 })
      break
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Wait for API response (for use in tests)
 */
export async function waitForAPIResponse(
  page: Page,
  urlPattern: string,
  timeout: number = 5000
) {
  return page.waitForResponse(
    response => response.url().includes(urlPattern) && response.status() === 200,
    { timeout }
  )
}

/**
 * Clear all route mocks
 */
export async function clearAllMocks(page: Page) {
  await page.unrouteAll({ behavior: 'ignoreErrors' })
}

/**
 * Mock specific question with custom data
 */
export async function mockCustomQuestion(
  page: Page,
  questionId: string,
  customData: Partial<InterviewQuestion>
) {
  await page.route(`**/api/interview/questions/${questionId}`, async (route: Route) => {
    const baseQuestion = getQuestionById(questionId) || {
      id: questionId,
      title: 'Custom Question',
      question: 'Custom question text',
      answer: 'Custom answer',
      difficulty: 'medium' as const,
      category: 'Custom',
      tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ...baseQuestion, ...customData }),
    })
  })
}

// ============================================================================
// REQUEST INTERCEPTOR (for debugging)
// ============================================================================

/**
 * Log all API requests (useful for debugging tests)
 */
export async function logAPIRequests(page: Page) {
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      console.log(`→ ${request.method()} ${request.url()}`)
    }
  })

  page.on('response', response => {
    if (response.url().includes('/api/')) {
      console.log(`← ${response.status()} ${response.url()}`)
    }
  })
}
