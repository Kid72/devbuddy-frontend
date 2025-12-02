import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { getLanguages, ApiException } from '@/lib/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Learn Programming",
  description: "Master programming languages with comprehensive tutorials covering fundamentals, advanced concepts, and best practices for Java, Python, JavaScript, Go, and more.",
  keywords: ["learn programming", "coding tutorials", "programming courses", "Java tutorial", "Python tutorial", "JavaScript tutorial", "Go tutorial", "programming fundamentals"],
  openGraph: {
    title: "Learn Programming | DevHub",
    description: "Master programming languages with comprehensive tutorials and best practices",
  },
}

export default async function LearnPage() {
  let languages: Awaited<ReturnType<typeof getLanguages>> = [];
  let error: string | null = null;

  try {
    languages = await getLanguages();
  } catch (err) {
    error = err instanceof ApiException ? err.message : 'Failed to load languages';
    languages = [];
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
          Learn Programming
        </h1>
        <p className="text-xl text-gray-600">
          Master your favorite programming language
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">Error loading languages</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {languages.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading languages...</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map(language => (
          <Link
            key={language.id}
            href={`/learn/${language.slug}`}
            className="block"
          >
            <Card className="p-8 text-center hover:shadow-lg transition-all cursor-pointer hover:scale-105 duration-200">
              <div className="text-6xl mb-4">{language.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {language.name}
              </h3>
              <p className="text-gray-600">{language.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
