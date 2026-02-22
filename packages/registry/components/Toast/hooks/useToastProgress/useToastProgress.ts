import { useEffect, useState } from 'react'
import type { UseToastProgressParams, UseToastProgressReturn } from './type'

export const useToastProgress = ({ duration }: UseToastProgressParams): UseToastProgressReturn => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (duration <= 0) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)
      if (remaining <= 0) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [duration])

  return { progress }
}
