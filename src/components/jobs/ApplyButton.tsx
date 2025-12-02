'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface ApplyButtonProps {
  applyUrl: string
  source?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export function ApplyButton({
  applyUrl,
  source,
  size = 'lg',
  variant = 'default',
  className,
  showIcon = true,
  children,
}: ApplyButtonProps) {
  const buttonText = children || (source ? `Apply on ${source}` : 'Apply Now')

  return (
    <Button size={size} variant={variant} className={className} asChild>
      <a href={applyUrl} target="_blank" rel="noopener noreferrer">
        {buttonText}
        {showIcon && <ExternalLink className="w-4 h-4 ml-2" />}
      </a>
    </Button>
  )
}
