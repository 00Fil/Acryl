"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { LogoMark } from "./Logo";
import { Button } from "./Button";
import { categories, nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

const extra = [
  { title: "Strumenti", items: [{ title: "Calcolare il preventivo", text: "Stima il progetto in pochi passaggi.", href: "/preventivo" }, { title: "Contatti", text: "Scriveteci o prenotate una chiamata.", href: "/preventivo" }] },
  { title: "Azienda", items: [{ title: "Chi siamo", text: "Il team e il modo in cui lavoriamo.", href: "/chi-siamo" }, { title: "Come usiamo l'AI", text: "Cosa automatizziamo e cosa no.", href: "/ai" }] },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [cat, setCat] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setOpen(false);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setMobile(false));
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const hold = () => clearTimeout(closeTimer.current);
  const leave = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  const groups = [...categories.map((c) => ({ id: c.id, title: c.title, cols: split(c.items.map((i) => ({ ...i, href: i.href ?? `/soluzioni#${c.id}` }))) })), { id: "azienda", title: "Azienda", cols: extra.map((g) => ({ title: g.title, items: g.items })) }];

  return (
    <header className={cn("sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-colors duration-300", scrolled || open ? "border-line" : "border-transparent")} onMouseLeave={leave} onMouseEnter={hold}>
      <div className="wrap flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-semibold tracking-tight" aria-label={`${site.name}, home`}>
          <LogoMark />
          {site.name}
        </Link>
        <nav aria-label="Principale" className="hidden items-center gap-9 text-[15px] font-medium md:flex">
          {nav.main.map((n) =>
            n.mega ? (
              <button key={n.href} type="button" aria-expanded={open} aria-controls="mega" onMouseEnter={() => (hold(), setOpen(true))} onFocus={() => setOpen(true)} onClick={() => setOpen((o) => !o)} className={cn("flex items-center gap-1.5 transition-colors hover:text-blue", open && "text-blue")}>
                {n.label}
                <svg width="10" height="10" viewBox="0 0 10 10" className={cn("transition-transform duration-300", open && "rotate-180")} aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            ) : (
              <Link key={n.href} href={n.href} onMouseEnter={() => setOpen(false)} className={cn("relative transition-colors hover:text-blue", pathname.startsWith(n.href) && "text-blue")}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/preventivo" className="hidden rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink md:inline-block">
            Calcolare il preventivo
          </Link>
          <button type="button" className="rounded-full border border-ink px-5 py-2.5 text-sm font-medium md:hidden" onClick={() => setMobile(true)} aria-label="Apri il menu">
            Menu
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mega" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 top-full hidden md:block" onMouseEnter={hold}>
            <div className="mx-4 overflow-hidden rounded-b-[2.5rem] border border-t-0 border-line bg-white shadow-[0_30px_80px_-30px_rgba(42,82,255,.35)]">
              <div className="wrap grid grid-cols-12 gap-10 py-9">
                <div className="col-span-3">
                  <p className="px-5 pb-3 text-[13px] font-semibold text-mute">Soluzioni e azienda</p>
                  <ul className="flex flex-col gap-0.5">
                    {groups.map((g, i) => (
                      <li key={g.id}>
                        <button type="button" onMouseEnter={() => setCat(i)} onFocus={() => setCat(i)} onClick={() => setCat(i)} className={cn("flex w-full items-center justify-between rounded-2xl px-5 py-3.5 text-left text-[17px] font-medium transition-colors", cat === i ? "bg-tint text-blue" : "hover:bg-tint/60")}>
                          {g.title}
                          <span aria-hidden="true">→</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-6 border-l border-line pl-10">
                  <motion.div key={cat} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-2 gap-x-4">
                    {groups[cat].cols.map((col) => (
                      <div key={col.title}>
                        <p className="px-5 pb-2 text-[13px] font-semibold text-mute">{col.title}</p>
                        {col.items.map((it) => (
                          <Link key={it.title} href={it.href} className="group block rounded-2xl px-5 py-3.5 transition-colors hover:bg-tint">
                            <span className="block text-[17px] font-semibold text-ink transition-colors group-hover:text-blue">
                              {it.title} <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </span>
                            {it.text && <span className="mt-0.5 block text-sm text-mute">{it.text}</span>}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </div>
                <div className="col-span-3">
                  <Link href="/preventivo" className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-blue p-7 text-white">
                    <span aria-hidden="true" className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/15 transition-transform duration-700 ease-expo group-hover:scale-125" />
                    <span aria-hidden="true" className="absolute top-1/2 -right-10 h-40 w-40 rounded-[var(--radius-panel)] bg-ink/25 mix-blend-multiply transition-transform duration-700 ease-expo group-hover:-translate-y-3" />
                    <span className="relative text-sm opacity-90">Strumento</span>
                    <span className="relative">
                      <span className="block text-3xl font-semibold leading-[1.05] tracking-tight">Calcolare il preventivo</span>
                      <span className="mt-3 block text-[15px] opacity-90">Pochi passaggi, stima per iscritto.</span>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="border-t border-line bg-tint/50">
                <div className="wrap flex items-center justify-between py-5 text-[15px]">
                  <span className="text-mute">Non sai da dove partire?</span>
                  <Link href="/preventivo" className="font-semibold text-blue hover:underline">
                    Parla con noi →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-[60] overflow-y-auto bg-white md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
              <span className="flex items-center gap-2.5 text-xl font-semibold"><LogoMark />{site.name}</span>
              <button type="button" onClick={() => setMobile(false)} className="rounded-full border border-ink px-5 py-2.5 text-sm font-medium">Chiudi</button>
            </div>
            <div className="px-5 pb-10 pt-6">
              {groups.slice(0, 5).map((g) => (
                <details key={g.id} className="group border-b border-line" open={g.id === "ai"}>
                  <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-2xl font-semibold tracking-tight">{g.title}<span className="text-blue transition-transform group-open:rotate-45">+</span></summary>
                  <div className="pb-5">
                    {g.cols.flatMap((c) => c.items).map((it) => (
                      <Link key={it.title} href={it.href} className="block py-2 text-lg text-mute">{it.title}</Link>
                    ))}
                  </div>
                </details>
              ))}
              <Link href="/chi-siamo" className="block border-b border-line py-5 text-2xl font-semibold tracking-tight">Chi siamo</Link>
              <div className="mt-8"><Button href="/preventivo" className="w-full justify-center">Calcolare il preventivo</Button></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function split<T extends { title: string }>(items: T[]) {
  const mid = Math.ceil(items.length / 2);
  return [
    { title: "Soluzioni", items: items.slice(0, mid) },
    { title: "\u00A0", items: items.slice(mid) },
  ].filter((c) => c.items.length);
}
