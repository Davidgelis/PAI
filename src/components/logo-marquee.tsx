"use client";

import { Marquee } from "@/components/marquee";
import { brandMarks } from "@/lib/brand-marks";
import { BrandMark } from "@/components/brand-mark";

/* Brand marks render in cream, warming to lime on hover. Edge-faded. */
export function LogoMarquee({ className }: { className?: string }) {
  return (
    <Marquee gap={56} speed={28} speedOnHover={10} className={className}>
      {brandMarks.map((m) => (
        <div
          key={m.name}
          className="group flex shrink-0 items-center gap-3 text-cream-dim/70 transition-colors duration-500 hover:text-lime"
          title={m.name}
        >
          <BrandMark
            svg={m.svg}
            className="h-6 w-auto [&>svg]:h-6 [&>svg]:w-auto"
          />
          <span className="whitespace-nowrap text-[0.95rem] font-medium tracking-tight">
            {m.name}
          </span>
        </div>
      ))}
    </Marquee>
  );
}
