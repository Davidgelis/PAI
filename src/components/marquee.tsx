"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

/* Generic infinite marquee (adapted from 21st.dev InfiniteSlider / Logo Cloud 4).
   Linear loop, optional hover slowdown, reduced-motion aware. */

export function Marquee({
  children,
  gap = 64,
  speed = 32,
  speedOnHover,
  reverse = false,
  className,
  fade = true,
}: {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  className?: string;
  fade?: boolean;
}) {
  const reduce = useReduceMotion();
  const [current, setCurrent] = useState(speed);
  const [ref, { width }] = useMeasure();
  const x = useMotionValue(0);
  const [transitioning, setTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (reduce || width === 0) return;
    const content = width + gap;
    const from = reverse ? -content / 2 : 0;
    const to = reverse ? 0 : -content / 2;
    let controls: ReturnType<typeof animate> | undefined;

    if (transitioning) {
      const remaining = Math.abs(x.get() - to);
      controls = animate(x, [x.get(), to], {
        ease: "linear",
        duration: remaining / current,
        onComplete: () => {
          setTransitioning(false);
          setKey((k) => k + 1);
        },
      });
    } else {
      controls = animate(x, [from, to], {
        ease: "linear",
        duration: Math.abs(to - from) / current,
        repeat: Infinity,
        repeatType: "loop",
        onRepeat: () => x.set(from),
      });
    }
    return () => controls?.stop();
  }, [key, x, current, width, gap, transitioning, reverse, reduce]);

  return (
    <div
      className={cn(
        "overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{ x, gap }}
        onHoverStart={() => {
          if (reduce || !speedOnHover) return;
          setTransitioning(true);
          setCurrent(speedOnHover);
        }}
        onHoverEnd={() => {
          if (reduce || !speedOnHover) return;
          setTransitioning(true);
          setCurrent(speed);
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
