'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Sparkles, Download } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function CVToolPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-[calc(100vh-73px)] flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Make Your Resume ATS-Ready in Minutes
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              AI-powered CV optimization for developers
            </h2>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg"
              >
                <Link href="/upload">Upload Your CV</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Upload */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">📤 Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Upload your CV in PDF or DOCX format. Quick and easy file upload process.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2: AI Analysis */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">🤖 AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our AI analyzes and improves your resume to make it ATS-friendly and impactful.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3: Download */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">📥 Download</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get your optimized resume in both DOCX and PDF formats, ready to use.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}
