import React from "react"
import SectionCard from "./SectionCard"
import { Progress } from "../ui/progress"

type Props = {
  contentValue: {
    informational: number
    educational: number
    action_oriented: number
    strategic: number
    social_relational: number
    entertaining: number
    noise_empty: number
  }
}

const ContentValueDistribution = ({ contentValue }: Props) => {
  return (
    <SectionCard title="Content Value" icon="ChartColumn">
      <div className="flex flex-col gap-2">
        {Object.entries(contentValue).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between text-xs">
              <span className="capitalize text-xs">
                {key.replace(/_/g, " ")}
              </span>
              <span className="font-medium text-xs">{value}%</span>
            </div>
            <Progress value={value} className="h-1" />
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export default ContentValueDistribution
