"use client";

import { useState } from "react";
import { Eye, Code } from "lucide-react";

interface ContentPreviewProps {
  content: string;
  className?: string;
}

export function ContentPreview({ content, className = "" }: ContentPreviewProps) {
  const [viewMode, setViewMode] = useState<"preview" | "html">("preview");

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* View mode toggle */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => setViewMode("preview")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors ${
            viewMode === "preview"
              ? "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          type="button"
          onClick={() => setViewMode("html")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors ${
            viewMode === "html"
              ? "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Code className="w-4 h-4" />
          HTML
        </button>
      </div>

      {/* Content display */}
      <div className="flex-1 overflow-auto p-4 bg-white dark:bg-gray-900">
        {viewMode === "preview" ? (
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <pre className="text-xs font-mono bg-gray-50 dark:bg-gray-800 p-4 rounded overflow-auto">
            <code>{content}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
