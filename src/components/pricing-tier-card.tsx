import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PricingTier {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingTierCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-8",
        tier.highlighted
          ? "border-emerald bg-ink text-white shadow-[0_24px_60px_-30px_rgba(15,81,50,0.5)]"
          : "border-ink/8 bg-white text-ink",
      )}
    >
      {tier.highlighted && (
        <Badge variant="gold" className="absolute -top-3 left-8">
          Most chosen
        </Badge>
      )}
      <h3 className={cn("font-display text-xl", tier.highlighted ? "text-white" : "text-ink")}>
        {tier.name}
      </h3>
      <p className={cn("mt-2 text-sm leading-relaxed", tier.highlighted ? "text-white/60" : "text-muted")}>
        {tier.description}
      </p>
      <p className={cn("mt-6 text-sm font-semibold", tier.highlighted ? "text-gold-light" : "text-emerald")}>
        Custom quote — based on your filings
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li
            key={f}
            className={cn(
              "flex items-start gap-2.5 text-sm",
              tier.highlighted ? "text-white/80" : "text-ink/75",
            )}
          >
            <Check
              className={cn("mt-0.5 h-4 w-4 shrink-0", tier.highlighted ? "text-gold-light" : "text-emerald")}
              strokeWidth={2.25}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={tier.highlighted ? "gold" : "outline"}
        className="mt-8 w-full"
      >
        <Link href="/contact">Request this package</Link>
      </Button>
    </div>
  );
}
