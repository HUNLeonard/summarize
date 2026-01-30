import React, { useEffect } from "react"
import { useState } from "react"
import { Language, Summary } from "../../../types/types"
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
  const [data, setData] = useState<{ summary: Summary }>()
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
  const { summary = null } = data || {}

  if (isLoading || !summary) {
    return (
      <div className="p-3 overflow-hidden mb-3">
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <LoadingMessage />
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  const { meta } = summary
  const {
    "1_quick_summary": quickSummary,
    "2_terms_and_explanations": termsAndExplanations,
    "10_main_takeaway_message": takeaway,
  } = summary.content_by_language[selectedLanguage]
  const {
    "3_content_value_distribution_percent": contentValue,
    "4_time_and_roi_metrics": timeAndRoi,
    "5_novelty_and_redundancy": novelty,
    "6_action_and_commitment": actionCommitment,
    "7_relevance_and_goal_fit": relevance,
    "8_cognitive_load": cognitiveLoad,
    "9_overall_assessment": assessment,
  } = summary.metrics_and_evaluation[selectedLanguage]

  return (
    <div className="overflow-y-auto mb-3">
      <div className="flex flex-col gap-5 p-3 border-b">
        <TimeAndRoi timeAndRoi={timeAndRoi} />
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <QuickSummary quickSummary={quickSummary} />
        <TermsExplanations termsAndExplanations={termsAndExplanations} />
        <Takeaway takeaway={takeaway} />
        <ContentValueDistribution contentValue={contentValue} />
        <NoveltyAndCognitiveLoad
          novelty={novelty}
          cognitiveLoad={cognitiveLoad}
        />
        <ActionCommitment actionCommitment={actionCommitment} />
        <Assessment assessment={assessment} />
        <MetaInfo metaInfo={meta} />
      </div>
    </div>
  )
}

export default SummarizerDialogContent
