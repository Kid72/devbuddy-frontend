import {
  UploadResponse,
  ApiError,
  StatusResponse,
  ImprovementsResponse,
  GenerateResponse,
  GetNewsParams,
  GetNewsResponse,
  NewsArticle,
  NewsSource,
  Language,
  Category,
  Topic,
  LearnStats,
  LanguageWithCategories,
  CategoryWithTopics,
} from "@/types";

// Re-export types for external use
export type { NewsArticle };
import { createClient } from '@/lib/supabase/client';

// API Configuration (from backend documentation)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082";

/**
 * Get authorization headers with Supabase JWT token
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  return headers;
}

/**
 * Custom error class for API errors
 */
export class ApiException extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error?: string
  ) {
    super(message);
    this.name = "ApiException";
  }
}

/**
 * Upload CV file to the backend
 * @param file - The CV file (PDF, DOCX, or DOC)
 * @returns Promise with cv_id
 * @throws ApiException on error
 */
export async function uploadCV(file: File): Promise<string> {
  try {
    // Get auth token
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Create FormData with the file
    const formData = new FormData();
    formData.append("file", file);

    // Prepare headers with auth token
    const headers: HeadersInit = {};
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    // Make POST request to upload endpoint
    const response = await fetch(`${API_BASE_URL}/api/cv/upload`, {
      method: "POST",
      body: formData,
      credentials: "include", // Required for CORS with AllowCredentials
      headers, // Add auth headers
      // Don't set Content-Type header - browser will set it with boundary
    });

    // Handle non-200 responses
    if (!response.ok) {
      // Handle 401 Unauthorized - redirect to login
      if (response.status === 401) {
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        throw new ApiException("Authentication required", 401);
      }

      // Try to parse error response
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Upload failed",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        // If JSON parsing fails, throw generic error
        throw new ApiException(
          `Upload failed with status ${response.status}`,
          response.status
        );
      }
    }

    // Parse successful response
    const data: UploadResponse = await response.json();

    if (!data.cv_id) {
      throw new ApiException("Invalid response: missing cv_id", 500);
    }

    return data.cv_id;
  } catch (error) {
    // Re-throw ApiException as-is
    if (error instanceof ApiException) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    // Handle other errors
    throw new ApiException(
      error instanceof Error ? error.message : "An unknown error occurred",
      0
    );
  }
}

/**
 * Get user-friendly error message from ApiException
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiException) {
    // Map specific error messages to user-friendly versions
    const message = error.message.toLowerCase();

    if (message.includes("no file uploaded")) {
      return "Please select a file to upload.";
    }

    if (message.includes("file too large")) {
      return "File size must be under 10MB.";
    }

    if (message.includes("unsupported file type")) {
      return "Please upload a PDF, DOCX, or DOC file only.";
    }

    if (message.includes("connect to server")) {
      return "Cannot connect to server. Please ensure the backend is running on port 8082.";
    }

    // Return the original message for other cases
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}

/**
 * Get CV processing status
 * @param cvId - The CV ID
 * @returns Promise with status and progress
 * @throws ApiException on error
 */
export async function getCVStatus(cvId: string): Promise<StatusResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/cv/${cvId}/status`, {
      credentials: "include",
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        throw new ApiException("Authentication required", 401);
      }

      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to get status",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to get status: ${response.status}`,
          response.status
        );
      }
    }

    const data: StatusResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to check status",
      0
    );
  }
}

/**
 * Get CV improvements (all sections)
 * @param cvId - The CV ID
 * @returns Promise with improvements and sections
 * @throws ApiException on error
 */
export async function getImprovements(
  cvId: string
): Promise<ImprovementsResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/cv/${cvId}/improvements`, {
      credentials: "include",
      headers,
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to get improvements",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to get improvements: ${response.status}`,
          response.status
        );
      }
    }

    const data: ImprovementsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to get improvements",
      0
    );
  }
}

