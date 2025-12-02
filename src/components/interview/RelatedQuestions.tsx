'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, ChevronRight } from 'lucide-react'
import { getQuestionsByTopicId, InterviewQuestion } from '@/lib/api/interview'

interface RelatedQuestionsProps {
  topicId: string
  topicTitle?: string
  maxQuestions?: number
}

export function RelatedQuestions({ topicId, topicTitle, maxQuestions = 5 }: RelatedQuestionsProps) {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true)
        setError(null)
        const response = await getQuestionsByTopicId(topicId, maxQuestions)
        setQuestions(response.questions || [])
      } catch (err) {
        console.error('Failed to fetch related questions:', err)
        setError('Failed to load questions')
      } finally {
        setLoading(false)
      }
    }

    if (topicId) {
      fetchQuestions()
    }
  }, [topicId, maxQuestions])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Practice Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !questions || questions.length === 0) {
    return null // Don't show card if no questions
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Practice Questions
        </CardTitle>
        {topicTitle && (
          <p className="text-sm text-gray-600 mt-1">
            Test your understanding of {topicTitle}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {questions.map((question, index) => (
            <Link
              key={question.id}
              href={`/interview/${question.category}/${question.id}`}
              className="block p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-semibold text-gray-400 mt-1 flex-shrink-0">
                  #{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {question.category}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                    {question.title}
                  </h4>
                  {question.tags && question.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {question.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {question.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{question.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>

        {questions.length >= maxQuestions && (
          <div className="mt-4 pt-4 border-t">
            <Link
              href="/interview"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 justify-center"
            >
              View all interview questions
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
