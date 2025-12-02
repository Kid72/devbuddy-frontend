/**
 * Admin API Client for Learn Section Content Management
 * Provides CRUD operations for topics, drafts, versions, categories, and languages
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082";

// ============================================================================
// Types
// ============================================================================

export interface Topic {
  id: string;
  category_id: string;
  parent_topic_id?: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  depth: number;
  display_order: number;
  estimated_read_time?: number;
  prerequisites?: string[];
  tags?: string[];
  is_published: boolean;
  content_status: string;
  has_draft: boolean;
  current_version: number;
  last_edited_by?: string;
  last_edited_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TopicDraft {
  id: string;
  topic_id: string;
  content: string;
  status: "draft" | "review" | "approved" | "rejected";
  created_by?: string;
  last_modified_by?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface TopicVersion {
  id: string;
  topic_id: string;
  content: string;
  version_number: number;
  change_summary?: string;
  created_by?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface Category {
  id: string;
  language_id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  display_order: number;
  created_at: string;
}

export interface Language {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  color?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

// Request/Response types
export interface CreateTopicRequest {
  category_id: string;
  parent_topic_id?: string;
  title: string;
  slug: string;
  description?: string;
  difficulty: string;
  display_order: number;
  estimated_read_time?: number;
  prerequisites?: string[];
  tags?: string[];
}

export interface UpdateTopicRequest {
  title?: string;
  description?: string;
  difficulty?: string;
  display_order?: number;
  estimated_read_time?: number;
  prerequisites?: string[];
  tags?: string[];
}

export interface CreateOrUpdateDraftRequest {
  content: string;
  status?: string;
  edited_by?: string;
}

export interface PublishDraftRequest {
  published_by?: string;
}

export interface RevertToVersionRequest {
  reverted_by?: string;
}

export interface CreateCategoryRequest {
  language_id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  display_order: number;
}

export interface CreateLanguageRequest {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  color?: string;
  display_order: number;
}

// ============================================================================
// Helper Functions
// ============================================================================

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(error.error || error.message || "API request failed");
  }
  return response.json();
}

// ============================================================================
// Topic CRUD Operations
// ============================================================================

export async function createTopic(data: CreateTopicRequest): Promise<Topic> {
  const response = await fetch(`${API_BASE_URL}/api/admin/learn/topics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<{ topic: Topic }>(response);
  return result.topic;
}

export async function updateTopic(
  id: string,
  data: UpdateTopicRequest
): Promise<Topic> {
  const response = await fetch(`${API_BASE_URL}/api/admin/learn/topics/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<{ topic: Topic }>(response);
  return result.topic;
}

export async function deleteTopic(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/admin/learn/topics/${id}`, {
    method: "DELETE",
  });
  await handleResponse(response);
}

// ============================================================================
// Draft Management
// ============================================================================

export async function createOrUpdateDraft(
  topicId: string,
  data: CreateOrUpdateDraftRequest
): Promise<TopicDraft> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/learn/topics/${topicId}/draft`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const result = await handleResponse<{ draft: TopicDraft }>(response);
  return result.draft;
}

export async function getDraft(topicId: string): Promise<TopicDraft> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/learn/topics/${topicId}/draft`
  );
  return handleResponse<TopicDraft>(response);
}

export async function deleteDraft(topicId: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/learn/topics/${topicId}/draft`,
    {
      method: "DELETE",
    }
  );
  await handleResponse(response);
}

export async function publishDraft(
  topicId: string,
  data?: PublishDraftRequest
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/learn/topics/${topicId}/publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data || {}),
    }
  );
  await handleResponse(response);
}

export async function getAllDrafts(status?: string): Promise<TopicDraft[]> {
  const url = new URL(`${API_BASE_URL}/api/admin/learn/drafts`);
  if (status) url.searchParams.set("status", status);

  const response = await fetch(url.toString());
  const result = await handleResponse<{ drafts: TopicDraft[]; total: number }>(
    response
  );
  return result.drafts;
}

// ============================================================================
// Version History
// ============================================================================

export async function getVersionHistory(
  topicId: string
): Promise<TopicVersion[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/learn/topics/${topicId}/versions`
  );
  const result = await handleResponse<{
    versions: TopicVersion[];
    total: number;
  }>(response);
  return result.versions;
}

export async function getVersion(
  topicId: string,
  versionNumber: number
): Promise<TopicVersion> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/learn/topics/${topicId}/versions/${versionNumber}`
  );
  return handleResponse<TopicVersion>(response);
}

export async function revertToVersion(
  topicId: string,
  versionNumber: number,
  data?: RevertToVersionRequest
): Promise<TopicVersion> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/learn/topics/${topicId}/revert/${versionNumber}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data || {}),
    }
  );
  const result = await handleResponse<{ version: TopicVersion }>(response);
  return result.version;
}

// ============================================================================
// Category & Language Management
// ============================================================================

export async function createCategory(
  data: CreateCategoryRequest
): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/api/admin/learn/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<{ category: Category }>(response);
  return result.category;
}

export async function createLanguage(
  data: CreateLanguageRequest
): Promise<Language> {
  const response = await fetch(`${API_BASE_URL}/api/admin/learn/languages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await handleResponse<{ language: Language }>(response);
  return result.language;
}
