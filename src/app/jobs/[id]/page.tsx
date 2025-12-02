'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Heart } from 'lucide-react'
import { mockJobs } from '@/lib/mock-data/jobs'
import { JobDetail, ApplyButton } from '@/components/jobs'

export default function JobDetailPage() {
  const params = useParams()
  const job = mockJobs.find(j => j.id === params.id)

  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saved_jobs')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  if (!job) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Job not found</h1>
        <p className="text-gray-600 mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/jobs">
          <Button>Browse All Jobs</Button>
        </Link>
      </div>
    )
  }

  const toggleSaveJob = () => {
    const updated = savedJobs.includes(job.id)
      ? savedJobs.filter(id => id !== job.id)
      : [...savedJobs, job.id]
    setSavedJobs(updated)
    localStorage.setItem('saved_jobs', JSON.stringify(updated))
  }

  const isSaved = savedJobs.includes(job.id)

  // Find similar jobs based on tech stack
  const similarJobs = mockJobs
    .filter(j =>
      j.id !== job.id &&
      j.techStack.some(tech => job.techStack.includes(tech))
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="lg"
            onClick={toggleSaveJob}
            className="flex items-center gap-2"
          >
            <Heart
              className={`w-5 h-5 ${
                isSaved ? 'fill-red-500 text-red-500' : ''
              }`}
            />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <ApplyButton applyUrl={job.applyUrl} source={job.source} />
        </div>

        {/* Job Detail Component */}
        <JobDetail job={job} />

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Similar Jobs</h2>
            <div className="space-y-4">
              {similarJobs.map(similarJob => (
                <Link
                  key={similarJob.id}
                  href={`/jobs/${similarJob.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {similarJob.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {similarJob.company} • {similarJob.location}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {similarJob.techStack.slice(0, 4).map(tech => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize flex-shrink-0">
                      {similarJob.experienceLevel}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )}

        {/* Apply Footer */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 py-8">
          <ApplyButton applyUrl={job.applyUrl} source={job.source} />
          <Button size="lg" variant="outline" onClick={toggleSaveJob}>
            <Heart
              className={`w-4 h-4 mr-2 ${
                isSaved ? 'fill-red-500 text-red-500' : ''
              }`}
            />
            {isSaved ? 'Saved' : 'Save for Later'}
          </Button>
        </div>
      </div>
    </div>
  )
}
