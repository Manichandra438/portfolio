"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const storageKey = "portfolio-character-hidden";
const listeners = new Set<() => void>();

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const readHidden = () => {
  try {
    return window.localStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
};
const setHidden = (hidden: boolean) => {
  try {
    window.localStorage.setItem(storageKey, hidden ? "1" : "0");
  } catch {}
  listeners.forEach((fn) => fn());
};

// Skip it on data-saver connections: the 3D library is a sizable download for a decoration.
const saveData = () =>
  (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

/* Decorative, so it's hidden from screen readers. The 3D code only loads after the page has finished loading. */
export default function Character() {
  const hidden = useSyncExternalStore(subscribe, readHidden, () => null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const bubble = bubbleRef.current;
    if (hidden !== false || !canvas || !bubble || saveData()) return;

    let cancelled = false;
    let stop: (() => void) | undefined;
    const load = () => {
      import("./controller")
        .then(({ startCharacter }) => {
          if (!cancelled) stop = startCharacter(canvas, bubble);
        })
        // No WebGL, or the download failed. The site works the same without the character.
        .catch(() => {});
    };
    const whenIdle = () => (window.requestIdleCallback ? window.requestIdleCallback(load) : setTimeout(load, 200));
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
      stop?.();
    };
  }, [hidden]);

  if (hidden === null) return null;

  return (
    <>
      {!hidden && (
        <div aria-hidden="true">
          <canvas ref={canvasRef} className="pointer-events-none fixed left-0 top-0 z-30" />
          <div
            ref={bubbleRef}
            className="pointer-events-none fixed left-0 top-0 z-30 w-max max-w-[230px] rounded bg-term-fg px-2 py-1 text-xs leading-snug text-term-bg opacity-0 transition-opacity"
          />
        </div>
      )}
      <button
        type="button"
        onClick={() => setHidden(!hidden)}
        className="fixed bottom-4 right-4 z-40 rounded-md border border-term-border bg-term-bg/90 px-2.5 py-1 text-xs text-term-fg-dim backdrop-blur transition-colors hover:border-term-green hover:text-term-green"
      >
        {hidden ? "character --show" : "character --hide"}
      </button>
    </>
  );
}
