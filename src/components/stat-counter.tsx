"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  tone = "light",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** "light" = for use on paper/white backgrounds (default), "dark" = for use on dark/navy backgrounds (e.g. mesh-dark sections) */
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 32, stiffness: 90 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsub = springValue.on("change", (v) => setDisplay(Math.floor(v)));
    return unsub;
  }, [springValue]);

  return (
    <div ref={ref}>
      <p
        className={cn(
          "font-display text-3xl sm:text-4xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {prefix}
        {display.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p
        className={cn(
          "mt-1.5 text-xs font-medium uppercase tracking-wider",
          tone === "dark" ? "text-white/50" : "text-muted",
        )}
      >
        {label}
      </p>
    </div>
  );
}
