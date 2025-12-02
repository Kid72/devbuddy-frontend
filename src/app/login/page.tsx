'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { EmailPasswordForm } from '@/components/auth/EmailPasswordForm'
import { useAuth } from '@/components/auth/AuthProvider'
import { Icons } from '@/components/ui/icons'

function LoginContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/cv'

  useEffect(() => {
    if (!loading && user) {
      router.push(redirect)
    }
  }, [user, loading, router, redirect])

  const handleSuccess = () => {
    router.push(redirect)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="container max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to DevHub</h1>
          <p className="text-muted-foreground">
            Sign in to access your CVs, job alerts, and more
          </p>
        </div>

        <EmailPasswordForm
          redirectTo={`${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`}
          onSuccess={handleSuccess}
        />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
