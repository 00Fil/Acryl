import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote";
import { site } from "@/content/site";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Troppe richieste, riprova tra qualche minuto." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Dati non validi." }, { status: 422 });
  const q = parsed.data;
  if (q.website) return NextResponse.json({ ok: true }); // bot: finge successo

  const text = [
    `Nuova richiesta di preventivo`,
    `Nome: ${q.name}`,
    `Email: ${q.email}`,
    `Azienda: ${q.company || "-"}`,
    `Cosa serve: ${q.needs.join(", ")}`,
    `Situazione: ${q.situation}`,
    `Tempi: ${q.timing}`,
    ``,
    q.message || "(nessun messaggio)",
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[preventivo]", text);
    return NextResponse.json({ ok: true });
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? `${site.name} <noreply@example.com>`,
      to: [process.env.QUOTE_TO_EMAIL ?? site.email],
      reply_to: q.email,
      subject: `Preventivo: ${q.name}${q.company ? ` (${q.company})` : ""}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error("[preventivo] invio fallito", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "Non siamo riusciti a inviare la richiesta. Scriveteci a " + site.email }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
