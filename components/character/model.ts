import {
  BoxGeometry,
  CanvasTexture,
  CapsuleGeometry,
  CatmullRomCurve3,
  CircleGeometry,
  Color,
  ColorManagement,
  CylinderGeometry,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  sRGBEncoding,
} from "three";
import type { BufferAttribute, BufferGeometry, MeshStandardMaterialParameters, Object3D } from "three";

// Treat hex colors as sRGB; without this the sRGB output washes every color out.
ColorManagement.legacyMode = false;

export type Jump = {
  t: number;
  Tc: number;
  Ta: number;
  Tl: number;
  Tr: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  H: number;
  up: boolean;
  dusted: boolean;
  id: string;
};

export type Puff = { mesh: Mesh<SphereGeometry, MeshBasicMaterial>; life: number; vx: number; vy: number; vz: number };

export type Man = {
  man: Group;
  hips: Group;
  torso: Group;
  head: Group;
  legs: Group[];
  knees: Group[];
  ankles: Group[];
  arms: Group[];
  elbows: Group[];
  eyes: Group[];
  mouth: { closed: Mesh; open: Group };
  puffs: Puff[];
  mats: Record<"hoodie" | "trim" | "pants" | "shoe" | "accent", MeshStandardMaterial>;
  logoCv: HTMLCanvasElement;
  logoTex: CanvasTexture;
  dustColor: string;
  yaw: number;
  blinkT: number;
  blink: number;
  t: number;
  openSmile: number;
  look: { x: number; y: number } | null;
  jump: Jump | null;
};

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Stubble: speckled texture that fades out toward the cheeks and sideburns, so there's no hard edge.
function stubbleTexture() {
  const cv = document.createElement("canvas");
  cv.width = 256;
  cv.height = 128;
  const ctx = cv.getContext("2d")!;
  const img = ctx.createImageData(256, 128);
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 256; x++) {
      const u = x / 255;
      const v = y / 127;
      const i = (y * 256 + x) * 4;
      const fade = smooth(0.1, 0.5, v) * smooth(0, 0.22, u) * smooth(1, 0.78, u);
      img.data[i] = 24;
      img.data[i + 1] = 15;
      img.data[i + 2] = 10;
      img.data[i + 3] = 255 * 0.62 * fade * (0.55 + Math.random() * 0.45);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new CanvasTexture(cv);
  tex.encoding = sRGBEncoding;
  return tex;
}

