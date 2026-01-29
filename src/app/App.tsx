import React from "react";
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { LoadingMessage } from "./components/LoadingMessage";
import { QuickSummary } from "./components/QuickSummary";
import { TermsExplanations } from "./components/TermsExplanations";
import { Takeaway } from "./components/Takeaway";
import { MetricsSection } from "./components/MetricsSection";
import { MetaInfo } from "./components/MetaInfo";
import { TimeAndRoi } from "./components/TimeAndRoi";
import { X } from "lucide-react";
import { data } from "../data/mockData";
import { Language } from "../types/types";
import { cn } from "./components/ui/utils";

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.HU);
  const [isMetaInfoExpanded, setIsMetaInfoExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionButton, setSelectionButton] = useState<{
    show: boolean;
    x: number;
    y: number;
    text: string;
    isForward: boolean;
  }>({ show: false, x: 0, y: 0, text: "", isForward: true });
  const [storedRange, setStoredRange] = useState<Range | null>(null);

  const currentContent = data.content_by_language[selectedLanguage];

  const calculateButtonPosition = (range: Range, isForward: boolean) => {
    let rect;
    if (isForward) {
      const endRange = range.cloneRange();
      endRange.collapse(false);
      rect = endRange.getBoundingClientRect();
    } else {
      const startRange = range.cloneRange();
      startRange.collapse(true);
      rect = startRange.getBoundingClientRect();
    }

    if (rect) {
      const x = isForward ? rect.right : rect.left;
      const y = isForward ? rect.bottom + 5 : rect.top - 35;
      return { x, y };
    }
    return null;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();

        if (text && text.length > 0 && selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          
          const isForward = 
            selection.anchorNode && 
            selection.focusNode &&
            (selection.anchorNode === selection.focusNode 
              ? selection.anchorOffset < selection.focusOffset
              : (selection.anchorNode.compareDocumentPosition(selection.focusNode) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0);
          
          const position = calculateButtonPosition(range, !!isForward);
          
          if (position) {
            setStoredRange(range.cloneRange());
            setSelectionButton({
              show: true,
              x: position.x,
              y: position.y,
              text: text,
              isForward: !!isForward,
            });
          }
        } else {
          setSelectionButton({ show: false, x: 0, y: 0, text: "", isForward: true });
          setStoredRange(null);
        }
      }, 10);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-summarize-button]')) {
        return;
      }

      setSelectionButton({ show: false, x: 0, y: 0, text: "", isForward: true });
      setStoredRange(null);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);


  useEffect(() => {
    if (!selectionButton.show || !storedRange) return;

    const updatePosition = () => {
      try {
        const position = calculateButtonPosition(storedRange, selectionButton.isForward);
        if (position) {
          setSelectionButton(prev => ({
            ...prev,
            x: position.x,
            y: position.y,
          }));
        }
      } catch (e) {
        setSelectionButton({ show: false, x: 0, y: 0, text: "", isForward: true });
        setStoredRange(null);
      }
    };

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [selectionButton.show, storedRange, selectionButton.isForward]);

  const handleSummarize = () => {
    setIsOpen(true);
    setIsLoading(true);

    setSelectionButton({ show: false, x: 0, y: 0, text: "", isForward: true });
    setStoredRange(null);

    window.getSelection()?.removeAllRanges();
    
    // Simulate loading for 10 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  return (
    <>
      {selectionButton.show && (
        <button
          onClick={handleSummarize}
          onMouseDown={e => {
            e.stopPropagation();
          }}
          className="fixed px-3 py-1.5 bg-foreground text-background rounded-md shadow-lg hover:opacity-90 transition-opacity font-medium text-xs z-50"
          style={{
            left: selectionButton.isForward ? `${selectionButton.x}px` : `${selectionButton.x}px`,
            top: `${selectionButton.y}px`,
            transform: selectionButton.isForward ? 'translateX(-100%)' : 'none',
          }}
          data-summarize-button
        >
          Summarize
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className={cn('w-full max-w-2xl h-[90dvh] bg-background rounded-lg shadow-xl border relative overflow-y-auto',
              isLoading && 'overflow-hidden')}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <LoadingMessage />
              </div>
            )}
            <div className="px-3 py-2 border-b bg-card sticky top-0 z-10 flex items-center justify-between">
              <div>
                <h1 className="font-semibold text-sm">Text Analysis</h1>
                <p className="text-xs text-muted-foreground">Detailed content breakdown</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-md transition-colors"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            {!isLoading && (
              <div className="px-3 pt-3 pb-2">
                <TimeAndRoi timeAndRoi={data.metrics_and_evaluation["4_time_and_roi_metrics"]} />
              </div>
            )}

            {!isLoading && (
              <div className="px-3 py-3 border-b">
                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                  <button
                    onClick={() => setSelectedLanguage(Language.EN)}
                    className={cn('flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                      selectedLanguage === Language.EN ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                    English
                  </button>
                  <button
                    onClick={() => setSelectedLanguage(Language.HU)}
                    className={cn('flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                      selectedLanguage === Language.HU ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                    Hungarian
                  </button>
                </div>
              </div>
            )}

            <div className="relative p-3 flex flex-col gap-2 min-h-125">
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <QuickSummary
                    oneSentence={currentContent["1_quick_summary"].one_sentence}
                    threeSentences={currentContent["1_quick_summary"].three_sentences}
                    fiveSentences={currentContent["1_quick_summary"].five_sentences}
                  />
                  <TermsExplanations
                    status={currentContent["2_terms_and_explanations"].status}
                    items={currentContent["2_terms_and_explanations"].items}
                    ifNone={currentContent["2_terms_and_explanations"].if_none}
                  />
                  <Takeaway takeaway={currentContent["10_main_takeaway_message"].takeaway} />
                  <MetricsSection
                    contentValue={data.metrics_and_evaluation["3_content_value_distribution_percent"]}
                    timeAndRoi={data.metrics_and_evaluation["4_time_and_roi_metrics"]}
                    novelty={data.metrics_and_evaluation["5_novelty_and_redundancy"]}
                    actionCommitment={data.metrics_and_evaluation["6_action_and_commitment"]}
                    relevance={data.metrics_and_evaluation["7_relevance_and_goal_fit"]}
                    cognitiveLoad={data.metrics_and_evaluation["8_cognitive_load"]}
                    assessment={data.metrics_and_evaluation["9_overall_assessment"]}
                  />
                  <MetaInfo
                    assistantName={data.meta.assistant_name}
                    inputLanguage={data.meta.input_language}
                    outputLanguages={data.meta.output_languages}
                    isExpanded={isMetaInfoExpanded}
                    onToggle={() => setIsMetaInfoExpanded(!isMetaInfoExpanded)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}