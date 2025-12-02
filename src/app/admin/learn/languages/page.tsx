"use client";

import { useState, useEffect } from "react";
import { Language, CreateLanguageRequest, createLanguage } from "@/lib/api/admin";
import { Plus, Code, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082";

export default function LanguagesManagementPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/learn/languages`);
      const data = await response.json();
      setLanguages(data.languages || []);
    } catch (error) {
      console.error("Failed to fetch languages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setCreating(true);
      const languageData: CreateLanguageRequest = {
        name,
        slug,
        icon: icon || undefined,
        description: description || undefined,
        color: color || undefined,
        display_order: displayOrder,
      };
      await createLanguage(languageData);
      setShowCreateForm(false);
      resetForm();
      fetchLanguages();
      alert("Language created successfully");
    } catch (error) {
      console.error("Failed to create language:", error);
      alert("Failed to create language");
    } finally {
      setCreating(false);
    }
  };

  const resetForm = () => {
    setName("");
    setSlug("");
    setIcon("");
    setDescription("");
    setColor("#3B82F6");
    setDisplayOrder(0);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    // Auto-generate slug from name
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );
  };

  const predefinedColors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Orange", value: "#F97316" },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading languages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Languages Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage programming languages and domains
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Language
        </button>
      </div>

      {/* Create form */}
      {showCreateForm && (
        <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
          <h2 className="text-lg font-semibold mb-4">Create New Language</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  placeholder="JavaScript, Python, etc."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  placeholder="javascript, python"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Learn modern JavaScript from basics to advanced concepts..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Icon (emoji or icon name)</label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="🟨 or js-icon"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Display Order</label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2 mb-2">
                {predefinedColors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`w-8 h-8 rounded border-2 transition-all ${
                      color === c.value ? "border-gray-900 dark:border-white scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 rounded border border-gray-300 dark:border-gray-700"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create Language"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Languages grid */}
      {languages.length === 0 ? (
        <div className="text-center py-12 border border-gray-300 dark:border-gray-700 rounded-lg">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No languages found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <div
              key={language.id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl"
                  style={{ backgroundColor: language.color || "#3B82F6" }}
                >
                  {language.icon || <Code className="w-8 h-8 text-white" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{language.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {language.is_active ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <XCircle className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {language.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                  {language.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-4 text-xs text-gray-500 dark:text-gray-400">
                <span>Order: {language.display_order}</span>
                <span>•</span>
                <span>/{language.slug}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Total: {languages.length} languages
        {languages.filter((l) => l.is_active).length > 0 && (
          <> ({languages.filter((l) => l.is_active).length} active)</>
        )}
      </div>
    </div>
  );
}
