import { icons } from "lucide-react";

export type Term = {
  term: string;
  type: string;
  explanation: string;
  example: string;
}

export enum Language {
  EN = "en",
  HU = "hu",
}

export type IconName = keyof typeof icons;