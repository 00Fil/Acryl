import BlurText from "@/components/rb/BlurText";
import { Reveal } from "./Reveal";

/** Intestazione di sezione: indice, titolo che si mette a fuoco, nota. Stessa struttura ovunque. */
export function SectionHead({ index, eyebrow, title, lead, split = false }: { index?: string; eyebrow?: string; title: string; lead?: string; split?: boolean }) {
  return (
    <div className={split ? "grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end" : "max-w-4xl"}>
      <div>
        {(index || eyebrow) && (
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              {index && <span className="font-mono text-[13px] font-normal tracking-normal text-mute">{index}</span>}
              {eyebrow}
            </p>
          </Reveal>
        )}
        <h2 className="sr-only">{title}</h2>
        <BlurText text={title} animateBy="words" direction="bottom" delay={60} className="heading mt-5" />
      </div>
      {lead && (
        <Reveal delay={0.15}>
          <p className="max-w-md text-lg leading-relaxed text-mute lg:justify-self-end">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
