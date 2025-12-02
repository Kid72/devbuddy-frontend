import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
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

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file type
  const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!validTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Only PDF and DOCX allowed.' }, { status: 400 })
  }

  // Validate file size (10MB max)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 })
  }

  // Mock successful upload (real implementation would save to Supabase Storage)
  const cvId = 'cv-' + Date.now() + '-' + Math.random().toString(36).substring(7)

  return NextResponse.json({
    success: true,
    message: 'CV uploaded successfully',
    cv: {
      id: cvId,
      filename: file.name,
      size: file.size,
      type: file.type,
      status: 'processed',
      uploadedAt: new Date().toISOString(),
      userId: user.id,
    },
  })
}
