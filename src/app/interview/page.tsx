'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getInterviewStats } from '@/lib/api/interview'
import { LanguageCard } from '@/components/interview'
import { BookOpen, Code, Trophy } from 'lucide-react'

// Define available languages with metadata
const interviewLanguages = [
  { id: '1', name: 'Java', slug: 'java', description: 'Core Java, Spring Boot, JVM, Collections, Multithreading' },
  { id: '2', name: 'JavaScript', slug: 'javascript', description: 'ES6+, React, Node.js, TypeScript, Async patterns' },
  { id: '3', name: 'Python', slug: 'python', description: 'Data structures, Django, Flask, Machine Learning' },
  { id: '4', name: 'Go', slug: 'go', description: 'Concurrency, Goroutines, Channels, Web services' },
  { id: '5', name: 'System Design', slug: 'system-design', description: 'Architecture, Scalability, Design Patterns, Distributed Systems' },
  { id: '6', name: 'Algorithms', slug: 'algorithms', description: 'Data Structures, Complexity Analysis, Problem Solving' },
]

function LanguageCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="w-14 h-14 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  )
}

export default function InterviewPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getInterviewStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const categoriesData = stats?.by_category || {}
  const totalQuestions = stats?.total_questions || 0

  const languagesWithCounts = interviewLanguages.map(lang => ({
    ...lang,
    questionCount: categoriesData[lang.slug] || 0,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Ace your next interview
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" data-testid="page-title">
            Interview Preparation
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master technical interviews with curated questions, detailed explanations, and expert insights
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="secondary" className="text-base px-4 py-2 gap-2" data-testid="total-questions-badge">
              <BookOpen className="w-4 h-4" />
              {totalQuestions} Questions
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-2 gap-2">
              <Code className="w-4 h-4" />
              {interviewLanguages.length} Topics
            </Badge>
          </div>
        </div>

        {/* Language Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Choose Your Topic
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <LanguageCardSkeleton key={i} />
                ))
              : languagesWithCounts.map(language => (
                  <LanguageCard
                    key={language.id}
                    id={language.id}
                    name={language.name}
                    slug={language.slug}
                    description={language.description}
                    questionCount={language.questionCount}
                  />
                ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comprehensive Interview Prep
              </h3>
              <p className="text-gray-600 max-w-xl">
                Each question includes detailed explanations, code examples with syntax highlighting,
                hints to guide your thinking, and video tutorials to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
