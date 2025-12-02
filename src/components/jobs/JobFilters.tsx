'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

interface JobFiltersProps {
  experienceLevels: string[]
  locationTypes: string[]
  employmentTypes: string[]
  techStack: string[]
  selectedExperience: string[]
  selectedLocationType: string[]
  selectedEmploymentType: string[]
  selectedTechStack: string[]
  onExperienceChange: (values: string[]) => void
  onLocationTypeChange: (values: string[]) => void
  onEmploymentTypeChange: (values: string[]) => void
  onTechStackChange: (values: string[]) => void
  onClearAll: () => void
  hasActiveFilters: boolean
}

export function JobFilters({
  experienceLevels,
  locationTypes,
  employmentTypes,
  techStack,
  selectedExperience,
  selectedLocationType,
  selectedEmploymentType,
  selectedTechStack,
  onExperienceChange,
  onLocationTypeChange,
  onEmploymentTypeChange,
  onTechStackChange,
  onClearAll,
  hasActiveFilters,
}: JobFiltersProps) {
  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (values: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
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
        {/* Location Type */}
        <div>
          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
            Location
          </h3>
          <div className="space-y-2">
            {locationTypes.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedLocationType.includes(type)}
                  onCheckedChange={() =>
                    toggleFilter(type, selectedLocationType, onLocationTypeChange)
                  }
                />
                <span className="capitalize text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level */}
        <div>
          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
            Experience Level
          </h3>
          <div className="space-y-2">
            {experienceLevels.map(level => (
              <label key={level} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedExperience.includes(level)}
                  onCheckedChange={() =>
                    toggleFilter(level, selectedExperience, onExperienceChange)
                  }
                />
                <span className="capitalize text-sm">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Employment Type */}
        <div>
          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
            Employment Type
          </h3>
          <div className="space-y-2">
            {employmentTypes.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedEmploymentType.includes(type)}
                  onCheckedChange={() =>
                    toggleFilter(type, selectedEmploymentType, onEmploymentTypeChange)
                  }
                />
                <span className="capitalize text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tech Stack */}
        <div>
          <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
            Tech Stack
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {techStack.map(tech => (
              <label key={tech} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedTechStack.includes(tech)}
                  onCheckedChange={() =>
                    toggleFilter(tech, selectedTechStack, onTechStackChange)
                  }
                />
                <span className="text-sm">{tech}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
