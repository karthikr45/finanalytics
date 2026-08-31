import { MapPin, Navigation } from "lucide-react";
import type { branches } from "@/lib/site-content";

export default function BranchLocationCard({
  branch,
}: {
  branch: (typeof branches)[number];
}) {
  const query = encodeURIComponent(`${branch.name}, ${branch.lines.join(", ")}`);

  return (
    <div className="rounded-3xl border border-ink/8 bg-white p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-soft text-emerald">
        <MapPin className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="font-display mt-4 text-lg text-ink">{branch.name}</h3>
      <address className="mt-2 not-italic text-sm leading-relaxed text-muted">
        {branch.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      <a
        href={`https://maps.google.com/?q=${query}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:text-emerald-light"
      >
        Get directions
        <Navigation className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
