// @ts-nocheck
import { FAMILIES } from "./data";
import { openCookiePreferences } from "@/lib/consent";

// Tutto il comportamento della home. Restituisce la funzione di pulizia.
export function initHome() {
const ac = new AbortController(), { signal } = ac;
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;


/* Nav */
const nav = $('#nav'), menuBtn = $('#menuBtn'), menuPanel = $('#menuPanel');
const closeMenu = () => { menuPanel.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); };
menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menuPanel.hidden = !menuPanel.hidden; menuBtn.setAttribute('aria-expanded', String(!menuPanel.hidden)); });
document.addEventListener('click', closeMenu, { signal });
function navTheme() { nav.classList.toggle('scrolled', scrollY > 24); }

/* Story */
const story = $('#story'), stage = $('#stage'), skFlip = $('#skFlip'), skFront = $('#skFront'), skBack = $('#skBack');
const coinEl = $('#coin'), beats = [...document.querySelectorAll('.beat')], hint = $('#scrollHint');
let coin = null;

function frame() {
  navTheme();
  if (reduced) return;
  const r = story.getBoundingClientRect();
  const p = clamp(-r.top / (r.height - innerHeight));
    hint.style.opacity = p > .015 ? 0 : 1;

  const angle = smooth(.22, .38, p) * Math.PI + smooth(.62, .78, p) * Math.PI;
  stage.style.transform = `scale(${1 - smooth(.8, 1, p) * .06})`;
  const cos = Math.cos(angle);
  skFlip.style.transform = `scaleX(${Math.max(Math.abs(cos), .012)})`;
  skFront.style.display = cos >= 0 ? '' : 'none';
  skBack.style.display = cos < 0 ? '' : 'none';

  coinEl.style.opacity = coin ? 1 : 0;
  skFlip.style.opacity = coin ? 0 : 1;
  coin?.setAngle(angle);

  for (const b of beats) {
    const i = +b.dataset.in, o = +b.dataset.out;
    const a = smooth(i - .025, i + .015, p) * (1 - smooth(o - .015, o + .02, p));
    b.style.opacity = a;
    b.style.pointerEvents = a > .5 ? 'auto' : 'none';
    b.style.transform = `translateY(${(1 - smooth(i - .025, i + .015, p)) * 26 - smooth(o - .015, o + .02, p) * 26}px)`;
  }
}
let ticking = false;
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; frame(); }); } };
addEventListener('scroll', onScroll, { passive: true, signal });
addEventListener('resize', onScroll, { signal });
frame();

if (matchMedia('(pointer:fine)').matches && !reduced) {
  addEventListener('pointermove', (e) => {
    coin?.setTilt((e.clientY / innerHeight - .5) * .12, (e.clientX / innerWidth - .5) * .16);
  }, { passive: true, signal });
}

// La medaglia è un miglioramento: se WebGL manca, resta il disegno.
if (!reduced) {
  import('./coin').then(({ createCoin }) => createCoin(coinEl)).then((c) => { if (signal.aborted) return c.dispose(); coin = c; frame(); }).catch((e) => console.warn('coin off', e));
}

/* Film */
const film = $('#film'), bars = $('#filmBars'), body = $('#filmBody');
const CH_MS = [4200, 6500, 15000, 16000, 0];
let fam = 0, ch = 0, timer = 0, t0 = 0, opener = null, raf = 0, sub = 0;

