'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface InterviewFiltersProps {
  tags: string[]
  selectedTags: string[]
  onTagChange: (values: string[]) => void
  onClearAll: () => void
  hasActiveFilters: boolean
  className?: string
}

export function InterviewFilters({
  tags,
  selectedTags,
  onTagChange,
  onClearAll,
  hasActiveFilters,
  className,
}: InterviewFiltersProps) {
  const toggleTag = (value: string) => {
    if (selectedTags.includes(value)) {
      onTagChange(selectedTags.filter(t => t !== value))
    } else {
      onTagChange([...selectedTags, value])
    }
  }

  return (
    <Card className={cn('sticky top-20', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-auto p-0 text-blue-600 hover:text-blue-700"
            >
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {tags.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 text-sm">
              Topics
              {selectedTags.length > 0 && (
                <span className="ml-2 text-xs font-normal text-gray-500">
                  ({selectedTags.length} selected)
                </span>
              )}
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {tags.map(tag => (
                <label
                  key={tag}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <span className="text-sm group-hover:text-gray-900 truncate">
                    {tag}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {tags.length === 0 && (
          <p className="text-sm text-gray-500">No filters available</p>
        )}
      </CardContent>
    </Card>
  )
}
