"use client";

import { motion } from "framer-motion";
import { testimonials, site } from "@/lib/content";
import { VerticalMarquee } from "@/components/v2/marquee";
import { useReduceMotion } from "@/lib/use-reduce-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function BookmarkMark() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-900 text-mint"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
      </svg>
    </span>
  );
}

function QuoteCard({ quote, who }: { quote: string; who: string }) {
  return (
    <figure className="rounded-2xl border border-ink/12 bg-paper p-6 transition-colors duration-300 hover:border-ink/25">
      <div className="mb-4 flex items-center gap-3">
        <BookmarkMark />
        <figcaption className="text-sm font-semibold text-ink">{who}</figcaption>
      </div>
      <blockquote className="text-pretty leading-relaxed text-ink-soft">
        {quote}
      </blockquote>
    </figure>
  );
}

// distribute all 7 quotes across 3 columns with no quote repeated between them
const COLS = [
  [0, 3, 6],
  [1, 4],
  [2, 5],
].map((idxs) => idxs.map((i) => testimonials[i]));

export function Testimonials() {
  const reduce = useReduceMotion();

  return (
    <section
      id="loved"
      aria-label="What readers say"
      className="relative scroll-mt-24 overflow-hidden px-5 pb-24 pt-12 sm:px-8 lg:pb-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 max-w-2xl">
          <span className="label text-mint">Loved</span>
          <h2 className="mt-2 flex flex-wrap items-center gap-x-3 text-balance text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            People are loving
            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-mint sm:h-8 sm:w-8"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 21s-7.5-4.6-10-9.2C.6 8.9 2 5.5 5.2 5.1c2-.25 3.3.9 3.8 1.9.5-1 1.8-2.15 3.8-1.9 3.2.4 4.6 3.8 3.2 6.7C19.5 16.4 12 21 12 21Z" />
              </svg>
              <span className="text-ink">practicaly.ai</span>
            </span>
          </h2>
          <p className="mt-3 text-pretty text-ink-soft">
            {site.freeNote} Here is what readers tell us.
          </p>
        </div>
      </div>

      {/* marquee columns */}
      <div
        className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        style={
          reduce
            ? undefined
            : {
                maskImage:
                  "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
              }
        }
      >
        {COLS.map((col, ci) => (
          <motion.div
            key={ci}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: ci * 0.12 }}
            className={ci === 1 ? "hidden sm:block" : ci === 2 ? "hidden lg:block" : ""}
          >
            {reduce ? (
              <div className="flex flex-col gap-5">
                {col.map((t, i) => (
                  <QuoteCard key={i} quote={t.quote} who={t.who} />
                ))}
              </div>
            ) : (
              <VerticalMarquee
                className="h-[620px]"
                speed={ci === 1 ? 26 : 34}
                reverse={ci === 1}
                gap={20}
              >
                <div className="flex flex-col gap-5 pb-5">
                  {col.map((t, i) => (
                    <QuoteCard key={i} quote={t.quote} who={t.who} />
                  ))}
                </div>
              </VerticalMarquee>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
