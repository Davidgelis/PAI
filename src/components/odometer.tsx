"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
} from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";

/* Count-up odometer. Ticks toward the target once in view. */
export function Odometer({
  to,
  duration = 2.4,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReduceMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  // Reduced motion shows the final value with no animation.
  const display = reduce ? to : value;

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
    </span>
  );
}
