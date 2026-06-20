"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { Magnetic } from "@/components/v2/magnetic";
import { site, news, labs } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------------------
   Kinetic Headline hero — "Daylight Broadcast"
   Type is the hero. Words clip-reveal on load, then drift toward the pointer by
   depth (the chartreuse focal words lead). A forest subscribe card insets for
   contrast. Everything degrades to static under prefers-reduced-motion.
--------------------------------------------------------------------------- */

type Word = { t: string; hi?: boolean; depth: number };

const LINES: Word[][] = [
  [{ t: "Make", depth: 0.4 }],
  [
    { t: "1 billion", hi: true, depth: 1 },
    { t: "people", depth: 0.55 },
  ],
  [
    { t: "AI", depth: 0.7 },
    { t: "fluent.", depth: 0.7 },
  ],
];

function KineticWord({
  word,
  index,
  px,
  py,
  reduce,
}: {
  word: Word;
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  reduce: boolean;
}) {
  // pointer drift, scaled by the word's depth
  const tx = useTransform(px, (v) => v * 26 * word.depth);
  const ty = useTransform(py, (v) => v * 16 * word.depth);

  return (
    <span className="inline-block overflow-hidden pb-[0.12em] pr-[0.1em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 + index * 0.075 }}
      >
        <motion.span
          className={cn(
            "inline-block will-change-transform",
            word.hi && "relative"
          )}
          style={reduce ? undefined : { x: tx, y: ty }}
        >
          {word.hi ? (
            <span className="relative z-10 whitespace-nowrap px-[0.16em] text-forest-900">
              {word.t}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-[0.08em] top-[0.16em] -z-10 -skew-x-3 rounded-[3px] bg-lime"
              />
            </span>
          ) : (
            word.t
          )}
        </motion.span>
      </motion.span>
    </span>
  );
}

function SubscribeCard() {
  const reduce = useReduceMotion();
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-forest-900 p-6 sm:p-7"
    >
      {/* corner stamp */}
      <div className="mb-5 flex items-center justify-between">
        <span className="label text-mint">Daily edition</span>
        <span className="label text-cream-dim">Free</span>
      </div>

      <p className="max-w-[34ch] text-pretty text-[0.98rem] leading-relaxed text-cream-dim">
        {site.valueProp}
      </p>

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) setDone(true);
        }}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <label className="sr-only" htmlFor="hero-email">
            Email address
          </label>
          <input
            id="hero-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@work.com"
            className="h-12 w-full flex-1 rounded-xl border border-cream/15 bg-forest-950/60 px-4 text-cream placeholder:text-cream-dim/60 focus:border-mint/60 focus:outline-none"
          />
          <Magnetic strength={0.4} radius={90}>
            <button
              type="submit"
              className="group relative h-12 w-full overflow-hidden rounded-xl bg-lime px-6 font-semibold text-forest-900 transition-[transform] active:scale-[0.98] sm:w-auto"
            >
              <span className="relative z-10">
                {done ? "You're in" : "Subscribe"}
              </span>
              {/* shine sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </Magnetic>
        </div>
        <p className="mt-3 text-[0.8rem] text-cream-dim">
          {done ? "Check your inbox for the next drop." : site.freeNote}
        </p>
      </form>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReduceMotion();
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 120, damping: 24, mass: 0.6 });
  const spy = useSpring(py, { stiffness: 120, damping: 24, mass: 0.6 });

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function reset() {
    px.set(0);
    py.set(0);
  }

  let wi = -1;

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-label="Practicaly AI"
      className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-6 sm:px-8 lg:pb-24"
    >
      {/* slim brand bar (full nav arrives at the nav gate) */}
      <header className="flex items-center justify-between py-4">
        <span className="flex items-center gap-2 text-[1.05rem] font-bold tracking-tight">
          <span
            aria-hidden
            className="grid h-6 w-5 place-items-center rounded-[3px] bg-ink text-[10px] font-bold text-lime"
          >
            P
          </span>
          Practicaly<span className="text-ink-dim">AI</span>
        </span>
        <div className="flex items-center gap-2 text-sm font-medium">
          <a
            href="#subscribe"
            className="hidden rounded-full px-3 py-1.5 text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Log in
          </a>
          <a
            href="#subscribe"
            className="rounded-full bg-ink px-4 py-1.5 text-cream transition-colors hover:bg-forest-800"
          >
            Join to master AI
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        {/* Headline column */}
        <div className="lg:col-span-8">
          <motion.span
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="label inline-flex items-center gap-2 text-ink-soft"
          >
            <span className="h-2 w-2 rounded-full bg-mint" />
            On a mission
          </motion.span>

          <h1 className="mt-5 font-bold leading-[0.92] tracking-[-0.03em] text-ink">
            {LINES.map((line, li) => (
              <span key={li} className="flex flex-wrap items-end gap-x-[0.28em]">
                {line.map((w) => {
                  wi += 1;
                  return (
                    <span
                      key={wi}
                      className="text-[clamp(2.75rem,9vw,7.5rem)]"
                    >
                      <KineticWord
                        word={w}
                        index={wi}
                        px={spx}
                        py={spy}
                        reduce={reduce}
                      />
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="mt-7 max-w-[46ch] text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            Daily AI updates, workflows, and prompts that make artificial
            intelligence genuinely useful. For everyone, not just engineers.
          </motion.p>
        </div>

        {/* Subscribe + meta column */}
        <div id="subscribe" className="flex flex-col gap-5 lg:col-span-4">
          <SubscribeCard />

          {/* color-block meta strip: brand identity as structure */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
            className="grid grid-cols-3 overflow-hidden rounded-2xl border border-paper-edge"
          >
            <div className="flex flex-col gap-1 bg-mint px-4 py-5 text-forest-900">
              <span className="text-2xl font-bold leading-none">1B</span>
              <span className="text-[0.7rem] font-medium leading-tight">
                the goal
              </span>
            </div>
            <div className="flex flex-col gap-1 bg-periwinkle px-4 py-5 text-forest-900">
              <span className="text-2xl font-bold leading-none">Daily</span>
              <span className="text-[0.7rem] font-medium leading-tight">
                in your inbox
              </span>
            </div>
            <div className="flex flex-col gap-1 bg-paper px-4 py-5 text-ink">
              <span className="text-2xl font-bold leading-none">Free</span>
              <span className="text-[0.7rem] font-medium leading-tight text-ink-dim">
                no catch
              </span>
            </div>
          </motion.div>

          {/* inside today's edition — accurate teasers, fills height + sells value */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.84 }}
            className="rounded-2xl border border-paper-edge bg-paper p-5"
          >
            <span className="label text-ink-dim">Inside today</span>
            <ul className="mt-3 flex flex-col divide-y divide-paper-edge">
              {[
                { dot: "bg-lime", tag: news[0].tag, title: news[0].title },
                { dot: "bg-mint", tag: labs.tag, title: labs.title },
                { dot: "bg-periwinkle", tag: news[1].tag, title: news[1].title },
              ].map((row) => (
                <li key={row.title} className="group flex gap-3 py-2.5">
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      row.dot
                    )}
                  />
                  <span className="min-w-0">
                    <span className="label block text-[0.6rem] text-ink-dim">
                      {row.tag}
                    </span>
                    <span className="line-clamp-1 text-[0.92rem] font-medium leading-snug text-ink">
                      {row.title}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
