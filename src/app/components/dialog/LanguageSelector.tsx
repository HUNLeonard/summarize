import React from "react"
import { Language } from "../../../types/types"
import { cn } from "../ui/utils"

type Props = {
  selectedLanguage: Language
  onLanguageChange: (language: Language) => void
}

const LanguageSelector = ({ selectedLanguage, onLanguageChange }: Props) => {
  return (
    <div className="flex gap-1 bg-muted p-1 rounded-lg">
      <button
        onClick={() => onLanguageChange(Language.EN)}
        className={cn(
          "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
          selectedLanguage === Language.EN
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange(Language.HU)}
        className={cn(
          "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
          selectedLanguage === Language.HU
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Hungarian
      </button>
    </div>
  )
}

export default LanguageSelector
