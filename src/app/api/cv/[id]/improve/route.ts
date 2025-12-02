import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(
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

  // Mock AI improvements (real implementation would call AI service)
  return NextResponse.json({
    improvements: [
      {
        id: '1',
        section: 'Summary',
        original: 'Experienced software engineer with 5 years of experience.',
        suggestion: 'Results-driven Senior Software Engineer with 5+ years of expertise in full-stack development, leading cross-functional teams to deliver scalable cloud solutions that increased system performance by 40%.',
        type: 'enhancement',
      },
      {
        id: '2',
        section: 'Work Experience',
        original: 'Worked on various projects at Tech Corp.',
        suggestion: 'Spearheaded development of microservices architecture at Tech Corp, reducing deployment time by 60% and improving system reliability to 99.9% uptime.',
        type: 'expansion',
      },
      {
        id: '3',
        section: 'Skills',
        original: 'JavaScript, React, Node.js',
        suggestion: 'JavaScript (ES6+), React (Hooks, Context API, Redux), Node.js (Express, NestJS), TypeScript, Next.js, GraphQL, REST APIs',
        type: 'expansion',
      },
      {
        id: '4',
        section: 'Education',
        original: 'BS in Computer Science',
        suggestion: 'Bachelor of Science in Computer Science - GPA: 3.8/4.0, Dean\'s List (2016-2018)',
        type: 'enhancement',
      },
    ],
  })
}
