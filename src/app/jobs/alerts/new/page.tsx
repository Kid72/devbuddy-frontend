'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Bell, Save } from 'lucide-react'

export default function NewJobAlertPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    keywords: '',
    location: '',
    minSalary: ''
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Mock API call - in production, POST to /api/jobs/alerts
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSaved(true)
      setSaving(false)

      // Redirect to alerts page after successful creation
      setTimeout(() => {
        router.push('/jobs/alerts')
      }, 1500)
    } catch (error) {
      console.error('Failed to create alert:', error)
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <ProtectedRoute>
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <Icons.arrowLeft className="mr-2 h-4 w-4" />
            Back to Alerts
          </Button>
          <h1 className="text-4xl font-bold mb-2">Create Job Alert</h1>
          <p className="text-gray-600">Get notified when jobs matching your criteria are posted</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Alert Details
            </CardTitle>
            <CardDescription>
              Specify the job criteria you want to be notified about
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Keywords */}
              <div className="space-y-2">
                <Label htmlFor="keywords">
                  Keywords *
                </Label>
                <Input
                  id="keywords"
                  name="keywords"
                  placeholder="e.g., React Developer, Full Stack Engineer"
                  value={formData.keywords}
                  onChange={(e) => handleChange('keywords', e.target.value)}
                  required
                  data-testid="keywords-input"
                />
                <p className="text-sm text-gray-500">
                  Enter job titles, skills, or keywords you're looking for
                </p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location *
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Remote, San Francisco, New York"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                  data-testid="location-input"
                />
                <p className="text-sm text-gray-500">
                  Specify city, state, or "Remote" for remote positions
                </p>
              </div>

              {/* Minimum Salary */}
              <div className="space-y-2">
                <Label htmlFor="minSalary">
                  Minimum Salary (optional)
                </Label>
                <Input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  placeholder="e.g., 80000"
                  value={formData.minSalary}
                  onChange={(e) => handleChange('minSalary', e.target.value)}
                  min="0"
                  step="1000"
                  data-testid="salary-input"
                />
                <p className="text-sm text-gray-500">
                  Only show jobs with salary above this amount
                </p>
              </div>

              {/* Success Message */}
              {saved && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                  ✅ Alert created successfully! Redirecting...
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={saving || saved || !formData.keywords || !formData.location}
                  className="flex-1"
                  data-testid="save-alert-button"
                >
                  {saving ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : saved ? (
                    <>
                      <Icons.check className="mr-2 h-4 w-4" />
                      Created
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Alert
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={saving || saved}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mt-6 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-base">💡 Tips for Better Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Use specific keywords to get more relevant matches</p>
            <p>• You can create multiple alerts with different criteria</p>
            <p>• Set realistic salary expectations based on market rates</p>
            <p>• Remote positions are becoming more common - don't limit yourself!</p>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
