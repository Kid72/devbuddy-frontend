import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InterviewQuestion } from '@/lib/api/interview'

interface QuestionCardProps {
  question: InterviewQuestion
  index: number
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Link href={`/interview/${question.category}/${question.id}`}>
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full" data-testid="question-card">
        <CardHeader>
          <div className="flex items-start gap-3">
            <span className="text-sm font-semibold text-gray-400 mt-1 flex-shrink-0">
              #{index + 1}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className={getDifficultyColor(question.difficulty)} data-testid="difficulty-badge">
                  {question.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs" data-testid="category-badge">
                  {question.category}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight" data-testid="question-title">
                {question.title}
              </h3>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2" data-testid="question-tags">
            {question.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {question.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{question.tags.length - 3}
              </Badge>
            )}
          </div>
          {question.video_url && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500" data-testid="video-indicator">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Video available</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
