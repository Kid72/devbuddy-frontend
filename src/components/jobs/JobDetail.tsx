'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, DollarSign, Briefcase, Clock, Building2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Job } from '@/lib/mock-data/jobs'

interface JobDetailProps {
  job: Job
}

export function JobDetail({ job }: JobDetailProps) {
  const formatSalary = () => {
    if (!job.salary) return null
    if (job.salary.currency.includes('/')) {
      return `${job.salary.currency} ${job.salary.min} - ${job.salary.max}`
    }
    const min = (job.salary.min / 1000).toFixed(0)
    const max = (job.salary.max / 1000).toFixed(0)
    return `${job.salary.currency} ${min}k - ${max}k per year`
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-8">
        <div className="flex-1 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            {job.title}
          </h1>
          <div className="flex items-center gap-2 text-xl text-gray-700 mb-4">
            <Building2 className="w-5 h-5" />
            {job.company}
          </div>
        </div>

        {/* Meta Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <div className="font-medium">{job.location}</div>
              <div className="text-sm text-gray-500 capitalize">{job.locationType}</div>
            </div>
          </div>

          {job.salary && (
            <div className="flex items-center gap-3 text-gray-700">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">{formatSalary()}</div>
                <div className="text-sm text-gray-500">Salary range</div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 text-gray-700">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <div>
              <div className="font-medium capitalize">{job.employmentType}</div>
              <div className="text-sm text-gray-500">Employment type</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <div className="font-medium">
                Posted {formatDistanceToNow(job.postedAt, { addSuffix: true })}
              </div>
              <div className="text-sm text-gray-500">via {job.source}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="capitalize text-sm">
            {job.experienceLevel}
          </Badge>
          <Badge variant="outline" className="capitalize text-sm">
            {job.locationType}
          </Badge>
          {job.techStack.map(tech => (
            <Badge key={tech} variant="secondary" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Description */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">About the Role</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {job.description}
        </p>
      </Card>

      {/* Requirements */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Requirements</h2>
        <ul className="space-y-3">
          {job.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold mt-0.5">
                ✓
              </span>
              <span className="text-gray-700 flex-1">{req}</span>
            </li>
          ))}
        </ul>

        {job.niceToHave && job.niceToHave.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
              Nice to Have
            </h3>
            <ul className="space-y-3">
              {job.niceToHave.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold mt-0.5">
                    +
                  </span>
                  <span className="text-gray-700 flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      {/* Tech Stack */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {job.techStack.map(tech => (
            <Badge key={tech} variant="outline" className="text-base px-4 py-2">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  )
}
