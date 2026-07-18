import { GraduationCap } from "lucide-react";
import { education } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Reveal>
        <TerminalWindow title="cat education.md">
          <p className="prompt text-term-fg-dim">education --show</p>
          <div className="mt-3 flex gap-3">
            <GraduationCap size={20} className="mt-1 shrink-0 text-term-amber" />
            <div>
              <p className="text-sm font-semibold text-term-fg sm:text-base">{education.degree}</p>
              <p className="text-sm text-term-fg-dim">{education.school}</p>
              <p className="text-xs text-term-fg-dim">{education.period}</p>
            </div>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
