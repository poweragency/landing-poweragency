// Medaglia Power Agency: WebGL, nessuna immagine esterna. Il rilievo nasce da
// una mappa di altezza disegnata su canvas e convertita in normal map.
// @ts-nocheck
import * as THREE from 'three';

const SIZE = 1024;
const P = 'M165 330H395a115 115 0 0 1 0 230H255V700H165ZM255 405V485H390a40 40 0 0 0 0-80Z';
const A = 'M470 700 575 330H665L770 700H676L657 630H583L564 700ZM604 556H636L620 490Z';
const I = 'M790 430H875V700H790Z';
const RIBBON = 'M165 590C300 640 420 470 560 520 640 548 700 572 770 535L770 585C700 622 640 600 560 572 420 524 300 690 165 640Z';

function canvas() { const c = document.createElement('canvas'); c.width = c.height = SIZE; return c; }
function scaled(ctx) { ctx.setTransform(SIZE / 1000, 0, 0, SIZE / 1000, 0, 0); }

function drawNode(ctx, color) {
  ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = 7;
  const pts = [[0, 0], ...Array.from({ length: 6 }, (_, i) => {
    const a = i * Math.PI / 3 + Math.PI / 6; return [Math.cos(a) * 58, Math.sin(a) * 58];
  })];
  ctx.save(); ctx.translate(815, 345);
  pts.slice(1).forEach((p, i) => {
    const n = pts[(i + 1) % 6 + 1];
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(p[0], p[1]); ctx.lineTo(n[0], n[1]); ctx.stroke();
  });
  pts.forEach(([x, y], i) => { ctx.beginPath(); ctx.arc(x, y, i ? 12 : 20, 0, 7); ctx.fill(); });
  ctx.restore();
}

function frontHeight() {
  const c = canvas(), x = c.getContext('2d'); scaled(x);
  x.fillStyle = '#505050'; x.fillRect(0, 0, 1000, 1000);
  x.translate(-17, 0);
  x.fillStyle = '#fff';
  [P, A, I].forEach((d) => x.fill(new Path2D(d), 'evenodd'));
  x.fillStyle = '#505050'; x.strokeStyle = '#505050'; x.lineWidth = 22; x.stroke(new Path2D(RIBBON));
  x.fillStyle = '#d4d4d4'; x.fill(new Path2D(RIBBON));
  drawNode(x, '#fff');
  return c;
}
function frontColor() {
  const c = canvas(), x = c.getContext('2d'); scaled(x);
  x.fillStyle = '#2c4a86'; x.fillRect(0, 0, 1000, 1000);
  x.translate(-17, 0);
  x.fillStyle = '#f4f5f6'; [P, A, I].forEach((d) => x.fill(new Path2D(d), 'evenodd'));
  x.fillStyle = '#ee9650'; x.fill(new Path2D(RIBBON));
  drawNode(x, '#ee9650');
  return c;
}
function arcText(x, text, radius, size) {
  x.font = `600 ${size}px Helvetica,Arial,sans-serif`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  const chars = [...text];
  const step = (Math.PI * 2) / chars.length;
  chars.forEach((ch, i) => {
    x.save(); x.translate(500, 500); x.rotate(i * step); x.translate(0, -radius); x.fillText(ch, 0, 0); x.restore();
  });
}
function backArt(bg, fg) {
  const c = canvas(), x = c.getContext('2d'); scaled(x);
  x.fillStyle = bg; x.fillRect(0, 0, 1000, 1000);
  x.fillStyle = fg;
  arcText(x, 'SITO  ·  LEAD GENERATION  ·  CRM  ·  AUTOMAZIONE AI  ·  ', 395, 46);
  x.strokeStyle = fg; x.lineWidth = 7;
  x.beginPath(); x.arc(500, 500, 330, 0, 7); x.stroke();
  x.font = '500 62px Helvetica,Arial,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  if ('letterSpacing' in x) x.letterSpacing = '18px';
  x.fillText('POWER', 508, 462); x.fillText('AGENCY', 508, 544);
  return c;
}
const backHeight = () => backArt('#606060', '#fff');
const backColor = () => backArt('#2c4a86', '#f2f3f5');

