"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Topic,
  TopicDraft,
  TopicVersion,
  UpdateTopicRequest,
  CreateOrUpdateDraftRequest,
  updateTopic,
  createOrUpdateDraft,
  getDraft,
  publishDraft,
  getVersionHistory,
  revertToVersion,
} from "@/lib/api/admin";
import { RichMarkdownEditor } from "@/components/admin/RichMarkdownEditor";
import { ContentPreview } from "@/components/admin/ContentPreview";
import { VersionHistory } from "@/components/admin/VersionHistory";
import {
  Save,
  Eye,
  FileText,
  History,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082";

export default function TopicEditPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.id as string;

  const [topic, setTopic] = useState<Topic | null>(null);
  const [draft, setDraft] = useState<TopicDraft | null>(null);
  const [versions, setVersions] = useState<TopicVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "versions">("edit");
  const [showSplitView, setShowSplitView] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [estimatedReadTime, setEstimatedReadTime] = useState<number | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (topicId) {
      fetchTopic();
      fetchVersions();
    }
  }, [topicId]);

  const fetchTopic = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/learn/topics/${topicId}`);
      const data = await response.json();
      const topicData = data.topic;
      setTopic(topicData);
      setTitle(topicData.title);
      setDescription(topicData.description || "");
      setDifficulty(topicData.difficulty);
      setEstimatedReadTime(topicData.estimated_read_time);
      setTags(topicData.tags || []);
      setContent(topicData.content || "");

      if (topicData.has_draft) {
        const draftData = await getDraft(topicId);
        setDraft(draftData);
        setContent(draftData.content);
      }
    } catch (error) {
      console.error("Failed to fetch topic:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVersions = async () => {
    try {
      const versionData = await getVersionHistory(topicId);
      setVersions(versionData);
    } catch (error) {
      console.error("Failed to fetch versions:", error);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      const draftData: CreateOrUpdateDraftRequest = {
        content,
        status: "draft",
      };
      const savedDraft = await createOrUpdateDraft(topicId, draftData);
      setDraft(savedDraft);
      alert("Draft saved successfully");
    } catch (error) {
      console.error("Failed to save draft:", error);
      alert("Failed to save draft");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!confirm("Publish this draft? This will create a new version and update the published content.")) {
      return;
    }

    try {
      setSaving(true);
      await publishDraft(topicId);
      await fetchTopic();
      await fetchVersions();
      alert("Content published successfully");
    } catch (error) {
      console.error("Failed to publish:", error);
      alert("Failed to publish content");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateMetadata = async () => {
    try {
      setSaving(true);
      const updateData: UpdateTopicRequest = {
        title,
        description,
        difficulty,
        estimated_read_time: estimatedReadTime,
        tags,
      };
      const updatedTopic = await updateTopic(topicId, updateData);
      setTopic(updatedTopic);
      alert("Metadata updated successfully");
    } catch (error) {
      console.error("Failed to update metadata:", error);
      alert("Failed to update metadata");
    } finally {
      setSaving(false);
    }
  };

  const handleRevert = async (versionNumber: number) => {
    if (!confirm(`Revert to version ${versionNumber}? This will create a new draft.`)) {
      return;
    }

    try {
      setSaving(true);
      await revertToVersion(topicId, versionNumber);
      await fetchTopic();
      await fetchVersions();
      alert("Reverted successfully. Content is now in draft.");
    } catch (error) {
      console.error("Failed to revert:", error);
      alert("Failed to revert to version");
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading topic...</p>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Topic not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">{topic.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {topic.is_published ? "Published" : "Draft"} • Version {topic.current_version}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSplitView(!showSplitView)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              showSplitView
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Eye className="w-4 h-4" />
            Split View
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          {draft && (
            <button
              onClick={handlePublish}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Publish
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === "edit"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <FileText className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === "preview"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={() => setActiveTab("versions")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === "versions"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <History className="w-4 h-4" />
          Version History
        </button>
      </div>

      {/* Content */}
      {activeTab === "edit" && (
        <div className={`grid gap-6 ${showSplitView ? "grid-cols-2" : "grid-cols-1"}`}>
          <div className="space-y-6">
            {/* Metadata form */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
              <h2 className="text-lg font-semibold mb-4">Topic Metadata</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Estimated Read Time (min)
                    </label>
                    <input
                      type="number"
                      value={estimatedReadTime || ""}
                      onChange={(e) =>
                        setEstimatedReadTime(e.target.value ? parseInt(e.target.value) : undefined)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      placeholder="Add tag..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-red-600">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleUpdateMetadata}
                  disabled={saving}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Update Metadata
                </button>
              </div>
            </div>

            {/* Content editor */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Content</h2>
              <RichMarkdownEditor
                content={content}
                onChange={setContent}
                autoSave={true}
                onAutoSave={handleSaveDraft}
                autoSaveDelay={5000}
              />
            </div>
          </div>

          {showSplitView && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <ContentPreview content={content} />
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "preview" && (
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <ContentPreview content={content} />
        </div>
      )}

      {activeTab === "versions" && (
        <VersionHistory
          versions={versions}
          currentContent={content}
          onRevert={handleRevert}
        />
      )}
    </div>
  );
}
