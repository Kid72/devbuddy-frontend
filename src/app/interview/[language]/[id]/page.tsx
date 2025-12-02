'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from 'lucide-react'
import {
  getInterviewQuestionById,
  getQuestionsByCategory,
  type InterviewQuestion,
} from '@/lib/api/interview'
import {
  AnswerSection,
  VideoEmbed,
  RelatedTopics,
  LanguageLogo,
  languageColors,
  QuestionProgress,
  MobileNavigation,
} from '@/components/interview'

// Language metadata
const languageMetadata: Record<string, { name: string }> = {
  java: { name: 'Java' },
  javascript: { name: 'JavaScript' },
  python: { name: 'Python' },
  go: { name: 'Go' },
  'system-design': { name: 'System Design' },
  algorithms: { name: 'Algorithms' },
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-8">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-10 w-full mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  )
}

export default function QuestionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const language = params.language as string
  const questionId = params.id as string

  const [question, setQuestion] = useState<InterviewQuestion | null>(null)
  const [allQuestions, setAllQuestions] = useState<InterviewQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const languageInfo = languageMetadata[language]
  const accentColor = languageColors[language] || '#6B7280'

  // Fetch the current question and all questions for navigation
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        // Fetch current question by ID
        const questionData = await getInterviewQuestionById(questionId)
        setQuestion(questionData)

        // Fetch all questions for this category for prev/next navigation
        const response = await getQuestionsByCategory(language, 100, 0)
        setAllQuestions(response.questions)
      } catch (err) {
        console.error('Failed to fetch question:', err)
        setError('Failed to load question. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [questionId, language])

  // Calculate prev/next questions
  const currentIndex = allQuestions.findIndex(q => q.id === questionId)
  const prevQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null
  const nextQuestion = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return // Don't navigate when typing
    }

    if (e.key === 'ArrowLeft' && prevQuestion) {
      router.push(`/interview/${language}/${prevQuestion.id}`)
    } else if (e.key === 'ArrowRight' && nextQuestion) {
      router.push(`/interview/${language}/${nextQuestion.id}`)
    }
  }, [router, language, prevQuestion, nextQuestion])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <Link href={`/interview/${language}`}>
            <Button variant="ghost" className="mb-6" data-testid="back-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {languageInfo?.name} Questions
            </Button>
          </Link>
          <Card className="p-12 text-center" data-testid="error-state">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </Card>
        </div>
      </div>
    )
  }

  // Mock related topics for demonstration
  const relatedTopics = [
    {
      title: 'Understanding JVM Architecture',
      slug: 'jvm-architecture',
      category: 'fundamentals',
    },
    {
      title: 'Java Memory Management',
      slug: 'memory-management',
      category: 'advanced',
    },
    {
      title: 'Garbage Collection Deep Dive',
      slug: 'garbage-collection',
      category: 'advanced',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="container max-w-7xl mx-auto px-4 py-6 lg:py-12">
        {/* Breadcrumb / Back navigation */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/interview" className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Interview</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/interview/${language}`} className="text-gray-500 hover:text-gray-700">
              {languageInfo?.name}
            </Link>
            {question && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">
                  {question.title}
                </span>
              </>
            )}
          </nav>

          {/* Progress indicator - Desktop */}
          {!loading && allQuestions.length > 0 && (
            <QuestionProgress
              currentIndex={currentIndex}
              totalQuestions={allQuestions.length}
              className="hidden sm:flex"
            />
          )}
        </div>

        {loading ? (
          <DetailSkeleton />
        ) : !question ? (
          <Card className="p-12 text-center">
            <p className="text-lg text-gray-500">Question not found</p>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Question Header */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8" data-testid="question-header">
                {/* Top row with icon and badges */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <LanguageLogo slug={language} size="lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-sm" data-testid="language-badge">
                        {languageInfo?.name}
                      </Badge>
                    </div>
                    {/* Mobile progress */}
                    {allQuestions.length > 0 && (
                      <QuestionProgress
                        currentIndex={currentIndex}
                        totalQuestions={allQuestions.length}
                        className="sm:hidden mt-2"
                      />
                    )}
                  </div>
                </div>

                {/* Topic Title */}
                {question.title && question.title !== question.question && (
                  <p className="text-sm text-gray-500 mb-2">{question.title}</p>
                )}

                {/* Question */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" data-testid="question-title">
                  {question.question}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2" data-testid="question-tags">
                  {question.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Answer Section */}
              <AnswerSection answer={question.answer} />

              {/* Video Section */}
              {question.video_url && (
                <VideoEmbed videos={[{ url: question.video_url, title: question.title, channel: 'Tutorial' }]} />
              )}

              {/* Desktop Navigation */}
              <div className="hidden lg:flex mt-8 items-center justify-between gap-4" data-testid="question-navigation">
                {prevQuestion ? (
                  <Link href={`/interview/${language}/${prevQuestion.id}`} className="flex-1">
                    <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3" data-testid="prev-question-button">
                      <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                      <div className="text-left overflow-hidden">
                        <div className="text-xs text-gray-500">Previous</div>
                        <div className="truncate text-sm">{prevQuestion.title}</div>
                      </div>
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                {nextQuestion ? (
                  <Link href={`/interview/${language}/${nextQuestion.id}`} className="flex-1">
                    <Button variant="outline" className="w-full justify-end gap-2 h-auto py-3" data-testid="next-question-button">
                      <div className="text-right overflow-hidden">
                        <div className="text-xs text-gray-500">Next</div>
                        <div className="truncate text-sm">{nextQuestion.title}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>

              {/* Keyboard hint */}
              <p className="hidden lg:block text-center text-xs text-gray-400 mt-4">
                Use ← → arrow keys to navigate between questions
              </p>
            </div>

            {/* Sidebar - Desktop only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20">
                <RelatedTopics topics={relatedTopics} language={language} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {!loading && question && (
        <MobileNavigation
          language={language}
          prevQuestion={prevQuestion}
          nextQuestion={nextQuestion}
          relatedContent={<RelatedTopics topics={relatedTopics} language={language} />}
        />
      )}
    </div>
  )
}
