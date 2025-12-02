'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Icons.fileText className="h-8 w-8 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold">My CVs</h2>
              <p className="text-sm text-gray-600">Manage your resumes</p>
            </div>
          </div>
          <Button onClick={() => router.push('/cv')} className="w-full">
            View CVs
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Icons.briefcase className="h-8 w-8 text-green-500" />
            <div>
              <h2 className="text-xl font-semibold">Jobs</h2>
              <p className="text-sm text-gray-600">Browse opportunities</p>
            </div>
          </div>
          <Button onClick={() => router.push('/jobs')} className="w-full">
            View Jobs
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Icons.bookOpen className="h-8 w-8 text-purple-500" />
            <div>
              <h2 className="text-xl font-semibold">Learning</h2>
              <p className="text-sm text-gray-600">Expand your skills</p>
            </div>
          </div>
          <Button onClick={() => router.push('/learn')} className="w-full">
            Start Learning
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Icons.newspaper className="h-8 w-8 text-orange-500" />
            <div>
              <h2 className="text-xl font-semibold">News</h2>
              <p className="text-sm text-gray-600">Stay updated</p>
            </div>
          </div>
          <Button onClick={() => router.push('/news')} className="w-full">
            Read News
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Icons.code className="h-8 w-8 text-red-500" />
            <div>
              <h2 className="text-xl font-semibold">Interview Prep</h2>
              <p className="text-sm text-gray-600">Practice questions</p>
            </div>
          </div>
          <Button onClick={() => router.push('/interview')} className="w-full">
            Practice
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Icons.settings className="h-8 w-8 text-gray-500" />
            <div>
              <h2 className="text-xl font-semibold">Settings</h2>
              <p className="text-sm text-gray-600">Manage preferences</p>
            </div>
          </div>
          <Button onClick={() => router.push('/settings')} className="w-full" variant="outline">
            Settings
          </Button>
        </Card>
      </div>
    </div>
  )
}
