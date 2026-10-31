import Link from "next/link";
import { aiSolutions, categories, site } from "@/content/site";
import { LogoMark } from "./Logo";

export function Footer() {
  const others = categories.filter((c) => c.id !== "ai");
  return (
    <footer className="px-3 pb-3 md:px-4 md:pb-4">
      <div className="overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white">
        <div className="wrap py-20">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight"><LogoMark size={30} />{site.name}</div>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/60">{site.tagline}</p>
              <a href={`mailto:${site.email}`} className="mt-8 inline-block text-xl font-medium text-sky transition-colors hover:text-white">{site.email}</a>
            </div>
            <FooterCol title="Soluzioni AI" className="md:col-span-2">
              {aiSolutions.map((s) => <Link key={s.slug} href={`/ai/${s.slug}`}>{s.title}</Link>)}
            </FooterCol>
            <FooterCol title="Altre soluzioni" className="md:col-span-2">
              {others.map((c) => <Link key={c.id} href={`/soluzioni#${c.id}`}>{c.title}</Link>)}
            </FooterCol>
            <FooterCol title="Azienda" className="md:col-span-3">
              <Link href="/chi-siamo">Chi siamo</Link>
              <Link href="/preventivo">Calcola preventivo</Link>
              <Link href="/preventivo">Contatti</Link>
            </FooterCol>
          </div>
          <div className="mt-20 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/45">
            <span>[Ragione sociale]</span>
            <span>P.IVA [numero]</span>
            <span>[Indirizzo della sede]</span>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-white/45">{title}</p>
      <div className="mt-5 flex flex-col gap-3 text-[15px] [&_a]:w-fit [&_a]:text-white/85 [&_a]:transition-colors [&_a:hover]:text-sky">{children}</div>
    </div>
  );
}
