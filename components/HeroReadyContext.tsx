"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const HeroReadyContext = createContext<{ ready: boolean; markReady: () => void }>({
  ready: false,
  markReady: () => {},
});

export function HeroReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <HeroReadyContext.Provider value={{ ready, markReady: () => setReady(true) }}>
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady() {
  return useContext(HeroReadyContext);
}
