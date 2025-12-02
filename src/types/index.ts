// API Response Types (based on backend API documentation)

export interface UploadResponse {
  cv_id: string;
}

export interface ApiError {
  error: string;
  message: string;
}

export interface StatusResponse {
  cv_id: string;
  status: "uploaded" | "processing" | "completed" | "failed";
  progress_percentage: number;
}

// Section types (Phase 2)
export type SectionType =
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "certifications"
  | "languages"
  | "interests";

export type SectionStatus = "pending" | "approved" | "edited" | "rejected";

export interface Section {
  id: string;
  type: SectionType;
  index: number;
  original: string | null;
  improved: string;
  user_edit: string | null;
  status: SectionStatus;
}

export interface ImprovementsResponse {
  cv_id: string;
  status: "uploaded" | "processing" | "completed" | "failed";
  progress_percentage: number;
  sections: Section[];
}

export interface GenerateResponse {
  cv_id: string;
  docx_url: string;
  pdf_url?: string; // Optional - PDF conversion might fail
}

// File handling types
export interface CVFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

// Component prop types
export interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}

export interface SectionCardProps {
  section: Section;
  onApprove: (sectionId: string) => Promise<void>;
  onEdit: (sectionId: string, content: string) => Promise<void>;
}

// News API Types (matching backend response)

export interface NewsArticle {
  id: string;
  source_id: string;
  title: string;
  url: string;
  summary: string;
  image_url: string | null;
  full_content: string | null;
  author: string | null;
  published_at: string; // ISO 8601 date string
  scraped_at: string;
  tags: string[];
  category: string;
  is_published: boolean;
  created_at: string;
  // Optional computed fields for frontend
  source_name?: string;
  external_url?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  domain: string;
  category: string;
  priority: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetNewsParams {
  category?: string;
  tags?: string[];
  source_id?: string;
  sort_by?: "published_at" | "created_at" | "title";
  sort_order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface GetNewsResponse {
  articles: NewsArticle[];
  total: number;
}

// ===================================================================
// Learn Platform Types
// ===================================================================

export interface Language {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  language_id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at?: string;
  updated_at?: string;
  // Frontend computed fields
  languageSlug?: string;
  topicCount?: number;
}

export interface Topic {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_read_time: number | null;
  display_order: number;
  prerequisites: string[];
  content: string | null;
  content_status: "pending" | "generating" | "completed" | "failed";
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  published_at?: string | null;
  // Frontend computed fields
  languageSlug?: string;
  categorySlug?: string;
  readTime?: number;
}

export interface LearnStats {
  total_languages: number;
  total_categories: number;
  total_topics: number;
  completed_topics: number;
  pending_topics: number;
  failed_topics: number;
  published_topics: number;
  progress_percentage: number;
}

export interface LanguageWithCategories extends Language {
  categories: Category[];
}

export interface CategoryWithTopics extends Category {
  topics: Topic[];
}

// ===================================================================
// Note: Additional mock data types for features not yet implemented:
// - Job: src/lib/mock-data/jobs.ts
// - InterviewQuestion: src/lib/mock-data/interview.ts
// ===================================================================
