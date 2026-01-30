import React from "react"
import { useState, useEffect } from "react"
import { cn } from "./ui/utils"

const defaultButtonValues = {
  show: false,
  x: 0,
  y: 0,
  text: "",
  isForward: true,
}

type Props = {
  onSummarize: (storedRange: Range) => void
}

const SummarizeButton = ({ onSummarize }: Props) => {
  const [storedRange, setStoredRange] = useState<Range | null>(null)
  const [selectionButton, setSelectionButton] = useState<{
    show: boolean
    x: number
    y: number
    text: string
    isForward: boolean
  }>(defaultButtonValues)

  const calculateButtonPosition = (range: Range, isForward: boolean) => {
    let rect
    if (isForward) {
      const endRange = range.cloneRange()
      endRange.collapse(false)
      rect = endRange.getBoundingClientRect()
    } else {
      const startRange = range.cloneRange()
      startRange.collapse(true)
      rect = startRange.getBoundingClientRect()
    }

    if (rect) {
      const x = isForward ? rect.right : rect.left
      const y = isForward ? rect.bottom + 5 : rect.top - 35
      return { x, y }
    }
    return null
  }

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const selection = window.getSelection()
        const text = selection?.toString().trim()

        if (text && text.length > 0 && selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)

          const isForward =
            selection.anchorNode &&
            selection.focusNode &&
            (selection.anchorNode === selection.focusNode
              ? selection.anchorOffset < selection.focusOffset
              : (selection.anchorNode.compareDocumentPosition(
                  selection.focusNode,
                ) &
                  Node.DOCUMENT_POSITION_FOLLOWING) !==
                0)

          const position = calculateButtonPosition(range, !!isForward)

          if (position) {
            setStoredRange(range.cloneRange())
            setSelectionButton({
              show: true,
              x: position.x,
              y: position.y,
              text: text,
              isForward: !!isForward,
            })
          }
        } else {
          setSelectionButton(defaultButtonValues)
        }
      }, 10)
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("[data-summarize-button]")) {
        return
      }

      setSelectionButton(defaultButtonValues)
    }

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  useEffect(() => {
    if (!selectionButton.show || !storedRange) return

    const updatePosition = () => {
      try {
        const position = calculateButtonPosition(
          storedRange,
          selectionButton.isForward,
        )
        if (position) {
          setSelectionButton((prev) => ({
            ...prev,
            x: position.x,
            y: position.y,
          }))
        }
      } catch {
        setSelectionButton(defaultButtonValues)
      }
    }

    window.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [selectionButton.show, storedRange, selectionButton.isForward])

  const handleSummarize = () => {
    if (!storedRange) return
    setSelectionButton(defaultButtonValues)
    onSummarize(storedRange)

    window.getSelection()?.removeAllRanges()
  }

  if (!selectionButton.show) return null

  return (
    <button
      onClick={handleSummarize}
      onMouseDown={(e) => {
        e.stopPropagation()
      }}
      className={cn(
        "summarize fixed px-3 py-1.5 bg-foreground text-background rounded-md shadow-lg hover:opacity-90 transition-opacity font-medium text-xs z-50",
        selectionButton.isForward && "-translate-x-full",
      )}
      style={{
        left: selectionButton.isForward
          ? `${selectionButton.x}px`
          : `${selectionButton.x}px`,
        top: `${selectionButton.y}px`,
      }}
      data-summarize-button
    >
      Summarize
    </button>
  )
}

export default SummarizeButton
