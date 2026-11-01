import type { Jump, Man } from "./model";

export type Pose = "idle" | "walk" | "wave" | "hover" | "jump";

const sstep = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a: number) => Math.max(-a, Math.min(a, v));
// Move a value toward its target. Each pose sets targets, so one action blends into the next.
const eased = (current: number, target: number, f: number) => current + (target - current) * f;

/* A jump runs: crouch, push off and fly, reach for the ground, land soft, stand back up. */
export function makeJump(x0: number, y0: number, x1: number, y1: number, air: number, H: number, up: boolean, id: string): Jump {
  return { t: 0, Tc: 0.2, Ta: air, Tl: 0.13, Tr: 0.3, x0, y0, x1, y1, H, up, dusted: false, id };
}
export const jumpEnd = (j: Jump) => j.Tc + j.Ta + j.Tl + j.Tr;
export function jumpPos(j: Jump) {
  const s = Math.min(1, Math.max(0, (j.t - j.Tc) / j.Ta));
  return { x: mix(j.x0, j.x1, s), y: mix(j.y0, j.y1, s), arc: 4 * j.H * s * (1 - s) };
}

function spawnDust(m: Man) {
  m.puffs.forEach((p, i) => {
    const a = (i / m.puffs.length) * Math.PI * 2 + Math.random() * 0.4;
    p.mesh.position.set(Math.cos(a) * 0.22, 0.05, Math.sin(a) * 0.22);
    p.life = 1;
    p.vx = Math.cos(a) * (0.7 + Math.random() * 0.5);
    p.vy = 0.2 + Math.random() * 0.25;
    p.vz = Math.sin(a) * 0.5;
    p.mesh.material.color.set(m.dustColor);
    p.mesh.visible = true;
  });
}
function updateDust(m: Man, dt: number) {
  for (const p of m.puffs) {
    if (p.life <= 0) continue;
    p.life -= dt / 0.5;
    if (p.life <= 0) {
      p.mesh.visible = false;
      continue;
    }
    p.mesh.position.x += p.vx * dt;
    p.mesh.position.y += p.vy * dt;
    p.mesh.position.z += p.vz * dt;
    p.vx *= 0.93;
    p.vz *= 0.93;
    p.mesh.scale.setScalar(0.7 + (1 - p.life) * 1.6);
    p.mesh.material.opacity = p.life * 0.28;
  }
}

