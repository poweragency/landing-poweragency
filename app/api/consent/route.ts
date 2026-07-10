import { NextResponse } from "next/server";

// Prova del consenso cookie: riceve la scelta dal banner CMP (stessa origine)
// e la inoltra server-to-server al registro centrale su Power Hub
// (tabella cookie_consent_log). Il secret resta lato server, mai nel browser
// — stesso pattern di /api/lead.
//
// Env su Vercel (già configurate per il form lead):
//   POWERHUB_WEBFORM_SECRET  (= WEBFORM_WEBHOOK_SECRET su Power Hub)
//   POWERHUB_CONSENT_URL     (opzionale, default crm.poweragency.it)

type ConsentBody = {
  consentId?: unknown;
  action?: unknown;
  categories?: unknown;
  policyVersion?: unknown;
};

const ACTIONS = new Set(["accept_all", "reject_all", "custom", "update", "revoke"]);
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  let body: ConsentBody;
  try {
    body = (await req.json()) as ConsentBody;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const consentId = typeof body.consentId === "string" ? body.consentId : "";
  const action = typeof body.action === "string" ? body.action : "";
  const policyVersion =
    typeof body.policyVersion === "string" ? body.policyVersion.slice(0, 40) : "";
  const categories =
    body.categories && typeof body.categories === "object"
      ? (body.categories as Record<string, unknown>)
      : null;

  if (
    !UUID_RE.test(consentId) ||
    !ACTIONS.has(action) ||
    !policyVersion ||
    !categories ||
    Object.values(categories).some((v) => typeof v !== "boolean")
  ) {
    return NextResponse.json({ error: "Payload non valido" }, { status: 400 });
  }

  const record = {
    consentId,
    site: "www.poweragency.it",
    action,
    categories,
    policyVersion,
    userAgent: req.headers.get("user-agent"),
    ip: (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || null,
  };

  // Sempre nei log della funzione (Vercel): evidenza secondaria se il
  // registro centrale fosse irraggiungibile.
  console.log("[consent]", JSON.stringify(record));

  const secret = process.env.POWERHUB_WEBFORM_SECRET;
  if (secret) {
    const url =
      process.env.POWERHUB_CONSENT_URL ||
      "https://crm.poweragency.it/api/webhooks/consent";
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-webform-secret": secret,
        },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error("[consent] powerhub forward failed:", err);
      // non blocchiamo l'utente: la scelta locale è già applicata
    }
  }

  return NextResponse.json({ ok: true });
}
