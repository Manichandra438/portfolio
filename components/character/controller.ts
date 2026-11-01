import {
  CanvasTexture,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
} from "three";
import { hoverLines, sectionLines, tipLines } from "@/data/character";
import { themes } from "@/data/themes";
import { applyTheme, makeMan } from "./model";
import { animate, jumpEnd, jumpPos, makeJump, type Pose } from "./motion";

type Mode = "idle" | "walk" | "react" | "hover" | "hop";

const PHONE_WIDTH = 640;
// The feet sit about 6% above the canvas's bottom edge.
const FEET = 0.94;
// Below this many px between windows the character jumps across; farther, it drops in from the top of the screen.
const farJump = () => innerHeight * 0.9;

/* Runs the character on the page's terminal windows. Returns a function that removes it again. */
export function startCharacter(canvas: HTMLCanvasElement, bubble: HTMLElement) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.outputEncoding = sRGBEncoding;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));

  const scene = new Scene();
  const cam = new PerspectiveCamera(24, 1, 0.1, 50);
  cam.position.set(0, 1.42, 7.4);
  cam.lookAt(0, 1.32, 0);
  scene.add(new HemisphereLight("#ffffff", "#5a5f6b", 0.8));
  const key = new DirectionalLight("#fff4e6", 0.95);
  key.position.set(-2.5, 4, 5);
  scene.add(key);
  const rim = new DirectionalLight("#3ddc97", 1.1);
  rim.position.set(3, 3, -4);
  scene.add(rim);
  const m = makeMan(scene);

  const sc = document.createElement("canvas");
  sc.width = sc.height = 64;
  const sg = sc.getContext("2d")!;
  const gr = sg.createRadialGradient(32, 32, 2, 32, 32, 32);
  gr.addColorStop(0, "rgba(0,0,0,.55)");
  gr.addColorStop(1, "rgba(0,0,0,0)");
  sg.fillStyle = gr;
  sg.fillRect(0, 0, 64, 64);
  const shadow = new Mesh(new PlaneGeometry(1.5, 1.1), new MeshBasicMaterial({ map: new CanvasTexture(sc), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.005;
  scene.add(shadow);

  const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(`--term-${name}`).trim();
  const recolor = () => {
    applyTheme(m, css);
    rim.color.set(css("green"));
  };

  const windows = () => [...document.querySelectorAll<HTMLElement>("main [data-terminal-window]")];
  const sectionOf = (win: HTMLElement) => win.closest("section")?.id || "hello";
  const lines = sectionLines();
  const said = new Set<string>();

  let size = 110;
  let phone = false;
  let win = windows()[0];
  let x = 0, y = 0, dir = 1, mode: Mode = "idle", modeT = 1;
  let sayT = 0, tipN = 0, hoverN = 0, hover = false, greeted = false, lastSpoke = -99, clock = 0, checkT = 0;

  const layout = () => {
    phone = innerWidth < PHONE_WIDTH;
    size = phone ? 80 : 110;
    canvas.style.width = canvas.style.height = `${size}px`;
    renderer.setSize(size, size, false);
  };
  const bounds = () => {
    const r = win.getBoundingClientRect();
    return { lo: r.left - size * 0.2, hi: Math.max(r.left, r.right - size * 0.8), floor: r.top + scrollY + 1 };
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
    const minTop = navH + size * 0.7;
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
    const dy = floor - fromY;
    if (onScreen && Math.abs(dy) <= farJump()) {
      m.jump = makeJump(x, fromY, toX, floor, 0.5 + 0.22 * Math.sqrt(Math.abs(dy) / size), dy < 0 ? dy * 0.12 - size * 0.4 : -size * 0.25, dy < 0, id);
    } else {
      // Too far to jump believably: drop in from above the screen, already in the air.
      const top = scrollY - size * 0.2;
      m.jump = makeJump(toX, top, toX, floor, 0.45 + 0.1 * Math.sqrt(Math.max(0, floor - top) / size), 0, false, id);
      m.jump.Tc = 0;
      x = toX;
    }
    dir = m.jump.x1 >= m.jump.x0 ? 1 : -1;
    mode = "hop";
  };

  function update(dt: number) {
    clock += dt;
    modeT -= dt;
    if (sayT > 0 && (sayT -= dt) <= 0) bubble.style.opacity = "0";
    if ((checkT -= dt) <= 0 && mode !== "hop") {
      checkT = 0.15;
      chooseWindow();
    }
    if (hover && (mode === "walk" || mode === "idle")) {
      mode = "hover";
      if (!greeted) {
        greeted = true;
        say(hoverLines[hoverN++ % hoverLines.length], 2.6);
      }
    }
    const { lo, hi, floor } = bounds();
    if (mode === "hover") {
      if (!hover) {
        mode = "idle";
        modeT = 0.7;
        greeted = false;
      }
    } else if (mode === "hop" && m.jump) {
      const j = m.jump;
      j.t += dt;
      const p = jumpPos(j);
      x = p.x;
      y = p.y + p.arc;
      if (j.t >= jumpEnd(j)) {
        m.jump = null;
        arrive(j.id);
      }
    } else if (mode === "walk") {
      // Matches the stride length, so the planted foot doesn't skate along the window edge.
      x += dir * (size * 0.41) * dt;
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
    } else if (modeT <= 0) {
      if (reduced) {
        mode = "idle";
        modeT = 9;
      } else {
        mode = "walk";
        modeT = phone ? 2 + Math.random() * 2 : 3 + Math.random() * 4;
        if (Math.random() < 0.4) dir *= -1;
      }
    }
    // Follow the window as the page changes, for example when a list expands above it.
    if (mode !== "hop") {
      y = floor;
      x = Math.min(hi, Math.max(lo, x));
    }
  }

  function place(): boolean {
    const top = y - size * FEET - scrollY;
    const visible = top < innerHeight && top > -size;
    canvas.style.visibility = visible ? "visible" : "hidden";
    if (!visible) {
      bubble.style.opacity = "0";
      return false;
    }
    canvas.style.transform = `translate(${Math.round(x)}px,${Math.round(top)}px)`;
    if (sayT > 0) {
      const w = bubble.offsetWidth;
      const h = bubble.offsetHeight;
      const bx = Math.max(4, Math.min(document.documentElement.clientWidth - w - 4, x + size / 2 - w / 2));
      bubble.style.transform = `translate(${Math.round(bx)}px,${Math.round(top - h + size * 0.02)}px)`;
    }
    return true;
  }

  /* Pointer: "near" turns the head toward the cursor, "over" means the pointer is on the figure itself.
     The canvas ignores pointer events, so it never blocks the links and text under it. */
  const pointer: { x: number | null; y: number } = { x: null, y: 0 };
  const ray = new Raycaster();
  const ndc = new Vector2();
  const headPos = new Vector3();
  const hitAt = (px: number, py: number) => {
    if (canvas.style.visibility === "hidden") return false;
    const r = canvas.getBoundingClientRect();
    if (px < r.left || px > r.right || py < r.top || py > r.bottom) return false;
    if (document.elementFromPoint(px, py)?.closest("nav")) return false;
    ndc.set(((px - r.left) / r.width) * 2 - 1, (-(py - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, cam);
    return ray.intersectObject(m.man, true).length > 0;
  };
  const probe = () => {
    if (pointer.x === null || canvas.style.visibility === "hidden") {
      m.look = null;
      return false;
    }
    const r = canvas.getBoundingClientRect();
    m.head.getWorldPosition(headPos).project(cam);
    const dx = pointer.x - (r.left + ((headPos.x + 1) / 2) * r.width);
    const dy = pointer.y - (r.top + ((1 - headPos.y) / 2) * r.height);
    const near = size * 2.2;
    m.look = Math.hypot(dx, dy) < near ? { x: dx / near, y: -dy / near } : null;
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
  addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  addEventListener("click", onClick);

  const labelOf = (id: string | null) => themes.find((t) => t.id === id)?.label;
  const themeWatch = new MutationObserver(() => {
    recolor();
    const label = labelOf(document.documentElement.getAttribute("data-theme"));
    if (label && canvas.style.visibility !== "hidden") react(`${label}. Good choice.`);
  });
  themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  addEventListener("resize", layout);
  layout();
  recolor();
  document.fonts?.ready?.then(recolor);
  const start = bounds();
  x = start.lo + (start.hi - start.lo) * (reduced ? 0.8 : 0.55);
  y = start.floor;

  let raf = 0;
  let last = performance.now();
  // Let the hero's typing animation get going before the first hello.
  const helloTimer = setTimeout(() => {
    if (mode !== "hop") arrive("hello");
  }, 1500);

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    const visible = place();
    if (visible) {
      hover = probe();
      document.documentElement.style.cursor = hover ? "pointer" : "";
      const yaw = mode === "walk" || mode === "hop" ? dir * 1.15 : mode === "hover" ? 0 : 0.3;
      const pose: Pose = mode === "walk" ? "walk" : mode === "hop" ? "jump" : mode === "hover" ? "hover" : mode === "react" ? "wave" : "idle";
      animate(m, pose, dt, yaw, reduced);
      renderer.render(scene, cam);
    } else {
      hover = false;
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(helloTimer);
    removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    removeEventListener("click", onClick);
    removeEventListener("resize", layout);
    themeWatch.disconnect();
    document.documentElement.style.cursor = "";
    renderer.dispose();
  };
}
