import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ServiceDetail } from "@/lib/services-content";
import { Badge } from "@/components/ui/badge";

type ServiceCardProps = {
  service: ServiceDetail;
  image?: { src: string; alt: string };
};

export default function ServiceCard({ service, image }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-[0_1px_2px_rgba(11,18,32,0.04)]"
    >
      {image && (
        <div className="relative aspect-video overflow-hidden border-b border-ink/8">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/20 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.04] text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-gold-light">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <ArrowUpRight className="h-5 w-5 text-ink/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald" />
        </div>

        <Badge variant="outline" className="mt-5 w-fit normal-case tracking-normal">
          {service.category}
        </Badge>

        <h3 className="font-display mt-3 text-xl text-ink">{service.title}</h3>
        <p className="mt-1 text-sm font-medium text-emerald">{service.tagline}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {service.summary}
        </p>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          Learn more
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
