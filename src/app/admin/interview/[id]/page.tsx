"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  InterviewQuestion,
  getInterviewQuestionAdmin,
  updateInterviewQuestion,
  deleteInterviewQuestion,
  getInterviewCategories,
  UpdateInterviewQuestionRequest,
} from "@/lib/api/admin-interview";
import { ArrowLeft, Save, Trash2, AlertCircle, Plus, Eye, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EditInterviewQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [codeExamples, setCodeExamples] = useState<string[]>([]);
  const [hints, setHints] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (questionId) {
      fetchQuestion();
    }
  }, [questionId]);

  const fetchCategories = async () => {
    try {
      const cats = await getInterviewCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories(["java", "go", "python", "algorithms", "system-design"]);
    }
  };

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const data = await getInterviewQuestionAdmin(questionId);
      setTitle(data.title);
      setSlug(data.slug || "");
      setCategory(data.category);
      setQuestion(data.question);
      setAnswer(data.answer);
      setCodeExamples(data.code_examples || []);
      setHints(data.hints || []);
      setVideoUrl(data.video_url || "");
      setTags(data.tags || []);
      setIsPublished(data.is_published);
    } catch (error: any) {
      console.error("Failed to fetch question:", error);
      setError(error.message || "Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddCodeExample = () => {
    setCodeExamples([...codeExamples, ""]);
  };

  const handleUpdateCodeExample = (index: number, value: string) => {
    const updated = [...codeExamples];
    updated[index] = value;
    setCodeExamples(updated);
  };

  const handleRemoveCodeExample = (index: number) => {
    setCodeExamples(codeExamples.filter((_, i) => i !== index));
  };

  const handleAddHint = () => {
    setHints([...hints, ""]);
  };

  const handleUpdateHint = (index: number, value: string) => {
    const updated = [...hints];
    updated[index] = value;
    setHints(updated);
  };

  const handleRemoveHint = (index: number) => {
    setHints(hints.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!question.trim()) {
      setError("Question text is required");
      return;
    }
    if (!answer.trim()) {
      setError("Answer is required");
      return;
    }

    try {
      setSaving(true);

      const data: UpdateInterviewQuestionRequest = {
        title: title.trim(),
        slug: slug || undefined,
        category,
        question: question.trim(),
        answer: answer.trim(),
        code_examples: codeExamples.filter((c) => c.trim()),
        hints: hints.filter((h) => h.trim()),
        video_url: videoUrl.trim() || undefined,
        tags: tags.length > 0 ? tags : undefined,
        is_published: isPublished,
      };

      await updateInterviewQuestion(questionId, data);
      setSuccess("Question saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      console.error("Failed to update question:", error);
      setError(error.message || "Failed to save question");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this question? This cannot be undone.")) {
      return;
    }

    try {
      await deleteInterviewQuestion(questionId);
      router.push("/admin/interview");
    } catch (error: any) {
      console.error("Failed to delete question:", error);
      setError(error.message || "Failed to delete question");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/interview"
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Edit Question</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/interview/questions/${slug || questionId}`}
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg mb-6">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          {success}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          />
        </div>

        {/* Question */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Question <span className="text-red-500">*</span>
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            required
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Answer <span className="text-red-500">*</span>
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 font-mono text-sm"
            required
          />
        </div>

        {/* Code Examples */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Code Examples</label>
            <button
              type="button"
              onClick={handleAddCodeExample}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <Plus className="w-4 h-4" />
              Add Example
            </button>
          </div>
          {codeExamples.map((code, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <textarea
                value={code}
                onChange={(e) => handleUpdateCodeExample(index, e.target.value)}
                rows={4}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveCodeExample(index)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Hints */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Hints</label>
            <button
              type="button"
              onClick={handleAddHint}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <Plus className="w-4 h-4" />
              Add Hint
            </button>
          </div>
          {hints.map((hint, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={hint}
                onChange={(e) => handleUpdateHint(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              />
              <button
                type="button"
                onClick={() => handleRemoveHint(index)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium mb-2">Video URL</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            placeholder="Type a tag and press Enter"
          />
        </div>

        {/* Published */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPublished"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="isPublished" className="text-sm font-medium">
            Published
          </label>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/admin/interview"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
