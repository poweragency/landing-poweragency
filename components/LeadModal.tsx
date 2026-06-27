"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { gaEvent } from "@/lib/gtag";

type Props = {
  open: boolean;
  onClose: () => void;
  /** page/CTA the lead came from */
  source?: string;
  title?: string;
};

type Status = "idle" | "loading" | "success" | "error";

const SECTORS = [
  { value: "", label: "Da definire" },
  { value: "software", label: "Software proprietari" },
  { value: "crm", label: "CRM" },
  { value: "prop", label: "Prop firms" },
  { value: "ecommerce", label: "Ecommerce" },
];

function defaultSector(source?: string) {
  const s = source || "";
  if (s.includes("/ecommerce")) return "ecommerce";
  if (s.includes("/prop")) return "prop";
  if (s.includes("/crm")) return "crm";
  if (s.includes("/software")) return "software";
  return "";
}

const Field = forwardRef<
  HTMLInputElement,
  {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    autoComplete?: string;
  }
>(function Field({ name, label, type, placeholder, autoComplete }, ref) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="font-head text-[0.8rem] font-medium text-mut">{label}</span>
      <input
        ref={ref}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        data-cursor="hover"
        className="rounded-[12px] border border-line bg-bg/60 px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-dim focus:border-orange focus:bg-bg"
      />
    </label>
  );
});

export default function LeadModal({
  open,
  onClose,
  source,
  title = "Prenota una call",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrorMsg("");
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      sector: String(fd.get("sector") || "").trim(),
      source: source || "",
    };
    if (!payload.name || !payload.email || !payload.phone) {
      setStatus("error");
      setErrorMsg("Compila tutti i campi.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("success");
      // GA4: lead inviato (diventa evento chiave in GA4 → "lead organici" nel report PowerSEO).
      gaEvent("generate_lead", {
        source: payload.source || "(diretta)",
        sector: payload.sector || "(da definire)",
      });
    } catch {
      setStatus("error");
      setErrorMsg("Qualcosa è andato storto. Riprova o scrivici via email.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            className="relative w-full max-w-[460px] overflow-hidden rounded-[22px] border border-line-strong p-[clamp(24px,5vw,40px)] text-center"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, rgba(202,111,42,0.16), transparent 55%), #16100d",
            }}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <button
              onClick={onClose}
              aria-label="Chiudi"
              data-cursor="hover"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-mut transition-colors hover:border-line-strong hover:text-ink"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="py-6">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-amber via-orange to-red text-2xl font-bold text-[#1a0a03]">
                  ✓
                </div>
                <h3 className="font-head text-[1.5rem] font-bold">Richiesta inviata.</h3>
                <p className="mt-2 text-mut">
                  Ti ricontattiamo a breve. Grazie.
                </p>
                <button
                  onClick={onClose}
                  data-cursor="hover"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 py-3 font-head font-semibold text-ink transition-colors hover:border-line-strong"
                >
                  Chiudi
                </button>
              </div>
            ) : (
              <>
                <span className="font-head text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-orange">
                  Lascia i tuoi dati
                </span>
                <h3
                  id="lead-title"
                  className="mt-2 font-head text-[1.6rem] font-bold leading-tight"
                >
                  {title}
                </h3>
                <p className="mt-2 text-[0.95rem] text-mut">
                  Lascia i tuoi dati: ti ricontattiamo noi. Zero impegno.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-4"
                  noValidate
                >
                  <Field
                    ref={firstFieldRef}
                    name="name"
                    label="Nome e cognome"
                    type="text"
                    placeholder="Mario Rossi"
                    autoComplete="name"
                  />
                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="mario@email.it"
                    autoComplete="email"
                  />
                  <Field
                    name="phone"
                    label="Telefono"
                    type="tel"
                    placeholder="+39 333 1234567"
                    autoComplete="tel"
                  />
                  <label className="flex flex-col gap-1.5 text-left">
                    <span className="font-head text-[0.8rem] font-medium text-mut">
                      Settore di interesse
                    </span>
                    <select
                      name="sector"
                      defaultValue={defaultSector(source)}
                      data-cursor="hover"
                      className="cursor-pointer rounded-[12px] border border-line bg-bg/60 px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors focus:border-orange focus:bg-bg"
                    >
                      {SECTORS.map((s) => (
                        <option key={s.value} value={s.value} className="bg-surface text-ink">
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {status === "error" && (
                    <p className="text-[0.88rem] text-red">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    data-cursor="hover"
                    className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-amber via-orange to-red px-7 py-4 font-head text-base font-semibold text-[#1a0a03] shadow-[0_10px_40px_-8px_rgba(168,64,26,0.55)] transition-opacity disabled:opacity-60"
                  >
                    {status === "loading" ? "Invio…" : "Invia richiesta"}
                  </button>
                  <p className="text-[0.78rem] text-dim">
                    Oppure scrivici a {CONTACT.email}
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
