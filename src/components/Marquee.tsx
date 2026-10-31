export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div className="flex flex-none items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t} className="flex items-center gap-10">
          {t}
          <span className="h-2 w-2 rounded-full bg-white/70" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden bg-blue py-7 text-white">
      <div className="flex w-max whitespace-nowrap text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-tight [animation:marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
