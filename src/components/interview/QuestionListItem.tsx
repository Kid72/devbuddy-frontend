'use client'

import Link from 'next/link'
import { PlayCircle, Code, Lightbulb, ChevronRight } from 'lucide-react'
import { InterviewQuestion } from '@/lib/api/interview'
import { cn } from '@/lib/utils'

interface QuestionListItemProps {
  question: InterviewQuestion
  index: number
  className?: string
}

export function QuestionListItem({
  question,
  index,
  className,
}: QuestionListItemProps) {
  const hasVideo = !!question.video_url
  const hasCode = question.code_examples && question.code_examples.length > 0
  const hasHints = question.hints && question.hints.length > 0

  return (
    <Link
      href={`/interview/${question.category}/${question.id}`}
      className={cn('block group', className)}
      data-testid="question-list-item"
    >
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200">
        {/* Animated left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div className="flex items-start gap-4 p-4 pl-5">
          {/* Index number */}
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors duration-200">
            {index + 1}
          </span>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Feature indicators */}
            {(hasVideo || hasCode || hasHints) && (
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {hasVideo && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                    <PlayCircle className="w-3.5 h-3.5" />
                    Video
                  </span>
                )}
                {hasCode && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
                    <Code className="w-3.5 h-3.5" />
                    Code
                  </span>
                )}
                {hasHints && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Hints
                  </span>
                )}
              </div>
            )}

            {/* Question text */}
            <h3
              className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed"
              data-testid="question-title"
            >
              {question.question}
            </h3>

            {/* Subtitle/Title if different */}
            {question.title && question.title !== question.question && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {question.title}
              </p>
            )}

            {/* Tags */}
            {question.tags.length > 0 && (
              <div
                className="flex flex-wrap gap-1.5 mt-3"
                data-testid="question-tags"
              >
                {question.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {question.tags.length > 4 && (
                  <span className="px-2.5 py-1 text-xs text-slate-400">
                    +{question.tags.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Arrow indicator */}
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-2" />
        </div>
      </div>
    </Link>
  )
}
