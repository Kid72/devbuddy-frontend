import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function TopicLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-full max-w-md" />
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content Skeleton */}
          <div className="space-y-6">
            {/* Topic Header */}
            <Card className="p-8">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            </Card>

            {/* Content */}
            <Card className="p-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-2">
                    {i % 3 === 0 && <Skeleton className="h-8 w-2/3 mt-6" />}
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    {i % 4 === 0 && (
                      <Skeleton className="h-32 w-full mt-4 mb-4" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-16 w-1/3" />
              <Skeleton className="h-16 w-1/3" />
            </div>

            <Skeleton className="h-12 w-full" />
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-16 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
