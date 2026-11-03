import { atlas, atlasSrc, hoverLines, reactionLines, sectionLines, thoughtLines, tipLines, type FrameName } from "@/data/character";
import { themes } from "@/data/themes";

type Mode = "idle" | "walk" | "react" | "hover" | "hop" | "look";

type Jump = {
  t: number;
  crouch: number;
  air: number;
  land: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  arc: number;
  dusted: boolean;
  id: string;
};

const PHONE_WIDTH = 640;
const CANVAS_W = 180;
const CANVAS_H = 128;
// The row the feet stand on inside the canvas.
const BASE = CANVAS_H - 8;
const FIGURE = atlas.frames.stand.h;
const WALK: FrameName[] = ["walk1", "walk2", "walk4", "walk3"];
const WALK_FPS = 4.5;
// Pixels per second at full size, roughly matching the stride so the planted foot doesn't skate.
const WALK_SPEED = 72;
// Going down, below this many px the character jumps across; farther, it drops in from the top of the screen.
const farJump = () => innerHeight * 0.9;
// Random thoughts: how many per visit, and how far apart in seconds.
const MAX_THOUGHTS = 6;
const thoughtGap = (phone: boolean) => (phone ? 60 + Math.random() * 30 : 25 + Math.random() * 20);
// Scrolling faster than this, in px per second, counts as rushing.
const FAST_SCROLL = 4000;

const jumpEnd = (j: Jump) => j.crouch + j.air + j.land;

