"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Topic } from "@/lib/api/admin";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Eye,
  Edit,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082";

export default function TopicsListPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchTopics();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterTopics();
  }, [topics, searchQuery, selectedCategory, selectedDifficulty, selectedStatus]);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/learn/topics?limit=1000`);
      const data = await response.json();
      setTopics(data.topics || []);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/learn/languages`);
      const data = await response.json();
      const allCategories = data.languages?.flatMap((lang: any) =>
        lang.categories?.map((cat: any) => ({ id: cat.id, name: cat.name })) || []
      ) || [];
      setCategories(allCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const filterTopics = () => {
    let filtered = [...topics];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (topic) =>
          topic.title.toLowerCase().includes(query) ||
          topic.description?.toLowerCase().includes(query) ||
          topic.slug.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((topic) => topic.category_id === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((topic) => topic.difficulty === selectedDifficulty);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((topic) => {
        if (selectedStatus === "published") return topic.is_published;
        if (selectedStatus === "draft") return !topic.is_published && topic.has_draft;
        if (selectedStatus === "pending") return !topic.is_published && !topic.has_draft;
        return true;
      });
    }

    setFilteredTopics(filtered);
  };

  const toggleTopicSelection = (topicId: string) => {
    const newSelected = new Set(selectedTopics);
    if (newSelected.has(topicId)) {
      newSelected.delete(topicId);
    } else {
      newSelected.add(topicId);
    }
    setSelectedTopics(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedTopics.size === filteredTopics.length) {
      setSelectedTopics(new Set());
    } else {
      setSelectedTopics(new Set(filteredTopics.map((t) => t.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedTopics.size} topics? This cannot be undone.`)) {
      return;
    }

    try {
      await Promise.all(
        Array.from(selectedTopics).map((id) =>
          fetch(`${API_BASE_URL}/api/admin/learn/topics/${id}`, { method: "DELETE" })
        )
      );
      setSelectedTopics(new Set());
      fetchTopics();
    } catch (error) {
      console.error("Failed to delete topics:", error);
      alert("Failed to delete some topics");
    }
  };

  const getStatusBadge = (topic: Topic) => {
    if (topic.is_published) {
      return (
        <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
          <CheckCircle2 className="w-3 h-3" />
          Published
        </span>
      );
    }
    if (topic.has_draft) {
      return (
        <span className="flex items-center gap-1 text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded">
          <FileText className="w-3 h-3" />
          Draft
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 dark:text-green-400";
      case "intermediate":
        return "text-yellow-600 dark:text-yellow-400";
      case "advanced":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Topics Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage learning content topics
          </p>
        </div>
        <Link
          href="/admin/learn/topics/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Topic
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
        >
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Status filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Has Draft</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Bulk actions */}
      {selectedTopics.size > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-4">
          <span className="text-sm font-medium">
            {selectedTopics.size} topic{selectedTopics.size > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </button>
          <button
            onClick={() => setSelectedTopics(new Set())}
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline ml-auto"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Topics table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading topics...</p>
        </div>
      ) : filteredTopics.length === 0 ? (
        <div className="text-center py-12 border border-gray-300 dark:border-gray-700 rounded-lg">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No topics found</p>
        </div>
      ) : (
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTopics.size === filteredTopics.length}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Difficulty</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Version</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Last Edited</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTopics.map((topic) => (
                <tr
                  key={topic.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTopics.has(topic.id)}
                      onChange={() => toggleTopicSelection(topic.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{topic.title}</div>
                      {topic.description && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                          {topic.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(topic)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm capitalize ${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      v{topic.current_version}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {topic.last_edited_at
                        ? new Date(topic.last_edited_at).toLocaleDateString()
                        : "—"}
                      {topic.last_edited_by && (
                        <div className="text-xs">by {topic.last_edited_by}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/learn/topics/${topic.id}`}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/learn/topics/${topic.id}`}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredTopics.length} of {topics.length} topics
      </div>
    </div>
  );
}
