import React, { useState, useEffect, useMemo } from "react";
import { loadingMessages } from "../../../data/loadingMessages";

const LoadingMessage = () => {
  const shuffledMessages = useMemo(() => {
    const messages = [...loadingMessages];
    for (let i = messages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [messages[i], messages[j]] = [messages[j], messages[i]];
    }
    return messages;
  }, []);

  const [messageIndex, setMessageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (3500 / 50));
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % shuffledMessages.length);
        setIsTransitioning(false);
        setProgress(0);
      }, 300);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [messageIndex, shuffledMessages.length]);

  return (
    <div className="bg-background/95 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border">
      <p
        className={`text-sm text-muted-foreground italic transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {shuffledMessages[messageIndex]}...
      </p>
      <div className="w-full h-1 bg-muted rounded mt-2">
        <div
          className="h-full bg-primary rounded transition-all duration-50"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default LoadingMessage
