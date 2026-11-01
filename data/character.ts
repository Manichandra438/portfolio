import { careerStart, experienceSince, formatExperience } from "./resume";

// The sprite sheet: where each pose sits in the image. ax is the upper body's center, which lines poses up.
export const atlasSrc = "/character-atlas.png";
export const atlas = {
  frames: {
    stand: { x: 0, w: 47, h: 118, ax: 23 },
    wave: { x: 49, w: 58, h: 118, ax: 31 },
    walk1: { x: 109, w: 40, h: 117, ax: 18 },
    walk2: { x: 151, w: 60, h: 117, ax: 27 },
    walk3: { x: 213, w: 79, h: 113, ax: 38 },
    walk4: { x: 294, w: 44, h: 113, ax: 22 },
    jump: { x: 340, w: 81, h: 88, ax: 51 },
    land: { x: 423, w: 72, h: 78, ax: 52 },
  },
} as const;
export type FrameName = keyof typeof atlas.frames;

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

// Now and then, for no reason.
export const thoughtLines = [
  "It works on my machine.",
  "Is it Friday yet?",
  "One more coffee, then I'll fix it.",
  "It's not a bug. It's a feature.",
  "Have you tried turning it off and on?",
  "Still reading? I like you.",
  "git push and pray.",
  "Who wrote this code? Oh. Me.",
];

// When the visitor does something. Keys are matched in the controller.
export const reactionLines = {
  resume: "You got my resume! Thanks!",
  email: "Yes, please. Email me.",
  linkedin: "Let's connect on LinkedIn.",
  github: "My code lives here.",
  fastScroll: "Whoa, slow down!",
};

export const hoverLines = ["Hi! Click me for a tip.", "Oh, hello there.", "You found me. Click for a tip."];

export const tipLines = [
  "Grab my resume at the top of the page.",
  "Try theme --set in the nav.",
  "Start with the case study.",
];
