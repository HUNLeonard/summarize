import React from "react"
import ToggleCard from "./ToggleCard"
import HowToUseCard from "./HowToUseCard"
import { Zap } from "lucide-react"

type Props = {
  extensionEnabled: boolean
  onChange: (enabled: boolean) => void
}

const ExtensionPopup = ({ extensionEnabled, onChange }: Props) => {
  return (
    <div className="summarizer w-96 bg-background flex flex-col">
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 shadow-md">
        <div className="flex items-center gap-2 space-y-1">
          <Zap className="size-5 mt-0.5" />
          <h1 className="text-lg font-bold">Summarizer</h1>
        </div>
        <p className="text-xs text-primary-foreground/80">
          Smart text analysis & summarization
        </p>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-4">
        <ToggleCard enabled={extensionEnabled} onChange={onChange} />
        <HowToUseCard />
      </main>

      <footer className="border-t border-border bg-muted/20 p-3 text-center">
        <p className="text-xs text-muted-foreground">
          v1.0.0 • Chrome Extension
        </p>
      </footer>
    </div>
  )
}

export default ExtensionPopup
