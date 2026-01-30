import { Zap } from "lucide-react"
import React from "react"

const HowToUseCard = () => (
  <div className="bg-card border border-border rounded-lg p-4 space-y-3">
    <div className="flex items-start gap-3">
      <div className="mt-0.5 p-2 bg-primary/10 rounded-md">
        <Zap className="size-4 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-foreground">How to use</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Select any text on a webpage and click the Summarize button to get
          detailed analysis.
        </p>
      </div>
    </div>
  </div>
)

export default HowToUseCard
