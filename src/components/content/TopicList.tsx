'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2 } from 'lucide-react'

interface TopicItem {
  id: string
  slug: string
  title: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimated_read_time?: number | null
  is_published: boolean
  content?: string | null
}

interface TopicListProps {
  topics: TopicItem[]
  languageSlug: string
  categorySlug: string
  currentTopicId?: string
  showProgress?: boolean
  className?: string
}

export function TopicList({
  topics,
  languageSlug,
  categorySlug,
  currentTopicId,
  showProgress = false,
  className = '',
}: TopicListProps) {
  const publishedTopics = topics.filter((t) => t.is_published && t.content)

  return (
    <div className={`space-y-2 ${className}`}>
      {topics.map((topic, index) => {
        const isActive = currentTopicId === topic.id
        const isAvailable = topic.is_published && topic.content
        const isCompleted = showProgress && false // TODO: Track completion from user data

        return (
          <div key={topic.id} className="relative">
            {isAvailable ? (
              <Link
                href={`/learn/${languageSlug}/${categorySlug}/${topic.slug}`}
                className={`block p-3 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
                    : 'text-gray-700 hover:bg-gray-50 border border-transparent dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex-1">{topic.title}</span>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {topic.difficulty && (
                        <Badge
                          variant={
                            topic.difficulty === 'beginner'
                              ? 'default'
                              : topic.difficulty === 'intermediate'
                              ? 'secondary'
                              : 'outline'
                          }
                          className="text-xs"
                        >
                          {topic.difficulty}
                        </Badge>
                      )}
                      {topic.estimated_read_time && (
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          {topic.estimated_read_time}min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-3 rounded-lg text-sm text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono mt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span>{topic.title}</span>
                      <Badge variant="outline" className="text-xs">
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
