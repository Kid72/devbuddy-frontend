'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'
import { InterviewQuestion } from '@/lib/api/interview'
import { cn } from '@/lib/utils'

interface MobileNavigationProps {
  language: string
  prevQuestion: InterviewQuestion | null
  nextQuestion: InterviewQuestion | null
  relatedContent?: React.ReactNode
  className?: string
}

export function MobileNavigation({
  language,
  prevQuestion,
  nextQuestion,
  relatedContent,
  className,
}: MobileNavigationProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden z-50',
        className
      )}
    >
      <div className="flex items-center justify-between p-3 gap-2">
        {/* Previous Button */}
        {prevQuestion ? (
          <Link href={`/interview/${language}/${prevQuestion.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled className="flex-1">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </Button>
        )}

        {/* Related Content Sheet */}
        {relatedContent && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="px-4">
                <LayoutGrid className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Related</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <SheetHeader>
                <SheetTitle>Related Topics</SheetTitle>
              </SheetHeader>
              <div className="mt-4 overflow-y-auto">
                {relatedContent}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Next Button */}
        {nextQuestion ? (
          <Link href={`/interview/${language}/${nextQuestion.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled className="flex-1">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
