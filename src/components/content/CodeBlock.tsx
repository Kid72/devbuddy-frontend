'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Copy, Check } from 'lucide-react'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  language: string
  inline?: boolean
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language,
  inline = false,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState<string>('')
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    if (!inline && code) {
      codeToHtml(code, {
        lang: language || 'text',
        theme: currentTheme === 'dark' ? 'github-dark' : 'github-light',
      })
        .then(setHtml)
        .catch(() => setHtml(`<pre><code>${code}</code></pre>`))
    }
  }, [code, language, currentTheme, inline])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (inline) {
    return (
      <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 text-[13px] font-mono">
        {code}
      </code>
    )
  }

  if (!html) {
    return (
      <pre className="not-prose bg-[#f6f8fa] dark:bg-[#0d1117] p-4 overflow-x-auto text-[13px] my-4">
        <code>{code}</code>
      </pre>
    )
  }

  return (
    <div className="not-prose relative my-4 group">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 p-1.5 opacity-0 group-hover:opacity-100
                   bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700
                   transition-opacity text-gray-600 dark:text-gray-400 rounded"
        aria-label={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <div
        className="code-block-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
