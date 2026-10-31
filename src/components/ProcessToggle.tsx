"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { Check } from "./Check";

const before = ["Arriva un'email con la richiesta d'ordine", "Qualcuno la legge e capisce di cosa si tratta", "I dati vengono ricopiati nel gestionale", "Si controlla disponibilità e condizioni", "Si scrive la risposta al cliente", "Si archivia la conversazione"];
const after = ["Arriva un'email con la richiesta d'ordine", "L'AI legge e classifica la richiesta", "I dati entrano nel gestionale da soli", "Una persona controlla e approva con un clic", "La risposta parte, già pronta", "Tutto viene archiviato e registrato"];

export function ProcessToggle() {
  const [on, setOn] = useState(true);
  const list = on ? after : before;
  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-tint p-6 md:p-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-md text-lg text-mute">Esempio: una richiesta d'ordine che arriva via email.</p>
        <div role="tablist" aria-label="Confronto" className="relative flex rounded-full bg-white p-1.5">
          {[{ k: false, l: "Senza AI" }, { k: true, l: "Con AI" }].map((o) => (
            <button key={o.l} role="tab" aria-selected={on === o.k} onClick={() => setOn(o.k)} className="relative rounded-full px-6 py-3 text-base font-semibold">
              {on === o.k && <motion.span layoutId="pt" className="absolute inset-0 rounded-full bg-blue" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className={cn("relative transition-colors", on === o.k ? "text-white" : "text-ink")}>{o.l}</span>
            </button>
          ))}
        </div>
      </div>
      <ol className="mt-10 grid gap-3 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((t, i) => (
            <motion.li key={(on ? "a" : "b") + i} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }} className={cn("flex items-center gap-4 rounded-2xl px-5 py-4 text-[17px]", on ? "bg-white" : "bg-white/70 text-mute")}>
              <span className={cn("flex h-8 w-8 flex-none items-center justify-center rounded-full text-sm font-semibold", on && (i === 1 || i === 2 || i === 4) ? "bg-blue text-white" : "bg-tint-2 text-blue")}>{i + 1}</span>
              {t}
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
      <p className="mt-8 flex items-center gap-3 text-[17px] text-mute">
        {on ? (<><Check size={24} />Le persone intervengono dove serve giudizio, non dove serve copiare.</>) : "Ogni passaggio richiede una persona, e ogni passaggio può introdurre un errore."}
      </p>
    </div>
  );
}
