import { useState, useEffect, useMemo } from "react";

const loadingMessages = [
  "Learning to read",
  "Putting on glasses",
  "Trying to figure out letters",
  "Decoding hieroglyphics",
  "Consulting the dictionary",
  "Asking ChatGPT for help",
  "Squinting at small text",
  "Counting words",
  "Taking notes",
  "Underlining important parts",
  "Reading between the lines",
  "Adjusting my monocle",
  "Dusting off the thesaurus",
  "Waking up the spell checker",
  "Brewing coffee for focus",
  "Doing mental gymnastics",
  "Channeling my inner professor",
  "Consulting ancient scrolls",
  "Deciphering your handwriting",
  "Running to the library",
  "Sharpening pencils",
  "Organizing sticky notes",
  "Calibrating brain cells",
  "Summoning the grammar police",
  "Polishing my reading lamp",
  "Flipping through flashcards",
  "Downloading more RAM",
  "Teaching AI to read",
  "Explaining words to myself",
  "Drawing mind maps",
  "Connecting the dots",
  "Finding my train of thought",
  "Chasing runaway ideas",
  "Herding cats (metaphorically)",
  "Untangling sentences",
  "Debugging the English language",
  "Reticulating splines",
  "Pondering existence",
  "Questioning everything",
  "Having an epiphany",
  "Consulting the Oxford",
  "Speed reading (slowly)",
  "Analyzing the analysis",
  "Meta-thinking about thinking",
  "Overthinking this",
  "Reading the fine print",
  "Zooming in on pixels",
  "Enhancing image quality",
  "Cross-referencing sources",
  "Fact-checking facts",
  "Double-checking my work",
  "Triple-checking to be sure",
  "Counting to potato",
  "Recalculating route",
  "Consulting my pet parrot",
  "Asking a friend",
  "Phoning a lifeline",
  "Googling Google",
  "Searching for meaning",
  "Finding inner peace",
  "Achieving zen",
  "Meditating on semantics",
  "Contemplating commas",
  "Wrestling with words",
  "Taming wild paragraphs",
  "Lassoing loose thoughts",
  "Corralling concepts",
  "Wrangling rhetoric",
  "Juggling jargon",
  "Decoding acronyms",
  "Translating from English to English",
  "Converting to metric",
  "Measuring twice",
  "Cutting once",
  "Following breadcrumbs",
  "Solving the puzzle",
  "Cracking the code",
  "Breaking the cipher",
  "Finding Easter eggs",
  "Searching for hidden meanings",
  "Looking under the rug",
  "Checking under the hood",
  "Peeking behind curtains",
  "Opening Pandora's box",
  "Going down rabbit holes",
  "Climbing out of rabbit holes",
  "Asking the Magic 8-Ball",
  "Consulting my crystal ball",
  "Reading tea leaves",
  "Interpreting dreams",
  "Channeling my chakras",
  "Aligning the stars",
  "Waiting for inspiration",
  "Summoning motivation",
  "Finding my muse",
  "Bribing the creativity gods",
  "Sacrificing syntax",
  "Praying to the algorithm",
  "Crossing fingers",
  "Knocking on wood",
  "Throwing salt over shoulder",
  "Avoiding black cats",
  "Walking under ladders anyway",
  "Tempting fate",
  "Rolling the dice",
  "Shuffling the deck",
  "Drawing conclusions",
  "Jumping to them instead",
  "Connecting synapses",
  "Firing neurons",
  "Stimulating dendrites",
  "Activating almonds",
  "Engaging brain mode",
  "Switching to thinking cap",
  "Putting on detective hat",
  "Becoming Sherlock",
  "Elementary, my dear Watson",
];

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse opacity-40">
      {/* Time & ROI Skeleton */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 bg-muted rounded-md" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>

      {/* Language Tabs Skeleton */}
      <div className="px-3 py-3 border-b">
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <div className="flex-1 h-8 bg-background rounded-md" />
          <div className="flex-1 h-8 bg-muted rounded-md" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3 space-y-2">
        {/* Quick Summary Skeleton */}
        <div className="border rounded-lg p-3 space-y-2">
          <div className="h-5 w-32 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
          </div>
        </div>

        {/* Terms Skeleton */}
        <div className="border rounded-lg p-3 space-y-2">
          <div className="h-5 w-40 bg-muted rounded" />
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-4/5 bg-muted rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-4/5 bg-muted rounded" />
            </div>
          </div>
        </div>

        {/* Takeaway Skeleton */}
        <div className="border rounded-lg p-3 space-y-2">
          <div className="h-5 w-28 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        </div>

        {/* Metrics Skeleton */}
        <div className="border rounded-lg p-3 space-y-3">
          <div className="h-5 w-36 bg-muted rounded" />

          {/* Content Value Distribution */}
          <div className="space-y-2">
            <div className="h-4 w-48 bg-muted rounded" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-3 w-24 bg-muted rounded" />
                  <div className="h-3 w-8 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Other metrics */}
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Meta Info Skeleton */}
        <div className="border rounded-lg p-3">
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}