export function makeMan(scene: Scene): Man {
  const man = new Group();
  const mat = (color: string, o: MeshStandardMaterialParameters = {}) =>
    new MeshStandardMaterial({ color, roughness: 0.62, metalness: 0, ...o });
  const skin = mat("#9a6a45");
  const skinDark = mat("#7f5436");
  const hair = mat("#17130f", { roughness: 0.8 });
  const dark = mat("#120f0c", { roughness: 0.4 });
  const stubble = new MeshStandardMaterial({ map: stubbleTexture(), transparent: true, roughness: 1, depthWrite: false });
  const hoodie = mat("#3ddc97");
  const trim = mat("#2fae78");
  const pants = mat("#39424e");
  const shoe = mat("#e6edf3");
  const metal = mat("#8b98a5", { roughness: 0.35, metalness: 0.5 });
  const accent = mat("#ffb454", { emissive: "#ffb454", emissiveIntensity: 0.35 });

  const add = (parent: Object3D, geo: BufferGeometry, m: Material, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) => {
    const o = new Mesh(geo, m);
    o.position.set(x, y, z);
    o.scale.set(sx, sy, sz);
    parent.add(o);
    return o;
  };
  const sph = (r: number) => new SphereGeometry(r, 32, 24);
  const cap = (r: number, l: number) => new CapsuleGeometry(r, l, 8, 20);

  const hips = new Group();
  hips.position.y = 0.82;
  man.add(hips);

  // Thigh, knee, shin, ankle, foot: each segment is .36 long, so legs can really bend and plant.
  const knees: Group[] = [];
  const ankles: Group[] = [];
  const legs = [-1, 1].map((s) => {
    const g = new Group();
    g.position.set(s * 0.17, 0, 0);
    hips.add(g);
    add(g, cap(0.135, 0.2), pants, 0, -0.18, 0);
    const knee = new Group();
    knee.position.y = -0.36;
    g.add(knee);
    add(knee, cap(0.122, 0.2), pants, 0, -0.18, 0);
    const ankle = new Group();
    ankle.position.y = -0.36;
    knee.add(ankle);
    add(ankle, sph(0.165), shoe, 0, 0, 0.06, 1, 0.62, 1.55);
    knees.push(knee);
    ankles.push(ankle);
    return g;
  });

  const torso = new Group();
  hips.add(torso);
  add(torso, cap(0.34, 0.42), hoodie, 0, 0.36, 0, 1, 1, 0.78);
  add(torso, new TorusGeometry(0.2, 0.085, 12, 28), trim, 0, 0.76, -0.04).rotation.x = Math.PI / 2;
  add(torso, cap(0.012, 0.13), shoe, -0.07, 0.55, 0.265);
  add(torso, cap(0.012, 0.13), shoe, 0.07, 0.55, 0.265);
  add(torso, new CylinderGeometry(0.11, 0.12, 0.16, 20), skin, 0, 0.82, 0);

  const logoCv = document.createElement("canvas");
  logoCv.width = 128;
  logoCv.height = 64;
  const logoTex = new CanvasTexture(logoCv);
  logoTex.encoding = sRGBEncoding;
  add(torso, new PlaneGeometry(0.3, 0.15), new MeshBasicMaterial({ map: logoTex, transparent: true }), 0, 0.36, 0.268);
  add(torso, sph(0.2), trim, 0, 0.03, 0.22, 1.05, 0.42, 0.2);

  const head = new Group();
  head.position.y = 1.32;
  torso.add(head);
  add(head, sph(0.52), skin, 0, 0, 0, 1, 0.97, 0.95);
  add(head, new SphereGeometry(0.524, 40, 20, 0, Math.PI, Math.PI * 0.5, Math.PI * 0.5), stubble, 0, 0, 0, 1, 0.97, 0.95);
  [-1, 1].forEach((s) => add(head, sph(0.09), skin, s * 0.52, -0.02, 0, 0.6, 1, 0.8));
  add(head, sph(0.05), skinDark, 0, -0.05, 0.505, 1, 0.9, 1);

  // Short, neat: a close cap, then thin overlapping tufts that follow the skull to form a soft hairline
  // and a swept side part. Each tuft lies flat on the surface, so nothing reads as a hat brim.
  add(head, new SphereGeometry(0.535, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.47), hair, 0, 0, -0.01, 1, 0.97, 0.96).rotation.x = -0.42;
  const zAxis = new Vector3(0, 0, 1);
  const tuft = (azDeg: number, elDeg: number, r: number, sx: number, sy: number, sz: number, roll = 0) => {
    const az = (azDeg * Math.PI) / 180;
    const el = (elDeg * Math.PI) / 180;
    const n = new Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
    const t = add(head, sph(r), hair, n.x * 0.525, n.y * 0.51, n.z * 0.5, sx, sy, sz);
    t.quaternion.setFromUnitVectors(zAxis, n);
    t.rotateZ(roll);
  };
  for (let az = -66; az <= 66; az += 22) tuft(az, 44 + Math.abs(az) * 0.1, 0.12, 1.3, 0.85, 0.34);
  tuft(24, 62, 0.2, 1.65, 0.9, 0.36, -0.18);
  tuft(-36, 66, 0.15, 1.45, 0.85, 0.34, 0.22);
  tuft(4, 76, 0.17, 1.5, 0.9, 0.34, -0.1);
  // Back and nape, so the hair doesn't stop short when the character walks side-on.
  tuft(180, -8, 0.3, 1.35, 1.05, 0.22);
  tuft(135, 2, 0.26, 1.1, 1.15, 0.22);
  tuft(-135, 2, 0.26, 1.1, 1.15, 0.22);
  tuft(100, 18, 0.2, 1, 1, 0.24);
  tuft(-100, 18, 0.2, 1, 1, 0.24);
  [-1, 1].forEach((s) => add(head, sph(0.13), hair, s * 0.485, 0.12, -0.03, 0.28, 0.95, 1.25));

  const eyes = [-1, 1].map((s) => {
    const g = new Group();
    g.position.set(s * 0.2, 0.05, 0.48);
    head.add(g);
    add(g, sph(0.058), dark, 0, 0, 0, 1, 1.2, 0.5);
    add(g, sph(0.016), new MeshBasicMaterial({ color: "#ffffff" }), 0.018, 0.025, 0.026);
    return g;
  });
  [-1, 1].forEach((s) => {
    const brow = add(head, cap(0.016, 0.11), hair, s * 0.2, 0.23, 0.47);
    brow.rotation.z = Math.PI / 2 + s * 0.08;
  });

  const frame = mat("#15181c", { roughness: 0.3 });
  const lens = new MeshStandardMaterial({ color: "#cfe8ff", transparent: true, opacity: 0.12, roughness: 0.1, depthWrite: false });
  [-1, 1].forEach((s) => {
    add(head, new TorusGeometry(0.13, 0.014, 10, 32), frame, s * 0.2, 0.05, 0.505);
    add(head, new CircleGeometry(0.12, 28), lens, s * 0.2, 0.05, 0.505);
    // Temple arm from the hinge back to the ear.
    const a = new Vector3(s * 0.33, 0.07, 0.5);
    const b = new Vector3(s * 0.535, 0.03, 0.02);
    const arm = add(head, new CylinderGeometry(0.011, 0.011, a.distanceTo(b), 8), frame);
    arm.position.copy(a).add(b).multiplyScalar(0.5);
    arm.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), b.clone().sub(a).normalize());
  });
  add(head, new CylinderGeometry(0.012, 0.012, 0.14, 8), frame, 0, 0.07, 0.515).rotation.z = Math.PI / 2;

  // Mouth pieces are shaped to the curve of the face, so they lie on the skin instead of floating in front of it.
  const faceZ = (x: number, y: number) => 0.95 * Math.sqrt(Math.max(0.001, 0.526 * 0.526 - x * x - (y / 0.97) * (y / 0.97)));
  const lip = new MeshStandardMaterial({ color: "#2e140e", roughness: 0.7 });
  // Resting: a shallow closed smile, with rounded ends.
  const pts: Vector3[] = [];
  for (let i = -6; i <= 6; i++) {
    const u = i / 6;
    const x = u * 0.085;
    const y = -0.19 + 0.03 * u * u;
    pts.push(new Vector3(x, y, faceZ(x, y) + 0.003));
  }
  const closed = add(head, new TubeGeometry(new CatmullRomCurve3(pts), 24, 0.0105, 8, false), lip);
  [pts[0], pts[12]].forEach((p) => add(closed, sph(0.0105), lip, p.x, p.y, p.z));
  // Happy: an open smile with a band of teeth.
  const curved = (shape: Shape, ax: number, ay: number, lift: number) => {
    const g = new ShapeGeometry(shape, 18);
    const a = g.attributes.position as BufferAttribute;
    for (let i = 0; i < a.count; i++) a.setZ(i, faceZ(ax + a.getX(i), ay + a.getY(i)) + lift);
    g.computeVertexNormals();
    return g;
  };
  const mouthShape = new Shape();
  mouthShape.moveTo(-0.105, 0.03);
  mouthShape.quadraticCurveTo(0, -0.004, 0.105, 0.03);
  mouthShape.quadraticCurveTo(0, -0.165, -0.105, 0.03);
  const teethShape = new Shape();
  teethShape.moveTo(-0.082, 0.019);
  teethShape.quadraticCurveTo(0, -0.006, 0.082, 0.019);
  teethShape.quadraticCurveTo(0, -0.05, -0.082, 0.019);
  const open = new Group();
  open.position.set(0, -0.2, 0);
  head.add(open);
  add(open, curved(mouthShape, 0, -0.2, 0.004), new MeshStandardMaterial({ color: "#2a0f0b", roughness: 0.8 }));
  add(open, curved(teethShape, 0, -0.2, 0.007), new MeshStandardMaterial({ color: "#f3ede4", roughness: 0.5 }));
  open.visible = false;

  const elbows: Group[] = [];
  const arms = [-1, 1].map((s) => {
    const g = new Group();
    g.position.set(s * 0.42, 0.62, 0);
    torso.add(g);
    add(g, cap(0.105, 0.18), hoodie, 0, -0.15, 0);
    const elbow = new Group();
    elbow.position.y = -0.3;
    g.add(elbow);
    add(elbow, cap(0.096, 0.14), hoodie, 0, -0.13, 0);
    add(elbow, sph(0.11), skin, 0, -0.28, 0);
    elbows.push(elbow);
    return g;
  });
  // Laptop tucked under the character's left arm (viewer's right), fixed to the body so it stays put in a jump.
  const laptop = new Group();
  laptop.position.set(0.49, 0.2, 0.13);
  laptop.rotation.set(0.1, -0.25, 0);
  torso.add(laptop);
  add(laptop, new BoxGeometry(0.5, 0.36, 0.035), metal);
  add(laptop, new BoxGeometry(0.07, 0.07, 0.006), accent, 0, 0, 0.021);

  const puffs: Puff[] = Array.from({ length: 10 }, () => {
    const mesh = new Mesh(new SphereGeometry(0.07, 10, 8), new MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
    mesh.visible = false;
    scene.add(mesh);
    return { mesh, life: 0, vx: 0, vy: 0, vz: 0 };
  });
  scene.add(man);

  return {
    man, hips, torso, head, legs, knees, ankles, arms, elbows, eyes,
    mouth: { closed, open },
    puffs,
    mats: { hoodie, trim, pants, shoe, accent },
    logoCv, logoTex,
    dustColor: "#e6edf3",
    yaw: 0.35, blinkT: 2, blink: 0, t: 0, openSmile: 0, look: null, jump: null,
  };
}

// Recolor the character from the site's active theme.
export function applyTheme(m: Man, css: (name: string) => string) {
  const green = css("green");
  m.mats.hoodie.color.set(green);
  m.mats.trim.color.set(green).multiplyScalar(0.72);
  m.mats.accent.color.set(css("amber"));
  m.mats.accent.emissive.set(css("amber"));
  m.mats.shoe.color.set(css("fg"));
  m.mats.pants.color.copy(new Color(css("dim"))).multiplyScalar(0.5);
  m.dustColor = css("fg");
  const c = m.logoCv.getContext("2d")!;
  c.clearRect(0, 0, 128, 64);
  c.fillStyle = css("bg");
  c.font = "700 50px JetBrains Mono, monospace";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillText(">_", 64, 34);
  m.logoTex.needsUpdate = true;
}
