import React, { useEffect } from "react"
import { useState } from "react"
import { Language } from "../../../types/types"
import { mockData } from "../../../data/mockData"
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

const useSummarizer = () => {
  const [data, setData] = useState<{ summary: typeof mockData }>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setData({ summary: mockData })
    }, 2000)
  }, [])

  return { data, isLoading }
}

const SummarizerDialogContent = () => {
  const { data, isLoading } = useSummarizer()
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Language.HU,
  )
  const { summary = null} = data || {}

  const currentContent = summary?.content_by_language[selectedLanguage]

  if (isLoading || !currentContent) {
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
          timeAndRoi={summary.metrics_and_evaluation["4_time_and_roi_metrics"]}
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
            summary.metrics_and_evaluation["3_content_value_distribution_percent"]
          }
        />
        <NoveltyAndCognitiveLoad
          novelty={summary.metrics_and_evaluation["5_novelty_and_redundancy"]}
          cognitiveLoad={summary.metrics_and_evaluation["8_cognitive_load"]}
        />
        <ActionCommitment
          actionCommitment={
            summary.metrics_and_evaluation["6_action_and_commitment"]
          }
        />
        <Assessment
          assessment={summary.metrics_and_evaluation["9_overall_assessment"]}
        />
        <MetaInfo
          assistantName={summary.meta.assistant_name}
          inputLanguage={summary.meta.input_language}
          outputLanguages={summary.meta.output_languages}
        />
      </div>
    </div>
  )
}

export default SummarizerDialogContent
