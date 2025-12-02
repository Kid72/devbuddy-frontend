'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

interface HintButtonProps {
  hints: string[]
}

export function HintButton({ hints }: HintButtonProps) {
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)

  if (!hints || hints.length === 0) {
    return null
  }

  const showNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1)
    }
  }

  const resetHints = () => {
    setCurrentHintIndex(-1)
  }

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Hints
        </h3>
        {currentHintIndex >= 0 && (
          <Button
            onClick={resetHints}
            variant="ghost"
            size="sm"
          >
            Reset Hints
          </Button>
        )}
      </div>

      {currentHintIndex === -1 ? (
        <Card className="p-6 text-center bg-yellow-50 border-yellow-200">
          <p className="text-gray-700 mb-4">
            Need some help? Get hints one at a time.
          </p>
          <Button
            onClick={showNextHint}
            variant="outline"
            className="gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            Show First Hint
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {hints.slice(0, currentHintIndex + 1).map((hint, index) => (
            <Card
              key={index}
              className="p-4 bg-yellow-50 border-yellow-200 animate-in fade-in-50 duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="flex-1 text-gray-700">{hint}</p>
              </div>
            </Card>
          ))}
          {currentHintIndex < hints.length - 1 && (
            <Button
              onClick={showNextHint}
              variant="outline"
              className="w-full gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Show Next Hint ({currentHintIndex + 1}/{hints.length})
            </Button>
          )}
          {currentHintIndex === hints.length - 1 && (
            <p className="text-center text-sm text-gray-500">
              All hints revealed!
            </p>
          )}
        </div>
      )}
    </div>
  )
}