export function animate(m: Man, pose: Pose, dt: number, targetYaw: number, reduced: boolean) {
  m.t += reduced ? 0 : dt;
  const t = m.t;
  const j = m.jump;
  // Index 0 is the character's right side, index 1 the left side that holds the laptop.
  const th = [0, 0];
  const kn = [0.03, 0.03];
  const fa = [0, 0];
  const ax = [0, 0.06];
  const az = [-0.06, 0.08];
  const el = [-0.12, -0.28];
  const ez = [0, 0];
  let lean = 0, twist = 0, roll = 0, sway = 0, hx = 0, hy = 0, hz = 0, sq = 1, smile = 1, rate = 11, air = false, eyesWide = false;

  if (pose === "jump" && j) {
    rate = 26;
    const a = (j.t - j.Tc) / j.Ta;
    if (j.t < j.Tc) {
      // Anticipation: knees bend, arms swing back, body leans in.
      const c = sstep(0, 1, j.t / j.Tc);
      th[0] = th[1] = -0.74 * c;
      kn[0] = kn[1] = 1.42 * c;
      ax[0] = 0.85 * c;
      el[0] = -0.2;
      ax[1] = 0.14 * c;
      lean = 0.3 * c;
      hx = 0.1 * c;
    } else if (a < 1) {
      // In the air: arm drives up, lead knee tucks, feet point, then legs reach for the ground.
      air = true;
      eyesWide = true;
      const e = sstep(0, 0.2, a);
      const fall = sstep(0.55, 1, a);
      const tuck = Math.sin(a * Math.PI);
      th[0] = -0.15 - 0.58 * tuck;
      kn[0] = 0.22 + 0.98 * tuck;
      th[1] = 0.06 - 0.26 * tuck;
      kn[1] = 0.18 + 0.72 * tuck;
      fa[0] = fa[1] = mix(0.55, -0.14, fall);
      ax[0] = mix(0.85, -2.75, e) + fall;
      az[0] = -0.15 - 0.4 * fall;
      el[0] = -0.25;
      ax[1] = -0.28 * tuck;
      az[1] = 0.08 + 0.18 * fall;
      lean = mix(0.3, -0.05, e) + 0.14 * fall;
      hx = j.up ? mix(-0.2, 0.22, fall) : mix(0.05, 0.28, fall);
      sq = 1 + 0.03 * tuck;
    } else if (j.t < j.Tc + j.Ta + j.Tl) {
      // Landing: knees absorb the drop, body squashes, arms come down for balance.
      const d = sstep(0, 1, (j.t - j.Tc - j.Ta) / j.Tl);
      th[0] = th[1] = -0.86 * d;
      kn[0] = kn[1] = 1.62 * d;
      ax[0] = mix(-1.5, -0.55, d);
      az[0] = -0.4;
      ax[1] = 0.2;
      lean = 0.36 * d;
      hx = 0.1;
      sq = 1 - 0.07 * d;
      smile = 1.3;
    } else {
      // Stand back up with a small overshoot, so the body settles instead of stopping dead.
      const u = sstep(0, 1, (j.t - j.Tc - j.Ta - j.Tl) / j.Tr);
      th[0] = th[1] = -0.86 * (1 - u);
      kn[0] = kn[1] = 0.03 + 1.59 * (1 - u);
      ax[0] = -0.55 * (1 - u);
      az[0] = mix(-0.4, -0.06, u);
      ax[1] = 0.2 * (1 - u);
      lean = 0.36 * (1 - u) - Math.sin(u * Math.PI) * 0.03;
      sq = 0.93 + 0.07 * u + Math.sin(u * Math.PI) * 0.02;
      smile = 1.4;
    }
  } else if (pose === "walk") {
    rate = 22;
    const phi = t * 6.5;
    for (const i of [0, 1]) {
      const ph = phi + (i ? Math.PI : 0);
      const S = Math.sin(ph);
      const C = Math.cos(ph);
      th[i] = -0.5 * S - 0.06;
      // The knee starts lifting just before toe-off and straightens for the heel strike.
      kn[i] = 0.1 + 0.98 * Math.pow(Math.max(0, Math.cos(ph + 0.35)), 1.4);
      // Foot angle: heel strike, flat, push off the toes, then swing through.
      fa[i] = C < 0 ? (S > 0 ? -0.32 * S : 0.55 * S * S) : 0.115 - 0.435 * S;
    }
    const S = Math.sin(phi);
    const C = Math.cos(phi);
    ax[0] = 0.46 * S;
    el[0] = -0.32 - 0.42 * Math.max(0, -S);
    ax[1] = 0.05 + 0.05 * S;
    lean = 0.07;
    twist = S * 0.13;
    roll = C * 0.022;
    sway = C * 0.022;
    hy = -S * 0.08;
    hz = -C * 0.018;
    hx = 0.02;
  } else if (pose === "wave") {
    az[0] = -2.4 + Math.sin(t * 2.4) * 0.05;
    el[0] = 0;
    ez[0] = -0.32 + Math.sin(t * 9) * 0.4;
    smile = 1.5;
    hy = 0.14;
    hx = -0.05;
    hz = -0.05;
    sway = -0.02;
    roll = 0.02;
  } else if (pose === "hover") {
    // Noticed the visitor: excited little bounce on the knees and a quick wave.
    const b = Math.abs(Math.sin(t * 5.5));
    kn[0] = kn[1] = 0.08 + b * 0.2;
    th[0] = th[1] = -kn[0] * 0.5;
    az[0] = -2.45;
    el[0] = 0;
    ez[0] = -0.3 + Math.sin(t * 11) * 0.42;
    smile = 1.7;
    rate = 15;
  } else {
    // Idle: slow breathing, weight shifting between the feet, glancing around.
    const b = Math.sin(t * 1.9);
    const w = Math.sin(t * 0.55);
    sq = 1 + b * 0.006;
    sway = w * 0.018;
    roll = -w * 0.012;
    kn[0] = 0.05 + Math.max(0, w) * 0.08;
    kn[1] = 0.05 + Math.max(0, -w) * 0.08;
    th[0] = -kn[0] * 0.5;
    th[1] = -kn[1] * 0.5;
    hy = Math.sin(t * 0.6) * 0.18;
    hx = Math.sin(t * 0.43) * 0.04;
  }

  // Look at the cursor. Subtracting part of the body's turn lets a walking character still glance at the viewer.
  const looking = m.look !== null && pose !== "jump";
  if (m.look && looking) {
    hy = clamp(m.look.x * 0.8 - m.yaw * 0.5, 0.9);
    hx = clamp(-m.look.y * 0.35, 0.3);
  }

  const f = 1 - Math.exp(-dt * rate);
  m.legs.forEach((leg, i) => {
    const knee = m.knees[i];
    leg.rotation.x = eased(leg.rotation.x, th[i], f);
    knee.rotation.x = eased(knee.rotation.x, kn[i], f);
    // The foot's angle is set relative to the ground, so cancel out the thigh and shin above it.
    m.ankles[i].rotation.x = eased(m.ankles[i].rotation.x, fa[i] - leg.rotation.x - knee.rotation.x, f);
  });
  m.arms.forEach((arm, i) => {
    arm.rotation.x = eased(arm.rotation.x, ax[i], f);
    arm.rotation.z = eased(arm.rotation.z, az[i], f);
    m.elbows[i].rotation.x = eased(m.elbows[i].rotation.x, el[i], f);
    m.elbows[i].rotation.z = eased(m.elbows[i].rotation.z, ez[i], f);
  });
  m.torso.rotation.x = eased(m.torso.rotation.x, lean, f);
  m.torso.rotation.y = eased(m.torso.rotation.y, twist, f);
  m.hips.rotation.y = eased(m.hips.rotation.y, -twist * 0.5, f);
  m.hips.rotation.z = eased(m.hips.rotation.z, roll, f);
  m.hips.position.x = eased(m.hips.position.x, sway, f);
  m.head.rotation.x = eased(m.head.rotation.x, hx, f);
  m.head.rotation.y = eased(m.head.rotation.y, hy, f);
  m.head.rotation.z = eased(m.head.rotation.z, hz, f);

  // Plant the feet: set the hip height from whichever leg reaches lowest, so the soles stay on the ground.
  const reach = (i: number) => 0.36 * Math.cos(m.legs[i].rotation.x) + 0.36 * Math.cos(m.legs[i].rotation.x + m.knees[i].rotation.x);
  m.hips.position.y = air ? 0.82 : Math.max(reach(0), reach(1)) + 0.1;

  m.man.scale.y = eased(m.man.scale.y, sq, f);
  m.man.scale.x = eased(m.man.scale.x, 2 - sq, f);
  m.yaw = eased(m.yaw, targetYaw, 1 - Math.exp(-dt * 8));
  m.man.rotation.y = m.yaw;

  m.openSmile = eased(m.openSmile, sstep(1.25, 1.6, smile), f);
  m.mouth.open.visible = m.openSmile > 0.04;
  m.mouth.open.scale.set(mix(0.7, 1, m.openSmile), mix(0.3, 1, m.openSmile), 1);
  m.mouth.closed.visible = m.openSmile < 0.5;
  m.mouth.closed.scale.x = 1 + Math.min(0.25, smile - 1) * 0.5;

  if (j && !j.dusted && j.t >= j.Tc + j.Ta) {
    j.dusted = true;
    spawnDust(m);
  }
  updateDust(m, dt);

  m.blinkT -= dt;
  if (m.blinkT <= 0) {
    m.blink = 0.13;
    m.blinkT = 2.2 + Math.random() * 3.5;
  }
  m.blink -= dt;
  const open = m.blink > 0 ? 0.1 : eyesWide ? 1.2 : 1;
  const gazeX = m.look && looking ? clamp(m.look.x, 1) * 0.022 : 0;
  const gazeY = m.look && looking ? clamp(m.look.y, 1) * 0.014 : 0;
  m.eyes.forEach((e, i) => {
    e.scale.y = open;
    e.position.x = (i ? 0.2 : -0.2) + gazeX;
    e.position.y = 0.05 + gazeY;
  });
}
