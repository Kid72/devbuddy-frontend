'use client'

import { useState, useMemo, useEffect, useCallback, useRef, useDeferredValue } from 'react'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Search, X } from 'lucide-react'
import {
  getQuestionsByCategory,
  type InterviewQuestion,
} from '@/lib/api/interview'
import {
  LanguageLogo,
  languageColors,
  SearchBar,
  InterviewFilters,
  FilterSheet,
} from '@/components/interview'
import { TopicSection } from '@/components/interview/TopicSection'
import {
  QuestionGroupSkeleton,
  LoadMoreIndicator,
  EndOfListIndicator,
  LoadError,
} from '@/components/interview/LoadingIndicators'
import { ScrollProgress } from '@/components/interview/ScrollProgress'
import { BackToTop } from '@/components/interview/BackToTop'
import { useInfiniteScroll } from '@/hooks'

// Language metadata
const languageMetadata: Record<string, { name: string; description: string }> = {
  java: { name: 'Java', description: 'Core Java, Spring Boot, JVM, Collections, Multithreading' },
  javascript: { name: 'JavaScript', description: 'ES6+, React, Node.js, TypeScript, Async patterns' },
  python: { name: 'Python', description: 'Data structures, Django, Flask, Machine Learning' },
  go: { name: 'Go', description: 'Concurrency, Goroutines, Channels, Web services' },
  'system-design': { name: 'System Design', description: 'Architecture, Scalability, Design Patterns, Distributed Systems' },
  algorithms: { name: 'Algorithms', description: 'Data Structures, Complexity Analysis, Problem Solving' },
}

const ITEMS_PER_BATCH = 20
const MAX_RETRIES = 3

export default function InterviewLanguagePage() {
  const params = useParams()
  const language = params.language as string

  // Filter state
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearchQuery = useDeferredValue(searchQuery)

  // Data state
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)

  // Loading state
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Prevent duplicate requests
  const loadingRef = useRef(false)

  const languageInfo = languageMetadata[language]

  if (!languageInfo) {
    notFound()
  }

  const accentColor = languageColors[language] || '#6B7280'

  // Derived state
  const hasMore = questions.length < total

  // Initial load
  useEffect(() => {
    async function fetchInitialQuestions() {
      try {
        setIsInitialLoading(true)
        setError(null)
        const response = await getQuestionsByCategory(language, ITEMS_PER_BATCH, 0)
        setQuestions(response.questions)
        setTotal(response.total)
        setOffset(response.questions.length)
      } catch (err) {
        console.error('Failed to fetch questions:', err)
        setError('Failed to load questions. Please try again later.')
      } finally {
        setIsInitialLoading(false)
      }
    }

    fetchInitialQuestions()
  }, [language])

  // Load more callback
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || isLoadingMore) return

    loadingRef.current = true
    setIsLoadingMore(true)
    setError(null)

    try {
      const response = await getQuestionsByCategory(language, ITEMS_PER_BATCH, offset)
      setQuestions((prev) => [...prev, ...response.questions])
      setOffset((prev) => prev + response.questions.length)
      setTotal(response.total)
      setRetryCount(0)
    } catch (err) {
      console.error('Failed to load more questions:', err)
      setError('Failed to load more questions.')
      setRetryCount((prev) => prev + 1)
    } finally {
      loadingRef.current = false
      setIsLoadingMore(false)
    }
  }, [language, offset, hasMore, isLoadingMore])

  // Manual retry handler
  const handleRetry = useCallback(() => {
    setError(null)
    loadMore()
  }, [loadMore])

  // Infinite scroll hook
  const { sentinelRef } = useInfiniteScroll(loadMore, {
    enabled: hasMore && !isLoadingMore && !error && !isInitialLoading,
    rootMargin: '200px',
  })

  // Extract unique tags from all questions
  const allTags = useMemo(() => {
    const tagCounts: Record<string, number> = {}
    questions.forEach((q) => {
      q.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag)
  }, [questions])

  // Filter and search questions (client-side on loaded data)
  const filteredQuestions = useMemo(() => {
    let filtered = questions

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((q) =>
        q.tags.some((tag) => selectedTags.includes(tag))
      )
    }

    // Search filter (using deferred value for better UX)
    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase()
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          q.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [questions, selectedTags, deferredSearchQuery])

  const hasActiveFilters = selectedTags.length > 0 || searchQuery.length > 0

  const clearAllFilters = () => {
    setSelectedTags([])
    setSearchQuery('')
  }

  // Error state for initial load
  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <Card className="p-12 text-center" data-testid="error-state">
            <p className="text-lg text-red-600 mb-2">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/interview">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interview Prep
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <LanguageLogo slug={language} size="xl" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {languageInfo.name} Interview Questions
              </h1>
              <p className="text-gray-600 mt-1">{languageInfo.description}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="text-sm px-3 py-1"
              data-testid="results-counter"
            >
              {hasActiveFilters
                ? `${filteredQuestions.length} of ${questions.length} loaded`
                : `${questions.length} of ${total} questions`}
            </Badge>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700"
                data-testid="clear-filters"
              >
                <X className="w-3 h-3 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <InterviewFilters
              tags={allTags}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
              onClearAll={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search + Mobile Filter */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search questions, topics, or keywords..."
                />
              </div>
              <FilterSheet
                tags={allTags}
                selectedTags={selectedTags}
                onTagChange={setSelectedTags}
                onClearAll={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>

            {/* Questions List */}
            {isInitialLoading ? (
              <QuestionGroupSkeleton />
            ) : filteredQuestions.length > 0 ? (
              <>
                <TopicSection questions={filteredQuestions} />

                {/* Load more indicator / End of list */}
                {!hasActiveFilters && (
                  <>
                    {error ? (
                      <LoadError
                        message={error}
                        onRetry={handleRetry}
                        retryCount={retryCount}
                        maxRetries={MAX_RETRIES}
                      />
                    ) : hasMore ? (
                      <>
                        <LoadMoreIndicator isLoading={isLoadingMore} />
                        <div ref={sentinelRef} className="h-4" aria-hidden="true" />
                      </>
                    ) : (
                      <EndOfListIndicator totalCount={questions.length} />
                    )}
                  </>
                )}

                {/* Show end indicator when filters are active and all filtered results shown */}
                {hasActiveFilters && filteredQuestions.length > 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">
                      Showing {filteredQuestions.length} filtered results
                    </p>
                  </div>
                )}
              </>
            ) : (
              <Card className="p-12 text-center">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg text-gray-500 mb-2">No questions found</p>
                <p className="text-sm text-gray-400 mb-4">
                  Try adjusting your filters or search query
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear all filters
                  </Button>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Floating UI elements */}
      <ScrollProgress loaded={questions.length} total={total} />
      <BackToTop />
    </div>
  )
}
