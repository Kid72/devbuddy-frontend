'use client'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface QuestionProgressProps {
  currentIndex: number
  totalQuestions: number
  className?: string
}

export function QuestionProgress({
  currentIndex,
  totalQuestions,
  className,
}: QuestionProgressProps) {
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Badge variant="secondary" className="text-sm font-medium whitespace-nowrap">
        {currentIndex + 1} of {totalQuestions}
      </Badge>
      <Progress value={progress} className="h-2 flex-1 max-w-[120px]" />
    </div>
  )
}
