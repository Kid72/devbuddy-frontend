'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

interface UseInfiniteScrollOptions {
  /** How much of sentinel visible triggers load (0-1) */
  threshold?: number
  /** CSS margin around root */
  rootMargin?: string
  /** Allow disabling when no more data */
  enabled?: boolean
}

interface UseInfiniteScrollReturn {
  sentinelRef: React.RefObject<HTMLDivElement | null>
  isIntersecting: boolean
}

/**
 * Hook for infinite scroll using IntersectionObserver
 *
 * @param onLoadMore - Callback to load more items when sentinel is visible
 * @param options - Configuration options
 * @returns sentinelRef to attach to trigger element
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn {
  const { threshold = 0.1, rootMargin = '200px', enabled = true } = options
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const onLoadMoreRef = useRef(onLoadMore)

  // Keep callback ref updated
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore
  }, [onLoadMore])

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting) {
          onLoadMoreRef.current()
        }
      },
      { threshold, rootMargin }
    )

    const sentinel = sentinelRef.current
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel)
      }
    }
  }, [threshold, rootMargin, enabled])

  return { sentinelRef, isIntersecting }
}
