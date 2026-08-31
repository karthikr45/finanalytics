"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
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
      <p className="font-display text-3xl text-ink sm:text-4xl">
        {prefix}
        {display.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
    </div>
  );
}
