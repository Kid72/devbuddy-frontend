'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, Heart } from 'lucide-react'
import { mockJobs, getAllTechStacks } from '@/lib/mock-data/jobs'
import { JobCard, JobFilters } from '@/components/jobs'

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [selectedLocationType, setSelectedLocationType] = useState<string[]>([])
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([])
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([])
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saved_jobs')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const experienceLevels = ['junior', 'mid', 'senior', 'lead']
  const locationTypes = ['remote', 'onsite', 'hybrid']
  const employmentTypes = ['full-time', 'part-time', 'contract', 'internship']
  const allTech = getAllTechStacks()

  const toggleSaveJob = (jobId: string) => {
    const updated = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId]
    setSavedJobs(updated)
    localStorage.setItem('saved_jobs', JSON.stringify(updated))
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedExperience([])
    setSelectedLocationType([])
    setSelectedEmploymentType([])
    setSelectedTechStack([])
  }

  const hasActiveFilters = !!(searchQuery || selectedExperience.length > 0 ||
    selectedLocationType.length > 0 || selectedEmploymentType.length > 0 ||
    selectedTechStack.length > 0)

  const filteredJobs = useMemo(() => {
    let filtered = mockJobs

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.techStack.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Experience filter
    if (selectedExperience.length > 0) {
      filtered = filtered.filter(job => selectedExperience.includes(job.experienceLevel))
    }

    // Location type filter
    if (selectedLocationType.length > 0) {
      filtered = filtered.filter(job => selectedLocationType.includes(job.locationType))
    }

    // Employment type filter
    if (selectedEmploymentType.length > 0) {
      filtered = filtered.filter(job => selectedEmploymentType.includes(job.employmentType))
    }

    // Tech stack filter
    if (selectedTechStack.length > 0) {
      filtered = filtered.filter(job =>
        job.techStack.some(tech => selectedTechStack.includes(tech))
      )
    }

    return filtered.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
  }, [searchQuery, selectedExperience, selectedLocationType, selectedEmploymentType, selectedTechStack])

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
          Find Your Next Opportunity
        </h1>
        <p className="text-xl text-gray-600">
          {mockJobs.length} developer jobs available
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by job title, company, or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <JobFilters
            experienceLevels={experienceLevels}
            locationTypes={locationTypes}
            employmentTypes={employmentTypes}
            techStack={allTech}
            selectedExperience={selectedExperience}
            selectedLocationType={selectedLocationType}
            selectedEmploymentType={selectedEmploymentType}
            selectedTechStack={selectedTechStack}
            onExperienceChange={setSelectedExperience}
            onLocationTypeChange={setSelectedLocationType}
            onEmploymentTypeChange={setSelectedEmploymentType}
            onTechStackChange={setSelectedTechStack}
            onClearAll={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>
            {savedJobs.length > 0 && (
              <Link href="/jobs/saved">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2 fill-red-500 text-red-500" />
                  Saved ({savedJobs.length})
                </Button>
              </Link>
            )}
          </div>

          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.includes(job.id)}
                  onToggleSave={toggleSaveJob}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-lg text-gray-500 mb-2">No jobs found</p>
              <p className="text-sm text-gray-400 mb-4">
                Try adjusting your filters or search query
              </p>
              {hasActiveFilters && (
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
