import React from "react"
import { Badge } from "../ui/badge"
import SectionCard from "./SectionCard"

type Props = {
  actionCommitment: {
    contains_specific_todo: string
    contains_question_to_recipient: string
    contains_deadline_or_urgency: string
  }
}

const ActionCommitment = ({ actionCommitment }: Props) => {
  return (
    <SectionCard title="Action Items" icon="CircleCheck">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span>TODO</span>
          <Badge
            variant={
              actionCommitment.contains_specific_todo === "yes"
                ? "default"
                : "secondary"
            }
            className="text-xs h-4 px-1"
          >
            {actionCommitment.contains_specific_todo}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>Question</span>
          <Badge
            variant={
              actionCommitment.contains_question_to_recipient === "yes"
                ? "default"
                : "secondary"
            }
            className="text-xs h-4 px-1"
          >
            {actionCommitment.contains_question_to_recipient}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>Deadline</span>
          <Badge
            variant={
              actionCommitment.contains_deadline_or_urgency === "yes"
                ? "default"
                : "secondary"
            }
            className="text-xs h-4 px-1"
          >
            {actionCommitment.contains_deadline_or_urgency}
          </Badge>
        </div>
      </div>
    </SectionCard>
  )
}

export default ActionCommitment
