import { Star } from "lucide-react";
import { achievements } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Reveal>
        <TerminalWindow title="cat achievements.log">
          <p className="prompt text-term-fg-dim">achievements --list</p>
          <ul className="mt-3 space-y-2">
            {achievements.map((a, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-term-fg sm:text-base">
                <Star size={16} className="text-term-yellow" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
