"use client";

import { motion } from "framer-motion";
import { site, footerLinks, ticker } from "@/lib/content";
import { socials } from "@/components/social-icons";
import { useReduceMotion } from "@/lib/use-reduce-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function Ticker() {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 px-5">
      {ticker.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-sm font-bold tracking-wide text-forest-900">
            {t}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-forest-900/50" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-mint py-3.5">
      <div className="flex w-max animate-ticker">
        {row}
        {row}
      </div>
    </div>
  );
}

function BookmarkMark() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-7 place-items-center rounded-[4px] bg-lime text-forest-950"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
      </svg>
    </span>
  );
}

export function Footer() {
  const reduce = useReduceMotion();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-forest-950 text-cream"
    >
      <Ticker />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-44 pt-20 sm:px-8 sm:pb-52 lg:pt-24">
        {/* closing statement */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex max-w-3xl items-start gap-4"
        >
          <BookmarkMark />
          <p className="text-balance text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-cream sm:text-3xl">
            Where tomorrow&rsquo;s business leaders learn to think in AI.
          </p>
        </motion.div>

        {/* link grid */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          <FooterCol title="Explore" links={footerLinks.Explore} />
          <FooterCol title="Account" links={footerLinks.Account} />

          <div>
            <h3 className="label mb-4 text-mint">Follow</h3>
            <ul className="flex flex-wrap gap-2.5">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream-dim transition-colors duration-300 hover:border-mint hover:bg-mint hover:text-forest-900"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label mb-4 text-mint">The daily drop</h3>
            <p className="mb-4 max-w-[24ch] text-sm leading-relaxed text-cream-dim">
              {site.mission}
            </p>
            <a
              href="#subscribe"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-forest-900 transition-transform active:scale-[0.98]"
            >
              Subscribe free
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-cream/12 pt-6 text-sm text-cream-dim sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {site.company}
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold text-cream">Practicaly AI</span>
            <span aria-hidden>&middot;</span>
            <span>{site.freeNote}</span>
          </span>
        </div>
      </div>

      {/* giant watermark wordmark */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] select-none text-center font-bold leading-none tracking-[-0.04em] text-cream/[0.045]"
        style={{ fontSize: "clamp(4rem, 19vw, 19rem)" }}
      >
        PRACTICALY
      </span>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="label mb-4 text-mint">{title}</h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-cream-dim transition-colors duration-200 hover:text-cream"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
