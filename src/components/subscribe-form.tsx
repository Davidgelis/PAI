"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/primitives";

/* Subscribe form with an animated primary action.
   The button has a lime wipe on hover and a check/confirm state on submit. */

export function SubscribeForm({
  className,
  size = "lg",
}: {
  className?: string;
  size?: "lg" | "sm";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");
  const reduce = useReduceMotion();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) return;
    setState("done");
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "group/form relative flex w-full items-center gap-2 rounded-full border border-cream/15 bg-forest-950/50 p-1.5 backdrop-blur-md transition-colors focus-within:border-lime/60",
        size === "lg" ? "max-w-md" : "max-w-sm",
        className
      )}
    >
      <label htmlFor="subscribe-email" className="sr-only">
        Email address
      </label>
      <input
        id="subscribe-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@work.com"
        autoComplete="email"
        className={cn(
          "min-w-0 flex-1 bg-transparent px-4 text-cream placeholder:text-moss focus:outline-none",
          size === "lg" ? "py-2.5 text-base" : "py-2 text-sm"
        )}
      />
      <button
        type="submit"
        disabled={state === "done"}
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full font-semibold text-forest-950 transition-transform active:scale-[0.97]",
          size === "lg" ? "px-6 py-2.5 text-base" : "px-5 py-2 text-sm"
        )}
      >
        {/* animated lime fill */}
        <span className="absolute inset-0 bg-lime" />
        {!reduce && (
          <span className="absolute inset-0 origin-left scale-x-0 bg-lime-soft transition-transform duration-500 ease-out group-hover/form:scale-x-100" />
        )}
        {/* inner top highlight for tactility */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 to-transparent opacity-60" />
        {/* diagonal shine sweep on hover */}
        {!reduce && (
          <span className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute -inset-y-2 -left-1/3 w-1/3 -skew-x-12 bg-white/45 blur-[2px] transition-transform duration-700 ease-out group-hover/form:translate-x-[420%]" />
          </span>
        )}
        <span className="relative flex items-center gap-2">
          <AnimatePresence mode="wait" initial={false}>
            {state === "idle" ? (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-2"
              >
                Subscribe
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover/form:translate-x-0.5"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            ) : (
              <motion.span
                key="done"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-2"
              >
                You are in
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5l3.2 3.2L13 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </form>
  );
}