function chapter() {
  const f = FAMILIES[fam], e = f.ex;
  if (ch === 0) return `<div class="ch"><h2 class="ch-title">${f.title.replace(/<b>(.*?)<\/b>/, '<em>$1</em>')}</h2></div>`;
  if (ch === 1) return `<div class="ch"><p class="mono">Il problema tipico</p><p class="ch-big">${f.problem}</p></div>`;
  if (ch === 2) return `<div class="ch"><p class="mono">Cosa facciamo · un esempio</p><h2 class="ch-big">${e.title}</h2>
    <div class="demo" id="demo"></div>
    <ol class="ch-points" id="pts">${e.points.map((x, i) => `<li><span class="mono">0${i + 1}</span>${x}</li>`).join('')}</ol>
    <p class="ch-note">Esempio inventato. Tu controlli e decidi: il sistema prepara.</p></div>`;
  if (ch === 3) return `<div class="ch"><p class="mono">Dove lo usiamo</p><h2 class="ch-big">Tocca il <em>tuo</em>.</h2>
    <div class="chips">${f.chips.map((c, i) => `<button class="chip" data-chip="${i}" aria-pressed="${i === 0}">${c[0]}</button>`).join('')}</div><div class="chip-out" id="chipOut"></div></div>`;
  return `<div class="ch"><h2 class="ch-big">Parliamo del <em>tuo</em> caso.</h2><p style="color:var(--muted);margin-top:10px">Due righe bastano per cominciare.</p>
    <div class="ch-cta"><button class="btn btn-copper" id="filmTalk">Parliamone</button><button class="link" id="filmExit">Torna al racconto</button></div></div>`;
}
function demoStage(n) {
  const e = FAMILIES[fam].ex, d = $('#demo'); if (!d) return;
  if (n === 0) {
    d.innerHTML = `<div class="demo-msg">${e.msg[0]}<small>${e.msg[1]}</small></div><div class="demo-grid">
      <div class="demo-doc"><strong>${e.doc[0]}</strong>${e.doc[1].map(([k, v], i) => `<div style="--i:${i}"><span>${k}</span><span>${v}</span></div>`).join('')}</div>
      <div class="demo-fields">${e.fields.map(([k, v], i) => `<div style="--i:${i}"><small>${k}</small>${v}</div>`).join('')}</div></div>`;
  } else {
    const [t, s, rows, foot] = e.sheet;
    d.innerHTML = `<div class="demo-sheet ch"><header>${t}<small>${s}</small></header>${rows.map(([a, b, w], i) => `<div class="demo-row${w ? ' warn' : ''}" style="--i:${i}"><span>${a}</span><em>${b}</em></div>`).join('')}<p class="demo-foot">${foot}</p></div>`;
  }
}
function setPts(i) { document.querySelectorAll('#pts li').forEach((l, k) => l.classList.toggle('on', k === i)); }
function setChip(i) {
  const c = FAMILIES[fam].chips[i];
  document.querySelectorAll('.chip').forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
  $('#chipOut').innerHTML = `<p class="mono">${c[0]}</p><p>${c[1]}</p><a class="link" href="${c[2]}">Approfondisci →</a>`;
}
function clearTimers() { clearTimeout(timer); clearTimeout(sub); cancelAnimationFrame(raf); }
function renderCh() {
  clearTimers();
  body.innerHTML = chapter();
  film.scrollTop = 0;
  [...bars.children].forEach((b, i) => b.style.setProperty('--p', i < ch ? '100%' : '0%'));
  const dur = reduced ? 0 : CH_MS[ch];
  if (ch === 2) {
    demoStage(0); setPts(0);
    if (!reduced) { sub = setTimeout(() => { setPts(1); sub = setTimeout(() => { demoStage(1); setPts(2); }, 3400); }, 3400); }
    else { setPts(-1); }
  }
  if (ch === 3) setChip(0);
  if (!dur) { if (ch < 4) bars.children[ch].style.setProperty('--p', '100%'); return; }
  t0 = performance.now();
  const bar = bars.children[ch];
  const tick = (t) => { bar.style.setProperty('--p', `${clamp((t - t0) / dur) * 100}%`); if (t - t0 < dur) raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);
  timer = setTimeout(() => go(1), dur);
}
function go(d) { const n = ch + d; if (n < 0) return; if (n > 4) return; ch = n; renderCh(); }
function openFilm(i, btn) {
  fam = i; ch = 0; opener = btn;
  bars.innerHTML = '<i></i>'.repeat(5);
  film.hidden = false; document.documentElement.style.overflow = 'hidden';
  renderCh(); film.focus();
}
function closeFilm() {
  clearTimers(); film.hidden = true; document.documentElement.style.overflow = ''; opener?.focus();
}
$('#filmBack').addEventListener('click', () => (ch > 0 ? go(-1) : closeFilm()));
$('#filmPrev').addEventListener('click', () => go(-1));
$('#filmNext').addEventListener('click', () => go(1));

/* Form */
const form = $('#contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const d = new FormData(form), btn = form.querySelector('button[type=submit]');
  btn.disabled = true;
  try {
    const res = await fetch('/api/lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: d.get('name'), email: d.get('email'), phone: d.get('phone'), sector: d.get('problem'), source: 'poweragency.it home' }),
    });
    if (!res.ok) throw new Error('lead');
    $('#formFields').hidden = true; $('#formDone').hidden = false;
  } catch {
    btn.disabled = false;
    $('#formNote').innerHTML = 'Invio non riuscito. Riprova o scrivici a <a href="mailto:info@poweragency.it">info@poweragency.it</a>.';
  }
}, { signal });
$('#cookiePrefs').addEventListener('click', () => openCookiePreferences(), { signal });

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-film],[data-chip],#filmExit,#filmTalk');
  if (!t) return;
  if (t.dataset.film) openFilm(+t.dataset.film, t);
  else if (t.dataset.chip) { clearTimeout(timer); cancelAnimationFrame(raf); setChip(+t.dataset.chip); }
  else if (t.id === 'filmExit') closeFilm();
  else { closeFilm(); $('#contatti').scrollIntoView(); $('#contactForm input').focus({ preventScroll: true }); }
}, { signal });
addEventListener('keydown', (e) => {
  if (film.hidden) return;
  if (e.key === 'Escape') closeFilm();
  if (e.key === 'ArrowRight') go(1);
  if (e.key === 'ArrowLeft') go(-1);
}, { signal });

return () => { ac.abort(); clearTimers(); coin?.dispose(); document.documentElement.style.overflow = ''; };
}
