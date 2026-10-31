"use client";
import ScrollStack, { ScrollStackItem } from "@/components/rb/ScrollStack";
import { steps } from "@/content/site";

export function ProcessStack() {
  return (
    <div className="mt-16">
      <ScrollStack itemDistance={70} itemScale={0.03} itemStackDistance={28} stackPosition="22%" baseScale={0.9} dimAmount={0} blurAmount={0} rotationAmount={0} useWindowScroll>
        {steps.map((s, i) => (
          <ScrollStackItem key={s.title} itemClassName="!rounded-[var(--radius-panel)] !border !border-line !bg-white !shadow-[0_30px_80px_-40px_rgba(11,16,32,.25)] !p-0">
            <div className="grid h-full gap-8 p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:p-14">
              <div className="flex flex-col justify-between gap-10">
                <span className="font-mono text-sm text-mute">0{i + 1} / 04</span>
                <h3 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.04em]">{s.title}</h3>
              </div>
              <div className="flex flex-col justify-end gap-6">
                <p className="text-lg leading-relaxed text-mute">{s.text}</p>
                <p className="rounded-[var(--radius-card)] bg-tint px-6 py-5 text-[15px] text-ink">
                  <span className="font-semibold text-blue">Ottieni: </span>{s.out}
                </p>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}
