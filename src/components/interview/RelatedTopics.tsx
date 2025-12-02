import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'

interface RelatedTopic {
  title: string
  slug: string
  category: string
  difficulty?: string
}

interface RelatedTopicsProps {
  topics: RelatedTopic[]
  language: string
}

export function RelatedTopics({ topics, language }: RelatedTopicsProps) {
  if (!topics || topics.length === 0) {
    return null
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Related Learn Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={`/learn/${language}/${topic.category}/${topic.slug}`}
              className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 text-sm mb-1">
                    {topic.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {topic.category}
                    </Badge>
                    {topic.difficulty && (
                      <Badge variant="outline" className="text-xs">
                        {topic.difficulty}
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
