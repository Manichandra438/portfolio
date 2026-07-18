"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navCommands } from "@/data/resume";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-term-border bg-term-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-sm text-term-green">manichandra@portfolio:~$</span>

        <button
          className="text-term-fg sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <ul className="hidden gap-5 text-sm sm:flex">
          {navCommands.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => handleClick(c.id)}
                className="text-term-fg-dim transition-colors hover:text-term-green"
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-term-border px-4 pb-4 text-sm sm:hidden">
          {navCommands.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => handleClick(c.id)}
                className="block w-full py-2 text-left text-term-fg-dim hover:text-term-green"
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
