// Sfondo brand statico, allineato allo shop (shop.poweragency.it):
// base scura calda #0a0606 + alone "fuoco" radiale fisso. Nessuna animazione,
// nessun WebGL, nessuna griglia, nessun effetto legato al mouse.
export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(202,111,42,0.22), transparent 60%), radial-gradient(ellipse 50% 50% at 90% 40%, rgba(168,64,26,0.12), transparent 60%), #0a0606",
      }}
    />
  );
}
