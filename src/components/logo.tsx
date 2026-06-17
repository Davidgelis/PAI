import { cn } from "@/lib/utils";

/* Practicaly AI wordmark: a pixel bookmark glyph + name with a boxed "AI". */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      className={cn(
        "group inline-flex items-center gap-2.5 text-cream",
        className
      )}
      aria-label="Practicaly AI, home"
    >
      <svg
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="none"
        className="text-lime transition-transform duration-500 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <path d="M0 0h22v26l-11-7-11 7V0Z" fill="currentColor" />
        <g fill="#0b241e" opacity="0.85">
          <rect x="3" y="3" width="3" height="3" />
          <rect x="9" y="3" width="3" height="3" />
          <rect x="15" y="3" width="3" height="3" />
          <rect x="6" y="7" width="3" height="3" />
          <rect x="12" y="7" width="3" height="3" />
          <rect x="3" y="11" width="3" height="3" />
          <rect x="9" y="11" width="3" height="3" />
          <rect x="15" y="11" width="3" height="3" />
        </g>
      </svg>
      <span className="flex items-baseline gap-1 text-[1.05rem] font-bold tracking-tight">
        Practicaly
        <span className="rounded bg-cream/10 px-1 py-0.5 font-mono text-[0.6rem] font-medium tracking-widest text-cream-dim group-hover:bg-lime group-hover:text-forest-950 transition-colors">
          AI
        </span>
      </span>
    </a>
  );
}
