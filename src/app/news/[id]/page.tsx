'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react'
import { getArticle } from '@/lib/api'
import type { NewsArticle } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import DOMPurify from 'dompurify'

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [articleId, setArticleId] = useState<string | null>(null)

  // Helper function to safely format date
  const formatPublishedDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Date unknown'

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Date unknown'

    return formatDistanceToNow(date, { addSuffix: true })
  }

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params
      setArticleId(resolvedParams.id)
    }
    unwrapParams()
  }, [params])

  useEffect(() => {
    if (!articleId) return

    const fetchArticle = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getArticle(articleId)
        setArticle(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [articleId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
          <Button onClick={() => router.push('/news')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/news')}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Image or Banner */}
        {article.image_url && !imageError ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 mb-8">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="h-4 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg mb-8" />
        )}

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="default" className="text-sm">
              {article.category}
            </Badge>
            {article.tags && article.tags.length > 0 && (
              <>
                <span className="text-gray-300">•</span>
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {formatPublishedDate(article.published_at)}
              </span>
            </div>
            {article.author && (
              <>
                <span className="text-gray-300">•</span>
                <span>By {article.author}</span>
              </>
            )}
          </div>

          {/* Summary */}
          {article.summary && (
            <div className="mt-6">
              <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-4">
                {article.summary}
              </p>
            </div>
          )}
        </div>

        {/* Full Content */}
        {article.full_content && (
          <Card className="p-8 mb-6">
            <div
              className="prose prose-lg prose-blue max-w-none dark:prose-invert
                         prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                         prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-4
                         prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                         prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                         prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg
                         prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                         prose-li:text-gray-800 dark:prose-li:text-gray-200 prose-li:mb-2
                         prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                         prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.full_content) }}
            />
          </Card>
        )}

        {/* View Original Source Button */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">
            Want to read the full article on the original website?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Original Source
            </a>
          </Button>
        </div>

        {/* Source Attribution */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Originally published on{' '}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {new URL(article.url).hostname}
            </a>
          </p>
        </div>
      </article>
    </div>
  )
}
