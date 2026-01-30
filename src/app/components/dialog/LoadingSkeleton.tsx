import React from "react";
import { Skeleton } from "../ui/skeleton"

const LoadingSkeleton = () => {
  return (
    <div>
      <div className="flex gap-2 items-center p-3">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="p-3 border-b">
        <div className="flex gap-1 border p-1 rounded-lg">
          <Skeleton className="flex-1 h-8 rounded-md" />
          <Skeleton className="flex-1 h-8 rounded-md" />
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="border rounded-lg p-3 space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="border rounded-lg p-3 space-y-2">
          <Skeleton className="h-5 w-40" />
          <div className="space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-3 space-y-2">
          <Skeleton className="h-5 w-28" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="border rounded-lg p-3 space-y-3">
          <Skeleton className="h-5 w-36" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-8" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-3">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton
