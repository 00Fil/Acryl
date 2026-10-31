import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", robots: { index: false } };

export default function Privacy() {
  return (
    <section className="wrap max-w-3xl pt-24 pb-8">
      <h1 className="h-section">Privacy</h1>
      <p className="mt-6 text-lg leading-relaxed text-mute">
        Bozza da completare con un consulente legale prima della pubblicazione: titolare del trattamento, finalità (risposta alle richieste di preventivo), base giuridica, tempi di conservazione, fornitori coinvolti (hosting, invio email) e diritti dell&apos;interessato.
      </p>
    </section>
  );
}
