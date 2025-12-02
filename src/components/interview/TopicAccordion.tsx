'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ChevronDown, ChevronUp, FolderOpen } from 'lucide-react'
import { InterviewQuestion } from '@/lib/api/interview'
import { QuestionListItem } from './QuestionListItem'
import { cn } from '@/lib/utils'

interface TopicAccordionProps {
  questions: InterviewQuestion[]
  globalIndex?: number // Starting index for numbering
  className?: string
}

interface GroupedQuestions {
  topic: string
  questions: InterviewQuestion[]
}

export function TopicAccordion({
  questions,
  globalIndex = 0,
  className,
}: TopicAccordionProps) {
  const [expandAll, setExpandAll] = useState(false)

  // Group questions by their first tag (primary topic)
  const groupedQuestions = useMemo(() => {
    const groups = new Map<string, InterviewQuestion[]>()
    const noTopic: InterviewQuestion[] = []

    questions.forEach(question => {
      if (question.tags.length > 0) {
        const primaryTag = question.tags[0]
        if (!groups.has(primaryTag)) {
          groups.set(primaryTag, [])
        }
        groups.get(primaryTag)!.push(question)
      } else {
        noTopic.push(question)
      }
    })

    // Convert to array and sort by number of questions
    const result: GroupedQuestions[] = Array.from(groups.entries())
      .map(([topic, qs]) => ({ topic, questions: qs }))
      .sort((a, b) => b.questions.length - a.questions.length)

    // Add "Other" group if there are untagged questions
    if (noTopic.length > 0) {
      result.push({ topic: 'Other', questions: noTopic })
    }

    return result
  }, [questions])

  // Calculate starting index for each group
  const groupIndices = useMemo(() => {
    const indices: Record<string, number> = {}
    let currentIndex = globalIndex

    groupedQuestions.forEach(group => {
      indices[group.topic] = currentIndex
      currentIndex += group.questions.length
    })

    return indices
  }, [groupedQuestions, globalIndex])

  // Default open state - first group open
  const defaultValue = groupedQuestions.length > 0 ? [groupedQuestions[0].topic] : []

  // Control which items are open
  const [openItems, setOpenItems] = useState<string[]>(defaultValue)

  const toggleExpandAll = () => {
    if (expandAll) {
      setOpenItems(defaultValue)
    } else {
      setOpenItems(groupedQuestions.map(g => g.topic))
    }
    setExpandAll(!expandAll)
  }

  if (groupedQuestions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No questions found</p>
      </div>
    )
  }

  // If only one group or very few questions, don't use accordion
  if (groupedQuestions.length === 1 || questions.length <= 5) {
    return (
      <div className={cn('space-y-2', className)}>
        {questions.map((question, index) => (
          <QuestionListItem
            key={question.id}
            question={question}
            index={globalIndex + index}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Expand/Collapse All button */}
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpandAll}
          className="text-gray-600 hover:text-gray-900"
        >
          {expandAll ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Expand All
            </>
          )}
        </Button>
      </div>

      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-3"
      >
        {groupedQuestions.map(group => (
          <AccordionItem
            key={group.topic}
            value={group.topic}
            className="border rounded-lg bg-white overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900">{group.topic}</span>
                <Badge variant="secondary" className="text-xs">
                  {group.questions.length} {group.questions.length === 1 ? 'question' : 'questions'}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-2 pt-2">
                {group.questions.map((question, index) => (
                  <QuestionListItem
                    key={question.id}
                    question={question}
                    index={groupIndices[group.topic] + index}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
