import { NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  sector?: unknown;
  source?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const sector = str(body.sector);
  const source = str(body.source);

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Campi mancanti" }, { status: 400 });
  }
  if (!emailOk(email)) {
    return NextResponse.json({ error: "Email non valida" }, { status: 400 });
  }

  const lead = {
    name,
    email,
    phone,
    sector: sector || "(non specificato)",
    source: source || "(sconosciuto)",
    receivedAt: new Date().toISOString(),
  };

  // Inoltra al webhook se configurato (Zapier / Make / Google Sheet / Discord / Slack…)
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("[lead] webhook forward failed:", err);
      // non blocchiamo l'utente: il lead resta nei log comunque
    }
  }

  // Sempre loggato (visibile nei log della funzione su Vercel)
  console.log("[lead]", lead);

  return NextResponse.json({ ok: true });
}
