"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadCV, getErrorMessage } from "@/lib/api";
import { Loader2, AlertCircle } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    // Clear any previous errors when a new file is selected
    if (file) {
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const cvId = await uploadCV(selectedFile);

      // Redirect to processing page
      router.push(`/cv/${cvId}/processing`);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Upload Your CV</CardTitle>
            <CardDescription className="text-base">
              Upload your resume to get started with AI-powered optimization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Component */}
            <FileUpload onFileSelect={handleFileSelect} />

            {/* File Info Display */}
            {selectedFile && !error && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-blue-900">Ready to upload</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your file is ready. Click the button below to start optimization.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
              size="lg"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Optimize My CV"
              )}
            </Button>

            {/* Instructions */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Your CV will be uploaded securely to our server</li>
                <li>Our AI will analyze and optimize your resume content</li>
                <li>You'll be able to review and edit the improvements</li>
                <li>Download your optimized CV in DOCX and PDF formats</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
