import { ArrowUpRight, Check } from "lucide-react";
import { iconMap } from "@/components/icon-map";
import type { Service } from "@/lib/services-data";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <div
      id={service.slug}
      className="card-lift group relative flex scroll-mt-28 flex-col rounded-3xl border border-ink/8 bg-white p-7 shadow-[0_1px_2px_rgba(10,15,30,0.04)] sm:p-8"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.04] text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-gold-light">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <ArrowUpRight className="h-5 w-5 text-ink/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
      </div>

      <h3 className="font-display mt-6 text-xl text-ink">{service.title}</h3>
      <p className="mt-1 text-sm font-medium text-gold">{service.tagline}</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
        {service.description}
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-ink/8 pt-6">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" strokeWidth={2.25} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
