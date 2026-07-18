import { experience } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <TerminalWindow title="git log --author=manichandra">
        <p className="prompt text-term-fg-dim">experience --log</p>

        <div className="mt-4">
          <p className="text-base font-semibold text-term-green sm:text-lg">{experience.company}</p>
          <p className="text-xs text-term-fg-dim sm:text-sm">{experience.products}</p>
        </div>

        <div className="mt-6 space-y-8 border-l border-term-border pl-5">
          {experience.roles.map((role) => (
            <div key={role.role} className="relative">
              <span className="absolute -left-[26px] top-1 h-2.5 w-2.5 rounded-full bg-term-green" />
              <p className="text-sm font-semibold text-term-amber sm:text-base">{role.role}</p>
              <p className="text-xs text-term-fg-dim">{role.period}</p>
              <ul className="mt-3 space-y-2">
                {role.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-term-fg">
                    <span className="mt-1 text-term-green">&gt;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
