import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Target } from "lucide-react";

interface TakeawayProps {
  takeaway: string[];
}

export function Takeaway({ takeaway }: TakeawayProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2 pt-3 px-3">
        <CardTitle className="text-xs flex items-center gap-1.5">
          <Target className="h-3 w-3" />
          Main Takeaway
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div className="space-y-1.5">
          {takeaway.map((message, idx) => (
            <p key={idx} className="text-xs font-medium leading-relaxed">{message}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}