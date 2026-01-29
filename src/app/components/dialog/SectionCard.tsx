import React, { ReactNode } from "react"
import { IconName } from "../../../types/types"
import LucideIcon from "../LucideIcon"
import { cn } from "../ui/utils"

type Props = {
  title: string
  icon: IconName
  children: ReactNode
  className?: string
}

const SectionCard = ({ title, icon, children, className }: Props) => {
  return (
    <div className={cn('flex flex-col gap-5 p-3 pb-6 bg-card text-card-foreground rounded-xl border', className)}>
      <h4 className="text-xs flex items-center gap-1.5 font-medium">
        <LucideIcon name={icon} className="size-3" />
        {title}
      </h4>
      {children}
    </div>
  )
}

export default SectionCard
