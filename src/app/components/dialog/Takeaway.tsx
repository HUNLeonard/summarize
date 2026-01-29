import React from "react";
import { Target } from "lucide-react";
import SectionCard from "./SectionCard";

type Props = {
  takeaway: string[];
}

const Takeaway = ({ takeaway }: Props) => {
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
