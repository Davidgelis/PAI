"use client";

import { useEffect, useRef } from "react";
import { useReduceMotion } from "@/lib/use-reduce-motion";

/* ----------------------------------------------------------------------------
   The Fluency Field — the hero's signature visual.
   A living constellation of "people". The pointer pulls nearby nodes awake:
   they brighten to lime and thread connections, a network becoming AI-fluent.
   Canvas + rAF, DPR aware, pointer-reactive, reduced-motion safe.
---------------------------------------------------------------------------- */

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  seed: number;
};

const LIME = [200, 242, 80];
const MINT = [39, 234, 166];
const DIM = [126, 152, 140];

export function FluencyField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReduceMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area but is capped for perf.
      const target = Math.min(Math.round((w * h) / 11000), 150);
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
        seed: Math.random() * Math.PI * 2,
      }));
    };

    const lerp = (a: number[], b: number[], t: number) =>
      a.map((v, i) => Math.round(v + (b[i] - v) * t));

    const radius = () => Math.min(Math.max(w * 0.16, 150), 280);

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DIM[0]},${DIM[1]},${DIM[2]},0.45)`;
        ctx.fill();
      }
    };

    let t = 0;
    const frame = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      const R = radius();
      const R2 = R * R;

      // Faint always-on lattice between very close nodes, so the field
      // reads as a living network even before the pointer wakes it.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 86 * 86) continue;
          const fade = (1 - Math.sqrt(d2) / 86) * 0.12;
          ctx.strokeStyle = `rgba(${DIM[0]},${DIM[1]},${DIM[2]},${fade})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Pointer-lit connections (under the dots).
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const adx = a.x - pointer.x;
        const ady = a.y - pointer.y;
        const aNear = pointer.active && adx * adx + ady * ady < R2;
        if (!aNear) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 118 * 118) continue;
          const bdx = b.x - pointer.x;
          const bdy = b.y - pointer.y;
          const bNear = bdx * bdx + bdy * bdy < R2;
          if (!bNear) continue;
          const prox =
            1 - Math.sqrt(adx * adx + ady * ady) / R;
          const fade = (1 - Math.sqrt(d2) / 118) * prox;
          ctx.strokeStyle = `rgba(${LIME[0]},${LIME[1]},${LIME[2]},${fade * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes.
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // gentle drift breathing
        n.x += Math.sin(t + n.seed) * 0.06;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        let glow = 0;
        if (pointer.active && dist2 < R2) {
          glow = 1 - Math.sqrt(dist2) / R;
        }

        const baseColor = lerp(DIM, MINT, Math.min(glow * 1.4, 1));
        const color = lerp(baseColor, LIME, glow * glow);
        const alpha = 0.5 + glow * 0.5;
        const rr = n.r * (1 + glow * 1.8);

        if (glow > 0.15) {
          ctx.shadowBlur = 12 * glow;
          ctx.shadowColor = `rgba(${LIME[0]},${LIME[1]},${LIME[2]},${glow})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, rr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    if (reduce) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);
    }

    const onResize = () => {
      build();
      if (reduce) drawStatic();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
