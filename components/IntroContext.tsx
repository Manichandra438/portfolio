"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const IntroContext = createContext<{
  done: boolean;
  skipped: boolean;
  skipIntro: () => void;
  completeNaturally: () => void;
}>({
  done: false,
  skipped: false,
  skipIntro: () => {},
  completeNaturally: () => {},
});

function unlockScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => unlockScroll();
  }, []);

  const skipIntro = () => {
    setSkipped(true);
    setDone(true);
    unlockScroll();
  };

  const completeNaturally = () => {
    setDone(true);
    unlockScroll();
  };

  return (
    <IntroContext.Provider value={{ done, skipped, skipIntro, completeNaturally }}>
      <div className={`contents ${skipped ? "skip-anim" : ""}`}>{children}</div>
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
