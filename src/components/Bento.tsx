import Link from "next/link";
import { aiSolutions, categories } from "@/content/site";
import { Reveal } from "./Reveal";

export function Bento() {
  const others = categories.filter((c) => c.id !== "ai");
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Reveal className="md:col-span-2">
        <Link href="/ai" className="group relative block overflow-hidden rounded-[2.5rem] bg-blue p-8 text-white md:p-14">
          <span aria-hidden="true" className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 transition-transform duration-700 ease-expo group-hover:scale-125" />
          <span aria-hidden="true" className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-[3rem] bg-ink/25 mix-blend-multiply transition-transform duration-700 ease-expo group-hover:-translate-y-4" />
          <div className="relative flex flex-col justify-between gap-12 md:min-h-[300px]">
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-none tracking-[-0.04em]">Intelligenza artificiale</h3>
              <span aria-hidden="true" className="text-4xl transition-transform duration-500 ease-expo group-hover:translate-x-2">→</span>
            </div>
            <div>
              <p className="max-w-xl text-lg text-white/90">L'AI dove un'attività ripetitiva costa ore, collegata agli strumenti che avete già.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {aiSolutions.map((s) => (
                  <span key={s.slug} className="rounded-full bg-white/15 px-4 py-2 text-[15px] backdrop-blur-sm">{s.title}</span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </Reveal>
      {others.map((c, i) => (
        <Reveal key={c.id} delay={(i % 2) * 0.1}>
          <Link href={`/soluzioni#${c.id}`} className="group relative block h-full overflow-hidden rounded-[2.5rem] border border-line bg-tint p-8 transition-colors duration-500 hover:bg-tint-2 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-none tracking-[-0.035em]">{c.title}</h3>
              <span aria-hidden="true" className="text-2xl text-blue transition-transform duration-500 ease-expo group-hover:translate-x-2">→</span>
            </div>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-mute">{c.intro}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {c.items.slice(0, 4).map((it) => (
                <span key={it.title} className="rounded-full bg-white px-4 py-2 text-[15px] text-ink">{it.title}</span>
              ))}
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
