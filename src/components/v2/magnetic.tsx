"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { cn } from "@/lib/utils";

/* A magnetic surface: gently pulls toward the pointer while hovered, then
   springs back to rest. Disabled under prefers-reduced-motion. */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 120,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "div" | "span";
}) {
  const reduce = useReduceMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const pull = Math.max(0, 1 - dist / (radius + r.width / 2));
    x.set(dx * strength * pull);
    y.set(dy * strength * pull);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </MotionTag>
  );
}
