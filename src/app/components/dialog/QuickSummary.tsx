import React, { useState } from "react";
import SectionCard from "./SectionCard";

type Props = {
  oneSentence: string[];
  threeSentences: string[];
  fiveSentences: string[];
}

const QuickSummary = ({ oneSentence, threeSentences, fiveSentences }: Props) => {
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
    const sentenceCount = value === 0 ? 1 : value === 1 ? 3 : 5;
    setSelectedView(sentenceCount);
  };

  const getSliderPosition = () => {
    return selectedView === 1 ? 0 : selectedView === 3 ? 1 : 2;
  };

  return (
    <SectionCard title="Quick Summary" icon="FileText">
      <div>
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
      <div className="flex flex-col gap-1.5">
        {renderContent()}
      </div>

    </SectionCard>
  );
}

export default QuickSummary