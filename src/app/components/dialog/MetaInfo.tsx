import React from "react"
import { Badge } from "../ui/badge"
import { Bot, Languages } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion"
import { Summary } from "../../../types/types"

type Props = {
  metaInfo: Summary["meta"]
}

const MetaInfo = ({
  metaInfo: { assistant_name, input_language, output_languages },
}: Props) => (
  <Accordion type="single" collapsible>
    <AccordionItem
      value="analytics"
      className="bg-card text-card-foreground rounded-xl border"
    >
      <AccordionTrigger className="flex items-center gap-1.5 p-3">
        <Bot className="size-3" />
        Analysis Info
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2 p-3 pb-6">
        <div>
          <span className="text-xs text-muted-foreground">Assistant:</span>
          <p className="text-xs font-medium">{assistant_name}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Languages className="size-3 text-muted-foreground" />
          <Badge variant="outline" className="text-xs h-4 px-1">
            {input_language.toUpperCase()}
          </Badge>
          <span className="text-xs text-muted-foreground">→</span>
          {output_languages.map((lang) => (
            <Badge key={lang} variant="secondary" className="text-xs h-4 px-1">
              {lang.toUpperCase()}
            </Badge>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export default MetaInfo
