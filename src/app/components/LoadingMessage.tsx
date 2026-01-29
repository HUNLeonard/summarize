import React, { useState, useEffect, useMemo } from "react";

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

export function LoadingMessage() {
  // Shuffle messages once on mount
  const shuffledMessages = useMemo(() => {
    const messages = [...loadingMessages];
    for (let i = messages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [messages[i], messages[j]] = [messages[j], messages[i]];
    }
    return messages;
  }, []);

  const [messageIndex, setMessageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (3500 / 50)); // Update every 50ms
      });
    }, 50);

    // Message rotation
    const messageInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % shuffledMessages.length);
        setIsTransitioning(false);
        setProgress(0);
      }, 300);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [messageIndex, shuffledMessages.length]);

  return (
    <div className="bg-background/95 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border">
      <p
        className={`text-sm text-muted-foreground italic transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {shuffledMessages[messageIndex]}...
      </p>
      <div className="w-full h-1 bg-muted rounded mt-2">
        <div
          className="h-full bg-primary rounded transition-all duration-50"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
