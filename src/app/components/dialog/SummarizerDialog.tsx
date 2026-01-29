import React from "react"
import SummarizerDialogContent from "./SummarizerDialogContent"
import { X } from "lucide-react"

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const SummarizerDialog = ({ isOpen, onOpenChange }: Props) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-2xl h-[90dvh] rounded-lg shadow-xl p-0 gap-0 overflow-hidden bg-background fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="bg-background p-3 border-b">
          <h4 className="font-semibold text-sm">Text Analysis</h4>
          <p className="text-xs text-muted-foreground">
            Detailed content breakdown
          </p>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground text-sm flex-1 p-2 bg-transparent hover:bg-muted/40 rounded-md absolute top-4 right-4 cursor-pointer"
          >
            <X className="size-3" />
          </button>
        </header>
        <SummarizerDialogContent />
      </div>
    </div>
  )
}

export default SummarizerDialog
