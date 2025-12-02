"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { getImprovements, updateSection } from "@/lib/api";
import type { Section } from "@/types";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const cvId = params.id as string;

  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImprovements();
  }, [cvId]);

  const loadImprovements = async () => {
    try {
      const data = await getImprovements(cvId);
      setSections(data.sections);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load improvements"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectionUpdate = async (
    sectionId: string,
    content: string,
    status: string
  ) => {
    try {
      await updateSection(cvId, sectionId, content, status);
      // Update local state
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId
            ? { ...s, user_edit: content, status: status as any }
            : s
        )
      );
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to update section"
      );
    }
  };

  const approvedCount = sections.filter(
    (s) => s.status === "approved" || s.status === "edited"
  ).length;
  const totalCount = sections.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;
  const allReady = approvedCount === totalCount && totalCount > 0;

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 mx-auto animate-spin mb-4 text-blue-600" />
            <p className="text-gray-500">Loading improvements...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push("/upload")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Upload
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 pb-24">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Review Your Improved CV</h1>

        {/* Progress */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-900">
              Sections Approved: {approvedCount} / {totalCount}
            </span>
            <span className="text-gray-600">{progressPercentage}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Sections */}
        <div className="space-y-6 mb-20">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onUpdate={handleSectionUpdate}
            />
          ))}
        </div>

        {/* Empty State */}
        {sections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No sections found</p>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => router.push("/upload")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={() => router.push(`/cv/${cvId}/download`)}
                disabled={!allReady}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Generate CV →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
