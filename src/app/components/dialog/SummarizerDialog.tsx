import React from "react"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"
import SummarizerDialogContent from "./SummarizerDialogContent"

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

// Todo: Nem érte meg Dialog extra package-e nincs animáció, szedd ki ;)
// *Ekcsöli, nézd meg majd speedet és kb consumptiont, mert amúgy könnyít
const SummarizerDialog = ({ isOpen, onOpenChange }: Props) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="summarizer w-full max-w-2xl h-[90dvh] rounded-lg shadow-xl p-0 gap-0 overflow-hidden">
      <DialogHeader className="bg-background p-3 gap-0 border-b">
        <DialogTitle className="font-semibold text-sm">
          Text Analysis
        </DialogTitle>
        <DialogDescription className="text-xs text-muted-foreground">
          Detailed content breakdown
        </DialogDescription>
      </DialogHeader>
      <SummarizerDialogContent />
    </DialogContent>
  </Dialog>
)

export default SummarizerDialog
