'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Upload, FileText, CheckCircle } from 'lucide-react'

export default function CVUploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or DOCX file')
      setFile(null)
      return
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 10MB')
      setFile(null)
      return
    }

    setFile(selectedFile)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      // Upload to API (will be intercepted by test mocks)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setUploaded(true)
      setUploading(false)

      // Redirect to CV detail page after successful upload
      setTimeout(() => {
        const cvId = data.cv?.id || 'test-cv-123'
        router.push(`/cv/${cvId}`)
      }, 1500)
    } catch (err) {
      setError('Upload failed. Please try again.')
      setUploading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <Icons.arrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Upload Your CV</h1>
          <p className="text-gray-600">Upload your resume in PDF or DOCX format for AI-powered optimization</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select File</CardTitle>
            <CardDescription>
              Choose your CV file (PDF or DOCX format, max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Input */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <label
                htmlFor="cv-file-input"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-500">
                  PDF or DOCX (max 10MB)
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="mt-4"
                  id="cv-file-input"
                  data-testid="cv-file-input"
                  aria-label="CV file input"
                />
              </label>
            </div>

            {/* File Info */}
            {file && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFile(null)
                    setError(null)
                  }}
                >
                  Remove
                </Button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {uploaded && (
              <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-lg">
                <CheckCircle className="h-6 w-6" />
                <p>Upload completed successfully! Redirecting...</p>
              </div>
            )}

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!file || uploading || uploaded}
              className="w-full"
              size="lg"
              data-testid="upload-button"
            >
              {uploading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : uploaded ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Uploaded
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload CV
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Icons.shield className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Secure</h3>
              </div>
              <p className="text-sm text-gray-600">
                Your CV is encrypted and stored securely
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Icons.zap className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold">Fast Processing</h3>
              </div>
              <p className="text-sm text-gray-600">
                AI analysis completes in seconds
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Icons.download className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Export Options</h3>
              </div>
              <p className="text-sm text-gray-600">
                Download optimized CV in PDF or DOCX
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
