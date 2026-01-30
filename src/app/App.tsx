import React, { useState, useEffect } from "react"
import SummarizeButton from "./components/SummarizeButton"
import SummarizerDialog from "./components/dialog/SummarizerDialog"
import ExtensionPopup from "./components/ExtensionPopup"

const getExtensionEnabled = () => {
  return chrome.storage.local.get(["extensionEnabled"]).then((result) => {
    return (result.extensionEnabled ?? true) as boolean
  })
}

export default function App() {
  const [isPopupView] = useState(() => {
    const inPopup =
      document.getElementById("root") &&
      !window.location.href.includes("content-script")
    return !!inPopup && document.body.className !== "summarizer"
  })

  const [isOpen, setIsOpen] = useState(false)
  const [extensionEnabled, setEnableExtension] = useState(true)

  const handleToggle = (enabled: boolean) => {
    chrome.storage.local.set({ extensionEnabled: enabled })
  }

  useEffect(() => {
    getExtensionEnabled().then((enabled) => {
      setEnableExtension(enabled)
    })
  }, [])

  useEffect(() => {
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string,
    ) => {
      if (areaName === "local" && changes.extensionEnabled) {
        setEnableExtension(
          (changes.extensionEnabled.newValue ?? true) as boolean,
        )
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (!extensionEnabled) setIsOpen(false)
  }, [extensionEnabled])

  if (isPopupView)
    return (
      <ExtensionPopup
        extensionEnabled={extensionEnabled}
        onChange={handleToggle}
      />
    )
  if (!extensionEnabled) return null

  return (
    <>
      <SummarizeButton onSummarize={() => setIsOpen(true)} />
      <SummarizerDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
