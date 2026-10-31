import { principles } from "@/content/site";
import { Reveal } from "./Reveal";

export function Principles() {
  return (
    <div className="border-b border-line">
      {principles.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.05} y={24}>
          <div className="group grid items-baseline gap-4 border-t border-line px-0 py-9 transition-all duration-500 ease-expo hover:rounded-3xl hover:border-transparent hover:bg-tint hover:px-8 md:grid-cols-[3.5rem_minmax(0,5fr)_minmax(0,6fr)]">
            <span className="text-sm font-semibold text-blue">0{i + 1}</span>
            <h3 className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em]">{p.title}</h3>
            <p className="text-[17px] leading-relaxed text-mute">{p.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
