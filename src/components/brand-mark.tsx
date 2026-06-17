import { cn } from "@/lib/utils";

/** Renders a normalized currentColor brand SVG. Inherits color from text. */
export function BrandMark({
  svg,
  className,
}: {
  svg: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex", className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
