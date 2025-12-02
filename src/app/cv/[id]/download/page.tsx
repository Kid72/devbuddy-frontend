"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, FileText, Download, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { generateCV, downloadCV } from "@/lib/api";

export default function DownloadPage() {
  const params = useParams();
  const router = useRouter();
  const cvId = params.id as string;

  const [isGenerating, setIsGenerating] = useState(true);
  const [docxUrl, setDocxUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    generate();
  }, [cvId]);

  const generate = async () => {
    try {
      const data = await generateCV(cvId);
      setDocxUrl(data.docx_url);
      setPdfUrl(data.pdf_url || null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate CV"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format: "docx" | "pdf") => {
    setDownloading(format);
    try {
      await downloadCV(cvId, format);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : `Failed to download ${format.toUpperCase()}`
      );
    } finally {
      setDownloading(null);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
        <div className="container max-w-md mx-auto px-4">
          <Card>
            <CardContent className="pt-20 pb-20 text-center">
              <Loader2 className="w-16 h-16 mx-auto mb-6 animate-spin text-blue-600" />
              <h2 className="text-2xl font-bold mb-2">
                Generating Your CV...
              </h2>
              <p className="text-gray-600">This will take a moment</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
        <div className="container max-w-md mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <AlertCircle className="w-6 h-6 mr-2" />
                Generation Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button
                  onClick={() => router.push(`/cv/${cvId}/review`)}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Review
                </Button>
                <Button onClick={generate} className="flex-1">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        <Card>
          <CardContent className="pt-12 pb-12">
            {/* Success Header */}
            <div className="text-center mb-8">
              <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-600" />
              <h1 className="text-4xl font-bold mb-3">Your CV is Ready!</h1>
              <p className="text-xl text-gray-600">
                Download your optimized resume below
              </p>
            </div>

            {/* Download Buttons */}
            <div className="space-y-4 mb-8">
              {/* DOCX */}
              <Button
                onClick={() => handleDownload("docx")}
                size="lg"
                className="w-full h-16 text-lg gap-3 bg-blue-600 hover:bg-blue-700"
                disabled={downloading === "docx"}
              >
                {downloading === "docx" ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <FileText className="w-6 h-6" />
                    Download DOCX
                  </>
                )}
              </Button>

              {/* PDF */}
              {pdfUrl && (
                <Button
                  onClick={() => handleDownload("pdf")}
                  size="lg"
                  variant="outline"
                  className="w-full h-16 text-lg gap-3"
                  disabled={downloading === "pdf"}
                >
                  {downloading === "pdf" ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Download PDF
                    </>
                  )}
                </Button>
              )}

              {!pdfUrl && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 text-center">
                    📄 PDF conversion is temporarily unavailable. Please use
                    DOCX format.
                  </p>
                </div>
              )}
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button
                onClick={() => router.push(`/cv/${cvId}/review`)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Review
              </Button>
              <Button
                onClick={() => router.push("/upload")}
                variant="ghost"
                size="lg"
                className="flex-1"
              >
                Create Another CV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
