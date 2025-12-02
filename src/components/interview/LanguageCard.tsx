'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { LanguageLogo, languageColors } from './LanguageLogo'
import { cn } from '@/lib/utils'

interface LanguageCardProps {
  id: string
  name: string
  slug: string
  description: string
  questionCount: number
  className?: string
}

export function LanguageCard({
  id,
  name,
  slug,
  description,
  questionCount,
  className,
}: LanguageCardProps) {
  const accentColor = languageColors[slug] || '#6B7280'
  const hasQuestions = questionCount > 0

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group',
        className
      )}
      data-testid={`language-card-${slug}`}
    >
      {/* Colored accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 group-hover:w-1.5"
        style={{ backgroundColor: accentColor }}
      />

      <CardHeader className="pl-5">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <LanguageLogo slug={slug} size="lg" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-1 flex items-center gap-2">
              {name}
            </CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pl-5">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="font-medium"
            data-testid={`question-count-${slug}`}
          >
            {questionCount} {questionCount === 1 ? 'question' : 'questions'}
          </Badge>

          {hasQuestions ? (
            <Link href={`/interview/${slug}`}>
              <Button
                size="sm"
                className="group/btn"
                style={{
                  backgroundColor: accentColor,
                  color: slug === 'javascript' ? '#000' : '#fff'
                }}
                data-testid={`practice-button-${slug}`}
              >
                Practice
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              variant="outline"
              disabled
              data-testid={`coming-soon-button-${slug}`}
            >
              Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
