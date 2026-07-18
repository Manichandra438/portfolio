"use client";

import { useEffect, useRef, useState } from "react";
import { Palette, Check } from "lucide-react";
import { themes, defaultTheme, themeStorageKey, type ThemeId } from "@/data/themes";

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeId>(defaultTheme);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(themeStorageKey) as ThemeId | null;
    if (stored) setActive(stored);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const applyTheme = (id: ThemeId) => {
    setActive(id);
    document.documentElement.setAttribute("data-theme", id);
    window.localStorage.setItem(themeStorageKey, id);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md border border-term-border px-2.5 py-1.5 text-xs text-term-fg-dim transition-colors hover:border-term-green hover:text-term-green"
        aria-label="Change theme"
      >
        <Palette size={14} />
        <span className="hidden sm:inline">theme --set</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-md border border-term-border bg-term-bg-raised shadow-lg">
          <p className="border-b border-term-border px-3 py-2 text-[11px] text-term-fg-dim">
            $ theme --list
          </p>
          <ul>
            {themes.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => applyTheme(t.id)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-term-fg transition-colors hover:bg-term-border/40"
                >
                  <span>{t.label}</span>
                  {active === t.id && <Check size={13} className="text-term-green" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
