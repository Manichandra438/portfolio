import { ReactNode } from "react";

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
      <div className="flex items-center gap-2 border-b border-term-border bg-black/30 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-term-red" />
        <span className="h-3 w-3 rounded-full bg-term-yellow" />
        <span className="h-3 w-3 rounded-full bg-term-green" />
        <span className="ml-3 text-xs text-term-fg-dim truncate">{title}</span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
