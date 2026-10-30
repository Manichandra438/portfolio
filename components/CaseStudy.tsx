import { ArrowDown } from "lucide-react";
import { caseStudy } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import Reveal from "./Reveal";

export default function CaseStudy() {
  return (
    <section id="case-study" className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Reveal>
        <TerminalWindow title="cat case-study/ai-extraction.md">
          <p className="prompt text-term-fg-dim">cat case-study/ai-extraction.md</p>

          <div className="mt-4">
            <h2 className="text-base font-semibold text-term-green sm:text-lg">{caseStudy.title}</h2>
            <p className="text-xs text-term-fg-dim sm:text-sm">{caseStudy.context}</p>
          </div>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-term-fg">
            <p>
              <span className="text-term-amber"># problem </span>
              {caseStudy.problem}
            </p>
            <p>
              <span className="text-term-amber"># my role </span>
              {caseStudy.role}
            </p>
          </div>

          <p className="mt-6 text-xs uppercase tracking-wide text-term-amber">pipeline:</p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {caseStudy.pipeline.map((stage, i) => (
              <li key={stage.step} className="flex flex-col">
                <div className="flex flex-1 gap-3 rounded-md border border-term-border bg-term-bg px-3 py-2.5">
                  <span className="text-xs font-semibold text-term-green">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-sm font-semibold text-term-fg">{stage.step}</p>
                    <p className="mt-0.5 text-xs leading-snug text-term-fg-dim">{stage.detail}</p>
                  </div>
                </div>
                {i < caseStudy.pipeline.length - 1 && (
                  <ArrowDown size={14} className="mx-auto mt-2 text-term-fg-dim sm:hidden" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {caseStudy.highlights.map((h) => (
              <div key={h.heading}>
                <p className="text-xs uppercase tracking-wide text-term-amber">{h.heading}:</p>
                <p className="mt-1 text-sm leading-relaxed text-term-fg">{h.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {caseStudy.stack.map((s) => (
              <span key={s} className="rounded border border-term-border px-2 py-0.5 text-[11px] text-term-fg-dim">
                {s}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xs italic text-term-fg-dim">{caseStudy.note}</p>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
