'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { ArrowLeft, Download, FileText, Sparkles } from 'lucide-react'

export default function CVDetailPage() {
  const router = useRouter()
  const params = useParams()
  const cvId = params.id as string

  const [cv, setCv] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    fetchCV()
  }, [cvId])

  const fetchCV = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cv/${cvId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch CV')
      }

      const data = await response.json()
      setCv(data)
    } catch (err) {
      setError('Failed to load CV. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (format: 'pdf' | 'docx') => {
    try {
      setDownloading(true)
      const response = await fetch(`/api/cv/${cvId}/download/${format}`)

      if (!response.ok) {
        throw new Error('Download failed')
      }

      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cv.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      alert('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <Icons.spinner className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg">Loading CV...</span>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/cv')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to CVs
          </Button>
          <h1 className="text-4xl font-bold mb-2">Your CV</h1>
          <p className="text-gray-600">Review and download your optimized CV</p>
        </div>

        {/* CV Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                File Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{cv?.filename || 'cv.pdf'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Icons.calendar className="h-5 w-5 mr-2 text-blue-600" />
                Uploaded
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {cv?.uploadedAt
                  ? new Date(cv.uploadedAt).toLocaleDateString()
                  : 'Today'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Icons.check className="h-5 w-5 mr-2 text-green-600" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 capitalize">
                {cv?.status || 'Processed'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Download Your CV</CardTitle>
            <p className="text-gray-600">
              Download your optimized CV in your preferred format
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Download Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => handleDownload('pdf')}
                disabled={downloading}
                size="lg"
                className="w-full"
              >
                {downloading ? (
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Download className="mr-2 h-5 w-5" />
                )}
                Download as PDF
              </Button>

              <Button
                onClick={() => handleDownload('docx')}
                disabled={downloading}
                size="lg"
                variant="outline"
                className="w-full"
              >
                {downloading ? (
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Download className="mr-2 h-5 w-5" />
                )}
                Download as DOCX
              </Button>
            </div>

            {/* AI Improvements Button */}
            <div className="pt-4 border-t">
              <Button
                onClick={() => router.push(`/cv/${cvId}/improve`)}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                View AI Improvements
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CV Preview (if available) */}
        {cv?.content && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">CV Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                  {cv.content}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ProtectedRoute>
  )
}
