import { FileQuestion, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <FileQuestion className="w-6 h-6 text-gray-600" />
          </div>
          <CardTitle className="text-xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            The page you're looking for doesn't exist. It may have been moved or deleted.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/">
              <Button className="w-full" variant="default">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/learn">
                <Button className="w-full" variant="outline" size="sm">
                  Learn
                </Button>
              </Link>
              <Link href="/jobs">
                <Button className="w-full" variant="outline" size="sm">
                  Jobs
                </Button>
              </Link>
              <Link href="/interview">
                <Button className="w-full" variant="outline" size="sm">
                  Interview
                </Button>
              </Link>
              <Link href="/cv">
                <Button className="w-full" variant="outline" size="sm">
                  CV Tool
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
