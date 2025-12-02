import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; format: string }> }
) {
  const { id, format } = await params

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

  if (format !== 'pdf' && format !== 'docx') {
    return NextResponse.json({ error: 'Invalid format. Use pdf or docx.' }, { status: 400 })
  }

  // Mock file content (real implementation would fetch from Supabase Storage)
  const content = format === 'pdf'
    ? '%PDF-1.4\n%Mock CV PDF content\n%%EOF'
    : 'Mock DOCX content (would be actual DOCX binary)'

  const contentType = format === 'pdf'
    ? 'application/pdf'
    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

  const filename = `cv-${id}.${format}`

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': content.length.toString(),
    },
  })
}
