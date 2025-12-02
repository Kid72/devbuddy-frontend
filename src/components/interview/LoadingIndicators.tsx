'use client'

import { forwardRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle, AlertCircle, RefreshCw, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Initial loading skeleton for question groups
 */
export function QuestionGroupSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          {/* Topic header skeleton */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-100 border border-slate-200">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>

          {/* Question items skeleton */}
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white"
              >
                <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-2 mt-2">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-6 w-14 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Loading indicator shown when fetching more items
 */
export function LoadMoreIndicator({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return <div className="h-4" aria-hidden="true" />

  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3 text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
        <span className="text-sm font-medium">Loading more questions...</span>
      </div>
    </div>
  )
}

/**
 * End of list indicator
 */
export function EndOfListIndicator({ totalCount }: { totalCount: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <p className="text-lg font-medium text-gray-900 mb-1">
        You&apos;ve reached the end!
      </p>
      <p className="text-sm text-gray-500">{totalCount} questions loaded</p>
    </div>
  )
}

/**
 * Error state with retry button
 */
interface LoadErrorProps {
  message: string
  onRetry: () => void
  retryCount?: number
  maxRetries?: number
}

export function LoadError({
  message,
  onRetry,
  retryCount = 0,
  maxRetries = 3,
}: LoadErrorProps) {
  const canRetry = retryCount < maxRetries

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7 text-red-600" />
      </div>
      <p className="text-base font-medium text-gray-900 mb-2">{message}</p>
      <p className="text-sm text-gray-500 mb-4">
        {canRetry
          ? `Attempt ${retryCount + 1} of ${maxRetries}`
          : 'Maximum retries reached'}
      </p>
      <Button onClick={onRetry} variant="outline" disabled={!canRetry}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  )
}

/**
 * Infinite scroll sentinel (invisible trigger element)
 */
export const ScrollSentinel = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className="h-4 w-full" aria-hidden="true" />
})

ScrollSentinel.displayName = 'ScrollSentinel'
