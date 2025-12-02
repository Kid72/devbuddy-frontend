import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export default function QuestionDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-40 mb-6" />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Question Header Skeleton */}
            <Card className="p-8 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-3/4 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-20" />
              </div>
            </Card>

            {/* Answer Section Skeleton */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Card className="p-6">
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-3/4 mb-3" />
              </Card>
            </div>

            {/* Video Section Skeleton */}
            <div className="mb-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <Card className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
