import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Clock } from 'lucide-react'
import { getLanguageBySlug, ApiException } from '@/lib/api'

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let languageData;
  try {
    languageData = await getLanguageBySlug(slug);
  } catch (err) {
    if (err instanceof ApiException && err.statusCode === 404) {
      notFound()
    }
    throw err; // Re-throw other errors
  }

  const { categories, ...language } = languageData

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/learn">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Languages
        </Button>
      </Link>

      {/* Language Header */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">{language.icon}</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
          {language.name}
        </h1>
        <p className="text-xl text-gray-600">{language.description}</p>
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Learning Categories
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map(category => (
            <div key={category.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {category.description || 'Learn the fundamentals'}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {category.topicCount || 0} {(category.topicCount || 0) === 1 ? 'topic' : 'topics'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {(category.topicCount || 0) > 0 ? (
                    <Link href={`/learn/${slug}/${category.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View All Topics
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Content coming soon
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          More Content Coming Soon
        </h3>
        <p className="text-gray-600">
          We&apos;re working on interactive tutorials, quizzes, and hands-on exercises for each category.
          Stay tuned for updates!
        </p>
      </div>
    </div>
  )
}
