'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer'
import { ChevronDown, ChevronUp, Lightbulb, Eye, EyeOff } from 'lucide-react'

interface AnswerSectionProps {
  answer: string
  defaultExpanded?: boolean
}

export function AnswerSection({ answer, defaultExpanded = false }: AnswerSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="mt-8" data-testid="answer-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Answer</h2>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant={isExpanded ? 'outline' : 'default'}
          size="sm"
          className="gap-2"
          data-testid="answer-toggle"
        >
          {isExpanded ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Answer
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show Answer
            </>
          )}
        </Button>
      </div>

      {isExpanded ? (
        <Card className="p-6 bg-white border-gray-200 animate-in fade-in-50 slide-in-from-top-2 duration-300" data-testid="answer-content">
          <MarkdownRenderer content={answer} />
        </Card>
      ) : (
        <Card className="overflow-hidden" data-testid="answer-placeholder">
          {/* Motivational Try First Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 p-8">
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Try it yourself first!
              </h3>
              <p className="text-gray-600 mb-6">
                Take a moment to think through your approach. Consider edge cases,
                time complexity, and how you would explain your solution in an interview.
              </p>
              <Button
                onClick={() => setIsExpanded(true)}
                size="lg"
                className="gap-2 bg-amber-600 hover:bg-amber-700"
              >
                <Eye className="w-5 h-5" />
                Reveal Answer
              </Button>
            </div>
          </div>

          {/* Hint section */}
          <div className="bg-gray-50 px-8 py-4 border-t">
            <p className="text-sm text-gray-500 text-center">
              Tip: Practice explaining your thought process out loud - it's a key interview skill!
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
