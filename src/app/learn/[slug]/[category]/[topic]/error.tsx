'use client'

import { useEffect } from 'react'
import { BookOpen, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function TopicError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Topic page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Topic Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            We couldn't find the learning topic you're looking for. It may have been moved or the link might be incorrect.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-100 p-4 rounded text-xs font-mono text-gray-700 overflow-auto max-h-40">
              {error.message || error.toString()}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Link href="/learn">
              <Button className="w-full" variant="default">
                <Search className="w-4 h-4 mr-2" />
                Browse Learning Paths
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
