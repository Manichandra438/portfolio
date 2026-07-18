import { ReactNode } from "react";
import { TerminalSquare, Minus, Square, X } from "lucide-react";

export default function TerminalWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-term-border bg-term-bg-raised shadow-[0_0_0_1px_rgba(0,0,0,0.2)] overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between border-b border-term-border bg-black/30 pl-3 pr-0 py-0">
        <div className="flex items-center gap-2 py-2 text-term-fg-dim">
          <TerminalSquare size={14} className="text-term-green" />
          <span className="text-xs truncate">{title}</span>
        </div>
        <div className="flex items-stretch h-9">
          <span className="flex w-11 items-center justify-center text-term-fg-dim">
            <Minus size={13} />
          </span>
          <span className="flex w-11 items-center justify-center text-term-fg-dim">
            <Square size={11} />
          </span>
          <span className="flex w-11 items-center justify-center text-term-fg-dim hover:bg-term-red hover:text-white transition-colors">
            <X size={14} />
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
