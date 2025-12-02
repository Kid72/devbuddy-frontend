'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  loaded: number
  total: number
  className?: string
}

export function ScrollProgress({ loaded, total, className }: ScrollProgressProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 200px
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible || total === 0) return null

  const percentage = Math.round((loaded / total) * 100)

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
        'px-4 py-2.5 rounded-full',
        'bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg',
        'transition-all duration-300 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Progress bar */}
        <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Text */}
        <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
          {loaded} of {total}
        </span>
      </div>
    </div>
  )
}
