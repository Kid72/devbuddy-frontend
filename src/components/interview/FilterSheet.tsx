'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Filter } from 'lucide-react'

interface FilterSheetProps {
  tags: string[]
  selectedTags: string[]
  onTagChange: (values: string[]) => void
  onClearAll: () => void
  hasActiveFilters: boolean
}

export function FilterSheet({
  tags,
  selectedTags,
  onTagChange,
  onClearAll,
  hasActiveFilters,
}: FilterSheetProps) {
  const toggleTag = (value: string) => {
    if (selectedTags.includes(value)) {
      onTagChange(selectedTags.filter(t => t !== value))
    } else {
      onTagChange([...selectedTags, value])
    }
  }

  const activeFilterCount = selectedTags.length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden relative">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
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
        </SheetHeader>

        <div className="py-6 space-y-6 overflow-y-auto flex-1">
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
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
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
        </div>

        <SheetFooter className="border-t pt-4">
          <SheetClose asChild>
            <Button className="w-full">
              Apply Filters
              {activeFilterCount > 0 && ` (${activeFilterCount})`}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
