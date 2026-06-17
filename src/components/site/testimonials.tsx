"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { Stagger, Reveal } from "@/components/motion/primitives";
import { testimonials } from "@/lib/content";

/* Rotating testimonial, adapted from a 21st.dev-style design:
   oversized parallax index, vertical label, progress line, word-reveal quote,
   prev/next nav, and a faint bottom ticker. Re-skinned to forest + lime. */

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReduceMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);
  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const next = () => setIndex((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section
      id="loved"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      <Stagger className="mx-auto mb-14 max-w-6xl px-5 sm:px-6">
        <Reveal>
          <span className="label-mono text-mint">/ Social proof</span>
        </Reveal>
        <Reveal>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
            People are loving <span className="text-lime">practicaly.ai</span>
          </h2>
        </Reveal>
      </Stagger>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative mx-auto w-full max-w-5xl px-5 sm:px-6"
      >
        {/* Oversized index, bleeding off the left edge */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 select-none text-[18rem] font-bold leading-none tracking-tighter text-cream/[0.035] sm:block sm:text-[26rem]"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div className="relative flex">
          {/* Left rail: vertical label + progress */}
          <div className="hidden flex-col items-center justify-center border-r border-cream/10 pr-10 sm:flex">
            <span
              className="label-mono text-moss"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              Reader stories
            </span>
            <div className="relative mt-8 h-32 w-px bg-cream/10">
              <motion.div
                className="absolute left-0 top-0 w-full origin-top bg-lime"
                animate={{
                  height: `${((index + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center: the quote */}
          <div className="flex-1 py-6 sm:pl-12 sm:py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${index}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1 label-mono text-cream-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  Reader story
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="relative mb-12 min-h-[200px] sm:min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`quote-${index}`}
                  className="text-2xl font-light leading-[1.25] tracking-tight text-cream sm:text-[2rem]"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="text-lime">&ldquo;</span>
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="mr-[0.28em] inline-block"
                      variants={{
                        hidden: reduce
                          ? { opacity: 0 }
                          : { opacity: 0, y: 18, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: reduce ? 0 : i * 0.035,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -8,
                          transition: { duration: 0.2, delay: reduce ? 0 : i * 0.015 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  <span className="text-lime">&rdquo;</span>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="flex items-end justify-between gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`who-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="h-px w-8 bg-lime"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="font-medium text-cream">{current.who}</p>
                    <p className="text-sm text-moss">Practicaly AI</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3">
                {[
                  { label: "Previous reader story", on: prev, d: "M10 12L6 8L10 4" },
                  { label: "Next reader story", on: next, d: "M6 4L10 8L6 12" },
                ].map((b) => (
                  <motion.button
                    key={b.label}
                    onClick={b.on}
                    aria-label={b.label}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-cream/15 transition-colors hover:border-lime"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-lime transition-transform duration-300 ease-out group-hover:scale-y-100" />
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="relative z-10 text-cream transition-colors group-hover:text-forest-950"
                    >
                      <path
                        d={b.d}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Faint bottom ticker */}
        <div className="pointer-events-none absolute -bottom-16 left-0 right-0 overflow-hidden opacity-[0.06]">
          <motion.div
            className="flex whitespace-nowrap text-6xl font-bold tracking-tight text-cream"
            animate={reduce ? undefined : { x: [0, -1200] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-8">
                practicaly.ai &bull; make 1 billion people AI fluent &bull;
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
