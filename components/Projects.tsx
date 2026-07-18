import { ExternalLink, Folder } from "lucide-react";
import { projects } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Reveal>
        <TerminalWindow title="ls -la ~/projects">
          <p className="prompt text-term-fg-dim">projects --ls</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-1">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-md border border-term-border bg-term-bg p-4 transition-all duration-200 hover:-translate-y-1 hover:border-term-green hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Folder size={16} className="text-term-amber" />
                    <span className="font-semibold text-term-green">{p.name}</span>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-term-fg-dim transition-colors group-hover:text-term-green"
                  />
                </div>
                <p className="mt-1 text-xs text-term-amber">{p.tagline}</p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-term-border px-2 py-0.5 text-[11px] text-term-fg-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <ul className="mt-3 space-y-1.5">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-term-fg">
                      <span className="mt-1 text-term-green">&gt;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
