import React, { useState, useEffect, useMemo } from "react"
import { loadingMessages } from "../../../data/loadingMessages"
import { Progress } from "../ui/progress"
import { cn } from "../ui/utils"

const LoadingMessage = () => {
  const shuffledMessages = useMemo(() => {
    const messages = [...loadingMessages]
    for (let i = messages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[messages[i], messages[j]] = [messages[j], messages[i]]
    }
    return messages
  }, [])

  const [messageIndex, setMessageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 100 / (3500 / 50)
      })
    }, 50)

    const messageInterval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % shuffledMessages.length)
        setIsTransitioning(false)
        setProgress(0)
      }, 300)
    }, 3500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [messageIndex, shuffledMessages.length])

  return (
    <div className="bg-background/95 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border flex flex-col gap-2 w-72 overflow-hidden text-center">
      <p
        className={cn(
          "text-sm text-muted-foreground italic opacity-0 transition-opacity duration-300 truncate",
          !isTransitioning && "opacity-100",
        )}
      >
        {shuffledMessages[messageIndex]}...
      </p>
      <Progress value={progress} />
    </div>
  )
}

export default LoadingMessage
