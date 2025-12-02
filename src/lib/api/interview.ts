// Interview Questions API Client

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082'

export interface CodeExample {
  language: string
  code: string
  description: string
}

export interface InterviewQuestion {
  id: string
  title: string
  slug: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question: string
  answer: string
  code_examples: CodeExample[]
  hints: string[]
  related_topics: string[] // Topic UUIDs
  video_url?: string
  tags: string[]
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface QuestionsResponse {
  questions: InterviewQuestion[]
  total: number
  limit: number
  offset: number
}

export interface CategoriesResponse {
  categories: string[]
  total: number
}

export interface StatsResponse {
  total_questions: number
  by_category: Record<string, number>
  most_viewed_questions: InterviewQuestion[]
}

export interface GetQuestionsParams {
  category?: string
  search?: string
  tags?: string[]
  limit?: number
  offset?: number
}

/**
 * Fetch all interview categories
 */
export async function getInterviewCategories(): Promise<CategoriesResponse> {
  const response = await fetch(`${API_BASE_URL}/api/interview/categories`)

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch interview questions with optional filters
 */
export async function getInterviewQuestions(
  params: GetQuestionsParams = {}
): Promise<QuestionsResponse> {
  const searchParams = new URLSearchParams()

  if (params.category) searchParams.set('category', params.category)
  if (params.search) searchParams.set('search', params.search)
  if (params.tags && params.tags.length > 0) {
    searchParams.set('tags', params.tags.join(','))
  }
  searchParams.set('limit', String(params.limit || 20))
  searchParams.set('offset', String(params.offset || 0))

  const response = await fetch(
    `${API_BASE_URL}/api/interview/questions?${searchParams.toString()}`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch a single interview question by ID or slug
 */
export async function getInterviewQuestionById(
  id: string
): Promise<InterviewQuestion> {
  const response = await fetch(`${API_BASE_URL}/api/interview/questions/${id}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Question not found')
    }
    throw new Error(`Failed to fetch question: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch questions by category
 */
export async function getQuestionsByCategory(
  category: string,
  limit: number = 20,
  offset: number = 0
): Promise<QuestionsResponse> {
  const searchParams = new URLSearchParams()
  searchParams.set('limit', String(limit))
  searchParams.set('offset', String(offset))

  const response = await fetch(
    `${API_BASE_URL}/api/interview/categories/${category}/questions?${searchParams.toString()}`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch questions for category: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Search interview questions
 */
export async function searchInterviewQuestions(
  query: string,
  limit: number = 20,
  offset: number = 0
): Promise<QuestionsResponse> {
  const searchParams = new URLSearchParams()
  searchParams.set('q', query)
  searchParams.set('limit', String(limit))
  searchParams.set('offset', String(offset))

  const response = await fetch(
    `${API_BASE_URL}/api/interview/search?${searchParams.toString()}`
  )

  if (!response.ok) {
    throw new Error(`Failed to search questions: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch interview statistics
 */
export async function getInterviewStats(): Promise<StatsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/interview/stats`)

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch questions related to a Learn topic
 */
export async function getRelatedQuestions(
  topicId: string,
  limit: number = 5
): Promise<QuestionsResponse> {
  const searchParams = new URLSearchParams()
  searchParams.set('limit', String(limit))

  const response = await fetch(
    `${API_BASE_URL}/api/interview/topics/${topicId}/questions?${searchParams.toString()}`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch related questions: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Alias for getRelatedQuestions for clarity
 */
export async function getQuestionsByTopicId(
  topicId: string,
  limit: number = 5
): Promise<QuestionsResponse> {
  return getRelatedQuestions(topicId, limit)
}

/**
 * Format category name for display
 */
export function formatCategoryName(category: string): string {
  const categoryNames: Record<string, string> = {
    'java': 'Java',
    'go': 'Go',
    'python': 'Python',
    'algorithms': 'Algorithms',
    'system-design': 'System Design',
  }
  return categoryNames[category] || category
}
