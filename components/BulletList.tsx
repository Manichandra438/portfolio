"use client";

import { useState } from "react";

// Lists longer than this collapse behind a toggle; one extra item isn't worth hiding.
const visibleCount = 5;

export default function BulletList({ bullets }: { bullets: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const collapsible = bullets.length > visibleCount + 1;
  const shown = collapsible && !expanded ? bullets.slice(0, visibleCount) : bullets;

  return (
    <>
      <ul className="mt-3 space-y-2">
        {shown.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-term-fg">
            <span className="mt-1 text-term-green">&gt;</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {collapsible && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 text-xs text-term-fg-dim transition-colors hover:text-term-green"
        >
          {expanded ? "$ less" : `$ more --${bullets.length - visibleCount} lines`}
        </button>
      )}
    </>
  );
}