/**
 * Update a CV section
 * @param cvId - The CV ID
 * @param sectionId - The section ID
 * @param content - The updated content
 * @param status - The new status (pending, approved, edited, rejected)
 * @returns Promise with success message
 * @throws ApiException on error
 */
export async function updateSection(
  cvId: string,
  sectionId: string,
  content: string,
  status: string
): Promise<{ message: string }> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/cv/${cvId}/sections/${sectionId}`,
      {
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify({ content, status }),
      }
    );

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to update section",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to update section: ${response.status}`,
          response.status
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to update section",
      0
    );
  }
}

/**
 * Generate CV documents (DOCX and PDF)
 * @param cvId - The CV ID
 * @returns Promise with download URLs
 * @throws ApiException on error
 */
export async function generateCV(cvId: string): Promise<GenerateResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/cv/${cvId}/generate`, {
      method: "POST",
      credentials: "include",
      headers,
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to generate CV",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to generate CV: ${response.status}`,
          response.status
        );
      }
    }

    const data: GenerateResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to generate CV",
      0
    );
  }
}

/**
 * Download CV file in specified format
 * @param cvId - The CV ID
 * @param format - File format ('docx' or 'pdf')
 * @throws ApiException on error
 */
export async function downloadCV(
  cvId: string,
  format: "docx" | "pdf"
): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/cv/${cvId}/download/${format}`,
      { credentials: "include", headers }
    );

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to download",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to download: ${response.status}`,
          response.status
        );
      }
    }

    // Get filename from headers or use default
    const contentDisposition = response.headers.get("Content-Disposition");
    const filenameMatch = contentDisposition?.match(/filename="?(.+?)"?$/i);
    const filename = filenameMatch?.[1] || `cv_optimized.${format}`;

    // Download file
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to download",
      0
    );
  }
}

// ============================================================================
// NEWS API ENDPOINTS
// ============================================================================

/**
 * Get news articles with optional filtering and pagination
 * @param params - Query parameters for filtering articles
 * @returns Promise with articles array and total count
 * @throws ApiException on error
 */
export async function getNews(
  params?: GetNewsParams
): Promise<GetNewsResponse> {
  try {
    // Build query string
    const queryParams = new URLSearchParams();

    if (params?.category) {
      queryParams.append("category", params.category);
    }

    if (params?.tags && params.tags.length > 0) {
      params.tags.forEach((tag) => queryParams.append("tag", tag));
    }

    if (params?.source_id) {
      queryParams.append("source_id", params.source_id);
    }

    if (params?.sort_by) {
      queryParams.append("sort_by", params.sort_by);
    }

    if (params?.sort_order) {
      queryParams.append("sort_order", params.sort_order);
    }

    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    if (params?.offset) {
      queryParams.append("offset", params.offset.toString());
    }

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/api/news${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to fetch news",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to fetch news: ${response.status}`,
          response.status
        );
      }
    }

    const data: GetNewsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to fetch news",
      0
    );
  }
}

/**
 * Search news articles by query
 * @param query - Search query string
 * @param limit - Maximum number of results (default: 5)
 * @returns Promise with array of matching articles (empty array on error)
 */
export async function searchNews(
  query: string,
  limit: number = 5
): Promise<NewsArticle[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/news?search=${encodeURIComponent(query)}&limit=${limit}`,
      { credentials: "include" }
    );

    if (!response.ok) return [];

    const data: GetNewsResponse = await response.json();
    return data.articles || [];
  } catch {
    return [];
  }
}

/**
 * Get a single news article by ID
 * @param articleId - The article ID
 * @returns Promise with article data
 * @throws ApiException on error
 */
export async function getArticle(articleId: string): Promise<NewsArticle> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/${articleId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to fetch article",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to fetch article: ${response.status}`,
          response.status
        );
      }
    }

    const data: NewsArticle = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to fetch article",
      0
    );
  }
}

/**
 * Get all available news sources
 * @returns Promise with array of news sources
 * @throws ApiException on error
 */
