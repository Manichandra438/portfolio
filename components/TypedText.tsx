"use client";

import { useEffect, useState } from "react";

export default function TypedText({
  text,
  startDelay = 0,
  speed = 40,
  onDone,
  className = "",
  skip = false,
}: {
  text: string;
  startDelay?: number;
  speed?: number;
  onDone?: () => void;
  className?: string;
  skip?: boolean;
}) {
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const instant = reduceMotion || skip;

  const [count, setCount] = useState(instant ? text.length : 0);
  const [started, setStarted] = useState(instant || startDelay === 0);

  useEffect(() => {
    if (skip) {
      setStarted(true);
      setCount(text.length);
    }
  }, [skip, text.length]);

  useEffect(() => {
    if (instant || startDelay === 0) return;
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [startDelay, instant]);

  useEffect(() => {
    if (instant || !started || count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 1000 / speed);
    return () => clearTimeout(t);
  }, [started, count, text, speed, instant]);

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
