"use client";
import CardSwap, { Card } from "@/components/rb/CardSwap";

/** Quattro anteprime di ciò che consegniamo. Contenuti illustrativi, nessun dato reale. */

function Head({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#e2e7f4] px-6 py-4">
      <span className="text-[15px] font-semibold tracking-tight text-ink">{title}</span>
      <span className="rounded-full bg-tint px-2.5 py-1 text-[12px] font-semibold text-blue">{tag}</span>
    </div>
  );
}

function SiteCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white">
      <Head tag="Sito" title="Un sito che porta richieste" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#e2e7f4]" /><span className="h-2 w-2 rounded-full bg-[#e2e7f4]" /><span className="h-2 w-2 rounded-full bg-[#e2e7f4]" />
          <span className="ml-3 h-5 flex-1 rounded-full bg-tint" />
        </div>
        <div className="h-3 w-3/4 rounded-full bg-ink/85" />
        <div className="h-3 w-1/2 rounded-full bg-ink/85" />
        <div className="h-2 w-2/3 rounded-full bg-[#e2e7f4]" />
        <div className="mt-auto flex items-center gap-3 rounded-2xl border border-[#e2e7f4] p-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue text-[13px] font-semibold text-white">MR</span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink">Nuova richiesta dal sito</p>
            <p className="truncate text-[12px] text-mute">Preventivo per ristrutturazione cucina</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoftwareCard() {
  const rows = [
    ["Ordine 1042", "Nuovo", "bg-tint text-blue"],
    ["Ordine 1041", "In lavorazione", "bg-[#fff4e0] text-[#8a5a00]"],
    ["Ordine 1040", "Spedito", "bg-[#e6f6ee] text-[#17663f]"],
    ["Ordine 1039", "Spedito", "bg-[#e6f6ee] text-[#17663f]"],
  ];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white">
      <Head tag="Software" title="Gestionale su misura" />
      <ul className="flex flex-1 flex-col divide-y divide-[#e2e7f4] px-6 py-2">
        {rows.map(([o, s, c]) => (
          <li key={o} className="flex items-center justify-between py-3 text-[13px]">
            <span className="font-medium text-ink">{o}</span>
            <span className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${c}`}>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowCard() {
  const steps = ["Email del cliente ricevuta", "Dati letti e copiati", "Bozza di preventivo pronta"];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white">
      <Head tag="Automazione AI" title="Dal messaggio al preventivo" />
      <ol className="flex flex-1 flex-col gap-3 p-6">
        {steps.map((s) => (
          <li key={s} className="flex items-center gap-3 text-[13px] text-ink">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-blue text-white">
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l2.75 2.75L12.5 5" /></svg>
            </span>
            {s}
          </li>
        ))}
        <li className="mt-auto flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-[13px] text-white">
          Da approvare
          <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-ink">Approva</span>
        </li>
      </ol>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white">
      <Head tag="Assistente AI" title="Risponde ai clienti" />
      <div className="flex flex-1 flex-col gap-3 p-6 text-[13px]">
        <p className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-tint px-4 py-2.5 text-ink">Siete aperti domenica a pranzo?</p>
        <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-blue px-4 py-2.5 text-white">Sì, dalle 12 alle 15. Volete che vi prenoti un tavolo?</p>
        <p className="max-w-[60%] self-end rounded-2xl rounded-br-md bg-tint px-4 py-2.5 text-ink">Per quattro, alle 13.</p>
        <p className="mt-auto text-[12px] text-mute">Fonte: orari e menu del locale</p>
      </div>
    </div>
  );
}

export function HeroDeck() {
  return (
    <CardSwap width={400} height={300} cardDistance={38} verticalDistance={46} depth={80} skewAmount={2} delay={3800} dim={0.45} cardRadius={24} theme="dark" visibleCards={4}>
      <Card><SiteCard /></Card>
      <Card><FlowCard /></Card>
      <Card><SoftwareCard /></Card>
      <Card><ChatCard /></Card>
    </CardSwap>
  );
}
