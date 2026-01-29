import React, { useEffect } from "react"
import { useState } from "react"
import { Language } from "../../../types/types"
import { data } from "../../../data/mockData"
import QuickSummary from "./QuickSummary"
import TermsExplanations from "./TermsExplanations"
import Takeaway from "./Takeaway"
import MetaInfo from "./MetaInfo"
import TimeAndRoi from "./TimeAndRoi"
import ContentValueDistribution from "./ContentValueDistribution"
import NoveltyAndCognitiveLoad from "./NoveltyAndCognitiveLoad"
import ActionCommitment from "./ActionCommitment"
import Assessment from "./Assessment"
import LoadingSkeleton from "./LoadingSkeleton"
import LoadingMessage from "./LoadingMessage"
import LanguageSelector from "./LanguageSelector"


const SummarizerDialogContent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Language.HU,
  )

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const currentContent = data.content_by_language[selectedLanguage]

  if (isLoading) {
    return (
      <div className="p-3 overflow-hidden mb-3">
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <LoadingMessage />
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div className="overflow-y-auto mb-3">
      <div className="flex flex-col gap-5 p-3 border-b">
        <TimeAndRoi
          timeAndRoi={data.metrics_and_evaluation["4_time_and_roi_metrics"]}
        />
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>

      <div className="relative p-3 flex flex-col gap-2 min-h-125">
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
        <Takeaway
          takeaway={currentContent["10_main_takeaway_message"].takeaway}
        />
        <ContentValueDistribution
          contentValue={
            data.metrics_and_evaluation["3_content_value_distribution_percent"]
          }
        />
        <NoveltyAndCognitiveLoad
          novelty={data.metrics_and_evaluation["5_novelty_and_redundancy"]}
          cognitiveLoad={data.metrics_and_evaluation["8_cognitive_load"]}
        />
        <ActionCommitment 
          actionCommitment={
            data.metrics_and_evaluation["6_action_and_commitment"]
          }
        />
        <Assessment
          assessment={data.metrics_and_evaluation["9_overall_assessment"]}
        />
        <MetaInfo
          assistantName={data.meta.assistant_name}
          inputLanguage={data.meta.input_language}
          outputLanguages={data.meta.output_languages}
        />
      </div>
    </div>
  )
}

export default SummarizerDialogContent
