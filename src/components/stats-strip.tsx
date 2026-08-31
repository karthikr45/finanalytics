import { stats } from "@/lib/services-data";
import Reveal from "@/components/reveal";

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/8 bg-ink/8 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08} className="bg-paper">
          <div className="flex h-full flex-col justify-center px-6 py-8 sm:px-8">
            <p className="font-display text-2xl text-ink sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted">
              {stat.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
