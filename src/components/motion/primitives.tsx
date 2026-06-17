"use client";

import {
  motion,
  type Variants,
  type Transition,
} from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
   Motion language (single source of truth).
   Restrained, choreographed: one easing curve, deliberate stagger, calm timing.
   Everything respects prefers-reduced-motion via useReducedMotion().
---------------------------------------------------------------------------- */

export const EASE = [0.16, 1, 0.3, 1] as const; // expo-out, the house curve

export const ease: Transition = { duration: 0.7, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: ease },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: ease },
};

/** Container that staggers its children into view, once, when scrolled to. */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
  amount = 0.3,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  amount?: number;
  as?: "div" | "section" | "ul" | "header" | "footer";
}) {
  const reduce = useReduceMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? {}
            : { staggerChildren: gap, delayChildren: delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** A single child of <Stagger>, or a standalone reveal. */
export function Reveal({
  children,
  className,
  variant = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: Variants;
  as?: "div" | "li" | "span" | "p" | "h2" | "h3";
}) {
  const reduce = useReduceMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={reduce ? fadeIn : variant}
    >
      {children}
    </MotionTag>
  );
}

/** Word-by-word display headline reveal. Falls back to a plain fade. */
export function RevealWords({
  text,
  className,
  highlight,
  delay = 0,
}: {
  text: string;
  className?: string;
  /** words (by exact match) to paint in lime */
  highlight?: string[];
  delay?: number;
}) {
  const reduce = useReduceMotion();
  const words = text.split(" ");
  const hi = new Set((highlight ?? []).map((w) => w.toLowerCase()));

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span
            key={i}
            className={hi.has(w.toLowerCase()) ? "text-lime" : undefined}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={cn(
              "inline-block will-change-transform",
              hi.has(w.toLowerCase()) && "text-lime"
            )}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.8, ease: EASE },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </motion.span>
  );
}
