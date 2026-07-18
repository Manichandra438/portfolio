import { skills } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <TerminalWindow title="skills --list">
        <p className="prompt text-term-fg-dim">skills --list</p>
        <div className="mt-4 space-y-4">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="text-xs uppercase tracking-wide text-term-amber">{group.category}:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-term-border bg-term-bg px-2.5 py-1 text-xs text-term-fg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
