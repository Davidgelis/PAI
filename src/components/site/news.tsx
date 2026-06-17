"use client";

import { useState } from "react";
import { Stagger, Reveal } from "@/components/motion/primitives";
import { news } from "@/lib/content";
import { cn } from "@/lib/utils";

/* News feed as a stacked card deck (adapted from stacked-article-cards):
   collapsed the cards peek behind each other, a click fans them out.
   Brand-skinned with monogram tiles instead of stock photography. */

const CARD_H = 174;
const GAP = 16;
const PEEK = 16;

function StackedNews() {
  const [open, setOpen] = useState(false);
  const n = news.length;
  const collapsedH = CARD_H + (n - 1) * PEEK;
  const expandedH = n * CARD_H + (n - 1) * GAP;

  return (
    <div className="w-full">
      <div
        className="relative w-full transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ height: (open ? expandedH : collapsedH) + 16 }}
        onClick={() => !open && setOpen(true)}
        role={open ? undefined : "button"}
        tabIndex={open ? undefined : 0}
        onKeyDown={(e) => {
          if (!open && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={open ? undefined : "Expand the news feed"}
      >
        {news.map((item, i) => {
          const top = open ? i * (CARD_H + GAP) : i * PEEK;
          const scale = open ? 1 : 1 - i * 0.03;
          return (
            <a
              key={item.title}
              href="#subscribe"
              onClick={(e) => {
                if (!open) e.preventDefault();
              }}
              style={{
                top,
                height: CARD_H,
                zIndex: open ? i : n - i,
                transform: `scale(${scale})`,
                transformOrigin: "top center",
              }}
              className={cn(
                "group absolute inset-x-0 flex cursor-pointer flex-col justify-center overflow-hidden rounded-2xl border border-cream/10 bg-forest-850/90 p-5 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-6",
                open
                  ? "pointer-events-auto hover:border-lime/40"
                  : "pointer-events-none shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.5)]"
              )}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lime/20 to-forest-700 font-bold text-lime ring-1 ring-lime/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="label-mono text-mint">{item.tag}</span>
                    <span className="label-mono text-moss">{item.date}</span>
                  </div>
                  <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-cream transition-colors group-hover:text-lime sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-cream-dim">
                    {item.blurb}
                  </p>
                </div>
                <span className="hidden shrink-0 self-center text-moss transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-lime sm:block">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm font-medium text-cream-dim transition-colors hover:border-lime/50 hover:text-cream"
        >
          {open ? "Restack" : "Fan out the feed"}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className={cn(
              "transition-transform duration-500",
              open && "rotate-180"
            )}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="label-mono text-moss">{news.length} latest drops</span>
      </div>
    </div>
  );
}

export function News() {
  return (
    <section id="news" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-12">
        {/* Sticky heading rail */}
        <div className="lg:col-span-5">
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

        {/* Stacked deck */}
        <div className="lg:col-span-7">
          <StackedNews />
        </div>
      </div>
    </section>
  );
}
