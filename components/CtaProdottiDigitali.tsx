import MagneticButton from "./MagneticButton";

const UTM = "?utm_source=blog&utm_medium=cta&utm_campaign=powerdigital";
const KIT_URL = `https://shop.poweragency.it/prodotti-digitali${UTM}`;
const GUIDA_URL = `https://shop.poweragency.it/guida/ai-per-la-tua-impresa${UTM}`;

/**
 * Box CTA compatto verso i prodotti digitali PowerDigital (shop).
 * Strutturale nel template articolo del blog — non va duplicato nei .md.
 */
export default function CtaProdottiDigitali() {
  return (
    <aside
      aria-label="Prodotti digitali PowerDigital"
      className="relative mt-14 overflow-hidden rounded-2xl border border-line-strong bg-gradient-to-b from-surface-2 to-bg px-6 py-8 md:px-9"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[220px] w-[420px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(202,111,42,0.18), transparent 70%)",
        }}
      />

      <span className="relative font-head text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-orange">
        PowerDigital
      </span>

      <h2 className="relative mt-2.5 font-head text-[clamp(1.25rem,2.6vw,1.6rem)] font-bold leading-[1.15] tracking-[-0.02em]">
        Metti in pratica con i kit <span className="grad-text">PowerDigital</span>
      </h2>

      <p className="relative mt-3 max-w-[56ch] text-[0.98rem] text-mut">
        Prompt e workflow AI pronti all&rsquo;uso per freelancer e microimprese, in
        italiano. Pagamento una tantum, download immediato.
      </p>

      <div className="relative mt-6 flex flex-wrap items-center gap-3">
        <MagneticButton
          href={KIT_URL}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber via-orange to-red px-6 py-3 font-head text-[0.95rem] font-semibold text-[#1a0a03] shadow-[0_10px_40px_-8px_rgba(168,64,26,0.55)]"
        >
          Scopri i kit
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </MagneticButton>

        <MagneticButton
          href={GUIDA_URL}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 py-3 font-head text-[0.95rem] font-semibold text-ink transition-colors hover:border-line-strong hover:bg-orange/[0.08]"
        >
          Guida gratuita: AI per la tua impresa
        </MagneticButton>
      </div>
    </aside>
  );
}
