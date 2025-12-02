"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { getCVStatus } from "@/lib/api";

export default function ProcessingPage() {
  const params = useParams();
  const router = useRouter();
  const cvId = params.id as string;

  const [status, setStatus] = useState<string>("processing");
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const pollStatus = async () => {
      try {
        const data = await getCVStatus(cvId);
        setStatus(data.status);
        setProgress(data.progress_percentage);

        // Redirect when completed
        if (data.status === "completed") {
          clearInterval(interval);
          router.push(`/cv/${cvId}/review`);
        }

        // Show error if failed
        if (data.status === "failed") {
          clearInterval(interval);
          setError("Processing failed. Please try again.");
        }
      } catch (err) {
        clearInterval(interval);
        setError(
          err instanceof Error ? err.message : "Failed to check status"
        );
      }
    };

    // Poll immediately, then every 2 seconds
    pollStatus();
    interval = setInterval(pollStatus, 2000);

    // Cleanup
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cvId, router]);

  const getStatusMessage = () => {
    if (status === "uploaded") return "Starting analysis...";
    if (status === "processing") {
      if (progress < 25) return "Parsing your CV...";
      if (progress < 50) return "AI is analyzing...";
      if (progress < 75) return "Creating improvements...";
      return "Almost done...";
    }
    return "Processing...";
  };

  if (error) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
        <div className="container max-w-md mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <AlertCircle className="w-6 h-6 mr-2" />
                Processing Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button
                onClick={() => router.push("/upload")}
                className="w-full"
                variant="outline"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
      <div className="container max-w-md mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Processing Your CV</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {getStatusMessage()}
              </h2>
              <p className="text-sm text-gray-500">
                This may take a few moments. Please don't close this page.
              </p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="w-full h-3" />
              <p className="text-center text-sm font-medium text-gray-700">
                {progress}%
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-700 text-center">
                Our AI is analyzing your resume and creating optimized versions
                of each section. You'll be able to review and edit them in the
                next step.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
