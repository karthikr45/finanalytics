"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/site-content";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="rounded-[2rem] border border-ink/8 bg-white p-8 sm:p-12">
        <Quote className="h-8 w-8 text-emerald/30" strokeWidth={1.5} />
        <div className="relative mt-4 min-h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
                &ldquo;{active.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-soft text-sm font-semibold text-emerald">
                  {active.name.charAt(0)}
                </span>
                <p className="text-sm font-semibold text-ink">{active.name}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 text-ink/60 transition-colors hover:bg-ink/5"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-emerald" : "w-1.5 bg-ink/15"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 text-ink/60 transition-colors hover:bg-ink/5"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
