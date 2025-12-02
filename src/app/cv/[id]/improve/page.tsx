'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react'

interface Improvement {
  id: string
  section: string
  original: string
  suggestion: string
  type: 'enhancement' | 'expansion' | 'correction'
}

export default function CVImprovePage() {
  const router = useRouter()
  const params = useParams()
  const cvId = params.id as string

  const [improvements, setImprovements] = useState<Improvement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set())
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchImprovements()
  }, [cvId])

  const fetchImprovements = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cv/${cvId}/improve`)

      if (!response.ok) {
        throw new Error('Failed to fetch improvements')
      }

      const data = await response.json()
      setImprovements(data.improvements || [])
    } catch (err) {
      setError('Failed to load AI improvements. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = (improvementId: string) => {
    setAcceptedIds(prev => new Set([...prev, improvementId]))
    setRejectedIds(prev => {
      const newSet = new Set(prev)
      newSet.delete(improvementId)
      return newSet
    })
  }

  const handleReject = (improvementId: string) => {
    setRejectedIds(prev => new Set([...prev, improvementId]))
    setAcceptedIds(prev => {
      const newSet = new Set(prev)
      newSet.delete(improvementId)
      return newSet
    })
  }

  const handleApplyChanges = async () => {
    // In a real app, this would save the accepted changes
    router.push(`/cv/${cvId}/review`)
  }

  return (
    <ProtectedRoute>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">AI Improvements</h1>
          <p className="text-gray-600">
            Review and apply AI-generated suggestions to enhance your CV
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Icons.spinner className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg">Analyzing your CV...</span>
          </div>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && improvements.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">
                No improvements suggested. Your CV looks great!
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && improvements.length > 0 && (
          <>
            <div className="space-y-4 mb-8">
              {improvements.map((improvement) => {
                const isAccepted = acceptedIds.has(improvement.id)
                const isRejected = rejectedIds.has(improvement.id)

                return (
                  <Card
                    key={improvement.id}
                    data-testid="suggestion-card"
                    className={
                      isAccepted
                        ? 'border-green-300 bg-green-50'
                        : isRejected
                        ? 'border-gray-200 opacity-50'
                        : ''
                    }
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{improvement.section}</CardTitle>
                        <span className="text-sm text-gray-500 capitalize">
                          {improvement.type}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Original Text */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                          Original
                        </label>
                        <div className="p-3 bg-gray-100 rounded-lg text-sm">
                          {improvement.original}
                        </div>
                      </div>

                      {/* Suggested Text */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                          Suggestion
                        </label>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                          {improvement.suggestion}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        {isAccepted ? (
                          <div className="flex items-center text-green-700 font-medium">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Accepted
                          </div>
                        ) : isRejected ? (
                          <div className="flex items-center text-gray-500 font-medium">
                            <XCircle className="h-5 w-5 mr-2" />
                            Rejected
                          </div>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleAccept(improvement.id)}
                              variant="default"
                              size="sm"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              onClick={() => handleReject(improvement.id)}
                              variant="outline"
                              size="sm"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Apply Changes Button */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/cv/${cvId}/review`)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApplyChanges}
                disabled={acceptedIds.size === 0}
              >
                Apply {acceptedIds.size > 0 && `(${acceptedIds.size})`} Changes
              </Button>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  )
}
