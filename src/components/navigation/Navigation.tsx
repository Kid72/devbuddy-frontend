'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu, Search, X, FileText, BookOpen, Briefcase, MessageSquare, Newspaper, FileCheck } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { mockTopics } from '@/lib/mock-data/learn'
import { mockJobs } from '@/lib/mock-data/jobs'
import { UserMenu } from '@/components/auth/UserMenu'
import { searchNews, type NewsArticle } from '@/lib/api'
import { searchInterviewQuestions, type InterviewQuestion } from '@/lib/api/interview'
import type { LucideIcon } from 'lucide-react'

interface NavigationLink {
  href: string
  label: string
  icon: LucideIcon
}

const navigationLinks: NavigationLink[] = [
  { href: '/', label: 'News', icon: Newspaper },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/interview', label: 'Interview', icon: MessageSquare },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/cv', label: 'CV Optimizer', icon: FileCheck },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [newsResults, setNewsResults] = useState<NewsArticle[]>([])
  const [questionResults, setQuestionResults] = useState<InterviewQuestion[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      inputRef.current?.focus()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchOpen])

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }

    if (searchOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [searchOpen])

  // Debounced API search for news and interview questions
  useEffect(() => {
    if (searchQuery.length < 2) {
      setNewsResults([])
      setQuestionResults([])
      return
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true)
      try {
        const [news, questions] = await Promise.all([
          searchNews(searchQuery, 3),
          searchInterviewQuestions(searchQuery, 3)
            .then(r => r.questions)
            .catch(() => [])
        ])
        setNewsResults(news)
        setQuestionResults(questions)
      } catch {
        setNewsResults([])
        setQuestionResults([])
      } finally {
        setSearchLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Combined search results
  const searchResults = searchQuery.length >= 2 ? {
    news: newsResults,
    topics: mockTopics.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3),
    jobs: mockJobs.filter(j =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3),
    questions: questionResults,
  } : null

  const handleResultClick = (url: string) => {
    router.push(url)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const hasResults = searchResults && (
    searchResults.news.length > 0 ||
    searchResults.topics.length > 0 ||
    searchResults.jobs.length > 0 ||
    searchResults.questions.length > 0
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-blue-600">Dev</span>
              <span className="text-3xl font-bold text-gray-800">Hub</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation - Button Style */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none ${
                    active
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right: Search + User Menu + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden sm:block relative" ref={searchRef}>
              {searchOpen ? (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search DevHub..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-10"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false)
                      setSearchQuery('')
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>

                  {/* Search Results Dropdown */}
                  {searchQuery.length >= 2 && (
                    <div className="absolute top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                      {hasResults ? (
                        <div className="p-2">
                          {/* News Results */}
                          {searchResults.news.length > 0 && (
                            <div className="mb-4">
                              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                News
                              </div>
                              {searchResults.news.map(article => {
                                const isExternal = !!article.external_url
                                const internalHref = `/news/${article.id}`

                                return isExternal ? (
                                  <a
                                    key={article.id}
                                    href={article.external_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                      setSearchOpen(false)
                                      setSearchQuery('')
                                    }}
                                    className="block px-3 py-2 hover:bg-gray-50 rounded text-sm"
                                  >
                                    <div className="flex items-start gap-2">
                                      <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                      <span className="line-clamp-2">{article.title}</span>
                                    </div>
                                  </a>
                                ) : (
                                  <button
                                    key={article.id}
                                    onClick={() => handleResultClick(internalHref)}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                                  >
                                    <div className="flex items-start gap-2">
                                      <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                      <span className="line-clamp-2">{article.title}</span>
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                          )}

                          {/* Learn Topics */}
                          {searchResults.topics.length > 0 && (
                            <div className="mb-4">
                              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                Learn
                              </div>
                              {searchResults.topics.map(topic => (
                                <button
                                  key={topic.id}
                                  onClick={() => handleResultClick(`/learn/${topic.languageSlug}/${topic.categorySlug}/${topic.slug}`)}
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                                >
                                  <div className="flex items-start gap-2">
                                    <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span className="line-clamp-2">{topic.title}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Jobs */}
                          {searchResults.jobs.length > 0 && (
                            <div className="mb-4">
                              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                Jobs
                              </div>
                              {searchResults.jobs.map(job => (
                                <button
                                  key={job.id}
                                  onClick={() => handleResultClick(`/jobs/${job.id}`)}
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                                >
                                  <div className="flex items-start gap-2">
                                    <Briefcase className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="line-clamp-1 font-medium">{job.title}</div>
                                      <div className="text-xs text-gray-500">{job.company}</div>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Interview Questions */}
                          {searchResults.questions.length > 0 && (
                            <div>
                              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                Interview Q&A
                              </div>
                              {searchResults.questions.map(q => (
                                <button
                                  key={q.id}
                                  onClick={() => handleResultClick(`/interview/${q.category}/${q.id}`)}
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                                >
                                  <div className="flex items-start gap-2">
                                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="line-clamp-1 font-medium">{q.title}</div>
                                      <div className="text-xs text-gray-500 capitalize">{q.category}</div>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : searchLoading ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          Searching...
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-5 w-5 text-gray-600" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>

            {/* User Menu */}
            <UserMenu />

            {/* Mobile hamburger menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5 text-gray-600" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="text-xl font-bold text-blue-600">Dev</span>
                    <span className="text-xl font-bold text-gray-800">Hub</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-3 mt-8">
                  {navigationLinks.map((link) => {
                    const Icon = link.icon
                    const active = isActive(link.href)

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                          active
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
