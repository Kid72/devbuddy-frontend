'use client'

import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

interface RelatedVideo {
  title: string
  url: string
  channel: string
}

interface VideoEmbedProps {
  videos: RelatedVideo[]
}

export function VideoEmbed({ videos }: VideoEmbedProps) {
  if (!videos || videos.length === 0) {
    return null
  }

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string): string => {
    try {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1]
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
      return url
    } catch {
      return url
    }
  }

  return (
    <div className="mt-8" data-testid="video-section">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Video Explanations</h2>
      <div className="space-y-6">
        {videos.map((video, index) => (
          <Card key={index} className="overflow-hidden" data-testid="video-card">
            <div className="aspect-video bg-gray-100">
              <iframe
                src={getEmbedUrl(video.url)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                data-testid="video-embed"
              />
            </div>
            <div className="p-4 bg-white border-t">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" data-testid="video-title">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600" data-testid="video-channel">{video.channel}</p>
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  data-testid="video-youtube-link"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
