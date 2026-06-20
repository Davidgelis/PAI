"use client";

import { motion } from "framer-motion";
import { brandMarks } from "@/lib/brand-marks";
import { useReduceMotion } from "@/lib/use-reduce-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Per-cell hover wash. Forest text on the bright fills, lime on the dark one,
   all AA-legible. Cycles the four brand structural colors across the grid. */
const WASH = [
  { bg: "var(--color-lime)", fg: "var(--color-forest-900)" },
  { bg: "var(--color-mint)", fg: "var(--color-forest-900)" },
  { bg: "var(--color-periwinkle)", fg: "var(--color-forest-900)" },
  { bg: "var(--color-forest-900)", fg: "var(--color-lime)" },
];

/* Hand-tuned optical sizes so wildly different marks read at one weight. */
const SIZE: Record<string, string> = {
  Claude: "h-7",
  OpenAI: "h-7",
  Perplexity: "h-7",
  Replit: "h-6",
  Notion: "h-7",
  Microsoft: "h-6",
  Zapier: "h-9",
  Meta: "h-6",
  Lovable: "h-6",
  HeyGen: "h-8",
};

export function LogoWall() {
  const reduce = useReduceMotion();

  return (
    <section
      aria-label="The tools we teach with"
      className="mx-auto max-w-[1400px] px-5 pb-20 pt-6 sm:px-8 lg:pb-28"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="label text-ink-dim">The toolkit</span>
          <h2 className="mt-2 max-w-[20ch] text-balance text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-ink sm:text-4xl">
            Fluent in the tools that
            <span className="text-ink-soft"> actually ship work.</span>
          </h2>
        </div>
        <p className="max-w-[34ch] text-pretty text-ink-soft">
          Every workflow, prompt, and teardown runs on the platforms you are
          already adopting. Hover to meet the stack.
        </p>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          show: {
            transition: reduce ? {} : { staggerChildren: 0.05 },
          },
        }}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-paper-edge ring-1 ring-paper-edge sm:grid-cols-3 md:grid-cols-5"
      >
        {brandMarks.map((mark, i) => {
          const wash = WASH[i % WASH.length];
          return (
            <motion.li
              key={mark.name}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
              style={
                {
                  ["--bg" as string]: wash.bg,
                  ["--fg" as string]: wash.fg,
                } as React.CSSProperties
              }
              className="group relative bg-paper"
            >
              <div className="flex h-28 flex-col items-center justify-center gap-2.5 text-ink transition-[color,background-color,transform] duration-300 ease-out group-hover:-translate-y-[3px] group-hover:bg-[var(--bg)] group-hover:text-[var(--fg)] sm:h-32">
                <span
                  className={`${SIZE[mark.name] ?? "h-7"} flex w-auto items-center justify-center [&_svg]:h-full [&_svg]:w-auto`}
                  aria-hidden
                  dangerouslySetInnerHTML={{ __html: mark.svg }}
                />
                <span className="label text-[0.6rem] text-ink-dim transition-colors duration-300 group-hover:text-[var(--fg)]">
                  {mark.name}
                </span>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
