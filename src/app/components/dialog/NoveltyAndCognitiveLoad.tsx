import React from "react"
import { Badge } from "../ui/badge"
import { getLevelBadgeVariant } from "../../../lib/helpers"
import SectionCard from "./SectionCard"

type Props = {
  novelty: {
    novelty_level: string
    redundancy_level: string
  }
  cognitiveLoad: {
    text_complexity: string
    mental_load: string
  }
}

const NoveltyAndCognitiveLoad = ({ novelty, cognitiveLoad }: Props) => {
  return (
    <SectionCard title="Novelty & Load" icon="TrendingUp">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Novelty</p>
          <Badge
            variant={getLevelBadgeVariant(novelty.novelty_level)}
            className="text-xs h-4 px-1"
          >
            {novelty.novelty_level}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Redundancy</p>
          <Badge
            variant={getLevelBadgeVariant(novelty.redundancy_level)}
            className="text-xs h-4 px-1"
          >
            {novelty.redundancy_level}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Complexity</p>
          <Badge
            variant={getLevelBadgeVariant(cognitiveLoad.text_complexity)}
            className="text-xs h-4 px-1"
          >
            {cognitiveLoad.text_complexity}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Mental Load</p>
          <Badge
            variant={getLevelBadgeVariant(cognitiveLoad.mental_load)}
            className="text-xs h-4 px-1"
          >
            {cognitiveLoad.mental_load}
          </Badge>
        </div>
      </div>
    </SectionCard>
  )
}

export default NoveltyAndCognitiveLoad
