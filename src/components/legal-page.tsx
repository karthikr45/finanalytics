import { brand } from "@/lib/site-content";

export interface LegalSection {
  heading: string;
  body: string[];
}

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      {/* Compact dark header band — every page needs one of these behind
          the fixed transparent nav, or the nav's light text has nothing
          to read against until you scroll. */}
      <section className="mesh-dark grain relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            {brand.legalName}
          </p>
          <h1 className="font-display mt-4 text-3xl text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-white/50">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-lg text-ink">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
