'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function InterviewQuestionsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the actual interview page
    router.replace('/interview')
  }, [router])

  return null
}
