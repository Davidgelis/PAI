"use client";

import { Marquee } from "@/components/marquee";
import { SubscribeForm } from "@/components/subscribe-form";
import { Logo } from "@/components/logo";
import { Stagger, Reveal, RevealWords } from "@/components/motion/primitives";
import { site, footerLinks, ticker } from "@/lib/content";
import { socials } from "@/components/social-icons";

export function Footer() {
  return (
    <footer className="relative mt-12">
      {/* CTA band */}
      <section className="relative overflow-hidden border-y border-cream/10 bg-forest-850 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(70% 120% at 50% 0%, rgba(200,242,80,0.10), transparent 60%)",
          }}
        />
        <Stagger className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
          <Reveal>
            <span className="label-mono text-mint">/ Start today</span>
          </Reveal>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.025em] sm:text-6xl">
            <RevealWords text="Become" /> <RevealWords text="fluent" highlight={["fluent"]} delay={0.1} />{" "}
            <RevealWords text="before everyone else." delay={0.2} />
          </h2>
          <Reveal>
            <p className="mx-auto mt-5 max-w-md text-cream-dim">
              {site.valueProp}
            </p>
          </Reveal>
          <Reveal className="mt-8 flex justify-center">
            <SubscribeForm />
          </Reveal>
          <Reveal>
            <p className="mt-3 label-mono text-moss">{site.freeNote}</p>
          </Reveal>
        </Stagger>
      </section>

      {/* Ticker */}
      <div className="border-b border-cream/10 bg-mint py-3 text-forest-950">
        <Marquee gap={0} speed={50} fade={false}>
          <div className="flex items-center">
            {ticker.map((t) => (
              <span key={t} className="flex items-center">
                <span className="px-6 text-sm font-semibold tracking-tight">
                  {t}
                </span>
                <span className="text-forest-950/50">&bull;</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* Footer body */}
      <div className="bg-forest-900">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-5 max-w-xs text-lg leading-snug text-cream-dim">
                {site.tagline}
              </p>
            </div>

            {Object.entries(footerLinks).map(([group, links]) => (
              <nav key={group} aria-label={group}>
                <h3 className="label-mono text-moss">{group}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-cream-dim transition-colors hover:text-lime"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h3 className="label-mono text-moss">Socials</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-cream-dim transition-colors hover:border-lime/50 hover:bg-lime hover:text-forest-950"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-6 text-sm text-moss sm:flex-row sm:items-center">
            <p>
              &copy; {new Date().getFullYear()} {site.company}
            </p>
            <p className="label-mono">Built for the AI fluent</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