// Altezza -> normal map, con doppia sfocatura per avere una smussatura da conio.
function normalFrom(src, strength) {
  const data = src.getContext('2d').getImageData(0, 0, SIZE, SIZE).data;
  let h = new Float32Array(SIZE * SIZE);
  for (let i = 0; i < h.length; i++) h[i] = data[i * 4] / 255;
  const blur = (a, r) => {
    const out = new Float32Array(a.length), tmp = new Float32Array(a.length), w = 2 * r + 1;
    for (let y = 0; y < SIZE; y++) {
      let s = 0;
      for (let x = -r; x <= r; x++) s += a[y * SIZE + Math.min(SIZE - 1, Math.max(0, x))];
      for (let x = 0; x < SIZE; x++) {
        tmp[y * SIZE + x] = s / w;
        s += a[y * SIZE + Math.min(SIZE - 1, x + r + 1)] - a[y * SIZE + Math.max(0, x - r)];
      }
    }
    for (let x = 0; x < SIZE; x++) {
      let s = 0;
      for (let y = -r; y <= r; y++) s += tmp[Math.min(SIZE - 1, Math.max(0, y)) * SIZE + x];
      for (let y = 0; y < SIZE; y++) {
        out[y * SIZE + x] = s / w;
        s += tmp[Math.min(SIZE - 1, y + r + 1) * SIZE + x] - tmp[Math.max(0, y - r) * SIZE + x];
      }
    }
    return out;
  };
  h = blur(blur(h, 3), 2);
  const c = canvas(), x = c.getContext('2d'), img = x.createImageData(SIZE, SIZE), d = img.data;
  for (let py = 0; py < SIZE; py++) for (let px = 0; px < SIZE; px++) {
    const l = h[py * SIZE + Math.max(px - 1, 0)], r = h[py * SIZE + Math.min(px + 1, SIZE - 1)];
    const u = h[Math.max(py - 1, 0) * SIZE + px], b = h[Math.min(py + 1, SIZE - 1) * SIZE + px];
    const nx = (l - r) * strength, ny = (b - u) * strength, nz = 1, len = Math.hypot(nx, ny, nz);
    const i = (py * SIZE + px) * 4;
    d[i] = (nx / len * .5 + .5) * 255; d[i + 1] = (ny / len * .5 + .5) * 255; d[i + 2] = (nz / len * .5 + .5) * 255; d[i + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  return c;
}

function studio(renderer) {
  const s = new THREE.Scene();
  s.background = new THREE.Color(0x0b0b0b);
  const box = (w, h, col, i, p) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(i), side: THREE.DoubleSide }));
    m.position.set(...p); m.lookAt(0, 0, 0); s.add(m);
  };
  box(7, 3, '#ffffff', 7, [0, 7, 5]);
  box(3, 8, '#ffffff', 3.5, [-8, 0, 4]);
  box(2.5, 7, '#ffe2c8', 3, [8, -1, 4]);
  box(9, 1.5, '#ffffff', 1.4, [0, -6, 5]);
  // Fondale davanti alla medaglia: è lui che si riflette quando la faccia guarda la camera.
  const g = document.createElement('canvas'); g.width = g.height = 256;
  const gx = g.getContext('2d'), lg = gx.createLinearGradient(0, 0, 256, 256);
  [[0, '#8a8c8f'], [.32, '#f4f5f6'], [.5, '#55575a'], [.72, '#c9cbce'], [1, '#2c2d2f']].forEach(([o, c]) => lg.addColorStop(o, c));
  gx.fillStyle = lg; gx.fillRect(0, 0, 256, 256);
  const gt = new THREE.CanvasTexture(g); gt.colorSpace = THREE.SRGBColorSpace;
  const back = new THREE.Mesh(new THREE.PlaneGeometry(22, 22), new THREE.MeshBasicMaterial({ map: gt, side: THREE.DoubleSide, color: new THREE.Color(2.2, 2.2, 2.3) }));
  back.position.set(0, 0, 11); back.lookAt(0, 0, 0); s.add(back);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(s, .025);
  pm.dispose();
  return rt.texture;
}

export async function createCoin(el) {
  await Promise.all([document.fonts.ready]);
  const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  scene.environment = studio(renderer);
  const cam = new THREE.PerspectiveCamera(22, 1, .1, 30);
  cam.position.z = 1.25 / Math.tan(THREE.MathUtils.degToRad(11));

  const tex = (c, srgb) => {
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const face = (color, height, str) => new THREE.MeshStandardMaterial({
    map: tex(color, true), normalMap: tex(normalFrom(height, str)), metalness: 1, roughness: .19,
  });
  const steel = new THREE.MeshStandardMaterial({ color: 0xe2b98e, metalness: 1, roughness: .24 });

  const coin = new THREE.Group();
  const R = 1, Fr = .9, Th = .07;
  const prof = [[0, -Th * .8], [Fr, -Th * .8], [Fr + .012, -Th * 1.25], [R - .03, -Th * 1.4], [R, -Th * 1.05], [R, Th * 1.05], [R - .03, Th * 1.4], [Fr + .012, Th * 1.25], [Fr, Th * .8], [0, Th * .8]]
    .map(([x, y]) => new THREE.Vector2(x, y));
  const body = new THREE.Mesh(new THREE.LatheGeometry(prof, 128), steel);
  body.rotation.x = Math.PI / 2;
  coin.add(body);

  const cg = new THREE.CircleGeometry(Fr, 128);
  const f = new THREE.Mesh(cg, face(frontColor(), frontHeight(), 9));
  f.position.z = Th * .8 + .001;
  const b = new THREE.Mesh(cg, face(backColor(), backHeight(), 7));
  b.position.z = -(Th * .8 + .001); b.rotation.y = Math.PI;
  coin.add(f, b);

  const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(.0085, 10, 8), steel, 280);
  const m = new THREE.Matrix4();
  for (let i = 0; i < 280; i++) {
    const a = i / 140 * Math.PI, side = i % 2 ? 1 : -1;
    m.makeTranslation(Math.cos(a) * .95, Math.sin(a) * .95, side * Th * 1.38);
    beads.setMatrixAt(i, m);
  }
  coin.add(beads);
  scene.add(coin);

  let stopped = false, dirty = true, angle = 0, tiltX = 0, tiltY = 0, lastW = 0;
  const resize = () => {
    const w = el.clientWidth; if (!w || w === lastW) return;
    lastW = w; renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(w, w, false); dirty = true;
  };
  resize();
  new ResizeObserver(resize).observe(el);
  const loop = () => {
    if (dirty) {
      coin.rotation.set(tiltX, angle + tiltY, 0);
      scene.environmentRotation.y = Math.sin(angle) * .5;
      renderer.render(scene, cam); dirty = false;
    }
    if (!stopped) requestAnimationFrame(loop);
  };
  loop();
  return {
    dispose() { stopped = true; renderer.dispose(); },
    setAngle(a) { if (a !== angle) { angle = a; dirty = true; } },
    setTilt(x, y) { tiltX = x; tiltY = y; dirty = true; },
  };
}
