'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

interface LoginButtonProps {
  provider: 'google' | 'github'
  redirectTo?: string
}

export function LoginButton({ provider, redirectTo }: LoginButtonProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error('Login error:', error.message)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      setLoading(false)
    }
  }

  const Icon = provider === 'google' ? Icons.google : Icons.gitHub

  return (
    <Button
      onClick={handleLogin}
      disabled={loading}
      variant="outline"
      className="w-full"
    >
      {loading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon className="mr-2 h-4 w-4" />
      )}
      Continue with {provider === 'google' ? 'Google' : 'GitHub'}
    </Button>
  )
}
