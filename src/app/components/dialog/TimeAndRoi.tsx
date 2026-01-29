import React from 'react'
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";

type Props = {
  timeAndRoi: {
    estimated_reading_time_minutes: number;
    content_density: string;
    expected_usefulness: string;
  };
}

const TimeAndRoi = ({ timeAndRoi }: Props) => {
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
    <div className="flex items-center gap-3 p-3 bg-card text-card-foreground rounded-xl border">
      <div className="flex items-center gap-1.5">
        <Clock className="size-3 text-muted-foreground" />
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
  );
}

export default TimeAndRoi
