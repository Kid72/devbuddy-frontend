import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { NewsArticle } from '@/types'
import { formatDistanceToNow, differenceInHours } from 'date-fns'
import { useState } from 'react'
import Link from 'next/link'

interface NewsCardProps {
  article: NewsArticle
  sourceName?: string
}

export function NewsCard({ article, sourceName }: NewsCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Link to internal news detail page
  const href = `/news/${article.id}`

  // Helper function to safely format date
  const formatPublishedDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Date unknown'

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Date unknown'

    return formatDistanceToNow(date, { addSuffix: true })
  }

  // Check if article is less than 24 hours old
  const isNew = (dateString: string | null | undefined): boolean => {
    if (!dateString) return false
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return false
    return differenceInHours(new Date(), date) < 24
  }

  const showNewBadge = isNew(article.published_at)

  return (
    <article data-testid="news-card">
      <Card className="group overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full border-2 border-transparent hover:border-blue-200">
        <Link href={href} className="block flex-1 flex flex-col">
        {/* Image with gradient overlay */}
        {article.image_url && !imageError ? (
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            <img
              src={article.image_url}
              alt={article.title}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* NEW badge for recent articles */}
            {showNewBadge && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg font-bold animate-pulse">
                  NEW
                </Badge>
              </div>
            )}
          </div>
        ) : (
          // Colored banner when no image or image failed to load
          <div className="relative h-32 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* NEW badge for recent articles */}
            {showNewBadge && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-white/90 text-red-600 border-0 shadow-lg font-bold animate-pulse">
                  NEW
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="default"
              className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
            >
              {article.category}
            </Badge>
          </div>

          {/* Title with enhanced hover effect */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {article.title}
          </h3>

          {/* Description with better typography */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
            {article.summary}
          </p>

          {/* Tags with improved styling */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 3).map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {article.tags.length > 3 && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-700"
                >
                  +{article.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Meta with enhanced styling */}
          <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-gray-100">
            <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {sourceName || article.source_name || 'Unknown Source'}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {formatPublishedDate(article.published_at)}
            </span>
          </div>
        </div>

        {/* Bottom accent line that appears on hover */}
        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out" />
      </Link>
    </Card>
    </article>
  )
}
