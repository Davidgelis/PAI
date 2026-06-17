"use client";

import { motion } from "framer-motion";
import { Stagger, Reveal, fadeUp } from "@/components/motion/primitives";
import { news } from "@/lib/content";

export function News() {
  return (
    <section id="news" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-12">
        {/* Sticky heading rail */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Stagger>
              <Reveal>
                <span className="label-mono text-mint">/ The feed</span>
              </Reveal>
              <Reveal>
                <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                  AI news, filtered
                  <br />
                  <span className="text-moss">down to what matters.</span>
                </h2>
              </Reveal>
              <Reveal>
                <p className="mt-5 max-w-xs text-cream-dim">
                  Every weekday we read the firehose so you do not have to. The
                  update, why it matters, and what to do about it.
                </p>
              </Reveal>
              <Reveal>
                <a
                  href="#subscribe"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lime transition-colors hover:text-lime-soft"
                >
                  Get it in your inbox
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Reveal>
            </Stagger>
          </div>
        </div>

        {/* Index list */}
        <Stagger className="lg:col-span-8" gap={0.1}>
          <ul className="flex flex-col">
            {news.map((item, i) => (
              <motion.li key={item.title} variants={fadeUp}>
                <a
                  href="#subscribe"
                  className="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-cream/10 py-7 transition-colors sm:grid-cols-[auto_1fr_auto]"
                >
                  <span className="font-mono text-sm text-moss transition-colors group-hover:text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-cream transition-colors group-hover:text-lime sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-cream-dim">{item.blurb}</p>
                  </div>
                  <div className="col-start-2 flex items-center gap-3 text-xs text-moss sm:col-start-3 sm:flex-col sm:items-end sm:gap-1 sm:pl-6">
                    <span className="label-mono">{item.date}</span>
                    <span className="rounded-full border border-cream/10 px-2 py-0.5">
                      {item.read}
                    </span>
                  </div>
                  {/* hover accent line */}
                  <span className="absolute -left-3 top-7 h-0 w-[3px] origin-top rounded-full bg-lime transition-all duration-500 group-hover:h-[calc(100%-3.5rem)]" />
                </a>
              </motion.li>
            ))}
          </ul>
        </Stagger>
      </div>
    </section>
  );
}
