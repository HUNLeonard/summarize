import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Lightbulb } from "lucide-react";
import { Term } from "../../types/types";

type Props = {
  status: string;
  items: Term[];
  ifNone: string;
}

export function TermsExplanations({ status, items, ifNone }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-3">
        <CardTitle className="text-xs flex items-center gap-1.5">
          <BookOpen className="h-3 w-3" />
          Terms & Explanations
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        {status === "present" && items.length > 0 ? (
          <div className="space-y-2.5">
            {items.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs">{item.term}</span>
                  <Badge variant="outline" className="text-xs h-4 px-1">
                    {item.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.explanation}</p>
                <div className="flex gap-1.5 items-start bg-muted/50 p-1.5 rounded">
                  <Lightbulb className="h-2.5 w-2.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground italic leading-relaxed">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">{ifNone}</p>
        )}
      </CardContent>
    </Card>
  );
}