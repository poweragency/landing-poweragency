// Marchio header/footer: logo ufficiale PAI COMPLETO (monogramma + wordmark
// "POWER AGENCY · AI AUTOMATION & SaaS SYSTEM"), sfondo trasparente, da
// public/brand/logo.png. Nessun testo HTML affiancato: la scritta è nel logo.
export default function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo.png"
      alt="PowerAgency"
      className="h-12 w-auto"
    />
  );
}