export async function getSources(): Promise<NewsSource[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/sources`, {
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to fetch sources",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to fetch sources: ${response.status}`,
          response.status
        );
      }
    }

    const data: { sources: NewsSource[]; total: number } = await response.json();
    return data.sources;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to fetch sources",
      0
    );
  }
}

// ====================================================================
// LEARN PLATFORM API
// ====================================================================

/**
 * Get all programming languages
 * @returns Promise with array of languages
 * @throws ApiException on error
 */
export async function getLanguages(): Promise<Language[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/learn/languages`, {
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to fetch languages",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to fetch languages: ${response.status}`,
          response.status
        );
      }
    }

    const data: { languages: Language[]; total: number } = await response.json();
    return data.languages;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to fetch languages",
      0
    );
  }
}

/**
 * Get a single language with its categories
 * @param slug - Language slug (e.g., "java", "go")
 * @returns Promise with language and categories
 * @throws ApiException on error
 */
export async function getLanguageBySlug(slug: string): Promise<LanguageWithCategories> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/learn/languages/${slug}`, {
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to fetch language",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to fetch language: ${response.status}`,
          response.status
        );
      }
    }

    const data = await response.json();

    // Transform the backend response to match our frontend types
    // Backend returns: { language: {...}, categories: [{category: {...}, topics: [...]}] }
    // Frontend expects: { ...languageProps, categories: [{...categoryProps, topicCount: number}] }
    const transformed: LanguageWithCategories = {
      ...data.language,
      categories: data.categories.map((cat: any) => ({
        ...cat.category,
        topicCount: cat.topics?.length || 0,
      })),
    };

    return transformed;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to fetch language",
      0
    );
  }
}

/**
 * Get topics for a specific category
 * @param languageSlug - Language slug (e.g., "java")
 * @param categorySlug - Category slug (e.g., "fundamentals")
 * @returns Promise with category and topics
 * @throws ApiException on error
 */
export async function getCategoryTopics(
  languageSlug: string,
  categorySlug: string
): Promise<CategoryWithTopics> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/learn/languages/${languageSlug}/categories/${categorySlug}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to fetch category topics",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to fetch category topics: ${response.status}`,
          response.status
        );
      }
    }

    const data: CategoryWithTopics = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to fetch category topics",
      0
    );
  }
}

/**
 * Get a single topic by slug
 * @param languageSlug - Language slug
 * @param categorySlug - Category slug
 * @param topicSlug - Topic slug
 * @returns Promise with topic data
 * @throws ApiException on error
 */
export async function getTopicBySlug(
  languageSlug: string,
  categorySlug: string,
  topicSlug: string
): Promise<Topic> {
  try {
    // First get the category with topics to find the topic ID
    const categoryData = await getCategoryTopics(languageSlug, categorySlug);
    const topic = categoryData.topics.find((t) => t.slug === topicSlug);

    if (!topic) {
      throw new ApiException(
        `Topic "${topicSlug}" not found in category "${categorySlug}"`,
        404
      );
    }

    // Then fetch the full topic by ID
    const response = await fetch(`${API_BASE_URL}/api/learn/topics/${topic.id}`, {
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to fetch topic",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to fetch topic: ${response.status}`,
          response.status
        );
      }
    }

    const responseData: { topic: Topic } = await response.json();
    return responseData.topic;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to fetch topic",
      0
    );
  }
}

/**
 * Get overall Learn platform statistics
 * @returns Promise with statistics
 * @throws ApiException on error
 */
export async function getLearnStats(): Promise<LearnStats> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/learn/stats`, {
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData: ApiError = await response.json();
        throw new ApiException(
          errorData.message || "Failed to fetch stats",
          response.status,
          errorData.error
        );
      } catch (parseError) {
        throw new ApiException(
          `Failed to fetch stats: ${response.status}`,
          response.status
        );
      }
    }

    const data: LearnStats = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiException(
        "Failed to connect to server. Please ensure the backend is running.",
        0
      );
    }

    throw new ApiException(
      error instanceof Error ? error.message : "Failed to fetch stats",
      0
    );
  }
}
