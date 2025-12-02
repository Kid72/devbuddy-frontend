'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { FolderOpen, Hash, BookOpen, Zap, Flame } from 'lucide-react'
import { InterviewQuestion } from '@/lib/api/interview'
import { QuestionListItem } from './QuestionListItem'
import { cn } from '@/lib/utils'
import {
  getTopicForTag,
  difficultyOrder,
  categoryColors,
  difficultyColors,
  type TopicInfo,
  type Difficulty,
} from '@/lib/interview/topicMapping'

interface TopicSectionProps {
  questions: InterviewQuestion[]
  globalIndex?: number
  className?: string
}

interface GroupedQuestions {
  topicName: string
  topicInfo: TopicInfo
  questions: InterviewQuestion[]
}

// Difficulty icons
const difficultyIcons: Record<Difficulty, React.ReactNode> = {
  easy: <BookOpen className="w-3.5 h-3.5" />,
  medium: <Zap className="w-3.5 h-3.5" />,
  hard: <Flame className="w-3.5 h-3.5" />,
}

// Difficulty labels
const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export function TopicSection({
  questions,
  globalIndex = 0,
  className,
}: TopicSectionProps) {
  const params = useParams()
  const language = (params?.language as string) || 'go'

  // Group questions by mapped topic name
  const groupedQuestions = useMemo(() => {
    const groups = new Map<string, { info: TopicInfo; questions: InterviewQuestion[] }>()

    questions.forEach((question) => {
      // Get topic from first tag (primary topic indicator)
      const primaryTag = question.tags.length > 0 ? question.tags[0] : ''
      const topicInfo = getTopicForTag(primaryTag, language)
      const topicKey = topicInfo.name // Use topic name as key to merge similar tags

      if (!groups.has(topicKey)) {
        groups.set(topicKey, { info: topicInfo, questions: [] })
      }
      groups.get(topicKey)!.questions.push(question)
    })

    // Convert to array and sort by:
    // 1. Difficulty (easy -> medium -> hard)
    // 2. Order within difficulty
    // 3. Question count (descending) for same order
    const result: GroupedQuestions[] = Array.from(groups.entries())
      .map(([topicName, data]) => ({
        topicName,
        topicInfo: data.info,
        questions: data.questions,
      }))
      .sort((a, b) => {
        // First by difficulty
        const diffA = difficultyOrder[a.topicInfo.difficulty]
        const diffB = difficultyOrder[b.topicInfo.difficulty]
        if (diffA !== diffB) return diffA - diffB

        // Then by order within difficulty
        if (a.topicInfo.order !== b.topicInfo.order) {
          return a.topicInfo.order - b.topicInfo.order
        }

        // Finally by question count (more questions first)
        return b.questions.length - a.questions.length
      })

    return result
  }, [questions, language])

  // Calculate starting index for each group
  const groupIndices = useMemo(() => {
    const indices: Record<string, number> = {}
    let currentIndex = globalIndex

    groupedQuestions.forEach((group) => {
      indices[group.topicName] = currentIndex
      currentIndex += group.questions.length
    })

    return indices
  }, [groupedQuestions, globalIndex])

  // Group by difficulty for section headers
  const questionsByDifficulty = useMemo(() => {
    const byDiff: Record<Difficulty, GroupedQuestions[]> = {
      easy: [],
      medium: [],
      hard: [],
    }

    groupedQuestions.forEach((group) => {
      byDiff[group.topicInfo.difficulty].push(group)
    })

    return byDiff
  }, [groupedQuestions])

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No questions found</p>
      </div>
    )
  }

  // If very few questions, show flat list
  if (questions.length <= 5) {
    return (
      <div className={cn('space-y-3', className)}>
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
    <div className={cn('space-y-10', className)}>
      {/* Render by difficulty level */}
      {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty) => {
        const groups = questionsByDifficulty[difficulty]
        if (groups.length === 0) return null

        const totalQuestions = groups.reduce((sum, g) => sum + g.questions.length, 0)
        const colors = difficultyColors[difficulty]

        return (
          <div key={difficulty} className="space-y-6">
            {/* Difficulty Section Header */}
            <div className="sticky top-0 z-20 -mx-4 px-4 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full',
                  colors.bg, colors.text
                )}>
                  {difficultyIcons[difficulty]}
                  <span className="font-semibold text-sm">
                    {difficultyLabels[difficulty]}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {totalQuestions} questions in {groups.length} topics
                </span>
              </div>
            </div>

            {/* Topics within this difficulty */}
            <div className="space-y-8 pl-2">
              {groups.map((group) => {
                const catColors = categoryColors[group.topicInfo.category] || categoryColors['Other']
                return (
                  <section key={group.topicName} className="scroll-mt-20">
                    {/* Topic Header */}
                    <div className={cn(
                      'sticky top-14 z-10 -mx-4 px-4 py-2 bg-gray-50/95 backdrop-blur-sm border-b',
                      catColors.border
                    )}>
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center',
                            catColors.bg
                          )}
                        >
                          <Hash className={cn('w-4 h-4', catColors.icon)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {group.topicName}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {group.topicInfo.category}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-white border border-slate-200 text-slate-600 font-medium text-xs"
                        >
                          {group.questions.length}
                        </Badge>
                      </div>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-3 pt-4">
                      {group.questions.map((question, index) => (
                        <QuestionListItem
                          key={question.id}
                          question={question}
                          index={groupIndices[group.topicName] + index}
                        />
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
