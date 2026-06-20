"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { labs, guides } from "@/lib/content";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const STEPS = ["Concept", "Image", "Video", "Measure"];
const STACK = labs.stack.split(" + ");

function ArrowOut({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* Signature visual: the ad-creative flywheel. A highlight travels the loop
   (Concept to Image to Video to Measure, then back), with the measured ROAS
   anchored below. Static + first-step-lit under reduced motion. */
function Flywheel() {
  const reduce = useReduceMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % STEPS.length),
      1300
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative flex h-full flex-col justify-between gap-8 rounded-2xl bg-forest-900 p-7 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="label text-mint">The flywheel</span>
        <span aria-hidden className="text-mint/70">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v5h-5" />
          </svg>
        </span>
      </div>

      {/* pipeline */}
      <ul className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-500",
                active === i
                  ? "bg-lime text-forest-900"
                  : "bg-forest-800 text-cream-dim"
              )}
            >
              {step}
            </span>
            {i < STEPS.length - 1 && (
              <ArrowOut className="h-4 w-4 text-cream-dim/50" />
            )}
          </li>
        ))}
        <li className="flex items-center gap-2">
          <ArrowOut className="h-4 w-4 rotate-180 text-mint/50" />
          <span className="label text-[0.6rem] text-mint/70">loops back</span>
        </li>
      </ul>

      {/* metric */}
      <div className="flex items-end justify-between border-t border-cream/10 pt-6">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold leading-none text-lime sm:text-6xl">
              {labs.metric.value}
            </span>
            <span className="label text-mint">{labs.metric.label}</span>
          </div>
          <p className="mt-2 text-sm text-cream-dim">
            measured per tested ad set
          </p>
        </div>
      </div>
    </div>
  );
}

function GuideCard({
  guide,
  index,
}: {
  guide: (typeof guides)[number];
  index: number;
}) {
  const reduce = useReduceMotion();
  return (
    <motion.a
      href="#labs"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className={cn(
        "group flex flex-col gap-4 p-7 transition-colors duration-300 hover:bg-paper sm:p-8",
        index > 0 && "border-t border-ink/12 lg:border-l lg:border-t-0"
      )}
    >
      <span className="label text-ink-dim">{guide.tag}</span>
      <h4 className="text-balance text-xl font-semibold leading-snug tracking-[-0.01em] text-ink">
        {guide.title}
      </h4>
      <p className="text-pretty leading-relaxed text-ink-soft">{guide.blurb}</p>
      <span className="mt-auto flex items-center justify-between pt-2">
        <span className="text-[0.78rem] text-ink-dim">{guide.date}</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          Read the guide
          <ArrowOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
    </motion.a>
  );
}

export function Labs() {
  const reduce = useReduceMotion();
  return (
    <section
      id="labs"
      aria-label="PAI Labs and guides"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pb-20 pt-10 sm:px-8 lg:pb-28"
    >
      <div className="mb-9 max-w-2xl">
        <span className="label text-mint">Build something</span>
        <h2 className="mt-2 text-balance text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
          Deep dives and guides you can run today.
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-ink/12">
        {/* featured PAI Labs teardown */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid gap-8 p-7 sm:p-9 lg:grid-cols-2 lg:gap-12 lg:p-12"
        >
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center rounded-full bg-ink px-3 py-1 text-[0.7rem] font-bold tracking-wide text-lime">
                  {labs.tag}
                </span>
                <span className="label text-ink-dim">{labs.date}</span>
              </div>
              <h3 className="mt-5 text-balance text-[clamp(1.8rem,3vw,2.75rem)] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
                {labs.title}
              </h3>
              <p className="mt-5 max-w-[46ch] text-pretty text-lg leading-relaxed text-ink-soft">
                {labs.blurb}
              </p>
            </div>

            <div>
              {/* stack chips */}
              <div className="mb-6 flex flex-wrap gap-2">
                {STACK.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg border border-ink/15 bg-paper px-3 py-1.5 text-sm font-medium text-ink-soft"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <a
                href="#labs"
                className="group inline-flex items-center gap-2 text-base font-semibold text-ink"
              >
                Read the teardown
                <ArrowOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>

          <Flywheel />
        </motion.div>

        {/* free guides row */}
        <div className="border-t border-ink/12">
          <div className="flex items-center justify-between px-7 pt-7 sm:px-9 lg:px-12">
            <span className="label text-ink-dim">Free guides</span>
            <a
              href="#labs"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-lime-deep"
            >
              Read all
              <ArrowOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="grid lg:grid-cols-3">
            {guides.map((guide, i) => (
              <GuideCard key={guide.title} guide={guide} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
