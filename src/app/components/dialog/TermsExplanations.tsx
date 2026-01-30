import React from "react";
import { Badge } from "../ui/badge";
import { Lightbulb } from "lucide-react";
import { Language, Summary } from "../../../types/types";
import SectionCard from "./SectionCard"

type Props = {
  termsAndExplanations: Summary["content_by_language"][Language]["2_terms_and_explanations"]
}

const TermsExplanations = ({ termsAndExplanations: { status, items, if_none } }: Props) => {
  return (
    <SectionCard title="Terms & Explanations" icon="BookOpen">
      {status === "present" && items.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs">{item.term}</span>
                  <Badge variant="outline" className="text-xs h-4 px-1">
                    {item.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.explanation}</p>
                <div className="flex gap-1.5 items-start bg-muted/50 p-1.5 rounded">
                  <Lightbulb className="size-2.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground italic leading-relaxed">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">{if_none}</p>
        )}
    </SectionCard>
  );
}

export default TermsExplanations
