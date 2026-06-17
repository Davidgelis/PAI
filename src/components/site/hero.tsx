"use client";

import { motion } from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { FluencyField } from "@/components/fluency-field";
import { SubscribeForm } from "@/components/subscribe-form";
import { Odometer } from "@/components/odometer";
import { LogoMarquee } from "@/components/logo-marquee";
import { RevealWords, Stagger, Reveal, EASE } from "@/components/motion/primitives";
import { site, stats } from "@/lib/content";

export function Hero() {
  const reduce = useReduceMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-28 pb-10 sm:pt-32"
    >
      {/* Backdrop layers */}
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute inset-0" aria-hidden>
        <FluencyField className="opacity-90" />
      </div>
      {/* Radial vignette to seat the type, lime cast from lower-left */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(120% 90% at 12% 110%, rgba(200,242,80,0.12), transparent 55%), radial-gradient(90% 70% at 90% 0%, rgba(39,234,166,0.07), transparent 60%), linear-gradient(to bottom, rgba(11,36,30,0.2), rgba(11,36,30,0.85))",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-5 sm:px-6">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-12">
          {/* Left: the statement */}
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cream/10 bg-forest-950/40 px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              <span className="label-mono text-cream-dim">
                Daily AI fluency, in plain language
              </span>
            </motion.div>

            <h1 className="text-balance text-[2.6rem] font-bold leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-[4.6rem]">
              <RevealWords
                text="On a mission to make"
                className="text-cream"
              />{" "}
              <span className="relative inline-block">
                <RevealWords
                  text="1 Billion"
                  highlight={["1", "billion"]}
                  delay={0.3}
                />
                {!reduce && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-lime"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
                  />
                )}
              </span>{" "}
              <RevealWords
                text="people AI fluent."
                className="text-cream"
                delay={0.5}
              />
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 1 }}
              className="mt-7 max-w-md text-lg leading-relaxed text-cream-dim"
            >
              {site.valueProp}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.15 }}
              id="subscribe"
              className="mt-8 scroll-mt-28"
            >
              <SubscribeForm />
              <p className="mt-3 label-mono text-moss">{site.freeNote}</p>
            </motion.div>
          </div>

          {/* Right: live counter panel (asymmetric, glass) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              className="relative ml-auto max-w-sm rounded-2xl border border-cream/10 bg-forest-950/55 p-6 backdrop-blur-md lg:translate-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="label-mono text-mint">The mission</span>
                <span className="label-mono text-moss">the goal</span>
              </div>
              <div className="mt-5 font-mono text-3xl font-medium tracking-tight text-lime tabular-nums sm:text-[2.6rem]">
                <Odometer to={1_000_000_000} />
              </div>
              <p className="mt-2 text-sm text-cream-dim">
                people to make AI fluent, one daily email at a time
              </p>

              <div className="mt-6 h-px w-full bg-cream/10" />

              <dl className="mt-5 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xl font-semibold text-cream">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-[0.7rem] leading-tight text-moss">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>

        {/* Logo band */}
        <Stagger className="mt-12 border-t border-cream/10 pt-7" delay={0.2}>
          <Reveal className="mb-5 flex items-center gap-3">
            <span className="label-mono text-moss">
              The tools we make practical
            </span>
            <span className="h-px flex-1 bg-cream/10" />
          </Reveal>
          <Reveal>
            <LogoMarquee />
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
}
