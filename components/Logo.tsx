// Marchio header/footer: logo ufficiale PAI in lockup ORIZZONTALE (monogramma +
// wordmark "POWER AGENCY"), sfondo trasparente, da public/brand/logo-horizontal.png.
// Formato giusto per una barra compatta: la scritta resta leggibile. Nessun testo HTML.
export default function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-horizontal.png"
      alt="PowerAgency"
      className="h-10 w-auto"
    />
  );
}
