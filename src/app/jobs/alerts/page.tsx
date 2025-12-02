'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Icons } from '@/components/ui/icons'
import { Bell, Plus, Edit, Trash2 } from 'lucide-react'

interface JobAlert {
  id: string
  keywords: string
  location: string
  minSalary?: number
  active: boolean
  createdAt: string
}

export default function JobAlertsPage() {
  const router = useRouter()
  const [alerts, setAlerts] = useState<JobAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call - in production, fetch from /api/jobs/alerts
    setTimeout(() => {
      setAlerts([
        {
          id: '1',
          keywords: 'React Developer',
          location: 'Remote',
          minSalary: 80000,
          active: true,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          keywords: 'Senior Engineer',
          location: 'San Francisco',
          minSalary: 120000,
          active: true,
          createdAt: '2024-01-10'
        }
      ])
      setLoading(false)
    }, 500)
  }, [])

  const handleToggleActive = (id: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    )
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this alert?')) {
      setAlerts(prev => prev.filter(alert => alert.id !== id))
    }
  }

  return (
    <ProtectedRoute>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Job Alerts</h1>
            <p className="text-gray-600">Manage your job notifications and preferences</p>
          </div>
          <Button
            onClick={() => router.push('/jobs/alerts/new')}
            data-testid="create-alert-button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Icons.spinner className="h-8 w-8 animate-spin" />
          </div>
        ) : alerts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No job alerts yet</h3>
              <p className="text-gray-600 mb-4">Create your first alert to get notified about new jobs</p>
              <Button onClick={() => router.push('/jobs/alerts/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Alert
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} data-testid="alert-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-blue-500" />
                        {alert.keywords}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        <span className="inline-flex items-center gap-4">
                          <span>📍 {alert.location}</span>
                          {alert.minSalary && (
                            <span>💰 ${alert.minSalary.toLocaleString()}+</span>
                          )}
                          <span className="text-gray-400">•</span>
                          <span>Created {new Date(alert.createdAt).toLocaleDateString()}</span>
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {alert.active ? 'Active' : 'Paused'}
                        </span>
                        <Switch
                          checked={alert.active}
                          onCheckedChange={() => handleToggleActive(alert.id)}
                          data-testid="alert-toggle"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/jobs/alerts/${alert.id}/edit`)}
                      data-testid="edit-alert-button"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(alert.id)}
                      className="text-red-600 hover:text-red-700"
                      data-testid="delete-alert-button"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Card */}
        <Card className="mt-8 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.info className="h-5 w-5 text-blue-600" />
              How Job Alerts Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✉️ Receive email notifications when new jobs match your criteria</p>
            <p>🎯 Set specific keywords, locations, and salary requirements</p>
            <p>⚡ Get instant alerts or daily digests based on your preference</p>
            <p>🔔 Pause alerts anytime without deleting them</p>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
