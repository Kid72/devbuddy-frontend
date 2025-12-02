"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Info, Upload } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const cvId = searchParams.get("cv_id");

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-3xl text-green-700">Upload Successful!</CardTitle>
                <CardDescription className="text-base mt-1">
                  Your CV has been uploaded successfully
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* CV ID Display */}
            {cvId && (
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-1">CV ID:</p>
                <code className="text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 block break-all">
                  {cvId}
                </code>
              </div>
            )}

            {/* Phase 2 Info Alert */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Phase 1 Complete</AlertTitle>
              <AlertDescription>
                This is the end of Phase 1. In Phase 2, you'll be able to:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Track the processing status of your CV</li>
                  <li>Review AI-generated improvements</li>
                  <li>Edit and approve sections</li>
                  <li>Download optimized DOCX and PDF files</li>
                </ul>
              </AlertDescription>
            </Alert>

            {/* What's Next Section */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">What happens next?</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <p>
                    <strong className="text-gray-900">Processing:</strong> Your CV is being analyzed by our AI (Phase 2 feature)
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <p>
                    <strong className="text-gray-900">Review:</strong> You'll review and edit AI-generated improvements (Phase 2 feature)
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <p>
                    <strong className="text-gray-900">Download:</strong> Get your optimized CV in DOCX and PDF formats (Phase 3 feature)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                <Link href="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Another CV
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
