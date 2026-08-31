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
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
          {brand.legalName}
        </p>
        <h1 className="font-display mt-4 text-3xl text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>

        <div className="mt-10 space-y-10">
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
  );
}
