import { ShieldCheck, TrendingUp, Layers, Users } from "lucide-react";
import Reveal from "@/components/reveal";
import { trustBadges } from "@/lib/site-content";

const icons = [ShieldCheck, TrendingUp, Layers, Users];

export default function TrustBadgeRow() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {trustBadges.map((badge, i) => {
        const Icon = icons[i % icons.length];
        return (
          <Reveal key={badge.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-ink/8 bg-white p-5">
              <Icon className="h-5 w-5 text-emerald" strokeWidth={1.75} />
              <p className="font-display mt-3 text-sm text-ink">{badge.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{badge.description}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
