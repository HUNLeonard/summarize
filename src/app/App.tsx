import { useState, useEffect } from "react";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { LoadingMessage } from "./components/LoadingMessage";
import { QuickSummary } from "./components/QuickSummary";
import { TermsExplanations } from "./components/TermsExplanations";
import { Takeaway } from "./components/Takeaway";
import { MetricsSection } from "./components/MetricsSection";
import { MetaInfo } from "./components/MetaInfo";
import { TimeAndRoi } from "./components/TimeAndRoi";
import { X, ChevronUp } from "lucide-react";

// Sample data from the user
const data = {
  "meta": {
    "assistant_name": "Text Master",
    "input_language": "en",
    "output_languages": ["en", "hu"]
  },
  "content_by_language": {
    "en": {
      "1_quick_summary": {
        "one_sentence": ["The text discusses why humans should slow down or hibernate a bit in winter, drawing parallels with animal behavior and suggesting benefits for mental and emotional health."],
        "three_sentences": ["Winter causes biological changes in humans that encourage rest and inward focus, similar to how some animals survive cold seasons by slowing down.", "The text explains how hummingbirds enter a state called torpor to conserve energy overnight and suggests humans could benefit from embracing winter's slower pace.", "It also includes cultural examples like winter reading and traditional food preparation as ways to ritualize slowing down during the season."],
        "five_sentences": ["The article highlights how winter shortens days and triggers bodily responses that encourage rest and conservation of energy.", "It describes hummingbirds' extreme adaptation called torpor, where they lower their body temperature and metabolism to survive cold nights.", "Drawing on neuroscience, the text argues that humans experience hormonal shifts in winter that make them sleepier and more inward-focused, which modern work culture often ignores.", "Slowing down in winter supports brain functions related to memory and emotion and prepares people for spring.", "Examples of slowing down include reading books suited for long winter nights and making traditional Korean desserts as seasonal rituals."]
      },
      "2_terms_and_explanations": {
        "status": "present",
        "items": [
          {
            "term": "torpor",
            "type": "concept",
            "explanation": "A state some animals enter where their body temperature and metabolic rate drop significantly to conserve energy during cold periods.",
            "example": "Hummingbirds enter torpor at night to survive cold temperatures by appearing almost lifeless and using less energy."
          },
          {
            "term": "yuza danji",
            "type": "special_term",
            "explanation": "A traditional Korean dessert that takes several weeks to prepare, mentioned as an example of a winter ritual to slow down.",
            "example": "Yeonjoo Jung makes yuza danji each winter as a way to embrace the season's slower pace."
          }
        ],
        "if_none": "No terms require special explanation."
      },
      "10_main_takeaway_message": {
        "takeaway": ["Humans can benefit from embracing a slower, more restful pace in winter, similar to animals' adaptations, to support mental and emotional health."]
      }
    },
    "hu": {
      "1_quick_summary": {
        "one_sentence": ["A szöveg arról szól, hogy az emberek miért és hogyan érdemes télen lassítani vagy részben hibernálni, párhuzamot vonva az állatok viselkedésével és kiemelve az előnyöket a mentális és érzelmi egészség szempontjából."],
        "three_sentences": ["A tél biológiai változásokat idéz elő az emberekben, amelyek pihenésre és befelé fordulásra ösztönöznek, hasonlóan ahhoz, ahogyan egyes állatok a hideg évszakokat túlélés érdekében lassulnak.", "A szöveg elmagyarázza, hogy a kolibrik hogyan lépnek be egy torpor nevű állapotba, hogy energiát takarítsanak meg jszakánként, és azt javasolja, hogy az emberek is hasznosnak talának a tél lassabb ritmusának elfogadását.", "Kulturális példákat is bemutat, mint a téli olvasás és a hagyományos ételek készítése, amelyek a lassulás rituáléivá válhatnak az évszakban."],
        "five_sentences": ["A cikk kiemeli, hogy a tél lerövidíti a nappalokat és testi reakciókat vált ki, amelyek a pihenést és az energia megtakarítását ösztönzik.", "Bemutatja a kolibrik szélsőséges alkalmazkodását, a torport, amikor testhőmérsékletüket és anyagcseréjüket jelentősen lecsökkentik a hideg éjszakák túléléséhez.", "Az idegtudományra támaszkodva a szöveg azt állítja, hogy az emberek hormonális változásokon mennek keresztül télen, amelyek álmossá és befelé fordulóvá teszik őket, amit a modern munkakultúra gyakran figyelmen kívül hagy.", "A lassítás támogatja az agy memóriával és érzelmekkel kapcsolatos működését, és felkészíti az embereket a tavaszra.", "A lassulás példái közé tartozik a hosszú téli estékhez illő könyvek olvasása és a hagyományos koreai desszert, a yuza danji készítése, mint szezonális rituálé."]
      },
      "2_terms_and_explanations": {
        "status": "present",
        "items": [
          {
            "term": "torpor",
            "type": "concept",
            "explanation": "Olyan állapot, amelybe egyes állatok lépnek, amikor testhőmérsékletük és anyagcseréjük jelentősen lecsökken, hogy energiát takarítsanak meg a hideg időszakok alatt.",
            "example": "A kolibrik torpor állapotba lépnek éjszakánként, hogy túléljék a hideg hőmérsékletet, szinte élettelennek tűnve és kevesebb energiát használva."
          },
          {
            "term": "yuza danji",
            "type": "special_term",
            "explanation": "Hagyományos koreai desszert, amelynek elkészítése több hetet vesz igénybe, és a téli lassulás rituáléjaként említik.",
            "example": "Yeonjoo Jung minden télen elkészíti a yuza danjit, hogy átélje az évszak lassabb ritmusát."
          }
        ],
        "if_none": "Nincs olyan kifejezés, amely külön magyarázatot igényelne."
      },
      "10_main_takeaway_message": {
        "takeaway": ["Az embereknek előnyükre válhat, ha télen elfogadják a lassabb, pihentetőbb ritmust, hasonlóan az állatok alkalmazkodásához, hogy támogassák mentális és érzelmi egészségüket."]
      }
    }
  },
  "metrics_and_evaluation": {
    "3_content_value_distribution_percent": {
      "informational": 50,
      "educational": 30,
      "action_oriented": 10,
      "strategic": 5,
      "social_relational": 5,
      "entertaining": 0,
      "noise_empty": 0
    },
    "4_time_and_roi_metrics": {
      "estimated_reading_time_minutes": 3,
      "content_density": "medium",
      "expected_usefulness": "medium"
    },
    "5_novelty_and_redundancy": {
      "novelty_level": "medium",
      "redundancy_level": "low"
    },
    "6_action_and_commitment": {
      "contains_specific_todo": "no",
      "contains_question_to_recipient": "no",
      "contains_deadline_or_urgency": "no"
    },
    "7_relevance_and_goal_fit": {
      "directly_addressed_to_recipient": "no",
      "assumed_relevance": "medium"
    },
    "8_cognitive_load": {
      "text_complexity": "medium",
      "mental_load": "low"
    },
    "9_overall_assessment": {
      "reading_priority": "medium",
      "skippability_estimate_percent": 40,
      "one_sentence_recommendation": "This text is a moderately useful and informative read about the benefits of slowing down in winter."
    }
  }
};

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "hu">("hu");
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

  const currentContent = data.content_by_language[selectedLanguage];

  // Handle text selection
  useEffect(() => {
    const handleMouseUp = () => {
      // Small delay to ensure selection is complete
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();

        if (text && text.length > 0 && selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          
          // Detect if selection is forward (left-to-right, top-to-bottom)
          const isForward = 
            selection.anchorNode && 
            selection.focusNode &&
            (selection.anchorNode === selection.focusNode 
              ? selection.anchorOffset < selection.focusOffset
              : (selection.anchorNode.compareDocumentPosition(selection.focusNode) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0);
          
          let rect;
          if (isForward) {
            // Forward selection: show below the last character
            const endRange = range.cloneRange();
            endRange.collapse(false); // Collapse to end
            rect = endRange.getBoundingClientRect();
          } else {
            // Backward selection (default): show above the first character
            const startRange = range.cloneRange();
            startRange.collapse(true); // Collapse to start
            rect = startRange.getBoundingClientRect();
          }

          if (rect) {
            const x = rect.left;
            const y = isForward ? rect.bottom + 5 : rect.top - 35;

            setSelectionButton({
              show: true,
              x: x,
              y: y,
              text: text,
              isForward: !!isForward,
            });
          }
        } else {
          setSelectionButton({ show: false, x: 0, y: 0, text: "", isForward: true });
        }
      }, 10);
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Don't hide button if clicking on the button itself
      const target = e.target as HTMLElement;
      if (target.closest('[data-summarize-button]')) {
        return;
      }
      // Hide button when user starts a new selection
      setSelectionButton({ show: false, x: 0, y: 0, text: "", isForward: true });
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleSummarize = () => {
    setIsOpen(true);
    setIsLoading(true);
    setSelectionButton({ show: false, x: 0, y: 0, text: "", isForward: true });
    // Clear the selection
    window.getSelection()?.removeAllRanges();
    
    // Simulate loading for 10 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    setIsLoading(true);
    
    // Simulate loading for 10 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  return (
    <>
      {/* Page Content */}
      <div className="min-h-screen bg-background p-8 max-w-4xl mx-auto">
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold mb-4">Why Humans Should Hibernate a Bit in Winter</h1>
          <p className="text-muted-foreground mb-6">
            An exploration of seasonal rhythms and the benefits of slowing down
          </p>
          
          <p className="mb-4">
            Winter causes biological changes in humans that encourage rest and inward focus, similar to how some animals survive cold seasons by slowing down. The shortened days and colder temperatures trigger hormonal shifts that make us naturally want to conserve energy and turn inward.
          </p>
          
          <p className="mb-4">
            Consider the hummingbird, one of nature's most fascinating examples of energy management. These tiny birds enter a state called torpor at night to conserve energy, lowering their body temperature and metabolism to survive cold periods. They appear almost lifeless, using minimal energy until morning arrives.
          </p>
          
          <p className="mb-4">
            Drawing on neuroscience, research shows that humans experience similar hormonal shifts in winter that make us sleepier and more inward-focused. Modern work culture often ignores these natural rhythms, expecting the same productivity year-round. However, slowing down in winter supports brain functions related to memory and emotion, preparing us for the renewal of spring.
          </p>
          
          <p className="mb-4">
            Cultural traditions have long recognized the value of winter slowness. Winter reading, gathering by the fire, and traditional food preparation serve as rituals that honor the season's pace. Yeonjoo Jung, for example, makes yuza danji each winter—a traditional Korean dessert that takes several weeks to prepare—as a way to embrace the season's slower rhythm.
          </p>
          
          <p className="mb-4">
            Perhaps it's time we learn from both nature and tradition, allowing ourselves to hibernate just a bit during winter months. The benefits for mental and emotional health could be profound.
          </p>
        </article>
        
        {/* Open Modal Button */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-foreground text-background rounded-lg shadow-lg hover:opacity-90 transition-opacity font-medium text-sm"
          >
            Open Text Analysis
          </button>
        </div>
      </div>

      {/* Text Selection Summarize Button */}
      {selectionButton.show && (
        <button
          onClick={handleSummarize}
          className="fixed px-3 py-1.5 bg-foreground text-background rounded-md shadow-lg hover:opacity-90 transition-opacity font-medium text-xs z-50"
          style={{
            left: `${selectionButton.x}px`,
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
            className={`w-full max-w-2xl h-[90vh] bg-background rounded-lg shadow-xl border relative ${
              isLoading ? 'overflow-hidden' : 'overflow-y-auto'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading Message - Centered over entire modal */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <LoadingMessage />
              </div>
            )}

            {/* Header */}
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

            {/* Time & ROI - at the very top, above tabs */}
            {!isLoading && (
              <div className="px-3 pt-3 pb-2">
                <TimeAndRoi timeAndRoi={data.metrics_and_evaluation["4_time_and_roi_metrics"]} />
              </div>
            )}

            {/* Language Tabs */}
            {!isLoading && (
              <div className="px-3 py-3 border-b">
                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                  <button
                    onClick={() => setSelectedLanguage("en")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedLanguage === "en"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setSelectedLanguage("hu")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedLanguage === "hu"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Hungarian
                  </button>
                </div>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="p-3 space-y-2 relative min-h-[500px]">
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  {/* Quick Summary */}
                  <QuickSummary
                    oneSentence={currentContent["1_quick_summary"].one_sentence}
                    threeSentences={currentContent["1_quick_summary"].three_sentences}
                    fiveSentences={currentContent["1_quick_summary"].five_sentences}
                  />

                  {/* Terms & Explanations */}
                  <TermsExplanations
                    status={currentContent["2_terms_and_explanations"].status}
                    items={currentContent["2_terms_and_explanations"].items}
                    ifNone={currentContent["2_terms_and_explanations"].if_none}
                  />

                  {/* Takeaway */}
                  <Takeaway takeaway={currentContent["10_main_takeaway_message"].takeaway} />

                  {/* Metrics - shown once, not language-dependent */}
                  <MetricsSection
                    contentValue={data.metrics_and_evaluation["3_content_value_distribution_percent"]}
                    timeAndRoi={data.metrics_and_evaluation["4_time_and_roi_metrics"]}
                    novelty={data.metrics_and_evaluation["5_novelty_and_redundancy"]}
                    actionCommitment={data.metrics_and_evaluation["6_action_and_commitment"]}
                    relevance={data.metrics_and_evaluation["7_relevance_and_goal_fit"]}
                    cognitiveLoad={data.metrics_and_evaluation["8_cognitive_load"]}
                    assessment={data.metrics_and_evaluation["9_overall_assessment"]}
                  />

                  {/* Meta Info - moved to bottom and collapsible */}
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