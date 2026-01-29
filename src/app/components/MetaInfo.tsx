import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Bot, Languages, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  assistantName: string;
  inputLanguage: string;
  outputLanguages: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function MetaInfo({ assistantName, inputLanguage, outputLanguages, isExpanded, onToggle }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-3 cursor-pointer" onClick={onToggle}>
        <CardTitle className="text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bot className="h-3 w-3" />
            Analysis Info
          </div>
          {isExpanded ? (
            <ChevronUp className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          )}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-2 px-3 pb-3">
          <div>
            <span className="text-xs text-muted-foreground">Assistant:</span>
            <p className="text-xs font-medium">{assistantName}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Languages className="h-3 w-3 text-muted-foreground" />
            <Badge variant="outline" className="text-xs h-4 px-1">
              {inputLanguage.toUpperCase()}
            </Badge>
            <span className="text-xs text-muted-foreground">→</span>
            {outputLanguages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs h-4 px-1">
                {lang.toUpperCase()}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}