'use client'

import { useState, useMemo, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Search, X, Loader2, AlertCircle } from 'lucide-react'
import { NewsCard } from '@/components/news/NewsCard'
import { getNews, getSources, ApiException } from '@/lib/api'
import type { NewsArticle, NewsSource } from '@/types'

export default function NewsPage() {
  // State for data
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [sources, setSources] = useState<NewsSource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State for filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedDateRanges, setSelectedDateRanges] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch news and sources in parallel
        const [newsResponse, sourcesData] = await Promise.all([
          getNews({ limit: 100 }), // Fetch all articles
          getSources(),
        ])

        setArticles(newsResponse.articles)
        setSources(sourcesData)
      } catch (err) {
        if (err instanceof ApiException) {
          setError(err.message)
        } else {
          setError('Failed to load news. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get unique values for filters from fetched data
  const categories = useMemo(() => {
    const cats = new Set<string>()
    articles.forEach(article => {
      if (article.category) cats.add(article.category)
    })
    return Array.from(cats).sort()
  }, [articles])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    articles.forEach(article => {
      (article.tags || []).forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [articles])

  const sourceNames = useMemo(() => {
    return Array.from(new Set(sources.map(s => s.name))).sort()
  }, [sources])

  const dateRanges = ['Today', 'This Week', 'This Month', 'All Time']

  // Helper function to toggle filter
  const toggleFilter = (value: string, selected: string[], setSelected: (values: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  // Check if any filters are active
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedTags.length > 0 ||
    selectedDateRanges.length > 0 ||
    selectedSources.length > 0

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSelectedDateRanges([])
    setSelectedSources([])
  }

  // Find source name by matching with sources array
  const getSourceName = (sourceId: string): string => {
    const source = sources.find(s => s.id === sourceId)
    return source?.name || 'Unknown'
  }

  // Filter articles
  const filteredArticles = useMemo(() => {
    let filtered = articles

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        (article.summary || '').toLowerCase().includes(query) ||
        (article.tags || []).some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(article =>
        selectedCategories.includes(article.category)
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        (article.tags || []).some(tag => selectedTags.includes(tag))
      )
    }

    // Filter by date ranges
    if (selectedDateRanges.length > 0) {
      const now = new Date()
      filtered = filtered.filter(article => {
        const publishedDate = new Date(article.published_at)
        const daysDiff = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24))

        return selectedDateRanges.some(range => {
          if (range === 'Today') return daysDiff === 0
          if (range === 'This Week') return daysDiff <= 7
          if (range === 'This Month') return daysDiff <= 30
          if (range === 'All Time') return true
          return false
        })
      })
    }

    // Filter by sources
    if (selectedSources.length > 0) {
      filtered = filtered.filter(article => {
        const sourceName = getSourceName(article.source_id)
        return selectedSources.includes(sourceName)
      })
    }

    // Sort by latest
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.published_at).getTime()
      const dateB = new Date(b.published_at).getTime()
      return dateB - dateA
    })
  }, [articles, searchQuery, selectedCategories, selectedTags, selectedDateRanges, selectedSources, sources])

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 w-full rounded-t-lg" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  )

  // Loading state
  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
            Developer News
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest in software development
          </p>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Sidebar skeleton */}
          <aside className="lg:col-span-1">
            <Card className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </Card>
          </aside>
          {/* Articles grid skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="overflow-hidden">
                  <LoadingSkeleton />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
            Developer News
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest in software development
          </p>
        </div>
        <div className="flex justify-center items-center py-20">
          <Card className="p-8 max-w-md">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Error Loading News</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="default">
                Retry
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
          Developer News
        </h1>
        <p className="text-xl text-gray-600">
          Stay updated with the latest in software development
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Main Content: Sidebar + News Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Filters */}
        <aside className="lg:col-span-1">
          <Card className="p-6 sticky top-20">
            {/* Header with Clear Filters */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs h-7"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  📂 Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() =>
                          toggleFilter(category, selectedCategories, setSelectedCategories)
                        }
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Tags Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  🏷️ Tags
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() =>
                          toggleFilter(tag, selectedTags, setSelectedTags)
                        }
                      />
                      <span className="text-sm">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Date Range Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  📅 Date Range
                </h3>
                <div className="space-y-2">
                  {dateRanges.map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedDateRanges.includes(range)}
                        onCheckedChange={() =>
                          toggleFilter(range, selectedDateRanges, setSelectedDateRanges)
                        }
                      />
                      <span className="text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Source Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  📰 Source
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {sourceNames.map((sourceName) => (
                    <label key={sourceName} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedSources.includes(sourceName)}
                        onCheckedChange={() =>
                          toggleFilter(sourceName, selectedSources, setSelectedSources)
                        }
                      />
                      <span className="text-sm">{sourceName}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </aside>

        {/* News Grid */}
        <div className="lg:col-span-3">
          {/* Results Count */}
          <p className="text-sm text-gray-600 mb-4">
            Showing {filteredArticles.length} of {articles.length} articles
          </p>

          {/* Articles Grid - 2 Column Layout */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <NewsCard
                  key={article.id}
                  article={article}
                  sourceName={getSourceName(article.source_id)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
