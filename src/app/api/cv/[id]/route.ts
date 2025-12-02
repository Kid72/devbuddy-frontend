import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: cvId } = await params

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Handle cookie setting if needed
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Mock CV data (real implementation would fetch from database)
  return NextResponse.json({
    id: cvId,
    filename: 'resume.pdf',
    size: 245678,
    type: 'application/pdf',
    status: 'processed',
    uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    userId: user.id,
    content: `
John Doe
Senior Software Engineer

EXPERIENCE
- Software Engineer at Tech Corp (2020-2023)
- Junior Developer at StartupXYZ (2018-2020)

SKILLS
- JavaScript, TypeScript, React, Node.js
- Python, Go, SQL
- AWS, Docker, Kubernetes
    `.trim(),
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params // Consume params for Next.js 16 compatibility

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Handle cookie setting if needed
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Mock deletion (real implementation would delete from database and storage)
  return NextResponse.json({
    success: true,
    message: 'CV deleted successfully',
  })
}
