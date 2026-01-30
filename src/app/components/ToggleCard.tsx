import React, { useEffect, useState } from "react"
import { cn } from "./ui/utils"

type Props = {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

const ToggleSwitch = ({ enabled, onChange }: Props) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
    <div className="flex flex-col gap-1 flex-1 pr-3">
      <h3 className="text-sm font-semibold text-foreground">
        Extension Status
      </h3>
      <p className="text-xs text-muted-foreground">
        {enabled
          ? "Extension is active and ready to summarize text."
          : "Extension is disabled"}
      </p>
    </div>

    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
        enabled ? "bg-primary shadow-md" : "bg-muted",
      )}
      aria-pressed={enabled}
      role="switch"
      aria-label="toggle"
    >
      <span
        className={cn(
          "inline-block size-5 transform rounded-full bg-white shadow-lg transition-transform duration-200",
          enabled ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  </div>
)

export default ToggleSwitch
