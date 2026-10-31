"use client";
import { motion, AnimatePresence } from "motion/react";
import { useLoop } from "@/lib/useLoop";
import { Check } from "./Check";
import { cn } from "@/lib/cn";

export function Window({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[2rem] border border-line bg-tint shadow-[0_40px_90px_-40px_rgba(42,82,255,.4)] md:rounded-[2.5rem]", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-white/80 px-6 py-4 text-sm text-mute">
        <i className="h-2.5 w-2.5 rounded-full bg-blue/80" />
        <i className="h-2.5 w-2.5 rounded-full bg-blue/45" />
        <i className="h-2.5 w-2.5 rounded-full bg-blue/20" />
        <span className="ml-3">{title}</span>
      </div>
      {children}
    </div>
  );
}

const MSGS: { from: "u" | "b"; text: string }[] = [
  { from: "u", text: "Buongiorno, posso cambiare l'indirizzo di consegna dell'ordine?" },
  { from: "b", text: "Sì, l'ordine non è ancora partito. Ho aggiornato l'indirizzo e vi ho inviato la conferma." },
  { from: "u", text: "Grazie! E la fattura?" },
  { from: "b", text: "Verrà emessa alla spedizione. Se preferite parlare con un operatore, vi passo la conversazione." },
];

export function ChatPane({ compact = false }: { compact?: boolean }) {
  const step = useLoop(MSGS.length + 1, 1700, 4200);
  const shown = Math.min(step, MSGS.length);
  const typing = step < MSGS.length && MSGS[step]?.from === "b";
  return (
    <div className={cn("flex min-h-[320px] flex-col gap-3 p-6 md:p-8", compact && "min-h-[260px]")}>
      <AnimatePresence initial={false}>
        {MSGS.slice(0, shown).map((m, i) => (
          <motion.div key={i} layout initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className={cn("max-w-[82%] rounded-3xl px-5 py-3.5 text-[15px] leading-snug md:text-base", m.from === "u" ? "self-end rounded-br-md bg-blue text-white" : "self-start rounded-bl-md border border-line bg-white")}>
            {m.text}
          </motion.div>
        ))}
        {typing && (
          <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-fit gap-1.5 self-start rounded-3xl rounded-bl-md border border-line bg-white px-5 py-4">
            {[0, 1, 2].map((d) => (
              <motion.span key={d} className="h-2 w-2 rounded-full bg-blue" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ACTIONS = ["Richiesta riconosciuta", "Ordine aggiornato nel gestionale", "Conferma inviata al cliente"];

export function ActionsPane() {
  const step = useLoop(MSGS.length + 1, 1700, 4200);
  const done = Math.max(0, Math.min(ACTIONS.length, step - 0));
  return (
    <div className="flex flex-col gap-3 bg-tint-2/60 p-6 md:p-8">
      <p className="mb-1 text-sm font-medium text-mute">Cosa fa il sistema</p>
      {ACTIONS.map((a, i) => (
        <motion.div key={a} animate={{ opacity: i < done ? 1 : 0.35, x: i < done ? 0 : 10 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] md:text-base">
          <span className={cn("flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-colors duration-500", i < done ? "border-blue bg-blue text-white" : "border-line text-transparent")}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          {a}
        </motion.div>
      ))}
    </div>
  );
}

export function HeroDemo() {
  return (
    <Window title="Esempio: richiesta di un cliente">
      <div className="grid md:grid-cols-[1.15fr_1fr]">
        <ChatPane />
        <ActionsPane />
      </div>
    </Window>
  );
}

export function FlowDemo({ nodes = ["Email e moduli", "AI legge e classifica", "Gestionale e CRM", "Risposta al cliente"], title = "Come si collega ai vostri strumenti" }: { nodes?: string[]; title?: string }) {
  const step = useLoop(nodes.length - 1, 900, 2200);
  return (
    <Window title={title}>
      <div className="flex flex-col items-stretch gap-0 px-6 py-12 md:flex-row md:items-center md:px-12 md:py-20">
        {nodes.map((n, i) => (
          <div key={n} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-center">
            {i > 0 && (
              <div className="relative mx-auto h-8 w-0.5 bg-line md:mx-0 md:h-0.5 md:flex-1">
                <motion.span className="absolute -top-[5px] left-0 hidden h-3 w-3 rounded-full bg-blue md:block" animate={{ left: ["0%", "calc(100% - 12px)"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.4 }} />
              </div>
            )}
            <motion.div animate={{ scale: step === i ? 1.04 : 1 }} transition={{ duration: 0.4 }} className={cn("rounded-2xl border px-5 py-5 text-center text-base font-medium transition-colors duration-500 md:min-w-[150px]", step === i ? "border-blue bg-blue text-white" : "border-line bg-white")}>
              {n}
            </motion.div>
          </div>
        ))}
      </div>
    </Window>
  );
}

export function DocDemo() {
  const step = useLoop(3, 1100, 3000);
  const fields = ["Fornitore: [nome]", "Importo: [valore]", "Scadenza: [data]"];
  return (
    <Window title="Estrazione da un documento">
      <div className="grid md:grid-cols-2">
        <div className="p-6 md:p-8">
          <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-line bg-white p-8">
            <p className="text-sm text-mute">[Fattura.pdf]</p>
            {[92, 78, 86, 60, 90, 70, 82].map((w, i) => (
              <div key={i} className="mt-4 h-3 rounded-full bg-tint-2" style={{ width: `${w}%` }} />
            ))}
            <motion.div className="absolute inset-x-0 h-[3px] bg-blue shadow-[0_0_30px_8px_rgba(42,82,255,.35)]" animate={{ top: ["0%", "100%"] }} transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-tint-2/60 p-6 md:p-8">
          <p className="mb-1 text-sm font-medium text-mute">Campi estratti</p>
          {fields.map((f, i) => (
            <motion.div key={f} animate={{ opacity: i < step ? 1 : 0.3, x: i < step ? 0 : 10 }} transition={{ duration: 0.5 }} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-base">
              <span className={cn("flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-colors duration-500", i < step ? "border-blue bg-blue text-white" : "border-line text-transparent")}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </span>
              {f}
            </motion.div>
          ))}
        </div>
      </div>
    </Window>
  );
}

export function LangDemo() {
  const step = useLoop(3, 1300, 3000);
  const langs = ["Italiano", "English", "Deutsch"];
  return (
    <Window title="Una scheda prodotto, tre lingue">
      <div className="grid gap-4 p-6 md:grid-cols-3 md:p-10">
        {langs.map((l, i) => (
          <motion.div key={l} animate={{ y: step > i ? 0 : 18, opacity: step > i ? 1 : 0.3 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="rounded-3xl border border-line bg-white p-7">
            <p className="text-sm font-semibold text-blue">{l}</p>
            {[90, 74, 82, 56].map((w, k) => (
              <div key={k} className="mt-3.5 h-3 rounded-full bg-tint-2" style={{ width: `${w}%` }} />
            ))}
          </motion.div>
        ))}
      </div>
    </Window>
  );
}

export function DemoFor({ kind }: { kind: "chat" | "flow" | "doc" | "lang" }) {
  if (kind === "chat") return <Window title="Assistente sul sito"><ChatPane /></Window>;
  if (kind === "flow") return <FlowDemo title="Un ordine, senza passaggi manuali" nodes={["Ordine ricevuto", "AI controlla i dati", "Gestionale aggiornato", "Cliente avvisato"]} />;
  if (kind === "doc") return <DocDemo />;
  return <LangDemo />;
}

export { Check };
