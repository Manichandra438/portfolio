"use client";

import { useEffect, useState } from "react";

export default function TypedText({
  text,
  startDelay = 0,
  speed = 40,
  onDone,
  className = "",
}: {
  text: string;
  startDelay?: number;
  speed?: number;
  onDone?: () => void;
  className?: string;
}) {
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [count, setCount] = useState(reduceMotion ? text.length : 0);
  const [started, setStarted] = useState(reduceMotion || startDelay === 0);

  useEffect(() => {
    if (reduceMotion || startDelay === 0) return;
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [startDelay, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !started || count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 1000 / speed);
    return () => clearTimeout(t);
  }, [started, count, text, speed, reduceMotion]);

  useEffect(() => {
    if (started && count >= text.length) onDone?.();
  }, [started, count, text.length, onDone]);

  const done = count >= text.length;

  return (
    <span className={className}>
      {text.slice(0, count)}
      {started && !done && <span className="type-caret" aria-hidden="true" />}
    </span>
  );
}
