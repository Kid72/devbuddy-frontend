'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function QuestionDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Question detail error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link href="/interview">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interview Prep
          </Button>
        </Link>

        <Card className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-4">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>

          <p className="text-gray-600 mb-8">
            We encountered an error while loading this question.
            {error.message && (
              <span className="block mt-2 text-sm text-gray-500">
                Error: {error.message}
              </span>
            )}
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button onClick={() => reset()} variant="default">
              Try Again
            </Button>
            <Link href="/interview">
              <Button variant="outline">
                Back to Interview Prep
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
