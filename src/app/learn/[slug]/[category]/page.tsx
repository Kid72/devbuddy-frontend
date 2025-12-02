import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import { getLanguageBySlug, getCategoryTopics, ApiException } from '@/lib/api'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string; category: string }>
}) {
  const { slug, category: categorySlug } = await params

  let languageData;
  let categoryData;

  try {
    [languageData, categoryData] = await Promise.all([
      getLanguageBySlug(slug),
      getCategoryTopics(slug, categorySlug),
    ]);
  } catch (err) {
    if (err instanceof ApiException && err.statusCode === 404) {
      notFound()
    }
    throw err;
  }

  const language = languageData;
  const category = categoryData;
  const topics = categoryData.topics.filter(t => t.is_published);

  // Group topics by difficulty
  const beginnerTopics = topics.filter(t => t.difficulty === 'beginner')
  const intermediateTopics = topics.filter(t => t.difficulty === 'intermediate')
  const advancedTopics = topics.filter(t => t.difficulty === 'advanced')

  const totalReadTime = topics.reduce((sum, topic) => sum + (topic.estimated_read_time || 10), 0);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href={`/learn/${slug}`}>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {language.name}
        </Button>
      </Link>

      {/* Category Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">{language.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {category.name}
          </h1>
        </div>
        <p className="text-xl text-gray-600 mb-4">
          {category.description || 'Learn the fundamentals'}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Badge variant="secondary">{topics.length} topics</Badge>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {totalReadTime} min total
          </span>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-12">
        {beginnerTopics.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Badge variant="default">Beginner</Badge>
              <span className="text-lg text-gray-500 font-normal">
                {beginnerTopics.length} {beginnerTopics.length === 1 ? 'topic' : 'topics'}
              </span>
            </h2>
            <div className="grid gap-4">
              {beginnerTopics.map(topic => (
                <Link key={topic.id} href={`/learn/${slug}/${categorySlug}/${topic.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 flex items-center gap-2">
                            {topic.title}
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </CardTitle>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {topic.estimated_read_time || 10} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {intermediateTopics.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Badge variant="secondary">Intermediate</Badge>
              <span className="text-lg text-gray-500 font-normal">
                {intermediateTopics.length} {intermediateTopics.length === 1 ? 'topic' : 'topics'}
              </span>
            </h2>
            <div className="grid gap-4">
              {intermediateTopics.map(topic => (
                <Link key={topic.id} href={`/learn/${slug}/${categorySlug}/${topic.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 flex items-center gap-2">
                            {topic.title}
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </CardTitle>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {topic.estimated_read_time || 15} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {advancedTopics.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Badge variant="outline">Advanced</Badge>
              <span className="text-lg text-gray-500 font-normal">
                {advancedTopics.length} {advancedTopics.length === 1 ? 'topic' : 'topics'}
              </span>
            </h2>
            <div className="grid gap-4">
              {advancedTopics.map(topic => (
                <Link key={topic.id} href={`/learn/${slug}/${categorySlug}/${topic.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 flex items-center gap-2">
                            {topic.title}
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </CardTitle>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {topic.estimated_read_time || 20} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {topics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No topics available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
