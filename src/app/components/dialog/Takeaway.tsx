import React from "react";
import { Target } from "lucide-react";
import SectionCard from "./SectionCard";
import { Language, Summary } from "../../../types/types";

type Props = {
  takeaway: Summary["content_by_language"][Language]["10_main_takeaway_message"]
}

const Takeaway = ({ takeaway: { takeaway } }: Props) => {
  return (
    <SectionCard title="Main Takeaway" icon="Target" className="bg-primary/5 border-primary/20">
      <div className="flex flex-col gap-1.5">
        {takeaway.map((message, idx) => (
          <p key={idx} className="text-xs font-medium leading-relaxed">{message}</p>
        ))}
      </div>
    </SectionCard>
  );
}

export default Takeaway
