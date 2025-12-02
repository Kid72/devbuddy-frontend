/**
 * Admin API Client for Interview Questions Management
 * Provides CRUD operations for interview questions
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082";

// ============================================================================
// Types
// ============================================================================

export interface InterviewQuestion {
  id: string;
  title: string;
  slug: string;
  language_id: string;
  category: string;
  question: string;
  answer: string;
  code_examples: string[];
  hints: string[];
  related_topics: string[];
  video_url?: string;
  tags: string[];
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateInterviewQuestionRequest {
  title: string;
  slug?: string;
  category: string;
  question: string;
  answer: string;
  code_examples?: string[];
  hints?: string[];
  related_topics?: string[];
  video_url?: string;
  tags?: string[];
  is_published?: boolean;
}

export interface UpdateInterviewQuestionRequest {
  title?: string;
  slug?: string;
  category?: string;
  question?: string;
  answer?: string;
  code_examples?: string[];
  hints?: string[];
  related_topics?: string[];
  video_url?: string;
  tags?: string[];
  is_published?: boolean;
}

export interface InterviewQuestionsResponse {
  questions: InterviewQuestion[];
  total: number;
  limit: number;
  offset: number;
}

export interface InterviewQuestionsFilter {
  category?: string;
  difficulty?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

// ============================================================================
// Helper Functions
// ============================================================================

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(error.error || error.detail || error.message || "API request failed");
  }
  return response.json();
}

// ============================================================================
// Interview Questions CRUD Operations
// ============================================================================

/**
 * Get all interview questions for admin with filters and pagination
 */
export async function getInterviewQuestionsAdmin(
  filters?: InterviewQuestionsFilter
): Promise<InterviewQuestionsResponse> {
  const url = new URL(`${API_BASE_URL}/api/admin/interview/questions`);

  if (filters?.category) url.searchParams.set("category", filters.category);
  if (filters?.difficulty) url.searchParams.set("difficulty", filters.difficulty);
  if (filters?.search) url.searchParams.set("search", filters.search);
  if (filters?.limit) url.searchParams.set("limit", filters.limit.toString());
  if (filters?.offset) url.searchParams.set("offset", filters.offset.toString());

  const response = await fetch(url.toString());
  return handleResponse<InterviewQuestionsResponse>(response);
}

/**
 * Get a single interview question by ID for admin editing
 */
export async function getInterviewQuestionAdmin(id: string): Promise<InterviewQuestion> {
  const response = await fetch(`${API_BASE_URL}/api/admin/interview/questions/${id}`);
  return handleResponse<InterviewQuestion>(response);
}

/**
 * Create a new interview question
 */
export async function createInterviewQuestion(
  data: CreateInterviewQuestionRequest
): Promise<InterviewQuestion> {
  const response = await fetch(`${API_BASE_URL}/api/admin/interview/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<{ message: string; question: InterviewQuestion }>(response);
  return result.question;
}

/**
 * Update an existing interview question
 */
export async function updateInterviewQuestion(
  id: string,
  data: UpdateInterviewQuestionRequest
): Promise<InterviewQuestion> {
  const response = await fetch(`${API_BASE_URL}/api/admin/interview/questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<{ message: string; question: InterviewQuestion }>(response);
  return result.question;
}

/**
 * Delete an interview question
 */
export async function deleteInterviewQuestion(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/admin/interview/questions/${id}`, {
    method: "DELETE",
  });
  await handleResponse(response);
}

/**
 * Get interview categories (language slugs)
 */
export async function getInterviewCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/interview/categories`);
  const result = await handleResponse<{ categories: string[]; total: number }>(response);
  return result.categories;
}

/**
 * Get interview statistics
 */
export async function getInterviewStats(): Promise<{
  total_questions: number;
  by_category: Record<string, number>;
}> {
  const response = await fetch(`${API_BASE_URL}/api/interview/stats`);
  return handleResponse(response);
}
