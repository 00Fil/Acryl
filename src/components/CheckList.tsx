import { Check } from "./Check";
import { Reveal } from "./Reveal";

export function CheckList({ items, tone = "tint" }: { items: string[]; tone?: "tint" | "white" }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((t, i) => (
        <Reveal key={t} delay={i * 0.07} y={20}>
          <li className={`flex items-center gap-4 rounded-2xl border border-line px-5 py-4 text-[17px] transition-colors duration-300 hover:border-blue/50 ${tone === "tint" ? "bg-tint" : "bg-white"}`}>
            <Check size={28} />
            {t}
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
