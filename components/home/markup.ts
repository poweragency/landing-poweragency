// @ts-nocheck
import { ICONS, FAMILIES, TEAM, FAQ } from "./data";

const cards = FAMILIES.map((f, i) => `
  <article class="card">
    <div class="card-top"><svg viewBox="0 0 52 52" aria-hidden="true">${ICONS[f.icon]}</svg><span class="mono">0${i + 1} / 04</span></div>
    <h3>${f.title.replace(/<b>(.*?)<\/b>/, '<em>$1</em>')}</h3><p>${f.short}</p>
    <div class="tags">${f.tags.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</div>
    <button class="card-film" data-film="${i}"><span>Guarda il film</span><i aria-hidden="true">→</i></button>
  </article>`).join('');
const faq = FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');
function buildOrbit() {
  const n = TEAM.length, R = 39;
  const lines = TEAM.map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return `<line x1="${50 + 18 * Math.cos(a)}" y1="${50 + 18 * Math.sin(a)}" x2="${50 + R * Math.cos(a)}" y2="${50 + R * Math.sin(a)}"/>`; }).join('');
  const nodes = TEAM.map(([nm, role], i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n;
    return `<div class="onode" style="left:${50 + R * Math.cos(a)}%;top:${50 + R * Math.sin(a) + 2.4}%"><span>${nm}</span><small>${role}</small></div>`;
  }).join('');
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="${R}" vector-effect="non-scaling-stroke"/>${lines}</svg><div class="orbit-c"><span class="mono">Un team</span><strong>Un sistema solo</strong></div>${nodes}`;
}
const orbit = buildOrbit();

export const HOME_HTML = `<header class="nav" id="nav">
  <a class="nav-brand" href="/" aria-label="Power Agency, home"><svg viewBox="0 0 1000 1000" aria-hidden="true"><use href="#emblem-mini"/></svg><span>Power Agency</span></a>
  <nav class="nav-links" aria-label="Principale">
    <a href="#famiglie">Servizi</a><a href="#metodo">Metodo</a><a href="/software">Software</a><a href="/ecommerce">Ecommerce</a><a href="/blog">Blog</a>
  </nav>
  <a class="btn btn-copper nav-cta" href="#contatti">Parliamone</a>
  <div class="nav-menu">
    <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="menuPanel">Menu <span class="menu-ico" aria-hidden="true"></span></button>
    <nav class="menu-panel" id="menuPanel" hidden>
      <a href="#famiglie">Servizi</a><a href="#metodo">Metodo</a><a href="/software">Software</a><a href="/ecommerce">Ecommerce</a><a href="/shop">Shop</a><a href="/blog">Blog</a><a href="#contatti">Contatti</a>
    </nav>
  </div>
</header>


