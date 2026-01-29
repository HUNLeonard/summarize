import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText } from "lucide-react";

interface QuickSummaryProps {
  oneSentence: string[];
  threeSentences: string[];
  fiveSentences: string[];
}

export function QuickSummary({ oneSentence, threeSentences, fiveSentences }: QuickSummaryProps) {
  const [selectedView, setSelectedView] = useState<number>(1);

  const renderContent = () => {
    switch (selectedView) {
      case 1:
        return oneSentence.map((sentence, idx) => (
          <p key={idx} className="text-xs leading-relaxed">{sentence}</p>
        ));
      case 3:
        return threeSentences.map((sentence, idx) => (
          <p key={idx} className="text-xs leading-relaxed">{sentence}</p>
        ));
      case 5:
        return fiveSentences.map((sentence, idx) => (
          <p key={idx} className="text-xs leading-relaxed">{sentence}</p>
        ));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // Map slider positions 0, 1, 2 to sentence counts 1, 3, 5
    const sentenceCount = value === 0 ? 1 : value === 1 ? 3 : 5;
    setSelectedView(sentenceCount);
  };

  const getSliderPosition = () => {
    return selectedView === 1 ? 0 : selectedView === 3 ? 1 : 2;
  };

  return (
    <Card>
      <CardHeader className="pb-2 pt-3 px-3">
        <CardTitle className="text-xs flex items-center gap-1.5">
          <FileText className="h-3 w-3" />
          Quick Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Sentences: {selectedView}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={getSliderPosition()}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-foreground"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">1</span>
            <span className="text-[10px] text-muted-foreground">3</span>
            <span className="text-[10px] text-muted-foreground">5</span>
          </div>
        </div>
        <div className="space-y-1.5">
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  );
}