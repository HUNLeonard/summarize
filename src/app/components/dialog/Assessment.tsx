import React from "react"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import SectionCard from "./SectionCard"
import { getLevelBadgeVariant } from "../../../lib/helpers"

type Props = {
  assessment: {
    reading_priority: string
    skippability_estimate_percent: number
    one_sentence_recommendation: string
  }
}

const Assessment = ({ assessment }: Props) => {
  return (
    <SectionCard title="Assessment" icon="CircleAlert">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs">Priority</span>
          <Badge
            variant={getLevelBadgeVariant(assessment.reading_priority)}
            className="text-xs h-4 px-1"
          >
            {assessment.reading_priority}
          </Badge>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-xs">
            <span>Skippability</span>
            <span className="font-medium text-xs">
              {assessment.skippability_estimate_percent}%
            </span>
          </div>
          <Progress
            value={assessment.skippability_estimate_percent}
            className="h-1"
          />
        </div>
        <div className="p-2 bg-muted/50 rounded">
          <p className="text-xs leading-relaxed">
            {assessment.one_sentence_recommendation}
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

export default Assessment
