"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { aiSolutions, categories } from "@/content/site";
import { Check } from "./Check";
import { cn } from "@/lib/cn";

const options = [...aiSolutions.map((s) => s.title), ...categories.filter((c) => c.id !== "ai").flatMap((c) => c.items.map((i) => i.title))];
const situations = [
  { v: "nuovo", l: "Parto da zero" },
  { v: "rifare", l: "Devo rifare qualcosa" },
  { v: "esistente", l: "Ho già uno strumento da migliorare" },
] as const;
const timings = [
  { v: "subito", l: "Subito" },
  { v: "1-3-mesi", l: "Entro 1-3 mesi" },
  { v: "valutando", l: "Sto valutando" },
] as const;

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [needs, setNeeds] = useState<string[]>([]);
  const [situation, setSituation] = useState<string>("");
  const [timing, setTiming] = useState<string>("");
  const [f, setF] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const level = needs.length === 0 ? "—" : needs.length === 1 ? "Essenziale" : needs.length <= 3 ? "Intermedio" : "Completo";
  const toggle = (n: string) => setNeeds((a) => (a.includes(n) ? a.filter((x) => x !== n) : [...a, n]));
  const canNext = step === 0 ? needs.length > 0 : step === 1 ? !!situation && !!timing : true;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/preventivo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ needs, situation, timing, ...f, consent }) });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore imprevisto.");
      setState("idle");
    }
  }

  if (state === "done")
    return (
      <div className="rounded-[var(--radius-panel)] border border-line bg-tint p-10 md:p-16" role="status">
        <Check size={64} />
        <h2 className="h-section mt-8">Richiesta inviata.</h2>
        <p className="mt-5 max-w-lg text-lg text-mute">Ti rispondiamo entro [N] ore lavorative con le prossime domande e una data per il primo confronto.</p>
      </div>
    );

  const labels = ["Cosa ti serve", "Il contesto", "I tuoi dati"];
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
      <form onSubmit={submit} className="rounded-[var(--radius-panel)] border border-line bg-tint p-6 md:p-12">
        <ol className="mb-10 flex gap-2" aria-label="Avanzamento">
          {labels.map((l, i) => (
            <li key={l} className="flex-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-tint-2"><motion.div className="h-full bg-blue" animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} /></div>
              <span className={cn("mt-2 block text-sm", i === step ? "font-semibold text-blue" : "text-mute")}>{l}</span>
            </li>
          ))}
        </ol>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            {step === 0 && (
              <fieldset>
                <legend className="text-3xl font-semibold tracking-tight">Cosa ti serve?</legend>
                <p className="mt-2 text-mute">Puoi sceglierne più di una.</p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {options.map((o) => {
                    const on = needs.includes(o);
                    return (
                      <button key={o} type="button" aria-pressed={on} onClick={() => toggle(o)} className={cn("flex items-center gap-2 rounded-full border px-5 py-3 text-base transition-all duration-300", on ? "border-blue bg-blue text-white" : "border-line bg-white hover:border-blue/50")}>
                        {on && <span aria-hidden="true">✓</span>}
                        {o}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}
            {step === 1 && (
              <div className="flex flex-col gap-10">
                <Choice legend="Qual è la situazione?" value={situation} onChange={setSituation} items={situations} />
                <Choice legend="Quando vorresti partire?" value={timing} onChange={setTiming} items={timings} />
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-3xl font-semibold tracking-tight">Come ti contattiamo?</h2>
                <Field label="Nome" value={f.name} onChange={(v) => setF({ ...f, name: v })} autoComplete="name" required />
                <Field label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} autoComplete="email" required />
                <Field label="Azienda" value={f.company} onChange={(v) => setF({ ...f, company: v })} autoComplete="organization" />
                <label className="block text-sm font-medium">Raccontaci il progetto
                  <textarea value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} rows={4} className="mt-2 w-full rounded-2xl border border-line bg-white px-5 py-4 text-base outline-none transition-colors focus:border-blue" />
                </label>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} />
                <label className="flex items-start gap-3 text-sm text-mute">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 accent-[#2a52ff]" required />
                  <span>Acconsento al trattamento dei dati per rispondere alla richiesta, come descritto nella <a href="/privacy" className="text-blue underline">privacy</a>.</span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        {error && <p role="alert" className="mt-6 rounded-2xl bg-white px-5 py-3 text-[15px] text-blue-deep">{error}</p>}
        <div className="mt-10 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={cn("rounded-full px-6 py-3.5 font-medium text-mute transition-colors hover:text-ink", step === 0 && "invisible")}>← Indietro</button>
          {step < 2 ? (
            <button type="button" disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="rounded-full bg-blue px-8 py-4 font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40">Continua →</button>
          ) : (
            <button type="submit" disabled={state === "sending" || !consent || !f.name || !f.email} className="rounded-full bg-blue px-8 py-4 font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40">{state === "sending" ? "Invio…" : "Invia la richiesta"}</button>
          )}
        </div>
      </form>

      <aside className="h-fit rounded-[var(--radius-panel)] bg-blue p-8 text-white lg:sticky lg:top-28">
        <p className="text-sm opacity-85">Riepilogo</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight">{level}</p>
        <p className="mt-1 text-sm opacity-85">Complessità indicativa</p>
        <ul className="mt-8 flex min-h-[80px] flex-col gap-2">
          {needs.length === 0 && <li className="opacity-70">Scegli cosa ti serve per vedere il riepilogo.</li>}
          {needs.map((n) => (
            <motion.li key={n} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3"><Check size={22} tone="white" />{n}</motion.li>
          ))}
        </ul>
        <p className="mt-8 border-t border-white/25 pt-5 text-sm leading-relaxed opacity-90">Il prezzo fisso e i tempi per tappa arrivano per iscritto, nella proposta, dopo il primo confronto.</p>
      </aside>
    </div>
  );
}

function Choice({ legend, value, onChange, items }: { legend: string; value: string; onChange: (v: string) => void; items: readonly { v: string; l: string }[] }) {
  return (
    <fieldset>
      <legend className="text-2xl font-semibold tracking-tight">{legend}</legend>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {items.map((i) => (
          <button key={i.v} type="button" aria-pressed={value === i.v} onClick={() => onChange(i.v)} className={cn("rounded-full border px-6 py-3.5 text-base transition-all duration-300", value === i.v ? "border-blue bg-blue text-white" : "border-line bg-white hover:border-blue/50")}>{i.l}</button>
        ))}
      </div>
    </fieldset>
  );
}

function Field({ label, value, onChange, type = "text", ...rest }: { label: string; value: string; onChange: (v: string) => void; type?: string; autoComplete?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-medium">{label}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-full border border-line bg-white px-6 py-4 text-base outline-none transition-colors focus:border-blue" {...rest} />
    </label>
  );
}
