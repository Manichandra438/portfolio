import { personal } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Reveal>
        <TerminalWindow title="cat about.md">
          <p className="prompt text-term-fg-dim">cat about.md</p>
          <p className="mt-3 text-sm leading-relaxed text-term-fg sm:text-base">{personal.summary}</p>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
