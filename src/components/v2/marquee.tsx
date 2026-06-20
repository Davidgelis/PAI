"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import useMeasure from "react-use-measure";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { cn } from "@/lib/utils";

/* Vertical infinite marquee, adapted from 21st.dev's InfiniteSlider engine
   (framer-motion + react-use-measure). Children are doubled for a seamless
   loop; speed eases down on hover. Under reduced motion it renders a static
   stack with no animation. */
export function VerticalMarquee({
  children,
  speed = 40,
  speedOnHover = 10,
  reverse = false,
  gap = 18,
  className,
}: {
  children: ReactNode;
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  gap?: number;
  className?: string;
}) {
  const reduce = useReduceMotion();
  const [ref, { height }] = useMeasure();
  const y = useMotionValue(0);
  const [current, setCurrent] = useState(speed);

  useEffect(() => {
    if (reduce || height === 0) return;
    const content = height + gap;
    const from = reverse ? -content / 2 : 0;
    const to = reverse ? 0 : -content / 2;
    const distance = Math.abs(to - from);
    const controls = animate(y, [from, to], {
      ease: "linear",
      duration: distance / current,
      repeat: Infinity,
      repeatType: "loop",
      onRepeat: () => y.set(from),
    });
    return () => controls.stop();
  }, [height, current, reverse, gap, reduce, y]);

  if (reduce) {
    return (
      <div className={cn("flex flex-col", className)} style={{ gap }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      onPointerEnter={() => setCurrent(speedOnHover)}
      onPointerLeave={() => setCurrent(speed)}
    >
      <motion.div
        ref={ref}
        className="flex flex-col"
        style={{ y, gap }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
