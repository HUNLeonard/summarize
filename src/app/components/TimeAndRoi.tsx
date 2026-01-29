import React from 'react'
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock } from "lucide-react";

interface TimeAndRoiProps {
  timeAndRoi: {
    estimated_reading_time_minutes: number;
    content_density: string;
    expected_usefulness: string;
  };
}

export function TimeAndRoi({ timeAndRoi }: TimeAndRoiProps) {
  const getLevelBadgeVariant = (level: string): "default" | "secondary" | "outline" => {
    switch (level) {
      case "high":
        return "default";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <div className="p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-bold">{timeAndRoi.estimated_reading_time_minutes}</span>
            <span className="text-xs text-muted-foreground">min</span>
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Density:</span>
            <Badge variant={getLevelBadgeVariant(timeAndRoi.content_density)} className="text-xs h-4 px-1.5">
              {timeAndRoi.content_density}
            </Badge>
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Useful:</span>
            <Badge variant={getLevelBadgeVariant(timeAndRoi.expected_usefulness)} className="text-xs h-4 px-1.5">
              {timeAndRoi.expected_usefulness}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}