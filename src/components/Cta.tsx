import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function Cta({ title = "Hai un processo da migliorare?", text }: { title?: string; text?: string }) {
  return (
    <section className="px-4 pt-32 md:pt-44">
      <div className="relative overflow-hidden rounded-[3rem] bg-blue text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-[18%] h-80 w-80 rounded-[4rem] bg-ink/25 mix-blend-multiply" />
        <div className="wrap relative flex flex-wrap items-end justify-between gap-10 py-24 md:py-32">
          <Reveal className="max-w-3xl">
            <h2 className="h-section !text-[clamp(2.5rem,5.6vw,5rem)]">{title}</h2>
            {text && <p className="mt-6 max-w-xl text-lg text-white/85">{text}</p>}
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/preventivo" variant="white">Calcola il preventivo</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
