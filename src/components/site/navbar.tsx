"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReduceMotion } from "@/lib/use-reduce-motion";
import { Logo } from "@/components/logo";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/primitives";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReduceMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled
            ? "border-cream/10 bg-forest-900/70 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
            : "border-transparent bg-transparent"
        )}
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-cream-dim transition-colors hover:bg-cream/5 hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#subscribe"
            className="hidden rounded-full px-3.5 py-1.5 text-sm text-cream-dim transition-colors hover:text-cream sm:block"
          >
            Log in
          </a>
          <a
            href="#subscribe"
            className="rounded-full bg-lime px-4 py-1.5 text-sm font-semibold text-forest-950 transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Join to master AI
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
