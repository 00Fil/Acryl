import { NextResponse } from "next/server";
import { z } from "zod";
import { sectorOf, sectorSolutions } from "@/lib/azienda";
import { site } from "@/content/site";

export const runtime = "nodejs";

const schema = z.object({ name: z.string().trim().min(2).max(60) });

// Limite per IP: 20 richieste ogni 10 minuti.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  const blocked = recent.length >= 20;
  if (!blocked) recent.push(now);
  hits.set(ip, recent);
  return blocked;
}

// Cache di un'ora: OpenStreetMap chiede di non ripetere le stesse richieste.
type Found = { name: string; website: string | null; cls?: string; type?: string } | null;
const cache = new Map<string, { at: number; found: Found }>();

type NominatimHit = { name?: string; display_name?: string; class?: string; type?: string; extratags?: { website?: string; "contact:website"?: string } };

/** Cerca l'azienda su OpenStreetMap (Nominatim): dati pubblici, nessuna chiave API. */
async function lookup(name: string): Promise<Found> {
  const key = name.toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < 60 * 60_000) return hit.found;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = new URLSearchParams({ q: name, format: "jsonv2", limit: "1", extratags: "1", "accept-language": "it" }).toString();
  let found: Found = null;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": `Acryl/1.0 (${site.url})`, "Accept-Language": "it" },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) {
      const data = (await res.json()) as NominatimHit[];
      const h = data[0];
      if (h) {
        found = {
          name: h.name || h.display_name?.split(",")[0] || name,
          website: h.extratags?.website ?? h.extratags?.["contact:website"] ?? null,
          cls: h.class,
          type: h.type,
        };
      }
    }
  } catch {
    // Servizio non raggiungibile: si mostrano le soluzioni generiche.
  }
  cache.set(key, { at: Date.now(), found });
  return found;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (limited(ip)) return NextResponse.json({ error: "Troppe richieste. Riprovate tra qualche minuto." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Inserite il nome dell'azienda." }, { status: 400 });

  const found = await lookup(parsed.data.name);
  const name = found?.name ?? parsed.data.name;
  const sector = sectorOf(name, found ? { cls: found.cls, type: found.type } : undefined);
  return NextResponse.json({
    name,
    website: found?.website ?? null,
    source: found ? "openstreetmap" : "nessuna",
    sector,
    label: sectorSolutions[sector].label,
    items: sectorSolutions[sector].items,
  });
}
