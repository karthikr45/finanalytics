import Reveal from "@/components/reveal";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((item, i) => (
        <Reveal key={item.step} delay={i * 0.1}>
          <div className="relative h-full rounded-3xl border border-ink/8 bg-white p-7">
            <span className="font-display text-4xl text-ink/10">
              {item.step}
            </span>
            <h3 className="font-display mt-4 text-lg text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
            {i < steps.length - 1 && (
              <div className="absolute right-[-12px] top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-ink/15 to-transparent lg:block" />
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
