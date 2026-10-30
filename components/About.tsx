import { personal, impact } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Reveal>
        <TerminalWindow title="cat about.md">
          <p className="prompt text-term-fg-dim">cat about.md</p>
          <p className="mt-3 text-sm leading-relaxed text-term-fg sm:text-base">{personal.summary}</p>

          <p className="prompt mt-6 text-term-fg-dim">impact --stats</p>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {impact.map((stat) => (
              <li key={stat.label} className="rounded-md border border-term-border bg-term-bg px-3 py-3">
                <p className="text-xl font-bold text-term-green sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-snug text-term-fg-dim">{stat.label}</p>
              </li>
            ))}
          </ul>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
