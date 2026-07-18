"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useHeroReady } from "./HeroReadyContext";

export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [intersecting, setIntersecting] = useState(false);
  const { ready: heroReady } = useHeroReady();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visible = intersecting && heroReady;

  return (
    <div ref={ref} className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
