"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Image as ImageIcon, Play, BarChart3 } from "lucide-react";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { labs } from "@/lib/content";

/* Orbital pipeline, adapted from a radial orbital timeline.
   Auto-rotating stages around a live center hub. Hovering or focusing a stage
   pauses rotation, lights the node lime, threads a line to the hub, and shows
   that stage in the center. Re-skinned to forest + lime (no purple/blue/black). */

const stages = [
  {
    title: "Concept",
    icon: Lightbulb,
    detail: "Claude drafts angles and hooks from your brief.",
  },
  {
    title: "Image",
    icon: ImageIcon,
    detail: "Generate on-brand creative variants in minutes.",
  },
  {
    title: "Video",
    icon: Play,
    detail: "Higgsfield turns the best frames into motion.",
  },
  {
    title: "Measure",
    icon: BarChart3,
    detail: "Meta Ads reports ROAS, feeding the next concept.",
  },
];

export function OrbitalPipeline() {
  const reduce = useReduceMotion();
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const rafPausedRef = useRef(false);
  useEffect(() => {
    rafPausedRef.current = active !== null || reduce;
  }, [active, reduce]);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!rafPausedRef.current) {
        setAngle((a) => (a + dt * 0.012) % 360);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const radius = 38; // percent of the box from center
  const pos = (i: number) => {
    const a = ((i / stages.length) * 360 + angle - 90) * (Math.PI / 180);
    return { x: 50 + Math.cos(a) * radius, y: 50 + Math.sin(a) * radius };
  };

  const activeStage = active !== null ? stages[active] : null;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      {/* connecting line to the active node */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(234,243,236,0.1)"
          strokeWidth="0.4"
          strokeDasharray="1.5 2"
        />
        {active !== null && (
          <motion.line
            key={active}
            x1="50"
            y1="50"
            x2={pos(active).x}
            y2={pos(active).y}
            stroke="rgba(200,242,80,0.55)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </svg>

      {/* nodes */}
      {stages.map((s, i) => {
        const p = pos(i);
        const isActive = active === i;
        const Icon = s.icon;
        return (
          <button
            key={s.title}
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => setActive((cur) => (cur === i ? null : i))}
            aria-label={`${s.title}: ${s.detail}`}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                isActive
                  ? "scale-125 border-lime bg-lime text-forest-950 shadow-[0_0_20px_rgba(200,242,80,0.5)]"
                  : "border-cream/20 bg-forest-950/80 text-mint backdrop-blur"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
            </span>
            <span
              className={`absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap label-mono transition-colors ${
                isActive ? "text-lime" : "text-moss"
              }`}
            >
              {s.title}
            </span>
          </button>
        );
      })}

      {/* center hub */}
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        {!reduce && (
          <>
            <span className="absolute h-full w-full animate-ping rounded-full border border-lime/20" />
            <span className="absolute h-[120%] w-[120%] rounded-full border border-lime/10" />
          </>
        )}
        <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-lime/40 bg-lime/10 text-center backdrop-blur">
          <AnimatePresence mode="wait">
            {activeStage ? (
              <motion.div
                key={activeStage.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.22 }}
                className="px-3"
              >
                <p className="label-mono text-mint">{activeStage.title}</p>
                <p className="mt-1 text-[0.62rem] leading-tight text-cream-dim">
                  {activeStage.detail}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="roas"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.22 }}
              >
                <p className="label-mono text-cream-dim">{labs.metric.label}</p>
                <p className="text-2xl font-bold text-lime">
                  {labs.metric.value}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
