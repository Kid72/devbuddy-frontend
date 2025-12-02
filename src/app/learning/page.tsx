'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LearningPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the actual learn page
    router.replace('/learn')
  }, [router])

  return null
}