/* Runs the character on the page's terminal windows. Returns a function that removes it again. */
export function startCharacter(canvas: HTMLCanvasElement, bubble: HTMLElement, sheet: HTMLImageElement) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.imageSmoothingEnabled = false;

  const windows = () => [...document.querySelectorAll<HTMLElement>("main [data-terminal-window]")];
  const sectionOf = (w: HTMLElement) => w.closest("section")?.id || "hello";
  const lines = sectionLines();
  const said = new Set<string>();

  let scale = 1;
  let phone = false;
  let win = windows()[0];
  let x = 0, y = 0, dir = 1, mode: Mode = "idle", modeT = 1, time = 0;
  let frame: FrameName = "stand", lift = 0, dust = 0, look = 0;
  let jump: Jump | null = null;
  let sayT = 0, tipN = 0, hoverN = 0, hover = false, greeted = false, lastSpoke = -99, clock = 0, checkT = 0;
  let thoughtT = 20, thoughtN = Math.floor(Math.random() * thoughtLines.length), thoughtsSaid = 0;
  let lastScrollY = scrollY, fastScrollAt = -99;
  const reacted = new Set<string>();
  const dustColor = () => getComputedStyle(document.documentElement).getPropertyValue("--term-fg").trim();

  const layout = () => {
    phone = innerWidth < PHONE_WIDTH;
    scale = phone ? 0.75 : 1;
    canvas.style.width = `${CANVAS_W * scale}px`;
    canvas.style.height = `${CANVAS_H * scale}px`;
  };
  const bounds = () => {
    const r = win.getBoundingClientRect();
    const margin = 34 * scale;
    return { lo: r.left + margin, hi: Math.max(r.left + margin, r.right - margin), floor: r.top + scrollY + 1 };
  };
  const say = (text: string, secs = 3.2) => {
    bubble.textContent = text;
    bubble.style.opacity = "1";
    sayT = secs;
    lastSpoke = clock;
  };
  const react = (text: string) => {
    mode = "react";
    modeT = 1.9;
    say(text);
  };
  // A happy hop on the spot, saved for moments that earn it, like a resume download.
  const hopInPlace = () => {
    jump = { t: 0, crouch: 0.12, air: 0.42, land: 0.16, x0: x, y0: y, x1: x, y1: y, arc: FIGURE * scale * 0.22, dusted: false, id: "" };
    mode = "hop";
  };
  // Decide what to do after standing around for a moment, so it's rarely the same thing twice.
  const nextActivity = () => {
    const roll = Math.random();
    if (roll < 0.65) {
      mode = "walk";
      modeT = phone ? 2 + Math.random() * 2 : 3 + Math.random() * 4;
      if (Math.random() < 0.4) dir *= -1;
    } else if (roll < 0.88) {
      mode = "look";
      modeT = 1.8;
    } else {
      mode = "react"; // A wave at nobody in particular.
      modeT = 1.3;
    }
  };
  const arrive = (id: string) => {
    // Each section gets one comment per visit, and on phones only when it has been quiet for a while.
    const quiet = clock - lastSpoke > (phone ? 10 : 2.5);
    if (!said.has(id) && lines[id] && quiet) {
      said.add(id);
      react(lines[id]);
    } else {
      mode = "idle";
      modeT = 0.8;
    }
  };

  /* Pick the window to stand on: one whose top edge is in view. Inside a tall window, stay on the current one. */
  const chooseWindow = () => {
    const navH = document.querySelector("nav")?.getBoundingClientRect().bottom ?? 0;
    const minTop = navH + FIGURE * scale * 0.7;
    const maxTop = innerHeight * 0.72;
    let next: HTMLElement | null = null;
    for (const w of windows()) {
      const top = w.getBoundingClientRect().top;
      if (top >= minTop && top <= maxTop) next = w;
    }
    if (!next || next === win) return;
    const fromY = y;
    const onScreen = fromY - scrollY > 0 && fromY - scrollY < innerHeight;
    win = next;
    const { lo, hi, floor } = bounds();
    const toX = lo + (hi - lo) * Math.random();
    const id = sectionOf(next);
    if (reduced) {
      x = toX;
      y = floor;
      arrive(id);
      return;
    }
    const size = FIGURE * scale;
    const dy = floor - fromY;
    if (dy < 0) {
      // Going up is always a jump up. If the character is off screen, it leaps in from the bottom of the screen.
      const startY = onScreen ? fromY : scrollY + innerHeight + size * 0.1;
      const rise = startY - floor;
      jump = { t: 0, crouch: onScreen ? 0.16 : 0, air: Math.min(1, 0.5 + 0.25 * Math.sqrt(rise / size)), land: 0.2, x0: onScreen ? x : toX, y0: startY, x1: toX, y1: floor, arc: size * 0.45, dusted: false, id };
      if (!onScreen) x = toX;
    } else if (onScreen && dy <= farJump()) {
      jump = { t: 0, crouch: 0.16, air: 0.5 + 0.25 * Math.sqrt(dy / size), land: 0.2, x0: x, y0: fromY, x1: toX, y1: floor, arc: size * 0.2, dusted: false, id };
    } else {
      // Too far to jump believably: drop in from above the screen, already in the air.
      const top = scrollY - size * 0.2;
      jump = { t: 0, crouch: 0, air: 0.45 + 0.1 * Math.sqrt(Math.max(0, floor - top) / size), land: 0.2, x0: toX, y0: top, x1: toX, y1: floor, arc: 0, dusted: false, id };
      x = toX;
    }
    dir = jump.x1 >= jump.x0 ? 1 : -1;
    mode = "hop";
  };

  // Standing still: a slow breath, and turning sideways to face a nearby cursor.
  const poseIdle = () => {
    lift = !reduced && Math.sin(time * 2) > 0.4 ? 1 : 0;
    if (Math.abs(look) > 0.22) {
      frame = "walk1";
      dir = look > 0 ? 1 : -1;
      lift = 0;
    } else {
      frame = "stand";
    }
  };
  const poseWave = () => {
    frame = "wave";
    dir = 1;
    lift = !reduced && Math.sin(time * 9) > 0 ? 2 : 0;
  };

  function update(dt: number) {
    clock += dt;
    time += dt;
    modeT -= dt;
    if (sayT > 0 && (sayT -= dt) <= 0) bubble.style.opacity = "0";
    if ((checkT -= dt) <= 0 && mode !== "hop") {
      checkT = 0.15;
      chooseWindow();
    }
    // A thought now and then, only when it's on screen and nothing else was said recently.
    if ((thoughtT -= dt) <= 0) {
      thoughtT = thoughtGap(phone);
      const calm = mode === "idle" || mode === "walk" || mode === "look";
      if (calm && canvas.style.visibility !== "hidden" && clock - lastSpoke > 8 && thoughtsSaid < MAX_THOUGHTS) {
        thoughtsSaid++;
        say(thoughtLines[thoughtN++ % thoughtLines.length]);
      }
    }
    // Rushing down the page gets a comment, but not every time.
    const scrollSpeed = dt > 0 ? Math.abs(scrollY - lastScrollY) / dt : 0;
    lastScrollY = scrollY;
    if (scrollSpeed > FAST_SCROLL && clock - fastScrollAt > 45 && canvas.style.visibility !== "hidden") {
      fastScrollAt = clock;
      say(reactionLines.fastScroll, 2);
    }
    if (hover && (mode === "walk" || mode === "idle" || mode === "look")) {
      mode = "hover";
      if (!greeted) {
        greeted = true;
        say(hoverLines[hoverN++ % hoverLines.length], 2.6);
      }
    }
    const { lo, hi, floor } = bounds();
    if (mode === "hover") {
      poseWave();
      if (!hover) {
        mode = "idle";
        modeT = 0.7;
        greeted = false;
      }
    } else if (mode === "hop" && jump) {
      const j = jump;
      j.t += dt;
      const s = Math.min(1, Math.max(0, (j.t - j.crouch) / j.air));
      x = j.x0 + (j.x1 - j.x0) * s;
      y = j.y0 + (j.y1 - j.y0) * s - 4 * j.arc * s * (1 - s);
      lift = 0;
      frame = j.t < j.crouch || s >= 1 ? "land" : "jump";
      if (s >= 1 && !j.dusted) {
        j.dusted = true;
        dust = 1;
      }
      if (j.t >= jumpEnd(j)) {
        jump = null;
        arrive(j.id);
      }
    } else if (mode === "walk") {
      frame = WALK[Math.floor(time * WALK_FPS) % WALK.length];
      lift = 0;
      x += dir * WALK_SPEED * scale * dt;
      if (x >= hi) {
        x = hi;
        dir = -1;
      }
      if (x <= lo) {
        x = lo;
        dir = 1;
      }
      if (modeT <= 0) {
        mode = "idle";
        modeT = phone ? 3 + Math.random() * 4 : 1.5 + Math.random() * 2.5;
      }
    } else if (mode === "react") {
      poseWave();
      if (modeT <= 0) {
        mode = "idle";
        modeT = 0.8;
      }
    } else if (mode === "look") {
      // Glance one way, then the other.
      frame = "walk1";
      lift = 0;
      dir = modeT > 0.9 ? 1 : -1;
      if (modeT <= 0) {
        mode = "idle";
        modeT = 0.6;
      }
    } else {
      poseIdle();
      if (modeT <= 0 && !reduced) nextActivity();
    }
    // Follow the window as the page changes, for example when a list expands above it.
    if (mode !== "hop") {
      y = floor;
      x = Math.min(hi, Math.max(lo, x));
    }
  }

  function draw(dt: number) {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    const f = atlas.frames[frame];
    ctx.drawImage(sheet, f.x, 0, f.w, f.h, CANVAS_W / 2 - f.ax, BASE - f.h - lift, f.w, f.h);
    if (dust > 0) {
      dust -= dt * 2.4;
      const k = Math.max(0, dust);
      const spread = (1 - k) * 26 + 18;
      ctx.fillStyle = dustColor();
      for (const d of [-1, 1]) {
        for (let i = 0; i < 4; i++) {
          const size = Math.max(1, Math.round(k * 4 - i * 0.5));
          ctx.fillRect(CANVAS_W / 2 + d * (spread + i * 4) - size / 2, BASE - 2 - i * 2 - (1 - k) * 6, size, size);
        }
      }
    }
  }

  function place(): boolean {
    const top = y - BASE * scale - scrollY;
    const left = x - (CANVAS_W * scale) / 2;
    const visible = top < innerHeight && top > -CANVAS_H * scale;
    canvas.style.visibility = visible ? "visible" : "hidden";
    if (!visible) {
      bubble.style.opacity = "0";
      return false;
    }
    canvas.style.transform = `translate(${Math.round(left)}px,${Math.round(top)}px) scaleX(${dir})`;
    if (sayT > 0) {
      // A comment made just before it left the screen shows again when it comes back.
      bubble.style.opacity = "1";
      const w = bubble.offsetWidth;
      const h = bubble.offsetHeight;
      const pageW = document.documentElement.clientWidth;
      const navH = document.querySelector("nav")?.getBoundingClientRect().bottom ?? 0;
      let bx = Math.max(4, Math.min(pageW - w - 4, x - w / 2));
      let by = y - scrollY - (FIGURE + 4) * scale - h;
      // No room above the head, under the nav: sit beside the head instead, on whichever side has space.
      if (by < navH + 4) {
        const side = 34 * scale;
        bx = x + side + w < pageW - 4 ? x + side : Math.max(4, x - side - w);
        by = navH + 6;
      }
      bubble.style.transform = `translate(${Math.round(bx)}px,${Math.round(by)}px)`;
    }
    return true;
  }

  /* Pointer: "near" turns the character toward the cursor, "over" means the pointer is on the figure itself.
     The canvas ignores pointer events, so it never blocks the links and text under it. */
  const pointer: { x: number | null; y: number } = { x: null, y: 0 };
  const hitAt = (px: number, py: number) => {
    if (canvas.style.visibility === "hidden") return false;
    const r = canvas.getBoundingClientRect();
    if (px < r.left || px > r.right || py < r.top || py > r.bottom) return false;
    if (document.elementFromPoint(px, py)?.closest("nav, button, a")) return false;
    let gx = Math.floor(((px - r.left) / r.width) * CANVAS_W);
    const gy = Math.floor(((py - r.top) / r.height) * CANVAS_H);
    if (dir < 0) gx = CANVAS_W - 1 - gx;
    return ctx.getImageData(gx, gy, 1, 1).data[3] > 0;
  };
  const probe = () => {
    if (pointer.x === null) {
      look = 0;
      return false;
    }
    const r = canvas.getBoundingClientRect();
    const near = FIGURE * scale * 1.6;
    const dx = pointer.x - (r.left + r.width / 2);
    const dy = pointer.y - (r.top + r.height * 0.25);
    look = Math.hypot(dx, dy) < near ? dx / near : 0;
    return hitAt(pointer.x, pointer.y);
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  };
  const onLeave = () => {
    pointer.x = null;
  };
  const onClick = (e: MouseEvent) => {
    if (hitAt(e.clientX, e.clientY)) react(tipLines[tipN++ % tipLines.length]);
  };

  /* Reactions to the page: one comment per link type per visit, but a resume download always gets thanks. */
  const linkReaction = (el: Element | null): keyof typeof reactionLines | null => {
    const link = el?.closest("a");
    if (!link) return null;
    const href = link.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) return "email";
    if (href.includes("linkedin.com")) return "linkedin";
    if (href.includes("github.com")) return "github";
    return null;
  };
  const onOver = (e: PointerEvent) => {
    if (e.pointerType === "touch" || canvas.style.visibility === "hidden") return;
    const key = linkReaction(e.target as Element);
    if (key && !reacted.has(key)) {
      reacted.add(key);
      say(reactionLines[key], 2.4);
    }
  };
  const onResume = (e: MouseEvent) => {
    if (!(e.target as Element).closest?.("a[download]") || canvas.style.visibility === "hidden") return;
    say(reactionLines.resume);
    if (reduced) react(reactionLines.resume);
    else if (mode !== "hop") hopInPlace();
  };
  addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  addEventListener("click", onClick);
  addEventListener("click", onResume);
  addEventListener("pointerover", onOver, { passive: true });

  const themeWatch = new MutationObserver(() => {
    const label = themes.find((t) => t.id === document.documentElement.getAttribute("data-theme"))?.label;
    if (label && canvas.style.visibility !== "hidden") react(`${label}. Good choice.`);
  });
  themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  addEventListener("resize", layout);
  layout();
  const start = bounds();
  x = start.lo + (start.hi - start.lo) * (reduced ? 0.8 : 0.55);
  y = start.floor;

  let raf = 0;
  let last = performance.now();
  // Let the hero's typing animation get going before the first hello.
  const helloTimer = setTimeout(() => {
    if (mode !== "hop") arrive("hello");
  }, 1500);

  function tick(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    if (place()) {
      draw(dt);
      hover = probe();
      document.documentElement.style.cursor = hover ? "pointer" : "";
    } else {
      hover = false;
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(helloTimer);
    removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    removeEventListener("click", onClick);
    removeEventListener("click", onResume);
    removeEventListener("pointerover", onOver);
    removeEventListener("resize", layout);
    themeWatch.disconnect();
    document.documentElement.style.cursor = "";
  };
}

export function loadSheet() {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = atlasSrc;
  });
}
