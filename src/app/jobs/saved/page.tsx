'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, ArrowLeft } from 'lucide-react'
import { mockJobs } from '@/lib/mock-data/jobs'
import { JobCard } from '@/components/jobs'

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const saved = localStorage.getItem('saved_jobs')
      if (saved) {
        setSavedJobs(JSON.parse(saved))
      }
    }
  }, [mounted])

  const toggleSaveJob = (jobId: string) => {
    const updated = savedJobs.filter(id => id !== jobId)
    setSavedJobs(updated)
    localStorage.setItem('saved_jobs', JSON.stringify(updated))
  }

  const savedJobsList = mockJobs.filter(job => savedJobs.includes(job.id))

  if (!mounted) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading saved jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Jobs
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">
          Saved Jobs
        </h1>
        <p className="text-xl text-gray-600">
          {savedJobsList.length} {savedJobsList.length === 1 ? 'job' : 'jobs'} saved
        </p>
      </div>

      {/* Saved Jobs List */}
      {savedJobsList.length > 0 ? (
        <div className="space-y-4">
          {savedJobsList.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onToggleSave={toggleSaveJob}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No saved jobs yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start saving jobs you&apos;re interested in to view them here later
          </p>
          <Link href="/jobs">
            <Button>Browse Jobs</Button>
          </Link>
        </Card>
      )}

      {/* Info Card */}
      {savedJobsList.length > 0 && (
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> Saved jobs are stored in your browser. They will be available
            even after you close this tab, but will be cleared if you clear your browser data.
          </p>
        </Card>
      )}
    </div>
  )
}
