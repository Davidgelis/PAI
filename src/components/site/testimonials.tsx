"use client";

import { Marquee } from "@/components/marquee";
import { Stagger, Reveal } from "@/components/motion/primitives";
import { testimonials } from "@/lib/content";

function Card({ quote, who }: { quote: string; who: string }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-cream/10 bg-forest-850/80 p-6 backdrop-blur transition-colors hover:border-mint/40 sm:w-[400px]">
      <blockquote className="text-[0.95rem] leading-relaxed text-cream-dim">
        <span className="mr-1 font-display text-2xl leading-none text-lime">
          &ldquo;
        </span>
        {quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/15 text-mint">
          <svg width="14" height="16" viewBox="0 0 22 26" fill="none">
            <path d="M0 0h22v26l-11-7-11 7V0Z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-sm font-medium text-cream">{who}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);

  return (
    <section id="loved" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <Stagger className="mx-auto mb-12 max-w-6xl px-5 text-center sm:px-6">
        <Reveal>
          <span className="label-mono text-mint">/ Social proof</span>
        </Reveal>
        <Reveal>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
            People are loving{" "}
            <span className="text-lime">practicaly.ai</span>
          </h2>
        </Reveal>
      </Stagger>

      <div className="flex flex-col gap-5">
        <Marquee gap={20} speed={26} speedOnHover={8}>
          {rowA.map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </Marquee>
        <Marquee gap={20} speed={26} speedOnHover={8} reverse>
          {rowB.map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
