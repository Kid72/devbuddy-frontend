'use client'

import { Network, Binary, Database, Cloud, Server, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

// Devicon class mappings for programming languages
const deviconMap: Record<string, string> = {
  java: 'devicon-java-plain colored',
  javascript: 'devicon-javascript-plain colored',
  typescript: 'devicon-typescript-plain colored',
  python: 'devicon-python-plain colored',
  go: 'devicon-go-plain colored',
  rust: 'devicon-rust-original',
  csharp: 'devicon-csharp-plain colored',
  cpp: 'devicon-cplusplus-plain colored',
  c: 'devicon-c-plain colored',
  ruby: 'devicon-ruby-plain colored',
  php: 'devicon-php-plain colored',
  swift: 'devicon-swift-plain colored',
  kotlin: 'devicon-kotlin-plain colored',
  scala: 'devicon-scala-plain colored',
  react: 'devicon-react-original colored',
  angular: 'devicon-angularjs-plain colored',
  vue: 'devicon-vuejs-plain colored',
  nodejs: 'devicon-nodejs-plain colored',
  docker: 'devicon-docker-plain colored',
  kubernetes: 'devicon-kubernetes-plain colored',
  aws: 'devicon-amazonwebservices-plain-wordmark colored',
  postgresql: 'devicon-postgresql-plain colored',
  mongodb: 'devicon-mongodb-plain colored',
  redis: 'devicon-redis-plain colored',
  graphql: 'devicon-graphql-plain colored',
  git: 'devicon-git-plain colored',
}

// Color mappings for language accents
export const languageColors: Record<string, string> = {
  java: '#E76F00',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  python: '#3776AB',
  go: '#00ADD8',
  rust: '#DEA584',
  csharp: '#512BD4',
  cpp: '#00599C',
  c: '#A8B9CC',
  ruby: '#CC342D',
  php: '#777BB4',
  swift: '#F05138',
  kotlin: '#7F52FF',
  scala: '#DC322F',
  react: '#61DAFB',
  angular: '#DD0031',
  vue: '#4FC08D',
  nodejs: '#339933',
  docker: '#2496ED',
  kubernetes: '#326CE5',
  aws: '#FF9900',
  postgresql: '#4169E1',
  mongodb: '#47A248',
  redis: '#DC382D',
  graphql: '#E10098',
  git: '#F05032',
  'system-design': '#6366F1',
  algorithms: '#8B5CF6',
  'data-structures': '#EC4899',
  databases: '#06B6D4',
  devops: '#22C55E',
}

// Lucide icon mappings for non-language categories
const lucideIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  'system-design': Network,
  algorithms: Binary,
  'data-structures': Cpu,
  databases: Database,
  devops: Cloud,
  backend: Server,
}

interface LanguageLogoProps {
  slug: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showBackground?: boolean
}

// Container sizes
const containerSizes = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

// Devicon font sizes (separate from container)
const deviconSizes = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
}

const lucideSizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
}

export function LanguageLogo({
  slug,
  size = 'md',
  className,
  showBackground = false
}: LanguageLogoProps) {
  const deviconClass = deviconMap[slug]
  const LucideIcon = lucideIconMap[slug]
  const color = languageColors[slug] || '#6B7280'

  const containerClasses = cn(
    'flex items-center justify-center',
    containerSizes[size],
    showBackground && 'rounded-lg',
    className
  )

  // If we have a devicon class, use it
  if (deviconClass) {
    return (
      <div
        className={containerClasses}
        style={showBackground ? { backgroundColor: `${color}15` } : undefined}
      >
        <i className={cn(deviconClass, deviconSizes[size], 'leading-none')} />
      </div>
    )
  }

  // If we have a Lucide icon for this category
  if (LucideIcon) {
    return (
      <div
        className={containerClasses}
        style={showBackground ? { backgroundColor: `${color}15` } : undefined}
      >
        <LucideIcon
          className={lucideSizeClasses[size]}
          style={{ color }}
        />
      </div>
    )
  }

  // Fallback to first letter
  return (
    <div
      className={cn(
        containerClasses,
        'font-bold rounded-lg'
      )}
      style={{
        backgroundColor: `${color}15`,
        color
      }}
    >
      {slug.charAt(0).toUpperCase()}
    </div>
  )
}
