'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [jobAlerts, setJobAlerts] = useState(true)
  const [newsDigest, setNewsDigest] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Load settings from user metadata
  useEffect(() => {
    if (user?.user_metadata) {
      setEmailNotifications(user.user_metadata.email_notifications ?? true)
      setJobAlerts(user.user_metadata.job_alerts ?? true)
      setNewsDigest(user.user_metadata.news_digest ?? false)
    }
  }, [user])

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

  const handleSaveSettings = async () => {
    setSaving(true)
    setSaveSuccess(false)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        data: {
          email_notifications: emailNotifications,
          job_alerts: jobAlerts,
          news_digest: newsDigest,
        }
      })

      if (error) throw error
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to save settings:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {/* Notifications Settings */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-base font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-600">
                  Receive email updates about your account activity
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="job-alerts" className="text-base font-medium">
                  Job Alerts
                </Label>
                <p className="text-sm text-gray-600">
                  Get notified about new job opportunities
                </p>
              </div>
              <Switch
                id="job-alerts"
                checked={jobAlerts}
                onCheckedChange={setJobAlerts}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="news-digest" className="text-base font-medium">
                  Weekly News Digest
                </Label>
                <p className="text-sm text-gray-600">
                  Receive a weekly summary of developer news
                </p>
              </div>
              <Switch
                id="news-digest"
                checked={newsDigest}
                onCheckedChange={setNewsDigest}
              />
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="text-base font-medium">
                  Dark Mode
                </Label>
                <p className="text-sm text-gray-600">
                  Enable dark theme for the application
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
          <div className="space-y-4">
            <Button variant="outline" onClick={() => router.push('/profile')}>
              <Icons.user className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>

            <Button variant="outline" onClick={() => console.log('Change password')}>
              <Icons.lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>

            <Separator />

            <div className="pt-4">
              <h3 className="text-sm font-medium text-red-600 mb-2">Danger Zone</h3>
              <Button variant="destructive" onClick={() => console.log('Delete account')}>
                <Icons.trash className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4">
          {saveSuccess && (
            <span className="text-green-600 text-sm flex items-center gap-1">
              <Icons.check className="h-4 w-4" />
              Settings saved successfully
            </span>
          )}
          <Button onClick={handleSaveSettings} size="lg" disabled={saving}>
            {saving ? (
              <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Icons.check className="h-4 w-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  )
}
