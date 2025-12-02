'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Briefcase, DollarSign, Clock, Heart } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Job } from '@/lib/mock-data/jobs'

interface JobCardProps {
  job: Job
  isSaved?: boolean
  onToggleSave?: (jobId: string) => void
  showSaveButton?: boolean
}

export function JobCard({
  job,
  isSaved = false,
  onToggleSave,
  showSaveButton = true
}: JobCardProps) {
  const formatSalary = () => {
    if (!job.salary) return null
    if (job.salary.currency.includes('/')) {
      return `${job.salary.currency} ${job.salary.min} - ${job.salary.max}`
    }
    return `${job.salary.currency} ${(job.salary.min / 1000).toFixed(0)}k - ${(job.salary.max / 1000).toFixed(0)}k`
  }

  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <Link href={`/jobs/${job.id}`} className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </CardTitle>
            <p className="text-base text-gray-600">{job.company}</p>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {job.experienceLevel}
            </Badge>
            {showSaveButton && onToggleSave && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onToggleSave(job.id)
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={isSaved ? 'Unsave job' : 'Save job'}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isSaved
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4 capitalize" />
            {job.locationType}
          </div>
          {job.salary && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {formatSalary()}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatDistanceToNow(job.postedAt, { addSuffix: true })}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2">
          {job.techStack.slice(0, 6).map(tech => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {job.techStack.length > 6 && (
            <Badge variant="outline" className="text-xs">
              +{job.techStack.length - 6} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
