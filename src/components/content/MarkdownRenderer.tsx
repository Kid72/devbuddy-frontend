'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'
import { CodeBlock } from './CodeBlock'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate IDs for headings for table of contents
  useEffect(() => {
    if (!mounted) return

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading) => {
      if (!heading.id) {
        const text = heading.textContent || ''
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
        heading.id = id
      }
    })
  }, [mounted, content])

  if (!mounted) {
    return null
  }

  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { node, inline, className, children, ...rest } = props as any
            const match = /language-(\w+)/.exec(className || '')
            const codeContent = String(children).replace(/\n$/, '')

            return !inline && match ? (
              <CodeBlock
                code={codeContent}
                language={match[1]}
                inline={false}
              />
            ) : (
              <code
                className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono"
                {...rest}
              >
                {children}
              </code>
            )
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  {children}
                </table>
              </div>
            )
          },
          th({ children }) {
            return (
              <th className="px-4 py-3 text-left text-sm font-semibold bg-gray-50 dark:bg-gray-800">
                {children}
              </th>
            )
          },
          td({ children }) {
            return (
              <td className="px-4 py-3 text-sm border-t border-gray-200 dark:border-gray-700">
                {children}
              </td>
            )
          },
          h1({ children }) {
            return (
              <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
                {children}
              </h1>
            )
          },
          h2({ children }) {
            return (
              <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100">
                {children}
              </h2>
            )
          },
          h3({ children }) {
            return (
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">
                {children}
              </h3>
            )
          },
          ul({ children }) {
            return <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
          },
          li({ children }) {
            return <li className="text-gray-700 dark:text-gray-300">{children}</li>
          },
          p({ children }) {
            return <p className="text-gray-700 dark:text-gray-300 leading-relaxed my-4">{children}</p>
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic bg-blue-50 dark:bg-blue-900/20">
                {children}
              </blockquote>
            )
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