<main id="top">
  
  <section class="story dark" id="story" aria-label="Chi siamo">
    <div class="story-pin">
      <div class="stage" id="stage">
        <svg class="sketch" id="sketch" viewBox="0 0 1000 1000" aria-hidden="true">
          <defs>
            <filter id="chalk" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/>
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4"/>
            </filter>
            <symbol id="emblem-mini" viewBox="0 0 1000 1000">
              <g fill="none" stroke="currentColor" stroke-width="16">
                <circle cx="500" cy="500" r="460"/><circle cx="500" cy="500" r="405" stroke-width="7"/>
                <g transform="translate(-17 0)" stroke-width="12"><path d="M165 330H395a115 115 0 0 1 0 230H255V700H165ZM255 405V485H390a40 40 0 0 0 0-80Z"/><path d="M470 700 575 330H665L770 700H676L657 630H583L564 700ZM604 556H636L620 490Z"/><path d="M790 430H875V700H790Z"/></g>
              </g>
            </symbol>
          </defs>
          <g class="sk-static" filter="url(#chalk)">
            <g class="sk-guides">
              <path class="draw" pathLength="1" d="M60 500H940M500 40V960"/>
              <path class="draw" pathLength="1" d="M120 330 880 110"/>
              <path class="draw" pathLength="1" d="M140 240C240 90 440 40 640 120"/>
              <path class="draw" pathLength="1" d="M860 620C850 720 790 800 720 860"/>
              <path class="draw" pathLength="1" d="M195 70H805M195 50V90M805 50V90"/>
              <path class="draw" pathLength="1" d="M175 185H225M200 160V210M775 185H825M800 160V210M175 815H225M200 790V840M775 815H825M800 790V840"/>
            </g>
          </g>
                    <g id="skFlip" class="sk-flip">
            <g filter="url(#chalk)">
              <circle class="draw strong" pathLength="1" cx="500" cy="500" r="400"/>
              <circle class="draw" pathLength="1" cx="500" cy="500" r="362"/>
              <g id="skFront">
                <g class="draw-group" transform="translate(-17 0)">
                  <path class="draw strong" pathLength="1" d="M165 330H395a115 115 0 0 1 0 230H255V700H165ZM255 405V485H390a40 40 0 0 0 0-80Z"/>
                  <path class="draw strong" pathLength="1" d="M470 700 575 330H665L770 700H676L657 630H583L564 700ZM604 556H636L620 490Z"/>
                  <path class="draw strong" pathLength="1" d="M790 430H875V700H790Z"/>
                  <path class="draw copper" pathLength="1" d="M165 610C300 650 420 500 560 545 640 572 700 590 770 560"/>
                  <circle class="draw copper" pathLength="1" cx="832" cy="345" r="52"/>
                  <path class="draw copper" pathLength="1" d="M832 293V397M780 345H884M795 308 869 382M869 308 795 382"/>
                </g>
              </g>
              <g id="skBack" style="display:none">
                <circle class="draw" pathLength="1" cx="500" cy="500" r="60"/>
                <path class="draw" pathLength="1" d="M500 140V440M500 560V860M188 320 448 470M552 530 812 680M188 680 448 530M552 470 812 320"/>
              </g>
            </g>
          </g>
        </svg>
        <canvas class="coin" id="coin" aria-hidden="true"></canvas>
              </div>

      <div class="beats">
        <div class="beat" data-in="-1" data-out=".27">
          <h1>Se non funziona sul <em>nostro</em> business, non lo portiamo fuori.</h1>
          <p class="beat-sub">Costruiamo il sistema che porta clienti alla tua impresa, e prima di proportelo lo usiamo ogni giorno su di noi.</p>
          <div class="beat-cta"><a class="btn btn-copper" href="#contatti">Parliamone</a><a class="btn btn-ghost" href="#famiglie">Scopri i servizi</a></div>
        </div>
        <div class="beat" data-in=".37" data-out=".64">
          <p class="eyebrow">Il retro della medaglia</p>
          <p class="beat-h">Sito, lead, CRM. <em>Incisi</em>, non promessi.</p>
          <p class="beat-sub">Tre pezzi che di solito hanno tre fornitori diversi. Qui lavorano come una macchina sola.</p>
        </div>
        <div class="beat" data-in=".77" data-out="2">
          <p class="eyebrow">Il sistema</p>
          <p class="beat-h">Costruiamo il <em>sistema che porta clienti</em> alla tua impresa.</p>
          <p class="beat-sub">Con l'intelligenza artificiale che fa il lavoro ripetitivo.</p>
        </div>
      </div>
      <div class="scroll-hint" id="scrollHint">Scorri</div>
    </div>
  </section>

  <section class="stats" aria-label="I numeri">
    <div class="wrap stats-row">
      <div><strong>10.000€</strong><span>al giorno di ecommerce gestito</span></div>
      <div><strong>1.000+</strong><span>lead generati in un solo giorno</span></div>
      <div><strong>48 ore</strong><span>per un sito su misura online</span></div>
      <div><strong>5 clienti</strong><span>chiusi in due settimane da una carrozzeria</span></div>
    </div>
  </section>

  <section class="panel light" id="famiglie">
    <div class="wrap">
      <header class="sec-head">
        <p class="eyebrow">Cosa facciamo</p>
        <h2>Quattro famiglie. Trova la <em>tua</em>.</h2>
        <p>Puoi prenderle come sistema unico oppure una alla volta.</p>
      </header>
      <div class="cards" id="cards">${cards}</div>
    </div>
  </section>

  <section class="panel dark" id="metodo">
    <div class="wrap metodo">
      <div>
        <p class="eyebrow">Il metodo</p>
        <h2>Come <em>lavoriamo</em></h2>
        <ol class="steps">
          <li><span class="mono">01</span><h3>Ascolto</h3><p>Trenta minuti di call. Capiamo settore, offerta e come gestisci i contatti oggi.</p></li>
          <li><span class="mono">02</span><h3>Disegno</h3><p>Target, canali e messaggi, con costo per lead atteso e ritorno scritti prima di partire.</p></li>
          <li><span class="mono">03</span><h3>Costruzione</h3><p>Sito, campagne, qualifica AI e CRM, provati su traffico reale prima di andare online.</p></li>
          <li><span class="mono">04</span><h3>Ottimizzazione</h3><p>I lead entrano nel CRM e nelle prime settimane correggiamo sui dati, non sulle sensazioni.</p></li>
        </ol>
      </div>
      <aside class="proof">
        <p class="mono">Una carrozzeria, due settimane</p>
        <dl>
          <div><dt>60+</dt><dd>lead generati</dd></div>
          <div><dt>5</dt><dd>clienti chiusi</dd></div>
          <div><dt>15.000€</dt><dd>di fatturato</dd></div>
        </dl>
        <p class="proof-note">Numeri reali di un nostro cliente, con lo stesso sistema che costruiamo per te.</p>
      </aside>
    </div>
  </section>

  <section class="panel dark" id="team">
    <div class="wrap team">
      <div class="team-copy">
        <p class="eyebrow">Chi c'è dietro</p>
        <h2>Prima lo usiamo <em>noi</em>. Poi arriva a te.</h2>
        <p>Gestiamo ecommerce fino a 10.000€ al giorno ed è lì che proviamo ogni software. Chi costruisce il tuo sistema è la stessa persona che lo usa ogni giorno.</p>
        <div class="team-cta">
          <a class="btn btn-copper" href="#contatti">Parliamone</a>
          <a class="link" href="/software">I nostri software</a>
        </div>
      </div>
      <div class="orbit" id="orbit" role="group" aria-label="Il team di Power Agency">${orbit}</div>
    </div>
  </section>

  <section class="panel light" id="faq">
    <div class="wrap narrow">
      <p class="eyebrow">Domande frequenti</p>
      <h2>Le domande di <em>tutti</em>.</h2>
      <div class="faq" id="faqList">${faq}</div>
    </div>
  </section>

  <section class="panel dark contact" id="contatti">
    <div class="wrap contact-grid">
      <div>
        <p class="eyebrow">Contatti</p>
        <h2>Raccontaci il <em>problema</em> in due righe.</h2>
        <p class="contact-sub">Quattro campi, nient'altro. Ti rispondiamo a mano, e se non siamo le persone giuste te lo diciamo.</p>
        <p class="contact-mail"><a href="mailto:info@poweragency.it">info@poweragency.it</a></p>
      </div>
      <form id="contactForm" class="form-card">
        <div id="formFields">
          <label>Nome<input name="name" required maxlength="120" autocomplete="name"></label>
          <label>Email<input name="email" type="email" required maxlength="160" autocomplete="email"></label>
          <label>Telefono<input name="phone" type="tel" required maxlength="40" autocomplete="tel"></label>
          <label>Il problema, in una riga<input name="problem" required maxlength="240" autocomplete="off"></label>
          <button class="btn btn-dark" type="submit">Invia</button>
          <p class="form-note" id="formNote">Usiamo questi dati solo per risponderti. <a href="/privacy">Informativa</a></p>
        </div>
        <div id="formDone" hidden>
          <h3>Grazie, è arrivato.</h3>
          <p>Ti rispondiamo a mano, appena possibile.</p>
        </div>
      </form>
    </div>
  </section>
