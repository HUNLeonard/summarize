import React, { useEffect } from "react"
import { useState } from "react"
import SummarizeButton from "./components/SummarizeButton"
import SummarizerDialog from "./components/dialog/SummarizerDialog"

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SummarizeButton
        onSummarize={() => setIsOpen(true)}
      />
      <SummarizerDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
