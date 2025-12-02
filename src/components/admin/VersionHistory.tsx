"use client";

import { useState } from "react";
import { TopicVersion } from "@/lib/api/admin";
import { Clock, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { diffLines, Change } from "diff";

interface VersionHistoryProps {
  versions: TopicVersion[];
  currentContent: string;
  onRevert: (versionNumber: number) => void;
}

export function VersionHistory({
  versions,
  currentContent,
  onRevert,
}: VersionHistoryProps) {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<TopicVersion | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const toggleVersion = (versionId: string) => {
    setExpandedVersion(expandedVersion === versionId ? null : versionId);
  };

  const handleCompare = (version: TopicVersion) => {
    setSelectedVersion(version);
    setCompareMode(true);
  };

  const renderDiff = (oldContent: string, newContent: string) => {
    const differences = diffLines(oldContent, newContent);

    return (
      <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded overflow-auto">
        {differences.map((part: Change, index: number) => (
          <div
            key={index}
            className={`${
              part.added
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                : part.removed
                ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                : ""
            }`}
          >
            {part.added && <span className="mr-2">+</span>}
            {part.removed && <span className="mr-2">-</span>}
            {part.value.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Version History
        </h3>
        {compareMode && (
          <button
            type="button"
            onClick={() => {
              setCompareMode(false);
              setSelectedVersion(null);
            }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Exit Compare Mode
          </button>
        )}
      </div>

      {/* Compare view */}
      {compareMode && selectedVersion && (
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
          <div className="mb-2 text-sm font-medium">
            Comparing Version {selectedVersion.version_number} with Current
          </div>
          {renderDiff(selectedVersion.content, currentContent)}
        </div>
      )}

      {/* Version list */}
      <div className="space-y-2">
        {versions.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No version history available
          </div>
        ) : (
          versions.map((version) => (
            <div
              key={version.id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Version header */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleVersion(version.id)}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded"
                  >
                    {expandedVersion === version.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  <div>
                    <div className="font-medium">
                      Version {version.version_number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(version.created_at)}
                      {version.created_by && ` • by ${version.created_by}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCompare(version)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Compare
                  </button>
                  <button
                    type="button"
                    onClick={() => onRevert(version.version_number)}
                    className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Revert
                  </button>
                </div>
              </div>

              {/* Version details */}
              {expandedVersion === version.id && (
                <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                  {version.change_summary && (
                    <div className="mb-3">
                      <div className="text-sm font-medium mb-1">Changes:</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {version.change_summary}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium mb-2">Content:</div>
                    <div
                      className="prose prose-sm max-w-none dark:prose-invert p-3 bg-gray-50 dark:bg-gray-900 rounded"
                      dangerouslySetInnerHTML={{ __html: version.content }}
                    />
                  </div>
                  {version.metadata && (
                    <div className="mt-3">
                      <div className="text-sm font-medium mb-1">Metadata:</div>
                      <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto">
                        {JSON.stringify(version.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