</main>

<footer class="footer dark">
  <div class="wrap">
    <p class="f-brand">Power Agency</p>
    <p class="f-legal">Power Agency di Vincenzo Amore · P.IVA 12497340963 · <a href="mailto:info@poweragency.it">info@poweragency.it</a></p>
    <div class="f-cols">
      <div><p class="mono">Servizi</p><a href="/agenzia-lead-generation">Lead generation</a><a href="/crm">Gestionali e CRM</a><a href="/gestionale-carrozzeria">Gestionale carrozzeria</a><a href="/ecosistema">Ecosistema</a></div>
      <div><p class="mono">Software</p><a href="https://powerleads.poweragency.it/">PowerLeads</a><a href="https://powersocial.poweragency.it/">PowerSocial</a><a href="https://powersite.vercel.app/">PowerLanding</a></div>
      <div><p class="mono">Verticali</p><a href="/ecommerce">Ecommerce</a><a href="/shop">Shop</a><a href="/blog">Blog</a></div>
    </div>
    <p class="f-bottom"><a href="/privacy">Privacy</a><a href="/cookie">Cookie</a><a href="/termini">Termini</a><a href="/dpa">DPA</a><button class="f-cookie" id="cookiePrefs">Preferenze cookie</button><span>© 2026 Power Agency di Vincenzo Amore</span></p>
  </div>
</footer>

<div class="film dark" id="film" hidden tabindex="-1" role="dialog" aria-modal="true" aria-label="Il film della famiglia">
  <div class="film-bars" id="filmBars"></div>
  <button class="film-back" id="filmBack">‹ Indietro</button>
  <div class="film-body" id="filmBody"></div>
  <button class="film-tap film-tap-l" id="filmPrev" aria-label="Capitolo precedente"></button>
  <button class="film-tap film-tap-r" id="filmNext" aria-label="Capitolo successivo"></button>
</div>`;
