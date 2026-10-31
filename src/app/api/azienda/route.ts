import { NextResponse } from "next/server";
import { z } from "zod";
import { sectorOf, sectorSolutions } from "@/lib/azienda";

export const runtime = "nodejs";

const schema = z.object({ name: z.string().trim().min(2).max(60) });

// Limite semplice per IP: 20 richieste ogni 10 minuti.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  const blocked = recent.length >= 20;
  if (!blocked) recent.push(now);
  hits.set(ip, recent);
  return blocked;
}

type PlacesResponse = { places?: { displayName?: { text?: string }; primaryType?: string; websiteUri?: string }[] };

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

  let name = parsed.data.name;
  let primaryType: string | undefined;
  let website: string | null = null;
  let source: "google" | "esempio" = "esempio";

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (key) {
    try {
      const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "places.displayName,places.primaryType,places.websiteUri",
        },
        body: JSON.stringify({ textQuery: name, languageCode: "it", maxResultCount: 1 }),
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as PlacesResponse;
        const p = data.places?.[0];
        if (p) {
          name = p.displayName?.text ?? name;
          primaryType = p.primaryType;
          website = p.websiteUri ?? null;
          source = "google";
        }
      }
    } catch {
      // Se Google non risponde, si usa il nome inserito e si segnala la fonte.
    }
  }

  const sector = sectorOf(name, primaryType);
  return NextResponse.json({
    name,
    website,
    source,
    sector,
    label: sectorSolutions[sector].label,
    items: sectorSolutions[sector].items,
  });
}
