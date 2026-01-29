import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse opacity-40">
      {/* Time & ROI Skeleton */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 bg-muted rounded-md" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>

      {/* Language Tabs Skeleton */}
      <div className="px-3 py-3 border-b">
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <div className="flex-1 h-8 bg-background rounded-md" />
          <div className="flex-1 h-8 bg-muted rounded-md" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3 space-y-2">
        {/* Quick Summary Skeleton */}
        <div className="border rounded-lg p-3 space-y-2">
          <div className="h-5 w-32 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
          </div>
        </div>

        {/* Terms Skeleton */}
        <div className="border rounded-lg p-3 space-y-2">
          <div className="h-5 w-40 bg-muted rounded" />
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-4/5 bg-muted rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-4/5 bg-muted rounded" />
            </div>
          </div>
        </div>

        {/* Takeaway Skeleton */}
        <div className="border rounded-lg p-3 space-y-2">
          <div className="h-5 w-28 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        </div>

        {/* Metrics Skeleton */}
        <div className="border rounded-lg p-3 space-y-3">
          <div className="h-5 w-36 bg-muted rounded" />

          {/* Content Value Distribution */}
          <div className="space-y-2">
            <div className="h-4 w-48 bg-muted rounded" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-3 w-24 bg-muted rounded" />
                  <div className="h-3 w-8 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Other metrics */}
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Meta Info Skeleton */}
        <div className="border rounded-lg p-3">
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton
