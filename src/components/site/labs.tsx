"use client";

import { motion } from "framer-motion";
import { Stagger, Reveal, fadeUp, EASE } from "@/components/motion/primitives";
import { OrbitalPipeline } from "@/components/orbital-pipeline";
import { labs, guides } from "@/lib/content";

export function Labs() {
  return (
    <section id="labs" className="relative scroll-mt-24 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Stagger className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <span className="label-mono text-mint">/ Go deeper</span>
            </Reveal>
            <Reveal>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
                Labs and guides
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm font-medium text-cream-dim transition-colors hover:border-lime/50 hover:text-cream"
            >
              Read all guides
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 12L12 4M12 4H5M12 4v7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>
        </Stagger>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Featured Labs */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            id="guides"
            className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-gradient-to-br from-forest-800 to-forest-900 p-7 scroll-mt-24 sm:p-9 lg:col-span-7"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-lime/10 blur-3xl transition-opacity duration-700 group-hover:opacity-150"
              aria-hidden
            />
            <div className="relative grid items-center gap-8 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-mint/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-mint">
                    {labs.tag}
                  </span>
                  <span className="label-mono text-moss">{labs.date}</span>
                </div>
                <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {labs.title}
                </h3>
                <p className="mt-2 font-mono text-sm text-lime">{labs.stack}</p>
                <p className="mt-4 max-w-md text-cream-dim">{labs.blurb}</p>
                <a
                  href="#subscribe"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cream transition-colors hover:text-lime"
                >
                  Open the playbook
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
              </div>
              <div className="py-4">
                <OrbitalPipeline />
              </div>
            </div>
          </motion.article>

          {/* Guides stack */}
          <Stagger className="grid gap-5 lg:col-span-5" gap={0.1}>
            {guides.map((g) => (
              <motion.a
                key={g.title}
                href="#subscribe"
                variants={fadeUp}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-cream/10 bg-forest-850 p-5 transition-colors hover:border-lime/40"
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono text-mint">{g.tag}</span>
                  <span className="label-mono text-moss">{g.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-cream transition-colors group-hover:text-lime">
                  {g.title}
                </h3>
                <p className="mt-1.5 text-sm text-cream-dim">{g.blurb}</p>
              </motion.a>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
