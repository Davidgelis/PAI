"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe reduced-motion hook.
 *
 * Built on useSyncExternalStore so the server snapshot (false) is used during
 * hydration, then React swaps to the real preference, with no hydration
 * mismatch and no setState-in-effect.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReduceMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
