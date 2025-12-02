'use client'

import { useEffect } from 'react'
import { MessageSquare, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function InterviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Interview page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Language Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            We couldn&apos;t find interview questions for this language. It may not be available yet or the link might be incorrect.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-100 p-4 rounded text-xs font-mono text-gray-700 overflow-auto max-h-40">
              {error.message || error.toString()}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Link href="/interview">
              <Button className="w-full" variant="default">
                <Search className="w-4 h-4 mr-2" />
                Browse All Languages
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full" variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
