import { careerStart, experienceSince, formatExperience } from "./resume";

// What the character says. Section keys match the section ids in the page; "hello" is the hero window.
export function sectionLines(): Record<string, string> {
  return {
    hello: "Hi, I'm Manichandra. The small one.",
    about: "That's me in a few lines.",
    experience: `${formatExperience(experienceSince(careerStart))} building claims platforms at Solera.`,
    "case-study": "My favorite work: the AI extraction pipeline.",
    projects: "Things I built after work.",
    skills: "My toolbox. C# and .NET first.",
    achievements: "4x Star of the Month. Still proud of that.",
    education: "Where it all started.",
    contact: "Let's talk. My email is right here.",
  };
}

export const hoverLines = ["Hi! Click me for a tip.", "Oh, hello there.", "You found me. Click for a tip."];

export const tipLines = [
  "Grab my resume at the top of the page.",
  "Try theme --set in the nav.",
  "Start with the case study.",
];
