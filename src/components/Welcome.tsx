"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { colorOf, initialsOf, type Solution } from "@/lib/azienda";

type Phase = "ask" | "scan" | "result" | "closed";
type Result = { name: string; source: "google" | "esempio"; label: string; items: Solution[] };

const KEY = "acryl-benvenuto";
const STEPS = ["Cerco la scheda su Google Maps", "Leggo categoria e attività", "Preparo il logo", "Scelgo le soluzioni per voi"];

/** Ingresso: chiede il nome dell'azienda e mostra solo le soluzioni per lei. Si apre una volta per sessione. */
export function Welcome() {
  const [phase, setPhase] = useState<Phase>("ask");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [step, setStep] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      if (sessionStorage.getItem(KEY) === "1") setPhase("closed");
    } catch {
      // Browser senza sessionStorage: l'ingresso resta visibile.
    }
  }, []);

  // Blocca lo scroll della pagina finché l'ingresso è aperto.
  useEffect(() => {
    if (phase === "closed") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Entrata morbida ad ogni cambio di schermata.
  useLayoutEffect(() => {
    if (!root.current || reduce.current || phase === "closed") return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-in]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", clearProps: "transform" });
    }, root);
    return () => ctx.revert();
  }, [phase]);

  // Durante la ricerca: passaggi in sequenza e barra di avanzamento.
  useEffect(() => {
    if (phase !== "scan") return;
    setStep(0);
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 600);
    const tween = bar.current && !reduce.current ? gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: 2.4, ease: "power2.inOut" }) : null;
    return () => {
      clearInterval(t);
      tween?.kill();
    };
  }, [phase]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = name.trim();
    if (v.length < 2) {
      setError("Inserite il nome dell'azienda.");
      return;
    }
    setError(null);
    setPhase("scan");
    try {
      const [res] = await Promise.all([
        fetch("/api/azienda", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: v }) }),
        new Promise((r) => setTimeout(r, 2400)),
      ]);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Riprovate tra poco.");
      setResult(data as Result);
      setPhase("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Riprovate tra poco.");
      setPhase("ask");
    }
  }

  function enter() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // Senza memoria di sessione l'ingresso tornerà alla prossima visita.
    }
    if (reduce.current || !root.current) {
      setPhase("closed");
      return;
    }
    gsap.to(root.current, { opacity: 0, duration: 0.45, ease: "power2.in", onComplete: () => setPhase("closed") });
  }

  if (phase === "closed") return null;

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-labelledby="welcome-title" className="fixed inset-0 z-[70] overflow-y-auto bg-ink text-white">
      <div className="wrap flex min-h-full flex-col py-8 md:py-10">
        <div className="flex items-center justify-between" data-in>
          <span className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <span aria-hidden="true" className="h-[22px] w-[22px] rounded-[7px] bg-blue" />
            Acryl
          </span>
          <button type="button" onClick={enter} className="rounded-full px-4 py-2 text-[15px] font-medium text-white/70 transition-colors hover:text-white">
            Salta
          </button>
        </div>

        <div className="flex flex-1 items-center py-16">
          {phase === "ask" && (
            <form onSubmit={submit} className="w-full" data-in>
              <p className="eyebrow text-sky">Benvenuti</p>
              <h2 id="welcome-title" className="heading mt-5 max-w-[16ch]" data-in>Come si chiama la vostra azienda?</h2>
              <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row" data-in>
                <label htmlFor="azienda" className="sr-only">Nome dell'azienda</label>
                <input
                  id="azienda"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Es. Trattoria Esempio"
                  maxLength={60}
                  autoComplete="organization"
                  className="h-16 min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.06] px-6 text-lg text-white placeholder:text-white/45 outline-none transition-colors focus:border-blue"
                />
                <button type="submit" className="h-16 rounded-full bg-blue px-9 text-[17px] font-semibold text-white transition-transform hover:-translate-y-0.5">
                  Continua
                </button>
              </div>
              {error && <p role="alert" className="mt-4 text-[15px] text-sky">{error}</p>}
              <p className="mt-10 max-w-lg text-[15px] leading-relaxed text-white/60" data-in>
                Cerchiamo la vostra scheda su Google Maps e vi mostriamo solo le soluzioni che servono a voi.
              </p>
            </form>
          )}

          {phase === "scan" && (
            <div className="w-full max-w-xl" data-in aria-live="polite">
              <p className="eyebrow text-sky">Stiamo leggendo</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">{name.trim()}</p>
              <ol className="mt-10 grid gap-4">
                {STEPS.map((s, i) => (
                  <li key={s} className={`flex items-center gap-4 text-lg transition-colors duration-500 ${i <= step ? "text-white" : "text-white/35"}`}>
                    <span className={`h-3 w-3 rounded-full border-2 transition-colors duration-500 ${i < step ? "border-blue bg-blue" : "border-white/25"} ${i === step ? "border-blue" : ""}`} />
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-10 h-[3px] overflow-hidden rounded-full bg-white/15">
                <div ref={bar} className="h-full origin-left bg-blue" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>
          )}

          {phase === "result" && result && (
            <div className="w-full">
              <div className="flex items-center gap-5" data-in>
                <div aria-hidden="true" className="grid h-20 w-20 flex-none place-items-center rounded-[22px] text-3xl font-bold" style={{ background: colorOf(result.name) }}>
                  {initialsOf(result.name)}
                </div>
                <div>
                  <p className="text-xl font-semibold">{result.name}</p>
                  <p className="mt-1 text-[15px] text-white/60">
                    {result.source === "google" ? "Scheda trovata su Google Maps" : "Dati di esempio, scheda non verificata"} · {result.label}
                  </p>
                </div>
              </div>

              <h2 className="heading mt-12 max-w-[20ch] !text-[clamp(2rem,4.6vw,3.6rem)]" data-in>
                Per {result.name} abbiamo scelto tre soluzioni.
              </h2>

              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {result.items.map((it) => (
                  <article key={it.title} data-in className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-7">
                    <span className="w-fit rounded-full bg-blue/25 px-3 py-1 text-[13px] font-semibold text-sky">{it.tag}</span>
                    <h3 className="text-xl font-semibold leading-snug tracking-tight">{it.title}</h3>
                    <p className="mt-auto border-t border-white/10 pt-4 text-[15px] leading-relaxed text-white/70">{it.why}</p>
                  </article>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-7" data-in>
                <button type="button" onClick={enter} className="h-14 rounded-full bg-white px-8 text-[16px] font-semibold text-ink transition-transform hover:-translate-y-0.5">
                  Entra nel sito
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setName("");
                    setPhase("ask");
                  }}
                  className="text-[15px] font-semibold text-white/70 transition-colors hover:text-white"
                >
                  Cambia azienda
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
