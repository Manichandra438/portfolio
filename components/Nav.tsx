"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navCommands } from "@/data/resume";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-term-border bg-term-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="text-sm text-term-green">manichandra@portfolio:~$</span>

        <div className="flex items-center gap-3 sm:hidden">
          <ThemeSwitcher />
          <button
            className="text-term-fg"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="hidden items-center gap-5 sm:flex">
          <ul className="flex gap-5 text-sm">
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
          <ThemeSwitcher />
        </div>
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
