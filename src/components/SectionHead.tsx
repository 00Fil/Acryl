import { Reveal } from "./Reveal";

/** Intestazione di sezione: numero, titolo diretto, nota. Stessa struttura ovunque. */
export function SectionHead({ index, eyebrow, title, lead, split = false }: { index?: string; eyebrow?: string; title: string; lead?: string; split?: boolean }) {
  return (
    <div className={split ? "grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end" : "max-w-4xl"}>
      <Reveal>
        {(index || eyebrow) && (
          <p className="eyebrow flex items-center gap-3">
            {index && <span className="font-mono text-[13px] font-normal tracking-normal text-mute">{index}</span>}
            {eyebrow}
          </p>
        )}
        <h2 className="heading mt-5">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.08}>
          <p className="max-w-md text-lg leading-relaxed text-mute lg:justify-self-end">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
