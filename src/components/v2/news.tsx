"use client";

import { news } from "@/lib/content";
import { Stagger, Reveal } from "@/components/motion/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

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
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function News() {
  const [lead, ...rest] = news;

  return (
    <section
      id="news"
      aria-label="AI News"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pb-20 pt-10 sm:px-8 lg:pb-28"
    >
      {/* section header */}
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-ink/12 pb-5">
        <div>
          <span className="label text-mint">The dispatch</span>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            What changed in AI this week.
          </h2>
        </div>
        <a
          href="#news"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-lime-deep"
        >
          Browse the archive
          <ArrowOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <Stagger
        className="grid grid-cols-1 gap-x-10 gap-y-0 lg:grid-cols-12"
        gap={0.1}
      >
        {/* lead story */}
        <Reveal
          className="lg:col-span-7 lg:row-span-2"
          variant={{
            hidden: { opacity: 0, y: 22 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          <a
            href="#news"
            className="group flex h-full flex-col rounded-2xl border border-ink/12 bg-paper p-7 transition-colors duration-300 hover:border-ink/25 sm:p-9"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-lime px-3 py-1 text-[0.7rem] font-bold tracking-wide text-forest-900">
                {lead.date}
              </span>
              <span className="label text-ink-dim">{lead.tag}</span>
              <span className="text-[0.78rem] text-ink-dim">
                {lead.read} read
              </span>
            </div>

            <h3 className="text-balance text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
              {lead.title}
            </h3>

            <p className="mt-5 max-w-[48ch] text-pretty text-lg leading-relaxed text-ink-soft">
              {lead.blurb}
            </p>

            <span className="mt-auto pt-8">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Read the dispatch
                <ArrowOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </span>
          </a>
        </Reveal>

        {/* secondary stories */}
        {rest.map((item, i) => (
          <Reveal
            key={item.title}
            className="lg:col-span-5"
            variant={{
              hidden: { opacity: 0, y: 22 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            <a
              href="#news"
              className={`group flex gap-5 py-7 ${i === 0 ? "lg:pt-0" : "border-t border-ink/12"}`}
            >
              {/* chartreuse marker rail */}
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ink/20 transition-colors duration-300 group-hover:bg-lime-deep" />
              <span className="min-w-0">
                <span className="mb-2 flex items-center gap-2.5">
                  <span className="label text-ink-dim">{item.tag}</span>
                  <span className="text-[0.75rem] text-ink-dim">
                    {item.date} · {item.read}
                  </span>
                </span>
                <h4 className="text-balance text-xl font-semibold leading-snug tracking-[-0.01em] text-ink transition-transform duration-300 group-hover:translate-x-0.5 sm:text-2xl">
                  {item.title}
                </h4>
                <p className="mt-2 max-w-[46ch] text-pretty leading-relaxed text-ink-soft">
                  {item.blurb}
                </p>
              </span>
            </a>
          </Reveal>
        ))}
      </Stagger>
    </section>
  );
}
