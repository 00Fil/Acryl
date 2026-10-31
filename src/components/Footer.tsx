import Link from "next/link";
import { aiSolutions, categories, site } from "@/content/site";
import { LogoMark } from "./Logo";

export function Footer() {
  const others = categories.filter((c) => c.id !== "ai");
  return (
    <footer className="px-4 pb-4">
      <div className="overflow-hidden rounded-[3rem] bg-ink text-white">
        <div className="wrap py-20">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight"><LogoMark size={30} />{site.name}</div>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-sky/90">{site.tagline}</p>
              <a href={`mailto:${site.email}`} className="mt-7 inline-block text-xl font-medium text-sky underline-offset-8 hover:underline">{site.email}</a>
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
          <div className="mt-20 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/15 pt-6 text-sm text-sky/80">
            <span>[Ragione sociale]</span>
            <span>P.IVA [numero]</span>
            <span>[Indirizzo della sede]</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-sm text-sky/80">{title}</p>
      <div className="mt-4 flex flex-col gap-2.5 text-base [&_a]:w-fit [&_a]:transition-colors [&_a:hover]:text-sky">{children}</div>
    </div>
  );
}
