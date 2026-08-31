"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, services } from "@/lib/services-data";
import ServiceCard from "@/components/service-card";

export default function ServicesExplorer() {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return services;
    return services.filter((s) => s.category === active);
  }, [active]);

  return (
    <div>
      <div className="no-scrollbar -mx-6 flex gap-2.5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
            active === "all"
              ? "bg-ink text-white"
              : "bg-ink/[0.05] text-ink/70 hover:bg-ink/10"
          }`}
        >
          All services
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActive(cat.id)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              active === cat.id
                ? "bg-ink text-white"
                : "bg-ink/[0.05] text-ink/70 hover:bg-ink/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((service) => (
            <motion.div
              key={service.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
