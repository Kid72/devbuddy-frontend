"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createInterviewQuestion,
  CreateInterviewQuestionRequest,
  getInterviewCategories,
} from "@/lib/api/admin-interview";
import { ArrowLeft, Save, AlertCircle, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function NewInterviewQuestionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(generatedSlug);
  }, [title]);

  const fetchCategories = async () => {
    try {
      const cats = await getInterviewCategories();
      setCategories(cats);
      if (cats.length > 0) {
        setCategory(cats[0]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      // Fallback categories
      setCategories(["java", "go", "python", "algorithms", "system-design"]);
      setCategory("java");
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
    if (!category) {
      setError("Please select a category");
      return;
    }

    try {
      setSaving(true);

      const data: CreateInterviewQuestionRequest = {
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

      const newQuestion = await createInterviewQuestion(data);
      router.push(`/admin/interview/${newQuestion.id}`);
    } catch (error: any) {
      console.error("Failed to create question:", error);
      setError(error.message || "Failed to create question");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/interview"
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create Interview Question</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add a new interview question to the database
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
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
              placeholder="e.g., What is the difference between abstract class and interface?"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              required
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
            placeholder="auto-generated-from-title"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL-friendly identifier (auto-generated from title)
          </p>
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
            placeholder="The full interview question text..."
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
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 font-mono text-sm"
            placeholder="The detailed answer (supports Markdown)..."
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
                placeholder="// Code example..."
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
                placeholder="Hint for the candidate..."
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
          <label className="block text-sm font-medium mb-2">Video URL (optional)</label>
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
            Publish immediately
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
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Create Question
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
